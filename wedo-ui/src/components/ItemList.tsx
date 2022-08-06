import React, { useContext } from 'react';
import metas from '../object/Metas'

import classes from '../class/drag-drop.module.scss'
import Editor from '../object/Editor';
import { Actions } from '../object/editor.types';

import { EditorContext } from './UIEditor'

export default () => {
  const editor = useContext(EditorContext);
  return <div className={classes['item-list']}>
    {metas.map(item => {
      return <div
        draggable={true}
        onDragStart={(e) => {
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