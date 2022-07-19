import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CheckboxIngredient.css';

function CheckboxIngredient(props) {
  const { ingredients } = props;

  const [isChecked, setIsChecked] = useState(false);
  const [ingredientsMarked, setIngredientesMarked] = useState([]);

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
    </div>
  );
}

CheckboxIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckboxIngredient;
