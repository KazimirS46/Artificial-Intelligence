const classNames = {
  navigationList: 'navigation__list',
  menuButton: 'menu__button',
  navItem: 'navigation__list-item',
};

const menuToggle = {
  open() {
    menuButton.classList.toggle('menu-open');
  },
  active() {
    navList.classList.toggle('active');
  },
};

const navList = document.querySelector(`.${classNames.navigationList}`);
const menuButton = document.querySelector(`.${classNames.menuButton}`);
const navItems = document.querySelectorAll(`.${classNames.navItem}`);

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuToggle.open();
    menuToggle.active();
  });
});

menuButton.addEventListener('click', menuToggle.open, false);
menuButton.addEventListener('click', menuToggle.active, false);
