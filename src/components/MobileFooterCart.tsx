import React, { useEffect, useState } from 'react';
import { ShoppingBag, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/cardapioExporter';

export interface MobileFooterCartProps {
  totalCount: number;
  totalAmount: number;
  tableNumber?: string;
  onViewCart: () => void;
  onQuickWhatsApp?: () => void;
  restaurantName?: string;
  isCartOpen?: boolean;
  className?: string;
}

export const MobileFooterCart: React.FC<MobileFooterCartProps> = ({
  totalCount,
  totalAmount,
  tableNumber = '01',
  onViewCart,
  onQuickWhatsApp,
  isCartOpen = false,
  className = ''
}) => {
  const [animatePulse, setAnimatePulse] = useState(false);

  // Trigger brief bounce/glow animation when totalCount increases
  useEffect(() => {
    if (totalCount > 0) {
      setAnimatePulse(true);
      const timer = setTimeout(() => setAnimatePulse(false), 450);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  // Don't render if cart is empty or if cart modal is already open
  if (totalCount <= 0 || isCartOpen) {
    return null;
  }

  return (
    <div
      aria-label="Resumo do Pedido e Carrinho Flutuante"
      className={`fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 max-w-md mx-auto z-40 transition-all duration-300 transform translate-y-0 ${className}`}
    >
      <div
        className={`w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950/95 border border-amber-500/40 rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(245,158,11,0.22)] backdrop-blur-md flex items-center justify-between gap-3 ${
          animatePulse ? 'scale-[1.02] ring-2 ring-amber-400/80 shadow-amber-500/40' : ''
        } transition-all duration-200`}
      >
        {/* Left Side: Count Badge & Total Price Info */}
        <button
          type="button"
          onClick={onViewCart}
          className="flex items-center gap-3 text-left focus:outline-none min-w-0 flex-1 group"
        >
          {/* Badge with items count */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span
              className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-emerald-500 text-slate-950 text-[11px] font-black rounded-full flex items-center justify-center shadow-md border-2 border-slate-950 ${
                animatePulse ? 'animate-bounce' : ''
              }`}
            >
              {totalCount}
            </span>
          </div>

          {/* Pricing & Table Indicator */}
          <div className="truncate">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <span>Mesa {tableNumber}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-amber-400/60"></span>
              <span className="text-slate-400 font-medium">
                {totalCount} {totalCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-white tracking-tight flex items-baseline gap-1">
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </button>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onQuickWhatsApp && (
            <button
              type="button"
              onClick={onQuickWhatsApp}
              title="Pedir direto no WhatsApp"
              aria-label="Pedir direto pelo WhatsApp"
              className="hidden xs:flex w-10 h-10 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={onViewCart}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-3.5 sm:px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-1.5 text-xs sm:text-sm active:scale-95 transition-all tracking-wide"
          >
            <span>Ver Pedido</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
