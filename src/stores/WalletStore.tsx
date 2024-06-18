import { create } from "zustand";
import { WalletInfoProps, WalletProps } from "src/types";

interface Wallet {
    wallets: WalletProps[];
    setWallets: (wallet: WalletProps[]) => void;
}

interface WalletInfo {
    walletInfos: WalletInfoProps[];
    setWalletInfos: (walletInfo: WalletInfoProps[]) => void;
}

export const useWallet = create<Wallet>((set) => ({
    wallets: [],
    setWallets: (wallets) => set({ wallets: wallets }),
}));

export const useWalletInfo = create<WalletInfo>((set) => ({
    walletInfos: [],
    setWalletInfos: (walletInfo) => set({ walletInfos: walletInfo }),
}));
