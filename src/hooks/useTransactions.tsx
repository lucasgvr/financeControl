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
    getTransactionByRef: (ref: number) => Promise<Transaction>
}   

export const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export const TransactionsProvider = ({children}: TransactionProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const getTransactions = async () => {
        const allTransactions: Transactions = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection("Transactions"))),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )
    
        setTransactions(allTransactions.data)
    }

    useEffect(() => {
        getTransactions()
    }, [transactions])

    const createTransaction = async (transacionInput: TransactionInput) => {
        await client.query(q.Create(q.Collection('Transactions'), transacionInput))
    }
    
    const deleteTransaction = async (ref: number) => {
        await client.query(q.Delete(q.Ref(q.Collection("Transactions"), ref)))
    }

    const getTransactionByRef = async (ref: number): Promise<Transaction> => {
        return await client.query(q.Get(q.Ref(q.Collection('Transactions'), ref)))
    }

   // export const getContactByRef = ref => {
   ///     return client.query(q.Get(q.Ref(q.Collection('contacts'), ref)))
//      }
      
  //    export const updateContact = ref => {
    //    return client.query(q.Update(q.Ref(q.Collection('contacts'), ref)))
     // }
    
    return (
        <TransactionContext.Provider value={{ transactions, createTransaction, deleteTransaction, getTransactionByRef }}>
            {children}
        </TransactionContext.Provider>
    )
}   

export const useTransactions = () => {
    return useContext(TransactionContext)
}