import React, { useContext, useEffect, useState } from 'react';
import CheckboxIngredient from './CheckboxIngredients';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinkById, fetchFoodById } from '../services/FetchApi';

const copy = require('clipboard-copy');

function FoodInProgress(props) {
  const { recipe, path, id } = props;
  const ingredients = [];

  const [isCoppied, setIsCoppied] = useState(false);
  const [recipes, setRecipes] = useState({});
  const [favoriteIcon, setFavoriteIcon] = useState('');

  const { setFavoriteRecipes, favoriteRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipe = async () => {
      if (path.includes('/foods')) {
        const newRecipe = await fetchFoodById(id);
        setRecipes(newRecipe[0]);
      } else {
        const newRecipe = await fetchDrinkById(id);
        setRecipes(newRecipe[0]);
      }
    };
    getRecipe();
  }, [id, path]);

  useEffect(() => {
    if (path.includes('/foods')) {
      setFavoriteIcon(() => (favoriteRecipes.some((item) => item.id === recipes.idMeal)
        ? blackHeartIcon : whiteHeartIcon));
    } else {
      setFavoriteIcon(() => (favoriteRecipes.some((item) => item.id === recipes.idDrink)
        ? blackHeartIcon : whiteHeartIcon));
    }
  }, [favoriteIcon, favoriteRecipes, recipes, path]);

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

  const copyToClipBoard = () => {
    if (isCoppied) copy('');
    else copy(`http://localhost:3000${path}`);
    setIsCoppied((oldState) => !oldState);
  };

  const saveFavoriteRecipe = () => {
    const favObject = {
      id: (path.includes('/foods') ? recipes.idMeal : recipes.idDrink),
      type: (path.includes('/foods') ? 'food' : 'drink'),
      nationality: recipes.strArea || '',
      category: recipes.strCategory,
      alcoholicOrNot: (path.includes('/foods') ? '' : recipes.strAlcoholic),
      name: (path.includes('/foods') ? recipes.strMeal : recipes.strDrink),
      image: (path.includes('/foods') ? recipes.strMealThumb : recipes.strDrinkThumb),
    };
    let newFavoriteRecipes = [];
    if (favoriteRecipes.some((item) => item.id === id)) {
      newFavoriteRecipes = favoriteRecipes.filter(
        (item) => (item.id !== favObject.id),
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavoriteRecipes(newFavoriteRecipes);
    } else {
      newFavoriteRecipes = [
        ...favoriteRecipes,
        favObject,
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setFavoriteRecipes(newFavoriteRecipes);
    }
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
          {
            isCoppied && <span>Link copied!</span>
          }
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyToClipBoard }
          >
            <img src={ shareIcon } alt="botão de compartilhar" />
          </button>
          <button
            type="button"
            onClick={ saveFavoriteRecipe }
          >
            <img
              data-testid="favorite-btn"
              src={ favoriteIcon }
              alt="botão de favoritar"
            />
          </button>
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
