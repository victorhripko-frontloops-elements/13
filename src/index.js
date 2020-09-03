import './style.scss';

(() => {
  const root = document.querySelector('.slider');
  const slider = root.querySelector('.slider__wrap');
  const cards = slider.querySelectorAll('.slider__card');
  const prevBtn = root.querySelector('.slider__btn--prev');
  const nextBtn = root.querySelector('.slider__btn--next');

  const offset = 15;

  let currentSlide = 0;
  let canSlide = true;

  const maxTranslate = [...cards].reduce(
    (total, current) => total + current.offsetWidth + offset,
    -slider.offsetWidth + offset
  );

  const slideCard = (slide) => {
    const translateValue = -slide.offsetLeft + offset;
    const need = translateValue < -maxTranslate ? -maxTranslate : translateValue;

    canSlide = need === translateValue;

    slider.style = `transform: translate3d(${need}px, 0, 0)`;
    updateButtons();
  };

  prevBtn.addEventListener('mousedown', () => {
    const nextSlide = cards[currentSlide - 1];
    if (!nextSlide) return;

    currentSlide--;
    slideCard(nextSlide);
  });

  nextBtn.addEventListener('mousedown', () => {
    const nextSlide = cards[currentSlide + 1];
    if (!nextSlide) return;

    if (canSlide) {
      currentSlide++;
      slideCard(nextSlide);
    }
  });

  const updateButtons = () => {
    prevBtn.classList.toggle('is-hidden', currentSlide <= 0);
    nextBtn.classList.toggle('is-hidden', !canSlide);
  };

  updateButtons();
})();
