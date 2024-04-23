import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";

const LayoutAdmin = () =>{

    return(
        <>
             {/* <Navbar/> */}
             <Outlet/>
        </>
   
    )

}

export default LayoutAdmin;