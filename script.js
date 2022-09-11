const nav = document.querySelector('nav');

const navButton = document.getElementById('nav-button');
const navButtonBg = document.getElementById('nav-button-bg');

const navClose = document.getElementById('nav-close');

const previousScrollPosition = window.scrollY;

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
      window.scrollTo(0, 0);
  };
}


navButton.addEventListener('click', () => {
  nav.style.top = '0';
  navButton.style.display = 'none';
});

navClose.addEventListener('click', () => {
  nav.style.top = '-100vw';
  navButton.style.display = 'block';
});

window.onscroll = function () {
  let currentScrollPosition = window.scrollY;
  if (currentScrollPosition === previousScrollPosition) {
    navButtonBg.style.top = '-5rem';
  } else {
    navButtonBg.style.top = '0';
  }
};


