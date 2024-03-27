import React, { ReactNode } from "react";

const SinglePage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="z-10 absolute bg-[#E8DCB8] w-[90%] h-[90%]">
            {children}
        </div>
    );
};

export default SinglePage;
