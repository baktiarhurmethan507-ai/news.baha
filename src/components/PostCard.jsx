import React from 'react';
import { useCart } from './CartContext';

const PostCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <div className="post-card">
            <div className="post-card-content">
                <span className="post-category-tag">{item.category}</span>
                <h3 className="post-title">{item.title}</h3>
                <p className="post-description">{item.description}</p>

                <div className="post-footer">
                    <span className="post-date">{item.date}</span>
                    <button
                        className="favorite-btn-card"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item); // Логика сол қалпы қалады
                        }}
                    >
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;