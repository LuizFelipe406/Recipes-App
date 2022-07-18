import React from 'react';
import CheckboxIngredient from './CheckboxIngredients';

function DrinkInProgress(props) {
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
      const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = rec;
      return (
        <div key={ strDrink }>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{ strDrink }</p>
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <p data-testid="recipe-category">{ strAlcoholic }</p>
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

export default DrinkInProgress;
