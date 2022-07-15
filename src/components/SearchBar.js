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

        <input
          type="radio"
          name="option"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleChange }
        />
        <input
          type="radio"
          name="option"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleChange }
        />
        <input
          type="radio"
          name="option"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ handleChange }
        />
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
