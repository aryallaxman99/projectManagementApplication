import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./containers/registration/Register";
import Login from "./containers/login/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
