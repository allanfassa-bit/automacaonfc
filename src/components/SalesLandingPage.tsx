import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import {
  Star,
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Smartphone,
  QrCode,
  Wifi,
  Check,
  CheckCircle2,
  ExternalLink,
  X,
  ChevronRight,
  Maximize2,
  Menu,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QRCode from 'qrcode';
import {
  ALF_LOGO_DATA_URI,
  READY_MINISITE_MOCKUPS,
  ReadyMockupTemplate,
} from '../utils/readyMiniSiteMockups';
import { MiniSiteViewer } from './MiniSiteViewer';
import '../styles/salesLanding.css';

gsap.registerPlugin(ScrollTrigger);

export interface InterestLeadPayload {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  niche: string;
  interestType: string;
}

export interface SalesLandingPageProps {
  onOpenLogin: (suggestedTab?: string) => void;
  onExploreDemo?: () => void;
  initialNiche?: string;
  onRegisterInterest?: (payload: InterestLeadPayload) => Promise<void> | void;
  isAdminAuthenticated?: boolean;
  onGoToAdminPanel?: () => void;
}

const ALF_WHATSAPP_NUMBER = '5514981304973';

const buildAlfWhatsAppUrl = (message: string): string =>
  `https://wa.me/${ALF_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const PLAQUE_QR_WHATSAPP_URL = buildAlfWhatsAppUrl(
  'Olá! Escaneei o QR Code da Placa Google no site da ALF Automação e quero saber mais.'
);

interface AlfProtectedGooglePlaqueProps {
  className?: string;
}

const AlfProtectedGooglePlaque: React.FC<AlfProtectedGooglePlaqueProps> = ({ className = '' }) => {
  const [whatsappQrDataUrl, setWhatsappQrDataUrl] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(PLAQUE_QR_WHATSAPP_URL, {
      width: 280,
      margin: 0,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#111113',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        if (mounted) setWhatsappQrDataUrl(url);
      })
      .catch(() => {
        // Fallback keeps original QR blurred/covered
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <img
        src="/assets/aistudio/palca_empresa_01_a118061f.png"
        alt="Placa de Avaliação Google da ALF Automação com tecnologia NFC e QR Code"
        className="w-full h-auto object-contain block"
      />

      {/* Opaque shield covering 100% of the original PNG QR code + Scannable ALF WhatsApp QR with subtle frosted finish */}
      <a
        href={PLAQUE_QR_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Escaneie ou toque para falar no WhatsApp da ALF Automação"
        aria-label="QR Code oficial para WhatsApp da ALF Automação"
        style={{
          top: '57.7%',
          left: '60.1%',
          width: '28.0%',
          height: '27.5%',
        }}
        className="absolute z-10 bg-white rounded-[4px] p-[3%] flex items-center justify-center overflow-hidden shadow-inner group cursor-pointer"
      >
        {whatsappQrDataUrl ? (
          <img
            src={whatsappQrDataUrl}
            alt="QR Code WhatsApp ALF Automação"
            className="w-full h-full object-contain opacity-85 blur-[0.55px] group-hover:opacity-100 group-hover:blur-none transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-white/95 backdrop-blur-md" />
        )}

        {/* Center Google G emblem matching the physical plaque */}
        <div className="absolute w-[26%] h-[26%] rounded-full bg-white shadow-sm flex items-center justify-center p-[2px]">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

// Proportional 16:9 studio poster of the real ALF physical NFC Card (instant fallback for video)
const ALF_CARD_POSTER_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
    <rect width="960" height="540" fill="#050505"/>
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E2024"/>
        <stop offset="50%" stop-color="#0D0E11"/>
        <stop offset="100%" stop-color="#07080A"/>
      </linearGradient>
      <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.32"/>
        <stop offset="50%" stop-color="#2979FF" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <rect x="230" y="110" width="500" height="320" rx="26" fill="url(#cardGrad)" stroke="url(#edgeGlow)" stroke-width="2"/>
    <text x="275" y="165" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, Inter, sans-serif" font-size="16" font-weight="600" letter-spacing="3">ALF AUTOMAÇÃO</text>
    <text x="275" y="255" fill="#F5F5F7" font-family="-apple-system, BlinkMacSystemFont, Inter, sans-serif" font-size="48" font-weight="600" letter-spacing="1">MEU</text>
    <text x="275" y="295" fill="#86868B" font-family="-apple-system, BlinkMacSystemFont, Inter, sans-serif" font-size="26" font-weight="500" letter-spacing="5">CARTÃO NFC</text>
    <path d="M645 245 a24 24 0 0 1 0 38 M657 236 a38 38 0 0 1 0 56 M669 227 a52 52 0 0 1 0 74" fill="none" stroke="#2979FF" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
    <text x="645" y="395" fill="#86868B" font-family="-apple-system, BlinkMacSystemFont, Inter, sans-serif" font-size="13" font-weight="600" letter-spacing="2">ALF</text>
  </svg>`
)}`;

// All 6 preserved Bio Site public showcase model IDs
const SHOWCASE_PUBLIC_MODEL_IDS = [
  'bio_medica',
  'modelo_bio_pessoal_demo',
  'modelo_corretor_demo',
  'cafe',
  'bio_estetica_facial',
  'hamburgueria',
];

const SHORT_MODEL_LABELS: Record<string, string> = {
  bio_medica: 'Clínica Médica',
  modelo_bio_pessoal_demo: 'Bio Pessoal',
  modelo_corretor_demo: 'Corretor Alto Padrão',
  cafe: 'Cafeteria & Gastro',
  bio_estetica_facial: 'Estética Facial',
  hamburgueria: 'Hamburgueria',
};

const PLAQUE_STORY_STEPS = [
  {
    step: 1,
    label: '01. Ponto de Contato',
    title: 'A Placa Google posicionada no seu atendimento.',
    desc: 'Design corporativo de alto contraste para recepção, consultório, restaurante ou balcão.',
  },
  {
    step: 2,
    label: '02. Aproximação',
    title: 'O cliente aproxima o smartphone.',
    desc: 'Sem digitar endereço, sem procurar o nome da empresa e sem aplicativos.',
  },
  {
    step: 3,
    label: '03. Conexão NFC / QR',
    title: 'Leitura instantânea por NFC ou QR Code.',
    desc: 'Compatível com iPhone e Android em menos de um segundo.',
  },
  {
    step: 4,
    label: '04. Avaliação Google',
    title: 'A página oficial de 5 estrelas abre na hora.',
    desc: 'Elimina etapas exatamente no momento em que o cliente está mais satisfeito.',
  },
  {
    step: 5,
    label: '05. Mais Clientes',
    title: 'Mais avaliações reais fortalecem sua reputação.',
    desc: 'Empresas bem avaliadas ganham destaque nas buscas do Google e geram mais confiança.',
  },
];

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({
  onOpenLogin,
  initialNiche,
  onRegisterInterest,
  isAdminAuthenticated,
  onGoToAdminPanel,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const plaqueSectionRef = useRef<HTMLDivElement | null>(null);
  const bioSimulatorScreenRef = useRef<HTMLDivElement | null>(null);
  const nfcVideoRef = useRef<HTMLVideoElement | null>(null);
  const secretLogoClicksRef = useRef<{ count: number; lastClick: number }>({
    count: 0,
    lastClick: 0,
  });

  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [plaqueStoryState, setPlaqueStoryState] = useState<number>(4);
  const [activeBioTab, setActiveBioTab] = useState<'todos' | 'pessoal' | 'empresarial'>('todos');

  const [selectedShowcaseMockupId, setSelectedShowcaseMockupId] = useState<string>(() => {
    if (initialNiche) {
      const matched = READY_MINISITE_MOCKUPS.find(
        (m) =>
          SHOWCASE_PUBLIC_MODEL_IDS.includes(m.id) &&
          (m.id.toLowerCase().includes(initialNiche.toLowerCase()) ||
            m.category.toLowerCase().includes(initialNiche.toLowerCase()))
      );
      if (matched) return matched.id;
    }
    return 'bio_medica';
  });

  const [fullscreenEmulationMockup, setFullscreenEmulationMockup] =
    useState<ReadyMockupTemplate | null>(null);

  // Preserved Interest Lead Capture Modal State
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [interestTopic, setInterestTopic] = useState<string>('Bio Site + Cartão NFC (R$ 1.199,00)');
  const [interestName, setInterestName] = useState('');
  const [interestEmail, setInterestEmail] = useState('');
  const [interestPhone, setInterestPhone] = useState('');
  const [interestCompany, setInterestCompany] = useState('');
  const [interestNicheInput, setInterestNicheInput] = useState('');
  const [honeypotWebsite, setHoneypotWebsite] = useState('');
  const [isSubmittingInterest, setIsSubmittingInterest] = useState(false);
  const [interestSubmittedSuccess, setInterestSubmittedSuccess] = useState(false);
  const [interestError, setInterestError] = useState('');
  const [lastSubmitTimestamp, setLastSubmitTimestamp] = useState<number>(0);

  // Preserved 6 public showcase models
  const publicShowcaseModels: ReadyMockupTemplate[] = useMemo(() => {
    return SHOWCASE_PUBLIC_MODEL_IDS.map((id) =>
      READY_MINISITE_MOCKUPS.find((m) => m.id === id)
    ).filter((m): m is ReadyMockupTemplate => Boolean(m));
  }, []);

  // Filtered list when user switches category pill in Section 02
  const filteredSimulatorModels: ReadyMockupTemplate[] = useMemo(() => {
    if (activeBioTab === 'pessoal') {
      return publicShowcaseModels.filter((m) =>
        ['modelo_bio_pessoal_demo', 'modelo_corretor_demo', 'bio_medica'].includes(m.id)
      );
    }
    if (activeBioTab === 'empresarial') {
      return publicShowcaseModels.filter((m) =>
        ['bio_medica', 'cafe', 'bio_estetica_facial', 'hamburgueria'].includes(m.id)
      );
    }
    return publicShowcaseModels;
  }, [activeBioTab, publicShowcaseModels]);

  const activeBioPreviewMockup: ReadyMockupTemplate = useMemo(() => {
    return (
      publicShowcaseModels.find((m) => m.id === selectedShowcaseMockupId) ||
      publicShowcaseModels[0] ||
      READY_MINISITE_MOCKUPS[0]
    );
  }, [publicShowcaseModels, selectedShowcaseMockupId]);

  const handleSelectSimulatorModel = (modelId: string) => {
    setSelectedShowcaseMockupId(modelId);
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      bioSimulatorScreenRef.current
    ) {
      gsap.fromTo(
        bioSimulatorScreenRef.current,
        { opacity: 0.55, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.25 }
      );
    }
  };

  // Preserved 5-click secret administrative/client login trigger on footer logo
  const handleSecretFooterLogoClick = () => {
    const now = Date.now();
    if (now - secretLogoClicksRef.current.lastClick > 2500) {
      secretLogoClicksRef.current.count = 1;
    } else {
      secretLogoClicksRef.current.count += 1;
    }
    secretLogoClicksRef.current.lastClick = now;
    if (secretLogoClicksRef.current.count >= 5) {
      secretLogoClicksRef.current.count = 0;
      onOpenLogin();
    }
  };

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterestError('');

    if (honeypotWebsite.trim().length > 0) {
      setInterestSubmittedSuccess(true);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTimestamp < 30000) {
      setInterestError('Aguarde alguns segundos antes de enviar uma nova solicitação.');
      return;
    }

    const cleanName = interestName.trim();
    const cleanEmail = interestEmail.trim().toLowerCase();
    const cleanPhone = interestPhone.replace(/\D/g, '');
    const cleanCompany = interestCompany.trim() || cleanName;

    if (!cleanName || cleanName.length < 2) {
      setInterestError('Por favor, informe seu nome completo.');
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setInterestError('Por favor, informe um e-mail válido para contato.');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      setInterestError('Por favor, informe seu WhatsApp ou telefone com DDD.');
      return;
    }

    setIsSubmittingInterest(true);
    try {
      if (onRegisterInterest) {
        await onRegisterInterest({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          companyName: cleanCompany,
          niche: interestNicheInput.trim() || 'Não informado',
          interestType: interestTopic,
        });
      }
      setLastSubmitTimestamp(Date.now());
      setInterestSubmittedSuccess(true);
    } catch (_) {
      setInterestSubmittedSuccess(true);
    } finally {
      setIsSubmittingInterest(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setIsHeaderScrolled(y > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const videoEl = nfcVideoRef.current;
    if (!videoEl) return;
    videoEl.muted = true;
    videoEl.play().catch(() => {
      // Poster fallback remains visible if autoplay is blocked
    });
  }, []);

  // ============================================================================
  // SHORT (<1.2s), NON-CLIPPING, MOBILE-ADAPTED GSAP + SCROLLTRIGGER CHOREOGRAPHY
  // Strictly respects prefers-reduced-motion with zero redundant easing
  // ============================================================================
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !rootRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.normalizeScroll(true);

      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const stepDur = isMobile ? 0.25 : 0.32;
      const stageDur = isMobile ? 0.34 : 0.42;
      const overlap = isMobile ? '-=0.18' : '-=0.22';

      // 1. Hero Entrance Timeline (Strictly < 1.2s total duration on mobile & desktop, 'power2.out' ease)
      const heroTl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: stepDur },
      });

      heroTl
        .fromTo('.gsap-hero-eyebrow', { y: 10, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo('.gsap-hero-headline', { y: 14, opacity: 0 }, { y: 0, opacity: 1 }, overlap)
        .fromTo('.gsap-hero-sub', { y: 12, opacity: 0 }, { y: 0, opacity: 1 }, overlap)
        .fromTo('.gsap-hero-cta', { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, overlap)
        .fromTo(
          '.gsap-hero-stage',
          { y: 16, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: stageDur },
          overlap
        );

      if (heroTl.totalDuration() > 1.15) {
        heroTl.totalDuration(isMobile ? 0.85 : 1.05);
      }

      // 2. SECTION 01 — Short, non-clipping ScrollTrigger timeline (< 1.2s)
      if (plaqueSectionRef.current) {
        const plaqueTl = gsap.timeline({
          defaults: { ease: 'power2.out', duration: isMobile ? 0.45 : 0.55 },
          scrollTrigger: {
            trigger: plaqueSectionRef.current,
            start: 'top 84%',
            end: 'center 46%',
            scrub: 0.3,
            onUpdate: (self) => {
              const step = Math.min(5, Math.max(1, Math.ceil(self.progress * 5) || 1));
              setPlaqueStoryState(step);
            },
          },
        });

        plaqueTl
          .fromTo(
            '.gsap-plaque-card',
            { x: isMobile ? -8 : -16, opacity: 0.88, scale: 0.97 },
            { x: 0, opacity: 1, scale: 1 },
            0
          )
          .fromTo(
            '.gsap-plaque-phone',
            { x: isMobile ? 16 : 32, y: 12, opacity: 0.72, scale: 0.96 },
            { x: 0, y: 0, opacity: 1, scale: 1 },
            0
          );
      }

      // 3. SECTION 02 — Bio Site Simulator stage entrance (< 1.2s)
      const bioTl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: isMobile ? 0.38 : 0.45 },
        scrollTrigger: {
          trigger: '.gsap-biosite-section',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      bioTl.fromTo('.gsap-biosite-phone-stage', { y: 16, opacity: 0.88 }, { y: 0, opacity: 1 });

      // 4. Short section header reveals (< 1.2s)
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: isMobile ? 0.36 : 0.45,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, rootRef);

    return () => {
      ScrollTrigger.normalizeScroll(false);
      ctx.revert();
    };
  }, []);

  const currentStepInfo =
    PLAQUE_STORY_STEPS.find((s) => s.step === plaqueStoryState) || PLAQUE_STORY_STEPS[3];

  // Official commercial WhatsApp URLs
  const specialistWhatsAppUrl = buildAlfWhatsAppUrl(
    'Olá! Gostaria de falar com um especialista da ALF Automação.'
  );
  const googlePlaqueWhatsAppUrl = buildAlfWhatsAppUrl(
    'Olá! Quero minha Placa de Avaliação Google (R$ 129,00) da ALF Automação.'
  );
  const bioSiteWhatsAppUrl = buildAlfWhatsAppUrl(
    'Olá! Quero meu Bio Site Profissional (R$ 1.199,00) da ALF Automação.'
  );

  return (
    <div
      ref={rootRef}
      className="alf-lp-root min-h-screen selection:bg-[#2979FF] selection:text-white"
    >
      {/* Return bar if Administrator session is active (preserved) */}
      {isAdminAuthenticated && onGoToAdminPanel && (
        <div className="bg-[#0A0A0D] border-b border-white/10 py-2 px-4 text-xs text-zinc-300">
          <div className="alf-lp-container flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 font-medium truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">Sessão administrativa ativa</span>
            </span>
            <button
              type="button"
              onClick={onGoToAdminPanel}
              className="text-white hover:text-[#2979FF] font-semibold flex items-center gap-1 cursor-pointer transition shrink-0"
            >
              <span>Voltar ao Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          APPLE-STYLE 54PX FROSTED GLASS GLOBAL NAVBAR (MOBILE + DESKTOP)
          ==================================================================== */}
      <header className={`alf-lp-header ${isHeaderScrolled ? 'is-scrolled' : ''}`}>
        <div className="alf-lp-container h-full flex items-center justify-between gap-3">
          <a href="#topo" className="alf-lp-brand-lockup shrink-0" aria-label="ALF Automação">
            <div className="alf-lp-brand-emblem">
              <img
                src="/alf-logo.jpg"
                onError={(e) => {
                  e.currentTarget.src = ALF_LOGO_DATA_URI;
                }}
                alt="ALF Automação"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#F5F5F7]">
                ALF Automação
              </span>
              <span className="hidden sm:inline-block text-[11px] font-normal text-[#86868B]">
                Presença Digital
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            <a
              href="#placa-google"
              className="text-[12px] font-normal text-[#F5F5F7]/80 hover:text-white transition-colors"
            >
              Placa Google
            </a>
            <a
              href="#bio-site"
              className="text-[12px] font-normal text-[#F5F5F7]/80 hover:text-white transition-colors"
            >
              Simulador Bio Site
            </a>
            <a
              href="#demonstracoes"
              className="text-[12px] font-normal text-[#F5F5F7]/80 hover:text-white transition-colors"
            >
              Demonstrações
            </a>
            <a
              href="#contato"
              className="text-[12px] font-normal text-[#F5F5F7]/80 hover:text-white transition-colors"
            >
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={specialistWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2979FF] hover:bg-[#1B63E0] text-white text-[11px] sm:text-[12px] font-medium px-3 sm:px-3.5 py-1.5 transition-colors"
            >
              <span>Falar com especialista</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/10 px-5 py-4 space-y-3 text-left">
            <a
              href="#placa-google"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-[14px] font-medium text-[#F5F5F7]"
            >
              Placa Google (R$ 129,00)
            </a>
            <a
              href="#bio-site"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-[14px] font-medium text-[#F5F5F7]"
            >
              Simulador de Bio Sites (R$ 1.199,00)
            </a>
            <a
              href="#demonstracoes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-[14px] font-medium text-[#F5F5F7]"
            >
              6 Modelos Demonstrativos
            </a>
            <a
              href="#contato"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-[14px] font-medium text-[#2979FF]"
            >
              Solicitar Contratação
            </a>
          </div>
        )}
      </header>

      {/* ====================================================================
          HERO — APPLE KEYNOTE OPEN STAGE (#050505 DARK)
          ==================================================================== */}
      <section
        id="topo"
        className="gsap-hero-section alf-section-dark relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[540px] h-[340px] rounded-full blur-[120px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(41,121,255,0.42) 0%, rgba(5,5,5,0) 72%)',
          }}
        />

        <div className="alf-lp-container relative z-10">
          <div className="max-w-[920px] mx-auto text-center">
            <p className="gsap-hero-eyebrow alf-typo-eyebrow text-[#2979FF] mb-3">
              ALF Automação • Soluções para Presença Digital Inteligente
            </p>

            <h1 className="gsap-hero-headline alf-typo-display">
              <span className="alf-text-titanium block">Presença digital inteligente</span>
              <span className="text-[#86868B] block mt-1">para empresas e profissionais.</span>
            </h1>

            <p className="gsap-hero-sub alf-typo-body text-[#86868B] max-w-[650px] mx-auto mt-5">
              Mais avaliações no Google, uma apresentação profissional na internet e conexões
              rápidas em poucos segundos.
            </p>

            <div className="gsap-hero-cta mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <a href="#placa-google" className="alf-btn-blue">
                <span>Conhecer soluções</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#bio-site" className="alf-btn-ghost-on-dark">
                <span>Testar simulador de Bio Sites</span>
              </a>
            </div>
          </div>

          {/* Open Studio Hardware Stage */}
          <div className="gsap-hero-stage mt-12 md:mt-16">
            <div className="relative max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Product 01: Real Google Review Plaque (Compact on Mobile + Protected WhatsApp QR) */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <AlfProtectedGooglePlaque className="w-[175px] sm:w-[235px] md:w-[270px] drop-shadow-[0_28px_50px_rgba(0,0,0,0.95)]" />
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#2979FF]" />
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#F5F5F7]">
                    Placa de Avaliação Google
                  </span>
                  <span className="text-[12px] sm:text-[13px] text-[#86868B]">
                    • NFC + QR Code • R$ 129,00
                  </span>
                </div>
              </div>

              {/* Product 02: Interactive Live Smartphone Preview */}
              <div className="lg:col-span-6 flex flex-col items-center">
                {/* Quick Model Switcher Pills above the Hero Phone */}
                <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 max-w-[380px]">
                  {publicShowcaseModels.slice(0, 4).map((m) => {
                    const isSelected = activeBioPreviewMockup.id === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectSimulatorModel(m.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#2979FF] text-white shadow-sm'
                            : 'bg-white/8 text-[#86868B] hover:text-white border border-white/10'
                        }`}
                      >
                        <span>{m.emoji}</span>
                        <span>{SHORT_MODEL_LABELS[m.id] || m.category}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="alf-titanium-phone alf-titanium-phone-simulator">
                  <div className="alf-titanium-island">
                    <div className="alf-titanium-lens" />
                  </div>
                  <div className="alf-titanium-screen text-left">
                    {/* Top iPhone Status Bar + Expand Button */}
                    <div className="px-4 py-2 flex items-center justify-between text-[10px] font-semibold text-white bg-[#050811] border-b border-white/10">
                      <span className="flex items-center gap-1.5">
                        <span>9:41</span>
                        <span className="text-[#2979FF] font-medium">• Simulador ao Vivo</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFullscreenEmulationMockup(activeBioPreviewMockup)}
                        className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-white font-semibold cursor-pointer"
                      >
                        <span>Tela cheia</span>
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* REAL INTERACTIVE BIO SITE RENDERED LIVE INSIDE THE PHONE */}
                    <div className="alf-live-biosite-viewport">
                      <MiniSiteViewer
                        key={`hero-live-${activeBioPreviewMockup.id}`}
                        standalone={true}
                        config={activeBioPreviewMockup.config}
                        leadId={activeBioPreviewMockup.id}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#F5F5F7]" />
                  <span className="text-[13px] font-medium text-[#F5F5F7]">
                    Bio Site Profissional
                  </span>
                  <span className="text-[13px] text-[#86868B]">
                    • Role dentro da tela ou troque o modelo • R$ 1.199,00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SEÇÃO 01 — PLACA DE AVALIAÇÃO GOOGLE (#F5F5F7 LIGHT)
          Short, Non-Clipping, Mobile-Adapted GSAP Scroll Choreography
          ==================================================================== */}
      <section
        id="placa-google"
        ref={plaqueSectionRef}
        className="alf-section-light alf-lp-section relative overflow-hidden"
      >
        <div className="alf-lp-container">
          <div className="max-w-[820px] mx-auto text-center">
            <p className="alf-typo-eyebrow text-[#2979FF] mb-2.5">
              Solução 01 • Placa de Avaliação Google
            </p>
            <h2 className="alf-typo-h1">
              <span className="text-[#1D1D1F]">Seu cliente gostou do atendimento? </span>
              <span className="text-[#86868B]">Facilite a avaliação no Google.</span>
            </h2>
            <p className="alf-typo-body text-[#86868B] max-w-[640px] mx-auto mt-4">
              Com aproximação NFC ou leitura por QR Code, o cliente acessa diretamente a página de
              avaliação da sua empresa em poucos segundos.
            </p>
          </div>

          {/* 5-State Interactive Step Selector (Works smoothly on Mobile & Desktop) */}
          <div className="mt-7 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {PLAQUE_STORY_STEPS.map((item) => {
              const isActive = plaqueStoryState === item.step;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setPlaqueStoryState(item.step)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1D1D1F] text-white shadow-sm'
                      : 'bg-black/[0.05] text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Responsive Product Stage (Never clips on mobile or desktop) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-2 py-4">
              {/* Real Google Plaque Photograph (Compact on Mobile + Protected WhatsApp QR) */}
              <div className="gsap-plaque-card relative z-10 flex justify-center">
                <AlfProtectedGooglePlaque className="w-[160px] sm:w-[215px] md:w-[245px] drop-shadow-[0_24px_45px_rgba(29,29,31,0.22)]" />
              </div>

              {/* Approaching Titanium Smartphone */}
              <div className="gsap-plaque-phone relative z-20 w-[235px] sm:w-[245px] sm:-ml-6">
                <div className="alf-titanium-phone alf-titanium-phone-light !max-w-[245px] !p-[9px] !rounded-[38px]">
                  <div className="alf-titanium-island !w-[68px] !h-[17px]" />
                  <div className="alf-titanium-screen !rounded-[30px] bg-white text-[#1D1D1F]">
                    <div className="relative h-[320px] w-full overflow-hidden">
                      {/* Screen Layer A: NFC Reader Prompt */}
                      <div
                        className={` absolute inset-0 bg-[#F5F5F7] p-5 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
                          plaqueStoryState >= 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-[#2979FF]/12 text-[#2979FF] flex items-center justify-center mb-3">
                          <Wifi className="w-6 h-6 rotate-90" />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF]">
                          Aproxime o Celular
                        </span>
                        <p className="text-[14px] font-semibold text-[#1D1D1F] mt-1">
                          Placa Google NFC + QR
                        </p>
                        <p className="text-[12px] text-[#86868B] mt-1">
                          Toque nos passos acima ou role a página para simular a leitura.
                        </p>
                      </div>

                      {/* Screen Layer B: Official Google 5-Star Review Page */}
                      <div
                        className={`absolute inset-0 bg-white p-4 flex flex-col justify-between transition-opacity duration-300 ${
                          plaqueStoryState >= 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-black/10 pb-2">
                            <span className="text-[12px] font-semibold text-[#1D1D1F]">
                              Google Avaliações
                            </span>
                            <span className="text-[10px] font-medium text-[#2979FF] bg-[#2979FF]/10 px-2 py-0.5 rounded-full">
                              Oficial
                            </span>
                          </div>

                          <div className="mt-3 text-center">
                            <p className="text-[13px] font-semibold text-[#1D1D1F]">
                              Sua Empresa no Google
                            </p>
                            <p className="text-[11px] text-[#86868B]">
                              Classifique sua experiência
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-1 text-[#FBBC05]">
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                            </div>
                          </div>

                          <div className="mt-3 rounded-xl bg-[#F5F5F7] p-2.5 text-left">
                            <p className="text-[11px] text-[#1D1D1F] leading-snug">
                              “Atendimento impecável e avaliação super rápida pelo celular!”
                            </p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="w-full py-2 rounded-lg bg-[#2979FF] text-white text-center text-[11px] font-medium">
                            Publicar Avaliação 5★
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live State Narrative + 3 Objective Benefits + Commercial Price CTA */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="border-b border-black/10 pb-4">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#2979FF]">
                  {currentStepInfo.label}
                </span>
                <h3 className="alf-typo-h3 text-[#1D1D1F] mt-1">{currentStepInfo.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-[#86868B] mt-1.5 leading-relaxed">
                  {currentStepInfo.desc}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2979FF]/12 text-[#2979FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-medium text-[#1D1D1F]">
                    Acesso rápido por aproximação ou leitura.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2979FF]/12 text-[#2979FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-medium text-[#1D1D1F]">
                    Reduz etapas até a avaliação.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#2979FF]/12 text-[#2979FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-medium text-[#1D1D1F]">
                    Ideal para balcão, recepção, consultório ou mesa de atendimento.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#86868B]">
                    Investimento único
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] sm:text-[30px] font-semibold tracking-tight text-[#1D1D1F]">
                      R$ 129,00
                    </span>
                    <span className="text-[13px] text-[#86868B]">pronta para uso</span>
                  </div>
                </div>

                <a
                  href={googlePlaqueWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alf-btn-dark w-full sm:w-auto"
                >
                  <span>Quero minha placa Google</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SEÇÃO 02 — SIMULADOR INTERATIVO DE BIO SITES (#050505 DARK)
          User clicks any of the 6 created Bio Sites and tests it LIVE inside the phone screen!
          ==================================================================== */}
      <section
        id="bio-site"
        className="gsap-biosite-section alf-section-dark alf-lp-section relative overflow-hidden"
      >
        <div className="alf-lp-container">
          <div className="gsap-reveal max-w-[860px] mx-auto text-center">
            <p className="alf-typo-eyebrow text-[#2979FF] mb-2.5">
              Solução 02 • Simulador de Bio Sites Profissionais
            </p>
            <h2 className="alf-typo-h1">
              <span className="alf-text-titanium block">Seu cartão de visita evoluiu.</span>
              <span className="text-[#86868B] block mt-1">
                Clique nos modelos abaixo e teste na tela.
              </span>
            </h2>
            <p className="alf-typo-body text-[#86868B] max-w-[660px] mx-auto mt-4">
              Veja na prática como podemos produzir o seu Bio Site. Selecione um modelo abaixo e
              navegue dentro da tela do celular em tempo real.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-7 flex flex-col items-center gap-4">
              <div className="alf-segmented-bar" role="tablist" aria-label="Categorias de Bio Site">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeBioTab === 'todos'}
                  onClick={() => setActiveBioTab('todos')}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer ${
                    activeBioTab === 'todos'
                      ? 'bg-[#2979FF] text-white shadow-sm'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  Todos os Modelos (6)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeBioTab === 'pessoal'}
                  onClick={() => {
                    setActiveBioTab('pessoal');
                    handleSelectSimulatorModel('modelo_bio_pessoal_demo');
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer ${
                    activeBioTab === 'pessoal'
                      ? 'bg-[#2979FF] text-white shadow-sm'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  Bio Site Pessoal
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeBioTab === 'empresarial'}
                  onClick={() => {
                    setActiveBioTab('empresarial');
                    handleSelectSimulatorModel('bio_medica');
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] font-medium transition-all cursor-pointer ${
                    activeBioTab === 'empresarial'
                      ? 'bg-[#2979FF] text-white shadow-sm'
                      : 'text-[#86868B] hover:text-white'
                  }`}
                >
                  Bio Site Empresarial
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Simulator Stage: Left Model Selector Cards + Center Live Phone Simulator + Right Benefits */}
          <div className="gsap-biosite-phone-stage mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Clickable Models List (User clicks and it appears live in the phone!) */}
            <div className="lg:col-span-4 space-y-2.5 text-left order-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Toque para trocar o Bio Site na tela</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {filteredSimulatorModels.map((model) => {
                  const isSelected = activeBioPreviewMockup.id === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleSelectSimulatorModel(model.id)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#2979FF]/15 border-[#2979FF] shadow-[0_0_25px_rgba(41,121,255,0.2)]'
                          : 'bg-[#111113] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <img
                        src={model.config.logoUrl}
                        alt={model.title}
                        className="w-11 h-11 rounded-xl object-cover border border-white/15 shrink-0 bg-black"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{model.emoji}</span>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF] truncate">
                            {SHORT_MODEL_LABELS[model.id] || model.category}
                          </span>
                        </div>
                        <p className="text-[14px] font-semibold text-[#F5F5F7] truncate mt-0.5">
                          {model.config.companyName || model.title}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-[#2979FF] translate-x-0.5' : 'text-[#86868B]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Column: LIVE INTERACTIVE SMARTPHONE SCREEN SIMULATOR */}
            <div className="lg:col-span-4 flex flex-col items-center order-2">
              <div className="alf-titanium-phone alf-titanium-phone-simulator">
                <div className="alf-titanium-island">
                  <div className="alf-titanium-lens" />
                </div>

                <div ref={bioSimulatorScreenRef} className="alf-titanium-screen text-left">
                  {/* Simulator Top Control Bar */}
                  <div className="px-4 py-2.5 flex items-center justify-between gap-2 bg-[#050811] border-b border-white/10">
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-[#2979FF] uppercase tracking-wider block truncate">
                        Simulador Interativo • Role a tela
                      </span>
                      <strong className="text-[12px] font-semibold text-white block truncate">
                        {activeBioPreviewMockup.config.companyName || activeBioPreviewMockup.title}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFullscreenEmulationMockup(activeBioPreviewMockup)}
                      className="px-2.5 py-1 rounded-full bg-[#2979FF] hover:bg-[#1B63E0] text-white text-[10px] font-medium flex items-center gap-1 shrink-0 cursor-pointer transition"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Expandir</span>
                    </button>
                  </div>

                  {/* LIVE RENDERED MINISITEVIEWER INSIDE THE PHONE */}
                  <div className="alf-live-biosite-viewport">
                    <MiniSiteViewer
                      key={`section2-live-${activeBioPreviewMockup.id}`}
                      standalone={true}
                      config={activeBioPreviewMockup.config}
                      leadId={activeBioPreviewMockup.id}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#86868B]">
                <span>👆 Role dentro do celular acima ou clique em</span>
                <button
                  type="button"
                  onClick={() => setFullscreenEmulationMockup(activeBioPreviewMockup)}
                  className="text-[#2979FF] font-semibold hover:underline cursor-pointer"
                >
                  Tela cheia
                </button>
              </div>
            </div>

            {/* Right Column: Open Editorial Benefits + Direct CTA */}
            <div className="lg:col-span-4 space-y-6 text-left order-3">
              <div className="border-t border-white/12 pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF]">
                  01 • Autoridade Imediata
                </span>
                <h3 className="text-[19px] font-semibold tracking-tight text-[#F5F5F7] mt-1">
                  Apresentação profissional
                </h3>
                <p className="text-[14px] text-[#86868B] mt-1 leading-relaxed">
                  Sua marca, especialidade ou empresa apresentada com clareza.
                </p>
              </div>

              <div className="border-t border-white/12 pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF]">
                  02 • Conversão Direta
                </span>
                <h3 className="text-[19px] font-semibold tracking-tight text-[#F5F5F7] mt-1">
                  Contato em um toque
                </h3>
                <p className="text-[14px] text-[#86868B] mt-1 leading-relaxed">
                  WhatsApp, telefone, localização, redes sociais e agendamento.
                </p>
              </div>

              <div className="border-t border-white/12 pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF]">
                  03 • Estrutura Completa
                </span>
                <h3 className="text-[19px] font-semibold tracking-tight text-[#F5F5F7] mt-1">
                  Links importantes em um só lugar
                </h3>
                <p className="text-[14px] text-[#86868B] mt-1 leading-relaxed">
                  Catálogo, portfólio, cardápio, serviços ou canais de atendimento.
                </p>
              </div>

              <div className="border-t border-white/12 pt-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF]">
                  04 • Ecossistema Físico + Digital
                </span>
                <h3 className="text-[19px] font-semibold tracking-tight text-[#F5F5F7] mt-1">
                  Compartilhamento simples
                </h3>
                <p className="text-[14px] text-[#86868B] mt-1 leading-relaxed">
                  Por link na bio, QR Code ou cartão NFC.
                </p>
              </div>
            </div>
          </div>

          {/* Section 02 Commercial Price & CTA */}
          <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 max-w-[880px] mx-auto">
            <div className="text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#86868B] block">
                Projeto Personalizado + Cartão NFC Incluso
              </span>
              <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-2.5 mt-0.5">
                <span className="text-[30px] sm:text-[32px] font-semibold tracking-tight text-[#F5F5F7]">
                  R$ 1.199,00
                </span>
                <span className="text-[13px] text-[#86868B]">
                  Bio Site exclusivo + Cartão NFC ALF
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href={buildAlfWhatsAppUrl(
                  `Olá! Gostei do modelo "${activeBioPreviewMockup.config.companyName || activeBioPreviewMockup.title}" no simulador e quero meu Bio Site Profissional (R$ 1.199,00).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="alf-btn-blue w-full sm:w-auto"
              >
                <span>Quero um Bio Site como este</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SEÇÃO 03 — DEMONSTRAÇÕES REAIS (#F5F5F7 LIGHT)
          All 6 Preserved Bio Site Models in Clean Apple Bento Grid
          ==================================================================== */}
      <section id="demonstracoes" className="alf-section-light alf-lp-section">
        <div className="alf-lp-container">
          <div className="gsap-reveal max-w-[780px] mx-auto text-center">
            <p className="alf-typo-eyebrow text-[#2979FF] mb-2.5">Vitrine de Modelos Prontos</p>
            <h2 className="alf-typo-h1 text-[#1D1D1F]">
              Veja como sua presença digital pode ficar.
            </h2>
            <p className="alf-typo-body text-[#86868B] mt-4">
              Explore exemplos reais de Bio Sites criados para diferentes segmentos.
            </p>
          </div>

          {/* 3 Columns Desktop / 2 Tablet / 1 Mobile */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicShowcaseModels.map((model) => (
              <article key={model.id} className="alf-bento-light flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#111113]">
                    <img
                      src={
                        model.config.coverImageUrl ||
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85'
                      }
                      alt={model.title}
                      className="w-full h-full object-cover opacity-85 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 text-[#1D1D1F] text-[11px] font-semibold tracking-tight">
                      {model.category}
                    </span>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-3 text-left">
                      <img
                        src={model.config.logoUrl}
                        alt={model.title}
                        className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 bg-black"
                      />
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-semibold text-white truncate">
                          {model.config.companyName || model.title}
                        </h3>
                        <p className="text-[12px] text-white/80 truncate">
                          {model.config.personRole || model.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pb-3 text-left">
                    <p className="text-[13.5px] text-[#86868B] line-clamp-2 leading-relaxed">
                      {model.config.bio || model.title}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectSimulatorModel(model.id);
                      const el = document.getElementById('bio-site');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-2.5 px-3 rounded-full bg-[#F5F5F7] hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    Simular no celular
                  </button>
                  <button
                    type="button"
                    onClick={() => setFullscreenEmulationMockup(model)}
                    className="py-2.5 px-3.5 rounded-full bg-[#2979FF] hover:bg-[#1B63E0] text-white text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Tela cheia</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SEÇÃO 04 — TECNOLOGIA NFC (#050505 DARK)
          Real ALF NFC Card Studio Video + Smartphone Interaction
          ==================================================================== */}
      <section className="gsap-nfc-section alf-section-dark alf-lp-section relative overflow-hidden">
        <div className="alf-lp-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 gsap-reveal text-left">
              <p className="alf-typo-eyebrow text-[#2979FF] mb-2.5">
                Recurso Complementar • Cartão NFC
              </p>
              <h2 className="alf-typo-h2">
                <span className="alf-text-titanium block">Compartilhe com um toque.</span>
              </h2>
              <p className="alf-typo-body text-[#86868B] mt-4">
                O cartão NFC permite abrir seu Bio Site por aproximação em celulares compatíveis,
                com QR Code integrado para acesso universal.
              </p>

              <div className="mt-6 space-y-3 text-[14px] text-[#F5F5F7]/85">
                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-[#2979FF] rotate-90 shrink-0" />
                  <span>Abertura por aproximação NFC em iPhone e Android</span>
                </div>
                <div className="flex items-center gap-3">
                  <QrCode className="w-4 h-4 text-[#2979FF] shrink-0" />
                  <span>QR Code de alta precisão impresso para leitura universal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-[#2979FF] shrink-0" />
                  <span>Sem necessidade de aplicativo instalado no celular do cliente</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-[28px] overflow-hidden bg-[#050505] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.85)]">
                <video
                  ref={nfcVideoRef}
                  src="/assets/aistudio/gemini_generated_video_0074c1e0_5e58e090.mp4"
                  poster={ALF_CARD_POSTER_URI}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-[260px] sm:h-[360px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF] block">
                      Incluso no Projeto Bio Site
                    </span>
                    <p className="text-[14px] sm:text-[15px] font-medium text-[#F5F5F7]">
                      Cartão NFC ALF + Bio Site sincronizado em tempo real
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFullscreenEmulationMockup(activeBioPreviewMockup)}
                    className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    Testar Bio Site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SEÇÃO FINAL — CONVERSÃO (#F5F5F7 LIGHT)
          Two Clean Apple Product Columns (Placa Google R$ 129 | Bio Site R$ 1.199)
          ==================================================================== */}
      <section id="contato" className="alf-section-light alf-lp-section">
        <div className="alf-lp-container">
          <div className="gsap-reveal max-w-[780px] mx-auto text-center">
            <p className="alf-typo-eyebrow text-[#2979FF] mb-2.5">Contratação Direta</p>
            <h2 className="alf-typo-h1 text-[#1D1D1F]">
              Escolha como evoluir sua presença digital.
            </h2>
            <p className="alf-typo-body text-[#86868B] mt-4">
              Fale com a ALF Automação e receba orientação para implementar a solução ideal para
              seu negócio ou atividade profissional.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[960px] mx-auto text-left">
            {/* Coluna 1 — Placa Google */}
            <div className="alf-bento-light p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="alf-typo-eyebrow text-[#2979FF]">Solução 01</span>
                <h3 className="text-[26px] sm:text-[28px] font-semibold tracking-tight text-[#1D1D1F] mt-2">
                  Placa Google
                </h3>
                <p className="text-[15px] text-[#86868B] mt-2.5 leading-relaxed">
                  Placa física com NFC e QR Code para facilitar avaliações no Google.
                </p>

                <div className="mt-5 pt-5 border-t border-black/10">
                  <span className="text-[12px] text-[#86868B] block">Valor</span>
                  <span className="text-[34px] sm:text-[38px] font-semibold tracking-tight text-[#1D1D1F]">
                    R$ 129,00
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 text-[14px] text-[#1D1D1F]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2979FF] shrink-0" />
                    <span>Configurada com o link oficial da sua empresa no Google</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2979FF] shrink-0" />
                    <span>Dupla tecnologia: aproximação NFC + leitura QR Code</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2979FF] shrink-0" />
                    <span>Pronta para balcão, recepção, clínica ou restaurante</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href={googlePlaqueWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alf-btn-dark w-full"
                >
                  <span>Solicitar Placa Google</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Coluna 2 — Bio Site */}
            <div className="alf-bento-light p-7 sm:p-10 flex flex-col justify-between ring-1 ring-[#2979FF]/25">
              <div>
                <span className="alf-typo-eyebrow text-[#2979FF]">Solução 02</span>
                <h3 className="text-[26px] sm:text-[28px] font-semibold tracking-tight text-[#1D1D1F] mt-2">
                  Bio Site
                </h3>
                <p className="text-[15px] text-[#86868B] mt-2.5 leading-relaxed">
                  Página profissional personalizada com links, canais de contato e compartilhamento
                  inteligente.
                </p>

                <div className="mt-5 pt-5 border-t border-black/10">
                  <span className="text-[12px] text-[#86868B] block">Valor</span>
                  <span className="text-[34px] sm:text-[38px] font-semibold tracking-tight text-[#1D1D1F]">
                    R$ 1.199,00
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5 text-[14px] text-[#1D1D1F]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2979FF] shrink-0" />
                    <span>Design exclusivo personalizado para seu segmento</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2979FF] shrink-0" />
                    <span>WhatsApp, localização, serviços, portfólio e redes sociais</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2979FF] shrink-0" />
                    <span>Inclui Cartão NFC físico ALF + QR Code personalizado</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href={bioSiteWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alf-btn-blue w-full"
                >
                  <span>Solicitar Bio Site</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          MINIMAL APPLE-GRADE FOOTER (5-CLICK SECRET PORTAL ACCESS PRESERVED)
          ==================================================================== */}
      <footer className="alf-section-dark border-t border-white/10 py-10">
        <div className="alf-lp-container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSecretFooterLogoClick}
              className="alf-lp-brand-emblem cursor-pointer focus:outline-none"
              title="ALF Automação"
              aria-label="Logo ALF Automação"
            >
              <img
                src="/alf-logo.jpg"
                onError={(e) => {
                  e.currentTarget.src = ALF_LOGO_DATA_URI;
                }}
                alt="ALF Automação"
                className="w-full h-full object-contain select-none"
              />
            </button>
            <div className="text-left">
              <span className="text-[14px] font-semibold text-[#F5F5F7] block">
                ALF Automação
              </span>
              <span className="text-[12px] text-[#86868B] block">
                Soluções para presença digital inteligente.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#86868B]">
            <a href="#placa-google" className="hover:text-white transition-colors">
              Placa Google
            </a>
            <a href="#bio-site" className="hover:text-white transition-colors">
              Simulador Bio Site
            </a>
            <a href="#demonstracoes" className="hover:text-white transition-colors">
              Demonstrações
            </a>
            <a
              href={specialistWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp Oficial
            </a>
          </div>

          <p className="text-[12px] text-[#86868B]">
            © {new Date().getFullYear()} ALF Automação. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ====================================================================
          PRESERVED INTEREST CAPTURE MODAL
          ==================================================================== */}
      {isInterestModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-[#111113] border border-white/15 rounded-3xl p-6 text-left relative">
            <button
              type="button"
              onClick={() => setIsInterestModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {!interestSubmittedSuccess ? (
              <form onSubmit={handleInterestSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2979FF]">
                    Atendimento Comercial
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-0.5">{interestTopic}</h3>
                </div>

                <input
                  type="text"
                  name="website"
                  value={honeypotWebsite}
                  onChange={(e) => setHoneypotWebsite(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={interestName}
                    onChange={(e) => setInterestName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                  <input
                    type="email"
                    required
                    value={interestEmail}
                    onChange={(e) => setInterestEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                  <input
                    type="tel"
                    required
                    value={interestPhone}
                    onChange={(e) => setInterestPhone(e.target.value)}
                    placeholder="WhatsApp com DDD"
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={interestCompany}
                      onChange={(e) => setInterestCompany(e.target.value)}
                      placeholder="Empresa"
                      className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={interestNicheInput}
                      onChange={(e) => setInterestNicheInput(e.target.value)}
                      placeholder="Segmento"
                      className="w-full bg-black border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {interestError && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs">
                    {interestError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingInterest}
                  className="alf-btn-blue w-full"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmittingInterest ? 'Enviando...' : 'Continuar solicitação'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-white">Solicitação registrada!</h4>
                <a
                  href={buildAlfWhatsAppUrl(
                    `Olá ALF Automação! Me chamo ${interestName}. Registrei meu interesse em: ${interestTopic}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="alf-btn-blue w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Concluir pelo WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          INTERACTIVE BIO SITE FULLSCREEN MODAL VIEWER (PRESERVED)
          ==================================================================== */}
      {fullscreenEmulationMockup && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col overflow-hidden"
        >
          <div className="w-full bg-[#050505] border-b border-white/10 px-3 sm:px-5 py-2.5 shrink-0 z-20 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-base sm:text-xl shrink-0">
                  {fullscreenEmulationMockup.emoji}
                </span>
                <div className="text-left min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#2979FF] block truncate">
                    Demonstração — {fullscreenEmulationMockup.category}
                  </span>
                  <strong className="text-xs sm:text-sm font-semibold text-white block truncate">
                    {fullscreenEmulationMockup.config.companyName ||
                      fullscreenEmulationMockup.title}
                  </strong>
                </div>
              </div>

              <div className="hidden xl:flex items-center gap-1.5 bg-[#0B0C10] p-1 rounded-xl border border-white/10">
                {publicShowcaseModels.map((m) => {
                  const active = m.id === fullscreenEmulationMockup.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setFullscreenEmulationMockup(m);
                        setSelectedShowcaseMockupId(m.id);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                        active
                          ? 'bg-[#2979FF] text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{m.emoji}</span>
                      <span>{SHORT_MODEL_LABELS[m.id] || m.category.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <a
                  href={buildAlfWhatsAppUrl(
                    `Olá! Gostaria de escolher o modelo demonstrativo de Bio Site: ${fullscreenEmulationMockup.category} (${fullscreenEmulationMockup.config.companyName || fullscreenEmulationMockup.title}) da ALF Automação.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alf-btn-blue !py-1.5 sm:!py-2 !px-3 sm:!px-4 !text-[11px] sm:!text-xs whitespace-nowrap"
                >
                  <span>Escolher este modelo</span>
                </a>

                <button
                  type="button"
                  onClick={() => setFullscreenEmulationMockup(null)}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-[11px] sm:text-xs flex items-center gap-1 border border-white/15 cursor-pointer transition shrink-0"
                  aria-label="Fechar demonstração"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Fechar</span>
                </button>
              </div>
            </div>

            <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {publicShowcaseModels.map((m) => {
                const active = m.id === fullscreenEmulationMockup.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setFullscreenEmulationMockup(m);
                      setSelectedShowcaseMockupId(m.id);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      active
                        ? 'bg-[#2979FF] text-white'
                        : 'bg-[#0B0C10] text-zinc-400 border border-white/10'
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span>{SHORT_MODEL_LABELS[m.id] || m.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-black">
            <MiniSiteViewer
              key={`fullscreen-${fullscreenEmulationMockup.id}`}
              standalone={true}
              config={fullscreenEmulationMockup.config}
              leadId={fullscreenEmulationMockup.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesLandingPage;
