interface DiscordWebhookMessage {
  embeds: {
    title: string;
    description: string;
    color: number;
    fields: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
    timestamp: string;
  }[];
}

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1321730136147623966/lHHQFPEFSLGQrpB1HsZ82jBRWDEL-KnBb-jDRERjDvmaqPQkdXo-9VBSG2uUvRjW36j7';

async function getIPInfo() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return 'Unknown IP';
  }
}

export async function sendDiscordNotification(type: 'visit' | 'download', downloadType?: string) {
  const ip = await getIPInfo();
  const timestamp = new Date().toISOString();

  const message: DiscordWebhookMessage = {
    embeds: [{
      title: type === 'visit' ? '🌐 New Website Visit' : '⬇️ New Download',
      description: type === 'visit' 
        ? 'Someone visited the Web3 Panel website'
        : `Someone downloaded Web3 Panel (${downloadType})`,
      color: type === 'visit' ? 3447003 : 15844367, // Blue for visits, Orange for downloads
      fields: [
        {
          name: 'IP Address',
          value: ip,
          inline: true
        },
        {
          name: 'Timestamp',
          value: new Date().toLocaleString(),
          inline: true
        },
        {
          name: 'User Agent',
          value: navigator.userAgent,
          inline: false
        }
      ],
      timestamp: timestamp
    }]
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}