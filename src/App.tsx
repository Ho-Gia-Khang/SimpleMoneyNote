import Book from "./components/ui/layout/Book";
import { useEffect, useCallback, useState } from "react";
import { BookProps, CategoryProps, WalletInfoProps } from "./types";
import { Get } from "./api/Requests";
import { useLogin } from "./stores/LoginStore";
import { useBookNavigation } from "./stores/NavigationStore";
import { useCategory } from "./stores/CategoryStore";
import { useWallet, useWalletInfo } from "./stores/WalletStore";
import { useNote } from "./stores/NoteStore";
import { defaultSettings } from "./utils/settings";

function App() {
    const books: BookProps[] = useBookNavigation((state) => state.allBooks);
    const isLoggedIn: boolean = useLogin((state) => state.isLoggedIn);
    const allBookNames: string[] = books.map((book) => book.name);
    const currentBook: BookProps = useBookNavigation(
        (state) => state.currentBook
    );
    const [isInitizalizing, setIsInitializing] = useState<boolean>(true);

    const setBooks = useBookNavigation((state) => state.setAllBooks);
    const setCurrentBook = useBookNavigation((state) => state.setCurrentBook);
    const setCategories = useCategory((state) => state.setCategories);
    const setWalletInfos = useWalletInfo((state) => state.setWalletInfos);

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
                setCurrentBook(res[0]);
            }
        });
    }, [books, setBooks, setCurrentBook]);

    const fetchCategories = useCallback(async () => {
        if (!isLoggedIn) return;

        const categoriesList = await Get<CategoryProps[]>("category/getAll");
        if (!categoriesList) {
            console.error("Failed to fetch categories");
            return;
        }

        setCategories(categoriesList);
    }, [isLoggedIn, setCategories]);

    const fetchWalletInfos = useCallback(async () => {
        if (!isLoggedIn) return;

        const walletInfos = await Get<WalletInfoProps[]>("wallet/getAll");
        if (!walletInfos) {
            console.error("Failed to fetch wallet infos");
            return;
        }
        setWalletInfos(walletInfos);
    }, [isLoggedIn, setWalletInfos]);
    const hasEdittedWallet = useWallet((state) => state.hasEdittedWallet);

    const setQueryMonth = useNote((state) => state.setQueryMonth);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories, isLoggedIn]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks, isLoggedIn]);

    useEffect(() => {
        fetchWalletInfos();
    }, [fetchWalletInfos, isLoggedIn, hasEdittedWallet]);

    useEffect(() => {
        setQueryMonth(new Date().getMonth());
        setIsInitializing(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitizalizing]);

    if (!isLoggedIn) {
        return <Book></Book>;
    }

    const backgroundColor = defaultSettings.backgroundColor;

    return (
        <div className={`bg-[${backgroundColor}]`}>
            {books.length === 0 ? (
                <Book></Book>
            ) : (
                <Book book={currentBook} allBookNames={allBookNames}></Book>
            )}
        </div>
    );
}

export default App;
