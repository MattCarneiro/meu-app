document.addEventListener('DOMContentLoaded', () => {
  const linkInput = document.getElementById('linkInput');
  const linkList = document.getElementById('linkList');
  const charCount = document.getElementById('char-count');
  const importarAgoraButton = document.getElementById('importarAgora');
  const voltarButton = document.getElementById('voltar');
  const links = [];

  linkInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const link = linkInput.value.trim();

      if (link && validateLink(link)) {
        if (links.length >= 20) {
          alert('Você pode adicionar no máximo 20 links.');
          return;
        }

        if (links.includes(link)) {
          alert('Link já foi adicionado.');
          return;
        }

        links.push(link);
        updateLinkList();
        linkInput.value = '';
        updateCharacterCount();
      } else {
        alert('O link deve começar com https:// e ser válido.');
      }
    }
  });

  linkInput.addEventListener('input', updateCharacterCount);

  importarAgoraButton.addEventListener('click', () => {
    if (links.length === 0) {
      alert('Por favor, adicione pelo menos um link.');
      return;
    }

    const userId = 'user-id'; // Substitua pelo ID real do usuário
    const timestamp = Math.floor(Date.now() / 1000);
    const id2 = `${userId}-${timestamp}`;

    const dataToSend = {
      id: userId,
      id2: id2,
      links: links
    };

    const webhookUrl = 'https://n8n-other.neuralbase.com.br/webhook/importar-imoveis';

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (response.ok) {
        alert('Links enviados com sucesso.');
        window.location.href = '/src/video-explicativo.html';
      } else {
        alert('Falha ao enviar os links.');
      }
    })
    .catch(() => {
      alert('Erro de conexão com o webhook.');
    });
  });

  voltarButton.addEventListener('click', () => {
    window.location.href = '/index.html';
  });

  function validateLink(link) {
    return /^https:\/\/.+/.test(link);
  }

  function updateLinkList() {
    linkList.innerHTML = links.map((link, index) => `
      <div class="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
        <span>${link}</span>
        <button class="text-red-500" onclick="removeLink(${index})">&times;</button>
      </div>
    `).join('');
  }

  function removeLink(index) {
    links.splice(index, 1);
    updateLinkList();
  }

  function updateCharacterCount() {
    const maxLength = parseInt(linkInput.getAttribute('maxlength'), 10);
    const currentLength = linkInput.value.length;
    charCount.textContent = maxLength - currentLength;
  }
});
