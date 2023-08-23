import * as React from "react";
import { CodeEditorUIModel } from "./object/CodeEditorUIModel";

export const RenderContext = React.createContext<CodeEditorUIModel | null>(null)