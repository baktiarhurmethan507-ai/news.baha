import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

const Header = () => {
    const { cartItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Функция для получения данных пользователя
    const checkUser = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            setUser(null);
        }
    };

    // 1. Проверка при загрузке и смене страницы
    useEffect(() => {
        checkUser();
    }, [location]);

    // 2. Слушатель для мгновенного обновления аватара (если изменили в Profile.jsx)
    useEffect(() => {
        window.addEventListener('storage', checkUser);
        // Кастомное событие для работы в пределах одной вкладки
        window.addEventListener('local-user-updated', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('local-user-updated', checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="header-wrapper">
            <header className="top-black-bar">
                <div className="header-left-flex">
                    <div
                        className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span><span></span><span></span>
                    </div>

                    <Link to="/notes" className="cart-icon-header">
                        📝 <span className="cart-count">{cartItems.length}</span>
                    </Link>
                </div>

                <div className="header-right-auth">
                    {user ? (
                        <div className="user-logged-in-container">
                            <Link to="/profile" className="header-profile-link">
                                <div className="header-avatar-mini">
                                    {user.photo ? (
                                        <img src={user.photo} alt="ava" />
                                    ) : (
                                        <span className="default-avatar-icon">👤</span>
                                    )}
                                </div>
                                <span className="header-email-text">{user.email}</span>
                            </Link>
                            <button onClick={handleLogout} className="logout-btn-header">
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="login-link">Войти</Link>
                            <Link to="/register" className="register-btn-header">Регистрация</Link>
                        </div>
                    )}
                </div>

                <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Басты бет</Link>
                    <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Категориялар</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>Біз туралы</Link>
                </nav>
            </header>

            <div className="gray-title-bar">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h2>ВСЕ НОВОСТИ</h2>
                </Link>
            </div>

            {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </div>
    );
};

export default Header;