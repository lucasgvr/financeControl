import React, { FormEvent } from 'react';

import { Link } from 'react-router-dom'

interface Transaction {
    id: number,
    date: string,
    buy: string,
    ticker: string,
    quantity: number,
    price: number
}

const Transactions: React.FC =  () => {
    const [transactions, setTransactions] = React.useState<Array<Transaction>>([])

    const [date, setDate] = React.useState('')
    const [buy, setBuy] = React.useState('')
    const [ticker, setTicker] = React.useState('')
    const [quantity, setQuantity] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    React.useEffect(() => {
        setTransactions([
            {
                id: 1,
                date: '09/08/23',
                buy: 'buy',
                ticker: 'aesb3',
                quantity: 6,
                price: 11.02
            },
            {
                id: 2,
                date: '09/08/23',
                buy: 'buy',
                ticker: 'bbse3',
                quantity: 2,
                price: 32.06
            },
            {
                id: 3,
                date: '09/08/23',
                buy: 'buy',
                ticker: 'bbdc3',
                quantity: 5,
                price: 13.67
            }
        ])
    }, []);

    const handleAddTransaction = (event: FormEvent) => {
        event.preventDefault()

        setTransactions((previousInformation: Array<Transaction>) => [...previousInformation, {id: transactions.length + 1, date, buy, ticker, quantity, price}])

        setDate('')
        setBuy('')
        setTicker('')
        setQuantity(0)
        setPrice(0)
    }

    return (
        <>
            <Link to='/dashboard'>
                <button type="button" >
                        Dashboard
                </button>
            </Link>

            <button onClick={() => console.log(transactions)}>
                console                            
            </button>

            {transactions.map((transaction) => {
                return (
                    <div key={transaction.id}>
                        <p>{transaction.date}</p>
                        {transaction.buy ? <p>Compra</p> : <p>Venda</p>}
                        <p>{transaction.ticker}</p>
                        <p>{transaction.quantity}</p>
                        <p>{transaction.price}</p>
                        <button>
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