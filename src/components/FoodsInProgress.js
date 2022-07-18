import React from 'react';
import CheckboxIngredient from './CheckboxIngredients';

function FoodInProgress(props) {
  const { recipe } = props;
  const ingredients = [];

  const getIngredients = () => {
    recipe.forEach((rec) => {
      for (let i = 0; i <= +'20'; i += 1) {
        const ingredient = `strIngredient${i}`;
        if (rec[ingredient] && rec[ingredient].length > 0) {
          ingredients.push(rec[ingredient]);
        }
      }
    });

    return ingredients;
  };

  return (
    recipe.map((rec) => {
      const { strMealThumb, strMeal, strCategory, strInstructions } = rec;
      return (
        <div key={ strMeal }>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ strMeal }</p>
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <p data-testid="recipe-category">{ strCategory }</p>
          <CheckboxIngredient ingredients={ getIngredients() } />
          <p data-testid="instructions">{ strInstructions }</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>
      );
    })
  );
}

export default FoodInProgress;
