import { CordNew } from "@wedo/meta/lib/instance/Cord.new";
import { Rect } from "@wedo/utils";
import React from "react";
import { UIModel } from "../../object/UIModel";

const RenderContext = React.createContext<{editor?: UIModel, cord: CordNew}>({
  cord: new CordNew(Rect.ZERO)
})

export default RenderContext