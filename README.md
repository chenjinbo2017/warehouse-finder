# Warehouse Finder · 仓库找货

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_App-coral?style=for-the-badge)](https://chenjinbo2017.github.io/warehouse-finder/)

**Free, browser-based SKU location tool for small warehouses and e-commerce shippers.**  
Scan labels on your phone, look up bin locations, paste orders for pick lists, sync with your team via GitHub — no app install, no server, no monthly fee.

| | |
|---|---|
| **Live app** | https://chenjinbo2017.github.io/warehouse-finder/ |
| **Cost** | Free (GitHub Pages + JSON in your repo) |
| **Stack** | Single `index.html`, no backend |

---

## English

### Who is this for?

- Etsy / Amazon sellers with SKUs on shelf grids (A1, B2, row/col bins)
- Small teams (warehouse + office) who need “where is this SKU?” fast
- Anyone who wants a **zero-cost WMS-lite** without monthly SaaS fees

### Features

| Feature | Description |
|---------|-------------|
| **SKU search** | Type or scan a SKU → shelf, row, column |
| **Scan & map** | Camera OCR → edit SKU → confirm → auto-advance to next cell |
| **Shelf grid** | Visual map; edit cells, insert empty slots, multi-zone (A/B/C/D…) |
| **Order matching** | Paste Etsy/Amazon tables or one-line text → batch location lookup |
| **Two pick modes** | **By order** (one card per order, lines sorted by bin) · **By route** (walk A1→A2→B…, split into order bins at each stop) |
| **Merge sync** | Multi-user edits merge on upload/download — scan different zones at the same time |
| **Your own cloud** | Enter **your GitHub username + Token** on the shared site → your data, not mixed with others |
| **Local backup** | Copy / restore all data via clipboard |
| **Bilingual UI** | Chinese / English, large fonts, HarmonyOS Sans SC |
| **Responsive** | Phone, tablet, desktop; shelf grid scales on large screens |

### Use it with your own data (recommended, ~3 minutes)

**You do not need to deploy your own website.** Use the live app and point it at your GitHub repo:

1. **Sign up at [GitHub](https://github.com)** (free) if you don’t have an account.
2. **Fork this repo** — open the [warehouse-finder](https://github.com/chenjinbo2017/warehouse-finder) page, click **Fork** (top right, next to Star).  
   - Must be **logged in**.  
   - If you see *“No available destinations”*, you may have **already forked** — check your profile → Repositories for `warehouse-finder`.
3. **Create a Token** — [github.com/settings/tokens](https://github.com/settings/tokens) → **repo** scope (limit to your fork if possible).
4. Open **https://chenjinbo2017.github.io/warehouse-finder/** → **云 / Sync** tab:
   - **GitHub username** → your username  
   - **Repo** → `warehouse-finder` (default)  
   - **Token** → paste and tap **Save & Connect**

Done. Upload/download uses **your** `username/warehouse-finder` — independent from the author’s data.

**Optional:** Make your fork **Private** if you don’t want SKU locations public on GitHub.

### Pick lists (after pasting orders)

Tap **Match Locations**, then choose:

| Mode | Best for |
|------|----------|
| **Pick by order** | Pack one order at a time; each order is its own card; SKUs inside sorted by bin |
| **Pick by route** | One cart walk A1→A2→B…; same bin grouped once; split qty into order baskets |

**Paste examples:**

```
order: 10001
SKU: GEM-2408SY-19 Q: 1
SKU: GEM-24085Y-19 Q: 2

order: 10002
SKU: GEM-2508SY-27 Q: 1
```

Also: `SKU: GEM-2408SY-19 Q: 9 order: 003` · Etsy/Amazon CSV or Tab exports.

### Multi-user scanning

- Upload **merges** with cloud data before saving — A scans zone A, B scans zone B **at the same time** → both kept.
- Auto-upload ~1.2s after each edit; auto-pull ~every 25s.
- **Avoid** two people editing the **same cell** at once.

### Who can view vs edit?

| Situation | What happens |
|-----------|----------------|
| **You configured your username + Token** | Your cloud = **your fork only** |
| **Someone opens the live site, no setup** | Does **not** load another user’s data by default |
| **Public fork** | Anyone could read `warehouse-data.json` on GitHub → use **Private** fork if sensitive |
| **Token shared with team** | Anyone with Token can edit **that** repo’s cloud data |

### vs spreadsheets & paid tools

| | This app | Google Sheets / Excel | Sortly, Zoho, etc. |
|--|----------|----------------------|---------------------|
| **Monthly cost** | Free | Free | Often paid or limited free tier |
| **Shelf grid map** | Yes | Manual | Varies |
| **Phone scan → bin** | Yes | No | Yes (paid apps) |
| **Order → location list** | Yes, 2 pick modes | Manual VLOOKUP | Often yes |
| **Your data ownership** | Your GitHub repo | Google / Microsoft | Vendor’s servers |
| **Setup** | Fork + Token (~3 min) | Easiest | Account + subscription |

**Bottom line:** Not as plug-and-play as a spreadsheet, but **more capable and still free** for small warehouse + Etsy/Amazon workflows.

### Quick start (daily use)

1. Open the live app → add to home screen on phone (optional).
2. **Map:** zone → shelf → tap cell → scan → confirm.
3. **Search:** SKU lookup, or paste orders → **Match Locations** → pick mode.
4. **Sync:** username + Token once; then automatic.

### Advanced: deploy your own Pages URL

Only if you want a custom link (e.g. `you.github.io/warehouse-finder`):

1. Fork → Settings → Pages → **main** / root `/`
2. Or run `./deploy-pages.sh` ([GitHub CLI](https://cli.github.com/))

The shared live app + Sync settings is enough for most users.

### Project layout

```
warehouse-finder/
├── index.html           # Full app (HTML + CSS + JS)
├── warehouse-data.json  # Example / demo cloud data (author’s repo)
├── deploy-pages.sh      # GitHub Pages deploy helper
└── README.md
```

### Tech

- **GitHub Pages** + **GitHub API** (contents API for JSON sync)
- **localStorage** on device; merge on sync
- **Tesseract.js** OCR in browser
- **HarmonyOS Sans SC** for Chinese UI

### Contributing

Issues and PRs welcome. Most logic is in `index.html` — test scan and sync on mobile when changing those areas.

### License

MIT — fork and adapt for your warehouse.

---

## 中文

### 适合谁用？

- Etsy / Amazon 小卖家，货架按区 / 层 / 格存放
- **多人协作**（仓库录入、办公室查单、对订单）
- 想要 **零月费**、浏览器打开的轻量库位工具

### 主要功能

| 功能 | 说明 |
|------|------|
| **SKU 查找** | 输入或扫描 → 货架、层、格 |
| **扫码录入** | OCR → 可改 SKU → 确认 → 自动下一格 |
| **货架地图** | 多区多货架、可视化格子、插入空位 |
| **订单匹配** | 粘贴 Etsy/Amazon 表格或一行文字，批量匹配库位 |
| **两种拣货模式** | **按订单**（一单一张卡片，单内按库位排序）· **按库位路线**（A1→A2→B 推车分篮） |
| **合并同步** | 多人同时扫不同区，上传/下载自动合并，不互相覆盖 |
| **独立云端** | 在网页填 **自己的 GitHub 用户名 + Token** → 用自己的仓库数据 |
| **本地备份** | 剪贴板复制 / 恢复 |
| **中英双语** | 大字号 + HarmonyOS Sans SC 字体 |
| **响应式** | 手机 / 平板 / 电脑自适应 |

### 别人怎么用（推荐，约 3 分钟）

**不用自己部署网站。** 打开公共链接，在 Sync 页指向自己的 GitHub 即可：

1. **注册 [GitHub](https://github.com)**（免费）。
2. **Fork 本仓库** — 打开 [warehouse-finder](https://github.com/chenjinbo2017/warehouse-finder)，点右上角 **Fork**（在 Star 旁边）。  
   - 必须先 **登录**。  
   - 若提示 *No available destinations*，可能是 **已经 Fork 过** → 到个人主页 **Repositories** 里找 `warehouse-finder`。
3. **创建 Token** — [github.com/settings/tokens](https://github.com/settings/tokens)，勾选 **repo**（建议只授权自己的仓库）。
4. 打开 **https://chenjinbo2017.github.io/warehouse-finder/** → **云 / Sync**：
   - **GitHub 用户名**  
   - **仓库名**（默认 `warehouse-finder`）  
   - **Token** → **保存并连接**

之后上传/下载都进 **你自己的** `用户名/warehouse-finder`，和作者数据 **分开**。

**建议：** 若不想公开库位，把 Fork 改成 **私有仓库（Private）**。

### 拣货模式（粘贴订单后）

点 **匹配库位**，再选：

| 模式 | 适合 |
|------|------|
| **按订单拣货** | 一单一单捡、打包；每单一张卡片；单内 SKU 已按库位排好 |
| **按库位路线** | 推小车按 A1→A2→B 走；同一格只去一次，再分进各订单篮子 |

**粘贴示例：**

```
order: 10001
SKU: GEM-2408SY-19 Q: 1
SKU: GEM-24085Y-19 Q: 2

order: 10002
SKU: GEM-2508SY-27 Q: 1
```

也支持：`SKU: GEM-2408SY-19 Q: 9 order: 003`、Etsy/Amazon 表格复制。

### 多人同时扫描

- 上传前会 **合并** 云端数据，A 扫 A 区、B 扫 B 区可同时进行。
- 录入后约 1.2 秒自动上传；约 25 秒自动拉取合并。
- 提示：**「已自动同步（已合并）✅」**
- 避免两人同时改 **同一格**。

### 谁能看？谁能改？

| 情况 | 说明 |
|------|------|
| **配好自己的用户名 + Token** | 云端只连 **自己的 Fork** |
| **只打开网页、未配置** | **不会** 默认加载别人的数据 |
| **公开 Fork** | GitHub 上 JSON 可被查看 → 敏感数据用 **私有仓库** |
| **把 Token 给同事** | 有 Token 的人可改 **该仓库** 的云端数据 |

### 和表格 / 收费软件比

| | 本工具 | 谷歌表格 / Excel | Sortly、Zoho 等 |
|--|--------|------------------|-----------------|
| **月费** | 免费 | 免费 | 常收费或免费受限 |
| **货架格子地图** | 有 | 需自己画表 | 看产品 |
| **手机扫码录入** | 有 | 无 | 常有（多收费） |
| **订单对库位 + 拣货路线** | 有，两种模式 | 需公式 | 常有 |
| **数据归属** | 你自己的 GitHub | 谷歌 / 微软 | 服务商服务器 |
| **上手** | Fork + Token（约 3 分钟） | 最简单 | 注册 + 订阅 |

**结论：** 比表格强、比商业 WMS 省事省钱；唯一门槛是 **Fork + Token**，Sync 页里已写清步骤。

### 日常使用

1. 打开链接（手机可加主屏幕）。
2. **录入 / Map：** 区 → 货架 → 格子 → 扫码。
3. **查找 / Search：** 查 SKU 或粘贴订单 → 选拣货模式。
4. **云 / Sync：** 首次配置用户名 + Token，之后自动同步。

### 进阶：自己的 Pages 域名（可选）

想要 `你的用户名.github.io/warehouse-finder` 这种专属链接时：

1. Fork → Settings → Pages → **main** / 根目录 `/`
2. 或运行 `./deploy-pages.sh`

多数用户 **只用公共链接 + Sync 配置** 即可。

### 项目结构

```
warehouse-finder/
├── index.html
├── warehouse-data.json   # 作者仓库中的示例/演示数据
├── deploy-pages.sh
└── README.md
```

### 技术说明

- GitHub Pages + GitHub API 同步 JSON
- 浏览器 localStorage + 合并逻辑
- Tesseract.js 本地 OCR
- HarmonyOS Sans SC 中文字体

### 参与贡献

欢迎 Issue / PR。改动录入或同步逻辑时建议在手机上实测扫码。

### 许可

MIT — 可自由 Fork 用于自己的仓库。
