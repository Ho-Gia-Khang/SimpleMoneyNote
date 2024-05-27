import React from "react";
import { Button } from "../ui/button";
import { useLogin } from "src/stores/LoginStore";
import { logout } from "src/api/Requests";

const LogoutButton = () => {
    const setLoggedIn = useLogin((state) => state.setIsLoggedIn);
    return (
        <Button
            onClick={async () => {
                const status = await logout();
                if (status === 200) {
                    setLoggedIn(false);
                }
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;