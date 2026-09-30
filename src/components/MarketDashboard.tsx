'use client';

import React, { useState, useMemo } from 'react';
import {
  StablecoinMarketData,
  CollateralType,
} from '@/types';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Search,
  Layers,
  FileCheck,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface MarketDashboardProps {
  coins: StablecoinMarketData[];
  onOpenAiWithTopic?: (prompt: string) => void;
}

export function MarketDashboard({ coins, onOpenAiWithTopic }: MarketDashboardProps) {
  const [selectedCollateral, setSelectedCollateral] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<StablecoinMarketData | null>(null);

  // Compute key market stats
  const totalMarketCap = useMemo(
    () => coins.reduce((acc, c) => acc + c.marketCapUsd, 0),
    [coins]
  );
  const total24hVolume = useMemo(
    () => coins.reduce((acc, c) => acc + c.volume24hUsd, 0),
    [coins]
  );

  const normalCoinsCount = useMemo(
    () => coins.filter((c) => c.status === 'normal').length,
    [coins]
  );
  const cautionCoinsCount = useMemo(
    () => coins.filter((c) => c.status === 'caution').length,
    [coins]
  );
  const alertCoins = useMemo(
    () => coins.filter((c) => c.status === 'alert' || c.status === 'critical'),
    [coins]
  );

  const tetherCap = coins.find((c) => c.symbol === 'USDT')?.marketCapUsd || 0;
  const tetherDominance = totalMarketCap > 0 ? (tetherCap / totalMarketCap) * 100 : 0;

  // Filtered coins
  const filteredCoins = useMemo(() => {
    return coins.filter((coin) => {
      const matchCollateral =
        selectedCollateral === 'all' || coin.collateralType === selectedCollateral;
      const matchSearch =
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCollateral && matchSearch;
    });
  }, [coins, selectedCollateral, searchQuery]);

  // Mini sparkline SVG renderer
  const renderSparkline = (points: number[], status: string) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 0.001;
    const width = 80;
    const height = 24;

    const pathData = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 6) - 3;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor =
      status === 'alert' || status === 'critical'
        ? '#f87171'
        : status === 'caution'
        ? '#fbbf24'
        : '#34d399';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getCollateralBadge = (type: CollateralType) => {
    switch (type) {
      case 'fiat-backed':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
            법정화폐 담보
          </span>
        );
      case 'crypto-backed':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 whitespace-nowrap">
            가상자산 초과담보
          </span>
        );
      case 'synthetic-dollar':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
            합성 달러 (델타헤지)
          </span>
        );
      case 'rwa-yield':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            RWA 국채 수익형
          </span>
        );
      case 'algorithmic':
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 whitespace-nowrap">
            알고리즘형
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Warning Alert Banner if any coin is depegged */}
      {alertCoins.length > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-red-500/10 p-2 text-red-400 shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-red-300">
                디페깅(De-pegging) 경보 알림 발생
              </h4>
              <p className="mt-0.5 text-xs text-red-200/80">
                {alertCoins.map((c) => `${c.name} (${c.symbol} ${c.pegDeviationPercent.toFixed(2)}%)`).join(', ')} 이(가) 목표 기준가($1.0000) 대비 유의미한 이탈을 기록하고 있습니다. 차익거래 유동성 및 준비금 실사를 점검하십시오.
              </p>
            </div>
            <button
              onClick={() => onOpenAiWithTopic?.(`현재 ${alertCoins[0].name}의 디페그 발생 원인과 준비금 취약점을 분석해줘.`)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-xs font-semibold text-red-200 transition-colors"
            >
              <span>AI 원인 분석 요청</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Market Cap */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">전체 시가총액</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black tracking-tight text-white">
            {formatCurrency(totalMarketCap)}
          </div>
          <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>최근 30일 +3.8% 유입세 지속</span>
          </div>
        </div>

        {/* 24h Aggregated Volume */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">24시간 거래대금</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black tracking-tight text-white">
            {formatCurrency(total24hVolume)}
          </div>
          <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-slate-400">
            <span>시총 대비 회전율 39.2%</span>
          </div>
        </div>

        {/* Peg Health Index */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">페그 건전도 지수</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-black tracking-tight text-emerald-400">
              {((normalCoinsCount / coins.length) * 100).toFixed(0)}%
            </div>
            <span className="text-xs text-slate-400 font-medium">안정권</span>
          </div>
          <div className="mt-2 flex items-center space-x-2 text-[11px]">
            <span className="text-emerald-400 font-semibold">{normalCoinsCount} 정상</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold">{cautionCoinsCount} 주의</span>
            {alertCoins.length > 0 && (
              <>
                <span className="text-slate-600">|</span>
                <span className="text-red-400 font-semibold">{alertCoins.length} 경보</span>
              </>
            )}
          </div>
        </div>

        {/* USDT Dominance */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Tether (USDT) 점유율</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black tracking-tight text-white">
            {tetherDominance.toFixed(1)}%
          </div>
          <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-slate-400">
            <span>USDC 21.4% / USDe 2.0%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Collateral Filter Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: '전체 담보' },
            { id: 'fiat-backed', label: '법정화폐 담보형' },
            { id: 'crypto-backed', label: '가상자산 초과담보' },
            { id: 'synthetic-dollar', label: '합성 달러' },
            { id: 'rwa-yield', label: 'RWA 국채 수익형' },
            { id: 'algorithmic', label: '알고리즘형' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCollateral(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCollateral === tab.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="코인명, 심볼, 발행사 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Stablecoins Market Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">자산명 / 심볼</th>
                <th className="py-3.5 px-4">현재가 (USD)</th>
                <th className="py-3.5 px-4">페그 괴리율</th>
                <th className="py-3.5 px-4">상태</th>
                <th className="py-3.5 px-4">시가총액</th>
                <th className="py-3.5 px-4">24h 거래량</th>
                <th className="py-3.5 px-4">담보 유형</th>
                <th className="py-3.5 px-4">7일 추이</th>
                <th className="py-3.5 px-4 text-right">상세 분석</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredCoins.map((coin) => {
                const isAlert = coin.status === 'alert' || coin.status === 'critical';
                const isCaution = coin.status === 'caution';
                const dev = coin.pegDeviationPercent;
                const isPos = dev >= 0;

                return (
                  <tr
                    key={coin.id}
                    onClick={() => setSelectedCoin(coin)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >
                    {/* Name & Symbol */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-blue-400 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                          {coin.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center space-x-1.5">
                            <span>{coin.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {coin.symbol}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                            {coin.issuer}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-100">
                      ${coin.priceUsd < 0.01 ? coin.priceUsd.toFixed(6) : coin.priceUsd.toFixed(4)}
                    </td>

                    {/* Peg Deviation */}
                    <td className="py-3 px-4 font-mono">
                      <span
                        className={`inline-flex items-center space-x-1 font-bold ${
                          isAlert
                            ? 'text-red-400'
                            : isCaution
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {dev.toFixed(2)}%
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      {isAlert ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          <AlertTriangle className="w-3 h-3" />
                          <span>디페그 경보</span>
                        </span>
                      ) : isCaution ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <AlertTriangle className="w-3 h-3" />
                          <span>주의 관찰</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>정상 페깅</span>
                        </span>
                      )}
                    </td>

                    {/* Market Cap */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-200">
                      {formatCurrency(coin.marketCapUsd)}
                    </td>

                    {/* 24h Volume */}
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {formatCurrency(coin.volume24hUsd)}
                    </td>

                    {/* Collateral Type */}
                    <td className="py-3 px-4">
                      {getCollateralBadge(coin.collateralType)}
                    </td>

                    {/* 7d Sparkline */}
                    <td className="py-3 px-4">
                      {renderSparkline(coin.sparkline7d, coin.status)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCoin(coin);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 hover:text-white transition-colors border border-slate-700"
                      >
                        실사 보기
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Modal / Inspector Drawer for Selected Coin */}
      {selectedCoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-left my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black text-lg text-blue-400">
                  {selectedCoin.symbol}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>{selectedCoin.name}</span>
                    {getCollateralBadge(selectedCoin.collateralType)}
                  </h3>
                  <p className="text-xs text-slate-400">발행 주체: {selectedCoin.issuer}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCoin(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">현재 가격</span>
                  <p className="text-sm font-mono font-bold text-white mt-0.5">
                    ${selectedCoin.priceUsd.toFixed(4)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">페그 괴리율</span>
                  <p
                    className={`text-sm font-mono font-bold mt-0.5 ${
                      selectedCoin.status === 'normal' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {formatPercent(selectedCoin.pegDeviationPercent)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">시가총액</span>
                  <p className="text-sm font-mono font-bold text-white mt-0.5">
                    {formatCurrency(selectedCoin.marketCapUsd)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">24h 거래량</span>
                  <p className="text-sm font-mono font-bold text-white mt-0.5">
                    {formatCurrency(selectedCoin.volume24hUsd)}
                  </p>
                </div>
              </div>

              {/* Reserve Composition */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-blue-400 font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>준비자산 포트폴리오 구성 (Reserve Composition)</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-mono">
                  {selectedCoin.reserveComposition}
                </p>
              </div>

              {/* Audit & Attestation */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold mb-1">
                  <FileCheck className="w-4 h-4" />
                  <span>외부 감사 및 실사 주기 (Attestation Frequency)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedCoin.auditFrequency}
                </p>
              </div>

              {/* Ecosystem */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold mb-1.5">
                  <Layers className="w-4 h-4" />
                  <span>지원 블록체인 메인넷 생태계</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCoin.chainEcosystem.map((chain) => (
                    <span
                      key={chain}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {chain}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Deep Query Action */}
              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    const prompt = `${selectedCoin.name}(${selectedCoin.symbol})의 페깅 메커니즘과 준비금 안전성 리스크, 최근 규제 이슈에 대해 심층 분석해줘.`;
                    setSelectedCoin(null);
                    onOpenAiWithTopic?.(prompt);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-blue-600/30 hover:brightness-110 transition-all"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{selectedCoin.symbol}에 대한 AI 심층 리서치 질의</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
