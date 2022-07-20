import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkById, fetchFoodById } from '../services/FetchApi';
import FoodInProgress from '../components/FoodsInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

function RecipeInProgress(props) {
  const { match } = props;
  const { params, path, url } = match;
  const { id } = params;

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getFood = async () => {
      setRecipe(await fetchFoodById(id));
    };

    const getDrink = async () => {
      setRecipe(await fetchDrinkById(id));
    };

    if (path.includes('foods')) {
      getFood();
    } else {
      getDrink();
    }
  }, [id, path]);

  const getUrlToCopy = () => {
    if (path.includes('foods')) {
      const urlToCopy = url.slice(0, +'12');

      return urlToCopy;
    }

    const urlToCopy = url.slice(0, +'14');
    console.log(urlToCopy);

    return urlToCopy;
  };

  return (
    <div>
      <h3>Receitas em progresso</h3>
      <div>
        {
          path.includes('foods')
            ? <FoodInProgress recipe={ recipe } path={ getUrlToCopy() } id={ id } />
            : <DrinkInProgress recipe={ recipe } path={ getUrlToCopy() } id={ id } />
        }
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default RecipeInProgress;
