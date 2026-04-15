import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments'; // ЖАҢА: Компонентті импорттау
import '../assets/style/style.css';

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://f4df811b78214c5f.mokky.dev/post/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPost(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Ошибка запроса:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <h2 className="loading-text">Загрузка...</h2>;

    if (!post || post.error) {
        return (
            <div className="error-container">
                <h2>Новость не найдена</h2>
                <button onClick={() => navigate('/')}>Вернуться на главную</button>
            </div>
        );
    }

    return (
        <div className="light-detail-page">
            <div className="container">
                <button className="white-back-btn" onClick={() => navigate(-1)}>
                    <span>← Назад</span>
                </button>

                <div className="post-detail-content">
                    <p className="detail-category">{post.category}</p>
                    <h1 className="detail-title">{post.title}</h1>
                    <p className="detail-date">{post.date}</p>

                    <div className="share-section">
                        <span>Бөлісу:</span>
                        <button className="share-btn whatsapp">WhatsApp</button>
                        <button className="share-btn telegram">Telegram</button>
                    </div>

                    {post.imageUrl && (
                        <div className="detail-img-wrapper">
                            <img src={post.imageUrl} alt={post.title} onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    )}

                    <div className="detail-description">
                        {post.quote && (
                            <blockquote className="news-quote">
                                "{post.quote}"
                            </blockquote>
                        )}
                        <p className="full-text">{post.description}</p>
                        {post.text2 && <p className="full-text">{post.text2}</p>}
                    </div>

                    <p className="detail-source">Источник: <span className="author">Fabrizio Romano</span></p>

                    {/* ЖАҢА: ПІКІРЛЕР БӨЛІМІ ОСЫ ЖЕРДЕ */}
                    <div className="comments-wrapper">
                        <Comments postId={id} />
                    </div>

                    <div className="related-section">
                        <h3>Ұқсас жаңалықтар</h3>
                        <div className="related-grid">
                            <div className="related-card">
                                <h4>Трансферлік нарықтағы басты өзгерістер</h4>
                            </div>
                            <div className="related-card">
                                <h4>Жаңа маусымның кестесі жарияланды</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailPage;