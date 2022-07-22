import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CheckboxIngredient.css';
import { saveIngredients } from '../services/localStorage';

function CheckboxIngredient(props) {
  const { ingredients, history } = props;
  const teste = JSON.parse(localStorage.getItem('inProgressFoods'));

  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredientsMarked, setIngredientesMarked] = useState([]);

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

  const finishRecipe = () => {
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
};

export default CheckboxIngredient;
