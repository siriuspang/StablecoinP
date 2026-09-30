'use client';

import React, { useState, useMemo } from 'react';
import { ResearchPaper } from '@/types';
import {
  BookOpen,
  Search,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { PaperModal } from './PaperModal';

interface PaperHubProps {
  papers: ResearchPaper[];
  onOpenAiWithTopic?: (prompt: string) => void;
}

export function PaperHub({ papers, onOpenAiWithTopic }: PaperHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePaper, setActivePaper] = useState<ResearchPaper | null>(null);

  // Filtered papers
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchCat = selectedCategory === 'all' || paper.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || paper.difficulty === selectedDifficulty;
      const matchSearch =
        paper.titleKo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.sourceVenue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchDiff && matchSearch;
    });
  }, [papers, selectedCategory, selectedDifficulty, searchQuery]);

  const getInstitutionBadge = (sourceType: ResearchPaper['sourceType']) => {
    switch (sourceType) {
      case 'keri':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center space-x-1">
            <span>한국경제연구원 (KERI · KDI연계)</span>
          </span>
        );
      case 'nabo':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
            <span>국회예산정책처 (NABO · KDI연계)</span>
          </span>
        );
      case 'kif':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
            <span>한국금융연구원 (KIF · KDI연계)</span>
          </span>
        );
      case 'kdi':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1">
            <span>KDI 경제교육·정보센터</span>
          </span>
        );
      case 'miraeasset':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
            <span>미래에셋증권 리서치 (2026)</span>
          </span>
        );
      case 'bis':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            BIS (국제결제은행)
          </span>
        );
      case 'imf':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            IMF (국제통화기금)
          </span>
        );
      case 'bok':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            BOK (한국은행)
          </span>
        );
      case 'fed':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Fed (미국 연준)
          </span>
        );
      case 'arxiv':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            arXiv (정량금융)
          </span>
        );
      case 'industry_report':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            기관 리서치
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">
            학술 저널
          </span>
        );
    }
  };

  const getDifficultyBadge = (difficulty: ResearchPaper['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            입문/실무 (Beginner)
          </span>
        );
      case 'intermediate':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            중급 (Intermediate)
          </span>
        );
      case 'advanced':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            고급 (Advanced)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Banner Guide */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>KDI 경제정보센터 223건 · 미래에셋증권 2026 · 글로벌 중앙은행 큐레이션</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              스테이블코인 심층 리포트 & 연구 서고 (Report)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              KDI 경제정보센터(EIEC)에 등재된 한국경제연구원(KERI), 국회예산정책처(NABO), 한국금융연구원(KIF), 한국은행의 핵심 정책 연구와 미래에셋증권 2026 최신 디지털자산 리포트, BIS, IMF의 글로벌 연구를 6단계 인터랙티브 학습 모듈로 완벽 제공합니다.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-lg font-black text-blue-400">223건+</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">KDI 포털 연동</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-lg font-black text-amber-400">4편</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">미래에셋 2026</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-lg font-black text-emerald-400">{papers.length}편</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">정밀 학습 모듈</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KDI Integrated Research Search Portal Banner */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/80 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-blue-950/40">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                KDI 경제교육·정보센터 공식 포털 연동
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                총 223건의 스테이블코인 연구자료
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-1">
              KDI 경제정보센터(EIEC) 스테이블코인 국내외 정책·경제 연구자료 검색
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              한국경제연구원(KERI), 국회예산정책처(NABO), 한국금융연구원(KIF), 한국은행(BOK) 등 국내외 싱크탱크의 최신 스테이블코인 연구 원문 223건을 KDI 포털에서 실시간으로 직접 검색하고 열람할 수 있습니다.
            </p>
          </div>
        </div>

        <a
          href="https://eiec.kdi.re.kr/search/search.do?term=%EC%8A%A4%ED%85%8C%EC%9D%B4%EB%B8%94&pg=&now=webcontent&pp=10&schfld=1,2,3"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap shrink-0 group active:scale-95"
        >
          <span>KDI 포털 223건 원문 검색 바로가기</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* 3. Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: '전체 연구·보고서' },
            { id: 'regulatory-framework', label: 'KDI·국책연구 (기업전략/재정)' },
            { id: 'macro-economy', label: '거시경제 & 지급결제 인프라' },
            { id: 'banking-industry', label: '은행업 & 예금토큰' },
            { id: 'ai-finance', label: 'AI & 에이전트 금융 (미래에셋)' },
            { id: 'monetary-stability', label: '외환시장 & 통화안정 (한은/BIS)' },
            { id: 'depeg-dynamics', label: '디페깅 & 스마트컨트랙트' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="보고서명, 저자, 기관 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Research Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPapers.map((paper) => {
          return (
            <div
              key={paper.id}
              className={`rounded-2xl border p-5 shadow-sm transition-all flex flex-col justify-between group ${
                paper.sourceType === 'miraeasset'
                  ? 'border-amber-500/40 bg-gradient-to-b from-slate-900/90 to-amber-950/20 hover:border-amber-400/80 hover:shadow-lg hover:shadow-amber-500/10'
                  : 'border-slate-800/90 bg-slate-900/80 hover:border-slate-700 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {getInstitutionBadge(paper.sourceType)}
                  <span className="text-[10px] font-semibold text-slate-400">
                    {paper.publishedDate}
                  </span>
                </div>

                {/* Korean Title */}
                <h3
                  onClick={() => setActivePaper(paper)}
                  className="font-bold text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors leading-snug mb-1.5 cursor-pointer"
                >
                  {paper.titleKo}
                </h3>

                {/* English Title */}
                <p className="text-xs text-slate-400 line-clamp-1 italic font-serif mb-3">
                  {paper.titleEn}
                </p>

                {/* Authors & Venue */}
                <div className="text-[11px] text-slate-400 mb-3 space-y-0.5">
                  <div className="truncate">
                    <span className="text-slate-400 font-semibold">저자: </span>
                    <span>{paper.authors.join(', ')}</span>
                  </div>
                  <div className="truncate flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 font-semibold">출처: </span>
                      <span className="text-slate-300">{paper.sourceVenue}</span>
                    </div>
                  </div>
                </div>

                {/* Executive Summary Snippet */}
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {paper.executiveSummary.background}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {paper.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-1.5">
                  {getDifficultyBadge(paper.difficulty)}
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={paper.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center space-x-1 transition-all"
                    title="원문 사이트/자료 바로가기"
                  >
                    <span>원문 링크</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>

                  <button
                    onClick={() => setActivePaper(paper)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold flex items-center space-x-1 transition-all group-hover:shadow-md group-hover:shadow-blue-600/20"
                  >
                    <span>6단계 학습</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPapers.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-400 space-y-2">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="text-sm font-semibold">검색 조건에 맞는 연구 논문이 없습니다.</p>
          <p className="text-xs text-slate-400">검색어나 카테고리 필터를 변경해 보세요.</p>
        </div>
      )}

      {/* 6-Step Paper Study Modal */}
      <PaperModal
        paper={activePaper}
        onClose={() => setActivePaper(null)}
        onOpenAiWithTopic={onOpenAiWithTopic}
      />
    </div>
  );
}
