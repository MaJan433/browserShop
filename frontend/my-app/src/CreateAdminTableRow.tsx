import {apiUrl} from "./api";
import React from 'react';

interface Props {
    result: {
        uuid: string,
        name?: string,
        price: number,
        lat: number,
        lon: number,
        photo: string,
        amount: number,
        cat: string
    }
}


export const CreateAdminTableRow = (props: Props) => {
    const removal = async () => {
        await fetch(`${apiUrl}/items/${props.result.uuid}`, {
            method: 'DELETE',
        });
    }

    return(
         <tr key={props.result.uuid}>
            <td>{props.result.uuid}</td>
            <td>{props.result.name}</td>
            <td>{(props.result.price).toFixed(2)}</td>
            <td>{props.result.photo}</td>
            <td>{props.result.amount}</td>
            <td>{props.result.cat}</td>
            <td>
                <a href="/checkOrders" onClick={removal}>🗑️</a>
            </td>
            <td>
                <a href={`/items/update/${props.result.uuid}`}>Update</a>
            </td>
        </tr>)
}
