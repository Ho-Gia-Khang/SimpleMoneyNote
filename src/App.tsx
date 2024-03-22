import { useState } from "react";
import { Get } from "./api/Requests";
import BookLayout from "./components/ui/layout/BookLayout";
import LeftPage from "./components/functional/LeftPage";
import RightPage from "./components/functional/RightPage";

function App() {
    return (
        <BookLayout
            leftPage={<LeftPage />}
            rightPage={<RightPage />}
        ></BookLayout>
    );
}

export default App;
