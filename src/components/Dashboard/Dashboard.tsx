import React from 'react';
import Modal from 'react-modal'

import axios from 'axios';
import { useTransactions } from 'hooks/useTransactions';

import './Dashboard.scss'

interface StockInformation { 
    requestedAt: string;
    results: Array<Stock>;
    took: string;
}

interface Stock {
    averagePrice: number;
    logourl: string;
    longName: string;
    regularMarketPrice: number;
    symbol: string;
}

const Dashboard: React.FC = () => {
    const { transactions } = useTransactions()

    const [stocks, setStocks] = React.useState<Array<Stock>>([])

    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedStock, setSelectedStock] = React.useState<any>({})


    const openModal = (stock: Stock) => {
      console.log(stock)
      setSelectedStock(stock)
      setIsOpen(true)
    }

    const closeModal = () => {
      setIsOpen(false)
    }

    const calculateAveragePrice = async () => {
        const tickers = transactions.map(transaction => transaction.data.ticker)
        const filteredTickers = [...new Set(tickers)]

        const updatedStocks = await Promise.all(
            filteredTickers.map(async (ticker) => {
                const stocksInformation = await getStockInformation(ticker)
                const filteredTransactions = transactions.filter(
                    transaction => transaction.data.ticker === ticker
                )

                const totalPrice = filteredTransactions.reduce(
                    (accumulator, transaction) => accumulator + transaction.data.totalPrice, 0
                )

                const totalQuantity = filteredTransactions.reduce(
                    (accumulator, transaction) => accumulator + transaction.data.quantity, 0
                )

                const averagePrice = totalPrice / totalQuantity
        
                return {
                    ...stocksInformation,
                    averagePrice,
                    totalPrice,
                    totalQuantity
                }
            })
        )
        
        setStocks((previousInformation: Array<Stock>) => [
            ...previousInformation,
            ...updatedStocks,
        ]);
    }

    React.useEffect(() => {
        calculateAveragePrice()
    }, [transactions])

    const getStockInformation = async (ticker: string) => {
        const { data } = await axios.get<StockInformation>(`https://brapi.dev/api/quote/${ticker}`)
        return data.results[0]
    }

    const BRL = new Intl.NumberFormat('BRL', {
        style: 'currency',
        currency: 'BRL'
    })

    Modal.setAppElement('#root')

    return (    
        <div className="stocks">
            {stocks.map((stock: Stock) => {
                return (
                    <div key={stock.symbol} className='stockCard' onClick={() => openModal(stock)}>
                        <div>
                            <img src={stock.logourl} alt={stock.longName} />
                            <p>{stock.longName}</p>
                        </div>
                        <p>{stock.symbol}</p>
                        <p>Preço Atual {BRL.format(stock.regularMarketPrice)}</p>
                        <p>Preço Médio {BRL.format(stock.averagePrice)}</p>
                        <p>Rentabilidade {((stock.regularMarketPrice/stock.averagePrice - 1) * 100).toFixed(2)}%</p>
                    </div>
                )
            })}

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                overlayClassName='react-modal-overlay'
                className='react-delete-modal-content'
            >
                <img src={selectedStock.logourl} alt={selectedStock.longName} style={{width: '2rem', height: '2rem', borderRadius: '50%'}} />
                <p>{selectedStock.symbol}</p>
                <p>{selectedStock.longName}</p>
                <p>{selectedStock.averagePrice}</p>
                <p>{selectedStock.totalPrice}</p>
                <p>{selectedStock.totalQuantity}</p>
            </Modal>
        </div>
    )
}

export default Dashboard