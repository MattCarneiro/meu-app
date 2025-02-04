document.addEventListener('DOMContentLoaded', () => {
  const voltarButton = document.getElementById('voltar');
  const avancarButton = document.getElementById('avancar');

  voltarButton.addEventListener('click', () => {
    window.history.back();
  });

  avancarButton.addEventListener('click', () => {
    window.location.href = '/src/importar-leads.html';
  });
});
