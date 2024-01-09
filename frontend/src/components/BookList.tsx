import { Book } from "./BookSearch"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"

const BookList = ({
  books,
  onMoveBook,
  onRemoveBook,
}: {
  books: Book[]
  onMoveBook: (book: Book, targetList: Book["status"]) => void
  onRemoveBook: (book: Book) => void
}) => {
  const renderBookItem = (
    book: Book,
    index: number,
    listType: "inProgress" | "backlog" | "done",
  ) => (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author_name}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={() => onRemoveBook(book)}>
          Remove
        </Button>
        <div className="inline-flex gap-2">
          <Button
            variant="outline"
            onClick={() => moveToList(book, "inProgress")}
            disabled={listType === "inProgress"}
          >
            In Progress
          </Button>
          <Button
            variant="outline"
            onClick={() => moveToList(book, "backlog")}
            disabled={listType === "backlog"}
          >
            Backlog
          </Button>
          <Button
            variant="outline"
            onClick={() => moveToList(book, "done")}
            disabled={listType === "done"}
          >
            Done
          </Button>
        </div>
      </CardFooter>
    </Card>
  )

  const moveToList = (book: Book, targetList: Book["status"]) =>
    void onMoveBook(book, targetList)

  return (
    <div className="space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">My Reading List</h2>
      {books.filter((book) => book.status === "inProgress").length > 0 && (
        <>
          <h3 className="mb-2 text-xl font-semibold">In Progress</h3>
          <div>
            {books
              .filter((book) => book.status === "inProgress")
              .map((book: Book, index: number) =>
                renderBookItem(book, index, book.status),
              )}
          </div>
        </>
      )}
      {books.filter((book) => book.status === "backlog").length > 0 && (
        <>
          <h3 className="mb-2 text-xl font-semibold">BackLog</h3>
          <div>
            {books
              .filter((book) => book.status === "backlog")
              .map((book: Book, index: number) =>
                renderBookItem(book, index, book.status),
              )}
          </div>
        </>
      )}
      {books.filter((book) => book.status === "done").length > 0 && (
        <>
          <h3 className="mb-2 text-xl font-semibold">Done</h3>
          <div>
            {books
              .filter((book) => book.status === "done")
              .map((book: Book, index: number) =>
                renderBookItem(book, index, book.status),
              )}
          </div>
        </>
      )}
    </div>
  )
}

export default BookList
