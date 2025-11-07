import InfoPage from './InfoPage'

const Stores = () => {
    return (
        <InfoPage
            title="Store Locator"
            content="Visit us in person at one of our retail locations. Our friendly staff is ready to help you find the perfect pieces."
            sections={[
                {
                    title: "New York Flagship",
                    list: [
                        "123 Fashion Street, New York, NY 10001",
                        "Phone: (212) 555-0100",
                        "Hours: Mon-Sat 10AM-8PM, Sun 12PM-6PM"
                    ]
                },
                {
                    title: "Los Angeles Store",
                    list: [
                        "456 Style Boulevard, Los Angeles, CA 90001",
                        "Phone: (323) 555-0200",
                        "Hours: Mon-Sat 10AM-8PM, Sun 12PM-6PM"
                    ]
                },
                {
                    title: "Chicago Store",
                    list: [
                        "789 Trend Avenue, Chicago, IL 60601",
                        "Phone: (312) 555-0300",
                        "Hours: Mon-Sat 10AM-8PM, Sun 12PM-6PM"
                    ]
                },
                {
                    title: "Coming Soon",
                    content: "We're expanding! New stores opening in Miami, Seattle, and Boston. Stay tuned for updates."
                }
            ]}
        />
    )
}

export default Stores

