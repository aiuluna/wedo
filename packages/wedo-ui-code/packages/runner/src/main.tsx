import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import { ProjectEditor } from "@wedo/ui-code";

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ProjectEditor name="default"/>
  </StrictMode>,
)