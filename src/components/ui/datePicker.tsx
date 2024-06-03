import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "src/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";

const DatePicker = ({
    date,
    setDate,
    displayDate,
    monthSelect = false,
    dateSelect = false,
}: {
    date: Date | undefined;
    setDate: SelectSingleEventHandler | undefined;
    displayDate?: string;
    monthSelect?: boolean;
    dateSelect?: boolean;
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "self-center justify-center text-center font-normal bg-transparent border border-black rounded-lg text-black hover:bg-white",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-black" />
                    {date ? (
                        monthSelect ? (
                            format(date, "MMM yyyy")
                        ) : dateSelect ? (
                            format(date, "dd MMM")
                        ) : (
                            format(date, "PPP")
                        )
                    ) : (
                        <span className="text-black">
                            {displayDate ? displayDate : "Pick a date"}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    captionLayout="dropdown-buttons"
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
