# Mujuryoku - 11ty 写真サイトスターター（日本語）

Mujuryoku は、Eleventy (11ty) で作られた写真サイト向けスターターキットです。

## 含まれるもの

- 基本ページ: Home, Portfolio, About, Services, Pricing, Blog, Contact
- 分離されたデモページ: `/demo/`
- 6つのテーマ
- Markdown ブログ
- GitHub Actions で GitHub Pages へ自動デプロイ

## クイックスタート

```bash
git clone https://github.com/viarami/mujuryoku.git
cd mujuryoku
npm install
npm run dev
```

ローカルURL: `http://localhost:8080`

## 初期設定で主に編集するファイル

- `src/_data/metadata.js` - サイト基本情報
- `src/_data/portfolio.js` - Home と Portfolio のカード内容
- `src/_data/services.js` - サービス内容
- `src/_data/pricing.js` - 料金内容
- `src/posts/*.md` - ブログ記事

## デモとスターターの分離

- デモテンプレート: `src/demo/`
- デモデータ: `src/_data/demo.js`
- デモ画像: `demo-images/` -> `/assets/demo-images/`
- スターターページ: `src/pages/`

## テーマスイッチャー

ボタンは右下に表示され、次の場合のみ有効です:
- 開発モード（`npm run dev`）
- 公開サイトの `/demo/` ページ

## GitHub Pages（viarami/mujuryoku）

- リポジトリ: `https://github.com/viarami/mujuryoku`
- 公開URL: `https://viarami.github.io/mujuryoku/`
- ビルド時に `SITE_BASE_PATH=/mujuryoku` を使用（workflow 設定済み）

詳細: [README.md](./README.md)
