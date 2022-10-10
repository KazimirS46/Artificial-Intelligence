'use strict';

const prevButton = document.querySelector('.button-prev');
const nextButton = document.querySelector('.button-next');
const slider = document.querySelector('.feature-slider');
const shift = document.querySelector('.feature-slider--shifted');
let slides = document.querySelectorAll('.feature-slider__slide');

function checkAvailabilityClass() {
  if (!slider.classList.contains('feature-slider--shifted')) {
    slider.classList.add('feature-slider--shifted');
  }
}

function setDefaultPosition() {
  slider.classList.remove('feature-slider--shifted');
  offset = 0;
  step = 0;
  slider.style.transform = `translateX(0)`;
  slides.forEach((item) => {
    item.style.transform = null;
  });
}

function stepWidth() {
  let slideWidthString = getComputedStyle(slides[0]).width;
  let slideWidth = Number(
    slideWidthString.slice(0, slideWidthString.length - 2)
  );

  let sliderGapProp = getComputedStyle(slider).columnGap;
  let sliderGap = Number(sliderGapProp.slice(0, sliderGapProp.length - 2));

  return slideWidth + sliderGap;
}

// const stepWidth = 387;
let step = 0;
let offset = 0;

function switchingForward() {
  nextButton.removeEventListener('click', switchingForward);
  checkAvailabilityClass();
  // 1) Сдвигаем сцену
  slider.style.transform = `translateX( ${(offset -= stepWidth())}px )`;
  step -= 1;
  setTimeout(() => {
    // 2) Перемещаем первый по порядку слайд в конец.
    if (step < 0) {
      slides[-step - 1].style.transform = `translateX(${
        stepWidth() * slides.length
      }px)`;
    } else {
      slides[slides.length - (step + 1)].style.transform = `translateX(0px)`;
    }
    // Если сцена сдвинута на все слайды назад - возвращаем положение слайдов и сцены в начальное положение
    if (offset == -(stepWidth() * slides.length)) {
      setDefaultPosition();
    }
    nextButton.addEventListener('click', switchingForward);
  }, 300);
}

function switchingBack() {
  prevButton.removeEventListener('click', switchingBack);
  checkAvailabilityClass();
  // 1)перемещаем крайний слайд в начало
  if (step < 0) {
    slides[-step - 1].style.transform = `translateX(0px)`;
  } else {
    slides[slides.length - (step + 1)].style.transform = `translateX(-${
      stepWidth() * slides.length
    }px)`;
  }

  // 2)Сдвигаем сцену
  slider.style.transform = `translateX( ${(offset += stepWidth())}px )`;
  step += 1;

  setTimeout(() => {
    // Если сцена сдвинута на все слайды вперед - возвращаем положение слайдов и сцены в начальное положение
    if (offset == stepWidth() * slides.length) {
      setDefaultPosition();
    }
    prevButton.addEventListener('click', switchingBack);
  }, 300);
}

nextButton.addEventListener('click', switchingForward);
prevButton.addEventListener('click', switchingBack);
