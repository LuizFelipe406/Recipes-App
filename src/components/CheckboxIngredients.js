import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CheckboxIngredient.css';
import { saveIngredients } from '../services/localStorage';
import RecipeContext from '../context/RecipeContext';

function CheckboxIngredient(props) {
  const { ingredients, history, recipe, path } = props;
  const teste = JSON.parse(localStorage.getItem('inProgressFoods'));

  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredientsMarked, setIngredientesMarked] = useState([]);

  const { doneRecipes, setDoneRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const enabledButton = () => {
      if (ingredientsMarked.length === ingredients.length) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [ingredientsMarked, ingredients]);

  const handleChange = ({ target }) => {
    const { checked, value } = target;
    let selectdIngredients = [...ingredientsMarked];
    setIsChecked(checked);

    if (checked === true) {
      selectdIngredients = [...selectdIngredients, value];
    } else {
      selectdIngredients.splice(ingredientsMarked.indexOf(value), 1);
    }

    setIngredientesMarked(selectdIngredients);
    saveIngredients(JSON.stringify(selectdIngredients));
  };

  const scratchIngredient = (ingredient) => (
    ingredientsMarked.includes(ingredient) ? 'line-through' : 'normal');

  const finishRecipe = async () => {
    const doneObject = {
      id: (path.includes('/foods') ? recipe.idMeal : recipe.idDrink),
      type: (path.includes('/foods') ? 'food' : 'drink'),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: (path.includes('/foods') ? '' : recipe.strAlcoholic),
      name: (path.includes('/foods') ? recipe.strMeal : recipe.strDrink),
      image: (path.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb),
      tags: (typeof recipe.strTags === 'string' ? recipe.strTags.split(', ') : []),
      doneDate: 'PLACEHOLDER',
    };
    doneRecipes.push(doneObject);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    await setDoneRecipes(doneRecipes);
    history.push('/done-recipes');
  };

  return (
    <div>
      {
        ingredients.map((ingredient, i) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            className={ scratchIngredient(ingredient) }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ ingredient }
              value={ ingredient }
              checked={ teste && teste.includes(ingredient) ? true : isChecked[i] }
              onChange={ handleChange }
            />
            { ingredient }
          </label>
        ))
      }
      <div>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ finishRecipe }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

CheckboxIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape().isRequired,
  recipe: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
};

export default CheckboxIngredient;
