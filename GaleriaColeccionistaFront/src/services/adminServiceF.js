import axios from "axios";

// const apiClient = axios.create({
//     baseURL: 'http://localhost:5000/',
//     withCredentials: false,
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//     }
// });

// const apiClient = axios.create({
//     baseURL: 'http://localhost:5000/'
// });
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

// const apiClient = axios.create({
//     baseURL: 'http://localhost:5000/',
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
// });

export const adminServiceF = {

    // async getAllUser() {
    //     try {
    //         let response = await apiClient.get("/users");
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error al obtener usuarios:", error);
    //         throw error; 
    //     }
    // },

    async getAllPersons() {
        try {
            let response = await apiClient.get("/persons");
            return response.data;
        } catch (error) {
            console.error("Error al obtener personas:", error);
            throw error;
        }
    },

    async postUser(user) {
        try {
            let user2 = JSON.stringify(user)
            let response = await apiClient.post("/persons",user2);
            return response.data;
        } catch (error) {
            console.error("Error al obtener personas:", error);
            throw error; 
        }

        // let user2 = JSON.stringify(user)
        // fetch('http://127.0.0.1:5000/persons', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json', // Tipo de contenido de la solicitud
        //       'Access-Control-Request-Method': 'POST', // Método que se solicita permitir en el servidor
        //       'Access-Control-Request-Headers': 'Content-Type, Authorization' // Encabezados personalizados que se solicita permitir en el servidor
        //     },
        //     body: JSON.stringify({ user2
        //     })
        //   })
        //   .then(response => {
        //     // Manejo de la respuesta del servidor
        //   })
        //   .catch(error => {
        //     // Manejo de errores
        //   });
          







        // try{
        //     const response = await fetch('http://127.0.0.1:5000/persons/',{
        //         method: "POST",
        //         headers: {
        //             Accept: "aplication/json",
        //             "content-type":"application/json"
        //         },
        //         body: JSON.stringify({
        //             id_user:"",
        //             user_name:"Elenita",
        //             password:"123",
        //             user_type:"Artist"
        //         })
        //     });
        //     const data = await response.json();
        //     console.loc(data)

        // }catch(error){
        //     console.log(error);
        // }


    //     fetch('http://localhost:5000/persons/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name: 'John Doe',
    //             email: 'john.doe@example.com',
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
     }
};

