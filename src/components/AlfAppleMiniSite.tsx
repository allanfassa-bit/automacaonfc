import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Send,
  Star,
  Check,
  Camera,
  MapPin,
  ExternalLink,
  Download,
  ArrowRight,
  TrendingUp,
  Zap,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Copy,
  Share2
} from 'lucide-react';
import { MiniSiteConfig } from '../utils/miniSiteExporter';
import { ALF_LOGO_DATA_URI, ALLAN_FASSA_PHOTO_URL } from '../utils/readyMiniSiteMockups';

interface AlfAppleMiniSiteProps {
  config: MiniSiteConfig;
  whatsappUrl: string;
  resolvedInstagramUrl: string;
  mapsSearchUrl: string;
  attachedFounderPhoto: string;
  onUploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownloadVCard: () => void;
  isFullPage?: boolean;
}

export const AlfAppleMiniSite: React.FC<AlfAppleMiniSiteProps> = ({
  config,
  whatsappUrl,
  resolvedInstagramUrl,
  mapsSearchUrl,
  attachedFounderPhoto,
  onUploadPhoto,
  handleDownloadVCard,
  isFullPage = false
}) => {
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'geral' | 'resultados' | 'solucoes'>('geral');

  // Founder photo resolution
  const founderPhoto =
    attachedFounderPhoto ||
    config.portraitImageUrl ||
    '/allan-fassa-founder.jpg' ||
    ALLAN_FASSA_PHOTO_URL;

  // Pre-configured custom WhatsApp messages
  const baseWaNumber = config.whatsappNumber || '5514981304973';
  const buildWaLink = (msg: string) =>
    `https://wa.me/${baseWaNumber}?text=${encodeURIComponent(msg)}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ALF Automation • Allan Fassa',
          text: 'Conheça o Mini Site Oficial da ALF Automation: Placas Google NFC, Mini Sites de Alta Conversão e Automação Comercial.',
          url
        });
      } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } catch (_) {}
    }
  };

  // Testimonials with Google verified status
  const testimonials = config.testimonials && config.testimonials.length > 0
    ? config.testimonials
    : [
        {
          id: 't1',
          author: 'Dra. Camila Vasconcelos',
          role: 'Clínica Médica & Estética • Bio Site + Cartão NFC',
          impactBadge: '🌐 Mini Site • +280% Agendamentos no WhatsApp',
          avatarUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=85',
          text: 'O Mini Site de Apresentação com vídeo e meus procedimentos em destaque mudou o patamar da clínica! As pacientes encostam no meu Cartão NFC ou clicam no link da bio e já chamam no WhatsApp decididas a agendar.',
          rating: 5,
          timeAgo: 'há 2 dias'
        },
        {
          id: 't2',
          author: 'Dr. Henrique Albuquerque',
          role: 'Consultoria Imobiliária & Negócios • Mini Site Pro',
          impactBadge: '💼 Mini Site • 3x Mais Autoridade e Fechamentos',
          avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=85',
          text: 'Antes eu perdia clientes mandando fotos soltas e PDFs pesados. Com o Mini Site da ALF Automation, apresento meu portfólio, localização e contato em 1 clique. Triplicou nossa taxa de fechamento no WhatsApp!',
          rating: 5,
          timeAgo: 'há 4 dias'
        },
        {
          id: 't3',
          author: 'Carlos Eduardo Mendes',
          role: 'Proprietário • Gastronomia & Bistrô (Google Verificado)',
          impactBadge: '⭐ Placa Google NFC • De 42 para 384 Avaliações 5★',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=85',
          text: 'Coloquei as Placas NFC de Avaliação do Google da ALF Automation nas mesas e no caixa. Os clientes encostam o celular e avaliam em 3 segundos. Saltamos de 42 para 384 avaliações 5 estrelas em 60 dias e dominamos o Google Maps!',
          rating: 5,
          timeAgo: 'há 1 semana'
        }
      ];

  // 4 Core flagship products
  const products = [
    {
      id: 'serv_placa',
      title: 'Placa de Avaliação Google NFC 5★',
      category: 'Google & Hardware NFC',
      tag: 'Mais Vendido',
      tagColor: 'from-amber-500 to-orange-500',
      description: 'Acrílico cast nobre com chip de aproximação instantânea. Seu cliente encosta o celular e deixa a nota 5 estrelas no Google em 3 segundos sem pesquisar nada.',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=900&q=85',
      ctaText: 'Pedir Placa NFC no WhatsApp',
      waMsg: 'Olá Allan! Gostaria de consultar e pedir a Placa de Avaliação Google NFC 5★ para minha empresa!'
    },
    {
      id: 'serv_minisite',
      title: 'Mini Site & Bio Site de Alta Conversão',
      category: 'Sites & Bio Sites',
      tag: 'Alta Conversão',
      tagColor: 'from-cyan-500 to-blue-600',
      description: 'Página exclusiva estilo Apple com carregamento em 0.4s. Apresenta seus serviços, fotos, localização GPS e botão 1-clique para fechar no WhatsApp.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85',
      ctaText: 'Criar Meu Mini Site no WhatsApp',
      waMsg: 'Olá Allan! Gostaria de falar diretamente com você para criar um Mini Site / Bio Site de Alta Conversão para meu negócio!'
    },
    {
      id: 'serv_cartao',
      title: 'Cartão de Visita Inteligente NFC',
      category: 'Hardware NFC & Contato',
      tag: 'Autoridade Instantânea',
      tagColor: 'from-emerald-500 to-teal-600',
      description: 'O fim dos cartões de papel que vão para o lixo. Aproxime no smartphone do cliente para compartilhar seu contato direto na agenda e abrir seu Bio Site em 0.3s.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=85',
      ctaText: 'Pedir Cartão NFC no WhatsApp',
      waMsg: 'Olá Allan! Gostaria de solicitar um Cartão de Visita Inteligente NFC com meu Bio Site!'
    },
    {
      id: 'serv_institucional_google',
      title: 'Site Institucional & Posicionamento Google',
      category: 'Estratégia & Google',
      tag: 'Escala Comercial',
      tagColor: 'from-purple-500 to-indigo-600',
      description: 'Desenvolvimento web completo + estruturação avançada do Perfil do Google Meu Negócio para atrair clientes qualificados todos os dias da sua cidade.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
      ctaText: 'Consultar Projeto no WhatsApp',
      waMsg: 'Olá Allan! Quero consultar um projeto de Site Institucional e Posicionamento no Google para minha empresa!'
    }
  ];

  return (
    <div className="relative w-full text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Hidden file input for founder photo replacement */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={onUploadPhoto}
        className="hidden"
      />

      {/* ==============================================================
          1. TOP GLASS STATUS & QUICK ACTIONS BAR (Apple Cupertino Dock)
         ============================================================== */}
      <div className="sticky top-0 z-40 px-3 pt-2 pb-2 backdrop-blur-2xl bg-slate-950/80 border-b border-white/10">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {/* Brand Emblem */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-black border border-cyan-500/40 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950/50">
              <img
                src={ALF_LOGO_DATA_URI}
                alt="ALF Automation"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/alf-logo.jpg';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black tracking-wider uppercase text-white truncate">
                  ALF Automation
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <span className="text-[9px] font-bold text-cyan-400 block truncate">
                Modelo Flagship Oficial
              </span>
            </div>
          </div>

          {/* Top Actions: Google Rating Badge + Share */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-[10px] font-black text-amber-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>5.0</span>
              <span className="text-amber-200/70 font-semibold">(184)</span>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              title="Compartilhar Mini Site"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ==============================================================
          2. APPLE HERO: OBSIDIAN CANVAS + FOUNDER PORTRAIT TREATMENT
         ============================================================== */}
      <div className="relative px-4 pt-6 pb-6 overflow-hidden">
        {/* Subtle Ambient Radial Lighting (Apple Keynote Style) */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)'
          }}
        />

        <div className="relative max-w-md mx-auto text-center space-y-4">
          {/* Executive Founder Portrait Squircle */}
          <div className="relative inline-block mx-auto">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] p-1 bg-gradient-to-b from-cyan-400 via-sky-500 to-indigo-600 shadow-[0_0_35px_rgba(14,165,233,0.35)] group">
              <div className="w-full h-full rounded-[24px] overflow-hidden bg-slate-950 relative">
                <img
                  src={founderPhoto}
                  alt="Allan Fassa • ALF Automation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ALLAN_FASSA_PHOTO_URL;
                  }}
                />
              </div>

              {/* Verified Badge */}
              <div
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center border-2 border-slate-950 shadow-lg z-10"
                title="Fundador Verificado"
              >
                <Check className="w-4 h-4 stroke-[3.5]" />
              </div>

              {/* Quick Camera Upload Button */}
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-slate-900/95 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-white/20 flex items-center justify-center shadow-lg cursor-pointer transition z-10"
                title="Trocar Foto de Allan Fassa"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Founder Identity & Official Titles */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[9.5px] font-black uppercase tracking-wider text-cyan-300">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Allan Fassa • Fundador & Diretor de Tecnologia</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              ALF Automation
            </h1>

            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Inteligência Artificial • Estratégia Digital • Gestão de Vendas
            </p>
          </div>

          {/* ==============================================================
              3. O QUE EU FAÇO (ELEVATOR PITCH DIRETO EM 3 SEGUNDOS)
             ============================================================== */}
          <div className="p-4 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-2xl text-left space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                O Que Nós Fazemos
              </span>
            </div>

            <h2 className="text-sm sm:text-base font-black text-white leading-snug">
              Multiplicamos o faturamento e as avaliações 5★ da sua empresa no Google com IA & Tecnologia NFC de Aproximação.
            </h2>

            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              Ajudamos comércios locais, clínicas, restaurantes e profissionais autônomos a saírem do anonimato, dominarem a busca local do Google e transformarem visitas casuais em clientes fiéis que compram direto no WhatsApp.
            </p>
          </div>

          {/* ==============================================================
              4. O QUE EU ENTREGO DE RESULTADO RÁPIDO (APPLE BENTO GRID)
             ============================================================== */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resultados Rápidos & Comprovados</span>
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Metric 1 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-cyan-500/25 shadow-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-400">⚡ Em 7 Dias</span>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-lg font-black text-white tracking-tight">
                  No Ar Rápido
                </div>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                  Implementação ágil: seu Mini Site e placas rodando e gerando clientes imediatamente.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-amber-500/25 shadow-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">⭐ +300%</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-lg font-black text-white tracking-tight">
                  Avaliações 5★
                </div>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                  Seu cliente aproxima o smartphone e avalia no Google em 3 segundos.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-emerald-500/25 shadow-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400">🚀 3x Mais</span>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-lg font-black text-white tracking-tight">
                  Fechamentos
                </div>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                  Visitantes do Instagram e Google caem no seu WhatsApp prontos para comprar.
                </p>
              </div>

              {/* Metric 4 */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-purple-500/25 shadow-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-400">📱 0.3s NFC</span>
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-lg font-black text-white tracking-tight">
                  Zero Apps
                </div>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                  Aproximação nativa em qualquer iPhone ou Android sem baixar nada.
                </p>
              </div>
            </div>
          </div>

          {/* ==============================================================
              5. DUAL HIGH-CONVERSION ACTIONS (WHATSAPP + INSTAGRAM + VCARD)
             ============================================================== */}
          <div className="space-y-2 pt-1">
            {/* Primary WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_10px_30px_rgba(16,185,129,0.35)] active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shrink-0 shadow-md">
                  <Send className="w-5 h-5 fill-emerald-400/20 stroke-[2.5]" />
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-950 font-black text-xs sm:text-sm block truncate">
                      Falar com Allan no WhatsApp
                    </span>
                    <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-900/80 block truncate">
                    Atendimento imediato e orçamento personalizado
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-950/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
              </div>
            </a>

            {/* Secondary Actions: Instagram + vCard */}
            <div className="grid grid-cols-2 gap-2">
              {/* Instagram Button */}
              <a
                href={resolvedInstagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/40 border border-pink-500/30 hover:border-pink-400 text-white flex items-center gap-2.5 shadow-md active:scale-95 transition group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[11px] font-black block truncate text-white">
                    Instagram Oficial
                  </span>
                  <span className="text-[9px] text-pink-300 font-bold block truncate">
                    @alfautomation
                  </span>
                </div>
              </a>

              {/* vCard Save Contact */}
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-white flex items-center gap-2.5 shadow-md active:scale-95 transition cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-sm">
                  <Download className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-[11px] font-black block truncate text-white">
                    Salvar Contato
                  </span>
                  <span className="text-[9px] text-cyan-300 font-bold block truncate">
                    Adicionar à Agenda
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* ==============================================================
              6. OS 3 PILARES DA ALF AUTOMATION (APPLE FEATURE CARDS)
             ============================================================== */}
          <div className="pt-3 space-y-2.5 text-left">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Os 3 Pilares Tecnológicos ALF</span>
              </span>
              <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                100% Integrado
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Pilar 1: Placas Google NFC 5★ */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#09101f] to-amber-950/20 border border-amber-400/30 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-xs font-black">
                      5★
                    </div>
                    <div>
                      <strong className="text-xs font-black text-white block">
                        Placas de Avaliação Google NFC
                      </strong>
                      <span className="text-[9.5px] font-bold text-amber-300 block">
                        Multiplicador de Autoridade no Google Maps
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Aproximação
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Quem domina as avaliações 5 estrelas do Google domina as vendas da cidade. O cliente aproxima o smartphone na placa física no balcão e avalia em <strong>3 segundos</strong>, sem precisar digitar ou pesquisar.
                </p>

                <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Joga sua empresa nas primeiras posições da busca local</span>
                </div>
              </div>

              {/* Pilar 2: Mini Sites & Bio Sites */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#09101f] to-cyan-950/20 border border-cyan-400/30 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-xs font-black">
                      🌐
                    </div>
                    <div>
                      <strong className="text-xs font-black text-white block">
                        Mini Site &amp; Bio Site de Alta Conversão
                      </strong>
                      <span className="text-[9.5px] font-bold text-cyan-300 block">
                        Vitrine Digital 24 Horas no Ar
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                    0.4s Carga
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Substitua links amadores da bio por uma página moderna estilo Apple. Seus clientes veem seus melhores serviços, fotos, localização no mapa e clicam em <strong>1 botão para fechar negócio no WhatsApp</strong>.
                </p>

                <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Sem mensalidades abusivas e 100% responsivo para celular</span>
                </div>
              </div>

              {/* Pilar 3: Cartão de Visita Inteligente NFC */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#09101f] to-emerald-950/20 border border-emerald-400/30 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-xs font-black">
                      💳
                    </div>
                    <div>
                      <strong className="text-xs font-black text-white block">
                        Cartão de Visita Inteligente NFC
                      </strong>
                      <span className="text-[9.5px] font-bold text-emerald-300 block">
                        Contato Salvo Instantaneamente na Agenda
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                    Infinito
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  O fim definitivo dos cartões de papel que vão para o lixo. Aproxime o cartão no celular de um cliente ou parceiro de negócios e transfira todos os seus dados e seu Mini Site em <strong>0.3 segundos</strong>.
                </p>

                <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Causa impacto visual imediato e transmite alta autoridade</span>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              7. RESULTADOS REAIS & PROVA SOCIAL (AVALIAÇÕES GOOGLE VERIFICADAS)
             ============================================================== */}
          <div className="pt-3 space-y-3 text-left">
            <div className="p-4 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-slate-900 via-[#0a1224] to-amber-950/25 shadow-2xl space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-md shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-black block text-white">
                      Avaliações Oficiais do Google
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-sm font-black text-amber-400">5.0</span>
                      <span className="text-amber-400 text-xs tracking-tighter">★★★★★</span>
                      <span className="text-[10px] font-bold text-slate-400">
                        (184 avaliações)
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Verificado
                </span>
              </div>

              {/* Testimonials List */}
              <div className="space-y-2.5">
                {testimonials.slice(0, 3).map((rev: any, idx: number) => (
                  <div
                    key={rev.id || idx}
                    className="p-3.5 rounded-2xl border bg-slate-950/90 border-white/10 space-y-2 shadow-sm"
                  >
                    {rev.impactBadge && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-[9px] font-black text-cyan-300">
                        <span>{rev.impactBadge}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {rev.avatarUrl ? (
                          <img
                            src={rev.avatarUrl}
                            alt={rev.author}
                            className="w-8 h-8 rounded-full object-cover border border-amber-400/50 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                            {rev.author.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <strong className="text-[11px] font-bold block leading-none text-white truncate">
                            {rev.author}
                          </strong>
                          <span className="text-[9px] text-slate-400 block truncate mt-0.5">
                            {rev.role}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-amber-400 text-[10px] block">★★★★★</span>
                        <span className="text-[8px] text-slate-500">{rev.timeAgo || 'recente'}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              {/* Callout Button */}
              <a
                href={buildWaLink('Olá Allan! Vi os resultados dos clientes no Mini Site da ALF Automation e quero ter esse mesmo resultado na minha empresa!')}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Quero Ter Esse Mesmo Resultado no Meu Negócio</span>
              </a>
            </div>
          </div>

          {/* ==============================================================
              8. PRINCIPAIS DESTAQUES & SOLUÇÕES (4 PRODUTOS OFICIAIS)
             ============================================================== */}
          <div className="pt-3 space-y-3 text-left">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Principais Destaques &amp; Soluções</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400">
                4 Soluções Prontas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-all"
                >
                  <div className="relative w-full h-36 bg-black overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black text-white bg-gradient-to-r ${item.tagColor} shadow-md`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-black text-cyan-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-white leading-snug mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-[10.5px] text-slate-300 leading-relaxed mt-1 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <a
                      href={buildWaLink(item.waMsg)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 w-full py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-400/40 font-black text-[10.5px] flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      <Send className="w-3 h-3" />
                      <span>{item.ctaText}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==============================================================
              9. LOCALIZAÇÃO & ATENDIMENTO BRASIL
             ============================================================== */}
          <div className="pt-2 text-left">
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/50 flex items-center justify-between transition group shadow-md"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black block text-white truncate">
                    Atendimento em Todo o Brasil
                  </span>
                  <p className="text-[10px] text-slate-400 truncate">
                    Envio de Placas &amp; Cartões NFC com Frete Expresso
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          </div>

          {/* Footer note */}
          <div className="pt-4 pb-20 text-center space-y-1">
            <p className="text-[10px] font-bold text-slate-500">
              ALF Automation • Inteligência Artificial & Tecnologia NFC
            </p>
            <p className="text-[9px] text-slate-600">
              Desenvolvido no mais alto padrão tecnológico com arquitetura Apple
            </p>
          </div>
        </div>
      </div>

      {/* ==============================================================
          10. APPLE FLOATING BOTTOM CONVERSION DOCK (STICKY BAR)
         ============================================================== */}
      <div className="fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto pointer-events-auto">
        <div className="p-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl flex items-center justify-between gap-2.5">
          {/* Mini Founder Avatar */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/60 shrink-0 bg-black">
              <img
                src={founderPhoto}
                alt="Allan Fassa"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black"></span>
            </div>
            <div className="min-w-0 text-left">
              <span className="text-[11px] font-black text-white block truncate leading-tight">
                Allan Fassa
              </span>
              <span className="text-[9px] font-bold text-emerald-400 block truncate">
                Online agora • Resposta rápida
              </span>
            </div>
          </div>

          {/* Direct CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-[11px] flex items-center gap-1.5 shadow-md active:scale-95 transition shrink-0"
          >
            <Send className="w-3 h-3 stroke-[2.5]" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
