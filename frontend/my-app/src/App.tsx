import './App.css';
import React from 'react'
import {Grid} from "./Grid";
import {NavBar} from "./NavBar";
import {CategoriesSelector} from "./CategoriesSelector";
import {Route, Routes} from "react-router-dom";
import {Basket} from "./Basket";
import {AdminDesktop} from "./AdminDesktop";
import {NewProductForm} from "./NewProductForm";
import {AdminTable} from "./AdminTable";
import {UpdateProductForm} from "./UpdateProductForm";
import {useState} from "react";
import {SearchContext} from "./SearchContext";
import {OrderChecker} from "./OrderChecker";

function App() {
    const [search, setSearch] = useState('%')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(999999)

  return (

          <SearchContext.Provider value={{search, setSearch, minPrice,setMinPrice,maxPrice, setMaxPrice}}>
          <div className="navbar">
        <NavBar/>
          </div>
        <div className="bodyDiv">
            <CategoriesSelector/>
            <div className="ProductsGrid">
                <Grid/>
            </div>
        </div>

          <Routes>
              <Route path="/orders" element={<OrderChecker/>}/>
              <Route path="/BasketView" element={<Basket/>}/>
              <Route path="/AdminPanel" element={<AdminDesktop/>}/>
              <Route path="/AddNewProduct" element={<NewProductForm/>}/>
              <Route path="/checkOrders" element={<AdminTable/>}/>
              <Route path="/items/update/:uuid" element={<UpdateProductForm/>}/>

          </Routes>
          </SearchContext.Provider>

  );

}

export default App;
