import React, { FormEvent } from 'react';

import { useTransactions } from 'hooks/useTransactions';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import './Transactions.scss'

import Modal from "react-modal"
import CreateTransactionModal from 'components/Modal/CreateTransaction/CreateTransactionModal';
import DeleteConfirmModal from 'components/Modal/DeleteConfirm/DeleteConfirmModal';
import Transaction from './Transaction/Transaction';

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
            ticker: modalTicker.toUpperCase(),
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
            <div className='titleContainer'>
                <h1>Transações</h1>
                <button onClick={handleOpenCreateModal}>
                    Adicionar +                            
                </button>
            </div>

            {transactions.map((transaction) => {
                return (
                    <Transaction transaction={transaction} handleOpenModal={handleOpenModal} handleOpenDeleteModal={handleOpenDeleteModal} />
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