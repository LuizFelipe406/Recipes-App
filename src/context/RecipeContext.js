import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import mockDoneRecipes from '../mocks/mockDoneRecipes';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  /* Criando um mock para produzir o DoneRecipes */
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', mockDoneRecipes);
  }

  const [data, setData] = useState([{ srtMeal: '' }]);
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const contextValue = {
    data,
    setData,
    doneRecipes,
    setDoneRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    inProgressRecipes,
    setInProgressRecipes,
    filteredRecipes,
    setFilteredRecipes,
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
