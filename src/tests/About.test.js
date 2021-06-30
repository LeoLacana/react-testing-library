import React from 'react';
import { render } from '@testing-library/react';
import Abount from '../components/About';

describe('Teste o componente <About.js /', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(<Abount />);
    const h2Pokedex = getByText('About Pokédex');
    expect(h2Pokedex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<Abount />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = render(<Abount />);
    const imagePokedex = getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toContain(url);
  });
});
