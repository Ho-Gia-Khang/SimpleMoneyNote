import React, { ReactNode } from "react";

const LastPage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-[50%] h-[90%] absolute self-end border-black border-l-2 flex flex-col justify-start items-start">
            {children}
        </div>
    );
};

export default LastPage;
