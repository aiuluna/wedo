import { CodeProject, CodeProjectType, FileTreeNode, ProjectJSON } from '@wedo/code'
import { StateMachine } from '@wedo/utils'
import { mockProject } from '../mock/mockProject';
import { codeProjectRemote } from '@wedo/request'

export enum States {
  Initialize = 0,
  Selected
}

export enum Actions {
  AUTO,
  Select
}

export enum Topic {
  SelectionChanged
}

export class CodeEditorUIModel extends StateMachine<States, Actions, Topic> {

  private project: CodeProject;
  private selectedFile?: FileTreeNode;

  constructor(private name: string, private type: CodeProjectType) {
    super(States.Initialize)
    this.project = new CodeProject(name, 'codeless')
    this.init()
    this.load()
  }

  private init() {
    this.describe('处理选中逻辑', (register) => {
      register([States.Initialize, States.Selected], States.Selected, Actions.Select, (node: FileTreeNode) => {
        this.selectedFile = node;
        this.emit(Topic.SelectionChanged, node)
      })
    })
  }

  private async load() {
    const result = await codeProjectRemote.get(localStorage['x-user'], this.project.getName())
    if (!result.data) {
      const templateProject = await codeProjectRemote.get('template', CodeProject.TemplateNames.codeless)
      result.data = templateProject.data;
      result.data.name = this.project.getName()
    }
    const json: ProjectJSON = result.data;

  }

  public getProject() {
    return this.project
  }

  public getSelectedFile() {
    return this.selectedFile;
  }

  public getName() {
    return this.name
  }

  public getType() {
    return this.type
  }

}
