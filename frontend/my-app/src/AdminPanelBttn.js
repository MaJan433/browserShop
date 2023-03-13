import React from "react";

export const AdminPanelBttn = () => {


        const FormSubmit = async (e) => {
            e.preventDefault()
            const password = window.prompt("Enter admin password:")
            if (password != null){
                const res = await fetch('http://localhost:3001/checkHash', {
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
                    window.location.href = "http://localhost:3000/adminPanel"
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



