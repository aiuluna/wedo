import React from 'react'
import { createRoot } from 'react-dom/client'
import UIEditor from './components/UIEditor'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<UIEditor />)

