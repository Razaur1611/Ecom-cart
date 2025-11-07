import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import data_product from '../Components/Assets/data'
import new_collections from '../Components/Assets/new_collections'
import allProducts from '../Components/Assets/all_product'
import banner_mens from '../Components/Assets/banner_mens.png'
import banner_women from '../Components/Assets/banner_women.png'
import banner_kids from '../Components/Assets/banner_kids.png'
import Footer from '../Components/Footer/Footer'
import './Shop.css'

const Landing = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearchResults, setShowSearchResults] = useState(false)
    const navigate = useNavigate()
    const searchRef = useRef(null)

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return []
        const query = searchQuery.toLowerCase().trim()
        return allProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        )
    }, [searchQuery])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        setShowSearchResults(e.target.value.trim().length > 0)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false)
            }
        }

        if (showSearchResults) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showSearchResults])

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-left">
                    <div className="eyebrow">New Season</div>
                    <h1 className="title">Elevate your everyday style.</h1>
                    <div className="subtitle">Timeless pieces with modern silhouettes crafted for comfort. Discover your perfect fit.</div>
                    
                    <div className="hero-search" ref={searchRef}>
                        <form className="search-form" onSubmit={handleSearch}>
                            <div className="search-wrapper">
                                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search for clothes, categories..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setShowSearchResults(searchQuery.trim().length > 0)}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="search-clear"
                                        onClick={() => {
                                            setSearchQuery('')
                                            setShowSearchResults(false)
                                        }}
                                        aria-label="Clear search"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            <button type="submit" className="search-btn">Search</button>
                        </form>
                        {showSearchResults && (
                            <div className="search-results-dropdown">
                                {searchResults.length > 0 ? (
                                    <>
                                        <div className="search-results-header">
                                            <span className="search-results-count">{searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found</span>
                                            <button 
                                                className="search-view-all"
                                                onClick={() => navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)}
                                            >
                                                View All →
                                            </button>
                                        </div>
                                        <div className="search-results-list">
                                            {searchResults.slice(0, 5).map((product) => (
                                                <Link
                                                    key={product.id}
                                                    to={`/product/${product.id}`}
                                                    className="search-result-item"
                                                    onClick={() => {
                                                        setSearchQuery('')
                                                        setShowSearchResults(false)
                                                    }}
                                                >
                                                    <img src={product.image} alt={product.name} className="search-result-image" />
                                                    <div className="search-result-info">
                                                        <div className="search-result-name">{product.name}</div>
                                                        <div className="search-result-category">{product.category}</div>
                                                        <div className="search-result-price">${product.new_price.toFixed(2)}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="search-no-results">
                                        <p>No products found for "{searchQuery}"</p>
                                        <Link to="/shop" className="search-browse-all">Browse All Products</Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="hero-cta">
                        <Link to="/womens"><button className="btn primary">Shop Women</button></Link>
                        <Link to="/mens"><button className="btn">Shop Men</button></Link>
                        <Link to="/shop"><button className="btn">Shop All</button></Link>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={banner_women} alt="Hero" />
                </div>
            </section>

            <section className="brands">
                <div className="brand">Premium Quality</div>
                <div className="brand">Fast Shipping</div>
                <div className="brand">30-Day Returns</div>
                <div className="brand">Secure Checkout</div>
            </section>

            <section className="categories">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    <Link to="/mens" className="category-card">
                        <img src={banner_mens} alt="Men" />
                        <div className="label">Men</div>
                    </Link>
                    <Link to="/womens" className="category-card">
                        <img src={banner_women} alt="Women" />
                        <div className="label">Women</div>
                    </Link>
                    <Link to="/kids" className="category-card">
                        <img src={banner_kids} alt="Kids" />
                        <div className="label">Kids</div>
                    </Link>
                </div>
            </section>

            <section className="grid">
                <h2 className="section-title">Featured</h2>
                <div className="product-grid">
                    {data_product.map((p) => (
                        <Link key={p.id} to={`/product/${p.id}`} className="card">
                            <img src={p.image} alt={p.name} />
                            <div className="name">{p.name}</div>
                            <div className="price">
                                <span className="new">${p.new_price.toFixed(2)}</span>
                                <span className="old">${p.old_price.toFixed(2)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="grid">
                <h2 className="section-title">New Collections</h2>
                <div className="product-grid">
                    {new_collections.map((p) => (
                        <Link key={p.id} to={`/product/${p.id}`} className="card">
                            <img src={p.image} alt={p.name} />
                            <div className="name">{p.name}</div>
                            <div className="price">
                                <span className="new">${p.new_price.toFixed(2)}</span>
                                <span className="old">${p.old_price.toFixed(2)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="newsletter">
                <h3 className="section-title">Stay in the know</h3>
                <div className="note">Get style stories, drops, and exclusive offers. No spam.</div>
                <form onSubmit={handleSubscribe}>
                    <input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="btn primary" type="submit">
                        {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                    </button>
                </form>
            </section>

            <Footer />
        </div>
    )
}

export default Landing

