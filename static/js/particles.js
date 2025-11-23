// Script para gerar imagens do trabalho caindo realisticamente

document.addEventListener('DOMContentLoaded', function () {
  const particlesContainer = document.getElementById('particles-container');
  const numParticles = 20;

  // Array com as imagens do trabalho
  const workImages = [
    'static/img/bolo7.jpg',
    'static/img/perso.png',
    'static/img/deco.jpg',
    'static/img/kit3.jpg',
    'static/img/kt1.jpg'
  ];

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Criar imagem dentro da partícula
    const img = document.createElement('img');
    img.src = workImages[Math.floor(Math.random() * workImages.length)];
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    img.style.border = '2px solid #D2691E';
    img.style.boxShadow = '0 4px 12px rgba(139, 69, 19, 0.3)';

    particle.appendChild(img);
    particlesContainer.appendChild(particle);
  }
});
