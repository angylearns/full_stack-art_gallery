const API_URL = 'http://localhost:3000';


const loginService = {
  getUsersByUsernameAndPassword: async (username, password) => {
    try {
      console.log('service getUsersByUsernameAndPassword ini '+username)
      const response = await fetch(`${API_URL}/user?user_name=${username}&password=${password}`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }

      console.log('service getUsersByUsernameAndPassword end response.json()  '+response);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al obtener los usuarios');
    }
    
  },
  addPerson : async (first_name, last_name, dni, birth_date, email, telephone, id_user) => {
    try {
       const response = await fetch(`${API_URL}/person`, {
         method: 'POST',                                 
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ first_name, last_name, dni, birth_date, email, telephone, id_user }),
       });
       if (!response.ok) {
         throw new Error('Error al registrar el usuario');
       }
       return await response.json();
    } catch (error) {
       console.error(error);
       throw new Error('Ocurrió un error al registrar el usuario');
   
      }
   },
   addUser : async (user_name, password, userType) => {
    try {
       const response = await fetch(`${API_URL}/user`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ user_name, password, userType }),
       });
       if (!response.ok) {
         throw new Error('Error al registrar el usuario');
       }
       return await response.json();
    } catch (error) {
       console.error(error);
       throw new Error('Ocurrió un error al registrar el usuario');
   
      }
   }
};
 
 export default loginService;