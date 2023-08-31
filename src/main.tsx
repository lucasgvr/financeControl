import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { TransactionsProvider } from './hooks/useTransactions.tsx'

import Transactions from './components/Transactions/Transactions.tsx'

import 'styles/global.scss'

import Root from 'components/Root/Root.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Navigate to='/dashboard' />
            },
            {
                path: 'dashboard',
                element: <App />
            },
            {
                path: 'transactions',
                element: <Transactions />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <TransactionsProvider>
        <RouterProvider router={router} />
    </TransactionsProvider>
)