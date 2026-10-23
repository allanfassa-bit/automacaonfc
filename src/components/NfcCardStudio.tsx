import React, { useState, useEffect, useRef } from 'react';
import {
  CreditCard,
  QrCode,
  Sparkles,
  Download,
  Share2,
  ExternalLink,
  Plus,
  CheckCircle,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  Layers,
  Upload,
  FolderArchive,
  RefreshCw,
  Search,
  Building2,
  Phone,
  Instagram,
  Zap,
  ShieldCheck,
  Globe,
  Trash2,
  Edit2
} from 'lucide-react';
import { Lead } from '../App';
import {
  generateModelo01FrontDataUrl,
  generateModelo01BackDataUrl,
  generateModelo01DualDataUrl,
  downloadCardNfcFrontPng,
  downloadCardNfcBackPng,
  downloadCardNfcDualPng,
  downloadCardCompleteKitZip,
  getStoredCardTemplate,
  setStoredCardTemplate,
  ArtworkOptions
} from '../utils/nfcPlateGenerator';
import { getPublicAppOrigin, sanitizePublicUrl } from '../utils/publicUrlHelper';

export interface CardClientItem {
  id: string;
  name: string;
  roleOrNiche?: string;
  city?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  pixKey?: string;
  qrDestinationType: 'cartao_virtual' | 'google_review' | 'whatsapp' | 'instagram' | 'minisite' | 'custom';
  customUrl?: string;
  googleMapsUrl?: string;
  isPrinted?: boolean;
  createdAt: string;
}

export interface NfcCardStudioProps {
  leads: Lead[];
  onAddNewLead?: (lead: Partial<Lead>) => void;
  onUpdateLead?: (id: string, updates: Partial<Lead>) => void;
}

export const NfcCardStudio: React.FC<NfcCardStudioProps> = ({
  leads,
  onAddNewLead,
  onUpdateLead
}) => {
  // Stored card clients (merges leads with productType='card' or isCardClient, plus card clients in localStorage)
  const [localCardClients, setLocalCardClients] = useState<CardClientItem[]>(() => {
    try {
      const stored = localStorage.getItem('alf_card_clients_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [];
  });

  // Selected client ID
  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    return leads[0]?.id || 'card_demo_01';
  });

  // Active preview side
  const [activeSide, setActiveSide] = useState<'front' | 'back' | 'both'>('front');

  // Preview data URLs
  const [frontPreviewUrl, setFrontPreviewUrl] = useState<string>('');
  const [backPreviewUrl, setBackPreviewUrl] = useState<string>('');
  const [dualPreviewUrl, setDualPreviewUrl] = useState<string>('');
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(true);

  // Template upload state
  const [hasCustomFront, setHasCustomFront] = useState<boolean>(false);
  const [hasCustomBack, setHasCustomBack] = useState<boolean>(false);

  // Export loading state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // New Client Modal
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState<boolean>(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientRole, setNewClientRole] = useState('');
  const [newClientCity, setNewClientCity] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientInsta, setNewClientInsta] = useState('');
  const [newClientPix, setNewClientPix] = useState('');
  const [newClientDest, setNewClientDest] = useState<'cartao_virtual' | 'google_review' | 'whatsapp' | 'instagram' | 'minisite' | 'custom'>('cartao_virtual');
  const [newClientCustomUrl, setNewClientCustomUrl] = useState('');

  // 3D Tilt State
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0, glossX: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Phone simulation
  const [isSimulatingPhone, setIsSimulatingPhone] = useState<boolean>(false);

  // Check stored template images on mount
  useEffect(() => {
    setHasCustomFront(!!getStoredCardTemplate('front'));
    setHasCustomBack(!!getStoredCardTemplate('back'));
  }, []);

  // Save local card clients
  useEffect(() => {
    try {
      localStorage.setItem('alf_card_clients_list', JSON.stringify(localCardClients));
    } catch (_) {}
  }, [localCardClients]);

  // Find the selected client (from leads or local card clients)
  const currentLeadObj = leads.find(l => l.id === selectedClientId);
  const currentLocalClient = localCardClients.find(c => c.id === selectedClientId);

  const clientName = currentLocalClient?.name || currentLeadObj?.name || 'MEU CARTÃO';
  const clientNiche = currentLocalClient?.roleOrNiche || currentLeadObj?.niche || 'Cartão NFC Inteligente';
  const clientCity = currentLocalClient?.city || currentLeadObj?.city || 'Brasil';
  const clientPhone = currentLocalClient?.whatsapp || currentLocalClient?.phone || currentLeadObj?.nfcWhatsappNum || currentLeadObj?.phone || '';
  const clientInsta = currentLocalClient?.instagram || currentLeadObj?.nfcInstagramUrl || '';
  const clientPix = currentLocalClient?.pixKey || '';

  // Determine the effective QR destination URL
  const appOrigin = getPublicAppOrigin();
  const effectivePermanentUrl = (() => {
    if (currentLocalClient) {
      if (currentLocalClient.qrDestinationType === 'cartao_virtual') {
        return `${appOrigin}/?cartao=${encodeURIComponent(currentLocalClient.id)}`;
      }
      if (currentLocalClient.qrDestinationType === 'google_review' && currentLocalClient.googleMapsUrl) {
        return sanitizePublicUrl(currentLocalClient.googleMapsUrl);
      }
      if (currentLocalClient.qrDestinationType === 'whatsapp' && currentLocalClient.whatsapp) {
        const cleanPhone = currentLocalClient.whatsapp.replace(/\D/g, '');
        return `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}`;
      }
      if (currentLocalClient.qrDestinationType === 'instagram' && currentLocalClient.instagram) {
        const handle = currentLocalClient.instagram.replace(/.*instagram\.com\//, '').replace(/^@/, '').replace(/\/$/, '');
        return `https://instagram.com/${handle}`;
      }
      if (currentLocalClient.qrDestinationType === 'custom' && currentLocalClient.customUrl) {
        return sanitizePublicUrl(currentLocalClient.customUrl);
      }
      return `${appOrigin}/?cartao=${encodeURIComponent(currentLocalClient.id)}`;
    }

    // Default for lead
    if (currentLeadObj?.nfcRedirectActive === 'gmb' && currentLeadObj.googleMapsUrl) {
      return sanitizePublicUrl(currentLeadObj.googleMapsUrl);
    }
    if (currentLeadObj?.nfcRedirectActive === 'instagram' && currentLeadObj.nfcInstagramUrl) {
      return sanitizePublicUrl(currentLeadObj.nfcInstagramUrl);
    }
    return `${appOrigin}/?cartao=${encodeURIComponent(selectedClientId)}`;
  })();

  // Regenerate previews whenever client or activeSide changes
  useEffect(() => {
    let isCancelled = false;
    const generate = async () => {
      setIsLoadingPreview(true);
      try {
        const options: ArtworkOptions = {
          businessName: clientName,
          leadId: selectedClientId,
          niche: clientNiche,
          city: clientCity,
          phone: clientPhone,
          whatsapp: clientPhone,
          instagramUrl: clientInsta,
          permanentUrl: effectivePermanentUrl,
          cardTemplate: 'modelo01_cyber_emerald'
        };

        const [front, back] = await Promise.all([
          generateModelo01FrontDataUrl(options),
          generateModelo01BackDataUrl(options)
        ]);

        if (!isCancelled) {
          setFrontPreviewUrl(front);
          setBackPreviewUrl(back);
        }
      } catch (err) {
        console.error('Falha ao gerar preview do cartão:', err);
      } finally {
        if (!isCancelled) setIsLoadingPreview(false);
      }
    };

    generate();
    return () => {
      isCancelled = true;
    };
  }, [selectedClientId, clientName, clientNiche, clientCity, clientPhone, clientInsta, effectivePermanentUrl, hasCustomFront, hasCustomBack]);

  // Handle Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -22;
    const rotateY = ((x / rect.width) - 0.5) * 22;
    const glossX = ((x / rect.width) * 100);
    setTiltStyle({ rotateX, rotateY, glossX });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0, glossX: 50 });
  };

  // Upload Custom Background Image (Frente / Trás)
  const handleFileUpload = (side: 'front' | 'back', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        setStoredCardTemplate(side, base64);
        if (side === 'front') setHasCustomFront(true);
        if (side === 'back') setHasCustomBack(true);
        setExportSuccessMsg(`Imagem original ${side === 'front' ? 'da Frente' : 'do Verso'} carregada com sucesso! O QR Code dinâmico será sobreposto.`);
        setTimeout(() => setExportSuccessMsg(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetTemplates = () => {
    if (confirm('Deseja restaurar para o renderizador vetorial Ultra-HD padrão?')) {
      localStorage.removeItem('alf_cartao_front_template');
      localStorage.removeItem('alf_cartao_back_template');
      setHasCustomFront(false);
      setHasCustomBack(false);
      setExportSuccessMsg('Templates restaurados para o renderizador Ultra-HD nativo.');
      setTimeout(() => setExportSuccessMsg(null), 3000);
    }
  };

  // Downloads
  const getArtworkOptions = (): ArtworkOptions => ({
    businessName: clientName,
    leadId: selectedClientId,
    niche: clientNiche,
    city: clientCity,
    phone: clientPhone,
    whatsapp: clientPhone,
    instagramUrl: clientInsta,
    permanentUrl: effectivePermanentUrl,
    cardTemplate: 'modelo01_cyber_emerald'
  });

  const handleDownloadFront = async () => {
    try {
      setIsExporting(true);
      await downloadCardNfcFrontPng(getArtworkOptions(), 'horizontal');
      setExportSuccessMsg('Frente do Cartão (Modelo 01) baixada em 600 DPI Ultra-HD!');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (e: any) {
      alert('Erro ao baixar: ' + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadBack = async () => {
    try {
      setIsExporting(true);
      await downloadCardNfcBackPng(getArtworkOptions(), 'horizontal');
      setExportSuccessMsg('Verso com QR Code Dinâmico baixado em 600 DPI Ultra-HD!');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (e: any) {
      alert('Erro ao baixar: ' + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadDual = async () => {
    try {
      setIsExporting(true);
      await downloadCardNfcDualPng(getArtworkOptions());
      setExportSuccessMsg('Gabarito Duplo (Frente + Verso para Gráfica) baixado em 600 DPI Ultra-HD!');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (e: any) {
      alert('Erro ao baixar: ' + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      await downloadCardCompleteKitZip(getArtworkOptions());
      setExportSuccessMsg('Kit Completo do Cartão NFC (.ZIP com Frente + Verso + Gabarito + Manual CR80) baixado!');
      setTimeout(() => setExportSuccessMsg(null), 4000);
    } catch (e: any) {
      alert('Erro ao baixar: ' + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(effectivePermanentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Create New Card Client
  const handleSaveNewClient = () => {
    if (!newClientName.trim()) {
      alert('Por favor, informe o nome do cliente ou da empresa.');
      return;
    }
    const newId = 'card_' + Date.now().toString(36);
    const newClient: CardClientItem = {
      id: newId,
      name: newClientName.trim(),
      roleOrNiche: newClientRole.trim() || 'Cartão NFC Exclusivo',
      city: newClientCity.trim() || 'Brasil',
      phone: newClientPhone.trim(),
      whatsapp: newClientPhone.trim(),
      instagram: newClientInsta.trim(),
      pixKey: newClientPix.trim(),
      qrDestinationType: newClientDest,
      customUrl: newClientCustomUrl.trim(),
      createdAt: new Date().toISOString()
    };

    setLocalCardClients(prev => [newClient, ...prev]);
    setSelectedClientId(newId);
    setIsNewClientModalOpen(false);

    // Also trigger lead creation if hook available
    if (onAddNewLead) {
      onAddNewLead({
        id: newId,
        name: newClient.name,
        niche: newClient.roleOrNiche,
        city: newClient.city,
        phone: newClient.phone,
        nfcWhatsappNum: newClient.phone,
        nfcInstagramUrl: newClient.instagram,
        stage: 'won',
        productType: 'card',
        address: ''
      });
    }

    // Reset form
    setNewClientName('');
    setNewClientRole('');
    setNewClientCity('');
    setNewClientPhone('');
    setNewClientInsta('');
    setNewClientPix('');
    setNewClientCustomUrl('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner: Modelo Oficial 01 Cyber Emerald */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                MODELO OFICIAL 01 • CYBER EMERALD ALF
              </span>
              <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                Frente Metálica + Verso com QR Dinâmico
              </span>
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full text-[10px] font-bold">
                Padrão Internacional CR80 (85.6 x 53.98 mm)
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Estúdio Exclusivo de Cartões de Visita NFC</span>
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Gere o cartão de visita NFC em <strong>600 DPI Ultra-HD</strong> seguindo rigorosamente o design oficial: frente com efeito titânio escovado, relevo metálico e chip contactless, e verso com <strong>QR Code dinâmico gerado exclusivamente para cada cliente</strong> dentro da moldura neon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsNewClientModalOpen(true)}
              className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>+ Novo Cliente Exclusivo de Cartão</span>
            </button>
          </div>
        </div>
      </div>

      {exportSuccessMsg && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{exportSuccessMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setExportSuccessMsg(null)}
            className="text-emerald-400 hover:text-white text-xs px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Control Panel (Left) + Interactive 3D Stage (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Client Selector & Configuration */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Card Client Selector */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Cliente Ativo do Cartão</span>
              </label>
              <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                {localCardClients.length + leads.length} Cadastrados
              </span>
            </div>

            <div className="space-y-2">
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-800 transition"
              >
                <optgroup label="✨ Clientes Exclusivos de Cartão NFC">
                  {localCardClients.map(c => (
                    <option key={c.id} value={c.id}>
                      💳 {c.name} ({c.roleOrNiche || 'Cartão NFC'})
                    </option>
                  ))}
                  {localCardClients.length === 0 && (
                    <option disabled value="">Nenhum cliente exclusivo cadastrado ainda</option>
                  )}
                </optgroup>
                <optgroup label="🏢 Empresas da Base de Prospecção">
                  {leads.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.name} - {l.city || 'Brasil'}
                    </option>
                  ))}
                </optgroup>
              </select>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                💡 O QR Code no verso do cartão é gerado <strong>automaticamente e de forma exclusiva</strong> para o cliente selecionado.
              </p>
            </div>

            {/* Current Client Badge Preview */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold text-[11px]">
                  ID: {selectedClientId.substring(0, 10).toUpperCase()}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-black uppercase">
                  Modelo 01 Cyber
                </span>
              </div>
              <h3 className="text-base font-black text-white truncate">{clientName}</h3>
              <p className="text-xs text-slate-300 truncate">{clientNiche} • {clientCity}</p>

              {/* Dynamic QR Destination Link */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Link Gravado no QR & NFC:</span>
                  <p className="text-[10.5px] font-mono text-emerald-300 truncate">{effectivePermanentUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Template Images Uploader (To use exact high-res images) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-cyan-600" />
                <span>Imagens Originais do Modelo 01</span>
              </label>
              {(hasCustomFront || hasCustomBack) && (
                <button
                  type="button"
                  onClick={handleResetTemplates}
                  className="text-[10px] text-rose-600 hover:underline font-bold"
                >
                  Restaurar Vetorial
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Você pode fazer o upload das imagens originais em alta definição (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono text-[10px]">cartao frente modelo01.jpg</code> e <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono text-[10px]">cartao tras modelo01.jpg</code>). O sistema usará os arquivos exatos e aplicará o QR Code dinâmico do cliente sobre a moldura neon.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <label className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 bg-slate-50 hover:bg-emerald-50/30">
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold text-slate-700">Subir Frente</span>
                <span className="text-[9px] text-slate-400">{hasCustomFront ? '✓ Imagem Ativa' : 'Padrão Vetorial'}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('front', file);
                  }}
                />
              </label>

              <label className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1 bg-slate-50 hover:bg-emerald-50/30">
                <Upload className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold text-slate-700">Subir Trás</span>
                <span className="text-[9px] text-slate-400">{hasCustomBack ? '✓ Imagem Ativa' : 'Padrão Vetorial'}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('back', file);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Quick Download Suite */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Downloads Gráficos em 600 DPI Ultra-HD</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadFront}
                disabled={isExporting}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Frente Ultra-HD</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadBack}
                disabled={isExporting}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verso com QR Dinâmico</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownloadDual}
              disabled={isExporting}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Baixar Gabarito Duplo (Frente + Verso para Gráfica)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <FolderArchive className="w-4 h-4 text-emerald-200" />
              )}
              <span>Baixar Kit Gráfico Completo (.ZIP com Manual CR80)</span>
            </button>
          </div>

        </div>

        {/* Right Column: 3D Photorealistic Stage & Interactive Controls */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-radial from-slate-900 via-slate-950 to-neutral-950 p-6 md:p-10 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl min-h-[640px]">
          
          {/* Ambient Lighting & Backdrop Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Stage Top Bar: Side Switcher & Flip */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 z-20 mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => setActiveSide('front')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  activeSide === 'front'
                    ? 'bg-emerald-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Frente (Design & Contactless)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSide('back')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 cursor-pointer ${
                  activeSide === 'back'
                    ? 'bg-emerald-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Verso (QR Code Dinâmico)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSide('both')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  activeSide === 'both'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Ambos Lado a Lado</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveSide(prev => prev === 'front' ? 'back' : 'front')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="Girar Cartão para o outro lado"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Girar 3D</span>
              </button>

              <a
                href={effectivePermanentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1"
                title="Testar URL de destino do QR Code"
              >
                <span>Testar Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3D Scene Viewport */}
          <div className="relative w-full flex items-center justify-center py-4 perspective-1000 z-10">
            {isLoadingPreview ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                <span className="text-xs font-bold">Renderizando Cartão em 600 DPI...</span>
              </div>
            ) : activeSide === 'both' ? (
              /* DUAL SIDE-BY-SIDE VIEW */
              <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="space-y-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    FRENTE • DESIGN & CONTACTLESS
                  </span>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30">
                    <img src={frontPreviewUrl} alt="Frente Modelo 01" className="w-full object-contain" />
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                    VERSO • QR CODE DINÂMICO EXCLUSIVO
                  </span>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
                    <img src={backPreviewUrl} alt="Verso Modelo 01" className="w-full object-contain" />
                  </div>
                </div>
              </div>
            ) : (
              /* SINGLE INTERACTIVE 3D CARD */
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveSide(prev => prev === 'front' ? 'back' : 'front')}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
                className="relative w-full max-w-[440px] aspect-[1.5852/1] rounded-3xl overflow-hidden shadow-2xl border border-emerald-400/30 cursor-pointer select-none group"
              >
                {/* Specular gloss sheen layer */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-30"
                  style={{
                    background: `linear-gradient(${tiltStyle.glossX + 45}deg, transparent 35%, rgba(255,255,255,0.7) 50%, transparent 65%)`,
                  }}
                />

                <img
                  src={activeSide === 'front' ? frontPreviewUrl : backPreviewUrl}
                  alt={activeSide === 'front' ? 'Frente' : 'Verso'}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-3 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition-opacity z-40">
                  <span className="px-3 py-1 bg-black/80 text-emerald-300 text-[10px] font-bold rounded-full backdrop-blur-md border border-emerald-400/30 shadow-lg">
                    👆 Clique para girar para o {activeSide === 'front' ? 'Verso' : 'Frente'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="z-10 mt-6 text-center max-w-md">
            <p className="text-xs text-slate-400">
              💡 <strong>Dica de Impressão Gráfica:</strong> Ambos os arquivos já são gerados com a proporção exata do cartão PVC bancário (85.60 mm x 53.98 mm) com resolução de <strong>600 DPI reais</strong> e margens de corte prontas para enviar à gráfica.
            </p>
          </div>

        </div>

      </div>

      {/* MODAL: Register New Independent Card Client */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">Cadastrar Novo Cliente de Cartão</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewClientModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Nome do Cliente / Empresa *
                </label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Ex: Dra. Ana Paula ou Tech Soluções"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Cargo / Nicho
                  </label>
                  <input
                    type="text"
                    value={newClientRole}
                    onChange={(e) => setNewClientRole(e.target.value)}
                    placeholder="Ex: Médica Dermatologista"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={newClientCity}
                    onChange={(e) => setNewClientCity(e.target.value)}
                    placeholder="Ex: São Paulo - SP"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Instagram (@perfil)
                  </label>
                  <input
                    type="text"
                    value={newClientInsta}
                    onChange={(e) => setNewClientInsta(e.target.value)}
                    placeholder="@perfil"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Chave Pix (opcional para o Cartão Virtual)
                </label>
                <input
                  type="text"
                  value={newClientPix}
                  onChange={(e) => setNewClientPix(e.target.value)}
                  placeholder="Chave Pix do cliente"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Destino do QR Code & Chip NFC *
                </label>
                <select
                  value={newClientDest}
                  onChange={(e: any) => setNewClientDest(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-emerald-500 focus:outline-hidden"
                >
                  <option value="cartao_virtual">📱 Cartão de Visita Virtual ALF (.VCF + Pix + Redes)</option>
                  <option value="google_review">⭐ Avaliação Google 5 Estrelas</option>
                  <option value="whatsapp">💬 WhatsApp Direto</option>
                  <option value="instagram">📸 Instagram Oficial</option>
                  <option value="custom">🔗 Link Livre Personalizado</option>
                </select>
              </div>

              {newClientDest === 'custom' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    URL Personalizada
                  </label>
                  <input
                    type="text"
                    value={newClientCustomUrl}
                    onChange={(e) => setNewClientCustomUrl(e.target.value)}
                    placeholder="https://exemplo.com.br"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNewClientModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveNewClient}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black cursor-pointer shadow-md"
              >
                Salvar & Gerar Cartão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
