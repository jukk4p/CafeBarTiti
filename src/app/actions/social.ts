'use server'

const MARKETING_WEBHOOK = "https://n8n-yiezniczwepznycn3bf3kj1n.137.74.115.57.sslip.io/webhook-test/social-marketing-post";

export async function triggerSocialPost(data: {
  caption: string;
  mediaUrl: string;
  platforms: string[];
}) {
  // En producción, esto debería venir de una variable de entorno
  const webhookUrl = process.env.N8N_SOCIAL_WEBHOOK_URL || MARKETING_WEBHOOK;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger social webhook: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error triggering social n8n webhook:', error);
    return { success: false, error: String(error) };
  }
}
