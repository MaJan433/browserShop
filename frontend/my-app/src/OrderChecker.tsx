import React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "./api";

interface Order {
    uuid: string;
    product: string;
    amount: number;
    unit_price: number;
    customer: string;
    address: string;
}
interface OrdersObject {
    [customer: string]: Order[];
}

export  const OrderChecker = () => {

    const [data, setData] = useState<Order[]>([{uuid:"79ba8a90-160b-4c3c-aa83-b29d8a64ac5d",product:"Guma balonowa ",amount:3,unit_price:5.5,customer:"Jan",address:"Zamkowa"}])
    const navigate = useNavigate()

    useEffect( () => {
        (async () => {
            const res = await fetch(`${apiUrl}/orders`)
            const data = await res.json()
            setData(data)
        })();
    },[]);


    const ordersObject : OrdersObject = {}

        for (let row of data) {
            if (row && data) {
            if (ordersObject[row.customer]) {
                ordersObject[row.customer].push(row)
            } else {
                ordersObject[row.customer] = [row]
            }
        }
    }
    const ordersArray = Object.entries(ordersObject)
    const draw = ordersArray.map(row => {
        const items = row[1].map((item,i) => {
            if (item.amount > 0){
                return (
                    <div  key={i} className="singleOrderItem">

                        <div><span> Product: {item.product} </span>  </div>
                        <div><span> Amount: {item.amount} </span>  </div>
                        <div><span>Price: {(item.unit_price).toFixed(2)} </span>  </div>
                        <div> <span> Total: {(item.unit_price * item.amount).toFixed(2)}</span> </div>
                    </div>
                )
            }

        })
        return(
            <div key={row[0]} className="singleOrder">
            <h1> Customer: {row[0]} </h1>
            <h3> Address: {row[1][0].address}</h3>
                {items}
            </div>
        )

    })

    const returnToAdminPanel = () =>{
        navigate('/adminPanel')
    }

    // })
    return (

    <>
            {draw}


        <button className="button-32" onClick={returnToAdminPanel}> Return to admin panel</button>
    </>
    )
}