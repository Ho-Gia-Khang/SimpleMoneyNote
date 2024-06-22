import React from "react";
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { useLogin } from "src/stores/LoginStore";
import { register } from "src/api/Requests";

const Register = () => {
    const registerFormSchema = z
        .object({
            email: z.string({ required_error: "Email is required" }).email(),
            password: z
                .string({ required_error: "Password is required" })
                .min(6, "Password must be at least 6 characters"),
            passwordConfirmation: z.string({
                required_error: "Password confirmation is required",
            }),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
            message: "Passwords do not match",
            path: ["passwordConfirmation"],
        });

    const registerForm = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
        const response = await register({
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
        });

        if (!response) {
            console.log("Register failed");
            return;
        }
        if (response === 201) {
            useLogin.getState().setIsLoggingIn(true);
            useLogin.getState().setIsRegistering(false);
        }
    };
    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onSubmit)}>
                <Card className="bg-transparent w-full h-full">
                    <CardHeader>
                        <CardTitle>Registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit">Register</Button>
                        <Button
                            variant={"outline"}
                            type="button"
                            className="bg-transparent border border-black"
                            onClick={() => {
                                useLogin.getState().setIsLoggingIn(true);
                                useLogin.getState().setIsRegistering(false);
                            }}
                        >
                            Back
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default Register;
