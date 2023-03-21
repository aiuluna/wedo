import React from 'react'
import { createRoot } from 'react-dom/client'
import UIEditor from './components/render/UIEditor'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<UIEditor />)

