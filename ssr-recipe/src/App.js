import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Red from "./components/Red";
import Blue from "./components/Blue";

const App = () => {
    return (
        <div>
            <Menu />
            <hr />
            <Routes>
                <Route path="/red" element={<Red />} />
                <Route path="/blue" element={<Blue />} />
            </Routes>
        </div>
    );
};

export default App;
