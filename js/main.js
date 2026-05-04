const pageOrder = ['home', 'chars', 'bms'];

/* ── 페이지 전환 ── */
function switchPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  btn.classList.add('active');
  window.scrollTo(0, 0);

  const bg = document.getElementById('bg-layer');
  bg.classList.toggle('visible', id === 'home');
}

/* ── 스와이프 ── */
function getActivePageId() {
  return document.querySelector('.page.active').id.replace('page-', '');
}

function swipeTo(direction) {
  const current = getActivePageId();
  const idx = pageOrder.indexOf(current);
  const nextIdx = direction === 'left' ? idx + 1 : idx - 1;
  if (nextIdx < 0 || nextIdx >= pageOrder.length) return;
  const btn = document.querySelectorAll('.nav-tab')[nextIdx];
  switchPage(pageOrder[nextIdx], btn);
}

let startX = 0;
let startY = 0;

const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

document.addEventListener('pointerdown', e => {
  if (isTouchDevice()) return;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener('pointerup', e => {
  if (isTouchDevice()) return;
  if (document.getElementById('lightbox').classList.contains('open')) return;
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
  swipeTo(dx < 0 ? 'left' : 'right');
});

document.addEventListener('touchstart', e => {
  if (!isTouchDevice()) return;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  if (!isTouchDevice()) return;
  if (document.getElementById('lightbox').classList.contains('open')) return;
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
  swipeTo(dx < 0 ? 'left' : 'right');
}, { passive: true });

/* ── 라이트박스 ── */
let lbImages = [];
let lbIndex  = 0;

function openLb(imgs, ver, name, desc) {
  lbImages = Array.isArray(imgs) ? imgs : [imgs];
  lbIndex  = 0;
  updateLb();

  const descBox   = document.getElementById('lb-desc');
  const descTitle = document.getElementById('lb-desc-title');
  const descText  = document.getElementById('lb-desc-text');

  if (name || desc) {
    descTitle.textContent = (ver ? ver + ' · ' : '') + (name ?? '');
    descText.innerHTML = (desc ?? '').replace(/[\r\n]+/g, '<br>');
    descBox.style.display = 'block';
  } else {
    descBox.style.display = 'none';
  }

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateLb() {
  document.getElementById('lb-img').src = lbImages[lbIndex];
  document.getElementById('lb-counter').textContent =
    lbImages.length > 1 ? `${lbIndex + 1} / ${lbImages.length}` : '';
  document.getElementById('lb-prev').style.display = lbImages.length > 1 ? 'flex' : 'none';
  document.getElementById('lb-next').style.display = lbImages.length > 1 ? 'flex' : 'none';
}

function lbPrev() { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLb(); }
function lbNext() { lbIndex = (lbIndex + 1) % lbImages.length; updateLb(); }

function closeLb() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape')      closeLb();
  if (e.key === 'ArrowLeft')   lbPrev();
  if (e.key === 'ArrowRight')  lbNext();
});

/* ── BMS ── */
async function loadBMS() {
  try {
    const res  = await fetch('./src/data.json');
    const data = await res.json();
    renderBMS(data);
  } catch (e) {
    document.getElementById('bms-tbody').innerHTML =
      `<tr><td colspan="8" class="bms-empty">${i18n[currentLang].bms_error}</td></tr>`;
  }
}

function renderBMS(data) {
  const tbody = document.getElementById('bms-tbody');

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="bms-empty">${i18n[currentLang].bms_empty}</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(song => {
    const md5      = song.md5     ? song.md5.toLowerCase()    : '';
    const sha256   = song.sha256  ? song.sha256.toLowerCase() : '';
    const level    = song.level   ?? '';
    const title    = song.title   ?? '';
    const dl_title = song.dl_title ?? '';
    const total    = song.Total   ?? '';
    const notes    = song['Total Notes'] ?? '';
    const tpn      = (notes && total) ? (parseFloat(total) / parseFloat(notes)).toFixed(2) : '';
    const youtube  = song.youtube ?? '';

    const youtubeBtn = youtube
      ? `<a class="bms-btn play" href="https://youtu.be/${youtube}" target="_blank">📺</a>`
      : `<span class="bms-btn disabled">📺</span>`;

    const scviewBtn = md5
      ? `<a class="bms-btn play" href="https://bms-score-viewer.pages.dev/view?md5=${md5}" target="_blank">📄</a>`
      : `<span class="bms-btn disabled">📄</span>`;

    const mirBtn = sha256
      ? `<a class="bms-btn ir" href="https://www.gaftalk.com/minir/#/viewer/song/${sha256}/0" target="_blank">MinIR</a>`
      : `<span class="bms-btn ir invisible">MinIR</span>`;

    const lr2Btn = md5
      ? `<a class="bms-btn ir" href="http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=${md5}" target="_blank">LR2IR</a>`
      : `<span class="bms-btn ir invisible">LR2IR</span>`;

    const dlBtn = dl_title
      ? `<a class="bms-btn dl" href="https://tsukisa.info/sabun/${dl_title}.zip" target="_blank">DL</a>`
      : `<span class="bms-btn disabled">DL</span>`;

    return `
      <tr>
        <td class="bms-level">🌙${level}</td>
        <td class="bms-title">${title}</td>
        <td class="center"><div class="bms-links">${youtubeBtn}${scviewBtn}</div></td>
        <td class="bms-num center col-total">${total}</td>
        <td class="bms-num center col-notes">${notes}</td>
        <td class="bms-tpn center col-tpn">${tpn}</td>
        <td class="center col-ir"><div class="bms-links">${mirBtn}${lr2Btn}</div></td>
        <td class="center col-dl">${dlBtn}</td>
      </tr>`;
  }).join('');
}

let bmsLoaded = false;
const _origSwitch = switchPage;
switchPage = function(id, btn) {
  _origSwitch(id, btn);
  if (id === 'bms' && !bmsLoaded) {
    bmsLoaded = true;
    loadBMS();
  }
};

/* ── 초기화 ── */
applyLang();

if (document.querySelector('.page.active').id === 'page-home') {
  document.getElementById('bg-layer').classList.add('visible');
}
