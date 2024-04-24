import React, { useState, useEffect } from "react";
import "./login.css";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import Navbar from "../navbar/Navbar";
import { handleLogin, handleRegister } from "../../handlers/loginHandler";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login({ isOpen, onClose, onLogin }) {
  const navigate = useNavigate();

  const initialStateRegister = {
    first_name: "",
    last_name: "",
    dni: "",
    birth_date: "",
    email: "",
    telephone: "",
  };

  const initialStateErrorsRegister = {
    first_name: "",
    last_name: "",
    dni: "",
    birth_date: "",
    email: "",
    telephone: "",
  };

  const initialStateLogin = {
    user_name: "",
    password: "",
  };

  const initialStateErrorsLogin = {
    user_name: "",
    password: "",
  };

  const [formStateRegister, setFormStateRegister] =
    useState(initialStateRegister);
  const [formErrorsRegister, setFormErrorsRegister] = useState(
    initialStateErrorsRegister
  );

  const [formStateLogin, setFormStateLogin] = useState(initialStateLogin);
  const [formErrorsLogin, setFormErrorsLogin] = useState(
    initialStateErrorsLogin
  );

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [first_name, setFirstName] = useState("");

  const [last_name, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [user_type, setUserType] = useState("");

  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [cookies, setCookie] = useCookies(["userToken"]);

  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    console.log(" handleInputChangeLogin Valido login " + name + " " + value);
    setFormStateLogin({ ...formStateLogin, [name]: value });

    if (name === "user_name") {
      if (value.length === 0) {
        setFormErrorsLogin({ ...formErrorsLogin, msgErrorusername: "" });
      } else if (value.length < 3) {
        setFormErrorsLogin({
          ...formErrorsLogin,
          msgErrorusername:
            "El nombre de usuario debe tener al menos 3 caracteres.",
        });
      } else {
        setFormErrorsLogin({ ...formErrorsLogin, msgErrorusername: "" });
      }
    }

    if (name === "password") {
      const regexPassword = /^[A-Za-z\d@$!%*?&]{4,}$/;

      if (value.length === 0) {
        setFormErrorsLogin({ ...formErrorsLogin, msgErrorpassword: "" });
      } else if (!regexPassword.test(value)) {
        setFormErrorsLogin({
          ...formErrorsLogin,
          msgErrorpassword: "La contraseña debe tener al menos 4 caracteres.",
        });
      } else {
        setFormErrorsLogin({ ...formErrorsLogin, msgErrorpassword: "" });
      }
    }
  };

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    console.log(
      " handleInputChangeRegister Valido registro " + name + " " + value
    );
    setFormStateRegister({ ...formStateRegister, [name]: value });
    setFormStateLogin({ ...formStateLogin, [name]: value });

    if (name === "first_name") {
      if (value.length === 0) {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorFirstName: "" });
      } else if (value.length < 2) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorFirstName:
            "El nombre de usuario debe tener al menos 2 caracteres.",
        });
      } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/.test(value)) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorFirstName:
            "El nombre de usuario no debe contener números ni símbolos.",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorFirstName: "" });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorLastName: "" });
      } else if (value.length < 2) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorLastName: "El apellido debe tener al menos 2 caracteres.",
        });
      } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/.test(value)) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorLastName: "El apellido no debe contener números ni símbolos.",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorLastName: "" });
      }
    }

    if (value.length === 0) {
      setFormErrorsRegister({ ...formErrorsRegister, msgErrordni: "" });
    } else if (name === "dni") {
      if (value.length < 9) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrordni: "El DNI debe tener al menos 9 caracteres.",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrordni: "" });
      }
    }

    if (name === "birth_date") {
      const regexFecha = /^\d{4}-\d{2}-\d{2}$/;

      if (value.length === 0) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorbirth_date: "",
        });
      } else if (!regexFecha.test(value)) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorbirth_date:
            "La fecha de nacimiento debe estar en formato AAAA-MM-DD.",
        });
      } else {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorbirth_date: "",
        });
      }
    }

    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (value.length === 0) {
        setFormErrorsRegister({ ...formErrorsRegister, msgErroremail: "" });
      } else if (!regexEmail.test(value)) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErroremail: "El formato del correo electrónico no es válido.",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErroremail: "" });
      }
    }

    if (name === "telephone") {
      if (value.length === 0) {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrortelephone: "" });
      } else if (value.length < 9) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrortelephone: "Al menos 9 caracteres.",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrortelephone: "" });
      }
    }

    if (name === "user_name") {
      const regexUsername = /^[a-zA-Z0-9_]{3,15}$/;
      if (value.length === 0) {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorusername: "" });
      } else if (!regexUsername.test(value)) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorusername:
            "El nombre de usuario debe tener entre 3 y 15 caracteres y solo puede contener letras, números y guiones bajos.",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorusername: "" });
      }
    }

    if (name === "password") {
      const regexPassword = /^[A-Za-z\d@$!%*?&]{4,}$/;

      if (value.length === 0) {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorpassword: "" });
      } else if (!regexPassword.test(value)) {
        setFormErrorsRegister({
          ...formErrorsRegister,
          msgErrorpassword: "La contraseña debe tener mínimo 4 caracteres",
        });
      } else {
        setFormErrorsRegister({ ...formErrorsRegister, msgErrorpassword: "" });
      }
    }
  };

  const handleToggleView = () => {
    setNewUser(!newUser);
    console.log(
      "login jsx : handleToogleView newUser " + JSON.stringify(newUser)
    );
  };

  const resetToLoginView = () => {
    setNewUser(false);
    setUserType("");
  };

  useEffect(() => {
    resetToLoginView();
  }, []);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    await handleRegister(e, setErrorMessage);

    if (!errorMessage) {
    }
    if (errorMessage) {
    }
    setFormStateLogin(initialStateLogin);
    setFormStateRegister(initialStateRegister);
    resetToLoginView();
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const { user_name, password } = formStateLogin;

      const tokenData = await handleLogin(
        { user_name, password },
        setErrorMessage
      );

      const decodedToken = jwtDecode(tokenData.token);

      setCookie("id_user", decodedToken.id_user);
      setCookie("first_name", decodedToken.first_name);
      setCookie("id_person", decodedToken.id_person);
      setCookie("password", decodedToken.password);
      setCookie("user_type", decodedToken.user_type);
      setCookie("user_name", decodedToken.user_name);

      const userTypeDecoded = decodedToken.user_type;

      switch (userTypeDecoded) {
        case "Admin":
          navigate("/admin");
          break;
        case "Artist":
          navigate("/artist");
          break;
        case "Client":
          navigate("/");
          break;
        default:
          console.error("Tipo de usuario no reconocido");
      }
      alert("Inició sesión");

      onClose();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Ocurrió un error al iniciar sesión");
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user_name");
    console.log(" loggedInUser " + loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="App">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <h2 className="login-title" aria-label="login-title">
                {newUser ? "Regístrese" : "Iniciar Sesión"}
              </h2>

              <form
                onSubmit={newUser ? handleSubmitRegister : handleSubmitLogin}
              >
                {newUser && (
                  <>
                    <div className="twoblocks">
                      <input
                        className="input-register"
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formStateRegister.first_name}
                        onChange={handleInputChangeRegister}
                        required
                        placeholder="Nombre"
                      />
                      {formErrorsRegister.msgErrorFirstName && (
                        <p>{formErrorsRegister.msgErrorFirstName}</p>
                      )}
                      <input
                        className="input-register"
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formStateLogin.last_name}
                        onChange={handleInputChangeRegister}
                        required
                        placeholder="Apellidos"
                      />
                      {formErrorsRegister.msgErrorLastName && (
                        <p>{formErrorsRegister.msgErrorLastName}</p>
                      )}
                      <input
                        className="input-register"
                        type="text"
                        id="dni"
                        name="dni"
                        value={formStateRegister.dni}
                        onChange={handleInputChangeRegister}
                        required
                        placeholder="DNI"
                      />
                      {formErrorsRegister.msgErrordni && (
                        <p>{formErrorsRegister.msgErrordni}</p>
                      )}

                      <input
                        className="input-register"
                        type="text"
                        id="birth_date"
                        name="birth_date"
                        value={formStateRegister.birth_date}
                        onChange={handleInputChangeRegister}
                        required
                        placeholder="Fecha de Nacimiento"
                      />
                      {formErrorsRegister.msgErrorbirth_date && (
                        <p>{formErrorsRegister.msgErrorbirth_date}</p>
                      )}
                      <input
                        className="input-register"
                        type="email"
                        id="email"
                        name="email"
                        value={formStateRegister.email}
                        onChange={handleInputChangeRegister}
                        required
                        placeholder="Correo Electrónico"
                      />
                      {formErrorsRegister.msgErroremail && (
                        <p>{formErrorsRegister.msgErroremail}</p>
                      )}
                      <input
                        className="input-register"
                        type="telephone"
                        id="telephone"
                        name="telephone"
                        value={formStateRegister.telephone}
                        onChange={handleInputChangeRegister}
                        required
                        placeholder="Teléfono"
                      />
                      {formErrorsRegister.msgErrortelephone && (
                        <p>{formErrorsRegister.msgErrortelephone}</p>
                      )}
                    </div>
                  </>
                )}

                {newUser
                  ? formErrorsRegister.msgErrorusername && (
                      <p> {formErrorsRegister.msgErrorusername}</p>
                    )
                  : formErrorsLogin.msgErrorusername && (
                      <p> {formErrorsLogin.msgErrorusername}</p>
                    )}

                <input
                  className="input-login"
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formStateLogin.user_name}
                  onChange={
                    newUser ? handleInputChangeRegister : handleInputChangeLogin
                  }
                  required
                  placeholder="Usuario"
                />
                {newUser
                  ? formErrorsRegister.msgErrorpassword && (
                      <p> {formErrorsRegister.msgErrorpassword}</p>
                    )
                  : formErrorsLogin.msgErrorpassword && (
                      <p> {formErrorsLogin.msgErrorpassword}</p>
                    )}
                <input
                  className="input-login"
                  type="password"
                  id="password"
                  name="password"
                  value={formStateLogin.password}
                  onChange={
                    newUser ? handleInputChangeRegister : handleInputChangeLogin
                  }
                  required
                  placeholder="Contraseña"
                />

                <select
                  className="optionusertype"
                  id="user_type"
                  value={user_type}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="">Tipo de usuario</option>
                  <option value="1">Admin</option>
                  <option value="3">Cliente</option>
                  <option value="2">Artista</option>
                </select>
                <button type="submit" className="button-submit">
                  {newUser ? "Registrarse" : "Iniciar Sesión"}
                </button>
                <button
                  onClick={handleToggleView}
                  className="buttonsloginlogout"
                >
                  {newUser ? "Inicia sesión" : "Regístrate"}
                </button>
              </form>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              {!newUser && <div className=""></div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
