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
        data-testid="drinks-bottom-btn"
        to="/drinks"
        alt="drinks"
      >
        <img src={ imageDrink } alt="drinkIcon" />
      </Link>
      <Link
        className="foods"
        data-testid="food-bottom-btn"
        to="/foods"
        alt="foods"
      >
        <img src={ imageMeal } alt="mealIcon" />
      </Link>
    </footer>
  );
}

export default Footer;
