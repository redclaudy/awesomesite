const defaultEntries = [
  { name: 'waov²', text: 'this doesn't work btw', date: '9/5/2026' }
];

function getGuestbookEntries() {
  const saved = localStorage.getItem('redclaudy_gb_data');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return defaultEntries;
}

function renderGuestbook() {
  const container = document.getElementById('gb-entries');
  const entries = getGuestbookEntries();
  let html = '';

  entries.forEach(entry => {
    html += `
      <div class="gb-entry">
        <strong>${escapeHtml(entry.name)}</strong> 
        <span style="color:#666; font-size:10px;">(${escapeHtml(entry.date)})</span>:
        <div>${escapeHtml(entry.text)}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

document.getElementById('guestbook-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('gb-name');
  const msgInput = document.getElementById('gb-msg');
  const text = msgInput.value.trim();
  if (!text) return;

  const name = nameInput.value.trim() || 'anon';
  const now = new Date();
  const date = `${now.getMonth() + 1}/${now.getDate()}`;

  const entries = getGuestbookEntries();
  entries.unshift({ name, text, date });

  localStorage.setItem('redclaudy_gb_data', JSON.stringify(entries));

  msgInput.value = '';
  renderGuestbook();
});

renderGuestbook();
