import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js /', () => {
  it('Teste se tem a mensagem No favorite pokemon found, se não tiver pokemons.', () => {
    const { getByText } = render(<FavoritePokemons />);
    const h2Pokedex = getByText('No favorite pokemon found');
    expect(h2Pokedex).toBeInTheDocument();
  });
});
