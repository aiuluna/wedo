import React, { useState, FC } from 'react'
import DragValue from "../object/DragValue";

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
      dragValue.update(e)
      onDragEnd && onDragEnd([dragValue.getDiffX(), dragValue.getDiffY()])
    }
  }

  return { handlers };
}

export const Draggable: FC<{
  initalPosition: [number, number],
  onDragStart?: () => void,
  onDragEnd?: (vec: [number, number]) => void
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
        left: (props.initalPosition?.[0] || 0) + 'px',
        top: (props.initalPosition?.[1] || 0) + 'px'
      }}>
      {props.children}
    </div>
  )
}
