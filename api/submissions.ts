import { handleCreativeCareSubmission } from '../lib/creativeCareSubmissionHandler.js';

async function readJsonBody(req: any) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}');
  }

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1_000_000) {
      throw new Error('Request body too large');
    }
  }

  return JSON.parse(raw || '{}');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const result = await handleCreativeCareSubmission(payload);
    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error('Creative Care submission failed', error);
    res.status(502).json({ ok: false, error: 'Submission notification failed' });
  }
}
