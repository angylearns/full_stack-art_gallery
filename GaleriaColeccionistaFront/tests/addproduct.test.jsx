import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import nock from 'nock'; // Importa nock

import Product from '../src/components/gallery/Product';

describe('Product Component', () => {
  // Configura nock antes de cada prueba
  beforeEach(() => {
    nock('http://localhost:5000')
      .get('/product/')
      .reply(200, {
        id: 1,
        title: 'Nuevo Producto',
        price: 10,
        composition: 'Acrílico',
        dimensions: '50x50',
        category: 'Arte Abstracto',
      });
  });

  test('allows adding a new product', async () => {
    const { getByLabelText, getByText } = render(<Product />);

    // Simula el llenado del formulario para agregar un nuevo producto
    fireEvent.change(getByLabelText('Título:'), { target: { value: 'Nuevo Producto' } });
    fireEvent.change(getByLabelText('Precio:'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Composición de la obra:'), { target: { value: 'Acrílico' } });
    fireEvent.change(getByLabelText('Dimensiones, Alto*Ancho:'), { target: { value: '50x50' } });
    fireEvent.change(getByLabelText('Categoría de la obra:'), { target: { value: 'Arte Abstracto' } });

    // Simula el envío del formulario
    fireEvent.click(getByText('Agregar Producto'));

    // Espera a que se agregue el producto
    await waitFor, async () => {
      expect(getByText('Título:Nuevo Producto')).toBeInTheDocument();
      expect(getByText('Precio: 10€')).toBeInTheDocument();
      expect(getByText('Composición: Acrílico')).toBeInTheDocument();
      expect(getByText('Dimensiones: 50x50')).toBeInTheDocument();
      expect(getByText('Categoría: Arte Abstracto')).toBeInTheDocument();
    };
  });

  // Limpia nock después de cada prueba
  afterEach(() => {
    nock.cleanAll();
  });
});
