<div align="center">

# Office Yoga

**A modern, content-driven office yoga blog built with Next.js, TypeScript, Tailwind CSS, and local Markdown posts.**  
**一个面向全球办公人群的现代办公室瑜伽博客，基于 Next.js、TypeScript、Tailwind CSS 与本地 Markdown 内容构建。**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Markdown](https://img.shields.io/badge/Content-Markdown-000000)](#content-workflow--内容工作流)
[![i18n](https://img.shields.io/badge/i18n-Route_Level-blue)](#route-level-i18n--路由级国际化)
[![License](https://img.shields.io/badge/License-Project_Use-green)](#license--许可证)

</div>

## Overview | 项目简介

**EN**  
Office Yoga is a lightweight SEO-focused blog for office wellness, desk yoga, posture care, and healthier work routines. It uses the Next.js App Router, renders content from local Markdown files, and supports route-level internationalization with localized URLs like `/en` and `/zh-CN`.

**中文**  
Office Yoga 是一个偏 SEO 内容型的办公室健康博客，聚焦办公室瑜伽、桌边拉伸、姿势改善和更健康的工作方式。项目使用 Next.js App Router，直接从本地 Markdown 文件渲染内容，并支持 `/en`、`/zh-CN` 这样的路由级国际化。

## Highlights | 功能亮点

- Next.js 16 + React 19 + TypeScript
- App Router architecture / App Router 架构
- Tailwind CSS 4 + `@tailwindcss/typography`
- Markdown-based content system / 基于 Markdown 的内容管理
- Route-level i18n with localized URLs / 路由级国际化
- `system / light / dark` theme support / 系统、浅色、深色三态主题
- `gray-matter` + `remark` + `remark-html`
- `reading-time` read time estimation / 阅读时长估算
- `framer-motion` animations / 页面与卡片动画
- Related posts by tags / 基于标签的相关文章推荐
- Auto-generated `sitemap.xml` and `robots.txt`
- Dynamic metadata and JSON-LD for blog pages / 文章页动态 SEO

## Route-Level i18n | 路由级国际化

项目当前已经升级为 URL 级国际化，而不是仅前端切换文案。

Examples / 示例：

- `/en`
- `/zh-CN`
- `/en/blog`
- `/zh-CN/blog`
- `/en/about`
- `/zh-CN/about`

说明：

- Root path `/` will redirect by request language preference.  
  根路径 `/` 会根据请求语言偏好自动跳转。
- Language switching updates the URL, not just in-page text.  
  语言切换会更新 URL，而不只是切换页面文案。
- `sitemap.xml` includes localized routes.  
  `sitemap.xml` 已包含多语言路由。

Core files / 核心文件：

- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/blog/page.tsx`
- `src/app/[locale]/blog/[slug]/page.tsx`
- `src/i18n/messages.ts`
- `src/i18n/routing.ts`
- `src/proxy.ts`

## Theme Support | 主题支持

当前主题能力：

- `system`
- `light`
- `dark`

说明：

- The site can follow the OS theme automatically.  
  网站可以自动跟随系统主题。
- Theme preference is persisted locally.  
  主题偏好会保存在本地。
- When theme mode is `system`, system theme changes are observed live.  
  当主题模式为 `system` 时，会实时响应系统主题变化。

Core file / 核心文件：

- `src/components/Header.tsx`

## Tech Stack | 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- gray-matter
- remark
- remark-html
- reading-time
- framer-motion
- lucide-react

## Project Structure | 项目结构

```text
office-yoga/
├── doc/
│   ├── Codex-prompt.md
│   └── 需求+UI规范.md
├── posts/
│   ├── en/
│   └── zh-CN/
├── public/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── about/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   ├── i18n/
│   │   ├── messages.ts
│   │   └── routing.ts
│   ├── lib/
│   │   └── posts.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── post.ts
│   └── proxy.ts
├── package.json
└── tailwind.config.js
```

Notes / 说明:

- The project is now fully organized under `src/*` except content in `posts/`.  
  除了内容目录 `posts/`，项目代码已经统一整理到 `src/*` 下。
- All blog content comes from local Markdown files.  
  博客内容全部来自本地 Markdown 文件。
- Shared styling lives in `src/styles/globals.css`.  
  全局样式集中在 `src/styles/globals.css`。
- Markdown loading, sorting, rendering, and related-post logic live in `src/lib/posts.ts`.  
  Markdown 的读取、排序、渲染和相关文章逻辑集中在 `src/lib/posts.ts`。

## Implemented Pages | 已实现页面

- `/` → redirects to locale route / 自动跳转到语言路由
- `/en`
- `/zh-CN`
- `/en/blog`
- `/zh-CN/blog`
- `/en/blog/[slug]`
- `/zh-CN/blog/[slug]`
- `/en/about`
- `/zh-CN/about`
- `/en/privacy`
- `/zh-CN/privacy`
- `/sitemap.xml`
- `/robots.txt`

## Quick Start | 快速开始

### 1. Install Dependencies | 安装依赖

```bash
pnpm install
```

### 2. Start Development Server | 启动开发环境

```bash
pnpm dev
```

Open / 打开：

```text
http://localhost:3000
```

The root path will redirect to `/en` or `/zh-CN`.  
根路径会自动跳转到 `/en` 或 `/zh-CN`。

### 3. Lint and Build | 校验与构建

```bash
pnpm lint
pnpm build
pnpm start
```

## Available Scripts | 可用命令

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

- `pnpm dev`: Start the local dev server / 启动本地开发环境
- `pnpm build`: Create a production build / 构建生产版本
- `pnpm start`: Start the production server / 启动生产服务
- `pnpm lint`: Run ESLint checks / 执行 ESLint 校验

## Environment Variables | 环境变量

Currently supported / 当前支持：

```bash
NEXT_PUBLIC_GA_ID=
```

Example / 示例：

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID. If set, the global layout injects the analytics script automatically.  
  `NEXT_PUBLIC_GA_ID`：Google Analytics 跟踪 ID。配置后会在全局布局中自动注入统计脚本。

Recommended `.env.local` / 推荐在 `.env.local` 中配置：

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Content Workflow | 内容工作流

### Publish a New Blog Post | 发布一篇新文章

当前博客内容采用“中英文各自独立 Markdown 文件 + `translationKey` 关联”的方式维护：

- English source lives in `posts/en/`
- 中文文章维护在 `posts/zh-CN/`
- 中英文文章通过相同的 `translationKey` 建立关联
- 两种语言可以共用同一个 slug，也可以使用不同 slug

也就是说：

- `/en/blog/your-post-slug` 读取 `posts/en/your-post-slug.md`
- `/zh-CN/blog/your-post-slug` 读取 `posts/zh-CN/your-post-slug.md`

### Step 1: Create the English Markdown File | 第一步：创建英文 Markdown

在 `posts/en/` 目录新增英文文章文件，例如：

```text
posts/en/my-first-desk-yoga-flow.md
```

Frontmatter 示例：

```md
---
title: "My First Desk Yoga Flow"
date: "2026-03-24"
description: "A simple desk yoga sequence for busy workdays."
author: "Office Yoga Team"
tags:
  - desk yoga
  - posture
  - workday wellness
coverImage: "/covers/focus-flow.svg"
translationKey: "my-first-desk-yoga-flow"
---

Start with a short introduction...
```

字段说明：

- `title`: 英文文章标题
- `date`: 发布日期，格式使用 `YYYY-MM-DD`
- `description`: 英文摘要，也会用于 SEO description
- `author`: 作者名，可选
- `tags`: 英文标签数组
- `coverImage`: 文章封面图路径，指向 `public/` 下的资源
- `translationKey`: 文章的语言关联键

建议：

- 文件名就是文章 slug，例如 `desk-yoga-for-beginners.md`
- slug 尽量保持英文、小写、用 `-` 连接
- `translationKey` 推荐长期稳定，不要频繁改

### Step 2: Add the Chinese Markdown | 第二步：创建中文 Markdown

英文文章建好后，在 `posts/zh-CN/` 下创建对应中文文章，例如：

```text
posts/zh-CN/my-first-desk-yoga-flow.md
```

中文 frontmatter 示例：

```md
---
title: "我的第一篇桌边瑜伽流程"
date: "2026-03-24"
description: "适合忙碌工作日的简单桌边瑜伽练习。"
author: "Office Yoga Team"
tags:
  - 桌边瑜伽
  - 姿势
  - 工作日健康
coverImage: "/covers/focus-flow.svg"
translationKey: "my-first-desk-yoga-flow"
---

这里填写中文正文内容。
```

中文部分字段说明：

- `title`: 中文文章标题
- `description`: 中文摘要
- `tags`: 中文标签
- `translationKey`: 必须与英文版本一致

注意：

- 中英文文章必须使用相同的 `translationKey`
- slug 可以相同，也可以不同
- 如果 slug 不同，系统仍会通过 `translationKey` 正确关联语言版本
- 中英文通常共用同一张封面图，便于维护

### Step 3: Set the Cover Image | 第三步：设置文章封面图

封面图统一放在：

```text
public/covers/
```

当前示例文件：

- `public/covers/focus-flow.svg`
- `public/covers/posture-reset.svg`
- `public/covers/breathe-better.svg`
- `public/covers/remote-wellness.svg`

在 frontmatter 中这样引用：

```md
coverImage: "/covers/posture-reset.svg"
```

规则：

- 路径必须以 `/covers/...` 开头，因为 `public/` 会映射为网站根路径
- 推荐优先使用 `SVG`，清晰、轻量、适合文章卡片和分享图风格
- 如果你要换成 `PNG / JPG / WebP` 也可以，仍然放在 `public/covers/`

命名建议：

- 与文章主题相关，如 `neck-relief.svg`
- 使用小写加连字符，如 `desk-reset-cover.svg`

### Cover Image Tips | 封面图建议

如果你想自己新增一张封面图，建议遵循这些原则：

- 比例保持横向，推荐接近 `16:10`
- 标题不要太长，避免在卡片中显得拥挤
- 视觉风格保持统一，适合 Office Yoga 当前的自然、舒缓、现代感
- 文字尽量写用户能理解的内容，不要出现技术词或内部意图

### Full Publishing Checklist | 完整发布流程

每次发布一篇文章，建议按这个顺序：

1. 在 `posts/en/` 新增英文 Markdown 文件
2. 补齐 frontmatter：`title`、`date`、`description`、`tags`、`coverImage`、`translationKey`
3. 在 `posts/zh-CN/` 新增中文 Markdown 文件
4. 使用同一个 `translationKey` 关联中英文
5. 把封面图放到 `public/covers/`
6. 本地运行 `pnpm dev` 检查：
   - `/en/blog/slug`
   - `/zh-CN/blog/slug`
7. 运行校验：

```bash
pnpm lint
pnpm build
```

### Minimal Example | 最小发布示例

假设你要新增文章：

```text
slug: desk-reset-after-long-meetings
```

你需要改 3 个地方：

```text
posts/en/desk-reset-after-long-meetings.md
posts/zh-CN/desk-reset-after-long-meetings.md
public/covers/desk-reset-after-long-meetings.svg
```

然后在 Markdown 中写：

```md
coverImage: "/covers/desk-reset-after-long-meetings.svg"
```

### Notes | 额外说明

- 文章排序按 `date` 倒序显示
- 列表页、首页推荐、相关文章都会自动读取最新内容
- 当前语言下只读取对应目录里的文章
- 中英文文章通过 `translationKey` 做 SEO alternates 关联
- SEO metadata 会跟随当前语言版本输出对应标题和摘要

## SEO Notes for Publishing | 发布文章时的 SEO 建议

- 标题尽量围绕一个清晰主题，不要过长
- `description` 要像真实摘要，不要堆关键词
- slug 尽量简洁稳定，发布后不要频繁改
- `translationKey` 发布后尽量不要修改
- 标签数量保持精简，通常 `2-4` 个更合适
- 封面图文件名尽量和主题相关，便于长期维护

## Content Files Reference | 内容相关文件

- `posts/en/*.md`: 英文文章正文与 frontmatter
- `posts/zh-CN/*.md`: 中文文章正文与 frontmatter
- `public/covers/*`: 文章封面图
- `src/lib/posts.ts`: 文章读取、语言匹配、排序、阅读时长、标签处理

## SEO | 搜索优化

Implemented SEO features / 已实现 SEO 能力：

- global metadata / 全局 metadata
- page-level metadata / 页面级 metadata
- dynamic blog post metadata / 文章详情页动态 metadata
- localized canonical and language alternates / 多语言 canonical 与 alternates
- `Article` JSON-LD on post pages
- `ItemList` JSON-LD on the blog index
- auto-generated multilingual `sitemap.xml`
- auto-generated `robots.txt`
- semantic HTML structure / 语义化 HTML 结构

Related files / 相关文件：

- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/[locale]/blog/[slug]/page.tsx`
- `src/i18n/routing.ts`

## Deployment | 部署

### Vercel

Recommended deployment target: Vercel.  
推荐部署平台：Vercel。

1. Push the repository to GitHub  
   将仓库推送到 GitHub
2. Import the repository into Vercel  
   在 Vercel 中导入仓库
3. Select the Next.js framework preset  
   选择 Next.js 预设
4. Add `NEXT_PUBLIC_GA_ID` if needed  
   如有需要，配置 `NEXT_PUBLIC_GA_ID`
5. Deploy  
   开始部署

Default build command / 默认构建命令：

```bash
pnpm build
```

## Verification | 验证状态

The project has already been validated with:  
项目当前已经完成基础验证：

- `pnpm lint`
- `pnpm build`

Localized route generation currently includes:  
当前构建已生成的本地化路由包括：

- `/en`
- `/zh-CN`
- `/en/about`
- `/zh-CN/about`
- `/en/blog/hello-office-yoga`
- `/zh-CN/blog/hello-office-yoga`

## Troubleshooting | 常见问题

### Build fails in a restricted environment | 受限环境下构建失败

Check the following first / 优先排查：

- dependencies are fully installed / 依赖是否完整安装
- Node.js and pnpm versions are compatible / Node.js 与 pnpm 版本是否兼容
- sandbox, port, or network restrictions / 是否存在沙箱、端口或网络限制

### New post does not appear | 新文章没有显示

Check the following / 可以按下面顺序检查：

- the file is inside `posts/`
- the extension is `.md`
- frontmatter is valid
- `date` is parseable
- `title` and `description` are present

## Roadmap | 后续规划

- Connect ConvertKit or Mailchimp / 接入 ConvertKit 或 Mailchimp
- Add real newsletter submissions / 接入真实订阅提交
- Generate OG images automatically / 自动生成 OG 图
- Add tag and category pages / 增加标签页和分类页
- Add site search / 增加搜索功能
- Add RSS feed / 增加 RSS
- Add translated Markdown content by locale / 为不同语言提供独立内容
- Add more authoring templates / 增加更多内容模板

## License | 许可证

This repository is currently best treated as a project template for development and learning.  
当前仓库更适合作为开发与学习用途模板。

If you plan to launch it commercially, consider adding:  
如果你计划正式上线并商用，建议补充：

- copyright notice for written content / 文章版权声明
- asset and illustration licensing / 图片与插画授权说明
- monetization terms / 商业化条款
- privacy and data processing details / 隐私与数据处理说明
