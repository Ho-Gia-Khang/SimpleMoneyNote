import { create } from "zustand";

interface isEditingNote {
    isEditingNote: boolean;
    currentNoteId: string;
    isCreatingNote: boolean;
    setIsEditingNote: (isEditingNote: boolean) => void;
    setCurrentNoteId: (currentNoteId: string) => void;
    setIsCreatingNote: (isCreatingNote: boolean) => void;
}

export const useNote = create<isEditingNote>((set) => ({
    isEditingNote: false,
    currentNoteId: "",
    isCreatingNote: false,
    setIsEditingNote: (isEditingNote) => {
        set({ isEditingNote: isEditingNote });
        set({ isCreatingNote: false });
    },
    setCurrentNoteId: (currentNoteId) => set({ currentNoteId: currentNoteId }),
    setIsCreatingNote: (isCreatingNote) => {
        set({ isCreatingNote: isCreatingNote });
        set({ isEditingNote: false });
    },
}));
