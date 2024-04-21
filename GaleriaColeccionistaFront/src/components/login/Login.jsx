import React, { useState, useEffect } from 'react';
import './login.css';
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import Navbar from '../navbar/Navbar';




import { handleLogin, handleRegister } from '../../handlers/loginHandler';


function Login({ isOpen, onClose }) {
    //Variable para ver modal
    const [showModal, setShowModal] = useState(false);
    //Variable saber si estoy en login o en registro
    const [newUser, setNewUser] = useState(false);

    //variables de login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //variables de registro
    //const [name, setName] = useState('');
    const [first_name, setFirstName] = useState('');

    const [last_name, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [userType, setUserType] = useState('');

    //Almacenar Id usuario
    const [user, setUser] = useState(null);

    //Agrega un estado para el mensaje de error
    const [errorMessage, setErrorMessage] = useState('');


    //DE REGISTER A LOGIN
    const handleToggleView = () => {
        setNewUser(!newUser);
    };





    // Función para manejar el envío del formulario de registro
    const handleSubmitRegister = async (e,) => {
        e.preventDefault();
        // Llama a handleRegister pasando setErrorMessage para manejar mensajes de error
        await handleRegister(e, setErrorMessage);
    };


    const handleSubmitLogin = async (e,) => {
        e.preventDefault();
        // Llama a handleRegister pasando setErrorMessage para manejar mensajes de error
        await handleLogin(e, setErrorMessage);
    };



    // Verificar si el usuario está logueado al cargar la aplicación
    useEffect(() => {

        const loggedInUser = localStorage.getItem('user');
        console.log(' loggedInUser ' + loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    // const handleLogout = () => {
    //     // Eliminar el usuario del almacenamiento local
    //     localStorage.removeItem('user');
    //     // Limpiar el estado del usuario en el componente
    //     setUser(null);
    // };

    //PROPS
    const [mensaje, setMensaje] = useState('');

    const onClick = () => {
        setMensaje('Mensaje del padre');
    };

    return (

        <>
            {isOpen && (
                <div className="modal">

                    <div className="modal-content">

                        <div className="App">

                            <span className="close" onClick={onClose}>
                                &times;
                            </span>
                            <h2 className='login-title'>{newUser ? "Regístrese" : "Iniciar Sesión"}</h2>
                            <form onSubmit={newUser ? handleSubmitRegister : handleSubmitLogin}>
                                {newUser && (
                                    <>
                                        {/* <label htmlFor="first_name">Nombre:</label> */}
                                        <input className='input-register'
                                            type="text"
                                            id="first_name"
                                            value={first_name}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            placeholder="Nombre"
                                        />
                                        {/* <label htmlFor="lastName">Apellidos</label> */}
                                        <input className='input-register'
                                            type="text"
                                            id="last_name"
                                            value={last_name}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            placeholder="Apellidos"
                                        />
                                        {/* <label htmlFor="dni">DNI:</label> */}
                                        <input className='input-register'
                                            type="text"
                                            id="dni"
                                            value={dni}
                                            onChange={(e) => setDni(e.target.value)}
                                            required
                                            placeholder="DNI"
                                        />
                                        {/* <label htmlFor="birth_date">Fecha de Nacimiento:</label> */}
                                        <input className='input-register'
                                            type="text"
                                            id="birth_date"
                                            value={birth_date}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                            required
                                            placeholder="Fecha de Nacimiento"
                                        />

                                        {/* <label htmlFor="email">Correo Electrónico:</label> */}
                                        <input className='input-register'
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Correo Electrónico"
                                        />

                                        {/* <label htmlFor="telephone">Teléfono:</label> */}
                                        <input className='input-register'
                                            type="telephone"
                                            id="telephone"
                                            value={telephone}
                                            onChange={(e) => setTelephone(e.target.value)}
                                            required
                                            placeholder="Teléfono"
                                        />


                                    </>
                                )}
                                {/* <label htmlFor="username">Usuario:</label> */}
                                <input className='input-login'
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Usuario"
                                />
                                {/* <label htmlFor="password">Contraseña:</label> */}
                                <input className='input-login'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Contraseña"
                                />
                                <label htmlFor="userType" className='usertypetext'>Tipo de Usuario:</label>
                                <select className='optionusertype'
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)} required>
                                    <option value="cliente" >Cliente</option>
                                    <option value="artista" >Artista</option>
                                </select>
                                <button type="submit" className='button-submit'>
                                    {newUser ? "Registrarse" : "Iniciar Sesión"}
                                </button>
                            </form>

                            <button onClick={handleToggleView}>
                                {newUser ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
                            </button>

                            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                </div>

                // {user && <p>Bienvenido, {user.user_name}.</p>}
            )}
        </>

    );
}


export default Login;