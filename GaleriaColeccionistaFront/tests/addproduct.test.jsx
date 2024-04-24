import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import nock from 'nock'; 

import Product from '../src/components/gallery/Product';

describe('Product Component', () => {
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

    fireEvent.change(getByLabelText('Título:'), { target: { value: 'Nuevo Producto' } });
    fireEvent.change(getByLabelText('Precio:'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Composición de la obra:'), { target: { value: 'Acrílico' } });
    fireEvent.change(getByLabelText('Dimensiones, Alto*Ancho:'), { target: { value: '50x50' } });
    fireEvent.change(getByLabelText('Categoría de la obra:'), { target: { value: 'Arte Abstracto' } });

    fireEvent.click(getByText('Agregar Producto'));

    await waitFor, async () => {
      expect(getByText('Título:Nuevo Producto')).toBeInTheDocument();
      expect(getByText('Precio: 10€')).toBeInTheDocument();
      expect(getByText('Composición: Acrílico')).toBeInTheDocument();
      expect(getByText('Dimensiones: 50x50')).toBeInTheDocument();
      expect(getByText('Categoría: Arte Abstracto')).toBeInTheDocument();
    };
  });

  afterEach(() => {
    nock.cleanAll();
  });
});
