import classes from '../class/drag-drop.module.scss'
import Pannel from './Pannel'
import ItemList from './ItemList'
import Editor from '../object/Editor'

export default () => {
  const editor = new Editor();

  return (
    <div className={classes.page}>
      <ItemList editor={editor}/>
      <Pannel editor={editor}/>
    </div>
  )

}