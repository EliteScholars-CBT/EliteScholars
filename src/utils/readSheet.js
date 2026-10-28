// Reads student names from an uploaded .xlsx, .csv or .txt file, in the browser, with no extra libraries.
// .xlsx is a zip of XML files; we unzip with the browser's DecompressionStream and read the first sheet.

const u16 = (b, o) => b[o] | (b[o + 1] << 8);
const u32 = (b, o) => (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;
const dec = new TextDecoder('utf-8');

async function inflateRaw(bytes) {
  if (typeof DecompressionStream === 'undefined') throw new Error('This browser cannot open Excel files. Save the sheet as CSV and upload that, or update your browser.');
  const ds = new DecompressionStream('deflate-raw');
  const w = ds.writable.getWriter(); w.write(bytes); w.close();
  return new Uint8Array(await new Response(ds.readable).arrayBuffer());
}

async function unzip(buf) {
  const b = new Uint8Array(buf);
  let e = -1;
  for (let i = b.length - 22; i >= Math.max(0, b.length - 70000); i--) if (u32(b, i) === 0x06054b50) { e = i; break; }
  if (e < 0) throw new Error('That does not look like an Excel (.xlsx) file.');
  const n = u16(b, e + 10); let p = u32(b, e + 16);
  const files = {};
  for (let k = 0; k < n; k++) {
    if (u32(b, p) !== 0x02014b50) break;
    const method = u16(b, p + 10), csz = u32(b, p + 20), nl = u16(b, p + 28), el = u16(b, p + 30), cl = u16(b, p + 32), lo = u32(b, p + 42);
    const name = dec.decode(b.subarray(p + 46, p + 46 + nl));
    files[name] = { method, csz, lo };
    p += 46 + nl + el + cl;
  }
  const read = async (name) => {
    const f = files[name]; if (!f) return null;
    const ln = u16(b, f.lo + 26), le = u16(b, f.lo + 28), start = f.lo + 30 + ln + le;
    const raw = b.subarray(start, start + f.csz);
    return dec.decode(f.method === 0 ? raw : await inflateRaw(raw));
  };
  return { read, names: Object.keys(files) };
}

const unxml = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d)).replace(/&amp;/g, '&');
const colIdx = (ref) => { const m = /^([A-Z]+)/.exec(ref || ''); if (!m) return 0; let n = 0; for (const ch of m[1]) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; };

async function xlsxRows(buf) {
  const z = await unzip(buf);
  const sstXml = await z.read('xl/sharedStrings.xml');
  const sst = [];
  if (sstXml) for (const m of sstXml.matchAll(/<si[^>]*>([\s\S]*?)<\/si>/g)) sst.push(unxml([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join('')));
  const sheetName = z.names.filter((x) => /^xl\/worksheets\/sheet\d+\.xml$/.test(x)).sort((a, c) => a.localeCompare(c, undefined, { numeric: true }))[0];
  if (!sheetName) throw new Error('No sheet found in that file.');
  const xml = await z.read(sheetName);
  const rows = [];
  for (const rm of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const row = [];
    for (const cm of rm[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attrs = cm[1], body = cm[2] || '';
      const ref = /r="([A-Z]+\d+)"/.exec(attrs); const t = /t="(\w+)"/.exec(attrs);
      let val = '';
      if (t && t[1] === 'inlineStr') val = unxml([...body.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join(''));
      else { const v = /<v>([\s\S]*?)<\/v>/.exec(body); if (v) val = t && t[1] === 's' ? (sst[+v[1]] || '') : unxml(v[1]); }
      row[colIdx(ref && ref[1])] = String(val).trim();
    }
    rows.push(row.map((x) => x || ''));
  }
  return rows;
}

function csvRows(text) {
  const rows = []; let row = [], cur = '', q = false;
  const t = text.replace(/^﻿/, '');
  const delim = (t.split('\n')[0].match(/;/g) || []).length > (t.split('\n')[0].match(/,/g) || []).length ? ';' : (t.split('\n')[0].includes('\t') ? '\t' : ',');
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === delim) { row.push(cur.trim()); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(cur.trim()); rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur.trim()); rows.push(row); }
  return rows;
}

// Picks the name column (by header) or combines first + last name columns, else uses the first column.
function namesFrom(rows) {
  rows = rows.filter((r) => r && r.some((x) => x));
  if (!rows.length) return [];
  const head = rows[0].map((x) => String(x || '').toLowerCase());
  const has = (re) => head.findIndex((h) => re.test(h));
  const full = has(/^(full ?name|student( name)?|name|names|pupil|learner)$/);
  const first = has(/first|given|forename/), last = has(/last|sur ?name|family/);
  const isHeader = full >= 0 || first >= 0 || last >= 0;
  const body = isHeader ? rows.slice(1) : rows;
  let out;
  if (full >= 0) out = body.map((r) => r[full]);
  else if (first >= 0 && last >= 0) out = body.map((r) => `${r[first] || ''} ${r[last] || ''}`);
  else if (first >= 0) out = body.map((r) => r[first]);
  else out = body.map((r) => r.find((x) => x && /[A-Za-z]/.test(x)) || '');
  return [...new Set(out.map((x) => String(x || '').replace(/\s+/g, ' ').trim()).filter((x) => x.length >= 2 && /[A-Za-z]/.test(x)))];
}

export async function readStudentNames(file) {
  const name = (file.name || '').toLowerCase();
  let rows;
  if (name.endsWith('.xlsx') || name.endsWith('.xlsm') || file.type.includes('spreadsheetml')) rows = await xlsxRows(await file.arrayBuffer());
  else if (name.endsWith('.xls')) throw new Error('Old .xls files cannot be read. In Excel choose Save As, then ".xlsx" or "CSV", and upload that.');
  else rows = csvRows(await file.text());
  const names = namesFrom(rows);
  if (!names.length) throw new Error('No student names found. Put names in the first column (or a column headed "Name").');
  return names;
}

// Raw rows (array of arrays) from .xlsx / .csv, for importing questions.
export async function readSheetRows(file) {
  const name = (file.name || '').toLowerCase();
  if (name.endsWith('.xlsx') || name.endsWith('.xlsm') || file.type.includes('spreadsheetml')) return xlsxRows(await file.arrayBuffer());
  if (name.endsWith('.xls')) throw new Error('Old .xls files cannot be read. Save as .xlsx or CSV and upload that.');
  return csvRows(await file.text());
}
