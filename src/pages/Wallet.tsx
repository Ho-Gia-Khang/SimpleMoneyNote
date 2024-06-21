import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import { useWalletInfo } from "src/stores/WalletStore";
import SingleWallet from "src/components/functional/SingleWallet";
import WalletHeader from "src/components/functional/WalletHeader";
import { Separator } from "src/components/ui/separator";

const Wallet = () => {
    const allWalletInfos = useWalletInfo((state) => state.walletInfos);

    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage isBack>
            {isLoggedIn ? (
                allWalletInfos ? (
                    <>
                        <WalletHeader />
                        <Separator className="my-2" />
                        {allWalletInfos.map((walletInfo) => (
                            <SingleWallet
                                key={walletInfo.id}
                                walletId={walletInfo.id}
                            />
                        ))}
                    </>
                ) : (
                    <></>
                )
            ) : (
                <LoginReminder />
            )}
        </SinglePage>
    );
};

export default Wallet;
