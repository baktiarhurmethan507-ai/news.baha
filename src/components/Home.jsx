import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from './PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();

    // URL-ден 'cat' параметрін аламыз
    const categoryQuery = searchParams.get('cat');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Негізгі сілтеме
                let fetchUrl = 'https://f4df811b78214c5f.mokky.dev/post';

                // Егер санат таңдалса және ол 'all' болмаса, сүзгі қосамыз
                // Мұнда '?' белгісі тек санат болғанда ғана қосылады
                if (categoryQuery && categoryQuery !== 'all') {
                    fetchUrl += `?category=${categoryQuery}`;
                }

                const res = await fetch(fetchUrl);
                const data = await res.json();

                // Деректердің массив екенін тексеріп барып орнатамыз
                setPosts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Жүктеу қатесі:", err);
                setPosts([]); // Қате болса, бос тізім көрсетеміз
            }
        };

        fetchPosts();
    }, [categoryQuery]); // Санат өзгергенде деректер жаңарып отырады

    return (
        <div className="home-container">
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>БАРЛЫҚ ЖАҢАЛЫҚТАР</h2>
            <div className="posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
                {posts.length > 0 ? (
                    posts.map(item => <PostCard key={item.id} item={item} />)
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', marginTop: '50px' }}>
                        Кешіріңіз, бұл категорияда әзірге жаңалықтар жоқ.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;