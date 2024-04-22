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

    async postUser(userPerson) {
        try {
            let user2 = JSON.stringify(userPerson)
            let response = await apiClient.post("/persons", user2);
            return response.data;
        } catch (error) {
            console.error("Error al insertar datos:", error);
            throw error;
        }
    },

    async patchPerson(person) {
        try {
            let person2 = JSON.stringify(person)
            let response = await apiClient.patch("/persons", person2);
            return response.data;
        } catch (error) {
            console.error("Error al actualiar datos:", error);
            throw error;
        }
    },

    async DeletePerson(person) {
        try {
            let person2 = JSON.stringify(person)
            let response = await apiClient.delete("/persons", { data: person });
            return response.data;
        } catch (error) {
            console.error("Error al eliminar datosssssssss:", error);
            throw error;
        }
    },

    async postPurchaseOrder1(purchaseOrder) {
        try {
            console.log("purchaseeeeeeeee")
            console.log(purchaseOrder)
            let purchaseOrder2 = JSON.stringify(purchaseOrder)
            let response = await apiClient.post("/purchaseorder/post", purchaseOrder2);
            return response.data;
        } catch (error) {
            console.error("Error al insertar datossss:", error);
            throw error;
        }
    }
}

