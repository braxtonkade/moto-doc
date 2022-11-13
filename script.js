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

// testimonial slider

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

// services

const services = Array.from(document.querySelectorAll('.service')),
  downArrows = Array.from(document.querySelectorAll('.fa-angle-down'));

services.forEach((service, index) => {
  service.addEventListener('click', btnDropdown(index));
});

const serviceDiv = document.querySelector('.service');
const serviceDivStyles = getComputedStyle(serviceDiv);
const marginBottom = parseInt(serviceDivStyles.marginBottom);

const btnDropdownHeight = document.querySelector('.book-service-btn').offsetHeight + marginBottom;


function btnDropdown(index) {

  let clicked = false;
  
  return function (e) {
    if (clicked === false) {
      services[index].querySelector('.fa-angle-down').style.transform = 'rotate(-180deg)';
      services[index].querySelector('.book-service-btn').style.top = '100%';
      services[index].style.marginBottom = `${btnDropdownHeight}px`;
      clicked = true;
    } else {
      services[index].querySelector('.fa-angle-down').style.transform = 'rotate(0)';
      services[index].querySelector('.book-service-btn').style.top = '55%';
      services[index].style.marginBottom = '2rem';
      clicked = false;
    }
  };
}
