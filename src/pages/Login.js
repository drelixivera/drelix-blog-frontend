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
        <div className="d-flex align-items-center justify-content-center flex-grow-1 py-5" style={{ background: 'transparent' }}>
            
            {/* INJECT ANIMATION STYLES DYNAMICALLY */}
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
                .auth-card {
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
            `}</style>

            <div className="card auth-card p-4 rounded-3 text-light w-100" style={{ maxWidth: '420px' }}>
                <div className="card-body p-2">
                    <h2 className="fw-bold text-center text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
                        Welcome <span style={{ background: 'linear-gradient(45deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Back</span>
                    </h2>
                    
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-light text-opacity-75">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control form-control-lg fs-6 bg-dark bg-opacity-50 text-white border-secondary border-opacity-25" 
                                placeholder="name@example.com" 
                                name="email" 
                                value={email} 
                                onChange={onChange} 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-light text-opacity-75">Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg fs-6 bg-dark bg-opacity-50 text-white border-secondary border-opacity-25" 
                                placeholder="Enter your password" 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn w-100 fw-bold py-2 text-white mb-3 transition-all"
                                style={{ background: 'linear-gradient(45deg, #4f46e5, #6366f1)', border: 'none' }}>
                            Log In
                        </button>
                    </form>
                    
                    <p className="text-center text-light text-opacity-50 small mb-0 mt-2">
                        New to the platform? <Link to="/register" style={{ color: '#38bdf8', textDecoration: 'none' }} className="fw-semibold">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

// Triggering fresh production deployment build update