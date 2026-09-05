function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

const defaultNotes = [
  {
    title: "hi",
    date: "9/5/26",
    body: "I made this :4"
  }
];

function getNotes() {
  const saved = localStorage.getItem('redclaudy_custom_notes');
  if (saved) {
    try {
      return [...JSON.parse(saved), ...defaultNotes];
    } catch (e) {}
  }
  return [...defaultNotes];
}

function renderNotes() {
  const list = document.getElementById('notes-list');
  const notes = getNotes();
  let html = '';

  notes.forEach(note => {
    html += `
      <article class="note-item bevel-outset">
        <div class="note-title">${escapeHtml(note.title)}</div>
        <div class="note-date">${escapeHtml(note.date)}</div>
        <div class="note-body">${escapeHtml(note.body)}</div>
      </article>
    `;
  });

  list.innerHTML = html;
}

document.getElementById('btn-add-note').addEventListener('click', () => {
  const title = prompt('note title:');
  if (!title || !title.trim()) return;

  const body = prompt('note body:');
  if (!body || !body.trim()) return;

  const newNote = {
    title: title.trim(),
    date: 'just now',
    body: body.trim()
  };

  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem('redclaudy_custom_notes') || '[]');
  } catch (e) {}

  saved.unshift(newNote);
  localStorage.setItem('redclaudy_custom_notes', JSON.stringify(saved));
  renderNotes();
});

renderNotes();