import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests in Home page and Links `/` ', () => {
  /*
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  */

  it('Verify if exists Home, About and Favorite Pokémons link', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeButton = getByText('Home');
    const aboutButton = getByText('About');
    const favoritePokemonButton = getByText('Favorite Pokémons');

    expect(homeButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(favoritePokemonButton).toBeInTheDocument();
  });
});
