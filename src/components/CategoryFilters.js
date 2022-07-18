import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function CategoryFilters({ pathname }) {
  const { categories, updateCategoryFilter } = useContext(RecipeContext);
  const { foodCategories, drinkCategories } = categories;

  const buttonCreator = (item, index) => (
    <button
      type="button"
      key={ index }
      data-testid={ `${item.strCategory}-category-filter` }
      onClick={ () => updateCategoryFilter(item.strCategory, pathname) }
    >
      { item.strCategory }
    </button>
  );

  return (
    <div>
      {
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => updateCategoryFilter('All', pathname) }
        >
          All
        </button>
      }
      {
        (pathname === '/foods') && foodCategories.map(buttonCreator)
      }
      {
        (pathname === '/drinks') && drinkCategories.map(buttonCreator)
      }
    </div>
  );
}

CategoryFilters.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default CategoryFilters;
