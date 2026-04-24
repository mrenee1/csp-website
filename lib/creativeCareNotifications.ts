const notificationRecipient = 'michelle@creativesolutionspartners.com';

function htmlEscape(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatLabel(key: string) {
  return key
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getSubject(payload: Record<string, unknown>) {
  const variant = payload.form_variant === 'consultation' ? 'Consultation Intake' : 'Quick Intake';
  const company = payload.company ? `: ${payload.company}` : '';
  return `New Creative Care ${variant}${company}`;
}

function getPlainText(payload: Record<string, unknown>) {
  const fields = [
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

  return fields
    .filter((field) => payload[field])
    .map((field) => `${formatLabel(field)}: ${payload[field]}`)
    .join('\n');
}

function getHtml(payload: Record<string, unknown>) {
  const fields = [
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

  const rows = fields
    .filter((field) => payload[field])
    .map((field) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;">${htmlEscape(formatLabel(field))}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${htmlEscape(payload[field])}</td>
      </tr>
    `)
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h1 style="font-size:20px;margin:0 0 16px;">${htmlEscape(getSubject(payload))}</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px;">${rows}</table>
    </div>
  `;
}

export async function notifyCreativeCareSubmission(payload: Record<string, unknown>) {
  if (payload.website) {
    return { ok: true, skipped: true };
  }

  const webhookUrl = process.env.SUBMISSION_NOTIFICATION_WEBHOOK_URL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'creative-care-submission',
        recipient: notificationRecipient,
        subject: getSubject(payload),
        payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`Notification webhook failed with status ${response.status}`);
    }

    return { ok: true, provider: 'webhook' };
  }

  if (resendApiKey) {
    const from = process.env.SUBMISSION_NOTIFICATION_FROM || 'Creative Solutions Partners <notifications@creativesolutionspartners.com>';
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: notificationRecipient,
        reply_to: typeof payload.work_email === 'string' ? payload.work_email : undefined,
        subject: getSubject(payload),
        text: getPlainText(payload),
        html: getHtml(payload),
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend notification failed with status ${response.status}`);
    }

    return { ok: true, provider: 'resend' };
  }

  return { ok: false, skipped: true, reason: 'missing notification configuration' };
}
