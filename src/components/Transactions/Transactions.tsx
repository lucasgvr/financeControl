import React, { FormEvent } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import { Link } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import Modal from "react-modal"

const Transactions: React.FC =  () => {
    const { transactions, createTransaction, deleteTransaction, getTransactionByRef, updateTransaction } = useTransactions()

    const [date, setDate] = React.useState(new Date())
    const [buy, setBuy] = React.useState('')
    const [ticker, setTicker] = React.useState('')
    const [quantity, setQuantity] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    const [editModalIsOpen, settEditModalIsOpen] = React.useState(false)

    const [modalRef, setModalRef] = React.useState(0)
    const [modalDate, setModalDate] = React.useState('  ')
    const [modalBuy, setModalBuy] = React.useState('')
    const [modalTicker, setModalTicker] = React.useState('')
    const [modalQuantity, setModalQuantity] = React.useState(0)
    const [modalPrice, setModalPrice] = React.useState(0)

    const handleAddTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await createTransaction({data: {
            date: date.toLocaleDateString('br'),
            buy,
            ticker,
            quantity,
            price,
            totalPrice: quantity * price
        }})

        setDate(new Date())
        setBuy('')
        setTicker('')
        setQuantity(0)
        setPrice(0)
    }
    
    const handleDeleteTransaction = async (ref: number) => {
        await deleteTransaction(ref)
    }
    
    const handleUpdateTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await updateTransaction(modalRef, {data: {
            date: modalDate,
            buy: modalBuy,
            ticker: modalTicker,
            quantity: modalQuantity,
            price: modalPrice,
            totalPrice: modalQuantity * modalPrice
        }})

        handleCloseModal()
    }

    const handleOpenModal = async (ref: number) => {
        const modalData = await getTransactionByRef(ref)  

        setModalRef(ref)
        setModalDate(modalData.data.date)
        setModalBuy(modalData.data.buy)
        setModalTicker(modalData.data.ticker)
        setModalQuantity(modalData.data.quantity)
        setModalPrice(modalData.data.price)
        
        settEditModalIsOpen(true)
    }

    const handleCloseModal = () => {
        settEditModalIsOpen(false)
    }

    Modal.setAppElement('#root')

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
                    <div key={transaction.ref?.value.id}>
                        <p>{transaction.data.date}</p>
                        {transaction.data.buy == 'Compra' ? <p>Compra</p> : <p>Venda</p>}
                        <p>{transaction.data.ticker}</p>
                        <p>{transaction.data.quantity}</p>
                        <p>{transaction.data.price}</p>
                        <p>{transaction.data.totalPrice}</p>
                        <button onClick={() => handleDeleteTransaction(transaction.ref.value.id)}>
                            Remove
                        </button>
                        <button onClick={() => handleOpenModal(transaction.ref.value.id)}>
                            Edit
                        </button>
                    </div>
                )
            })}

            <form onSubmit={handleAddTransaction}>
                <label htmlFor="dateInput">Data</label>

                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                />

                <label htmlFor="buyInput">Compra/Venda</label>
                <input id="buyInput" type="text" value={buy} onChange={event => setBuy(event.target.value)} />
                <label htmlFor="tickerInput">Ticker</label>
                <input id="tickerInput" type="text" value={ticker} onChange={event => setTicker(event.target.value)} />
                <label htmlFor="quantityInput">Quantidade</label>
                <input id="quantityInput" type="number" value={quantity} onChange={event => setQuantity(Number(event.target.value))} />
                <label htmlFor="priceInput">Preço</label>
                <input id="priceInput" type="number" step="any" value={price} onChange={event => setPrice(Number(event.target.value))} />
                <button type='submit'>Adicionar</button>
            </form>

            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <form onSubmit={handleUpdateTransaction}>
                    <label htmlFor="dateModalInput">Data</label>
                    <input id="dateModalInput" type="text" placeholder={modalDate} value={modalDate} onChange={event => setModalDate(event.target.value)} />
                    <label htmlFor="buyModalInput">Compra/Venda</label>
                    <input id="buyModalInput" type="text" value={modalBuy} onChange={event => setModalBuy(event.target.value)} />
                    <label htmlFor="tickerModalInput">Ticker</label>
                    <input id="tickerModalInput" type="text" value={modalTicker} onChange={event => setModalTicker(event.target.value)} />
                    <label htmlFor="quantityModalInput">Quantidade</label>
                    <input id="quantityModalInput" type="number" value={modalQuantity} onChange={event => setModalQuantity(Number(event.target.value))} />
                    <label htmlFor="priceModalInput">Preço</label>
                    <input id="priceModalInput" type="number" step="any" value={modalPrice} onChange={event => setModalPrice(Number(event.target.value))} />
                    <button type='submit'>Adicionar</button>
                </form>
            </Modal>
        </>
    )
}

export default Transactions