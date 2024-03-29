import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { TransactionsProvider } from 'hooks/useTransactions.tsx'

import Root from 'components/Root/Root.tsx'
import Dashboard from 'components/Dashboard/Dashboard'
import Transactions from 'components/Transactions/Transactions.tsx'

import 'styles/global.scss'

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
                element: <Dashboard />
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