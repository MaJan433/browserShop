import {createContext} from 'react';

export const SearchContext = createContext({
    search: '',
    setSearch: ()=> {},
    minPrice: 0,
    setMinPrice: ()=> {},
    maxPrice: Number.MAX_SAFE_INTEGER,
    setMaxPrice: ()=> {}
});
