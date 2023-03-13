import React, { useState, useEffect } from 'react';

export const ExchangeRate = (props) => {
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch('https://api.nbp.pl/api/exchangerates/rates/c/usd/today/');
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
    }

}
