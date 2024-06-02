import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import CategoryList from "./CategoryList";
import { Button } from "../ui/button";
import DatePicker from "../ui/datePicker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import Delete from "@mui/icons-material/Delete";
import { NoteProps } from "src/types";
import { useNote } from "src/stores/NoteStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { useWalletInfo } from "src/stores/WalletStore";

const NoteForm = ({ noteDetail }: { noteDetail: NoteProps | undefined }) => {
    const setIsEditingNote = useNote((state) => state.setIsEditingNote);
    const [currentType, setCurrentType] = useState<
        "income" | "expense" | undefined
    >(noteDetail ? noteDetail.type : "expense");
    const displayDate: string = noteDetail
        ? new Date(noteDetail.date).getDate().toString() +
          "/" +
          (new Date(noteDetail.date).getMonth() + 1).toString()
        : new Date().getDate().toString() +
          "/" +
          (new Date().getMonth() + 1).toString();

    const walletInfos = useWalletInfo((state) => state.walletInfos);

    const noteEditingSchema = z.object({
        type: z.string(),
        amount: z.number(),
        currency: z.string(),
        descriptions: z.string(),
        date: z.date(),
        categoryId: z.string(),
        walletId: z.string(),
        theme: z.string(),
    });

    const noteEditingForm = useForm<z.infer<typeof noteEditingSchema>>({
        resolver: zodResolver(noteEditingSchema),
        defaultValues: {
            type: noteDetail ? noteDetail.type : "expense",
            amount: noteDetail ? noteDetail.amount : 0,
            currency: noteDetail ? noteDetail.currency : "VND",
            descriptions: noteDetail ? noteDetail.descriptions : "",
            date: noteDetail ? noteDetail.date : new Date(),
            categoryId: noteDetail?.categoryId,
            walletId: noteDetail?.walletId,
            theme: noteDetail?.theme,
        },
    });

    const onSubmit = (data: z.infer<typeof noteEditingSchema>) => {
        let edittedNote: Omit<NoteProps, "userId" | "id" | "bookId"> = {
            type: currentType ? currentType : "expense",
            amount: data.amount,
            currency: data.currency,
            descriptions: data.descriptions,
            date: data.date,
            categoryId: data.categoryId,
            walletId: data.walletId,
            theme: data.theme,
        };

        console.log(edittedNote);
    };
    return (
        <div className="ml-[5%] flex flex-col justify-center pt-4 border border-black rounded-3xl h-[60%] w-[90%] bg-transparent">
            <div className="w-full grid grid-cols-2">
                <div className="flex justify-evenly">
                    <Button
                        variant={"outline"}
                        className="bg-transparent border border-black"
                        onClick={() => {
                            setCurrentType("expense");
                        }}
                    >
                        Expense
                    </Button>
                    <Button
                        variant={"outline"}
                        className="bg-transparent border border-black"
                        onClick={() => {
                            setCurrentType("income");
                        }}
                    >
                        Income
                    </Button>
                </div>
                <div className="flex justify-end">
                    <Button variant={"ghost"}>
                        <Delete />
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() => {
                            setIsEditingNote(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </div>
            <Form {...noteEditingForm}>
                <form
                    onSubmit={noteEditingForm.handleSubmit(onSubmit)}
                    className="w-[95%] h-full flex flex-col items-center gap-2"
                >
                    <div className="grid grid-cols-6">
                        <FormField
                            control={noteEditingForm.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="col-span-4">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="000000"
                                            className="bg-transparent border border-black text-end"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={noteEditingForm.control}
                            name="walletId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="bg-transparent border border-black">
                                                <SelectValue placeholder="Wallet" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#E8DCB8] border border-black text-center">
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Wallets
                                                    </SelectLabel>
                                                    {walletInfos.map(
                                                        (wallet) => (
                                                            <SelectItem
                                                                key={wallet.id}
                                                                value={
                                                                    wallet.id
                                                                }
                                                            >
                                                                {wallet.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            variant={"outline"}
                            className="bg-transparent border border-black"
                            onClick={() => {
                                onSubmit(noteEditingForm.getValues());
                            }}
                        >
                            Save
                        </Button>
                    </div>
                    <div className="w-full grid grid-cols-7">
                        <div className="col-span-2 items-end">
                            <FormField
                                control={noteEditingForm.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value}
                                                setDate={field.onChange}
                                                displayDate={displayDate}
                                                dateSelect
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button>Category</Button>
                        </div>

                        <FormField
                            control={noteEditingForm.control}
                            name="descriptions"
                            render={({ field }) => (
                                <FormItem className="col-span-5">
                                    <FormControl>
                                        <Textarea
                                            placeholder="descriptions"
                                            className="bg-transparent border border-black w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={noteEditingForm.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CategoryList
                                        currentType={currentType}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default NoteForm;
