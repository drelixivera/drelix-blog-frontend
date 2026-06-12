import React, { useState } from 'react';
import API from '../api'; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.API('/api/register', formData);
            alert("Registered successfully!");
            navigate('/login'); 
        } catch (err) {
            console.error("Error:", err.response?.data);
            alert("Registration failed: " + (err.response?.data?.msg || "Server error"));
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="card border-0 shadow-sm p-4 w-100" style={{ maxWidth: '420px' }}>
                <div className="card-body">
                    <h2 className="fw-bold text-dark text-center mb-4">Create an Account</h2>
                    
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Username</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6" 
                                placeholder="Enter your username" 
                                name="username" 
                                value={username} 
                                onChange={onChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control form-control-lg fs-6" 
                                placeholder="name@example.com" 
                                name="email" 
                                value={email} 
                                onChange={onChange} 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-secondary">Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg fs-6" 
                                placeholder="Choose a secure password" 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 fs-6 fw-semibold mb-3">
                            Sign Up
                        </button>
                    </form>
                    
                    <p className="text-center text-muted small mb-0">
                        Already have an account? <Link to="/login" className="text-primary fw-medium text-decoration-none">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;