document.addEventListener('DOMContentLoaded', () => {
  const arquivoInput = document.getElementById('arquivo');
  const enviarButton = document.getElementById('enviar');
  const voltarButton = document.getElementById('voltar');

  enviarButton.addEventListener('click', () => {
    const arquivo = arquivoInput.files[0];

    if (!arquivo) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    const tamanhoMaximo = 10 * 1024 * 1024; // 10 MB
    if (arquivo.size > tamanhoMaximo) {
      alert('O arquivo excede o tamanho máximo permitido de 10MB.');
      return;
    }

    const extensaoPermitida = ['csv', 'xlsx', 'xml'];
    const fileName = arquivo.name;
    const extension = fileName.split('.').pop().toLowerCase();
    if (!extensaoPermitida.includes(extension)) {
      alert('Formato de arquivo não permitido. Utilize csv, xlsx ou xml.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const arquivoBase64 = e.target.result.split(',')[1]; // Remove o prefixo data

      const userId = 'user-id'; // Substitua pelo ID real do usuário
      const timestamp = Math.floor(Date.now() / 1000);
      const id2 = `${userId}-${timestamp}`;

      const dataToSend = {
        id: userId,
        id2: id2,
        arquivo: arquivoBase64,
        extension: extension
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
          alert('Arquivo enviado com sucesso.');
          window.location.href = '/src/video-explicativo.html';
        } else {
          alert('Falha ao enviar o arquivo.');
        }
      })
      .catch(() => {
        alert('Erro de conexão com o webhook.');
      });
    };
    reader.onerror = function () {
      alert('Erro ao ler o arquivo.');
    };
    reader.readAsDataURL(arquivo);
  });

  voltarButton.addEventListener('click', () => {
    window.location.href = '/index.html';
  });
});
