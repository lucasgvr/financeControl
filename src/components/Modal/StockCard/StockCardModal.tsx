import { Stock } from 'components/Dashboard/Dashboard'
import Modal from 'react-modal'
import closeImg from 'assets/close.svg'

import 'styles/modal.scss'

interface StockCardModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    selectedStock: Stock
}

const StockCardModal: React.FC<StockCardModalProps> = ({isOpen, onRequestClose, selectedStock}: StockCardModalProps) => {
    const BRL = new Intl.NumberFormat('BRL', {
        style: 'currency',
        currency: 'BRL'
    })

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-stock-modal-content'
        >   
            <img src={closeImg} alt="" className='closeButton' onClick={onRequestClose} />

            <div className='head'>
                <img src={selectedStock.logourl} alt={selectedStock.longName} />
                <div>
                    <p>{selectedStock.longName}</p>
                    <p>{selectedStock.symbol}</p>
                </div>
            </div>
            <div className='body'>
                <p>Preço Médio: {BRL.format(selectedStock.averagePrice)}</p>
                <p>Preço Total: {BRL.format(selectedStock.totalPrice)}</p>
                <p>Quantidade Total: {selectedStock.totalQuantity}</p>
                <p>Preço Atual: {BRL.format(selectedStock.regularMarketPrice)}</p>
                <p>Rentabilidade: {((selectedStock.regularMarketPrice/selectedStock.averagePrice - 1) * 100).toFixed(2)}%</p>
                <p>Dividendos</p>
            </div>
        </Modal>
    )
}

export default StockCardModal