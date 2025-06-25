document.addEventListener('DOMContentLoaded', () => {
  let sliderInitialized = false;
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slider__item');
  const sliderContainer = document.querySelector('.slider__container');
  const prevButton = document.querySelector('.btn__prev');
  const nextButton = document.querySelector('.btn__next');
  const indicatorContainer = document.querySelector('.indicator');
  let dots = [];

  const updateSlideWidths = () => {
    const slideWidth = document.querySelector('.slider').offsetWidth;
    slides.forEach(slide => {
      slide.style.minWidth = `${slideWidth}px`;
    });
    updateSliderPosition();
  };

  const updateSliderPosition = () => {
    const slideWidth = document.querySelector('.slider').offsetWidth;
    sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const updateIndicator = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  const updateButtons = () => {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSliderPosition();
    updateIndicator();
    updateButtons();
  };

  const prevClickHandler = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  const nextClickHandler = () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const initializeSlider = () => {
    if (window.innerWidth < 768) {
      if (!sliderInitialized) {
        sliderInitialized = true;
        sliderContainer.style.display = 'flex';
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';

        // Создаем точки индикатора
        indicatorContainer.innerHTML = '';
        slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === currentIndex) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          indicatorContainer.appendChild(dot);
        });
        dots = Array.from(indicatorContainer.querySelectorAll('.dot'));

        prevButton.addEventListener('click', prevClickHandler);
        nextButton.addEventListener('click', nextClickHandler);
        window.addEventListener('resize', updateSlideWidths);

        updateSlideWidths();
        updateIndicator();
        updateButtons();
      }
    } else {
      if (sliderInitialized) {
        sliderInitialized = false;

        sliderContainer.style.display = '';
        sliderContainer.style.transition = '';
        sliderContainer.style.transform = '';

        slides.forEach(slide => {
          slide.style.minWidth = '';
        });

        prevButton.removeEventListener('click', prevClickHandler);
        nextButton.removeEventListener('click', nextClickHandler);
        window.removeEventListener('resize', updateSlideWidths);

        indicatorContainer.innerHTML = '';
      }
    }
  };

  initializeSlider();
  window.addEventListener('resize', initializeSlider);
});
