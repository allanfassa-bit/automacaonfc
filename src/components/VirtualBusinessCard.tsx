import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Instagram,
  Star,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Download,
  CreditCard,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Globe,
  Sliders,
  CheckCircle,
  Navigation
} from 'lucide-react';
import { Lead } from '../App';
import { getDynamicQrUrl } from '../utils/publicUrlHelper';

export interface VirtualBusinessCardProps {
  lead: Lead;
  standalone?: boolean;
  onNavigateToMiniSite?: () => void;
  onNavigateToPortal?: () => void;
}

export function VirtualBusinessCard({
  lead,
  standalone = false,
  onNavigateToMiniSite,
  onNavigateToPortal
}: VirtualBusinessCardProps) {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Business identity
  const name = lead.name || 'Empresa Local';
  const niche = lead.niche || 'Atendimento Comercial VIP';
  const city = lead.city || 'Brasil';
  const address = lead.address || '';
  const phone = lead.phone || lead.nfcWhatsappNum || '';
  const rawWhatsapp = lead.nfcWhatsappNum || lead.phone || '';
  const cleanWhatsapp = rawWhatsapp.replace(/\D/g, '');
  const instaUrl = lead.nfcInstagramUrl || '';
  const instaHandle = instaUrl
    ? instaUrl.replace(/.*instagram\.com\//, '').replace(/^@/, '').replace(/\/$/, '')
    : '';
  const googleReviewUrl = lead.googleMapsUrl || `https://www.google.com/search?q=${encodeURIComponent(name + ' ' + city)}#lrd=0x0:0x0,3`;
  const websiteUrl = lead.websiteUrl || '';
  const savedMini = (lead as any)?.miniSiteConfig || {};
  const pixKey = savedMini.pixKey || (phone ? phone.replace(/\D/g, '') : '');
  const pixBeneficiary = savedMini.pixBeneficiary || name;
  const permanentUrl = getDynamicQrUrl(lead.id);
  const cardUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?cartao=${encodeURIComponent(lead.id)}`
    : permanentUrl;

  // vCard (.vcf) Generator for 1-Click Native Phone Contact Download
  const handleDownloadVCard = () => {
    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `ORG:${name}`,
      `TITLE:${niche}`,
      phone ? `TEL;TYPE=CELL,VOICE:${phone.replace(/\D/g, '')}` : '',
      cleanWhatsapp ? `TEL;TYPE=WORK,VOICE:${cleanWhatsapp}` : '',
      `EMAIL:${(lead as any).email || `contato@${lead.id.toLowerCase()}.com.br`}`,
      websiteUrl ? `URL;TYPE=Website:${websiteUrl}` : '',
      permanentUrl ? `URL;TYPE=CartaoNFC:${permanentUrl}` : '',
      address ? `ADR;TYPE=WORK:;;${address};${city};;Brasil` : '',
      `NOTE:Cartão de Visita NFC & Digital emitido por ALF Automação`,
      'END:VCARD'
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([vCardLines], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contato_${name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyPix = () => {
    if (!pixKey) return;
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleCopyCardLink = () => {
    navigator.clipboard.writeText(cardUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsapp = () => {
    const text = `Olá! Segue o Cartão de Visita Virtual e Inteligente de *${name}*:\n\n🔗 ${cardUrl}\n\nAproxime seu celular ou toque no link para ver WhatsApp, Como Chegar, Avaliações e Salvar Contato!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`w-full ${standalone ? 'min-h-screen bg-slate-950 py-6 px-4 flex flex-col items-center justify-center font-sans' : 'p-4 sm:p-6 bg-slate-900 rounded-3xl text-white'}`}>
      <div className="max-w-md w-full mx-auto space-y-5">
        
        {/* 🌟 1. VIRTUAL NFC CARD (3D FLIP CONTAINER) */}
        <div className="relative group perspective-1000">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cartão de Visita NFC Oficial</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveSide(prev => prev === 'front' ? 'back' : 'front')}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition py-0.5 px-2 rounded-lg bg-slate-800/80 border border-slate-700/60"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Girar Cartão ({activeSide === 'front' ? 'Ver Verso' : 'Ver Frente'})</span>
            </button>
          </div>

          {/* Card Physical Aspect Ratio (85 x 54 mm CR80) */}
          <div
            onClick={() => setActiveSide(prev => prev === 'front' ? 'back' : 'front')}
            className="w-full aspect-[1.586/1] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 cursor-pointer border border-white/10 select-none bg-gradient-to-br from-slate-900 via-slate-950 to-black"
            style={{
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
          >
            {/* Background Texture & Luxury Glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-amber-500/20 via-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* CARD FRONT SIDE */}
            {activeSide === 'front' ? (
              <div className="h-full flex flex-col justify-between relative z-10 animate-in fade-in zoom-in-95 duration-200">
                {/* Top Row: NFC Wave Icon & Contactless Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {/* Simulated EMV Gold Smart Chip */}
                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/60 shadow-xs flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-[1px] bg-amber-900/40 absolute top-2.5" />
                      <div className="w-full h-[1px] bg-amber-900/40 absolute bottom-2.5" />
                      <div className="h-full w-[1px] bg-amber-900/40 absolute left-3.5" />
                    </div>
                    <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">NFC</span>
                  </div>

                  {/* Official Wireless Contactless Wave Symbol */}
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    <span className="text-[9px] font-bold tracking-wider uppercase">Contactless</span>
                    <svg className="w-4 h-4 fill-current rotate-90" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0" />
                      <path d="M4.93 4.93a10 10 0 0 0 0 14.14l1.41-1.41a8 8 0 0 1 0-11.32L4.93 4.93zm2.83 2.83a6 6 0 0 0 0 8.48l1.41-1.41a4 4 0 0 1 0-5.66L7.76 7.76zm2.83 2.83a2 2 0 0 0 0 2.83l1.41-1.41a.01.01 0 0 1 0 0L10.59 10.59z" />
                    </svg>
                  </div>
                </div>

                {/* Center: Business Brand & Monogram Logo */}
                <div className="my-auto space-y-1 text-left">
                  <div className="inline-flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 text-slate-950 font-black text-base flex items-center justify-center shadow-md">
                      {name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase leading-tight drop-shadow-sm truncate">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium truncate">
                    {niche}
                  </p>
                </div>

                {/* Bottom Row: Call to action */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">
                    📍 {city}
                  </span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <span>Aproxime o celular</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ) : (
              /* CARD BACK SIDE (VERSO COM QR CODE) */
              <div className="h-full flex flex-col justify-between relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Verso de Leitura Rápida
                  </span>
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md">
                    ID: {lead.id}
                  </span>
                </div>

                <div className="my-auto flex items-center gap-4">
                  {/* Dynamic QR Code Box */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-1.5 rounded-2xl shadow-lg shrink-0 relative group">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=2&data=${encodeURIComponent(permanentUrl)}`}
                      alt={`QR ${name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Quick Details & Guidance */}
                  <div className="space-y-1.5 text-left min-w-0">
                    <p className="text-[11px] font-black text-amber-400 leading-tight">
                      Aponte a câmera para o QR Code ou aproxime seu celular
                    </p>
                    {phone && (
                      <p className="text-xs text-slate-200 font-mono flex items-center gap-1.5 truncate">
                        <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{phone}</span>
                      </p>
                    )}
                    {instaHandle && (
                      <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5 truncate">
                        <Instagram className="w-3 h-3 text-pink-400 shrink-0" />
                        <span>@{instaHandle}</span>
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 truncate">
                      ⭐ Avaliação 5 Estrelas no Google
                    </p>
                  </div>
                </div>

                <div className="text-[9px] text-slate-500 font-mono truncate text-center pt-1 border-t border-white/5">
                  {permanentUrl}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🌟 2. PRIMARY ACTION: 1-CLICK SAVE CONTACT TO PHONE (.VCF) */}
        <button
          type="button"
          onClick={handleDownloadVCard}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 active:scale-[0.98] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Salvar Contato na Agenda do Celular</span>
        </button>

        {/* 🌟 3. INTERACTIVE CHANNELS (MOBILE ACTIONS) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-3 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Canais de Atendimento em 1 Toque
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            {/* WhatsApp */}
            {cleanWhatsapp && (
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Olá, vi o Cartão Virtual de ${name} e gostaria de atendimento.`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2.5 transition active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">WhatsApp</span>
                  <span className="truncate block font-black">Conversar</span>
                </div>
              </a>
            )}

            {/* Direct Phone Call */}
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center gap-2.5 transition active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Telefone</span>
                  <span className="truncate block font-black">Ligar Agora</span>
                </div>
              </a>
            )}

            {/* Instagram */}
            {instaUrl && (
              <a
                href={instaUrl.startsWith('http') ? instaUrl : `https://instagram.com/${instaUrl.replace(/^@/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 font-bold text-xs flex items-center gap-2.5 transition active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Instagram</span>
                  <span className="truncate block font-black">@{instaHandle || 'perfil'}</span>
                </div>
              </a>
            )}

            {/* Google Reviews */}
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-2.5 transition active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Google</span>
                <span className="truncate block font-black">Avaliar 5★</span>
              </div>
            </a>

            {/* Waze / Maps GPS Navigation */}
            <a
              href={`https://waze.com/ul?q=${encodeURIComponent(name + ' ' + address + ' ' + city)}&navigate=yes`}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold text-xs flex items-center gap-2.5 transition active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                <Navigation className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Como Chegar</span>
                <span className="truncate block font-black">Waze / Maps</span>
              </div>
            </a>

            {/* Pix Instant Key */}
            {pixKey && (
              <button
                type="button"
                onClick={handleCopyPix}
                className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-2.5 transition active:scale-95 text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  {copiedPix ? <Check className="w-4 h-4 text-purple-300" /> : <Copy className="w-4 h-4 text-purple-300" />}
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Pagamento</span>
                  <span className="truncate block font-black">{copiedPix ? 'Copiado!' : 'Chave Pix'}</span>
                </div>
              </button>
            )}
          </div>

          {/* Mini-Site / Full Showcase Button */}
          {onNavigateToMiniSite ? (
            <button
              type="button"
              onClick={onNavigateToMiniSite}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-white font-bold text-xs flex items-center justify-between transition cursor-pointer border border-slate-700"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Ver Mini-Site &amp; Catálogo Completo</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          ) : (
            <a
              href={`/?minisite=${encodeURIComponent(lead.id)}`}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 text-white font-bold text-xs flex items-center justify-between transition cursor-pointer border border-slate-700 block"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Ver Mini-Site &amp; Catálogo Completo</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          )}
        </div>

        {/* 🌟 4. SHARE & COPY LINK TOOLBAR */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareWhatsapp}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compartilhar no WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCardLink}
            className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
            title="Copiar Link do Cartão Virtual"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-500 font-medium">
            Tecnologia NFC Contactless • ALF Automação Digital
          </p>
        </div>

      </div>
    </div>
  );
}
