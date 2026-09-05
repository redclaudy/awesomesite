const bgThemes = ['#008080', '#3a6ea5', '#555555', '#2b4d40'];
let themeIndex = 0;

function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetPanel = document.getElementById(tabId);
  const targetBtn = document.getElementById(`btn-${tabId}`);

  if (targetPanel && targetBtn) {
    targetPanel.classList.add('active');
    targetBtn.classList.add('active');
    document.getElementById('status-text').textContent = targetBtn.textContent;
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

document.querySelectorAll('.menubar .menu-btn[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.target);
  });
});

document.getElementById('btn-toggle-theme').addEventListener('click', () => {
  themeIndex = (themeIndex + 1) % bgThemes.length;
  const color = bgThemes[themeIndex];
  document.body.style.backgroundColor = color;
  document.getElementById('status-text').textContent = `theme: ${color}`;
});

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  document.getElementById('status-clock').textContent = `${hours}:${minutes} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);