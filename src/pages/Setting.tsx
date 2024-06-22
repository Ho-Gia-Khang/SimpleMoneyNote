import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import Login from "../components/functional/Login";
import { useLogin } from "src/stores/LoginStore";
import AppSettings from "src/components/functional/AppSettings";
import Register from "src/components/functional/Register";

const Setting = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    const isLoggingIn = useLogin((state) => state.isLoggingIn);
    const isRegistering = useLogin((state) => state.isRegistering);
    return (
        <SinglePage isBack>
            {isLoggedIn ? (
                <AppSettings />
            ) : isLoggingIn && !isRegistering ? (
                <Login />
            ) : (
                <Register />
            )}
        </SinglePage>
    );
};

export default Setting;
