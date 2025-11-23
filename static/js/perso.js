// Script para carrossel 3D interativo

document.addEventListener('DOMContentLoaded', function () {
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const indicatorsContainer = document.querySelector('.indicators');

  let currentIndex = 0;
  let autoRotateInterval;
  const totalItems = carouselItems.length;
  const angleStep = 360 / totalItems;

  // Criar indicadores
  for (let i = 0; i < totalItems; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.addEventListener('click', () => goToItem(i));
    indicatorsContainer.appendChild(indicator);
  }

  const indicators = document.querySelectorAll('.indicator');

  function updateCarousel() {
    carouselItems.forEach((item, index) => {
      const angle = (index - currentIndex) * angleStep;
      item.style.setProperty('--angle', `${angle}deg`);
      item.style.transform = `rotateY(${angle}deg) translateZ(400px)`;
      item.classList.remove('active', 'leaving', 'entering', 'flip-out', 'flip-in');
    });

    carouselItems[currentIndex].classList.add('active');
    carouselItems[currentIndex].style.transform = `rotateY(0deg) translateZ(500px) scale(1.2) rotateX(5deg)`;

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });

    // Anunciar mudança para leitores de tela
    const activeItem = carouselItems[currentIndex];
    const announcement = activeItem.getAttribute('aria-label');
    carouselContainer.setAttribute('aria-live', 'polite');
    setTimeout(() => carouselContainer.setAttribute('aria-live', 'off'), 1000);
  }

  function updateCarouselNoFlip() {
    carouselItems.forEach((item, index) => {
      const angle = (index - currentIndex) * angleStep;
      item.style.transform = `rotateY(${angle}deg) translateZ(400px)`;
      item.classList.remove('active');
    });

    carouselItems[currentIndex].classList.add('active');
    carouselItems[currentIndex].style.transform = `rotateY(0deg) translateZ(500px) scale(1.2)`;

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });

    // Anunciar mudança para leitores de tela
    const activeItem = carouselItems[currentIndex];
    const announcement = activeItem.getAttribute('aria-label');
    carouselContainer.setAttribute('aria-live', 'polite');
    setTimeout(() => carouselContainer.setAttribute('aria-live', 'off'), 1000);
  }

  // Função para abrir modal de imagem
  function openImageModal(imgSrc) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    modal.style.cursor = 'pointer';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';

    modal.appendChild(img);
    document.body.appendChild(modal);

    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  }

  function goToItem(index) {
    const prevIndex = currentIndex;
    currentIndex = index;

    // Add smooth slide transition classes
    carouselItems[prevIndex].classList.add('slide-out');
    carouselItems[currentIndex].classList.add('slide-in');

    setTimeout(() => {
      updateCarousel();
    }, 500);

    resetAutoRotate();
  }

  function nextItem() {
    const prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % totalItems;

    // Add smooth slide transition classes
    carouselItems[prevIndex].classList.add('slide-out-left');
    carouselItems[currentIndex].classList.add('slide-in-right');

    setTimeout(() => {
      updateCarousel();
    }, 500);

    resetAutoRotate();
  }

  function prevItem() {
    const prevIndex = currentIndex;
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;

    // Add smooth slide transition classes
    carouselItems[prevIndex].classList.add('slide-out-right');
    carouselItems[currentIndex].classList.add('slide-in-left');

    setTimeout(() => {
      updateCarousel();
    }, 500);

    resetAutoRotate();
  }

  function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextItem, 5000);
  }

  function pauseAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  function resumeAutoRotate() {
    autoRotateInterval = setInterval(nextItem, 5000);
  }

  // Event listeners
  prevBtn.addEventListener('click', prevItem);
  nextBtn.addEventListener('click', nextItem);

  // Adicionar event listener para clicar nas imagens do carrossel
  carouselItems.forEach((item) => {
    const img = item.querySelector('img');
    if (img) {
      img.addEventListener('click', () => {
        openImageModal(img.src);
      });
    }
  });

  // Navegação por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevItem();
    } else if (e.key === 'ArrowRight') {
      nextItem();
    }
  });

  // Pausar rotação automática no hover
  carouselContainer.addEventListener('mouseenter', pauseAutoRotate);
  carouselContainer.addEventListener('mouseleave', resumeAutoRotate);

  // Interação com mouse para rotação manual
  let isDragging = false;
  let startX;
  let currentRotation = 0;

  carouselContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    pauseAutoRotate();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const rotation = deltaX * 0.5;
    carouselContainer.style.transform = `rotateY(${currentRotation + rotation}deg)`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    resumeAutoRotate();
  });

  // Inicializar
  updateCarousel();
  resetAutoRotate();
});
