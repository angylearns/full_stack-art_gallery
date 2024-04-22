

// import loginService from '../services/loginService.js';

// export const handleLogin = async (e, setErrorMessage) => {
//     e.preventDefault();
//     console.log('LORENA handler handleLogin');
//     console.log('LORENA handler handleLogin e ' + e);
//     console.log('LORENA handler handleLogin username ' + username.required);
//     console.log('LORENA handler handleLogin username ' + username.value);
//     //console.log('LORENA handleLogin password ' + JSON.stringify(password));


//     try {
//         const users = await loginService.getUsersByUsernameAndPassword(username.value, password.value);
//         if (users && users.length > 0) {

//             console.log('LORENA handler handleLogin Usuario conectado ' + users[0].id_user, users[0].user_name);




//             localStorage.setItem('user', JSON.stringify(users[0]));
//         } else {
//             // Usuario no encontrado, mostrar mensaje de error
//             console.error('Usuario no encontrado');
//             alert('Usuario no encontrado');

//         }

//     } catch (error) {
//         console.error(error.message);
//         setErrorMessage('Ocurrió un error al iniciar sesión');
//     }
// };

// export const handleRegister = async (e, setErrorMessage) => {
//     e.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     try {
//         console.log('loginHandler: handleRegister: first_name ' + first_name.value);
//         console.log('loginHandler: handleRegister: last_name ' + last_name.value);
//         console.log('loginHandler: handleRegister: dni ' + dni.value);
//         console.log('loginHandler: handleRegister: birth_date ' + birth_date.value);
//         console.log('loginHandler: handleRegister: email ' + email.value);
//         console.log('loginHandler: handleRegister: telephone ' + telephone.value);
//         console.log('loginHandler: handleRegister: userType ' + userType.value);

//         // Verifica si el usuario ya existe antes de intentar registrar
//         const listaUser = await loginService.checkUserExists(username.value);
//         console.log("Lista user");
//         console.log(listaUser);
//         if (listaUser && listaUser.length > 0) {
//             // setErrorMessage('El usuario ya existe. Por favor, elige un nombre de usuario o correo electrónico diferente.');
//             alert("Este usuario ya está registrado");
//             return;
//         }

//         //checkPersonExists
//         const existingPerson = await loginService.checkPersonExists(email.value);
//         console.log('loginHandler: handleRegister: existinPerson' + existingPerson);
//         if (existingPerson && existingPerson.length > 0) {
//             // setErrorMessage('El usuario ya existe. Por favor, elige un nombre de usuario o correo electrónico diferente.');
//             alert("Este email ya está registrado");
//             return;
//         }


//         const newUser = await loginService.addUser(username.value, password.value, userType.value);
//         console.log('loginHandler newUser', newUser);
//         const newPerson = await loginService.addPerson(first_name.value, last_name.value, dni.value, birth_date.value, email.value, telephone.value, newUser.id);



//         //setUser(newUser); // Actualizar el estado global con el nuevo usuario registrado
//         localStorage.setItem('user', JSON.stringify(newUser)); // Opcional: Guardar en el almacenamiento local
//         console.log('Usuario registrado:', newUser);
//     } catch (error) {
//         console.error('Error al registrar el usuario:', error);
//         setErrorMessage('Ocurrió un error al registrar el usuario');
//     }
// };

import loginService from '../services/loginService.js';
import Swal from 'sweetalert2';

export const handleLogin = async (e, setErrorMessage) => {
    e.preventDefault();
    const user_name = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;

    console.log('LORENA handler handleLogin');
    console.log('LORENA handler handleLogin e ' + e);
    console.log('LORENA handler handleLogin username ' + username.required);
    console.log('LORENA handler handleLogin username ' + username.value);
    //console.log('LORENA handleLogin password ' + JSON.stringify(password));

    
    try {
        const users = await loginService.getUsersByUsernameAndPassword(user_name, password);
        const users = await loginService.getUsersByUsernameAndPassword(username.value, password.value);
        console.log('loginHandler.js handllogin users '+JSON.stringify(users));
        if (users && users.length > 0) {
            console.log('Usuario conectado:', users[0].id_user, users[0].user_name);

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
        console.error('Error al iniciar sesión:', error);
        setErrorMessage('Ocurrió un error al iniciar sesión');
    }
};



export const handleRegister = async (e, setErrorMessage) => {
    e.preventDefault();
    const user_name = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const dni = document.getElementById('dni').value;
    const birth_date = document.getElementById('birth_date').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const user_type = document.getElementById('user_type').value;

    try {
        // Registra el nuevo usuario
        await loginService.addUser(user_name, password, user_type);

        // Obtiene el último ID de usuario
        const id_user_fk = await loginService.getLastUserId();
        // const id_user_fk = lastUserIdResponse.id_user_fk;
        // const id_user_fk = 117

        console.log('Este es el id_user_fk')
        console.log(id_user_fk) // Asegúrate de obtener el último ID correctamente
        
        // Registra los detalles de la persona
        await loginService.addPerson(first_name, last_name, dni, birth_date, email, telephone, id_user_fk);
        
        // Mensaje de éxito
        console.log('Detalles de la persona registrados');
    } catch (error) {
        console.error('Error al registrar la persona:', error);
        setErrorMessage('Ocurrió un error al registrar la persona');
    }
};




