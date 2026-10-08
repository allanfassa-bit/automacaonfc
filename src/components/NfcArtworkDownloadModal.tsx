import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  Sparkles,
  QrCode,
  CreditCard,
  Layers,
  CheckCircle,
  RefreshCw,
  FolderArchive,
  Eye,
  FileCheck,
  ShieldCheck,
  Check,
  Printer
} from 'lucide-react';
import { Lead } from '../App';
import {
  ArtworkTheme,
  generatePlate10x10DataUrl,
  generateCardNfcDataUrl,
  downloadPlate10x10Png,
  downloadCardNfcPng,
  downloadCompleteArtworkKitZip
} from '../utils/nfcPlateGenerator';
import { getDynamicQrUrl, getDirectLeadUrl } from '../utils/publicUrlHelper';
import { getPlateIdentification } from '../utils/plateNumberHelper';

interface NfcArtworkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  leads?: Lead[];
  onSelectDifferentLead?: (lead: Lead) => void;
  initialTheme?: ArtworkTheme;
  onMarkPrinted?: (leadId: string, currentStatus?: boolean) => void;
}

export function NfcArtworkDownloadModal({
  isOpen,
  onClose,
  lead,
  leads = [],
  onSelectDifferentLead,
  initialTheme = 'emerald_green',
  onMarkPrinted
}: NfcArtworkDownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'plate_10x10' | 'card_horizontal' | 'card_vertical'>('plate_10x10');
  const [selectedTheme, setSelectedTheme] = useState<ArtworkTheme>(initialTheme);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [autoMarkPrinted, setAutoMarkPrinted] = useState(true);

  // Active lead being customized
  const currentLead = lead || leads[0];
  const plateInfo = getPlateIdentification(currentLead?.id, currentLead?.name);

  // Choice between dynamic cloud link (changes anytime via system) vs direct destination
  const [qrTargetMode, setQrTargetMode] = useState<'direct' | 'dynamic'>('dynamic');

  const permanentUrl = currentLead
    ? (qrTargetMode === 'direct' ? getDirectLeadUrl(currentLead) : getDynamicQrUrl(currentLead.id))
    : (qrTargetMode === 'direct' ? 'https://maps.google.com' : getDynamicQrUrl('demo'));

  // Sync theme if initialTheme changes or lead has instagram configured
  useEffect(() => {
    if (initialTheme && initialTheme !== 'emerald_green') {
      setSelectedTheme(initialTheme);
    } else if (currentLead?.nfcRedirectActive === 'instagram' || (currentLead?.nfcInstagramUrl && currentLead.nfcInstagramUrl.length > 0)) {
      setSelectedTheme('instagram_dual');
    } else if (initialTheme) {
      setSelectedTheme(initialTheme);
    }
  }, [initialTheme, isOpen, currentLead]);

  // Generate preview whenever format, theme, lead, or qrTargetMode changes
  useEffect(() => {
    if (!isOpen || !currentLead) return;

    let isMounted = true;
    setIsLoadingPreview(true);

    const generatePreview = async () => {
      try {
        const options = {
          businessName: currentLead.name || 'Empresa Exemplo',
          leadId: currentLead.id || 'TAG01',
          permanentUrl,
          instagramUrl: currentLead.nfcInstagramUrl || '',
          instagramHandle: currentLead.nfcInstagramUrl ? currentLead.nfcInstagramUrl.replace(/.*instagram\.com\//, '').replace(/\/$/, '') : (currentLead.name || ''),
          theme: selectedTheme,
          city: currentLead.city || '',
          resolution: '4k' as const
        };

        let dataUrl = '';
        if (selectedFormat === 'plate_10x10') {
          dataUrl = await generatePlate10x10DataUrl(options);
        } else if (selectedFormat === 'card_horizontal') {
          dataUrl = await generateCardNfcDataUrl(options, 'horizontal');
        } else {
          dataUrl = await generateCardNfcDataUrl(options, 'vertical');
        }

        if (isMounted) {
          setPreviewDataUrl(dataUrl);
        }
      } catch (err) {
        console.error('Erro ao gerar preview de arte:', err);
      } finally {
        if (isMounted) {
          setIsLoadingPreview(false);
        }
      }
    };

    generatePreview();

    return () => {
      isMounted = false;
    };
  }, [isOpen, currentLead?.id, currentLead?.name, selectedFormat, selectedTheme, permanentUrl, qrTargetMode]);

  if (!isOpen || !currentLead) return null;

  const handleDownloadSingle = async () => {
    try {
      setIsDownloading(true);
      const options = {
        businessName: currentLead.name || 'Empresa Exemplo',
        leadId: currentLead.id || 'TAG01',
        permanentUrl,
        theme: selectedTheme,
        city: currentLead.city || '',
        instagramUrl: currentLead.nfcInstagramUrl || '',
        instagramHandle: currentLead.nfcInstagramUrl
          ? currentLead.nfcInstagramUrl.replace(/.*instagram\.com\//, '').replace(/\/$/, '')
          : (currentLead.name || ''),
        resolution: '4k' as const
      };

      if (selectedFormat === 'plate_10x10') {
        await downloadPlate10x10Png(options);
        setDownloadSuccessMsg('Placa 10x10cm baixada em altíssima definição (600 DPI Ultra-HD)!');
      } else if (selectedFormat === 'card_horizontal') {
        await downloadCardNfcPng(options, 'horizontal');
        setDownloadSuccessMsg('Cartão NFC Horizontal baixado em altíssima definição (600 DPI Ultra-HD)!');
      } else {
        await downloadCardNfcPng(options, 'vertical');
        setDownloadSuccessMsg('Cartão NFC Vertical baixado em altíssima definição (600 DPI Ultra-HD)!');
      }

      if (autoMarkPrinted && currentLead?.id && onMarkPrinted && !currentLead.isPlaquePrinted) {
        onMarkPrinted(currentLead.id, false);
      }

      setTimeout(() => setDownloadSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error('Erro ao baixar arte:', err);
      alert('Falha ao processar download da imagem: ' + (err.message || 'Tente novamente'));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadZipKit = async () => {
    try {
      setIsDownloading(true);
      const options = {
        businessName: currentLead.name || 'Empresa Exemplo',
        leadId: currentLead.id || 'TAG01',
        permanentUrl,
        theme: selectedTheme,
        city: currentLead.city || '',
        instagramUrl: currentLead.nfcInstagramUrl || '',
        instagramHandle: currentLead.nfcInstagramUrl
          ? currentLead.nfcInstagramUrl.replace(/.*instagram\.com\//, '').replace(/\/$/, '')
          : (currentLead.name || ''),
        resolution: '4k' as const
      };

      await downloadCompleteArtworkKitZip(options);
      setDownloadSuccessMsg('Kit Completo de Artes (.ZIP) baixado com sucesso!');

      if (autoMarkPrinted && currentLead?.id && onMarkPrinted && !currentLead.isPlaquePrinted) {
        onMarkPrinted(currentLead.id, false);
      }

      setTimeout(() => setDownloadSuccessMsg(null), 5000);
    } catch (err: any) {
      console.error('Erro ao baixar pacote ZIP:', err);
      alert('Falha ao gerar pacote ZIP: ' + (err.message || 'Tente novamente'));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Central de Impressão & Download de Artes HD</h3>
                <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800">
                  600 DPI Ultra-HD
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Baixe a placa 10x10cm e o cartão NFC 5.4x8.5cm já com o QR Code dinâmico do cliente incorporado.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Format, Theme & Lead Controls */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Lead Selector if multiple leads available */}
            {leads.length > 1 && onSelectDifferentLead && (
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                  Empresa / Estabelecimento Selecionado:
                </label>
                <select
                  value={currentLead.id}
                  onChange={(e) => {
                    const found = leads.find((l) => l.id === e.target.value);
                    if (found) onSelectDifferentLead(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-cyan-500"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} (ID: {l.id})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* QR Code Target Selector: Direct vs Dynamic Cloud */}
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tipo de Destino do QR Code:</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-normal">
                  {qrTargetMode === 'direct' ? '⚡ Direto (Sem intermediário)' : '🌐 Dinâmico na Nuvem'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setQrTargetMode('direct')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    qrTargetMode === 'direct'
                      ? 'border-emerald-500 bg-emerald-950/40 text-white ring-1 ring-emerald-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                      ⚡ Link Direto
                    </span>
                    {qrTargetMode === 'direct' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Grava o link final (Google 5★, Insta, etc.) direto no QR Code. Abre instantâneo no celular do cliente sem risco de tela de login!
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setQrTargetMode('dynamic')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    qrTargetMode === 'dynamic'
                      ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-cyan-400 flex items-center gap-1">
                      🌐 QR Dinâmico
                    </span>
                    {qrTargetMode === 'dynamic' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Grava o link curto público (/r/{currentLead.id}). Permite alterar o destino depois pelo painel sem precisar reimprimir a placa.
                  </p>
                </button>
              </div>

              <div className="text-[10px] bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono text-slate-300 break-all">
                <span className="text-slate-500 font-bold block mb-0.5 uppercase tracking-wider text-[9px]">URL impressa no QR Code:</span>
                {permanentUrl}
              </div>
            </div>

            {/* Format Selection (10x10 vs 5.4x8.5) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Escolha o Tamanho da Arte:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* 10x10 cm */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('plate_10x10')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedFormat === 'plate_10x10'
                      ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black">Placa 10x10 cm</span>
                    {selectedFormat === 'plate_10x10' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-[10px] block opacity-80">Quadrada • Balcão</span>
                  <span className="text-[9px] block text-cyan-300 font-mono mt-1">2400x2400px Ultra HD</span>
                </button>

                {/* 5.4 x 8.5 cm Horizontal */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('card_horizontal')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedFormat === 'card_horizontal'
                      ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black">Cartão 5.4x8.5</span>
                    {selectedFormat === 'card_horizontal' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-[10px] block opacity-80">Horizontal • CR80</span>
                  <span className="text-[9px] block text-cyan-300 font-mono mt-1">2040x1296px Ultra HD</span>
                </button>

                {/* 5.4 x 8.5 cm Vertical */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('card_vertical')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedFormat === 'card_vertical'
                      ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black">Cartão Vertical</span>
                    {selectedFormat === 'card_vertical' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className="text-[10px] block opacity-80">Vertical • 5.4x8.5</span>
                  <span className="text-[9px] block text-cyan-300 font-mono mt-1">1296x2040px Ultra HD</span>
                </button>
              </div>
            </div>

            {/* Theme Selector - All 5 identical themes from 3D Totem */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tema da Placa (Idêntico ao Totem 3D):</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'instagram_dual', name: '📸 Instagram + Google', desc: 'Modelo Real da Foto: Onda fluida, 2 QR Codes + 2 NFCs', badge: 'MOCKUP DA FOTO' },
                  { id: 'emerald_green', name: 'Verde Esmeralda', desc: 'Mockup Oficial Verde com fita esmeralda e ouro', badge: 'MOCKUP OFICIAL' },
                  { id: 'royal_blue', name: 'Azul Royal', desc: 'Mockup Oficial Azul com fita ciano e azul neon', badge: 'MOCKUP OFICIAL' },
                  { id: 'official_google', name: 'Preto Oficial', desc: 'Preto & Branco com onda Google colorida', badge: 'MOCKUP OFICIAL' },
                  { id: 'black_gold', name: 'Preto Piano & Ouro', desc: 'Preto nobre com detalhes 24K' },
                  { id: 'acrylic_crystal', name: 'Acrílico Cristal', desc: 'Vidro chanfrado branco clean' },
                  { id: 'cyber_neon', name: 'Cyber Neon LED', desc: 'Ciano elétrico com brilho LED' },
                  { id: 'rose_luxury', name: 'Rose Gold VIP', desc: 'Estética de luxo bronze rose' },
                  { id: 'gourmet_red', name: 'Veneza Gourmet', desc: 'Vinho nobre gastronômico' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setSelectedTheme(th.id as ArtworkTheme)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      selectedTheme === th.id
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-xs ring-1 ring-amber-400/50'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {th.badge && (
                      <span className="text-[7.5px] uppercase font-black bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded border border-amber-500/30 mb-1 inline-block">
                        {th.badge}
                      </span>
                    )}
                    <span className="text-xs block font-bold truncate">{th.name}</span>
                    <span className="text-[9px] block opacity-70 font-normal leading-tight mt-0.5">{th.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications Callout */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Link Permanente Gravado:</span>
                <span className="font-mono text-cyan-400 font-bold truncate max-w-[220px]">
                  {permanentUrl}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Identificador Físico no Adesivo:</span>
                <span className="text-slate-200 font-bold flex items-center gap-1.5">
                  <span className="bg-slate-800 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border border-slate-700">
                    {plateInfo.roman ? `Nº ${plateInfo.roman} (#${plateInfo.numStr})` : `Nº ${plateInfo.numStr || '01'}`}
                  </span>
                  <span className="text-[10px] text-slate-400">(Canto inferior esquerdo)</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Resolução Gráfica de Impressão:</span>
                <span className="text-amber-300 font-extrabold flex items-center gap-1.5">
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-black border border-amber-400/30">4K ULTRA-HD</span>
                  4000 x 4000 px (600 DPI)
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Fidelidade Visual:</span>
                <span className="text-emerald-400 font-bold">100% Idêntico ao Totem 3D Oficial</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadSingle}
                disabled={isDownloading || isLoadingPreview}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 active:scale-98 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processando Imagem Ultra HD...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>
                      Baixar Imagem Ultra HD (
                      {selectedFormat === 'plate_10x10'
                        ? 'Placa 10x10 cm • 2400x2400'
                        : selectedFormat === 'card_horizontal'
                        ? 'Cartão 5.4x8.5 cm • 2040x1296'
                        : 'Cartão Vertical • 1296x2040'}
                      )
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadZipKit}
                disabled={isDownloading || isLoadingPreview}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <FolderArchive className="w-4 h-4 text-cyan-400" />
                <span>Baixar Kit Gráfica Completo (.ZIP com Placa + Cartões + Manual)</span>
              </button>

              {/* Toggle de Marcação de Impressão */}
              <div className="flex items-center justify-between p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={autoMarkPrinted}
                    onChange={(e) => setAutoMarkPrinted(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-cyan-400 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="font-medium text-[11px]">Marcar placa como <strong className="text-emerald-400">"Já Impressa"</strong> ao baixar</span>
                </label>

                {currentLead && onMarkPrinted && (
                  <button
                    type="button"
                    onClick={() => onMarkPrinted(currentLead.id, currentLead.isPlaquePrinted)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                      currentLead.isPlaquePrinted
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700 hover:bg-emerald-900/60'
                        : 'bg-amber-950/60 text-amber-400 border-amber-700 hover:bg-amber-900/60'
                    }`}
                    title="Clique para alternar manualmente o status"
                  >
                    <Printer className="w-2.5 h-2.5" />
                    <span>{currentLead.isPlaquePrinted ? '✓ Impressa' : '🟡 Pendente'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Feedback message */}
            {downloadSuccessMsg && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{downloadSuccessMsg}</span>
              </div>
            )}

          </div>

          {/* Right Column: Live High-Definition Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between bg-slate-950 p-6 rounded-3xl border border-slate-800/80 min-h-[420px] relative">
            <div className="w-full flex items-center justify-between z-10 mb-2">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 bg-cyan-950/60 border border-cyan-800 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>100% Idêntico ao Totem 3D</span>
              </span>

              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="text-[10px] font-bold text-slate-400 hover:text-white px-2.5 py-1 bg-white/10 hover:bg-white/15 rounded-lg transition cursor-pointer"
              >
                {isZoomed ? '🔍 Ajustar à Tela' : '🔎 Zoom 100% (Ultra HD)'}
              </button>
            </div>

            {isLoadingPreview ? (
              <div className="flex flex-col items-center justify-center gap-2 text-slate-400 py-24 my-auto">
                <RefreshCw className="w-9 h-9 animate-spin text-cyan-400" />
                <span className="text-xs font-semibold">Renderizando Canvas Ultra HD em 300+ DPI...</span>
              </div>
            ) : previewDataUrl ? (
              <div className="flex flex-col items-center gap-3 my-auto w-full">
                <div
                  className={`bg-black/50 p-2 rounded-2xl shadow-2xl border border-white/15 flex items-center justify-center max-w-full transition-all ${
                    isZoomed
                      ? 'max-h-[440px] overflow-auto'
                      : 'overflow-hidden'
                  } ${
                    selectedFormat === 'plate_10x10'
                      ? isZoomed ? 'w-[480px]' : 'w-[280px] sm:w-[320px] aspect-square'
                      : selectedFormat === 'card_horizontal'
                      ? isZoomed ? 'w-[520px]' : 'w-[320px] sm:w-[360px] aspect-[8.5/5.4]'
                      : isZoomed ? 'w-[380px]' : 'w-[220px] sm:w-[250px] aspect-[5.4/8.5]'
                  }`}
                >
                  <img
                    src={previewDataUrl}
                    alt="Artwork Preview"
                    className="w-full h-full object-contain rounded-xl drop-shadow-2xl"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>

                <div className="text-center space-y-1 mt-2">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    <CheckCircle className="w-3 h-3" />
                    <span>
                      {selectedFormat === 'plate_10x10'
                        ? 'Placa 10x10 cm • 2400 x 2400 px Ultra HD'
                        : selectedFormat === 'card_horizontal'
                        ? 'Cartão CR80 Horizontal • 2040 x 1296 px Ultra HD'
                        : 'Cartão CR80 Vertical • 1296 x 2040 px Ultra HD'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Com parafusos afastadores metálicos, beacon NFC e insígnia Google oficiais
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-slate-500 my-auto">Selecione uma empresa para gerar o preview</span>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 text-center flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>ALF Automação • Produção Gráfica e NFC Inteligente</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
