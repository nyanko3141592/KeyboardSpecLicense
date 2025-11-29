# KeySpec Generator

自作キーボードのスペックバッジを簡単に生成できるWebアプリケーションです。

**🌐 Live Demo:** [https://nyanko3141592.github.io/KeyboardSpecLicense/](https://nyanko3141592.github.io/KeyboardSpecLicense/)

## 🎯 特徴

- **リアルタイムプレビュー** - 設定を変更すると即座にバッジが更新されます
- **カスタマイズ可能** - キー数、ピッチ、属性アイコン、フッターテキストをカスタマイズ
- **画像対応** - メインラベルやアイコンに独自の画像をアップロード可能
- **ダーク/ライトモード** - お好みのテーマを選択して永続保存
- **多言語対応** - 日本語・英語に対応（自動検出 & 手動切り替え）
- **URL共有** - 現在の設定を含むURLを生成して共有可能
- **PNG書き出し** - 高解像度のPNG画像として保存可能

## 🚀 使い方

### 基本的な使い方

1. **キー数を設定**
   - 左側のフォームで「キー数（メイン表示）」を入力
   - または画像をアップロードして中央円に表示

2. **キーピッチを設定**
   - キーピッチ（例: 19mm）を入力
   - 帯テキストの略称（例: KP）をカスタマイズ可能

3. **属性アイコンを選択**
   - 以下のカテゴリから選択：
     - **形状**: Split / Unibody / MacroPad
     - **配列**: Row-staggered / Column-staggered / Ortholinear / Alice・Arisu / GRIN
     - **接続**: Wired / Wireless / HalfWired
     - **互換性**: Cherry MX / Kailh Choc v1 / Kailh Choc v2
     - **ポインティング**: Trackball / TrackPoint / Trackpad
     - **ファームウェア**: QMK / ZMK
     - **拡張機能**: Encoder / Display
     - **電池形式**: AAA（乾電池） / LiPo（リポバッテリー）

4. **フッターテキストをカスタマイズ**
   - 自動生成されたテキストをそのまま使用、または手動で編集

5. **バッジを保存**
   - 右側プレビューの「保存」ボタンをクリックしてPNG画像をダウンロード

### 高度な機能

#### カスタムアイコンのアップロード
各カテゴリで「カスタム画像」ボタンをクリックして独自のアイコンをアップロードできます。

#### モジュールマーク
ポインティングデバイスや拡張機能が取り外し可能（モジュール式）の場合、パズルピースアイコンをクリックしてモジュールマークを表示できます。マークはアイコンの右下に表示されます。

#### URL共有
1. バッジをカスタマイズ
2. 「URLで共有」ボタンをクリック
3. URLがクリップボードにコピーされます
4. そのURLを共有すれば、他の人が同じ設定でバッジを閲覧できます

**URLパラメータの例:**
```
?label=36&pitch=18mm&pitchAbbr=KP&icons=shape-split,stagger-column,connect-wl
```

## 🎨 カスタマイズ

### テーマ
- 右上の太陽/月アイコンをクリックしてライト/ダークモードを切り替え
- 設定はlocalStorageに保存され、次回訪問時も維持されます

### 言語
- 右上の「EN」/「JA」ボタンをクリックして日本語・英語を切り替え
- ブラウザの言語設定を自動検出
- 設定はlocalStorageに保存されます

## 🛠 技術スタック

- **HTML/CSS/JavaScript** - バニラJS、フレームワーク不要
- **SVG** - ベクターグラフィックスで高品質なバッジを生成
- **Web APIs**:
  - Canvas API - PNG画像の生成
  - Clipboard API - URL共有機能
  - LocalStorage API - 設定の永続化
  - File API - 画像のアップロード
- **GitHub Pages** - 静的サイトホスティング

## 📁 ファイル構成

```
KeyboardSpecLicense/
├── index.html          # メインHTML
├── main.js             # メインロジック
├── i18n.js             # 国際化（翻訳）
├── styles.css          # スタイル
├── README.md           # このファイル
├── public/             # アイコン画像
│   └── fram25_tiles/   # カテゴリ別アイコン
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages自動デプロイ
└── spec.md             # 仕様書
```

## 🌐 デプロイ

### GitHub Pages
このプロジェクトはGitHub Pagesで自動デプロイされます。

1. `main`ブランチにプッシュ
2. GitHub Actionsが自動的にデプロイを実行
3. https://nyanko3141592.github.io/KeyboardSpecLicense/ で公開

### ローカル開発
単純な静的サイトなので、ローカルサーバーで開発できます：

```bash
# Python 3の場合
python -m http.server 8000

# Node.jsのhttp-serverの場合
npx http-server

# VSCodeのLive Server拡張機能でも可
```

ブラウザで `http://localhost:8000` を開きます。

## 📝 URLパラメータ仕様

| パラメータ | 説明 | 例 |
|----------|------|-----|
| `label` | メインラベル（キー数） | `label=36` |
| `pitch` | キーピッチ | `pitch=18mm` |
| `pitchAbbr` | ピッチ略称 | `pitchAbbr=KP` |
| `icons` | 選択されたアイコンID（カンマ区切り） | `icons=shape-split,stagger-column` |
| `footer` | カスタムフッターテキスト | `footer=My%20Custom%20Footer` |
| `batteryText` | 電池アイコン内のテキスト | `batteryText=AA` |
| `notSupported` | 非対応アイコンID（カンマ区切り） | `notSupported=connect-wl` |
| `module` | モジュール（取り外し可能）アイコンID（カンマ区切り） | `module=pointing-tb,feature-ec` |

**利用可能なアイコンID:**
- 形状: `shape-split`, `shape-unibody`, `shape-macropad`
- 配列: `stagger-row`, `stagger-column`, `layout-or`, `layout-alice`, `layout-grin`
- 接続: `connect-wr`, `connect-wl`, `connect-halfwired`
- 互換性: `compat-mx`, `compat-chocv1`, `compat-chocv2`
- ポインティング: `pointing-tb`, `pointing-tp`, `pointing-td`
- ファームウェア: `firmware-qmk`, `firmware-zmk`
- 拡張機能: `feature-ec`, `feature-dp`
- 電池形式: `battery-aaa`, `battery-lipo`

## 🤝 コントリビューション

コントリビューションを歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 開発ガイドライン
- コードは読みやすく、コメントを適切に追加
- 新機能には対応する翻訳（日本語・英語）を追加
- レスポンシブデザインを維持
- アクセシビリティに配慮

## 📄 ライセンス

このプロジェクトはオープンソースです。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 謝辞

- フォント: [Google Fonts](https://fonts.google.com/) - Space Grotesk & IBM Plex Mono
- インスピレーション: 自作キーボードコミュニティの皆様

## 📞 お問い合わせ

バグ報告や機能リクエストは[GitHub Issues](https://github.com/nyanko3141592/KeyboardSpecLicense/issues)までお願いします。

---

**Made with ❤️ for the Custom Keyboard Community**
