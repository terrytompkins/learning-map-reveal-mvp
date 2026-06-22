(() => {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo');
  const returnLabel = params.get('returnLabel') || 'Return to previous slide';

  document.querySelectorAll('[data-map-link]').forEach((link) => {
    link.setAttribute('href', '../../index.html');
  });

  document.querySelectorAll('[data-return-link]').forEach((link) => {
    if (!returnTo) {
      link.setAttribute('hidden', 'hidden');
      return;
    }

    link.removeAttribute('hidden');
    link.setAttribute('href', returnTo);
    link.textContent = `← ${returnLabel}`;
  });
})();
