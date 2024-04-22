const API_URL = 'http://127.0.0.1:5000';


const loginService = {
  getUsersByUsernameAndPassword: async (user_name, password) => {
    try {
      console.log('service getUsersByUsernameAndPassword ini ' + user_name)
      const response = await fetch(`${API_URL}/user?user_name=${user_name}&password=${password}`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }

      console.log('service getUsersByUsernameAndPassword end response.json()  ' + response);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al obtener los usuarios');
    }

  },

  
  addPerson: async (first_name, last_name, dni, birth_date, email, telephone, id_user_fk) => {
    try {
      const response = await fetch(`${API_URL}/person/`, {
        method: 'POST',                                                      
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, dni, birth_date, email, telephone, id_user_fk }),
        //body: JSON.stringify({ first_name:"x", last_name:"x", dni:"x", birth_date:"2024-04-04", email:"s", telephone:"222", id_user_fk:"12" }),
      });
      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }
      
      return await response.json().result;
      
    } catch (error) {
      console.error('Error al guardar persona:', error);
      throw error;
    }
  },
  // addPerson: async (name, last_name, dni, birth_date, email, telephone, id_user) => {
  //   try {
  //     const response = await fetch(`${API_URL}/person/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name, last_name, dni, birth_date, email, telephone, id_user }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Error al registrar el usuario');
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Ocurrió un error al registrar el usuario');

  //   }
  // },
  addUser: async (user_name, password, user_type) => {
    try {
      await fetch(`${API_URL}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, password, user_type }),
      });
  
      // Si la solicitud se realiza con éxito y no hay errores, no necesitas hacer nada más aquí.
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al registrar el usuario');
    }
  },

  getUsersByUsername: async (user_name) => {
    try {
        const response = await fetch(`${API_URL}/user?user_name=${user_name}`);
        if (!response.ok) {
            throw new Error('Error al obtener el usuario');
        }
        // No es necesario convertir a JSON si ya viene en ese formato
        return response.id_user; // Devolver el id_user directamente desde la respuesta
    } catch (error) {
        console.error(error);
        throw new Error('Ocurrió un error al obtener el usuario');
    }
},

getLastUserId: async () => {
  try {
    const response = await fetch(`${API_URL}/user/id_user`);
    if (!response.ok) {
      throw new Error('Error al obtener el último ID de usuario');
    }
    const data = await response.json();
    console.log(data.id_user)
    return data.id_user;
    // return data
  } catch (error) {
    console.error(error);
    throw new Error('Ocurrió un error al obtener el último ID de usuario');
  }
}

}  

export default loginService;