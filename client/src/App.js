import React from "react";
import "./App.css";
import ConditionalRouting from "./components/ConditionalRoute";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <ConditionalRouting />
    </Router>
  );
};

export default App;
