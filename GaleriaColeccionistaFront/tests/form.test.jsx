import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/login/Login.jsx';
import '@testing-library/jest-dom';

// Simulamos el comportamiento de useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  test('renders login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Login isOpen={true} onClose={() => { }} onLogin={() => { }} />
    );
  
    // Verifica si solo hay un elemento con el texto "Iniciar Sesión" (debe ser un h2)
    expect(getByText("Iniciar Sesión", { selector: 'h2' })).toBeInTheDocument();

    expect(getByPlaceholderText("Usuario")).toBeInTheDocument();
    expect(getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(getByText("Tipo de usuario")).toBeInTheDocument();
    expect(getByText("Regístrate")).toBeInTheDocument();
  });

  test('allows user to switch between login and register views', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Login isOpen={true} onClose={() => { }} onLogin={() => { }} />
    );

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
  });
});
