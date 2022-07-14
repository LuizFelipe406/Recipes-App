import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [data, setData] = useState([{ srtMeal: '' }]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);

  const contextValue = {
    data,
    setData,
    doneRecipes,
    favoriteRecipes,
    inProgressRecipes,
    setDoneRecipes, // pro lint nao reclamar
    setFavoriteRecipes, // pro lint nao reclamar
    setInProgressRecipes, // pro lint nao reclamar
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
