import React from "react";

const BookMark = ({
    name,
    checkedEvent,
}: {
    name: string;
    checkedEvent: () => void;
}) => {
    return (
        <label>
            {name}
            <input type="checkbox" />
        </label>
    );
};

export default BookMark;
