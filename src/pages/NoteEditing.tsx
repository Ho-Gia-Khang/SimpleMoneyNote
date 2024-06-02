import React, { useCallback, useEffect, useState } from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import { NoteProps } from "src/types";
import { Get } from "src/api/Requests";
import { useNote } from "src/stores/NoteStore";
import NoteForm from "src/components/functional/NoteForm";

const NoteEditing = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    const [noteDetail, setNoteDetail] = useState<NoteProps>();
    const id = useNote((state) => state.currentNoteId);
    const isEditingNote: boolean = useNote((state) => state.isEditingNote);

    const getNoteDetail = useCallback(async () => {
        const response = await Get<NoteProps>(`note/getOne/${id}`);
        if (!response) {
            console.log("Error getting note detail with id: ", id);
            return;
        }
        setNoteDetail(response);
    }, [id]);

    useEffect(() => {
        getNoteDetail();
    }, [getNoteDetail]);

    return (
        <SinglePage>
            {isLoggedIn ? (
                <>
                    {isEditingNote ? (
                        <NoteForm noteDetail={noteDetail} />
                    ) : (
                        <> </>
                    )}
                </>
            ) : (
                <LoginReminder />
            )}
        </SinglePage>
    );
};

export default NoteEditing;
