import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinks, fetchFoods } from '../services/FetchApi';
import Header from '../components/Header';

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

  console.log(data);

  return (
    <div>
      <Header pathname={ pathname } />
      pagina de Recipes
      {
        data.map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ pathname === '/foods' ? item.strMealThumb : item.strDrinkThumb }
              alt={ pathname === '/foods' ? item.strMeal : item.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <span data-testid={ `${index}-card-name` }>
              { pathname === '/foods' ? item.strMeal : item.strDrink }
            </span>
          </div>
        ))
      }
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Recipes;
