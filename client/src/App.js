import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import ForgotPassword from "./containers/Auth/ForgotPassword";
import UserDashboard from "./containers/User/UserDashboard";
import AdminDashboard from "./containers/Admin/AdminDashboard";
import DeveloperDashboard from "./containers/Developer/DeveloperDashboard";
import ResetPassword from "./containers/Auth/ResetPassword";

const App = () => {
  return (
    <Router>
      <ConditionalRouting />
    </Router>
  );
};

const ConditionalRouting = () => {
  const { userRole } = useSelector((state) => state.user);
  if (userRole === "user") {
    return <UserScreen />;
  } else if (userRole === "developer") {
    return <DeveloperScreen />;
  } else if (userRole === "admin") {
    return <AdminScreen />;
  } else {
    return <AuthScreens />;
  }
};

const AuthScreens = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      <Route exact path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
};

const DeveloperScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<DeveloperDashboard />} />
    </Routes>
  );
};

const UserScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserDashboard />} />
    </Routes>
  );
};
const AdminScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
