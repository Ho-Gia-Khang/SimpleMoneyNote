import { create } from "zustand";

interface NoteNavigation {
    Notechecked: boolean;
    setNoteChecked: (Notechecked: boolean) => void;
}

export const useNoteNavigation = create<NoteNavigation>()((set) => ({
    Notechecked: false,
    setNoteChecked: (Notechecked) => set({ Notechecked: Notechecked }),
}));
