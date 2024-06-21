import { create } from "zustand";
import { WalletInfoProps, WalletProps } from "src/types";

interface Wallet {
    currentWallet: WalletProps;
    isEdittingWallet: boolean;
    isCreatingWallet: boolean;
    hasEdittedWallet: boolean;
    setCurrentWallet: (wallet: WalletProps) => void;
    setIsEdittingWallet: (isEditting: boolean) => void;
    setIsCreatingWallet: (isCreating: boolean) => void;
    setHasEdittedWallet: (hasEditted: boolean) => void;
}

interface WalletInfo {
    walletInfos: WalletInfoProps[];
    setWalletInfos: (walletInfo: WalletInfoProps[]) => void;
}

export const useWallet = create<Wallet>((set) => ({
    currentWallet: {} as WalletProps,
    isEdittingWallet: false,
    isCreatingWallet: false,
    hasEdittedWallet: false,
    setCurrentWallet: (wallet) => set({ currentWallet: wallet }),
    setIsEdittingWallet: (isEditting) => set({ isEdittingWallet: isEditting }),
    setIsCreatingWallet: (isCreating) => set({ isCreatingWallet: isCreating }),
    setHasEdittedWallet: (hasEditted) => set({ hasEdittedWallet: hasEditted }),
}));

export const useWalletInfo = create<WalletInfo>((set) => ({
    walletInfos: [],
    setWalletInfos: (walletInfo) => set({ walletInfos: walletInfo }),
}));
