import { useTheme } from "@/hooks/useTheme"
import { HiMiniSun, HiMiniMoon } from "react-icons/hi2"
import { SiYoutube, SiGithub } from "react-icons/si"
import { GiSpellBook } from "react-icons/gi"

const NavBar = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-8 lg:px-44">
        <div className="mx-auto w-full max-w-3xl space-y-20">
          <div className="flex justify-between">
            <div className="flex flex-1 items-center justify-start">
              <a href="/" className="size-10 p-2 text-primary">
                <GiSpellBook className="size-full" />
              </a>
            </div>
            <div className="flex items-center">
              <nav className="flex items-center space-x-1">
                <ThemeToggle />
                <a
                  href="/"
                  className="size-10 p-2 text-primary hover:text-[#ff0000]  dark:hover:text-[#ff0000]"
                >
                  <SiYoutube className="size-full" />
                </a>
                <a
                  href="https://github.com/Just2Deep"
                  className="size-10 p-2 text-primary hover:text-[#4078c0] dark:hover:text-[#4078c0]"
                >
                  <SiGithub className="size-full" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      className="size-10 p-2 hover:text-amber-500 dark:hover:text-amber-400"
      onClick={() => toggleDarkMode()}
    >
      {isDarkMode ? (
        <HiMiniMoon className="h-full w-full" />
      ) : (
        <HiMiniSun className="h-full w-full" />
      )}
    </button>
  )
}

export default NavBar
