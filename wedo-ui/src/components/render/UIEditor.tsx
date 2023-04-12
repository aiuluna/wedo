import React from 'react'
import classes from '../../class/drag-drop.module.scss'
import Pannel from './Pannel'
import ItemList from './ItemList'
import Editor from '../../object/Editor'
import {ComponentsLoader} from '@wedo/loader/lib'

import '../../class/index.scss'

export const EditorContext = React.createContext<Editor>(null as any);
export default class UIEditor extends React.Component {
  componentDidMount(): void {
      const loader = ComponentsLoader.getInstance();
      loader.load()

  }
  render() {
    return <></>
    // const editor = new Editor()
    // return (
    //   <EditorContext.Provider value={editor}>
    //     <div className={classes['page']}>
    //       <ItemList></ItemList>
    //       <Pannel></Pannel>
    //     </div>
    //   </EditorContext.Provider>
    // )
  }
}
