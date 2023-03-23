import React from 'react';
import {useContext, useEffect, useState, FormEvent} from "react";
import { useCookies } from 'react-cookie';
import {SearchContext} from "./SearchContext";
import {apiUrl} from "./api";
import './jpgExt'

interface Items {
    name:string,
    price: number,
    photo: any,
    amount: number,
    lat: number,
    lon: number,
    cat: string
}




export const Grid = () => {

    const {search,minPrice,maxPrice} = useContext(SearchContext)
    const [items, setItems] = useState <Items[]| []>([])
    const [cookies, setCookie] = useCookies(['basketCookie', 'filterCookie']);


    useEffect( () => {
        (async () => {

                const res = await fetch(`${apiUrl}/search`, {
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
    const itemArray: string[] = []
    const priceArray : number[] = []
    const photoArray : string[] = []
    const maxAmountArray : number[] = []


        for (let item of items) {
            if (cookies.filterCookie !== 'Remove filters' || !cookies.filterCookie) {
                if (item.cat === cookies.filterCookie || !cookies.filterCookie) {
                    itemArray.push(item.name);
                    priceArray.push(Number(item.price.toFixed(2)));
                    photoArray.push(item.photo)
                    maxAmountArray.push(item.amount)
                }
            } else {
                itemArray.push(item.name)
                priceArray.push(Number(item.price.toFixed(2)))
                photoArray.push(item.photo)
                maxAmountArray.push(item.amount)
            }
        }


    const importedImages: Record<string, any> = {}
    for (let image of items) {
        importedImages[image.photo] = require(`./${image.photo}`)
    }

    const addItem =(e: FormEvent) => {
        const basket = cookies.basketCookie || {};
        const boughtItem = e.currentTarget.getAttribute('data-key') || '';
        const itemPrice = e.currentTarget.getAttribute('data-price');
        const photo = e.currentTarget.getAttribute('data-photo')
        const maxAmount = e.currentTarget.getAttribute('data-max-amount')
        if (basket.hasOwnProperty(boughtItem) ){
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