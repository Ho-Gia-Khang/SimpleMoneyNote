import SinglePage from "src/components/ui/layout/SinglePage";
import SingleNote from "src/components/functional/SingleNote";
import { NoteInfoProps } from "src/types";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import NoteHeader from "src/components/functional/NoteHeader";
import { Separator } from "src/components/ui/separator";
import { useState, useMemo, useCallback, useEffect } from "react";

const Note = ({
    notes,
    bookNames = [],
}: {
    notes: NoteInfoProps[];
    bookNames: string[];
}) => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);

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

    useEffect(() => {
        getIncome();
    }, [getIncome]);

    useEffect(() => {
        getExpense();
    }, [getExpense]);

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
