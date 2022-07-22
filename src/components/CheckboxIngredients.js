import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CheckboxIngredient.css';
import { saveIngredients } from '../services/localStorage';

function CheckboxIngredient(props) {
  const { ingredients, history, path, id } = props;
  // const teste = JSON.parse(localStorage.getItem('inProgressFoods'));

  // const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredientsMarked, setIngredientesMarked] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    meals: {},
    cocktails: {},
  });

  useEffect(() => {
    const inProgressRecipesStr = localStorage.getItem('inProgressRecipes')
    || JSON.stringify({
      meals: {},
      cocktails: {},
    });
    console.log(inProgressRecipesStr);
    setInProgressRecipes(JSON.parse(inProgressRecipesStr));
  }, []);

  useEffect(() => {
    if (path.includes('/foods') && Object.keys(inProgressRecipes.meals).includes(id)) {
      setIngredientesMarked(inProgressRecipes.meals[id]);
    } if (path.includes('/drinks') && Object.keys(inProgressRecipes
      .cocktails).includes(id)) {
      setIngredientesMarked(inProgressRecipes.cocktails[id]);
    }
  }, [id, path, inProgressRecipes]);

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

    let selectdIngredients = [];
    // setIsChecked(checked);

    if (checked === true) {
      selectdIngredients = [...ingredientsMarked, value];
    } else {
      selectdIngredients = ingredientsMarked
        .filter((item) => (item !== value));
    }
    let newInProgress = {};
    if (path.includes('/foods')) {
      newInProgress = { ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: selectdIngredients,
        },

      };
    } else {
      newInProgress = { ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [id]: selectdIngredients,
        },

      };
    }
    setInProgressRecipes(newInProgress);
    saveIngredients(JSON.stringify(newInProgress));
  };

  const scratchIngredient = (ingredient) => (
    ingredientsMarked.includes(ingredient) ? 'line-through' : 'normal');

  const finishRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      { ingredientsMarked && ingredients.map((ingredient, i) => (
        <label
          htmlFor={ ingredient }
          key={ ingredient }
          className={ scratchIngredient(ingredient) }
          data-testid={ `${i}-ingredient-step` }
        >
          { (ingredientsMarked.includes(ingredient))
            ? (

              <input
                type="checkbox"
                id={ ingredient }
                value={ ingredient }
                onChange={ handleChange }
                defaultChecked
              />
            ) : (
              <input
                type="checkbox"
                id={ ingredient }
                value={ ingredient }
                onChange={ handleChange }
              />
            )}
          { ingredient }
        </label>
      ))}
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
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CheckboxIngredient;
