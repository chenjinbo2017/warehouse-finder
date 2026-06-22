#!/usr/bin/env node
/**
 * Bulk import A28 shelf from photo OCR / label reading.
 * Usage: node scripts/import-a28.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'warehouse-data.json');

const A28_ROWS = {
  1: [
    'GEM-1159-6',
    'COR-0111-02-2', 'COR-0111-02-3', 'COR-0111-02-4', 'COR-0111-02-6', 'COR-0111-02-8',
    'COR-0111-02-10', 'COR-0111-02-12', 'COR-0111-02-14', 'COR-0111-02-16', 'COR-0111-02-18',
    'COR-0111-02-20',
    'COR-0111-04-2', 'COR-0111-04-3', 'COR-0111-04-4', 'COR-0111-04-6', 'COR-0111-04-8',
    'COR-0111-04-10', 'COR-0111-01-2', 'COR-0111-01-3',
  ],
  2: [
    'GEM-0111-02-2', 'GEM-0111-02-3', 'GEM-0111-02-4', 'GEM-0111-02-6', 'GEM-0111-02-8',
    'GEM-0111-02-10', 'GEM-0111-02-12', 'GEM-0111-02-14',
    'GEM-1120-1', 'GEM-1120-2', 'GEM-1120-3', 'GEM-1120-4',
    'GEM-0111-02-16', 'GEM-0111-02-18', 'GEM-0111-02-20',
  ],
  3: [
    'GEM-2412SY-13', 'GEM-2412SY-14', 'GEM-2412SY-15', 'GEM-2412SY-16', 'GEM-2412SY-17',
    'GEM-2412SY-18', 'GEM-2412SY-19', 'GEM-2412SY-20', 'GEM-2412SY-21', 'GEM-2412SY-22',
    'GEM-2412SY-23', 'GEM-2412SY-24', 'GEM-2412SY-25', 'GEM-2412SY-26', 'GEM-2412SY-27',
    'GEM-2412SY-28', 'GEM-2412SY-29', 'GEM-2412SY-30',
  ],
  4: [
    'GEM-2412SY-09', 'GEM-2412SY-08', 'GEM-2412SY-06', 'GEM-2412SY-05',
    'GEM-2312SY-07-G', 'GEM-2312SY-07-S', 'GEM-2312SY-07-R', 'GEM-2312SY-07-B',
    'GEM-2312SY-07-W', 'GEM-2312SY-07-K', 'GEM-2312SY-07-N', 'GEM-2312SY-07-L',
    'GEM-2312SY-07-P', 'GEM-2312SY-07-Y', 'GEM-2312SY-07-O', 'GEM-2312SY-07-V',
  ],
  5: [
    'GEM-2508-100', 'GEM-2508-27', 'GEM-2508-41', 'GEM-2508-40', 'GEM-2508-25', 'GEM-2508-26',
    'GEM-2508-30', 'GEM-2508-31', 'GEM-2508-29', 'GEM-2508-28', 'GEM-2508-32', 'GEM-2508-33',
    'GEM-2508-34', 'GEM-2508-35', 'GEM-2508-36', 'GEM-2508-37', 'GEM-2508-38', 'GEM-2508-39',
    'GEM-2508-42',
  ],
  6: [
    'GEM-2508-43', 'GEM-2508-44', 'GEM-2508-45', 'GEM-2508-46', 'GEM-2508-47', 'GEM-2508-48',
    'GEM-2508-49', 'GEM-2508-50', 'GEM-2508-51', 'GEM-2508-52', 'GEM-2508-53', 'GEM-2508-54',
  ],
  7: [
    'GEM-4550-10', 'GEM-4550-8', 'GEM-4550-6', 'GEM-2508-27', 'GEM-2508-25', 'GEM-2508-20',
    'GEM-2508-18', 'GEM-2508-14', 'GEM-2508-12', 'GEM-2508-10', 'GEM-2508-8', 'GEM-2508-6',
    'GEM-2508-4',
  ],
  8: [
    'GEM-2412SY-09', 'GEM-2412SY-08', 'GEM-2412SY-06',
    'GEM-2224-10', 'GEM-2224-8', 'GEM-2224-6',
    'GEM-1334SY-12', 'GEM-1334SY-10', 'GEM-1334SY-08', 'GEM-1334SY-06', 'GEM-1334SY-04',
    'GEM-7001SY-12', 'GEM-7001SY-10', 'GEM-7001SY-08', 'GEM-7001SY-06', 'GEM-7001SY-04',
    'GEM-3101-10', 'GEM-3101-08',
  ],
  9: [
    'GEM-230113-01-2', 'GEM-230113-01-2', 'GEM-230113-01-2', 'GEM-230113-01-2', 'GEM-230113-01-2M',
    'GEM-2508-08', 'GEM-2508-10', 'GEM-2508-12',
    'GEM-1111SY-02-M', 'GEM-1111SY-03-M', 'GEM-1111SY-04-M',
    'FLUB-110S-2', 'FLUB-110S-3', 'FLUB-110S-4',
    'FL-110S',
    'GEM-2514-08', 'GEM-2514-10', 'GEM-2514SY-02', 'GEM-2514SY-03', 'GEM-2514-06', 'GEM-2514-08',
  ],
};

function cellKey(shelf, row, col) {
  return `${shelf}-${row}-${col}`;
}

function isCellKey(k) {
  return /^[A-Z]\d+-\d+-\d+$/.test(k);
}

function applyA28(data) {
  const shelf = 'A28';
  let added = 0;
  let maxCol = 0;
  const maxRow = Math.max(...Object.keys(A28_ROWS).map(Number));

  for (const [rowStr, skus] of Object.entries(A28_ROWS)) {
    const row = Number(rowStr);
    skus.forEach((sku, i) => {
      const col = i + 1;
      maxCol = Math.max(maxCol, col);
      const key = cellKey(shelf, row, col);
      data.db[key] = { sku, shelf, row, col };
      data.db[sku] = { name: '', shelf, row, col };
      added++;
    });
  }

  data.shelfCfg = data.shelfCfg || {};
  data.shelfCfg.A28 = {
    rows: Math.max(maxRow, data.shelfCfg.A28?.rows || 9),
    cols: Math.max(maxCol, data.shelfCfg.A28?.cols || 15),
    name: data.shelfCfg.A28?.name || '',
  };
  data.updatedAt = new Date().toISOString();
  return { added, maxRow, maxCol };
}

const payload = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const before = Object.keys(payload.db).filter(isCellKey).filter(k => k.startsWith('A28-')).length;
const { added, maxRow, maxCol } = applyA28(payload);
const after = Object.keys(payload.db).filter(isCellKey).filter(k => k.startsWith('A28-')).length;

fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2) + '\n');
console.log(`A28 import done: ${added} cells written (${before} → ${after} A28 cells), grid ${maxRow}×${maxCol}`);
