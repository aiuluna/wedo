import ReactDOM from 'react-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NodeRenderProps } from "./render.types";
import getLocalComponentByURL from '../getLocalComponentByURL';
import { Bridge, Node, RenderOptions, Topic } from '@wedo/meta';
import RenderContext from './RenderContext';
import classes from './render.module.scss'

function __render(node: Node, options: RenderOptions) {
  const reactElement = (<NodeRender key={options.key} node={node} inheritProps={options.childrenProps} />)

  if (options.ele) {
    ReactDOM.render(reactElement, options.ele)
    return null;
  }

  return reactElement
}

const Styled = ({ node, children, style }: { node: Node, children: JSX.Element, style?: any }) => {
  const ref = useRef<HTMLDivElement>(null)
  const context = useContext(RenderContext)
  const box = node.getBox()

  useEffect(() => {
    node.mount(ref.current!, context.cord)
  }, [])

  return <div
    ref={ref}
    className={classes['wedo-' + node.getName()]}
    style={{
      left: box.left.toString(),
      top: box.top.toString(),
      width: box.width.toString(),
      height: box.height.toString(),
      overflow: "hidden",
      ...style,
      ...node.getStyleObject(),
    }}
  >
    {React.cloneElement(children, {
      ...children.props
    })}
  </div>
}

const InnerRender = ({ node, C, inheritProps }: { node: Node, C: any, inheritProps: any }) => {
  const page = useContext(RenderContext).page!;
  const bridge = new Bridge(node, page, "render");
  bridge.renderForReact = __render;

  const passProps = node.getPassProps().toJS();
  const [_, setVer] = useState(0)

  useEffect(() => {
    node.on(Topic.MemorizedDataChanged).subscribe(() => {
      setVer(x => x + 1)
    })
  }, [])

  return <Styled node={node} style={{position: node.getBox().position, ...inheritProps?.style}}>
    <C bridge={bridge} {...passProps} />
  </Styled>

}

export const NodeRender = ({ node, inheritProps }: NodeRenderProps) => {

  if (node.getName() === 'root') {
    node = node.getChildren()[0]
    node.setXY([0, 0])
  }

  const [localComponent, setLocalComponent] = useState<React.ComponentType<{}> | null>(null);

  useEffect(() => {
    loadLocal()
  }, [])

  const loadLocal = () => {
    if (node.meta.url) {
      const lcomp = getLocalComponentByURL(node.meta.url);
      if (lcomp) {
        setLocalComponent(React.memo(lcomp));
      }
    }
  }

  if (!localComponent) return null;
  return <InnerRender node={node} C={localComponent} inheritProps={inheritProps} />
}
