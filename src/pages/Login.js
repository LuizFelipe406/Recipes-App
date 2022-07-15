import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cleanLocalStorage, saveLocalStorage } from '../services/localStorage';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    cleanLocalStorage();
  }, []);

  useEffect(() => {
    const enabledButton = () => {
      const minimumPassword = 6;

      if (email.includes('@mail.com') && password.length > minimumPassword) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [email, password]);

  const handleEmailChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePasswordChange = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const submitUser = () => {
    const { history } = props;
    const userEmail = {
      email,
    };

    saveLocalStorage(JSON.stringify(userEmail));

    history.push('/foods');
  };

  return (
    <div>
      <input
        type="email"
        placeholder="E-mail"
        value={ email }
        onChange={ handleEmailChange }
        data-testid="email-input"
      />

      <input
        type="password"
        placeholder="Senha"
        value={ password }
        onChange={ handlePasswordChange }
        data-testid="password-input"
      />

      <button
        type="button"
        disabled={ isDisabled }
        onClick={ submitUser }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
