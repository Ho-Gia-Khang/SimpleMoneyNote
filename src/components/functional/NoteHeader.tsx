import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "src/lib/utils";

const NoteHeader = ({ bookName }: { bookName: String }) => {
    const [date, setDate] = React.useState<Date>();
    const [income, setIncome] = React.useState<number>(450000);
    const [expense, setExpense] = React.useState<number>(150000);

    const total = React.useMemo(() => {
        return income - expense;
    }, [income, expense]);

    return (
        <div className="grid grid-cols-2 w-full">
            <div className="grid grid-rows-2 border border-black rounded-full self-start p-2">
                <p>Total: {total}</p>
                <p>
                    income: {income} / expense: {expense}
                </p>
            </div>
            <div className="grid grid-rows-2 w-full">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className={cn(
                                "justify-center text-center font-normal bg-transparent border border-black rounded-full",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <h1 className="font-bold text-center self-center text-lg">
                    {bookName}
                </h1>
            </div>
        </div>
    );
};

export default NoteHeader;
