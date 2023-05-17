import { CordNew } from "@wedo/meta/lib/instance/Cord.new";
import { Rect } from "@wedo/utils";
import React from "react";
const RenderContext = React.createContext({
    cord: new CordNew(Rect.ZERO)
});
export default RenderContext;
