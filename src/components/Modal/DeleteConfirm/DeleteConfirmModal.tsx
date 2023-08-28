import React from 'react';

import { useTransactions } from '../../../hooks/useTransactions';

import Modal from "react-modal"

import "react-datepicker/dist/react-datepicker.css"

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
        >
           <button onClick={onRequestClose}>Cancelar</button>
           <button onClick={() => handleDeleteTransaction(transactionRef)}>Apagar</button>
        </Modal>
    )
}

export default DeleteConfirmModal