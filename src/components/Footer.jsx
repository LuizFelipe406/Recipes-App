import React from 'react';
import { Link } from 'react-router-dom';
import imageDrink from '../images/drinkIcon.svg';
import imageMeal from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link
        className="drinks"
        to="/drinks"
        alt="drinks"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ imageDrink }
          alt="drinkIcon"
        />
      </Link>
      <Link
        className="foods"
        to="/foods"
        alt="foods"
      >
        <img
          data-testid="food-bottom-btn"
          src={ imageMeal }
          alt="mealIcon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
