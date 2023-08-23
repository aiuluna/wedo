import { CordNew } from "@wedo/meta/lib/instance/Cord.new";
import { Rect } from "@wedo/utils";
import React from "react";
import { UIModel } from "../../object/UIModel";
import { Page } from "@wedo/meta";

const RenderContext = React.createContext<{editor?: UIModel, cord: CordNew, page?: Page}>({
  cord: new CordNew(Rect.ZERO)
})

export default RenderContext