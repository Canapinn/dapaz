document.addEventListener('DOMContentLoaded', () => {
  // Define today's date for the delivery date min attribute
  const deliveryInput = document.getElementById('deliveryDate');
  if (deliveryInput) {
    const today = new Date().toISOString().split('T')[0];
    deliveryInput.setAttribute('min', today);
  }
});

function handleFormSubmit(e) {
  e.preventDefault();

  // Coletar os valores do formulário
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const deliveryDate = document.getElementById('deliveryDate').value;
  const flavor = document.getElementById('cakeFlavor').value;
  const weight = document.getElementById('cakeWeight').value;
  const theme = document.getElementById('cakeTheme').value.trim();
  const custom = document.getElementById('customDetails').value.trim();
  const notes = document.getElementById('additionalNotes').value.trim();

  // Mostrar a página de resumo e preencher os campos
  document.getElementById('container').style.display = 'none';
  document.getElementById('summaryPage').style.display = 'block';

  // Preencher o resumo
  document.getElementById('sumName').textContent = name;
  document.getElementById('sumPhone').textContent = phone;
  // Formatar data para formato dd/mm/aaaa
  const dateFormatted = new Date(deliveryDate).toLocaleDateString('pt-BR');
  document.getElementById('sumDate').textContent = dateFormatted;
  document.getElementById('sumFlavor').textContent = flavor;
  document.getElementById('sumWeight').textContent = weight + " kg";
  document.getElementById('sumTheme').textContent = theme;
  document.getElementById('sumCustom').textContent = custom ? custom : "(Nenhum)";
  document.getElementById('sumNotes').textContent = notes ? notes : "(Nenhuma)";

  // Preparar texto para WhatsApp
  window.whatsappMessage = 
    `*Pedido de Bolo*%0A` +
    `*Nome:* ${name}%0A` +
    `*Telefone:* ${phone}%0A` +
    `*Data da Entrega:* ${dateFormatted}%0A` +
    `*Sabor do Bolo:* ${flavor}%0A` +
    `*Quilo do Bolo:* ${weight} kg%0A` +
    `*Tema do Bolo:* ${theme}%0A` +
    `*Personalizados:* ${custom ? custom : "(Nenhum)"}%0A` +
    `*Observações Adicionais:* ${notes ? notes : "(Nenhuma)"}`;
    
  return false;
}

document.getElementById('sendWhatsAppBtn').addEventListener('click', () => {
  const whatsappNumber = '5511951799052'; // Seu número no formato internacional (55 + DDD + número)
  const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${window.whatsappMessage}`;
  window.open(url, '_blank');
});


// Script para o slideshow principal (manual)
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-container .slide');

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].classList.add('active');
  setTimeout(showSlides, 4000); // Muda de imagem a cada 4 segundos
}

// Inicia o slideshow quando a página carrega
document.addEventListener('DOMContentLoaded', showSlides);