import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

function FavoriteButton({ recipe: { id, name }, index }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipeContext);

  const unfavoriteClick = ({ target: { value } }) => {
    const newFavorites = favoriteRecipes.filter(
      (recipe) => recipe.id !== value,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes(newFavorites);
  };

  return (
    <input
      className="ml-1"
      type="image"
      alt={ `Desfavoritar receita de ${name}` }
      src={ blackHeartIcon }
      onClick={ unfavoriteClick }
      data-testid={ `${index}-horizontal-favorite-btn` }
      value={ id }
    />
  );
}

FavoriteButton.propTypes = {
  recipe: Proptypes.shape({
    id: Proptypes.number,
    name: Proptypes.string,
  }),
  index: Proptypes.number,
}.isRequired;

export default FavoriteButton;
