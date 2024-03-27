import React from "react";

const BookCover = ({
    front = false,
    children,
}: {
    front?: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={
                "bg-[#523211] w-[50%] h-full relative" +
                (front
                    ? " rounded-bl-3xl rounded-tl-3xl border border-l-2 border-black"
                    : " rounded-br-3xl rounded-tr-3xl border border-r-2 border-black")
            }
        >
            {children}
        </div>
    );
};

export default BookCover;
