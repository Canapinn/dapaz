(function() {
  document.addEventListener("DOMContentLoaded", () => {
    const swiperElement = document.querySelector(".mySwiper");
    if (swiperElement) {
      console.log("Swiper está sendo inicializado!");
      // Inicialize o Swiper
      var swiper = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: 3, // Exibe 3 slides por vez
        spaceBetween: 0, // Espaço entre os slides
        centeredSlides: false,
        autoplay: {
          delay: 500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        effect: 'coverflow', // Efeito de fade
        speed: 1200, // Duração da transição em milissegundos
      });
    }
  });
})();
(function() {
  // Carrossel de kits festa (index.html)
  let currentSlideIndex = 0;
  window.moveSlide = function(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    showSlide(currentSlideIndex);
  }

  window.showSlide = function(index) {
    const slides = document.querySelectorAll('.carousel-item');
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  // Initialize the carousel
  showSlide(currentSlideIndex);

  let isDown = false;
  let startX;
  let scrollLeft;

  const slider = document.querySelector('.swiper-wrapper');

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
})();
