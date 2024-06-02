import { create } from "zustand";
import { BookProps } from "src/types";
interface Navigation {
    currentLocation: number;
    setCurrentLocation: (currentLocation: number) => void;
}

interface NoteNavigation {
    Notechecked: boolean;
    setNoteChecked: (Notechecked: boolean) => void;
    pageNumber: number;
}

interface WalletNavigation {
    Walletchecked: boolean;
    setNoteChecked: (Notechecked: boolean) => void;
    pageNumber: number;
}

interface BookNavigation {
    allBooks: BookProps[];
    currentBook: BookProps;
    setCurrentBook: (currentBook: BookProps) => void;
    setAllBooks: (allBooks: BookProps[]) => void;
}

export const useNavigation = create<Navigation>((set) => ({
    currentLocation: 1,
    setCurrentLocation: (currentLocation) =>
        set({ currentLocation: currentLocation }),
}));

export const useNoteNavigation = create<NoteNavigation>()((set) => ({
    Notechecked: false,
    pageNumber: 1,
    setNoteChecked: (Notechecked) => set({ Notechecked: Notechecked }),
}));

export const useWalletNavigation = create<WalletNavigation>()((set) => ({
    Walletchecked: false,
    pageNumber: 2,
    setNoteChecked: (Walletchecked) => set({ Walletchecked: Walletchecked }),
}));

export const useBookNavigation = create<BookNavigation>((set) => ({
    currentBook: {} as BookProps,
    allBooks: [],
    setCurrentBook: (currentBook) => set({ currentBook: currentBook }),
    setAllBooks(allBooks) {
        set({ allBooks: allBooks });
    },
}));
