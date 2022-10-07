'use strict';

const watchButton = document.querySelector('.hero__action-video');
const heroModal = document.querySelector('.hero__modal');
const overlay = document.querySelector('.overlay');
const heroVideo = document.querySelector('.hero__video');

watchButton.addEventListener('click', function () {
  overlay.classList.add('overlay--visible');
  heroVideo.classList.add('hero__video--visible');
});

window.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    overlay.classList.remove('overlay--visible');
    heroVideo.classList.remove('hero__video--visible');
  }
});
