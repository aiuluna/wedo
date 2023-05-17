import { CordNew } from "@wedo/meta/lib/instance/Cord.new";
import React from "react";
import { Page } from "@wedo/meta";
declare const RenderContext: React.Context<{
    cord: CordNew;
    page?: Page | undefined;
}>;
export default RenderContext;
