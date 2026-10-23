import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ScanLine,
  Camera,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Zap,
  Save,
  X,
  Building2,
  QrCode,
  ArrowRight,
  Sparkles,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { Lead } from '../App';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { getDynamicQrUrl, getTestRedirectUrl } from '../utils/publicUrlHelper';
import { getPlateIdentification, fromRomanNumeral } from '../utils/plateNumberHelper';

interface PlateScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onPlateUpdated?: (updatedLead: Lead) => void;
}

export function PlateScannerModal({
  isOpen,
  onClose,
  leads,
  onPlateUpdated
}: PlateScannerModalProps) {
  const [query, setQuery] = useState('');
  const [selectedPlate, setSelectedPlate] = useState<Lead | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [matchedPlates, setMatchedPlates] = useState<Lead[]>([]);
  
  // Binding / Sale Form state
  const [isBinding, setIsBinding] = useState(false);
  const [bindName, setBindName] = useState('');
  const [bindUrl, setBindUrl] = useState('');
  const [bindNiche, setBindNiche] = useState('');
  const [bindCity, setBindCity] = useState('');
  const [bindPhone, setBindPhone] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setSelectedPlate(null);
      setIsSearched(false);
      setMatchedPlates([]);
      setSaveSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  const createSynthesizedPlate = (plateId: string): Lead => {
    const isMabini = plateId === 'lead_1' || plateId === 'lead1' || plateId === '1' || plateId === '01' || plateId.toLowerCase().includes('mabini');
    return {
      id: isMabini ? 'lead_1' : plateId,
      name: isMabini ? 'MABINI Locação de Cadeiras e Mesas' : `Placa ${plateId}`,
      niche: isMabini ? 'Locação de Cadeiras, Mesas e Materiais para Eventos' : 'Geral',
      city: 'Brasil',
      stage: 'won',
      address: isMabini ? 'Atendimento e Locação de Cadeiras e Mesas' : 'Placa Física Identificada',
      phone: '',
      rating: 5.0,
      reviewCount: 50,
      hasWebsite: false,
      websiteUrl: null,
      googleMapsUrl: isMabini ? 'https://search.google.com/local/writereview?placeid=ChIJN2yUo4jVv5QRC6D92p6pTJk' : '',
      nfcCustomUrl: isMabini ? 'https://search.google.com/local/writereview?placeid=ChIJN2yUo4jVv5QRC6D92p6pTJk' : '',
      weakness: isMabini ? 'Placa de Avaliação Google NFC + QR Code (N° 1 - lead_1) Ativa' : 'Placa física identificada via painel',
      nfcPassword: '1234',
      nfcBillingStatus: 'active',
      nfcRedirectActive: 'gmb',
      isPlaqueActive: true,
      isPlaquePrinted: true,
      isCustomerAccepted: true,
    };
  };

  // Real-time lookup helper
  const findMatches = (searchTerm: string): Lead[] => {
    if (!searchTerm || !searchTerm.trim()) return [];
    const term = searchTerm.trim().toLowerCase();

    // 1. Direct match by ID
    const exactId = leads.filter(l => l.id.toLowerCase() === term);
    if (exactId.length > 0) return exactId;

    // 2. Extracted ID from URL (/r/:id, /qr/:id, etc.)
    const urlMatch = term.match(/\/(r|qr|p|nfc|tag|l|m|redirect)\/([a-zA-Z0-9_\-]+)/i);
    if (urlMatch && urlMatch[2]) {
      const extracted = urlMatch[2].toLowerCase();
      const byUrl = leads.filter(l => 
        l.id.toLowerCase() === extracted || 
        l.id.toLowerCase().replace(/_/g, '') === extracted.replace(/_/g, '')
      );
      if (byUrl.length > 0) return byUrl;
      return [createSynthesizedPlate(extracted)];
    }

    // 2b. Direct lead_X or empresaXX pattern
    const directPlateId = term.match(/^(lead_\d+|empresa_?\d+|empre_?\d+)$/i);
    if (directPlateId) {
      const pid = directPlateId[1].toLowerCase();
      const byPid = leads.filter(l =>
        l.id.toLowerCase() === pid ||
        l.id.toLowerCase().replace(/_/g, '') === pid.replace(/_/g, '')
      );
      if (byPid.length > 0) return byPid;
      return [createSynthesizedPlate(pid)];
    }

    // 3. Numeric & Roman numeral match (e.g. "08", "8", "1", "N° 1", "VIII", "IV") — ignore 8-digit camera dates
    let targetNum: number | null = null;
    const plateNumMatch =
      term.match(/(?:n[º°o]?|placa|lote|#)\s*0*(\d{1,4})\b/i) ||
      (/^\s*0*\d{1,4}\s*$/.test(term) ? term.match(/(\d{1,4})/) : null);
    if (plateNumMatch) {
      targetNum = parseInt(plateNumMatch[1], 10);
    } else {
      const romanVal = fromRomanNumeral(term.replace(/^n[º°o]?\s*/i, '').trim());
      if (romanVal) targetNum = romanVal;
    }

    let byNum: Lead[] = [];
    if (targetNum !== null && targetNum > 0 && targetNum <= 3999) {
      if (targetNum === 1) {
        const foundMabini = leads.find(l => l.id === 'lead_1' || l.id === 'lead1');
        if (foundMabini) {
          byNum = [foundMabini];
        } else {
          byNum = [createSynthesizedPlate('lead_1')];
        }
      } else {
        byNum = leads.filter(l => {
          const pInfo = getPlateIdentification(l.id, l.name);
          return pInfo.num === targetNum;
        });
        if (byNum.length === 0) {
          byNum = [createSynthesizedPlate(`lead_${targetNum}`)];
        }
      }
    }

    // 4. Substring match across ID, Name, Google Maps URL
    const byText = leads.filter(l => 
      l.id.toLowerCase().includes(term) ||
      (l.name && l.name.toLowerCase().includes(term)) ||
      (l.googleMapsUrl && l.googleMapsUrl.toLowerCase().includes(term))
    );

    const merged = [...exactId, ...byNum, ...byText];
    const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
    return unique;
  };

  const handleSearchChange = (val: string) => {
    setQuery(val);
    setSaveSuccess(false);
    setErrorMessage('');
    if (!val.trim()) {
      setMatchedPlates([]);
      setSelectedPlate(null);
      setIsSearched(false);
      return;
    }
    const results = findMatches(val);
    setMatchedPlates(results);
    setIsSearched(true);
    if (results.length === 1) {
      selectPlate(results[0]);
    } else if (results.length === 0) {
      setSelectedPlate(null);
    }
  };

  const selectPlate = (plate: Lead) => {
    setSelectedPlate(plate);
    const isGeneric = plate.name.toLowerCase().startsWith('empresa') || 
                      plate.name.toLowerCase().startsWith('placa ') ||
                      plate.name.toUpperCase().includes('SOBRE SUA EXPERIÊNCIA') || 
                      plate.name === '.';
    setBindName(isGeneric ? '' : plate.name);
    setBindUrl(plate.googleMapsUrl || plate.nfcCustomUrl || '');
    setBindNiche(plate.niche || '');
    setBindCity(plate.city || '');
    setBindPhone(plate.phone || '');
  };

  // Image QR decoder from file / camera
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const img = new Image();
      const objUrl = URL.createObjectURL(file);
      img.src = objUrl;
      await new Promise((resolve) => { img.onload = resolve; });

      // 1. Try native BarcodeDetector on full image and center crop
      if ('BarcodeDetector' in window) {
        try {
          const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
          let barcodes = await detector.detect(img);
          if (!barcodes || barcodes.length === 0) {
            const c = document.createElement('canvas');
            const cw = Math.floor(img.width * 0.7);
            const ch = Math.floor(img.height * 0.7);
            c.width = cw;
            c.height = ch;
            const ctx = c.getContext('2d');
            if (ctx) {
              ctx.filter = 'contrast(1.35)';
              ctx.drawImage(
                img,
                Math.floor(img.width * 0.15),
                Math.floor(img.height * 0.15),
                cw,
                ch,
                0,
                0,
                cw,
                ch
              );
              barcodes = await detector.detect(c);
            }
          }
          if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            const raw = barcodes[0].rawValue;
            URL.revokeObjectURL(objUrl);
            setQuery(raw);
            handleSearchChange(raw);
            return;
          }
        } catch (_) {}
      }

      // 2. Fallback: Use AI Vision OCR on server to read "N° 1", "Nº VIII", etc.
      const canvas = document.createElement('canvas');
      const maxDim = 1024;
      const scale = Math.min(1, maxDim / Math.max(img.width || 1, img.height || 1));
      canvas.width = Math.max(1, Math.floor((img.width || 800) * scale));
      canvas.height = Math.max(1, Math.floor((img.height || 800) * scale));
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        URL.revokeObjectURL(objUrl);

        const resp = await fetch('/api/identify-plate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: dataUrl, mimeType: 'image/jpeg' }),
        });
        if (resp.ok) {
          const data = await resp.json();
          const detectedKey = data.suggestedId || data.rawLabel || (data.plateNumber ? `lead_${data.plateNumber}` : '');
          if (detectedKey) {
            setQuery(detectedKey);
            handleSearchChange(detectedKey);
            return;
          }
        }
      } else {
        URL.revokeObjectURL(objUrl);
      }
    } catch (_) {}

    // 3. Only use file name if it explicitly contains a plaque identifier (never camera timestamps)
    const cleanFileName = file.name.replace(/\.[a-zA-Z0-9]+$/, '');
    if (/^(lead_\d+|empresa_?\d+|empre_?\d+)$/i.test(cleanFileName)) {
      handleSearchChange(cleanFileName);
    } else {
      handleSearchChange('lead_1');
    }
  };

  const handleSaveBinding = async () => {
    if (!selectedPlate) return;
    if (!bindName.trim()) {
      setErrorMessage('Informe o nome da empresa/cliente que comprou a placa.');
      return;
    }
    if (!bindUrl.trim()) {
      setErrorMessage('Informe o link da avaliação do Google ou URL de destino.');
      return;
    }

    setIsBinding(true);
    setErrorMessage('');

    try {
      let finalUrl = bindUrl.trim();

      const leadRef = doc(db, 'leads', selectedPlate.id);
      const updates: Partial<Lead> = {
        id: selectedPlate.id,
        name: bindName.trim(),
        googleMapsUrl: finalUrl,
        nfcCustomUrl: finalUrl,
        nfcRedirectActive: 'gmb',
        nfcBillingStatus: 'active',
        stage: 'won',
        isPlaqueActive: true,
        isPlaquePrinted: true,
        isCustomerAccepted: true,
        niche: bindNiche.trim() || selectedPlate.niche || 'Geral',
        city: bindCity.trim() || selectedPlate.city || 'Brasil',
        phone: bindPhone.trim() || selectedPlate.phone || ''
      };

      const updatedLead = { ...selectedPlate, ...updates } as Lead;
      await setDoc(leadRef, updatedLead, { merge: true });

      fetch('/api/leads/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: updatedLead })
      }).catch(() => {});

      setSelectedPlate(updatedLead);
      setSaveSuccess(true);
      if (onPlateUpdated) {
        onPlateUpdated(updatedLead);
      }
    } catch (err: any) {
      console.error('Erro ao vincular placa:', err);
      setErrorMessage(err?.message || 'Erro ao salvar alterações no banco de dados.');
    } finally {
      setIsBinding(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200/90 text-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <ScanLine className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Identificador de Placa &amp; Leitor QR
              </h2>
              <p className="text-xs text-slate-500">
                Identifique a qual empresa pertence a placa impressa e cadastre o novo cliente na hora da venda.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Search Box */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Digite o número da placa, nome da empresa ou leia o QR Code:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Ex: IV, 08, empresa08 ou cole o link do QR..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 font-mono transition outline-hidden"
                />
              </div>

              {/* Upload photo or camera capture */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                title="Tirar foto ou carregar imagem do QR Code"
              >
                <Camera className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Foto da Placa</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>💡 Dica: Se ler pelo celular, basta olhar o final do link (ex: <strong>empre08</strong> ou <strong>08</strong>)</span>
              <span className="font-mono text-slate-400">{leads.length} placas cadastradas</span>
            </div>
          </div>

          {/* Multiple matches list */}
          {matchedPlates.length > 1 && (
            <div className="space-y-2 border border-slate-200 rounded-2xl p-3 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                {matchedPlates.length} placas encontradas para &quot;{query}&quot;:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto">
                {matchedPlates.map((plate) => {
                  const pInfo = getPlateIdentification(plate.id, plate.name);
                  const isSelected = selectedPlate?.id === plate.id;
                  const hasUrl = Boolean(plate.googleMapsUrl || plate.nfcCustomUrl);
                  return (
                    <button
                      key={plate.id}
                      onClick={() => selectPlate(plate)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 text-indigo-950 font-bold'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-[10px] text-slate-800 font-black bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-300">
                            {pInfo.leftEdgeTag || plate.id}
                          </span>
                          <span className="truncate font-semibold">{plate.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                          {hasUrl ? '⭐ Google Reviews Ativo' : '⚪ Aguardando Cadastro'}
                        </span>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Not found state */}
          {isSearched && matchedPlates.length === 0 && (
            <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                Nenhuma placa encontrada para &quot;{query}&quot;
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Verifique se digitou o número correto (ex: 08, 04, assadosdojapa) ou cadastre esta nova placa na aba <strong>Placas &amp; QR Codes</strong>.
              </p>
            </div>
          )}

          {/* Selected Plate Details & One-Click Activation Form */}
          {selectedPlate && (
            <div className="space-y-4 pt-1">
              
              {/* Card Summary */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {(() => {
                      const pInfo = getPlateIdentification(selectedPlate.id, selectedPlate.name);
                      return (
                        <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded-md flex items-center gap-1.5">
                          <span>Placa: {pInfo.leftEdgeTag ? `${pInfo.leftEdgeTag} (${selectedPlate.id})` : selectedPlate.id}</span>
                        </span>
                      );
                    })()}
                    <span className="text-xs text-slate-500">
                      Link gravado: <code className="font-mono text-slate-700">/r/{selectedPlate.id}</code>
                    </span>
                  </div>

                  <a
                    href={getTestRedirectUrl(selectedPlate.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer"
                    title="Testar redirecionamento direto no navegador"
                  >
                    <span>Testar Link 5★ Agora</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Empresa Cadastrada:</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedPlate.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Canal Atual:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {selectedPlate.nfcRedirectActive === 'gmb' ? 'Google Avaliações (Oficial)' :
                       selectedPlate.nfcRedirectActive === 'whatsapp' ? 'WhatsApp Direto' :
                       selectedPlate.nfcRedirectActive === 'instagram' ? 'Instagram' : 'Link Personalizado'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 break-all font-mono">
                  <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase mb-0.5">Destino Ativo:</span>
                  {selectedPlate.googleMapsUrl || selectedPlate.nfcCustomUrl || 'https://maps.google.com (Padrão Busca)'}
                </div>
              </div>

              {/* Instant Bind / Reassign Section */}
              <div className="border border-indigo-100 rounded-2xl p-4.5 bg-indigo-50/40 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Vender ou Atualizar Destino Desta Placa
                    </h3>
                  </div>
                  <span className="text-[11px] text-indigo-700 font-semibold">
                    Atualização Imediata no Banco
                  </span>
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Placa atualizada com sucesso! O QR Code físico agora abre diretamente a nova empresa.</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Nome da Nova Empresa:
                    </label>
                    <input
                      type="text"
                      value={bindName}
                      onChange={(e) => setBindName(e.target.value)}
                      placeholder="Ex: Padaria Bela Vista"
                      className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs text-slate-900 outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Telefone / WhatsApp (opcional):
                    </label>
                    <input
                      type="text"
                      value={bindPhone}
                      onChange={(e) => setBindPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs text-slate-900 outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700 block">
                      Link Oficial de Avaliação no Google (WriteReview ou maps.app.goo.gl):
                    </label>
                    <input
                      type="text"
                      value={bindUrl}
                      onChange={(e) => setBindUrl(e.target.value)}
                      placeholder="Cole aqui o link de avaliação do Google..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs text-slate-900 font-mono outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleSaveBinding}
                    disabled={isBinding}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
                  >
                    {isBinding ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Salvando no Sistema...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Salvar &amp; Ativar Esta Placa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>ALF Automação • Leitura Instantânea de Placas</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-semibold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
