const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    425: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    901: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1920: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});
