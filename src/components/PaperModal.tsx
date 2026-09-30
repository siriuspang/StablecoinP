'use client';

import React, { useState } from 'react';
import { ResearchPaper } from '@/types';
import {
  BookOpen,
  X,
  ExternalLink,
  Award,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Brain,
  Layers,
} from 'lucide-react';

interface PaperModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
  onOpenAiWithTopic?: (prompt: string) => void;
}

export function PaperModal({ paper, onClose, onOpenAiWithTopic }: PaperModalProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<Record<number, boolean>>({});

  if (!paper) return null;

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (submittedQuiz[qIdx]) return; // locked once checked
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleCheckQuiz = (qIdx: number) => {
    setSubmittedQuiz((prev) => ({ ...prev, [qIdx]: true }));
  };

  const copyCitation = () => {
    const citation = `${paper.authors.join(', ')} (${paper.publishedDate.slice(0, 4)}). "${paper.titleEn}". ${paper.sourceVenue}.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const steps = [
    { num: 1, title: '메타 및 개요' },
    { num: 2, title: '30초 핵심 요약' },
    { num: 3, title: '이론 및 페그 메커니즘' },
    { num: 4, title: '스트레스 취약점' },
    { num: 5, title: '정책·투자 시사점' },
    { num: 6, title: '퀴즈 & 용어사전' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-fadeIn">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                {paper.sourceVenue}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                난이도: {paper.difficulty === 'advanced' ? '고급 (Advanced)' : paper.difficulty === 'beginner' ? '입문/실무 (Beginner)' : '중급 (Intermediate)'}
              </span>
              <span className="text-[11px] text-slate-400">{paper.publishedDate}</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
              {paper.titleKo}
            </h2>
            <p className="text-xs text-slate-400 font-serif italic">
              {paper.titleEn}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Step Navigation Pills */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center space-x-1 overflow-x-auto no-scrollbar">
          {steps.map((step) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeStep === step.num
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold">
                {step.num}
              </span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* STEP 1: Metadata & Original Link */}
          {activeStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  연구 개요 및 저자 정보
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">공동 저자:</span>
                    <span className="text-white font-medium">{paper.authors.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">발행 기관:</span>
                    <span className="text-white font-medium">{paper.institutions.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">출처 및 권호:</span>
                    <span className="text-white font-medium">{paper.sourceVenue}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">대상 스테이블코인:</span>
                    <span className="text-blue-300 font-mono font-medium">
                      {paper.targetCoins?.join(', ') || '전체 스테이블코인 생태계'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Citation Copy Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="text-xs font-mono text-slate-400 truncate">
                  {paper.authors.join(', ')} ({paper.publishedDate.slice(0, 4)}). &quot;{paper.titleEn}&quot;. {paper.sourceVenue}.
                </div>
                <button
                  onClick={copyCitation}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors shrink-0"
                >
                  {copiedCitation ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>인용 복사</span>
                    </>
                  )}
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={paper.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <span>원문 페이지 바로가기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center space-x-1.5 transition-colors border border-slate-700"
                  >
                    <span>원문 PDF 다운로드</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: 30-Second Executive Summary */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>연구 배경 및 문제의식 (Background)</span>
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {paper.executiveSummary.background}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">
                  핵심 발견점 3가지 (Key Findings)
                </h4>
                <div className="space-y-3">
                  {paper.executiveSummary.keyFindings.map((point, i) => (
                    <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        {i + 1}
                      </span>
                      <p className="text-slate-200 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Core Mechanics & Theoretical Model */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                  이론 모형 및 아키텍처 개요
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {paper.coreMechanicsModel.overview}
                </p>
              </div>

              {paper.coreMechanicsModel.formulaOrLogic && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    수리 모델 및 페깅 수렴 공식 (Equilibrium Formula)
                  </h4>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto">
                    <code>{paper.coreMechanicsModel.formulaOrLogic}</code>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  페깅 유지 균형 조건 (Equilibrium Conditions)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {paper.coreMechanicsModel.equilibriumConditions}
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Stress Test & Vulnerabilities */}
          {activeStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
                <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>극단적 스트레스 시나리오 (Stress Test Failure Scenarios)</span>
                </h4>
                <div className="space-y-2.5">
                  {paper.stressTestVulnerabilities.failureScenarios.map((sc, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <p className="text-slate-200">{sc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  역사적 위기 비교 (Historical Comparisons)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {paper.stressTestVulnerabilities.historicalComparisons}
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Policy & Investor Takeaways */}
          {activeStep === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4" />
                  <span>규제 당국 (Policy & Regulators)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {paper.policyAndInvestmentTakeaways.forRegulators}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Brain className="w-4 h-4" />
                  <span>투자자 및 기관 (Investors & Market)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {paper.policyAndInvestmentTakeaways.forInvestors}
                </p>
              </div>
            </div>
          )}

          {/* STEP 6: Interactive Quizzes & Glossary */}
          {activeStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Interactive Quizzes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Award className="w-4 h-4" />
                  <span>학습 자가진단 퀴즈 (Interactive Quiz)</span>
                </h4>

                {paper.quizzes.map((quiz, qIdx) => {
                  const selected = quizAnswers[qIdx];
                  const isSubmitted = submittedQuiz[qIdx];
                  const isCorrect = selected === quiz.answerIndex;

                  return (
                    <div
                      key={qIdx}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                    >
                      <div className="font-semibold text-xs sm:text-sm text-white">
                        Q{qIdx + 1}. {quiz.question}
                      </div>

                      <div className="space-y-2">
                        {quiz.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let btnStyle =
                            'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

                          if (isOptionSelected) {
                            btnStyle = 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold';
                          }

                          if (isSubmitted) {
                            if (optIdx === quiz.answerIndex) {
                              btnStyle =
                                'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-semibold';
                            } else if (isOptionSelected && !isCorrect) {
                              btnStyle =
                                'bg-red-600/20 border-red-500 text-red-300 font-semibold';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(qIdx, optIdx)}
                              className={`w-full text-left p-2.5 rounded-lg border text-xs sm:text-sm transition-all ${btnStyle}`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] shrink-0">
                                  {optIdx + 1}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {!isSubmitted ? (
                        <button
                          disabled={selected === undefined}
                          onClick={() => handleCheckQuiz(qIdx)}
                          className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            selected === undefined
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                          }`}
                        >
                          정답 확인하기
                        </button>
                      ) : (
                        <div
                          className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                              : 'bg-red-950/30 border-red-500/40 text-red-200'
                          }`}
                        >
                          <div className="font-bold flex items-center space-x-1.5 mb-1">
                            {isCorrect ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span>정답입니다!</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span>틀렸습니다. (정답: {quiz.answerIndex + 1}번)</span>
                              </>
                            )}
                          </div>
                          <p className="text-slate-300">{quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Glossary */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>핵심 금융·크립토 용어 사전 (Glossary)</span>
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {paper.glossary.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
                    >
                      <span className="font-bold text-xs text-white block mb-0.5">
                        {item.term}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            ← 이전 단계
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const prompt = `"${paper.titleKo} (${paper.titleEn})" 논문의 핵심 발견점과 통화정책 및 투자자에 대한 함의를 상세히 설명해줘.`;
                onClose();
                onOpenAiWithTopic?.(prompt);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold flex items-center space-x-1 border border-blue-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>논문 기반 AI 질의</span>
            </button>

            {activeStep < 6 ? (
              <button
                onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center space-x-1 shadow-md shadow-blue-600/30"
              >
                <span>다음 단계</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>학습 완료</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
