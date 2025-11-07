import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import './Orders.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        // Sort by date, newest first
        const sortedOrders = savedOrders.sort((a, b) => 
            new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <div className="orders-header">
                    <h1 className="orders-title">My Orders</h1>
                </div>
                <div className="orders-empty">
                    <div className="orders-empty-icon">📦</div>
                    <h3>No orders yet</h3>
                    <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
                    <Link to="/shop" className="orders-empty-btn">Start Shopping</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="orders-header">
                <h1 className="orders-title">My Orders</h1>
                <p className="orders-subtitle">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
            </div>

            <div className="orders-content">
                <div className="orders-list">
                    {orders.map((order) => (
                        <div 
                            key={order.orderId} 
                            className={`order-card ${selectedOrder?.orderId === order.orderId ? 'active' : ''}`}
                            onClick={() => setSelectedOrder(selectedOrder?.orderId === order.orderId ? null : order)}
                        >
                            <div className="order-card-header">
                                <div>
                                    <h3 className="order-card-id">Order #{order.orderId}</h3>
                                    <p className="order-card-date">{formatDate(order.orderDate)}</p>
                                </div>
                                <div className="order-card-status">
                                    <span className="status-badge delivered">Delivered</span>
                                </div>
                            </div>
                            <div className="order-card-summary">
                                <div className="order-card-item-count">
                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                </div>
                                <div className="order-card-total">
                                    ${order.total.toFixed(2)}
                                </div>
                            </div>
                            <div className="order-card-address">
                                <span className="order-card-label">Delivery to:</span>
                                <span>{order.deliveryAddress.fullName}, {order.deliveryAddress.city}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedOrder && (
                    <div className="order-details">
                        <div className="order-details-header">
                            <h2>Order Details</h2>
                            <button 
                                className="order-details-close"
                                onClick={() => setSelectedOrder(null)}
                                aria-label="Close details"
                            >
                                ×
                            </button>
                        </div>

                        <div className="order-details-section">
                            <h3 className="order-details-section-title">Order Information</h3>
                            <div className="order-details-info">
                                <div className="order-details-row">
                                    <span className="order-details-label">Order ID:</span>
                                    <span className="order-details-value">{selectedOrder.orderId}</span>
                                </div>
                                <div className="order-details-row">
                                    <span className="order-details-label">Order Date:</span>
                                    <span className="order-details-value">{formatDate(selectedOrder.orderDate)}</span>
                                </div>
                                <div className="order-details-row">
                                    <span className="order-details-label">Status:</span>
                                    <span className="status-badge delivered">Delivered</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-details-section">
                            <h3 className="order-details-section-title">Items</h3>
                            <div className="order-items-list">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="order-item-info">
                                            <h4 className="order-item-name">{item.name}</h4>
                                            <p className="order-item-details">
                                                Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="order-item-total">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-details-section">
                            <h3 className="order-details-section-title">Delivery Address</h3>
                            <div className="order-address">
                                <p><strong>{selectedOrder.deliveryAddress.fullName}</strong></p>
                                <p>{selectedOrder.deliveryAddress.address}</p>
                                <p>
                                    {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} {selectedOrder.deliveryAddress.zipCode}
                                </p>
                                <p>{selectedOrder.deliveryAddress.country}</p>
                                <p style={{ marginTop: '8px' }}>
                                    <strong>Phone:</strong> {selectedOrder.deliveryAddress.phone}
                                </p>
                            </div>
                        </div>

                        {selectedOrder.paymentMethod && (
                            <div className="order-details-section">
                                <h3 className="order-details-section-title">Payment Method</h3>
                                <div className="order-payment-method">
                                    {selectedOrder.paymentMethod.type === 'card' ? (
                                        <div className="order-payment-card">
                                            <div className="order-payment-method-header">
                                                <span className="order-payment-method-icon">💳</span>
                                                <span className="order-payment-method-type">Credit/Debit Card</span>
                                            </div>
                                            <div className="order-payment-method-details">
                                                <div className="order-payment-method-row">
                                                    <span className="order-payment-method-label">Card Number:</span>
                                                    <span className="order-payment-method-value">
                                                        {selectedOrder.paymentMethod.cardNumber || `**** **** **** ${selectedOrder.paymentMethod.last4 || '****'}`}
                                                    </span>
                                                </div>
                                                {selectedOrder.paymentMethod.cardName && (
                                                    <div className="order-payment-method-row">
                                                        <span className="order-payment-method-label">Cardholder Name:</span>
                                                        <span className="order-payment-method-value">{selectedOrder.paymentMethod.cardName}</span>
                                                    </div>
                                                )}
                                                {selectedOrder.paymentMethod.expiryDate && (
                                                    <div className="order-payment-method-row">
                                                        <span className="order-payment-method-label">Expiry Date:</span>
                                                        <span className="order-payment-method-value">{selectedOrder.paymentMethod.expiryDate}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="order-payment-card">
                                            <div className="order-payment-method-header">
                                                <span className="order-payment-method-icon">🔵</span>
                                                <span className="order-payment-method-type">PayPal</span>
                                            </div>
                                            <div className="order-payment-method-details">
                                                <p className="order-payment-method-note">Payment processed through PayPal</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="order-details-section">
                            <h3 className="order-details-section-title">Payment Summary</h3>
                            <div className="order-payment-summary">
                                <div className="order-payment-row">
                                    <span className="order-payment-label">Subtotal:</span>
                                    <span className="order-payment-value">${selectedOrder.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="order-payment-row">
                                    <span className="order-payment-label">Shipping:</span>
                                    <span className="order-payment-value">
                                        {selectedOrder.shipping === 0 ? (
                                            <span style={{ color: '#16a34a' }}>Free</span>
                                        ) : (
                                            `$${selectedOrder.shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className="order-payment-row">
                                    <span className="order-payment-label">Tax:</span>
                                    <span className="order-payment-value">${selectedOrder.tax.toFixed(2)}</span>
                                </div>
                                <div className="order-payment-divider"></div>
                                <div className="order-payment-row total">
                                    <span className="order-payment-label">Total:</span>
                                    <span className="order-payment-value">${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Orders

