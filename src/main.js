const createNoteHeader = document.querySelector('.create-note-header');
const btnCreateNote = document.querySelector('.btn-create-note');
const createNoteText = document.querySelector('.create-note-text');
const notesContainer = document.querySelector('.notes-container');
const hash = murmurHash3.x86.hash128

const notebook = {
  notes: [],
  selectedNote: null,
  addNote: function(title, body) {
    this.notes.push(new Note(title, body))
    console.log(this.notes)
  },
  selectNote: function(note) {
    this.selectedNote = note
  }
}

class Note {
  constructor(title, body) {
    this.id = hash(Math.random().toString());
    this.title = title;
    this.body = body;
    this.createdAt = moment();
    this.deleted = false
  }
}

init();

function addNote () {
  const header = getHeader();
  const text = getText();
  const date = getTimeNote();

  notebook.addNote(header, text);

  const templateMadeNote = document.querySelector('#template-maked-note').content.querySelector('.note');
  const element = templateMadeNote.cloneNode(true);
  element.querySelector('.note-header').textContent = header;
  element.querySelector('.note-text').textContent = text;
  element.querySelector('.note-text').attributes[1].value = text;
  element.querySelector('.datetime').attributes[1].value = date;
  element.querySelector('.datetime').textContent = date;
  return notesContainer.appendChild(element);
}

function init () {
  // разобраться с докой момента, относительные даты, формат вывода и тд
  moment.locale('ru')
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
  return moment().format('YYYY-MM-DD ddd HH:mm:ss');
}
