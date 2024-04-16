//Este es el método GET del usuario registrado

import loginService from '../services/loginService.js';

export const handleLogin = async (e) => {
    e.preventDefault();
    console.log('LORENA handler handleLogin');
    console.log('LORENA handler handleLogin e ' + e);
    console.log('LORENA handler handleLogin username ' + username.required);
    console.log('LORENA handler handleLogin username ' + username.value);
    //console.log('LORENA handleLogin password ' + JSON.stringify(password));


    try {
        const users = await loginService.getUsersByUsernameAndPassword(username.value, password.value);
        if (users && users.length > 0) {

            console.log('LORENA handler handleLogin Usuario conectado '+users[0].id_user, users[0].user_name);
    
     
           
            
            localStorage.setItem('user', JSON.stringify(users[0]));
        } else {
            // Usuario no encontrado, mostrar mensaje de error
            console.error('Usuario no encontrado');
            //OJO,PONER ALERT
        }
        
    } catch (error) {
        console.error(error.message);
    }
};

 export const handleRegister = async (e) => {
    console.log('loginHandler: handleRegister: e '+e);
    e.preventDefault();
    try {
        console.log('loginHandler: handleRegister: first_name '+first_name.value);
        console.log('loginHandler: handleRegister: last_name '+last_name.value);
        console.log('loginHandler: handleRegister: dni '+dni.value);
        console.log('loginHandler: handleRegister: birth_date '+birth_date.value);
        console.log('loginHandler: handleRegister: email '+email.value);
        console.log('loginHandler: handleRegister: telephone '+telephone.value);
        console.log('loginHandler: handleRegister: userType '+userType.value);

        
        const newUser = await loginService.addUser(username.value, password.value, userType.value);
        console.log ('loginHandler newUser',newUser);
        const newPerson = await loginService.addPerson(first_name.value, last_name.value, dni.value, birth_date.value, email.value, telephone.value, newUser.id );

        //setUser(newUser); // Actualizar el estado global con el nuevo usuario registrado
        localStorage.setItem('user', JSON.stringify(newUser)); // Opcional: Guardar en el almacenamiento local
        console.log('Usuario registrado:', newUser);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
};