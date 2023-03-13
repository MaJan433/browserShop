import react, {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
export const CategoriesSelector = () => {

    const [categories, setCategories] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['basketCookie', 'filterCookie'])

    useEffect( () => {
        (async () => {
            const res = await fetch('http://localhost:3001/items');
            const data = await res.json();
            setCategories(data)
        })();
    },[]);
    const categoryArray = []
    for (let category of categories){

        if (!categoryArray.includes(category.cat)){
        categoryArray.push(category.cat)
        }
    }
    categoryArray.push('Remove filters')

    const createCategoriesCookie = (category) =>{
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