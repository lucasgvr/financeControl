import React, { FormEvent } from 'react'

import Modal from 'react-modal'

import DatePicker from 'react-datepicker'

import { useTransactions } from 'hooks/useTransactions'

import closeImg from 'assets/close.svg'

import { RadioBox, TransactionTypeContainer } from 'styles/radioBox'

import 'react-datepicker/dist/react-datepicker.css'

import 'styles/modal.scss'

interface CreateTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void
}

const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({isOpen, onRequestClose}: CreateTransactionModalProps) => {
    const { createTransaction } = useTransactions()

    const [type, setType] = React.useState('Compra')

    const [date, setDate] = React.useState(new Date())
    const [ticker, setTicker] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [price, setPrice] = React.useState('')

    const handleAddTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await createTransaction({data: {
            date: date.toLocaleDateString('br'),
            type,
            ticker: ticker.toUpperCase(),
            quantity: Number(quantity),
            price: Number(price),
            totalPrice: Number(quantity) * Number(price)
        }})

        onRequestClose()

        setDate(new Date())
        setType('Compra')
        setTicker('')
        setQuantity('')
        setPrice('')
    }

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <img src={closeImg} alt="" className='closeButton' onClick={onRequestClose} />

            <form onSubmit={handleAddTransaction} className='modalForm'>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                    placeholderText='Data'
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('Compra') }}
                        $isActive={type === 'Compra'}
                        $activeColor="green"
                    >
                        <span>Compra</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('Venda') }}
                        $isActive={type === 'Venda'}
                        $activeColor="red"
                    >
                        <span>Venda</span>
                    </RadioBox>
                </TransactionTypeContainer>


                <input id="tickerInput" placeholder='Ticker' value={ticker} onChange={event => setTicker(event.target.value)} />
                <input id="quantityInput" placeholder='Quantidade' value={quantity} onChange={event => setQuantity(event.target.value)} />
                <input id="priceInput" placeholder='Preço' step="any" value={price} onChange={event => setPrice(event.target.value)} />

                <button type='submit'>Adicionar</button>
            </form>
        </Modal>
    )
}

export default CreateTransactionModal