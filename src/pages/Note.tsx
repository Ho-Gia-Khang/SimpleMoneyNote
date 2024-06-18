import SinglePage from "src/components/ui/layout/SinglePage";
import SingleNote from "src/components/functional/SingleNote";
import { NoteInfoProps } from "src/types";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import NoteHeader from "src/components/functional/NoteHeader";
import { Separator } from "src/components/ui/separator";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Get } from "src/api/Requests";
import { useNote } from "src/stores/NoteStore";
import { Button } from "src/components/ui/button";

const Note = ({
    bookId,
    bookNames = [],
}: {
    bookId?: string;
    bookNames: string[];
}) => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    const [notes, setNotes] = useState<NoteInfoProps[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<NoteInfoProps[]>([]);
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);

    const fetchNote = useCallback(async () => {
        if (!bookId) return;
        const noteLists = await Get<NoteInfoProps[]>(`note/getAll/${bookId}`);

        if (!noteLists) return;
        setNotes(noteLists);
    }, [bookId]);

    // re-render the component when the note is edited
    const hasEditedNote = useNote((state) => state.hasEditedNote);

    useEffect(() => {
        fetchNote();
    }, [fetchNote, hasEditedNote]);

    const total: number = useMemo(() => {
        return income - expense;
    }, [income, expense]);

    const getIncome = useCallback(() => {
        let totalIncome: number = 0;
        notes.forEach((note) => {
            if (note.type.includes("income")) {
                totalIncome += note.amount;
            }
        });
        setIncome(totalIncome);
    }, [notes]);

    const getExpense = useCallback(() => {
        let totalExpense: number = 0;
        notes.forEach((note) => {
            if (note.type.includes("expense")) {
                totalExpense += note.amount;
            }
        });
        setExpense(totalExpense);
    }, [notes]);

    const selectedMonth: number = useNote((state) => state.queryMonth);
    const filterNotes = useCallback(() => {
        const filteredNotes = notes.filter((note) => {
            return new Date(note.date).getMonth() === selectedMonth;
        });
        setFilteredNotes(filteredNotes);
    }, [notes, selectedMonth]);

    useEffect(() => {
        getIncome();
    }, [getIncome]);

    useEffect(() => {
        getExpense();
    }, [getExpense]);

    useEffect(() => {
        filterNotes();
        console.log("selected month: ", selectedMonth);
    }, [filterNotes, selectedMonth]);

    return (
        <SinglePage>
            {isLoggedIn ? (
                <>
                    <NoteHeader
                        bookNames={bookNames}
                        income={income}
                        expense={expense}
                        total={total}
                    />
                    <Separator className="my-2" />
                    {filteredNotes?.map((note, index) => (
                        <SingleNote key={index} noteId={note.id} />
                    ))}
                    <Button
                        variant={"outline"}
                        className="absolute bg-transparent border border-black rounded-full bottom-2 right-2 h-fit"
                        onClick={() => {
                            useNote.getState().setIsCreatingNote(true);
                        }}
                    >
                        <img
                            src="icons/note/add-icon.jpg"
                            alt="add-icon"
                            width={42}
                            height={42}
                        />
                    </Button>
                </>
            ) : (
                <LoginReminder />
            )}
        </SinglePage>
    );
};

export default Note;
