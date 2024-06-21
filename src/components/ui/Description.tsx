import React from "react";

const Description = ({ content }: { content: string }) => {
    return <p className="px-1 text-base font-normal truncate ...">{content}</p>;
};

export default Description;
