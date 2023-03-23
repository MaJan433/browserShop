import React from 'react';
import { useState, useEffect} from 'react';

interface ExchangeRateData {
    rates: {
        bid: string,
        ask: string,
        effectiveDate: string,
        No: string
    }[]
}
interface Props {
    total: number
}

export const ExchangeRate = (props: Props) => {
    const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch('https://api.nbp.pl/api/exchangerates/rates/c/usd');
            const data = await res.json();
            setExchangeRate(data)
        })();
    }, [props.total]);
    if (props.total && exchangeRate){
        const bid = Number(exchangeRate.rates[0].bid);
        return (
            <div>
                in USD: {(props.total/bid).toFixed(2)} (value from {exchangeRate.rates[0].effectiveDate})
            </div>
        );
    } else {
        return (
            <div> USD converter failed. Approx. USD value {(props.total/4).toFixed(2)}  </div>
        )
    }

}
