import { FileTreeNode } from '@wedo/code'
import { RenderContext } from './RenderContext'

import style from './code.module.scss'
import { useContext, useEffect, useState } from 'react'
import { Actions } from './object/CodeEditorUIModel'
import { PlusSquareOutlined } from '@ant-design/icons'

export const Explorer = () => {
  const editor = useContext(RenderContext);
  return <div className={style.explorer}>
    <div className={style['tree-btns']}>
      <PlusSquareOutlined onClick={() => {
        editor?.dispatch(Actions.NewFile)
      }} />

    </div>
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
        <EditableInput
          defaultText={file.getFileName()}
          active={active}
          onValueChange={(fileName: string) => {
            editor?.dispatch(Actions.Rename, fileName)
          }} />
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
        <EditableInput defaultText={file.getFileName()} active={active} />
      </div>
      {file.getChildren().map((x, i) => <FileItem key={i} depth={depth + 1} file={x} />)}
    </div>)
}

const EditableInput = (
  { defaultText, active, onValueChange }:
    { defaultText: string, active: boolean, onValueChange?: (v: string) => void }) => {
  const [text, setText] = useState<string>(defaultText)
  const [editMode, setEditMode] = useState(false)

  const handler = (e: KeyboardEvent) => {
    if (active) {
      if (e.key === 'F2') {
        setEditMode(true)
      } else if (e.key === 'Enter') {
        setEditMode(false)
      }
    }
  }

  useEffect(() => {
    if (active) {
      window.addEventListener('keyup', handler)
    }

    return () => window.removeEventListener('keyup', handler)
  }, [active, handler])

  useEffect(() => {
    if (editMode === false && text !== defaultText) {
      onValueChange && onValueChange(text)
    }
  }, [text, editMode])

  return <div>
    {editMode && <input
      defaultValue={defaultText}
      onChange={e => setText(e.target.value)}
    />}
    {!editMode && <span>{text}</span>}
  </div>
}

