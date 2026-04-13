const i18n = {

  ko: {
    nav_title:     '🌙츠키사군으로부터',
    nav_main:      '메인',
    nav_sheets:    '캐릭터시트',

    page_sheets:   '캐릭터 시트',
    profile_name:  '츠키사',
    profile_quote: '츠키사군 귀여워해주세요 :)',
    label_work:    'Work',
    label_game:    'Game',
    label_contact: 'Contect',
    tag_game1:     '리듬게임',
    tag_game2:     '트릭컬:리바이브 (KR/JP)',
    tag_game3:     '명일방주:엔드필드',

    tsu_name:      '츠키사 루나　(츠키사군)',
    tsu_desc:      '언제나 밝고 긍정적인 호기심 많은 늑대 소년',

    ste_name:      '스텔라 마리스　(스텔라군)',
    ste_desc:      '장난을 매우 좋아하는 사고뭉치 롭이어토끼 소년',

    bms_loading:   '로딩 중...',
    bms_error:     '데이터를 불러올 수 없어요 🥲',
    bms_empty:     '데이터가 없어요',
  },

  en: {
    nav_title:     '🌙From Tsukisa',
    nav_main:      'Main',
    nav_sheets:    'Sheets',
    page_sheets:   'Character Sheets',
    profile_name:  'Tsukisa',
    profile_quote: 'Please take care of Tsukisa :)',
    label_work:    'Work',
    label_game:    'Game',
    label_contact: 'Contact',
    tag_game1:     'Rhythm Game',
    tag_game2:     'Trickcal:Chibi GO (KR/JP)',
    tag_game3:     'Arknights:EndField',

    tsu_name:      'Tsukisa Luna',
    tsu_desc:      'Always bright and positive, a curious wolf boy',

    ste_name:      'Stella Maris',
    ste_desc:      'A mischievous troublemaker lop-ear rabbit boy who loves fighting',

    bms_loading:   'Loading...',
    bms_error:     'Failed to load data 🥲',
    bms_empty:     'No data',
  },

  ja: {
    nav_title:     '🌙月作くんでより',

    nav_main:      'メイン',
    nav_sheets:    'シート',
    page_sheets:   'キャラクターシート',
    profile_name:  '月作',
    profile_quote: '月作くんを可愛がってください :)',
    label_work:    'お仕事',
    label_game:    'ゲーム',
    label_contact: '連絡先',
    tag_game1:     '音ゲー',
    tag_game2:     'トリッカル：もちほっぺ (KR/JP)',
    tag_game3:     '明日方舟：エンドフィールド',

    tsu_name:      '月作　ルーナ （月作くん)',
    tsu_desc:      'いつも明るくポジティブな好奇心旺盛な狼少年',

    ste_name:      'ステラ　マーリス （ステラくん)',
    ste_desc:      'いたずら好きなトラブルメーカーのロップイヤーうさぎ少年',

    bms_loading:   '読み込み中...',
    bms_error:     'データを読み込めません 🥲',
    bms_empty:     'データがありません',
  }
};

const langOrder = ['ko', 'en', 'ja'];
const langLabel = { ko: 'KO', en: 'EN', ja: 'JP' };

let currentLang = localStorage.getItem('lang') || detectLang();

function detectLang() {
  const l = navigator.language;
  if (l.startsWith('en')) return 'en';
  if (l.startsWith('ja')) return 'ja';
  return 'ko';
}

function applyLang() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.documentElement.lang = currentLang;
  document.documentElement.classList.remove('lang-en', 'lang-ko', 'lang-ja');
  document.documentElement.classList.add('lang-' + currentLang);

  const langBtn = document.getElementById('lang-text');
  if (langBtn) langBtn.textContent = langLabel[currentLang];
}

function toggleLang() {
  const idx = langOrder.indexOf(currentLang);
  currentLang = langOrder[(idx + 1) % langOrder.length];
  localStorage.setItem('lang', currentLang);
  applyLang();
}
