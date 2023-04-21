import { Node } from "@wedo/meta";
import { useEffect } from "react";

type SelectionProps = {
  node: Node,
  onSelectChanged: (selected: boolean) => void
}

const Selectable = ({node, onSelectChanged}: SelectionProps ) => {
  
}

export default Selectable;