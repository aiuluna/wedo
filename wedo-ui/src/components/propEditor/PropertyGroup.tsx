import { GroupMeta } from "@wedo/meta";
import PropItem from "../../object/PropItem";

interface GroupProps {
  group: GroupMeta,
  props: {[key: string] : PropItem}
}

const PropertyGroup = ({ group, props }: GroupProps) => {
  return <></>
}

export default PropertyGroup;