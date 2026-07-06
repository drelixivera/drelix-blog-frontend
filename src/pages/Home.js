import React, { useState, useEffect } from 'react';
import API from '../api'; 

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [commentInputs, setCommentInputs] = useState({}); 
    const [activeCommentBox, setActiveCommentBox] = useState({}); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try { 
                const res = await API.get('/api/posts');
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };
        fetchPosts();
    }, []);

    // 1. Handle Like Request (Fixed Endpoint)
    const handleLike = async (postId) => {
        if (!token) return alert('You must be logged in to like posts!');
        try {
            const res = await API.put(`/api/posts/like/${postId}`, {}, {
                headers: { 'x-auth-token': token }
            });
            setPosts(posts.map(post => post._id === postId ? { ...post, likes: res.data } : post));
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    // 2. Handle Comment Request (Fixed Endpoint)
    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();
        if (!token) return alert('You must be logged in to comment!');
        const text = commentInputs[postId];
        if (!text || text.trim() === '') return;

        try {
            const res = await API.post(`/api/posts/comment/${postId}`, { text }, {
                headers: { 'x-auth-token': token }
            });
            setPosts(posts.map(post => post._id === postId ? { ...post, comments: res.data } : post));
            setCommentInputs({ ...commentInputs, [postId]: '' });
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const handleTextChange = (postId, value) => {
        setCommentInputs({ ...commentInputs, [postId]: value });
    };

    const toggleComments = (postId) => {
        setActiveCommentBox({ ...activeCommentBox, [postId]: !activeCommentBox[postId] });
    };

    return (
        // 🌟 DEEP SATELLITE CANVAS BACKGROUND
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', minHeight: '100vh', paddingBottom: '5rem' }}>
            
            {/* 🌟 PREMIUM GLOWING HERO SECTION */}
            <header className="text-center py-5 mb-5 border-bottom border-secondary border-opacity-25 shadow-lg" 
                    style={{ background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(12px)' }}>
                <div className="container py-4">
                    <h1 className="fw-black display-4 mb-2 text-white text-gradient" style={{ letterSpacing: '-1px', fontWeight: '800' }}>
                        Welcome to the <span style={{ background: 'linear-gradient(45deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dev Space</span>
                    </h1>
                    <p className="text-light text-opacity-70 lead mx-auto mb-0" style={{ maxWidth: '550px', fontSize: '1.1rem' }}>
                        Engineering insights and full-stack milestones directly from the source code.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className="row g-4">
                    <main className="col-12 col-md-8">
                        {posts.length === 0 ? (
                            <div className="text-center p-5 border border-secondary border-opacity-25 rounded-3 text-light text-opacity-50"
                                 style={{ background: 'rgba(30, 41, 59, 0.3)', backdropFilter: 'blur(8px)' }}>
                                <p className="mb-0">No articles found. Be the pioneer and publish the first piece!</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                // 🌟 DARK MODE SHADOW CARDS
                                <article key={post._id} className="border border-secondary border-opacity-25 p-4 mb-4 rounded-3 text-light transition-all"
                                         style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                                    
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className="fw-bold btn-sm p-0" style={{ color: '#38bdf8' }}>@{post.user?.username || 'anonymous'}</span>
                                        <span className="text-light text-opacity-50 small">• {new Date(post.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                                    </div>
                                    <h2 className="h4 fw-bold text-white mb-2">{post.title}</h2>
                                    <p className="text-light text-opacity-70 mb-3" style={{ lineHeight: '1.6' }}>{post.content}</p>
                                    
                                    {/* INTERACTIVE SOCIAL PANEL */}
                                    <div className="d-flex align-items-center gap-4 border-top border-secondary border-opacity-25 pt-3 mt-2">
                                        {/* Like Button */}
                                        <button onClick={() => handleLike(post._id)} className="btn btn-link text-decoration-none p-0 text-danger fw-semibold d-flex align-items-center gap-2">
                                            <i className="bi bi-heart-fill"></i>
                                            <span className="text-light text-opacity-70 small">{post.likes?.length || 0}</span>
                                        </button>

                                        {/* Comment Counter Toggle */}
                                        <button onClick={() => toggleComments(post._id)} className="btn btn-link text-decoration-none p-0 fw-semibold d-flex align-items-center gap-2" style={{ color: '#818cf8' }}>
                                            <i className="bi bi-chat-left-text-fill"></i>
                                            <span className="text-light text-opacity-70 small">{post.comments?.length || 0} Comments</span>
                                        </button>
                                    </div>

                                    {/* COMMENTS DRAWER */}
                                    {activeCommentBox[post._id] && (
                                        <div className="mt-4 border-top border-secondary border-opacity-25 pt-3 p-3 rounded-3" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                                            {token && (
                                                <form onSubmit={(e) => handleCommentSubmit(e, post._id)} className="d-flex gap-2 mb-3">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm bg-dark text-white border-secondary border-opacity-50" 
                                                        placeholder="Write a comment..." 
                                                        style={{ focusColor: '#38bdf8' }}
                                                        value={commentInputs[post._id] || ''} 
                                                        onChange={(e) => handleTextChange(post._id, e.target.value)}
                                                    />
                                                    <button type="submit" className="btn btn-primary btn-sm px-3" style={{ background: '#4f46e5', border: 'none' }}>Post</button>
                                                </form>
                                            )}

                                            <div className="comment-feed" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                {post.comments?.length === 0 ? (
                                                    <p className="text-light text-opacity-50 small mb-0">No comments yet. Start the conversation!</p>
                                                ) : (
                                                    post.comments?.map(comment => (
                                                        <div key={comment._id} className="border-bottom border-secondary border-opacity-25 py-2">
                                                            <div className="d-flex justify-content-between">
                                                                <span className="fw-bold small text-white">@{comment.username}</span>
                                                                <span className="text-light text-opacity-40 extra-small" style={{ fontSize: '0.75rem' }}>
                                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-light text-opacity-70 small mb-0">{comment.text}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </article>
                            ))
                        )}
                    </main>

                    {/* 🌟 GLASSMORPHISM SIDEBAR CARD */}
                    <aside className="col-12 col-md-4">
                        <div className="card border border-secondary border-opacity-25 p-4 text-light position-sticky rounded-3" 
                             style={{ top: '90px', background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(8px)' }}>
                            <h3 className="h6 fw-bold uppercase mb-3" style={{ color: '#38bdf8', letterSpacing: '1px' }}>About The Platform</h3>
                            <p className="text-light text-opacity-70 small mb-0" style={{ lineHeight: '1.5' }}>
                                Built entirely using the MERN Stack. This platform demonstrates secure JWT architecture, database relations, and a responsive frontend system.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Home;