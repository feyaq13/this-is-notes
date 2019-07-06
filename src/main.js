const createNoteHeader = document.querySelector('.create-note-header');
const btnCreateNote = document.querySelector('.btn-create-note');
const createNoteText = document.querySelector('.create-note-text');
const notesContainer = document.querySelector('.notes-container');

init();

function addNote () {
  const header = getHeader();
  const text = getText();
  const date = getTimeNote();

  const templateMakedNote = document.querySelector('#template-maked-note').content.querySelector('.note');
  const element = templateMakedNote.cloneNode(true);
  element.querySelector('.note-header').textContent = header;
  element.querySelector('.note-text').textContent = text;
  element.querySelector('.note-text').attributes[1].value = text;
  element.querySelector('.datetime').attributes[1].value = date;
  element.querySelector('.datetime').textContent = date;
  return notesContainer.appendChild(element);
}

function init () {
  createNoteHeader.focus();
  btnCreateNote.addEventListener('click', addNote);
}

function getHeader () {
  return createNoteHeader.value;
}

function getText () {
  return createNoteText.value;
}

function getTimeNote () {
  let dateCalc = new Date();
  let dateNote = ` ${dateCalc.toDateString()} ${dateCalc.getHours()}:${dateCalc.getMinutes()}:${dateCalc.getSeconds()}`;
  return dateNote;
}
