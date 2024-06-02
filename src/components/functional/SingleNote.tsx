import { NoteInfoProps } from "src/types";
import { Button } from "../ui/button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNote } from "src/stores/NoteStore";
import { useCategory } from "src/stores/CategoryStore";
import { useMemo } from "react";

const SingleNote = ({ note }: { note: NoteInfoProps }) => {
    const setCurrentNoteId = useNote((state) => state.setCurrentNoteId);
    const setIsEditingNote = useNote((state) => state.setIsEditingNote);
    const noteDate: string = new Date(note.date).toLocaleDateString();
    const categories = useCategory((state) => state.categories);
    const category = useMemo(() => {
        return categories.find((category) => category.id === note.categoryId);
    }, [categories, note.categoryId]);

    return (
        <div className="grid grid-cols-10 h-[15%]">
            <Button
                variant={"outline"}
                className="col-span-9 bg-transparent border-black border h-full justify-start place-content-center p-0"
                onClick={() => {
                    setCurrentNoteId(note.id);
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
                            <span>{note.descriptions}</span>
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
