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

// test for carousel

var isAnimating = false;

function scrollLeftAnimate(elem, unit) {
  if (!elem || isAnimating) {
    //if element not found / if animating, do not execute slide
    return;
  }

  var time = 300; // animation duration in MS, the smaller the faster.
  var from = elem.scrollLeft; // to continue the frame posistion
  var aframe = 10; //fraction of frame frequency , set 1 for smoothest  ~ set 10++ for lower FPS (reduce CPU usage)
  isAnimating = true; //if animating prevent double trigger animation

  var start = new Date().getTime(),
    timer = setInterval(function () {
      var step = Math.min(1, (new Date().getTime() - start) / time);
      elem.scrollLeft = step * unit + from;
      if (step === 1) {
        clearInterval(timer);
        isAnimating = false;
      }
    }, aframe);
}

function initDealCarrousel(dealCarrouselID) {
  var target = document.querySelector(
    '#' + dealCarrouselID + ' .card-container'
  );
  var cardOutterWidth;
  var maxCarrouselScroll;

  function updateUpaCarrouselInfo() {
    cardOutterWidth = document.querySelector(
      '#' + dealCarrouselID + ' .card'
    ).offsetWidth -10; //you can define how far the scroll
    maxCarrouselScroll =
      document.querySelectorAll('#' + dealCarrouselID + ' .card').length *
        cardOutterWidth -
      document.querySelector('#' + dealCarrouselID + ' .card-container')
        .clientWidth;
  }

  document
    .querySelector('#' + dealCarrouselID + ' .deals-scroll-left')
    .addEventListener('click', function () {
      updateUpaCarrouselInfo(); //in case window resized, will get new info
      if (target.scrollLeft > 0) {
        scrollLeftAnimate(target, -cardOutterWidth * 2.1);
      }
    });

  document
    .querySelector('#' + dealCarrouselID + ' .deals-scroll-right')
    .addEventListener('click', function () {
      updateUpaCarrouselInfo(); //in case window resized, will get new info
      if (target.scrollLeft < maxCarrouselScroll) {
        scrollLeftAnimate(target, cardOutterWidth * 2.1);
      }
    });
}
// Initiate the container with ID
initDealCarrousel('carousel-container'); //carrousel ID
