import React, { useState } from 'react';
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
  Award
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
  ReadyMockupTemplate
} from '../utils/readyMiniSiteMockups';

interface MiniSiteViewerProps {
  config: MiniSiteConfig;
  onChangeConfig?: (updated: MiniSiteConfig) => void;
  onSaveConfig?: (updated: MiniSiteConfig) => Promise<void> | void;
  standalone?: boolean;
  onLinkToNfc?: (vercelUrl?: string) => void;
  leadId?: string;
  isLinkedToNfc?: boolean;
}

export const MiniSiteViewer: React.FC<MiniSiteViewerProps> = ({
  config,
  onChangeConfig,
  onSaveConfig,
  standalone = false,
  onLinkToNfc,
  leadId = 'demo',
  isLinkedToNfc = false
}) => {
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateAndPersist = (patch: Partial<MiniSiteConfig>) => {
    const updated: MiniSiteConfig = { ...config, ...patch };
    if (onChangeConfig) onChangeConfig(updated);
    if (onSaveConfig) onSaveConfig(updated);
  };

  const handleApplyReadyMockup = (template: ReadyMockupTemplate) => {
    const updated: MiniSiteConfig = {
      ...template.config,
      id: config.id || leadId || template.config.id,
      phone: (config.phone && config.phone.trim()) || template.config.phone,
      address: (config.address && config.address.trim()) || template.config.address,
      googleReviewUrl:
        config.googleReviewUrl && config.googleReviewUrl !== 'https://maps.google.com'
          ? config.googleReviewUrl
          : template.config.googleReviewUrl
    };
    if (onChangeConfig) onChangeConfig(updated);
    if (onSaveConfig) onSaveConfig(updated);
    setQuickCart({});
    setSelectedMenuCategory('Todos');
    showToast(`✨ Modelo 4K "${template.title}" aplicado! Personalize cor, fonte e fotos na aba Editar.`);
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

  const whatsappUrl = buildMiniSiteWhatsappUrl(
    config.whatsappNumber || config.phone || '5511999999999',
    config.whatsappMessage || `Olá! Vim através do Mini Site de ${name}. Gostaria de mais informações!`
  );
  const instaHandle = sanitizeMiniSiteHandle(config.instagramUrl || '', '@');
  const tiktokHandle = sanitizeMiniSiteHandle(config.tiktokUrl || '', '@');
  const pixKey = config.pixKey || 'pix@empresa.com.br';
  const pixBeneficiary = config.pixBeneficiary || name;
  const wifiSsid = config.wifiSsid || `${name.replace(/\s+/g, '_')}_WiFi`;
  const wifiPass = config.wifiPassword || 'VisiteNos123';

  const pixQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(pixKey)}`;
  const wifiQrData = `WIFI:T:${config.wifiSecurity || 'WPA'};S:${wifiSsid};P:${wifiPass};;`;
  const wifiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(wifiQrData)}`;

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText + ' ' + city)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(addressText + ' ' + city)}&navigate=yes`;

  // Featured 4 Products & Full Segment Catalog/Menu
  const userServices = Array.isArray(config.services) ? config.services : [];
  const defaultServices = getDefaultFourProducts(config.niche, name);
  const rawFeatured =
    userServices.length >= 4
      ? userServices.slice(0, 4)
      : [...userServices, ...defaultServices.slice(userServices.length, 4)];
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
    userServices.length > 4 ? userServices.slice(4) : smartMeta.extraCatalogItems;
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

  const shareableUrl = `${getPublicAppOrigin()}/?minisite=${leadId || config.id || 'demo'}`;

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      showToast('Link do Mini Site copiado para a área de transferência!');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (_) {}
  };

  const handlePixClick = async () => {
    const key = config.pixKey || 'pix@empresa.com.br';
    try {
      await navigator.clipboard.writeText(key);
      setCopiedPix(true);
      showToast('Chave Pix copiada com sucesso!');
      setTimeout(() => setCopiedPix(false), 2500);
    } catch (_) {}
    setActiveModal('pix');
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

    return (
      <div
        style={{ fontFamily: activeFont.cssFamily }}
        className={`relative mx-auto w-full ${
          isFullPage
            ? 'max-w-md min-h-screen bg-[#070b14] text-slate-100 shadow-2xl border-x border-white/5 pb-24'
            : 'max-w-[395px] bg-slate-950 rounded-[46px] p-2.5 shadow-2xl border-4 border-slate-800 ring-1 ring-white/15 select-none'
        }`}
      >
        {/* Smartphone Dynamic Island Notch */}
        {!isFullPage && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-40 flex items-center justify-center gap-2 shadow-md border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
          </div>
        )}

        {/* Screen Body */}
        <div
          className={`relative ${
            isFullPage
              ? 'w-full'
              : 'rounded-[38px] bg-[#070b14] text-slate-100 pb-20 overflow-y-auto max-h-[710px] scrollbar-thin scrollbar-thumb-slate-800'
          }`}
        >
          {/* ================================================================
              1. HERO HEAD 4K PHOTO BANNER + LIVE STATUS + GOOGLE RATING BADGE
             ================================================================ */}
          <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-900">
            <img
              src={coverImage}
              alt={`${name} Capa 4K`}
              className="w-full h-full object-cover contrast-105 saturate-110 transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90';
              }}
            />
            {/* Multi-stop cinematic vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-[#070b14]"></div>

            {/* Top Status & Rating Pills over Hero Cover */}
            <div className={`absolute ${isFullPage ? 'top-4' : 'top-9'} left-3.5 right-3.5 flex items-center justify-between gap-2 z-20`}>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/40 text-[10px] font-extrabold text-emerald-300 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 relative"></span>
                <span>Aberto Agora</span>
              </div>

              <button
                type="button"
                onClick={() => setMiniSiteViewTab('avaliacoes')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/50 text-[10px] font-black text-amber-300 shadow-lg cursor-pointer hover:scale-105 transition"
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)}</span>
                <span className="text-slate-300 font-semibold">({config.reviewCount || 128})</span>
              </button>
            </div>

            {/* 4K Ultra HD Watermark tag */}
            <div className="absolute bottom-14 right-3.5 z-10">
              <span
                style={{ borderColor: `${primaryColor}66`, color: primaryColor }}
                className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border text-[8px] font-black uppercase tracking-widest"
              >
                Experiência 4K
              </span>
            </div>
          </div>

          {/* ================================================================
              2. PROFILE IDENTITY + OPENING HOURS IN HEADER
             ================================================================ */}
          <div className="relative z-20 px-4 -mt-12">
            <div className="flex items-end gap-3.5">
              {/* Overlapping Logo with Brand Color Ring */}
              <div className="relative w-20 h-20 rounded-2xl bg-slate-900 p-0.5 shadow-2xl shrink-0"
                   style={{ boxShadow: `0 10px 25px -5px ${primaryColor}55`, border: `2px solid ${primaryColor}` }}>
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950 flex items-center justify-center text-white text-2xl font-black">
                  {config.logoUrl ? (
                    <img
                      src={config.logoUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    initial
                  )}
                </div>
                <div
                  style={{ backgroundColor: primaryColor }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full text-slate-950 flex items-center justify-center border-2 border-[#070b14] shadow-md"
                  title="Empresa Verificada"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                </div>
              </div>

              {/* Business Title & Category */}
              <div className="flex-1 min-w-0 pb-0.5 text-left">
                <h1 className="text-lg font-black text-white leading-tight truncate drop-shadow-sm">
                  {name}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span
                    style={{ color: primaryColor }}
                    className="text-[10px] font-black uppercase tracking-wider"
                  >
                    {niche}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[10px] text-slate-300 font-semibold flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                    {city}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline / Value Proposition */}
            <p className="text-xs text-slate-300 mt-2.5 text-left leading-relaxed">
              {config.tagline || `${niche} de alto padrão em ${city}. Experiência exclusiva e atendimento 1-clique.`}
            </p>

            {/* HORÁRIO DE ATENDIMENTO DESTACADO NO HEAD + BOTÃO COMO CHEGAR */}
            <div className="mt-3 p-2.5 rounded-2xl bg-slate-900/95 border border-white/10 shadow-md flex items-center justify-between gap-2 text-left">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-black tracking-wider text-emerald-400 block">
                    🕒 Horário de Atendimento
                  </span>
                  <span className="text-[11px] font-bold text-white truncate block">
                    {openingHours}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMiniSiteViewTab('como_chegar')}
                style={{ backgroundColor: `${primaryColor}25`, color: primaryColor, borderColor: `${primaryColor}50` }}
                className="px-2.5 py-1.5 rounded-xl border text-[10px] font-black shrink-0 flex items-center gap-1 cursor-pointer hover:brightness-110 transition"
              >
                <MapPin className="w-3 h-3" />
                <span>Como Chegar</span>
              </button>
            </div>
          </div>

          {/* ================================================================
              3. FRASE DE DESTAQUE PASSANDO (DYNAMIC MARQUEE BANNER)
             ================================================================ */}
          <div className="px-4 mt-3">
            <div
              style={{
                background: `linear-gradient(90deg, ${primaryColor}, #fbbf24, ${primaryColor})`
              }}
              className="w-full overflow-hidden text-slate-950 font-black text-[10px] py-1.5 px-2 rounded-xl shadow-md uppercase tracking-wider"
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
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/95 border border-white/10 rounded-2xl">
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('all')}
                style={
                  miniSiteViewTab === 'all'
                    ? { backgroundColor: primaryColor, color: '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'all' ? 'shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                ✨ Início
              </button>
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('catalogo')}
                style={
                  miniSiteViewTab === 'catalogo'
                    ? { backgroundColor: primaryColor, color: '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'catalogo' ? 'shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                {smartMeta.segment === 'gastronomia' ? '🍽️ Cardápio' : '📋 Catálogo'}
              </button>
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('como_chegar')}
                style={
                  miniSiteViewTab === 'como_chegar'
                    ? { backgroundColor: primaryColor, color: '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'como_chegar' ? 'shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                📍 Chegar
              </button>
              <button
                type="button"
                onClick={() => setMiniSiteViewTab('avaliacoes')}
                style={
                  miniSiteViewTab === 'avaliacoes'
                    ? { backgroundColor: primaryColor, color: '#090d16' }
                    : undefined
                }
                className={`py-1.5 px-1 rounded-xl text-[10px] font-black transition cursor-pointer truncate ${
                  miniSiteViewTab === 'avaliacoes' ? 'shadow-sm' : 'text-slate-300 hover:text-white'
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
                SECTION A: 4 PRINCIPAIS DESTAQUES EM 4K (Shown on 'all')
               -------------------------------------------------------------- */}
            {miniSiteViewTab === 'all' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: primaryColor }}
                    className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{smartMeta.featuredTitle}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMiniSiteViewTab('catalogo')}
                    className="text-[10px] font-bold text-slate-300 hover:text-white underline cursor-pointer"
                  >
                    Ver tudo ({allCatalogItems.length}) ➔
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {featuredProducts.slice(0, 4).map((p, idx) => {
                    const pWaMsg =
                      p.customWhatsappMsg ||
                      `Olá! Vi no Mini Site de ${name} o destaque "${p.title}"${
                        p.price ? ` (${p.price})` : ''
                      } e gostaria de pedir/agendar!`;
                    const pWaUrl = buildMiniSiteWhatsappUrl(
                      config.whatsappNumber || config.phone || '5511999999999',
                      pWaMsg
                    );
                    const itemId = p.id || `feat_${idx}`;
                    const inCartQty = quickCart[itemId] || 0;

                    return (
                      <div
                        key={itemId}
                        className="bg-slate-900/95 border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-lg group"
                      >
                        <div className="relative w-full h-28 bg-slate-950 overflow-hidden shrink-0">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1556742049-0a67e55722c6?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                          <span
                            style={{ backgroundColor: '#090d16e6', color: primaryColor, borderColor: `${primaryColor}55` }}
                            className="absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[9px] font-black border shadow-sm"
                          >
                            {p.price || 'Destaque'}
                          </span>
                        </div>

                        <div className="p-2.5 flex flex-col flex-1 justify-between gap-2 text-left">
                          <div>
                            <h4 className="text-xs font-black text-white line-clamp-1">{p.title}</h4>
                            <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-snug h-[28px] overflow-hidden">
                              {p.description || 'Disponível com atendimento imediato no WhatsApp.'}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <a
                              href={pWaUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{ backgroundColor: primaryColor, color: '#090d16' }}
                              className="flex-1 py-1.5 px-2 font-black text-[10px] rounded-xl flex items-center justify-center gap-1 shadow-sm hover:brightness-110 active:scale-95 transition-all"
                            >
                              <Send className="w-2.5 h-2.5" />
                              <span className="truncate">{smartMeta.ctaLabel}</span>
                            </a>
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
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------
                SECTION B: CARDÁPIO DIGITAL / CATÁLOGO INTERATIVO DO SEGMENTO
               -------------------------------------------------------------- */}
            {(miniSiteViewTab === 'catalogo' ||
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
                SECTION C: SOBRE A EMPRESA & DIFERENCIAIS DE VALOR + GALERIA 4K
               -------------------------------------------------------------- */}
            {miniSiteViewTab === 'all' && (
              <>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2.5 text-left shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4" style={{ color: primaryColor }} />
                      <span>Por que escolher {name}?</span>
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      Diferenciais VIP
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">{aboutText}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-xl bg-slate-950/90 border border-white/10 text-[10px] font-bold text-slate-200"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Galeria de Fotos Realistas em 4K */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2.5 text-left shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      <span>Nosso Espaço &amp; Qualidade em 4K</span>
                    </span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                      Ultra HD
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {galleryUrls.slice(0, 4).map((gUrl, idx) => (
                      <div
                        key={idx}
                        className="relative h-24 rounded-xl overflow-hidden border border-white/10 bg-slate-950 group"
                      >
                        <img
                          src={gUrl}
                          alt={`${name} Galeria ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* --------------------------------------------------------------
                SECTION D: TELA "COMO CHEGAR" & LOCALIZAÇÃO GPS (Estilo Print)
               -------------------------------------------------------------- */}
            {(miniSiteViewTab === 'all' || miniSiteViewTab === 'como_chegar') && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border border-rose-500/35 shadow-lg text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block">
                        Como Chegar &amp; Localização
                      </span>
                      <span className="text-[10px] text-rose-300 font-semibold">
                        Navegação GPS com 1 Toque
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Maps &amp; Waze
                  </span>
                </div>

                {/* Stylized Interactive Map Preview Card */}
                <div className="relative h-28 rounded-xl overflow-hidden border border-white/15 bg-slate-950 flex flex-col items-center justify-center p-3 text-center">
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        'radial-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  ></div>
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

                {/* Detailed Hours & Phone inside Como Chegar */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Horário:
                    </span>
                    <strong className="text-white text-right">{openingHours}</strong>
                  </div>
                  {config.phone && (
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        Telefone:
                      </span>
                      <a href={`tel:${config.phone.replace(/\D/g, '')}`} className="font-bold text-sky-400 hover:underline">
                        {config.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* 2 GPS Buttons: Google Maps + Waze */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
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
                SECTION E: AVALIAÇÃO DO GOOGLE ESTILO PRINT REAL + DEPOIMENTOS
               -------------------------------------------------------------- */}
            {(miniSiteViewTab === 'all' || miniSiteViewTab === 'avaliacoes') && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/35 to-amber-950/25 border-2 border-amber-400/45 shadow-xl text-left space-y-3">
                {/* Official Google Review Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
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
                      <span className="text-xs font-black text-white block">
                        Avaliações do Google
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-sm font-black text-amber-300">
                          {(config.rating && config.rating > 0 ? config.rating : 5.0).toFixed(1)}
                        </span>
                        <span className="text-amber-400 text-xs tracking-tighter">★★★★★</span>
                        <span className="text-[10px] font-bold text-slate-300">
                          ({config.reviewCount || 128} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Verificado
                  </span>
                </div>

                {/* Real Customer Review Snippets (Print Style) */}
                <div className="space-y-2">
                  {testimonials.slice(0, 2).map((rev, idx) => (
                    <div
                      key={rev.id || idx}
                      className="p-2.5 rounded-xl bg-slate-950/85 border border-white/10 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            style={{ backgroundColor: idx === 0 ? primaryColor : '#38bdf8' }}
                            className="w-6 h-6 rounded-full text-slate-950 font-black text-[10px] flex items-center justify-center"
                          >
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <strong className="text-[11px] font-bold text-white block leading-none">
                              {rev.author}
                            </strong>
                            <span className="text-[9px] text-slate-400">
                              {rev.role || 'Local Guide • Google'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-400 text-[10px] block">★★★★★</span>
                          <span className="text-[8px] text-slate-500">{rev.timeAgo || 'há 2 dias'}</span>
                        </div>
                      </div>
                      <p className="text-[10.5px] text-slate-300 leading-snug italic">
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

            {/* --------------------------------------------------------------
                SECTION F: PIX 1-TOQUE, WI-FI QR CODE & CANAIS SOCIAIS
               -------------------------------------------------------------- */}
            {miniSiteViewTab === 'all' && (
              <>
                <div className="p-3.5 rounded-2xl bg-teal-950/25 border border-teal-500/35 shadow-md text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-sm">
                        <Zap className="w-4 h-4 fill-white" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-white block">
                          Pagamento via Pix
                        </span>
                        <span className="text-[9px] text-slate-400">
                          Favorecido: {pixBeneficiary}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300">
                      1-Toque
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-slate-200 truncate">
                      {config.pixKey || 'pix@empresa.com.br'}
                    </span>
                    <span className="text-[8px] font-black uppercase text-slate-400">
                      {(config.pixKeyType || 'pix').toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handlePixClick}
                      className="py-2 px-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-[10px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95 shadow-sm"
                    >
                      {copiedPix ? (
                        <Check className="w-3 h-3 text-slate-950 stroke-[3]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedPix ? 'Chave Copiada!' : 'Copiar Chave'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal('pix')}
                      className="py-2 px-2 bg-white/10 hover:bg-white/15 text-white font-bold text-[10px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border border-white/10 transition active:scale-95"
                    >
                      <QrCode className="w-3 h-3 text-teal-300" />
                      <span>Ver QR Code</span>
                    </button>
                  </div>
                </div>

                {/* Quick Channels Grid */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleWifiClick}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-sky-950/25 border border-sky-500/30 hover:border-sky-500/60 transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                        <Wifi className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white">Wi-Fi Grátis para Clientes</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-sky-500/20 text-sky-300">
                            QR Code
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">Conecte sem precisar digitar senha</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                        <Send className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black text-white block">
                          Atendimento no WhatsApp
                        </span>
                        <p className="text-[10px] text-slate-400">Fale direto com nossa equipe</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </a>

                  <a
                    href={config.instagramUrl || 'https://instagram.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl bg-pink-950/25 border border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <Radio className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white">Instagram Oficial</span>
                          {instaHandle && (
                            <span className="text-[10px] text-pink-300 font-bold">{instaHandle}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">Novidades, stories e bastidores</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </a>

                  {config.tiktokUrl && (
                    <a
                      href={config.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900 border border-rose-500/30 hover:border-rose-500/60 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black border border-rose-500/40 flex items-center justify-center text-white shadow-md">
                          <Sparkles className="w-4 h-4 text-rose-400" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-black text-white block">TikTok Oficial</span>
                          <p className="text-[10px] text-slate-400">{tiktokHandle || 'Vídeos e tendências'}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                    </a>
                  )}
                </div>
              </>
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
          <div className="mt-8 pt-4 border-t border-slate-800/80 text-center space-y-1 px-4">
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-bold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              <Radio className="w-2.5 h-2.5" style={{ color: primaryColor }} />
              Mini Página Inteligente 4K • NFC Hub
            </span>
            <p className="text-[9px] text-slate-500">
              &copy; {new Date().getFullYear()} {name}. Todos os direitos reservados.
            </p>
          </div>
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
      </div>
    );
  };

  // Standalone public page mode
  if (standalone) {
    return (
      <div className="min-h-screen bg-[#04070e] text-slate-100 flex flex-col items-center justify-start">
        {renderPhoneSimulator(true)}
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
            <span>Apresentar Mockup 4K</span>
          </button>

          <button
            onClick={() => setIs4KLibraryOpen(true)}
            className="px-3.5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Biblioteca 4K</span>
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Galeria ({READY_MINISITE_MOCKUPS.length})</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {READY_MINISITE_MOCKUPS.map((template) => {
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
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="text-center mb-2.5 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Simulador Interativo 4K • Navegue pelas Abas Internas
            </span>
          </div>
          {renderPhoneSimulator(false)}
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
              {READY_MINISITE_MOCKUPS.map((template) => {
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

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-950 text-white border border-slate-700 px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl z-50 flex items-center gap-2.5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
