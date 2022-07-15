import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ history: { location: { pathname } } }) {
  return (
    <div>
      <Header pathname={ pathname } />
      <span>pagina de DoneRecipes</span>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
