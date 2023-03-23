import React from 'react';
import {useContext, useState, FormEvent} from "react";
import {SearchContext} from "./SearchContext";

export const Searcher = () => {

    const {setSearch,setMinPrice,setMaxPrice} = useContext(SearchContext)
    const [searchValue, setSearchValue] = useState('')
    const [minPriceValue, setMinPriceValue] = useState(0)
    const [maxPriceValue, setMaxPriceValue] = useState(Number.MAX_SAFE_INTEGER)

    const addSearchEntryToGlobalVariables = async (e: FormEvent) => {
        e.preventDefault()
        // @ts-ignore
        setSearch(searchValue)
        // @ts-ignore
        setMaxPrice(maxPriceValue)
        // @ts-ignore
        setMinPrice(minPriceValue)
    }

    return (
            <div className="searcherDiv">
                <form className="searcherForm">
                    <input value={searchValue}
                        onChange={(e) => setSearchValue(String(e.target.value))}
                        placeholder="What are you looking for?"
                    />
                    <input

                        onChange={(e) => setMinPriceValue(Number(e.target.value === "" ? 0 : Number(e.target.value)))}
                        placeholder="min price"
                        type={"number"}
                    />
                    <input
                        onChange={(e) => setMaxPriceValue(Number(e.target.value === "" ? 9999999 : Number(e.target.value)))}
                        placeholder="max price"
                        type={"number"}
                    />
                    <button style={{width:"70px", height:"45px", borderRadius:"5px"}} onClick={addSearchEntryToGlobalVariables} type={"submit"} className="button-32"> Search! </button>
                </form>
        </div>

    )
}