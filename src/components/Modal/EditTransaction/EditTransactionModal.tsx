import React, { FormEvent } from 'react'

import { Transaction, useTransactions } from "hooks/useTransactions"

import Modal from 'react-modal'
import closeImg from 'assets/close.svg'


import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import 'styles/modal.scss'
import { RadioBox, TransactionTypeContainer } from 'styles/radioBox'

interface EditTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    transactionRef: number,
    transactions: Array<Transaction>
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({isOpen, onRequestClose, transactionRef, transactions}: EditTransactionModalProps) => {
    const { updateTransaction } = useTransactions()
    
    const [modalDate, setModalDate] = React.useState(new Date())
    const [modalType, setModalType] = React.useState('')
    const [modalTicker, setModalTicker] = React.useState('')
    const [modalQuantity, setModalQuantity] = React.useState('')
    const [modalPrice, setModalPrice] = React.useState('')

    const handleGetTransactionInfo = async (ref: number) => {
        const transacionFound: Transaction = transactions.find((transaction: Transaction) => transaction.ref.value.id == ref)!
        
        const dateParts = transacionFound.data.date.split("/")
        const day = parseInt(dateParts[0], 10)
        const month = parseInt(dateParts[1], 10) - 1
        const year = parseInt(dateParts[2], 10)

        const dateObject = new Date(year, month, day)

        setModalDate(dateObject)
        setModalType(transacionFound.data.type)
        setModalTicker(transacionFound.data.ticker)
        setModalQuantity(String(transacionFound.data.quantity))
        setModalPrice(String(transacionFound.data.price))
    }

    const handleUpdateTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await updateTransaction(transactionRef, {data: {
            date: modalDate.toLocaleDateString('br'),
            type: modalType,
            ticker: modalTicker.toUpperCase(),
            quantity: Number(modalQuantity),
            price: Number(modalPrice),
            totalPrice: Number(modalQuantity) * Number(modalPrice)
        }})

        onRequestClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onAfterOpen={() => handleGetTransactionInfo(transactionRef)}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <img src={closeImg} alt="" className='closeButton' onClick={onRequestClose} />

            <form onSubmit={handleUpdateTransaction} className='modalForm'>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={modalDate}
                    onChange={(date: Date) => setModalDate(date)}
                    placeholderText='Data'
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setModalType('Compra') }}
                        $isActive={modalType === 'Compra'}
                        $activeColor="green"
                    >
                        <span>Compra</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setModalType('Venda') }}
                        $isActive={modalType === 'Venda'}
                        $activeColor="red"
                    >
                        <span>Venda</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input id="tickerModalInput" placeholder='Ticker' value={modalTicker} onChange={event => setModalTicker(event.target.value)} />
                <input id="quantityModalInput" placeholder='Quantidade' value={modalQuantity} onChange={event => setModalQuantity(event.target.value)} />
                <input id="priceModalInput" placeholder='Preço' step="any" value={modalPrice} onChange={event => setModalPrice(event.target.value)} />
                <button type='submit'>Adicionar</button>
            </form>
        </Modal>
    )
}

export default EditTransactionModal