import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // LocalStorage-тан сақталған деректерді алу
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Себет өзгерген сайын оны LocalStorage-қа сақтап отыру
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Себетке қосу функциясы
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const isExist = prevItems.find((i) => i.id === item.id);
            if (isExist) return prevItems; // Егер бар болса, қоспаймыз
            return [...prevItems, item];
        });
    };

    // Себеттен өшіру функциясы
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Контекстті қолдану үшін ыңғайлы hook
export const useCart = () => useContext(CartContext);