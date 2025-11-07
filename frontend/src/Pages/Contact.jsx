import React, { useState } from 'react'
import Footer from '../Components/Footer/Footer'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
    }

    return (
        <div className="contact-page">
            <div className="contact-container">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p>support@shopper.com</p>
                            <p>info@shopper.com</p>
                        </div>
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p>1-800-SHOPPER</p>
                            <p>Mon-Fri: 9AM-6PM EST</p>
                        </div>
                        <div className="contact-item">
                            <h3>Address</h3>
                            <p>123 Fashion Street</p>
                            <p>New York, NY 10001</p>
                            <p>United States</p>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="contact-submit-btn">
                            {submitted ? '✓ Message Sent!' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact

