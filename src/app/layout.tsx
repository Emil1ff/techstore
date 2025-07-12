"use client"

import type React from "react"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/redux/store"
import Layout from "@/components/Layout"
import "@/styles/globals.css"
import { useDarkMode } from "@/hooks/UseDarkMode"

function ThemeProvider({ children }: { children: React.ReactNode }) {
  useDarkMode()
  return <>{children}</>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body cz-shortcut-listen="true">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <Layout>{children}</Layout>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
