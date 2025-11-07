import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Get theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem('theme')
        return savedTheme || 'light'
    })

    // Apply theme immediately on mount
    useEffect(() => {
        const root = document.documentElement
        const savedTheme = localStorage.getItem('theme') || 'light'
        if (savedTheme === 'dark') {
            root.classList.add('dark-theme')
        } else {
            root.classList.remove('dark-theme')
        }
    }, [])

    useEffect(() => {
        // Apply theme to document root
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark-theme')
        } else {
            root.classList.remove('dark-theme')
        }
        // Save to localStorage
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

