import { Bridge, Topic } from "@wedo/meta"
import { useState, useEffect } from "react"
import { ComponentProps } from "./component.types"

export default ({ bridge }: ComponentProps) => {

  const [, setV] = useState(0)
  const props = bridge.passProps()

  useEffect(() => {
    bridge.onDataChange(() => {
      setV(x => x + 1)
    })

  }, [bridge])
  const data = bridge.getNodeData()
  console.log('here', props, data)
  return <p style={{
    color: props?.color,
    fontSize: props?.fontSize,
    fontFamily: props?.fontFamily,
    textAlign: props?.align
  }}>{data || "没有设置文本"}</p>
}