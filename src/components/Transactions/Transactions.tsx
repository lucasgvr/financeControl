import React, { FormEvent } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import { Link } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import Modal from "react-modal"
import CreateTransactionModal from '../Modal/CreateTransaction/CreateTransactionModal';
import DeleteConfirmModal from '../Modal/DeleteConfirm/DeleteConfirmModal';

const Transactions: React.FC =  () => {
    const { transactions, getTransactionByRef, updateTransaction } = useTransactions()

    const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = React.useState(false)

    const [transactionRef, setTransactionRef] = React.useState(0)

    const [modalRef, setModalRef] = React.useState(0)
    const [modalDate, setModalDate] = React.useState(new Date())
    const [modalBuy, setModalBuy] = React.useState('')
    const [modalTicker, setModalTicker] = React.useState('')
    const [modalQuantity, setModalQuantity] = React.useState(0)
    const [modalPrice, setModalPrice] = React.useState(0)

    const handleUpdateTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await updateTransaction(modalRef, {data: {
            date: modalDate.toLocaleDateString('br'),
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
        
        const dateParts = modalData.data.date.split("/")
        const day = parseInt(dateParts[0], 10)
        const month = parseInt(dateParts[1], 10) - 1
        const year = parseInt(dateParts[2], 10)

        const dateObject = new Date(year, month, day);
        
        setModalRef(ref)
        setModalDate(dateObject)
        setModalBuy(modalData.data.buy)
        setModalTicker(modalData.data.ticker)
        setModalQuantity(modalData.data.quantity)
        setModalPrice(modalData.data.price)
        
        setEditModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setEditModalIsOpen(false)
    }

    const handleOpenCreateModal = () => {
        setCreateModalIsOpen(true)
    }

    const handleCloseCreateModal = () => {
        setCreateModalIsOpen(false)
    }

    const handleOpenDeleteModal = (ref: number) => {
        setTransactionRef(ref)
        setDeleteModalIsOpen(true)
    }

    const handleCloseDeleteModal = () => {
        setDeleteModalIsOpen(false)
    }

    return (
        <>
            <Link to='/dashboard'>
                <button type="button" >
                        Dashboard
                </button>
            </Link>

            <button onClick={handleOpenCreateModal}>
                Create +                            
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
                        <button onClick={() => handleOpenDeleteModal(transaction.ref.value.id)}>
                            Remove
                        </button>
                        <button onClick={() => handleOpenModal(transaction.ref.value.id)}>
                            Edit
                        </button>
                    </div>
                )
            })}

            <CreateTransactionModal 
                isOpen={createModalIsOpen}
                onRequestClose={handleCloseCreateModal}
            />

            <DeleteConfirmModal 
                isOpen={deleteModalIsOpen}
                onRequestClose={handleCloseDeleteModal}
                transactionRef={transactionRef}
            />
            
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <form onSubmit={handleUpdateTransaction}>
                    <label htmlFor="dateModalInput">Data</label>

                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={modalDate}
                        onChange={(date: Date) => setModalDate(date)}
                    />

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