document.querySelector('#continuar').addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="importacao"]:checked');
  if (!selectedOption) {
    alert('Por favor, selecione uma opção de importação.');
    return;
  }

  if (selectedOption.value === 'link') {
    window.location.href = '/src/importar-imoveis-link.html';
  } else if (selectedOption.value === 'arquivo') {
    window.location.href = '/src/importar-imoveis-arquivo.html';
  }
});
