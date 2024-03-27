import React from "react";
import SinglePage from "./SinglePage";
import { useNoteNavigation } from "src/stores/NavigationStore";
import BookMark from "./BookMark";

const LeftPage = () => {
    const noteNavigation = useNoteNavigation((state) => state.Notechecked);
    const setNoteVavigation = useNoteNavigation(
        (state) => state.setNoteChecked
    );
    const flip: string = noteNavigation ? " -rotate-180" : "";
    return (
        <div
            className={`flex flex-col justify-center items-end w-full h-full absolute origin-center duration-1000 ${flip}`}
        >
            <BookMark
                name="Notes"
                checkedEvent={() => setNoteVavigation(true)}
            />
            <SinglePage>
                <div>Left Page</div>
            </SinglePage>
        </div>
    );
};

export default LeftPage;
