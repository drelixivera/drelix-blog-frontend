import React, { useState, useEffect } from 'react';
import API from '../api'; 

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [commentInputs, setCommentInputs] = useState({}); // Tracks what you're typing for each specific post
    const [activeCommentBox, setActiveCommentBox] = useState({}); // Tracks which post's comments are expanded
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

    // 1. Handle Like Request
    const handleLike = async (postId) => {
    if (!token) return alert('You must be logged in to like posts!');
    try {
        const res = await API.put(`http://localhost:5000/api/posts/like/${postId}`, {}, {
            headers: { 'x-auth-token': token }
        });
        
        // CRITICAL LINE: This replaces the old post's likes array with the updated array from the backend
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: res.data } : post));
    } catch (err) {
        console.error("Error liking post:", err);
    }
};

    // 2. Handle Comment Request
    const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!token) return alert('You must be logged in to comment!');
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;

    try {
        // ADD http://localhost:5000 HERE 👇
        const res = await API.post(`http://localhost:5000/api/posts/comment/${postId}`, { text }, {
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
        <div className="bg-light min-vh-100 pb-5">
            <header className="bg-white border-bottom py-5 mb-5 text-center shadow-sm">
                <div className="container py-2">
                    <h1 className="fw-black text-dark display-5 mb-2">Welcome to the Dev Space</h1>
                    <p className="text-muted lead mx-auto mb-0" style={{ maxWidth: '550px' }}>
                        Engineering insights and full-stack milestones directly from the source code.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className="row g-4">
                    <main className="col-12 col-md-8">
                        {posts.length === 0 ? (
                            <div className="card text-center p-5 bg-white border shadow-sm rounded-3">
                                <p className="text-muted mb-0">No articles found. Be the pioneer and publish the first piece!</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <article key={post._id} className="card border-0 shadow-sm p-4 mb-4 bg-white rounded-3">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className="fw-bold text-primary btn-sm p-0">@{post.user?.username || 'anonymous'}</span>
                                        <span className="text-muted small">• {new Date(post.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                                    </div>
                                    <h2 className="h4 fw-bold text-dark mb-2">{post.title}</h2>
                                    <p className="text-secondary mb-3">{post.content}</p>
                                    
                                    {/* INTERACTIVE SOCIAL PANEL */}
                                    <div className="d-flex align-items-center gap-4 border-top pt-3 mt-2">
                                        {/* Like Button */}
                                        <button onClick={() => handleLike(post._id)} className="btn btn-link text-decoration-none p-0 text-danger fw-semibold d-flex align-items-center gap-1">
                                            <i className="bi bi-heart-fill"></i>
                                            <span className="text-dark small">{post.likes?.length || 0}</span>
                                        </button>

                                        {/* Comment Counter Toggle */}
                                        <button onClick={() => toggleComments(post._id)} className="btn btn-link text-decoration-none p-0 text-primary fw-semibold d-flex align-items-center gap-1">
                                            <i className="bi bi-chat-left-text-fill"></i>
                                            <span className="text-dark small">{post.comments?.length || 0} Comments</span>
                                        </button>
                                    </div>

                                    {/* COMMENTS DRAWER (Expands when clicked) */}
                                    {activeCommentBox[post._id] && (
                                        <div className="mt-4 border-top pt-3 bg-light p-3 rounded-3">
                                            {token && (
                                                <form onSubmit={(e) => handleCommentSubmit(e, post._id)} className="d-flex gap-2 mb-3">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm" 
                                                        placeholder="Write a comment..." 
                                                        value={commentInputs[post._id] || ''} 
                                                        onChange={(e) => handleTextChange(post._id, e.target.value)}
                                                    />
                                                    <button type="submit" className="btn btn-primary btn-sm px-3">Post</button>
                                                </form>
                                            )}

                                            <div className="comment-feed" style={{ maxHieght: '200px', overflowY: 'auto' }}>
                                                {post.comments?.length === 0 ? (
                                                    <p className="text-muted small mb-0">No comments yet. Start the conversation!</p>
                                                ) : (
                                                    post.comments?.map(comment => (
                                                        <div key={comment._id} className="border-bottom py-2">
                                                            <div className="d-flex justify-content-between">
                                                                <span className="fw-bold small text-dark">@{comment.username}</span>
                                                                <span className="text-muted extra-small" style={{ fontSize: '0.75rem' }}>
                                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-secondary small mb-0">{comment.text}</p>
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

                    <aside className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm p-4 bg-white rounded-3 position-sticky" style={{ top: '90px' }}>
                            <h3 className="h6 fw-bold text-dark uppercase mb-3">About The Platform</h3>
                            <p className="text-muted small mb-0">
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