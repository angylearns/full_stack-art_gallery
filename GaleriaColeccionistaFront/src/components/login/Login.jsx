import React, { useState, useEffect } from 'react';
import './login.css';
import loginService from '../../services/loginService';
import { loginHandler } from '../../handlers/loginHandler';

function Login() {
    //Variable para ver modal
    const [showModal, setShowModal] = useState(false);
    //Variable saber si estoy en login o en registro
    const [newUser, setNewUser] = useState(false);

    //variables de login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //variables de registro
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    //Almacenar Id usuario
    const [user, setUser] = useState(null);

    // Verificar si el usuario está logueado al cargar la aplicación
    useEffect(() => {

        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     console.log('LORENA handleLogin');
    //     console.log('LORENA handleLogin username ' + username);
    //     console.log('LORENA handleLogin password ' + password);


    //     try {
    //         const users = await loginService.getUsersByUsernameAndPassword(username, password);
    //         if (users && users.length > 0) {
    //             // Usuario encontrado, proceder con el inicio de sesión
    //             setUser(users[0]); // Asumiendo que solo hay un usuario con ese nombre de usuario y contraseña
    //             console.log('Usuario conectado:', users[0].id_user, users[0].user_name); // Mensaje de depuración
    //             localStorage.setItem('user', JSON.stringify(users[0]));
    //         } else {
    //             // Usuario no encontrado, mostrar mensaje de error
    //             console.error('Usuario no encontrado');
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // };

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const newUser = await loginService.addPerson(name, last_name, dni, birth_date, email, telephone);
    //         console.log('Usuario registrado:', newUser);
    //         setUser(newUser); // Actualizar el estado global con el nuevo usuario registrado
    //         localStorage.setItem('user', JSON.stringify(newUser)); // Opcional: Guardar en el almacenamiento local
    //     } catch (error) {
    //         console.error('Error al registrar el usuario:', error);
    //         // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    //     }
    // };


    return (

        <>

            <div className="App">
                <button className="btn-user" onClick={() => setShowModal(true)}>
                    <img src="src\assets\icon-user.svg" className="icon-user mx-3" alt="" />
                </button>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>
                                &times;
                            </span>
                            <h2>{newUser ? "Registrarse" : "Iniciar Sesión"}</h2>
                            <form onSubmit={newUser ? handleRegister : handleLogin}>
                                {newUser && (
                                    <>
                                        <label htmlFor="name">Nombre:</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="lastName">Apellidos</label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            value={last_name}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="dni">DNI:</label>
                                        <input
                                            type="text"
                                            id="dni"
                                            value={dni}
                                            onChange={(e) => setDni(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="birth_date">Fecha de Nacimiento:</label>
                                        <input
                                            type="text"
                                            id="birth_date"
                                            value={birth_date}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="email">Correo Electrónico:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="telephone">Teléfono:</label>
                                        <input
                                            type="telephone"
                                            id="telephone"
                                            value={telephone}
                                            onChange={(e) => setTelephone(e.target.value)}
                                            required
                                        />
                                    </>
                                )}
                                <label htmlFor="username">Usuario:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className='button-submit'>
                                    {newUser ? "Registrarse" : "Iniciar Sesión"}
                                </button>
                            </form>
                            {!newUser && (
                                <p>
                                    ¿Todavía no estás registrado?{" "}
                                    <button className='button-register' onClick={() => setNewUser(true)}>
                                        Regístrate aquí
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {user && <p>Bienvenido, {user.user_name}.</p>}

        </>

    );
}


export default Login;