const navList = document.querySelector('.navigation__list');
const menuButton = document.querySelector('.menu__button');

function toggleToggle() {
  menuButton.classList.toggle('menu-open');
}

function toggleMenu() {
  navList.classList.toggle('active');
}

menuButton.addEventListener('click', toggleToggle, false);
menuButton.addEventListener('click', toggleMenu, false);
