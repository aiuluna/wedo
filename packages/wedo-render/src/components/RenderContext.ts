import { CordNew } from "@wedo/meta/lib/instance/Cord.new";
import { Rect } from "@wedo/utils";
import React from "react";
import { Page } from "@wedo/meta";

const RenderContext = React.createContext<{cord: CordNew, page?: Page}>({
  cord: new CordNew(Rect.ZERO)
})

export default RenderContext