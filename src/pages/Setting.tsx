import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import Login from "../components/functional/Login";
import { useLogin } from "src/stores/LoginStore";
import AppSettings from "src/components/functional/AppSettings";

const Setting = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage isBack>
            {isLoggedIn ? <AppSettings /> : <Login />}
        </SinglePage>
    );
};

export default Setting;
