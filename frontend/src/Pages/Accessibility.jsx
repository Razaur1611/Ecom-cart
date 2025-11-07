import InfoPage from './InfoPage'

const Accessibility = () => {
    return (
        <InfoPage
            title="Accessibility"
            content="We're committed to making our website accessible to everyone. We strive to meet WCAG 2.1 Level AA standards."
            sections={[
                {
                    title: "Our Commitment",
                    content: "Shopper is committed to providing an accessible website experience for all users, including those with disabilities. We continuously work to improve accessibility."
                },
                {
                    title: "Accessibility Features",
                    list: [
                        "Keyboard navigation support",
                        "Screen reader compatibility",
                        "Alt text for images",
                        "High contrast mode support",
                        "Text size adjustment options",
                        "Clear and consistent navigation"
                    ]
                },
                {
                    title: "Feedback",
                    content: "If you encounter any accessibility barriers, please contact us at accessibility@shopper.com. We welcome your feedback and will work to address any issues."
                },
                {
                    title: "Ongoing Improvements",
                    content: "We regularly review and update our website to improve accessibility. Our team receives training on accessibility best practices."
                }
            ]}
        />
    )
}

export default Accessibility

