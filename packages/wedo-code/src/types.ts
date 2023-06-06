
export type CodeProjectType = 'codeless' | 'faas'

export type FileType = 'dir' | 'file'

export type FileNodeJSON = {
  fileName: string,
  type: FileType,
  url?: string,
  children?: FileNodeJSON[]
}

export type ProjectJSON = {
  name: string,
  type: string,
  version: number,
  scriptUrl?: string,
  fileTreeNode: FileNodeJSON
}