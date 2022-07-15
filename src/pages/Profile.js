import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history: { location: { pathname } } }) {
  return (
    <div>
      <Header pathname={ pathname } />
      <div data-testid="profile-email">email</div>
      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
