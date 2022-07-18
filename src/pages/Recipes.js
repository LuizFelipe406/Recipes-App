import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinks, fetchFoods } from '../services/FetchApi';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';

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
      <CategoryFilters pathname={ pathname } />
      {
        data && data.map((item, index) => (
          <Link
            to={
              pathname === '/foods' ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}`
            }
            key={ index }
          >
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ pathname === '/foods' ? item.strMealThumb : item.strDrinkThumb }
                alt={ pathname === '/foods' ? item.strMeal : item.strDrink }
                data-testid={ `${index}-card-img` }
                style={ { width: '150px' } }
              />
              <span data-testid={ `${index}-card-name` }>
                { pathname === '/foods' ? item.strMeal : item.strDrink }
              </span>
            </div>
          </Link>
        ))
      }
     <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Recipes;
