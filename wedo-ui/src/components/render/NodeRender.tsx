import { Node } from "@wedo/meta"
import { getLocalComponentsByURL } from "./getLocalComponentByURL"
import React, { useEffect, useState } from "react"


const InnerRender = ({node, C} : {node: Node, C: React.ComponentType}) => {
  return <C />
} 

const NodeRender = ({node}: {node: Node}) => {

  const [localComponent, setLocalComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    loadLocal()
  }, [])

  const loadLocal = async () => {
    if (node.meta.url) {
      const lcomp = await getLocalComponentsByURL(node.meta.url);
      setLocalComponent(React.memo(lcomp));
    }
  }
 
  if (!localComponent) return null;
  return <InnerRender node={node} C={localComponent}/>
}




export default NodeRender