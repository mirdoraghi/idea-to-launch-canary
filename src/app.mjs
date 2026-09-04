import { clearNote, loadNote, saveNote } from './daily-marker.mjs';

const form = document.querySelector('#marker-form');
const input = document.querySelector('#note');
const error = document.querySelector('#error');
const saved = document.querySelector('#saved');
const clear = document.querySelector('#clear');

function render() {
  const note = loadNote(localStorage);
  saved.textContent = note;
  saved.hidden = !note;
  clear.hidden = !note;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = saveNote(localStorage, input.value);
  if (!result.ok) { error.textContent = result.message; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
  error.textContent = ''; input.removeAttribute('aria-invalid'); input.value = ''; render();
});
clear.addEventListener('click', () => { clearNote(localStorage); render(); input.focus(); });
render();
