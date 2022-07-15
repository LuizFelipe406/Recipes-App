import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchFoodsByFirstLetter, fetchFoodsByIngredient, fetchFoodsByName,
} from '../services/FetchApi';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [data, setData] = useState([{ srtMeal: '' }]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);

  const newSearch = async ({ option, value }, pathname) => {
    let newData = [];
    if (pathname === '/foods') {
      switch (option) {
      case 'ingredient': {
        newData = await fetchFoodsByIngredient(value);
        setData(newData);
        break;
      }
      case 'name': {
        newData = await fetchFoodsByName(value);
        setData(newData);
        break;
      }
      default: {
        newData = await fetchFoodsByFirstLetter(value);
        setData(newData);
      }
      }
    } else {
      switch (option) {
      case 'ingredient': {
        newData = await fetchDrinksByIngredient(value);
        setData(newData);
        break;
      }
      case 'name': {
        newData = await fetchDrinksByName(value);
        setData(newData);
        break;
      }
      default: {
        newData = await fetchDrinksByFirstLetter(value);
        setData(newData);
      }
      }
    }
  };

  const contextValue = {
    data,
    setData,
    doneRecipes,
    favoriteRecipes,
    inProgressRecipes,
    setDoneRecipes, // pro lint nao reclamar
    setFavoriteRecipes, // pro lint nao reclamar
    setInProgressRecipes, // pro lint nao reclamar
    newSearch,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
