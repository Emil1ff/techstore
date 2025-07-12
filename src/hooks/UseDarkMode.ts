"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { updateSystemTheme } from "@/redux/slices/themeSlice"

export const useDarkMode = () => {
  const dispatch = useDispatch()
  const { mode, currentTheme } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      dispatch(updateSystemTheme())
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [dispatch])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme)
  }, [currentTheme])

  return { mode, currentTheme }
}
