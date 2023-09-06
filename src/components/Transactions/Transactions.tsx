import React from 'react'

import { useTransactions } from 'hooks/useTransactions'

import CreateTransactionModal from 'components/Modal/CreateTransaction/CreateTransactionModal'
import DeleteConfirmModal from 'components/Modal/DeleteConfirm/DeleteConfirmModal'
import EditTransactionModal from 'components/Modal/EditTransaction/EditTransactionModal'
import Transaction from 'components/Transactions/Transaction/Transaction'

import "react-datepicker/dist/react-datepicker.css"
import './Transactions.scss'

const Transactions: React.FC =  () => {
    const { transactions } = useTransactions()

    const [transactionRef, setTransactionRef] = React.useState(0)

    const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = React.useState(false)

    const handleOpenEditModal = (ref: number) => {
        setTransactionRef(ref)
        setEditModalIsOpen(true)
    }

    const handleCloseEditModal = () => {
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
                    <Transaction 
                        key={transaction.ref?.value.id}
                        transaction={transaction}
                        handleOpenEditModal={handleOpenEditModal}
                        handleOpenDeleteModal={handleOpenDeleteModal}
                    />
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
            
            <EditTransactionModal 
                isOpen={editModalIsOpen}
                onRequestClose={handleCloseEditModal}
                transactionRef={transactionRef}
            />
        </>
    )
}

export default Transactions