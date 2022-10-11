class Slider {
  step = 0;

  offset = 0;

  classNames = {
    buttonPrev: 'button-prev',
    buttonNext: 'button-next',
    slider: 'feature-slider',
    sliderShifted: 'feature-slider__shifted',
    slide: 'feature-slider__slide',
  };

  elements = {
    slider: null,
    slides: null,
    buttonNext: null,
    buttonPrev: null,
  }

  constructor() {
    this.elements.slider = document.querySelector(`.${this.classNames.slider}`);
    this.elements.slide = document.querySelectorAll(`.${this.classNames.slide}`);
    this.elements.buttonNext = document.querySelector(`.${this.classNames.buttonNext}`);
    this.elements.buttonPrev = document.querySelector(`.${this.classNames.buttonPrev}`);

    this.init();
  }

  init() {
    this.elements.buttonPrev.addEventListener('click', this.setPrevSlide);
    this.elements.buttonNext.addEventListener('click', this.setNextSlide);

    this.setNextSlide = this.setNextSlide.bind(this);
    this.setPrevSlide = this.setPrevSlide.bind(this);
    this.markSliderShifted = this.markSliderShifted.bind(this);
    this.getStepWidth = this.getStepWidth.bind(this);
  }

  setNextSlide() {
    this.elements.buttonNext.removeEventListener('click', this.setNextSlide);

    this.markSliderShifted();

    // 1) Сдвигаем сцену
    this.elements.slider.style.transform = `translateX( ${(this.offset -= stepWidth())}px )`;
    this.step -= 1;

    setTimeout(() => {
      // 2) Перемещаем первый по порядку слайд в конец.
      if (this.step < 0) {
        const prevSlide = this.elements.slides[-this.step - 1];
        prevSlide.style.transform = `translateX(${this.getStepWidth() * this.elements.slides.length}px)`;
      } else {
        const nextSlide = this.elements.slides[this.elements.slides.length - (this.step + 1)];
        nextSlide.style.transform = `translateX(0px)`;
      }

      // Если сцена сдвинута на все слайды назад -
      // возвращаем положение слайдов и сцены в начальное положение
      if (this.offset === -(this.getStepWidth() * this.elements.slides.length)) {
        setDefaultPosition();
      }

      this.elements.buttonNext.addEventListener('click', this.setNextSlide);
    }, 300);
  }

  setPrevSlide() {
    this.elements.buttonPrev.removeEventListener('click', this.setPrevSlide);

    this.markSliderShifted();

    // 1)перемещаем крайний слайд в начало
    if (this.step < 0) {
      const prevSlide = this.elements.slides[-this.step - 1];
      prevSlide.style.transform = `translateX(0px)`;
    } else {
      const nextSlide = this.elements.slides[this.elements.slides.length - (this.step + 1)];
      nextSlide.style.transform = `translateX(-${this.getStepWidth() * this.elements.slides.length}px)`;
    }

    // 2)Сдвигаем сцену
    this.elements.slider.style.transform = `translateX( ${(this.offset += this.getStepWidth())}px )`;

    this.step += 1;

    setTimeout(() => {
      // Если сцена сдвинута на все слайды вперед -
      // возвращаем положение слайдов и сцены в начальное положение
      if (this.offset === stepWidth() * this.elements.slides.length) {
        setDefaultPosition();
      }

      this.elements.buttonPrev.addEventListener('click', this.setPrevSlide);
    }, 300);
  }

  markSliderShifted() {
    if (!this.elements.slider.classList.contains(classNames.sliderShifted)) {
      this.elements.slider.classList.add(classNames.sliderShifted);
    }
  }

  getStepWidth() {
    const { width } = getComputedStyle(this.elements.slides[0]);
    const slideWidth = Number(width.slice(0, width.length - 2));

    const { columnGap } = getComputedStyle(this.elements.slider);
    const sliderGap = Number(columnGap.slice(0, columnGap.length - 2));

    return slideWidth + sliderGap;
  }

}

export default Slider;
