import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import { useWallet } from "src/stores/WalletStore";
import WalletForm from "src/components/functional/WalletForm";

const WalletEditing = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    const currentWallet = useWallet((state) => state.currentWallet);
    const isEdittingWallet = useWallet((state) => state.isEdittingWallet);
    const isCreatingWallet = useWallet((state) => state.isCreatingWallet);

    return (
        <SinglePage>
            {isLoggedIn ? (
                <div className="h-full py-2">
                    {isEdittingWallet && !isCreatingWallet ? (
                        <WalletForm walletDetails={currentWallet} />
                    ) : (
                        <></>
                    )}
                    {isCreatingWallet && !isEdittingWallet ? (
                        <WalletForm />
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <LoginReminder />
            )}
        </SinglePage>
    );
};

export default WalletEditing;
