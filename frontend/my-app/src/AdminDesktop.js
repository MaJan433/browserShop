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
        <button className="button-32" onClick={addNewProductFunction}>Add new product</button>
        <button className="button-32" onClick={checkProductsFunction}>Check products</button>
        <button className="button-32" onClick={checkOrdersFunction}>Check orders</button>
        <button className="button-32" onClick={returnToMainPage}> Return to main page</button>
        </>
    )
}