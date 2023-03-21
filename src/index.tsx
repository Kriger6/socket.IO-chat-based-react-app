import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import Main from './components/main/index'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/main",
        element: <Main />
    }
])

const container = document.getElementById('app')
const root = createRoot(container!)
root.render(<RouterProvider router={router} />)