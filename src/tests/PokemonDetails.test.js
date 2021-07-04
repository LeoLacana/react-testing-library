import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonData from '../data';

const textMoreDetails = 'More details';

describe('Teste do componente PokemonDetails', () => {
  it('A página deve conter um texto <name> Details', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText(textMoreDetails);
    userEvent.click(linkDetails);
    const titlePokemonDetails = getByText('Pikachu Details');

    expect(titlePokemonDetails.textContent).toBe(`${pokemonData[0].name} Details`);
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText(textMoreDetails);
    userEvent.click(linkDetails);
    const textH2 = getByText('Summary');

    expect(textH2.textContent).toBe('Summary');
  });

  it('A seção de detalhes deve conter um resumo do Pokémon escolhido', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const linkDetails = getByText(textMoreDetails);
    userEvent.click(linkDetails);
    const textDescription = container.querySelectorAll('p');

    expect(textDescription[3].textContent).toBe(pokemonData[0].summary);
  });

  it('Contem um h2 com texto Game Locations of <name>', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText(textMoreDetails);
    userEvent.click(linkDetails);
    const textH2Map = getByText('Game Locations of Pikachu');

    expect(textH2Map.textContent).toBe(`Game Locations of ${pokemonData[0].name}`);
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    const { getByText, getAllByAltText, container } = renderWithRouter(<App />);
    const linkDetails = getByText(textMoreDetails);
    userEvent.click(linkDetails);
    pokemonData[0].foundAt.forEach((foundAt, index) => {
      const location = container.querySelectorAll('em');
      const locationMap = getAllByAltText('Pikachu location');

      expect(location[index].textContent).toBe(foundAt.location);
      expect(locationMap[index].src).toBe(foundAt.map);
    });
  });

  it('Testar se o checkbox de favorito funciona habilitando e desabilitando', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const linkDetails = getByText(textMoreDetails);
    userEvent.click(linkDetails);

    const textLabel = getByText('Pokémon favoritado?');
    const checkboxButton = getByRole('checkbox');

    expect(checkboxButton).not.toBeChecked();
    userEvent.click(checkboxButton);
    expect(checkboxButton).toBeChecked();
    userEvent.click(checkboxButton);
    expect(checkboxButton).not.toBeChecked();

    expect(textLabel.textContent).toBe('Pokémon favoritado?');
  });
});
