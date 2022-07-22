import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function DoneFavFilter({ pathname }) {
  const { doneRecipes, favoriteRecipes, setFilteredRecipes } = useContext(RecipeContext);
  let recipes = doneRecipes;
  if (pathname === '/favorite-recipes') {
    recipes = favoriteRecipes;
  }

  useEffect(() => {}, [doneRecipes, favoriteRecipes]);

  const changeFilter = ({ target: { value } }) => {
    if (value === 'all') {
      setFilteredRecipes(recipes);
      return;
    }
    setFilteredRecipes(
      recipes.filter((recipe) => recipe.type === value),
    );
  };

  return (
    <div className="doneFilterContainer">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ changeFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ changeFilter }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ changeFilter }
      >
        Drink
      </button>
    </div>
  );
}

DoneFavFilter.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DoneFavFilter;
