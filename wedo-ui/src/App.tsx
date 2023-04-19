import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Editor from './page/Editor'

const container = document.getElementById('root')
const root = createRoot(container!)

const App = () => {

  return <BrowserRouter>
    <Routes>
    
      <Route path="/" element={<Editor />}>
      </Route>
    </Routes>
  </BrowserRouter>
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

