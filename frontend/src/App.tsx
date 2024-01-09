import BookSearch from "@/components/BookSearch"
import { useEffect } from "react"
import BookList from "@/components/BookList"
import { useStore } from "@/store"

const App = () => {
  const { loadBooksFromLocalStorage } = useStore((state) => state)

  useEffect(() => {
    loadBooksFromLocalStorage()
  }, [loadBooksFromLocalStorage])

  return (
    <div className="container mx-auto">
      <BookSearch />
      <BookList />
    </div>
  )
}

export default App
