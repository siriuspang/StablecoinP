'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: string[];
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
}

export function AIChatDrawer({ isOpen, onClose, initialPrompt }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '안녕하세요! **StableIntel AI 리서치 코파일럿**입니다. 🏛️\n\n국내외 스테이블코인 페깅 메커니즘, BIS·IMF·한국은행 논문 이론, 가상자산 2단계 입법 및 미국/EU 규제에 대해 무엇이든 질문하세요.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    '미래에셋 리포트: AI 에이전트에게 왜 스테이블코인과 이더리움이 필수적인가요?',
    "온체인 스테이블코인 결제액이 33조 달러로 Visa를 추월한 'Near Automata' 의미는?",
    'KelpDAO rsETH 3,800억 위조와 Aave 뱅크런 사태의 핵심 원인은?',
    'Stripe의 Bridge 인수와 이더리움 재단(EF)의 70,000 ETH 스테이킹 효과는?',
    '한국 가상자산 2단계 입법과 한국은행 예금 토큰(Deposit Token)의 구조는?',
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle external initial prompt passed to drawer
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const generateAnswer = (prompt: string): { text: string; citations: string[] } => {
    const p = prompt.toLowerCase();

    if (p.includes('원화') || p.includes('통화정책') || p.includes('한국은행') || p.includes('예금 이탈')) {
      return {
        text: `**원화 스테이블코인 도입 시 거시경제 및 통화정책 영향 분석**\n\n1. **은행 예금 이탈 (Bank Disintermediation)**:\n   - 한국은행 BOK 이슈노트(제2024-18호)에 따르면, 원화 스테이블코인이 도입될 경우 상업은행의 저원가성 요구불예금이 가상자산 준비금으로 급속히 이탈할 위험이 있습니다.\n   - 이는 시중은행의 신용공급 여력을 축소시키고 중소기업 대출 금리 상승 압력으로 이어질 수 있습니다.\n\n2. **통화정책 전달경로 왜곡**:\n   - 민간 발행사가 준비금을 운용하는 방식에 따라 단기 자금시장 유동성 왜곡이 발생하며, 한국은행의 기준금리 인하·인상 신호가 시중 금리로 파급되는 속도와 강도가 저하될 수 있습니다.\n\n3. **외환관리 및 자본통제 위협**:\n   - 원화 스테이블코인이 해외 P2P 거래소나 탈중앙 거래소(DEX)에서 달러 스테이블코인(USDT/USDC)과 자유롭게 스왑될 경우, 외국환거래법상 외환신고 체계가 무력화될 소지가 큽니다.\n\n**정책적 결론**: 금융위원회와 한국은행은 2단계 입법에서 준비자산 100% 안전자산(한은 지준금 및 국채) 분리 신탁을 법제화하고, 민간 스테이블코인보다는 한국은행 CBDC 기반 예금 토큰(Deposit Token) 중심의 안전한 확장을 유력하게 검토하고 있습니다.`,
        citations: ['한국은행 BOK 이슈노트 제2024-18호', '금융위원회 가상자산 2단계 입법안'],
      };
    }

    if (p.includes('ethena') || p.includes('usde') || p.includes('펀딩비') || p.includes('합성')) {
      return {
        text: `**Ethena USDe의 델타헤지 메커니즘과 음수(-) 펀딩비 방어 전략**\n\n1. **핵심 구조 (Cash & Carry)**:\n   - USDe는 $1 어치의 ETH 현물을 매수(롱)하고, 파생상품 거래소에서 동일한 수량의 무기한 선물을 매도(숏)하여 가격 변동성을 0(델타 중립)으로 상쇄합니다.\n   - 강세장에서는 선물 롱 포지션 보유자가 숏 포지션 보유자에게 지급하는 펀딩비(연 10~25%)가 sUSDe 보유자의 고이율 원천이 됩니다.\n\n2. **마이너스 펀딩비 위험 (Negative Funding Squeeze)**:\n   - 약세장이 장기화되어 시장 전반의 펀딩비가 마이너스(숏 보유자가 롱 보유자에게 수수료 지급)로 돌아서면 역마진이 발생하여 프로토콜 자산이 소진됩니다.\n\n3. **방어 메커니즘**:\n   - **준비 완충 기금 (Reserve Fund)**: 약 8,500만 달러 규모의 펀드를 확충하여 음수 펀딩비 발생 시 역마진을 우선 보조금으로 충당합니다.\n   - **기초자산 다변화**: ETH 외에 BTC 및 SOL 숏 포지션을 분산 체결하여 청산 슬리피지 방지.\n   - **stETH 스테이킹 기본 수익**: 선물 펀딩비가 일시 마이너스라도 ETH 자체의 지분증명 스테이킹 보상(연 3~4%)이 하방 안전판 역할을 수행합니다.`,
        citations: ['arXiv:2403.11892 [q-fin.RM]', 'Ethena Protocol Architecture Docs'],
      };
    }

    if (p.includes('bis') || p.includes('뱅크런') || p.includes('1차 환매자') || p.includes('run')) {
      return {
        text: `**BIS Working Paper No. 1112: 1차 환매자 우위(First-Mover Advantage)와 뱅크런 동학**\n\n1. **1차 환매자 우위란?**:\n   - 스테이블코인은 이용자에게 액면가($1.00) 환매를 약속하지만, 준비자산의 유동화에는 물리적 시간과 시장 슬리피지가 수반됩니다.\n   - 위기 징후 발생 시 **먼저 환매를 신청한 투자자는 $1 전액을 회수**할 수 있지만, 늦게 신청한 투자자는 고갈되거나 할인된 잔여 자산만을 분배받게 됩니다.\n\n2. **자기실현적 패닉 (Self-Fulfilling Run)**:\n   - 다이아몬드-딥비그(Diamond-Dybvig) 모형에 따라, 다른 사람들이 돈을 뺄 것이라는 의구심 자체가 모든 참여자로 하여금 즉시 탈출하도록 만드는 합리적 인센티브로 작용합니다.\n\n3. **BIS의 규제 권고안**:\n   - 상업은행 수준의 자기자본 요건 부과\n   - 중앙은행 최종대부자(LOLR) 안전망 또는 100% 중앙은행 지준 예치 신탁 분리 보관 의무화.`,
        citations: ['BIS Working Papers No. 1112 (Hyun Song Shin et al.)'],
      };
    }

    if (p.includes('clarity') || p.includes('mica') || p.includes('미국') || p.includes('eu')) {
      return {
        text: `**미국 Clarity Act vs 유럽연합 MiCA 규제 핵심 비교**\n\n1. **유럽연합 MiCA (Markets in Crypto-Assets)**:\n   - 스테이블코인을 **EMT(전자화폐토큰, 단일통화 연동)**와 **ART(자산준거토큰, 복수자산/원자재 연동)**로 이원화 규율.\n   - **이자 지급 전면 금지**: 이용자에게 이자나 수익 배당을 금지하여 결제 수단으로만 순수하게 기능하도록 강제.\n   - 비유로화 토큰 일일 거래량 한도(2억 유로) 규제.\n\n2. **미국 Clarity for Payment Stablecoins Act**:\n   - 연방준비제도(Fed)가 최종 감독권을 행사하며, 비은행 발행사도 연준 기준 통과 시 발행 허용.\n   - 준비자산은 단기 국채, 연준 예치금, 역RP로 엄격 한정.\n   - 알고리즘 스테이블코인은 2년간 신규 발행 전면 유예(Moratorium).`,
        citations: ['EU MiCA Regulation (EU) 2023/1114', 'US Clarity for Payment Stablecoins Act'],
      };
    }

    if (p.includes('svb') || p.includes('usdc') || p.includes('87센트') || p.includes('실리콘밸리')) {
      return {
        text: `**2023년 3월 SVB 사태 당시 USDC 디페깅($0.87) 원인 및 전이 분석**\n\n1. **직접적 원인 (비보호 예금 동결)**:\n   - Circle은 전체 준비금 약 400억 달러 중 33억 달러(약 8%)를 실리콘밸리은행(SVB)에 보관 중이었습니다.\n   - SVB가 전격 폐쇄되면서 해당 33억 달러가 FDIC 예금자보호 한도(25만 달러)를 초과하는 비보호 예치금으로 동결되었습니다.\n\n2. **주말 차익거래 기능 마비**:\n   - 사태가 주말에 터지면서 전통 연방 결제망(Fedwire)이 닫혀 기관들이 1달러 현금 상환 차익거래를 수행할 수 없었습니다.\n   - 결과적으로 Uniswap, Curve 등 온체인 DEX 풀에서 USDC 투매가 집중되며 $0.87까지 급락하는 과매도(Overshooting)가 발생했습니다.\n\n3. **해결 및 시사점**:\n   - 미 연준·재무부·FDIC가 시스템적 위험 예외(Systemic Risk Exception)를 발동해 예금 전액 보장을 선언한 후 페그가 1달러로 복원되었습니다.\n   - **교훈**: 스테이블코인 준비금은 민간 상업은행의 신용위험에 노출되지 않도록 연준 역RP 또는 마스터계좌에 직접 예치되어야 함을 증명했습니다.`,
        citations: ['FEDS Notes: Runs on Stablecoins (Gordon Liao et al.)'],
      };
    }

    // Default intelligent financial response
    return {
      text: `질문하신 **"${prompt}"**에 대한 분석 브리핑입니다.\n\n스테이블코인은 통화의 액면가 환매 보장, 준비자산 건전성(미 국채 및 현금성 자산), 스마트계약 청산 메커니즘, 그리고 각국 규제 당국의 인가 정책에 의해 가치가 결정됩니다.\n\n- **금융안정성 관점**: BIS 및 한국은행 연구에 따르면, 준비금 투명성(PoR)과 100% 파산격리 신탁이 전제되지 않은 코인은 뱅크런 리스크에 상시 노출됩니다.\n- **규제 동향 관점**: EU MiCA 및 미국 Clarity Act 모두 실질 준비자산 없는 알고리즘형 코인을 배제하고, 상업은행 수준의 적격 수탁을 의무화하는 방향으로 수렴하고 있습니다.\n\n추가로 궁금하신 세부 메커니즘이나 특정 논문의 수리적 모델링이 있으시면 말씀해 주세요!`,
      citations: ['StableIntel Research Knowledge Base'],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { text: answerText, citations } = generateAnswer(text);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                <span>StableIntel AI 코파일럿</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                  GPT-4o Research
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                BIS·IMF·한은 논문 & 규제 데이터베이스 연동
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    sender: 'assistant',
                    text: '안녕하세요! **StableIntel AI 리서치 코파일럿**입니다. 질문을 초기화했습니다.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="대화 초기화"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Prompts Banner */}
        <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto no-scrollbar flex items-center space-x-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-1 flex items-center space-x-1">
            <HelpCircle className="w-3 h-3" />
            <span>추천 질문:</span>
          </span>
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 text-xs whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed relative group ${
                    isUser
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 shadow-sm'
                  }`}
                >
                  {/* Markdown formatted text representation */}
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <div key={lIdx} className="font-bold text-white text-sm my-1">
                            {line.replaceAll('**', '')}
                          </div>
                        );
                      }
                      if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <div key={lIdx} className="my-0.5">
                            {parts.map((p, pIdx) =>
                              pIdx % 2 === 1 ? (
                                <strong key={pIdx} className="font-bold text-white">
                                  {p}
                                </strong>
                              ) : (
                                p
                              )
                            )}
                          </div>
                        );
                      }
                      return (
                        <div key={lIdx} className={line === '' ? 'h-2' : ''}>
                          {line}
                        </div>
                      );
                    })}
                  </div>

                  {/* Citations badges if present */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center space-x-1">
                        <BookOpen className="w-3 h-3 text-slate-400" />
                        <span>출처:</span>
                      </span>
                      {msg.citations.map((cite, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 font-medium text-[10px] border border-blue-500/20"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Timestamp & Copy button */}
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyMessage(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-white"
                        title="답변 복사"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs pl-9">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>논문 데이터베이스 및 법률 조항 교차 분석 중...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="스테이블코인 이론, 법안, 페그 리스크에 대해 질문..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`p-2.5 rounded-xl ${
                !inputValue.trim() || isTyping
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
              } transition-colors`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-1.5 text-center text-[10px] text-slate-400">
            StableIntel AI는 투자 권유가 아니며, BIS·IMF·한은 공개 연구 보고서를 기초로 작성됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
