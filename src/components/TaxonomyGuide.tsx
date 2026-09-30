'use client';

import React, { useState } from 'react';
import { TaxonomyCategory } from '@/types';
import { REGULATION_COMPARISON_DATA } from '@/data/mockData';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Landmark,
  Scale,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';

interface TaxonomyGuideProps {
  categories: TaxonomyCategory[];
  onOpenAiWithTopic?: (prompt: string) => void;
}

export function TaxonomyGuide({ categories, onOpenAiWithTopic }: TaxonomyGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<TaxonomyCategory>(categories[0]);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>스테이블코인 아키텍처 & 글로벌 입법 비교</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              스테이블코인 5대 담보 분류 체계 & 한·미·EU 규제 매트릭스
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              페깅 담보 방식에 따른 메커니즘 장단점과 위험 요인을 비교하고, 한국 가상자산 2단계 입법과 미국 Clarity Act, 유럽연합 MiCA의 주요 법률 요건을 한눈에 대조합니다.
            </p>
          </div>

          <button
            onClick={() =>
              onOpenAiWithTopic?.(
                '한국 가상자산 2단계 입법에서 원화 스테이블코인 인가 기준과 EU MiCA 규정의 차이점을 구체적인 조항 관점에서 비교 분석해줘.'
              )
            }
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-blue-600/25 transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>AI 규제 비교 질의</span>
          </button>
        </div>
      </div>

      {/* Part 1: Interactive 5-Collateral Type Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Scale className="w-5 h-5 text-blue-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            1. 스테이블코인 5대 담보 메커니즘 심층 분류
          </h3>
        </div>

        {/* Collateral Selection Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-blue-400' : 'text-slate-200'
                    }`}
                  >
                    {cat.nameKo}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {cat.marketShareEstimate}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {cat.representativeCoins[0]?.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Collateral Type Detail Panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-lg font-black text-white">{selectedCategory.nameKo}</h4>
                <span className="text-xs font-mono text-blue-400 font-semibold">
                  ({selectedCategory.nameEn})
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                  시장 점유율: {selectedCategory.marketShareEstimate}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>

            {/* Representative coins */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {selectedCategory.representativeCoins.map((coin) => (
                <span
                  key={coin}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-blue-300 font-mono text-xs font-semibold"
                >
                  {coin}
                </span>
              ))}
            </div>
          </div>

          {/* Advantages vs Risk Factors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Advantages */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>핵심 장점 및 강점</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCategory.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2.5">
              <div className="flex items-center space-x-1.5 text-red-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>구조적 취약점 및 리스크 요인</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedCategory.riskFactors.map((risk, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-red-400 font-bold shrink-0">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Regulatory Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center space-x-1.5 text-blue-400 font-semibold text-xs mb-1">
                <Landmark className="w-3.5 h-3.5" />
                <span>국내(금융위/한국은행) 규제 입장</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCategory.regulatoryStatusKo}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold text-xs mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>글로벌(미국 Fed/EU MiCA) 규제 입장</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCategory.regulatoryStatusGlobal}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Comparative Matrix of Korean vs US vs EU Regulation */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            2. 주요국 스테이블코인 입법 체계 비교 매트릭스 (한국 vs 미국 vs EU)
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 font-semibold text-slate-300">
                  <th className="py-3.5 px-4 w-1/5 text-slate-400 uppercase tracking-wider text-[11px]">
                    비교 쟁점 항목
                  </th>
                  <th className="py-3.5 px-4 w-1/4 text-red-400 font-bold">
                    🇰🇷 한국 (가상자산 2단계 입법)
                  </th>
                  <th className="py-3.5 px-4 w-1/4 text-blue-400 font-bold">
                    🇺🇸 미국 (Clarity Act 안)
                  </th>
                  <th className="py-3.5 px-4 w-1/4 text-emerald-400 font-bold">
                    🇪🇺 유럽연합 (MiCA 규정)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {REGULATION_COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-white bg-slate-950/30">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed">
                      {row.korea}
                    </td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed">
                      {row.us}
                    </td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed">
                      {row.eu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
