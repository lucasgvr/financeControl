import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Transaction from './components/Transactions/Transactions.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/dashboard' />
    },
    {
        path: '/dashboard',
        element: <App />
    },
    {
        path: '/transactions',
        element: <Transaction />
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)