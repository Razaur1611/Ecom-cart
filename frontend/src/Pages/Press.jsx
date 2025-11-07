import InfoPage from './InfoPage'

const Press = () => {
    return (
        <InfoPage
            title="Press"
            content="Media inquiries and press resources. We're happy to provide information, images, and interviews for editorial purposes."
            sections={[
                {
                    title: "Press Inquiries",
                    content: "For media inquiries, product samples, or interview requests, please contact our press team at press@shopper.com. We typically respond within 24-48 hours."
                },
                {
                    title: "Press Kit",
                    list: [
                        "Company fact sheet and history",
                        "High-resolution logo and brand assets",
                        "Product images and lifestyle photography",
                        "Executive bios and headshots",
                        "Recent press releases and news"
                    ]
                },
                {
                    title: "Recent Press",
                    list: [
                        "Featured in Vogue: 'The New Wave of Sustainable Fashion'",
                        "Forbes: 'How Shopper is Revolutionizing Online Retail'",
                        "Fashion Week Daily: 'Top 10 Brands to Watch'"
                    ]
                }
            ]}
        />
    )
}

export default Press

