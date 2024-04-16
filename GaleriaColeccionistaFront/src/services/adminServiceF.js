import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

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
            let response = await apiClient.post("/persons",user);
            return response.data;
        } catch (error) {
            console.error("Error al obtener personas:", error);
            throw error; 
        }
    }
};

