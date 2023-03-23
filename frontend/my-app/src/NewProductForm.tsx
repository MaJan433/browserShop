import React, {useState, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "./api";

export const NewProductForm = () => {

        const navigate = useNavigate()
        const [productName, setProductName] = useState('')
        const [price, setPrice] = useState('')
        // const [lat, setLat] = useState('')
        // const [lon, setLon] = useState('')
        // const [photo, setPhoto] = useState('')
        const [amount, setAmount] = useState('')
        const [cat, setCat] = useState('')

        const submitNewForm = async (e: FormEvent) => {
            e.preventDefault()
            if (!(!productName || !price || !amount || !cat)){
                await fetch(`${apiUrl}/items/add`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            productName: productName,
                            price: price,
                            lat: 1,
                            lon: 1,
                            photo: 'new.jpg',
                            amount: amount,
                            cat: cat
                        }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                alert('You have added a new product!')
                navigate('/')
            } else {
                alert('Some fields are empty. Please fill them!')
            }
        };

    const returnToAdminPanel =() => {
        navigate('/adminPanel')
    }

    return (
            <>
            <form onSubmit={submitNewForm} className="AddUserForm">

                <h2>Add new product</h2>
                <div>
                    <span> Product name:</span>
                    <input
                        className="addNewFormInput"
                        placeholder="Product name"
                        type={"text"}
                        name={productName}
                        value={productName}

                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <span> Product price:</span>
                    <input
                        className="addNewFormInput"
                        placeholder="Price"
                        type={"number"}
                        name={price}
                        value={price}

                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <span>Number of units</span>
                    <input
                        className="addNewFormInput"
                        placeholder="amount"
                        type={"number"}
                        name={amount}
                        value={amount}

                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <span>Product category</span>
                    <input
                        className="addNewFormInput"
                        placeholder="cat"
                        type={"text"}
                        name={cat}
                        value={cat}

                        onChange={(e) => setCat(e.target.value)}
                    />
                </div>
                <button className="button-32" type="submit"> Add new product! </button>
            </form>
                <button className="button-32" onClick={returnToAdminPanel}>Return</button>
            </>
        )

}

