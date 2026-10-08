/**
 * Centralized Public URL and QR Code Resolution Helper
 * 
 * Ensures all QR codes, NFC tags, and artwork use the public accessible URL
 * (ais-pre-... or a custom domain) and NEVER the private development container (ais-dev-...),
 * which causes customers to see Google AI Studio login / development interface.
 */

export function getPublicAppOrigin(): string {
  if (typeof window === 'undefined') return '';
  
  try {
    const custom = localStorage.getItem('alf_custom_public_domain');
    if (custom && custom.trim().startsWith('http')) {
      return custom.trim().replace(/\/+$/, '');
    }
  } catch (_) {}

  const origin = window.location.origin || '';
  return origin;
}

export function setCustomPublicDomain(domain: string): void {
  try {
    if (!domain || !domain.trim()) {
      localStorage.removeItem('alf_custom_public_domain');
    } else {
      let clean = domain.trim().replace(/\/+$/, '');
      if (!/^https?:\/\//i.test(clean)) {
        clean = 'https://' + clean;
      }
      localStorage.setItem('alf_custom_public_domain', clean);
    }
  } catch (_) {}
}

export function getCustomPublicDomain(): string {
  try {
    return localStorage.getItem('alf_custom_public_domain') || '';
  } catch (_) {
    return '';
  }
}

export function hasCustomPublicDomain(): boolean {
  try {
    const val = localStorage.getItem('alf_custom_public_domain');
    return Boolean(val && val.trim().startsWith('http'));
  } catch (_) {
    return false;
  }
}

export function getTestRedirectUrl(leadId: string): string {
  const cleanId = (leadId || '').replace(/[^a-zA-Z0-9_\-]/g, '');
  if (typeof window !== 'undefined' && window.location.origin) {
    return `${window.location.origin}/r/${cleanId}`;
  }
  return `/r/${cleanId}`;
}

export function getDynamicQrUrl(leadId: string): string {
  const cleanId = (leadId || '').replace(/[^a-zA-Z0-9_\-]/g, '');
  const custom = getCustomPublicDomain();
  if (custom && custom.trim().startsWith('http')) {
    return `${custom.trim().replace(/\/+$/, '')}/r/${cleanId}`;
  }
  return `${getPublicAppOrigin()}/r/${cleanId}`;
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
  const trimmed = (rawUrl || '').trim();

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
