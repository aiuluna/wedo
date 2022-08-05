import React from 'react';
import metas from '../object/Metas'

import classes from '../class/drag-drop.module.scss'
import Editor from '../object/Editor';
import { Actions } from '../object/editor.types';

export default ({
  editor
}: {
  editor: Editor
}) => {

  return <div className={classes['item-list']}>
    {metas.map(item => {
      return <div
        draggable={true}
        onDragStart={(e) => {
          console.log('Actions.StartAddComponent')
          editor.dispatch(Actions.StartAddComponent, item)
        }}
        className={classes['item']}
        key={item.type}
      >
        {item.title}
      </div>
    })}
  </div>
}