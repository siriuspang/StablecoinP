'use client';

import React, { useState, useMemo } from 'react';
import { NewsArticle, NewsCategory } from '@/types';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Tag,
  Clock,
  TrendingUp,
  Newspaper,
  Layers,
  Radio,
  BookOpen,
} from 'lucide-react';

interface NewsSectionProps {
  articles: NewsArticle[];
  onOpenAiWithTopic?: (prompt: string) => void;
  onRefresh?: () => void;
  isSyncing?: boolean;
}

export function NewsSection({
  articles,
  onOpenAiWithTopic,
  onRefresh,
  isSyncing = false,
}: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [feedTypeFilter, setFeedTypeFilter] = useState<'all' | 'live' | 'curated'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSummaryIds, setExpandedSummaryIds] = useState<Record<string, boolean>>({});
  const [expandedImpactIds, setExpandedImpactIds] = useState<Record<string, boolean>>({});

  // Toggle helpers
  const toggleSummary = (id: string) => {
    setExpandedSummaryIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleImpact = (id: string) => {
    setExpandedImpactIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Collect all unique tags for pill filtering
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 12);
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Feed type filter
      const isLive = article.id.startsWith('live-rss-');
      if (feedTypeFilter === 'live' && !isLive) return false;
      if (feedTypeFilter === 'curated' && isLive) return false;

      // Category filter
      const matchCat =
        selectedCategory === 'all' ||
        (selectedCategory === 'domestic' &&
          (article.category === 'domestic' || article.sourceType === 'domestic')) ||
        (selectedCategory === 'global' &&
          (article.category === 'global' || article.sourceType === 'global')) ||
        article.category === selectedCategory;

      const matchTag = selectedTag ? article.tags.includes(selectedTag) : true;

      const matchSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summaryPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchTag && matchSearch;
    });
  }, [articles, selectedCategory, feedTypeFilter, selectedTag, searchQuery]);

  const liveCount = articles.filter((a) => a.id.startsWith('live-rss-')).length;
  const curatedCount = articles.length - liveCount;

  const formatTimeAgo = (dateStr: string) => {
    try {
      const diff = Date.now() - new Date(dateStr).getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      if (minutes < 5) return '방금 전';
      if (minutes < 60) return `${minutes}분 전`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}시간 전`;
      const days = Math.floor(hours / 24);
      return `${days}일 전`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Media Feed Gateway Banner */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-slate-900/90 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-blue-950/30">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0 mt-0.5">
            <Newspaper className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                실시간 디지털금융 전문 미디어 포털 연동
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                블록미디어 · 서울경제 디센터
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-1">
              블록미디어(BlockMedia) 디지털금융 & 서울경제 디센터(Decenter) 실시간 속보망
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              미 연준(Fed) 월러 이사의 AI 에이전트 결제 발언, 신한은행 해외송금 기술실증, 카카오 원화 코인 추진 등 최신 디지털금융 속보가 실시간 자동 수집 및 누적 아카이브됩니다.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <a
            href="https://www.blockmedia.co.kr/%eb%94%94%ec%a7%80%ed%84%b8%ea%b8%88%ec%9c%b5"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-blue-600/25 active:scale-95 whitespace-nowrap"
          >
            <span>블록미디어 디지털금융 ↗</span>
          </a>
          <a
            href="https://decenter.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center space-x-1.5 transition-all border border-slate-700 whitespace-nowrap"
          >
            <span>디센터 뉴스룸 ↗</span>
          </a>
        </div>
      </div>

      {/* 2. Feed Type & Sub-Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        {/* Top line: Feed Type Toggles + Live sync indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400">아카이브 뷰:</span>
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFeedTypeFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  feedTypeFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>전체 누적 ({articles.length}건)</span>
              </button>
              <button
                onClick={() => setFeedTypeFilter('live')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  feedTypeFilter === 'live'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-emerald-300" />
                <span>실시간 수집 ({liveCount}건)</span>
              </button>
              <button
                onClick={() => setFeedTypeFilter('curated')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  feedTypeFilter === 'curated'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
                <span>심층 큐레이션 ({curatedCount}건)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400">
              현재 표시: <strong className="text-white">{filteredArticles.length}</strong>건
            </span>
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isSyncing}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1 transition-all disabled:opacity-50 text-[11px]"
              >
                <span className={isSyncing ? 'animate-spin' : ''}>🔄</span>
                <span>{isSyncing ? '동기화 중...' : '기사 새로고침'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {[
              { id: 'all', label: '전체 속보' },
              { id: 'regulatory', label: '규제 & 정책' },
              { id: 'domestic', label: '국내 시장 (한은/금융위)' },
              { id: 'global', label: '글로벌 동향 (US/EU)' },
              { id: 'issuer', label: '발행사 공시 (Tether/Circle/Ethena)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as NewsCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="뉴스 및 키워드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Tag pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
          <span className="text-[11px] text-slate-400 flex items-center space-x-1 shrink-0 mr-1">
            <Tag className="w-3 h-3 text-slate-400" />
            <span>추천 태그:</span>
          </span>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-medium text-[11px] border border-blue-500/30"
            >
              전체 보기 ✕
            </button>
          )}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* News Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((article) => {
          const isSummaryOpen = expandedSummaryIds[article.id] !== false; // default open
          const isImpactOpen = expandedImpactIds[article.id] || false;
          const isHighImpact = article.impactLevel === 'high';
          const isLiveItem = article.id.startsWith('live-rss-');

          return (
            <div
              key={article.id}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/75 p-5 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        article.sourceType === 'domestic'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {article.source}
                    </span>

                    {/* Live vs Curated Badge */}
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        isLiveItem
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {isLiveItem ? '⚡ 실시간수집' : '⭐ 심층분석'}
                    </span>

                    <span className="text-slate-400 flex items-center space-x-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(article.publishedAt)}</span>
                    </span>
                  </div>

                  {/* Impact badge */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isHighImpact
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    파급도: {article.impactLevel === 'high' ? '높음 (High)' : '보통 (Medium)'}
                  </span>
                </div>

                {/* Article Title */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors leading-snug mb-3 cursor-pointer group-hover:underline decoration-blue-500/50 underline-offset-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span>{article.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>

                {/* Related Coins Pills */}
                <div className="flex flex-wrap gap-1 mb-3.5">
                  {article.relatedCoins.map((coin) => (
                    <span
                      key={coin}
                      className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 text-[10px] font-mono font-semibold"
                    >
                      ${coin}
                    </span>
                  ))}
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-slate-950/60 text-slate-400 text-[10px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* AI 3-Line Executive Summary */}
                <div className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-3 mb-3">
                  <div
                    onClick={() => toggleSummary(article.id)}
                    className="flex items-center justify-between cursor-pointer select-none text-xs font-semibold text-slate-300 mb-2"
                  >
                    <div className="flex items-center space-x-1.5 text-blue-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI 핵심 3줄 브리핑</span>
                    </div>
                    {isSummaryOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>

                  {isSummaryOpen && (
                    <ul className="space-y-1.5 text-xs text-slate-300/90 leading-relaxed list-disc list-inside">
                      {article.summaryPoints.map((point, i) => (
                        <li key={i} className="pl-1">
                          <span className="text-slate-200">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Impact Analysis Expander */}
                {isImpactOpen && (
                  <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-3.5 space-y-2.5 text-xs mb-3 animate-fadeIn">
                    <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>전문가 파급효과 심층 분석 (Impact Matrix)</span>
                    </div>

                    <div className="space-y-2 text-slate-300">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[11px]">
                          [국내 시장 파급효과]
                        </span>
                        <p className="mt-0.5 text-slate-300">
                          {article.impactAnalysis.domesticMarket}
                        </p>
                      </div>

                      <div>
                        <span className="text-amber-400/90 font-semibold block text-[11px]">
                          [규제 및 정책 시사점]
                        </span>
                        <p className="mt-0.5 text-slate-300">
                          {article.impactAnalysis.regulatoryImplication}
                        </p>
                      </div>

                      <div>
                        <span className="text-emerald-400/90 font-semibold block text-[11px]">
                          [투자자 대응 전략]
                        </span>
                        <p className="mt-0.5 text-slate-300">
                          {article.impactAnalysis.investorAction}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-1 gap-2">
                <button
                  onClick={() => toggleImpact(article.id)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center space-x-1 transition-colors"
                >
                  <span>{isImpactOpen ? '파급 분석 접기' : '파급효과 심층 분석'}</span>
                  {isImpactOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      onOpenAiWithTopic?.(
                        `"${article.title}" 기사와 관련하여 한국 가상자산 시장과 스테이블코인 페깅에 미칠 구조적 영향을 분석해줘.`
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold flex items-center space-x-1 transition-colors border border-blue-500/20"
                    title="AI 코파일럿 질의"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">AI 질의</span>
                  </button>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700 shadow-sm"
                    title="기사 원문 사이트로 이동"
                  >
                    <span>원문 보기</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
