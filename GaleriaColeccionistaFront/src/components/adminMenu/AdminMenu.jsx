import React, { useEffect, useState } from "react";

import { adminServiceF } from "../../services/adminServiceF";




function AdminMenu() {
    const [users, setUsers] = useState([]);

        
    useEffect(() => {
        async function fetchUsers() {
            try {
                const allUsers = await adminServiceF.getAllUser();
                setUsers(allUsers);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        }

        fetchUsers();
    }, []);

    console.log(users);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        ID: {user[0]}, Nombre: {user[1]}, Usuario: {user[2]}, Rol: {user[3]}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default AdminMenu;
