officeyoga 出海博客网站 – 完整开发规范
一、项目目标
一个面向全球办公室人群的瑜伽与健康博客，通过高质量 SEO 文章吸引自然流量，通过广告和邮件订阅变现。网站要求现代、动态、专业，使用 Next.js 14（App Router） + TypeScript + Tailwind CSS，完全基于 Markdown 文件，无需数据库。

二、技术栈
Next.js 14（App Router）

TypeScript

Tailwind CSS

gray-matter + remark / remark-html

@tailwindcss/typography（文章排版）

Vercel 部署

三、目录结构
text
office-yoga/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ ├── blog/
│ │ ├── page.tsx
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── about/
│ │ └── page.tsx
│ ├── privacy/
│ │ └── page.tsx
│ ├── sitemap.ts
│ └── robots.ts
├── posts/ # Markdown 文章
├── components/ # 可复用组件（Header, Footer, Newsletter, Card 等）
├── lib/
│ └── posts.ts # 文章读取工具
├── types/
│ └── post.ts
├── public/ # 静态资源
├── styles/ # 自定义 CSS（全局）
└── tailwind.config.js # 扩展配置
四、功能要求
4.1 全局配置
根布局：<html lang="en">，全局 metadata 包含 title, description, openGraph, twitter 卡片。

Sitemap：动态生成，包含所有静态页面和博客文章。

Robots：允许 Googlebot、Bingbot、GPTBot，指向 sitemap。

Google Analytics：通过环境变量嵌入。

4.2 博客功能
文章存储：/posts/{slug}.md，frontmatter 包含 title, date, description, author(可选), tags(可选), coverImage(可选)。

列表页：分页（每页 10 篇），展示卡片（标题、日期、摘要、阅读更多），支持按日期倒序。

详情页：动态路由，读取 Markdown 文件，使用 remark 转 HTML。动态生成 metadata（title, description）。添加 JSON-LD（Article）。底部包含阅读时间估算和简单相关文章推荐（基于相同标签）。

辅助函数：getAllPosts, getPostBySlug, getPostSlugs, getRelatedPosts。

4.3 页面
首页：Hero 区（大标题+副标题+CTA）、最新文章展示（3篇）、邮件订阅区、页脚。

关于页：简单介绍使命、作者背景、联系方式。

隐私政策页：标准模板。

4.4 邮件订阅
在首页和每篇文章底部嵌入 ConvertKit（或 Mailchimp）表单。

样式与网站统一，包含输入框和按钮，提交后显示成功提示。

五、UI 设计规范（现代、动态）
5.1 整体风格
基调：简约、干净、清新，但带有现代科技感（轻微玻璃态、渐变、微交互）。

氛围：平静、柔和，传递信任感，同时保持活力。

响应式：移动端优先，桌面端适当增加留白和动效。

5.2 配色
用途 颜色 备注
主色 #4A6741（鼠尾草绿） 链接、按钮、装饰
辅助色 #E9D8A6（淡米色） 卡片背景高亮
背景 #F9F7F3（米白） 整体背景
深色模式背景（可选） #1F1F1F 如果实现暗色模式
文字主色 #2C2C2C 正文
文字次要 #6C6C6C 日期、辅助信息
边框/分割线 #E0E0E0
强调 #D95B5B 悬停、错误
5.3 动态与酷感要求
玻璃态卡片：文章卡片使用 backdrop-blur-sm 或 bg-white/80 + 阴影，悬停时阴影加深并轻微上移（hover:-translate-y-1）。

渐变背景：Hero 区可使用从主色到辅助色的淡渐变（bg-gradient-to-br from-[#4A6741] to-[#E9D8A6]），文字白色。

滚动动画：当元素进入视口时，添加淡入和上移效果（使用 framer-motion 或 Tailwind + Intersection Observer，但为了简洁，可以使用 Tailwind 的 transition 配合 data-scroll 自定义属性，或直接通过 CSS 类 opacity-0 translate-y-4 然后 JS 触发变为可见。为降低复杂度，建议使用 framer-motion，但需确保 SSR 兼容）。

暗色模式：利用 Tailwind 的 dark: 变体，提供明暗切换按钮（可选）。

悬浮微交互：链接悬停时颜色渐变，按钮悬停时轻微放大（hover:scale-105），卡片悬停时阴影增强。

平滑滚动：全局 scroll-behavior: smooth。

现代字体：使用 Inter 作为主字体，通过 Google Fonts 引入（@next/font 或 Tailwind 配置）。

图标库：使用 Heroicons 或 Lucide 的 React 版本，保持线性风格。

动态背景光晕：在 Hero 区添加一个径向渐变的光晕（radial-gradient(circle at top right, rgba(74,103,65,0.1), transparent)）。

5.4 组件样式细节
导航栏
固定在顶部，背景 bg-white/80 并带有 backdrop-blur-sm，滚动时阴影。

Logo 使用文字或简单 SVG。

移动端：汉堡菜单，点击弹出抽屉。

文章卡片（列表页）
圆角 rounded-2xl，背景白色（或半透白），阴影 shadow-md。

悬停时 shadow-xl + -translate-y-1，过渡时间 duration-300。

标题使用 text-xl md:text-2xl font-bold，品牌色链接。

日期和作者使用 text-sm text-gray-500。

摘要 line-clamp-3。

详情页
文章容器最大宽度 800px，居中。

标题 text-3xl md:text-4xl font-bold。

正文使用 prose prose-lg 并自定义品牌色链接（prose-a:text-[#4A6741]）。

图片自动圆角，响应式。

按钮
主按钮：品牌色背景，白色文字，圆角 rounded-full，内边距 px-6 py-2，悬停 bg-[#3a5533] + scale-105。

次按钮：透明，品牌色边框，悬停背景 bg-[#4A6741]/10。

邮件订阅
单行输入框 + 按钮，圆角 rounded-full 组合（输入框 rounded-l-full，按钮 rounded-r-full）。

输入框有焦点状态（边框变主色）。

页脚
背景 bg-gray-50，内边距 py-8，包含版权和链接。

5.5 响应式与性能
移动端：所有组件采用块级布局，字体略小，内边距缩小。

图片：使用 next/image，自动优化。

性能：Lighthouse 得分 ≥ 90（SEO 和性能）。

六、SEO 要求
每个页面独立 metadata，博客详情页自动从 frontmatter 生成。

结构化数据（JSON-LD）添加到列表页（ItemList）和详情页（Article）。

Sitemap 自动生成。

图片全部加 alt。

使用语义化 HTML 标签（h1, h2, article, section 等）。

七、开发与部署
本地开发：pnpm dev（推荐 pnpm）。

构建：pnpm build。

部署到 Vercel，环境变量 NEXT_PUBLIC_GA_ID 等。

八、示例文章
创建 /posts/hello-office-yoga.md，内容包含 frontmatter 和至少 500 字正文，作为模板。
