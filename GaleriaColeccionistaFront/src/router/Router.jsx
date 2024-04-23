import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Gallery from "../views/Gallery";

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


    }
])