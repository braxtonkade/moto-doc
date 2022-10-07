if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

// navigation
const navContent = document.getElementById('nav-content'),
  navOpen = document.getElementById('nav-open'),
  navClose = document.getElementById('nav-close'),
  navButtonBg = document.getElementById('nav-button-bg'),
  previousScrollPosition = window.scrollY;

navOpen.addEventListener('click', () => {
  navOpen.style.transition = 'none';
  navOpen.style.color = 'black';
  navContent.style.top = '0';
});

navClose.addEventListener('click', () => {
  navContent.style.top = '-100%';
  navOpen.style.transition = 'color 2.5s';
  navOpen.style.color = '#fff';
});

window.onscroll = function () {
  let currentScrollPosition = window.scrollY;
  if (currentScrollPosition === previousScrollPosition) {
    navButtonBg.style.top = '-5rem';
  } else {
    navButtonBg.style.top = '0';
  }
};

// testimonial section

// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

const slider = document.querySelector('.slides-wrapper'),
  slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
  startPos = 0,
  currTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  // code to prevent dragging content
  // const slideImg = slide.querySelector('img');
  // slideImg.addEventListener('dragstart', (e) => e.preventDefault());
  // add event listeners to each slide for touch and mouse events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mousemove', touchMove);
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);

    // slider.classList.add('grabbing');
  };
}

function touchMove(event) {
  if (isDragging) {
    const currPosition = getPositionX(event);
    currTranslate = currPosition + prevTranslate - startPos;
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const moveBy = currTranslate - prevTranslate;

  if (moveBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  if (moveBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currTranslate}px)`;
}

function setPositionByIndex() {
  currTranslate = currentIndex * (-window.innerWidth * 0.9);
  prevTranslate = currTranslate;
  // setSliderPosition();
}

// const previousScrollPosition = window.scrollY;
// window.onscroll = function () {
//   let currentScrollPosition = window.scrollY;
//   if (currentScrollPosition === previousScrollPosition) {
//     navButtonBg.style.top = '-5rem';
//   } else {
//     navButtonBg.style.top = '0';
//   }
// };

// // test for carousel

// var isAnimating = false;

// function scrollLeftAnimate(elem, unit) {
//   if (!elem || isAnimating) {
//     //if element not found / if animating, do not execute slide
//     return;
//   }

//   var time = 300; // animation duration in MS, the smaller the faster.
//   var from = elem.scrollLeft; // to continue the frame posistion
//   var aframe = 10; //fraction of frame frequency , set 1 for smoothest  ~ set 10++ for lower FPS (reduce CPU usage)
//   isAnimating = true; //if animating prevent double trigger animation

//   var start = new Date().getTime(),
//     timer = setInterval(function () {
//       var step = Math.min(1, (new Date().getTime() - start) / time);
//       elem.scrollLeft = step * unit + from;
//       if (step === 1) {
//         clearInterval(timer);
//         isAnimating = false;
//       }
//     }, aframe);
// }

// function initDealCarrousel(dealCarrouselID) {
//   var target = document.querySelector(
//     '#' + dealCarrouselID + ' .card-container'
//   );
//   var cardOutterWidth;
//   var maxCarrouselScroll;

//   function updateUpaCarrouselInfo() {
//     cardOutterWidth = document.querySelector(
//       '#' + dealCarrouselID + ' .card'
//     ).offsetWidth -10; //you can define how far the scroll
//     maxCarrouselScroll =
//       document.querySelectorAll('#' + dealCarrouselID + ' .card').length *
//         cardOutterWidth -
//       document.querySelector('#' + dealCarrouselID + ' .card-container')
//         .clientWidth;
//   }

//   document
//     .querySelector('#' + dealCarrouselID + ' .deals-scroll-left')
//     .addEventListener('click', function () {
//       updateUpaCarrouselInfo(); //in case window resized, will get new info
//       if (target.scrollLeft > 0) {
//         scrollLeftAnimate(target, -cardOutterWidth * 1.1);
//       }
//     });

//   document
//     .querySelector('#' + dealCarrouselID + ' .deals-scroll-right')
//     .addEventListener('click', function () {
//       updateUpaCarrouselInfo(); //in case window resized, will get new info
//       if (target.scrollLeft < maxCarrouselScroll) {
//         scrollLeftAnimate(target, cardOutterWidth * 1);
//       }
//     });
// }
// // Initiate the container with ID
// initDealCarrousel('carousel-container'); //carrousel ID
