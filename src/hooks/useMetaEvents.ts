/**
 * useMetaEvents — Hook para rastreamento híbrido Meta (Pixel + CAPI)
 * 
 * Para cada evento:
 * 1. Dispara via Pixel no navegador (com event_id para deduplicação)
 * 2. Envia via CAPI no servidor (mesmo event_id)
 * 
 * Eventos implementados:
 * - PageView           → entrada no site
 * - IniciouDesafio     → clique no 1º CTA
 * - AvancouDiagnostico → chegou no diagnóstico
 * - Lead               → conclusão do quiz (chegou na oferta)
 * - OpenOfferModal     → clique no CTA da oferta (abre modal de resumo)
 */

import { useCallback, useRef } from 'react';

const PIXEL_ID = '1647727386472022';

/** Gera um event_id único para deduplicação */
function generateEventId(eventName: string): string {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Lê cookies da Meta para aumentar Match Rate */
function getMetaCookies(): { fbc: string; fbp: string } {
  const cookies = document.cookie.split(';').reduce((acc, c) => {
    const [k, v] = c.trim().split('=');
    acc[k] = v;
    return acc;
  }, {} as Record<string, string>);
  return {
    fbc: cookies['_fbc'] || '',
    fbp: cookies['_fbp'] || '',
  };
}

/** Dispara evento no Pixel do navegador */
type FbqFn = (
  method: string,
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) => void;

function firePixel(eventName: string, eventId: string, params: Record<string, unknown> = {}, isCustom = false) {
  const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
  if (!fbq) return;

  const method = isCustom ? 'trackCustom' : 'track';
  fbq(method, eventName, params, { eventID: eventId });
}

/** Envia evento para a CAPI via serverless function */
async function fireCAPI(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown> = {}
) {
  try {
    const { fbc, fbp } = getMetaCookies();
    await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        userData: {
          fbc,
          fbp,
          sourceUrl: window.location.href,
        },
        customData,
      }),
    });
  } catch (err) {
    console.warn('CAPI send failed:', err);
  }
}

/** Dispara Pixel + CAPI simultaneamente */
async function trackHybrid(
  eventName: string,
  params: Record<string, unknown> = {},
  isCustom = false
) {
  const eventId = generateEventId(eventName);
  firePixel(eventName, eventId, params, isCustom);
  await fireCAPI(eventName, eventId, params);
}

export function useMetaEvents() {
  const firedRef = useRef<Set<string>>(new Set());

  /** Garante que um evento só dispare 1x por sessão */
  const trackOnce = useCallback(
    async (
      key: string,
      eventName: string,
      params: Record<string, unknown> = {},
      isCustom = false
    ) => {
      if (firedRef.current.has(key)) return;
      firedRef.current.add(key);
      await trackHybrid(eventName, params, isCustom);
    },
    []
  );

  return {
    /** PageView — 1x na entrada */
    trackPageView: () =>
      trackOnce('PageView', 'PageView'),

    /** IniciouDesafio — clique no 1º CTA */
    trackIniciouDesafio: () =>
      trackOnce('IniciouDesafio', 'IniciouDesafio', {
        content_name: 'Desafio POI 21 Days',
        status: 'Iniciado',
      }, true),

    /** AvancouDiagnostico — chegou na área de diagnóstico */
    trackAvancouDiagnostico: () =>
      trackOnce('AvancouDiagnostico', 'AvancouDiagnostico', {
        step: 'Diagnostico',
        engagement_level: 'Alto',
      }, true),

    /** Lead — conclusão do quiz, chegou na oferta */
    trackLead: () =>
      trackOnce('Lead', 'Lead', {
        content_name: 'Quiz Concluido',
        value: 0,
        currency: 'BRL',
      }),

    /** OpenOfferModal — clique no CTA da página de oferta (abre modal de resumo) */
    trackOpenOfferModal: () =>
      trackOnce('OpenOfferModal', 'OpenOfferModal', {
        content_name: 'Modal Resumo Oferta',
        engagement_level: 'Muito Alto',
      }, true),
  };
}
