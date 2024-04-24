const API_URL = 'http://127.0.0.1:5000';

const loginService = {
  postUsersByUsernameAndPassword: async (user_name, password) => {
    try {
      const response = await fetch(`${API_URL}/userL/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, password }),
      });
      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
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

  addUser: async (user_name, password, user_type) => {
    try {
      await fetch(`${API_URL}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, password, user_type }),
      });

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
      return response.id_user;
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
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al obtener el último ID de usuario');
    }
  }
}

export default loginService;