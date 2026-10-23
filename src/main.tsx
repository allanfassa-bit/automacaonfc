import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Unregister any stale Service Workers and purge Workbox caches so updates always appear immediately
if (typeof window !== 'undefined') {
  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const r of regs) {
          r.unregister();
        }
      }).catch(() => {});
    }
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const k of keys) {
          caches.delete(k);
        }
      }).catch(() => {});
    }
  } catch (_) {}
}

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      errorMsg: error?.message || String(error)
    };
  }

  componentDidCatch(error: any) {
    console.error('RootErrorBoundary caught error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-black text-amber-400">Atualizando Visualização...</h2>
            <p className="text-xs text-slate-300">
              Detectamos uma atualização recente na página. Clique abaixo para recarregar:
            </p>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('alf_local_crm_leads');
                } catch (_) {}
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer transition"
            >
              Recarregar Página Agora
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);

