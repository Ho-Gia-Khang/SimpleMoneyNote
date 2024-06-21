import React, { useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useBookNavigation } from "src/stores/NavigationStore";
import DatePicker from "../ui/datePicker";
import { useNote } from "src/stores/NoteStore";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Post } from "src/api/Requests";
import { BookProps } from "src/types";

const NoteHeader = ({
    bookNames,
    income,
    expense,
    total,
}: {
    bookNames: string[];
    income: number;
    expense: number;
    total: number;
}) => {
    const [date, setDate] = React.useState<Date>();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const currentDate: string = date
        ? (new Date(date).getMonth() + 1).toString() +
          "/" +
          new Date(date).getFullYear().toString()
        : (new Date().getMonth() + 1).toString() +
          "/" +
          new Date().getFullYear().toString();
    const allBooks = useBookNavigation((state) => state.allBooks);
    const setAllBooks = useBookNavigation((state) => state.setAllBooks);
    const setCurrentBook = useBookNavigation((state) => state.setCurrentBook);
    const currentBook = useBookNavigation((state) => state.currentBook);
    const setQueryMonth = useNote((state) => state.setQueryMonth);
    const [newBookName, setNewBookName] = React.useState("");

    const createBook = React.useCallback(async (bookName: string) => {
        const newBook = await Post<BookProps>("book/create", {
            name: bookName,
        });
        if (newBook) {
            setAllBooks([...allBooks, newBook]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (date) {
            setQueryMonth(date.getMonth());
        }
    }, [date, setQueryMonth]);

    return (
        <div className="grid grid-cols-2 w-full h-[20%]">
            <div className="grid grid-rows-2 border border-black rounded-lg self-start text-lg h-full">
                <p
                    className={
                        "h-fit font-semibold" +
                        (total > 0 ? " text-green-600" : " text-red-600")
                    }
                >
                    Total: {total}
                </p>
                <div>
                    <p className="h-fit font-semibold text-green-600">
                        Income: {income}
                    </p>
                    <p className="h-fit font-semibold text-red-600">
                        Expense: {expense}
                    </p>
                </div>
            </div>
            <div className="grid grid-rows-2 w-full h-full">
                <DatePicker
                    date={date}
                    setDate={setDate}
                    displayDate={currentDate}
                    monthSelect
                />

                <Select
                    onValueChange={(e) => {
                        if (e !== "+") {
                            const newBook = allBooks.find(
                                (book) => book.name === e
                            );
                            setCurrentBook(newBook!);
                        } else {
                            setIsDialogOpen(true);
                        }
                    }}
                >
                    <SelectTrigger className="bg-transparent border border-black">
                        <SelectValue placeholder={currentBook.name} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#E8DCB8] border border-black text-center">
                        <SelectGroup>
                            <SelectLabel>Books</SelectLabel>
                            {bookNames.map((name, index) => (
                                <SelectItem
                                    key={index}
                                    value={name}
                                    className="border-t-2 border-x-2 border-black"
                                >
                                    {name}
                                </SelectItem>
                            ))}

                            {/* <DialogTrigger asChild> */}
                            <SelectItem
                                className="border-y-2 border-x-2 border-black"
                                value="+"
                            >
                                +
                            </SelectItem>
                            {/* </DialogTrigger> */}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={() => {
                        setIsDialogOpen(false);
                    }}
                >
                    <DialogContent className="bg-[#E8DCB8]">
                        <DialogHeader>
                            <DialogTitle>Create a new Book</DialogTitle>
                        </DialogHeader>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="">
                                Book name
                            </Label>
                            <Input
                                id="link"
                                className="bg-transparent border border-black"
                                onBlur={(e) => {
                                    setNewBookName(e.target.value);
                                }}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type={"submit"}
                                variant={"outline"}
                                className="bg-transparent border border-black"
                                onClick={() => {
                                    createBook(newBookName);
                                    setIsDialogOpen(false);
                                }}
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default NoteHeader;
