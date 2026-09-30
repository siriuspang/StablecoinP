'use client';

import React from 'react';
import { StablecoinMarketData } from '@/types';
import { TrendingUp, TrendingDown, AlertCircle, Flame } from 'lucide-react';

interface LiveTickerProps {
  coins: StablecoinMarketData[];
  onSelectCoin?: (coin: StablecoinMarketData) => void;
}

export function LiveTicker({ coins, onSelectCoin }: LiveTickerProps) {
  // Duplicate array to create a seamless infinite marquee scroll
  const tickerItems = [...coins, ...coins];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900/90 border-b border-slate-800/80 py-2.5 shadow-inner">
      {/* Left indicator badge */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-3 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent pr-8">
        <span className="flex items-center space-x-1.5 text-[11px] font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
          <span>LIVE PEG TICKER</span>
        </span>
      </div>

      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex animate-ticker pl-36">
        {tickerItems.map((coin, idx) => {
          const isNormal = coin.status === 'normal';
          const isCaution = coin.status === 'caution';
          const isAlert = coin.status === 'alert' || coin.status === 'critical';

          const dev = coin.pegDeviationPercent;
          const isPos = dev >= 0;

          return (
            <div
              key={`${coin.id}-${idx}`}
              onClick={() => onSelectCoin?.(coin)}
              className="flex items-center space-x-2.5 mx-3 px-3 py-1 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-colors shrink-0 group"
            >
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                  {coin.symbol}
                </span>
                <span className="text-[10px] text-slate-400 hidden xl:inline">
                  {coin.name}
                </span>
              </div>

              {/* Price */}
              <div className="text-xs font-mono font-medium text-slate-200">
                ${coin.priceUsd < 0.01 ? coin.priceUsd.toFixed(6) : coin.priceUsd.toFixed(4)}
              </div>

              {/* Peg Deviation */}
              <div
                className={`flex items-center space-x-0.5 text-[11px] font-mono font-semibold px-1.5 py-0.2 rounded ${
                  isAlert
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : isCaution
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {isAlert ? (
                  <AlertCircle className="w-3 h-3 text-red-400 inline" />
                ) : isPos ? (
                  <TrendingUp className="w-3 h-3 text-emerald-400 inline" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-slate-400 inline" />
                )}
                <span>
                  {isPos ? '+' : ''}
                  {dev.toFixed(2)}%
                </span>
              </div>

              {/* Yield indicator if present */}
              {coin.yieldRatePercent && coin.yieldRatePercent > 0 ? (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20 flex items-center space-x-0.5">
                  <Flame className="w-2.5 h-2.5" />
                  <span>{coin.yieldRatePercent}% APY</span>
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
