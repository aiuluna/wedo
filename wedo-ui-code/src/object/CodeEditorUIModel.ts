import { CodeProject, CodeProjectType, FileTreeNode } from '@wedo/code'
import { StateMachine } from '@wedo/utils'
import { mockProject } from '../mock/mockProject';

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

  constructor(name: string, type: CodeProjectType) {
    super(States.Initialize)
    this.project = mockProject;
    this.init()
  }

  private init() {
    this.describe('处理选中逻辑', (register) => {
      register([States.Initialize, States.Selected], States.Selected, Actions.Select, (node: FileTreeNode) => {
        this.selectedFile = node;
        this.emit(Topic.SelectionChanged, node)
      })
    })

  }

  public getProject() {
    return this.project
  }

  public getSelectedFile() {
    return this.selectedFile;
  }

}
