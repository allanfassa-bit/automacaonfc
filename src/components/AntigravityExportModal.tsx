import React, { useState } from 'react';
import {
  Download,
  X,
  Check,
  Copy,
  Terminal,
  FileCode,
  FolderArchive,
  ArrowRight,
  ExternalLink,
  Laptop,
  CheckCircle2
} from 'lucide-react';

interface AntigravityExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AntigravityExportModal: React.FC<AntigravityExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncingRender, setIsSyncingRender] = useState(false);
  const [syncRenderMessage, setSyncRenderMessage] = useState<string | null>(null);
  const [githubRepo, setGithubRepo] = useState('https://github.com/allanfassa-bit/automacaonfc.git');
  const [githubToken, setGithubToken] = useState('');
  const [isPushingGithub, setIsPushingGithub] = useState(false);
  const [githubPushStatus, setGithubPushStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2500);
  };

  const handleDownloadZip = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = '/api/export/zip';
    link.download = 'alf-automacao-gmb.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleSyncRenderNow = async () => {
    setIsSyncingRender(true);
    setSyncRenderMessage(null);
    try {
      const res = await fetch('/api/sync-render-now', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncRenderMessage('✅ Sincronizado! O Mini Site Oficial (/?minisite=alf) já está atualizado no banco do Render.');
      } else {
        setSyncRenderMessage('⚠️ Erro ao sincronizar: ' + (data.error || 'Tente novamente'));
      }
    } catch (e: any) {
      setSyncRenderMessage('⚠️ Falha de conexão ao sincronizar.');
    } finally {
      setIsSyncingRender(false);
    }
  };

  const handlePushGithub = async () => {
    setIsPushingGithub(true);
    setGithubPushStatus(null);
    try {
      const res = await fetch('/api/github/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: githubRepo,
          token: githubToken,
          commitMessage: 'feat: update ALF Automation official mini site, logo, GSAP animations, WhatsApp, Instagram, and PIX CNPJ'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGithubPushStatus({ ok: true, msg: data.message });
      } else {
        setGithubPushStatus({ ok: false, msg: data.details || data.error || 'Falha no push para o GitHub.' });
      }
    } catch (e: any) {
      setGithubPushStatus({ ok: false, msg: e.message || 'Erro ao conectar com o servidor.' });
    } finally {
      setIsPushingGithub(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <FolderArchive className="h-5 w-5" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-base font-bold text-slate-900 tracking-tight">
                Atualizar GitHub, Render &amp; Exportar para Antigravity
              </h2>
              <p className="text-xs text-slate-500">
                Sincronize os dados em tempo real com o Render, faça push para o GitHub ou baixe o ZIP completo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Instant Render Cloud Database Sync */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 space-y-2.5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">Instantâneo</span>
                  <span className="text-xs font-bold text-emerald-950">Sincronização Direta com Nuvem do Render</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Atualiza imediatamente a vitrine <code className="font-mono font-bold">/?minisite=alf</code> (Logo ALF, WhatsApp, Instagram, Histórico e PIX CNPJ) no banco compartilhado do Render.
                </p>
              </div>
              <button
                onClick={handleSyncRenderNow}
                disabled={isSyncingRender}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-xs cursor-pointer shrink-0 w-full sm:w-auto"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isSyncingRender ? 'Sincronizando...' : 'Sincronizar Render Agora'}</span>
              </button>
            </div>
            {syncRenderMessage && (
              <div className="text-xs font-semibold text-emerald-900 bg-white/80 px-3 py-2 rounded-lg border border-emerald-200">
                {syncRenderMessage}
              </div>
            )}
          </div>

          {/* Direct GitHub Push for Render Auto-Deploy */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Push Direto para GitHub (Deploy Automático no Render)</span>
              <span className="text-[11px] text-slate-500 font-mono">branch: main</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Repositório GitHub</label>
                <input
                  type="text"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 font-mono"
                  placeholder="https://github.com/usuario/repo.git"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Token GitHub (ghp_... opcional para push remoto)</label>
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-800 font-mono"
                  placeholder="Cole seu Personal Access Token..."
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-[11px] text-slate-500">
                Você também pode usar o ícone do <strong>GitHub</strong> no topo direito do AI Studio para sincronizar o commit.
              </p>
              <button
                onClick={handlePushGithub}
                disabled={isPushingGithub}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition cursor-pointer shrink-0"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>{isPushingGithub ? 'Enviando Commit...' : 'Fazer Commit & Push'}</span>
              </button>
            </div>
            {githubPushStatus && (
              <div className={`text-xs font-semibold px-3 py-2 rounded-lg border ${githubPushStatus.ok ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
                {githubPushStatus.msg}
              </div>
            )}
          </div>

          {/* Main Download Callout */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-900">Arquivo Completo .ZIP (Antigravity / Local)</span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-xs text-slate-500">Full-Stack (Vite, React, Express, TS)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contém todos os componentes, a nova logo da ALF Automation, animações GSAP e configurações de deploy.
              </p>
            </div>
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition shadow-xs cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>{isDownloading ? 'Gerando .ZIP...' : 'Baixar alf-automacao-gmb.zip'}</span>
            </button>
          </div>

          {/* Workflow Steps for Antigravity & Local Development */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Comandos Git para atualizar pelo terminal / Antigravity
            </h3>

            <div className="space-y-3">
              {/* Step 4 */}
              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">Commit e Push para o seu GitHub &amp; Render</p>
                    <button
                      onClick={() => copyToClipboard('git add . && git commit -m "feat: update ALF Automation mini site, logo, GSAP and PIX" && git push origin main', 'cmd-git')}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                    >
                      {copiedCommand === 'cmd-git' ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copiar comando Git</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 text-slate-100 font-mono text-xs px-3 py-2 rounded-lg overflow-x-auto">
                    <code>git add . &amp;&amp; git commit -m "feat: update ALF Automation mini site, logo, GSAP and PIX" &amp;&amp; git push origin main</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Render URL: https://automacaonfc.onrender.com/?minisite=alf
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
            >
              Fechar
            </button>
            <button
              onClick={handleDownloadZip}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition shadow-xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Baixar ZIP Agora</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
