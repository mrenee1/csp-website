import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import { join } from 'node:path';
import { get, put } from '@vercel/blob';

const csvColumns = [
  'submitted_at',
  'form_variant',
  'source_page',
  'full_name',
  'title',
  'company',
  'work_email',
  'phone',
  'team_size',
  'timeline',
  'priority',
  'challenge',
  'notes',
  'goals',
  'consent',
];

function csvEscape(value: unknown) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

async function ensureSpreadsheet(filePath: string, root: string) {
  await mkdir(join(root, 'submissions'), { recursive: true });

  try {
    await readFile(filePath, 'utf8');
  } catch {
    await writeFile(filePath, `${csvColumns.join(',')}\n`, 'utf8');
  }
}

async function streamToText(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return text;
}

async function appendBlobSpreadsheet(pathname: string, row: string) {
  let existing = `${csvColumns.join(',')}\n`;

  try {
    const blob = await get(pathname, { access: 'private', useCache: false });
    if (blob?.statusCode === 200 && blob.stream) {
      existing = await streamToText(blob.stream);
      if (!existing.endsWith('\n')) {
        existing += '\n';
      }
    }
  } catch {
    existing = `${csvColumns.join(',')}\n`;
  }

  const result = await put(pathname, `${existing}${row}\n`, {
    access: 'private',
    allowOverwrite: true,
    contentType: 'text/csv; charset=utf-8',
  });

  return result.pathname;
}

async function appendLocalSpreadsheet(filePath: string, root: string, row: string) {
  await ensureSpreadsheet(filePath, root);
  await appendFile(filePath, `${row}\n`, 'utf8');
  return filePath;
}

export async function saveCreativeCareSubmission(payload: Record<string, unknown>, root = process.cwd()) {
  if (payload.website) {
    return { ok: true, skipped: true };
  }

  const variant = payload.form_variant === 'consultation' ? 'consultation' : 'quick';
  const row = csvColumns.map((column) => {
    if (column === 'submitted_at') {
      return csvEscape(new Date().toISOString());
    }

    return csvEscape(payload[column]);
  });

  const rowText = row.join(',');

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const pathname = await appendBlobSpreadsheet(`submissions/${variant}-submissions.csv`, rowText);
    return { ok: true, variant, storage: 'vercel-blob', path: pathname };
  }

  const filePath = join(root, 'submissions', `${variant}-submissions.csv`);
  const pathname = await appendLocalSpreadsheet(filePath, root, rowText);
  return { ok: true, variant, storage: 'local-csv', path: pathname };
}
