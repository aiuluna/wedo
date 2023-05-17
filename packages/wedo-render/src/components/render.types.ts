import {Bridge, Node} from '@wedo/meta'

export type NodeRenderProps = {
	node : Node,
	inheritProps? : any
}

export type RenderedComponentProps = {
	bridge : Bridge
}
