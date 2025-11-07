import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import './InfoPage.css'

const InfoPage = ({ title, content, sections = [] }) => {
    return (
        <div className="info-page">
            <div className="info-container">
                <h1 className="info-title">{title}</h1>
                <div className="info-content">
                    {content && <div className="info-text">{content}</div>}
                    {sections.map((section, index) => (
                        <div key={index} className="info-section">
                            {section.title && <h2 className="info-section-title">{section.title}</h2>}
                            {section.content && <div className="info-section-content">{section.content}</div>}
                            {section.list && (
                                <ul className="info-list">
                                    {section.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div className="info-actions">
                    <Link to="/shop" className="info-btn">Continue Shopping</Link>
                    <Link to="/" className="info-btn secondary">Back to Home</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default InfoPage

