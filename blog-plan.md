# 个人博客建设方案

## 目标

建设一个可部署到 GitHub Pages 的个人博客，风格参考 `guo12181.github.io` 和 `https://www.aibrium.cn/`：

- 具备传统技术博客能力：文章、归档、标签、分类、友链、关于页。
- 具备现代个人主页能力：个人简介、项目展示、照片墙、说说、站点统计。
- 内容以 Markdown/MDX 管理，方便长期维护。
- 支持 GitHub Actions 自动部署到 GitHub Pages。

## 参考站点分析

### guo12181.github.io

该站点更接近传统技术博客，典型特征包括：

- 首页以文章流为核心。
- 有归档、标签、分类、友链、关于等博客标准页面。
- 侧边栏包含头像、公告、最新文章、分类标签、站点统计等模块。
- 适合长期记录技术笔记、学习总结、题解、论文阅读等内容。
- 页面底部显示使用 `Hexo + Butterfly`。

适合借鉴的部分：

- 文章组织方式清晰。
- 标签、分类、归档体系完整。
- 博客氛围成熟，维护成本较低。

### aibrium.cn

该站点更像现代个人主页和博客综合站，典型特征包括：

- 首页突出个人介绍和站点整体信息。
- 导航包含首页、开源项目、归档、照片墙、音乐、说说、留言墙、友链、关于等。
- 首页有个人简介、文章统计、照片统计、天气、日历、文章卡片等模块。
- 更强调个人品牌、生活记录和作品展示。
- 站点文案显示其使用 Next.js 构建。

适合借鉴的部分：

- 首页信息密度高，但视觉上较现代。
- 个人主页、项目展示、博客内容结合得比较自然。
- 适合展示技术身份、项目经历和生活内容。

## 技术选型建议

推荐使用：

```text
Astro + Markdown/MDX + Tailwind CSS + GitHub Pages
```

### 推荐 Astro 的原因

- 比 Hexo 更适合做现代个人主页和高度自定义页面。
- 比 Next.js 更适合作为纯静态博客部署到 GitHub Pages。
- 原生适合 Markdown/MDX 内容管理。
- 构建产物是静态文件，部署简单。
- 可同时实现传统博客和个人主页两类需求。

### 备选方案

#### Hexo + Butterfly

优点：

- 最接近 `guo12181.github.io`。
- 博客功能成熟，主题生态丰富。
- 上手快。

缺点：

- 做高度自定义的现代个人主页不如 Astro 灵活。
- 视觉风格容易和现有 Butterfly 站点相似。

适合场景：

- 主要目标是快速搭建传统技术博客。

#### Next.js Static Export

优点：

- 最接近 `aibrium.cn` 的技术路线。
- 页面交互和组件开发能力强。

缺点：

- GitHub Pages 只能托管静态结果，需要配置静态导出。
- 不能依赖服务端 API。
- 对纯博客而言维护成本略高。

适合场景：

- 未来计划做较多复杂交互或 Web App 式功能。

## 关键技术决策

### 1. 项目起点：从 Astro 官方 blog 模板起步，不使用第三方主题

```bash
npm create astro@latest -- --template blog
```

理由：

- 两个参考站风格差异大，任何现成主题都需要大量魔改，反而增加理解成本。
- 官方 blog 模板已内置 Content Collections、MDX 支持、RSS 生成，是干净且功能完备的起点。
- Tailwind CSS 手动接入即可，完全掌控样式。
- 第一阶段时间因此调整为 2-3 天（而非 1 天）。

### 2. 深色模式：第一版即实现，使用 Tailwind class 策略

从第一天起所有组件同时写 light/dark 样式，避免后期大面积回溯。

实现方式：

- Tailwind 配置 `darkMode: 'class'`。
- 页面顶层通过 JS 切换 `<html class="dark">`。
- 用户偏好存入 `localStorage`，首次访问跟随系统 `prefers-color-scheme`。
- 每个 Tailwind 类同时写 `dark:` 变体，零额外成本。

### 3. 性能与 SEO 基线

目标指标：

- Lighthouse Performance / Accessibility / SEO 均 ≥ 90。
- 首屏 LCP < 1.5s（静态站正常情况下轻松达标）。

关键措施：

- 图片统一使用 Astro 内置 `<Image>` 组件（`astro:assets`），自动生成 WebP/AVIF + srcset。
- 字体自托管（下载 woff2 放入 `public/fonts/`），设置 `font-display: swap`，不依赖 Google Fonts CDN。
- 所有页面生成语义化 HTML，配合 Open Graph / Twitter Card meta。
- 构建后用 `npx lighthouse` 跑一次基线检查。

### 4. 评论系统：Giscus

选择 Giscus（基于 GitHub Discussions）：

- 无需后端服务，纯前端组件嵌入。
- 数据存储在 GitHub Discussions，与博客仓库天然绑定。
- 支持 Reactions、深色模式、多语言。
- 技术博客读者大多有 GitHub 账号，登录无摩擦。
- 相比 Waline/Twikoo 不需要额外部署数据库或云函数。

接入方式：

- 在 GitHub 仓库开启 Discussions。
- 安装 Giscus GitHub App。
- 在文章详情页底部嵌入 `<script>` 或封装为 Astro 组件。

### 5. 图片管理策略

分层管理：

| 类型 | 存储位置 | 处理方式 |
|------|----------|----------|
| 文章配图、头像、项目封面 | `src/assets/images/` | Astro `<Image>` 自动优化（WebP + 响应式） |
| 照片墙原图 | `public/photos/` | 手动控制尺寸，单张 ≤ 300KB，建议宽度 ≤ 1600px |
| 第三方图片（外链） | 原始 URL | 仅用于不需要长期保存的内容 |

规则：

- 文章配图必须走 `src/assets/` 以获得构建时优化。
- 照片墙图片提交前用脚本批量压缩（`sharp` 或 `squoosh`）。
- 仓库总体积超过 500MB 时，将照片墙迁移至 Cloudflare R2（10GB 免费额度）。
- `.gitignore` 中排除原始未压缩大图。

---

## 推荐站点结构

第一版建议包含以下页面：

```text
/
  首页

/blog
  博客文章列表

/posts/[slug]
  文章详情页

/archive
  归档页

/tags
  标签页

/categories
  分类页

/projects
  开源项目 / 作品集

/moments
  说说 / 短动态

/photos
  照片墙

/friends
  友链

/about
  关于我
```

## 首页设计建议

首页不做营销式落地页，而是直接展示个人博客的核心信息：

- 个人头像、姓名、身份介绍。
- 一句话简介。
- GitHub、邮箱、Google Scholar、知乎、Bilibili 等外链。
- 最新文章。
- 推荐项目。
- 站点统计，如文章数、标签数、项目数、照片数。
- 最近动态或说说。

桌面端布局建议：

- 左侧：个人信息栏。
- 中间：文章流和项目入口。
- 右侧：标签、日历、最新动态、站点统计等小组件。

移动端布局建议：

- 顶部导航。
- 个人信息模块。
- 文章卡片列表。
- 项目、动态、标签等模块按顺序纵向排列。

## 内容组织建议

使用 Markdown/MDX 管理内容：

```text
src/content/posts/
  2026-06-15-hello-world.mdx
  2026-06-16-agent-memory-notes.mdx

src/content/projects/
  paperfit.md
  lark-agent.md

src/content/moments/
  2026-06.md

src/content/photos/
  travel-2026.md
```

文章 frontmatter 示例：

```yaml
title: "Agent Memory 论文阅读"
date: "2026-06-15"
category: "论文阅读"
tags: ["Agent", "Memory", "LLM"]
summary: "整理 Agent Memory 方向的一篇论文。"
draft: false
```

项目 frontmatter 示例：

```yaml
title: "PaperFit"
date: "2026-06-15"
tags: ["LaTeX", "Agent", "Layout"]
repo: "https://github.com/your-name/paperfit"
demo: ""
summary: "一个面向学术论文排版优化的智能体系统。"
```

## 视觉风格建议

整体风格定位：**中国古典淡雅**——取水墨留白之意，求素净内敛之美，兼顾现代可读性。

### 色彩体系

| 用途 | 亮色模式 | 暗色模式 |
|------|----------|----------|
| 背景 | 宣纸白 `#FDFBF7`（微暖米白） | 墨玉 `#1A1A1E` |
| 正文 | 浓墨 `#2C2C2C` | 月白 `#E8E4DF` |
| 次要文字 | 淡墨 `#6B6B6B` | 银灰 `#9E9A95` |
| 主色/点缀 | 黛青 `#4A6B5A`（如远山） | 青玉 `#6B9E8A` |
| 强调色 | 朱砂 `#A0453E`（极少量使用） | 淡朱 `#C86B64` |
| 边框/分隔线 | 淡烟 `#E8E2D9` | 深黛 `#2E2E32` |
| 卡片背景 | 素白 `#FFFFFF` | 玄青 `#242428` |

用色原则：

- 主体以黑白灰暖色调为主，大面积留白。
- 黛青为唯一主色调，用于链接、导航高亮、标签。
- 朱砂仅用于极少量强调（如 hover 状态、未读标记），不可大面积出现。
- 杜绝高饱和色彩，所有颜色取低饱和、灰调版本。

### 字体方案

```css
/* 中文正文：霞鹜文楷，古典书卷感 */
--font-body: 'LXGW WenKai', 'Noto Serif SC', serif;

/* 标题：思源宋体，端庄大气 */
--font-heading: 'Noto Serif SC', 'Source Han Serif SC', serif;

/* 代码：等宽字体 */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* 英文正文回退 */
--font-latin: 'Crimson Pro', 'Georgia', serif;
```

字体加载策略：

- LXGW WenKai 使用 CDN 子集化加载（仅加载常用字符集，约 2-3MB）。
- 备选方案：若加载过慢，降级为 Noto Serif SC（Google Fonts 有子集 API）。
- 自托管 woff2 文件，`font-display: swap`。

### 排版节奏

- 正文字号 16-17px，行高 1.8-2.0（中文需要更大行高）。
- 段间距 1.5em，营造疏朗呼吸感。
- 标题与正文间保留充裕留白。
- 最大内容宽度 680px（正文区），不宜过宽。
- 首行不缩进（现代网页惯例），用段间距区分段落。

### 装饰与质感

- 背景可叠加极淡的宣纸纹理（opacity 3-5%，不影响阅读）。
- 分隔线使用细淡虚线或渐隐线条，模拟水墨晕散。
- 卡片不加阴影或仅用极淡投影，边框用 1px 淡烟色。
- 圆角极小（2-4px）或不用圆角，保持方正。
- 图片可加 1px 细边框，模拟画框装裱感。
- hover 效果克制：微调透明度或颜色加深，不做缩放/弹跳动画。
- 页面切换和滚动保持安静，不加花哨过渡动画。

### 图标与点缀元素

- 导航图标使用线条风格（line icons），不用填充风格。
- 可在页脚、分隔处使用极简水墨装饰（如一笔山形、云纹），SVG 实现，不超过 3 处。
- 标签样式：无背景或极淡背景 + 细边框，不做彩色药丸（pill）样式。

### 深色模式特殊处理

- 暗色不是简单反转，而是模拟"夜读"氛围——深底暖灰文字。
- 背景避免纯黑 `#000`，使用带微暖的深色。
- 宣纸纹理在暗色模式下关闭或切换为极淡的织物纹理。
- 朱砂色在暗色下适当提亮以保持对比度。

### 需要重点设计的组件

- 顶部导航（水平简洁，中式对称感）。
- 个人信息卡（竖排姓名可选，配印章风格头像框）。
- 文章卡片（素净，标题突出，日期用小字淡墨）。
- 项目卡片（同文章卡片风格统一）。
- 标签云（淡底细边，不花哨）。
- 归档时间线（竖线 + 节点，模拟卷轴展开）。
- 文章目录（固定侧边，细线连接层级）。
- 代码块样式（低对比度主题，如 GitHub Light / One Light 的灰调变体）。
- 引用块（左侧竖线用黛青色，背景极淡）。
- 页脚（简洁，可放一句诗或格言）。

## 功能清单

第一版必做：

- 首页。
- 博客列表。
- 文章详情。
- 标签页。
- 分类页。
- 归档页。
- 关于页。
- 项目页。
- Markdown/MDX 内容管理。
- 代码高亮。
- 深色模式（从第一天起与样式同步编写）。
- 评论系统（Giscus）。
- RSS。
- sitemap。
- GitHub Pages 自动部署。

第二版可做：

- 全站搜索。
- 照片墙。
- 说说。
- 友链。
- 留言系统。
- 阅读量统计。

第三版可做：

- 音乐页。
- 豆瓣/书影音记录。
- GitHub 项目自动同步。
- 文章阅读进度。
- Mermaid 图表。
- LaTeX 数学公式。
- 多语言支持。

## GitHub 部署方案

推荐使用 GitHub Pages 用户站点仓库：

```text
your-name.github.io
```

访问地址：

```text
https://your-name.github.io/
```

部署流程：

1. 本地创建 Astro 项目。
2. 初始化 Git 仓库。
3. 创建 GitHub 远程仓库。
4. 添加 GitHub Actions 工作流。
5. 在 GitHub Pages 设置中选择 `GitHub Actions` 作为发布源。
6. 每次提交 Markdown 或代码后自动构建并部署。

## 推荐实施节奏

### 第一阶段：基础博客

预计 2-3 天。

- 初始化 Astro 项目（官方 blog 模板）。
- 配置 Tailwind CSS（含 dark mode class 策略）。
- 建立内容集合。
- 完成首页、博客列表、文章详情、归档、标签。
- 所有组件同步编写 light/dark 样式。
- 写入 2-3 篇示例文章。

### 第二阶段：个人主页增强

预计 1-2 天。

- 设计个人信息区。
- 增加项目页。
- 增加关于页。
- 增加友链页。
- 接入 Giscus 评论系统。
- 优化响应式布局。

### 第三阶段：部署与 SEO

预计 0.5-1 天。

- 配置 GitHub Actions。
- 配置 sitemap。
- 配置 RSS。
- 配置 Open Graph / Twitter Card meta。
- 字体自托管（woff2 + font-display: swap）。
- Lighthouse 基线检查（目标 ≥ 90）。
- 检查移动端表现。
- 完成第一次 GitHub Pages 发布。

### 第四阶段：内容迁移与长期维护

持续进行。

- 迁移旧文章。
- 整理分类和标签。
- 添加照片墙、说说等个性化页面。
- 根据写作习惯调整页面结构。

## 最终建议

建议优先采用 Astro 方案：

- 能实现 `guo12181.github.io` 那种完整博客体系。
- 也能实现 `aibrium.cn` 那种现代个人主页效果。
- 长期维护成本低。
- 部署到 GitHub Pages 简单稳定。

第一版目标不要追求功能过多，先完成：

```text
首页 + 博客 + 归档 + 标签 + 项目 + 关于 + GitHub Pages 部署
```

之后再逐步增加照片墙、说说、留言、音乐等个性化模块。
