import { Node, Topic } from "@wedo/meta";
import { MouseEventHandler, useContext, useEffect, useMemo, useState } from "react";

import styles from './selectable.module.scss'
import RenderContext from "../render/RenderContext";
import useSubscribe from "../../hooks/useSubscribe";
import Resizer from "../../object/Resizer";
import { UIEvents } from "../../object/uiModel.types";

type SelectionProps = {
  node: Node,
  onSelectChanged: (selected: boolean) => void,
  children: JSX.Element,
  onMouseDown?: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
}

const Selectable = ({ node, onSelectChanged, children, onMouseDown, onMouseUp }: SelectionProps) => {
  const ctx = useContext(RenderContext)
  const [_, setVer] = useState(0)

  useSubscribe([ctx.editor!, Topic.SelectionChanged], () => {
    setVer(x => x + 1)
  })

  // 判断当前是否被选中
  function selected() {
    return ctx.editor!.selection.contains(node)
  }

  const handlers = useMemo(() => {
    let startSelected = false,
      startX = 0, startY = 0;
    return {
      onMouseDown: (e: React.MouseEvent) => {
        e.stopPropagation()
        startSelected = selected();
        startX = e.clientX;
        startY = e.clientY;
        if (!startSelected) {
          // 如果没选中，就让他选中，并且触发EvtSelected事件
          onSelectChanged(true)
        }
        onMouseDown && onMouseDown(e)
      },
      onMouseUp: (e: React.MouseEvent) => {
        // e.stopPropagation()
        const moved = e.clientX !== startX && e.clientY !== startY;
        if (startSelected && !moved) {
          onSelectChanged(false)
        }
        onMouseUp && onMouseUp(e)
      }
    }
  }, [])

  const selectedValue = selected()
  return <div className={styles.selectable} {...handlers}>
    <div
      className={styles.selection_frame}
      style={{
        display: selectedValue ? "block" : "none",
      }}
    />
    {children}
    {selectedValue && node.isResizable() && Resizer.resizerdata.map(([name, type]) => {
      return (<div
        key={name + ""}
        onMouseDown={e => {
          e.preventDefault()
          e.stopPropagation()
          ctx.editor?.dispatch(UIEvents.EvtStartResize, type, [e.clientX, e.clientY], node)
        }}
        data-cube={type}
        className={`${styles.cube} ${
          styles["cube_" + name]
        }`}/>)
    })}
  </div>
}

export default Selectable;