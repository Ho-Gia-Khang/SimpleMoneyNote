import { NoteProps } from "src/types";
import { Button } from "../ui/button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNote } from "src/stores/NoteStore";
import { useCategory } from "src/stores/CategoryStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Get } from "src/api/Requests";

const SingleNote = ({ noteId }: { noteId: string }) => {
    const [note, setNote] = useState<NoteProps>();
    // re-render the component when the note is edited
    const hasEditedNote = useNote((state) => state.hasEditedNote);

    const fetchNote = useCallback(async () => {
        const response = await Get<NoteProps>(`note/getOne/${noteId}`);
        if (!response) {
            console.log("Error getting note detail with id: ", noteId);
            return;
        }
        setNote(response);
    }, [noteId]);

    useEffect(() => {
        fetchNote();
    }, [fetchNote, hasEditedNote]);

    const setCurrentNote = useNote((state) => state.setCurrentNote);
    const setIsEditingNote = useNote((state) => state.setIsEditingNote);
    const noteDate: string = note
        ? new Date(note.date).toLocaleDateString()
        : "";
    const categories = useCategory((state) => state.categories);
    const category = useMemo(() => {
        if (!note) return;
        return categories.find((category) => category.id === note.categoryId);
    }, [categories, note]);

    if (!note) return <></>;

    return (
        <div className="grid grid-cols-10 h-[15%]">
            <Button
                variant={"outline"}
                className="col-span-9 bg-transparent border-black border h-full justify-start place-content-center p-0"
                onClick={() => {
                    setCurrentNote(note);
                    setIsEditingNote(true);
                }}
            >
                <img
                    height={64}
                    width={64}
                    src={category?.icon}
                    alt={category?.icon}
                />
                <div className="col-span-8 self-center w-full h-full place-content-center">
                    <div className="h-full w-full grid grid-rows-2">
                        <p className="h-full text-center">{noteDate}</p>
                        <p className="h-full grid grid-cols-2 text-center">
                            {note.type.includes("income") ? "+" : "-"}{" "}
                            {note.amount} {note.currency}
                            <span>{note.description}</span>
                        </p>
                    </div>
                </div>
            </Button>
            <Button
                variant={"outline"}
                className="col-span-1 bg-transparent border-black border h-full"
            >
                <DeleteIcon />
            </Button>
        </div>
    );
};

export default SingleNote;
