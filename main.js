const palette = [
  { id: 'shape-split', category: 'shape', label: 'Split', abbr: 'SP' },
  { id: 'shape-unibody', category: 'shape', label: 'Unibody', abbr: 'UB' },
  { id: 'shape-alice', category: 'shape', label: 'Alice', abbr: 'AL' },
  { id: 'layout-rs', category: 'layout', label: 'Row-Stag', abbr: 'RS' },
  { id: 'layout-cs', category: 'layout', label: 'Col-Stag', abbr: 'CS' },
  { id: 'layout-or', category: 'layout', label: 'Ortho', abbr: 'OR' },
  { id: 'connect-wr', category: 'connect', label: 'Wired', abbr: 'WR' },
  { id: 'connect-wl', category: 'connect', label: 'Wireless', abbr: 'WL' },
  { id: 'switch-mx', category: 'switch', label: 'MX Only', abbr: 'MX' },
  { id: 'switch-ch', category: 'switch', label: 'Choc', abbr: 'CH' },
  { id: 'switch-hs', category: 'switch', label: 'Hotswap', abbr: 'HS' },
  { id: 'extra-tb', category: 'extra', label: 'Trackball', abbr: 'TB' },
  { id: 'extra-ec', category: 'extra', label: 'Encoder', abbr: 'EC' },
  { id: 'extra-dp', category: 'extra', label: 'Display', abbr: 'DP' },
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
const categoryOrder = ['shape', 'pitch', 'layout', 'connect', 'switch', 'extra'];

function bootstrapDefaults() {
  const defaults = [
    findIcon('shape-split'),
    { id: 'pitch', category: 'pitch', label: 'Pitch', abbr: state.pitchValue },
    findIcon('layout-cs'),
    findIcon('connect-wl'),
    findIcon('switch-mx'),
  ].filter(Boolean);
  state.selectedIcons = defaults;
  state.footerText = buildFooterText();
}

function findIcon(id) {
  return palette.find((p) => p.id === id);
}

function renderPalette() {
  paletteBox.innerHTML = '';
  const categories = ['shape', 'layout', 'connect', 'switch', 'extra'];
  const titles = {
    shape: 'Shape',
    layout: 'Layout',
    connect: 'Connect',
    switch: 'Switch',
    extra: 'Extra',
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
    info.innerHTML = `<div class="label">${icon.label || 'Pitch'}</div><div class="meta">${icon.abbr} / ${icon.category}</div>`;

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

  // geometry
  const mainRadius = 60;
  const mainStrokeBlack = 15;
  const mainStrokeBg = 15;
  const mainOuterRadius = mainRadius + mainStrokeBlack / 2 + mainStrokeBg / 2;
  const mainTopLeftOffset = 35;
  const mainCx = mainTopLeftOffset + mainOuterRadius;
  const mainCy = mainTopLeftOffset + mainOuterRadius;
  const mainEffective = mainOuterRadius * 2;

  const attrRadius = 45;
  const attrStroke = 12;
  const attrOuterR = attrRadius + attrStroke / 2;
  const attrSpacing = attrOuterR * 2 + 16; // little gap
  const attrStartX = mainTopLeftOffset + mainEffective + 24 + attrOuterR;
  const attrRowY = mainTopLeftOffset + attrOuterR; // top aligns with main top-left margin

  const contentWidth = icons.length
    ? attrStartX + (icons.length - 1) * attrSpacing + attrOuterR + paddingRight
    : mainTopLeftOffset + mainEffective + paddingRight;
  const width = Math.max(contentWidth, mainTopLeftOffset + mainOuterRadius + paddingRight) + border;

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
    state.mainLabel.toString().toUpperCase().slice(0, 2) || '0',
    ...icons.map((i) => (i.abbr || '').toString().toUpperCase().slice(0, 2)),
  ];

  const svgMarkup = `
    <rect width="${width}" height="${canvasHeight}" fill="${bg}" stroke="${ink}" stroke-width="${border}" />
    <g>
      ${circles}
      <rect x="0" y="${canvasHeight - bandHeight}" width="${width}" height="${bandHeight}" fill="${band}" />
      ${footerPieces
        .map((txt, idx) => {
          const cx = idx === 0 ? mainCx : attrStartX + (idx - 1) * attrSpacing;
          const y = canvasHeight - bandHeight / 2;
          return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="${'IBM Plex Mono'}" font-size="34" font-weight="700" fill="${bandText}" dominant-baseline="middle">${txt}</text>`;
        })
        .join('')}
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainRadius}" fill="#ffffff" stroke="${ink}" stroke-width="${mainStrokeBlack}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainRadius + mainStrokeBlack / 2 + mainStrokeBg / 2}" fill="none" stroke="${bg}" stroke-width="${mainStrokeBg}" />
      <text x="${mainCx}" y="${mainCy + 14}" text-anchor="middle" font-family="${'Space Grotesk'}" font-size="36" font-weight="700" fill="${ink}">${state.mainLabel || '0'}</text>
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
