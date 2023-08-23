import React, { useState, FC } from 'react'
import DragValue from "../../object/DragValue";

const useDrag = ({
  onDragStart,
  onDragEnd
}: {
  onDragStart?: () => void,
  onDragEnd?: (vec: [number, number]) => void
}) => {
  const dragValue = new DragValue();
  const handlers = {
    onDragStart: (e: React.DragEvent) => {
      onDragStart && onDragStart();
      dragValue.start(e)
    },
    onDrag: (e: React.DragEvent) => {
      dragValue.update(e)
    },
    onDragEnd: (e: React.DragEvent) => {
      // 当前状态的e.client的值不对，不能覆盖
      // dragValue.update(e)
      onDragEnd && onDragEnd([dragValue.getDiffX(), dragValue.getDiffY()])
    }
  }

  return { handlers };
}

export const Draggable: FC<{
  initalPosition: [number, number],
  onDragStart?: () => void,
  onDragEnd?: (vec: [number, number]) => void,
  children: any
}> = (props) => {

  const { handlers } = useDrag({
    onDragStart: props.onDragStart,
    onDragEnd: props.onDragEnd
  })

  
  return (
    <div
      draggable={true}
      {...handlers}
      style={{
        position: 'absolute',
        // left: '0px',
        // top: '0px'
        left: (props.initalPosition?.[0] || 0) + 'px',
        top: (props.initalPosition?.[1] || 0) + 'px'
      }}>
      {props.children}
    </div>
  )
}
