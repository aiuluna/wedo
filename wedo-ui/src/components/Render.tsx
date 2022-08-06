import { useContext, useEffect, useMemo, useState } from 'react'
import classes from '../class/drag-drop.module.scss'
import Editor from '../object/Editor'
import { Actions } from '../object/editor.types'
import { Node } from '../object/Node'
import { Topics } from '../object/Topics'
import { Draggable } from './Draggable'
import { EditorContext } from './UIEditor'

type WedoComponent = {
  node: Node,
}

const render = (node: Node) => {
  switch (node.getType()) {
    case 'root':
      return <Root node={node} />
    case 'text':
    case 'rect':
    case 'image':
      return <ItemRenderForDraggable node={node} />
    default:
      return null
  }
}

const Root = ({ node }: WedoComponent) => {
  const children = node.getChildren()
  return <div data-wedo="root">
    {children.map((node: Node, i: number) => {
      return <Render key={i} node={node} />
    })}
  </div>
}

const ItemRenderForDraggable = ({ node }: WedoComponent) => {
  const editor = useContext(EditorContext);

  return <Draggable initalPosition={[node.getX(), node.getY()]}
    onDragStart={() => {
      editor.dispatch(Actions.EvtDragStart, node)
    }}
    onDragEnd={(vec: [number, number]) => {
      editor.dispatch(Actions.EvtDragEnd, vec)
    }}
  >
    {renderItem(node)}
  </Draggable>
}

const renderItem = (node: Node) => {
  switch (node.getType()) {
    case 'image':
      return <img src={'//cdn.myweimai.com/images/48da10f83d954c2ded38f66db6e49c09_192x192.png'} />
    case 'rect':
      return (
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'yellow',
          }}
        />
      )
    case 'text':
      return <h2>这里是文本</h2>
  }
}

export const Render = ({ node }: WedoComponent) => {
  const [ver, setVer] = useState<number>(0);

  useEffect(() => {
    node.on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved]).subscribe(() => {
      setVer(ver => ver + 1)
    })
  }, [])

  return useMemo(() => {
    return render(node)
  }, [ver])
}