import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // 1. useSearchParams қостық
import PostCard from './PostCard';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams(); // 2. URL параметрлерін басқару
    const navigate = useNavigate();

    // URL-ден қазіргі категорияны аламыз (мысалы: ?category=Футбол)
    const selectedCategory = searchParams.get('category') || 'Все';

    const categories = ['Все', 'Футбол', 'Спорт', 'Экипировка', 'Трансферы'];

    useEffect(() => {
        fetch('https://f4df811b78214c5f.mokky.dev/post')
            .then((res) => res.json())
            .then((data) => {
                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(a.date.split('.').reverse().join('-'));
                    const dateB = new Date(b.date.split('.').reverse().join('-'));
                    return dateB - dateA;
                });
                setPosts(sortedData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка:", err);
                setLoading(false);
            });
    }, []);

    // Категорияны ауыстырғанда URL-ді жаңарту функциясы
    const handleCategoryChange = (cat) => {
        if (cat === 'Все') {
            setSearchParams({}); // URL-ді тазалайды: localhost:3000/
        } else {
            setSearchParams({ category: cat }); // URL-ге жазады: localhost:3000/?category=Футбол
        }
    };

    const filteredPosts = posts.filter((post) => {
        if (selectedCategory === 'Все') return true;
        return post.category === selectedCategory;
    });

    if (loading) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>Загрузка...</h2>;
    }

    return (
        <div className="news-container">
            {/* Категория батырмалары */}
            <div className="category-container" style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '20px 0' }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)} // 3. Функцияны шақыру
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Жаңалықтар торы */}
            <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/detail/${post.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <PostCard item={post} />
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#888' }}>Бұл категорияда жаңалықтар жоқ</p>
                )}
            </div>
        </div>
    );
};

export default PostList;