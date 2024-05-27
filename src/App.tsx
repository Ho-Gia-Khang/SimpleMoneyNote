import Book from "./components/ui/layout/Book";
import { useState, useEffect, useCallback } from "react";
import { BookProps } from "./types";
import { Get } from "./api/Requests";
import { useLogin } from "./stores/LoginStore";

function App() {
    const [books, setBooks] = useState<BookProps[]>([]);
    const isLoggedIn = useLogin((state) => state.isLoggedIn);

    const fetchBooks = useCallback(async () => {
        await Get<BookProps[]>("book/getAll").then((res) => {
            if (!res) {
                console.log("Error fetching books");
                return;
            }
            if (res.length === 0) {
                console.log("No books found");
                return;
            }
            if (!books || books.length === 0) {
                setBooks(res);
            }
        });
    }, [books]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks, isLoggedIn]);

    if (!isLoggedIn) {
        return <Book></Book>;
    }

    console.log(books);

    return (
        <>
            {books.length === 0 ? <Book></Book> : <Book book={books[0]}></Book>}
        </>
    );
}

export default App;
