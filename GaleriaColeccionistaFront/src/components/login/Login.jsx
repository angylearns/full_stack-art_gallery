import React, { useState } from 'react';
import './login.css';


function Login() {
    //Variable para ver modal
    const [showModal, setShowModal] = useState(false);
    //Variable saber si estoy en login o en registro
    const [newUser, setNewUser] = useState(false);
    
    //variables de login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    //variables de registro
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondLastName, setSecondLastName] = useState('');
    const [email, setEmail] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('LORENA handleLogin');
        console.log('LORENA handleLogin username '+ username);
        console.log('LORENA handleLogin password '+ password);
        


        //Implementar código de login 


    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('LORENA handleRegister');

        //Implementar código de registro
    }


    return (



<>

<div className="App">
      <button className="btn-user" onClick={() => setShowModal(true)}>
        <img src="src\assets\icon-user.svg" className="icon-user mx-3" alt="" />
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            {/* <img className='modal-photo'src="https://i.postimg.cc/bwY00vtc/Property-1-OIG3-removebg-preview-1-1.png" alt="" /> */}
            <h2>{newUser ? "Registrarse" : "Iniciar Sesión"}</h2>
            <form onSubmit={newUser ? handleRegister : handleLogin}>
              {newUser && (
                <>
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="lastName">Apellido:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <label htmlFor="secondLastName">Segundo Apellido:</label>
                  <input
                    type="text"
                    id="secondLastName"
                    value={secondLastName}
                    onChange={(e) => setSecondLastName(e.target.value)}
                    required
                  />
                  
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </>
              )}
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className='button-submit'>
                {newUser ? "Registrarse" : "Iniciar Sesión"}
              </button>
            </form>
            {!newUser && (
              <p>
                ¿Todavía no estás registrado?{" "}
                <button className='button-register' onClick={() => setNewUser(true)}>
                  Regístrate aquí
                </button>
              </p>
            )}
          </div>
        </div>
         )}
         </div>






</>




    )
  }
  

export default Login;