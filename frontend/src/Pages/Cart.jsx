import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../Context/ShopContext'
import Footer from '../Components/Footer/Footer'
import './Cart.css'

const Cart = () => {
    const navigate = useNavigate();
    const { products, cartItemsByProductId, setItemQuantity, removeFromCart, getCartTotal, clearCart } = useShop();
    const items = Object.entries(cartItemsByProductId).map(([id, qty]) => {
        const product = products.find(p => p.id === Number(id));
        return product ? { product, qty } : null;
    }).filter(Boolean);

    const [deliveryAddress, setDeliveryAddress] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [addressErrors, setAddressErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState({
        type: 'card',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        billingAddress: ''
    });
    const [paymentErrors, setPaymentErrors] = useState({});

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (addressErrors[name]) {
            setAddressErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentMethod(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (paymentErrors[name]) {
            setPaymentErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const validateAddress = () => {
        const errors = {};
        
        if (!deliveryAddress.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }
        if (!deliveryAddress.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^[\d\s\+\-\(\)]+$/.test(deliveryAddress.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }
        if (!deliveryAddress.address.trim()) {
            errors.address = 'Street address is required';
        }
        if (!deliveryAddress.city.trim()) {
            errors.city = 'City is required';
        }
        if (!deliveryAddress.state.trim()) {
            errors.state = 'State/Province is required';
        }
        if (!deliveryAddress.zipCode.trim()) {
            errors.zipCode = 'ZIP/Postal code is required';
        }
        if (!deliveryAddress.country.trim()) {
            errors.country = 'Country is required';
        }

        setAddressErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePayment = () => {
        const errors = {};
        
        if (paymentMethod.type === 'card') {
            if (!paymentMethod.cardNumber.trim()) {
                errors.cardNumber = 'Card number is required';
            } else if (paymentMethod.cardNumber.replace(/\s/g, '').length < 13) {
                errors.cardNumber = 'Please enter a valid card number';
            }
            if (!paymentMethod.cardName.trim()) {
                errors.cardName = 'Cardholder name is required';
            }
            if (!paymentMethod.expiryDate.trim()) {
                errors.expiryDate = 'Expiry date is required';
            } else if (!/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
                errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
            }
            if (!paymentMethod.cvv.trim()) {
                errors.cvv = 'CVV is required';
            } else if (!/^\d{3,4}$/.test(paymentMethod.cvv)) {
                errors.cvv = 'Please enter a valid CVV';
            }
        } else if (paymentMethod.type === 'paypal') {
            // PayPal validation can be added here if needed
        }

        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleCheckout = async () => {
        if (items.length === 0) return;

        if (!validateAddress()) {
            // Scroll to first error
            const firstErrorField = document.querySelector('.cart-delivery-input[style*="border-color: #dc2626"]');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        if (!validatePayment()) {
            // Scroll to first payment error
            const firstErrorField = document.querySelector('.cart-payment-input[style*="border-color: #dc2626"]');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setIsProcessing(true);

        // Simulate checkout process
        try {
            // Mask sensitive payment data for storage
            const maskedCardNumber = paymentMethod.type === 'card' 
                ? `**** **** **** ${paymentMethod.cardNumber.replace(/\s/g, '').slice(-4)}`
                : null;

            // In a real app, you would send this data to your backend
            const orderData = {
                items: items.map(({ product, qty }) => ({
                    productId: product.id,
                    name: product.name,
                    price: product.new_price,
                    quantity: qty
                })),
                deliveryAddress,
                paymentMethod: {
                    type: paymentMethod.type,
                    cardNumber: maskedCardNumber,
                    cardName: paymentMethod.type === 'card' ? paymentMethod.cardName : null,
                    expiryDate: paymentMethod.type === 'card' ? paymentMethod.expiryDate : null,
                    last4: paymentMethod.type === 'card' ? paymentMethod.cardNumber.replace(/\s/g, '').slice(-4) : null
                },
                subtotal,
                shipping,
                tax,
                total,
                orderDate: new Date().toISOString(),
                orderId: `ORD-${Date.now()}`
            };

            // Save to localStorage (in real app, send to backend)
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            existingOrders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(existingOrders));

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setCheckoutSuccess(true);
            
            // Clear cart after successful checkout and redirect to orders
            setTimeout(() => {
                clearCart();
                navigate('/orders');
            }, 2000);

        } catch (error) {
            alert('Checkout failed. Please try again.');
            console.error('Checkout error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const isAddressComplete = Object.values(deliveryAddress).every(val => val.trim() !== '');
    const isPaymentComplete = paymentMethod.type === 'paypal' || (
        paymentMethod.type === 'card' &&
        paymentMethod.cardNumber.trim() !== '' &&
        paymentMethod.cardName.trim() !== '' &&
        paymentMethod.expiryDate.trim() !== '' &&
        paymentMethod.cvv.trim() !== ''
    );

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>

            {items.length === 0 ? (
                <div className="cart-empty">
                    <div className="cart-empty-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/shop" className="cart-empty-btn">Continue Shopping</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-main-content">
                        <div className="cart-items">
                        {items.map(({ product, qty }) => (
                            <div key={product.id} className="cart-item">
                                <Link to={`/product/${product.id}`}>
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="cart-item-image"
                                    />
                                </Link>
                                <div className="cart-item-info">
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <h3 className="cart-item-name">{product.name}</h3>
                                    </Link>
                                    <div className="cart-item-price">${product.new_price.toFixed(2)} each</div>
                                </div>
                                <div className="cart-quantity">
                                    <button 
                                        className="cart-quantity-btn"
                                        onClick={() => setItemQuantity(product.id, Math.max(1, qty - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <input 
                                        type="number" 
                                        min={1} 
                                        value={qty} 
                                        onChange={(e) => setItemQuantity(product.id, Math.max(1, Number(e.target.value) || 1))}
                                        className="cart-quantity-input"
                                        aria-label="Quantity"
                                    />
                                    <button 
                                        className="cart-quantity-btn"
                                        onClick={() => setItemQuantity(product.id, qty + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    ${(product.new_price * qty).toFixed(2)}
                                </div>
                                <button 
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(product.id, qty)}
                                    aria-label="Remove item"
                                    title="Remove item"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <div className="cart-actions">
                            <button onClick={clearCart} className="cart-clear-btn">
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="cart-delivery">
                        <h2 className="cart-delivery-title">📍 Delivery Address</h2>
                        <form className="cart-delivery-form" onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                            <div className="cart-delivery-grid">
                                <div className="cart-delivery-field">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="Full Name *"
                                        value={deliveryAddress.fullName}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.fullName ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.fullName && <span className="cart-delivery-error">{addressErrors.fullName}</span>}
                                </div>
                                <div className="cart-delivery-field">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Phone Number *"
                                        value={deliveryAddress.phone}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.phone ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.phone && <span className="cart-delivery-error">{addressErrors.phone}</span>}
                                </div>
                                <div className="cart-delivery-field cart-delivery-field-full">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Street Address *"
                                        value={deliveryAddress.address}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.address ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.address && <span className="cart-delivery-error">{addressErrors.address}</span>}
                                </div>
                                <div className="cart-delivery-field">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="City *"
                                        value={deliveryAddress.city}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.city ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.city && <span className="cart-delivery-error">{addressErrors.city}</span>}
                                </div>
                                <div className="cart-delivery-field">
                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        placeholder="State *"
                                        value={deliveryAddress.state}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.state ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.state && <span className="cart-delivery-error">{addressErrors.state}</span>}
                                </div>
                                <div className="cart-delivery-field">
                                    <input
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        placeholder="ZIP Code *"
                                        value={deliveryAddress.zipCode}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.zipCode ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.zipCode && <span className="cart-delivery-error">{addressErrors.zipCode}</span>}
                                </div>
                                <div className="cart-delivery-field">
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        placeholder="Country *"
                                        value={deliveryAddress.country}
                                        onChange={handleAddressChange}
                                        className="cart-delivery-input"
                                        style={{ borderColor: addressErrors.country ? '#dc2626' : undefined }}
                                    />
                                    {addressErrors.country && <span className="cart-delivery-error">{addressErrors.country}</span>}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="cart-payment">
                        <h2 className="cart-payment-title">Payment Method</h2>
                        <div className="cart-payment-tabs">
                            <button
                                type="button"
                                className={`cart-payment-tab ${paymentMethod.type === 'card' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod(prev => ({ ...prev, type: 'card' }))}
                            >
                                💳 Credit/Debit Card
                            </button>
                            <button
                                type="button"
                                className={`cart-payment-tab ${paymentMethod.type === 'paypal' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod(prev => ({ ...prev, type: 'paypal' }))}
                            >
                                🔵 PayPal
                            </button>
                        </div>

                        {paymentMethod.type === 'card' ? (
                            <form className="cart-payment-form">
                                <div className="cart-payment-field">
                                    <label htmlFor="cardNumber" className="cart-payment-label">Card Number *</label>
                                    <input
                                        id="cardNumber"
                                        name="cardNumber"
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={paymentMethod.cardNumber}
                                        onChange={(e) => {
                                            const formatted = formatCardNumber(e.target.value);
                                            setPaymentMethod(prev => ({ ...prev, cardNumber: formatted }));
                                            if (paymentErrors.cardNumber) {
                                                setPaymentErrors(prev => ({ ...prev, cardNumber: '' }));
                                            }
                                        }}
                                        maxLength={19}
                                        className="cart-payment-input"
                                        style={{ borderColor: paymentErrors.cardNumber ? '#dc2626' : undefined }}
                                    />
                                    {paymentErrors.cardNumber && <span className="cart-delivery-error">{paymentErrors.cardNumber}</span>}
                                </div>
                                <div className="cart-payment-field">
                                    <label htmlFor="cardName" className="cart-payment-label">Cardholder Name *</label>
                                    <input
                                        id="cardName"
                                        name="cardName"
                                        type="text"
                                        placeholder="JOHN DOE"
                                        value={paymentMethod.cardName}
                                        onChange={handlePaymentChange}
                                        className="cart-payment-input"
                                        style={{ borderColor: paymentErrors.cardName ? '#dc2626' : undefined }}
                                    />
                                    {paymentErrors.cardName && <span className="cart-delivery-error">{paymentErrors.cardName}</span>}
                                </div>
                                <div className="cart-payment-row">
                                    <div className="cart-payment-field">
                                        <label htmlFor="expiryDate" className="cart-payment-label">Expiry Date *</label>
                                        <input
                                            id="expiryDate"
                                            name="expiryDate"
                                            type="text"
                                            placeholder="MM/YY"
                                            value={paymentMethod.expiryDate}
                                            onChange={(e) => {
                                                const formatted = formatExpiryDate(e.target.value);
                                                setPaymentMethod(prev => ({ ...prev, expiryDate: formatted }));
                                                if (paymentErrors.expiryDate) {
                                                    setPaymentErrors(prev => ({ ...prev, expiryDate: '' }));
                                                }
                                            }}
                                            maxLength={5}
                                            className="cart-payment-input"
                                            style={{ borderColor: paymentErrors.expiryDate ? '#dc2626' : undefined }}
                                        />
                                        {paymentErrors.expiryDate && <span className="cart-delivery-error">{paymentErrors.expiryDate}</span>}
                                    </div>
                                    <div className="cart-payment-field">
                                        <label htmlFor="cvv" className="cart-payment-label">CVV *</label>
                                        <input
                                            id="cvv"
                                            name="cvv"
                                            type="text"
                                            placeholder="123"
                                            value={paymentMethod.cvv}
                                            onChange={handlePaymentChange}
                                            maxLength={4}
                                            className="cart-payment-input"
                                            style={{ borderColor: paymentErrors.cvv ? '#dc2626' : undefined }}
                                        />
                                        {paymentErrors.cvv && <span className="cart-delivery-error">{paymentErrors.cvv}</span>}
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="cart-payment-paypal">
                                <p className="cart-payment-note">You will be redirected to PayPal to complete your payment.</p>
                                <div className="cart-payment-paypal-info">
                                    <p>🔵 Secure payment through PayPal</p>
                                    <p>✓ No need to enter card details</p>
                                    <p>✓ Fast and secure checkout</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="cart-summary">
                        <h2 className="cart-summary-title">Order Summary</h2>
                        <div className="cart-summary-row">
                            <span className="cart-summary-label">Subtotal</span>
                            <span className="cart-summary-value">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span className="cart-summary-label">Shipping</span>
                            <span className="cart-summary-value">
                                {shipping === 0 ? (
                                    <span style={{ color: '#16a34a' }}>Free</span>
                                ) : (
                                    `$${shipping.toFixed(2)}`
                                )}
                            </span>
                        </div>
                        {shipping > 0 && (
                            <div className="cart-summary-row" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                                <span>Free shipping on orders over $100</span>
                            </div>
                        )}
                        <div className="cart-summary-row">
                            <span className="cart-summary-label">Tax</span>
                            <span className="cart-summary-value">${tax.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-divider"></div>
                        <div className="cart-summary-total">
                            <span className="cart-summary-total-label">Total</span>
                            <span className="cart-summary-total-value">${total.toFixed(2)}</span>
                        </div>
                        {checkoutSuccess ? (
                            <div className="cart-success-message">
                                <div className="cart-success-icon">✓</div>
                                <div>
                                    <h3>Order Placed Successfully!</h3>
                                    <p>Thank you for your purchase. Redirecting to orders...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button 
                                    className="cart-checkout-btn" 
                                    onClick={handleCheckout}
                                    disabled={items.length === 0 || isProcessing || !isAddressComplete || !isPaymentComplete}
                                >
                                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                                </button>
                                {items.length > 0 && (!isAddressComplete || !isPaymentComplete) && (
                                    <p className="cart-checkout-note">
                                        {!isAddressComplete && !isPaymentComplete 
                                            ? 'Please fill in all delivery address and payment fields to proceed'
                                            : !isAddressComplete 
                                            ? 'Please fill in all delivery address fields to proceed'
                                            : 'Please complete the payment method to proceed'}
                                    </p>
                                )}
                            </>
                        )}
                        <Link to="/shop" className="cart-continue-btn">
                            Continue Shopping
                        </Link>
                    </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Cart
