import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import ColoredSeparator from "../ui/coloredSeparator";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";
import { useBookNavigation } from "src/stores/NavigationStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Put } from "src/api/Requests";
import { BookProps } from "src/types";

const AppSettings = () => {
    const [newBookName, setNewBookName] = useState("");
    const currentBook = useBookNavigation((state) => state.currentBook);
    const setCurrentBook = useBookNavigation((state) => state.setCurrentBook);

    const onChange = async () => {
        const updatedBook = await Put<BookProps>(
            `book/update/${currentBook.id}`,
            { name: newBookName }
        );

        if (updatedBook) {
            setCurrentBook(updatedBook);
        }
    };

    return (
        <div>
            <div className="grid grid-flow-col p-1">
                <h1 className="text-center self-center text-lg font-semibold">
                    Current book:
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="bg-transparent border border-black"
                        >
                            {currentBook.name}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={`bg-[#E8DCB8] text-black`}>
                        <DialogHeader>Change book name</DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                New name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                defaultValue={currentBook.name}
                                onBlur={(e) => {
                                    setNewBookName(e.target.value);
                                }}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className="bg-transparent border border-black"
                                    variant={"outline"}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    className="bg-transparent border border-black"
                                    variant={"outline"}
                                    type="button"
                                    onClick={onChange}
                                >
                                    Change
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <ColoredSeparator />
            <div className="flex flex-col items-center">
                You are loged in, enjoy your stay 😊
                <LogoutButton />
            </div>
        </div>
    );
};

export default AppSettings;
