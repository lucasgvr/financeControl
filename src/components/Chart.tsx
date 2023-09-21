import React from 'react';
import { ChartCanvas, Chart } from 'react-financial-charts';
import { discontinuousTimeScaleProvider } from 'react-financial-charts';
import { CandlestickSeries } from 'react-financial-charts'

class FinancialChart extends React.Component {
  render() {
    const data = [
        {
            "date": 949370400,
            "open": 5.199999809265137,
            "high": 5.86299991607666,
            "low": 5.199999809265137,
            "close": 5.775000095367432,
            "volume": 525150720000,
            "adjustedClose": 1.480681300163269
        },
        {
            "date": 951879600,
            "open": 5.875,
            "high": 6.39900016784668,
            "low": 5.688000202178955,
            "close": 5.900000095367432,
            "volume": 407992320000,
            "adjustedClose": 1.5127307176589966
        },
        {
            "date": 954558000,
            "open": 5.849999904632568,
            "high": 6.188000202178955,
            "low": 5,
            "close": 5.375999927520752,
            "volume": 582123520000,
            "adjustedClose": 1.3783800601959229
        },
        {
            "date": 957150000,
            "open": 5.375999927520752,
            "high": 5.574999809265137,
            "low": 5.23799991607666,
            "close": 5.23799991607666,
            "volume": 523404800000,
            "adjustedClose": 1.342997431755066
        },
        {
            "date": 959828400,
            "open": 5.5,
            "high": 6.862500190734863,
            "low": 5.5,
            "close": 6.8125,
            "volume": 402829305600,
            "adjustedClose": 1.7466918230056763
        },
        {
            "date": 962420400,
            "open": 7,
            "high": 7.150000095367432,
            "low": 5.775000095367432,
            "close": 5.852499961853027,
            "volume": 818569600,
            "adjustedClose": 1.5005518198013306
        },
        {
            "date": 965098800,
            "open": 5.6875,
            "high": 7.0625,
            "low": 5.631249904632568,
            "close": 6.887499809265137,
            "volume": 1772377600,
            "adjustedClose": 1.7659214735031128
        }
    ]

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d: any) => new Date(d.date)
    );

    const { data: trimmedData, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      data
    );

    return (
      <ChartCanvas
        height={200}
        ratio={1}
        width={400}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        seriesName="Price Chart"
        data={trimmedData}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          {/* Add your candlestick series */}
          <CandlestickSeries/>
        </Chart>
      </ChartCanvas>
    );
  }
}

export default FinancialChart;