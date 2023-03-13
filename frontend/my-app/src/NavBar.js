
import {NavBarButton} from "./NavBarButton";
import {AdminPanelBttn} from "./AdminPanelBttn";
import {Searcher} from "./Searcher";
import {BasketButton} from "./BasketButton";

export const NavBar = () => {


    return (
        <>
            <div className="SearchDiv">
                <Searcher/>
            </div>
            <div className="AdminPanelDiv">
                <AdminPanelBttn/>
            </div>

            <div className="BasketDiv">
                <BasketButton/>
            </div>
        </>
    )
}