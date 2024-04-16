import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';


const loginService = {
  getUsersByUsernameAndPassword: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/user?user_name=${username}&password=${password}`);
      //const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al obtener los usuarios');
    }
  },
  addPerson : async (name, last_name, dni, birth_date, email, telephone) => {
    try {
       const response = await fetch(`${API_URL}/person`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, last_name, dni, birth_date, email, telephone }),
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