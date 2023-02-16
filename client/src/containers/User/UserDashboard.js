import React from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { name } = useSelector((state) => state.user);

  return (
    <>
      <h4>Welcome, {name}</h4>
    </>
  );
};
export default UserDashboard;
