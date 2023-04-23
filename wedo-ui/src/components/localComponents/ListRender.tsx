import { Bridge, Node } from "@wedo/meta"
import { useContext } from "react"
import RenderContext from "../render/RenderContext"

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

      } else {
        return bridge.render('react', childNode, {
          key: childNode.getId() + '',
          childrenProps
        })
      }
    })}
  </>
}