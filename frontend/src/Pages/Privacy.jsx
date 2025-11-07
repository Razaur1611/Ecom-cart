import InfoPage from './InfoPage'

const Privacy = () => {
    return (
        <InfoPage
            title="Privacy Policy"
            content="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information."
            sections={[
                {
                    title: "Information We Collect",
                    list: [
                        "Personal information (name, email, address) when you create an account or place an order",
                        "Payment information processed securely through our payment partners",
                        "Browsing data and preferences to improve your shopping experience",
                        "Communication records when you contact customer service"
                    ]
                },
                {
                    title: "How We Use Your Information",
                    list: [
                        "To process and fulfill your orders",
                        "To communicate about your orders and account",
                        "To send marketing communications (with your consent)",
                        "To improve our website and services",
                        "To prevent fraud and ensure security"
                    ]
                },
                {
                    title: "Data Protection",
                    content: "We use industry-standard security measures to protect your personal information. Your payment information is encrypted and never stored on our servers."
                },
                {
                    title: "Your Rights",
                    content: "You have the right to access, update, or delete your personal information at any time. Contact us at privacy@shopper.com to exercise these rights."
                },
                {
                    title: "Cookies",
                    content: "We use cookies to enhance your browsing experience. You can manage cookie preferences in your browser settings."
                }
            ]}
        />
    )
}

export default Privacy

