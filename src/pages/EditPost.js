import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const { id } = useParams(); // Grabs the post ID from the URL link
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the post's current data when the page loads to pre-fill the form fields
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts`);
                // Find our specific post out of the returned posts array
                const singlePost = res.data.find(p => p._id === id);
                
                if (singlePost) {
                    setTitle(singlePost.title);
                    setContent(singlePost.content);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching post data for editing:", err);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            
            // Send the updated data package up to our fixed PUT route
            await axios.put(`http://localhost:5000/api/posts/${id}`, 
                { title, content },
                { headers: { 'x-auth-token': token } }
            );

            // Redirect back to the dashboard upon successful modification update
            navigate('/dashboard');
        } catch (err) {
            console.error("Update request failed:", err);
            alert("Failed to save changes. Verify ownership or connection.");
        }
    };

    if (loading) {
        return (
            <div className="text-center my-5 pt-5">
                <div className="spinner-border text-info" role="status"></div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-4 d-flex justify-content-center" style={{ minHeight: '85vh' }}>
            <div className="card p-5 auth-card border-0 w-100" style={{ maxWidth: '650px' }}>
                <h2 className="text-white mb-4 text-center">Refine Your Milestone Insights</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label text-secondary fw-bold small uppercase">Post Title</label>
                        <input 
                            type="text" 
                            className="form-control bg-dark text-white border-secondary rounded p-3" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label text-secondary fw-bold small uppercase">Content Insights</label>
                        <textarea 
                            className="form-control bg-dark text-white border-secondary rounded p-3" 
                            rows="7"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="d-flex gap-3 justify-content-end mt-4">
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary px-4 rounded-pill text-white"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-info px-4 rounded-pill text-white fw-bold">
                            Save Mutations
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;