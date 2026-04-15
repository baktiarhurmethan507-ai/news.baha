import React, { useState, useEffect } from 'react';
import '../assets/style/style.css';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetch(`https://f4df811b78214c5f.mokky.dev/comments?postId=${postId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setComments(data);
                } else {
                    setComments([]);
                }
            })
            .catch(err => {
                console.error("Пікірлерді жүктеу қатесі:", err);
                setComments([]);
            });
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userComment || !userName) return alert("Атыңызды және пікіріңізді жазыңыз!");

        const newComment = {
            postId: postId,
            name: userName,
            text: userComment,
            date: new Date().toLocaleString()
        };

        try {
            const res = await fetch('https://f4df811b78214c5f.mokky.dev/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            });
            const data = await res.json();
            setComments(prev => [...prev, data]);
            setUserComment("");
            setUserName("");
        } catch (err) {
            console.error("Пікір жіберу қатесі:", err);
        }
    };

    return (
        <div className="comments-container">
            <h3 className="comments-header">Пікірлер ({Array.isArray(comments) ? comments.length : 0})</h3>

            <form onSubmit={handleSubmit} className="comments-form">
                <input
                    className="comments-input"
                    type="text"
                    placeholder="Атыңыз"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <textarea
                    className="comments-textarea"
                    placeholder="Пікіріңізді жазыңыз..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                />
                <button type="submit" className="comments-button">Жіберу</button>
            </form>

            <div className="comments-list">
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map(c => (
                        <div key={c.id} className="comment-card">
                            <div className="comment-info">
                                <strong className="comment-user">{c.name}</strong>
                                <span className="comment-time">{c.date}</span>
                            </div>
                            <p className="comment-content">{c.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">Әзірге пікірлер жоқ.</p>
                )}
            </div>
        </div>
    );
};

export default Comments;