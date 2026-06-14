import React, { useState } from 'react';
import API from '../api'; 
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/api/login', formData);
            localStorage.setItem('token', res.data.token);
            alert("Logged in successfully!");
            window.location.href = "/"; 
        } catch (err) {
            console.error(err.response?.data);
            alert("Login failed: " + (err.response?.data?.msg || "Invalid credentials"));
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="card border-0 shadow-sm p-4 w-100" style={{ maxWidth: '420px' }}>
                <div className="card-body">
                    <h2 className="fw-bold text-dark text-center mb-4">Welcome Back</h2>
                    
                    <form onSubmit={onSubmit}>
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
                                placeholder="Enter your password" 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 fs-6 fw-semibold mb-3">
                            Log In
                        </button>
                    </form>
                    
                    <p className="text-center text-muted small mb-0">
                        New to the platform? <Link to="/register" className="text-primary fw-medium text-decoration-none">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

// Triggering fresh production deployment build update