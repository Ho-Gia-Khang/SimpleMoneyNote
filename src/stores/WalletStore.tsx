import { create } from "zustand";
import { WalletInfoProps, WalletProps } from "src/types";

interface Wallet {
    wallet: WalletProps;
    setWallets: (wallet: WalletProps) => void;
}

interface WalletInfo {
    walletInfos: WalletInfoProps[];
    setWalletInfos: (walletInfo: WalletInfoProps[]) => void;
}

export const useWallet = create<Wallet>((set) => ({
    wallet: {} as WalletProps,
    setWallets: (wallet) => set({ wallet: wallet }),
}));

export const useWalletInfo = create<WalletInfo>((set) => ({
    walletInfos: [],
    setWalletInfos: (walletInfo) => set({ walletInfos: walletInfo }),
}));
