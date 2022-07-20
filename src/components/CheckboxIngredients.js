import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CheckboxIngredient.css';
import { Link } from 'react-router-dom';

function CheckboxIngredient(props) {
  const { ingredients } = props;

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
    const { checked, id } = target;
    setIsChecked(checked);

    if (checked === true) {
      setIngredientesMarked((prev) => [...prev, id]);
    } else {
      ingredients.forEach((ingr) => {
        if (ingredientsMarked.includes(ingr)) {
          setIngredientesMarked(ingredientsMarked.filter((ig) => ig !== ingr));
        }
      });
    }
  };

  const finishRecipe = () => {
    <Link to="/done-recipes" />;
  };

  return (
    <div>
      {
        ingredients.map((ingredient, i) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            className={ isChecked ? 'line-through' : 'normal' }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ ingredient }
              checked={ isChecked[i] }
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
};

export default CheckboxIngredient;
