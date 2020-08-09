Array.from(document.querySelectorAll('li.toctree-l1')).forEach((li) => {
  if (li.textContent.includes('()')) {
    li.style.fontFamily = 'monospace';
  }
});