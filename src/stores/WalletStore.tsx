import { create } from "zustand";
import { WalletInfoProps, WalletProps } from "src/types";

interface Wallet {
    currentWallet: WalletProps;
    setCurrentWallet: (wallet: WalletProps) => void;
}

interface WalletInfo {
    walletInfos: WalletInfoProps[];
    setWalletInfos: (walletInfo: WalletInfoProps[]) => void;
}

export const useWallet = create<Wallet>((set) => ({
    currentWallet: {} as WalletProps,
    setCurrentWallet: (wallet) => set({ currentWallet: wallet }),
}));

export const useWalletInfo = create<WalletInfo>((set) => ({
    walletInfos: [],
    setWalletInfos: (walletInfo) => set({ walletInfos: walletInfo }),
}));
