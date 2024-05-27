import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { useLogin } from "src/stores/LoginStore";
import LoginReminder from "src/components/ui/layout/LoginReminder";

const NoteEditing = () => {
    const isLoggedIn = useLogin((state) => state.isLoggedIn);
    return (
        <SinglePage>
            {isLoggedIn ? <div>Note editing page</div> : <LoginReminder />}
        </SinglePage>
    );
};

export default NoteEditing;