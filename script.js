const navMenu = document.getElementById('nav-menu');

const navButton = document.getElementById('nav-button');

const navClose = document.getElementById('nav-close');

navButton.addEventListener('click', () => {
  navMenu.style.display = 'block';
  navButton.style.display = 'none';
});

navClose.addEventListener('click', () => {
  navMenu.style.display = 'none';
  navButton.style.display = 'block';
});
