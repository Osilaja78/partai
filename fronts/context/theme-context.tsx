"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"

type ThemeColors = {
  background: string
  card: string
  text: string
  primary: string
  secondary: string
  accent: string
  muted: string
  border: string
}

type ThemeContextType = {
  colors: ThemeColors
  isDark: boolean
  toggleTheme: () => void
}

// Gold color palette
const goldPrimary = "#D4AF37"
const goldSecondary = "#FFD700"
const goldAccent = "#BF9B30"

// Dark theme colors
const darkTheme: ThemeColors = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  primary: goldPrimary,
  secondary: goldSecondary,
  accent: goldAccent,
  muted: "#6B7280",
  border: "#2A2A2A",
}

// Light theme colors
const lightTheme: ThemeColors = {
  background: "#FFFFFF",
  card: "#F5F5F5",
  text: "#121212",
  primary: goldPrimary,
  secondary: goldSecondary,
  accent: goldAccent,
  muted: "#6B7280",
  border: "#E5E5E5",
}

const defaultTheme: ThemeContextType = {
  colors: darkTheme,
  isDark: true,
  toggleTheme: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultTheme)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(systemColorScheme === "dark" || systemColorScheme === null)

  // Update theme based on system changes
  useEffect(() => {
    if (systemColorScheme) {
      setIsDark(systemColorScheme === "dark")
    }
  }, [systemColorScheme])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  const themeContext = {
    colors: isDark ? darkTheme : lightTheme,
    isDark,
    toggleTheme,
  }

  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>
}

export { ThemeContext }
