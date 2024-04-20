import React, { useState, useEffect } from 'react';
import './login.css';
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import Navbar from '../navbar/Navbar';




import { handleLogin, handleRegister } from '../../handlers/loginHandler';

//Definir el Estado Inicial
function Login({ isOpen, onClose }) {

    const initialStateLogin = {
        username: '',
        password: '',
    };

    const initialStateRegister = {
        first_name: '',
        last_name: '',
        dni: '',
        birth_date: '',
        email: '',
        telephone: '',
        userType: '',
    };

    //Utilizar el Estado para Controlar los Campos
    const [formStateLogin, setFormStateLogin] = useState(initialStateLogin);

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

    //Utilizar el Estado para Controlar los Campos RESETEO
    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormStateLogin({ ...formStateLogin, [name]: value });
    };


    const [formStateRegister, setFormStateRegister] = useState(initialStateRegister);

    const handleInputChangeRegister = (e) => {
        const { name, value } = e.target;
        setFormStateRegister({ ...formStateRegister, [name]: value });
    };

    //DE REGISTER A LOGIN
    const handleToggleView = () => {
        setNewUser(!newUser);
    };

    const resetToLoginView = () => {
        setNewUser(false);
        // Aquí puedes resetear también los campos del formulario de registro si es necesario
    };



    // Función para manejar el envío del formulario de registro
    const handleSubmitRegister = async (e,) => {
        e.preventDefault();

        // Llama a handleRegister pasando setErrorMessage para manejar mensajes de error
        await handleRegister(e, setErrorMessage);

        // setFormState(initialState);
        setFormStateLogin(initialStateLogin);
        setFormStateRegister(initialStateRegister);
        resetToLoginView(); // Resetear la vista después de intentar registrarse
    };


    const handleSubmitLogin = async (e,) => {
        e.preventDefault();
        
        // Llama a handleRegister pasando setErrorMessage para manejar mensajes de error
        await handleLogin(e, setErrorMessage);
        setFormStateLogin(initialStateLogin);
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
    // const [mensaje, setMensaje] = useState('');

    // const onClick = () => {
    //     setMensaje('Mensaje del padre');
    // };



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
                                        <div className='twoblocks'>

                                            {/* <label htmlFor="first_name">Nombre:</label> */}
                                            <input className='input-register'
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                value={formStateRegister.first_name}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="Nombre"
                                            />
                                            {/* <label htmlFor="lastName">Apellidos</label> */}
                                            <input className='input-register'
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                value={formStateRegister.last_name}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="Apellidos"
                                            />
                                            {/* <label htmlFor="dni">DNI:</label> */}
                                            <input className='input-register'
                                                type="text"
                                                id="dni"
                                                name="dni"
                                                value={formStateRegister.dni}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="DNI"
                                            />


                                            {/* <label htmlFor="birth_date">Fecha de Nacimiento:</label> */}
                                            <input className='input-register'
                                                type="text"
                                                id="birth_date"
                                                name="birth_date"
                                                value={formStateRegister.birth_date}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="Fecha de Nacimiento"
                                            />
                                            {/* <label htmlFor="email">Correo Electrónico:</label> */}
                                            <input className='input-register'
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formStateRegister.email}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="Correo Electrónico"
                                            />

                                            {/* <label htmlFor="telephone">Teléfono:</label> */}
                                            <input className='input-register'
                                                type="telephone"
                                                id="telephone"
                                                name="telephone"
                                                value={formStateRegister.telephone}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="Teléfono"
                                            />


                                        </div>
                                    </>
                                )}
                                {/* <label htmlFor="username">Usuario:</label> */}
                                <input className='input-login'
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formStateLogin.username}
                                    onChange={handleInputChangeLogin}
                                    required
                                    placeholder="Usuario"
                                />
                                {/* <label htmlFor="password">Contraseña:</label> */}
                                <input className='input-login'
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formStateLogin.password}
                                    onChange={handleInputChangeLogin}
                                    required
                                    placeholder="Contraseña"
                                />
                                {/* <label htmlFor="userType" className='usertypetext'>Tipo de Usuario:</label> */}
                                <select className='optionusertype'
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)} required>
                                    <option value="">Tipo de usuario</option>
                                    {/* <option value="cliente" >Cliente</option>
                                    <option value="artista" >Artista</option> */}
                                    <option value="3" >Cliente</option>
                                    <option value="2" >Artista</option>
                                </select>
                                <button type="submit" className='button-submit'>
                                    {newUser ? "Registrarse" : "Iniciar Sesión"}
                                </button>
                            </form>

                            <button onClick={handleToggleView} className='buttonsloginlogout'>
                                {newUser ? "Inicia sesión" : "Regístrate"}
                            </button>


                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            {!newUser && (
                                <div className=''>

                                    {/* <button className='button-register' onClick={() => setNewUser(true)}>
                                            Regístrate aquí
                                        </button> */}

                                </div>
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