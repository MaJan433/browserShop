import React from 'react';
import {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {apiUrl} from "./api";

interface Category {
    uuid: string,
    productName: string,
    price: number,
    lat: number,
    lon: number,
    photo: string,
    amount: number,
    cat: string
}

type Categories = Category[]

export const CategoriesSelector = () => {

    const [categories, setCategories] = useState<Categories | null>(null)
    const [cookies, setCookie, removeCookie] = useCookies(['basketCookie', 'filterCookie'])

    useEffect( () => {
        (async () => {
            const res = await fetch(`${apiUrl}/items`);
            const data = await res.json();
            setCategories(data)
        })();
    },[]);
    const categoryArray : string[] = []
    if (categories){
    for (let category of categories){

        if (!categoryArray.includes(category.cat)){
        categoryArray.push(category.cat)
        }
    }
    categoryArray.push('Remove filters')
    }
    const createCategoriesCookie = (category: string) =>{
        setCookie('filterCookie', category)
    }
    const divs = categoryArray.map((category) => {
        return <div key={category}
        onClick={() => createCategoriesCookie(category)}
        >
            <span>{category}</span>
        </div>;
    });

    if (categories){

    return (

    categories && <div className="categories">
        <span>Choose one category:</span>
        {divs}</div>
)
    } else {
        return <div>Please wait, categories are loaded from database...</div>
    }
}