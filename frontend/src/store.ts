import { create } from "zustand"

export type Book = {
  key: string
  title: string
  author_name: string[]
  first_publish_year: string
  number_of_pages_median: string | null
  status: "done" | "inProgress" | "backlog"
}

interface BookState {
  books: Book[]
}

interface BookStore extends BookState {
  addBook: (newBook: Book) => void
  removeBook: (bookToRemove: Book) => void
  moveBook: (bookToMove: Book, newStatus: Book["status"]) => void
  loadBooksFromLocalStorage: () => void
}

export const useStore = create<BookStore>((set) => ({
  books: [],

  addBook: (newBook) =>
    set((state: BookState) => {
      const updatedBooks: Book[] = [
        ...state.books,
        { ...newBook, status: "backlog" },
      ]

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),

  removeBook: (bookToRemove) =>
    set((state: BookState) => {
      if (window.confirm("Are you sure ou want to remove this book?")) {
        const updatedBooks: Book[] = state.books.filter(
          (book) => book.key !== bookToRemove.key,
        )

        localStorage.setItem("readingList", JSON.stringify(updatedBooks))
        return { books: updatedBooks }
      }

      return state
    }),

  moveBook: (bookToMove, newStatus) =>
    set((state: BookState) => {
      const updatedBooks: Book[] = state.books.map((book) =>
        book.key === bookToMove.key ? { ...book, status: newStatus } : book,
      )

      localStorage.setItem("readingList", JSON.stringify(updatedBooks))

      return { books: updatedBooks }
    }),

  loadBooksFromLocalStorage: () => {
    const storedBooks = localStorage.getItem("readingList")

    if (storedBooks) {
      set({ books: JSON.parse(storedBooks) })
    } else {
      set({ books: [] })
    }
  },
}))
