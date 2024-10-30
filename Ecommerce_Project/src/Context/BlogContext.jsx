import { createContext, useState, useEffect } from "react";

export const blogContext = createContext();

export const BlogContextProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);


    return (
        <blogContext.Provider value={{
            blogs,setBlogs
        }}>
            {children}
        </blogContext.Provider>
    );
};
