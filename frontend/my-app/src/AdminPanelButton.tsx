import React from 'react';
import {useNavigate} from "react-router-dom";
import {apiUrl} from "./api";
import {FormEvent} from "react";

export const AdminPanelButton = () => {

        const navigate  = useNavigate()
        const FormSubmit = async (e: FormEvent) => {
            e.preventDefault()
            const password = window.prompt("Enter admin password:")
            if (password != null){
                const res = await fetch(`${apiUrl}/checkHash`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            password: password
                        }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                if (res.status === 200){
                    alert('Welcome admin')
                    navigate('/adminPanel')
                } else {
                    alert('Invalid Password!')
                }
            } else {
                alert('Password cannot be empty!')
            }
        }
    return (
            <button className="button-92 button-93" onClick={FormSubmit}> Admin Panel</button>)
}



