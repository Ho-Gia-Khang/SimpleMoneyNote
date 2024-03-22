import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

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
        <main>
            <Header />
            <div className="page-layout">
                <div className="left-page">{leftPage}</div>
                <div className="right-page">{rightPage}</div>
            </div>
            <div>{children}</div>
            <Footer />
        </main>
    );
};

export default BookLayout;
