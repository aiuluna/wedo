import { Node, Topic } from "@wedo/meta";
import { useEffect, useState } from "react";

/**
 * 监听子组件发生变化的事件，如Topic.NewNodeAdded, Topic.NodeChildrenUpdated
 */
const useListenChildrenUpdate = (node: Node) => {
  const [_, setVer] = useState(0);

  useEffect(() => {
    const subscribe = node.on([Topic.NewNodeAdded, Topic.NodeChildrenUpdated]).subscribe(() => {
      setVer(x => x + 1)
    })
    return () => subscribe.unsubscribe()
  }, [])
}
export default useListenChildrenUpdate;