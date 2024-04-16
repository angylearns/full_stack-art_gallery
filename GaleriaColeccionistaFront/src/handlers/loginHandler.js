//Este es el método GET del usuario registrado

export const handleLogin = async (e) => {
    e.preventDefault();
    console.log('LORENA handleLogin');
    console.log('LORENA handleLogin username ' + username);
    console.log('LORENA handleLogin password ' + password);


    try {
        const users = await loginService.getUsersByUsernameAndPassword(username, password);
        if (users && users.length > 0) {
            // Usuario encontrado, proceder con el inicio de sesión
            setUser(users[0]); // Asumiendo que solo hay un usuario con ese nombre de usuario y contraseña
            console.log('Usuario conectado:', users[0].id_user, users[0].user_name); // Mensaje de depuración
            localStorage.setItem('user', JSON.stringify(users[0]));
        } else {
            // Usuario no encontrado, mostrar mensaje de error
            console.error('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error.message);
    }
};

 export const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const newUser = await loginService.addPerson(name, last_name, dni, birth_date, email, telephone);
        console.log('Usuario registrado:', newUser);
        setUser(newUser); // Actualizar el estado global con el nuevo usuario registrado
        localStorage.setItem('user', JSON.stringify(newUser)); // Opcional: Guardar en el almacenamiento local
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
};