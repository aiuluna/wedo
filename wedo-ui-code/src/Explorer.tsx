import { FileTreeNode } from '@wedo/code'
import { RenderContext } from './RenderContext'

import style from './code.module.less'
import { useContext } from 'react'
import { Actions } from './object/CodeEditorUIModel'

export const Explorer = () => {
  const editor = useContext(RenderContext);
  return <div className={style.explorer}>
    <FileItem depth={0} file={editor!.getProject().getRoot()} />
  </div>

}

const FileItem = ({ file, depth }: { file: FileTreeNode, depth: number }) => {
  const editor = useContext(RenderContext)
  const active = editor?.getSelectedFile() === file
  if (file.getFileType() === 'file') {
    return (
      <div
        style={{
          paddingLeft: depth * 10 + 10,
        }}
        className={`${style["editor-file"]} ${active ? style.active : ""}`}
        onClick={() => {
          editor?.dispatch(Actions.Select, file)
        }}
      >
        {file.getFileName()}
      </div>
    )
  }
  return (
    <div className={style["editor-dir-group"]}>
      <div
        style={{
          paddingLeft: depth * 10 + 10,
        }}
        className={`${style["editor-dir"]} ${active ? style.active : ""
          }`}
        onClick={() => {
          editor?.dispatch(Actions.Select, file)
        }}>
        {file.getFileName()}
      </div>
      {file.getChildren().map((x, i) => <FileItem key={i} depth={depth + 1} file={x} />)}
    </div>)
}

