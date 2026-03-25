## 测试规范prompt

```text
请为我的 Next.js 博客网站 officeyoga 生成一套完整的 Playwright 自动化测试脚本。网站已部署在本地 http://localhost:3000，测试需覆盖以下场景：

1. 首页测试：
   - 页面加载成功，Hero 区可见（包含标题、副标题）。
   - 最新文章区域展示至少 3 篇文章卡片。
   - 点击“阅读更多”按钮（或文章卡片链接）跳转到正确的详情页。

2. 博客列表页测试：
   - 访问 /blog，页面加载成功。
   - 文章卡片数量与 posts 目录下文章数一致（至少 1 篇）。
   - 每张卡片包含标题、日期、摘要和“阅读更多”链接。
   - 点击第一篇文章的链接，进入详情页。

3. 博客详情页测试：
   - 访问一篇已发布的文章（例如 /blog/hello-office-yoga），页面加载成功。
   - 检查文章标题、发布日期、正文内容存在且不为空。
   - 验证页面包含 JSON-LD 结构化数据（<script type="application/ld+json">）且内容符合 Article 类型。
   - 验证页面元数据（<title> 和 <meta name="description">）与文章 frontmatter 一致。

4. 关于页和隐私页测试：
   - 访问 /about 和 /privacy，页面加载成功，内容不为空。

5. SEO 与资源测试：
   - 访问 /sitemap.xml，返回 XML 且包含至少一条 url 条目。
   - 访问 /robots.txt，包含 User-agent: * 和 Sitemap 指令。
   - 所有页面响应状态码为 200，无 404 或 500。

6. 移动端响应式测试：
   - 使用 iPhone 12 视口（390x844）重新运行首页、博客列表、详情页测试，确保布局无错位，导航栏可折叠。

7. 邮件订阅表单（可选）：
   - 如果存在表单，验证输入框可输入，提交按钮可点击（不验证后端）。

请输出以下文件：
- e2e/home.spec.ts
- e2e/blog.spec.ts
- e2e/seo.spec.ts
- e2e/mobile.spec.ts
- playwright.config.ts（如果项目中没有）
- package.json 中添加测试脚本的命令（如 "test:e2e": "playwright test"）

确保测试代码使用 Playwright 最新语法，并包含必要的断言。文件结构放在项目根目录的 e2e/ 文件夹下。
```