import InfoPage from './InfoPage'

const Shipping = () => {
    return (
        <InfoPage
            title="Shipping Information"
            content="We offer fast and reliable shipping to customers worldwide. All orders are processed and shipped within 1-2 business days."
            sections={[
                {
                    title: "Shipping Methods",
                    list: [
                        "Standard Shipping (5-7 business days) - $10",
                        "Express Shipping (2-3 business days) - $20",
                        "Overnight Shipping (1 business day) - $35",
                        "Free Shipping on orders over $100"
                    ]
                },
                {
                    title: "International Shipping",
                    content: "We ship to over 50 countries worldwide. International orders typically take 10-14 business days. Customs and import duties may apply."
                },
                {
                    title: "Order Tracking",
                    content: "Once your order ships, you'll receive a tracking number via email. You can track your order status in real-time."
                },
                {
                    title: "Shipping Restrictions",
                    content: "Some items may have shipping restrictions based on your location. We'll notify you if any items in your cart cannot be shipped to your address."
                }
            ]}
        />
    )
}

export default Shipping

