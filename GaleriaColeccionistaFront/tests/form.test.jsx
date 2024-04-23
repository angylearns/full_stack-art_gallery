import React from 'react';
import { render, fireEvent, waitFor, getByPlaceholderText, getByText } from '@testing-library/react';
import Login from '../src/components/login/Login.jsx';
import '@testing-library/jest-dom';

describe('Login Component', () => {
  test('renders login form correctly', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<Login isOpen={true} onClose={() => { }} onLogin={() => { }} />);

    // Verifica si los elementos del formulario se renderizan correctamente
    const loginTitleElement = getByText("Iniciar Sesión", { selector: 'h2[aria-label="login-title"]' });
    expect(loginTitleElement).toBeInTheDocument();
    expect(getByPlaceholderText("Usuario")).toBeInTheDocument();
    expect(getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(getByText("Tipo de usuario")).toBeInTheDocument();

    // Encuentra el botón "Regístrate" por su rol
    const registerButton = getByRole("button", { name: /Regístrate/i });
    expect(registerButton).toBeInTheDocument();
  });

  test('allows user to switch between login and register views', async () => {
    const { getByPlaceholderText, getByText } = render(<Login isOpen={true} onClose={() => { }} onLogin={() => { }} />);

    // Simula hacer clic en el botón "Regístrate"
    fireEvent.click(getByText(/Regístrate/i));

    // Espera a que se renderice la vista de registro
    await waitFor(() => {
      expect(getByText("Regístrese")).toBeInTheDocument();
      expect(getByPlaceholderText("Nombre")).toBeInTheDocument();
      expect(getByPlaceholderText("Apellidos")).toBeInTheDocument();
      expect(getByPlaceholderText("DNI")).toBeInTheDocument();
      expect(getByPlaceholderText("Fecha de Nacimiento")).toBeInTheDocument();
      expect(getByPlaceholderText("Correo Electrónico")).toBeInTheDocument();
      expect(getByPlaceholderText("Teléfono")).toBeInTheDocument();
    });

    // Realiza más aserciones para la vista de registro si es necesario
  });
});
