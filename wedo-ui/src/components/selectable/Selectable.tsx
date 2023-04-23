import { Node } from "@wedo/meta";
import { useEffect } from "react";

type SelectionProps = {
  node: Node,
  onSelectChanged: (selected: boolean) => void,
  children: JSX.Element
}

const Selectable = ({node, onSelectChanged, children}: SelectionProps ) => {
  
}

export default Selectable;