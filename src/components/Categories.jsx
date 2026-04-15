import React from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 'all', name: 'Все' },
        { id: 'Футбол', name: 'Футбол' }, // Бас әріппен!
        { id: 'Спорт', name: 'Спорт' },   // Бас әріппен!
        { id: 'Экипировка', name: 'Экипировка' },
        { id: 'Трансферы', name: 'Трансферы' }
    ];

    return (
        <div className="categories-filter-row" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '20px' }}>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => cat.id === 'all' ? navigate('/') : navigate(`/?cat=${cat.id}`)}
                    className="filter-btn"
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default Categories;