import InfoPage from './InfoPage'

const Terms = () => {
    return (
        <InfoPage
            title="Terms of Service"
            content="Please read these terms carefully before using our website. By using Shopper, you agree to these terms."
            sections={[
                {
                    title: "Acceptance of Terms",
                    content: "By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our website."
                },
                {
                    title: "Use of Website",
                    list: [
                        "You must be at least 18 years old to make a purchase",
                        "You agree to provide accurate and complete information",
                        "You are responsible for maintaining the security of your account",
                        "You may not use the website for any illegal or unauthorized purpose"
                    ]
                },
                {
                    title: "Products and Pricing",
                    content: "We reserve the right to modify prices and product availability at any time. We strive for accuracy but errors may occur. We reserve the right to cancel orders due to pricing errors."
                },
                {
                    title: "Intellectual Property",
                    content: "All content on this website, including text, graphics, logos, and images, is the property of Shopper and protected by copyright laws."
                },
                {
                    title: "Limitation of Liability",
                    content: "Shopper shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or products."
                }
            ]}
        />
    )
}

export default Terms

