import { initI18n, getCurrentLanguage, t } from './i18n.js';

const state = {
  mainLabel: '42',
  theme: 'light',
  language: getCurrentLanguage(),
  pitchValue: '19mm',
  pitchAbbr: 'KP',
  mainImageUrl: '',
  customIconMap: {},
  selectedIcons: [],
  notSupportedIcons: new Set(),
  moduleIcons: new Set(),
  footerText: '',
  footerIsCustom: false,
  batteryText: 'AAA',
  freeformIcons: [], // { id, type: 'image'|'text', data, abbr }
  freeformIdCounter: 0,
  rowCount: 1, // 1 or 2 rows for icon layout
};

const paletteButtons = Array.from(document.querySelectorAll('button[data-icon-id]'));
const palette = [
  // 1. 形状 (Shape)
  {
    id: 'shape-split',
    category: 'shape',
    label: 'Split',
    abbr: 'SP',
    description_ja: '左右ユニットが分離し肩幅に合わせられるため、手首負担を減らしやすい。',
    description_en: 'Left and right units are separated, allowing adjustment to shoulder width to reduce wrist strain.',
  },
  {
    id: 'shape-unibody',
    category: 'shape',
    label: 'Unibody',
    abbr: 'UB',
    description_ja: '一枚板の筐体で取り回しが良く、剛性や打鍵音を安定させやすい。',
    description_en: 'Single-piece case for easy handling, stable rigidity and typing sound.',
  },
  {
    id: 'shape-macropad',
    category: 'shape',
    label: 'MacroPad',
    abbr: 'MP',
    description_ja: 'テンキー/ファンクションなど補助用途に特化した小型キーボード。',
    description_en: 'Small keyboard specialized for auxiliary purposes like numpad/function keys.',
  },

  // 2. スタッガード (Stagger)
  {
    id: 'stagger-row',
    category: 'layout',
    label: 'Row-staggered',
    abbr: 'RS',
    description_ja: '横方向に段差をつけた一般的配列。通常キーボードから移行しやすい。',
    description_en: 'Common layout with horizontal offset. Easy transition from standard keyboards.',
  },
  {
    id: 'stagger-column',
    category: 'layout',
    label: 'Column-staggered',
    abbr: 'CS',
    description_ja: '縦方向に段差をつけ指の長さに合わせた配列で、移動量を減らしやすい。',
    description_en: 'Vertical offset matching finger lengths, reducing finger travel distance.',
  },

  // 3. 配列 (Layout)
  {
    id: 'layout-or',
    category: 'layout',
    label: 'Ortholinear',
    abbr: 'OR',
    description_ja: 'キーが格子状に縦横まっすぐ並ぶ配列。',
    description_en: 'Keys arranged in a straight grid pattern both vertically and horizontally.',
  },
  {
    id: 'layout-alice',
    category: 'layout',
    label: 'Alice / Arisu',
    abbr: 'AL',
    description_ja: '一体型で中央が開いたハの字配列。自然な手首角度を取りやすい。',
    description_en: 'Unified layout with open center in V-shape. Easier to maintain natural wrist angle.',
  },
  {
    id: 'layout-grin',
    category: 'layout',
    label: 'GRIN',
    abbr: 'GR',
    description_ja: 'エルゴ性を重視した独自特殊配列。',
    description_en: 'Unique special layout focusing on ergonomics.',
  },

  // 4. 接続 (Connect)
  {
    id: 'connect-wr',
    category: 'connect',
    label: 'Wired',
    abbr: 'WR',
    description_ja: 'USBなど有線で接続し、電源・通信が安定。',
    description_en: 'Wired connection via USB etc., providing stable power and communication.',
  },
  {
    id: 'connect-wl',
    category: 'connect',
    label: 'Wireless',
    abbr: 'WL',
    description_ja: 'Bluetooth/2.4GHzなど完全無線。ケーブルレス運用。',
    description_en: 'Fully wireless via Bluetooth/2.4GHz. Cable-free operation.',
  },
  {
    id: 'connect-halfwired',
    category: 'connect',
    label: 'HalfWired',
    abbr: 'HW',
    description_ja: 'PCとの通信は無線だが、それ以外の場所でケーブル接続が必要。主にBluetooth接続の分割キーボードで採用される構成。',
    description_en: 'Wireless connection to PC, but requires cable elsewhere. Commonly used in Bluetooth split keyboards.',
  },

  // 5. スイッチ・キーキャップ互換性 (Switch / Keycap Compatibility)
  {
    id: 'compat-mx',
    category: 'compat',
    label: 'Cherry MX',
    abbr: 'MX',
    description_ja: '十字軸。一般的なMX規格キーキャップと互換性がある。',
    description_en: 'Cross-stem. Compatible with standard MX keycaps.',
  },
  {
    id: 'compat-chocv1',
    category: 'compat',
    label: 'Kailh Choc v1',
    abbr: 'V1',
    description_ja: '薄型Choc v1専用。MXやChoc v2とは非互換のロープロ仕様。',
    description_en: 'Low-profile Choc v1 exclusive. Incompatible with MX and Choc v2.',
  },
  {
    id: 'compat-chocv2',
    category: 'compat',
    label: 'Kailh Choc v2',
    abbr: 'V2',
    description_ja: 'Choc v2専用キーキャップと互換。v1/MXとは非互換。',
    description_en: 'Compatible with Choc v2 keycaps. Incompatible with v1/MX.',
  },

  // 6. ポインティングデバイス (Pointing Device)
  {
    id: 'pointing-tb',
    category: 'pointing',
    label: 'Trackball',
    abbr: 'TB',
    description_ja: '親指や指先でボールを回しホームポジションからカーソル操作。',
    description_en: 'Roll ball with thumb or fingertip for cursor control from home position.',
  },
  {
    id: 'pointing-tp',
    category: 'pointing',
    label: 'TrackPoint',
    abbr: 'TP',
    description_ja: 'キー間のスティックで小さな力でも精密にカーソル操作できる。',
    description_en: 'Stick between keys allows precise cursor control with minimal force.',
  },
  {
    id: 'pointing-td',
    category: 'pointing',
    label: 'Trackpad',
    abbr: 'TD',
    description_ja: '指でなぞりカーソル移動やジェスチャー操作が可能。',
    description_en: 'Swipe finger for cursor movement and gesture operations.',
  },

  // 7. ファームウェア (Firmware)
  {
    id: 'firmware-qmk',
    category: 'firmware',
    label: 'QMK',
    abbr: 'FW',
    description_ja: '有線で広く使われる多機能OSSファームウェア。',
    description_en: 'Feature-rich OSS firmware widely used for wired keyboards.',
  },
  {
    id: 'firmware-zmk',
    category: 'firmware',
    label: 'ZMK',
    abbr: 'FW',
    description_ja: '無線や省電力構成に適したモダンOSSファームウェア。',
    description_en: 'Modern OSS firmware suitable for wireless and low-power configurations.',
  },

  // 8. 拡張機能 (Features)
  {
    id: 'feature-ec',
    category: 'features',
    label: 'Encoder',
    abbr: 'EC',
    description_ja: '回転ノブで音量/スクロール/レイヤー切替などに割り当て可能。',
    description_en: 'Rotary knob assignable to volume/scroll/layer switching etc.',
  },
  {
    id: 'feature-dp',
    category: 'features',
    label: 'Display',
    abbr: 'DP',
    description_ja: 'OLED/電子ペーパー等でレイヤー・バッテリー・ロゴを表示。',
    description_en: 'Display layer/battery/logo on OLED/e-paper etc.',
  },

  // 9. 電池形式 (Battery)
  {
    id: 'battery-aaa',
    category: 'battery',
    label: 'AAA',
    abbr: 'BT',
    batteryText: 'AAA',
    description_ja: '単4電池で駆動。入手しやすく交換も容易。',
    description_en: 'Powered by AAA batteries. Easy to obtain and replace.',
  },
  {
    id: 'battery-lipo',
    category: 'battery',
    label: 'LiPo',
    abbr: 'BT',
    description_ja: 'リチウムポリマー電池で駆動。薄型軽量で充電可能。',
    description_en: 'Powered by LiPo battery. Thin, lightweight, and rechargeable.',
  },
];

// 固定順序でアイコンを並べるためのインデックスマップ
const iconOrder = palette.reduce((acc, item, idx) => {
  acc[item.id] = idx;
  return acc;
}, {});

const svg = document.getElementById('badge-svg');
const footerField = document.getElementById('footer-text');
const mainImageFileInput = document.getElementById('main-image-file');
const customIconFileInput = document.getElementById('custom-icon-file');
const iconFileMap = {
  // Shape
  'shape-split': 'fram25_tiles/split.png',
  'shape-unibody': 'fram25_tiles/unit.png',
  'shape-macropad': 'fram25_tiles/macro.png',
  // Stagger / layout
  'stagger-row': 'fram25_tiles/row-sta.png',
  'stagger-column': 'fram25_tiles/col-sta.png',
  'layout-or': 'fram25_tiles/ortho.png',
  'layout-alice': 'fram25_tiles/alice.png',
  'layout-grin': 'fram25_tiles/grin.png',
  // Connection
  'connect-wr': 'fram25_tiles/wired.png',
  'connect-wl': 'fram25_tiles/wireless.png',
  'connect-halfwired': 'fram25_tiles/halifWireless.png',
  // Switch / keycap compatibility
  'compat-mx': 'fram25_tiles/mx.png',
  'compat-chocv1': 'fram25_tiles/chocv1.png',
  'compat-chocv2': 'fram25_tiles/chocv2.png',
  // Pointing devices
  'pointing-tb': 'fram25_tiles/trackball.png',
  'pointing-tp': 'fram25_tiles/trackpoint.png',
  'pointing-td': 'fram25_tiles/trackpad.png',
  // Firmware
  'firmware-qmk': 'fram25_tiles/qmk.png',
  'firmware-zmk': 'fram25_tiles/zmk.png',
  // Features
  'feature-ec': 'fram25_tiles/encoder.png',
  'feature-dp': 'fram25_tiles/display.png',
  // Battery
  'battery-aaa': 'fram25_tiles/battery.png',
  'battery-lipo': 'fram25_tiles/lipo.png',
  // Module marker
  'module-mark': 'fram25_tiles/module.png',
};
const iconDataUrlCache = {};
let iconPreloadPromise = null;

function fetchAsDataUrl(path) {
  return fetch(path)
    .then((res) => {
      if (!res.ok) throw new Error(`failed to load ${path}`);
      return res.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

function preloadIcons() {
  if (iconPreloadPromise) return iconPreloadPromise;
  const uniqueFiles = [...new Set(Object.values(iconFileMap))];
  iconPreloadPromise = Promise.all(
    uniqueFiles.map((file) =>
      fetchAsDataUrl(`./public/${file}`)
        .then((dataUrl) => {
          iconDataUrlCache[file] = dataUrl;
        })
        .catch(() => {
          // 失敗しても既存パスで表示されるので黙殺
        })
    )
  );
  return iconPreloadPromise;
}
const categoryOrder = [
  'shape',
  'layout',
  'pitch',
  'connect',
  'compat',
  'pointing',
  'firmware',
  'features',
  'battery',
  'freeform',
];
const multiSelectCategories = new Set(['connect', 'compat', 'pointing', 'firmware', 'features', 'freeform']);

function startCustomIcon(category) {
  if (customIconFileInput) {
    customIconFileInput.dataset.cat = category;
    customIconFileInput.click();
  }
}

function finishCustomIcon(category, src) {
  const lang = state.language || getCurrentLanguage();
  const promptText = lang === 'ja' ? '帯に入れる略称（2-4文字推奨）' : 'Abbreviation for badge (2-4 chars recommended)';
  const abbr = prompt(promptText, 'CU') || 'CU';
  const icon = {
    id: `custom-${category}`,
    category,
    label: 'Custom',
    abbr,
    description_ja: 'ユーザー指定アイコン',
    description_en: 'User-specified icon',
  };
  state.customIconMap[icon.id] = src;
  const isMulti = multiSelectCategories.has(category);
  const sameCategoryIndex = state.selectedIcons.findIndex((i) => i.category === category);
  if (!isMulti && sameCategoryIndex >= 0) {
    state.selectedIcons.splice(sameCategoryIndex, 1, icon);
  } else {
    state.selectedIcons.push(icon);
  }
  finalizeSelection();
}

// Freeform icon functions
let pendingFreeformImage = null;
let editingFreeformId = null;

function showFreeformInputForm(type, imageData = null) {
  const form = document.getElementById('freeform-input-form');
  const addControls = document.getElementById('freeform-add-controls');
  const iconTextEl = document.getElementById('freeform-icon-text');
  const abbrTextEl = document.getElementById('freeform-abbr-text');
  const confirmBtn = document.getElementById('freeform-confirm-btn');

  if (!form || !addControls) return;

  // 編集モードをリセット
  editingFreeformId = null;

  // フォームを表示、追加ボタンを非表示
  form.style.display = 'block';
  addControls.style.display = 'none';

  // ボタンテキストを「追加」に
  if (confirmBtn) {
    const lang = state.language || getCurrentLanguage();
    confirmBtn.textContent = lang === 'ja' ? '追加' : 'Add';
  }

  // 入力をリセット
  iconTextEl.value = '';
  abbrTextEl.value = '';

  if (type === 'image' && imageData) {
    pendingFreeformImage = imageData;
    iconTextEl.value = '[Image]';
    iconTextEl.disabled = true;
    abbrTextEl.value = 'IMG';
  } else {
    pendingFreeformImage = null;
    iconTextEl.disabled = false;
    iconTextEl.placeholder = 'TEXT';
    abbrTextEl.value = '';
  }

  // フォーカス
  if (type === 'text') {
    iconTextEl.focus();
  } else {
    abbrTextEl.focus();
  }
}

function editFreeformIcon(id) {
  const icon = state.freeformIcons.find(i => i.id === id);
  if (!icon) return;

  const form = document.getElementById('freeform-input-form');
  const addControls = document.getElementById('freeform-add-controls');
  const iconTextEl = document.getElementById('freeform-icon-text');
  const abbrTextEl = document.getElementById('freeform-abbr-text');
  const confirmBtn = document.getElementById('freeform-confirm-btn');

  if (!form || !addControls) return;

  // 編集モードを設定
  editingFreeformId = id;

  // フォームを表示、追加ボタンを非表示
  form.style.display = 'block';
  addControls.style.display = 'none';

  // ボタンテキストを「更新」に
  if (confirmBtn) {
    const lang = state.language || getCurrentLanguage();
    confirmBtn.textContent = lang === 'ja' ? '更新' : 'Update';
  }

  // 既存の値をセット
  if (icon.type === 'image') {
    pendingFreeformImage = icon.data;
    iconTextEl.value = '[Image]';
    iconTextEl.disabled = true;
  } else {
    pendingFreeformImage = null;
    iconTextEl.value = icon.data;
    iconTextEl.disabled = false;
  }
  abbrTextEl.value = icon.abbr;

  // フォーカス
  abbrTextEl.focus();
}

function hideFreeformInputForm() {
  const form = document.getElementById('freeform-input-form');
  const addControls = document.getElementById('freeform-add-controls');
  const iconTextEl = document.getElementById('freeform-icon-text');

  if (!form || !addControls) return;

  form.style.display = 'none';
  addControls.style.display = 'flex';
  pendingFreeformImage = null;
  editingFreeformId = null;
  iconTextEl.disabled = false;
}

function confirmFreeformIcon() {
  const iconTextEl = document.getElementById('freeform-icon-text');
  const abbrTextEl = document.getElementById('freeform-abbr-text');

  const abbr = abbrTextEl.value.trim() || 'FF';

  // 編集モードの場合
  if (editingFreeformId) {
    const icon = state.freeformIcons.find(i => i.id === editingFreeformId);
    if (icon) {
      // テキストアイコンの場合はテキストも更新
      if (icon.type === 'text') {
        const text = iconTextEl.value.trim();
        if (!text) {
          hideFreeformInputForm();
          return;
        }
        icon.data = text;
      }
      icon.abbr = abbr;

      // selectedIconsのabbrも更新
      const selectedIcon = state.selectedIcons.find(i => i.id === editingFreeformId);
      if (selectedIcon) {
        selectedIcon.abbr = abbr;
      }
    }

    hideFreeformInputForm();
    updateFreeformListUI();
    finalizeSelection();
    return;
  }

  // 新規追加モード
  if (pendingFreeformImage) {
    // 画像アイコンを追加
    const id = `freeform-${state.freeformIdCounter++}`;
    const icon = {
      id,
      type: 'image',
      data: pendingFreeformImage,
      abbr,
    };
    state.freeformIcons.push(icon);
    state.customIconMap[id] = pendingFreeformImage;

    state.selectedIcons.push({
      id,
      category: 'freeform',
      label: 'Freeform',
      abbr,
    });
  } else {
    // テキストアイコンを追加
    const text = iconTextEl.value.trim();
    if (!text) {
      hideFreeformInputForm();
      return;
    }

    const id = `freeform-${state.freeformIdCounter++}`;
    const icon = {
      id,
      type: 'text',
      data: text,
      abbr: abbr || text.split('\n')[0].substring(0, 4).toUpperCase(),
    };
    state.freeformIcons.push(icon);

    state.selectedIcons.push({
      id,
      category: 'freeform',
      label: 'Freeform',
      abbr: icon.abbr,
    });
  }

  hideFreeformInputForm();
  updateFreeformListUI();
  finalizeSelection();
}

function removeFreeformIcon(id) {
  const idx = state.freeformIcons.findIndex((i) => i.id === id);
  if (idx >= 0) {
    state.freeformIcons.splice(idx, 1);
  }
  delete state.customIconMap[id];

  // selectedIconsからも削除
  const selectedIdx = state.selectedIcons.findIndex((i) => i.id === id);
  if (selectedIdx >= 0) {
    state.selectedIcons.splice(selectedIdx, 1);
  }

  updateFreeformListUI();
  finalizeSelection();
}

function updateFreeformListUI() {
  const listEl = document.getElementById('freeform-list');
  if (!listEl) return;

  listEl.innerHTML = '';

  state.freeformIcons.forEach((icon) => {
    const row = document.createElement('div');
    row.className = 'freeform-item';
    row.dataset.freeformId = icon.id;

    const preview = document.createElement('span');
    preview.className = 'freeform-preview';
    if (icon.type === 'image') {
      preview.style.backgroundImage = `url(${icon.data})`;
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundPosition = 'center';
    } else {
      // 複数行の場合は最初の行だけプレビュー表示
      const firstLine = icon.data.split('\n')[0];
      preview.textContent = firstLine.length > 4 ? firstLine.substring(0, 4) : firstLine;
      preview.classList.add('freeform-text-preview');
    }

    const label = document.createElement('span');
    label.className = 'freeform-label';
    // 複数行テキストは改行を「↵」で表示
    const displayData = icon.type === 'text' ? icon.data.replace(/\n/g, '↵') : 'Image';
    label.textContent = `${displayData} · ${icon.abbr}`;

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'freeform-edit-btn';
    editBtn.textContent = '✎';
    editBtn.title = state.language === 'ja' ? '編集' : 'Edit';
    editBtn.addEventListener('click', () => editFreeformIcon(icon.id));

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'freeform-remove-btn';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => removeFreeformIcon(icon.id));

    row.appendChild(preview);
    row.appendChild(label);
    row.appendChild(editBtn);
    row.appendChild(removeBtn);
    listEl.appendChild(row);
  });
}

function bootstrapDefaults() {
  const defaults = [
    findIcon('shape-split'),
    findIcon('stagger-row'),
    { id: 'pitch', category: 'pitch', label: 'Pitch', abbr: state.pitchAbbr, value: state.pitchValue },
    findIcon('connect-wl'),
    findIcon('compat-mx'),
    findIcon('pointing-tb'),
    findIcon('firmware-qmk'),
    findIcon('feature-ec'),
  ].filter(Boolean);
  state.selectedIcons = defaults;
  state.footerText = buildFooterText();
}

function findIcon(id) {
  return palette.find((p) => p.id === id);
}

function updatePaletteUI() {
  const selectedIds = new Set(state.selectedIcons.map((i) => i.id));

  // pointing/featuresカテゴリの各アイコンのカウントを計算
  const multiAddCounts = new Map();
  state.selectedIcons.forEach((i) => {
    if (i.category === 'pointing' || i.category === 'features') {
      multiAddCounts.set(i.id, (multiAddCounts.get(i.id) || 0) + 1);
    }
  });

  // 通常のパレットボタン（pointing/features以外）
  paletteButtons.forEach((btn) => {
    const icon = findIcon(btn.dataset.iconId);
    if (icon) {
      const buttonText = btn.querySelector('.button-text');
      if (buttonText) {
        buttonText.textContent = `${icon.label} · ${icon.abbr}`;
      }
    }
    btn.classList.toggle('active', selectedIds.has(btn.dataset.iconId));
  });

  // multi-add-row（pointing/features）のカウント更新
  document.querySelectorAll('.multi-add-row').forEach((row) => {
    const iconId = row.dataset.iconId;
    const count = multiAddCounts.get(iconId) || 0;
    const countEl = row.querySelector('.item-count');
    const minusBtn = row.querySelector('.count-btn.minus');

    if (countEl) {
      countEl.textContent = count > 0 ? count : '';
      countEl.dataset.count = count;
    }

    row.classList.toggle('has-count', count > 0);

    if (minusBtn) {
      minusBtn.disabled = count === 0;
    }
  });

  document.querySelectorAll('[data-custom-category]').forEach((btn) => {
    const cat = btn.dataset.customCategory;
    const hasCustom = state.selectedIcons.some((i) => i.id === `custom-${cat}`);
    btn.classList.toggle('active', hasCustom);
  });

  document.querySelectorAll('[data-desc-for]').forEach((descEl) => {
    const cat = descEl.dataset.descFor;
    const selected = state.selectedIcons.filter((i) => i.category === cat);
    if (selected.length) {
      const lang = state.language || getCurrentLanguage();
      // pointing/featuresは同じアイコンをグループ化して表示
      const grouped = new Map();
      selected.forEach((s) => {
        if (!grouped.has(s.id)) {
          grouped.set(s.id, { icon: s, count: 0 });
        }
        grouped.get(s.id).count++;
      });
      descEl.innerHTML = Array.from(grouped.values())
        .map(({ icon: s, count }) => {
          const desc = lang === 'ja' ? s.description_ja : s.description_en;
          const countText = count > 1 ? ` ×${count}` : '';
          return `<div>${s.label} (${s.abbr})${countText} — ${desc || ''}</div>`;
        })
        .join('');
    } else {
      descEl.textContent = t('palette.unselected');
    }
  });

  // battery-aaaが選択されている場合のみテキスト入力UIを表示
  const batteryTextInput = document.querySelector('.battery-text-input');
  if (batteryTextInput) {
    const hasBatteryAaa = state.selectedIcons.some((i) => i.id === 'battery-aaa');
    batteryTextInput.style.display = hasBatteryAaa ? 'block' : 'none';
  }

  // モジュールボタンのUI更新
  updateModuleButtonUI();
}

function updateModuleButtonUI() {
  document.querySelectorAll('.multi-add-row').forEach((row) => {
    const iconId = row.dataset.iconId;
    const moduleBtn = row.querySelector('.module-btn');
    if (moduleBtn) {
      moduleBtn.classList.toggle('active', state.moduleIcons.has(iconId));
    }
  });
}

function toggleIcon(icon) {
  // pointing/featuresカテゴリは同じアイコンを複数追加可能（トラックボール2個など）
  if (icon.category === 'pointing' || icon.category === 'features') {
    // 常に追加（削除は別のUIで行う）
    state.selectedIcons.push(icon);
    return finalizeSelection();
  }

  const existingIndex = state.selectedIcons.findIndex((i) => i.id === icon.id);
  if (existingIndex >= 0) {
    state.selectedIcons.splice(existingIndex, 1);
  } else {
    const isMulti = multiSelectCategories.has(icon.category);
    if (!isMulti && icon.category !== 'pitch') {
      const sameCategoryIndex = state.selectedIcons.findIndex((i) => i.category === icon.category);
      if (sameCategoryIndex >= 0) {
        state.selectedIcons.splice(sameCategoryIndex, 1, icon);
        return finalizeSelection();
      }
    }
    state.selectedIcons.push(icon);
  }
  finalizeSelection();
}

function finalizeSelection() {
  if (!state.footerIsCustom) state.footerText = buildFooterText();
  updatePaletteUI();
  renderBadge();
  syncFooterField();
  saveStateToURL();
}

function setPitch() {
  const value = document.getElementById('pitch-input').value.trim();
  const abbr = document.getElementById('pitch-abbr').value.trim() || 'KP';
  state.pitchValue = value || '';
  state.pitchAbbr = abbr;
  const payload = { id: 'pitch', category: 'pitch', label: 'Pitch', abbr, value: value || '' };
  const existingIndex = state.selectedIcons.findIndex((i) => i.category === 'pitch');
  if (existingIndex >= 0) {
    state.selectedIcons.splice(existingIndex, 1, payload);
  } else {
    state.selectedIcons.push(payload);
  }
  if (!state.footerIsCustom) state.footerText = buildFooterText();
  updatePaletteUI();
  renderBadge();
  syncFooterField();
  saveStateToURL();
}

function getVisualSlots() {
  const slots = [];
  categoryOrder.forEach((cat) => {
    const items = state.selectedIcons.filter((i) => i.category === cat);
    if (!items.length) return;

    // pointing/featuresカテゴリは同じアイコンをグループ化してカウント、固定順序でソート
    if (cat === 'pointing' || cat === 'features') {
      const countMap = new Map();
      items.forEach((item) => {
        countMap.set(item.id, (countMap.get(item.id) || 0) + 1);
      });
      // ユニークなアイコンを取得し、iconOrderでソート
      const uniqueItems = [];
      const seen = new Set();
      items.forEach((item) => {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          uniqueItems.push(item);
        }
      });
      uniqueItems.sort((a, b) => (iconOrder[a.id] ?? 9999) - (iconOrder[b.id] ?? 9999));
      uniqueItems.forEach((item) => {
        slots.push({ category: cat, items: [item], count: countMap.get(item.id) });
      });
      return;
    }

    const allowMulti = multiSelectCategories.has(cat);
    if (cat === 'pitch' || !allowMulti || items.length === 1) {
      slots.push({ category: cat, items: [items[0]], count: 1 });
    } else {
      // 複数選択カテゴリ（connect, compat, firmware等）も固定順序でソート
      const sortedItems = [...items].sort((a, b) => (iconOrder[a.id] ?? 9999) - (iconOrder[b.id] ?? 9999));
      slots.push({ category: cat, items: sortedItems, count: 1 });
    }
  });
  return slots;
}

function resolveIconHref(id) {
  if (state.customIconMap[id]) return state.customIconMap[id];
  const filename = iconFileMap[id] || `${id}.png`;
  return iconDataUrlCache[filename] || `./public/${filename}`;
}

function renderIconOrText(item, cx, cy, innerR, clipId) {
  // Firmwareカテゴリはテキスト表示（QMK/ZMK/VIA/VIALなど）
  if (item.category === 'firmware') {
    const label = item.label || item.id.toUpperCase();
    return `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="${'Space Grotesk'}" font-size="28" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipId})">${label}</text>`;
  }
  // Compatカテゴリはテキスト表示（MX/V1/V2）
  if (item.category === 'compat') {
    const label = item.abbr || item.id.toUpperCase();
    return `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="${'Space Grotesk'}" font-size="28" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipId})">${label}</text>`;
  }
  // Batteryカテゴリは画像を表示（battery-aaaの場合のみテキストを重ねる）
  if (item.category === 'battery') {
    const imgMarkup = `<image href="${resolveIconHref(item.id)}" x="${cx - innerR}" y="${cy - innerR}" width="${innerR * 2}" height="${innerR * 2}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice" />`;
    // battery-aaaの場合のみテキストを重ねる（lipoは画像のみ）
    if (item.id === 'battery-aaa') {
      const batteryText = state.batteryText || 'AAA';
      const textMarkup = `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="IBM Plex Mono" font-size="18" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipId})">${batteryText}</text>`;
      return imgMarkup + textMarkup;
    }
    return imgMarkup;
  }
  // Freeformカテゴリ - テキストタイプの場合
  if (item.category === 'freeform') {
    const freeformIcon = state.freeformIcons.find(f => f.id === item.id);
    if (freeformIcon && freeformIcon.type === 'text') {
      const text = freeformIcon.data || '';
      const lines = text.split('\n');
      const lineCount = lines.length;

      if (lineCount === 1) {
        // 単一行の場合
        const fontSize = text.length <= 2 ? 28 : text.length <= 4 ? 22 : 16;
        return `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="Space Grotesk" font-size="${fontSize}" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipId})">${text}</text>`;
      } else {
        // 複数行の場合
        const maxLen = Math.max(...lines.map(l => l.length));
        const fontSize = maxLen <= 2 ? 20 : maxLen <= 4 ? 16 : 12;
        const lineHeight = fontSize + 4;
        const totalHeight = lineCount * lineHeight;
        const startY = cy - totalHeight / 2 + lineHeight / 2;

        return lines.map((line, idx) => {
          const y = startY + idx * lineHeight;
          return `<text x="${cx}" y="${y + 2}" text-anchor="middle" font-family="Space Grotesk" font-size="${fontSize}" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipId})">${line}</text>`;
        }).join('');
      }
    }
    // 画像タイプはcustomIconMapから取得
  }
  return `<image href="${resolveIconHref(item.id)}" x="${cx - innerR}" y="${cy - innerR}" width="${innerR * 2}" height="${innerR * 2}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice" />`;
}

// Firmware用：複数選択時に上下分割でテキスト表示
function renderFirmwareMulti(items, cx, cy, clipRoot) {
  const count = items.length;
  if (count === 1) {
    const label = items[0].label || items[0].id.toUpperCase();
    return `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="Space Grotesk" font-size="28" font-weight="700" fill="#000" dominant-baseline="middle">${label}</text>`;
  }

  // 上下に分割して表示
  const fontSize = count <= 2 ? 20 : 16;
  const lineHeight = fontSize + 4;
  const totalHeight = count * lineHeight;
  const startY = cy - totalHeight / 2 + lineHeight / 2;

  return items.map((item, idx) => {
    const label = item.label || item.id.toUpperCase();
    const y = startY + idx * lineHeight;
    return `<text x="${cx}" y="${y + 2}" text-anchor="middle" font-family="Space Grotesk" font-size="${fontSize}" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipRoot})">${label}</text>`;
  }).join('');
}

// Compat用：複数選択時に上下分割でテキスト表示（abbr使用）
function renderCompatMulti(items, cx, cy, clipRoot) {
  const count = items.length;
  if (count === 1) {
    const label = items[0].abbr || items[0].id.toUpperCase();
    return `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="Space Grotesk" font-size="28" font-weight="700" fill="#000" dominant-baseline="middle">${label}</text>`;
  }

  // 上下に分割して表示
  const fontSize = count <= 2 ? 20 : 16;
  const lineHeight = fontSize + 4;
  const totalHeight = count * lineHeight;
  const startY = cy - totalHeight / 2 + lineHeight / 2;

  return items.map((item, idx) => {
    const label = item.abbr || item.id.toUpperCase();
    const y = startY + idx * lineHeight;
    return `<text x="${cx}" y="${y + 2}" text-anchor="middle" font-family="Space Grotesk" font-size="${fontSize}" font-weight="700" fill="#000" dominant-baseline="middle" clip-path="url(#${clipRoot})">${label}</text>`;
  }).join('');
}

function setTheme(theme) {
  state.theme = theme;
  document.body.classList.toggle('dark', theme === 'dark');

  // localStorageに保存
  localStorage.setItem('theme', theme);

  // Update fixed toggle button
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const icon = toggleBtn?.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  // Update segmented buttons if they exist
  document.querySelectorAll('.segmented button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });

  renderBadge();
}

function toggleTheme() {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// URLパラメータに状態を保存
function saveStateToURL() {
  const params = new URLSearchParams();

  // メインラベル
  if (state.mainLabel && state.mainLabel !== '42') {
    params.set('label', state.mainLabel);
  }

  // ピッチ
  if (state.pitchValue && state.pitchValue !== '19mm') {
    params.set('pitch', state.pitchValue);
  }
  if (state.pitchAbbr && state.pitchAbbr !== 'KP') {
    params.set('pitchAbbr', state.pitchAbbr);
  }

  // 選択されたアイコン（カスタム以外）
  const iconIds = state.selectedIcons
    .filter(i => !i.id.startsWith('custom-') && i.category !== 'pitch')
    .map(i => i.id)
    .join(',');
  if (iconIds) {
    params.set('icons', iconIds);
  }

  // 非対応アイコン
  const notSupportedIds = Array.from(state.notSupportedIcons).join(',');
  if (notSupportedIds) {
    params.set('notSupported', notSupportedIds);
  }

  // モジュールアイコン
  const moduleIds = Array.from(state.moduleIcons).join(',');
  if (moduleIds) {
    params.set('module', moduleIds);
  }

  // フッターテキスト（カスタムの場合のみ）
  if (state.footerIsCustom && state.footerText) {
    params.set('footer', state.footerText);
  }

  // 電池テキスト
  if (state.batteryText && state.batteryText !== 'AAA') {
    params.set('batteryText', state.batteryText);
  }

  // 行数
  if (state.rowCount && state.rowCount !== 1) {
    params.set('rows', state.rowCount.toString());
  }

  // URLを更新（リロードなし）
  const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
  window.history.replaceState({}, '', newUrl);

  return newUrl;
}

// URLパラメータから状態を復元
function loadStateFromURL() {
  const params = new URLSearchParams(window.location.search);

  // メインラベル
  const label = params.get('label');
  if (label) {
    state.mainLabel = label;
    document.getElementById('main-label').value = label;
  }

  // ピッチ
  const pitch = params.get('pitch');
  if (pitch) {
    state.pitchValue = pitch;
    document.getElementById('pitch-input').value = pitch;
  }

  const pitchAbbr = params.get('pitchAbbr');
  if (pitchAbbr) {
    state.pitchAbbr = pitchAbbr;
    document.getElementById('pitch-abbr').value = pitchAbbr;
  }

  // アイコン
  const icons = params.get('icons');
  if (icons) {
    const iconIds = icons.split(',').filter(Boolean);
    state.selectedIcons = iconIds
      .map(id => findIcon(id))
      .filter(Boolean);
  }

  // ピッチをアイコンに追加
  if (pitch) {
    const payload = { id: 'pitch', category: 'pitch', label: 'Pitch', abbr: state.pitchAbbr, value: state.pitchValue };
    const existingIndex = state.selectedIcons.findIndex((i) => i.category === 'pitch');
    if (existingIndex >= 0) {
      state.selectedIcons.splice(existingIndex, 1, payload);
    } else {
      state.selectedIcons.push(payload);
    }
  }

  // 非対応アイコン
  const notSupported = params.get('notSupported');
  if (notSupported) {
    const notSupportedIds = notSupported.split(',').filter(Boolean);
    state.notSupportedIcons = new Set(notSupportedIds);
  }

  // モジュールアイコン
  const moduleParam = params.get('module');
  if (moduleParam) {
    const moduleIds = moduleParam.split(',').filter(Boolean);
    state.moduleIcons = new Set(moduleIds);
  }

  // フッター
  const footer = params.get('footer');
  if (footer) {
    state.footerText = footer;
    state.footerIsCustom = true;
  } else {
    state.footerText = buildFooterText();
    state.footerIsCustom = false;
  }

  // 電池テキスト
  const batteryText = params.get('batteryText');
  if (batteryText) {
    state.batteryText = batteryText;
    const batteryTextEl = document.getElementById('battery-text');
    if (batteryTextEl) {
      batteryTextEl.value = batteryText;
    }
  }

  // 行数
  const rows = params.get('rows');
  if (rows) {
    const rowCount = parseInt(rows, 10);
    if (rowCount === 1 || rowCount === 2) {
      state.rowCount = rowCount;
      document.querySelectorAll('.row-count-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.rows, 10) === rowCount);
      });
    }
  }

  return params.toString().length > 0;
}

// 共有用URLを取得
function getShareableURL() {
  saveStateToURL();
  return window.location.href;
}

// URLをクリップボードにコピー
async function copyShareURL() {
  const url = getShareableURL();
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
    console.error('Failed to copy URL:', err);
    return false;
  }
}

function formatAbbr(abbr) {
  if (!abbr) return '';
  return abbr.toString().toUpperCase().slice(0, 2);
}

function buildFooterText() {
  const pieces = getVisualSlots().map((slot) =>
    slot.items.map((i) => formatAbbr(i.abbr)).filter(Boolean).join('/')
  );
  return pieces.filter(Boolean).join(' ');
}

function syncFooterField() {
  footerField.value = state.footerText;
}

function describeWedge(cx, cy, r, startAngle, endAngle) {
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const sx = cx + r * Math.cos(startAngle);
  const sy = cy + r * Math.sin(startAngle);
  const ex = cx + r * Math.cos(endAngle);
  const ey = cy + r * Math.sin(endAngle);
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey} Z`;
}

function renderBadge() {
  const slots = getVisualSlots();
  const bg = '#AAB2AB';
  const ink = '#000000';
  const band = '#000000';
  const bandText = '#ffffff';
  const border = 6;
  const paddingRight = 35;
  const topMargin = 17; // margin from top to black stroke top
  const leftOffset = 35; // left margin to black stroke left

  // geometry
  const mainWhiteRadius = 60; // white diameter 120px
  const mainRingBlack = 15;
  const mainRingBg = 15;
  const mainBlackOuterRadius = mainWhiteRadius + mainRingBlack; // outer edge of black ring
  const mainBgOuterRadius = mainBlackOuterRadius + mainRingBg; // outer edge of bg ring
  const mainEffective = mainBgOuterRadius * 2;

  const attrRadius = 45; // white core radius => 90px diameter
  const attrStroke = 12;
  const attrOuterR = attrRadius + attrStroke / 2;
  const attrSpacing = attrOuterR * 2 + 8; // reduced gap
  const attrStartX = leftOffset + mainEffective + 12 + attrOuterR;

  // 2行レイアウト対応
  const rowCount = state.rowCount || 1;
  const singleBandHeight = 40; // 各帯の高さ
  const iconRowHeight = attrOuterR * 2 + 10; // アイコン行の高さ（上下マージン含む）

  // 2行モード: アイコン行1 + 帯1 + アイコン行2 + 帯2
  // 1行モード: アイコン行 + 帯
  const bandHeight = rowCount === 2 ? singleBandHeight : 60;
  const canvasHeight = rowCount === 2
    ? topMargin + iconRowHeight + singleBandHeight + iconRowHeight + singleBandHeight
    : 200;

  // 各行のY座標（アイコン中心）
  const attrRow1Y = topMargin + attrOuterR;
  const band1Y = topMargin + iconRowHeight; // 1行目の帯のY位置
  const attrRow2Y = band1Y + singleBandHeight + attrOuterR + 5; // 2行目のアイコン中心
  const band2Y = canvasHeight - singleBandHeight; // 2行目の帯のY位置（最下部）

  // メインアイコンの位置（常に同じ位置 - 左上固定）
  const mainCx = leftOffset + mainBlackOuterRadius;
  const mainCy = topMargin + mainBlackOuterRadius;

  // 2行時はスロットを上段と下段に分割
  let row1Slots = slots;
  let row2Slots = [];

  if (rowCount === 2 && slots.length > 1) {
    const halfIdx = Math.ceil(slots.length / 2);
    row1Slots = slots.slice(0, halfIdx);
    row2Slots = slots.slice(halfIdx);
  }

  // 幅の計算（長い方の行に合わせる）
  const maxSlotsPerRow = Math.max(row1Slots.length, row2Slots.length);
  const contentWidth = maxSlotsPerRow
    ? attrStartX + (maxSlotsPerRow - 1) * attrSpacing + attrOuterR + paddingRight
    : leftOffset + mainEffective + paddingRight;
  const width = Math.max(contentWidth, leftOffset + mainBgOuterRadius + paddingRight) + border;

  // スロットをレンダリングする関数
  function renderSlot(slot, slotIdx, rowY, rowPrefix) {
    const itemsSorted = slot.items.length > 1
      ? [...slot.items].sort((a, b) => {
          const ai = iconOrder[a.id] ?? 9999;
          const bi = iconOrder[b.id] ?? 9999;
          if (ai !== bi) return ai - bi;
          return a.label.localeCompare(b.label);
        })
      : slot.items;

    const cx = attrStartX + slotIdx * attrSpacing;
    const innerR = attrRadius - 6;
    const isMulti = itemsSorted.length > 1;
    const clipRoot = `clip-${rowPrefix}-${slot.category}-${slotIdx}`;

    const defs = isMulti
      ? itemsSorted
        .map((_, segIdx) => {
          const segCount = itemsSorted.length;
          const anglePer = (Math.PI * 2) / segCount;
          const start = -Math.PI / 2 + anglePer * segIdx;
          const end = start + anglePer;
          const id = `${clipRoot}-${segIdx}`;
          return `<clipPath id="${id}"><path d="${describeWedge(cx, rowY, innerR, start, end)}" /></clipPath>`;
        })
        .join('')
      : `<clipPath id="${clipRoot}"><circle cx="${cx}" cy="${rowY}" r="${innerR}" /></clipPath>`;

    // firmware/compatカテゴリは上下分割でテキスト表示
    const isFirmware = slot.category === 'firmware';
    const isCompat = slot.category === 'compat';
    const isTextCategory = isFirmware || isCompat;
    const images = isFirmware
      ? renderFirmwareMulti(itemsSorted, cx, rowY, clipRoot)
      : isCompat
        ? renderCompatMulti(itemsSorted, cx, rowY, clipRoot)
        : isMulti
          ? itemsSorted
            .map((item, segIdx) => {
              const id = `${clipRoot}-${segIdx}`;
              return renderIconOrText(item, cx, rowY, innerR, id);
            })
            .join('')
          : itemsSorted[0].id === 'pitch'
            ? `<text class="mono" x="${cx}" y="${rowY}" text-anchor="middle" font-family="${'IBM Plex Mono'}" font-size="28" font-weight="700" fill="${ink}" dominant-baseline="middle">${itemsSorted[0].value || itemsSorted[0].abbr}</text>`
            : renderIconOrText(itemsSorted[0], cx, rowY, innerR, clipRoot);

    // firmware/compatカテゴリはspokesなし
    const spokes = isTextCategory
      ? ''
      : isMulti
        ? itemsSorted
          .map((_, segIdx) => {
            const segCount = itemsSorted.length;
            const anglePer = (Math.PI * 2) / segCount;
            const angle = -Math.PI / 2 + anglePer * segIdx;
            const x = cx + innerR * Math.cos(angle);
            const y = rowY + innerR * Math.sin(angle);
            return `<line x1="${cx}" y1="${rowY}" x2="${x}" y2="${y}" stroke="${ink}" stroke-width="1" />`;
          })
          .join('')
        : '';

    // Check if any icon in the slot is marked as not supported
    const hasNotSupported = slot.items.some(item => state.notSupportedIcons.has(item.id));
    // Draw strikethrough inside the circle (45 degree diagonal)
    const strikeR = attrRadius - attrStroke / 2; // inner radius of white circle
    const strikeOffset = strikeR * Math.SQRT1_2; // cos(45°) = sin(45°) = 1/√2
    const strikethrough = hasNotSupported
      ? `<line x1="${cx - strikeOffset}" y1="${rowY + strikeOffset}" x2="${cx + strikeOffset}" y2="${rowY - strikeOffset}" stroke="${ink}" stroke-width="${attrStroke}" stroke-linecap="round" />`
      : '';

    // Check if any icon in the slot is marked as module
    const hasModule = slot.items.some(item => state.moduleIcons.has(item.id));
    // Draw module mark at bottom-right corner, slightly overlapping the circle (1/3 of icon size)
    const moduleSize = Math.round(attrRadius * 2 / 3); // 約30px (アイコン直径の1/3)
    // 円と少し被るように配置（moduleSize/3 分だけ内側に）
    const moduleX = cx + attrRadius - moduleSize * 2 / 3;
    const moduleY = rowY + attrRadius - moduleSize * 2 / 3;
    const moduleMarkHref = resolveIconHref('module-mark');
    const moduleMark = hasModule
      ? `<image href="${moduleMarkHref}" x="${moduleX}" y="${moduleY}" width="${moduleSize}" height="${moduleSize}" />`
      : '';

    return `
      <g aria-label="${slot.items.map((s) => s.label).join(' / ')}">
        <defs>${defs}</defs>
        <circle cx="${cx}" cy="${rowY}" r="${attrRadius}" fill="#ffffff" stroke="${ink}" stroke-width="${attrStroke}" />
        ${images}
        ${spokes}
        ${strikethrough}
        ${moduleMark}
      </g>
    `;
  }

  // 両方の行のアイコンをレンダリング
  const circles1 = row1Slots.map((slot, i) => renderSlot(slot, i, attrRow1Y, 'r1')).join('');
  const circles2 = row2Slots.map((slot, i) => renderSlot(slot, i, attrRow2Y, 'r2')).join('');
  const circles = circles1 + circles2;

  // フッター用に各行のスロットとその位置情報を作成
  const footerData1 = row1Slots.map((slot, idx) => ({ slot, cx: attrStartX + idx * attrSpacing }));
  const footerData2 = row2Slots.map((slot, idx) => ({ slot, cx: attrStartX + idx * attrSpacing }));

  // フッターテキストをレンダリング（bandYは帯のY位置）
  function renderFooterText(footerDataRow, bandY) {
    return footerDataRow.map(({ slot, cx }) => {
      let lines;
      if (slot.category === 'firmware') {
        lines = ['FW'];
      } else {
        const abbrs = slot.items.map((i) => formatAbbr(i.abbr)).filter(Boolean);
        if (slot.count && slot.count > 1) {
          lines = abbrs.map(abbr => `${abbr}×${slot.count}`);
        } else {
          lines = abbrs;
        }
      }
      if (!lines.length) return '';

      const currentBandHeight = rowCount === 2 ? singleBandHeight : bandHeight;
      const centerY = bandY + currentBandHeight / 2;
      const maxBandInner = currentBandHeight * 0.8;
      const fontSize = Math.min(rowCount === 2 ? 18 : 26, Math.max(12, maxBandInner / lines.length));
      const lineHeight = fontSize + 4;
      const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
      const tspans = lines
        .map(
          (txt, lineIdx) =>
            `<tspan x="${cx}" y="${startY + lineIdx * lineHeight}">${txt}</tspan>`
        )
        .join('');
      return `<text x="${cx}" y="${startY}" text-anchor="middle" font-family="${'IBM Plex Mono'}" font-size="${fontSize}" font-weight="700" fill="${bandText}">${tspans}</text>`;
    }).join('');
  }

  // 帯とテキストの描画
  const bandsAndTexts = rowCount === 2
    ? `<rect x="0" y="${band1Y}" width="${width}" height="${singleBandHeight}" fill="${band}" />
       ${renderFooterText(footerData1, band1Y)}
       <rect x="0" y="${band2Y}" width="${width}" height="${singleBandHeight}" fill="${band}" />
       ${renderFooterText(footerData2, band2Y)}`
    : `<rect x="0" y="${canvasHeight - bandHeight}" width="${width}" height="${bandHeight}" fill="${band}" />
       ${renderFooterText(footerData1, canvasHeight - bandHeight)}`;

  const svgMarkup = `
    <rect width="${width}" height="${canvasHeight}" fill="${bg}" />
    <g>
      ${circles}
      ${bandsAndTexts}
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainBgOuterRadius}" fill="${bg}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainBlackOuterRadius}" fill="${ink}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainWhiteRadius}" fill="#ffffff" />
      ${state.mainImageUrl
      ? `<defs><clipPath id="main-clip"><circle cx="${mainCx}" cy="${mainCy}" r="${mainWhiteRadius - 4}" /></clipPath></defs>
           <image href="${state.mainImageUrl}" x="${mainCx - (mainWhiteRadius - 4)}" y="${mainCy - (mainWhiteRadius - 4)}" width="${(mainWhiteRadius - 4) * 2}" height="${(mainWhiteRadius - 4) * 2}" clip-path="url(#main-clip)" preserveAspectRatio="xMidYMid slice" />`
      : `<text class="main-text" x="${mainCx}" y="${mainCy + 10}" text-anchor="middle" font-family="${'Space Grotesk'}" font-size="44" font-weight="700" fill="${ink}" dominant-baseline="middle">${state.mainLabel || '0'}</text>`}
      <rect width="${width}" height="${canvasHeight}" fill="none" stroke="${ink}" stroke-width="${border}" />
    </g>
  `;

  svg.setAttribute('viewBox', `0 0 ${width} ${canvasHeight}`);
  svg.setAttribute('width', width);
  svg.setAttribute('height', canvasHeight);
  svg.innerHTML = svgMarkup;
}

function setMainLabel(value) {
  const digits = value.replace(/[^0-9]/g, '');
  state.mainLabel = digits || '0';
  if (!state.footerIsCustom) state.footerText = buildFooterText();
  syncFooterField();
  renderBadge();
  saveStateToURL();
}

function setMainImageDataUrl(dataUrl) {
  state.mainImageUrl = dataUrl;
  renderBadge();
}

function handleFooterChange(value) {
  state.footerIsCustom = true;
  state.footerText = value;
  renderBadge();
}

function resetFooter() {
  state.footerIsCustom = false;
  state.footerText = buildFooterText();
  syncFooterField();
  renderBadge();
}

function serializeSvg() {
  const clone = svg.cloneNode(true);
  clone.removeAttribute('style');
  const serializer = new XMLSerializer();
  const raw = serializer.serializeToString(clone);
  const withNs = raw.includes('xmlns="http://www.w3.org/2000/svg"')
    ? raw
    : raw.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  const style = `
    <style>
      @font-face {
        font-family: 'IBM Plex Mono';
        font-style: normal;
        font-weight: 700;
        font-display: block;
        src: url(data:font/woff2;base64,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);
      }
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 700;
        font-display: block;
        src: url(data:font/woff2;base64,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);
      }
      text, tspan { font-family: 'IBM Plex Mono', 'Space Grotesk', sans-serif; }
      .main-text { font-family: 'Space Grotesk', 'IBM Plex Mono', sans-serif; }
      .mono { font-family: 'IBM Plex Mono', 'Space Grotesk', monospace; }
    </style>`;
  const injected = withNs.replace(/<svg([^>]*)>/, `<svg$1><defs>${style}</defs>`);
  return '<?xml version="1.0" encoding="UTF-8"?>' + injected;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function ensureFontsReady() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load("700 44px 'Space Grotesk'"),
      document.fonts.load("700 28px 'IBM Plex Mono'"),
      document.fonts.load("600 16px 'IBM Plex Mono'"),
      document.fonts.load("400 16px 'Space Grotesk'"),
      document.fonts.load("600 16px 'Space Grotesk'"),
    ]);
  }
}

function downloadSvg() {
  Promise.all([ensureFontsReady(), preloadIcons()]).then(() => {
    renderBadge(); // データURL反映
    const svgString = serializeSvg();
    downloadFile('keyspec-badge.svg', svgString, 'image/svg+xml');
  });
}

async function downloadPng(targetWidth) {
  await Promise.all([ensureFontsReady(), preloadIcons()]);
  renderBadge(); // データURL反映
  const svgString = serializeSvg();
  const encoded = encodeURIComponent(svgString);
  const img = new Image();
  img.crossOrigin = 'anonymous';
  const viewWidth = svg.viewBox.baseVal.width || svg.getBoundingClientRect().width;
  const viewHeight = svg.viewBox.baseVal.height || svg.getBoundingClientRect().height;
  const scale = targetWidth / viewWidth;
  img.onload = async () => {
    // 念のため描画前に次フレームまで待機しフォント適用を保証
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = Math.round(viewHeight * scale);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#AAB2AB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'keyspec-badge.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encoded;
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = 'コピーしました';
    setTimeout(() => (btn.textContent = original), 1200);
  });
}

// Event wiring
function wireUI() {
  // Theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Row count buttons
  const rowCountBtns = document.querySelectorAll('.row-count-btn');
  rowCountBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const rows = parseInt(btn.dataset.rows, 10);
      state.rowCount = rows;
      rowCountBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderBadge();
      saveStateToURL();
    });
  });

  document.getElementById('main-label').addEventListener('input', (e) => {
    setMainLabel(e.target.value.toUpperCase());
  });

  mainImageFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setMainImageDataUrl(reader.result);
    reader.readAsDataURL(file);
    mainImageFileInput.value = '';
  });

  document.getElementById('reset-main-image').addEventListener('click', () => {
    state.mainImageUrl = '';
    renderBadge();
  });

  paletteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const icon = findIcon(btn.dataset.iconId);
      if (icon) toggleIcon(icon);
    });
  });

  // multi-add-row（pointing/features）の+/−ボタン
  document.querySelectorAll('.multi-add-row').forEach((row) => {
    const iconId = row.dataset.iconId;
    const icon = findIcon(iconId);
    if (!icon) return;

    const minusBtn = row.querySelector('.count-btn.minus');
    const plusBtn = row.querySelector('.count-btn.plus');

    if (minusBtn) {
      minusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (minusBtn.disabled) return;
        const idx = state.selectedIcons.findIndex((i) => i.id === iconId);
        if (idx >= 0) {
          state.selectedIcons.splice(idx, 1);
          if (!state.selectedIcons.some(i => i.id === iconId)) {
            state.notSupportedIcons.delete(iconId);
          }
          finalizeSelection();
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        state.selectedIcons.push(icon);
        finalizeSelection();
      });
    }

    const moduleBtn = row.querySelector('.module-btn');
    if (moduleBtn) {
      moduleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.moduleIcons.has(iconId)) {
          state.moduleIcons.delete(iconId);
        } else {
          state.moduleIcons.add(iconId);
        }
        updateModuleButtonUI();
        renderBadge();
        saveStateToURL();
      });
    }
  });

  document.querySelectorAll('[data-custom-category]').forEach((btn) => {
    btn.addEventListener('click', () => startCustomIcon(btn.dataset.customCategory));
  });

  document.querySelectorAll('.segmented button').forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
  });

  // キーピッチ入力を即時反映
  document.getElementById('pitch-input').addEventListener('input', setPitch);
  document.getElementById('pitch-abbr').addEventListener('input', setPitch);

  footerField.addEventListener('input', (e) => handleFooterChange(e.target.value));
  document.getElementById('reset-footer').addEventListener('click', resetFooter);

  // 電池テキスト入力
  const batteryTextEl = document.getElementById('battery-text');
  if (batteryTextEl) {
    batteryTextEl.addEventListener('input', (e) => {
      state.batteryText = e.target.value || 'AAA';
      renderBadge();
      saveStateToURL();
    });
  }

  // 共有ボタン
  const shareBtn = document.getElementById('share-url-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const success = await copyShareURL();
      const lang = state.language || getCurrentLanguage();
      const message = success ? t('share.copied', lang) : t('share.failed', lang);

      // 一時的にボタンのテキストを変更してフィードバック
      const originalText = shareBtn.textContent;
      shareBtn.textContent = message;
      shareBtn.disabled = true;

      setTimeout(() => {
        shareBtn.textContent = originalText;
        shareBtn.disabled = false;
      }, 2000);
    });
  }

  const downloadImgBtn = document.getElementById('download-image');
  if (downloadImgBtn) downloadImgBtn.addEventListener('click', () => downloadPng(2000));

  customIconFileInput.addEventListener('change', (e) => {
    const cat = customIconFileInput.dataset.cat;
    const file = e.target.files?.[0];
    if (!cat || !file) return;
    const reader = new FileReader();
    reader.onload = () => finishCustomIcon(cat, reader.result);
    reader.readAsDataURL(file);
    customIconFileInput.value = '';
  });

  // Freeform icon controls
  const freeformAddImageBtn = document.getElementById('freeform-add-image');
  const freeformAddTextBtn = document.getElementById('freeform-add-text');
  const freeformFileInput = document.getElementById('freeform-icon-file');
  const freeformCancelBtn = document.getElementById('freeform-cancel-btn');
  const freeformConfirmBtn = document.getElementById('freeform-confirm-btn');

  if (freeformAddImageBtn) {
    freeformAddImageBtn.addEventListener('click', () => {
      if (freeformFileInput) {
        freeformFileInput.click();
      }
    });
  }

  if (freeformAddTextBtn) {
    freeformAddTextBtn.addEventListener('click', () => {
      showFreeformInputForm('text');
    });
  }

  if (freeformFileInput) {
    freeformFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => showFreeformInputForm('image', reader.result);
      reader.readAsDataURL(file);
      freeformFileInput.value = '';
    });
  }

  if (freeformCancelBtn) {
    freeformCancelBtn.addEventListener('click', hideFreeformInputForm);
  }

  if (freeformConfirmBtn) {
    freeformConfirmBtn.addEventListener('click', confirmFreeformIcon);
  }
}

function loadIconPreviews() {
  // 通常のパレットボタン
  paletteButtons.forEach((btn) => {
    const iconId = btn.dataset.iconId;
    if (!iconId) return;

    const iconPreview = btn.querySelector('.icon-preview');
    if (!iconPreview) return;

    const filename = iconFileMap[iconId] || `${iconId}.png`;
    const iconUrl = iconDataUrlCache[filename] || `./public/${filename}`;

    iconPreview.style.backgroundImage = `url(${iconUrl})`;
  });

  // multi-add-row（pointing/features）
  document.querySelectorAll('.multi-add-row').forEach((row) => {
    const iconId = row.dataset.iconId;
    if (!iconId) return;

    const iconPreview = row.querySelector('.icon-preview');
    if (!iconPreview) return;

    const filename = iconFileMap[iconId] || `${iconId}.png`;
    const iconUrl = iconDataUrlCache[filename] || `./public/${filename}`;

    iconPreview.style.backgroundImage = `url(${iconUrl})`;
  });
}

function init() {
  // localStorageからテーマを復元
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    state.theme = savedTheme;
  }
  // テーマを適用（UIの更新も行う）
  setTheme(state.theme);

  // 国際化を初期化
  initI18n();

  // 言語変更イベントをリスニング
  window.addEventListener('languagechange', (e) => {
    state.language = e.detail.lang;
    updatePaletteUI();
  });

  preloadIcons().then(() => {
    renderBadge();
    loadIconPreviews();
  });

  // URLパラメータから状態を復元（URLがある場合）
  const hasUrlParams = loadStateFromURL();

  // URLパラメータがない場合のみデフォルト値を設定
  if (!hasUrlParams) {
    bootstrapDefaults();
  }

  updatePaletteUI();
  renderBadge();
  syncFooterField();
  wireUI();
  // フォント読み込み後に再描画して表示/出力のフォント差異を防ぐ
  ensureFontsReady().then(renderBadge);
}

init();
