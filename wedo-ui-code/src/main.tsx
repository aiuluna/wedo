import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import CodeEditor from './CodeEditor'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <CodeEditor lang="typescript"/>
  </StrictMode>,
)
