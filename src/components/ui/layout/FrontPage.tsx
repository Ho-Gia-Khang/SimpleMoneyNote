import React, { ReactNode } from "react";

const FrontPage = ({
    children,
    flipped = false,
}: {
    children: ReactNode;
    flipped?: boolean;
}) => {
    return (
        <div
            className={
                `z-10 w-full h-full absolute border-black border-l-2 origin-left backface-hidden duration-500` +
                (flipped ? " -rotate-y-180" : "")
            }
        >
            {children}
        </div>
    );
};

export default FrontPage;
