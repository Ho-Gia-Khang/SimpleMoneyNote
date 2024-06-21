import React, { useMemo } from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";
import { useWallet, useWalletInfo } from "src/stores/WalletStore";
import SingleWallet from "src/components/functional/SingleWallet";
import WalletHeader from "src/components/functional/WalletHeader";
import ColoredSeparator from "src/components/ui/coloredSeparator";
import { Button } from "src/components/ui/button";

const Wallet = () => {
    const allWalletInfos = useWalletInfo((state) => state.walletInfos);

    const asset = useMemo(() => {
        let total: number = 0;
        allWalletInfos.forEach((walletInfo) => {
            total += walletInfo.balance;
        });

        return total;
    }, [allWalletInfos]);

    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage isBack>
            {isLoggedIn ? (
                allWalletInfos ? (
                    <div className="p-1">
                        <WalletHeader asset={asset} />
                        <ColoredSeparator />
                        {allWalletInfos.map((walletInfo) => (
                            <SingleWallet
                                key={walletInfo.id}
                                walletId={walletInfo.id}
                            />
                        ))}
                        <Button
                            variant={"outline"}
                            className="absolute bg-transparent border border-black rounded-full bottom-2 right-2 h-fit"
                            onClick={() => {
                                useWallet.getState().setIsCreatingWallet(true);
                            }}
                        >
                            <img
                                src="icons/note/add-icon.jpg"
                                alt="add-icon"
                                width={42}
                                height={42}
                            />
                        </Button>
                    </div>
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
