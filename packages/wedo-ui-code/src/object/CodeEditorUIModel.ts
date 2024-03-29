import { CodeProject, CodeProjectType, FileTreeNode, ProjectJSON, CodeProjectRepo } from '@wedo/code'
import { StateMachine } from '@wedo/utils'
import { fileRemote, codeProjectRemote } from '@wedo/request'

export enum States {
  Initialize = 0,
  Selected
}

export enum Actions {
  AUTO,
  Select,
  NewFile,
  Rename
}

export enum Topic {
  SelectionChanged,
  Loaded,
  FileAdded,
  FileRenamed
}

function first<T>(g: Generator<T>) {
  const next = g.next()
  if (next.value) {
    return next.value
  }
  return null
}

export class CodeEditorUIModel extends StateMachine<States, Actions, Topic> {

  private project: CodeProject;
  private selectedFile?: FileTreeNode;

  private _loaded = false;

  constructor(private name: string, private type: CodeProjectType) {
    super(States.Initialize)
    this.project = new CodeProject(name, type)
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

    this.describe('处理新增文件和修改文件名称的逻辑', register => {

      register(States.Selected, States.Selected, Actions.NewFile, () => {
        const newFile = new FileTreeNode('unknow', 'file')
        if (this.selectedFile?.getFileType() === 'dir') {
          this.selectedFile.add(newFile);
        } else {
          this.selectedFile?.getParent()?.add(newFile)
        }
        this.emit(Topic.FileAdded)
      })

      register(States.Selected, States.Selected, Actions.Rename, fileName => {
        this.selectedFile?.setFileName(fileName)
        this.emit(Topic.FileRenamed)
      })
    })



  }

  // 加载lowCode项目
  private async load() {
    const result = await codeProjectRemote.get(localStorage['x-user'], this.project.getName())
    if (!result.data) {
      const templateProject = await codeProjectRemote.get('template', CodeProject.TemplateNames[this.type])
      result.data = templateProject.data;
      result.data.name = this.project.getName()
    }
    const json: ProjectJSON = result.data;
    this.project = CodeProject.formJSON(json);
    const files = [...this.project.getRoot().find(x => x.getFileType() === 'file')].filter(x => x.getUrl())

    await Promise.all(files.map(async file => {
      const url = file.getUrl()
      const res = await fileRemote.get(url!)
      file.setContent(res.data)
      file.saved()
    }))

    this.dispatch(Actions.Select, first(this.project.getRoot().find(x => !!x.getContent())))
    this._loaded = true
    this.emit(Topic.Loaded)
  }

  public async save() {
    const codeProjectRepo = new CodeProjectRepo(this.project)
    await codeProjectRepo.save(localStorage['x-user'])
  }

  public async build() {
    await codeProjectRemote.build.put(localStorage['x-user'], this.project.getName())
  }

  public getProject() {
    return this.project
  }

  public getLoaded() {
    return this._loaded
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
