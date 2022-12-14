import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getEmail } from '../services/localStorage';
import '../style/Profile.css';

function Profile({ history: { location: { pathname } } }) {
  const email = getEmail();
  const history = useHistory();
  return (
    <div
      className="p-0 m-0 profile-main-container"
    >
      <Header pathname={ pathname } />
      <div className="email-container">
        <span
          data-testid="profile-email"
          className="fs-1 mt-0 m-4 user-email"
        >
          {email}
        </span>
      </div>
      <Container
        className="d-flex flex-column
        justify-content-center align-items-center buttons-container"
      >
        <Button
          className="fs-5 text-bg-primary mb-2 button-style"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>
        <Button
          className="fs-5 text-bg-primary mb-2 button-style"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
        <Button
          className="fs-5 text-bg-danger btn-danger mb-5 button-style"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
        >
          Logout
        </Button>
      </Container>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
