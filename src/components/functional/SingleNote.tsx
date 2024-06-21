import { NoteProps } from "src/types";
import { Button } from "../ui/button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNote } from "src/stores/NoteStore";
import { useCategory } from "src/stores/CategoryStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Delete, Get } from "src/api/Requests";
import Description from "../ui/Description";

const SingleNote = ({ noteId }: { noteId: string }) => {
    const [note, setNote] = useState<NoteProps>();
    // re-render the component when the note is edited
    const hasEditedNote = useNote((state) => state.hasEditedNote);
    const setHasEditedNote = useNote((state) => state.setHasEditedNote);

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

    const deleteNote = useCallback(async () => {
        await Delete(`note/delete/${noteId}`);
        setHasEditedNote(!hasEditedNote);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]);

    if (!note) return <></>;

    return (
        <div className="grid grid-cols-10 h-[15%] mt-2">
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
                <div className="col-span-8 self-center w-full h-full place-content-center text-lg">
                    <div className="h-full w-full grid grid-rows-2">
                        <p className="h-full text-center">{noteDate}</p>
                        <p className="h-full grid grid-cols-2 text-center">
                            <span
                                className={
                                    note.type.includes("income")
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {note.type.includes("income") ? "+" : "-"}{" "}
                                {note.amount} {note.currency}
                            </span>

                            <span>
                                <Description content={note.description!} />
                            </span>
                        </p>
                    </div>
                </div>
            </Button>
            <Button
                variant={"outline"}
                className="col-span-1 bg-transparent border-black border h-full"
                onClick={deleteNote}
            >
                <DeleteIcon />
            </Button>
        </div>
    );
};

export default SingleNote;
