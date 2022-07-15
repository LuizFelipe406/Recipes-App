export const saveLocalStorage = (userEmail) => {
  localStorage.setItem('user', userEmail);
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const cleanLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('mealsToken');
  localStorage.removeItem('cocktailsToken');
};
