import {useContext, useEffect, useState} from "react";
import { useCookies } from 'react-cookie';
import {SearchContext} from "./SearchContext";

export const Grid = () => {

    const {search,minPrice,maxPrice} = useContext(SearchContext)
    const [items, setItems] = useState('')
    const [cookies, setCookie] = useCookies(['basketCookie', 'filterCookie']);


    useEffect( () => {
        (async () => {

                const res = await fetch('http://localhost:3001/search', {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                search:search,
                                minPrice: minPrice,
                                maxPrice: maxPrice
                            }),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                const data = await res.json();
                setItems(data)

        })();
    },[search, minPrice, maxPrice]);
    const itemArray = []
    const priceArray = []
    const photoArray = []
    const maxAmountArray = []
    const latArray = []
    const lonArray = []

    for (let item of items){
        if (cookies.filterCookie !== 'Remove filters' || !cookies.filterCookie){
        if (item.cat === cookies.filterCookie || !cookies.filterCookie){
        itemArray.push(item.name);
        priceArray.push(item.price.toFixed(2));
        photoArray.push(item.photo)
        maxAmountArray.push(item.amount)
        // lonArray.push(item.lon)
        // latArray.push(item.lat)
        }
        } else {
            itemArray.push(item.name)
            priceArray.push(item.price.toFixed(2))
            photoArray.push(item.photo)
            maxAmountArray.push(item.amount)
            // lonArray.push(item.lon)
            // latArray.push(item.lat)
        }
    }
    // console.log(items)
    const importedImages = {}
    for (let image of items){
        importedImages[image.photo] = require(`./${image.photo}`)
    }

    const addItem =(e) => {
        const basket = cookies.basketCookie || {};
        const boughtItem = e.currentTarget.getAttribute('data-key');
        const itemPrice = e.currentTarget.getAttribute('data-price');
        const photo = e.currentTarget.getAttribute('data-photo')
        const maxAmount = e.currentTarget.getAttribute('data-max-amount')
        if (basket.hasOwnProperty(boughtItem)){
            basket[boughtItem].amount += 1

        } else {
            basket[boughtItem] = {amount:1, unitPrice: itemPrice}
        }
        basket[boughtItem].photo = photo
        basket[boughtItem].maxAmount = maxAmount
        setCookie('basketCookie', basket, {
            maxAge: 60*30
        })

    }
    const divs = itemArray.map((name, i) => {
        return (
            <div className="gridSingleElement"
                 data-key={name} data-price={priceArray[i]}
                 key={name}
                 data-photo={photoArray[i]}
                 data-max-amount={maxAmountArray[i]}
                 onClick={addItem}
            >
                <span>{name}</span>
                <div className="gridPhoto">
                    <img src={importedImages[photoArray[i]]} alt={name}/>
                </div>
                <span>Price: {priceArray[i]} zł</span>
            </div>
        )
    });
    if (items){
        return <div className="shoppingDivsHolder">{divs}</div>;
    } else {
        return <span> Please wait, products are loaded...</span>
    }

}