import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedUser = { ...user, photo: reader.result };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Генерируем событие для обновления аватара в Header
            window.dispatchEvent(new Event("storage"));
            alert("Фото успешно сохранено!");
        };
        reader.readAsDataURL(file);
    };

    if (!user) return null;

    return (
        <div className="profile-page-container">
            <div className="auth-form profile-card">
                <h2>Профиль пользователя</h2>

                <div className="avatar-upload-section">
                    <div className="profile-avatar-preview">
                        {user.photo ? (
                            <img src={user.photo} alt="Avatar" />
                        ) : (
                            <div className="empty-avatar">👤</div>
                        )}
                    </div>

                    <label htmlFor="avatar-input" className="auth-btn file-label">
                        Изменить фото
                    </label>
                    <input
                        type="file"
                        id="avatar-input"
                        accept="image/*"
                        onChange={handleFileUpload}
                        hidden
                    />
                </div>

                <div className="profile-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p className="auth-status-text">Статус: Авторизован</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;