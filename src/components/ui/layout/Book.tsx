import React, { useCallback, useEffect, useState } from "react";
import BookCover from "./BookCover";
import Note from "src/pages/Note";
import NoteEditing from "src/pages/NoteEditing";
import { Button } from "../button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wallet from "src/pages/Wallet";
import FrontPage from "./FrontPage";
import BackPage from "./BackPage";
import Paper from "./Paper";
import FirstPage from "./FirstPage";
import WalletEditing from "src/pages/WalletEditing";
import {
    useNavigation,
    useNoteNavigation,
    useWalletNavigation,
} from "src/stores/NavigationStore";
import Setting from "src/pages/Setting";
import LastPage from "./LastPage";
import About from "src/pages/About";
import { BookProps, NoteInfoProps } from "src/types";
import { Get } from "src/api/Requests";

const Book = ({ book }: { book?: BookProps }) => {
    // general navigation
    const currentLocation = useNavigation((state) => state.currentLocation);
    const setCurrentLocation = useNavigation(
        (state) => state.setCurrentLocation
    );
    const maxLocation: number = 3;

    // note page navigation
    const noteNavigation = useNoteNavigation((state) => state.Notechecked);
    const setNoteNavigation = useNoteNavigation(
        (state) => state.setNoteChecked
    );
    const [notePageZIndex, setNotePageZIndex] = useState<number>(30);
    //const notePageId = useNoteNavigation((state) => state.pageNumber);

    // wallet page navigation
    const walletNavigation = useWalletNavigation(
        (state) => state.Walletchecked
    );
    const setWalletNavigation = useWalletNavigation(
        (state) => state.setNoteChecked
    );
    const [walletPageZIndex, setWalletPageZIndex] = useState<number>(20);

    const [notes, setNotes] = useState<NoteInfoProps[]>([]);

    const [bookName, setBookname] = useState<String>("");

    const fetchNote = useCallback(async () => {
        if (!book) return;
        const noteLists = await Get<NoteInfoProps[]>(`note/getAll/${book.id}`);

        if (!noteLists) return;
        setNotes(noteLists);
    }, [book]);

    useEffect(() => {
        if (book) {
            setBookname(book.name);
        }
    }, [book]);

    useEffect(() => {
        fetchNote();
    }, [fetchNote]);

    const goNextPage = () => {
        if (currentLocation < maxLocation) {
            switch (currentLocation) {
                case 1:
                    setNoteNavigation(true);
                    setNotePageZIndex(20);
                    break;
                case 2:
                    setWalletNavigation(true);
                    setWalletPageZIndex(30);
                    break;
                default:
                    break;
            }
            setCurrentLocation(currentLocation + 1);
        }
    };

    const goPrevPage = () => {
        if (currentLocation > 1) {
            switch (currentLocation) {
                case 2:
                    setNoteNavigation(false);
                    setNotePageZIndex(30);
                    break;
                case 3:
                    setWalletNavigation(false);
                    setWalletPageZIndex(20);
                    break;
                default:
                    break;
            }
            setCurrentLocation(currentLocation - 1);
        }
    };

    return (
        <main className="flex flex-col items-center justify-end w-screen h-screen">
            <div className="w-[80%] h-[80%] mb-2 flex justify-between items-center">
                <Button variant={"ghost"} onClick={goPrevPage}>
                    <ChevronLeft size={32} />
                </Button>

                <BookCover>
                    <FirstPage>
                        <Note notes={notes} bookName={bookName} />
                    </FirstPage>
                    <Paper z={notePageZIndex}>
                        <FrontPage flipped={noteNavigation}>
                            <NoteEditing />
                        </FrontPage>
                        <BackPage flipped={noteNavigation}>
                            <Wallet />
                        </BackPage>
                    </Paper>
                    <Paper z={walletPageZIndex}>
                        <FrontPage flipped={walletNavigation}>
                            <WalletEditing />
                        </FrontPage>
                        <BackPage flipped={walletNavigation}>
                            <Setting />
                        </BackPage>
                    </Paper>
                    <LastPage>
                        <About />
                    </LastPage>
                </BookCover>

                <Button variant={"ghost"} onClick={goNextPage}>
                    <ChevronRight size={32} />
                </Button>
            </div>
        </main>
    );
};

export default Book;
