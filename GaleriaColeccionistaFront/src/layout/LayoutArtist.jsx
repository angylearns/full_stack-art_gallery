import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";

const LayoutArtist = () =>{

    return(
        <>
             <Navbar/>
             <Outlet/>
        </>
   
    )

}

export default LayoutArtist;