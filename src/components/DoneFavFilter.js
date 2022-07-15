import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function DoneFilter() {
  const { doneRecipes, setFilteredRecipes } = useContext(RecipeContext);

  const changeFilter = ({ target: { value } }) => {
    if (value === 'all') {
      setFilteredRecipes(doneRecipes);
      return;
    }
    setFilteredRecipes(
      doneRecipes.filter((recipe) => recipe.type === value),
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

export default DoneFilter;
