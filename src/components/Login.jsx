import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Очищаем старую ошибку при новой попытке

        // 1. Извлекаем данные пользователя из localStorage
        const savedUserRaw = localStorage.getItem('user');

        // Проверяем, существует ли вообще зарегистрированный пользователь
        if (!savedUserRaw) {
            setError("Пользователь не найден. Зарегистрируйтесь!");
            return;
        }

        const savedUser = JSON.parse(savedUserRaw);

        // 2. СТРОГАЯ ПРОВЕРКА
        if (savedUser.email === email && savedUser.password === password) {
            alert("Вход выполнен успешно!");
            navigate('/'); // Только при совпадении уходим на главную
        } else {
            // Если данные не совпали, navigate('/') НЕ вызывается
            setError("Қате! Email немесе пароль дұрыс емес.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Вход</h2>

                {error && <p style={{
                    color: '#ff4d4d',
                    backgroundColor: 'rgba(255, 77, 77, 0.1)',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    fontSize: '14px'
                }}>{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email} // Добавлено для контроля компонента
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password} // Добавлено для контроля компонента
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="auth-btn">Войти</button>
            </form>
        </div>
    );
};

export default Login;