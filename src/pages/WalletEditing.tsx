import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";

const WalletEditing = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage>
            {isLoggedIn ? <div>Wallet editing page</div> : <LoginReminder />}
        </SinglePage>
    );
};

export default WalletEditing;
