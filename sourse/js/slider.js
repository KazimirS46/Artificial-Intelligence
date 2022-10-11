'use strict';

const classNames = {
  buttonPrev: 'button-prev',
  buttonNext: 'button-next',
  slider: 'feature-slider',
  sliderShifted: 'feature-slider__shifted',
  slide: 'feature-slider__slide',
}

const prevButton = document.querySelector(`.${classNames.buttonPrev}`);
const nextButton = document.querySelector(`.${classNames.buttonNext}`);
const slider = document.querySelector(`.${classNames.slider}`);
const slides = document.querySelectorAll(`.${classNames.slide}`);

function toggleSlideShifted() {
  if (!slider.classList.contains(classNames.sliderShifted)) {
    slider.classList.add(classNames.sliderShifted);
  }
}

function setDefaultPosition() {
  toggleSlideShifted();
  slider.classList.remove(classNames.sliderShifted);
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
  toggleSlideShifted();
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
  toggleSlideShifted();
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
