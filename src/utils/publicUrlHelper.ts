/**
 * Centralized Public URL and QR Code Resolution Helper
 * 
 * Ensures all QR codes, NFC tags, and artwork use the public accessible URL
 * (ais-pre-... or a custom domain) and NEVER the private development container (ais-dev-...),
 * which causes customers to see Google AI Studio login / development interface.
 */

export const DEFAULT_RENDER_DOMAIN = 'https://automacaonfc.onrender.com';

/**
 * Universal Sanitizer: Guarantees that no QR code, NFC tag, or public link ever points to
 * Google AI Studio dev containers (ais-dev-..., .run.app, localhost), replacing them with
 * the official production domain (https://automacaonfc.onrender.com) or the client's verified domain.
 */
export function sanitizePublicUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();
  if (
    cleaned.includes('.run.app') ||
    cleaned.includes('ais-dev-') ||
    cleaned.includes('ais-pre-') ||
    cleaned.includes('localhost') ||
    cleaned.includes('127.0.0.1') ||
    cleaned.includes('scf.usercontent.goog')
  ) {
    // Replace dev/internal origin with the official production domain
    cleaned = cleaned.replace(/^https?:\/\/[^\/]+/i, DEFAULT_RENDER_DOMAIN);
  }
  return cleaned;
}

export function getPublicAppOrigin(): string {
  if (typeof window === 'undefined') return DEFAULT_RENDER_DOMAIN;
  
  try {
    const custom = localStorage.getItem('alf_custom_public_domain');
    if (custom && custom.trim().startsWith('http')) {
      const cleanCustom = custom.trim().replace(/\/+$/, '');
      const isTempOrLocal =
        cleanCustom.includes('localhost') ||
        cleanCustom.includes('127.0.0.1') ||
        cleanCustom.includes('.run.app') ||
        cleanCustom.includes('ais-dev-') ||
        cleanCustom.includes('ais-pre-') ||
        cleanCustom.includes('scf.usercontent.goog');
      if (!isTempOrLocal) {
        return cleanCustom;
      } else {
        localStorage.removeItem('alf_custom_public_domain');
      }
    }
  } catch (_) {}

  const origin = window.location.origin || '';

  // CRITICAL: NEVER use ais-dev-... or .run.app for public links, QR codes, or plate artwork!
  // Always route directly to https://automacaonfc.onrender.com unless on a custom production domain:
  if (
    !origin ||
    origin.includes('ais-dev-') ||
    origin.includes('ais-pre-') ||
    origin.includes('.run.app') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('scf.usercontent.goog')
  ) {
    return DEFAULT_RENDER_DOMAIN;
  }

  return origin.replace(/\/+$/, '');
}

export function setCustomPublicDomain(domain: string): void {
  try {
    if (!domain || !domain.trim()) {
      localStorage.removeItem('alf_custom_public_domain');
      return;
    }
    let clean = domain.trim().replace(/\/+$/, '');
    if (
      clean.includes('.run.app') ||
      clean.includes('ais-dev-') ||
      clean.includes('ais-pre-') ||
      clean.includes('localhost') ||
      clean.includes('127.0.0.1')
    ) {
      // Never allow saving internal dev container as public domain
      localStorage.removeItem('alf_custom_public_domain');
      return;
    }
    if (!/^https?:\/\//i.test(clean)) {
      clean = 'https://' + clean;
    }
    localStorage.setItem('alf_custom_public_domain', clean);
  } catch (_) {}
}

export function getCustomPublicDomain(): string {
  try {
    const val = (localStorage.getItem('alf_custom_public_domain') || '').trim();
    if (!val) return '';
    if (
      val.includes('.run.app') ||
      val.includes('ais-dev-') ||
      val.includes('ais-pre-') ||
      val.includes('localhost') ||
      val.includes('127.0.0.1') ||
      val.includes('scf.usercontent.goog')
    ) {
      localStorage.removeItem('alf_custom_public_domain');
      return '';
    }
    return val;
  } catch (_) {
    return '';
  }
}

export function hasCustomPublicDomain(): boolean {
  try {
    const val = getCustomPublicDomain();
    return Boolean(val && val.startsWith('http'));
  } catch (_) {
    return false;
  }
}

export function getTestRedirectUrl(leadId: string): string {
  const cleanId = (leadId || '').replace(/[^a-zA-Z0-9_\-]/g, '');
  const base = getPublicAppOrigin();
  return sanitizePublicUrl(`${base}/r/${cleanId}`);
}

export function getDynamicQrUrl(leadId: string, channel?: string): string {
  const cleanId = (leadId || '').replace(/[^a-zA-Z0-9_\-]/g, '');
  const custom = getCustomPublicDomain();
  const base = (custom && custom.startsWith('http'))
    ? `${custom.replace(/\/+$/, '')}/r/${cleanId}`
    : `${getPublicAppOrigin()}/r/${cleanId}`;
  
  if (channel && channel.trim()) {
    const cleanChannel = channel.trim().toLowerCase();
    return sanitizePublicUrl(`${base}?to=${encodeURIComponent(cleanChannel)}`);
  }
  return sanitizePublicUrl(base);
}

export function getDynamicInstagramUrl(leadId: string): string {
  return getDynamicQrUrl(leadId, 'instagram');
}

export function getDynamicGoogleUrl(leadId: string): string {
  return getDynamicQrUrl(leadId, 'google');
}

export function getDynamicTiktokUrl(leadId: string): string {
  return getDynamicQrUrl(leadId, 'tiktok');
}

export function getDirectInstagramUrl(lead: any, fallbackName: string = ''): string {
  const raw = (lead?.nfcInstagramUrl || lead?.instagramUrl || '').trim();
  if (raw) {
    if (raw.startsWith('http')) return raw;
    return `https://instagram.com/${raw.replace(/^@/, '')}`;
  }
  const name = (lead?.name || fallbackName || '').replace(/\s+/g, '').toLowerCase();
  return name ? `https://instagram.com/${name}` : 'https://instagram.com';
}

export function getDirectTiktokUrl(lead: any, fallbackName: string = ''): string {
  const raw = (lead?.nfcTiktokUrl || lead?.tiktokUrl || '').trim();
  if (raw) {
    if (raw.startsWith('http')) return raw;
    return `https://tiktok.com/@${raw.replace(/^@/, '')}`;
  }
  const name = (lead?.name || fallbackName || '').replace(/\s+/g, '').toLowerCase();
  return name ? `https://tiktok.com/@${name}` : 'https://tiktok.com';
}

export function getOfficialSearchReviewFallback(businessName: string, city: string = ''): string {
  const cleanName = (businessName || '').trim() || 'Estabelecimento';
  const cleanCity = (city || '').trim();
  const query = cleanCity ? `${cleanName} ${cleanCity}` : cleanName;
  // #lrd=0x0:0x0,3 triggers Google write-review dialog directly in search results without requiring a Place ID
  return `https://www.google.com/search?q=${encodeURIComponent(query)}#lrd=0x0:0x0,3`;
}

export function extractGooglePlaceId(urlOrText: string): string | null {
  if (!urlOrText || typeof urlOrText !== 'string') return null;
  const trimmed = urlOrText.trim();

  // 1. Direct Place ID pattern (ChIJ...)
  const placeIdMatch = trimmed.match(/ChIJ[a-zA-Z0-9_\-]{23,}/);
  if (placeIdMatch) {
    return placeIdMatch[0];
  }

  // 2. Query param placeid or place_id or query_place_id
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const pid = url.searchParams.get('placeid') || url.searchParams.get('place_id') || url.searchParams.get('query_place_id');
    if (pid && /^ChIJ[a-zA-Z0-9_\-]{23,}$/.test(pid)) {
      return pid;
    }
  } catch (_) {}

  return null;
}

export function validateGoogleReviewUrl(
  rawUrl: string,
  businessName: string,
  city: string = ''
): {
  isValid: boolean;
  canonicalUrl: string;
  fallbackUrl: string;
  reason?: string;
} {
  const fallbackUrl = getOfficialSearchReviewFallback(businessName, city);
  const embeddedUrlMatch = (rawUrl || '').match(/https?:\/\/[^\s]+/i);
  const trimmed = (embeddedUrlMatch ? embeddedUrlMatch[0] : (rawUrl || '')).trim();

  if (!trimmed || trimmed === 'https://maps.google.com' || trimmed === 'http://maps.google.com') {
    return {
      isValid: false,
      canonicalUrl: fallbackUrl,
      fallbackUrl,
      reason: 'URL em branco ou genérica. Usando busca oficial com abertura de avaliação.'
    };
  }

  // If already a direct write review link or lrd search link, it is 100% valid
  if (
    trimmed.includes('writereview?placeid=') ||
    trimmed.includes('local/writereview') ||
    trimmed.includes('/review') ||
    trimmed.includes('#lrd=') ||
    trimmed.includes('&lrd=')
  ) {
    return {
      isValid: true,
      canonicalUrl: trimmed,
      fallbackUrl
    };
  }

  // Extract Place ID -> point directly to Google write review popup
  const placeId = extractGooglePlaceId(trimmed);
  if (placeId) {
    return {
      isValid: true,
      canonicalUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
      fallbackUrl
    };
  }

  // If it is a generic maps search link or share link without Place ID, build the official search review fallback
  if (trimmed.includes('google.com') || trimmed.includes('g.co') || trimmed.includes('maps.app.goo.gl')) {
    return {
      isValid: false,
      canonicalUrl: fallbackUrl,
      fallbackUrl,
      reason: 'Link curto ou sem Place ID canônico. Fallback seguro para pesquisa do Google aplicado para evitar 403.'
    };
  }

  // Custom non-Google URL
  let safeCustom = trimmed;
  if (!/^https?:\/\//i.test(safeCustom)) {
    safeCustom = 'https://' + safeCustom;
  }
  return {
    isValid: true,
    canonicalUrl: safeCustom,
    fallbackUrl
  };
}

export function getCanonicalGoogleReviewUrl(rawUrl: string, businessName: string, city: string = ''): string {
  const validation = validateGoogleReviewUrl(rawUrl, businessName, city);
  return validation.canonicalUrl;
}

export function getDirectLeadUrl(lead: any): string {
  if (!lead) return 'https://maps.google.com';
  const name = lead.name || '';
  const city = lead.city || '';
  const redirectActive = lead.nfcRedirectActive || 'gmb';
  
  if (redirectActive === 'gmb') {
    return getCanonicalGoogleReviewUrl(lead.googleMapsUrl || lead.nfcCustomUrl || '', name, city);
  }
  if (redirectActive === 'instagram' && lead.nfcInstagramUrl && lead.nfcInstagramUrl.trim()) {
    let insta = lead.nfcInstagramUrl.trim();
    if (!insta.startsWith('http')) {
      const handle = insta.replace(/^@/, '');
      insta = `https://instagram.com/${handle}`;
    }
    return insta;
  }
  if (redirectActive === 'whatsapp' && lead.nfcWhatsappNum && lead.nfcWhatsappNum.trim()) {
    const num = lead.nfcWhatsappNum.replace(/\D/g, '');
    const msg = encodeURIComponent(lead.nfcWhatsappMsg || 'Olá! Gostaria de falar com você.');
    return `https://wa.me/${num}?text=${msg}`;
  }
  if (redirectActive === 'website' && lead.websiteUrl && lead.websiteUrl.trim()) {
    let site = lead.websiteUrl.trim();
    if (!/^https?:\/\//i.test(site)) site = 'https://' + site;
    return site;
  }
  if (redirectActive === 'custom' && lead.nfcCustomUrl && lead.nfcCustomUrl.trim()) {
    const custom = lead.nfcCustomUrl.trim();
    if (custom.includes('google.com') || custom.includes('g.co') || custom.includes('maps.app.goo.gl') || custom.includes('ChIJ')) {
      return getCanonicalGoogleReviewUrl(custom, name, city);
    }
    return /^https?:\/\//i.test(custom) ? custom : 'https://' + custom;
  }
  if (lead.googleMapsUrl && lead.googleMapsUrl.trim() && lead.googleMapsUrl !== 'https://maps.google.com') {
    return getCanonicalGoogleReviewUrl(lead.googleMapsUrl, name, city);
  }
  if (lead.nfcCustomUrl && lead.nfcCustomUrl.trim()) {
    return getCanonicalGoogleReviewUrl(lead.nfcCustomUrl, name, city);
  }
  if (lead.websiteUrl && lead.websiteUrl.trim()) {
    let site = lead.websiteUrl.trim();
    return /^https?:\/\//i.test(site) ? site : 'https://' + site;
  }
  if (name) {
    return getOfficialSearchReviewFallback(name, city);
  }
  return 'https://maps.google.com';
}
