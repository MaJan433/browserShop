import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useState} from "react";
import {apiUrl} from "./api";

export type submitFormObject = {
    uuid: string,
    productName: string,
    price: number,
    lat: number,
    lon: number,
    photo: string,
    amount: number,
    cat: string
}

export const UpdateProductForm = () => {

    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState(0)
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [photo, setPhoto] = useState('')
    const [amount, setAmount] = useState(0)
    const [cat, setCat] = useState('')
    const {uuid} = useParams() || ''


    const submitNewForm = async (e: FormEvent) => {
        e.preventDefault()
        if (uuid) {
            const fetchedObject: submitFormObject = {
                uuid: uuid,
                productName: productName,
                price: price,
                lat: lat,
                lon: lon,
                photo: photo,
                amount: amount,
                cat: cat
            }

        await fetch(`${apiUrl}/items/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(fetchedObject),
            headers: {
                "Content-Type": "application/json"
            },
        })
        navigate('/')
    }
    }


    const returnToAdminPanel = () : void => {
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

                            onChange={(e) => setProductName(String(e.target.value))}
                        />
                        <span> Product price:</span>
                        <input
                            className="addNewFormInput"
                            placeholder="Price"
                            type={"number"}
                            name={String(price)}
                            value={price}

                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        <span> Product location (latitude):</span>
                        <input
                            className="addNewFormInput"
                            placeholder="lat"
                            type={"number"}
                            name={String(lat)}
                            value={lat}

                            onChange={(e) => setLat(Number(e.target.value))}
                        />
                        <span>Product location (longitude):</span>
                        <input
                            className="addNewFormInput"
                            placeholder="lon"
                            type={"number"}
                            name={String(lon)}
                            value={lon}

                            onChange={(e) => setLon(Number(e.target.value))}
                        />
                        <span>Product picture path:</span>
                        <input
                            className="addNewFormInput"
                            placeholder="photo"
                            type={"text"}
                            name={photo}
                            value={photo}

                            onChange={(e) => setPhoto(String(e.target.value))}
                        />
                        <span>Number of products units</span>
                        <input
                            className="addNewFormInput"
                            placeholder="amount"
                            type={"number"}
                            name={String(amount)}
                            value={amount}

                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                        <span>Product category</span>
                        <input
                            className="addNewFormInput"
                            placeholder="cat"
                            type={"text"}
                            name={cat}
                            value={cat}

                            onChange={(e) => setCat(String(e.target.value))}
                        />
                    </div>
                    <button className="button-32"  type="submit"> Update product!</button>
                </form>
                <button className="button-32" onClick={returnToAdminPanel}>Return</button>
            </div>
        )

}
