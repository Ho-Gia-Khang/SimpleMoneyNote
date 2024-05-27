import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import SingleNote from "src/components/functional/SingleNote";
import { NoteInfoProps } from "src/types";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import NoteHeader from "src/components/functional/NoteHeader";
import { Separator } from "src/components/ui/separator";

const Note = ({
    notes,
    bookName = "",
}: {
    notes: NoteInfoProps[];
    bookName?: String;
}) => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage>
            {isLoggedIn ? (
                <>
                    <NoteHeader bookName={bookName} />
                    <Separator className="my-2" />
                    {notes?.map((note, index) => (
                        <SingleNote key={index} note={note} />
                    ))}
                </>
            ) : (
                <LoginReminder />
            )}
        </SinglePage>
    );
};

export default Note;
