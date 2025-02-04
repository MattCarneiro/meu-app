document.querySelector('#continuar').addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="importacao"]:checked');
  if (!selectedOption) {
    alert('Por favor, selecione uma opção de importação.');
    return;
  }

  if (selectedOption.value === 'link') {
    window.location.href = '/src/importar-imoveis-link.html';
  } else if (selectedOption.value === 'arquivo') {
    // Redirecionar para a página de importação via arquivo (a ser implementada)
    alert('Funcionalidade de importação via arquivo ainda não implementada.');
  }
});
