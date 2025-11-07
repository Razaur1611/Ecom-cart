import React from 'react'
import { Link } from 'react-router-dom'
import allProducts from '../Components/Assets/all_product'

const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
};

const cardStyles = {
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'left',
    background: 'var(--color-bg)',
};

const priceRowStyles = { display: 'flex', gap: '8px', alignItems: 'baseline' };

const ShopCategory = ({ category }) => {
    const items = allProducts.filter((p) => p.category === category);
    const title = category === 'men' ? 'Men' : category === 'women' ? 'Women' : 'Kids';
    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ margin: '12px 0 16px', color: 'var(--color-text)' }}>{title}</h2>
            <div style={gridStyles}>
                {items.map((p) => (
                    <div key={p.id} style={cardStyles}>
                        <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={p.image} alt={p.name} style={{ width: '100%', borderRadius: '6px' }} />
                            <div style={{ marginTop: '8px', fontWeight: 600, color: 'var(--color-text)' }}>{p.name}</div>
                            <div style={priceRowStyles}>
                                <span style={{ fontWeight: 700, color: 'var(--color-text)' }}>${p.new_price.toFixed(2)}</span>
                                <span style={{ color: 'var(--color-muted)', textDecoration: 'line-through' }}>${p.old_price.toFixed(2)}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopCategory

