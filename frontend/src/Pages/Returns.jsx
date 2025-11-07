import InfoPage from './InfoPage'

const Returns = () => {
    return (
        <InfoPage
            title="Returns & Exchanges"
            content="We want you to love your purchase. If you're not completely satisfied, we offer hassle-free returns and exchanges within 30 days of purchase."
            sections={[
                {
                    title: "Return Policy",
                    list: [
                        "Items must be unworn, unwashed, and in original condition",
                        "Original tags and packaging must be included",
                        "Returns must be initiated within 30 days of delivery",
                        "Final sale items cannot be returned"
                    ]
                },
                {
                    title: "How to Return",
                    list: [
                        "Log into your account and go to Orders",
                        "Select the item(s) you want to return",
                        "Print the prepaid return label",
                        "Package your return and drop it off at any carrier location"
                    ]
                },
                {
                    title: "Exchange Process",
                    content: "To exchange an item, please return the original item and place a new order for the desired size or style. We'll process your refund once we receive the returned item."
                },
                {
                    title: "Refund Timeline",
                    content: "Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to the original payment method."
                }
            ]}
        />
    )
}

export default Returns

