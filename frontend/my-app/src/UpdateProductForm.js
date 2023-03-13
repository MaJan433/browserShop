import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";

export const UpdateProductForm = () => {

    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [photo, setPhoto] = useState('')
    const [amount, setAmount] = useState('')
    const [cat, setCat] = useState('')
    const {uuid} = useParams()


    const submitNewForm = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:3001/items/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    uuid: uuid,
                    productName: productName,
                    price: price,
                    lat: lat,
                    lon: lon,
                    photo: photo,
                    amount: amount,
                    cat: cat
                }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        navigate('/')
    }


    const returnToAdminPanel = () => {
        navigate('/')
    }

    return (
            <div className="UpdateUserForm">

                <form onSubmit={submitNewForm} className="UpdateUserForm">

                    <h3>Update {uuid} info</h3>
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
                        <span> Product location (latitude):</span>
                        <input
                            className="addNewFormInput"
                            placeholder="lat"
                            type={"number"}
                            name={lat}
                            value={lat}

                            onChange={(e) => setLat(e.target.value)}
                        />
                        <span>Product location (longitude):</span>
                        <input
                            className="addNewFormInput"
                            placeholder="lon"
                            type={"number"}
                            name={lon}
                            value={lon}

                            onChange={(e) => setLon(e.target.value)}
                        />
                        <span>Product picture path:</span>
                        <input
                            className="addNewFormInput"
                            placeholder="photo"
                            type={"text"}
                            name={photo}
                            value={photo}

                            onChange={(e) => setPhoto(e.target.value)}
                        />
                        <span>Number of products units</span>
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
                    <button className="button-32"  type="submit"> Update product!</button>
                </form>
                <button className="button-32" onClick={returnToAdminPanel}>Return</button>
            </div>
        )

}
