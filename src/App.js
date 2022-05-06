import React from "react";
import Mindmap from "./component/mindmap";
import Present from "./component/Present";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mindmap />} />
        <Route path="/present" element={<Present />} />
      </Routes>
    </Router>
  );
}

export default App;
