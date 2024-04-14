
import React, { useState } from 'react';

const Login = () => {
    const [isLoginFormVisible, setLoginFormVisible] = useState(true);

    const handleToggleForm = () => {
        setLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <div className="login-container">
            <section className="user">
                <div className="user_options-container">
                    <div className="user_options-text">
                        {isLoginFormVisible ? (
                            <div className="user_options-unregistered">
                                <h2 className="user_unregistered-title">¿No tienes cuenta?</h2>
                                <p className="user_unregistered-text">
                                    ¿Eres amante del arte? Crea una cuenta y sumérgete en nuestra colección.
                                </p>
                                <button className="user_unregistered-signup" onClick={handleToggleForm}>
                                    Regístrate
                                </button>
                            </div>
                        ) : (
                            <div className="user_options-registered">
                                <h2 className="user_registered-title">¿Tienes cuenta?</h2>
                                <p className="user_registered-text">
                                    Nos alegra verte otra vez. ¿Listo para sumergirte en el mundo del arte?
                                </p>
                                <button class="user_registered-login" id="login-button">LOG IN</button>
                            </div>
                        )}
                    </div>

                    <div className="user_options-forms" id="user_options-forms">
                        {isLoginFormVisible ? (
                            <div className="user_forms-login">
                                <h2 className="forms_title">Login</h2>
                                <form className="forms_form">
                                    <fieldset className="forms_fieldset">
                                        <div className="forms_field">
                                            <input type="email" placeholder="Email" className="forms_field-input" required autofocus />
                                        </div>
                                        <div className="forms_field">
                                            <input type="password" placeholder="Password" className="forms_field-input" required />
                                        </div>
                                    </fieldset>
                                    <div className="forms_buttons">
                                        <button type="button" className="forms_buttons-forgot">Forgot password?</button>
                                        <input type="submit" value="Log In" className="forms_buttons-action" />
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="user_forms-signup">
                                <h2 className="forms_title">Regístrate</h2>
                                <form className="forms_form">
                                    <fieldset className="forms_fieldset">
                                        <div className="forms_field">
                                            <input type="text" placeholder="Full Name" className="forms_field-input" required />
                                        </div>
                                        <div className="forms_field">
                                            <input type="email" placeholder="Email" className="forms_field-input" required />
                                        </div>
                                        <div className="forms_field">
                                            <input type="password" placeholder="Password" className="forms_field-input" required />
                                        </div>
                                    </fieldset>
                                    <div className="forms_buttons">
                                        <input type="submit" value="Sign up" className="forms_buttons-action" />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
