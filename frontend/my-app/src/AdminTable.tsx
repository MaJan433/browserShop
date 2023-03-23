import React from 'react';
import {useEffect, useState} from 'react'
import {CreateAdminTableRow} from "./CreateAdminTableRow";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "./api";
import {submitFormObject} from "./UpdateProductForm";

export const AdminTable = () => {

        const navigate = useNavigate()
        const [table, setTable] = useState<submitFormObject[] | null>(null);
        useEffect( () => {
            (async () => {
                const res = await fetch(`${apiUrl}/items`);
                const data = await res.json();
                setTable(data)
            })();
        },[]);

    const returnToAdminPanel =() => {
        navigate('/adminPanel')
    }

    if (table) {
        return (
            <>
                <table className="adminTable">
                    <tbody key="admin-table-body">
                    <tr>
                        <th>uuid</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Photo</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                    {table.map(object => (
                        <CreateAdminTableRow key={object.uuid} result={object} />
                    ))}
                    </tbody>
                </table>
                <button className="button-32" onClick={returnToAdminPanel}>Return</button>
            </>
        );

        }else {
            return (
                <h1> Loading data, please wait...</h1>
            )
        }

}