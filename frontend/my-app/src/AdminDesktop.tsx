import React from 'react';
import {useNavigate} from "react-router-dom";

export const AdminDesktop = () => {

    const navigate = useNavigate()
    const addNewProductFunction = () => {
        navigate('/AddNewProduct')
    }

    const checkProductsFunction = () => {
        navigate('/checkOrders')
    }

    const returnToMainPage = () =>{
        navigate('/')
    }


    const checkOrdersFunction = () => {
        navigate('/orders')
    }

    return (
        <>
            <hr/>
        <span className="button-32" onClick={addNewProductFunction}>Add new product</span>
        <span className="button-32" onClick={checkProductsFunction}>Check products</span>
        <span className="button-32" onClick={checkOrdersFunction}>Check orders</span>
        <span className="button-32" onClick={returnToMainPage}> Return to main page</span>
        </>
    )
}