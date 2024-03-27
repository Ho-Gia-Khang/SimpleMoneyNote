import React, { ReactNode } from "react";
import BookCover from "../../functional/BookCover";
import NotePage from "src/pages/NotePage";
import NoteEditingPage from "src/pages/NoteEditingPage";

const BookLayout = ({
    leftPage,
    rightPage,
    children,
}: {
    leftPage: ReactNode;
    rightPage: ReactNode;
    children?: ReactNode;
}) => {
    return (
        <main className="flex flex-col items-center justify-end w-screen h-screen">
            <div className="w-[80%] h-[80%] mb-2 flex justify-between">
                <BookCover front>
                    <NotePage />
                </BookCover>
                <BookCover>
                    <NoteEditingPage />
                </BookCover>
            </div>
            <div>{children}</div>
        </main>
    );
};

export default BookLayout;
