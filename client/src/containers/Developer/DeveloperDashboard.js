import React from "react";
import { useSelector } from "react-redux";

const DeveloperDashboard = () => {
  const { name } = useSelector((state) => state.user);

  return (
    <>
      <h4>Welcome, {name}</h4>
    </>
  );
};
export default DeveloperDashboard;
