import React from "react";
import "./App.css";
import ConditionalRouting from "./components/ConditionalRoute";
import Header from "./components/Headers/Header";

const App = () => {
  return (
    <>
      <Header />
      <ConditionalRouting />
    </>
  );
};

export default App;
