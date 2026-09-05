const win = document.getElementById('main-window');
const handle = document.getElementById('window-drag-handle');

let isDragging = false;
let isMaximized = false;
let offsetX = 0;
let offsetY = 0;

function centerWindow() {
  const x = Math.max(10, (window.innerWidth - win.offsetWidth) / 2);
  const y = Math.max(10, (window.innerHeight - win.offsetHeight) / 2);
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;
  if (isMaximized) toggleMaximize();
}

function toggleMaximize() {
  isMaximized = !isMaximized;
  win.classList.toggle('maximized', isMaximized);
}

handle.addEventListener('mousedown', (e) => {
  if (e.target.closest('.ctrl-btn') || isMaximized) return;
  isDragging = true;
  offsetX = e.clientX - win.offsetLeft;
  offsetY = e.clientY - win.offsetTop;
  document.body.style.cursor = 'move';
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const newX = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, e.clientX - offsetX));
  const newY = Math.max(0, Math.min(window.innerHeight - win.offsetHeight, e.clientY - offsetY));
  win.style.left = `${newX}px`;
  win.style.top = `${newY}px`;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = 'default';
  }
});

handle.addEventListener('touchstart', (e) => {
  if (e.target.closest('.ctrl-btn') || isMaximized) return;
  const t = e.touches[0];
  isDragging = true;
  offsetX = t.clientX - win.offsetLeft;
  offsetY = t.clientY - win.offsetTop;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const t = e.touches[0];
  const newX = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, t.clientX - offsetX));
  const newY = Math.max(0, Math.min(window.innerHeight - win.offsetHeight, t.clientY - offsetY));
  win.style.left = `${newX}px`;
  win.style.top = `${newY}px`;
}, { passive: true });

document.addEventListener('touchend', () => {
  isDragging = false;
});

handle.addEventListener('dblclick', (e) => {
  if (!e.target.closest('.ctrl-btn')) toggleMaximize();
});

document.getElementById('btn-center').addEventListener('click', centerWindow);
document.getElementById('btn-maximize').addEventListener('click', toggleMaximize);
document.getElementById('btn-close').addEventListener('click', () => {
  if (confirm('reset window and reload?')) location.reload();
});

centerWindow();
