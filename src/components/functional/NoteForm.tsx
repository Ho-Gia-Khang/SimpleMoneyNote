import React, { useCallback, useEffect, useState } from "react";
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
import { NoteProps, WalletProps } from "src/types";
import { useNote } from "src/stores/NoteStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { useWalletInfo } from "src/stores/WalletStore";
import { Get, Post, Put } from "src/api/Requests";
import { useBookNavigation } from "src/stores/NavigationStore";

const NoteForm = ({ noteDetail }: { noteDetail?: NoteProps | undefined }) => {
    const setIsEditingNote = useNote((state) => state.setIsEditingNote);
    const setIsCreatingNote = useNote((state) => state.setIsCreatingNote);
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
    const [currentWallet, setCurrentWallet] = useState<WalletProps>();
    const [prevWallet, setPrevWallet] = useState<WalletProps>();

    const currentBook = useBookNavigation((state) => state.currentBook);

    // re-render the component when the note is edited
    const hasEditedNote = useNote((state) => state.hasEditedNote);
    const setHasEditedNote = useNote((state) => state.setHasEditedNote);

    const fetchWallet = useCallback(async (walletId: string) => {
        const wallet = await Get<WalletProps>(`wallet/getOne/${walletId}`);

        if (!wallet) {
            console.error("Failed to fetch wallet");
            return;
        }
        setCurrentWallet(wallet);
    }, []);

    useEffect(() => {
        if (noteDetail && noteDetail.walletId) {
            fetchWallet(noteDetail.walletId);
        }
    }, [fetchWallet, noteDetail]);

    useEffect(() => {
        if (!prevWallet) {
            setPrevWallet(currentWallet);
        }
    }, [currentWallet, prevWallet]);

    const noteEditingSchema = z.object({
        type: z.string(),
        amount: z.number().nonnegative({
            message: "Amount must be a positive number",
        }),
        currency: z.string(),
        description: z.string(),
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
            description: noteDetail ? noteDetail.description : "",
            date: noteDetail ? noteDetail.date : new Date(),
            categoryId: noteDetail?.categoryId,
            walletId: noteDetail ? noteDetail.walletId : "",
            theme: noteDetail?.theme,
        },
    });

    const onSubmit = async (data: z.infer<typeof noteEditingSchema>) => {
        setPrevWallet(currentWallet);
        await fetchWallet(data.walletId);
        let edittedNote: Omit<NoteProps, "userId" | "id" | "bookId"> = {
            type: currentType ? currentType : "expense",
            amount: JSON.parse(data.amount.toString()),
            currency: data.currency,
            description: data.description,
            date: new Date(data.date),
            categoryId: data.categoryId,
            walletId: data.walletId,
            theme: data.theme,
        };

        console.log(edittedNote);

        if (noteDetail) {
            const newNote = await Put<NoteProps>(
                `note/update/${noteDetail.id}`,
                edittedNote
            );
            console.log(newNote);
        } else {
            const bookId = currentBook.id;
            const newNote = await Post<NoteProps>(
                `note/create/${bookId}`,
                edittedNote
            );
            console.log(newNote);
        }

        if (currentWallet) {
            const updatedCurrentWallet: WalletProps = {
                ...currentWallet,
                balance:
                    currentType === "income"
                        ? currentWallet.balance + edittedNote.amount
                        : currentWallet.balance - edittedNote.amount,
            };
            if (currentWallet !== prevWallet && prevWallet) {
                await Put<WalletProps>(
                    `wallet/update/${currentWallet.id}`,
                    updatedCurrentWallet
                );

                const updatedPrevWallet: WalletProps = {
                    ...prevWallet,
                    balance:
                        currentType === "income"
                            ? prevWallet.balance - edittedNote.amount
                            : prevWallet.balance + edittedNote.amount,
                };
                await Put<WalletProps>(
                    `wallet/update/${prevWallet.id}`,
                    updatedPrevWallet
                );
            } else {
                await Put<WalletProps>(
                    `wallet/update/${currentWallet.id}`,
                    updatedCurrentWallet
                );
            }
        }
        setHasEditedNote(!hasEditedNote);
    };

    return (
        <div className="ml-[5%] flex flex-col justify-center pt-4 border border-black rounded-3xl h-[60%] w-[90%] bg-transparent">
            <div className="w-full grid grid-cols-2">
                <div className="flex justify-evenly">
                    <Button
                        variant={"outline"}
                        className={
                            "border border-black hover:bg-black hover:text-white" +
                            (currentType === "expense"
                                ? " bg-black text-white"
                                : " bg-transparent")
                        }
                        onClick={() => {
                            setCurrentType("expense");
                        }}
                    >
                        Expense
                    </Button>
                    <Button
                        variant={"outline"}
                        className={
                            "border border-black hover:bg-black hover:text-white" +
                            (currentType === "income"
                                ? " bg-black text-white"
                                : " bg-transparent")
                        }
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
                            setIsCreatingNote(false);
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
                    <div className="grid grid-cols-6 w-full">
                        <FormField
                            control={noteEditingForm.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="col-span-3 w-full">
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
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="bg-transparent border border-black">
                                                <SelectValue
                                                    placeholder={
                                                        currentWallet
                                                            ? currentWallet.name
                                                            : "Wallet"
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#E8DCB8] border border-black text-center">
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Wallets
                                                    </SelectLabel>
                                                    <SelectItem
                                                        value="none"
                                                        className="border border-black"
                                                    >
                                                        None
                                                    </SelectItem>
                                                    {walletInfos.map(
                                                        (wallet) => (
                                                            <SelectItem
                                                                key={wallet.id}
                                                                value={
                                                                    wallet.id
                                                                }
                                                                className="border border-black"
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
                            className="bg-transparent border border-black col-span-1"
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
                            <Button
                                type="button"
                                variant={"outline"}
                                className="bg-transparent border border-black cursor-default hover:bg-transparent"
                            >
                                Category
                            </Button>
                        </div>

                        <FormField
                            control={noteEditingForm.control}
                            name="description"
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
                            <FormItem className="w-full h-full">
                                <FormControl>
                                    <CategoryList
                                        currentType={currentType}
                                        onValueChange={field.onChange}
                                        defaultCategory={noteDetail?.categoryId}
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
