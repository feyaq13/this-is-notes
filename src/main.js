const createNoteHeader = document.querySelector('.create-note-header');
const btnCreateNote = document.querySelector('.btn-create-note');

init();

function addNote () {

}

function init () {
  createNoteHeader.focus();
  btnCreateNote.addEventListener('click', addNote);
}
