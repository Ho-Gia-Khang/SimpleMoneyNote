import React from "react";

const BookCover = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div
            className={
                "bg-[#523211] relative w-[90%] h-full rounded-2xl border-black border-2 flex flex-col justify-center items-center"
            }
        >
            <div className="z-50 absolute w-0 h-full border-2 border-black justify-self-center"></div>
            {children}
        </div>
    );
};

export default BookCover;
