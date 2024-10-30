import { createContext, useState } from "react";


export const productContext = createContext();

export const ProductContextProvider = ({children}) =>{
    const [products, setProducts] = useState([]);
    return <productContext.Provider value={{products, setProducts}}>
        {children}
    </productContext.Provider>
}