'use server'

const FALLBACK_WEBHOOK = "https://n8n-yiezniczwepznycn3bf3kj1n.137.74.115.57.sslip.io/webhook-test/38685c10-8a73-4e57-a50a-7c836ed96936";

export async function triggerReservationWebhook(data: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL || FALLBACK_WEBHOOK;

  if (!webhookUrl) {
    return { success: false, error: 'URL not configured' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger webhook: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error triggering n8n webhook:', error);
    return { success: false, error: String(error) };
  }
}
