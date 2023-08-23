import React, { FormEvent } from 'react';

import { Link } from 'react-router-dom'
import { createTransaction, deleteTransaction, getTransactions } from '../../services/db';

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

const Transactions: React.FC =  () => {
    const [transactions, setTransactions] = React.useState<Array<Transaction>>([])

    const [date, setDate] = React.useState('')
    const [buy, setBuy] = React.useState('')
    const [ticker, setTicker] = React.useState('')
    const [quantity, setQuantity] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    const fetchTransactions = async () => {
        setTransactions(await getTransactions())
    }

    React.useEffect(() => {
        fetchTransactions()
    }, []);

    const handleAddTransaction = async (event: FormEvent) => {
        event.preventDefault()

        const data = {
            date: date,
            buy: buy,
            ticker: ticker,
            quantity: quantity,
            price: price
        }

        await createTransaction({ data })

        fetchTransactions()

        setDate('')
        setBuy('')
        setTicker('')
        setQuantity(0)
        setPrice(0)
    }

    const handleDeleteTransaction = async (ref: number | undefined) => {
        await deleteTransaction(ref)
        fetchTransactions()
    }

    return (
        <>
            <Link to='/dashboard'>
                <button type="button" >
                        Dashboard
                </button>
            </Link>

            <button>
                console                            
            </button>

            {transactions.map((transaction) => {
                return (
                    <div key={transaction.ref?.value.id}>
                        <p>{transaction.data.date}</p>
                        {transaction.data.buy ? <p>Compra</p> : <p>Venda</p>}
                        <p>{transaction.data.ticker}</p>
                        <p>{transaction.data.quantity}</p>
                        <p>{transaction.data.price}</p>
                        <button onClick={() => handleDeleteTransaction(transaction.ref?.value.id)}>
                            Remove
                        </button>
                        <button>
                            Edit
                        </button>
                    </div>
                )
            })}

            <form onSubmit={handleAddTransaction}>
                <label htmlFor="">Data</label>
                <input type="text" value={date} onChange={event => setDate(event.target.value)} />
                <label htmlFor="">Compra/Venda</label>
                <input type="text" value={buy} onChange={event => setBuy(event.target.value)} />
                <label htmlFor="">Ticker</label>
                <input type="text" value={ticker} onChange={event => setTicker(event.target.value)} />
                <label htmlFor="">Quantidade</label>
                <input type="number" value={quantity} onChange={event => setQuantity(Number(event.target.value))} />
                <label htmlFor="">Preço</label>
                <input type="number" value={price} onChange={event => setPrice(Number(event.target.value))} />
                <button type='submit'>Adicionar</button>
            </form>
        </>
    )
}

export default Transactions