import { Node } from "@wedo/meta";

export class NodeSelector {
    /**
     * 选择鼠标所在位置最适合作为放置目标的节点
     * @param container 
     * @param position 
     * @param exclude 
     * @returns 
     */
    public static selectForDrop(container: Node, position: [number, number], exclude: Node | null): (Node | null) {
        let node = NodeSelector.select(container, position, exclude)
        while (node && !node.isContainer()) {
            node = node.getParent()
        }

        // 如果是root节点就选择第一个子节点，应该是page节点
        if (node?.getParent() === null) {
            return node.getChildren()[0]
        }
        return node
    }

    /**
     * 给定的容器节点中选择一个最接近给定位置的节点
     * @param container 
     * @param position 
     * @param exclude 
     * @returns 
     */
    private static select(container: Node, position: [number, number], exclude): (Node | null) {
        const [x, y] = position;
        if (!container.bound(x, y) || container === exclude) { return null }

        for (let child of container.getChildren()) {
            const nodeRect = container.getRect();
            const result = NodeSelector.select(child, [x - nodeRect.left, y - nodeRect.top], exclude)
            if (result) return result;
        }
        return container;
    }
}