// ── STATE ──────────────────────────────────────────
let tasks = JSON.parse(localStorage.getItem('doit_tasks') || '[]');
let filter = 'all';

// ── INIT ───────────────────────────────────────────
document.getElementById('date-label').textContent =
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

document.getElementById('add-btn').addEventListener('click', addTask);

document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filter = btn.dataset.filter;
  render();
});

// ── HELPERS ────────────────────────────────────────
function save() {
  localStorage.setItem('doit_tasks', JSON.stringify(tasks));
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const CAT_EMOJI = {
  Work: '💼', Personal: '🧘', Shopping: '🛒', Health: '💪', Other: '📌'
};

// ── ACTIONS ────────────────────────────────────────
function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  const cat = document.getElementById('cat-select').value;
  tasks.unshift({ id: Date.now(), text, cat, done: false });
  input.value = '';
  save();
  render();
}

function toggleDone(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; save(); render(); }
}

function deleteTask(id) {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  el.classList.add('removing');
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }, 230);
}
function startEdit(id) {
  // Reset any other task currently in editing state
  tasks.forEach(t => t.isEditing = false);
  
  const t = tasks.find(t => t.id === id);
  if (t && !t.done) { // Only allow editing if task is not completed
    t.isEditing = true;
    render();
  }
}

function saveEdit(id) {
  const t = tasks.find(t => t.id === id);
  if (!t || !t.isEditing) return;

  const input = document.getElementById(`edit-${id}`);
  if (input) {
    const newText = input.value.trim();
    if (newText) {
      t.text = newText;
    }
  }
  
  t.isEditing = false;
  save();
  render();
}

function handleEditKey(e, id) {
  if (e.key === 'Enter') {
    saveEdit(id);
  } else if (e.key === 'Escape') {
    const t = tasks.find(t => t.id === id);
    if (t) {
      t.isEditing = false;
      render();
    }
  }
}
// ── RENDER ─────────────────────────────────────────
// ── RENDER ─────────────────────────────────────────
function render() {
  const visible = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done')   return t.done;
    if (CAT_EMOJI[filter])   return t.cat === filter;
    return true;
  });

  // Progress calculations
  const total = tasks.length;
  const done  = tasks.filter(t => t.done).length;
  const pct   = total ? Math.round(done / total * 100) : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-pct').textContent  = pct + '%';
  document.getElementById('progress-label').textContent = `✨ ${done} of ${total} completed`;
  document.getElementById('streak-label').textContent   = `🔥 ${done} done`;

  // Empty state
  document.getElementById('empty-state').classList.toggle('show', visible.length === 0);

  // Tasks
  document.getElementById('task-list').innerHTML = visible.map(t => `
    <div class="task${t.done ? ' done' : ''}" data-id="${t.id}">
      <div class="task-check" onclick="toggleDone(${t.id})">
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4l3 3 6-6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="task-body">
        ${t.isEditing ? `
          <input type="text" class="edit-input" id="edit-${t.id}" value="${esc(t.text)}" 
                 onkeydown="handleEditKey(event, ${t.id})" onblur="saveEdit(${t.id})">
        ` : `
          <div class="task-text" onclick="startEdit(${t.id})" title="Click to edit">${esc(t.text)}</div>
        `}
      </div>
      <span class="cat-badge" data-cat="${t.cat}">${CAT_EMOJI[t.cat]} ${t.cat}</span>
      <button class="del-btn" onclick="deleteTask(${t.id})" title="Delete">🗑️</button>
    </div>
  `).join('');

  // Auto-focus the input field when editing starts
  const editingTask = tasks.find(t => t.isEditing);
  if (editingTask) {
    const input = document.getElementById(`edit-${editingTask.id}`);
    if (input) {
      input.focus();
      input.select(); // Highlights text for quick editing
    }
  }
}
// ── START ──────────────────────────────────────────
render();
