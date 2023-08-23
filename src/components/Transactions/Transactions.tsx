import React, { FormEvent } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import { Link } from 'react-router-dom'

import Modal from "react-modal"

const Transactions: React.FC =  () => {
    const { transactions, createTransaction, deleteTransaction, getTransactionByRef } = useTransactions()

    const [date, setDate] = React.useState('')
    const [buy, setBuy] = React.useState('')
    const [ticker, setTicker] = React.useState('')
    const [quantity, setQuantity] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    const [editModalIsOpen, settEditModalIsOpen] = React.useState(false)

    const [modalDate, setModalDate] = React.useState('')
    const [modalBuy, setModalBuy] = React.useState('')
    const [modalTicker, setModalTicker] = React.useState('')
    const [modalQuantity, setModalQuantity] = React.useState(0)
    const [modalPrice, setModalPrice] = React.useState(0)

    const handleAddTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await createTransaction({data :{
            date,
            buy,
            ticker,
            quantity,
            price
        }})

        setDate('')
        setBuy('')
        setTicker('')
        setQuantity(0)
        setPrice(0)
    }
    
    const handleDeleteTransaction = async (ref: number) => {
        await deleteTransaction(ref)
    }

    const handleOpenModal = async (ref: number) => {
        const modalData = await getTransactionByRef(ref)  

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
                        {transaction.data.buy ? <p>Compra</p> : <p>Venda</p>}
                        <p>{transaction.data.ticker}</p>
                        <p>{transaction.data.quantity}</p>
                        <p>{transaction.data.price}</p>
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

            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <form onSubmit={handleAddTransaction}>
                    <label htmlFor="">Data</label>
                    <input type="text" value={modalDate} onChange={event => setDate(event.target.value)} />
                    <label htmlFor="">Compra/Venda</label>
                    <input type="text" value={modalBuy} onChange={event => setBuy(event.target.value)} />
                    <label htmlFor="">Ticker</label>
                    <input type="text" value={modalTicker} onChange={event => setTicker(event.target.value)} />
                    <label htmlFor="">Quantidade</label>
                    <input type="number" value={modalQuantity} onChange={event => setQuantity(Number(event.target.value))} />
                    <label htmlFor="">Preço</label>
                    <input type="number" value={modalPrice} onChange={event => setPrice(Number(event.target.value))} />
                    <button type='submit'>Adicionar</button>
                </form>
            </Modal>
        </>
    )
}

export default Transactions