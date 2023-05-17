import { ComponentProps } from "./component.types"

export default ({bridge} : ComponentProps ) => {
	const node = bridge.getNode()
	return <>
		{node.getChildren().map(childNode => {
			return bridge.render('react', childNode, {
				key : childNode.getId()	+ ""
			})
		})}
	</>
}