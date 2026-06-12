import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post('/api/posts', 
                { title, content }, 
                { headers: { 'x-auth-token': token } } 
            );
            alert("Post Created!");
            navigate('/'); 
        } catch (err) {
            alert(err.response?.data?.msg || "Post failed - are you logged in?");
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="card border-0 shadow-sm p-4 w-100" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h2 className="fw-bold text-dark text-center mb-4">Publish a New Article</h2>
                    
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Article Title</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6" 
                                placeholder="Give your post a catchy headline" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-secondary">Content Body</label>
                            <textarea 
                                className="form-control fs-6" 
                                placeholder="What's on your mind? Markdown and plain text accepted..." 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                                rows="6"
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 fs-6 fw-semibold">
                            Publish Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;