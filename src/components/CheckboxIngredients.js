import React/* , { useState } */ from 'react';
import PropTypes from 'prop-types';

function CheckboxIngredient(props) {
  const { ingredients } = props;

  // const [isChecked, setIsChecked] = useState(false);

  // const handleChange = ({ target }) => {
  //   const { checked } = target;
  //   setIsChecked(checked);
  // };

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
              // checked={ isChecked }
              // onChange={ handleChange }
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
