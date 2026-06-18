# 仓库找货 · Warehouse Finder

[![Live Demo](https://img.shields.io/badge/在线使用-Live_Demo-coral?style=for-the-badge)](https://chenjinbo2017.github.io/warehouse-finder/)

一款面向小型仓库、电商发货场景的 **SKU 库位管理工具**。  
在手机上扫码录入、在电脑上查单找货，支持两人通过 GitHub 免费云同步。

> **在线地址：** https://chenjinbo2017.github.io/warehouse-finder/  
> 手机浏览器打开即可使用，无需安装 App。

---

## 适合谁用？

- etsy / Amazon 等小卖家，仓库里 SKU 多、靠货架格子存货
- 1～2 人协作发货，需要快速查「这个 SKU 在哪一格」
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
| **云同步** | 通过 GitHub 仓库自动备份，两人改完自动同步 |
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

### 5. 云同步（可选，两人协作）

进入 **「云 / Sync」** 页：

1. 在 GitHub 创建 [Personal Access Token](https://github.com/settings/tokens)（勾选 **repo** 权限）
2. 粘贴 Token 并保存
3. 录入后会 **约 1.2 秒自动上传**；每 25 秒自动拉取最新数据

> Token 只保存在本机浏览器，不会上传到别处。请勿把 Token 发给他人。

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

- 本演示仓库为 **公开仓库**，`warehouse-data.json` 可被任何人 **读取**（查看 SKU 与库位）
- **修改** 云端数据需要 GitHub Token，陌生人无法随意篡改
- 若库位信息敏感，请 Fork 为 **私有仓库** 并自行部署，或仅使用本地备份功能

---

## English Summary

**Warehouse Finder** is a free, browser-based SKU location tool for small warehouses and e-commerce shippers.

- **Live demo:** https://chenjinbo2017.github.io/warehouse-finder/
- Scan or type a SKU → get shelf / row / col
- Visual shelf grid for mapping bins
- Paste Etsy / Amazon orders to batch-match locations
- Optional GitHub sync for two-person collaboration
- No install, no server, no monthly fee

---

## License

MIT — feel free to fork and adapt for your own warehouse.
