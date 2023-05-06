
import React, { useContext } from 'react'
import classes from '../../class/drag-drop.module.scss'
import Editor from '../../object/Editor'
import { Actions } from '../../object/editor.types'
import { Render } from './Render'
import { EditorContext } from './UIEditor'

export default () => {
  const editor = useContext(EditorContext);

  return <div className={classes['panel']}
    onDragOver={e => {
      e.preventDefault()
      editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY])
    }}
    onDrop={e => {
      e.preventDefault()
      editor.dispatch(Actions.EvtDrop)
    }}
  >
    <Render node={editor.getRoot()}></Render>
  </div>
}