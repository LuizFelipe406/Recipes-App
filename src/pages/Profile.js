import React from 'react';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
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

export default Profile;
