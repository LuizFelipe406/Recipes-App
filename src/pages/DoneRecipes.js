import React, { useContext } from 'react';
import DoneFavFilter from '../components/DoneFavFilter';
import RecipeContext from '../context/RecipeContext';

function DoneRecipes() {
  const { filteredRecipes, doneRecipes } = useContext(RecipeContext);
  console.log(filteredRecipes, doneRecipes);

  return (
    <div>
      <h1>Página DoneRecipes</h1>
      <DoneFavFilter />
    </div>
  );
}

export default DoneRecipes;
