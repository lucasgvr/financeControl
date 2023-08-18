import './App.css'
import React from 'react';

import axios from 'axios';

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

const App: React.FC = () => {
    const [stocks, setStocks] = React.useState<Array<Stock>>([])

    React.useEffect(() => {
        const names = [
            'aesb3', 
            'trpl4', 
            'bbse3',
            'vivt3',
            'itsa4', 
            'taee11', 
            'sanb11', 
            'tims3',
            'tasa4',
            'klbn11', 
            'sapr11', 
            'egie3',
            'bbdc3',
            'cmig4',
            'cxse3'
        ]

        names.map(async (name) => {
            const stocksInformation = await getStockInformation(name)

            if(stocksInformation.logourl == null) {
                const newSymbol = stocksInformation.symbol.substring(0, stocksInformation.symbol.length - 2) + '4'
                const newStock = await getStockInformation(newSymbol)
                Object.assign(stocksInformation, {logourl: newStock.logourl})
            }
            
            setStocks((previousInformation: Array<Stock>) => [...previousInformation, stocksInformation])
        })
    }, []);

    const getStockInformation = async (ticker: string) => {
        const { data } = await axios.get<StockInformation>(`https://brapi.dev/api/quote/${ticker}`)
        return data.results[0]
    }

    return (    
        <div className="App">
            <button type="button" onClick={() => console.log(stocks)}>
                    Get Prices
            </button>
            
            {stocks.map((stock: Stock) => {
                return (
                    <div key={stock.symbol}>
                        <p>Nome: {stock.longName}</p>
                        <p>Símbolo: {stock.symbol}</p>
                        <p>Valor: {stock.regularMarketPrice}</p>
                        <img src={stock.logourl} alt={stock.longName} />
                    </div>
                );
            })}

        </div>
    );
};

export default App;