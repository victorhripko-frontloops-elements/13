import './style.scss';

(() => {
  const root = document.querySelector('.slider');
  const slider = root.querySelector('.slider__wrap');
  const cards = slider.querySelectorAll('.slider__card');
  const prevBtn = root.querySelector('.slider__btn--prev');
  const nextBtn = root.querySelector('.slider__btn--next');

  const offset = 15;

  let currentSlide = 0;
  let lastSlide = false;

  const maxTranslate = [...cards].reduce(
    (total, current) => total + current.offsetWidth + offset,
    -slider.offsetWidth + offset
  );

  const goToSlide = (slideIndex) => {
    const slide = cards[slideIndex];
    const translateValue = -slide.offsetLeft + offset;
    const translateToLast = translateValue < -maxTranslate;
    const need = translateToLast ? -maxTranslate : translateValue;

    if (!slide) return;

    lastSlide = translateToLast;
    currentSlide = slideIndex;

    slider.style = `transform: translate3d(${need}px, 0, 0)`;
    updateButtons();
  };

  prevBtn.addEventListener('mousedown', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('mousedown', () => goToSlide(currentSlide + 1));

  const updateButtons = () => {
    prevBtn.classList.toggle('is-hidden', currentSlide <= 0);
    nextBtn.classList.toggle('is-hidden', lastSlide);
  };

  updateButtons();
})();
