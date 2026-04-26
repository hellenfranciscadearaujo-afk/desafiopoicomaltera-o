/**
 * Vercel Serverless Function — Meta Conversions API (CAPI)
 * Endpoint: /api/meta-events
 * 
 * Recebe eventos do frontend e os reenvia para a API de Conversões da Meta
 * com os dados de servidor (IP, User-Agent) para maximizar o Match Rate.
 */

const PIXEL_ID = '1647727386472022';
const ACCESS_TOKEN = 'EAASsHN4Dd04BRR4vwhZCmzGTdkyBg9awXngFRHDjyKHe3bpi2bQ4qT2Xf9ZBBBcCZA7H8ZB31Vk0MEdCdikXk91hMNXl9Rz3LIx0u1SH3rQ1IF7ETgQUasDs8M3nAdOW8ZBqpdYcYU1HTPVYWTnFp2nyOYyZAfQe1dTzbKnBZAvcRVicKeiDs5bwSBaCZBynYAZDZD';
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventName, eventId, userData = {}, customData = {} } = req.body;

    if (!eventName || !eventId) {
      return res.status(400).json({ error: 'eventName e eventId são obrigatórios' });
    }

    // Captura dados do servidor para aumentar Match Rate
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
                  || req.headers['x-real-ip'] 
                  || req.connection?.remoteAddress 
                  || '';
    const clientUserAgent = req.headers['user-agent'] || '';

    // Monta payload CAPI
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // Para deduplicação com o Pixel
          event_source_url: userData.sourceUrl || '',
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: clientUserAgent,
            fbc: userData.fbc || '',   // Cookie _fbc da Meta
            fbp: userData.fbp || '',   // Cookie _fbp da Meta
          },
          custom_data: customData,
        },
      ],
      test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
    };

    // Remove test_event_code se não estiver definido
    if (!payload.test_event_code) delete payload.test_event_code;

    // Envia para a CAPI da Meta
    const response = await fetch(CAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('CAPI Error:', result);
      return res.status(502).json({ error: 'Erro ao enviar para CAPI', detail: result });
    }

    return res.status(200).json({ success: true, events_received: result.events_received });

  } catch (err) {
    console.error('CAPI Exception:', err);
    return res.status(500).json({ error: 'Erro interno', detail: err.message });
  }
}
