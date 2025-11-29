// 翻訳データ
export const translations = {
  ja: {
    // ヘッダー
    'header.eyebrow': 'KeySpec Generator',
    'header.title': '自作キーボードのスペックバッジを即生成',
    'header.lede': '左のフォームを設定すると右のバッジがリアルタイムで更新されます。',

    // メインラベル
    'main.label': 'キー数（メイン表示）',
    'main.placeholder': '42',
    'main.hint': '例: 42 / 60% / TKL（画像未指定ならここを表示）',
    'main.upload': '画像をアップロード',
    'main.reset': '画像をクリア',
    'main.imageHint': 'アップロードした画像を中央円に表示。未設定ならキー数テキスト。',

    // キーピッチ
    'pitch.label': 'キーピッチ',
    'pitch.set': 'セット',
    'pitch.abbr': '帯テキスト（デフォルト KP / 任意文字可）',
    'pitch.hint': 'ピッチは自由入力。下帯は任意テキストを設定可。',

    // アイコンパレット
    'palette.label': '属性アイコン（カテゴリ別・固定並び）',
    'palette.hint': 'カテゴリごとに1つを選択（ピッチは右で入力）。並び順は固定。',
    'palette.custom': 'カスタム画像',
    'palette.unselected': 'このカテゴリは未選択です。',

    // カテゴリ
    'category.shape': '形状 (Shape)',
    'category.layout': '配列 (Layout)',
    'category.connect': '接続 (Connect)',
    'category.compat': '互換性 (Switch / Keycap)',
    'category.pointing': 'ポインティング (Pointing)',
    'category.firmware': 'ファームウェア (Firmware)',
    'category.features': '拡張機能 (Features)',

    // アイコン説明
    'icon.shape-split.desc': '左右ユニットが分離し肩幅に合わせられるため、手首負担を減らしやすい。',
    'icon.shape-unibody.desc': '一枚板の筐体で取り回しが良く、剛性や打鍵音を安定させやすい。',
    'icon.shape-macropad.desc': 'テンキー/ファンクションなど補助用途に特化した小型キーボード。',
    'icon.stagger-row.desc': '横方向に段差をつけた一般的配列。通常キーボードから移行しやすい。',
    'icon.stagger-column.desc': '縦方向に段差をつけ指の長さに合わせた配列で、移動量を減らしやすい。',
    'icon.layout-or.desc': 'キーが格子状に縦横まっすぐ並ぶ配列。',
    'icon.layout-alice.desc': '一体型で中央が開いたハの字配列。自然な手首角度を取りやすい。',
    'icon.layout-grin.desc': 'エルゴ性を重視した独自特殊配列。',
    'icon.connect-wr.desc': 'USBなど有線で接続し、電源・通信が安定。',
    'icon.connect-wl.desc': 'Bluetooth/2.4GHzなど完全無線。ケーブルレス運用。',
    'icon.connect-halfwired.desc': 'PCとの通信は無線だが、それ以外の場所でケーブル接続が必要。主にBluetooth接続の分割キーボードで採用される構成。',
    'icon.compat-mx.desc': '十字軸。一般的なMX規格キーキャップと互換性がある。',
    'icon.compat-chocv1.desc': '薄型Choc v1専用。MXやChoc v2とは非互換のロープロ仕様。',
    'icon.compat-chocv2.desc': 'Choc v2専用キーキャップと互換。v1/MXとは非互換。',
    'icon.pointing-tb.desc': '親指や指先でボールを回しホームポジションからカーソル操作。',
    'icon.pointing-tp.desc': 'キー間のスティックで小さな力でも精密にカーソル操作できる。',
    'icon.pointing-td.desc': '指でなぞりカーソル移動やジェスチャー操作が可能。',
    'icon.firmware-qmk.desc': '有線で広く使われる多機能OSSファームウェア。',
    'icon.firmware-zmk.desc': '無線や省電力構成に適したモダンOSSファームウェア。',
    'icon.firmware-via.desc': 'GUIでキーマップ編集ができる設定ツール。対応ファームで動作。',
    'icon.firmware-vial.desc': 'VIA互換の上位版。より多機能でセキュアなキーマップ管理が可能。',
    'icon.feature-ec.desc': '回転ノブで音量/スクロール/レイヤー切替などに割り当て可能。',
    'icon.feature-dp.desc': 'OLED/電子ペーパー等でレイヤー・バッテリー・ロゴを表示。',

    // 選択済みアイコン
    'selected.label': '選択済みアイコン',

    // フッター
    'footer.label': '下部帯テキスト',
    'footer.reset': '自動生成に戻す',
    'footer.hint': '自動: メイン + 略称を " - " で連結',

    // ボタン
    'button.download': '保存',
    'button.themeToggle': 'テーマ切り替え',
  },

  en: {
    // Header
    'header.eyebrow': 'KeySpec Generator',
    'header.title': 'Instantly Generate Custom Keyboard Spec Badges',
    'header.lede': 'Configure the form on the left and the badge updates in real-time on the right.',

    // Main label
    'main.label': 'Key Count (Main Display)',
    'main.placeholder': '42',
    'main.hint': 'e.g. 42 / 60% / TKL (shown when no image is set)',
    'main.upload': 'Upload Image',
    'main.reset': 'Clear Image',
    'main.imageHint': 'Uploaded image will be shown in center circle. Text shown if not set.',

    // Key pitch
    'pitch.label': 'Key Pitch',
    'pitch.set': 'Set',
    'pitch.abbr': 'Band Text (Default: KP / Custom allowed)',
    'pitch.hint': 'Pitch is free input. Lower band accepts custom text.',

    // Icon palette
    'palette.label': 'Attribute Icons (by category, fixed order)',
    'palette.hint': 'Select one per category (pitch entered on right). Order is fixed.',
    'palette.custom': 'Custom Image',
    'palette.unselected': 'This category is not selected.',

    // Categories
    'category.shape': 'Shape',
    'category.layout': 'Layout',
    'category.connect': 'Connection',
    'category.compat': 'Compatibility (Switch / Keycap)',
    'category.pointing': 'Pointing Device',
    'category.firmware': 'Firmware',
    'category.features': 'Features',

    // Icon descriptions
    'icon.shape-split.desc': 'Left and right units are separated, allowing adjustment to shoulder width to reduce wrist strain.',
    'icon.shape-unibody.desc': 'Single-piece case for easy handling, stable rigidity and typing sound.',
    'icon.shape-macropad.desc': 'Small keyboard specialized for auxiliary purposes like numpad/function keys.',
    'icon.stagger-row.desc': 'Common layout with horizontal offset. Easy transition from standard keyboards.',
    'icon.stagger-column.desc': 'Vertical offset matching finger lengths, reducing finger travel distance.',
    'icon.layout-or.desc': 'Keys arranged in a straight grid pattern both vertically and horizontally.',
    'icon.layout-alice.desc': 'Unified layout with open center in V-shape. Easier to maintain natural wrist angle.',
    'icon.layout-grin.desc': 'Unique special layout focusing on ergonomics.',
    'icon.connect-wr.desc': 'Wired connection via USB etc., providing stable power and communication.',
    'icon.connect-wl.desc': 'Fully wireless via Bluetooth/2.4GHz. Cable-free operation.',
    'icon.connect-halfwired.desc': 'Wireless connection to PC, but requires cable elsewhere. Commonly used in Bluetooth split keyboards.',
    'icon.compat-mx.desc': 'Cross-stem. Compatible with standard MX keycaps.',
    'icon.compat-chocv1.desc': 'Low-profile Choc v1 exclusive. Incompatible with MX and Choc v2.',
    'icon.compat-chocv2.desc': 'Compatible with Choc v2 keycaps. Incompatible with v1/MX.',
    'icon.pointing-tb.desc': 'Roll ball with thumb or fingertip for cursor control from home position.',
    'icon.pointing-tp.desc': 'Stick between keys allows precise cursor control with minimal force.',
    'icon.pointing-td.desc': 'Swipe finger for cursor movement and gesture operations.',
    'icon.firmware-qmk.desc': 'Feature-rich OSS firmware widely used for wired keyboards.',
    'icon.firmware-zmk.desc': 'Modern OSS firmware suitable for wireless and low-power configurations.',
    'icon.firmware-via.desc': 'GUI-based keymap editing tool. Works with compatible firmware.',
    'icon.firmware-vial.desc': 'VIA-compatible advanced version. More features and secure keymap management.',
    'icon.feature-ec.desc': 'Rotary knob assignable to volume/scroll/layer switching etc.',
    'icon.feature-dp.desc': 'Display layer/battery/logo on OLED/e-paper etc.',

    // Selected icons
    'selected.label': 'Selected Icons',

    // Footer
    'footer.label': 'Footer Text',
    'footer.reset': 'Reset to Auto-Generate',
    'footer.hint': 'Auto: Main + abbreviations joined with " - "',

    // Buttons
    'button.download': 'Save',
    'button.themeToggle': 'Toggle Theme',
  }
};

// 現在の言語を取得（localStorageから、なければブラウザ言語から判定）
export function getCurrentLanguage() {
  const saved = localStorage.getItem('language');
  if (saved && (saved === 'ja' || saved === 'en')) {
    return saved;
  }

  // ブラウザの言語設定から判定
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('ja') ? 'ja' : 'en';
}

// 言語を設定
export function setLanguage(lang) {
  if (lang !== 'ja' && lang !== 'en') {
    lang = 'ja';
  }
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  updateUI(lang);
}

// UIを更新
function updateUI(lang) {
  const t = translations[lang];

  // data-i18n属性を持つ要素を更新
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' && el.type !== 'file') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = t[key];
        } else {
          el.value = t[key];
        }
      } else {
        el.textContent = t[key];
      }
    }
  });

  // data-i18n-placeholder属性を持つ要素のplaceholderを更新
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // data-i18n-aria属性を持つ要素のaria-labelを更新
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key]) {
      el.setAttribute('aria-label', t[key]);
    }
  });

  // data-i18n-hint属性を持つ.hint要素を更新
  document.querySelectorAll('[data-i18n-hint]').forEach(el => {
    const key = el.getAttribute('data-i18n-hint');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}

// 翻訳テキストを取得
export function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  return translations[currentLang][key] || key;
}

// 初期化
export function initI18n() {
  const currentLang = getCurrentLanguage();
  setLanguage(currentLang);

  // 言語切り替えボタンのイベントリスナー
  const langToggle = document.getElementById('lang-toggle-btn');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = getCurrentLanguage() === 'ja' ? 'en' : 'ja';
      setLanguage(newLang);

      // ボタンのテキストを更新
      langToggle.querySelector('.lang-text').textContent = newLang === 'ja' ? 'EN' : 'JA';

      // カスタムイベントを発火して、他のコンポーネントに言語変更を通知
      window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: newLang } }));
    });

    // 初期表示のボタンテキスト
    langToggle.querySelector('.lang-text').textContent = currentLang === 'ja' ? 'EN' : 'JA';
  }
}
