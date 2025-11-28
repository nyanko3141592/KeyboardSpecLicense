const palette = [
  // 1. 形状 (Shape)
  {
    id: 'shape-split',
    category: 'shape',
    label: 'Split',
    abbr: 'SP',
    description: '左右ユニットが分離し肩幅に合わせられるため、手首負担を減らしやすい。',
  },
  {
    id: 'shape-unibody',
    category: 'shape',
    label: 'Unibody',
    abbr: 'UB',
    description: '一枚板の筐体で取り回しが良く、剛性や打鍵音を安定させやすい。',
  },
  {
    id: 'shape-macropad',
    category: 'shape',
    label: 'MacroPad',
    abbr: 'MP',
    description: 'テンキー/ファンクションなど補助用途に特化した小型キーボード。',
  },

  // 2. スタッガード (Stagger)
  {
    id: 'stagger-row',
    category: 'stagger',
    label: 'Row-staggered',
    abbr: 'RS',
    description: '横方向に段差をつけた一般的配列。通常キーボードから移行しやすい。',
  },
  {
    id: 'stagger-column',
    category: 'stagger',
    label: 'Column-staggered',
    abbr: 'CS',
    description: '縦方向に段差をつけ指の長さに合わせた配列で、移動量を減らしやすい。',
  },
  {
    id: 'stagger-angle',
    category: 'stagger',
    label: 'Angle-staggered',
    abbr: 'AS',
    description: '列ごとに角度や位置を変え、手首の向きに合わせた配列。',
  },
  {
    id: 'stagger-matrix',
    category: 'stagger',
    label: 'Matrix-staggered',
    abbr: 'MS',
    description: '格子をベースに一部のみずらしたハイブリッド配列。',
  },

  // 3. 配列 (Layout)
  {
    id: 'layout-rs',
    category: 'layout',
    label: 'Row-staggered',
    abbr: 'RS',
    description: 'フルサイズ/TKL等で採用される横ずれ配列。',
  },
  {
    id: 'layout-cs',
    category: 'layout',
    label: 'Column-staggered',
    abbr: 'CS',
    description: 'エルゴ分割系で多い縦ずれ配列。',
  },
  {
    id: 'layout-or',
    category: 'layout',
    label: 'Ortholinear',
    abbr: 'OR',
    description: 'キーが格子状に縦横まっすぐ並ぶ配列。',
  },
  {
    id: 'layout-alice',
    category: 'layout',
    label: 'Alice / Arisu',
    abbr: 'AL',
    description: '一体型で中央が開いたハの字配列。自然な手首角度を取りやすい。',
  },
  {
    id: 'layout-grin',
    category: 'layout',
    label: 'GRIN',
    abbr: 'GR',
    description: 'エルゴ性を重視した独自特殊配列。',
  },

  // 4. 接続 (Connect)
  {
    id: 'connect-wr',
    category: 'connect',
    label: 'Wired',
    abbr: 'WR',
    description: 'USBなど有線で接続し、電源・通信が安定。',
  },
  {
    id: 'connect-wl',
    category: 'connect',
    label: 'Wireless',
    abbr: 'WL',
    description: 'Bluetooth/2.4GHzなど完全無線。ケーブルレス運用。',
  },
  {
    id: 'connect-hy',
    category: 'connect',
    label: 'Hybrid',
    abbr: 'HY',
    description: 'PCとは無線、左右ユニット間のみ有線などのハイブリッド。',
  },

  // 5. スイッチ・キーキャップ互換性 (Switch / Keycap Compatibility)
  {
    id: 'compat-mx',
    category: 'compat',
    label: 'Cherry MX',
    abbr: 'MX',
    description: '十字軸。一般的なMX規格キーキャップと互換性がある。',
  },
  {
    id: 'compat-chocv1',
    category: 'compat',
    label: 'Kailh Choc v1',
    abbr: 'C1',
    description: '薄型Choc v1専用。MXやChoc v2とは非互換のロープロ仕様。',
  },
  {
    id: 'compat-chocv2',
    category: 'compat',
    label: 'Kailh Choc v2',
    abbr: 'C2',
    description: 'Choc v2専用キーキャップと互換。v1/MXとは非互換。',
  },

  // 6. ポインティングデバイス (Pointing Device)
  {
    id: 'pointing-tb',
    category: 'pointing',
    label: 'Trackball',
    abbr: 'TB',
    description: '親指や指先でボールを回しホームポジションからカーソル操作。',
  },
  {
    id: 'pointing-tp',
    category: 'pointing',
    label: 'TrackPoint',
    abbr: 'TP',
    description: 'キー間のスティックで小さな力でも精密にカーソル操作できる。',
  },
  {
    id: 'pointing-td',
    category: 'pointing',
    label: 'Trackpad',
    abbr: 'TD',
    description: '指でなぞりカーソル移動やジェスチャー操作が可能。',
  },

  // 7. ファームウェア (Firmware)
  {
    id: 'firmware-qmk',
    category: 'firmware',
    label: 'QMK',
    abbr: 'QK',
    description: '有線で広く使われる多機能OSSファームウェア。',
  },
  {
    id: 'firmware-zmk',
    category: 'firmware',
    label: 'ZMK',
    abbr: 'ZM',
    description: '無線や省電力構成に適したモダンOSSファームウェア。',
  },

  // 8. 拡張機能 (Features)
  {
    id: 'feature-ec',
    category: 'features',
    label: 'Encoder',
    abbr: 'EC',
    description: '回転ノブで音量/スクロール/レイヤー切替などに割り当て可能。',
  },
  {
    id: 'feature-dp',
    category: 'features',
    label: 'Display',
    abbr: 'DP',
    description: 'OLED/電子ペーパー等でレイヤー・バッテリー・ロゴを表示。',
  },
];

const state = {
  mainLabel: '42',
  theme: 'light',
  pitchValue: '19mm',
  selectedIcons: [],
  footerText: '',
  footerIsCustom: false,
};

const paletteBox = document.getElementById('palette');
const selectedList = document.getElementById('selected-list');
const svg = document.getElementById('badge-svg');
const themeChip = document.getElementById('theme-chip');
const footerField = document.getElementById('footer-text');
const categoryOrder = [
  'shape',
  'stagger',
  'layout',
  'pitch',
  'connect',
  'compat',
  'pointing',
  'firmware',
  'features',
];

function bootstrapDefaults() {
  const defaults = [
    findIcon('shape-split'),
    findIcon('stagger-row'),
    findIcon('layout-rs'),
    { id: 'pitch', category: 'pitch', label: 'Pitch', abbr: state.pitchValue },
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

function renderPalette() {
  paletteBox.innerHTML = '';
  const categories = categoryOrder.filter((c) => c !== 'pitch');
  const titles = {
    shape: '形状 (Shape)',
    stagger: 'スタッガード (Stagger)',
    layout: '配列 (Layout)',
    connect: '接続 (Connect)',
    compat: '互換性 (Switch / Keycap)',
    pointing: 'ポインティング (Pointing)',
    firmware: 'ファームウェア (Firmware)',
    features: '拡張機能 (Features)',
  };
  categories.forEach((cat) => {
    const group = document.createElement('div');
    group.className = 'palette-group';
    const h = document.createElement('h3');
    h.textContent = titles[cat];
    group.appendChild(h);
    const grid = document.createElement('div');
    grid.className = 'pill-grid';
    palette
      .filter((i) => i.category === cat)
      .forEach((icon) => {
        const btn = document.createElement('button');
        btn.textContent = `${icon.label} · ${icon.abbr}`;
        btn.dataset.id = icon.id;
        btn.classList.toggle('active', isSelected(icon.id));
        btn.addEventListener('click', () => toggleIcon(icon));
        grid.appendChild(btn);
      });
    group.appendChild(grid);

    const selected = state.selectedIcons.find((i) => i.category === cat);
    const desc = document.createElement('div');
    desc.className = 'group-desc';
    desc.textContent = selected
      ? `${selected.label} (${selected.abbr}) — ${selected.description || ''}`
      : 'このカテゴリは未選択です。';
    group.appendChild(desc);

    paletteBox.appendChild(group);
  });
}

function isSelected(id) {
  return state.selectedIcons.some((i) => i.id === id);
}

function toggleIcon(icon) {
  const existingIndex = state.selectedIcons.findIndex((i) => i.id === icon.id);
  if (existingIndex >= 0) {
    state.selectedIcons.splice(existingIndex, 1);
  } else {
    const sameCategoryIndex = state.selectedIcons.findIndex(
      (i) => i.category === icon.category && i.category !== 'pitch'
    );
    if (sameCategoryIndex >= 0) {
      state.selectedIcons.splice(sameCategoryIndex, 1, icon);
    } else {
      state.selectedIcons.push(icon);
    }
  }
  if (!state.footerIsCustom) state.footerText = buildFooterText();
  renderPalette();
  renderSelected();
  renderBadge();
  syncFooterField();
}

function setPitch() {
  const value = document.getElementById('pitch-input').value.trim();
  if (!value) return;
  state.pitchValue = value;
  const payload = { id: 'pitch', category: 'pitch', label: 'Pitch', abbr: value };
  const existingIndex = state.selectedIcons.findIndex((i) => i.category === 'pitch');
  if (existingIndex >= 0) {
    state.selectedIcons.splice(existingIndex, 1, payload);
  } else {
    state.selectedIcons.push(payload);
  }
  if (!state.footerIsCustom) state.footerText = buildFooterText();
  renderSelected();
  renderBadge();
  syncFooterField();
}

function renderSelected() {
  selectedList.innerHTML = '';
  const ordered = getOrderedIcons();
  ordered.forEach((icon, index) => {
    const li = document.createElement('li');
    const info = document.createElement('div');
    const desc = icon.description ? `<div class="desc">${icon.description}</div>` : '';
    info.innerHTML = `<div class="label">${icon.label || 'Pitch'}</div><div class="meta">${icon.abbr} / ${icon.category}</div>${desc}`;

    const remove = document.createElement('button');
    remove.textContent = '削除';
    remove.addEventListener('click', () => {
      const idx = state.selectedIcons.findIndex((i) => i.id === icon.id);
      if (idx >= 0) state.selectedIcons.splice(idx, 1);
      if (!state.footerIsCustom) state.footerText = buildFooterText();
      renderSelected();
      renderBadge();
      renderPalette();
      syncFooterField();
    });

    li.appendChild(info);
    li.appendChild(remove);
    selectedList.appendChild(li);
  });
}

// ordering helper
function getOrderedIcons() {
  return [...state.selectedIcons].sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );
}

function setTheme(theme) {
  state.theme = theme;
  document.body.classList.toggle('dark', theme === 'dark');
  document.querySelectorAll('.segmented button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  themeChip.textContent = theme.toUpperCase();
  renderBadge();
}

function buildFooterText() {
  const formatAbbr = (abbr) => {
    if (!abbr) return '';
    return abbr.toString().toUpperCase().slice(0, 2);
  };
  const pieces = getOrderedIcons().map((i) => formatAbbr(i.abbr));
  return pieces.filter(Boolean).join(' ');
}

function syncFooterField() {
  footerField.value = state.footerText;
}

function renderBadge() {
  const icons = getOrderedIcons();
  const canvasHeight = 200;
  const bandHeight = 60;
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
  const mainCx = leftOffset + mainBlackOuterRadius;
  const mainCy = topMargin + mainBlackOuterRadius; // black ring top = topMargin
  const mainEffective = mainBgOuterRadius * 2;

  const attrRadius = 45; // white core radius => 90px diameter
  const attrStroke = 12;
  const attrOuterR = attrRadius + attrStroke / 2;
  const attrSpacing = attrOuterR * 2 + 8; // reduced gap
  const attrStartX = leftOffset + mainEffective + 12 + attrOuterR;
  const attrRowY = topMargin + attrOuterR; // align tops of black strokes with topMargin

  const contentWidth = icons.length
    ? attrStartX + (icons.length - 1) * attrSpacing + attrOuterR + paddingRight
    : leftOffset + mainEffective + paddingRight;
  const width = Math.max(contentWidth, leftOffset + mainBgOuterRadius + paddingRight) + border;

  const circles = icons
    .map((icon, i) => {
      const cx = attrStartX + i * attrSpacing;
      const clipId = `clip-${icon.id}-${i}`;
      const href = `public/${icon.id}.png`;
      const innerR = attrRadius - 6;
      return `
        <g aria-label="${icon.label}">
          <defs>
            <clipPath id="${clipId}">
              <circle cx="${cx}" cy="${attrRowY}" r="${innerR}" />
            </clipPath>
          </defs>
          <circle cx="${cx}" cy="${attrRowY}" r="${attrRadius}" fill="#ffffff" stroke="${ink}" stroke-width="${attrStroke}" />
          <image href="${href}" x="${cx - innerR}" y="${attrRowY - innerR}" width="${innerR * 2}" height="${innerR * 2}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice" />
        </g>
      `;
    })
    .join('');

  const footerPieces = [
    ...icons.map((i) => (i.abbr || '').toString().toUpperCase().slice(0, 2)),
  ];

  const svgMarkup = `
    <rect width="${width}" height="${canvasHeight}" fill="${bg}" />
    <g>
      ${circles}
      <rect x="0" y="${canvasHeight - bandHeight}" width="${width}" height="${bandHeight}" fill="${band}" />
      ${footerPieces
        .map((txt, idx) => {
          const cx = attrStartX + idx * attrSpacing;
          const y = canvasHeight - bandHeight / 2;
          return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="${'IBM Plex Mono'}" font-size="34" font-weight="700" fill="${bandText}" dominant-baseline="middle">${txt}</text>`;
        })
        .join('')}
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainBgOuterRadius}" fill="${bg}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainBlackOuterRadius}" fill="${ink}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainWhiteRadius}" fill="#ffffff" />
      <text x="${mainCx}" y="${mainCy + 14}" text-anchor="middle" font-family="${'Space Grotesk'}" font-size="36" font-weight="700" fill="${ink}">${state.mainLabel || '0'}</text>
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
  return '<?xml version="1.0" encoding="UTF-8"?>' + withNs;
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

function downloadSvg() {
  const svgString = serializeSvg();
  downloadFile('keyspec-badge.svg', svgString, 'image/svg+xml');
}

function downloadPng(targetWidth) {
  const svgString = serializeSvg();
  const encoded = encodeURIComponent(svgString);
  const img = new Image();
  const viewWidth = svg.viewBox.baseVal.width || svg.getBoundingClientRect().width;
  const viewHeight = svg.viewBox.baseVal.height || svg.getBoundingClientRect().height;
  const scale = targetWidth / viewWidth;
  img.onload = () => {
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
  document.getElementById('main-label').addEventListener('input', (e) => {
    setMainLabel(e.target.value.toUpperCase());
  });

  document.querySelectorAll('.segmented button').forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
  });

  document.getElementById('set-pitch').addEventListener('click', setPitch);

  footerField.addEventListener('input', (e) => handleFooterChange(e.target.value));
  document.getElementById('reset-footer').addEventListener('click', resetFooter);

  document.getElementById('download-svg').addEventListener('click', downloadSvg);
  document.querySelectorAll('button[data-png]').forEach((btn) => {
    btn.addEventListener('click', () => downloadPng(Number(btn.dataset.png)));
  });

  document.getElementById('copy-markdown').addEventListener('click', (e) => {
    const md = '![KeySpec badge](./keyspec-badge.png)';
    copyText(md, e.target);
  });
  document.getElementById('copy-html').addEventListener('click', (e) => {
    const html = '<img src="./keyspec-badge.png" alt="KeySpec badge" width="800" />';
    copyText(html, e.target);
  });
}

function init() {
  bootstrapDefaults();
  renderPalette();
  renderSelected();
  renderBadge();
  syncFooterField();
  wireUI();
}

init();
