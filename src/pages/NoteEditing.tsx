import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import { useNote } from "src/stores/NoteStore";
import NoteForm from "src/components/functional/NoteForm";

const NoteEditing = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    const currentNote = useNote((state) => state.currentNote);
    const isEditingNote: boolean = useNote((state) => state.isEditingNote);
    const isCreatingNote: boolean = useNote((state) => state.isCreatingNote);

    return (
        <SinglePage>
            {isLoggedIn ? (
                <>
                    {isEditingNote && !isCreatingNote ? (
                        <NoteForm noteDetail={currentNote} />
                    ) : (
                        <> </>
                    )}
                    {isCreatingNote && !isEditingNote ? <NoteForm /> : <> </>}
                </>
            ) : (
                <LoginReminder />
            )}
        </SinglePage>
    );
};

export default NoteEditing;
