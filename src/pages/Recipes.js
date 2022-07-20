import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';
import { fetchDrinks, fetchFoods } from '../services/FetchApi';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';

function Recipes({ history: { location: { pathname } } }) {
  const { data, setData } = useContext(RecipeContext);
  useEffect(() => {
    const getInfo = async () => {
      if (pathname === '/drinks') {
        const drinks = await fetchDrinks();
        setData(drinks);
      } else {
        const foods = await fetchFoods();
        setData(foods);
      }
    };
    getInfo();
  }, [pathname, setData]);

  return (
    <Container fluid>
      <Header pathname={ pathname } />
      <CategoryFilters pathname={ pathname } />
      <Container fluid>
        <Row xs={ 2 } md={ 4 } className="g-4 p-0 m-0">
          {
            data && data.map((item, index) => (
              <Col key={ index }>
                <Link
                  to={
                    pathname === '/foods'
                      ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}`
                  }
                >
                  <Card
                    border="secondary"
                    className="text-center"
                    style={ { width: '8rem' } }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <Card.Img
                      className="img-fluid"
                      // style={ { height: '6rem' } }
                      variant="bottom"
                      src={ pathname === '/foods'
                        ? item.strMealThumb : item.strDrinkThumb }
                      alt={ pathname === '/foods' ? item.strMeal : item.strDrink }
                      data-testid={ `${index}-card-img` }
                    />
                    <Card.Body className="p-2">
                      <Card.Title
                        className="m-0 text-dark"
                        data-testid={ `${index}-card-name` }
                      >
                        { pathname === '/foods' ? item.strMeal : item.strDrink }
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          }
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Recipes;
