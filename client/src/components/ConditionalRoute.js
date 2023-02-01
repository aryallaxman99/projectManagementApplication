import { BrowserRouter as Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "../containers/Auth/Register";
import Login from "../containers/Auth/Login";
import ForgotPassword from "../containers/Auth/ForgotPassword";
import UserDashboard from "../containers/User/UserDashboard";
import AdminDashboard from "../containers/Admin/AdminDashboard";
import DeveloperDashboard from "../containers/Developer/DeveloperDashboard";
import OtpSender from "../containers/Auth/OtpSender";
import ResetPassword from "../containers/Auth/ResetPassword";
import ErrorPage from "../containers/ErrorPage/Error";

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
      <Route exact path="/otp" element={<OtpSender />} />
      <Route exact path="/resetpassword" element={<ResetPassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

const DeveloperScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<DeveloperDashboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

const UserScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserDashboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
const AdminScreen = () => {
  return (
    <Routes>
      <Route exact path="/" element={<AdminDashboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ConditionalRouting;
