import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  ThemeContext,
  type Theme,
} from './theme-context'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme =
      localStorage.getItem("theme")

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      return savedTheme
    }

    return "light"
  })

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(theme)

    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light"
        ? "dark"
        : "light",
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}