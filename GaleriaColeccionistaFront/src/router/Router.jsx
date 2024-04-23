import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Gallery from "../views/Gallery";
import LayoutPublic from "../layout/LayoutPublic.jsx";
import Artist from "../views/Artist.jsx";
import LayoutArtist from "../layout/LayoutArtist.jsx";
import Administrator from "../layout/LayoutAdmin.jsx";
import LayoutAdmin from "../layout/LayoutAdmin.jsx";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPublic/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/gallery",
                element: <Gallery/>
            }


        ]


    
    },
    {
        path: '/artist',
        element: <LayoutArtist/>,
        children: [
            {
                index: true,
                element:<Artist/>
            }

        ]
    },
    {
        path: '/admin',
        element: <LayoutAdmin/>,
        children: [
            {
                index: true,
                element:<Administrator/>,
            }
          

        ]
    }

    
])