import React from "react";
import { Button } from "../ui/button";
import { useLogin } from "src/stores/LoginStore";
import { logout } from "src/api/Requests";

const LogoutButton = () => {
    const setLoggedIn = useLogin((state) => state.setIsLoggedIn);
    const setIsLoggingIn = useLogin((state) => state.setIsLoggingIn);
    return (
        <Button
            variant={"outline"}
            className="bg-transparent border border-black w-fit"
            onClick={async () => {
                const status = await logout();
                if (status === 200) {
                    setLoggedIn(false);
                    setIsLoggingIn(true);
                }
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
