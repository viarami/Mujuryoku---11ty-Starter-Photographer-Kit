# Mujuryoku - 11ty 摄影网站模板（简体中文）

Mujuryoku 是一个基于 Eleventy (11ty) 的摄影网站起步模板。

## 包含内容

- 基础页面：Home、Portfolio、About、Services、Pricing、Blog、Contact
- 独立演示页：`/demo/`
- 6 套主题
- Markdown 博客
- GitHub Actions 自动部署到 GitHub Pages

## 快速开始

```bash
git clone https://github.com/viarami/mujuryoku.git
cd mujuryoku
npm install
npm run dev
```

本地地址：`http://localhost:8080`

## 新手优先修改文件

- `src/_data/metadata.js`：站点基础信息
- `src/_data/portfolio.js`：首页和作品集卡片数据
- `src/_data/services.js`：服务内容
- `src/_data/pricing.js`：价格内容
- `src/posts/*.md`：博客文章

## Demo 与 Starter 分离

- Demo 模板：`src/demo/`
- Demo 数据：`src/_data/demo.js`
- Demo 图片目录：`demo-images/` -> `/assets/demo-images/`
- Starter 页面：`src/pages/`

## 主题切换按钮

按钮位于右下角，只在以下场景显示：
- 开发模式（`npm run dev`）
- 已发布站点的 `/demo/` 页面

## GitHub Pages（viarami/mujuryoku）

- 仓库：`https://github.com/viarami/mujuryoku`
- 访问地址：`https://viarami.github.io/mujuryoku/`
- 构建时使用 `SITE_BASE_PATH=/mujuryoku`（工作流已配置）

更多说明请查看：[README.md](./README.md)
