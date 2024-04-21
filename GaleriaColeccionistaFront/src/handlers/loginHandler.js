

import loginService from '../services/loginService.js';
import Swal from 'sweetalert2';

export const handleLogin = async (e, setErrorMessage) => {
    e.preventDefault();
    console.log('LORENA handler handleLogin');
    console.log('LORENA handler handleLogin e ' + e);
    console.log('LORENA handler handleLogin username ' + username.required);
    console.log('LORENA handler handleLogin username ' + username.value);
    //console.log('LORENA handleLogin password ' + JSON.stringify(password));

    
    try {
        const users = await loginService.getUsersByUsernameAndPassword(username.value, password.value);
        console.log('loginHandler.js handllogin users '+JSON.stringify(users));
        if (users && users.length > 0) {

            console.log('LORENA handler handleLogin Usuario conectado ' + users[0].id_user, users[0].user_name);

            localStorage.setItem('user', JSON.stringify(users[0]));
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Ha iniciado sesión",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            // Usuario no encontrado, mostrar mensaje de error
            console.log('loginHandler.js handllogin Usuario no encontrado');
            // alert('Usuario no encontrado');
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión.",
                text: "Something went wrong!",
                footer: 'Por favor, verifica los datos ingresados.'
            });
        }

    } catch (error) {
        console.error(error.message);
        setErrorMessage('Ocurrió un error al iniciar sesión');
    }
};

export const handleRegister = async (e, setErrorMessage) => {
    console.log('loginHandler: handleRegister: e ' + e);
    e.preventDefault();
    try {
        console.log('loginHandler: handleRegister: first_name ' + first_name.value);
        console.log('loginHandler: handleRegister: last_name ' + last_name.value);
        console.log('loginHandler: handleRegister: dni ' + dni.value);
        console.log('loginHandler: handleRegister: birth_date ' + birth_date.value);
        console.log('loginHandler: handleRegister: email ' + email.value);
        console.log('loginHandler: handleRegister: telephone ' + telephone.value);
        console.log('loginHandler: handleRegister: userType ' + userType.value);

        // Verifica si el usuario ya existe antes de intentar registrar
        const listaUser = await loginService.checkUserExists(username.value);
        console.log('loginHandler: handleRegister: existinUser' + listaUser);
        if (listaUser && listaUser.length > 0) {
            // setErrorMessage('El usuario ya existe. Por favor, elige un nombre de usuario o correo electrónico diferente.');
            alert("Este usuario ya está registrado");
            return;
        }

        //checkPersonExists
        const existingPerson = await loginService.checkPersonExists(email.value);
        console.log('loginHandler: handleRegister: existinPerson' + existingPerson);
        if (existingPerson && existingPerson.length > 0) {
            // setErrorMessage('El usuario ya existe. Por favor, elige un nombre de usuario o correo electrónico diferente.');
            alert("Este email ya está registrado");
            return;
        }


        const newUser = await loginService.addUser(username.value, password.value, userType.value);
        console.log('loginHandler newUser', newUser);
        const newPerson = await loginService.addPerson(first_name.value, last_name.value, dni.value, birth_date.value, email.value, telephone.value, newUser.id);



        //setUser(newUser); // Actualizar el estado global con el nuevo usuario registrado
        localStorage.setItem('user', JSON.stringify(newUser)); // Opcional: Guardar en el almacenamiento local
        console.log('Usuario registrado:', newUser);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setErrorMessage('Ocurrió un error al registrar el usuario');
    }
};