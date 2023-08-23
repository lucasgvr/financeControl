import faunadb from 'faunadb';

interface Transaction {
    ref?: {
        value: {
            id: number,
            collection: Object
        }
    },
    ts?: number,
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

const client = new faunadb.Client({
  secret: import.meta.env.VITE_FAUNA_SECRET
});

const getTransactions = async () => {
    const allTransactions: Transactions = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection("Transactions"))),
            q.Lambda("X", q.Get(q.Var("X")))
        )
    )

    return allTransactions.data
}

const createTransaction = async (data: Transaction) => {
    return await client.query(q.Create(q.Collection('Transactions'), data))
}

const deleteTransaction = async (ref: number | undefined) => {
    return await client.query(q.Delete(q.Ref(q.Collection("Transactions"), ref)))
}

const q = faunadb.query;
export { client, q, getTransactions, createTransaction, deleteTransaction };