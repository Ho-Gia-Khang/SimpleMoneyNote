import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { NoteProps, WalletInfoProps, WalletProps } from "src/types";
import { useNote } from "src/stores/NoteStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { useWallet, useWalletInfo } from "src/stores/WalletStore";
import { Post, Put, Delete } from "src/api/Requests";
import { useBookNavigation } from "src/stores/NavigationStore";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const currentWalletRef = useRef<WalletInfoProps>();
    const prevWalletRef = useRef<WalletInfoProps>();
    const [currentWallet, setCurrentWallet] = useState<WalletInfoProps>();

    const currentBook = useBookNavigation((state) => state.currentBook);

    // re-render the component when the note is edited
    const hasEditedNote = useNote((state) => state.hasEditedNote);
    const hasEdittedWallet = useWallet((state) => state.hasEdittedWallet);
    const setHasEditedNote = useNote((state) => state.setHasEditedNote);
    const setHasEdittedWallet = useWallet((state) => state.setHasEdittedWallet);
    const setCurrentNote = useNote((state) => state.setCurrentNote);

    const findWallet = (walletId: string) => {
        const wallet = walletInfos.find((wallet) => wallet.id === walletId);
        if (!wallet) {
            console.log("Wallet not found");
        }
        return wallet;
    };

    useEffect(() => {
        if (noteDetail && noteDetail.walletId) {
            const wallet = findWallet(noteDetail.walletId);
            if (wallet) {
                setCurrentWallet(wallet);
                currentWalletRef.current = wallet;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteDetail]);

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

    const deleteNote = useCallback(async () => {
        if (!noteDetail) return;
        await Delete(`note/delete/${noteDetail.id}`);

        setIsEditingNote(false);
        setIsCreatingNote(false);
        setHasEditedNote(!hasEditedNote);
        setHasEdittedWallet(!hasEdittedWallet);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteDetail?.id]);

    const onSubmit = async (data: z.infer<typeof noteEditingSchema>) => {
        let edittedNote: Omit<NoteProps, "userId" | "id" | "bookId"> = {
            type: currentType ? currentType : "expense",
            amount: JSON.parse(data.amount.toString()),
            currency: data.currency,
            description: data.description,
            date: new Date(data.date),
            categoryId: data.categoryId,
            walletId: data.walletId === "none" ? undefined : data.walletId,
            theme: data.theme,
        };

        console.log(edittedNote);

        // update the note details
        if (noteDetail) {
            const newNote = await Put<NoteProps>(
                `note/update/${noteDetail.id}`,
                edittedNote
            );

            if (newNote) {
                setCurrentNote(newNote);
            }
            // update the wallet balance
            prevWalletRef.current = currentWalletRef.current;
            currentWalletRef.current = findWallet(data.walletId);

            if (data.walletId === "none") {
                if (currentWalletRef.current) {
                    const updatedCurrentWallet: Partial<WalletProps> = {
                        balance:
                            currentType === "income"
                                ? parseFloat(
                                      currentWalletRef.current.balance.toString()
                                  ) - parseFloat(data.amount.toString())
                                : parseFloat(
                                      currentWalletRef.current.balance.toString()
                                  ) + parseFloat(data.amount.toString()),
                    };
                    await Put<WalletProps>(
                        `wallet/update/${data.walletId}`,
                        updatedCurrentWallet
                    );
                }
                setHasEditedNote(!hasEditedNote);
                return;
            }
            if (
                data.walletId === noteDetail?.walletId &&
                data.amount === noteDetail?.amount
            ) {
                return;
            }

            console.log("prev wallet:", prevWalletRef.current);
            console.log("current wallet:", currentWalletRef.current);
            if (currentWalletRef.current) {
                const updatedCurrentWallet: Partial<WalletProps> = {
                    balance:
                        currentType === "income"
                            ? parseFloat(
                                  currentWalletRef.current.balance.toString()
                              ) + parseFloat(data.amount.toString())
                            : parseFloat(
                                  currentWalletRef.current.balance.toString()
                              ) - parseFloat(data.amount.toString()),
                };
                await Put<WalletProps>(
                    `wallet/update/${data.walletId}`,
                    updatedCurrentWallet
                );
                if (
                    prevWalletRef.current &&
                    currentWalletRef.current.id !== prevWalletRef.current.id
                ) {
                    const updatedPrevWallet: Partial<WalletProps> = {
                        balance:
                            currentType === "income"
                                ? parseFloat(
                                      prevWalletRef.current.balance.toString()
                                  ) - parseFloat(data.amount.toString())
                                : parseFloat(
                                      prevWalletRef.current.balance.toString()
                                  ) + parseFloat(data.amount.toString()),
                    };
                    await Put<WalletProps>(
                        `wallet/update/${prevWalletRef.current.id}`,
                        updatedPrevWallet
                    );
                }
            }
        } else {
            const bookId = currentBook.id;
            const newNote = await Post<NoteProps>(
                `note/create/${bookId}`,
                edittedNote
            );

            if (newNote) {
                setCurrentNote(newNote);
            }

            const selectedWallet = findWallet(data.walletId);
            if (selectedWallet) {
                const newValue = currentType?.includes("income")
                    ? parseFloat(selectedWallet.balance.toString()) +
                      parseFloat(data.amount.toString())
                    : parseFloat(selectedWallet.balance.toString()) -
                      parseFloat(data.amount.toString());
                const updatedWallet: Partial<WalletProps> = {
                    balance: newValue,
                };
                await Put<WalletProps>(
                    `wallet/update/${data.walletId}`,
                    updatedWallet
                );
            }
        }
        setHasEditedNote(!hasEditedNote);
        setHasEdittedWallet(!hasEdittedWallet);
    };

    return (
        <div className="ml-[5%] flex flex-col justify-center pt-4 border border-black rounded-3xl h-[60%] w-[90%] bg-transparent">
            <div className="w-full grid grid-cols-2 pb-2">
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
                    <Button variant={"ghost"} onClick={deleteNote}>
                        <DeleteIcon />
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
                    className="w-[95%] h-full self-center flex flex-col items-center gap-2"
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
                                            placeholder="What about writing something down"
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
