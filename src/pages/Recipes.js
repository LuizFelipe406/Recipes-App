import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinks, fetchFoods } from '../services/FetchApi';

function Recipes({ history: { location: { pathname } } }) {
  const { data, setData } = useContext(RecipeContext);
  useEffect(() => {
    const getInfo = async () => {
      if (pathname === '/drinks') {
        const drinks = await fetchDrinks();
        setData(drinks);
      } else {
        const foods = await fetchFoods();
        setData(foods);
      }
    };
    getInfo();
  }, [pathname, setData]);

  return (
    <div>
      pagina de Recipes
      {
        data[0].strMeal
      }
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Recipes;
