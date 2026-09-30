'use client';

import React, { useState, useMemo } from 'react';
import {
  ChannelVideo,
  ChannelCategoryType,
  DifficultyLevel,
} from '@/types';
import { ChannelProfile, FEATURED_CHANNELS } from '@/data/channelData';
import {
  Play,
  Tv,
  Youtube,
  Search,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
  Flame,
  Award,
} from 'lucide-react';

interface ChannelSectionProps {
  videos: ChannelVideo[];
  onOpenAiWithTopic: (topic: string) => void;
}

export function ChannelSection({
  videos,
  onOpenAiWithTopic,
}: ChannelSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ChannelCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyLevel>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<ChannelVideo | null>(null);
  const [expandedTakeaways, setExpandedTakeaways] = useState<Record<string, boolean>>({});

  const categories: { id: ChannelCategoryType; label: string; count: number; icon?: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: '전체 채널', count: videos.length },
    { id: 'stable_life', label: '슬기로운 스테이블코인생활', count: videos.filter((v) => v.channelCategory === 'stable_life').length },
    { id: 'upbit_care', label: '업비트 투자보호센터', count: videos.filter((v) => v.channelCategory === 'upbit_care').length },
    { id: 'decenter_news', label: '서울경제 디센터', count: videos.filter((v) => v.channelCategory === 'decenter_news').length },
    { id: 'mirae_smart', label: '미래에셋 스마트머니', count: videos.filter((v) => v.channelCategory === 'mirae_smart').length },
  ];

  const toggleTakeaways = (id: string) => {
    setExpandedTakeaways((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesCategory =
        selectedCategory === 'all' || v.channelCategory === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'all' || v.difficulty === selectedDifficulty;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.channelName.toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q)) ||
        v.relatedCoins.some((c) => c.toLowerCase().includes(q)) ||
        v.summaryPoints.some((p) => p.toLowerCase().includes(q));

      return matchesCategory && matchesDifficulty && matchesQuery;
    });
  }, [videos, selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyBadge = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            초급 입문
          </span>
        );
      case 'intermediate':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            중급 분석
          </span>
        );
      case 'advanced':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            심화 전문
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Section Header & Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2.5 mb-1">
            <div className="p-2 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400">
              <Youtube className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              스테이블코인 영상 채널 & 미디어 허브 (Channel)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            '슬기로운 스테이블코인생활', '업비트 투자보호센터', '서울경제 디센터', '미래에셋 스마트머니' 등 주요 미디어의 해설 영상과 3줄 핵심 요약 및 AI 연계 질의
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center space-x-3 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 text-xs shrink-0">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Tv className="w-4 h-4 text-red-400" />
            <span>큐레이션 영상</span>
            <span className="font-bold text-white">{videos.length}편</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>공식 파트너 채널</span>
            <span className="font-bold text-white">{FEATURED_CHANNELS.length}개</span>
          </div>
        </div>
      </div>

      {/* 2. Featured Channels Showcase Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {FEATURED_CHANNELS.map((ch) => (
          <div
            key={ch.id}
            className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={ch.avatarUrl}
                    alt={ch.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate max-w-[120px]">
                      {ch.name}
                    </h3>
                    <span className="text-[10px] text-slate-400">{ch.category}</span>
                  </div>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
                  {ch.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {ch.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
              <span className="text-slate-400 font-medium">구독자 {ch.subscribers}</span>
              <a
                href={ch.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold flex items-center space-x-1"
              >
                <span>채널 바로가기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="영상 제목, 채널명, 태그(AiFi, 테더, 원화코인, 준비금실사 등) 검색..."
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-slate-400">난이도:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 px-3 py-2 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="all">모든 난이도</option>
              <option value="beginner">초급 입문</option>
              <option value="intermediate">중급 분석</option>
              <option value="advanced">심화 전문</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-red-700/80 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center">
          <Tv className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300 mb-1">
            조건에 일치하는 영상 콘텐츠가 없습니다
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            검색어나 선택된 채널 카테고리를 변경해보세요.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isExpanded = expandedTakeaways[video.id];

            return (
              <div
                key={video.id}
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-lg shadow-black/20"
              >
                {/* Top: Video Thumbnail & Play Trigger */}
                <div>
                  <div
                    className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                    onClick={() => setActiveVideoModal(video)}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/40 group-hover:scale-110 transition-transform duration-200 pl-0.5">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                      {video.highlightBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white shadow-md">
                          {video.highlightBadge}
                        </span>
                      )}
                      {getDifficultyBadge(video.difficulty)}
                    </div>

                    {/* Bottom Info Pill */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono">
                      <Clock className="w-3 h-3 text-red-400" />
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    {/* Channel & Meta Row */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center space-x-2">
                        {video.channelAvatarUrl ? (
                          <img
                            src={video.channelAvatarUrl}
                            alt={video.channelName}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                        ) : (
                          <Youtube className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span className="font-semibold text-slate-300 truncate max-w-[130px]">
                          {video.channelName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400">
                        {video.views && (
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{video.views}</span>
                          </span>
                        )}
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{video.publishedAt}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm sm:text-base font-bold text-white hover:text-red-400 transition-colors line-clamp-2 cursor-pointer leading-snug group-hover:underline decoration-red-500/40"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span>{video.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>

                    {/* Related Coins & Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {video.relatedCoins.map((coin) => (
                        <span
                          key={coin}
                          className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold"
                        >
                          {coin}
                        </span>
                      ))}
                      {video.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 3-Line Executive Summary Box */}
                    <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Flame className="w-3 h-3 text-red-400" />
                        <span>영상 3줄 핵심 요약</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300 leading-relaxed">
                        {video.summaryPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-red-400 font-bold shrink-0 mt-0.5">
                              {idx + 1}.
                            </span>
                            <span className="text-[11px] leading-snug">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Key Takeaways */}
                    {video.keyTakeaways && video.keyTakeaways.length > 0 && (
                      <div className="pt-1">
                        <button
                          onClick={() => toggleTakeaways(video.id)}
                          className="flex items-center justify-between w-full text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1"
                        >
                          <span className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>시청 핵심 체크포인트 ({video.keyTakeaways.length})</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-lg space-y-1 animate-fadeIn">
                            {video.keyTakeaways.map((takeaway, tidx) => (
                              <div
                                key={tidx}
                                className="flex items-start space-x-2 text-[11px] text-emerald-200"
                              >
                                <span className="text-emerald-400 shrink-0">•</span>
                                <span>{takeaway}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 pt-0 flex items-center justify-between gap-1.5 border-t border-slate-800/80 mt-3 pt-3">
                  <button
                    onClick={() =>
                      onOpenAiWithTopic(
                        `영상 [${video.title}](${video.channelName})의 주요 내용을 바탕으로, 스테이블코인 시장 영향과 핵심 쟁점을 분석해줘.`
                      )
                    }
                    className="p-2 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-xs font-semibold transition-colors flex items-center space-x-1"
                    title="AI 질의"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">AI 질의</span>
                  </button>

                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
                    title="YouTube 사이트에서 영상 보기"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span className="hidden sm:inline">YouTube</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    onClick={() => setActiveVideoModal(video)}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>재생 & 요약</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Interactive Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-red-600/10 text-red-400 border border-red-500/20">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
                    {activeVideoModal.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {activeVideoModal.channelName} • {activeVideoModal.publishedAt}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-5 space-y-5 flex-1">
              {/* YouTube Video Player Simulation / Iframe */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                {activeVideoModal.embedUrl ? (
                  <iframe
                    src={activeVideoModal.embedUrl}
                    title={activeVideoModal.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <img
                      src={activeVideoModal.thumbnailUrl}
                      alt={activeVideoModal.title}
                      className="w-full h-full object-cover absolute inset-0 opacity-40"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <a
                        href={activeVideoModal.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl pl-1 mb-3 transition-transform hover:scale-110"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </a>
                      <p className="text-sm font-bold text-white">
                        YouTube에서 직접 시청하기
                      </p>
                      <span className="text-xs text-slate-400 mt-1">
                        클릭 시 해당 공식 채널 재생 페이지로 이동합니다
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Insights & AI triggers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3-Line Summary */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    <span>3줄 핵심 해설 요약</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeVideoModal.summaryPoints.map((pt, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-red-400 font-bold shrink-0">{i + 1}.</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Takeaways */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>핵심 인사이트 & 투자자 유의점</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeVideoModal.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start space-x-2 text-emerald-200/90">
                        <span className="text-emerald-400 shrink-0">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
              <a
                href={activeVideoModal.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <span>YouTube 원본 채널 방문</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const v = activeVideoModal;
                    setActiveVideoModal(null);
                    onOpenAiWithTopic(
                      `[${v.title}] 영상에서 다룬 내용을 토대로, 한국 가상자산 2단계 입법 및 글로벌 스테이블코인 시장에 미칠 영향을 상세히 브리핑해줘.`
                    );
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>AI 코파일럿으로 심층 분석 질의</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
