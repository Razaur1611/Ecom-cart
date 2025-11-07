import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { useAuth } from '../Context/AuthContext'
import './LoginSignup.css'

const LoginSignup = () => {
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (mode === 'signup' && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (mode === 'signup' && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmitted(true);
            setErrors({});
            
            try {
                let result;
                if (mode === 'login') {
                    result = await login(formData.email, formData.password);
                } else {
                    result = await signup(formData.email, formData.password, formData.name);
                }
                
                if (result.success) {
                    navigate('/');
                } else {
                    // Handle Firebase errors
                    const errorMessage = result.error;
                    if (errorMessage.includes('user-not-found')) {
                        setErrors({ email: 'No account found with this email' });
                    } else if (errorMessage.includes('wrong-password')) {
                        setErrors({ password: 'Incorrect password' });
                    } else if (errorMessage.includes('email-already-in-use')) {
                        setErrors({ email: 'Email is already registered' });
                    } else if (errorMessage.includes('weak-password')) {
                        setErrors({ password: 'Password should be at least 6 characters' });
                    } else if (errorMessage.includes('invalid-email')) {
                        setErrors({ email: 'Invalid email address' });
                    } else {
                        setErrors({ general: errorMessage });
                    }
                }
            } catch (error) {
                setErrors({ general: 'An unexpected error occurred. Please try again.' });
            } finally {
                setSubmitted(false);
            }
        }
    };

    return (
        <>
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1 className="login-title">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="login-subtitle">
                        {mode === 'login' 
                            ? 'Sign in to your account to continue shopping' 
                            : 'Join us and start shopping today'}
                    </p>
                </div>

                <div className="login-tabs">
                    <button 
                        className={`login-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => {
                            setMode('login');
                            setErrors({});
                            setFormData({ name: '', email: '', password: '' });
                        }}
                    >
                        Login
                    </button>
                    <button 
                        className={`login-tab ${mode === 'signup' ? 'active' : ''}`}
                        onClick={() => {
                            setMode('signup');
                            setErrors({});
                            setFormData({ name: '', email: '', password: '' });
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {errors.general && (
                        <div style={{ 
                            padding: '12px', 
                            background: '#fee', 
                            border: '1px solid #fcc', 
                            borderRadius: '8px', 
                            color: '#dc2626', 
                            fontSize: '14px',
                            marginBottom: '16px'
                        }}>
                            {errors.general}
                        </div>
                    )}
                    {mode === 'signup' && (
                        <div className="login-field">
                            <label htmlFor="name" className="login-label">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="login-input"
                                style={{ borderColor: errors.name ? '#dc2626' : undefined }}
                            />
                            {errors.name && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.name}</span>}
                        </div>
                    )}

                    <div className="login-field">
                        <label htmlFor="email" className="login-label">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="login-input"
                            style={{ borderColor: errors.email ? '#dc2626' : undefined }}
                        />
                        {errors.email && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.email}</span>}
                    </div>

                    <div className="login-field">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password" className="login-label">Password</label>
                            {mode === 'login' && (
                                <div className="login-forgot">
                                    <Link to="/forgot-password" className="login-forgot-link">
                                        Forgot password?
                                    </Link>
                                </div>
                            )}
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="login-input"
                            style={{ borderColor: errors.password ? '#dc2626' : undefined }}
                        />
                        {errors.password && <span style={{ color: '#dc2626', fontSize: '13px' }}>{errors.password}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="login-submit-btn"
                        disabled={submitted}
                    >
                        {submitted ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="login-divider">
                    <span>Or continue with</span>
                </div>

                <div className="login-social">
                    <button type="button" className="login-social-btn">
                        <span>🔵</span>
                        Continue with Google
                    </button>
                    <button type="button" className="login-social-btn">
                        <span>⚫</span>
                        Continue with Facebook
                    </button>
                </div>

                <p className="login-footer-text">
                    {mode === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button 
                                onClick={() => setMode('signup')}
                                className="login-footer-link"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button 
                                onClick={() => setMode('login')}
                                className="login-footer-link"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default LoginSignup
