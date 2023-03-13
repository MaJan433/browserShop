import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export  const OrderChecker = () => {

    const [data, setData] = useState('')
    const navigate = useNavigate()

    useEffect( () => {
        (async () => {
            const res = await fetch('http://localhost:3001/orders')
            const data = await res.json()
            setData(data)
        })();
    },[]);


    const ordersObject = {}
    for (let row of data){
        if (ordersObject[row.customer]){
            ordersObject[row.customer].push(row)
        } else {
            ordersObject[row.customer] = [row]
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