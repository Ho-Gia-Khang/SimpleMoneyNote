import React, { useCallback, useEffect, useState } from "react";
import { WalletProps } from "src/types";
import { Button } from "../ui/button";
import { Get } from "src/api/Requests";
import { useWallet } from "src/stores/WalletStore";
import Description from "../ui/Description";

const SingleWallet = ({ walletId }: { walletId: string }) => {
    const [wallet, setWallet] = useState<WalletProps>();
    const setCurrentWallet = useWallet((state) => state.setCurrentWallet);
    const setIsEdittingWallet = useWallet((state) => state.setIsEdittingWallet);
    const hasEdittedWallet = useWallet((state) => state.hasEdittedWallet);

    const fetchWallet = useCallback(async () => {
        const fetchedWallet = await Get<WalletProps>(
            `wallet/getOne/${walletId}`
        );

        if (!fetchedWallet) {
            console.log("Error getting wallet detail with id: ", walletId);
            return;
        }
        setWallet(fetchedWallet);
    }, [walletId]);

    useEffect(() => {
        fetchWallet();
    }, [fetchWallet, hasEdittedWallet]);

    if (!wallet) return <></>;

    return (
        <div className="h-[15%] grid grid-cols-10 mt-2">
            <Button
                className="h-full col-span-10 bg-transparent border-black border justify-start place-content-center p-0"
                variant={"outline"}
                onClick={() => {
                    setCurrentWallet(wallet);
                    setIsEdittingWallet(true);
                }}
            >
                <img
                    src={wallet.icon}
                    alt={wallet.name}
                    width={64}
                    height={64}
                />
                <div className="col-span-8 self-center w-full h-full">
                    <div className="h-full w-full grid grid-rows-2">
                        <div className="flex justify-around items-center text-lg">
                            <p
                                className={
                                    wallet.balance >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {wallet.balance}
                            </p>
                            <p>{wallet.name}</p>
                        </div>

                        <Description content={wallet.description!} />
                    </div>
                </div>
            </Button>
        </div>
    );
};

export default SingleWallet;
