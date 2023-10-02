import React from 'react';

import axios from 'axios';
import { useTransactions } from 'hooks/useTransactions';

import './Dashboard.scss'
import StockCardModal from 'components/Modal/StockCard/StockCardModal';

interface StockInformation { 
    requestedAt: string;
    results: Array<Stock>;
    took: string;
}

export interface Stock {
    logourl: string;
    longName: string;
    regularMarketPrice: number;
    symbol: string;
    averagePrice: number;
    totalPrice: number,
    totalQuantity: number
}

const Dashboard: React.FC = () => {
    const { transactions } = useTransactions()

    const [stocks, setStocks] = React.useState<Array<Stock>>([])

    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedStock, setSelectedStock] = React.useState<Stock>({
        logourl: 'https://brapi.dev/favicon.svg',
        longName: 'Name',
        regularMarketPrice: 0,
        symbol: 'NAME4',
        averagePrice: 0,
        totalPrice: 0,
        totalQuantity: 0
    })


    const openModal = (stock: Stock) => {
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
        const { data } = await axios.get<StockInformation>(`https://brapi.dev/api/quote/${ticker}?token=5nMA8zp5eLXNdzLBWsDZ7R`)
        return data.results[0]
    }

    const BRL = new Intl.NumberFormat('BRL', {
        style: 'currency',
        currency: 'BRL'
    })


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
                        <p>Dividendos 2023</p>
                        <p>Dividendos total</p>
                    </div>
                )
            })}

            <StockCardModal 
                isOpen={isOpen}
                onRequestClose={closeModal}
                selectedStock={selectedStock}
            />

        </div>
    )
}

export default Dashboard