import React, { useEffect, useState } from "react";

import { adminServiceF } from "../../services/adminServiceF";
import './adminMenu.css'



function AdminMenu() {


    return (
        <>

            <div className="container">
                <div className="columna1">
                    <button>Botón 1</button>
                    <button>Botón 2</button>
                </div>
                <div className="columna2">
                    Contenido de la columna 2
                </div>
            </div>

        </>
    );
}

export default AdminMenu;
