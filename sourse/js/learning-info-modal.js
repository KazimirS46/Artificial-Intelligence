'use strict';

const learningContent = document.querySelector('.learning-content');
const modalButton = learningContent.querySelector('.learning__info');
const modalWidowButton = learningContent.querySelector('.close-button');

function openModal() {
  const modal = learningContent.querySelector('.learning__modal');
  modal.classList.add('open');
}

function close() {
  const modal = learningContent.querySelector('.learning__modal');
  modal.classList.remove('open');
}

modalButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openModal();
});

modalWidowButton.addEventListener('click', () => {
  close();
});

window.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal__overlay')) {
    close();
  }
});
