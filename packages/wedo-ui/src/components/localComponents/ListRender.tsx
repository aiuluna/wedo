import { Bridge, Node } from "@wedo/meta"
import { useContext } from "react"
import RenderContext from "../render/RenderContext"
import classes from './component.module.scss'

export const ListRender = ({
  bridge,
  children,
  childrenProps,
  gapIndex
}: {
  bridge: Bridge,
  children?: Array<Node | string>,
  childrenProps?: any,
  gapIndex?: number
}) => {
  const ctx = useContext(RenderContext);
  if (!children) children = bridge.getNode().getChildren();

  return <>
    {children.map((childNode, idx) => {
      if (typeof childNode === 'string') {

        const node = ctx.editor?.selection.first()
        if (childNode === '__ROW__') {
          return (
            <div
              className={classes.rowgap}
              style={{
                width: node ? node.getRect().width : ''
              }}
              key={"gap" + idx}
            ></div>
          )
        } else if (childNode === '__COL__') {
          return (
            <div
              className={classes.colgap}
              key={"gap" + idx}
              style={{
                height: node ? node.getRect().height : ''
              }}
            ></div>
          )
        }
        else {
          throw new Error("Unsupported gap type " + childNode)
        }
      } else {
        return bridge.render('react', childNode, {
          key: childNode.getId() + '',
          childrenProps
        })
      }
    })}
  </>
}