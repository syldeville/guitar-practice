(() => {
  'use strict';

  const KEY = 'fretlog:v1';
  const LEVELS = window.LEVELS || [];
  const $view = document.getElementById('view');
  const $title = document.getElementById('title');
  const $back = document.getElementById('back');
  const $sheet = document.getElementById('sheet');

  // ---------- state ----------
  const blank = () => ({ version: 1, checks: {}, songs: {}, custom: {}, days: {}, lastBackup: null });
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(blank(), JSON.parse(raw));
    } catch (e) { /* storage unavailable or corrupt */ }
    return blank();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { toast('Could not save — storage unavailable'); }
  }
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

  // ---------- helpers ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayKey = () => dayKey(new Date());
  const uid = () => Math.random().toString(36).slice(2, 10);
  const safeUrl = (u) => /^https?:\/\//i.test(u) ? u : '';

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function custom(levelId) {
    if (!state.custom[levelId]) state.custom[levelId] = { songs: [], videos: [] };
    return state.custom[levelId];
  }
  function levelSongs(l) { return [...(l.songs || []), ...custom(l.id).songs.map((s) => ({ ...s, mine: true }))]; }
  function levelVideos(l) { return [...(l.videos || []), ...custom(l.id).videos.map((v) => ({ ...v, mine: true }))]; }
  function levelProgress(l) {
    const total = l.items.length;
    const done = l.items.filter((i) => state.checks[i.id]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  // ---------- routing ----------
  let tab = 'levels';
  let route = { name: 'levels' };

  document.querySelectorAll('.tabbar button').forEach((b) => {
    b.addEventListener('click', () => {
      tab = b.dataset.tab;
      route = { name: tab };
      render();
      window.scrollTo(0, 0);
    });
  });
  $back.addEventListener('click', () => { route = { name: 'levels' }; render(); });

  function render() {
    document.querySelectorAll('.tabbar button').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
    $back.hidden = route.name !== 'level';
    if (route.name === 'levels') renderLevels();
    else if (route.name === 'level') renderLevel(route.id);
    else if (route.name === 'calendar') renderCalendar();
    else if (route.name === 'settings') renderSettings();
  }

  // ---------- levels list ----------
  function renderLevels() {
    $title.textContent = 'Levels';
    if (!LEVELS.length) {
      $view.innerHTML = `<div class="card notice"><b>No levels loaded yet.</b><p class="muted small">The level list from your PDF goes in <code>levels.js</code>.</p></div>`;
      return;
    }
    const allItems = LEVELS.flatMap((l) => l.items);
    const ticked = allItems.filter((i) => state.checks[i.id]).length;
    const songsDone = Object.values(state.songs).filter(Boolean).length;
    const levelsDone = LEVELS.filter((l) => { const p = levelProgress(l); return p.total && p.done === p.total; }).length;

    $view.innerHTML = `
      <div class="summary">
        <div class="stat"><b>${ticked}<small class="muted">/${allItems.length}</small></b><span>Skills</span></div>
        <div class="stat"><b>${levelsDone}</b><span>Levels done</span></div>
        <div class="stat"><b>${songsDone}</b><span>Songs</span></div>
      </div>
      <div class="stack">
        ${LEVELS.map((l, idx) => {
          const p = levelProgress(l);
          return `<button class="level-card" data-level="${esc(l.id)}">
            <div class="level-head">
              <span class="level-num">${idx + 1}</span>
              <span class="level-name">${esc(l.name)}</span>
              <span class="level-count">${p.done}/${p.total}</span>
            </div>
            <div class="bar ${p.total && p.done === p.total ? 'done' : ''}"><i style="width:${p.pct}%"></i></div>
          </button>`;
        }).join('')}
      </div>`;
    $view.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => {
      route = { name: 'level', id: b.dataset.level };
      render();
      window.scrollTo(0, 0);
    }));
  }

  // ---------- level detail ----------
  function renderLevel(id) {
    const idx = LEVELS.findIndex((l) => l.id === id);
    const l = LEVELS[idx];
    if (!l) { route = { name: 'levels' }; return render(); }
    $title.textContent = `${idx + 1}. ${l.name}`;
    const p = levelProgress(l);
    const songs = levelSongs(l);
    const videos = levelVideos(l);

    $view.innerHTML = `
      ${l.summary ? `<p class="muted" style="margin:0 4px 10px">${esc(l.summary)}</p>` : ''}
      <div class="bar ${p.total && p.done === p.total ? 'done' : ''}" style="margin:0 4px"><i style="width:${p.pct}%"></i></div>
      <p class="small muted" style="margin:6px 4px 0">${p.done} of ${p.total} confident</p>

      <h2>I'm confident with</h2>
      <div class="list">
        ${l.items.map((i) => `
          <label class="row ${state.checks[i.id] ? 'is-done' : ''}">
            <input type="checkbox" class="check" data-check="${esc(i.id)}" ${state.checks[i.id] ? 'checked' : ''}>
            <div class="grow"><div>${esc(i.text)}</div>${i.note ? `<div class="sub">${esc(i.note)}</div>` : ''}</div>
          </label>`).join('')}
      </div>

      <h2>Songs to learn</h2>
      <div class="list">
        ${songs.length ? songs.map((s) => `
          <div class="row ${state.songs[s.id] ? 'is-done' : ''}">
            <input type="checkbox" class="check" data-song="${esc(s.id)}" ${state.songs[s.id] ? 'checked' : ''} aria-label="I can play ${esc(s.title)}">
            ${safeUrl(s.url) ? `<a class="grow" href="${esc(s.url)}" target="_blank" rel="noopener">` : '<div class="grow">'}
              <div>${esc(s.title)}</div>
              <div class="sub">${esc([s.artist, s.why].filter(Boolean).join(' · '))}</div>
            ${safeUrl(s.url) ? '</a>' : '</div>'}
            ${s.mine ? `<button class="del" data-del-song="${esc(s.id)}" aria-label="Remove">×</button>` : ''}
          </div>`).join('') : '<div class="empty">No songs yet.</div>'}
      </div>
      <button class="btn ghost" data-add="song">+ Add a song</button>

      <h2>Lessons</h2>
      <div class="list">
        ${videos.length ? videos.map((v) => `
          <div class="row">
            <span class="yt" aria-hidden="true"></span>
            <a class="grow" href="${esc(safeUrl(v.url))}" target="_blank" rel="noopener">
              <div>${esc(v.title)}</div>
              ${v.channel ? `<div class="sub">${esc(v.channel)}</div>` : ''}
            </a>
            ${v.mine ? `<button class="del" data-del-video="${esc(v.id)}" aria-label="Remove">×</button>` : ''}
          </div>`).join('') : '<div class="empty">No lessons yet.</div>'}
      </div>
      <button class="btn ghost" data-add="video">+ Add a YouTube link</button>
    `;

    $view.querySelectorAll('[data-check]').forEach((c) => c.addEventListener('change', () => {
      state.checks[c.dataset.check] = c.checked;
      if (!c.checked) delete state.checks[c.dataset.check];
      save();
      const before = p.done === p.total;
      render();
      const after = levelProgress(l);
      if (!before && after.total && after.done === after.total) toast(`Level ${idx + 1} complete 🎸`);
    }));
    $view.querySelectorAll('[data-song]').forEach((c) => c.addEventListener('change', () => {
      if (c.checked) state.songs[c.dataset.song] = true; else delete state.songs[c.dataset.song];
      save(); render();
    }));
    $view.querySelectorAll('[data-del-song]').forEach((b) => b.addEventListener('click', () => {
      const c = custom(l.id); c.songs = c.songs.filter((s) => s.id !== b.dataset.delSong);
      delete state.songs[b.dataset.delSong]; save(); render();
    }));
    $view.querySelectorAll('[data-del-video]').forEach((b) => b.addEventListener('click', () => {
      const c = custom(l.id); c.videos = c.videos.filter((v) => v.id !== b.dataset.delVideo);
      save(); render();
    }));
    $view.querySelector('[data-add="song"]').addEventListener('click', () => openAdd(l, 'song'));
    $view.querySelector('[data-add="video"]').addEventListener('click', () => openAdd(l, 'video'));
  }

  function openAdd(level, kind) {
    const isSong = kind === 'song';
    $sheet.innerHTML = `
      <form class="sheet" method="dialog">
        <h3>${isSong ? 'Add a song' : 'Add a YouTube lesson'}</h3>
        <label class="field"><span>${isSong ? 'Song title' : 'Title'}</span><input name="title" required autocomplete="off"></label>
        ${isSong ? '<label class="field"><span>Artist</span><input name="artist" autocomplete="off"></label>' : ''}
        <label class="field"><span>${isSong ? 'Link (optional)' : 'YouTube link'}</span><input name="url" type="url" inputmode="url" placeholder="https://" ${isSong ? '' : 'required'} autocomplete="off"></label>
        <div class="actions">
          <button class="btn" value="cancel" formnovalidate>Cancel</button>
          <button class="btn primary" value="ok">Add</button>
        </div>
      </form>`;
    const form = $sheet.querySelector('form');
    form.addEventListener('submit', (e) => {
      if (e.submitter && e.submitter.value === 'cancel') return;
      const f = new FormData(form);
      const url = String(f.get('url') || '').trim();
      if (url && !safeUrl(url)) { e.preventDefault(); toast('Link must start with http'); return; }
      const entry = { id: 'u-' + uid(), title: String(f.get('title')).trim(), url };
      if (isSong) { entry.artist = String(f.get('artist') || '').trim(); custom(level.id).songs.push(entry); }
      else custom(level.id).videos.push(entry);
      save(); render();
    });
    $sheet.showModal();
    setTimeout(() => form.querySelector('input').focus(), 50);
  }
  $sheet.addEventListener('click', (e) => { if (e.target === $sheet) $sheet.close(); });

  // ---------- calendar ----------
  let calMonth = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })();

  function streaks() {
    const days = new Set(Object.keys(state.days).filter((k) => state.days[k]));
    // current streak: count back from today (or yesterday, if today not logged yet)
    let cur = 0;
    const d = new Date();
    if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
    while (days.has(dayKey(d))) { cur++; d.setDate(d.getDate() - 1); }
    // longest streak
    let best = 0, run = 0, prev = null;
    [...days].sort().forEach((k) => {
      const t = new Date(k + 'T12:00:00');
      if (prev && Math.round((t - prev) / 86400000) === 1) run++; else run = 1;
      best = Math.max(best, run); prev = t;
    });
    return { cur, best, total: days.size };
  }

  function renderCalendar() {
    $title.textContent = 'Practice';
    const tk = todayKey();
    const did = !!state.days[tk];
    const s = streaks();
    const y = calMonth.getFullYear(), m = calMonth.getMonth();
    const monthName = calMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const first = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first
    const nDays = new Date(y, m + 1, 0).getDate();
    const inMonth = Object.keys(state.days).filter((k) => state.days[k] && k.startsWith(`${y}-${pad(m + 1)}`)).length;
    const now = new Date();
    const isCurrentMonth = y === now.getFullYear() && m === now.getMonth();

    // last 26 weeks strip
    const strip = [];
    const start = new Date(); start.setDate(start.getDate() - 175 - ((start.getDay() + 6) % 7)); // Monday, 26 weeks back
    const span = Math.round((new Date() - start) / 86400000) + 1;
    for (let i = 0; i < span; i++) { const d = new Date(start); d.setDate(start.getDate() + i); strip.push(state.days[dayKey(d)] ? 'on' : ''); }

    $view.innerHTML = `
      <button class="btn primary today-btn ${did ? 'done' : ''}" id="logToday">${did ? '✓ Practiced today' : 'I practiced today'}</button>

      <div class="summary" style="margin-top:14px">
        <div class="stat"><b>${s.cur}</b><span>Day streak</span></div>
        <div class="stat"><b>${s.best}</b><span>Best streak</span></div>
        <div class="stat"><b>${s.total}</b><span>Total days</span></div>
      </div>

      <div class="cal-head">
        <button id="prev" aria-label="Previous month">‹</button>
        <div style="text-align:center"><b>${esc(monthName)}</b><div class="small muted">${inMonth} day${inMonth === 1 ? '' : 's'} practiced</div></div>
        <button id="next" aria-label="Next month" ${isCurrentMonth ? 'disabled style="opacity:.3"' : ''}>›</button>
      </div>
      <div class="cal">
        ${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<div class="dow">${d}</div>`).join('')}
        ${'<div class="pad"></div>'.repeat(first)}
        ${Array.from({ length: nDays }, (_, i) => {
          const k = `${y}-${pad(m + 1)}-${pad(i + 1)}`;
          const future = k > tk;
          return `<button class="d ${state.days[k] ? 'on' : ''} ${k === tk ? 'today' : ''} ${future ? 'future' : ''}" data-day="${k}" ${future ? 'disabled' : ''}>${i + 1}</button>`;
        }).join('')}
      </div>
      <p class="small muted" style="text-align:center">Tap a past day to add or remove it.</p>

      <h2>Last 6 months</h2>
      <div class="card"><div class="year">${strip.map((c) => `<i class="${c}"></i>`).join('')}</div></div>
    `;

    document.getElementById('logToday').addEventListener('click', () => {
      if (state.days[tk]) delete state.days[tk]; else { state.days[tk] = true; toast('Nice work — logged 🎸'); }
      save(); render();
    });
    document.getElementById('prev').addEventListener('click', () => { calMonth = new Date(y, m - 1, 1); render(); });
    document.getElementById('next').addEventListener('click', () => { if (!isCurrentMonth) { calMonth = new Date(y, m + 1, 1); render(); } });
    $view.querySelectorAll('[data-day]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.day;
      if (state.days[k]) delete state.days[k]; else state.days[k] = true;
      save(); render();
    }));
  }

  // ---------- backup ----------
  function renderSettings() {
    $title.textContent = 'Backup';
    const last = state.lastBackup ? new Date(state.lastBackup).toLocaleDateString() : 'never';
    $view.innerHTML = `
      <div class="card stack">
        <div><b>Your data lives on this phone.</b>
        <p class="muted small" style="margin:4px 0 0">If you delete the Home Screen app or clear Safari data, it's gone. Save a backup now and then, for example to Files or iCloud Drive.</p></div>
        <p class="small" style="margin:0">Last backup: <b>${esc(last)}</b></p>
        <button class="btn primary" id="export">Save backup</button>
        <label class="btn" style="cursor:pointer">Restore from backup<input type="file" id="import" accept="application/json,.json" hidden></label>
      </div>
      <h2>About</h2>
      <div class="card small muted">Fretlog · ${LEVELS.length} levels. Add it to your Home Screen from Safari: Share → Add to Home Screen.</div>
      <button class="btn danger" id="reset" style="margin-top:20px">Erase all data</button>
    `;
    document.getElementById('export').addEventListener('click', exportData);
    document.getElementById('import').addEventListener('change', importData);
    document.getElementById('reset').addEventListener('click', () => {
      if (confirm('Erase all ticks, songs and practice days? This cannot be undone.')) { state = blank(); save(); render(); toast('Erased'); }
    });
  }

  async function exportData() {
    state.lastBackup = new Date().toISOString();
    const json = JSON.stringify(state, null, 2);
    const name = `fretlog-backup-${todayKey()}.json`;
    const file = new File([json], name, { type: 'application/json' });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Fretlog backup' });
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file); a.download = name;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      save(); render(); toast('Backup saved');
    } catch (e) {
      if (e && e.name !== 'AbortError') toast('Backup failed');
      state = load();
    }
  }

  function importData(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!data || typeof data !== 'object' || !('days' in data) || !('checks' in data)) throw new Error('bad');
        if (!confirm('Replace everything on this phone with this backup?')) return;
        state = Object.assign(blank(), data); save(); render(); toast('Backup restored');
      } catch (err) { toast("That file isn't a Fretlog backup"); }
    };
    r.readAsText(f);
  }

  // ---------- boot ----------
  render();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
