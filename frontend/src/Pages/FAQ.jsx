import InfoPage from './InfoPage'

const FAQ = () => {
    return (
        <InfoPage
            title="Frequently Asked Questions"
            content="Find answers to the most common questions about shopping with us."
            sections={[
                {
                    title: "Ordering",
                    list: [
                        "Q: How do I place an order? A: Simply browse our products, add items to your cart, and proceed to checkout.",
                        "Q: Can I modify my order? A: Orders can be modified within 1 hour of placement. Contact us immediately if you need changes.",
                        "Q: Do you offer gift wrapping? A: Yes, gift wrapping is available at checkout for an additional fee."
                    ]
                },
                {
                    title: "Payment",
                    list: [
                        "Q: What payment methods do you accept? A: We accept all major credit cards, PayPal, and Apple Pay.",
                        "Q: Is my payment information secure? A: Yes, all transactions are encrypted and secure.",
                        "Q: When will I be charged? A: You'll be charged when your order ships."
                    ]
                },
                {
                    title: "Shipping & Delivery",
                    list: [
                        "Q: How long does shipping take? A: Standard shipping takes 5-7 business days. Express options are available.",
                        "Q: Do you ship internationally? A: Yes, we ship to over 50 countries worldwide.",
                        "Q: Can I track my order? A: Yes, you'll receive a tracking number via email once your order ships."
                    ]
                },
                {
                    title: "Returns & Exchanges",
                    list: [
                        "Q: What is your return policy? A: We offer 30-day returns on unworn items in original condition.",
                        "Q: How do I return an item? A: Log into your account, select the order, and print a prepaid return label.",
                        "Q: Are returns free? A: Yes, we provide prepaid return labels for all returns."
                    ]
                }
            ]}
        />
    )
}

export default FAQ

