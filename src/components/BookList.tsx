import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { useStore, Book } from "@/store"
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDroppable } from "./StrictModeDroppable"

import {
  GiBookPile,
  GiBookshelf,
  GiBookmarklet,
  GiBurningBook,
} from "react-icons/gi"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { BookSearch } from "@/components/BookSearch"

const BookList = () => {
  const { books, removeBook, moveBook, reorderBooks } = useStore(
    (state) => state,
  )
  const renderBookItem = (
    book: Book,
    index: number,
    listType: "inProgress" | "backlog" | "done",
  ) => (
    <Card
      key={index}
      className="rounded-none first:mt-0 first:rounded-t-lg last:rounded-b-lg"
    >
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>
          {Array.isArray(book.author_name)
            ? book.author_name.join(", ")
            : book.author_name}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" onClick={() => removeBook(book)}>
              <GiBurningBook className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>delete from my reading list</TooltipContent>
        </Tooltip>
        <div className="inline-flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => moveToList(book, "inProgress")}
                disabled={listType === "inProgress"}
              >
                <GiBookmarklet className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>mark as "currently reading"</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => moveToList(book, "backlog")}
                disabled={listType === "backlog"}
              >
                <GiBookPile className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>mark as "for later"</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => moveToList(book, "done")}
                disabled={listType === "done"}
              >
                <GiBookshelf className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>mark as "done"</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  )

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    const listType = result.source.droppableId as Book["status"]

    reorderBooks(listType, sourceIndex, destinationIndex)
  }

  const renderDraggableBookList = (listType: Book["status"]) => {
    const filteredBooks = books.filter((book) => book.status === listType)

    return (
      <StrictModeDroppable droppableId={listType}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filteredBooks.map((book, index) => (
              <Draggable key={book.key} draggableId={book.key} index={index}>
                {(provided) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="my-2"
                    >
                      <div {...provided.dragHandleProps}>
                        {renderBookItem(book, index, listType)}
                      </div>
                    </div>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    )
  }

  const moveToList = (book: Book, targetList: Book["status"]) =>
    void moveBook(book, targetList)

  return (
    <div className="space-y-8 p-4">
      <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between">
        <h2 className="my-2 flex items-end  gap-2 text-xl font-semibold">
          My Reading List
        </h2>
        <div className="h-full ">
          {/* <SearchDialog> */}
          <BookSearch />
          {/* </SearchDialog> */}
        </div>
      </div>
      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold dark:text-white">
        Currently Reading <GiBookmarklet className="size-6" />
      </h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="rounded-lg border bg-muted p-4">
          {books.filter((book) => book.status === "inProgress").length > 0 ? (
            <>{renderDraggableBookList("inProgress")}</>
          ) : (
            <div className="p-4">
              <div className="text-primary">
                A rolling stone gathers no moss.
              </div>
            </div>
          )}
        </div>
      </DragDropContext>

      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold dark:text-white">
        For Later <GiBookPile className="size-7" />
      </h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="rounded-lg border bg-muted p-4">
          {books.filter((book) => book.status === "backlog").length > 0 ? (
            <>{renderDraggableBookList("backlog")}</>
          ) : (
            <div className="p-4">
              <div className="text-primary">
                Look before, or you'll find yourself behind.
              </div>
            </div>
          )}
        </div>
      </DragDropContext>
      <h3 className="my-2 flex items-end gap-2 text-xl font-semibold dark:text-white">
        Done <GiBookshelf className="size-6 pb-0.5" />
      </h3>
      {books.filter((book) => book.status === "done").length > 0 ? (
        <>
          <div className="rounded-lg border bg-muted p-4">
            {books
              .filter((book) => book.status === "done")
              .map((book: Book, index: number) =>
                renderBookItem(book, index, book.status),
              )}
          </div>
        </>
      ) : (
        <div className="p-4">
          <div className="text-primary">
            Well done is better than well said.
          </div>
        </div>
      )}
    </div>
  )
}

export default BookList
