import React from 'react';
import {Link} from "react-router-dom";

export const BasketButton = () => {


    return (
        <Link to={'/BasketView'}><button className="button-92"> Basket </button></Link>
    )
}