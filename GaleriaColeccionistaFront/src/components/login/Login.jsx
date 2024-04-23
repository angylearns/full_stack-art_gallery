import React, { useState, useEffect } from 'react';
import './login.css';
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import Navbar from '../navbar/Navbar';
import { handleLogin, handleRegister } from '../../handlers/loginHandler';
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'


function Login({ isOpen, onClose, onLogin }) {

    // Estado inicial para los campos del formulario de Registro
    const initialStateRegister = {

        first_name: '',
        last_name: '',
        dni: '',
        birth_date: '',
        email: '',
        telephone: '',

    };

    // Estado inicial para los errores de validación de Registro
    const initialStateErrorsRegister = {

        first_name: '',
        last_name: '',
        dni: '',
        birth_date: '',
        email: '',
        telephone: '',

    };

    // Estado inicial para los campos del formulario de Login
    const initialStateLogin = {
        user_name: '',
        password: '',
    };

    // Estado inicial para los errores de validación de Login
    const initialStateErrorsLogin = {
        user_name: '',
        password: '',
    };

    // Utilizar el Estado para Controlar los Campos de Registro
    const [formStateRegister, setFormStateRegister] = useState(initialStateRegister);
    const [formErrorsRegister, setFormErrorsRegister] = useState(initialStateErrorsRegister);

    // Utilizar el Estado para Controlar los Campos de Login
    const [formStateLogin, setFormStateLogin] = useState(initialStateLogin);
    const [formErrorsLogin, setFormErrorsLogin] = useState(initialStateErrorsLogin);

    //Variable para ver modal
    const [showModal, setShowModal] = useState(false);
    //Variable saber si estoy en login o en registro
    const [newUser, setNewUser] = useState(false);

    //variables de login
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //variables de registro
    //const [name, setName] = useState('');
    const [first_name, setFirstName] = useState('');

    const [last_name, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [user_type, setUserType] = useState('');

    //Almacenar Id usuario
    const [user, setUser] = useState(null);

    //Agrega un estado para el mensaje de error
    const [errorMessage, setErrorMessage] = useState('');

    const [cookies, setCookie] = useCookies(['userToken']);



    //Utilizar el Estado para Controlar los Campos RESETEO
    const handleInputChangeLogin = (e) => {
        const { name, value } = e.target;
        console.log(' handleInputChangeLogin Valido login ' + name + ' ' + value);
        setFormStateLogin({ ...formStateLogin, [name]: value });

        // Validaciones para el campo 'username' de LOGIN
        if (name === 'user_name') {
            if (value.length === 0) {
                setFormErrorsLogin({ ...formErrorsLogin, msgErrorusername: '' });
            } else if (value.length < 3) {
                setFormErrorsLogin({ ...formErrorsLogin, msgErrorusername: 'El nombre de usuario debe tener al menos 3 caracteres.' });
            } else {
                setFormErrorsLogin({ ...formErrorsLogin, msgErrorusername: '' });
            }

        }

        if (name === 'password') {
            // Expresión regular para validar la contraseña
            // Expresión regular para validar la contraseña con un mínimo de 4 caracteres
            const regexPassword = /^[A-Za-z\d@$!%*?&]{4,}$/;

            if (value.length === 0) {
                setFormErrorsLogin({ ...formErrorsLogin, msgErrorpassword: '' });
            }
            else if (!regexPassword.test(value)) {
                setFormErrorsLogin({ ...formErrorsLogin, msgErrorpassword: 'La contraseña debe tener al menos 4 caracteres.' });
            } else {
                setFormErrorsLogin({ ...formErrorsLogin, msgErrorpassword: '' });
            }
        }

    };

    const handleInputChangeRegister = (e) => {
        const { name, value } = e.target;
        console.log(' handleInputChangeRegister Valido registro ' + name + ' ' + value);
        setFormStateRegister({ ...formStateRegister, [name]: value });
        setFormStateLogin({ ...formStateLogin, [name]: value });
        // Validaciones para el campo 'first_name' de Registro


        if (name === 'first_name') {

            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorFirstName: '' });
            }
            // Verificar si el valor tiene menos de 2 caracteres
            else if (value.length < 2) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorFirstName: 'El nombre de usuario debe tener al menos 2 caracteres.' });
                // Verificar si el valor contiene números o símbolos
            } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/.test(value)) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorFirstName: 'El nombre de usuario no debe contener números ni símbolos.' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorFirstName: '' });
            }
        }
        // Validaciones para el campo 'last_name'
        if (name === 'last_name') {

            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorLastName: '' });
            } else if (value.length < 2) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorLastName: 'El apellido debe tener al menos 2 caracteres.' });
            } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/.test(value)) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorLastName: 'El apellido no debe contener números ni símbolos.' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorLastName: '' });
            }
        }

        // Validaciones para el campo 'dni'

        if (value.length === 0) {
            setFormErrorsRegister({ ...formErrorsRegister, msgErrordni: '' });
        }
        else if (name === 'dni') {
            if (value.length < 9) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrordni: 'El DNI debe tener al menos 9 caracteres.' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrordni: '' });
            }
        }

        // Validaciones para el campo 'birth_date'
        if (name === 'birth_date') {
            // Expresión regular para validar el formato de fecha 'YYYY-MM-DD'
            const regexFecha = /^\d{4}-\d{2}-\d{2}$/;

            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorbirth_date: '' });
            }
            else if (!regexFecha.test(value)) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorbirth_date: 'La fecha de nacimiento debe estar en formato AAAA-MM-DD.' });
            } else {
                // Aquí puedes agregar validaciones adicionales, como verificar que la fecha sea válida
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorbirth_date: '' });
            }
        }

        // Validaciones para el campo 'email'
        if (name === 'email') {
            // Expresión regular para validar un correo electrónico
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErroremail: '' });
            } else if (!regexEmail.test(value)) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErroremail: 'El formato del correo electrónico no es válido.' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErroremail: '' });
            }
        }

        // Validaciones para el campo 'telephone'
        if (name === 'telephone') {

            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrortelephone: '' });
            } else if (value.length < 9) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrortelephone: 'Al menos 9 caracteres.' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrortelephone: '' });
            }
        }

        // Validaciones para el campo 'username'
        if (name === 'user_name') {
            // Expresión regular para validar el nombre de usuario
            // Esta expresión permite letras, números y guiones bajos, con una longitud de 3 a 15 caracteres
            const regexUsername = /^[a-zA-Z0-9_]{3,15}$/;
            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorusername: '' });
            } else if (!regexUsername.test(value)) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorusername: 'El nombre de usuario debe tener entre 3 y 15 caracteres y solo puede contener letras, números y guiones bajos.' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorusername: '' });
            }
        }

        // Validaciones para el campo 'password'
        if (name === 'password') {
            // Expresión regular para validar la contraseña
            // Esta expresión requiere al menos una letra mayúscula, una letra minúscula, un número y un caracter especial, con una longitud de 8 a 12 caracteres
            const regexPassword = /^[A-Za-z\d@$!%*?&]{4,}$/;

            if (value.length === 0) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorpassword: '' });
            }
            else if (!regexPassword.test(value)) {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorpassword: 'La contraseña debe tener mínimo 4 caracteres' });
            } else {
                setFormErrorsRegister({ ...formErrorsRegister, msgErrorpassword: '' });
            }
        }
    };





    //DE REGISTER A LOGIN
    const handleToggleView = () => {
        setNewUser(!newUser);
        console.log('login jsx : handleToogleView newUser ' + JSON.stringify(newUser));
    };

    const resetToLoginView = () => {
        setNewUser(false);
        // Aquí puedes resetear también los campos del formulario de registro si es necesario
        setUserType('');
        // Aquí puedes resetear también los campos del formulario de registro si es necesario
    };

    useEffect(() => {
        // Llama a resetToLoginView para asegurar que el estado inicial de userType sea correcto
        resetToLoginView();
    }, []);

    // Función para manejar el envío del formulario de registro
    const handleSubmitRegister = async (e,) => {
        e.preventDefault();

        // Llama a handleRegister pasando setErrorMessage para manejar mensajes de error
        await handleRegister(e, setErrorMessage);

        if (!errorMessage) {
            // Swal.fire({
            //     position: "center",
            //     icon: "success",
            //     title: "Se ha registrado correctamente",
            //     showConfirmButton: false,
            //     timer: 1500
            // });
        }
        if (errorMessage) {
            // Swal.fire({
            //     icon: "error",
            //     title: "No se pudo registrar.",
            //     text: "Something went wrong!",
            //     footer: 'Por favor, verifica los datos ingresados.'
            // });
        }
        // setFormState(initialState);
        setFormStateLogin(initialStateLogin);
        setFormStateRegister(initialStateRegister);
        resetToLoginView(); // Resetear la vista después de intentar registrarse
    };




    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            // Obtener los valores del estado del formulario de inicio de sesión
            const { user_name, password } = formStateLogin;

            // Realizar la solicitud de inicio de sesión
            const tokenData = await handleLogin({ user_name, password }, setErrorMessage);
            
            // Decodificar el token
            const decodedToken = jwtDecode(tokenData.token);

            
            setCookie('id_user', decodedToken.id_user);
            setCookie('first_name', decodedToken.first_name);
            setCookie('id_person', decodedToken.id_person);
            setCookie('password', decodedToken.password);
            setCookie('user_type', decodedToken.user_type);
            setCookie('user_name', decodedToken.user_name);
            console.log(decodedToken)

            const userTypeDecoded = decodedToken.user_type;
            console.log(userTypeDecoded);

            // switch(userTypeDecoded){
            //     case 'Admin':
            //         navigate('/admin');
            //         break;
            //     case 'Artist':
            //         navigate('/user');
            //         break;
            //     case 'User':
            //         navigate('/user');
            // }
            // Hacer cualquier otra acción necesaria después del inicio de sesión
            // Por ejemplo, redireccionar a una página de perfil
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrorMessage('Ocurrió un error al iniciar sesión');
        }
    };






    // Verificar si el usuario está logueado al cargar la aplicación
    useEffect(() => {

        const loggedInUser = localStorage.getItem('user_name');
        console.log(' loggedInUser ' + loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);




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
                                            {formErrorsRegister.msgErrorFirstName && <p>{formErrorsRegister.msgErrorFirstName}</p>}
                                            {/* <label htmlFor="lastName">Apellidos</label> */}
                                            <input className='input-register'
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                value={formStateLogin.last_name}
                                                onChange={handleInputChangeRegister}
                                                required
                                                placeholder="Apellidos"
                                            />
                                            {formErrorsRegister.msgErrorLastName && <p>{formErrorsRegister.msgErrorLastName}</p>}
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
                                            {formErrorsRegister.msgErrordni && <p>{formErrorsRegister.msgErrordni}</p>}

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
                                            {formErrorsRegister.msgErrorbirth_date && <p>{formErrorsRegister.msgErrorbirth_date}</p>}
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
                                            {formErrorsRegister.msgErroremail && <p>{formErrorsRegister.msgErroremail}</p>}
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
                                            {formErrorsRegister.msgErrortelephone && <p>{formErrorsRegister.msgErrortelephone}</p>}


                                        </div>
                                    </>
                                )}


                                {/* CAMPOS COMUNES LOGIN/REGISTER: */}
                                {/* El mensaje de error es tomado del objeto formerrorregister o del objeto formerrorlogin en función de donde se encuentre el usuario en el modal (newuser) */}
                                {newUser ? formErrorsRegister.msgErrorusername && <p>  {formErrorsRegister.msgErrorusername}</p> : formErrorsLogin.msgErrorusername && <p>  {formErrorsLogin.msgErrorusername}</p>}

                                {/* <label htmlFor="username">Usuario:</label> */}
                                <input className='input-login'
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    value={formStateLogin.user_name}
                                    onChange={newUser ? handleInputChangeRegister : handleInputChangeLogin}
                                    required
                                    placeholder="Usuario"
                                />
                                {newUser ? formErrorsRegister.msgErrorpassword && <p> {formErrorsRegister.msgErrorpassword}</p> : formErrorsLogin.msgErrorpassword && <p> {formErrorsLogin.msgErrorpassword}</p>}
                                {/* {formErrorsLogin.msgErrorpassword && <p>{formErrorsLogin.msgErrorpassword}</p>} */}
                                {/* <label htmlFor="password">Contraseña:</label> */}
                                <input className='input-login'
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formStateLogin.password}
                                    onChange={newUser ? handleInputChangeRegister : handleInputChangeLogin}
                                    required
                                    placeholder="Contraseña"
                                />

                                {/* <label htmlFor="userType" className='usertypetext'>Tipo de Usuario:</label> */}
                                <select className='optionusertype'
                                    id="user_type"
                                    value={user_type}
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