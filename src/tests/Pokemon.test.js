import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemonData from '../data';

describe('Teste do componente Pokemon.js', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemonData[0] } />);
    const namePokemon = getByTestId('pokemon-name');

    expect(namePokemon.textContent).toBe('Pikachu');
  });

  it('O typo correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemonData[0] } />);
    const typePokemon = getByTestId('pokemon-type');

    expect(typePokemon.textContent).toBe('Electric');
  });

  it('Teste formato certo do peso do Pokemon', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemonData[0] } />);
    const weightPokemon = getByTestId('pokemon-weight');
    const weightNumber = pokemonData[0].averageWeight.value;
    const weightUnity = pokemonData[0].averageWeight.measurementUnit;

    expect(weightPokemon.textContent)
      .toBe(`Average weight: ${weightNumber} ${weightUnity}`);
  });

  it('Teste do Sprite do Pokemon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemonData[0] } />);
    const spritePokemon = getByAltText('Pikachu sprite');

    expect(spritePokemon.src).toBe(pokemonData[0].image);
    expect(spritePokemon.alt).toBe(`${pokemonData[0].name} sprite`);
  });

  it('Teste de detalhes do Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetailsPokemon = getByText('More details');

    expect(linkDetailsPokemon.href).toBe(`http://localhost/pokemons/${pokemonData[0].id}`);
  });

  /* it('Teste URL da página de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homePath = getByText('Home');
    userEvent.click(homePath);

    const linkDetailsPokemon = getByText('More details');
    userEvent.click(linkDetailsPokemon);

    const historyPath = history.location.pathname;

    expect(historyPath).toBe(`/pokemons/${pokemonData[0].id}`);
  }); */

  it('Test icone de estrela do Pokemon favorito', () => {
    const { getByText, getByAltText, container } = renderWithRouter(<App />);
    const linkDetailsPokemon = getByText('More details');
    userEvent.click(linkDetailsPokemon);

    const selectFavorite = container.querySelector('#favorite');
    userEvent.click(selectFavorite);

    const iconStar = getByAltText('Pikachu is marked as favorite');
    expect(iconStar.src).toBe('http://localhost/star-icon.svg');
    expect(iconStar.alt).toBe(`${pokemonData[0].name} is marked as favorite`);
  });
});
