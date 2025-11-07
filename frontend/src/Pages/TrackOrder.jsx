import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import './TrackOrder.css'

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState(null)
    const [error, setError] = useState('')

    const handleTrack = (e) => {
        e.preventDefault()
        if (!orderId.trim()) {
            setError('Please enter an order ID')
            return
        }

        // Get orders from localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
        const foundOrder = orders.find(o => o.orderId === orderId.trim())

        if (foundOrder) {
            setOrder(foundOrder)
            setError('')
        } else {
            setOrder(null)
            setError('Order not found. Please check your order ID and try again.')
        }
    }

    const getOrderStatus = (orderDate) => {
        const daysSinceOrder = Math.floor((new Date() - new Date(orderDate)) / (1000 * 60 * 60 * 24))
        if (daysSinceOrder < 1) return { status: 'Processing', color: '#f59e0b' }
        if (daysSinceOrder < 3) return { status: 'Shipped', color: '#3b82f6' }
        if (daysSinceOrder < 7) return { status: 'In Transit', color: '#3b82f6' }
        return { status: 'Delivered', color: '#10b981' }
    }

    return (
        <div className="track-order-page">
            <div className="track-order-container">
                <h1 className="track-order-title">Track Your Order</h1>
                <p className="track-order-subtitle">Enter your order ID to track your shipment</p>

                <form className="track-order-form" onSubmit={handleTrack}>
                    <input
                        type="text"
                        placeholder="Enter Order ID (e.g., ORD-1234567890)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="track-order-input"
                    />
                    <button type="submit" className="track-order-btn">Track Order</button>
                </form>

                {error && <div className="track-order-error">{error}</div>}

                {order && (
                    <div className="order-tracking">
                        <div className="order-header">
                            <div>
                                <h2>Order #{order.orderId}</h2>
                                <p className="order-date">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className="order-status-badge" style={{ backgroundColor: getOrderStatus(order.orderDate).color + '20', color: getOrderStatus(order.orderDate).color }}>
                                {getOrderStatus(order.orderDate).status}
                            </div>
                        </div>

                        <div className="order-details">
                            <div className="order-section">
                                <h3>Items</h3>
                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <span>{item.name}</span>
                                            <span>Qty: {item.quantity}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="order-section">
                                <h3>Shipping Address</h3>
                                <p>{order.deliveryAddress.fullName}</p>
                                <p>{order.deliveryAddress.address}</p>
                                <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
                                <p>{order.deliveryAddress.country}</p>
                            </div>

                            <div className="order-section">
                                <h3>Order Total</h3>
                                <div className="order-total">
                                    <div className="total-row">
                                        <span>Subtotal:</span>
                                        <span>${order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Shipping:</span>
                                        <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Tax:</span>
                                        <span>${order.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row total">
                                        <span>Total:</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="track-order-actions">
                            <Link to="/orders" className="track-order-link">View All Orders</Link>
                            <Link to="/shop" className="track-order-link secondary">Continue Shopping</Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default TrackOrder

