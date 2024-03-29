import { Transaction as TransactionType} from 'hooks/useTransactions' 

import './Transaction.scss'

import trashImg from 'assets/trash.svg'
import editImg from 'assets/edit.svg'

interface TransactionProps {
    transaction: TransactionType,
    handleOpenEditModal: (ref: number) => void,
    handleOpenDeleteModal: (ref: number) => void
}

const Transaction: React.FC<TransactionProps> = ({ transaction, handleOpenEditModal, handleOpenDeleteModal }: TransactionProps) => {
    const BRL = new Intl.NumberFormat('BRL', {
        style: 'currency',
        currency: 'BRL'
    })

    return (        
        <div className='transaction'>
            <div className='feature'>
                <p>Data</p>
                <p>{transaction.data.date}</p>
            </div>
            <div className='feature'>
                <p>Compra/Venda</p>
                <p>{transaction.data.type}</p>
            </div>
            <div className='feature'>
                <p>Ticker</p>
                <p>{transaction.data.ticker}</p>
            </div>
            <div className='feature'>
                <p>Quantidade</p>
                <p>{transaction.data.quantity}</p>
            </div>
            <div className='feature'>
                <p>Preço</p>
                <p>{BRL.format(transaction.data.price)}</p>
            </div>
            <div className='feature'>
                <p>Preço Total</p>
                <p>{BRL.format(transaction.data.totalPrice)}</p>
            </div>
            
            <div className='buttons'>
                <img src={editImg} onClick={() => handleOpenEditModal(transaction.ref.value.id)} />
                <img src={trashImg} onClick={() => handleOpenDeleteModal(transaction.ref.value.id)} />
            </div>
        </div>
    )   
}

export default Transaction