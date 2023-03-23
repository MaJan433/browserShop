import {createContext} from 'react';
import * as React from "react";

export const SearchContext = createContext<{
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    minPrice: number;
    setMinPrice: React.Dispatch<React.SetStateAction<number>>;
    maxPrice: number;
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}>({
    search: "",
    setSearch: () => {},
    minPrice: 0,
    setMinPrice: () => {},
    maxPrice: Number.MAX_SAFE_INTEGER,
    setMaxPrice: () => {},
});
