import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import './Footer.css'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src={logo} alt="Shopper" />
                        <h3>SHOPPER</h3>
                    </div>
                    <p className="footer-description">
                        Your destination for premium fashion. Discover timeless pieces that elevate your everyday style.
                    </p>
                    <div className="footer-social">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">Twitter</a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="social-link">Pinterest</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Shop</h4>
                    <ul className="footer-links">
                        <li><Link to="/shop">All Products</Link></li>
                        <li><Link to="/mens">Men's Collection</Link></li>
                        <li><Link to="/womens">Women's Collection</Link></li>
                        <li><Link to="/kids">Kids' Collection</Link></li>
                        <li><Link to="/shop">New Arrivals</Link></li>
                        <li><Link to="/shop">Sale</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Customer Service</h4>
                    <ul className="footer-links">
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/shipping">Shipping Info</Link></li>
                        <li><Link to="/returns">Returns & Exchanges</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/size-guide">Size Guide</Link></li>
                        <li><Link to="/track-order">Track Your Order</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Company</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/stores">Store Locator</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/press">Press</Link></li>
                        <li><Link to="/sustainability">Sustainability</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Newsletter</h4>
                    <p className="footer-newsletter-text">
                        Subscribe to get special offers, new arrivals, and style tips.
                    </p>
                    <form onSubmit={handleSubscribe} className="footer-newsletter">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="footer-subscribe-btn">
                            {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                        </button>
                    </form>
                    <div className="footer-payment">
                        <p className="payment-label">We Accept</p>
                        <div className="payment-methods">
                            <span className="payment-icon">Visa</span>
                            <span className="payment-icon">Mastercard</span>
                            <span className="payment-icon">PayPal</span>
                            <span className="payment-icon">Amex</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} Shopper. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/cookies">Cookie Policy</Link>
                        <Link to="/accessibility">Accessibility</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

