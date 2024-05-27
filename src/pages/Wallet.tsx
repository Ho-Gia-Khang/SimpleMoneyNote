import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";

const Wallet = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage isBack>
            {isLoggedIn ? <div>Wallet</div> : <LoginReminder />}
        </SinglePage>
    );
};

export default Wallet;
