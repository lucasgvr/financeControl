import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { client, q } from "../services/db"

interface Transaction {
    ref: {
        value: {
            id: number,
            collection: Object
        }
    },
    ts: number,
    data: {
        date: string,
        buy: string,
        ticker: string,
        quantity: number,
        price: number
    }
}

interface Transactions {
    data: Array<Transaction>
}

interface TransactionInput {
    data: {
        date: string,
        buy: string,
        ticker: string,
        quantity: number,
        price: number
    }
}

interface TransactionProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>,
    deleteTransaction: (ref: number) => Promise<void>,
    updateTransaction: (ref: number, transaction: TransactionInput) => Promise<void>,
    getTransactionByRef: (ref: number) => Promise<Transaction>
}   

export const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export const TransactionsProvider = ({children}: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        updateAllTransactions()
    }, [])
    
    const getTransactions = async () => {
        const allTransactions: Transactions = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection("Transactions"))),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )
    
        return allTransactions.data
    }

    const updateAllTransactions = async () => {
        setTransactions(await getTransactions())
    }

    const createTransaction = async (transacionInput: TransactionInput) => {
        await client.query(q.Create(q.Collection('Transactions'), transacionInput))
        updateAllTransactions()
    }
    
    const deleteTransaction = async (ref: number) => {
        await client.query(q.Delete(q.Ref(q.Collection('Transactions'), ref)))
        updateAllTransactions()
    }

    const getTransactionByRef = async (ref: number): Promise<Transaction> => {
        return await client.query(q.Get(q.Ref(q.Collection('Transactions'), ref)))
    }

    const updateTransaction = async (ref: number, transaction: TransactionInput) => {
        await client.query(q.Update(q.Ref(q.Collection('Transactions'), ref), transaction))
        updateAllTransactions()
    }
    
    return (
        <TransactionContext.Provider value={{ transactions, createTransaction, deleteTransaction, getTransactionByRef, updateTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}   

export const useTransactions = () => {
    return useContext(TransactionContext)
}