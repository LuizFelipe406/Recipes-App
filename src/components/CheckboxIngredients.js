import React from 'react';
import PropTypes from 'prop-types';

function CheckboxIngredient(props) {
  const { ingredients } = props;

  return (
    <div>
      {
        ingredients.map((ingredient, i) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ ingredient }
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
