
import classes from '../class/drag-drop.module.scss'
import Editor from '../object/Editor'
import { Actions } from '../object/editor.types'
import { Render } from './Render'

export default ({ editor }: { editor: Editor }) => {
  return <div className={classes['panel']}
    onDragOver={e => {
      e.preventDefault()
      editor.dispatch(Actions.EvtDrag, [e.clientX, e.clientY])
    }}
    onDragEnd={e => {
      e.preventDefault()
      editor.dispatch(Actions.EvtDrop)
    }}
  >
    <Render node={editor.getRoot()}></Render>
  </div>
}