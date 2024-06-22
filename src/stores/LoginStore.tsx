import { create } from "zustand";

interface Login {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    isRegistering: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsLoggingIn: (isLoggingIn: boolean) => void;
    setIsRegistering: (isRegistering: boolean) => void;
}

let refrestToken = localStorage.getItem("refreshToken");

export const useLogin = create<Login>((set) => ({
    isLoggedIn: refrestToken ? true : false,
    isLoggingIn: true,
    isRegistering: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
    setIsLoggingIn: (isLoggingIn) => set({ isLoggingIn: isLoggingIn }),
    setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
}));
