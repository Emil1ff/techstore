import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ThemeState } from "@/types"

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return "light"
}

const initialState: ThemeState = {
  mode: "system",
  currentTheme: getSystemTheme(),
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.mode = action.payload

      if (action.payload === "system") {
        state.currentTheme = getSystemTheme()
      } else {
        state.currentTheme = action.payload
      }
    },
    updateSystemTheme: (state) => {
      if (state.mode === "system") {
        state.currentTheme = getSystemTheme()
      }
    },
  },
})

export const { setThemeMode, updateSystemTheme } = themeSlice.actions
export default themeSlice.reducer
