import InfoPage from './InfoPage'

const Careers = () => {
    return (
        <InfoPage
            title="Careers"
            content="Join our team and help shape the future of fashion. We're always looking for talented, passionate individuals to join our growing company."
            sections={[
                {
                    title: "Why Work With Us",
                    list: [
                        "Competitive salary and benefits package",
                        "Flexible work arrangements",
                        "Professional development opportunities",
                        "Inclusive and diverse workplace culture",
                        "Employee discounts and perks"
                    ]
                },
                {
                    title: "Open Positions",
                    content: "We're currently hiring for positions in design, marketing, customer service, and technology. Check back regularly for new opportunities."
                },
                {
                    title: "How to Apply",
                    content: "Send your resume and cover letter to careers@shopper.com. Please include the position you're applying for in the subject line. We review all applications and will contact qualified candidates."
                }
            ]}
        />
    )
}

export default Careers

