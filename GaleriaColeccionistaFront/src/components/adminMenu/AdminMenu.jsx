import React, { useEffect, useState } from "react";

import { adminServiceF } from "../../services/adminServiceF";
import './adminMenu.css'
import AdminCustomers from "./AdminCustomers";
import AdminArtists from "./AdminArtists";


function AdminMenu() {

    // Estado para almacenar qué componente renderizar en la columna2
    const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
    // const [persons, setPersons] = useState([]);
    const [artists, setArtists] = useState([]);
    const [customers, setCustomers] = useState([]);

    // Función para cambiar el componente seleccionado cuando se presiona un botón
    const handleBotonClick = (componente) => {
        setComponenteSeleccionado(componente);
        return componenteSeleccionado
    };

    useEffect(() => {
        async function fetchUsers() {
            try {

                const allPersons = await adminServiceF.getAllPersons();
                // setPersons(allPersons);
                // Filtrar personas por tipo de usuario
                const artistas = allPersons.filter(persona => persona.user_type === 'Artist');
                const clientes = allPersons.filter(persona => persona.user_type === 'Client');

                // Almacenar resultados en variables de estado
                setArtists(artistas);
                setCustomers(clientes);

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>

            <div className="container">
                <div className="columna1">
                    <button className="button1" onClick={() => handleBotonClick("ArtistasComponent")}>Artistas</button>
                    <button className="button1" onClick={() => handleBotonClick("ClienteComponent")}>Clientes</button>
                </div>
                <div className="columna2">
                    
                    {componenteSeleccionado === "ArtistasComponent" && <AdminArtists artists={artists}/>}
                    {componenteSeleccionado === "ClienteComponent" && <AdminCustomers customers={customers}/>}
                </div>
            </div>

        </>
    );
}

export default AdminMenu;
