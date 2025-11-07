import InfoPage from './InfoPage'

const Cookies = () => {
    return (
        <InfoPage
            title="Cookie Policy"
            content="This policy explains how we use cookies and similar technologies on our website."
            sections={[
                {
                    title: "What Are Cookies",
                    content: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience."
                },
                {
                    title: "How We Use Cookies",
                    list: [
                        "Essential Cookies: Required for the website to function properly",
                        "Analytics Cookies: Help us understand how visitors use our website",
                        "Marketing Cookies: Used to deliver relevant advertisements",
                        "Preference Cookies: Remember your settings and preferences"
                    ]
                },
                {
                    title: "Managing Cookies",
                    content: "You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality. Most browsers allow you to refuse or delete cookies."
                },
                {
                    title: "Third-Party Cookies",
                    content: "We may use third-party services that set their own cookies. These include analytics providers and advertising networks. We do not control these cookies."
                }
            ]}
        />
    )
}

export default Cookies

