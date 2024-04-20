import React, { useEffect, useState } from "react";

import { adminServiceF } from "../../services/adminServiceF";
import './adminArtists.css'

import TransposedTable from './TransposedTable';


function AdminArtists({ artists }) {
    const [editMode, setEditMode] = useState(false);
    const [artistsGlobal, setArtistGlobal] = useState([]);

    // const [data, setData] = useState(initialData);
    // const [editIndex, setEditIndex] = useState(null);
    // const [editedValue, setEditedValue] = useState("");

    const [updatePage, setUpdatePage] = useState(false); // Nuevo estado para forzar la actualización de la página

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


    // const handleEdit = () => {
    //     setEditMode(true);
    // };
    // const handleEdit = (index, value) => {
    //     setEditIndex(index);
    //     setEditedValue(value);
    //   };

    //   const handleSave = (index) => {
    //     const newData = [...data];
    //     newData[index] = editedValue;
    //     setData(newData);
    //     setEditIndex(null);
    //   };

    //   const handleChange2 = (e) => {
    //     setEditedValue(e.target.value);
    //   };

    // function FormatDate( artists ) {
    //     // Convertir la cadena de fecha a un objeto Date
    //     for (let i = 0; i < artists.length; i++) {
    //         const subArray = artists[i];
            
    //         // for (let j = 0; j < subArray.length; j++) {
              
    //         const fechaObjeto = new Date(subArray.birth_date);
    //         // Obtener el día, mes y año
    //         const dia = fechaObjeto.getDate();
    //         const mes = fechaObjeto.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
    //         const año = fechaObjeto.getFullYear();
            
    //         // Formatear la fecha como deseas
    //         const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;
            
    //         // Asignar la fecha formateada como un string a birth_date
    //         artists[i].birth_date = toString(fechaFormateada);


    //         // }
    //       }
       
    //   }

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

        // const newData = [...data];
        // newData[index] = editedValue;
        // setData(newData);
        // setEditIndex(null);

        // obtener los nuevos valores de la fila correspondiente a 'index' y guardarlos en  backend 
        // Recuperar la fila correspondiente usando el índice
        // const fila = artists[index];
        //setFila(artists[index]);

        //artist tiene los datos que se han modificado, eso es lo que me llevo a la base de datos
        // adminServiceF.patchPerson(artists[index]);

        
        
        adminServiceF.patchPerson(artistsGlobal[index]);


        // Después de guardar, eliminamos la fila del estado editableRows
        setEditableRows(editableRows.filter((rowIndex) => rowIndex !== index));
    };


    // const handleFieldChange = (e) => {
    //     const { name, value } = e.target;
    //     setFila(artists[index]);
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleInputChange = (newValue, index, field) => {
        // // //  setFila(artists[index]);
        // setFila(artistsGlobal[index]);
        // setFila({ ...fila, field: newValue });
        // // // setFila(artistsGlobal[index]);
        // // // setFila({ ...fila, field: newValue })
        //  artists[index][field] = newValue;
        // // artistsGlobal[index]= fila;
        // setArtistGlobal(artists);
         
        artistsGlobal[index][field] = newValue;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleChange2 = (e, fieldName) => {
    //     const { value } = e.target;
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [fieldName]: value
    //     }));
    // };

    async function postUsers(formData) {

        const user1 = {
            id_user: "",
            user_name: formData.username,
            password: formData.password,
            user_type: 'Artist',
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
            // const newPerson = await adminServiceF.postPerson(person1);
        } catch (error) {
            console.error("Error al insertar datos:", error);
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     console.log(formData);
    //     postUsers(formData);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        await postUsers(formData);
        // window.location.reload(); // Recargar la página
        setUpdatePage(prevState => !prevState); // Cambiar el estado para forzar la actualización de la página
    };

    useEffect(() => {
       
        setArtistGlobal(artists);
        
        setFila(artists);
    }, []);

    useEffect(() => {

        async function fetchUsers() {
            try {

                const allPersons = await adminServiceF.getAllPersons();
                // Filtrar personas por tipo de usuario
                const artistas = allPersons.filter(persona => persona.user_type === 'Artist');
              
                setArtistGlobal(artistas);
                
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        }

        fetchUsers();

        // setFila(artists);
        setFila(artistsGlobal);
    }, [updatePage]);

 
    const handleDelete = async (index) => {
               
        await deletePerson(index);
        // window.location.reload(); // Recargar la página
    };
    
    async function deletePerson (index){

        adminServiceF.DeletePerson(artistsGlobal[index]);
        setUpdatePage(prevState => !prevState); // Cambiar el estado para forzar la actualización de la página
    };



    return (
        <div className="mainContainer">
            <div className="getContainer">
                <h1>Artistas</h1>
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
                            {artistsGlobal.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id_person}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["name"]} onChange={(e) => handleInputChange(e.target.value, index, "name")} /> : user.name}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["last_name"]} onChange={(e) => handleInputChange(e.target.value, index,"last_name")} /> : user.last_name}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["dni"]} onChange={(e) => handleInputChange(e.target.value,index, "dni")} /> : user.dni}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["birth_date"]} onChange={(e) => handleInputChange(e.target.value,index, "birth_date")} /> : user.birth_date}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["email"]} onChange={(e) => handleInputChange(e.target.value,index, "email")} /> : user.email}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["telephone"]} onChange={(e) => handleInputChange(e.target.value,index, "telephone")} /> : user.telephone}</td>                                    {/* <td>{user.id_user_fk}</td> */}
                                    <td>{ user.id_user_fk}</td>
                                    <td>{editableRows.includes(index) ? <input type="text" defaultValue={artistsGlobal[index]["user_name"]} onChange={(e) => handleInputChange(e.target.value, index,"user_name")} /> : user.user_name}</td>
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
                    {/* <label>
                        Tipo de usuario:
                        <select name="user_type" value={formData.user_type} onChange={handleChange}>                            
                            <option value="Artist">Artista</option>
                            <option value="Client">Cliente</option>                            
                        </select>
                    </label> */}<br></br>
                    <button className="button" type="submit">Añadir Artista</button>
                </form>
            </div>

            {/* <div>
      <h1>Tabla Transpuesta</h1>
      <TransposedTable
        artists={artists}
        editableRows={editableRows}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div> */}

        </div>
    );
}

export default AdminArtists;
