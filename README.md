# KeySpec Generator (static MVP)

GitHub Pages 向けのビルド不要なシングルページ版。`index.html` をルートに配置すればそのまま動きます。

## 使い方

1. `git clone` 後、ローカルで開く: `open index.html` または `npx serve` などで静的配信。
2. 左のフォームを操作すると右のバッジプレビューが即時更新。
3. エクスポートボタンで `keyspec-badge.png` / `keyspec-badge.svg` を取得。
4. `public/*.png` を差し替えてください。`shape-split.png` などカテゴリ別にプレースホルダーを作成済みです（中身は1pxダミー）。

## デプロイ (GitHub Pages)

- プロジェクトルート直下に `index.html` を置いたまま `main` へ push し、Pages のソースを `/(root)` または `docs/` に設定します。
- ルート以外で公開する場合は、リポジトリ設定の Pages で選んだ公開パスに合わせてそのままアップロードすれば OK（相対パスで書いているので追加設定不要）。

## 構成

- `index.html` – UI 本体
- `styles.css` – テーマとレイアウト
- `main.js` – 状態管理、SVG描画、PNG/SVG エクスポート
- `public/placeholder-icon.png` – 差し替え用プレースホルダー

## 既知の TODO / 伸びしろ

- アイコンを本物の線画に差し替え（各 `public/<id>.png` を上書き）
- URL パラメータでの状態保持
- QR 埋め込みや外部 SVG アップロード
- CC風の円アイコン（人型・情報ソース）を本物に差し替える
