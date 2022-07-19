import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testa CategoryFilters foods', () => {
  test('Testa category filters foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn)
    
    await waitFor(() => screen.findByTestId('0-card-img'), {timeout: 5000})
    const corba = await screen.findByTestId('0-card-img')
    userEvent.click(corba)

    expect(await screen.findByAltText(/corba/i))
    expect(await screen.findByAltText(/botão de compartilhar/i))
    expect(await screen.findByAltText(/botão de favoritar/i))
    expect(await screen.findByRole('heading', {name: /side/i}))
    
    const ingName = await screen.findByTestId('0-ingredient-name-and-measure')
    expect(ingName).toBeInTheDocument()

    const instru = await screen.findByTestId('instructions')
    expect(instru).toBeInTheDocument()

    const youtubeVideo = await screen.findByTestId('video')
    expect(youtubeVideo).toBeInTheDocument()
    
    const recomHead = screen.getByRole('heading', {name: /recomendations/i})
    expect(recomHead).toBeInTheDocument()

    const recoList = await screen.findByTestId('0-recomendation-card')
    expect(recoList).toBeInTheDocument()

    const startRecipe = await screen.findByTestId('start-recipe-btn')
    expect(startRecipe).toBeInTheDocument()

    userEvent.click(startRecipe)
    expect(history.location.pathname).toBe('/foods/52977/in-progress');

  });
});

describe('Testa CategoryFilters drinks', () => {
  test('Testa category filters drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn)
    
    await waitFor(() => screen.findByTestId('0-card-img'), {timeout: 5000})
    const corba = await screen.findByTestId('0-card-img')
    userEvent.click(corba)

    expect(await screen.findByAltText(/gg/i))
    expect(await screen.findByAltText(/botão de compartilhar/i))
    expect(await screen.findByAltText(/botão de favoritar/i))
    expect(await screen.findByRole('heading', {name: /Optional alcohol/i}))
    
    const ingName = await screen.findByTestId('0-ingredient-name-and-measure')
    expect(ingName).toBeInTheDocument()

    const instru = await screen.findByTestId('instructions')
    expect(instru).toBeInTheDocument()

    const recomHead = screen.getByRole('heading', {name: /recomendations/i})
    expect(recomHead).toBeInTheDocument()

    const recoList = await screen.findByTestId('0-recomendation-card')
    expect(recoList).toBeInTheDocument()

    const startRecipe = await screen.findByTestId('start-recipe-btn')
    expect(startRecipe).toBeInTheDocument()

    userEvent.click(startRecipe)
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

  });
});
