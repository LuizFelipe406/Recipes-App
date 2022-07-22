import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getEmail } from '../services/localStorage';

const SOURCE_FONT = 'Source Sans Pro';

function Profile({ history: { location: { pathname } } }) {
  const email = getEmail();
  const history = useHistory();
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center p-0 m-0"
      style={ { backgroundColor: '#e9ecef' } }
    >
      <Header pathname={ pathname } />
      <span
        data-testid="profile-email"
        className="fs-1 mt-0 m-4"
        style={ {
          fontFamily: SOURCE_FONT,
          fontWeight: '600',
          color: '#6c757d',
        } }
      >
        {email}
      </span>
      <Container
        className="d-flex flex-column
        justify-content-center align-items-center"
        style={ { height: '70vh' } }
      >
        <Button
          className="fs-5 text-bg-primary mb-2"
          style={ {
            fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d', width: '60vw',
          } }
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>
        <Button
          className="fs-5 text-bg-primary mb-2"
          style={ {
            fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d', width: '60vw',
          } }
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
        <Button
          className="fs-5 text-bg-danger btn-danger mb-5"
          style={ {
            fontFamily: SOURCE_FONT, fontWeight: '600', color: '#6c757d', width: '60vw',
          } }
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
    </Container>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Profile;
