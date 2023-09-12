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
    averagePrice: number;
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

        const updatedStocks = await Promise.all(
            filteredTickers.map(async (ticker) => {
              const stocksInformation = await getStockInformation(ticker);
              const filteredTransactions = transactions.filter(
                (transaction) => transaction.data.ticker === ticker
              );

              const totalPrice = filteredTransactions.reduce(
                (acc, transaction) => acc + transaction.data.totalPrice,
                0
              );

              const totalQuantity = filteredTransactions.reduce(
                (acc, transaction) => acc + transaction.data.quantity,
                0
              );
              const averagePrice =
                totalPrice / totalQuantity
        
              return {
                ...stocksInformation,
                averagePrice,
              };
            })
          );
        
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
                        <p>Preço Atual {BRL.format(stock.regularMarketPrice)}</p>
                        <p>Preço Médio {BRL.format(stock.averagePrice)}</p>
                        <p>Rentabilidade {((stock.regularMarketPrice/stock.averagePrice - 1) * 100).toFixed(2)}%</p>
                    </div>
                );
            })}

        </div>
    );
};

export default Dashboard