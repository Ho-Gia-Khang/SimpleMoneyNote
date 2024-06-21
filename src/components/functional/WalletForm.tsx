import React from "react";
import { WalletProps } from "src/types";
import { useWallet } from "src/stores/WalletStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CloseIcon from "@mui/icons-material/Close";
import { Label } from "../ui/label";
import ColoredSeparator from "../ui/coloredSeparator";
import { Textarea } from "../ui/textarea";
import { Post, Put } from "src/api/Requests";

const WalletForm = ({ walletDetails }: { walletDetails?: WalletProps }) => {
    const hasEdittedWallet = useWallet((state) => state.hasEdittedWallet);

    const setIsEdittingWallet = useWallet((state) => state.setIsEdittingWallet);
    const setIsCreatingWallet = useWallet((state) => state.setIsCreatingWallet);
    const setHasEdittedWallet = useWallet((state) => state.setHasEdittedWallet);

    const walletFormSchema = z.object({
        name: z.string({
            required_error: "Wallet name is required",
        }),
        balance: z.number({
            required_error: "Wallet balance is required",
        }),
        interest: z.number().optional(),
        description: z.string().optional(),
    });

    const walletForm = useForm<z.infer<typeof walletFormSchema>>({
        resolver: zodResolver(walletFormSchema),
        defaultValues: {
            name: walletDetails ? walletDetails.name : "",
            balance: walletDetails ? walletDetails.balance : 0,
            interest: walletDetails?.interest ? walletDetails.interest : 0,
            description: walletDetails?.description
                ? walletDetails.description
                : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof walletFormSchema>) => {
        const edittedWallet: Omit<
            WalletProps,
            "id" | "userId" | "currency" | "icon" | "theme"
        > = {
            name: values.name,
            balance: JSON.parse(values.balance.toString()),
            interest: JSON.parse(JSON.stringify(values.interest)),
            description: values.description,
        };
        console.log(edittedWallet);

        if (walletDetails) {
            await Put<WalletProps>(
                `wallet/update/${walletDetails.id}`,
                edittedWallet
            );
        } else {
            await Post<WalletProps>(`wallet/create`, edittedWallet);
        }

        setHasEdittedWallet(!hasEdittedWallet);
    };

    return (
        <div className="ml-[5%] flex flex-col justify-start pt-4 border border-black rounded-3xl h-[90%] w-[90%] bg-transparent">
            <div className="flex justify-end pb-2">
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        setIsEdittingWallet(false);
                        setIsCreatingWallet(false);
                    }}
                >
                    <CloseIcon />
                </Button>
            </div>
            <Form {...walletForm}>
                <form
                    onSubmit={walletForm.handleSubmit(onSubmit)}
                    className="w-[95%] h-full self-center flex flex-col items-center gap-2"
                >
                    <FormField
                        control={walletForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full grid grid-cols-6">
                                <Label className="text-center self-center col-span-2">
                                    Wallet's name
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Wallet name"
                                        className="col-span-4 bg-transparent border border-black w-full"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <ColoredSeparator />
                    <FormField
                        control={walletForm.control}
                        name="balance"
                        render={({ field }) => (
                            <FormItem className="w-full grid grid-cols-6">
                                <Label className="text-center self-center col-span-2">
                                    Balance
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="000000"
                                        className="col-span-4 bg-transparent border border-black w-full"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <ColoredSeparator />
                    <FormField
                        control={walletForm.control}
                        name="interest"
                        render={({ field }) => (
                            <FormItem className="w-full grid grid-cols-6">
                                <Label className="text-center self-center col-span-2">
                                    Interest
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="0.0%"
                                        className="col-span-4 bg-transparent border border-black w-full"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <ColoredSeparator />
                    <FormField
                        control={walletForm.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full grid grid-cols-6">
                                <Label className="text-center self-center col-span-2">
                                    Description
                                </Label>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="col-span-4 bg-transparent border border-black w-full"
                                        placeholder="What about writing something down?"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        variant={"outline"}
                        type="button"
                        className="self-end bg-transparent border border-black"
                        onClick={() => {
                            onSubmit(walletForm.getValues());
                        }}
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default WalletForm;
