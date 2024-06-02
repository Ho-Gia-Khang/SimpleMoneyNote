import React from "react";
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
    const currentDate: string = date
        ? (new Date(date).getMonth() + 1).toString() +
          "/" +
          new Date(date).getFullYear().toString()
        : (new Date().getMonth() + 1).toString() +
          "/" +
          new Date().getFullYear().toString();
    const allBooks = useBookNavigation((state) => state.allBooks);
    const setCurrentBook = useBookNavigation((state) => state.setCurrentBook);
    const currentBook = useBookNavigation((state) => state.currentBook);

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
                <Select>
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
                                    onChange={() => {
                                        console.log("Book changed");
                                        setCurrentBook(allBooks[index]);
                                    }}
                                >
                                    {name}
                                </SelectItem>
                            ))}
                            <SelectItem
                                className="border-y-2 border-x-2 border-black"
                                value="+"
                            >
                                +
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default NoteHeader;
