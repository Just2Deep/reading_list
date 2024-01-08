import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Book = {
    key: string
    title: string
    author_name: string
    first_publish_year: string
    number_of_pages_median: string
    status: "done" | "inProgress" | "backlog"
}

const BookSearch = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [totalResults, setTotalResults] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const resultsPerPage = 100

    type SearchResult = {
        docs: Book[]
        num_found: number
    }

    const searchBooks = async (page: number = 1) => {
        if (!query) return
        setIsLoading(true)

        try {
            const response = await axios.get<SearchResult>(
                `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`,
            )
            setResults(response.data.docs)
            setTotalResults(response.data.num_found)
            setCurrentPage(page)
        } catch (error) {
            console.log(`Error fetching Openlibrary API data ${error}`)
        }

        setIsLoading(false)
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            searchBooks()
        }
    }

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            searchBooks(currentPage)
        }
    }

    const handleNextClick = () => {
        console.log("CLICKED")
        if (currentPage < Math.ceil(totalResults / resultsPerPage)) {
            setCurrentPage(currentPage + 1)
            searchBooks(currentPage)
        }
    }

    const startIndex = (currentPage - 1) * resultsPerPage + 1
    const endIndex = Math.min(startIndex + resultsPerPage - 1, totalResults)

    return (
        <div className="p-4">
            <div className="sm:max-w-xs">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={handleKeyPress}
                    placeholder="Search for your next book!"
                />
            </div>

            <Button onClick={() => searchBooks()} disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
            </Button>

            <div className="mt-4 max-h-64 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-2">Title</TableHead>
                            <TableHead className="p-2">Author</TableHead>
                            <TableHead className="p-2">Year</TableHead>
                            <TableHead className="p-2">Page Count</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((book, index) => (
                            <TableRow key={index}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author_name}</TableCell>
                                <TableCell>{book.first_publish_year}</TableCell>
                                <TableCell>
                                    {book.number_of_pages_median || "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <br />
            <div className="mt4 flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={handlePreviousClick}
                    disabled={currentPage <= 1 || isLoading}
                >
                    Previous
                </Button>
                <span>Page {currentPage}</span>
                <Button
                    variant="outline"
                    onClick={handleNextClick}
                    disabled={
                        currentPage >=
                            Math.ceil(totalResults / resultsPerPage) ||
                        isLoading
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default BookSearch
