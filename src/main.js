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
    this.notes.push(new Note(title, body));
    // console.log(this.notes);
  },
  selectNote: function (note) {
    this.selectedNote = note;
  }
};

notebook.notes = restoreNotebook();

function restoreNotebook () {
  if (localStorage.notes) {
    return JSON.parse(localStorage.notes);
  }
  return createNotebook();
}

function createNotebook () {
  return [];
}

class Note {
  constructor (title, body) {
    this.id = hash(Math.random().toString());
    this.title = title;
    this.body = body;
    this.createdAt = moment().format('YYYY-MM-DD ddd HH:mm:ss');
    this.deleted = false;
  }
}

init();

function addNote () {
  const header = getHeader();
  const text = getText();
  const date = getTimeNote();

  notebook.addNote(header, text);

  const templateMadeNote = document.querySelector('#template-made-note').content.querySelector('.note-wrapper');
  const element = templateMadeNote.cloneNode(true);
  element.querySelector('.note-header').textContent = header;
  element.querySelector('.note-text').textContent = text;
  element.querySelector('.note-text').attributes[1].value = text;
  element.querySelector('.datetime').attributes[1].value = date;
  element.querySelector('.datetime').textContent = date;

  notesContainer.appendChild(element);
  saveNotes(notebook);
}

function renderNotebook (userNotebook) {
  if (!userNotebook.notes.length) {
    return;
  }
  const templateMadeNote = document.querySelector('#template-made-note').content.querySelector('.note-wrapper');
  for (let i = 0; i < userNotebook.notes.length; i++) {
    const noteElement = templateMadeNote.cloneNode(true);
    noteElement.querySelector('.note-header').textContent = userNotebook.notes[i].title;
    noteElement.querySelector('.note-text').textContent = userNotebook.notes[i].body;
    noteElement.querySelector('.note-text').attributes[1].value = userNotebook.notes[i].body;
    noteElement.querySelector('.datetime').attributes[1].value = userNotebook.notes[i].createdAt;
    noteElement.querySelector('.datetime').textContent = userNotebook.notes[i].createdAt;
    notesContainer.appendChild(noteElement);
  }
}

function saveNotes (userNotebook) {
  localStorage.notes = JSON.stringify(userNotebook.notes);
}

function showMethodsForNote (e) {
  e.currentTarget.querySelector('.menu').style.visibility = 'visible';
}

function hiddenMethodsForNote (e) {
  e.currentTarget.querySelector('.menu').style.visibility = 'hidden';
}

function init () {
  // разобраться с докой момента, относительные даты, формат вывода и тд
  moment.locale('ru');
  createNoteHeader.focus();
  createNoteHeader.value = '';
  createNoteText.value = '';
  renderNotebook(notebook);
  btnCreateNote.addEventListener('click', addNote);
  Array.from(notesContainer.children).forEach(function (note) {
    note.addEventListener('mouseover', showMethodsForNote);
    note.addEventListener('mouseout', hiddenMethodsForNote);
  });
}

function getHeader () {
  return createNoteHeader.value ? createNoteHeader.value : createNoteHeader.placeholder;
}

function getText () {
  return createNoteText.value;
}

function getTimeNote () {
  return moment().format('YYYY-MM-DD ddd HH:mm:ss');
}
