import InfoPage from './InfoPage'

const Blog = () => {
    return (
        <InfoPage
            title="Blog"
            content="Stay updated with the latest fashion trends, styling tips, and news from Shopper."
            sections={[
                {
                    title: "Latest Articles",
                    list: [
                        "Spring 2024 Fashion Trends: What to Wear This Season",
                        "How to Build a Capsule Wardrobe: Essential Pieces Every Closet Needs",
                        "Sustainable Fashion: Making Ethical Choices",
                        "Style Guide: Dressing for Your Body Type",
                        "Fashion Week Highlights: Top Trends from the Runway"
                    ]
                },
                {
                    title: "Style Tips",
                    content: "Our blog features expert styling advice, trend forecasts, and inspiration to help you express your personal style. Check back weekly for new content."
                },
                {
                    title: "Subscribe",
                    content: "Subscribe to our newsletter to receive the latest blog posts, exclusive offers, and style inspiration delivered to your inbox."
                }
            ]}
        />
    )
}

export default Blog

