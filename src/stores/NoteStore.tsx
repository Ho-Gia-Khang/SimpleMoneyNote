import { create } from "zustand";
import { NoteProps } from "src/types";

interface isEditingNote {
    isEditingNote: boolean;
    hasEditedNote: boolean;
    currentNote: NoteProps;
    isCreatingNote: boolean;
    queryMonth: number;
    setIsEditingNote: (isEditingNote: boolean) => void;
    setHasEditedNote: (hasEditedNote: boolean) => void;
    setCurrentNote: (currentNote: NoteProps) => void;
    setIsCreatingNote: (isCreatingNote: boolean) => void;
    setQueryMonth: (queryMonth: number) => void;
}

export const useNote = create<isEditingNote>((set) => ({
    isEditingNote: false,
    currentNote: {} as NoteProps,
    isCreatingNote: false,
    hasEditedNote: false,
    queryMonth: 13,
    setIsEditingNote: (isEditingNote) => {
        set({ isEditingNote: isEditingNote });
        set({ isCreatingNote: false });
    },
    setCurrentNote: (currentNote) => set({ currentNote: currentNote }),
    setIsCreatingNote: (isCreatingNote) => {
        set({ isCreatingNote: isCreatingNote });
        set({ isEditingNote: false });
    },
    setHasEditedNote: (hasEditedNote) => set({ hasEditedNote: hasEditedNote }),
    setQueryMonth: (queryMonth) => set({ queryMonth: queryMonth }),
}));
