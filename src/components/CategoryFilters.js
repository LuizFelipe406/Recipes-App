import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

function CategoryFilters({ pathname }) {
  const { categories, updateCategoryFilter } = useContext(RecipeContext);
  const { foodCategories, drinkCategories } = categories;

  const buttonCreator = (item, index) => (
    <Button
      type="button"
      key={ index }
      data-testid={ `${item.strCategory}-category-filter` }
      onClick={ () => updateCategoryFilter(item.strCategory, pathname) }
    >
      { item.strCategory }
    </Button>
  );

  return (
    <Container fluid>
      <ButtonToolbar className="mb-1">
        <ButtonGroup className="mx-auto">
          <Button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => updateCategoryFilter('All', pathname) }
          >
            All
          </Button>

          {(pathname === '/foods') && foodCategories.slice(0, 2).map(buttonCreator)}

          {(pathname === '/drinks') && drinkCategories.slice(0, 2).map(buttonCreator)}
        </ButtonGroup>
      </ButtonToolbar>
      <ButtonToolbar>
        <ButtonGroup className="mx-auto">
          {(pathname === '/foods') && foodCategories.slice('+2').map(buttonCreator)}

          {(pathname === '/drinks') && drinkCategories.slice('+2').map(buttonCreator)}
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
}

CategoryFilters.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default CategoryFilters;
