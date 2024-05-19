import React, { ReactNode } from "react";

const SinglePage = ({
    children,
    isBack = false,
    isLast = false,
}: {
    children: ReactNode;
    isBack?: boolean;
    isLast?: boolean;
}) => {
    return (
        <div
            className={
                "bg-[#E8DCB8] w-[95%] h-full" +
                (isLast ? " self-start" : " self-end") +
                (isBack ? " rotate-y-180" : "")
            }
        >
            {children}
        </div>
    );
};

export default SinglePage;
