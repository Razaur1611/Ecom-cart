import InfoPage from './InfoPage'

const About = () => {
    return (
        <InfoPage
            title="About Us"
            content="Shopper is a premium fashion destination dedicated to bringing you timeless pieces that elevate your everyday style. Founded with a passion for quality and design, we curate collections that blend modern aesthetics with classic elegance."
            sections={[
                {
                    title: "Our Mission",
                    content: "To make premium fashion accessible to everyone while maintaining the highest standards of quality, sustainability, and customer service."
                },
                {
                    title: "Our Values",
                    list: [
                        "Quality: We source only the finest materials and craftsmanship",
                        "Sustainability: Committed to ethical and environmentally responsible practices",
                        "Customer First: Your satisfaction is our top priority",
                        "Innovation: Constantly evolving to meet your needs"
                    ]
                },
                {
                    title: "Our Story",
                    content: "Since our founding, we've grown from a small boutique to a trusted name in fashion. We've built lasting relationships with customers worldwide by staying true to our core values and continuously improving our offerings."
                }
            ]}
        />
    )
}

export default About

