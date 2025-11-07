import React, { useEffect } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShop } from '../../Context/ShopContext'
import { useAuth } from '../../Context/AuthContext'
import { useTheme } from '../../Context/ThemeContext'

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState("home");
    const { getCartCount } = useShop();
    const { currentUser, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setMenu("home");
        } else if (path === '/shop') {
            setMenu("shop");
        } else if (path.startsWith('/mens')) {
            setMenu("men");
        } else if (path.startsWith('/womens')) {
            setMenu("women");
        } else if (path.startsWith('/kids')) {
            setMenu("kids");
        }
    }, [location]);

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={logo} alt="" />
                    <p>SHOPPER</p>
                </Link>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("home") } }><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("shop") } }><Link style={{ textDecoration: 'none' }} to='/shop'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("men") } }><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("women") } }><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") } }><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {currentUser ? (
                    <>
                        <span style={{ color: 'var(--color-text)', fontSize: '14px', marginRight: '12px' }}>
                            {currentUser.displayName || currentUser.email}
                        </span>
                        <Link to='/orders' style={{ textDecoration: 'none', marginRight: '12px' }}>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Orders</button>
                        </Link>
                        <button onClick={async () => {
                            await logout();
                            navigate('/');
                        }}>Logout</button>
                    </>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <button 
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    )}
                </button>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getCartCount()}</div>
            </div>
        </div>
    )
}

export default Navbar
