'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header, ActiveTab } from '@/components/Header';
import { LiveTicker } from '@/components/LiveTicker';
import { MarketDashboard } from '@/components/MarketDashboard';
import { NewsSection } from '@/components/NewsSection';
import { PaperHub } from '@/components/PaperHub';
import { ChannelSection } from '@/components/ChannelSection';
import { TaxonomyGuide } from '@/components/TaxonomyGuide';
import { AIChatDrawer } from '@/components/AIChatDrawer';
import {
  STABLECOINS_DATA,
  NEWS_ARTICLES_DATA,
  RESEARCH_PAPERS_DATA,
  TAXONOMY_CATEGORIES_DATA,
  CHANNEL_VIDEOS_DATA,
} from '@/data/mockData';
import {
  StablecoinMarketData,
  NewsArticle,
  ResearchPaper,
  ChannelVideo,
} from '@/types';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Activity,
  Newspaper,
  Tv,
  RefreshCw,
  Database,
  Radio,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string | null>(null);

  // Dynamic state initialized with baseline curated datasets
  const [coins, setCoins] = useState<StablecoinMarketData[]>(STABLECOINS_DATA);
  const [news, setNews] = useState<NewsArticle[]>(NEWS_ARTICLES_DATA);
  const [papers, setPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS_DATA);
  const [videos, setVideos] = useState<ChannelVideo[]>(CHANNEL_VIDEOS_DATA);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const hasDepegAlert = coins.some(
    (c) => c.status === 'alert' || c.status === 'critical'
  );

  const handleOpenAiWithTopic = (prompt: string) => {
    setAiPrompt(prompt);
    setIsAiOpen(true);
  };

  const handleOpenGeneralAi = () => {
    setAiPrompt(null);
    setIsAiOpen(true);
  };

  // Sync all feeds (News RSS, DefiLlama prices, KDI reports, YouTube channels)
  const syncAllData = useCallback(async (force = false) => {
    setIsSyncing(true);
    try {
      const timestamp = new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      // 1. Fetch News
      const newsRes = await fetch(`/api/news?limit=100${force ? '&refresh=true' : ''}`);
      if (newsRes.ok) {
        const newsJson = await newsRes.json();
        if (newsJson.data && Array.isArray(newsJson.data)) {
          setNews(newsJson.data);
        }
      }

      // 2. Fetch Market Data
      const marketRes = await fetch(`/api/market${force ? '?refresh=true' : ''}`);
      if (marketRes.ok) {
        const marketJson = await marketRes.json();
        if (marketJson.data && Array.isArray(marketJson.data)) {
          setCoins(marketJson.data);
        }
      }

      // 3. Fetch Reports
      const reportsRes = await fetch(`/api/reports${force ? '?refresh=true' : ''}`);
      if (reportsRes.ok) {
        const reportsJson = await reportsRes.json();
        if (reportsJson.data && Array.isArray(reportsJson.data)) {
          setPapers(reportsJson.data);
        }
      }

      // 4. Fetch Channels
      const channelRes = await fetch(`/api/channel${force ? '?refresh=true' : ''}`);
      if (channelRes.ok) {
        const channelJson = await channelRes.json();
        if (channelJson.data && Array.isArray(channelJson.data)) {
          setVideos(channelJson.data);
        }
      }

      setLastSyncTime(timestamp);
    } catch (error) {
      console.error('Failed to sync live intelligence data:', error);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial fetch on mount & background auto-sync interval
  useEffect(() => {
    syncAllData(false);

    // Periodic auto-sync every 3 minutes
    const interval = setInterval(() => {
      syncAllData(false);
    }, 180000);

    return () => clearInterval(interval);
  }, [syncAllData]);

  // Top headline from latest news
  const topHeadline = news[0]?.title || '원화 스테이블코인 인가 가이드라인 및 실시간 시장 모니터링';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiChat={handleOpenGeneralAi}
        hasDepegAlert={hasDepegAlert}
      />

      {/* 2. Top Live Scrolling Peg Ticker */}
      <LiveTicker
        coins={coins}
        onSelectCoin={(coin: StablecoinMarketData) => {
          handleOpenAiWithTopic(
            `${coin.name}(${coin.symbol})의 현재 실시간 페깅 편차(${coin.pegDeviationPercent}%) 원인과 준비자산 구성을 분석해줘.`
          );
        }}
      />

      {/* 3. Hero Quick Brief Bar with Live Sync & Cumulative Stats */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 to-slate-950/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          {/* Headline Line */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="font-bold text-white tracking-wide shrink-0">
                실시간 헤드라인:
              </span>
              <span className="text-slate-300 truncate max-w-xl">
                {topHeadline}
              </span>
            </div>

            {/* Quick Tab Jump */}
            <div className="flex items-center space-x-3 shrink-0 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setActiveTab('news')}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1 whitespace-nowrap"
              >
                <span>News {news.length}건</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => setActiveTab('report')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 whitespace-nowrap"
              >
                <span>Report {papers.length}편</span>
                <BookOpen className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => setActiveTab('channel')}
                className="text-red-400 hover:text-red-300 font-semibold flex items-center space-x-1 whitespace-nowrap"
              >
                <span>Channel {videos.length}편</span>
                <Tv className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live Sync Status & Cumulative Archive Counter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
            <div className="flex items-center space-x-2.5">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>실시간 자동 수집 엔진 가동 중 (옵션 A 활성화)</span>
              </span>

              <span className="hidden sm:inline-flex items-center space-x-1.5 text-slate-400">
                <Database className="w-3 h-3 text-blue-400" />
                <span>
                  누적 아카이브: 뉴스 <strong className="text-slate-200">{news.length}</strong>건 · 리포트 <strong className="text-slate-200">{papers.length}</strong>편 · 영상 <strong className="text-slate-200">{videos.length}</strong>편
                </span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {lastSyncTime && (
                <span className="text-slate-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>최근 동기화: {lastSyncTime}</span>
                </span>
              )}

              <button
                onClick={() => syncAllData(true)}
                disabled={isSyncing}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium flex items-center space-x-1 transition-all border border-slate-700 disabled:opacity-50"
                title="Google News RSS 및 DefiLlama 시세 즉시 새로고침"
              >
                <RefreshCw className={`w-3 h-3 text-blue-400 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? '동기화 중...' : '지금 새로고침'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Body Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <span>실시간 스테이블코인 페그 & 시장 대시보드</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  글로벌 10대 주요 스테이블코인 실시간 괴리율, DefiLlama 연동 시가총액, 준비금 실사 주기 및 디페그 위험 모니터링
                </p>
              </div>
            </div>

            <MarketDashboard
              coins={coins}
              onOpenAiWithTopic={handleOpenAiWithTopic}
            />
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                  <Newspaper className="w-6 h-6 text-indigo-400" />
                  <span>국내외 실시간 속보 & 누적 인텔리전스 (News)</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  블록미디어, 서울경제 디센터, 매일경제, 연합뉴스 실시간 속보 수집 및 누적 아카이브
                </p>
              </div>
            </div>

            <NewsSection
              articles={news}
              onOpenAiWithTopic={handleOpenAiWithTopic}
              onRefresh={() => syncAllData(true)}
              isSyncing={isSyncing}
            />
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-6 animate-fadeIn">
            <PaperHub
              papers={papers}
              onOpenAiWithTopic={handleOpenAiWithTopic}
            />
          </div>
        )}

        {activeTab === 'channel' && (
          <div className="space-y-6 animate-fadeIn">
            <ChannelSection
              videos={videos}
              onOpenAiWithTopic={handleOpenAiWithTopic}
            />
          </div>
        )}

        {activeTab === 'taxonomy' && (
          <div className="space-y-6 animate-fadeIn">
            <TaxonomyGuide
              categories={TAXONOMY_CATEGORIES_DATA}
              onOpenAiWithTopic={handleOpenAiWithTopic}
            />
          </div>
        )}
      </main>

      {/* 5. AI Chat Copilot Drawer */}
      <AIChatDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialPrompt={aiPrompt}
      />

      {/* 6. Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm">StableIntel</span>
              <span className="text-slate-600">|</span>
              <span>국내외 스테이블코인 인텔리전스 & 심층 리서치 허브 (실시간 자동 누적 시스템)</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-white transition-colors"
              >
                페그 대시보드
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className="hover:text-white transition-colors"
              >
                News ({news.length})
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className="hover:text-white transition-colors"
              >
                Report ({papers.length})
              </button>
              <button
                onClick={() => setActiveTab('channel')}
                className="hover:text-white transition-colors"
              >
                Channel ({videos.length})
              </button>
              <button
                onClick={() => setActiveTab('taxonomy')}
                className="hover:text-white transition-colors"
              >
                분류·규제
              </button>
              <button
                onClick={handleOpenGeneralAi}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                AI 리서치 코파일럿
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-900 text-center md:text-left text-[11px] text-slate-400 leading-relaxed">
            면책 조항: 본 플랫폼에서 제공하는 데이터와 AI 리서치 분석 결과는 정보 제공 및 학술 연구 목적이며, 특정 가상자산에 대한 투자 권유나 금융 자문이 아닙니다. 스테이블코인 페깅 데이터는 거래소 오더북 및 온체인 실사 보고서에 기반합니다.
          </div>
        </div>
      </footer>
    </div>
  );
}
