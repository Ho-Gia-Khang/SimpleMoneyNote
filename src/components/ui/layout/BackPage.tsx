import React, { ReactNode } from "react";

const BackPage = ({
    children,
    flipped = false,
}: {
    children: ReactNode;
    flipped?: boolean;
}) => {
    return (
        <div
            className={
                `z-0 w-full h-full absolute origin-left border-black border-l-2 duration-500` +
                (flipped ? " -rotate-y-180" : "")
            }
        >
            {children}
        </div>
    );
};

export default BackPage;
