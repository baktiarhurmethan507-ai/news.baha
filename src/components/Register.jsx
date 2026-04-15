import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Сохраняем объект пользователя в строку JSON
        const userData = { email, password };
        localStorage.setItem('user', JSON.stringify(userData));

        alert("Регистрация успешна!");
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Регистрация</h2>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="auth-btn">Создать аккаунт</button>
            </form>
        </div>
    );
};

export default Register;