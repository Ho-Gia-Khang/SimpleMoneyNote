import React, { useState } from "react";
import { Get } from "./api/Requests";
import { TodoProps } from "./types";

function App() {
    const [data, setData] = useState<TodoProps>();
    const getData = async () => {
        let newData: TodoProps;
        newData = await Get<TodoProps>("todos/1");
        setData(newData);
        console.log(newData);
        console.log(data);
    };

    return (
        <main>
            <button onClick={getData}>Get Data</button>
        </main>
    );
}

export default App;
