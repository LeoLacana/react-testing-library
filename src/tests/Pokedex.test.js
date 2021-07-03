import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonData from '../data';

const namePokemon = 'pokemon-name';

describe('Teste do componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const h2NotFound = container.querySelector('h2');

    expect(h2NotFound.textContent).toBe('Encountered pokémons');
  });

  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const btn = getAllByRole('button');

    expect(btn[8].textContent).toBe('Próximo pokémon');
  });

  it('O próximo da lista devem ser mostrado quando clicado em próximo pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonList = pokemonData.map(({ name }) => name);
    const btnNext = getByTestId('next-pokemon');
    const testId = getByTestId(namePokemon);
    pokemonList.forEach((pokemon) => {
      expect(testId.textContent).toBe(pokemon);
      userEvent.click(btnNext);
    });
    expect(pokemonList[0]).toBe('Pikachu');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTestId = getAllByTestId(namePokemon);
    expect(pokemonTestId.length).toBe(1);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(<App />);
    const pokemonNames = pokemonData.map(({ name }) => name);
    const buttonAll = getAllByRole('button');
    userEvent.click(buttonAll[0]);
    pokemonNames.forEach((pokemonName) => {
      const buttonNext = getByTestId('next-pokemon');
      const screenPokemon = getByTestId(namePokemon);
      expect(pokemonName).toBe(screenPokemon.textContent);
      userEvent.click(buttonNext);
    });

    expect(buttonAll[0].textContent).toBe('All');
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeList = pokemonData.map(({ type }) => type);
    const elementFilter = getAllByTestId('pokemon-type-button');
    const textTypeBtn = elementFilter.map((type) => type.textContent);
    const verifyType = pokemonTypeList.every((type) => textTypeBtn.includes(type));
    expect(verifyType).toBe(true);
  });
});
