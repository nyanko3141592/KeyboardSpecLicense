# KeySpec Generator (static MVP)

GitHub Pages 向けのビルド不要なシングルページ版。`index.html` をルートに配置すればそのまま動きます。

## 使い方（概要）

1. `open index.html` で開く（または `npx serve` などで静的配信）。
2. 左フォームを操作すると右のバッジが即時更新。
3. エクスポートで `keyspec-badge.png` / `keyspec-badge.svg` を取得。
4. アイコン差し替えは `public/*.png` を上書き、または UI からローカル画像をアップロードしてカテゴリ単位で置換（略称も指定可）。

## デプロイ (GitHub Pages)

- プロジェクトルート直下に `index.html` を置いたまま `main` へ push し、Pages のソースを `/(root)` または `docs/` に設定します。
- ルート以外で公開する場合は、リポジトリ設定の Pages で選んだ公開パスに合わせてそのままアップロードすれば OK（相対パスで書いているので追加設定不要）。

## 構成

- `index.html` – UI 本体（hidden input も含む）
- `styles.css` – テーマとレイアウト
- `main.js` – 状態管理、SVG描画、PNG/SVG エクスポート、カスタムアイコン処理
- `public/` – アイコンPNG置き場（ID↔ファイル名は `main.js` の `iconFileMap` 参照）
- `docs/USAGE.md` – 詳細な操作手順とアイコン差し替えの説明

## 既知の TODO / 伸びしろ

- アイコン素材の本番差し替え（`public/<id>.png`）
- URL パラメータでの状態保存
- QR 埋め込みや外部 SVG アップロード
- CC風アイコンの差し替え

詳細は `docs/USAGE.md` を参照してください。
