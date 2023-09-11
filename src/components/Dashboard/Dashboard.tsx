import React from 'react';

import axios from 'axios';
import { useTransactions } from 'hooks/useTransactions';

import './Dashboard.scss'

interface StockInformation { 
    requestedAt: string;
    results: Array<Stock>;
    took: string;
}

interface Stock {
    logourl: string;
    longName: string;
    regularMarketPrice: number;
    symbol: string;
}

const Dashboard: React.FC = () => {
    const { transactions } = useTransactions()

    const [stocks, setStocks] = React.useState<Array<Stock>>([])

    const calculateAveragePrice = async () => {
        const tickers = transactions.map(transaction => transaction.data.ticker)
        const filteredTickers = [...new Set(tickers)]

        filteredTickers.map(async (ticker) => {
            const stocksInformation = await getStockInformation(ticker)

            setStocks((previousInformation: Array<Stock>) => [...previousInformation, stocksInformation])

            const foundTransactions = transactions.filter(transaction => {
                return transaction.data.ticker === ticker
            })

            let quantity = 0
            let totalPrice = 0

            foundTransactions.map(transac => {
                quantity += transac.data.quantity
                totalPrice += transac.data.totalPrice
            })

            const avPrice = totalPrice/quantity

            console.log(ticker, avPrice)

            // const tt = stocks.filter(stock => {
            //     if(stock. === ticker) {

            //     }
            // })
        })
    }

    React.useEffect(() => {
        calculateAveragePrice()
    }, [transactions])

    const getStockInformation = async (ticker: string) => {
        const { data } = await axios.get<StockInformation>(`https://brapi.dev/api/quote/${ticker}`)
        return data.results[0]
    }

    return (    
        <div className="stocks">
            {stocks.map((stock: Stock) => {
                return (
                    <div key={stock.symbol} className='stockCard'>
                        <div>
                            <img src={stock.logourl} alt={stock.longName} />
                            <p>{stock.longName}</p>
                        </div>
                        <p>{stock.symbol}</p>
                        <p>Preço Atual{stock.regularMarketPrice}</p>
                        <p>Preço Médio</p>
                        <p>+1,23%</p>
                    </div>
                );
            })}

        </div>
    );
};

export default Dashboard