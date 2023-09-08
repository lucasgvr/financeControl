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

    const getTeste = async () => {
        const tickers = transactions.map(transaction => transaction.data.ticker)
        const teste = [...new Set(tickers)]

        console.log(teste)
        teste.map(async (name) => {
            const stocksInformation = await getStockInformation(name)

            setStocks((previousInformation: Array<Stock>) => [...previousInformation, stocksInformation])
        })

        const result = transactions.filter(obj => {
            return obj.data.ticker === 'ITSA4'
        })

        let sumQuantity = 0;
        let sumTotalPrice = 0;

        result.map(obj => {
            sumQuantity += obj.data.quantity;
            sumTotalPrice += obj.data.totalPrice;
        })

        const avPrice = sumTotalPrice/sumQuantity

        console.log(avPrice)
    }

    React.useEffect(() => {
        getTeste()
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
                        <p>{stock.regularMarketPrice}</p>
                        <p>PM</p>
                        <p>+1,23%</p>
                    </div>
                );
            })}

        </div>
    );
};

export default Dashboard