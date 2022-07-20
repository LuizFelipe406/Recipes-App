import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  fetchDrinkById, fetchDrinkRecomendations, fetchFoodById, fetchFoodRecomendations,
} from '../services/FetchApi';
import './RecipeDetails.css';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails({ history, match }) {
  const START_RECIPE = 'Start Recipe';
  const { location: { pathname } } = history;
  console.log(pathname);
  const { params: { id } } = match;
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [buttonName, setButtonName] = useState(START_RECIPE);
  const [isCoppied, setIsCoppied] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const {
    doneRecipes, inProgressRecipes, setFavoriteRecipes, favoriteRecipes,
  } = useContext(RecipeContext);

  useEffect(() => {
    if (pathname.includes('/foods')) {
      setFavoriteIcon(() => (favoriteRecipes.some((item) => item.id === recipe.idMeal)
        ? blackHeartIcon : whiteHeartIcon));
    } else {
      setFavoriteIcon(() => (favoriteRecipes.some((item) => item.id === recipe.idDrink)
        ? blackHeartIcon : whiteHeartIcon));
    }
  }, [favoriteIcon, favoriteRecipes, recipe, pathname]);

  useEffect(() => {
    if (pathname.includes('/foods') && Object.keys(inProgressRecipes).length > 0) {
      setButtonName(() => (Object.keys(inProgressRecipes.meals).includes(recipe.idMeal)
        ? 'Continue Recipe' : START_RECIPE
      ));
    } if (pathname.includes('/drinks') && Object.keys(inProgressRecipes).length > 0) {
      setButtonName(() => (Object.keys(inProgressRecipes.cocktails)
        .includes(recipe.idDrink)
        ? 'Continue Recipe' : START_RECIPE));
    }
  }, [inProgressRecipes, pathname, recipe]);

  useEffect(() => {
    const getRecipe = async () => {
      if (pathname.includes('/foods')) {
        const newRecipe = await fetchFoodById(id);
        setRecipe(newRecipe[0]);
      } else {
        const newRecipe = await fetchDrinkById(id);
        setRecipe(newRecipe[0]);
      }
    };
    getRecipe();
  }, [id, pathname]);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      for (let i = 1; i <= '+20'; i += 1) {
        setIngredients((oldState) => {
          const newIngredients = [
            ...oldState,
            {
              name: recipe[`strIngredient${i}`],
              quantity: recipe[`strMeasure${i}`],
            },
          ];
          return (newIngredients.filter((item) => (
            item.name !== '' && item.name !== null && item.name !== undefined
          )));
        });
      }
    }
    return () => {
      setIngredients([]);
    };
  }, [pathname, recipe]);

  useEffect(() => {
    const getRecomendations = async () => {
      if (pathname.includes('/foods')) {
        const newRecomendations = await fetchDrinkRecomendations();
        setRecomendations(newRecomendations);
      } else {
        const newRecomendations = await fetchFoodRecomendations();
        setRecomendations(newRecomendations);
      }
    };
    getRecomendations();
  }, [pathname]);

  const copyToClipBoard = () => {
    if (isCoppied) copy('');
    else copy(`http://localhost:3000${pathname}`);
    setIsCoppied((oldState) => !oldState);
  };

  const saveFavoriteRecipe = () => {
    const favObject = {
      id: (pathname.includes('/foods') ? recipe.idMeal : recipe.idDrink),
      type: (pathname.includes('/foods') ? 'food' : 'drink'),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: (pathname.includes('/foods') ? '' : recipe.strAlcoholic),
      name: (pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink),
      image: (pathname.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb),
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
    <main>
      <img
        src={ pathname.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink }
        style={ { height: '200px' } }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink }
      </h2>
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
      <h3 data-testid="recipe-category">
        { pathname.includes('/foods') ? recipe.strCategory : recipe.strAlcoholic }
      </h3>
      <ul>
        {
          ingredients.length > 0 && ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient.name} ${ingredient.quantity}`}
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      {
        pathname.includes('/foods') && (
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/VVnZd8A84z4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
            data-testid="video"
          />
        )
      }
      <h2>Recomendations</h2>
      <div className="recomendations-container">
        {
          recomendations.map((item, index) => (
            <Link
              to={ pathname.includes('/foods')
                ? `/drinks/${item.idDrink}` : `/foods/${item.idMeal}` }
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <div className="recomendation-card">
                <img
                  src={ pathname.includes('/foods')
                    ? item.strDrinkThumb : item.strMealThumb }
                  alt={ pathname.includes('/foods') ? item.strDrink : item.strMeal }
                  width="150px"
                />
                <h3
                  data-testid={ `${index}-recomendation-title` }
                >
                  { pathname.includes('/foods') ? item.strDrink : item.strMeal }
                </h3>
                <h4>{ item.strCategory }</h4>
              </div>
            </Link>
          ))
        }
      </div>
      <div className="button-container">
        {
          (!doneRecipes.some((doneRecipe) => (
            doneRecipe.id === (pathname.includes('food') ? recipe.idMeal : recipe.idDrink)
          ))) && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              { buttonName }
            </button>
          )
        }
      </div>
    </main>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default RecipeDetails;
