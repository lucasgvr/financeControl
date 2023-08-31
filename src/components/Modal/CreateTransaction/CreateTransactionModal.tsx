import React, { FormEvent } from 'react';

import { useTransactions } from '../../../hooks/useTransactions';

import Modal from "react-modal"

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface CreateTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void
}

const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({isOpen, onRequestClose}: CreateTransactionModalProps) => {
    const { createTransaction } = useTransactions()

    const [date, setDate] = React.useState(new Date())
    const [buy, setBuy] = React.useState('')
    const [ticker, setTicker] = React.useState('')
    const [quantity, setQuantity] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    const handleAddTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await createTransaction({data: {
            date: date.toLocaleDateString('br'),
            buy,
            ticker: ticker.toUpperCase(),
            quantity,
            price,
            totalPrice: quantity * price
        }})

        onRequestClose()

        setDate(new Date())
        setBuy('')
        setTicker('')
        setQuantity(0)
        setPrice(0)
    }

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
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
        </Modal>
    )
}

export default CreateTransactionModal