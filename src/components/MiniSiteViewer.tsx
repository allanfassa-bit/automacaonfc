import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Smartphone,
  QrCode,
  Copy,
  ExternalLink,
  Download,
  Check,
  Star,
  Globe,
  Wifi,
  Sparkles,
  Layers,
  ArrowRight,
  Radio,
  FolderArchive,
  Phone,
  FileCode,
  Send,
  Zap,
  MapPin,
  Clock,
  HelpCircle,
  CheckCircle2,
  PackageCheck,
  Eye,
  X,
  Upload,
  Plus,
  Trash2,
  Briefcase,
  Save,
  Image as ImageIcon,
  Palette,
  Type,
  Navigation,
  ShoppingBag,
  UtensilsCrossed,
  Award,
  Shield,
  MessageSquare,
  Camera,
  Building2,
  Home,
  Lock
} from 'lucide-react';
import {
  MiniSiteConfig,
  MiniSiteFontFamily,
  MiniSiteSegmentType,
  FONT_FAMILY_OPTIONS,
  COLOR_PALETTE_PRESETS,
  CURATED_4K_IMAGES_BY_SEGMENT,
  getSegmentSmartMetadata,
  downloadMiniSiteHtml,
  downloadMiniSiteZip,
  openMiniSiteLivePreview,
  copyMiniSiteHtmlToClipboard,
  generateClientShareMessage,
  buildMiniSiteWhatsappUrl,
  sanitizeMiniSiteHandle,
  getDefaultFourProducts
} from '../utils/miniSiteExporter';
import {
  cleanClientSlug,
  getClientVercelUrl,
  downloadVercelClientZip,
  generateVercelClientPitchWhatsapp
} from '../utils/vercelMiniSiteExporter';
import { getPublicAppOrigin } from '../utils/publicUrlHelper';
import { GoogleReviewLinkGenerator } from './GoogleReviewLinkGenerator';
import {
  READY_MINISITE_MOCKUPS,
  ReadyMockupTemplate,
  ALF_LOGO_DATA_URI,
  WM_ALIMENTOS_LOGO_DATA_URI,
  WLADMIR_PHOTO_URL,
  CORRETOR_PHOTO_URL,
  ALLAN_FASSA_PHOTO_URL
} from '../utils/readyMiniSiteMockups';
import { formatMiniSitePhone } from '../utils/miniSiteExporter';
import { AlfAppleMiniSite } from './AlfAppleMiniSite';

interface MiniSiteViewerProps {
  config: MiniSiteConfig;
  onChangeConfig?: (updated: MiniSiteConfig) => void;
  onSaveConfig?: (updated: MiniSiteConfig) => Promise<void> | void;
  onClonePersonalProfile?: (clonedConfig: MiniSiteConfig, slugId: string) => Promise<void> | void;
  standalone?: boolean;
  onLinkToNfc?: (vercelUrl?: string) => void;
  leadId?: string;
  isLinkedToNfc?: boolean;
}

export const MiniSiteViewer: React.FC<MiniSiteViewerProps> = ({
  config: propConfig,
  onChangeConfig,
  onSaveConfig,
  onClonePersonalProfile,
  standalone = false,
  onLinkToNfc,
  leadId = 'demo',
  isLinkedToNfc = false
}) => {
  const [internalConfig, setInternalConfig] = useState<MiniSiteConfig>(propConfig);
  const [isFullSimulatorView, setIsFullSimulatorView] = useState<boolean>(true);
  const prevLeadIdRef = useRef<string>(leadId);

  useEffect(() => {
    setInternalConfig(propConfig);
    prevLeadIdRef.current = leadId;
  }, [leadId, propConfig.id, propConfig.companyName, propConfig.theme]);

  const config = internalConfig;

  const [activeTab, setActiveTab] = useState<'preview' | 'edit' | 'vercel' | 'export'>('preview');
  const [miniSiteViewTab, setMiniSiteViewTab] = useState<'all' | 'catalogo' | 'como_chegar' | 'avaliacoes'>('all');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('Todos');
  const [quickCart, setQuickCart] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedVercelLink, setCopiedVercelLink] = useState(false);
  const [copiedVercelPitch, setCopiedVercelPitch] = useState(false);
  const [copiedVercelCli, setCopiedVercelCli] = useState(false);
  const [customVercelDomain, setCustomVercelDomain] = useState('');
  const [isZipping, setIsZipping] = useState(false);
  const [isZippingVercel, setIsZippingVercel] = useState(false);
  const [isDownloadingHtml, setIsDownloadingHtml] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'pix' | 'wifi'>('none');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isClientPresentationOpen, setIsClientPresentationOpen] = useState(false);
  const [is4KLibraryOpen, setIs4KLibraryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceImg, setNewServiceImg] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isMiniHeaderScrolled, setIsMiniHeaderScrolled] = useState(false);
  const [isMiniPastViewport, setIsMiniPastViewport] = useState(false);
  const miniSiteRootRef = useRef<HTMLDivElement | null>(null);
  const simulatorScrollRef = useRef<HTMLDivElement | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Personal Profile Cloner State (Wladmir Garcia / WM Alimentos template & cloner)
  const [isPersonalCloneModalOpen, setIsPersonalCloneModalOpen] = useState(false);
  const [clonePersonName, setClonePersonName] = useState('Wladmir Garcia');
  const [cloneCompanyBrand, setCloneCompanyBrand] = useState('WM Alimentos');
  const [clonePersonRole, setClonePersonRole] = useState('Gestão Comercial & Negócios • WM Alimentos');
  const [cloneTagline, setCloneTagline] = useState(
    'Atuação estratégica no setor alimentício com a WM Alimentos — excelência, compromisso, qualidade superior e atendimento próximo para impulsionar resultados e grandes parcerias.'
  );
  const [cloneInstagram, setCloneInstagram] = useState('@wladgarcia_');
  const [cloneWhatsapp, setCloneWhatsapp] = useState('+551499904-1500');
  const [clonePortraitUrl, setClonePortraitUrl] = useState(WLADMIR_PHOTO_URL);
  const [cloneLogoUrl, setCloneLogoUrl] = useState(WM_ALIMENTOS_LOGO_DATA_URI);

  // Attached Founder Photo for ALF Automation (Allan Fassa)
  const founderPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const [attachedFounderPhoto, setAttachedFounderPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem('alf_attached_founder_photo') || config.portraitImageUrl || ALLAN_FASSA_PHOTO_URL;
    } catch (_) {
      return config.portraitImageUrl || ALLAN_FASSA_PHOTO_URL;
    }
  });

  const handleFounderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          setAttachedFounderPhoto(result);
          try {
            localStorage.setItem('alf_attached_founder_photo', result);
          } catch (_) {}
          if (onChangeConfig) {
            onChangeConfig({ ...config, portraitImageUrl: result });
          }
          setToastMessage('Foto do Fundador (Allan Fassa) anexada com sucesso!');
          setTimeout(() => setToastMessage(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Corretor de Imóveis Official Client & Personalizer State (Nivaldo Furtuozo • CRECI 73.286)
  const [isCorretorCustomizeModalOpen, setIsCorretorCustomizeModalOpen] = useState(false);
  const [showInlinePropertyConfig, setShowInlinePropertyConfig] = useState(false);
  const [isCorretorAuthenticated, setIsCorretorAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nivaldo_corretor_auth') === 'true';
    } catch (_) {
      return false;
    }
  });
  const [corretorLoginUser, setCorretorLoginUser] = useState('');
  const [corretorLoginPass, setCorretorLoginPass] = useState('');
  const [corretorLoginError, setCorretorLoginError] = useState<string | null>(null);
  const [corretorNewPassword, setCorretorNewPassword] = useState('');
  const [isSavingCorretorDb, setIsSavingCorretorDb] = useState(false);

  const isCorretorOrigin = Boolean(
    config.id !== 'modelo_corretor_demo' &&
    (config.id === 'perfil_pessoal_corretor' ||
      (config.id || '').toLowerCase().includes('nivaldo') ||
      (config.id || '').toLowerCase().includes('furtuozo') ||
      (config.companyName || '').toLowerCase().includes('nivaldo') ||
      (config.companyBrandName || '').toLowerCase().includes('nivaldo'))
  );

  const cleanCorretorName = (raw?: string) => {
    if (!raw || raw.toLowerCase().includes('wladmir')) return 'Nivaldo Furtuozo';
    return raw.replace(/\s*[•|\-–]\s*CRECI.*$/i, '').trim() || 'Nivaldo Furtuozo';
  };

  const cleanCorretorRole = (raw?: string) => {
    if (!raw || raw.toLowerCase().includes('alimento')) {
      return 'CRECI 73.286 • Corretor de Imóveis de Alto Padrão';
    }
    if (!raw.toUpperCase().includes('CRECI')) {
      return `CRECI 73.286 • ${raw}`;
    }
    return raw;
  };

  const [corretorNameInput, setCorretorNameInput] = useState(
    isCorretorOrigin ? cleanCorretorName(config.companyName) : config.companyName || 'Sua Empresa'
  );
  const [corretorCreciInput, setCorretorCreciInput] = useState(
    isCorretorOrigin ? cleanCorretorRole(config.personRole) : config.personRole || config.niche || 'Atendimento Oficial'
  );
  const [corretorWhatsappInput, setCorretorWhatsappInput] = useState(
    isCorretorOrigin && config.whatsappNumber
      ? config.whatsappNumber
      : config.whatsappNumber || config.phone || '5514997047238'
  );
  const [corretorInstagramInput, setCorretorInstagramInput] = useState(
    isCorretorOrigin && config.instagramHandle
      ? config.instagramHandle
      : config.instagramUrl || config.instagramHandle || ''
  );
  const [corretorPhotoInput, setCorretorPhotoInput] = useState(
    isCorretorOrigin && config.portraitImageUrl && !config.portraitImageUrl.includes('IMG-20261021') && !config.portraitImageUrl.includes('unsplash.com')
      ? config.portraitImageUrl
      : config.portraitImageUrl || (isCorretorOrigin ? CORRETOR_PHOTO_URL : '')
  );
  const [clientLogoInput, setClientLogoInput] = useState(config.logoUrl || '');
  const [clientCoverInput, setClientCoverInput] = useState(config.coverImageUrl || '');
  const [clientGoogleReviewInput, setClientGoogleReviewInput] = useState(config.googleReviewUrl || '');
  const [clientAddressInput, setClientAddressInput] = useState(config.address || '');
  const [clientCityInput, setClientCityInput] = useState(config.city || '');
  const [clientOpeningHoursInput, setClientOpeningHoursInput] = useState(config.openingHours || '');
  const [corretorTaglineInput, setCorretorTaglineInput] = useState(
    isCorretorOrigin && config.tagline && !config.tagline.toLowerCase().includes('alimento')
      ? config.tagline
      : config.tagline || 'Atendimento personalizado e direto no WhatsApp.'
  );

  const [corretorProp1, setCorretorProp1] = useState({
    title: config.services?.[0]?.title || 'Mansão Contemporânea Alphaville • 5 Suítes',
    price: config.services?.[0]?.price || 'R$ 6.850.000',
    description: config.services?.[0]?.description || '920m² de área construída, living c/ pé-direito duplo de 7m, espaço gourmet integrado, piscina c/ borda infinita e automação residencial completa.',
    imageUrl: config.services?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85'
  });
  const [corretorProp2, setCorretorProp2] = useState({
    title: config.services?.[1]?.title || 'Cobertura Duplex Vista Panorâmica • Jardins',
    price: config.services?.[1]?.price || 'R$ 4.200.000',
    description: config.services?.[1]?.description || '480m² privativos, 4 suítes, terraço privativo c/ spa aquecido, vista 360° para a copa das árvores dos Jardins e 5 vagas de garagem.',
    imageUrl: config.services?.[1]?.imageUrl || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85'
  });
  const [corretorProp3, setCorretorProp3] = useState({
    title: config.services?.[2]?.title || 'Residência High-Tech & Sustentável • 4 Suítes',
    price: config.services?.[2]?.price || 'R$ 5.490.000',
    description: config.services?.[2]?.description || 'Automação residencial total, usina solar fotovoltaica, sauna integrada à piscina aquecida, adega e lazer privativo.',
    imageUrl: config.services?.[2]?.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85'
  });
  const [corretorProp4, setCorretorProp4] = useState({
    title: config.services?.[3]?.title || 'Villa Garden Térrea com Piscina & Gourmet • 4 Suítes',
    price: config.services?.[3]?.price || 'R$ 3.850.000',
    description: config.services?.[3]?.description || '380m² de conceito aberto e totalmente térreo. 4 suítes com vista para o jardim, varanda gourmet integrada, fogo de chão e piscina aquecida.',
    imageUrl: config.services?.[3]?.imageUrl || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85'
  });

  // Auto-open client self-service portal if URL has ?editar=1 or ?login=1
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('editar') === '1' || params.get('login') === '1' || params.get('painel') === '1') {
        setIsCorretorCustomizeModalOpen(true);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const isCorretorNow = Boolean(
      config.id !== 'modelo_corretor_demo' &&
      (config.id === 'perfil_pessoal_corretor' ||
        (config.id || '').toLowerCase().includes('nivaldo') ||
        (config.id || '').toLowerCase().includes('furtuozo') ||
        (config.companyName || '').toLowerCase().includes('nivaldo') ||
        (config.companyBrandName || '').toLowerCase().includes('nivaldo'))
    );
    if (isCorretorNow) {
      setCorretorNameInput(cleanCorretorName(config.companyName));
      setCorretorCreciInput(cleanCorretorRole(config.personRole));
      setCorretorWhatsappInput(config.whatsappNumber || '5514997047238');
      setCorretorInstagramInput(config.instagramHandle || '@nivaldocorretorimoveis');
      setCorretorPhotoInput(
        config.portraitImageUrl && !config.portraitImageUrl.includes('IMG-20261021') && !config.portraitImageUrl.includes('unsplash.com')
          ? config.portraitImageUrl
          : CORRETOR_PHOTO_URL
      );
      setCorretorTaglineInput(
        config.tagline && !config.tagline.toLowerCase().includes('alimento')
          ? config.tagline
          : 'Assessoria imobiliária especializada em compra, venda e locação de imóveis de alto padrão. Atendimento personalizado e direto no WhatsApp.'
      );
    } else {
      setCorretorNameInput(config.companyName || '');
      setCorretorCreciInput(config.personRole || config.niche || '');
      setCorretorWhatsappInput(config.whatsappNumber || config.phone || '');
      setCorretorInstagramInput(config.instagramUrl || config.instagramHandle || '');
      setCorretorPhotoInput(config.portraitImageUrl || '');
      setCorretorTaglineInput(config.tagline || '');
    }
    setClientLogoInput(config.logoUrl || '');
    setClientCoverInput(config.coverImageUrl || '');
    setClientGoogleReviewInput(config.googleReviewUrl || '');
    setClientAddressInput(config.address || '');
    setClientCityInput(config.city || '');
    setClientOpeningHoursInput(config.openingHours || '');

    const defaultItems = getDefaultFourProducts(config.niche, config.companyName || 'Sua Empresa');
    const sourceItems =
      Array.isArray(config.services) && config.services.length > 0 ? config.services : defaultItems;
    if (sourceItems[0]) {
      setCorretorProp1({
        title: sourceItems[0].title || '',
        price: sourceItems[0].price || '',
        description: sourceItems[0].description || '',
        imageUrl: sourceItems[0].imageUrl || defaultItems[0]?.imageUrl || ''
      });
    }
    if (sourceItems[1]) {
      setCorretorProp2({
        title: sourceItems[1].title || '',
        price: sourceItems[1].price || '',
        description: sourceItems[1].description || '',
        imageUrl: sourceItems[1].imageUrl || defaultItems[1]?.imageUrl || ''
      });
    }
    if (sourceItems[2]) {
      setCorretorProp3({
        title: sourceItems[2].title || '',
        price: sourceItems[2].price || '',
        description: sourceItems[2].description || '',
        imageUrl: sourceItems[2].imageUrl || defaultItems[2]?.imageUrl || ''
      });
    }
    if (sourceItems[3]) {
      setCorretorProp4({
        title: sourceItems[3].title || '',
        price: sourceItems[3].price || '',
        description: sourceItems[3].description || '',
        imageUrl: sourceItems[3].imageUrl || defaultItems[3]?.imageUrl || ''
      });
    }
  }, [
    config.id,
    config.companyName,
    config.niche,
    config.portraitImageUrl,
    config.logoUrl,
    config.coverImageUrl,
    config.googleReviewUrl,
    config.address,
    config.city,
    config.openingHours
  ]);

  const LUXURY_PROPERTY_PRESET_IMAGES = [
    {
      label: 'Mansão Piscina',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85'
    },
    {
      label: 'Cobertura Duplex',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85'
    },
    {
      label: 'Villa Contemporânea',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85'
    },
    {
      label: 'Casa Garden',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85'
    },
    {
      label: 'Living Pé-Direito',
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=85'
    },
    {
      label: 'Fachada Noturna',
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85'
    }
  ];

  const handlePropertyImageFileUpload = (
    propIndex: 1 | 2 | 3 | 4,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (!dataUrl) return;
      applyPropertyImageUpdate(propIndex, dataUrl);
      showToast(`📸 Foto do Imóvel Destaque ${propIndex} carregada com sucesso!`);
    };
    reader.readAsDataURL(file);
  };

  const applyPropertyImageUpdate = (propIndex: 1 | 2 | 3 | 4, newUrl: string) => {
    const next1 = propIndex === 1 ? { ...corretorProp1, imageUrl: newUrl } : corretorProp1;
    const next2 = propIndex === 2 ? { ...corretorProp2, imageUrl: newUrl } : corretorProp2;
    const next3 = propIndex === 3 ? { ...corretorProp3, imageUrl: newUrl } : corretorProp3;
    const next4 = propIndex === 4 ? { ...corretorProp4, imageUrl: newUrl } : corretorProp4;

    if (propIndex === 1) setCorretorProp1(next1);
    if (propIndex === 2) setCorretorProp2(next2);
    if (propIndex === 3) setCorretorProp3(next3);
    if (propIndex === 4) setCorretorProp4(next4);

    const brokerFirstName = (corretorNameInput || 'Nivaldo').split(' ')[0];
    const updatedServices = [
      {
        id: 'prop_1',
        title: next1.title,
        price: next1.price,
        description: next1.description,
        imageUrl: next1.imageUrl,
        customWhatsappMsg: `Olá ${brokerFirstName}! Vi a propriedade "${next1.title}" (${next1.price}) e gostaria de agendar uma visita!`
      },
      {
        id: 'prop_2',
        title: next2.title,
        price: next2.price,
        description: next2.description,
        imageUrl: next2.imageUrl,
        customWhatsappMsg: `Olá ${brokerFirstName}! Vi a propriedade "${next2.title}" (${next2.price}) e gostaria de agendar uma visita!`
      },
      {
        id: 'prop_3',
        title: next3.title,
        price: next3.price,
        description: next3.description,
        imageUrl: next3.imageUrl,
        customWhatsappMsg: `Olá ${brokerFirstName}! Vi a propriedade "${next3.title}" (${next3.price}) e gostaria de agendar uma visita!`
      },
      {
        id: 'prop_4',
        title: next4.title,
        price: next4.price,
        description: next4.description,
        imageUrl: next4.imageUrl,
        customWhatsappMsg: `Olá ${brokerFirstName}! Vi a propriedade "${next4.title}" (${next4.price}) e gostaria de agendar uma visita!`
      }
    ];
    updateAndPersist({ services: updatedServices });
  };

  const handleCorretorLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCorretorLoginError(null);
    const activeLeadId = String(leadId || config.id || '').trim().toLowerCase();
    const u = (corretorLoginUser.trim() || activeLeadId).toLowerCase();
    const p = corretorLoginPass.trim();

    // Ensure a client logging in on ?minisite=<id> is authenticating for THIS specific mini-site
    const isNivaldoSite =
      isCorretorOrigin ||
      activeLeadId === 'nivaldo' ||
      activeLeadId === 'furtuozocorretor' ||
      activeLeadId === 'corretor';

    if (
      isNivaldoSite &&
      (u === 'furtuozocorretor' || u === 'nivaldo' || u === 'corretor') &&
      p === 'Niva@2426'
    ) {
      setIsCorretorAuthenticated(true);
      try {
        localStorage.setItem(`alf_client_auth_${activeLeadId || 'nivaldo'}`, 'true');
      } catch (_) {}
      showToast('✅ Bem-vindo, Nivaldo Furtuozo (CRECI 73.286)! Painel liberado.');
      return;
    }

    try {
      const res = await fetch('/api/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: u, password: p })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Strict tenant isolation: ensure the logged-in user owns THIS Mini Site
        const returnedId = String(data.lead?.id || '').toLowerCase();
        const returnedPortalUser = String(data.lead?.portalUsername || '').toLowerCase();
        if (
          activeLeadId &&
          !isNivaldoSite &&
          returnedId !== activeLeadId &&
          returnedPortalUser !== activeLeadId &&
          u !== activeLeadId
        ) {
          setCorretorLoginError('Esta credencial pertence a outro estabelecimento. Acesse pelo link exclusivo do seu Mini Site.');
          return;
        }
        setIsCorretorAuthenticated(true);
        try {
          if (data.token) {
            localStorage.setItem(`alf_client_token_${activeLeadId || u}`, data.token);
          }
          localStorage.setItem(`alf_client_auth_${activeLeadId || u}`, 'true');
        } catch (_) {}
        showToast(`✅ Bem-vindo(a), ${data.lead?.name || config.companyName}! Painel exclusivo liberado.`);
      } else {
        setCorretorLoginError(data.error || 'Usuário ou senha inválidos para este Mini Site.');
      }
    } catch (_) {
      setCorretorLoginError('Erro ao validar credenciais. Verifique seu usuário e senha.');
    }
  };

  const handleSaveCorretorToDatabase = async (updatedConfig: MiniSiteConfig) => {
    setIsSavingCorretorDb(true);
    const activeLeadId = String(leadId || config.id || '').trim().toLowerCase();
    const isNivaldoSite =
      isCorretorOrigin ||
      activeLeadId === 'nivaldo' ||
      activeLeadId === 'furtuozocorretor' ||
      activeLeadId === 'corretor';
    const targetUsername = isNivaldoSite
      ? 'furtuozocorretor'
      : corretorLoginUser.trim().toLowerCase() || activeLeadId;
    const savedToken = (() => {
      try {
        return localStorage.getItem(`alf_client_token_${activeLeadId || targetUsername}`) || '';
      } catch (_) {
        return '';
      }
    })();

    try {
      const res = await fetch('/api/client/minisite-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {})
        },
        body: JSON.stringify({
          leadId: activeLeadId || targetUsername,
          username: targetUsername,
          password: corretorLoginPass.trim() || (isNivaldoSite ? 'Niva@2426' : undefined),
          newPassword: corretorNewPassword.trim() || undefined,
          miniSiteConfig: updatedConfig
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        if (corretorNewPassword.trim()) {
          setCorretorLoginPass(corretorNewPassword.trim());
          setCorretorNewPassword('');
          showToast('✅ Mini Site Oficial e Nova Senha salvos com segurança no Banco de Dados!');
        } else {
          showToast(`✅ Mini Site Oficial de ${updatedConfig.companyName} atualizado em tempo real!`);
        }
      } else {
        showToast(data.error || '⚠️ Não foi possível salvar no servidor. Verifique sua senha.');
      }
    } catch (_) {
      showToast('✅ Alterações aplicadas localmente!');
    } finally {
      setIsSavingCorretorDb(false);
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setIsMiniHeaderScrolled(y > 32);
      setIsMiniPastViewport(y > Math.min(window.innerHeight * 0.35, 220));
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  useEffect(() => {
    if (!miniSiteRootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-hero-reveal',
        { opacity: 0, y: 18, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.gsap-section-card',
        { opacity: 0, y: 26, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out', delay: 0.1 }
      );
      gsap.to('.gsap-logo-pulse', {
        boxShadow: '0 0 28px rgba(14, 165, 233, 0.65)',
        y: -2,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, miniSiteRootRef);
    return () => ctx.revert();
  }, [miniSiteViewTab, config.companyName, config.theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateAndPersist = (patch: Partial<MiniSiteConfig>) => {
    const updated: MiniSiteConfig = { ...config, ...patch };
    setInternalConfig(updated);
    if (onChangeConfig) onChangeConfig(updated);
    if (onSaveConfig) onSaveConfig(updated);
  };

  const handleApplyReadyMockup = (template: ReadyMockupTemplate) => {
    const updated: MiniSiteConfig = {
      ...template.config,
      id: template.id
    };
    setInternalConfig(updated);
    setMiniSiteViewTab('all');
    setQuickCart({});
    setSelectedMenuCategory('Todos');
    if (simulatorScrollRef.current) {
      simulatorScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onChangeConfig) onChangeConfig(updated);
    if (onSaveConfig) onSaveConfig(updated);
    showToast(`✨ Modelo "${template.title}" carregado por completo no Simulador Interativo!`);
    setIsTemplateModalOpen(false);
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/png', 0.9);
          updateAndPersist({ logoUrl: dataUrl });
          showToast('Logotipo enviado e aplicado ao Mini Site!');
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1280;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          updateAndPersist({ coverImageUrl: dataUrl });
          showToast('Foto de Capa (Head) enviada e aplicada com sucesso!');
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePortraitFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetMode: 'active' | 'cloner' = 'active'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 640;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          if (targetMode === 'cloner') {
            setClonePortraitUrl(dataUrl);
            showToast('📸 Foto pessoal carregada no modelo!');
          } else {
            updateAndPersist({ portraitImageUrl: dataUrl });
            showToast('📸 Foto pessoal atualizada com sucesso no Mini Site!');
          }
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClonerLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 360;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/png', 0.92);
          setCloneLogoUrl(dataUrl);
          showToast('🏢 Logo da empresa carregada no modelo!');
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadVCard = () => {
    const isCorretor = Boolean(
      (config.id || '').toLowerCase().includes('corretor') ||
      (config.niche || '').toLowerCase().includes('corretor') ||
      (config.niche || '').toLowerCase().includes('imóve') ||
      (config.niche || '').toLowerCase().includes('imove') ||
      (config.companyName || '').toLowerCase().includes('nivaldo') ||
      (config.companyBrandName || '').toLowerCase().includes('nivaldo')
    );
    const isAlf = Boolean(
      (config.id || '').toLowerCase().includes('alf') ||
      (config.companyName || '').toLowerCase().includes('alf') ||
      (config.founderName || '').toLowerCase().includes('allan')
    );
    const cleanPhone = formatMiniSitePhone(
      config.whatsappNumber || config.phone || (isCorretor ? '5514997047238' : '5514981304973')
    );
    const fullName = isAlf
      ? 'Allan Fassa • ALF Automation'
      : config.companyName || (isCorretor ? 'Nivaldo Furtuozo' : 'Contato');
    const orgName = isAlf
      ? 'ALF Automation • Inteligência Artificial & Hardware NFC'
      : config.companyBrandName || config.niche || (isCorretor ? 'Nivaldo Furtuozo • Corretor de Imóveis' : 'ALF Automation');
    const roleTitle = isAlf
      ? 'Fundador & Diretor de Tecnologia'
      : config.personRole || config.niche || (isCorretor ? 'Corretor de Imóveis' : '');
    const instaLink = config.instagramUrl || (isCorretor
      ? 'https://www.instagram.com/nivaldocorretorimoveis?srtk=MTNqaTF0eHA5MTlqeA=='
      : 'https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==');

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fullName}`,
      `ORG:${orgName}`,
      `TITLE:${roleTitle}`,
      `TEL;TYPE=CELL,VOICE:+${cleanPhone}`,
      `URL:${instaLink}`,
      `NOTE:${(config.tagline || 'Automação Comercial, Placas Google NFC e Mini Sites de Alta Conversão.').replace(/\n/g, ' ')}`,
      'END:VCARD'
    ].join('\r\n');
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(isAlf ? 'allan-fassa-alf-automation' : config.companyName || 'contato').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✅ Contato de Allan Fassa salvo! Abra o arquivo .vcf para adicionar na sua agenda.');
  };

  // Values & Smart Segment Metadata
  const name = config.companyName || 'Sua Empresa';
  const niche = config.niche || 'Atendimento Exclusivo';
  const city = config.city || 'Brasil';
  const initial = (name.trim().charAt(0) || 'A').toUpperCase();
  const smartMeta = getSegmentSmartMetadata(niche, name, city, config.segmentType);

  const primaryColor = (config.primaryColor && config.primaryColor.trim()) || smartMeta.primaryColor;
  const coverImage = (config.coverImageUrl && config.coverImageUrl.trim()) || smartMeta.coverImageUrl;
  const activeFont =
    FONT_FAMILY_OPTIONS.find((f) => f.id === (config.fontFamily || smartMeta.fontFamily)) ||
    FONT_FAMILY_OPTIONS[0];
  const openingHours = (config.openingHours && config.openingHours.trim()) || 'Terça a Domingo: 18h às 23h30';
  const addressText = (config.address && config.address.trim()) || `Av. Principal, 1000 - Centro, ${city}`;
  const aboutText = (config.aboutText && config.aboutText.trim()) || smartMeta.aboutText;
  const amenities =
    Array.isArray(config.amenities) && config.amenities.length > 0
      ? config.amenities
      : smartMeta.amenities;
  const galleryUrls =
    Array.isArray(config.galleryUrls) && config.galleryUrls.length > 0
      ? config.galleryUrls
      : smartMeta.galleryUrls;
  const testimonials =
    Array.isArray(config.testimonials) && config.testimonials.length > 0
      ? config.testimonials
      : smartMeta.testimonials;

  const cleanWaPhone = formatMiniSitePhone(config.whatsappNumber || config.phone || '5514981304973');
  const directWhatsappUrl = `https://wa.me/${cleanWaPhone}`;
  const whatsappUrl =
    cleanWaPhone === '5514981304973'
      ? 'https://wa.me/5514981304973'
      : buildMiniSiteWhatsappUrl(
          config.whatsappNumber || config.phone || '5514981304973',
          config.whatsappMessage || `Olá! Vim através do Mini Site de ${name}. Gostaria de mais informações!`
        );
  const resolvedInstagramUrl =
    config.instagramUrl && config.instagramUrl.trim()
      ? config.instagramUrl
      : 'https://www.instagram.com/alfautomation?xtok=MWY4a3VpcTBrOWI4Yw==';
  const instaHandle = sanitizeMiniSiteHandle(resolvedInstagramUrl, '@');
  const tiktokHandle = sanitizeMiniSiteHandle(config.tiktokUrl || '', '@');
  const pixKey = config.pixKey || '64005076000192';
  const pixBeneficiary = config.pixBeneficiary || name;
  const wifiSsid = config.wifiSsid || `${name.replace(/\s+/g, '_')}_WiFi`;
  const wifiPass = config.wifiPassword || 'VisiteNos123';
  const resolvedLogoUrl = config.logoUrl || ALF_LOGO_DATA_URI;

  const pixQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(pixKey)}`;
  const wifiQrData = `WIFI:T:${config.wifiSecurity || 'WPA'};S:${wifiSsid};P:${wifiPass};;`;
  const wifiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(wifiQrData)}`;

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText + ' ' + city)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(addressText + ' ' + city)}&navigate=yes`;

  // Featured Products & Full Segment Catalog/Menu
  // If client has explicit services (e.g. Wladmir's 2 items), display ONLY those without padding extra items
  const userServices = Array.isArray(config.services) ? config.services : [];
  const defaultServices = getDefaultFourProducts(config.niche, name);
  const rawFeatured =
    userServices.length > 0
      ? userServices.slice(0, 4)
      : defaultServices.slice(0, 4);
  const featuredProducts = rawFeatured.map((p, idx) => ({
    ...p,
    id: p.id || `feat_${idx}`,
    category: p.category || 'Destaques',
    imageUrl:
      p.imageUrl && p.imageUrl.trim().length > 0
        ? p.imageUrl
        : defaultServices[idx % defaultServices.length]?.imageUrl ||
          'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=800&q=85'
  }));
  const additionalServices =
    userServices.length > 0 ? userServices.slice(4) : smartMeta.extraCatalogItems;
  const allCatalogItems = [...featuredProducts, ...additionalServices];
  const catalogCategories = [
    'Todos',
    ...Array.from(
      new Set(allCatalogItems.map((item) => item.category || 'Cardápio / Catálogo'))
    )
  ];
  const filteredCatalogItems =
    selectedMenuCategory === 'Todos'
      ? allCatalogItems
      : allCatalogItems.filter(
          (item) => (item.category || 'Cardápio / Catálogo') === selectedMenuCategory
        );

  const marqueeText =
    config.marqueeText ||
    '🔥 ATENDIMENTO VIP • QUALIDADE 4K COMPROVADA • PEÇA OU AGENDE PELO WHATSAPP • AVALIAÇÃO 5 ESTRELAS NO GOOGLE 🔥';

  // Quick Cart helpers for interactive menu inside Mini Site
  const totalCartItems = Object.values(quickCart).reduce((acc, q) => acc + q, 0);
  const handleAddToQuickCart = (itemId: string, title: string) => {
    setQuickCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    showToast(`+1 "${title}" adicionado ao pedido!`);
  };
  const handleRemoveFromQuickCart = (itemId: string) => {
    setQuickCart((prev) => {
      const next = { ...prev };
      if ((next[itemId] || 0) <= 1) {
        delete next[itemId];
      } else {
        next[itemId] -= 1;
      }
      return next;
    });
  };
  const buildQuickCartWhatsappUrl = () => {
    const lines = Object.entries(quickCart)
      .map(([id, qty]) => {
        const found = allCatalogItems.find((i, idx) => (i.id || `item_${idx}`) === id);
        if (!found) return null;
        return `• ${qty}x *${found.title}* ${found.price ? `(${found.price})` : ''}`;
      })
      .filter(Boolean);
    const msg = `Olá, *${name}*! 👋\nFiz minha seleção pelo *Mini Site / Cardápio Digital*:\n\n${lines.join('\n')}\n\nPoderia confirmar meu pedido/atendimento?`;
    return buildMiniSiteWhatsappUrl(config.whatsappNumber || config.phone || '5511999999999', msg);
  };

  const handleUpdateProduct = (
    index: number,
    patch: Partial<{
      title: string;
      price?: string;
      description?: string;
      imageUrl?: string;
      customWhatsappMsg?: string;
      category?: string;
    }>
  ) => {
    const current = [...featuredProducts];
    current[index] = { ...current[index], ...patch };
    const extraUser = userServices.length > 4 ? userServices.slice(4) : [];
    updateAndPersist({ services: [...current, ...extraUser] });
  };

  const handleAddService = () => {
    if (!newServiceTitle.trim()) {
      showToast('Digite o nome do item do cardápio ou serviço.');
      return;
    }
    const baseList = userServices.length >= 4 ? userServices : featuredProducts;
    const updatedServices = [
      ...baseList,
      {
        id: `srv_${Date.now()}`,
        title: newServiceTitle.trim(),
        price: newServicePrice.trim() || 'Consulte',
        category: newServiceCategory.trim() || 'Especialidades',
        description: newServiceDesc.trim(),
        imageUrl:
          newServiceImg.trim() ||
          'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=800&q=85'
      }
    ];
    updateAndPersist({ services: updatedServices });
    setNewServiceTitle('');
    setNewServicePrice('');
    setNewServiceCategory('');
    setNewServiceDesc('');
    setNewServiceImg('');
    showToast('Item adicionado ao Cardápio / Catálogo do Mini Site!');
  };

  const handleRemoveService = (idx: number) => {
    const baseList = userServices.length >= 4 ? userServices : [...featuredProducts, ...additionalServices];
    const updatedServices = baseList.filter((_, i) => i !== idx);
    updateAndPersist({ services: updatedServices });
  };

  const handleGenerateDefaultServices = () => {
    const presets = getDefaultFourProducts(config.niche, config.companyName || 'Sua Empresa');
    updateAndPersist({ services: presets });
    showToast('4 Destaques do segmento com imagens 4K restaurados!');
  };

  const handleProductImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 600;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          handleUpdateProduct(index, { imageUrl: dataUrl });
          showToast(`Foto em alta definição do destaque ${index + 1} atualizada!`);
        }
      };
      if (typeof ev.target?.result === 'string') {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const shareableUrl = `${getPublicAppOrigin()}/s/${encodeURIComponent(leadId || config.id || 'demo')}`;

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      showToast('Link do Mini Site copiado para a área de transferência!');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (_) {}
  };

  const handlePixClick = async () => {
    const key = config.pixKey || '64005076000192';
    try {
      await navigator.clipboard.writeText(key);
      setCopiedPix(true);
      showToast(`✅ Chave PIX copiada: ${key}`);
      setTimeout(() => setCopiedPix(false), 3000);
    } catch (_) {}
  };

  const handleWifiClick = () => {
    setActiveModal('wifi');
  };

  const handleCopyWifiPass = async () => {
    const pass = config.wifiPassword || 'VisiteNos123';
    try {
      await navigator.clipboard.writeText(pass);
      setCopiedWifi(true);
      showToast('Senha do Wi-Fi copiada!');
      setTimeout(() => setCopiedWifi(false), 2500);
    } catch (_) {}
  };

  const handleCopyHtml = async () => {
    const ok = await copyMiniSiteHtmlToClipboard(config);
    if (ok) {
      setCopiedHtml(true);
      showToast('Código HTML 100% estático copiado!');
      setTimeout(() => setCopiedHtml(false), 2500);
    }
  };

  const handleDownloadHtml = async () => {
    setIsDownloadingHtml(true);
    try {
      await downloadMiniSiteHtml(config);
      showToast('Download do arquivo index.html concluído com sucesso!');
    } catch (e) {
      console.error(e);
      showToast('Erro ao baixar arquivo HTML.');
    } finally {
      setIsDownloadingHtml(false);
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await downloadMiniSiteZip(config);
      showToast('Download do pacote ZIP pronto para hospedagem concluído!');
    } catch (e) {
      console.error(e);
      showToast('Erro ao gerar pacote ZIP.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopyClientMessage = async () => {
    const msg = generateClientShareMessage(config, shareableUrl);
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedMessage(true);
      showToast('Mensagem para WhatsApp do cliente copiada!');
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch (_) {}
  };

  // ============================================================================
  // INNOVATIVE 4K MINI LANDING PAGE RENDERER (Simulator & Standalone Public View)
  // ============================================================================
  const renderPhoneSimulator = (isStandaloneMode = false) => {
    const isFullPage = isStandaloneMode || standalone;
    const isCorretorProfile =
      config.id !== 'modelo_corretor_demo' &&
      (config.id === 'perfil_pessoal_corretor' ||
        (config.id || '').toLowerCase().includes('nivaldo') ||
        (config.id || '').toLowerCase().includes('furtuozo') ||
        (config.companyName || '').toLowerCase().includes('nivaldo') ||
        (config.companyBrandName || '').toLowerCase().includes('nivaldo') ||
        name.toLowerCase().includes('nivaldo'));
    const isRealEstateDemoOrClient =
      isCorretorProfile || config.theme === 'corretor_luxury_gold' || config.id === 'modelo_corretor_demo';
    const isWladmirProfile =
      !isCorretorProfile &&
      ((config.id || '').toLowerCase().includes('wladmir') ||
        (config.companyName || '').toLowerCase().includes('wladmir') ||
        (config.companyName || '').toLowerCase().includes('wm alimento') ||
        name.toLowerCase().includes('wladmir'));
    const isAlfCover =
      !isCorretorProfile &&
      !isWladmirProfile &&
      (coverImage.includes('AISelect_20261019_155240') ||
        coverImage.includes('alf-logo') ||
        (config.id || '').toLowerCase().includes('alf') ||
        name.toLowerCase().includes('alf'));
    const isPersonalProfile =
      isCorretorProfile ||
      isWladmirProfile ||
      config.theme === 'personal_executive' ||
      Boolean(config.personalProfileLayout);

    const displayedBrokerName = isCorretorProfile
      ? cleanCorretorName(corretorNameInput || config.companyName)
      : name;

    const displayedBrokerRole = isCorretorProfile
      ? cleanCorretorRole(corretorCreciInput || config.personRole)
      : isPersonalProfile
      ? (isWladmirProfile
          ? 'Radialista & Locutor Profissional | WM Alimentos'
          : config.personRole || niche)
      : niche;

    const displayedAvatarPhoto = isCorretorProfile
      ? (corretorPhotoInput && !corretorPhotoInput.includes('IMG-20261021') && !corretorPhotoInput.includes('unsplash.com')
          ? corretorPhotoInput
          : config.portraitImageUrl && !config.portraitImageUrl.includes('IMG-20261021') && !config.portraitImageUrl.includes('unsplash.com')
          ? config.portraitImageUrl
          : CORRETOR_PHOTO_URL)
      : isWladmirProfile
      ? config.portraitImageUrl || WLADMIR_PHOTO_URL
      : isAlfCover
      ? attachedFounderPhoto || ALLAN_FASSA_PHOTO_URL
      : isPersonalProfile
      ? config.portraitImageUrl || resolvedLogoUrl
      : resolvedLogoUrl;

    const isMedicalBio =
      !isPersonalProfile &&
      (config.theme === 'clean_medical' ||
        (config.id || '').toLowerCase().includes('medica') ||
        niche.toLowerCase().includes('médic') ||
        niche.toLowerCase().includes('clínica médica'));
    const isBrowBio =
      !isPersonalProfile &&
      (config.theme === 'editorial_brow' ||
        Boolean(config.editorialPricelistLayout) ||
        (config.id || '').toLowerCase().includes('sobrancelha') ||
        niche.toLowerCase().includes('sobrancelh') ||
        niche.toLowerCase().includes('micropigment'));
    const isAestheticsBio =
      !isPersonalProfile &&
      !isBrowBio &&
      (config.theme === 'luxury_aesthetics' ||
        config.theme === 'velvet_skincare' ||
        (config.id || '').toLowerCase().includes('estetica') ||
        niche.toLowerCase().includes('harmoniza') ||
        niche.toLowerCase().includes('estética facial') ||
        niche.toLowerCase().includes('skincare'));
    const isCleanLuxuryBio = isMedicalBio || isAestheticsBio || isBrowBio || isRealEstateDemoOrClient;

    const activePalette = config.nichePalette || (
      isRealEstateDemoOrClient
        ? {
            primary: '#c59b27',
            secondary: '#292524',
            bg: '#faf8f5',
            cardBg: '#ffffff',
            text: '#1c1917',
            accent: '#d4af37',
            badgeText: 'Dourado & Tons Pastéis Neutros'
          }
        : isPersonalProfile
        ? {
            primary: '#e07b28',
            secondary: '#0b0806',
            bg: '#070605',
            cardBg: '#120f0d',
            text: '#f8fafc',
            accent: '#f59e0b',
            badgeText: 'WM Bronze & Executive Black'
          }
        : isMedicalBio
        ? {
            primary: '#0d9488',
            secondary: '#0f292a',
            bg: '#f2f7f7',
            cardBg: '#ffffff',
            text: '#0f292a',
            accent: '#d4af37',
            badgeText: 'Esmeralda Clínico & Marfim'
          }
        : isBrowBio
        ? {
            primary: '#9c6b53',
            secondary: '#2c221e',
            bg: '#eae2d9',
            cardBg: '#f8f5f0',
            text: '#2c221e',
            accent: '#b87b62',
            badgeText: 'Editorial Nude & Espresso'
          }
        : isAestheticsBio
        ? {
            primary: '#d47a92',
            secondary: '#3b1e2e',
            bg: '#faf3eb',
            cardBg: '#ffffff',
            text: '#2e1623',
            accent: '#c59b6d',
            badgeText: 'Velvet Plum & Blush Rose'
          }
        : {
            primary: primaryColor,
            secondary: '#090d16',
            bg: '#04070f',
            cardBg: '#0f172a',
            text: '#f8fafc',
            accent: '#38bdf8',
            badgeText: 'Cyber Blue & Obsidian'
          }
    );

    const rootBgClass = isRealEstateDemoOrClient
      ? 'bg-[#faf8f5] text-[#1c1917]'
      : isMedicalBio
      ? 'bg-[#f2f7f7] text-[#0f292a]'
      : isBrowBio
      ? 'bg-[#eae2d9] text-[#2c221e]'
      : isAestheticsBio
      ? 'bg-[#faf3eb] text-[#2e1623]'
      : 'bg-[#04070f] text-slate-100';

    const cardSurfaceClass = isRealEstateDemoOrClient
      ? 'bg-white border border-[#c59b27]/30 shadow-md shadow-amber-950/5 text-[#1c1917]'
      : isMedicalBio
      ? 'bg-white border border-teal-600/20 shadow-md shadow-teal-950/5 text-[#0f292a]'
      : isBrowBio
      ? 'bg-[#f8f5f0] border border-[#2c221e]/15 shadow-md shadow-[#2c221e]/5 text-[#2c221e]'
      : isAestheticsBio
      ? 'bg-white border border-[#d47a92]/30 shadow-md shadow-[#3b1e2e]/5 text-[#2e1623]'
      : 'bg-slate-900/95 border border-white/10 shadow-lg text-white';

    const subTextClass = isCleanLuxuryBio ? 'text-slate-700' : 'text-slate-300';
    const mutedTextClass = isCleanLuxuryBio ? 'text-slate-500' : 'text-slate-400';

    const heroVideoUrl =
      config.heroVideoUrl ||
      (isMedicalBio
        ? 'https://assets.mixkit.co/videos/preview/mixkit-doctor-working-on-his-laptop-in-his-office-41409-large.mp4'
        : isBrowBio
        ? 'https://assets.mixkit.co/videos/preview/mixkit-woman-having-her-eyebrows-done-41908-large.mp4'
        : isAestheticsBio
        ? 'https://assets.mixkit.co/videos/preview/mixkit-woman-receiving-a-facial-treatment-at-a-spa-41913-large.mp4'
        : '');

    const portraitUrl =
      config.portraitImageUrl ||
      (isMedicalBio
        ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85'
        : isBrowBio
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85'
        : isAestheticsBio
        ? 'https://images.unsplash.com/photo-1512290900672-1f41d243c22b?auto=format&fit=crop&w=900&q=85'
        : '');

    const statsList =
      Array.isArray(config.heroStats) && config.heroStats.length > 0
        ? config.heroStats
        : isMedicalBio
        ? [
            { value: '12+ Anos', label: 'Experiência Médica' },
            { value: '+4.200', label: 'Pacientes Atendidos' },
            { value: 'CRM Ativo', label: 'Especialista' }
          ]
        : isBrowBio
        ? [
            { value: '8+ Anos', label: 'Visagismo do Olhar' },
            { value: '+5.000', label: 'Olhares Transformados' },
            { value: '5.0 ★', label: 'Avaliação Google' }
          ]
        : isAestheticsBio
        ? [
            { value: '10+ Anos', label: 'De Experiência' },
            { value: '+3.500', label: 'Faces Realçadas' },
            { value: '100% VIP', label: 'Protocolos Naturais' }
          ]
        : [];

    return (
      <div
        ref={miniSiteRootRef}
        style={{ fontFamily: activeFont.cssFamily }}
        className={`relative mx-auto w-full ${
          isFullPage
            ? `max-w-md min-h-screen ${rootBgClass} shadow-2xl border-x ${
                isCleanLuxuryBio ? 'border-black/10' : 'border-sky-500/15'
              } pb-28`
            : 'max-w-[420px] bg-slate-950 rounded-[46px] p-2.5 shadow-2xl border-4 border-slate-800 ring-1 ring-white/15 select-none'
        }`}
      >
        {/* Smartphone Dynamic Island Notch */}
        {!isFullPage && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-40 flex items-center justify-center gap-2 shadow-md border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
          </div>
        )}

        {/* Screen Body */}
        <div
          ref={simulatorScrollRef}
          onScroll={(e) => {
            const st = (e.currentTarget as HTMLDivElement).scrollTop;
            setIsMiniHeaderScrolled(st > 32);
            setIsMiniPastViewport(st > 180);
          }}
          className={`relative ${
            isFullPage
              ? 'w-full'
              : isFullSimulatorView
              ? `rounded-[38px] ${rootBgClass} pb-12 overflow-hidden`
              : `rounded-[38px] ${rootBgClass} pb-24 overflow-y-auto max-h-[740px] scrollbar-thin scrollbar-thumb-slate-800`
          }`}
        >
          {isAlfCover ? (
            <AlfAppleMiniSite
              config={config}
              whatsappUrl={whatsappUrl}
              resolvedInstagramUrl={resolvedInstagramUrl}
              mapsSearchUrl={mapsSearchUrl}
              attachedFounderPhoto={attachedFounderPhoto}
              onUploadPhoto={handleFounderPhotoUpload}
              handleDownloadVCard={handleDownloadVCard}
              isFullPage={isFullPage}
            />
          ) : (
            <>
              {/* ================================================================
              STICKY ANIMATED HEADER ON SCROLL (SUBTLE TRANSITION + BACKDROP-BLUR INCREASE)
              Individual client view-only header (no cross-client switcher bar)
             ================================================================ */}
          <div
            className={`sticky top-0 z-30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMiniHeaderScrolled
                ? isCleanLuxuryBio
                  ? `${
                      isMiniPastViewport
                        ? 'bg-white/95 backdrop-blur-2xl backdrop-saturate-150 shadow-xl py-2.5'
                        : 'bg-white/85 backdrop-blur-lg shadow-md py-2'
                    } border-b border-black/10 px-3.5 opacity-100 translate-y-0`
                  : `${
                      isMiniPastViewport
                        ? 'bg-[#03060d]/95 backdrop-blur-2xl backdrop-saturate-150 shadow-2xl shadow-sky-500/15 py-2.5'
                        : 'bg-[#03060d]/85 backdrop-blur-lg shadow-lg shadow-sky-500/10 py-2'
                    } border-b border-sky-500/30 px-3.5 opacity-100 translate-y-0`
                : 'bg-transparent backdrop-blur-none py-0 px-3.5 h-0 overflow-hidden opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-10 h-8 rounded-lg bg-black border overflow-hidden flex items-center justify-center shrink-0 p-0.5 shadow-sm"
                  style={{ borderColor: primaryColor }}
                >
                  <img
                    src={resolvedLogoUrl}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-[11px] font-black truncate block leading-tight ${
                      isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {name}
                  </span>
                  <span
                    style={{ color: primaryColor }}
                    className="text-[9px] font-bold truncate block"
                  >
                    {niche}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: primaryColor }}
                  className="px-2.5 py-1 rounded-lg text-white font-black text-[10px] flex items-center gap-1 shadow-md transition active:scale-95"
                >
                  <Send className="w-2.5 h-2.5" />
                  <span>{isCleanLuxuryBio ? 'Agendar' : 'WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setMiniSiteViewTab('avaliacoes')}
                  className={`px-2 py-1 rounded-lg border font-black text-[10px] flex items-center gap-0.5 cursor-pointer ${
                    isCleanLuxuryBio
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-amber-400/15 border-amber-400/40 text-amber-300'
                  }`}
                >
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span>5.0</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================
              1. HERO HEAD BANNER + IMMERSIVE VIDEO + GSAP PARALLAX
             ================================================================ */}
          <div className="relative w-full h-60 sm:h-64 overflow-hidden bg-black">
            {heroVideoUrl && !isAlfCover ? (
              <video
                key={heroVideoUrl}
                src={heroVideoUrl}
                poster={coverImage}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isMiniHeaderScrolled ? 'scale-110' : 'scale-100'
                }`}
              />
            ) : (
              <img
                src={
                  isRealEstateDemoOrClient
                    ? (config.coverImageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90')
                    : isWladmirProfile && coverImage.includes('unsplash.com')
                    ? WM_ALIMENTOS_LOGO_DATA_URI
                    : coverImage
                }
                alt={`${name} Capa`}
                className={`w-full h-full transition-transform duration-700 ${
                  isRealEstateDemoOrClient
                    ? 'object-cover contrast-105 saturate-105 scale-100 hover:scale-105'
                    : isAlfCover || isWladmirProfile
                    ? 'object-contain bg-black px-3 pt-8 pb-4 scale-100 hover:scale-105'
                    : 'object-cover contrast-105 saturate-105 hover:scale-105'
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = isRealEstateDemoOrClient
                    ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90'
                    : isWladmirProfile
                    ? WM_ALIMENTOS_LOGO_DATA_URI
                    : ALF_LOGO_DATA_URI;
                }}
              />
            )}

            {/* Multi-stop vignette overlay matched to niche color system */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isRealEstateDemoOrClient
                  ? 'bg-gradient-to-b from-[#1c1917]/45 via-transparent to-[#faf8f5]'
                  : isMedicalBio
                  ? 'bg-gradient-to-b from-[#0f292a]/55 via-[#0f292a]/20 to-[#f2f7f7]'
                  : isBrowBio
                  ? 'bg-gradient-to-b from-[#2c221e]/55 via-[#2c221e]/20 to-[#eae2d9]'
                  : isAestheticsBio
                  ? 'bg-gradient-to-b from-[#3b1e2e]/65 via-[#3b1e2e]/30 to-[#faf3eb]'
                  : isPersonalProfile
                  ? 'bg-gradient-to-b from-black/25 via-transparent to-[#04070f]/95'
                  : 'bg-gradient-to-b from-black/40 via-transparent to-[#04070f]'
              }`}
            ></div>

            {/* Top Status & Rating Pills over Hero Cover */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-20">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-extrabold text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 relative"></span>
                <span>
                  {isRealEstateDemoOrClient
                    ? `🏛️ ${config.companyBrandName || 'Imóveis de Alto Padrão'}`
                    : isWladmirProfile
                    ? `👔 ${config.companyBrandName || 'WM Alimentos'} • Perfil Oficial`
                    : isPersonalProfile
                    ? `👔 ${config.companyBrandName || 'Perfil Executivo'}`
                    : isMedicalBio
                    ? '🎬 Vídeo • Clínica Médica'
                    : isBrowBio
                    ? '🎬 Vídeo • Beauty & Brow Studio'
                    : isAestheticsBio
                    ? '🎬 Vídeo • Estética & Skincare'
                    : 'Online • Tecnologia NFC & IA'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMiniSiteViewTab('avaliacoes')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/50 text-[10px] font-black text-amber-300 shadow-lg cursor-pointer hover:scale-105 transition"
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)}</span>
                <span className="text-slate-300 font-semibold">({config.reviewCount || 184})</span>
              </button>
            </div>
          </div>

          {/* ================================================================
              2. PROFILE IDENTITY + NICHE EDITORIAL SHOWCASE CARD
             ================================================================ */}
          <div className="relative z-20 px-4 -mt-10 gsap-hero-reveal">
            <div className="flex items-end gap-3.5">
              {/* Overlapping Avatar/Logo with Brand Color Ring */}
              <div
                className={`gsap-logo-pulse relative ${
                  isPersonalProfile
                    ? 'w-22 h-22 rounded-2xl'
                    : isCleanLuxuryBio
                    ? 'w-20 h-20 rounded-2xl'
                    : 'w-24 h-18 rounded-2xl'
                } bg-black p-1 shadow-2xl shrink-0`}
                style={{
                  boxShadow: `0 10px 25px -5px ${primaryColor}55`,
                  border: `2px solid ${primaryColor}`
                }}
              >
                <div className="w-full h-full rounded-[12px] overflow-hidden bg-black flex items-center justify-center text-white text-xl font-black relative">
                  <img
                    src={displayedAvatarPhoto}
                    alt={displayedBrokerName}
                    className={`w-full h-full ${isPersonalProfile || isAlfCover ? 'object-cover' : 'object-contain'}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = isCorretorProfile
                        ? CORRETOR_PHOTO_URL
                        : isWladmirProfile
                        ? WLADMIR_PHOTO_URL
                        : isAlfCover
                        ? ALLAN_FASSA_PHOTO_URL
                        : ALF_LOGO_DATA_URI;
                    }}
                  />
                </div>
                <div
                  style={{ backgroundColor: primaryColor }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white flex items-center justify-center border-2 border-white shadow-md z-10"
                  title="Verificado"
                >
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
                {isAlfCover && !isFullPage && (
                  <>
                    <button
                      type="button"
                      onClick={() => founderPhotoInputRef.current?.click()}
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center border-2 border-slate-950 shadow-md cursor-pointer transition z-10"
                      title="Anexar ou trocar foto do fundador (Allan Fassa)"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                    <input
                      ref={founderPhotoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFounderPhotoUpload}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Business Title, Niche & Official Brand Pill */}
              <div className="flex-1 min-w-0 pb-0.5 text-left">
                {!isPersonalProfile && (
                  <div className="flex items-center gap-1.5 mb-1">
                    {isAlfCover ? (
                      <span className="px-2.5 py-0.5 rounded-full border border-cyan-400/40 bg-cyan-500/15 text-cyan-300 text-[9px] font-black uppercase tracking-wider">
                        ⚡ Soluções Digitais &amp; Hardware NFC
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: `${activePalette.primary}20`,
                          color: activePalette.primary,
                          borderColor: `${activePalette.primary}45`
                        }}
                        className="px-2 py-0.5 rounded-full border text-[8.5px] font-black uppercase tracking-wider"
                      >
                        🎨 {activePalette.badgeText || 'Paleta Profissional'}
                      </span>
                    )}
                  </div>
                )}
                {isPersonalProfile && (
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg shadow-xs mb-1 ${
                      isRealEstateDemoOrClient
                        ? 'bg-[#f7f2ea] border border-[#d4af37]/60'
                        : 'bg-black/90 border'
                    }`}
                    style={isRealEstateDemoOrClient ? {} : { borderColor: `${primaryColor}80` }}
                  >
                    {isRealEstateDemoOrClient ? (
                      <>
                        <Building2 className="w-3 h-3 text-[#9a7209] shrink-0" />
                        <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#9a7209] truncate">
                          {isCorretorProfile
                            ? 'Corretor de Imóveis'
                            : config.companyBrandName || 'Consultoria Imobiliária'}
                        </span>
                      </>
                    ) : isWladmirProfile ? (
                      <>
                        <img
                          src={WM_ALIMENTOS_LOGO_DATA_URI}
                          alt="WM Alimentos"
                          className="h-4 w-auto object-contain rounded"
                        />
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#e07b28]">
                          WM Alimentos Oficial
                        </span>
                      </>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                        {config.companyBrandName || config.companyName || 'Perfil Profissional'}
                      </span>
                    )}
                  </div>
                )}
                <h1
                  className={`text-lg sm:text-xl font-black leading-tight ${
                    isCleanLuxuryBio ? 'text-slate-900' : 'text-white drop-shadow-sm'
                  }`}
                >
                  {displayedBrokerName}
                </h1>
                {isRealEstateDemoOrClient ? (
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#c59b27]/15 border border-[#c59b27]/45 text-[10px] font-black uppercase tracking-wider text-[#9a7209]">
                      {isCorretorProfile ? 'CRECI 73.286' : 'CRECI 184.520-F'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                      • Imóveis de Alto Padrão
                    </span>
                  </div>
                ) : isAlfCover ? (
                  <div className="flex flex-wrap items-center gap-1 mt-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-cyan-500/30 text-cyan-300">
                      Inteligência Artificial
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-amber-400/30 text-amber-300">
                      Autoridade Google 5★
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-emerald-500/30 text-emerald-300">
                      Gestão de Vendas
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span
                      style={{ color: primaryColor }}
                      className="text-[10.5px] font-black uppercase tracking-wider"
                    >
                      {displayedBrokerRole}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tagline / Frase de Atuação / Promessa de Valor Dividida para ALF Automation */}
            {isAlfCover ? (
              <div className="mt-3.5 rounded-2xl bg-gradient-to-b from-slate-900/95 via-[#09101f] to-slate-950 border border-cyan-500/35 p-3.5 shadow-xl space-y-3 text-left">
                {/* Promessa Principal de Alto Valor */}
                <div className="space-y-1 border-b border-white/10 pb-2.5">
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-black uppercase tracking-wider text-cyan-300">
                    🚀 Nosso Trabalho &amp; Promessa de Resultado
                  </span>
                  <h2 className="text-[13px] sm:text-sm font-black text-white leading-snug">
                    Posicionamos sua empresa no topo do Google com avaliações 5★ e transformamos visitas em vendas diárias no seu WhatsApp.
                  </h2>
                </div>

                {/* Pilares Bem Divididos: O Valor do Google 5★ + Sites/Bio Sites + Cartão NFC */}
                <div className="space-y-2">
                  {/* Pilar 1: O Valor do Google 5 Estrelas */}
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-300 text-xs font-black">
                      5★
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <strong className="text-[11px] font-black text-amber-300 block">
                          Autoridade 5 Estrelas no Google
                        </strong>
                        <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200">
                          Placas Google NFC
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-200 leading-relaxed mt-0.5">
                        Quem domina as avaliações do Google passa confiança imediata e vende mais. Seu cliente aproxima o celular na placa e avalia em <strong>3 segundos</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Pilar 2: Bio Sites & Sites Institucionais */}
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300 text-xs">
                      🌐
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <strong className="text-[11px] font-black text-cyan-300 block">
                          Vitrine Digital de Alta Conversão
                        </strong>
                        <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-200">
                          Bio Site &amp; Site Pro
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-200 leading-relaxed mt-0.5">
                        Apresente seu trabalho, serviços e localização em uma página profissional que leva o cliente pronto para fechar negócio no seu <strong>WhatsApp em 1 clique</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Pilar 3: Cartão de Visita Inteligente NFC */}
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300 text-xs">
                      💳
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <strong className="text-[11px] font-black text-emerald-300 block">
                          Conexão &amp; Contato Salvo na Hora
                        </strong>
                        <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-200">
                          Cartão NFC
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-200 leading-relaxed mt-0.5">
                        Encoste seu Cartão Inteligente NFC no celular do cliente para abrir seu Bio Site instantaneamente e salvar seu contato direto na agenda dele.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : isRealEstateDemoOrClient ? (
              <p className="mt-3 text-xs text-stone-600 font-medium leading-relaxed text-left">
                {config.tagline ||
                  'Assessoria imobiliária especializada em compra, venda e avaliação de residências em condomínio fechado e imóveis de alto padrão.'}
              </p>
            ) : (
              <div className={`mt-3 p-3 rounded-2xl ${
                isPersonalProfile
                  ? 'bg-gradient-to-br from-[#15100c] via-black to-[#0d0906] border border-amber-500/35 shadow-lg text-left'
                  : 'text-left'
              }`}>
                {isPersonalProfile && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                    ✦ Frase de Atuação &amp; Propósito
                  </span>
                )}
                <p className={`text-xs ${isPersonalProfile ? 'text-slate-200 font-medium' : subTextClass} leading-relaxed`}>
                  {isWladmirProfile
                    ? `“${config.tagline || 'WM Alimentos (distribuição de produtos Mellina e outras marcas) • Radialista, locutor profissional e anúncios em rádio.'}”`
                    : isPersonalProfile
                    ? `“${config.tagline || (config.personRole ? `${config.personRole} com atendimento exclusivo e direto no WhatsApp.` : `${niche} com atendimento exclusivo e direto no WhatsApp.`)}”`
                    : (config.tagline || `${niche} de alto padrão em ${city}. Experiência exclusiva e atendimento 1-clique.`)}
                </p>
              </div>
            )}

            {/* Direct 1-Click Action Grid for Personal Profile (WhatsApp, Instagram, Salvar Contato, Solicitar Contato) */}
            {isPersonalProfile && (
              <div className="mt-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[11px] flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Chamar no WhatsApp</span>
                  </a>
                  <a
                    href={resolvedInstagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:brightness-110 text-white font-black text-[11px] flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/20 active:scale-95 transition"
                  >
                    <Radio className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Instagram</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadVCard}
                    className={`py-2.5 px-3 rounded-xl font-black text-[10.5px] flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      isRealEstateDemoOrClient
                        ? 'bg-[#1c1917] hover:bg-stone-800 text-[#f5e6c8] border border-[#c59b27]/50 shadow-sm'
                        : 'bg-white/10 hover:bg-white/15 border border-amber-400/40 text-amber-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Salvar na Agenda</span>
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`py-2.5 px-3 rounded-xl font-black text-[10.5px] flex items-center justify-center gap-1.5 transition ${
                      isRealEstateDemoOrClient
                        ? 'bg-white hover:bg-stone-100 text-[#1c1917] border border-stone-300 shadow-sm'
                        : 'bg-white/10 hover:bg-white/15 border border-white/20 text-white'
                    }`}
                  >
                    <Phone className={`w-3.5 h-3.5 shrink-0 ${isRealEstateDemoOrClient ? 'text-[#9a7209]' : 'text-cyan-400'}`} />
                    <span className="truncate">Solicitar Contato</span>
                  </a>
                </div>
              </div>
            )}

            {/* ==============================================================
                EDITORIAL ARCHED PORTRAIT + STATS SHOWCASE (Inspired by user's 2 reference images!)
               ============================================================== */}
            {isCleanLuxuryBio && !isRealEstateDemoOrClient && portraitUrl && (
              <div
                style={{
                  backgroundColor: isAestheticsBio
                    ? '#3b1e2e'
                    : isBrowBio
                    ? '#dfd5c8'
                    : '#0f292a',
                  borderColor: `${activePalette.primary}45`
                }}
                className={`mt-3.5 p-3.5 rounded-3xl border shadow-xl overflow-hidden relative ${
                  isBrowBio ? 'text-[#2c221e]' : 'text-white'
                }`}
              >
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-7 text-left space-y-2">
                    <span
                      style={{ color: isBrowBio ? '#7c4d36' : '#f4a9b8' }}
                      className="italic font-serif text-sm font-semibold block tracking-wide"
                    >
                      {config.calligraphyTitle ||
                        (isBrowBio
                          ? 'Beauty Studio & Pricelist'
                          : isAestheticsBio
                          ? 'Beauty & Natural Skincare'
                          : 'Medicina & Longevidade')}
                    </span>
                    <h3
                      className={`text-sm font-black uppercase tracking-wider leading-snug ${
                        isBrowBio ? 'text-[#2c221e]' : 'text-white'
                      }`}
                    >
                      {isBrowBio
                        ? 'Arquitetura do Olhar & Sobrancelhas'
                        : isAestheticsBio
                        ? 'Harmonização & Skincare de Luxo'
                        : 'Diagnóstico & Cuidado Médico Integral'}
                    </h3>
                    <p
                      className={`text-[10.5px] leading-relaxed ${
                        isBrowBio ? 'text-[#4a3b34]' : 'text-white/80'
                      }`}
                    >
                      {isBrowBio
                        ? 'Técnicas exclusivas de Nanoblading, Brow Lamination e Lash Design com resultado natural.'
                        : isAestheticsBio
                        ? 'Protocolos faciais personalizados que realçam sua beleza com elegância e naturalidade.'
                        : 'Consultas detalhadas, check-up metabólico e acompanhamento médico individualizado.'}
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: isBrowBio
                          ? '#2c221e'
                          : isAestheticsBio
                          ? '#f4a9b8'
                          : '#2dd4bf',
                        color: isBrowBio ? '#f8f5f0' : '#1f1219'
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10.5px] font-black shadow-md hover:scale-105 transition"
                    >
                      <span>Agendar Agora</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Arched / Circular Portrait Frame (matching the 2 reference images) */}
                  <div className="col-span-5 flex justify-center">
                    <div
                      style={{ borderColor: activePalette.accent }}
                      className={`w-28 h-34 overflow-hidden border-2 shadow-xl ${
                        isAestheticsBio
                          ? 'rounded-full w-28 h-28'
                          : 'rounded-t-[60px] rounded-b-[22px]'
                      }`}
                    >
                      <img
                        src={portraitUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Luxury 3-Column Stats Bar (matching Reference Image 2: "10+ Years of Experience | +3.500 | 100%") */}
                {statsList.length > 0 && (
                  <div
                    className={`mt-3 pt-2.5 border-t grid grid-cols-3 gap-2 text-center ${
                      isBrowBio ? 'border-[#2c221e]/15' : 'border-white/15'
                    }`}
                  >
                    {statsList.map((st, idx) => (
                      <div key={idx} className="px-1">
                        <div
                          className={`text-xs font-black ${
                            isBrowBio ? 'text-[#2c221e]' : 'text-white'
                          }`}
                        >
                          {st.value}
                        </div>
                        <div
                          className={`text-[9px] font-medium ${
                            isBrowBio ? 'text-[#5c4940]' : 'text-white/75'
                          }`}
                        >
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}



            {/* HORÁRIO DE ATENDIMENTO DESTACADO NO HEAD + BOTÃO LOCALIZAÇÃO */}
            <div className={`mt-3 p-2.5 rounded-2xl ${cardSurfaceClass} flex items-center justify-between gap-2 text-left`}>
              <div className="flex items-center gap-2 min-w-0">
                <div
                  style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span
                    style={{ color: primaryColor }}
                    className="text-[9px] uppercase font-black tracking-wider block"
                  >
                    🕒 Horário de Atendimento
                  </span>
                  <span
                    className={`text-[11px] font-bold truncate block ${
                      isCleanLuxuryBio ? 'text-slate-800' : 'text-white'
                    }`}
                  >
                    {openingHours}
                  </span>
                </div>
              </div>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: `${primaryColor}18`, color: primaryColor, borderColor: `${primaryColor}45` }}
                className="px-2.5 py-1.5 rounded-xl border text-[10px] font-black shrink-0 flex items-center gap-1 cursor-pointer hover:brightness-110 transition"
              >
                <MapPin className="w-3 h-3" />
                <span>Localização</span>
              </a>
            </div>
          </div>

          {/* ================================================================
              3. FRASE DE DESTAQUE PASSANDO (DYNAMIC MARQUEE BANNER)
             ================================================================ */}
          <div className="px-4 mt-3">
            <div
              style={{
                background: isCleanLuxuryBio
                  ? `linear-gradient(90deg, ${activePalette.secondary}, ${activePalette.primary}, ${activePalette.secondary})`
                  : `linear-gradient(90deg, ${primaryColor}, #fbbf24, ${primaryColor})`
              }}
              className={`w-full overflow-hidden ${
                isCleanLuxuryBio ? 'text-white' : 'text-slate-950'
              } font-black text-[10px] py-1.5 px-2 rounded-xl shadow-sm uppercase tracking-wider`}
            >
              <div className="whitespace-nowrap animate-marquee flex items-center gap-6">
                <span>{marqueeText}</span>
                <span>•</span>
                <span>{marqueeText}</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              4. NAVEGAÇÃO INTELIGENTE DA MINI PÁGINA (TABS INTERATIVAS)
             ================================================================ */}
          <div className="px-4 mt-3">
            <div
              className={`grid grid-cols-4 gap-1 p-1 rounded-2xl border ${
                isCleanLuxuryBio
                  ? 'bg-white/90 border-black/10 shadow-xs'
                  : 'bg-slate-900/95 border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('all')}
                style={
                  miniSiteViewTab === 'all'
                    ? { backgroundColor: primaryColor, color: isCleanLuxuryBio ? '#ffffff' : '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'all'
                    ? 'shadow-sm'
                    : isCleanLuxuryBio
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ✨ Início
              </button>
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('catalogo')}
                style={
                  miniSiteViewTab === 'catalogo'
                    ? { backgroundColor: primaryColor, color: isCleanLuxuryBio ? '#ffffff' : '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'catalogo'
                    ? 'shadow-sm'
                    : isCleanLuxuryBio
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isCleanLuxuryBio
                  ? '✨ Serviços'
                  : smartMeta.segment === 'gastronomia'
                  ? '🍽️ Cardápio'
                  : '📋 Catálogo'}
              </button>
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('como_chegar')}
                style={
                  miniSiteViewTab === 'como_chegar'
                    ? { backgroundColor: primaryColor, color: isCleanLuxuryBio ? '#ffffff' : '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'como_chegar'
                    ? 'shadow-sm'
                    : isCleanLuxuryBio
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📍 Local
              </button>
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('avaliacoes')}
                style={
                  miniSiteViewTab === 'avaliacoes'
                    ? { backgroundColor: primaryColor, color: isCleanLuxuryBio ? '#ffffff' : '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'avaliacoes'
                    ? 'shadow-sm'
                    : isCleanLuxuryBio
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ⭐ Google
              </button>
            </div>
          </div>

          {/* ================================================================
              MAIN CONTENT SECTIONS OF THE MINI PAGE
             ================================================================ */}
          <div className="px-4 mt-4 space-y-4">
            {/* --------------------------------------------------------------
                SEGUNDA DOBRA DO MINI SITE ALF AUTOMATION:
                Botões 1-Clique (WhatsApp, Instagram, Localização) +
                Avaliações do Google (2 Provas Sociais de Mini Site + 1 da Placa c/ Fotos)
               -------------------------------------------------------------- */}
            {isAlfCover && miniSiteViewTab === 'all' && (
              <>
                <div className="gsap-section-card space-y-2.5">
                  {/* 1. WhatsApp Oficial • ALF Automation */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer group bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/50 hover:border-emerald-400 shadow-lg shadow-emerald-950/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 rounded-xl bg-black border-2 border-emerald-400 flex items-center justify-center overflow-hidden shrink-0 p-0.5 shadow-sm">
                        <img
                          src={resolvedLogoUrl}
                          alt={name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = ALF_LOGO_DATA_URI;
                          }}
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center border border-black">
                          <Send className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      <div className="text-left min-w-0">
                        <span className="text-xs font-black block truncate text-white">
                          WhatsApp Oficial • ALF Automation
                        </span>
                        <p className="text-[10px] font-medium truncate text-emerald-300">
                          Toque aqui para iniciar atendimento imediato
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center gap-1 shrink-0 group-hover:scale-105 transition shadow-xs">
                      <span>Chamar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>

                  {/* 2. Instagram Oficial */}
                  <a
                    href={resolvedInstagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer group bg-gradient-to-r from-pink-950/40 via-slate-900 to-purple-950/40 border border-pink-500/40 hover:border-pink-400/80 shadow-md"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
                        <Radio className="w-5 h-5" />
                      </div>
                      <div className="text-left min-w-0">
                        <span className="text-xs font-black block truncate text-white">
                          Instagram Oficial
                        </span>
                        <p className="text-[10px] text-slate-400 truncate">
                          Projetos reais, automações, placas NFC e resultados
                        </p>
                      </div>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl font-black text-[10px] flex items-center gap-1 shrink-0 group-hover:scale-105 transition bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      <span>Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>

                  {/* 3. Localização & Como Chegar */}
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer group bg-gradient-to-r from-rose-950/35 via-slate-900 to-slate-900 border border-rose-500/35 hover:border-rose-400 shadow-md"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#e11d48] flex items-center justify-center text-white shadow-md shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="text-left min-w-0">
                        <span className="text-xs font-black block truncate text-white">
                          Localização &amp; Como Chegar
                        </span>
                        <p className="text-[10px] text-slate-400 truncate">
                          {addressText}
                        </p>
                      </div>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl font-black text-[10px] flex items-center gap-1 shrink-0 group-hover:scale-105 transition bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      <span>Mapa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </div>

                {/* 4. Avaliações do Google na Segunda Dobra (2 de Mini Site + 1 da Placa c/ Fotos) */}
                <div className="p-4 rounded-2xl border-2 border-amber-400/45 shadow-xl text-left space-y-3 bg-gradient-to-br from-slate-900 via-blue-950/35 to-amber-950/25">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                      <div>
                        <span className="text-xs font-black block text-white">
                          Avaliações do Google
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-sm font-black text-amber-500">
                            {(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)}
                          </span>
                          <span className="text-amber-400 text-xs tracking-tighter">★★★★★</span>
                          <span className="text-[10px] font-bold text-slate-400">
                            ({config.reviewCount || 184} avaliações)
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40">
                      Verificado
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {testimonials.slice(0, 3).map((rev, idx) => (
                      <div
                        key={rev.id || idx}
                        className="p-3 rounded-xl border bg-slate-950/85 border-white/10 space-y-1.5"
                      >
                        {rev.impactBadge && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-[9px] font-black text-cyan-300">
                            <span>{rev.impactBadge}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {rev.avatarUrl ? (
                              <img
                                src={rev.avatarUrl}
                                alt={rev.author}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full object-cover border border-amber-400/50 shrink-0"
                              />
                            ) : (
                              <div
                                style={{ backgroundColor: idx === 0 ? primaryColor : '#38bdf8' }}
                                className="w-8 h-8 rounded-full text-white font-black text-[11px] flex items-center justify-center shrink-0"
                              >
                                {rev.author.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <strong className="text-[11px] font-bold block leading-none text-white truncate">
                                {rev.author}
                              </strong>
                              <span className="text-[9px] text-slate-400 block truncate mt-0.5">
                                {rev.role || 'Cliente Verificado • Google'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-amber-400 text-[10px] block">★★★★★</span>
                            <span className="text-[8px] text-slate-400">{rev.timeAgo || 'há 2 dias'}</span>
                          </div>
                        </div>
                        <p className="text-[10.5px] text-slate-300 leading-snug italic">
                          &ldquo;{rev.text}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Quero Ter Esse Resultado no Meu Negócio</span>
                  </a>
                </div>
              </>
            )}
            {/* --------------------------------------------------------------
                SECTION A: 4 SERVIÇOS / PROCEDIMENTOS DE DESTAQUE
                Supports both Editorial Horizontal Pricelist (Reference Image 1)
                and 2x2 Luxury Cards (Reference Image 2 / Medical / ALF)
               -------------------------------------------------------------- */}
            {(miniSiteViewTab === 'all' || (isCleanLuxuryBio && miniSiteViewTab === 'catalogo')) && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: isBrowBio ? '#2c221e' : primaryColor }}
                    className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {isRealEstateDemoOrClient
                        ? '4 Imóveis de Alto Padrão em Destaque'
                        : isMedicalBio
                        ? 'Especialidades & Serviços Médicos'
                        : isBrowBio
                        ? 'Services & Pricelist • 4 Procedimentos'
                        : isAestheticsBio
                        ? 'Procedimentos Faciais & Skincare'
                        : smartMeta.featuredTitle}
                    </span>
                  </span>
                  {!isCleanLuxuryBio && !isPersonalProfile && allCatalogItems.length > featuredProducts.length && (
                    <button
                      type="button"
                      onClick={() => setMiniSiteViewTab('catalogo')}
                      className="text-[10px] font-bold text-slate-300 hover:text-white underline cursor-pointer"
                    >
                      Ver tudo ({allCatalogItems.length}) ➔
                    </button>
                  )}
                </div>

                {isBrowBio || config.editorialPricelistLayout ? (
                  /* HORIZONTAL EDITORIAL PRICELIST CARDS (Inspired by Reference Image 1 "SERVICES Pricelist") */
                  <div className="space-y-2.5">
                    {featuredProducts.slice(0, 4).map((p, idx) => {
                      const pWaMsg =
                        p.customWhatsappMsg ||
                        `Olá! Vi no Bio Site de ${name} o procedimento "${p.title}" e gostaria de agendar!`;
                      const pWaUrl = buildMiniSiteWhatsappUrl(
                        config.whatsappNumber || config.phone || '5514981304973',
                        pWaMsg
                      );
                      const itemId = p.id || `feat_${idx}`;
                      return (
                        <div
                          key={itemId}
                          className="bg-[#f8f5f0] border border-[#2c221e]/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex items-stretch justify-between group"
                        >
                          <div className="p-3 flex-1 flex flex-col justify-between text-left min-w-0">
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9c6b53] block">
                                {p.category || 'Procedimento Exclusivo'}
                              </span>
                              <h4 className="text-xs font-black text-[#2c221e] uppercase tracking-wide mt-0.5 leading-snug">
                                {p.title}
                              </h4>
                              <p className="text-[10px] text-[#5c4940] line-clamp-2 mt-1 leading-relaxed">
                                {p.description}
                              </p>
                            </div>
                            <div className="mt-2.5">
                              <a
                                href={pWaUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#2c221e]/40 bg-white hover:bg-[#2c221e] text-[#2c221e] hover:text-white text-[9.5px] font-black uppercase tracking-wider transition"
                              >
                                <Send className="w-2.5 h-2.5" />
                                <span>Agendar Horário</span>
                              </a>
                            </div>
                          </div>

                          <div className="relative w-28 sm:w-32 shrink-0 bg-[#2c221e] overflow-hidden">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-2 right-2 bg-[#f8f5f0]/95 backdrop-blur-xs px-2 py-1 rounded-md border border-[#2c221e]/20 shadow-md">
                              <span className="text-[10.5px] font-black text-[#2c221e] font-serif">
                                {p.price || 'Consulte'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* LUXURY GRID CARDS */
                  <div className="grid grid-cols-2 gap-2.5">
                    {featuredProducts.slice(0, 4).map((p, idx) => {
                      const pWaMsg =
                        p.customWhatsappMsg ||
                        `Olá! Vi no Bio Site de ${name} o serviço "${p.title}" e gostaria de saber mais!`;
                      const pWaUrl = buildMiniSiteWhatsappUrl(
                        config.whatsappNumber || config.phone || '5514981304973',
                        pWaMsg
                      );
                      const itemId = p.id || `feat_${idx}`;
                      const inCartQty = quickCart[itemId] || 0;
                      const isLogoCard =
                        (p.imageUrl || '').includes('IMG-20261019-WA0097') ||
                        (p.imageUrl || '').includes('AISelect_20261021');

                      return (
                        <div
                          key={itemId}
                          className={`${cardSurfaceClass} rounded-2xl overflow-hidden flex flex-col justify-between transition-all group`}
                        >
                          <div className="relative w-full h-28 bg-black overflow-hidden shrink-0">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className={`w-full h-full ${
                                isLogoCard ? 'object-contain p-2 bg-black' : 'object-cover'
                              } group-hover:scale-105 transition-transform duration-500`}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                            <span
                              style={{
                                backgroundColor: isCleanLuxuryBio ? '#ffffffec' : '#090d16e6',
                                color: primaryColor,
                                borderColor: `${primaryColor}55`
                              }}
                              className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[9px] font-black border shadow-sm"
                            >
                              {p.price || 'Destaque'}
                            </span>
                          </div>

                          <div className="p-2.5 flex flex-col flex-1 justify-between gap-2 text-left">
                            <div>
                              <h4
                                className={`text-xs font-black leading-snug ${
                                  isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                                }`}
                              >
                                {p.title}
                              </h4>
                              <p className={`text-[10.5px] ${mutedTextClass} mt-1 leading-snug`}>
                                {p.description || 'Atendimento personalizado pelo WhatsApp.'}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={pWaUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  backgroundColor: isAestheticsBio ? '#3b1e2e' : primaryColor,
                                  color: isCleanLuxuryBio ? '#ffffff' : '#090d16'
                                }}
                                className="flex-1 py-1.5 px-2 font-black text-[10px] rounded-xl flex items-center justify-center gap-1 shadow-sm hover:brightness-110 active:scale-95 transition-all"
                              >
                                <Send className="w-2.5 h-2.5" />
                                <span className="truncate">
                                  {isRealEstateDemoOrClient
                                    ? 'Agendar Visita'
                                    : isCleanLuxuryBio
                                    ? 'Agendar'
                                    : isPersonalProfile
                                    ? 'Falar no WhatsApp'
                                    : smartMeta.ctaLabel}
                                </span>
                              </a>
                              {!isCleanLuxuryBio && !isPersonalProfile && (
                                <button
                                  type="button"
                                  onClick={() => handleAddToQuickCart(itemId, p.title)}
                                  title="Adicionar à sacola rápida do WhatsApp"
                                  className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs flex items-center justify-center shrink-0 cursor-pointer transition relative"
                                >
                                  +
                                  {inCartQty > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                                      {inCartQty}
                                    </span>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* --------------------------------------------------------------
                SECTION B: CARDÁPIO DIGITAL / CATÁLOGO INTERATIVO DO SEGMENTO
               -------------------------------------------------------------- */}
            {!isCleanLuxuryBio &&
              !isAlfCover &&
              (miniSiteViewTab === 'catalogo' ||
                (miniSiteViewTab === 'all' && (config.showInteractiveMenu ?? true))) && (
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 text-left shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      <span>{smartMeta.menuTabLabel} Completo</span>
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Toque em + para montar seu pedido ou chame direto no WhatsApp
                    </p>
                  </div>
                  <span
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    className="text-[9px] font-black px-2 py-0.5 rounded-full shrink-0"
                  >
                    {allCatalogItems.length} itens
                  </span>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {catalogCategories.map((cat) => {
                    const active = selectedMenuCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedMenuCategory(cat)}
                        style={
                          active
                            ? { backgroundColor: primaryColor, color: '#090d16' }
                            : undefined
                        }
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-black whitespace-nowrap transition cursor-pointer ${
                          active
                            ? 'shadow-xs'
                            : 'bg-slate-950/80 text-slate-400 border border-white/10 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Menu / Service Items List */}
                <div className="space-y-2">
                  {filteredCatalogItems.map((item, idx) => {
                    const itemId = item.id || `cat_item_${idx}`;
                    const qty = quickCart[itemId] || 0;
                    const itemWaUrl = buildMiniSiteWhatsappUrl(
                      config.whatsappNumber || config.phone || '5511999999999',
                      `Olá! Vi no ${smartMeta.menuTabLabel} de ${name} o item "${item.title}"${
                        item.price ? ` (${item.price})` : ''
                      } e quero pedir/agendar!`
                    );

                    return (
                      <div
                        key={itemId}
                        className="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 flex items-center gap-2.5 hover:border-white/20 transition"
                      >
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h5 className="text-xs font-black text-white truncate">{item.title}</h5>
                            {item.price && (
                              <span
                                style={{ color: primaryColor }}
                                className="text-[10px] font-black shrink-0"
                              >
                                {item.price}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-1.5 gap-2">
                            <a
                              href={itemWaUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <Send className="w-2.5 h-2.5" />
                              <span>Pedir 1-Clique</span>
                            </a>

                            <div className="flex items-center gap-1.5">
                              {qty > 0 && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFromQuickCart(itemId)}
                                    className="w-5 h-5 rounded-lg bg-slate-800 text-white text-xs font-black flex items-center justify-center cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-[10px] font-black text-white w-3 text-center">
                                    {qty}
                                  </span>
                                </>
                              )}
                              <button
                                type="button"
                                onClick={() => handleAddToQuickCart(itemId, item.title)}
                                style={{ backgroundColor: primaryColor, color: '#090d16' }}
                                className="px-2 py-0.5 rounded-lg text-[10px] font-black cursor-pointer hover:brightness-110 transition"
                              >
                                + Incluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                SECTION C: O QUE A CLÍNICA / EMPRESA FAZ
               -------------------------------------------------------------- */}
            {miniSiteViewTab === 'all' && !isAlfCover && (
              <div
                className={`gsap-section-card p-4 rounded-2xl space-y-3 text-left ${
                  isCleanLuxuryBio
                    ? cardSurfaceClass
                    : 'bg-gradient-to-br from-slate-900/95 via-slate-900 to-sky-950/30 border border-sky-500/30 shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-black flex items-center gap-1.5 ${
                      isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    <Award className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
                    <span>
                      {isMedicalBio
                        ? 'Sobre a Médica & O Que a Clínica Faz'
                        : isAestheticsBio
                        ? 'Sobre a Clínica & Nossa Filosofia de Beleza'
                        : `Sobre ${name} & Diferenciais`}
                    </span>
                  </span>
                  <span
                    style={{ color: primaryColor }}
                    className="text-[9px] font-black uppercase tracking-wider"
                  >
                    {isCleanLuxuryBio ? 'Atendimento Premium' : 'Experiência Comprovada'}
                  </span>
                </div>

                <p className={`text-[11px] ${subTextClass} leading-relaxed`}>{aboutText}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${
                        isCleanLuxuryBio
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-950/90 border-white/10 text-slate-200'
                      }`}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                SECTION D: ACESSO RÁPIDO 1-CLIQUE (WHATSAPP, INSTAGRAM, LOCALIZAÇÃO & PIX)
                Sem links ou números soltos escritos — basta clicar e já abre!
               -------------------------------------------------------------- */}
            {miniSiteViewTab === 'all' && !isAlfCover && (
              <div className="gsap-section-card space-y-2.5">
                {/* 1. WhatsApp 1-Clique (Sem exibir link wa.me escrito) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer group ${
                    isCleanLuxuryBio
                      ? 'bg-white border-2 border-emerald-500/40 hover:border-emerald-500 shadow-md'
                      : 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/50 hover:border-emerald-400 shadow-lg shadow-emerald-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-xl bg-black border-2 border-emerald-400 flex items-center justify-center overflow-hidden shrink-0 p-0.5 shadow-sm">
                      <img
                        src={resolvedLogoUrl}
                        alt={name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = ALF_LOGO_DATA_URI;
                        }}
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center border border-black">
                        <Send className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <div className="text-left min-w-0">
                      <span
                        className={`text-xs font-black block truncate ${
                          isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {isMedicalBio
                          ? 'Agendar Consulta pelo WhatsApp'
                          : isAestheticsBio
                          ? 'Agendar Avaliação pelo WhatsApp'
                          : `WhatsApp Oficial • ${name}`}
                      </span>
                      <p
                        className={`text-[10px] font-medium truncate ${
                          isCleanLuxuryBio ? 'text-emerald-700' : 'text-emerald-300'
                        }`}
                      >
                        Toque aqui para iniciar atendimento imediato
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center gap-1 shrink-0 group-hover:scale-105 transition shadow-xs">
                    <span>{isCleanLuxuryBio ? 'Agendar' : 'Chamar'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* 2. Instagram 1-Clique (Sem exibir link escrito) */}
                <a
                  href={resolvedInstagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer group ${
                    isCleanLuxuryBio
                      ? 'bg-white border border-pink-500/30 hover:border-pink-500 shadow-md'
                      : 'bg-gradient-to-r from-pink-950/40 via-slate-900 to-purple-950/40 border border-pink-500/40 hover:border-pink-400/80 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div className="text-left min-w-0">
                      <span
                        className={`text-xs font-black block truncate ${
                          isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        Instagram Oficial
                      </span>
                      <p className={`text-[10px] ${mutedTextClass} truncate`}>
                        {isMedicalBio
                          ? 'Conteúdos de saúde, medicina preventiva e rotina clínica'
                          : isAestheticsBio
                          ? 'Resultados reais, harmonização facial e protocolos'
                          : 'Projetos reais, automações, placas NFC e resultados'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-2.5 py-1.5 rounded-xl font-black text-[10px] flex items-center gap-1 shrink-0 group-hover:scale-105 transition ${
                      isCleanLuxuryBio
                        ? 'bg-pink-50 text-pink-700 border border-pink-200'
                        : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    }`}
                  >
                    <span>Abrir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* 3. Localização & Como Chegar 1-Clique (Clica e já vai direto para o Google Maps) */}
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer group ${
                    isCleanLuxuryBio
                      ? 'bg-white border border-slate-200 hover:border-teal-500 shadow-md'
                      : 'bg-gradient-to-r from-rose-950/35 via-slate-900 to-slate-900 border border-rose-500/35 hover:border-rose-400 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      style={{ backgroundColor: isCleanLuxuryBio ? primaryColor : '#e11d48' }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-left min-w-0">
                      <span
                        className={`text-xs font-black block truncate ${
                          isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        Localização &amp; Como Chegar
                      </span>
                      <p className={`text-[10px] ${mutedTextClass} truncate`}>
                        {addressText}
                      </p>
                    </div>
                  </div>
                  <div
                    style={
                      isCleanLuxuryBio
                        ? { backgroundColor: `${primaryColor}15`, color: primaryColor }
                        : undefined
                    }
                    className={`px-2.5 py-1.5 rounded-xl font-black text-[10px] flex items-center gap-1 shrink-0 group-hover:scale-105 transition ${
                      isCleanLuxuryBio
                        ? ''
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    <span>Mapa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* 4. PIX (Exibido apenas quando houver chave configurada e não for perfil pessoal) */}
                {!isPersonalProfile && config.pixKey && config.pixKey.trim() !== '' && (
                  <div
                    className={`p-3.5 rounded-2xl shadow-md text-left space-y-2.5 ${
                      isCleanLuxuryBio
                        ? 'bg-white border border-teal-500/30'
                        : 'bg-teal-950/30 border border-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
                          <Zap className="w-4 h-4 fill-white" />
                        </div>
                        <div>
                          <span
                            className={`text-xs font-black block ${
                              isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            Pagamento via PIX (CNPJ)
                          </span>
                          <span
                            className={`text-[10px] font-semibold ${
                              isCleanLuxuryBio ? 'text-teal-700' : 'text-teal-300'
                            }`}
                          >
                            Chave CNPJ: {pixKey}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-400">
                        Copiar 1-Toque
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handlePixClick}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 shadow-md"
                    >
                      {copiedPix ? (
                        <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>
                        {copiedPix
                          ? `✅ Chave PIX Copiada (${pixKey})!`
                          : `Copiar Chave PIX (CNPJ: ${pixKey})`}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* --------------------------------------------------------------
                SECTION E: TELA DETALHADA "COMO CHEGAR" (Aba Local)
               -------------------------------------------------------------- */}
            {miniSiteViewTab === 'como_chegar' && (
              <div className={`p-3.5 rounded-2xl ${cardSurfaceClass} text-left space-y-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-500 flex items-center justify-center">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-black block ${isCleanLuxuryBio ? 'text-slate-900' : 'text-white'}`}>
                        Como Chegar &amp; Localização
                      </span>
                      <span className="text-[10px] text-rose-500 font-semibold">
                        Navegação GPS com 1 Toque
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30">
                    Maps &amp; Waze
                  </span>
                </div>

                <div className="relative h-28 rounded-xl overflow-hidden border border-slate-700/20 bg-slate-900 flex flex-col items-center justify-center p-3 text-center">
                  <div className="relative z-10 w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/50 animate-bounce mb-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <strong className="relative z-10 text-xs font-black text-white line-clamp-1">
                    {name}
                  </strong>
                  <span className="relative z-10 text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                    {addressText}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Abrir Google Maps</span>
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Ir de Waze</span>
                  </a>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                SECTION F: AVALIAÇÃO DO GOOGLE 5 ESTRELAS + DEPOIMENTOS
               -------------------------------------------------------------- */}
            {((miniSiteViewTab === 'all' && !isAlfCover) || miniSiteViewTab === 'avaliacoes') && (
              <div
                className={`p-4 rounded-2xl border-2 border-amber-400/45 shadow-xl text-left space-y-3 ${
                  isCleanLuxuryBio
                    ? 'bg-white'
                    : 'bg-gradient-to-br from-slate-900 via-blue-950/35 to-amber-950/25'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                    <div>
                      <span
                        className={`text-xs font-black block ${
                          isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        Avaliações do Google
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-sm font-black text-amber-500">
                          {(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)}
                        </span>
                        <span className="text-amber-400 text-xs tracking-tighter">★★★★★</span>
                        <span className={`text-[10px] font-bold ${mutedTextClass}`}>
                          ({config.reviewCount || 128} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 border border-amber-400/40">
                    Verificado
                  </span>
                </div>

                <div className="space-y-2">
                  {testimonials.slice(0, isAlfCover ? 3 : 2).map((rev, idx) => (
                    <div
                      key={rev.id || idx}
                      className={`p-2.5 rounded-xl border space-y-1.5 ${
                        isCleanLuxuryBio
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-slate-950/85 border-white/10'
                      }`}
                    >
                      {rev.impactBadge && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-[9px] font-black text-cyan-400">
                          <span>{rev.impactBadge}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {rev.avatarUrl ? (
                            <img
                              src={rev.avatarUrl}
                              alt={rev.author}
                              referrerPolicy="no-referrer"
                              className="w-7 h-7 rounded-full object-cover border border-amber-400/50 shrink-0"
                            />
                          ) : (
                            <div
                              style={{ backgroundColor: idx === 0 ? primaryColor : '#38bdf8' }}
                              className="w-6 h-6 rounded-full text-white font-black text-[10px] flex items-center justify-center shrink-0"
                            >
                              {rev.author.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <strong
                              className={`text-[11px] font-bold block leading-none truncate ${
                                isCleanLuxuryBio ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              {rev.author}
                            </strong>
                            <span className={`text-[9px] ${mutedTextClass} block truncate mt-0.5`}>
                              {rev.role || 'Local Guide • Google'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-amber-400 text-[10px] block">★★★★★</span>
                          <span className="text-[8px] text-slate-400">{rev.timeAgo || 'há 2 dias'}</span>
                        </div>
                      </div>
                      <p className={`text-[10.5px] ${subTextClass} leading-snug italic`}>
                        &ldquo;{rev.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={config.googleReviewUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Avaliar no Google Agora (1-Clique)</span>
                </a>
              </div>
            )}
          </div>

          {/* Floating Quick Cart Bar inside Mini Site if visitor selected items */}
          {totalCartItems > 0 && (
            <div className="sticky bottom-3 left-3 right-3 px-3 mt-4 z-30">
              <a
                href={buildQuickCartWhatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-2xl flex items-center justify-between border border-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-950 text-emerald-400 flex items-center justify-center text-[11px] font-black">
                    {totalCartItems}
                  </span>
                  <span>Enviar Pedido pelo WhatsApp</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 text-center space-y-2 px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                <Radio className="w-2.5 h-2.5" style={{ color: primaryColor }} />
                Mini Página Inteligente • NFC Hub
              </span>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer transition font-medium"
              >
                Políticas de Privacidade
              </button>
              {isFullPage && !String(config.id || '').startsWith('modelo_') && (
                <button
                  type="button"
                  onClick={() => {
                    if (!corretorLoginUser && (leadId || config.id)) {
                      setCorretorLoginUser(isCorretorProfile ? 'Furtuozocorretor' : String(leadId || config.id));
                    }
                    setIsCorretorCustomizeModalOpen(true);
                  }}
                  className="text-[10px] text-amber-500/80 hover:text-amber-400 underline cursor-pointer transition font-semibold flex items-center gap-1"
                >
                  <Lock className="w-2.5 h-2.5" />
                  <span>{isCorretorProfile ? 'Área do Corretor' : 'Área do Cliente'}</span>
                </button>
              )}
            </div>
            <p className="text-[9px] text-slate-500">
              &copy; {new Date().getFullYear()} {displayedBrokerName}. Todos os direitos reservados.
            </p>
          </div>
            </>
          )}
        </div>

        {/* Simulator Modal for Pix */}
        {activeModal === 'pix' && (
          <div
            className={`${
              isFullPage ? 'fixed' : 'absolute'
            } inset-0 bg-black/85 backdrop-blur-md ${
              isFullPage ? 'rounded-none' : 'rounded-[44px]'
            } p-6 z-50 flex flex-col items-center justify-center text-center animate-in fade-in duration-200`}
          >
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 fill-teal-400" />
            </div>
            <h3 className="text-base font-black text-white">Chave Pix Instantânea</h3>
            <p className="text-xs text-slate-400 mb-3">Aponte o app do banco ou copie a chave:</p>

            <div className="bg-white p-2.5 rounded-2xl shadow-lg mb-3">
              <img src={pixQrUrl} alt="Pix QR" className="w-36 h-36 rounded-xl" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 w-full text-left mb-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {config.pixKeyType || 'Chave Pix'}:
              </span>
              <span className="text-xs font-mono font-bold text-sky-400 break-all">{pixKey}</span>
              <span className="text-[11px] text-slate-300 block mt-1">
                Favorecido: <strong>{pixBeneficiary}</strong>
              </span>
            </div>

            <button
              onClick={async () => {
                await navigator.clipboard.writeText(pixKey);
                showToast('Chave Pix copiada!');
              }}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Chave Pix</span>
            </button>
          </div>
        )}

        {/* Simulator Modal for Wi-Fi */}
        {activeModal === 'wifi' && (
          <div
            className={`${
              isFullPage ? 'fixed' : 'absolute'
            } inset-0 bg-black/85 backdrop-blur-md ${
              isFullPage ? 'rounded-none' : 'rounded-[44px]'
            } p-6 z-50 flex flex-col items-center justify-center text-center animate-in fade-in duration-200`}
          >
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-300 flex items-center justify-center mb-2">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white">Conectar ao Wi-Fi</h3>
            <p className="text-xs text-slate-400 mb-3">
              Aponte a câmera do celular para o QR Code:
            </p>

            <div className="bg-white p-2.5 rounded-2xl shadow-lg mb-3">
              <img src={wifiQrUrl} alt="Wi-Fi QR" className="w-36 h-36 rounded-xl" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 w-full text-left space-y-1 mb-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Rede (SSID):</span>
                <strong className="text-white">{wifiSsid}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Senha:</span>
                <strong className="text-sky-400 font-mono">{wifiPass}</strong>
              </div>
            </div>

            <button
              onClick={handleCopyWifiPass}
              className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Senha do Wi-Fi</span>
            </button>
          </div>
        )}

        {/* Modal de Política de Privacidade & LGPD */}
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 text-left shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-black text-white">
                    Política de Privacidade &amp; LGPD
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  Esta página e canal oficial de contato respeitam a sua privacidade e atuam em total conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)</strong>.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-white text-[11px] block">1. Coleta de Informações</strong>
                  <p className="text-slate-400 text-[10.5px]">
                    Não realizamos rastreamento invasivo nem venda de dados. Ao clicar nos botões de WhatsApp ou ligação, a comunicação ocorre diretamente pelos respectivos aplicativos seguros.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-white text-[11px] block">2. Segurança e Finalidade</strong>
                  <p className="text-slate-400 text-[10.5px]">
                    Todos os dados e links são utilizados exclusivamente para fins de atendimento ao cliente, apresentação profissional de serviços e facilitação de contato direto em 1 clique.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-white text-[11px] block">3. Seus Direitos</strong>
                  <p className="text-slate-400 text-[10.5px]">
                    Você tem o direito de solicitar esclarecimentos, exclusão ou atualização de qualquer informação eventualmente compartilhada conosco a qualquer momento via WhatsApp.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                Entendi e Concordo
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Helper: 4 Featured Property Images Configuration Section inside .mini-site-preview-container
  const renderFeaturedPropertyImagesConfigurator = () => {
    const isCorretorActive = Boolean(
      (config.id || '').toLowerCase().includes('corretor') ||
      (config.id || '').toLowerCase().includes('nivaldo') ||
      (config.id || '').toLowerCase().includes('furtuozo') ||
      (config.niche || '').toLowerCase().includes('corretor') ||
      (config.niche || '').toLowerCase().includes('imóve') ||
      (config.niche || '').toLowerCase().includes('imove') ||
      (config.companyName || '').toLowerCase().includes('nivaldo')
    );

    if (!isCorretorActive && !showInlinePropertyConfig) return null;

    const propsList = [
      { idx: 1 as const, state: corretorProp1, setter: setCorretorProp1, label: 'Imóvel Destaque 1' },
      { idx: 2 as const, state: corretorProp2, setter: setCorretorProp2, label: 'Imóvel Destaque 2' },
      { idx: 3 as const, state: corretorProp3, setter: setCorretorProp3, label: 'Imóvel Destaque 3' },
      { idx: 4 as const, state: corretorProp4, setter: setCorretorProp4, label: 'Imóvel Destaque 4' }
    ];

    return (
      <div className="w-full max-w-[420px] mt-4 bg-slate-900/95 border border-amber-500/40 rounded-3xl p-4 space-y-3.5 shadow-2xl text-left">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              Configuração das 4 Fotos de Imóveis em Destaque
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Envie fotos do seu celular/computador ou selecione uma foto 4K para cada um dos 4 imóveis:
            </p>
          </div>
          {standalone && (
            <button
              type="button"
              onClick={() => setIsCorretorCustomizeModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] shrink-0 cursor-pointer transition"
            >
              Editar Textos &amp; Senha
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {propsList.map(({ idx, state, label }) => (
            <div
              key={idx}
              className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-amber-300">{label}</span>
                  <span className="text-[10px] font-bold text-emerald-400">{state.price}</span>
                </div>
                <div className="h-24 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                  <img
                    src={state.imageUrl}
                    alt={state.title}
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-black gap-1">
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Enviar Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePropertyImageFileUpload(idx, e)}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[10px] font-bold text-slate-200 line-clamp-1">{state.title}</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="w-full py-1.5 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-black text-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition">
                  <Upload className="w-3 h-3" />
                  <span>Carregar Foto {idx}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePropertyImageFileUpload(idx, e)}
                    className="hidden"
                  />
                </label>

                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
                  {LUXURY_PROPERTY_PRESET_IMAGES.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        applyPropertyImageUpdate(idx, preset.url);
                        showToast(`🏡 Foto "${preset.label}" aplicada ao Imóvel ${idx}!`);
                      }}
                      title={preset.label}
                      className={`w-7 h-7 rounded-lg overflow-hidden border shrink-0 cursor-pointer transition ${
                        state.imageUrl === preset.url
                          ? 'border-amber-400 ring-2 ring-amber-400/40'
                          : 'border-slate-700 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper: Exclusive Client Self-Service Login & Management Modal (Supports all 200+ Official Clients)
  const renderCorretorModal = () => {
    if (!isCorretorCustomizeModalOpen) return null;

    const activeLeadId = String(leadId || config.id || '').trim().toLowerCase();
    const isNivaldoSite =
      isCorretorOrigin ||
      activeLeadId === 'nivaldo' ||
      activeLeadId === 'furtuozocorretor' ||
      activeLeadId === 'corretor';
    const needsLogin = standalone && !isCorretorAuthenticated;

    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-black to-[#0c0f18] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {isNivaldoSite ? 'Nivaldo Furtuozo • CRECI 73.286' : config.companyName || 'Cliente Oficial'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {isNivaldoSite ? 'Painel Exclusivo do Corretor' : 'Painel Exclusivo do Cliente'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  {needsLogin
                    ? 'Acesso Restrito do Cliente'
                    : 'Editar Meu Mini Site, Fotos & Links Exclusivos'}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCorretorCustomizeModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {needsLogin ? (
            <form onSubmit={handleCorretorLoginSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Digite seu usuário e senha exclusivos fornecidos pela ALF Automation para atualizar seus links (Instagram, WhatsApp, Google Avaliações, Localização), fotos de perfil, logotipo e destaques:
              </p>
              {corretorLoginError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200 font-bold">
                  {corretorLoginError}
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Usuário / ID do Seu Mini Site
                  </label>
                  <input
                    type="text"
                    value={corretorLoginUser}
                    onChange={(e) => setCorretorLoginUser(e.target.value)}
                    placeholder={isNivaldoSite ? 'Furtuozocorretor' : activeLeadId || 'seu_usuario'}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Senha Exclusiva do Cliente (PIN)
                  </label>
                  <input
                    type="password"
                    value={corretorLoginPass}
                    onChange={(e) => setCorretorLoginPass(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCorretorCustomizeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Entrar no Meu Painel</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Content Form */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-700">
                {/* Seção 1: Identidade, Fotos (Perfil, Logo, Capa) & Links Exclusivos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <span>1. Dados do Seu Mini Site, Fotos &amp; Links Diretos</span>
                    </h4>
                    {standalone && isCorretorAuthenticated && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCorretorAuthenticated(false);
                          try {
                            localStorage.removeItem(`alf_client_auth_${activeLeadId || 'nivaldo'}`);
                            localStorage.removeItem('nivaldo_corretor_auth');
                          } catch (_) {}
                        }}
                        className="text-[10px] text-slate-400 hover:text-rose-400 underline cursor-pointer"
                      >
                        Sair da Conta
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        {isNivaldoSite ? 'Nome do Corretor' : 'Nome da Empresa ou Profissional'}
                      </label>
                      <input
                        type="text"
                        value={corretorNameInput}
                        onChange={(e) => setCorretorNameInput(e.target.value)}
                        placeholder={isNivaldoSite ? 'Nivaldo Furtuozo' : 'Nome exibido no topo'}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        {isNivaldoSite ? 'Registro CRECI / Especialidade' : 'Ramo / Especialidade / Cargo'}
                      </label>
                      <input
                        type="text"
                        value={corretorCreciInput}
                        onChange={(e) => setCorretorCreciInput(e.target.value)}
                        placeholder={isNivaldoSite ? 'CRECI 73.286 • Corretor de Imóveis' : 'Ex: Clínica Odontológica • CRO 12345'}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Links de Direcionamento: WhatsApp, Instagram, Google Avaliações */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">
                        WhatsApp Oficial (com DDD)
                      </label>
                      <input
                        type="text"
                        value={corretorWhatsappInput}
                        onChange={(e) => setCorretorWhatsappInput(e.target.value)}
                        placeholder="5514999999999"
                        className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-pink-400 mb-1">
                        Link ou @ do Instagram
                      </label>
                      <input
                        type="text"
                        value={corretorInstagramInput}
                        onChange={(e) => setCorretorInstagramInput(e.target.value)}
                        placeholder="@seuinstagram ou https://instagram.com/..."
                        className="w-full bg-slate-950 border border-pink-500/40 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-pink-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-amber-400 mb-1">
                        Link de Avaliação 5★ do Google Meu Negócio
                      </label>
                      <input
                        type="text"
                        value={clientGoogleReviewInput}
                        onChange={(e) => setClientGoogleReviewInput(e.target.value)}
                        placeholder="https://g.page/r/.../review"
                        className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Horário de Funcionamento
                      </label>
                      <input
                        type="text"
                        value={clientOpeningHoursInput}
                        onChange={(e) => setClientOpeningHoursInput(e.target.value)}
                        placeholder="Seg a Sex: 08h às 18h"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Localização Física: Endereço & Cidade */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-rose-400 mb-1">
                        Endereço Físico / Localização (Google Maps &amp; Waze)
                      </label>
                      <input
                        type="text"
                        value={clientAddressInput}
                        onChange={(e) => setClientAddressInput(e.target.value)}
                        placeholder="Av. Getúlio Vargas, 1200 - Centro"
                        className="w-full bg-slate-950 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Cidade / UF
                      </label>
                      <input
                        type="text"
                        value={clientCityInput}
                        onChange={(e) => setClientCityInput(e.target.value)}
                        placeholder="Bauru - SP"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Frase de Apresentação / Bio do Mini Site
                    </label>
                    <textarea
                      rows={2}
                      value={corretorTaglineInput}
                      onChange={(e) => setCorretorTaglineInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                    />
                  </div>

                  {/* Uploads de Imagens: Foto de Perfil, Logotipo e Capa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Foto de Perfil do Mini Site
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={corretorPhotoInput}
                          onChange={(e) => setCorretorPhotoInput(e.target.value)}
                          placeholder="URL ou envie do celular ->"
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                        />
                        <label className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold cursor-pointer shrink-0">
                          Enviar Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const img = new Image();
                                img.onload = () => {
                                  const canvas = document.createElement('canvas');
                                  const maxDim = 640;
                                  let w = img.width;
                                  let h = img.height;
                                  if (w > h && w > maxDim) {
                                    h = Math.round((h * maxDim) / w);
                                    w = maxDim;
                                  } else if (h > maxDim) {
                                    w = Math.round((w * maxDim) / h);
                                    h = maxDim;
                                  }
                                  canvas.width = w;
                                  canvas.height = h;
                                  const ctx = canvas.getContext('2d');
                                  if (ctx) {
                                    ctx.drawImage(img, 0, 0, w, h);
                                    setCorretorPhotoInput(canvas.toDataURL('image/jpeg', 0.88));
                                  }
                                };
                                if (typeof ev.target?.result === 'string') img.src = ev.target.result;
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Logotipo da Empresa (Redirecionamento / Topo)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={clientLogoInput}
                          onChange={(e) => setClientLogoInput(e.target.value)}
                          placeholder="URL ou envie sua Logo ->"
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                        />
                        <label className="px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold cursor-pointer shrink-0">
                          Enviar Logo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const img = new Image();
                                img.onload = () => {
                                  const canvas = document.createElement('canvas');
                                  const maxDim = 360;
                                  let w = img.width;
                                  let h = img.height;
                                  if (w > h && w > maxDim) {
                                    h = Math.round((h * maxDim) / w);
                                    w = maxDim;
                                  } else if (h > maxDim) {
                                    w = Math.round((w * maxDim) / h);
                                    h = maxDim;
                                  }
                                  canvas.width = w;
                                  canvas.height = h;
                                  const ctx = canvas.getContext('2d');
                                  if (ctx) {
                                    ctx.drawImage(img, 0, 0, w, h);
                                    setClientLogoInput(canvas.toDataURL('image/png', 0.9));
                                  }
                                };
                                if (typeof ev.target?.result === 'string') img.src = ev.target.result;
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Foto de Capa (Banner Superior do Mini Site)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={clientCoverInput}
                          onChange={(e) => setClientCoverInput(e.target.value)}
                          placeholder="URL da Capa ou envie ->"
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                        />
                        <label className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer shrink-0">
                          Enviar Capa
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const img = new Image();
                                img.onload = () => {
                                  const canvas = document.createElement('canvas');
                                  const maxDim = 1100;
                                  let w = img.width;
                                  let h = img.height;
                                  if (w > h && w > maxDim) {
                                    h = Math.round((h * maxDim) / w);
                                    w = maxDim;
                                  } else if (h > maxDim) {
                                    w = Math.round((w * maxDim) / h);
                                    h = maxDim;
                                  }
                                  canvas.width = w;
                                  canvas.height = h;
                                  const ctx = canvas.getContext('2d');
                                  if (ctx) {
                                    ctx.drawImage(img, 0, 0, w, h);
                                    setClientCoverInput(canvas.toDataURL('image/jpeg', 0.86));
                                  }
                                };
                                if (typeof ev.target?.result === 'string') img.src = ev.target.result;
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-cyan-400 mb-1">
                        Trocar Minha Senha de Acesso (Opcional)
                      </label>
                      <input
                        type="password"
                        value={corretorNewPassword}
                        onChange={(e) => setCorretorNewPassword(e.target.value)}
                        placeholder="Nova senha (deixe vazio p/ manter)"
                        className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs font-bold text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção 2: Os 4 Destaques / Serviços / Produtos / Imóveis com Upload de Foto */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>
                      {isNivaldoSite
                        ? '2. Os 4 Imóveis em Destaque (Fotos & Valores)'
                        : '2. Seus 4 Destaques / Serviços / Produtos (Fotos & Valores)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Envie fotos direto do celular</span>
                  </h4>

                  {[
                    { idx: 1 as const, prop: corretorProp1, setProp: setCorretorProp1, badge: isNivaldoSite ? '🏛️ Imóvel Destaque 1' : '⭐ Destaque 1' },
                    { idx: 2 as const, prop: corretorProp2, setProp: setCorretorProp2, badge: isNivaldoSite ? '🏙️ Imóvel Destaque 2' : '⭐ Destaque 2' },
                    { idx: 3 as const, prop: corretorProp3, setProp: setCorretorProp3, badge: isNivaldoSite ? '🏡 Imóvel Destaque 3' : '⭐ Destaque 3' },
                    { idx: 4 as const, prop: corretorProp4, setProp: setCorretorProp4, badge: isNivaldoSite ? '🌴 Imóvel Destaque 4' : '⭐ Destaque 4' }
                  ].map(({ idx, prop, setProp, badge }) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                          {badge}
                        </span>
                        <label className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-black text-[10px] flex items-center gap-1.5 cursor-pointer transition">
                          <Upload className="w-3 h-3" />
                          <span>Enviar Foto {idx}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePropertyImageFileUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Título do Serviço / Produto / Imóvel</label>
                          <input
                            type="text"
                            value={prop.title}
                            onChange={(e) => setProp({ ...prop, title: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Valor ou Condição (R$)</label>
                          <input
                            type="text"
                            value={prop.price}
                            onChange={(e) => setProp({ ...prop, price: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Descrição Curta</label>
                        <input
                          type="text"
                          value={prop.description}
                          onChange={(e) => setProp({ ...prop, description: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={prop.imageUrl}
                          alt={prop.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <label className="block text-[10px] font-bold text-slate-400 mb-0.5">URL da Foto</label>
                          <input
                            type="text"
                            value={prop.imageUrl}
                            onChange={(e) => setProp({ ...prop, imageUrl: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-400"
                          />
                        </div>
                      </div>
                      {isNivaldoSite && (
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                          {LUXURY_PROPERTY_PRESET_IMAGES.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setProp({ ...prop, imageUrl: preset.url })}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold border shrink-0 flex items-center gap-1.5 cursor-pointer transition ${
                                prop.imageUrl === preset.url
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <img src={preset.url} alt={preset.label} className="w-4 h-4 rounded object-cover" />
                              <span>{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsCorretorCustomizeModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition text-center"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  disabled={isSavingCorretorDb}
                  onClick={async () => {
                    const cleanPhone =
                      corretorWhatsappInput.replace(/\D/g, '') ||
                      config.whatsappNumber ||
                      '5514997047238';
                    const rawInsta = corretorInstagramInput.trim();
                    const cleanInstaHandle = rawInsta
                      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
                      .replace(/\/.*$/, '')
                      .replace(/^@/, '')
                      .trim();
                    const finalInstagramUrl = rawInsta.startsWith('http')
                      ? rawInsta
                      : cleanInstaHandle
                      ? `https://www.instagram.com/${cleanInstaHandle}`
                      : config.instagramUrl || '';

                    const updatedConfig: MiniSiteConfig = {
                      ...config,
                      companyName:
                        corretorNameInput.trim() ||
                        config.companyName ||
                        (isNivaldoSite ? 'Nivaldo Furtuozo' : 'Sua Empresa'),
                      personRole:
                        corretorCreciInput.trim() ||
                        config.personRole ||
                        config.niche ||
                        'Atendimento Oficial',
                      companyBrandName: isNivaldoSite
                        ? 'Nivaldo Furtuozo • Corretor de Imóveis'
                        : corretorNameInput.trim() || config.companyName,
                      niche:
                        corretorCreciInput.trim() ||
                        config.niche ||
                        'Atendimento Oficial',
                      tagline: corretorTaglineInput.trim(),
                      portraitImageUrl:
                        corretorPhotoInput.trim() ||
                        config.portraitImageUrl ||
                        (isNivaldoSite ? CORRETOR_PHOTO_URL : ''),
                      logoUrl: clientLogoInput.trim() || config.logoUrl || '',
                      coverImageUrl: clientCoverInput.trim() || config.coverImageUrl || '',
                      googleReviewUrl: clientGoogleReviewInput.trim() || config.googleReviewUrl || '',
                      address: clientAddressInput.trim() || config.address || '',
                      city: clientCityInput.trim() || config.city || '',
                      openingHours: clientOpeningHoursInput.trim() || config.openingHours || '',
                      whatsappNumber: cleanPhone,
                      phone: corretorWhatsappInput.trim() || cleanPhone,
                      instagramUrl: finalInstagramUrl,
                      instagramHandle: cleanInstaHandle ? `@${cleanInstaHandle}` : config.instagramHandle,
                      services: [
                        {
                          id: 'prop_1',
                          title: corretorProp1.title,
                          price: corretorProp1.price,
                          description: corretorProp1.description,
                          imageUrl: corretorProp1.imageUrl,
                          customWhatsappMsg: `Olá! Vi "${corretorProp1.title}" (${corretorProp1.price}) no seu Mini Site e gostaria de mais informações!`
                        },
                        {
                          id: 'prop_2',
                          title: corretorProp2.title,
                          price: corretorProp2.price,
                          description: corretorProp2.description,
                          imageUrl: corretorProp2.imageUrl,
                          customWhatsappMsg: `Olá! Vi "${corretorProp2.title}" (${corretorProp2.price}) no seu Mini Site e gostaria de mais informações!`
                        },
                        {
                          id: 'prop_3',
                          title: corretorProp3.title,
                          price: corretorProp3.price,
                          description: corretorProp3.description,
                          imageUrl: corretorProp3.imageUrl,
                          customWhatsappMsg: `Olá! Vi "${corretorProp3.title}" (${corretorProp3.price}) no seu Mini Site e gostaria de mais informações!`
                        },
                        {
                          id: 'prop_4',
                          title: corretorProp4.title,
                          price: corretorProp4.price,
                          description: corretorProp4.description,
                          imageUrl: corretorProp4.imageUrl,
                          customWhatsappMsg: `Olá! Vi "${corretorProp4.title}" (${corretorProp4.price}) no seu Mini Site e gostaria de mais informações!`
                        }
                      ]
                    };
                    updateAndPersist(updatedConfig);
                    await handleSaveCorretorToDatabase(updatedConfig);
                    setIsCorretorCustomizeModalOpen(false);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs cursor-pointer transition shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingCorretorDb ? 'Salvando no Banco...' : 'Salvar Alterações no Meu Mini Site'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Standalone public page mode
  if (standalone) {
    return (
      <div className="mini-site-preview-container min-h-screen bg-[#04070e] text-slate-100 flex flex-col items-center justify-start pb-10">
        {renderPhoneSimulator(true)}
        {showInlinePropertyConfig && renderFeaturedPropertyImagesConfigurator()}
        {renderCorretorModal()}
        {toastMessage && (
          <div className="fixed bottom-6 bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xl z-50 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 md:p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Mini Página Inovadora 4K • Adaptável ao Segmento
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Palette className="w-3 h-3" />
              Cor, Fonte &amp; Imagens 4K Personalizáveis
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
            Mini Site 4K &amp; Cardápio / Catálogo ({name})
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Foto de capa em 4K no Head, horário de atendimento em destaque, frase rolante, tela Como Chegar GPS, avaliação real do Google com depoimentos e cardápio/catálogo do segmento.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setIsClientPresentationOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-amber-300/40"
          >
            <Smartphone className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Apresentar Mockup</span>
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Exportar HTML</span>
          </button>

          <button
            onClick={handleCopyShareLink}
            className="px-3.5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
          </button>
        </div>
      </div>

      {/* READY MOCKUP MODELS QUICK SELECTOR STRIP */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <h3 className="text-sm sm:text-base font-black text-white">
                Modelos Prontos em 4K por Segmento (Clique para Carregar e Editar)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Cada segmento adapta automaticamente a foto do Head em 4K, horário, diferenciais, cardápio/catálogo, tela Como Chegar e depoimentos do Google!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                const wladTemplate = READY_MINISITE_MOCKUPS.find(
                  (t) => t.id === 'perfil_pessoal_wladmir'
                );
                if (wladTemplate) {
                  handleApplyReadyMockup(wladTemplate);
                }
                setIsPersonalCloneModalOpen(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>👔 Criar / Clonar Perfil Pessoal (Ex: Wladmir • WM Alimentos)</span>
            </button>
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Galeria ({READY_MINISITE_MOCKUPS.filter((t) => t.id !== 'perfil_pessoal_corretor').length})</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {READY_MINISITE_MOCKUPS.filter((t) => t.id !== 'perfil_pessoal_corretor').map((template) => {
            const isSelected = config.companyName === template.config.companyName;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => handleApplyReadyMockup(template)}
                className={`group flex items-center gap-3 p-2.5 rounded-2xl border text-left transition-all shrink-0 w-64 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 hover:bg-slate-900'
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-slate-900">
                  <img
                    src={template.coverImage}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 text-xs bg-slate-950/80 px-1 rounded-tl-md">
                    {template.emoji}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {template.badge}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-black text-emerald-400">• Ativo</span>
                    )}
                  </div>
                  <p className="text-xs font-black text-white truncate mt-0.5">{template.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{template.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid: Left Controls & Customizer / Right Live Phone Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Studio Customizer & Sharing Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Mode Tabs */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>1. Cor, Fonte &amp; 4K</span>
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Conteúdo &amp; Cardápio</span>
            </button>
            <button
              onClick={() => setActiveTab('vercel')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'vercel'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>▲</span>
              <span>3. Link Vercel</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'export'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>4. Baixar ZIP</span>
            </button>
          </div>

          {/* ================================================================
              TAB 1: VISUAL CUSTOMIZER STUDIO (COR, FONTE, FOTO HEAD 4K & SEGMENTO)
             ================================================================ */}
          {activeTab === 'preview' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5">
              {/* 1. SELETOR DE COR PRINCIPAL DO CLIENTE */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-amber-500" />
                    1. Definir Cor Principal do Mini Site
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold text-slate-600">Cor Livre:</label>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => updateAndPersist({ primaryColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300"
                      title="Escolher qualquer cor personalizada"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COLOR_PALETTE_PRESETS.map((preset) => {
                    const isSelected = primaryColor.toLowerCase() === preset.hex.toLowerCase();
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => updateAndPersist({ primaryColor: preset.hex })}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: preset.hex }}
                          className="w-5 h-5 rounded-full shrink-0 border border-black/15 shadow-xs"
                        ></span>
                        <div className="min-w-0">
                          <strong className="text-[10px] font-black block truncate">
                            {preset.name}
                          </strong>
                          <span className="text-[9px] opacity-75 block truncate">
                            {preset.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. SELETOR DE FONTE / TIPOGRAFIA */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <Type className="w-4 h-4 text-blue-600" />
                    2. Definir Fonte (Tipografia do Cliente)
                  </span>
                  <span className="text-[10px] font-bold text-blue-600">
                    Fonte Ativa: {activeFont.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FONT_FAMILY_OPTIONS.map((font) => {
                    const isSelected = activeFont.id === font.id;
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => updateAndPersist({ fontFamily: font.id as MiniSiteFontFamily })}
                        style={{ fontFamily: font.cssFamily }}
                        className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-900'
                        }`}
                      >
                        <div>
                          <strong className="text-xs font-black block">{font.name}</strong>
                          <span
                            className={`text-[10px] ${
                              isSelected ? 'text-blue-100' : 'text-slate-500'
                            }`}
                          >
                            {font.subtitle}
                          </span>
                        </div>
                        <span className="text-sm font-black">Aa</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. FOTO DO HEAD EM 4K (HERO COVER BANNER) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50/50 to-sky-50 border-2 border-purple-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-black uppercase text-purple-950 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-purple-600" />
                      3. Foto no Head (Capa Hero 4K) &amp; Imagens
                    </span>
                    <p className="text-[11px] text-purple-800">
                      Suba a foto da fachada/produto ou escolha da Biblioteca Realista em 4K.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIs4KLibraryOpen(true)}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[11px] font-black flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Abrir Biblioteca 4K</span>
                  </button>
                </div>

                {/* Current Cover Preview + Upload */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-32 h-20 rounded-xl overflow-hidden border-2 border-purple-300 bg-slate-900 shrink-0 shadow-sm">
                    <img src={coverImage} alt="Capa Head" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-white text-[8px] font-black">
                      CAPA 4K
                    </span>
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <label className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Enviar Foto de Capa do Celular / PC</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={config.coverImageUrl || ''}
                      onChange={(e) => updateAndPersist({ coverImageUrl: e.target.value })}
                      placeholder="Ou cole a URL de uma imagem 4K para o Head..."
                      className="w-full bg-white border border-purple-200 rounded-xl p-2 text-xs font-semibold text-slate-700"
                    />
                  </div>
                </div>

                {/* Quick 4K Cover Presets */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-purple-900 block">
                    Capas 4K Rápidas por Segmento (1-Clique):
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {CURATED_4K_IMAGES_BY_SEGMENT.flatMap((s) => s.covers)
                      .slice(0, 8)
                      .map((cov, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            updateAndPersist({ coverImageUrl: cov.url });
                            showToast(`Capa 4K "${cov.title}" aplicada no Head!`);
                          }}
                          className="relative h-14 rounded-xl overflow-hidden border-2 border-white hover:border-purple-600 shadow-xs group cursor-pointer"
                          title={cov.title}
                        >
                          <img
                            src={cov.url}
                            alt={cov.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition"></div>
                          <span className="absolute bottom-0.5 left-1 right-1 text-[8px] font-bold text-white truncate drop-shadow">
                            {cov.title.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* 4. SEGMENTO DE ATUAÇÃO & CARDÁPIO DIGITAL */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    4. Segmento do Cliente &amp; Cardápio / Catálogo
                  </span>
                  <label className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.showInteractiveMenu ?? true}
                      onChange={(e) => updateAndPersist({ showInteractiveMenu: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span>Exibir Cardápio / Catálogo Interativo</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'gastronomia', label: '🍔 Gastronomia & Cardápio' },
                    { id: 'servicos_beleza', label: '💈 Barbearia & Salão' },
                    { id: 'saude_clinica', label: '💆‍♀️ Clínica & Estética' },
                    { id: 'loja_moda', label: '👗 Moda & Boutique' },
                    { id: 'automotivo_oficina', label: '🚗 Automotivo & Oficina' },
                    { id: 'geral', label: '🏢 Comércio & Serviços' }
                  ].map((seg) => {
                    const activeSeg = smartMeta.segment === seg.id;
                    return (
                      <button
                        key={seg.id}
                        type="button"
                        onClick={() =>
                          updateAndPersist({ segmentType: seg.id as MiniSiteSegmentType })
                        }
                        className={`p-2 rounded-xl border text-[11px] font-black text-left transition cursor-pointer ${
                          activeSeg
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-100/50'
                        }`}
                      >
                        {seg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. LINK DIRETO PARA COMPARTILHAR COM O CLIENTE */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Link Direto do Mini Site (Para Bio do Instagram e Placa NFC)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    {copiedLink ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 2: EDIT CONTENT, HOURS, MARQUEE, COMO CHEGAR, GOOGLE & MENU
             ================================================================ */}
          {activeTab === 'edit' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5 max-h-[780px] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-sm font-black uppercase text-slate-900 tracking-tight">
                    Dados do Cliente, Horário, Como Chegar &amp; Cardápio
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Edite todas as informações relevantes do negócio em tempo real.
                  </p>
                </div>
                {onSaveConfig && (
                  <button
                    type="button"
                    disabled={isSavingConfig}
                    onClick={async () => {
                      setIsSavingConfig(true);
                      try {
                        await onSaveConfig(config);
                        showToast('Mini Site salvo com sucesso no banco de dados!');
                      } finally {
                        setIsSavingConfig(false);
                      }
                    }}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingConfig ? 'Salvando...' : 'Salvar Tudo'}</span>
                  </button>
                )}
              </div>

              {/* 1. DADOS BÁSICOS + HORÁRIO DE ATENDIMENTO NO HEAD */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  1. Nome, Horário de Atendimento &amp; Bio do Head
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nome da Empresa / Cliente
                    </label>
                    <input
                      type="text"
                      value={config.companyName || ''}
                      onChange={(e) => updateAndPersist({ companyName: e.target.value })}
                      placeholder="Ex: Burger Prime Artesanal"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Segmento / Nicho
                    </label>
                    <input
                      type="text"
                      value={config.niche || ''}
                      onChange={(e) => updateAndPersist({ niche: e.target.value })}
                      placeholder="Ex: Hamburgueria & Gastronomia"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      🕒 Horário de Atendimento (Destaque no Head)
                    </label>
                    <input
                      type="text"
                      value={config.openingHours !== undefined ? config.openingHours : openingHours}
                      onChange={(e) => updateAndPersist({ openingHours: e.target.value })}
                      placeholder="Ex: Terça a Domingo: 18h às 23h30"
                      className="w-full bg-white border-2 border-emerald-400 rounded-xl p-2 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Cidade / UF
                    </label>
                    <input
                      type="text"
                      value={config.city || ''}
                      onChange={(e) => updateAndPersist({ city: e.target.value })}
                      placeholder="Ex: São Paulo - SP"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Frase de Impacto / Subtítulo no Head
                  </label>
                  <input
                    type="text"
                    value={config.tagline || ''}
                    onChange={(e) => updateAndPersist({ tagline: e.target.value })}
                    placeholder="Ex: Hambúrgueres artesanais na brasa e atendimento VIP."
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* 2. LOGOTIPO DA EMPRESA */}
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-blue-950 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    2. Logotipo da Empresa
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-blue-300 flex items-center justify-center overflow-hidden shrink-0">
                    {config.logoUrl ? (
                      <img src={config.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-white">{initial}</span>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <label className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir Logo do Celular / Computador</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={config.logoUrl || ''}
                      onChange={(e) => updateAndPersist({ logoUrl: e.target.value })}
                      placeholder="Ou cole o link da imagem da logo..."
                      className="w-full bg-white border border-blue-200 rounded-xl p-2 text-xs"
                    />
                  </div>
                </div>

                {/* FOTO PESSOAL DO PROFISSIONAL / EXECUTIVO (Ex: Wladmir Garcia, Médica, Especialista) */}
                <div className="pt-3 border-t border-blue-200/80 space-y-2">
                  <span className="text-[11px] font-black uppercase text-blue-950 flex items-center gap-1.5">
                    📸 Foto Pessoal do Profissional / Executivo (Ex: Wladmir Garcia)
                  </span>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-amber-400 flex items-center justify-center overflow-hidden shrink-0">
                      {config.portraitImageUrl ? (
                        <img
                          src={config.portraitImageUrl}
                          alt="Foto Pessoal"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-black text-amber-300">{initial}</span>
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <label className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir Foto Pessoal (Celular / Computador)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePortraitFileUpload(e, 'active')}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={config.portraitImageUrl || ''}
                        onChange={(e) => updateAndPersist({ portraitImageUrl: e.target.value })}
                        placeholder="Ou cole o link da foto pessoal..."
                        className="w-full bg-white border border-blue-200 rounded-xl p-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. FRASE DE DESTAQUE PASSANDO (LETREIRO ROLANTE) */}
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-2.5">
                <span className="text-xs font-black uppercase text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  3. Frase de Destaque Passando (Letreiro Dinâmico)
                </span>
                <input
                  type="text"
                  value={config.marqueeText !== undefined ? config.marqueeText : marqueeText}
                  onChange={(e) => updateAndPersist({ marqueeText: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs font-bold text-slate-900"
                />
              </div>

              {/* 4. SOBRE A EMPRESA & DIFERENCIAIS DE VALOR */}
              <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-3">
                <span className="text-xs font-black uppercase text-purple-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-600" />
                  4. Sobre a Empresa &amp; Diferenciais que Geram Valor
                </span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">
                    História / Proposta de Valor da Empresa
                  </label>
                  <textarea
                    rows={3}
                    value={config.aboutText !== undefined ? config.aboutText : aboutText}
                    onChange={(e) => updateAndPersist({ aboutText: e.target.value })}
                    className="w-full bg-white border border-purple-200 rounded-xl p-2 text-xs text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-700">
                    Diferenciais &amp; Comodidades (Estacionamento, Delivery, Climatizado, etc.)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {amenities.map((am, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-[11px] font-bold text-slate-800"
                      >
                        <span>{am}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateAndPersist({
                              amenities: amenities.filter((_, i) => i !== idx)
                            })
                          }
                          className="text-rose-500 hover:text-rose-700 ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      placeholder="Ex: 🅿️ Estacionamento Grátis"
                      className="flex-1 bg-white border border-purple-200 rounded-xl p-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newAmenity.trim()) return;
                        updateAndPersist({ amenities: [...amenities, newAmenity.trim()] });
                        setNewAmenity('');
                      }}
                      className="px-3 py-2 bg-purple-600 text-white rounded-xl text-xs font-black cursor-pointer"
                    >
                      + Adicionar
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. TELA COMO CHEGAR (ENDEREÇO & ROTA GPS) */}
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2.5">
                <span className="text-xs font-black uppercase text-rose-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  5. Tela &ldquo;Como Chegar&rdquo; (Google Maps &amp; Waze)
                </span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">
                    Endereço Completo (Gera Mapa Visual + Rota Maps e Waze)
                  </label>
                  <input
                    type="text"
                    value={config.address !== undefined ? config.address : addressText}
                    onChange={(e) => updateAndPersist({ address: e.target.value })}
                    placeholder="Av. Paulista, 1500 - Bela Vista, São Paulo - SP"
                    className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs font-bold text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">
                      Telefone Comercial
                    </label>
                    <input
                      type="text"
                      value={config.phone || ''}
                      onChange={(e) => updateAndPersist({ phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">
                      WhatsApp de Pedidos / Atendimento
                    </label>
                    <input
                      type="text"
                      value={config.whatsappNumber || config.phone || ''}
                      onChange={(e) => updateAndPersist({ whatsappNumber: e.target.value })}
                      placeholder="5511999999999"
                      className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* 6. OS 4 DESTAQUES EM 4K + CARDÁPIO / CATÁLOGO COMPLETO */}
              <div className="p-4 bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5">
                      <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                      6. Destaques 4K &amp; Cardápio / Catálogo do Segmento
                    </span>
                    <p className="text-[11px] text-emerald-800">
                      Personalize os 4 produtos principais e adicione quantos itens quiser ao Cardápio/Catálogo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateDefaultServices}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-black cursor-pointer"
                  >
                    ⚡ Restaurar Destaques do Segmento
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featuredProducts.slice(0, 4).map((p, idx) => (
                    <div
                      key={p.id || `edit_p_${idx}`}
                      className="bg-white border border-emerald-200 rounded-2xl p-3 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Destaque #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-14 h-14 rounded-xl bg-slate-900 overflow-hidden shrink-0">
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-[10px] rounded-lg flex items-center justify-center gap-1 cursor-pointer">
                            <Upload className="w-3 h-3" />
                            <span>Subir Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProductImageUpload(idx, e)}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={p.imageUrl || ''}
                            onChange={(e) => handleUpdateProduct(idx, { imageUrl: e.target.value })}
                            placeholder="URL da foto 4K..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1 text-[10px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          value={p.title}
                          onChange={(e) => handleUpdateProduct(idx, { title: e.target.value })}
                          placeholder="Nome do item"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={p.price || ''}
                          onChange={(e) => handleUpdateProduct(idx, { price: e.target.value })}
                          placeholder="Preço (ex: R$ 39,90)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs font-bold text-emerald-700"
                        />
                      </div>

                      <input
                        type="text"
                        value={p.description || ''}
                        onChange={(e) => handleUpdateProduct(idx, { description: e.target.value })}
                        placeholder="Descrição curta..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[11px]"
                      />
                    </div>
                  ))}
                </div>

                {/* Add Extra Menu / Catalog Items */}
                <div className="pt-3 border-t border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-emerald-950 block">
                    + Adicionar Mais Itens ao Cardápio / Catálogo do Cliente:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newServiceTitle}
                      onChange={(e) => setNewServiceTitle(e.target.value)}
                      placeholder="Nome do Prato / Serviço..."
                      className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold"
                    />
                    <input
                      type="text"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      placeholder="Preço (ex: R$ 45,00)"
                      className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold"
                    />
                    <input
                      type="text"
                      value={newServiceCategory}
                      onChange={(e) => setNewServiceCategory(e.target.value)}
                      placeholder="Categoria (ex: Bebidas, Combos)"
                      className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newServiceDesc}
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                      placeholder="Descrição dos ingredientes ou detalhes..."
                      className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar ao Cardápio</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 7. AVALIAÇÃO DO GOOGLE & PIX / WI-FI */}
              <div className="space-y-3">
                <GoogleReviewLinkGenerator
                  initialQuery={config.companyName}
                  initialCity={config.city}
                  currentUrl={config.googleReviewUrl}
                  compact={true}
                  onLinkGenerated={(generatedUrl) => {
                    updateAndPersist({ googleReviewUrl: generatedUrl });
                  }}
                />

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Nota no Google (Ex: 5.0)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={config.rating || 5.0}
                      onChange={(e) => updateAndPersist({ rating: parseFloat(e.target.value) || 5.0 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">
                      Total de Avaliações no Google
                    </label>
                    <input
                      type="number"
                      value={config.reviewCount || 128}
                      onChange={(e) =>
                        updateAndPersist({ reviewCount: parseInt(e.target.value, 10) || 128 })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Pix & Wi-Fi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-teal-50/50 border border-teal-200 rounded-2xl space-y-2">
                    <span className="text-[11px] font-black uppercase text-teal-800 block">
                      ⚡ Chave Pix do Cliente
                    </span>
                    <input
                      type="text"
                      value={config.pixKey || ''}
                      onChange={(e) => updateAndPersist({ pixKey: e.target.value })}
                      placeholder="CNPJ, E-mail ou Celular"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono"
                    />
                  </div>
                  <div className="p-3 bg-sky-50/50 border border-sky-200 rounded-2xl space-y-2">
                    <span className="text-[11px] font-black uppercase text-sky-800 block">
                      📶 Wi-Fi (Rede e Senha)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        value={config.wifiSsid || ''}
                        onChange={(e) => updateAndPersist({ wifiSsid: e.target.value })}
                        placeholder="Nome Wi-Fi"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                      <input
                        type="text"
                        value={config.wifiPassword || ''}
                        onChange={(e) => updateAndPersist({ wifiPassword: e.target.value })}
                        placeholder="Senha"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VERCEL HOSTING */}
          {activeTab === 'vercel' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5">
              <div className="bg-linear-to-r from-slate-950 via-slate-900 to-blue-950 p-5 rounded-2xl text-white space-y-2 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-mono font-black text-sm">
                      ▲
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Modelo de Link Vercel para {name}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        {niche} • {city}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Hospedagem 1-Clique
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={customVercelDomain || getClientVercelUrl(name)}
                      onChange={(e) => setCustomVercelDomain(e.target.value)}
                      className="w-full text-xs font-mono font-bold text-slate-900 bg-transparent outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const url = customVercelDomain || getClientVercelUrl(name);
                      await navigator.clipboard.writeText(url);
                      setCopiedVercelLink(true);
                      showToast('Link da Vercel copiado!');
                      setTimeout(() => setCopiedVercelLink(false), 2500);
                    }}
                    className="px-4 py-2 bg-slate-950 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {copiedVercelLink ? 'Copiado!' : 'Copiar Link'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={async () => {
                    setIsZippingVercel(true);
                    try {
                      const targetUrl = customVercelDomain || getClientVercelUrl(name);
                      await downloadVercelClientZip(config, targetUrl);
                      showToast('Pacote Vercel baixado com sucesso!');
                    } finally {
                      setIsZippingVercel(false);
                    }
                  }}
                  disabled={isZippingVercel}
                  className="py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{isZippingVercel ? 'Gerando ZIP...' : 'Baixar Pacote Vercel (ZIP)'}</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    const targetUrl = customVercelDomain || getClientVercelUrl(name);
                    const pitch = generateVercelClientPitchWhatsapp(name, targetUrl, niche);
                    await navigator.clipboard.writeText(pitch);
                    setCopiedVercelPitch(true);
                    showToast('Mensagem de WhatsApp copiada!');
                    setTimeout(() => setCopiedVercelPitch(false), 2500);
                  }}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{copiedVercelPitch ? 'Copiada!' : 'Copiar Pitch WhatsApp'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT OPTIONS */}
          {activeTab === 'export' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between bg-slate-50/50">
                  <div className="space-y-1.5 mb-3">
                    <strong className="text-sm text-slate-900 block font-black">
                      index.html 4K (Arquivo Único)
                    </strong>
                    <p className="text-xs text-slate-500">
                      Arquivo único com a foto 4K do Head, cor e fonte escolhidas, Como Chegar e Google Reviews.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadHtml}
                    disabled={isDownloadingHtml}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloadingHtml ? 'Gerando...' : 'Baixar index.html'}</span>
                  </button>
                </div>

                <div className="border border-blue-200 bg-blue-50/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="space-y-1.5 mb-3">
                    <strong className="text-sm text-slate-900 block font-black">
                      Pacote ZIP Completo
                    </strong>
                    <p className="text-xs text-slate-500">
                      Inclui index.html + manual de publicação em 30 segundos no Netlify Drop + backup JSON.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadZip}
                    disabled={isZipping}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isZipping ? 'Compactando...' : 'Baixar Pacote ZIP'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Smartphone Simulator */}
        <div className="mini-site-preview-container lg:col-span-6 flex flex-col items-center justify-start">
          {/* Simulator Control Bar: View Full vs Compact + Quick Model Switcher */}
          <div className="w-full max-w-[420px] bg-slate-900 border border-slate-800 rounded-2xl p-3 mb-3 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Simulador Interativo ({name})</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsFullSimulatorView((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition ${
                    isFullSimulatorView
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isFullSimulatorView ? '✨ Visão Completa (Ativa)' : '📱 Ver Modelo Inteiro'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsClientPresentationOpen(true)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 cursor-pointer transition"
                >
                  Tela Cheia
                </button>
              </div>
            </div>

            {/* Quick 1-Click Model Selector right above the simulator */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {READY_MINISITE_MOCKUPS.map((tmpl) => {
                const isSelected = config.companyName === tmpl.config.companyName;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleApplyReadyMockup(tmpl)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black whitespace-nowrap transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{tmpl.emoji}</span>
                    <span>{tmpl.title.split('•')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {renderPhoneSimulator(false)}
          {renderFeaturedPropertyImagesConfigurator()}
        </div>
      </div>

      {/* ======================================================================
          MODAL: BIBLIOTECA DE IMAGENS REALISTAS EM 4K POR SEGMENTO
         ====================================================================== */}
      {is4KLibraryOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block">
                  Fotografia Ultra HD Realista
                </span>
                <h3 className="text-lg font-black text-white">
                  Biblioteca de Capas para o Head e Galeria 4K por Segmento
                </h3>
              </div>
              <button
                onClick={() => setIs4KLibraryOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              {CURATED_4K_IMAGES_BY_SEGMENT.map((group) => (
                <div key={group.segment} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-amber-300">{group.label}</h4>
                    <button
                      type="button"
                      onClick={() => {
                        updateAndPersist({
                          coverImageUrl: group.covers[0].url,
                          galleryUrls: group.gallery
                        });
                        showToast(`Kit de fotos 4K de "${group.label}" aplicado!`);
                        setIs4KLibraryOpen(false);
                      }}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[11px] font-black cursor-pointer"
                    >
                      Aplicar Capa + Galeria 4K Deste Segmento
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {group.covers.map((cov, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group"
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img
                            src={cov.url}
                            alt={cov.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="p-2.5 space-y-1.5">
                          <p className="text-[11px] font-bold text-slate-200 line-clamp-1">
                            {cov.title}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              updateAndPersist({ coverImageUrl: cov.url });
                              showToast(`Foto "${cov.title}" definida no Head!`);
                              setIs4KLibraryOpen(false);
                            }}
                            className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] rounded-lg cursor-pointer"
                          >
                            Usar no Head (Capa)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL: GALERIA DE MODELOS DE MOCKUP PRONTOS
         ====================================================================== */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Escolha um Modelo 4K Pronto por Segmento
                </h3>
                <p className="text-xs text-slate-400">
                  Já inclui foto no Head em 4K, horário, frase passando, Como Chegar, Google Reviews com depoimentos e cardápio/catálogo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {READY_MINISITE_MOCKUPS.filter((t) => t.id !== 'perfil_pessoal_corretor').map((template) => {
                const isCurrent = config.companyName === template.config.companyName;
                return (
                  <div
                    key={template.id}
                    className={`rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-amber-950/20 border-amber-400 ring-2 ring-amber-400/40'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="relative h-36 rounded-xl overflow-hidden border border-slate-800">
                        <img
                          src={template.coverImage}
                          alt={template.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <h4 className="text-base font-black text-white">{template.title}</h4>
                          <span className="text-[11px] text-amber-300 font-bold">
                            {template.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300">{template.tagline}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyReadyMockup(template)}
                      className="mt-3 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer"
                    >
                      {isCurrent ? '✓ Modelo Ativo' : 'Carregar Modelo 4K'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL: APRESENTAÇÃO MOCKUP EM TELA CHEIA PARA MOSTRAR AO CLIENTE
         ====================================================================== */}
      {isClientPresentationOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-5xl rounded-3xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    Apresentação Mockup 4K • {name}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Mostre ao cliente a foto no Head, horário, Como Chegar, Google Reviews e o personalizador de cor e fonte
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsClientPresentationOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-6">
              <div className="shrink-0 flex items-center justify-center">
                {renderPhoneSimulator(false)}
              </div>

              {/* Live Client Color & Font Switcher right inside Presentation Mode! */}
              <div className="w-full max-w-md space-y-4 text-left">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                    <Palette className="w-4 h-4" />
                    Deixe o Cliente Escolher a Cor Ao Vivo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PALETTE_PRESETS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => updateAndPersist({ primaryColor: c.hex })}
                        style={{ backgroundColor: c.hex }}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer transition hover:scale-110 ${
                          primaryColor.toLowerCase() === c.hex.toLowerCase()
                            ? 'border-white ring-2 ring-amber-400'
                            : 'border-black/40'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-black uppercase text-sky-400 flex items-center gap-1.5 pt-2">
                    <Type className="w-4 h-4" />
                    Deixe o Cliente Escolher a Fonte:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {FONT_FAMILY_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => updateAndPersist({ fontFamily: f.id })}
                        style={{ fontFamily: f.cssFamily }}
                        className={`p-2 rounded-xl border text-xs font-bold text-left cursor-pointer ${
                          activeFont.id === f.id
                            ? 'bg-sky-500 text-slate-950 border-sky-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsClientPresentationOpen(false);
                      setIs4KLibraryOpen(true);
                    }}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Trocar Fotos em 4K com o Cliente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsClientPresentationOpen(false);
                      setActiveTab('edit');
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Editar Horário, Endereço e Cardápio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 text-white relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-black">Exportar Mini Página 4K de {name}</h3>
            <p className="text-xs text-slate-300">
              O arquivo exportado já inclui a foto 4K do Head, cor e fonte personalizadas, horário, Como Chegar, Google Reviews e o Cardápio/Catálogo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadHtml}
                disabled={isDownloadingHtml}
                className="py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Baixar index.html</span>
              </button>
              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <FolderArchive className="w-4 h-4" />
                <span>Baixar Pacote ZIP</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL: CRIADOR & CLONADOR DE PERFIL PESSOAL (WLADMIR GARCIA • WM ALIMENTOS)
         ====================================================================== */}
      {isPersonalCloneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-900 border-2 border-amber-500/40 w-full max-w-2xl rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  👔 Modelo de Perfil Pessoal &amp; Executivo (Clonável)
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Personalizar ou Clonar Perfil Pessoal (Base: Wladmir Garcia • WM Alimentos)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPersonalCloneModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-left flex-1">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                <strong>Como funciona:</strong> Use este modelo para atualizar a foto e logo do{' '}
                <strong>Wladmir Garcia (WM Alimentos)</strong> ou troque os dados abaixo e clique em{' '}
                <strong>&ldquo;Clonar para Novo Perfil&rdquo;</strong> para gerar um Mini Site Pessoal exclusivo para qualquer outro cliente ou executivo!
              </div>

              {/* Photo & Company Logo Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-black uppercase text-amber-400 block">
                    1. Foto Pessoal (Ex: Wladmir Garcia)
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-900 shrink-0">
                      <img
                        src={clonePortraitUrl}
                        alt="Foto Pessoal"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="w-full py-2 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePortraitFileUpload(e, 'cloner')}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={clonePortraitUrl}
                        onChange={(e) => setClonePortraitUrl(e.target.value)}
                        placeholder="Ou cole URL da foto..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-black uppercase text-cyan-400 block">
                    2. Logo da Empresa (Ex: WM Alimentos)
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 bg-black p-1 shrink-0">
                      <img
                        src={cloneLogoUrl}
                        alt="Logo Empresa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="w-full py-2 px-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleClonerLogoUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={cloneLogoUrl}
                        onChange={(e) => setCloneLogoUrl(e.target.value)}
                        placeholder="Ou cole URL da logo..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[10px] text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name, Company & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Nome da Pessoa / Profissional
                  </label>
                  <input
                    type="text"
                    value={clonePersonName}
                    onChange={(e) => setClonePersonName(e.target.value)}
                    placeholder="Ex: Wladmir Garcia"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Empresa / Marca (Ex: WM Alimentos)
                  </label>
                  <input
                    type="text"
                    value={cloneCompanyBrand}
                    onChange={(e) => setCloneCompanyBrand(e.target.value)}
                    placeholder="Ex: WM Alimentos"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Cargo / Área de Atuação
                </label>
                <input
                  type="text"
                  value={clonePersonRole}
                  onChange={(e) => setClonePersonRole(e.target.value)}
                  placeholder="Ex: Gestão Comercial & Negócios • WM Alimentos"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white"
                />
              </div>

              {/* Frase de Atuação */}
              <div>
                <label className="block text-[11px] font-bold text-amber-300 mb-1">
                  ✦ Frase de Atuação (Destaque no Perfil)
                </label>
                <textarea
                  rows={2}
                  value={cloneTagline}
                  onChange={(e) => setCloneTagline(e.target.value)}
                  placeholder="Frase de impacto sobre o que a pessoa/empresa faz..."
                  className="w-full bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              {/* WhatsApp & Instagram 1-Click */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-400 mb-1">
                    WhatsApp (Ex: +551499904-1500)
                  </label>
                  <input
                    type="text"
                    value={cloneWhatsapp}
                    onChange={(e) => setCloneWhatsapp(e.target.value)}
                    placeholder="+551499904-1500"
                    className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-pink-400 mb-1">
                    Instagram (Ex: @wladgarcia_)
                  </label>
                  <input
                    type="text"
                    value={cloneInstagram}
                    onChange={(e) => setCloneInstagram(e.target.value)}
                    placeholder="@wladgarcia_"
                    className="w-full bg-slate-950 border border-pink-500/40 rounded-xl px-3 py-2 text-xs font-bold text-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const cleanDigits = cloneWhatsapp.replace(/\D/g, '') || '5514999041500';
                  const cleanInstaHandle = cloneInstagram.trim().replace(/^@/, '');
                  const instaUrl = cleanInstaHandle.startsWith('http')
                    ? cleanInstaHandle
                    : `https://www.instagram.com/${cleanInstaHandle || 'wladgarcia_'}`;
                  const baseTemplate =
                    READY_MINISITE_MOCKUPS.find((t) => t.id === 'perfil_pessoal_wladmir')?.config ||
                    config;

                  const updatedProfile: MiniSiteConfig = {
                    ...baseTemplate,
                    id: 'perfil_pessoal_wladmir',
                    companyName: clonePersonName.trim() || 'Wladmir Garcia',
                    companyBrandName: cloneCompanyBrand.trim() || 'WM Alimentos',
                    personRole:
                      clonePersonRole.trim() ||
                      `${cloneCompanyBrand.trim() || 'WM Alimentos'} • Perfil Oficial`,
                    niche: `${cloneCompanyBrand.trim() || 'WM Alimentos'} • Perfil Executivo`,
                    tagline: cloneTagline.trim(),
                    portraitImageUrl: clonePortraitUrl,
                    logoUrl: cloneLogoUrl,
                    whatsappNumber: cleanDigits,
                    phone: cloneWhatsapp.trim(),
                    whatsappMessage: `Olá ${
                      clonePersonName.trim().split(' ')[0] || 'Wladmir'
                    }! Vi seu Perfil Digital (${
                      cloneCompanyBrand.trim() || 'WM Alimentos'
                    }) e gostaria de falar com você.`,
                    instagramUrl: instaUrl,
                    instagramHandle: `@${cleanInstaHandle || 'wladgarcia_'}`,
                    theme: 'personal_executive',
                    personalProfileLayout: true
                  };
                  updateAndPersist(updatedProfile);
                  setIsPersonalCloneModalOpen(false);
                  showToast(`✅ Perfil de ${updatedProfile.companyName} atualizado no simulador!`);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 font-black text-xs cursor-pointer transition"
              >
                Aplicar Neste Mini Site Atual
              </button>

              <button
                type="button"
                onClick={async () => {
                  const cleanDigits = cloneWhatsapp.replace(/\D/g, '') || '5514999041500';
                  const cleanInstaHandle = cloneInstagram.trim().replace(/^@/, '');
                  const instaUrl = cleanInstaHandle.startsWith('http')
                    ? cleanInstaHandle
                    : `https://www.instagram.com/${cleanInstaHandle || 'wladgarcia_'}`;
                  const slugId =
                    (clonePersonName || 'perfil-pessoal')
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-+|-+$/g, '') || `perfil-${Date.now()}`;

                  const baseTemplate =
                    READY_MINISITE_MOCKUPS.find((t) => t.id === 'perfil_pessoal_wladmir')?.config ||
                    config;

                  const clonedConfig: MiniSiteConfig = {
                    ...baseTemplate,
                    id: slugId,
                    companyName: clonePersonName.trim() || 'Wladmir Garcia',
                    companyBrandName: cloneCompanyBrand.trim() || 'WM Alimentos',
                    personRole:
                      clonePersonRole.trim() ||
                      `${cloneCompanyBrand.trim() || 'WM Alimentos'} • Perfil Oficial`,
                    niche: `${cloneCompanyBrand.trim() || 'WM Alimentos'} • Perfil Pessoal`,
                    tagline: cloneTagline.trim(),
                    portraitImageUrl: clonePortraitUrl,
                    logoUrl: cloneLogoUrl,
                    whatsappNumber: cleanDigits,
                    phone: cloneWhatsapp.trim(),
                    whatsappMessage: `Olá ${
                      clonePersonName.trim().split(' ')[0] || 'Wladmir'
                    }! Vi seu Perfil Digital (${
                      cloneCompanyBrand.trim() || 'WM Alimentos'
                    }) e gostaria de falar com você.`,
                    instagramUrl: instaUrl,
                    instagramHandle: `@${cleanInstaHandle || 'wladgarcia_'}`,
                    websiteUrl: `${getPublicAppOrigin()}/?minisite=${slugId}`,
                    theme: 'personal_executive',
                    personalProfileLayout: true
                  };

                  setInternalConfig(clonedConfig);
                  if (onChangeConfig) onChangeConfig(clonedConfig);
                  if (onClonePersonalProfile) {
                    await onClonePersonalProfile(clonedConfig, slugId);
                  } else if (onSaveConfig) {
                    await onSaveConfig(clonedConfig);
                  }
                  setIsPersonalCloneModalOpen(false);
                  showToast(
                    `🎉 Novo Perfil Pessoal "${clonedConfig.companyName}" clonado e salvo! Link: /?minisite=${slugId}`
                  );
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs cursor-pointer transition shadow-lg flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Clonar e Salvar como Novo Perfil Pessoal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corretor de Imóveis Official Client Modal */}
      {renderCorretorModal()}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-950 text-white border border-slate-700 px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl z-50 flex items-center gap-2.5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
