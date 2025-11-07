import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import allProducts from '../Components/Assets/all_product'
import Footer from '../Components/Footer/Footer'
import './Shop.css'

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('default')

    useEffect(() => {
        if (searchQuery) {
            setSelectedCategory('all')
        }
    }, [searchQuery])

    const filteredProducts = useMemo(() => {
        let filtered = selectedCategory === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category === selectedCategory)
        
        // Apply search filter if search query exists
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim()
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            )
        }
        
        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => a.new_price - b.new_price)
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => b.new_price - a.new_price)
        } else if (sortBy === 'name') {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        }
        
        return filtered
    }, [selectedCategory, sortBy, searchQuery])

    return (
        <div className="shop-page">
            <div className="shop-header">
                <h1 className="shop-title">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop All Products'}
                </h1>
                <p className="shop-subtitle">
                    {searchQuery 
                        ? `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`
                        : 'Discover our complete collection of premium fashion'
                    }
                </p>
                {searchQuery && (
                    <button 
                        className="clear-search-btn"
                        onClick={() => {
                            setSearchParams({})
                            setSelectedCategory('all')
                        }}
                    >
                        Clear Search
                    </button>
                )}
            </div>

            <div className="shop-controls">
                <div className="shop-filters">
                    <button 
                        className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Products
                    </button>
                    <button 
                        className={`filter-btn ${selectedCategory === 'men' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('men')}
                    >
                        Men
                    </button>
                    <button 
                        className={`filter-btn ${selectedCategory === 'women' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('women')}
                    >
                        Women
                    </button>
                    <button 
                        className={`filter-btn ${selectedCategory === 'kid' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('kid')}
                    >
                        Kids
                    </button>
                </div>
                <div className="shop-sort">
                    <label htmlFor="sort">Sort by:</label>
                    <select 
                        id="sort" 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                    </select>
                </div>
            </div>

            <div className="shop-results">
                <p className="results-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</p>
                {filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map((p) => (
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
                ) : (
                    <div className="no-products">
                        <p>No products found in this category.</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Shop
