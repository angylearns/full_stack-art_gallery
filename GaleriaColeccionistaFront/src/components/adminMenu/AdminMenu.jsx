import React, { useEffect, useState } from "react";

import { adminServiceF } from "../../services/adminServiceF";
import './adminMenu.css'



function AdminMenu() {
    const [users, setUsers] = useState([]);
    const [persons, setPersons] = useState([]);

    const [formData, setFormData] = useState({
        id_person: '',
        name: '',
        last_name: '',
        dni: '',
        birth_date: '',
        email: '',
        telephone: '',
        id_user: '',
        username: '',
        password:'',
        user_type: 'Client'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function postUsers(formData) {

        const user1 = {
            id_user:"",
            user_name:formData.username,
            password:formData.password,
            user_type:formData.user_type
        }

        try {
            const allPersons = await adminServiceF.postUser(user1);
            
            //limpiar formdata

        } catch (error) {
            console.error("Error al insertar datos:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario, por ejemplo, a través de una función prop que reciba este formData
        console.log(formData);
        postUsers(formData);
    };

    useEffect(() => {
        async function fetchUsers() {
            try {
                // const allUsers = await adminServiceF.getAllUser();
                // setUsers(allUsers);
                const allPersons = await adminServiceF.getAllPersons();
                setPersons(allPersons);

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        }

        fetchUsers();
    }, []);

    console.log(users);

    return (
        <div className="mainContainer">
            <div className="getContainer">
                <h1>Lista de usuarios registrados</h1>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>ID de Usuario</th>
                            <th>Nombre Usuario</th>
                            <th>Tipo de usuario</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id_person}</td>
                                <td>{user.name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.dni}</td>
                                <td>{user.birth_date}</td>
                                <td>{user.email}</td>
                                <td>{user.telephone}</td>
                                <td>{user.id_user_fk}</td>
                                <td>{user.user_name}</td>
                                <td>{user.user_type}</td>
                                <td>boton editar</td>
                                <td>boton eliminar</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="postContainer">
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Apellido:
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </label>
                    <label>
                        DNI:
                        <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
                    </label>
                    <label>
                        Fecha de Nacimiento:
                        <input type="text" name="birth_date" value={formData.birth_date} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Teléfono:
                        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
                    </label>
                    <label>
                        Nombre de Usuario:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    <label>
                        Contraseña:
                        <input type="text" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <label>
                        Tipo de usuario:
                        <select name="user_type" value={formData.user_type} onChange={handleChange}>                            
                            <option value="Artist">Artista</option>
                            <option value="Client">Cliente</option>                            
                        </select>
                    </label>
                    <button type="submit">Añadir Usuario</button>
                </form>
            </div>



        </div>
    );
}

export default AdminMenu;
