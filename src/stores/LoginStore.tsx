import { create } from "zustand";

interface Login {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

let refrestToken = localStorage.getItem("refreshToken");

export const useLogin = create<Login>((set) => ({
    isLoggedIn: refrestToken ? true : false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
}));
