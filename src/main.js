moment.locale('ru');
moment.defaultFormat = 'YYYY-MM-DD ddd HH:mm:ss'

const createNoteHeader = document.querySelector('.create-note-header');
const btnCreateNote = document.querySelector('.btn-create-note');
const createNoteText = document.querySelector('.create-note-text');
const simpleBar = new SimpleBar(document.querySelector('.notes-container'));
const notesContainer = simpleBar.getContentElement();
const hash = murmurHash3.x86.hash128;

const notebook = {
  notes: [],
  selectedNote: null,
  addNote: function (title, body) {
    const newNote = new Note(title, body)
    this.notes.push(newNote);

    return newNote;
  },
  selectNote: function (note) {
    this.selectedNote = note;
  }
};

notebook.notes = createOrRestoreNotes();

function createOrRestoreNotes () {
  if (localStorage.notes) {
    const notes = JSON.parse(localStorage.notes)
    notes.forEach(note => {
      note.createdAt = moment.unix(note.createdAt)
    })

    return notes;
  }

  return [];
}

init();

function addNote () {
  const header = getHeader();
  const text = getText();
  const note = notebook.addNote(header, text);
  appendNoteTemplate(note)
  saveNotes(notebook);
  createNoteHeader.value = '';
  createNoteText.value = '';
}

function appendNoteTemplate(note) {
  const templateMadeNote = document.querySelector('#template-made-note').content.querySelector('.note-wrapper');
  const noteElement = templateMadeNote.cloneNode(true);
  noteElement.querySelector('.note-header').textContent = note.title;
  noteElement.querySelector('.note-text').textContent = note.body;
  noteElement.querySelector('.datetime').textContent = note.createdAt.format();
  notesContainer.appendChild(noteElement);
}

function renderNotebook (userNotebook) {
  userNotebook.notes.forEach(appendNoteTemplate);
}

function saveNotes (userNotebook) {
  localStorage.notes = JSON.stringify(userNotebook.notes.map(note => {
    return {
      id: note.id,
      title: note.title,
      body: note.body,
      createdAt: note.createdAt.unix(),
      deleted: note.deleted
    }
  }));
}

function toggleOverlay (e) {
  // разкостылить
  $(e.target).closest('.row').children('.menu').toggleClass('menu-visible')
}

function init () {
  // разобраться с докой момента, относительные даты, формат вывода и тд
  renderNotebook(notebook);
  btnCreateNote.addEventListener('click', addNote);
  notesContainer.addEventListener('mouseover', toggleOverlay);
  notesContainer.addEventListener('mouseout', toggleOverlay);
}

function getHeader () {
  return createNoteHeader.value ? createNoteHeader.value : createNoteHeader.placeholder;
}

function getText () {
  return createNoteText.value;
}

class Note {
  constructor (title, body) {
    this.id = hash(Math.random().toString());
    this.title = title;
    this.body = body;
    this.createdAt = moment();
    this.deleted = false;
  }
}
