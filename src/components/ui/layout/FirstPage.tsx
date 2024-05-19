import React, { ReactNode } from "react";

const FirstPage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-[50%] h-[90%] absolute self-stretch border-black border-r-2 flex flex-col">
            {children}
        </div>
    );
};

export default FirstPage;
