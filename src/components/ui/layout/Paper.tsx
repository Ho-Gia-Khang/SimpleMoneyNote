import React, { ReactNode } from "react";

const Paper = ({ children, z = 0 }: { children: ReactNode; z?: number }) => {
    return (
        <div
            className={`absolute w-[50%] h-[90%] self-end perspective-1000`}
            style={{ zIndex: z }}
        >
            {children}
        </div>
    );
};

export default Paper;
