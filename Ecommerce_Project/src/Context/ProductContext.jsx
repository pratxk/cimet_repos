import { createContext, useState, useEffect } from "react";

export const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        // Update local storage whenever the cart changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // If the product exists, increment its quantity
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If it doesn't exist, add it to the cart with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const incrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCart((prevCart) => {
            return prevCart.map(item => {
                if (item.id === id) {
                    // If quantity is greater than 1, decrement it
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        // If quantity is 1, remove the item
                        return null;
                    }
                }
                return item;
            }).filter(Boolean); // Filter out null items
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    return (
        <productContext.Provider value={{
            cart, setCart, products, setProducts,
            addToCart, incrementQuantity, decrementQuantity, removeFromCart
        }}>
            {children}
        </productContext.Provider>
    );
};
