import InfoPage from './InfoPage'

const SizeGuide = () => {
    return (
        <InfoPage
            title="Size Guide"
            content="Find your perfect fit with our comprehensive size guide. Measurements are in inches."
            sections={[
                {
                    title: "Men's Sizes",
                    content: "Men's Size Chart",
                    list: [
                        "Small (S): Chest 36-38\", Waist 30-32\", Length 28-29\"",
                        "Medium (M): Chest 40-42\", Waist 34-36\", Length 29-30\"",
                        "Large (L): Chest 44-46\", Waist 38-40\", Length 30-31\"",
                        "X-Large (XL): Chest 48-50\", Waist 42-44\", Length 31-32\""
                    ]
                },
                {
                    title: "Women's Sizes",
                    content: "Women's Size Chart",
                    list: [
                        "Small (S): Bust 32-34\", Waist 24-26\", Hips 34-36\"",
                        "Medium (M): Bust 36-38\", Waist 28-30\", Hips 38-40\"",
                        "Large (L): Bust 40-42\", Waist 32-34\", Hips 42-44\"",
                        "X-Large (XL): Bust 44-46\", Waist 36-38\", Hips 46-48\""
                    ]
                },
                {
                    title: "Kids' Sizes",
                    content: "Kids' Size Chart",
                    list: [
                        "4-5 Years: Height 40-44\", Chest 24-26\"",
                        "6-7 Years: Height 45-49\", Chest 26-28\"",
                        "8-9 Years: Height 50-54\", Chest 28-30\"",
                        "10-12 Years: Height 55-59\", Chest 30-32\""
                    ]
                },
                {
                    title: "How to Measure",
                    list: [
                        "Chest/Bust: Measure around the fullest part",
                        "Waist: Measure around your natural waistline",
                        "Hips: Measure around the fullest part of your hips",
                        "Length: Measure from shoulder to hem"
                    ]
                }
            ]}
        />
    )
}

export default SizeGuide

