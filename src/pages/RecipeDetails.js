import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import {
  fetchDrinkById, fetchDrinkRecomendations, fetchFoodById, fetchFoodRecomendations,
} from '../services/FetchApi';
import './RecipeDetails.css';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const SOURCE_FONT = 'Source Sans Pro';

function RecipeDetails({ history, match }) {
  const START_RECIPE = 'Start Recipe';
  const { location: { pathname } } = history;
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
    <Container className="p-0 m-0" style={ { backgroundColor: '#e9ecef' } }>
      <img
        src={ pathname.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink }
        style={ {
          height: '300px', width: '100vw', objectFit: 'cover', objectPosition: 'center',
        } }
        data-testid="recipe-photo"
      />
      <header className="d-flex justify-content-between align-item-center">
        <div className="mt-1">
          <h2
            className=" ml-3 mt-3 d-inline mb-0 pb-0"
            style={ { fontFamily: 'Titan One', fontSize: '2em', color: '#6c757d' } }
            data-testid="recipe-title"
          >
            { pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink }
          </h2>
          <h3
            className="ml-3 mt-0 fs-4 pt-0"
            style={
              { fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d' }
            }
            data-testid="recipe-category"
          >
            { pathname.includes('/foods') ? recipe.strCategory : recipe.strAlcoholic }
          </h3>
        </div>
        <div className="mt-2">
          { isCoppied
          && <span style={ { fontFamily: SOURCE_FONT } }>Link copied!</span> }
          <button
            className="border-0"
            type="button"
            data-testid="share-btn"
            onClick={ copyToClipBoard }
          >
            <img src={ shareIcon } alt="botão de compartilhar" />
          </button>
          <button className="border-0" type="button" onClick={ saveFavoriteRecipe }>
            <img
              width="26"
              data-testid="favorite-btn"
              src={ favoriteIcon }
              alt="botão de favoritar"
            />
          </button>
        </div>
      </header>
      <div
        className="mt-2 mb-3"
        style={ {
          margin: '0 auto', width: '90vw', height: '0.5px', border: '0.5px solid #ced4da',
        } }
      />
      <Container className="mb-1">
        <span
          className="fs-5"
          style={ { fontFamily: 'Titan One', color: '#6c757d' } }
        >
          INGREDIENTS
        </span>
        <ul className="m-0 p-0 ml-4">
          {
            ingredients.length > 0 && ingredients.map((ingredient, index) => (
              <li
                className="fs-5"
                style={ {
                  fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d' } }
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredient.name} ${ingredient.quantity}`}
              </li>
            ))
          }
        </ul>
      </Container>
      <div
        className="mt-4 mb-3"
        style={ {
          margin: '0 auto', width: '90vw', height: '0.5px', border: '0.5px solid #ced4da',
        } }
      />
      <Container>
        <span
          className="fs-5"
          style={ { fontFamily: 'Titan One', color: '#6c757d' } }
        >
          INSTRUCTIONS
        </span>
        <p
          style={ {
            fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d' } }
          className="ml-1 mr-1 fs-5"
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </p>
      </Container>
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
      <div
        className="mt-4 mb-3"
        style={ {
          margin: '0 auto', width: '90vw', height: '0.5px', border: '0.5px solid #ced4da',
        } }
      />
      <Container className="mb-2">
        <h2
          className="fs-5"
          style={ { fontFamily: 'Titan One', color: '#6c757d' } }
        >
          RECOMENDATIONS
        </h2>
        <div className="recomendations-container">
          {
            recomendations.map((item, index) => (
              <Link
                to={ pathname.includes('/foods')
                  ? `/drinks/${item.idDrink}` : `/foods/${item.idMeal}` }
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <Card
                  border="secondary"
                  className="text-center mr-4"
                  style={ { width: '10rem' } }
                >
                  <Card.Img
                    src={ pathname.includes('/foods')
                      ? item.strDrinkThumb : item.strMealThumb }
                    alt={ pathname.includes('/foods') ? item.strDrink : item.strMeal }
                    width="150px"
                  />
                  <Card.ImgOverlay
                    className="d-flex
                    flex-column justify-content-center align-items-center"
                    style={ { backgroundColor: 'rgba(33, 37, 41, 0.5)' } }
                  >
                    <Card.Title
                      className="m-0 text-white fs-1"
                      style={ { opacity: '1', fontFamily: 'Titan One' } }
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { pathname.includes('/foods') ? item.strDrink : item.strMeal }
                    </Card.Title>
                    <Card.Subtitle
                      className="m-0 text-white fs-5"
                      style={ { opacity: '1', fontFamily: 'Titan One' } }
                    >
                      { item.strCategory }
                    </Card.Subtitle>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            ))
          }
        </div>
      </Container>
      {
        (!doneRecipes.some((doneRecipe) => (
          doneRecipe.id === (pathname.includes('food') ? recipe.idMeal : recipe.idDrink)
        ))) && (
          <button
            style={ {
              fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d' } }
            className="fixed-bottom text-bg-success border-0 p-2 fs-5"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            { buttonName }
          </button>
        )
      }
    </Container>
  );
}

RecipeDetails.propTypes = { history: PropTypes.shape(), match: PropTypes.shape(),
}.isRequired;

export default RecipeDetails;
