# 仓库找货 · Warehouse Finder

[![Live Demo](https://img.shields.io/badge/在线使用-Live_Demo-coral?style=for-the-badge)](https://chenjinbo2017.github.io/warehouse-finder/)

一款面向小型仓库、电商发货场景的 **SKU 库位管理工具**。  
在手机上扫码录入、在电脑上查单找货，支持 **多人协作**（有 Token 可编辑，其他人可查看）。

> **在线地址：** https://chenjinbo2017.github.io/warehouse-finder/  
> 手机浏览器打开即可使用，无需安装 App。

---

## 谁能看？谁能改？

这是很多人关心的问题，分开说明：

| 角色 | 能做什么 | 需要什么 |
|------|----------|----------|
| **任何人** | 打开网页、查 SKU、看库位（读公开数据） | 无需登录、无需 Token |
| **有 Token 的协作者** | 录入、修改、删除库位，并 **上传到云端** | 在本机 Sync 页保存 **GitHub Token** |
| **没有 Token 的人** | 只能查、只能在本机浏览器里改（**改不动你们的云端**） | — |

**关于「别人下载后能不能改」——分两种情况：**

1. **改你们这份共享数据**（`chenjinbo2017/warehouse-finder` 里的 `warehouse-data.json`）  
   → 只有持有 **你们仓库写权限 Token** 的人才能改。路人下载代码 **改不了你们的云端**。

2. **Fork / 克隆后自己用**  
   → 任何人都可以 Fork 本仓库、部署到自己的 GitHub Pages、录入 **自己的** 仓库数据。  
   → 那是 **另一套独立数据**，与你们互不影响。

**查看方面：** 因为仓库是公开的，别人可以直接看到 `warehouse-data.json` 里的 SKU 和库位（相当于「公开只读」）。若不想被外人看到，需要改用 **私有仓库** 自行部署。

**协作建议：** 需要录入权限的同事，各自在 Sync 页保存 **同一个 Token**（或各自创建有 repo 权限的 Token）。Token 只给信任的人；谁有 Token，谁就能改云端。

---

## 适合谁用？

- Etsy / Amazon 等小卖家，仓库里 SKU 多、靠货架格子存货
- **多人协作**发货（仓库员录入、办公室查单等）
- 不想买 WMS 系统，希望 **零成本、打开网页就能用**

---

## 主要功能

| 功能 | 说明 |
|------|------|
| **SKU 查找** | 输入或扫描 SKU，立即显示货架、层、格位置 |
| **扫码录入** | 相机 OCR 识别标签，可修改后再确认，连续录入下一格 |
| **货架地图** | 可视化网格，点击格子查看 / 编辑 / 插入空位 |
| **多区多货架** | 支持 A/B/C/D 等分区，每区货架数量可自定义（如 A 区 16 个） |
| **订单匹配** | 粘贴 Etsy / Amazon 订单或简单一行文字，批量匹配库位 |
| **云同步** | 通过 GitHub 仓库自动备份，多人有 Token 即可协作编辑 |
| **本地备份** | 一键复制全部数据到剪贴板，可粘贴到备忘录 |
| **中英双语** | 界面中英文对照，字号偏大，适合仓库现场操作 |
| **响应式布局** | 手机、平板、电脑自适应，大屏货架网格自动放大 |

---

## 快速上手

### 1. 打开网页

用手机或电脑访问：  
**https://chenjinbo2017.github.io/warehouse-finder/**

建议 **添加到主屏幕**（iPhone：Safari 分享 → 添加到主屏幕），以后像 App 一样点开。

### 2. 录入库位（「录入 / Map」页）

1. 选择 **区**（如 A 区）和 **货架**（如 A1）
2. 可设置货架名称、层数、每层格数
3. 点击空格子 → 扫描或输入 SKU → 确认
4. 录入后会自动跳到下一格，方便连续操作

点击区标签旁的 **⚙️** 可调整各区货架数量、添加新区（如 E 区）。

### 3. 查找 SKU（「查找 / Search」页）

- 输入 SKU 或点 **📷** 扫描标签
- 显示货架名、层、格，以及完整位置（如 `A1 · 2-6`）

### 4. 批量匹配订单

在「查找」页下方粘贴订单，点 **匹配库位**。

**支持格式示例：**

```
SKU: GEM-2408SY-19 Q: 9 order: 003
```

也支持 Etsy / Amazon 导出的 **CSV / Tab 表格**（需含订单号、SKU 列），以及多行分块文本。

### 5. 云同步（可选，多人协作）

进入 **「云 / Sync」** 页：

1. 在 GitHub 创建 [Personal Access Token](https://github.com/settings/tokens)（勾选 **repo** 权限；建议限定本仓库）
2. 需要 **录入 / 改库位** 的同事，各自粘贴 Token 并保存
3. 录入后会 **约 1.2 秒自动上传**；每 25 秒自动拉取最新数据

> Token 只保存在 **各自手机 / 电脑的浏览器** 里，不会上传到别的服务器。  
> 只把 Token 发给需要改数据的同事；只查货的人 **不用给 Token**。

**只查不改的人：** 打开链接即可，不用配置 Token。

---

## 自己部署 / Fork 使用

本仓库是 **单文件应用**（`index.html`），无后端、无数据库。

若你想用自己的数据和仓库：

1. **Fork** 本仓库，或 `git clone` 后推到自己的 GitHub
2. 在仓库 Settings → Pages 中，Source 选 **main** 分支、根目录 `/`
3. 修改 `index.html` 里的 `GH_OWNER`、`GH_REPO` 为你的用户名和仓库名
4. 打开你的 Pages 地址，在 Sync 页填入 **你自己仓库** 的 Token

也可直接运行 `./deploy-pages.sh`（需安装 [GitHub CLI](https://cli.github.com/)）一键创建仓库并开启 Pages。

---

## 项目结构

```
warehouse-finder/
├── index.html           # 完整应用（HTML + CSS + JS）
├── warehouse-data.json  # 云端同步的数据文件（SKU 与货架配置）
├── deploy-pages.sh      # GitHub Pages 部署脚本
└── README.md
```

---

## 技术说明

- 纯静态页面，托管于 **GitHub Pages**（免费）
- 数据默认存浏览器 **localStorage**；开启同步后写入 GitHub 仓库中的 JSON 文件
- OCR 使用 [Tesseract.js](https://tesseract.projectnaptha.com/)，在浏览器本地识别
- 字体：[HarmonyOS Sans SC](https://github.com/HarmonyOS/HarmonyOS-Sans)（中文界面）

---

## 隐私与安全

- 公开仓库下，`warehouse-data.json` 可被任何人 **在线查看**（SKU、库位）
- **修改你们的云端数据** 需要 GitHub Token（写权限）；没有 Token 的访客 **不能改你们的共享数据**
- 别人 **Fork 走代码** 后可以搭建 **自己的另一套系统**，不等于能改你们这份
- 若库位信息不想被外人看到：改用 **私有仓库** + 自行部署 Pages，或仅团队内部分享链接 + 私有仓库

---

## English Summary

**Warehouse Finder** is a free, browser-based SKU location tool for small warehouses and e-commerce shippers.

- **Live demo:** https://chenjinbo2017.github.io/warehouse-finder/
- Scan or type a SKU → get shelf / row / col
- Visual shelf grid for mapping bins
- Paste Etsy / Amazon orders to batch-match locations
- Optional GitHub sync — **any number of editors** with a token; others can view without one
- No install, no server, no monthly fee

---

## License

MIT — feel free to fork and adapt for your own warehouse.
