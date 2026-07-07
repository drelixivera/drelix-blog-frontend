import React, { useState } from 'react';
import API from '../api'; 
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await API.post('/api/posts', 
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
        <div className="d-flex align-items-center justify-content-center flex-grow-1 py-5" style={{ background: 'transparent' }}>
            
            {/* INJECT ANIMATION & FOCUS STYLES DYNAMICALLY */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .create-card {
                    animation: fadeInUp 0.5s ease-out forwards;
                    background: rgba(30, 41, 59, 0.4) !important;
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                }
                .form-control:focus {
                    background-color: rgba(15, 23, 42, 0.6) !important;
                    border-color: #38bdf8 !important;
                    box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.25) !important;
                    color: white !important;
                }
                .form-control::placeholder {
                    color: rgba(255, 255, 255, 0.3) !important;
                }
            `}</style>

            <div className="card create-card p-4 rounded-3 text-light w-100" style={{ maxWidth: '640px' }}>
                <div className="card-body">
                    <h2 className="fw-bold text-center text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
                        Publish a New <span style={{ background: 'linear-gradient(45deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Article</span>
                    </h2>
                    
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-light text-opacity-75">Article Title</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6 bg-dark bg-opacity-50 text-white border-secondary border-opacity-25" 
                                placeholder="Give your post a catchy headline" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-light text-opacity-75">Content Body</label>
                            <textarea 
                                className="form-control fs-6 bg-dark bg-opacity-50 text-white border-secondary border-opacity-25" 
                                placeholder="What's on your mind? Share your engineering milestones..." 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                                rows="6"
                                style={{ lineHeight: '1.6' }}
                                required 
                            />
                        </div>

                        <button type="submit" className="btn w-100 fw-bold py-2.5 text-white fs-6 transition-all"
                                style={{ background: 'linear-gradient(45deg, #4f46e5, #6366f1)', border: 'none' }}>
                            Publish Post 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;