import React from "react";
import { defaultSettings } from "src/utils/settings";

const WalletHeader = ({ asset }: { asset: number }) => {
    const defaultCurrency = defaultSettings.defaultCurrency;
    return (
        <div>
            <h1 className="font-bold text-2xl">Wallet</h1>
            <p className="font-semibold text-xl">
                Asset: {asset} {defaultCurrency}
            </p>
        </div>
    );
};

export default WalletHeader;
