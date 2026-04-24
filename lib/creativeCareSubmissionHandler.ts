import { notifyCreativeCareSubmission } from './creativeCareNotifications.js';
import { saveCreativeCareSubmission } from './creativeCareSubmissions.js';

export async function handleCreativeCareSubmission(payload: Record<string, unknown>, root = process.cwd()) {
  const saveResult = await saveCreativeCareSubmission(payload, root);

  if (saveResult.skipped) {
    return { ok: true, saveResult, notificationResult: { ok: true, skipped: true } };
  }

  const notificationResult = await notifyCreativeCareSubmission(payload);

  if (!notificationResult.ok) {
    throw new Error('Creative Care notification is not configured.');
  }

  return { ok: true, saveResult, notificationResult };
}
