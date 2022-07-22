const copy = require('clipboard-copy');

export const copyToClipBoard = (setIsCoppied, isCoppied, pathname) => {
  if (isCoppied) copy('');
  else copy(`http://localhost:3000${pathname}`);
  setIsCoppied((oldState) => !oldState);
};

export const saveFavoriteRecipe = (
  pathname, recipe, favoriteRecipes, setFavoriteRecipes,
) => {
  const favObject = {
    id: (pathname.includes('/foods') ? recipe.idMeal : recipe.idDrink),
    type: (pathname.includes('/foods') ? 'food' : 'drink'),
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: (pathname.includes('/foods') ? '' : recipe.strAlcoholic),
    name: (pathname.includes('/foods') ? recipe.strMeal : recipe.strDrink),
    image: (pathname.includes('/foods') ? recipe.strMealThumb : recipe.strDrinkThumb),
  };
  let newFavoriteRecipes = [];
  if (favoriteRecipes.some((item) => pathname.includes(item.id))) {
    newFavoriteRecipes = favoriteRecipes.filter(
      (item) => (item.id !== favObject.id),
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  } else {
    newFavoriteRecipes = [
      ...favoriteRecipes,
      favObject,
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  }
};

export const returnPage = (history) => {
  history.goBack();
};
