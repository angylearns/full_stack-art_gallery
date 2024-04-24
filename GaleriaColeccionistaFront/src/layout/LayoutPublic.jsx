import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";

const LayoutPublic = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutPublic;