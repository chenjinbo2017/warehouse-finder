# Warehouse Finder · 仓库找货

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_App-coral?style=for-the-badge)](https://chenjinbo2017.github.io/warehouse-finder/)

**Free, browser-based SKU location tool for small warehouses and e-commerce shippers.**  
Scan labels on your phone, look up bin locations on desktop, sync with your team via GitHub — no app install, no server, no monthly fee.

| | |
|---|---|
| **Live app** | https://chenjinbo2017.github.io/warehouse-finder/ |
| **Cost** | Free (GitHub Pages + JSON file storage) |
| **Stack** | Single HTML file, no backend |

---

## English

### Who is this for?

- Etsy / Amazon sellers with SKUs stored on shelf grids
- Small teams (warehouse + office) who need “where is this SKU?” fast
- Anyone who wants a **zero-cost WMS-lite** in the browser

### Features

| Feature | Description |
|---------|-------------|
| **SKU search** | Type or scan a SKU → shelf, row, column |
| **Scan & map** | Camera OCR, edit before confirm, auto-advance to next cell |
| **Shelf grid** | Visual map; tap cells to edit, insert empty slots |
| **Multi-zone** | Zones A/B/C/D…, custom shelf counts per zone |
| **Order matching** | Paste Etsy/Amazon orders or one-line text → batch location lookup |
| **GitHub sync** | Auto backup; **merge sync** for multi-user editing |
| **Local backup** | Copy all data to clipboard |
| **Bilingual UI** | Chinese / English labels, large fonts for warehouse use |
| **Responsive** | Phone, tablet, desktop; grid scales on large screens |

### Who can view vs edit?

| Role | Can do | Needs |
|------|--------|-------|
| **Anyone** | Open app, search SKU, read public data | Nothing |
| **Collaborators with Token** | Map, edit, delete, **upload to cloud** | GitHub Token in Sync tab |
| **Without Token** | Search only; local edits **do not** change shared cloud data | — |

**If someone forks this repo:** they get their **own** copy and data — they cannot change **your** cloud file unless they have your Token.

**Public repo note:** `warehouse-data.json` is readable by anyone. Use a **private repo** if locations are sensitive.

### Multi-user scanning (merge sync)

Upload and download **merge** local and remote data instead of replacing the whole file.

- Person A scans zone A, person B scans zone B **at the same time** → both sides are kept
- Each save auto-uploads (~1.2s); auto-pull every ~25s
- Success message: **“Auto synced (merged) ✅”**
- **Avoid:** two people editing the **same cell** at once — last upload wins for that cell only

### Quick start

1. Open https://chenjinbo2017.github.io/warehouse-finder/
2. **Map tab:** pick zone → shelf → tap cell → scan SKU → confirm
3. **Search tab:** type/scan SKU, or paste orders below
4. **Sync tab (optional):** save a GitHub [Personal Access Token](https://github.com/settings/tokens) with **repo** scope

**Order paste example:**

```
SKU: GEM-2408SY-19 Q: 9 order: 003
```

Also supports Etsy/Amazon CSV/Tab exports.

### Fork & deploy your own

1. **Fork** this repo (or clone and push to yours)
2. Settings → Pages → **main** branch, root `/`
3. Edit `GH_OWNER` and `GH_REPO` in `index.html`
4. Open your Pages URL; save **your** Token on the Sync tab

Or run `./deploy-pages.sh` (requires [GitHub CLI](https://cli.github.com/)).

### Project layout

```
warehouse-finder/
├── index.html           # Full app (HTML + CSS + JS)
├── warehouse-data.json  # Cloud-synced SKU & shelf config
├── deploy-pages.sh      # GitHub Pages deploy helper
└── README.md
```

### Tech

- Static site on **GitHub Pages**
- Data in browser **localStorage**; sync to JSON in repo
- OCR: [Tesseract.js](https://tesseract.projectnaptha.com/) (in-browser)
- Font: HarmonyOS Sans SC

### Contributing

Issues and PRs welcome. The app lives in a single `index.html` — keep changes focused and test on mobile (camera/scan) when touching sync or map logic.

### License

MIT — fork and adapt freely for your warehouse.

---

## 中文

### 适合谁用？

- Etsy / Amazon 等小卖家，货架格子存货、SKU 多
- **多人协作**（仓库录入、办公室查单）
- 想要 **零成本**、打开网页就能用的轻量库位工具

### 主要功能

| 功能 | 说明 |
|------|------|
| **SKU 查找** | 输入或扫描 SKU，显示货架、层、格 |
| **扫码录入** | OCR 识别，可改后再确认，自动下一格 |
| **货架地图** | 可视化网格，编辑 / 插入空位 |
| **多区多货架** | A/B/C/D 等分区，每区货架数可自定义 |
| **订单匹配** | 粘贴 Etsy/Amazon 或一行文字，批量匹配库位 |
| **云同步** | GitHub 备份，**合并同步** 支持多人同时录入 |
| **本地备份** | 一键复制全部数据 |
| **中英双语** | 大字号，适合仓库现场 |
| **响应式** | 手机 / 平板 / 电脑，大屏网格自动放大 |

### 谁能看？谁能改？

| 角色 | 能做什么 | 需要什么 |
|------|----------|----------|
| **任何人** | 打开网页、查 SKU、看库位 | 无需 Token |
| **有 Token 的协作者** | 录入、修改、上传云端 | Sync 页保存 GitHub Token |
| **没有 Token** | 只能查；本机改动 **不会** 改云端 | — |

**Fork 说明：** 别人 Fork 后是 **自己的一套数据**，改不了你们的云端，除非拿到你们的 Token。

**公开仓库：** `warehouse-data.json` 可被在线查看；库位敏感请用 **私有仓库** 自行部署。

### 多人同时扫描（合并同步）

上传、下载时会 **合并** 本地与云端数据，不再整份覆盖。

- A 扫 A 区、B 扫 B 区 **同时进行** → 两边数据都会保留
- 每扫一格约 1.2 秒自动上传；约 25 秒自动拉取合并
- 成功提示：**「已自动同步（已合并）✅」**
- **注意：** 不要两人同时改 **同一格**，那一格以最后上传为准

### 快速上手

1. 打开 https://chenjinbo2017.github.io/warehouse-finder/
2. **录入 / Map：** 选区 → 货架 → 点格子 → 扫码 → 确认
3. **查找 / Search：** 查 SKU，或下方粘贴订单
4. **云 / Sync（可选）：** 保存 GitHub [Token](https://github.com/settings/tokens)（勾选 **repo**）

**订单示例：**

```
SKU: GEM-2408SY-19 Q: 9 order: 003
```

### 自己部署 / Fork

1. **Fork** 本仓库
2. Settings → Pages → **main** 分支、根目录 `/`
3. 修改 `index.html` 中的 `GH_OWNER`、`GH_REPO`
4. 打开你的 Pages 地址，Sync 页填入 **你自己仓库** 的 Token

也可运行 `./deploy-pages.sh`（需 [GitHub CLI](https://cli.github.com/)）。

### 项目结构

```
warehouse-finder/
├── index.html           # 完整应用
├── warehouse-data.json  # 云端同步数据
├── deploy-pages.sh      # Pages 部署脚本
└── README.md
```

### 技术说明

- **GitHub Pages** 静态托管（免费）
- 数据在 **localStorage**；同步写入仓库 JSON
- OCR：[Tesseract.js](https://tesseract.projectnaptha.com/)
- 字体：HarmonyOS Sans SC

### 参与贡献

欢迎 Issue 和 PR。应用主要在单个 `index.html` 中，请保持改动聚焦；若改同步或录入逻辑，建议在手机上测扫码。

### 许可

MIT — 可自由 Fork 用于自己的仓库。
