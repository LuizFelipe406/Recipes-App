import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Profile({ history: { location: { pathname } } }) {
  return (
    <div>
      <Header pathname={ pathname } />
      <span>Pagina de Profile</span>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
