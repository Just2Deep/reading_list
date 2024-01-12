import React from "react"
import NavBar from "./NavBar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-background">
      <NavBar />
      <main className="p-4 sm:px-8 lg:px-44">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  )
}

export default Layout
