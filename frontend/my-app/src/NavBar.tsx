
import React from 'react';
import {AdminPanelButton} from "./AdminPanelButton";
import {Searcher} from "./Searcher";
import {BasketButton} from "./BasketButton";

export const NavBar = () => {


    return (
        <>
            <div className="SearchDiv">
                <Searcher/>
            </div>
            <div className="AdminPanelDiv">
                <AdminPanelButton/>
            </div>

            <div className="BasketDiv">
                <BasketButton/>
            </div>
        </>
    )
}