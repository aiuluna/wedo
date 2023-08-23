import { Bridge, Node, Topic } from "@wedo/meta";
import useSubscribe from "../../hooks/useSubscribe";
import { useState } from "react";
import classes from './component.module.scss'
import { ListRender } from "./ListRender";

const FlexContainer = ({ bridge, gap }: { bridge: Bridge, gap: string }) => {
  const [children, setChildren] = useState<Array<Node | string>>(bridge.getNode().getChildren())
  useSubscribe([bridge.getNode(), [Topic.NewNodeAdded, Topic.NodeChildrenUpdated]], () => {
    setChildren(bridge.getNode().getChildren())
  })
  useSubscribe([bridge.getNode(), Topic.NodeGapIndexChanged], (gapIndex: number | null) => {
    if (gapIndex !== null) {
      const list = bridge.getNode().getChildren() as Array<Node | string>;
      list.splice(gapIndex, 0, `__${gap.toUpperCase()}__`)
      setChildren(list)
    } else {
      setChildren(bridge.getNode().getChildren())
    }
  })
  return (<div className={classes[gap]}>
    <ListRender
      children={children}
      bridge={bridge}
      childrenProps={{
        style: {
          position: "",
        },
      }}
    />
  </div>)
}

export default FlexContainer