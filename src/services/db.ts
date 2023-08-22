import faunadb from 'faunadb';

interface Transactions {
    data: Array<Transaction>
}

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

const client = new faunadb.Client({
  secret: 'fnAFL0054JACWPcLqm1iPXMawGZOuEzVISjIgyAE'
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

const q = faunadb.query;
export { client, q, getTransactions };