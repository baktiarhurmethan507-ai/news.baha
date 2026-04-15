import React from 'react';
import { useCart } from './CartContext';
import PostCard from './PostCard';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="container">
            <h1>Менің сақталған жаңалықтарым</h1>
            {cartItems.length === 0 ? (
                <p>Корзина бос...</p>
            ) : (
                <div className="news-grid">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item-wrapper">
                            <PostCard item={item} />
                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', width: '100%' }}
                            >
                                Өшіру
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;