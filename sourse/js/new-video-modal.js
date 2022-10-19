const heroContainer = document.querySelector('.hero-container');
const watchButton = document.querySelector('.hero__action-video');
const ANIMATION_SPEED = 200;
let closing = false;

function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('hero__modal');
  modal.insertAdjacentHTML(
    'beforeend',
    `<div class="overlay">
      <iframe
        class="hero__video"
        src="https://www.youtube.com/embed/63yr9dlI0cU"
        title="TIMELAPSE OF ARTIFICIAL INTELLIGENCE (2028 – 3000+)"
      ></iframe>
    </div>
    `
  );
  heroContainer.append(modal);
  return modal;
}

function modalOpen() {
  if (!closing) {
    const heroModal = heroContainer.querySelector('.hero__modal');
    heroModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function modalClose() {
  closing = true;
  document.body.style.overflow = 'visible';
  const heroModal = heroContainer.querySelector('.hero__modal');
  heroModal.classList.remove('open');
  heroModal.classList.add('hide');
  setTimeout(() => {
    heroModal.classList.remove('hide');
    closing = false;
  }, ANIMATION_SPEED);
}

window.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('overlay')) {
    modalClose();
  }
});

_createModal();

watchButton.addEventListener('click', function () {
  modalOpen();
});
