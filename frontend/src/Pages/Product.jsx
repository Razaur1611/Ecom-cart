import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import allProducts from '../Components/Assets/all_product'
import { useShop } from '../Context/ShopContext'
import star from '../Components/Assets/star_icon.png'
import starDull from '../Components/Assets/star_dull_icon.png'
import './Product.css'

const priceRowStyles = { display: 'flex', gap: '8px', alignItems: 'baseline' };

const pillButton = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
};

const Product = () => {
    const { productId } = useParams();
    const product = useMemo(() => allProducts.find(p => p.id === Number(productId)), [productId]);
    const { addToCart, products } = useShop();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('M');
    const [activeImage, setActiveImage] = useState(product.image);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const related = useMemo(() => {
        if (!product) return [];
        const sameCat = products.filter(p => p.category === product.category && p.id !== product.id);
        return sameCat.slice(0, 4);
    }, [products, product]);

    if (!product) return <div style={{ padding: '24px' }}>Product not found.</div>;

    const thumbnails = [product.image, product.image, product.image, product.image];

    return (
        <div className="pdp">
            <div className="pdp-breadcrumbs">
                <Link to={-1}>← Back</Link>
                <span className="sep">/</span>
                <Link to={`/${product.category === 'men' ? 'mens' : product.category === 'women' ? 'womens' : 'kids'}`}>
                    {product.category === 'men' ? 'Men' : product.category === 'women' ? 'Women' : 'Kids'}
                </Link>
                <span className="sep">/</span>
                <span>{product.name}</span>
            </div>

            <div className="pdp-main">
                <div className="pdp-gallery">
                    <div className="pdp-thumbs">
                        {thumbnails.map((src, idx) => (
                            <button key={idx} className={`pdp-thumb ${activeImage===src?'active':''}`} onClick={() => setActiveImage(src)}>
                                <img src={src} alt="thumb" />
                            </button>
                        ))}
                    </div>
                    <div className={`pdp-hero${imageLoaded?'':' loading'}`}>
                        <img src={activeImage} alt={product.name} onLoad={()=>setImageLoaded(true)} />
                    </div>
                </div>
                <div>
                    <h2 className="pdp-title">{product.name}</h2>
                    <div className="pdp-rating">
                        <img src={star} alt="*" width={18} height={18} />
                        <img src={star} alt="*" width={18} height={18} />
                        <img src={star} alt="*" width={18} height={18} />
                        <img src={star} alt="*" width={18} height={18} />
                        <img src={starDull} alt="." width={18} height={18} />
                        <span>(124 reviews)</span>
                    </div>
                    <div className="pdp-price" style={priceRowStyles}>
                        <span className="new">${product.new_price.toFixed(2)}</span>
                        <span className="old">${product.old_price.toFixed(2)}</span>
                    </div>
                    <div className="pdp-badges">
                        <span className="pdp-badge">Only at Shopper</span>
                        <span className="pdp-badge">Bestseller</span>
                        <span className="pdp-badge">Clean choice</span>
                    </div>

                    <div className="pdp-section">
                        <div className="pdp-label">Select size</div>
                        <div className="pdp-sizes">
                            {['S','M','L','XL'].map((s)=>(
                                <button key={s} className={`pdp-pill ${size===s?'active':''}`} onClick={()=>setSize(s)}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <div className="pdp-section">
                        <div className="pdp-label">Quantity</div>
                        <div className="pdp-qty">
                            <button className="pdp-pill" style={pillButton} onClick={()=>setQty(Math.max(1, qty-1))}>-</button>
                            <input className="pdp-input" type="number" min={1} value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)||1))} />
                            <button className="pdp-pill" style={pillButton} onClick={()=>setQty(qty+1)}>+</button>
                        </div>
                    </div>

                    <div className="pdp-cta">
                        <button className="pdp-btn primary" onClick={()=>{addToCart(product.id, qty);setShowToast(true);setTimeout(()=>setShowToast(false), 1800);}} aria-label="Add to bag">
                            Add to Bag
                        </button>
                        <Link to="/cart" style={{ textDecoration:'none' }}>
                            <button className="pdp-btn">Go to Cart</button>
                        </Link>
                        <button className="pdp-btn">♡ Save</button>
                    </div>

                    <div className="pdp-note">Free shipping on orders over $100. Easy 30-day returns.</div>

                    <div className="pdp-accordions">
                        <details className="pdp-accordion">
                            <summary>Details</summary>
                            <div className="content">Lightweight, everyday essential. Styled to match modern wardrobes. Composition varies by item.</div>
                        </details>
                        <details className="pdp-accordion">
                            <summary>How to use</summary>
                            <div className="content">Pair with your favorite denim or trousers. Machine wash cold. Do not bleach.</div>
                        </details>
                        <details className="pdp-accordion">
                            <summary>Materials</summary>
                            <div className="content">100% cotton equivalent. This is placeholder content for demo purposes.</div>
                        </details>
                    </div>
                </div>
            </div>

            {related.length>0 && (
                <div className="pdp-related">
                    <h3 className="pdp-label">Related products</h3>
                    <div className="pdp-related-grid">
                        {related.map((p)=>(
                            <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration:'none', color:'inherit' }}>
                                <div className="pdp-card">
                                    <img src={p.image} alt={p.name} />
                                    <div className="name">{p.name}</div>
                                    <div className="price" style={priceRowStyles}>
                                        <span className="new">${p.new_price.toFixed(2)}</span>
                                        <span className="old">${p.old_price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <div className="pdp-stickybar">
                <button className="pdp-btn">♡ Save</button>
                <button className="pdp-btn primary" onClick={()=>{addToCart(product.id, qty);setShowToast(true);setTimeout(()=>setShowToast(false), 1800);}}>
                    Add to Bag · ${product.new_price.toFixed(2)}
                </button>
            </div>

            {showToast && (
                <div className="pdp-toast" role="status" aria-live="polite">
                    Added to bag
                </div>
            )}
        </div>
    )
}

export default Product
