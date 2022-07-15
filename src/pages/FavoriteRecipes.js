import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ history: { location: { pathname } } }) {
  return (
    <div>
      <Header pathname={ pathname } />
      <span>pagina de FavoriteRecipes</span>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default FavoriteRecipes;
