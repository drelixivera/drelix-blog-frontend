import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                // Grab the token from localStorage
                const token = localStorage.getItem('token');
                
                // Send the authenticated GET request to our new endpoint
                const res = await axios.get('http://localhost:5000/api/posts/me', {
                    headers: { 'x-auth-token': token }
                });
                
                setMyPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, []);

    const handleDelete = async (postId) => {
        // this shows a native confirmation dialog box befofre wiping data
        if (window.confirm("Are you sure you want to delete this post permanently?")) {
            try {
                const token = localStorage.getItem('token');

                //this hit the backend delete route endpoint
                await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                    headers: { 'x-auth-token': token }
                });
                // Optimistic UI update: 
                // Instantly filter out the deleted post from the state so it disappear from the screen without reloading
                setMyPosts(myPosts.filter(post => post._id !== postId));
            } catch (err) {
                console.error("Error deleting post:", err);
                alert("Failed to delete the post. Try again.");
            }
        }
    }

    return (
        <div className="container mt-5 pt-4" style={{ minHeight: '85vh', color: 'white' }}>
            {/* Profile Header Card */}
            <div className="card p-4 mb-5 auth-card border-0">
                <div className="d-flex align-items-center gap-4">
                    <div 
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark bg-sky-gradient"
                        style={{ width: '80px', height: '80px', fontSize: '2rem', background: 'linear-gradient(135deg, #38bdf8, #0369a1)' }}
                    >
                        {myPosts[0]?.user?.username?.[0].toUpperCase() || 'D'}
                    </div>
                    <div>
                        <h2 className="mb-1 text-white">{myPosts[0]?.user?.username || 'Developer Dashboard'}</h2>
                        <p className="text-muted mb-0">Managing {myPosts.length} posts</p>
                    </div>
                </div>
            </div>

            <h3 className="mb-4 text-white border-bottom border-secondary pb-2">Posts Insights</h3>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-info" role="status"></div>
                </div>
            ) : myPosts.length === 0 ? (
                <div className="text-center p-5 rounded auth-card">
                    <p className="text-muted fs-5">You haven't published any posts yet.</p>
                    <Link to="/create" className="btn btn-info px-4 rounded-pill text-white fw-bold">
                        Write Your First Post
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {myPosts.map((post) => (
                        <div key={post._id} className="col-md-6 col-lg-4">
                            <div className="card h-100 auth-card border-0 d-flex flex-column justify-content-between p-4" style={{ transition: 'transform 0.2s' }}>
                                <div>
                                    <h4 className="text-white mb-2 text-truncate">{post.title}</h4>
                                    <p className="text-muted small mb-3">
                                        Posted on {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-secondary text-truncate" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                                        {post.content}
                                    </p>
                                </div>
                                
                                {/* Management Actions Interface */}
                                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
                                    <span className="text-info small"> {post.likes?.length || 0} Likes</span>
                                    <div className="d-flex gap-2">
                                        <Link to={`/edit-post/${post._id}`} className="btn btn-outline-warning btn-sm rounded-pill px-3">
                                            Edit
                                        </Link>
                                        <button 
                                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                            onClick={() => handleDelete(post._id)} 
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;