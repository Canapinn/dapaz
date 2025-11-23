console.log("Este é um teste do Live Reload."); // Adicione esta linha
(function() {
  let modal;
  let modalTitulo;
  let modalImagem;
  let modalDescricao;
  let modalSabores;
  let modalPreco;
  let modalCloseBtn;
  let swiperBolos;

  document.addEventListener("DOMContentLoaded", () => {

    // Código do formulário de contato (execute apenas na página de contato)
    const cakeOrderForm = document.getElementById('cakeOrderForm');
    if (cakeOrderForm) {
      // Define today's date for the delivery date min attribute
      const deliveryInput = document.getElementById('deliveryDate');
      if (deliveryInput) {
        const today = new Date().toISOString().split('T')[0];
        deliveryInput.setAttribute('min', today);
      }
      // Adiciona o event listener ao formulário
      cakeOrderForm.addEventListener('submit', handleFormSubmit);
      // Adiciona o event listener ao botão de WhatsApp
      const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
      if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', () => {
          handleWhatsAppButtonClick();
        });
      }

      function handleFormSubmit(e) {
        e.preventDefault();
        // Coletar os valores do formulário
        const nameInput = document.getElementById('customerName');
        const phoneInput = document.getElementById('customerPhone');
        const deliveryDateInput = document.getElementById('deliveryDate');
        const flavorSelect = document.getElementById('cakeFlavor');
        const weightInput = document.getElementById('cakeWeight');
        const themeInput = document.getElementById('cakeTheme');
        const customInput = document.getElementById('customDetails');
        const notesInput = document.getElementById('additionalNotes');
        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const deliveryDate = deliveryDateInput ? deliveryDateInput.value : '';
        const flavor = flavorSelect ? flavorSelect.value : '';
        const weight = weightInput ? weightInput.value : '';
        const theme = themeInput ? themeInput.value.trim() : '';
        const custom = customInput ? customInput.value.trim() : '';
        const notes = notesInput ? notesInput.value.trim() : '';

        // Mostrar a página de resumo e preencher os campos
        const container = document.getElementById('container');
        const summaryPage = document.getElementById('summaryPage');
        if (container) container.style.display = 'none';
        if (summaryPage) summaryPage.style.display = 'block';
        // Preencher o resumo
        const sumName = document.getElementById('sumName');
        const sumPhone = document.getElementById('sumPhone');
        const sumDate = document.getElementById('sumDate');
        const sumFlavor = document.getElementById('sumFlavor');
        const sumWeight = document.getElementById('sumWeight');
        const sumTheme = document.getElementById('sumTheme');
        const sumCustom = document.getElementById('sumCustom');
        const sumNotes = document.getElementById('sumNotes');
        if (sumName) sumName.textContent = name;
        if (sumPhone) sumPhone.textContent = phone;

        // Formatar data para formato dd/mm/aaaa
        let dateFormatted = '';
        if (deliveryDate) {
          const dateObject = new Date(deliveryDate);
          dateFormatted = dateObject.toLocaleDateString('pt-BR');
        }
        if (sumDate) sumDate.textContent = dateFormatted;
        if (sumFlavor) sumFlavor.textContent = flavor;
        if (sumWeight) sumWeight.textContent = weight + " kg";
        if (sumTheme) sumTheme.textContent = theme;
        if (sumCustom) sumCustom.textContent = custom ? custom : "(Nenhum)";
        if (sumNotes) sumNotes.textContent = notes ? notes : "(Nenhuma)";
      }

      function sendWhatsAppMessage(message) {
        const whatsappNumber = '5511951799052'; // Seu número no formato internacional (55 + DDD + número)
        const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
        window.open(url, '_blank');
      }

      function handleWhatsAppButtonClick() {
        // Coletar os valores do formulário
        const nameInput = document.getElementById('customerName');
        const phoneInput = document.getElementById('customerPhone');
        const deliveryDateInput = document.getElementById('deliveryDate');
        const flavorSelect = document.getElementById('cakeFlavor');
        const weightInput = document.getElementById('cakeWeight');
        const themeInput = document.getElementById('cakeTheme');
        const customInput = document.getElementById('customDetails');
        const notesInput = document.getElementById('additionalNotes');
        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const deliveryDate = deliveryDateInput ? deliveryDateInput.value : '';
        const flavor = flavorSelect ? flavorSelect.value : '';
        const weight = weightInput ? weightInput.value : '';
        const theme = themeInput ? themeInput.value.trim() : '';
        const custom = customInput ? customInput.value.trim() : '';
        const notes = notesInput ? notesInput.value.trim() : '';

        // Formatar data para formato dd/mm/aaaa
        let dateFormatted = '';
        if (deliveryDate) {
          const dateObject = new Date(deliveryDate);
          dateFormatted = dateObject.toLocaleDateString('pt-BR');
        }
        // Preparar texto para WhatsApp
        const whatsappMessage = `*Pedido de Bolo*%0A` +
          `*Nome:* ${name}%0A` +
          `*Telefone:* ${phone}%0A` +
          `*Data da Entrega:* ${dateFormatted}%0A` +
          `*Sabor do Bolo:* ${flavor}%0A` +
          `*Quilo do Bolo:* ${weight} kg%0A` +
          `*Tema do Bolo:* ${theme}%0A` +
          `*Personalizados:* ${custom ? custom : "(Nenhum)"}%0A` +
          `*Observações Adicionais:* ${notes ? notes : "(Nenhuma)"}`;

        sendWhatsAppMessage(whatsappMessage);
      }
    }

    // Modal elements
    modal = document.getElementById('bolo-modal');
    if (modal) {
      modalTitulo = document.getElementById('modal-titulo');
      modalImagem = document.getElementById('modal-imagem');
      modalDescricao = document.getElementById('modal-descricao');
      modalSabores = document.getElementById('modal-sabores');
      modalPreco = document.getElementById('modal-preco');
      modalCloseBtn = modal.querySelector('.modal-close');

      // Fechar modal ao clicar no botão X
      modalCloseBtn.addEventListener('click', closeModal);

      // Fechar modal ao clicar fora do conteúdo
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // Fechar modal com tecla ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
          closeModal();
        }
      });
    }

    function openModal(button) {
      const titulo = button.dataset.titulo;
      const imagemSrc = button.dataset.imagem;
      const descricao = button.dataset.descricao;
      const saboresStr = button.dataset.sabores;
      const preco = button.dataset.preco;

      modalTitulo.textContent = titulo;
      modalImagem.src = imagemSrc;
      modalImagem.alt = `Imagem do bolo ${titulo}`;
      modalDescricao.textContent = descricao;
      modalPreco.textContent = preco;

      // Limpa sabores anteriores
      modalSabores.innerHTML = '';
      // Insere sabores como lista
      if (saboresStr) {
        saboresStr.split(',').forEach(sabor => {
          const li = document.createElement('li');
          li.textContent = sabor.trim();
          modalSabores.appendChild(li);
        });
      }

      modal.removeAttribute('hidden'); // Remove o atributo hidden
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      modal.focus();

      // Marcar botão com aria-expanded true
      button.setAttribute('aria-expanded', 'true');

      // Para controle do botão que abriu o modal
      modal.dataset.openedBy = button.id || '';
    }

    function closeModal() {
      const openedById = modal.dataset.openedBy;
      if (openedById) {
        const button = document.getElementById(openedById);
        if (button) {
          button.setAttribute('aria-expanded', 'false');
          button.focus();
        }
        modal.removeAttribute('data-opened-by');
      }
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('hidden', 'true'); // Adiciona o atributo hidden
    }

    // Abrir modal com dados das propriedades do botão ver-mais
    document.querySelectorAll('.ver-mais-btn').forEach((btn, idx) => {
      btn.id = btn.id || `verMais-btn-${idx}`;
      btn.addEventListener('click', e => {
        openModal(e.currentTarget);
      });
    });

    const categorias = document.querySelectorAll('.categoria-btn');
    const bolos = document.querySelectorAll('.bolo-card');

    // Função para filtrar bolos por categoria
    categorias.forEach(botao => {
      botao.addEventListener('click', () => {
        if (botao.classList.contains('active')) return;

        categorias.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        botao.classList.add('active');
        botao.setAttribute('aria-pressed', 'true');

        const categoria = botao.dataset.categoria;

        bolos.forEach(bolo => {
          if (categoria === 'todos' || bolo.dataset.categoria === categoria) {
            bolo.style.display = 'flex';
            bolo.setAttribute('aria-hidden', 'false');
            bolo.removeAttribute('tabindex');
          } else {
            bolo.style.display = 'none';
            bolo.setAttribute('aria-hidden', 'true');
            bolo.setAttribute('tabindex', '-1');
          }
        });
      });
    });

    // Inicialização do Swiper para bolos.html
    const swiperBolosElement = document.querySelector('.swiper-bolos');
    if (swiperBolosElement) {
      swiperBolos = new Swiper('.swiper-bolos', {
        // Seus parâmetros do Swiper para o bolos.html aqui
        loop: true,
        effect: 'slide', // Altere o efeito se desejar
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        autoplay: true, // Adicione esta linha
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  });
})();