/**
 * Vercel Serverless Function — Meta Conversions API (CAPI)
 * Endpoint: /api/meta-events
 *
 * Recebe eventos do frontend e os reenvia para a API de Conversões da Meta
 * com os dados de servidor (IP, User-Agent) para maximizar o Match Rate.
 *
 * IMPORTANTE: o ACCESS_TOKEN deve ser configurado como variável de ambiente
 * no painel do Vercel (Settings > Environment Variables):
 *   - META_ACCESS_TOKEN (obrigatória)
 *   - META_PIXEL_ID (opcional - cai no padrão se não definida)
 *   - META_TEST_EVENT_CODE (opcional - apenas para testes)
 */

const PIXEL_ID = process.env.META_PIXEL_ID || '1647727386472022';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Valida configuração antes de qualquer coisa
  if (!ACCESS_TOKEN) {
    console.error('META_ACCESS_TOKEN não configurado nas variáveis de ambiente.');
    // Retorna 200 para não quebrar o funil do front-end caso a env não esteja setada.
    // O Pixel do navegador continua funcionando — só perdemos o match server-side.
    return res.status(200).json({ success: false, reason: 'access_token_missing' });
  }

  try {
    const { eventName, eventId, userData = {}, customData = {} } = req.body || {};

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
    };

    // Adiciona test_event_code apenas se estiver definido
    if (process.env.META_TEST_EVENT_CODE) {
      payload.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    // Envia para a CAPI da Meta
    const capiUrl = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const response = await fetch(capiUrl, {
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
