import { Node, Topic } from "@wedo/meta"
import { getLocalComponentsByURL } from "./getLocalComponentByURL"
import React, { useContext, useEffect, useRef, useState } from "react"
import { NodeRenderProps } from "./render.types"
import RenderContext from "./RenderContext"
import useSubscribe from "../../hooks/useSubscribe"
import Draggable from "../draggable/Draggable"
import { UIEvents } from "../../object/uiModel.types"
import { Bridge, RenderOptions } from '@wedo/meta'
import Selectable from "../selectable/Selectable"

function __render(node: Node, options: RenderOptions) {
  const reactElement = (
    <NodeRender
      node={node}
      key={options.key}
      inheritProps={options.childrenProps}
    />
  )
  return reactElement;
}

/**
 * 生成node节点的真实挂载点
 * @param node 
 * @param children 
 * @param style 
 * @param draggable 
 * @param dragHandlers 
 */
function Styled({
  node,
  children,
  style,
  draggable = false,
  dragHandlers
}: {
  node: Node,
  children: JSX.Element,
  style?: any,
  draggable?: boolean,
  dragHandlers?: any
}) {
  const context = useContext(RenderContext)
  const cord = context.cord;

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    node.mount(ref.current!, cord)
  }, [])

  // 鼠标移动事件在此处绑定监听，panel中监听到mousemove事件后会对选中的节点触发移动事件
  useSubscribe([node, Topic.MouseMoveEventPass], (e: React.MouseEvent) => {
    dragHandlers && dragHandlers.onMouseMove && dragHandlers.onMouseMove(e)
  })

  useSubscribe([node, Topic.MouseUpEventPass], (e: React.MouseEvent) => {
    dragHandlers && dragHandlers.onMouseUp && dragHandlers.onMouseUp(e)
  })

  const box = node.getBox();

  return <div
    ref={ref}
    draggable={draggable}
    className={'wedo-' + node.getName()}
    {...{ "data-wedo-type": node.getName() }}
    style={{
      width: box.width.toString(),
      height: box.height.toString(),
      display: box.display,
      flexDirection: box.flexDirection,
      position: box.position,
      ...style,
      ...node.getStyleObject(),
    }}
  >
    {React.cloneElement(children, {
      ...children.props,
      onMouseDown: dragHandlers?.onMouseDown,
    })}
  </div>
}

const InnerRender = ({ node, C, inheritProps }: NodeRenderProps & { C: any }) => {
  const context = useContext(RenderContext);
  const editor = context.editor!;
  const passProps = node.getPassProps().toJS();
  const bridge = new Bridge(node, editor.page, 'editor')
  bridge.renderForReact = __render
  const [_, setVer] = useState(0)

  useSubscribe([
    node,
    [
      Topic.Resized,
      Topic.NodeMoved,
      Topic.NodePropUpdated,
      Topic.NodeChildrenUpdated
    ]
  ], () => {
    setVer(x => x + 1)
  })

  function selectionChangeHandler(selected: boolean) {
    if (selected) {
      editor.dispatch(UIEvents.EvtSelected, node)
    } else {
      editor.dispatch(UIEvents.EvtCancelSelect, node)
    }
  }

  const box = node.getBox()
  return <Draggable
    style={inheritProps?.style}
    enabled={node.isDraggable()}
    initialPosition={[box.left.toString(), box.top.toString()]}
    onDrag={e => {
      if (node.isDraggable()) {
        editor?.dispatch(UIEvents.EvtNodeSyncMoving, node, [e.diffX, e.diffY])
      }
    }}
    onDragEnd={e => {
      if (node.isDraggable()) {
        editor?.dispatch(UIEvents.EvtNodeMoved, node, [e.diffX, e.diffY])
      }
    }}
  >
    <Styled node={node}>
      <Selectable node={node} onSelectChanged={selectionChangeHandler}>
        <C {...passProps} bridge={bridge} />
      </Selectable>
    </Styled>
  </Draggable>
}

const NodeRender = ({ node, inheritProps }: NodeRenderProps) => {

  const [localComponent, setLocalComponent] = useState<React.ComponentType<{}> | null>(null);

  useEffect(() => {
    loadLocal()
  }, [])

  const loadLocal = async () => {
    if (node.meta.url) {
      const lcomp = await getLocalComponentsByURL(node.meta.url);
      if (lcomp) {
        setLocalComponent(React.memo(lcomp));
      }
    }
  }

  if (!localComponent) return null;
  return <InnerRender node={node} C={localComponent} inheritProps={inheritProps} />
}




export default NodeRender