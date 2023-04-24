import { Bridge } from "@wedo/meta"
import useListenChildrenUpdate from "../../hooks/useListenChildrenUpdate"
import { ListRender } from "./ListRender"


export default ({bridge} : {bridge: Bridge}) => {
  useListenChildrenUpdate(bridge.getNode())
	return (
    <ListRender bridge={bridge}  />
  )
}