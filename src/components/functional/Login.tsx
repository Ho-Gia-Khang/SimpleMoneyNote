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
import { login } from "src/api/Requests";
import { useLogin } from "src/stores/LoginStore";

const Login = () => {
    const loginFormSchema = z.object({
        email: z.string({ required_error: "Email is required" }).email(),
        password: z.string({ required_error: "Password is required" }),
    });

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const setLoggedIn = useLogin((state) => state.setIsLoggedIn);

    const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
        const response = await login({
            email: data.email,
            password: data.password,
        });

        if (!response) {
            console.log("Login failed");
            return;
        }
        if (response === 200) {
            setLoggedIn(true);
        }
    };
    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                <Card className="bg-transparent w-full h-full">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={loginForm.control}
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
                            control={loginForm.control}
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
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="submit">Login</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default Login;
