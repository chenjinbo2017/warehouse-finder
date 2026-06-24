#!/usr/bin/env node
/**
 * Bulk import A1 shelf — 9 rows only, 5 photos top→bottom.
 * Each photo: take top 2 rows, except photo 5 takes 1 row (9 total: 2+2+2+2+1).
 * Duplicate SKUs (within row or across rows) are skipped — first position wins.
 * Usage: node scripts/import-a1.js
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'warehouse-data.json');

const PHOTO_ROWS = [
  // Photo 1 — top of A1
  [
    [
      'GEM-2309HB-01-8', 'GEM-2309HB-01-10',
      'GEM-0006VP-AGA-01-4', 'GEM-0006VP-AGA-01-6', 'GEM-0006VP-AGA-01-8',
    ],
    [
      'GEM-2309SY-102-6', 'GEM-2309SY-102-8', 'GEM-2309SY-102-10', 'GEM-2309SY-102-12',
      'GEM-2309SY-103-6', 'GEM-2309SY-103-8', 'GEM-2309SY-103-10', 'GEM-2309SY-103-12',
      'GEM-2309SY-104-6', 'GEM-2309SY-104-8', 'GEM-2309SY-104-10',
    ],
  ],
  // Photo 2
  [
    [
      'GEM-1114-10', 'GEM-1114-12', 'GEM-1114-0012-12', 'GEM-2508-011-8', 'GEM-2508-011-10',
      'GEM-2508-011-12', 'GEM-2508-11-8', 'GEM-2508-11-10', 'GEM-2508-11-12', 'GEM-2508-11-14',
      'GEM-2508-11-16',
    ],
    [
      'GEM-1114-001-8', 'GEM-1114-001-10', 'GEM-1114-001-12', 'GEM-1114-002-6', 'GEM-1114-002-8',
      'GEM-1114-002-10', 'GEM-1114-002-12', 'GEM-2412SY-06', 'GEM-2412SY-08', 'GEM-2412SY-10',
      'GEM-2412SY-12', 'GEM-2412SY-14',
    ],
  ],
  // Photo 3
  [
    [
      'GEM-4550-8', 'GEM-4550-10', 'GEM-4550-12', 'GEM-2290-04', 'GEM-2290-06', 'GEM-2290-08',
      'GEM-2290-10', 'GEM-2290-12', 'GEM-2290-14',
    ],
    [
      'GEM-AGA-0022-4', 'GEM-AGA-0022-6', 'GEM-AGA-0022-8', 'GEM-MOT-01-04', 'GEM-MOT-01-06',
      'GEM-AGA-0022-10', 'GEM-AGA-0022-12', 'GEM-AGA-0022-14', 'GEM-AGA-0022-10', 'GEM-AGA-0022-12',
      'GEM-MOT-01-04', 'GEM-MOT-01-06', 'GEM-MOT-01-08',
    ],
  ],
  // Photo 4 — AGATE sign (row 1: first 3 bins unreadable, skipped)
  [
    [
      'GEM-2508BP-04A', 'GEM-2508BP-06A', 'GEM-2508BP-08A', 'GEM-2508BP-10A',
      'GEM-1711BP-04A', 'GEM-1711BP-06A', 'GEM-1711BP-08A', 'GEM-1711BP-10A', 'GEM-1711BP-12A',
    ],
    [
      'GEM-2507BP-04A', 'GEM-2507BP-06A', 'GEM-2507BP-08A', 'GEM-2507BP-10A', 'GEM-2507BP-12A',
      'GEM-2507BP-14A', 'GEM-2507BP-16A', 'GEM-2507BP-18A', 'GEM-2507BP-20A', 'GEM-2507BP-22A',
      'GEM-1712BP-04A', 'GEM-1712BP-06A',
    ],
  ],
  // Photo 5 — bottom of A1 (use row with GEM-2508-100 as the 9th layer)
  [
    [
      'GEM-2508-100', 'GEM-2508-27', 'GEM-2508-101', 'GEM-2508-102', 'GEM-2508-103', 'GEM-2508-104',
      'GEM-2508-105', 'GEM-2508-106', 'GEM-2508-107', 'GEM-2508-108', 'GEM-2508-109', 'GEM-2508-110',
    ],
  ],
];

const TAKE_PER_PHOTO = [2, 2, 2, 2, 1];
const SHELF_ROWS = 9;

function normSku(s) {
  return String(s || '').trim().toUpperCase();
}

function isCellKey(k) {
  return /^[A-Z]\d+-\d+-\d+$/.test(k);
}

function cellKey(shelf, row, col) {
  return `${shelf}-${row}-${col}`;
}

function buildA1Rows() {
  const rows = {};
  const globalSeen = new Set();
  let a1Row = 1;

  for (let p = 0; p < PHOTO_ROWS.length && a1Row <= SHELF_ROWS; p++) {
    const take = TAKE_PER_PHOTO[p];
    for (let r = 0; r < take && a1Row <= SHELF_ROWS; r++) {
      const list = [];
      for (const sku of PHOTO_ROWS[p][r]) {
        const n = normSku(sku);
        if (!n || globalSeen.has(n)) continue;
        globalSeen.add(n);
        list.push(sku);
      }
      rows[a1Row] = list;
      a1Row++;
    }
  }
  return rows;
}

function clearA1(data) {
  const shelf = 'A1';
  const removedSkus = new Set();
  for (const key of Object.keys(data.db)) {
    if (!key.startsWith(`${shelf}-`) || !isCellKey(key)) continue;
    const sku = data.db[key]?.sku;
    if (sku) removedSkus.add(sku);
    delete data.db[key];
  }
  for (const sku of removedSkus) {
    const meta = data.db[sku];
    if (meta && meta.shelf === shelf) delete data.db[sku];
  }
}

function applyA1(data) {
  const shelf = 'A1';
  const A1_ROWS = buildA1Rows();
  const written = new Set();
  let added = 0;
  let maxCol = 0;
  let skippedDup = 0;

  clearA1(data);

  for (const [rowStr, skus] of Object.entries(A1_ROWS)) {
    const row = Number(rowStr);
    skus.forEach((sku, i) => {
      const col = i + 1;
      maxCol = Math.max(maxCol, col);
      const key = cellKey(shelf, row, col);
      written.add(key);
      data.db[key] = { sku, shelf, row, col };
      data.db[sku] = { name: '', shelf, row, col };
      added++;
    });
  }

  // count skipped dups for log
  const globalSeen = new Set();
  for (const photo of PHOTO_ROWS) {
    for (const row of photo) {
      for (const sku of row) {
        const n = normSku(sku);
        if (globalSeen.has(n)) skippedDup++;
        else globalSeen.add(n);
      }
    }
  }
  skippedDup -= added;

  data.shelfCfg = data.shelfCfg || {};
  data.shelfCfg.A1 = {
    rows: SHELF_ROWS,
    cols: Math.max(maxCol, 12),
    name: data.shelfCfg.A1?.name || '',
  };

  if (data.tombstones?.cells?.length) {
    data.tombstones.cells = data.tombstones.cells.filter(k => !k.startsWith('A1-') || written.has(k));
  }

  data.updatedAt = new Date().toISOString();
  return { added, maxCol, skippedDup, rowCounts: Object.fromEntries(Object.entries(A1_ROWS).map(([r, s]) => [r, s.length])) };
}

const payload = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const { added, maxCol, skippedDup, rowCounts } = applyA1(payload);

fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2) + '\n');
console.log(`A1 import: ${added} cells, 9×${maxCol}, skipped ${skippedDup} duplicate SKUs`);
console.log('per row:', rowCounts);
