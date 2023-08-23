// import { useContext } from 'react';
// import metas from '../../object/Metas'
// import { EditorContext } from './UIEditor'
// import { ComponentsLoader } from '../../loader/src';

// import { Actions } from '../../object/editor.types';

// import classes from '../../class/drag-drop.module.scss'

// export default () => {
//   const editor = useContext(EditorContext);

//   ComponentsLoader.getInstance();
//   return <div className={classes['item-list']}>
//     {metas.map(item => {
//       return <div
//         draggable={true}
//         onDragStart={(e) => {
//           editor.dispatch(Actions.StartAddComponent, item)
//         }}
//         className={classes['item']}
//         key={item.type}
//       >
//         {item.title}
//       </div>
//     })}
//   </div>
// }