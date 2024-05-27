import React from "react";
import { NoteInfoProps } from "src/types";
import { Button } from "../ui/button";

const SingleNote = ({ note }: { note: NoteInfoProps }) => {
    return (
        <div className="grid grid-rows-10">
            <div className="row-span-8"></div>
            <Button className="row-span-2">Delete</Button>
        </div>
    );
};

export default SingleNote;
