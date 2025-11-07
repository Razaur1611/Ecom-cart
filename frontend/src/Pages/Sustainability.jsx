import InfoPage from './InfoPage'

const Sustainability = () => {
    return (
        <InfoPage
            title="Sustainability"
            content="We're committed to making fashion more sustainable. Our sustainability initiatives focus on reducing environmental impact, supporting ethical labor practices, and creating a circular economy."
            sections={[
                {
                    title: "Our Commitment",
                    list: [
                        "Carbon Neutral Shipping: All orders are shipped carbon-neutral",
                        "Sustainable Materials: Increasing use of organic and recycled materials",
                        "Ethical Sourcing: Fair labor practices throughout our supply chain",
                        "Waste Reduction: Minimizing packaging and implementing recycling programs"
                    ]
                },
                {
                    title: "Environmental Impact",
                    content: "We're working towards becoming carbon negative by 2025. Our initiatives include renewable energy, sustainable packaging, and offset programs."
                },
                {
                    title: "Circular Fashion",
                    content: "We encourage customers to care for their garments properly and offer repair services. We're also developing a take-back program for end-of-life products."
                },
                {
                    title: "Transparency",
                    content: "We believe in transparency about our practices. Our annual sustainability report details our progress and goals."
                }
            ]}
        />
    )
}

export default Sustainability

