import React from 'react'

import Modal from 'react-modal'

import { useTransactions } from 'hooks/useTransactions'

import 'styles/modal.scss'

import trashImg from 'assets/trash.svg'
import closeImg from 'assets/close.svg'

interface CreateTransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    transactionRef: number
}

const DeleteConfirmModal: React.FC<CreateTransactionModalProps> = ({isOpen, onRequestClose, transactionRef}: CreateTransactionModalProps) => {
    const { deleteTransaction } = useTransactions()

    const handleDeleteTransaction = async (ref: number) => {
        await deleteTransaction(ref)

        onRequestClose()
    }

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-delete-modal-content'
        >
            <img src={closeImg} alt="" className='closeButton' onClick={onRequestClose} />

            <div className='content'>
                <img src={trashImg} alt="" />
                <p>Tem certeza que deseja apagar esta transação?</p>
            </div>
            <div className='buttons'>
                <button onClick={onRequestClose}>Cancelar</button>
                <button onClick={() => handleDeleteTransaction(transactionRef)}>Apagar</button>
            </div>
        </Modal>
    )
}

export default DeleteConfirmModal