import React, { useContext, useEffect, useState } from 'react';
import CheckboxIngredients from './CheckboxIngredients';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinkById, fetchFoodById } from '../services/FetchApi';

const copy = require('clipboard-copy');

function DrinkInProgress(props) {
  const { recipe, path, id, history } = props;
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
          {
            isCoppied && <span>Link copied!</span>
          }
          <input
            type="image"
            alt={ `Compartilhar receita de ${path.includes('/foods')
              ? recipe.strMeal : recipe.strDrink}` }
            src={ shareIcon }
            onClick={ copyToClipBoard }
            data-testid="share-btn"
          />
          <input
            type="image"
            alt={ `Desfavoritar receita de ${path.includes('/foods')
              ? recipe.strMeal : recipe.strDrink}` }
            src={ favoriteIcon }
            onClick={ saveFavoriteRecipe }
            data-testid="favorite-btn"
          />
          <p data-testid="recipe-category">{ strAlcoholic }</p>
          <CheckboxIngredients
            ingredients={ getIngredients() }
            history={ history }
            recipe={ rec }
            path={ path }
            id={ id }
          />
          <p data-testid="instructions">{ strInstructions }</p>
        </div>
      );
    })
  );
}

export default DrinkInProgress;
