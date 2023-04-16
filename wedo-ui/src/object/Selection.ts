import { Node } from "@wedo/meta";

export default class Selection {

	private seletion : Set<Node> = new Set()

	public add(node : Node){
    this.seletion.add(node)
	}

	public size(){
    return this.seletion.size
	}

	public first() : Node{
    return this.seletion.values().next().value
	}

	public contains(node : Node) {
    return this.seletion.has(node)
	}

	public remove(node : Node) {
    this.seletion.delete(node)
	}

	public replace(node : Node) {
    this.seletion.clear()
    this.seletion.add(node)
	}
	
	public forEach(fn : (node:Node) => void) {
    for (let node of this.seletion.values()) {
      fn(node)
    }
	}

	public nodes(){
    return this.seletion.values()
	}

	public clear(){
    this.seletion.clear()
	}
}
