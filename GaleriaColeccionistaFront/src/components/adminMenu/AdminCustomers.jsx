import React, { useEffect, useState } from "react";
import { adminServiceF } from "../../services/adminServiceF";
import './adminCustomers.css'


function AdminCustomers({ customers }) {
    const [editMode, setEditMode] = useState(false);
    const [customersGlobal, setCustomersGlobal] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);

    const [fila, setFila] = useState([]);
    const [users, setUsers] = useState([]);
    const [persons, setPersons] = useState([]);
    const [editableRows, setEditableRows] = useState([]);

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
        password: '',
        user_type: 'Artist'
    });

    const handleEdit = (index) => {
        if (editableRows.includes(index)) {
            // Si la fila ya está en modo de edición, la eliminamos del estado editableRows
            setEditableRows(editableRows.filter((rowIndex) => rowIndex !== index));
        } else {
            // Si la fila no está en modo de edición, la añadimos al estado editableRows
            setEditableRows([...editableRows, index]);
        }
    };

    const handleSave = (index) => {
        adminServiceF.patchPerson(customersGlobal[index]);
        // Después de guardar, eliminamos la fila del estado editableRows
        setEditableRows(editableRows.filter((rowIndex) => rowIndex !== index));
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFila(customers[index]);
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChange = (newValue, index, field) => {
        // customers[index][field] = newValue;
        customersGlobal[index][field] = newValue;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function postUsers(formData) {

        const user1 = {
            id_user: "",
            user_name: formData.username,
            password: formData.password,
            user_type: 'Client',
            id_person: "",
            name: formData.name,
            last_name: formData.last_name,
            dni: formData.dni,
            birth_date: formData.birth_date,
            email: formData.email,
            telephone: formData.telephone,
            id_user_fk: ""
        }

        try {
            const newUser = await adminServiceF.postUser(user1);
        } catch (error) {
            console.error("Error al insertar datos:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await postUsers(formData);
        setUpdatePage(prevState => !prevState); // Cambiar el estado para forzar la actualización de la página
    };

    useEffect(() => {
        setCustomersGlobal(customers);
        setFila(customers);
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {

                const allPersons = await adminServiceF.getAllPersons();
                // Filtrar personas por tipo de usuario
                const clients = allPersons.filter(persona => persona.user_type === 'Client');
                // customers = clients
                setCustomersGlobal(clients);

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        }
        fetchUsers();
        setFila(customersGlobal);
    }, [updatePage]);


    const handleDelete = async (index) => {

        await deletePerson(index);

    };

    async function deletePerson(index) {
        adminServiceF.DeletePerson(customersGlobal[index]);
        setUpdatePage(prevState => !prevState); // Cambiar el estado para forzar la actualización de la página
    };

    return (
        <div className="mainContainer">
            <div className="getContainer">
                <h1>Clientes</h1>
                <div className="tableOwerflow">
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
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersGlobal.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id_person}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["name"]} onChange={(e) => handleInputChange(e.target.value, index, "name")} /> : user.name}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["last_name"]} onChange={(e) => handleInputChange(e.target.value, index, "last_name")} /> : user.last_name}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["dni"]} onChange={(e) => handleInputChange(e.target.value, index, "dni")} /> : user.dni}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["birth_date"]} onChange={(e) => handleInputChange(e.target.value, index, "birth_date")} /> : user.birth_date}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["email"]} onChange={(e) => handleInputChange(e.target.value, index, "email")} /> : user.email}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["telephone"]} onChange={(e) => handleInputChange(e.target.value, index, "telephone")} /> : user.telephone}</td>                                    {/* <td>{user.id_user_fk}</td> */}
                                    {/* <td>{editableRows.includes(index) ? <input type="text" value={user.id_user_fk} /> : user.id_user_fk}</td> */}
                                    <td>{user.id_user_fk}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={customersGlobal[index]["user_name"]} onChange={(e) => handleInputChange(e.target.value, index, "user_name")} /> : user.user_name}</td>
                                    {/* <td>{user.user_type}</td> */}
                                    <td>
                                        {editableRows.includes(index) ? (
                                            <button className="button1" onClick={() => handleSave(index)}><img src="https://i.postimg.cc/jSD9KCSq/salvar.png"></img></button>
                                        ) : (
                                            <button className="button1" onClick={() => handleEdit(index)}><img src="https://i.postimg.cc/HsQBd5Qt/editar.png"></img></button>
                                        )}
                                    </td>
                                    <td>
                                        <button className="button1" onClick={() => handleDelete(index)}><img src="https://i.postimg.cc/mgspHVbq/eliminar-simbolo.png"></img></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="postContainer">
                <form onSubmit={handleSubmit}>
                    <div className="formContentA">
                        <div className="groupForm1">
                            <div className="smallDiv">
                                <label className="labelStyle">Nombre:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="smallDiv">
                                <label className="labelStyle">Apellido:</label>
                                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                            </div>
                            <div className="smallDiv">
                                <label className="labelStyle">DNI:</label>
                                <input type="text" name="dni" value={formData.dni} onChange={handleChange} />

                            </div>
                            <div className="smallDiv">
                                <label className="labelStyle">Fecha de Nacimiento:</label>
                                <input type="text" name="birth_date" value={formData.birth_date} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="groupForm2">
                            <div className="smallDiv">
                                <label className="labelStyle">Email:</label>
                                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="smallDiv">
                                <label className="labelStyle">Teléfono:</label>
                                <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
                            </div>
                            <div className="smallDiv">
                                <label className="labelStyle">
                                    Usuario:</label>
                                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                            </div>
                            <div className="smallDiv">
                                <label className="labelStyle"> Contraseña: </label>
                                <input type="text" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                        </div>
                        {/* <label>
                        Tipo de usuario:
                        <select name="user_type" value={formData.user_type} onChange={handleChange}>                            
                            <option value="Artist">Artista</option>
                            <option value="Client">Cliente</option>                            
                        </select>
                        </label> */}<br></br>
                        <div className="buttonAdd"><button className="buttonAA" type="submit">Añadir Cliente</button></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminCustomers;
