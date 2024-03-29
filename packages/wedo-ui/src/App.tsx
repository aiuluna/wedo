import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Editor from './page/Editor'
import CodeLess from "./page/CodeLess";
import './index.css'
import Preview from "./page/Preview";
import Fass from "./page/Fass";

const container = document.getElementById('root')
const root = createRoot(container!)

const App = () => {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Editor />}></Route>
      <Route path="/wedo/:page" element={<Editor />}></Route>
      <Route path="/codeless/:page" element={<CodeLess />}></Route>
      <Route path="/faas/:page" element={<Fass />}></Route>
      <Route path="/preview/:page" element={<Preview />}></Route>

    </Routes>
  </BrowserRouter>
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

