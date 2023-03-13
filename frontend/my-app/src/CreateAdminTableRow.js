import React from "react";

export const CreateAdminTableRow = (props) => {
    const removal = async () => {
        await fetch(`http://localhost:3001/items/${props.result.uuid}`, {
            method: 'DELETE',
        });
    }

    return(
         <tr key={props.result.uuid}>
            <td>{props.result.uuid}</td>
            <td>{props.result.name}</td>
            <td>{(props.result.price).toFixed(2)}</td>
            {/*<td>{props.result.lat}</td>*/}
            {/*<td>{props.result.lon}</td>*/}
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
