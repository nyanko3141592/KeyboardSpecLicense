const state = {
  mainLabel: '42',
  theme: 'light',
  pitchValue: '19mm',
  pitchAbbr: 'KP',
  mainImageUrl: '',
  customIconMap: {},
  selectedIcons: [],
  footerText: '',
  footerIsCustom: false,
};

const paletteButtons = Array.from(document.querySelectorAll('[data-icon-id]'));
const palette = paletteButtons.map((btn) => ({
  id: btn.dataset.iconId,
  category: btn.dataset.category,
  label: btn.dataset.label,
  abbr: btn.dataset.abbr,
  description: btn.dataset.description || '',
}));

const selectedList = document.getElementById('selected-list');
const svg = document.getElementById('badge-svg');
const footerField = document.getElementById('footer-text');
const mainImageFileInput = document.getElementById('main-image-file');
const customIconFileInput = document.getElementById('custom-icon-file');
const iconFileMap = {
  'firmware-qmk': 'firm-qmk.png',
  'firmware-zmk': 'firm-zmk.png',
  'compat-mx': 'switch-mx.png',
  'feature-ec': 'extra-ec.png',
  'feature-dp': 'extra-dp.png',
};
const categoryOrder = [
  'shape',
  'layout',
  'pitch',
  'connect',
  'compat',
  'pointing',
  'firmware',
  'features',
];
const multiSelectCategories = new Set(['connect', 'compat', 'pointing', 'firmware', 'features']);

function startCustomIcon(category) {
  if (customIconFileInput) {
    customIconFileInput.dataset.cat = category;
    customIconFileInput.click();
  }
}

function finishCustomIcon(category, src) {
  const abbr = prompt('帯に入れる略称（2-4文字推奨）', 'CU') || 'CU';
  const icon = {
    id: `custom-${category}`,
    category,
    label: 'Custom',
    abbr,
    description: 'ユーザー指定アイコン',
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

  paletteButtons.forEach((btn) => {
    btn.classList.toggle('active', selectedIds.has(btn.dataset.iconId));
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
      descEl.innerHTML = selected
        .map((s) => `<div>${s.label} (${s.abbr}) — ${s.description || ''}</div>`)
        .join('');
    } else {
      descEl.textContent = 'このカテゴリは未選択です。';
    }
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
  renderSelected();
  renderBadge();
  syncFooterField();
}

function setPitch() {
  const value = document.getElementById('pitch-input').value.trim();
  const abbr = document.getElementById('pitch-abbr').value.trim() || 'KP';
  if (!value) return;
  state.pitchValue = value;
  state.pitchAbbr = abbr;
  const payload = { id: 'pitch', category: 'pitch', label: 'Pitch', abbr, value };
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
      updatePaletteUI();
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

function getVisualSlots() {
  const slots = [];
  categoryOrder.forEach((cat) => {
    const items = state.selectedIcons.filter((i) => i.category === cat);
    if (!items.length) return;
    const allowMulti = multiSelectCategories.has(cat);
    if (cat === 'pitch' || !allowMulti || items.length === 1) {
      slots.push({ category: cat, items: [items[0]] });
    } else {
      slots.push({ category: cat, items });
    }
  });
  return slots;
}

function resolveIconHref(id) {
  if (state.customIconMap[id]) return state.customIconMap[id];
  const filename = iconFileMap[id] || `${id}.png`;
  return `./public/${filename}`;
}

function setTheme(theme) {
  state.theme = theme;
  document.body.classList.toggle('dark', theme === 'dark');

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

  const contentWidth = slots.length
    ? attrStartX + (slots.length - 1) * attrSpacing + attrOuterR + paddingRight
    : leftOffset + mainEffective + paddingRight;
  const width = Math.max(contentWidth, leftOffset + mainBgOuterRadius + paddingRight) + border;

  const circles = slots
    .map((slot, i) => {
      const cx = attrStartX + i * attrSpacing;
      const innerR = attrRadius - 6;
      const isMulti = slot.items.length > 1;
      const clipRoot = `clip-${slot.category}-${i}`;

      const defs = isMulti
        ? slot.items
          .map((item, segIdx) => {
            const segCount = slot.items.length;
            const anglePer = (Math.PI * 2) / segCount;
            const start = -Math.PI / 2 + anglePer * segIdx;
            const end = start + anglePer;
            const id = `${clipRoot}-${segIdx}`;
            return `<clipPath id="${id}"><path d="${describeWedge(cx, attrRowY, innerR, start, end)}" /></clipPath>`;
          })
          .join('')
        : `<clipPath id="${clipRoot}"><circle cx="${cx}" cy="${attrRowY}" r="${innerR}" /></clipPath>`;

      const images = isMulti
        ? slot.items
          .map((item, segIdx) => {
            const id = `${clipRoot}-${segIdx}`;
            return `<image href="${resolveIconHref(item.id)}" x="${cx - innerR}" y="${attrRowY - innerR}" width="${innerR * 2}" height="${innerR * 2}" clip-path="url(#${id})" preserveAspectRatio="xMidYMid slice" />`;
          })
          .join('')
        : slot.items[0].id === 'pitch'
          ? `<text x="${cx}" y="${attrRowY}" text-anchor="middle" font-family="${'IBM Plex Mono'}" font-size="28" font-weight="700" fill="${ink}" dominant-baseline="middle">${slot.items[0].value || slot.items[0].abbr}</text>`
          : `<image href="${resolveIconHref(slot.items[0].id)}" x="${cx - innerR}" y="${attrRowY - innerR}" width="${innerR * 2}" height="${innerR * 2}" clip-path="url(#${clipRoot})" preserveAspectRatio="xMidYMid slice" />`;

      const spokes = isMulti
        ? slot.items
          .map((_, segIdx) => {
            const segCount = slot.items.length;
            const anglePer = (Math.PI * 2) / segCount;
            const angle = -Math.PI / 2 + anglePer * segIdx;
            const x = cx + innerR * Math.cos(angle);
            const y = attrRowY + innerR * Math.sin(angle);
            return `<line x1="${cx}" y1="${attrRowY}" x2="${x}" y2="${y}" stroke="${ink}" stroke-width="1" />`;
          })
          .join('')
        : '';

      return `
        <g aria-label="${slot.items.map((s) => s.label).join(' / ')}">
          <defs>${defs}</defs>
          <circle cx="${cx}" cy="${attrRowY}" r="${attrRadius}" fill="#ffffff" stroke="${ink}" stroke-width="${attrStroke}" />
          ${images}
          ${spokes}
        </g>
      `;
    })
    .join('');

  const footerPieces = slots.map((slot) => slot.items.map((i) => formatAbbr(i.abbr)).filter(Boolean));

  const svgMarkup = `
    <rect width="${width}" height="${canvasHeight}" fill="${bg}" />
    <g>
      ${circles}
      <rect x="0" y="${canvasHeight - bandHeight}" width="${width}" height="${bandHeight}" fill="${band}" />
      ${footerPieces
      .map((lines, idx) => {
        if (!lines.length) return '';
        const cx = attrStartX + idx * attrSpacing;
        const centerY = canvasHeight - bandHeight / 2;
        const maxBandInner = bandHeight * 0.8;
        const fontSize = Math.min(26, Math.max(14, maxBandInner / lines.length));
        const lineHeight = fontSize + 4;
        const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
        const tspans = lines
          .map(
            (txt, lineIdx) =>
              `<tspan x="${cx}" y="${startY + lineIdx * lineHeight}">${txt}</tspan>`
          )
          .join('');
        return `<text x="${cx}" y="${startY}" text-anchor="middle" font-family="${'IBM Plex Mono'}" font-size="${fontSize}" font-weight="700" fill="${bandText}">${tspans}</text>`;
      })
      .join('')}
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainBgOuterRadius}" fill="${bg}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainBlackOuterRadius}" fill="${ink}" />
      <circle cx="${mainCx}" cy="${mainCy}" r="${mainWhiteRadius}" fill="#ffffff" />
      ${state.mainImageUrl
      ? `<defs><clipPath id="main-clip"><circle cx="${mainCx}" cy="${mainCy}" r="${mainWhiteRadius - 4}" /></clipPath></defs>
           <image href="${state.mainImageUrl}" x="${mainCx - (mainWhiteRadius - 4)}" y="${mainCy - (mainWhiteRadius - 4)}" width="${(mainWhiteRadius - 4) * 2}" height="${(mainWhiteRadius - 4) * 2}" clip-path="url(#main-clip)" preserveAspectRatio="xMidYMid slice" />`
      : `<text x="${mainCx}" y="${mainCy + 10}" text-anchor="middle" font-family="${'Space Grotesk'}" font-size="44" font-weight="700" fill="${ink}" dominant-baseline="middle">${state.mainLabel || '0'}</text>`}
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
  // Theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

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

  document.querySelectorAll('[data-custom-category]').forEach((btn) => {
    btn.addEventListener('click', () => startCustomIcon(btn.dataset.customCategory));
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

  customIconFileInput.addEventListener('change', (e) => {
    const cat = customIconFileInput.dataset.cat;
    const file = e.target.files?.[0];
    if (!cat || !file) return;
    const reader = new FileReader();
    reader.onload = () => finishCustomIcon(cat, reader.result);
    reader.readAsDataURL(file);
    customIconFileInput.value = '';
  });
}

function init() {
  bootstrapDefaults();
  updatePaletteUI();
  renderSelected();
  renderBadge();
  syncFooterField();
  wireUI();
}

init();
