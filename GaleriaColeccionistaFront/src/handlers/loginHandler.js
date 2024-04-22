

import loginService from '../services/loginService.js';


export const handleLogin = async ({ user_name, password }, setErrorMessage) => {
    try {
        const users = await loginService.postUsersByUsernameAndPassword(user_name, password);
        console.log(users);
        return users; // Devuelve el objeto users que probablemente contiene el token
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setErrorMessage('Ocurrió un error al iniciar sesión');
        throw error; // También puedes lanzar el error para que sea manejado por el código que llama a handleLogin
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
        
        setErrorMessage('Ocurrió un error al registrar la persona');
    }
};




