'use strict';

const header = document.querySelector('.header');
const navigation = document.querySelector('.navigation');
let scrollDistace = 0;

window.addEventListener('scroll', function () {
  scrollDistace = window.pageYOffset;
  if (scrollDistace >= navigation.clientHeight) {
    navigation.classList.add('navigation-fixed');
    header.classList.add('header-transparent');
  } else {
    navigation.classList.remove('navigation-fixed');
    header.classList.remove('header-transparent');
  }
});
