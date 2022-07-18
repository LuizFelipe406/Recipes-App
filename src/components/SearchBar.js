import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function SearchBar({ pathname }) {
  const { newSearch } = useContext(RecipeContext);
  const [filter, setFilter] = useState({
    option: '',
    value: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilter((oldFilter) => ({
      ...oldFilter,
      [name]: value,
    }));
  };

  const sendFilter = () => {
    if (filter.option === 'first-letter' && filter.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setFilter({
        option: '',
        value: '',
      });
    } else {
      newSearch(filter, pathname);
      setFilter({
        option: '',
        value: '',
      });
    }
  };

  return (
    <form>

      <input
        type="text"
        name="value"
        data-testid="search-input"
        value={ filter.value }
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="option"
            data-testid="ingredient-search-radio"
            value="ingredient"
            placeholder="Search"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="option"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter"
            type="radio"
            name="option"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleChange }
          />
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ sendFilter }
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default SearchBar;
