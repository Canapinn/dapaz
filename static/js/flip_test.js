document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const inner = card.querySelector('.card-inner');
      if (inner.style.transform === 'rotateY(180deg)') {
        inner.style.transform = 'rotateY(0deg)';
      } else {
        inner.style.transform = 'rotateY(180deg)';
      }
    });
  });
});
