import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js /', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { container, getByText } = render(<NotFound />);
    const h2NotFound = container.querySelector('h2');
    const h2Text = getByText('Page requested not found');

    expect(h2NotFound).toBeInTheDocument();
    expect(h2Text).toBeInTheDocument('Page requested not found');
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = render(<NotFound />);
    const imageNotFound = getByAltText(/Pikachu/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imageNotFound.src).toContain(url);
  });
});
