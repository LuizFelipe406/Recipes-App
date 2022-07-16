import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DoneFavFilter from '../components/DoneFavFilter';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { filteredRecipes } = useContext(RecipeContext);

  const shareClick = ({ target: { value } }) => {
    console.log(value);
  };

  const createRecipeCards = (recipe, index) => (
    <div key={ recipe.id }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
          height="100px"
        />
      </Link>
      <input
        type="image"
        alt={ `Compartilhar receita de ${recipe.name}` }
        src={ shareIcon }
        onClick={ shareClick }
        data-testid={ `${index}-horizontal-share-btn` }
        value={ `/${recipe.type}s/${recipe.id}` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'food'
          ? `${recipe.nationality} - ${recipe.category}`
          : `${recipe.nationality} - ${recipe.alcoholicOrNot}`}
      </p>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      {recipe.tags.map(
        (tag, ind) => (
          <p
            key={ ind }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>
        ),
      )}
    </div>
  );

  return (
    <div>
      <h1>Página DoneRecipes</h1>
      <DoneFavFilter />
      <div>
        { filteredRecipes.map(createRecipeCards) }
      </div>
    </div>
  );
}

export default DoneRecipes;
