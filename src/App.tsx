import './App.css'
import React from 'react';

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
    const [stocks, setStocks] = React.useState<any>([])

    React.useEffect(() => {
        const names = [
            'sapr11', 
            'cmig4',
            'cxse3',
            'trpl4', 
            'bbse3',
            'tims3',
            'klbn11', 
            'itsa4', 
            'vivt3',
            'bbdc3',
            'egie3',
            'sanb11', 
            'taee11', 
            'aesb3', 
            'tasa4'
        ]

        names.map(async (name) => {
            const res = await handleStockInfo(name)

            if(res.logourl == null) {
                const newSymbol = res.symbol.substring(0, res.symbol.length - 2) + '4'
                const newStock = await handleStockInfo(newSymbol)
                Object.assign(res, {logourl: newStock.logourl})
            }
            
            setStocks((prev: any) => [...prev, res])
        })
    }, []);

    const getStocksInfo = async (ticker: string): Promise<StockInformation> => {
        return await fetch(`https://brapi.dev/api/quote/${ticker}`)
            .then(response => response.json())
    }

    const handleStockInfo = async (ticker: string) => {
        const info = await getStocksInfo(ticker)
        return info.results[0]
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
