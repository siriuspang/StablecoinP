export type CollateralType =
  | 'fiat-backed'
  | 'crypto-backed'
  | 'synthetic-dollar'
  | 'algorithmic'
  | 'rwa-yield';

export interface StablecoinMarketData {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  pegTarget: number;
  pegDeviationPercent: number;
  status: 'normal' | 'caution' | 'alert' | 'critical';
  marketCapUsd: number;
  volume24hUsd: number;
  collateralType: CollateralType;
  issuer: string;
  chainEcosystem: string[];
  reserveComposition: string;
  auditFrequency: string;
  yieldRatePercent?: number;
  sparkline7d: number[];
}

export type NewsCategory = 'all' | 'domestic' | 'global' | 'regulatory' | 'issuer';

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  sourceType: 'domestic' | 'global';
  category: NewsCategory;
  publishedAt: string;
  url: string;
  thumbnailUrl?: string;
  tags: string[];
  relatedCoins: string[];
  summaryPoints: [string, string, string]; // 3-line executive summary
  impactLevel: 'high' | 'medium' | 'low';
  impactAnalysis: {
    domesticMarket: string;
    regulatoryImplication: string;
    investorAction: string;
  };
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type PaperCategory =
  | 'monetary-stability'
  | 'depeg-dynamics'
  | 'collateral-risk'
  | 'regulatory-framework'
  | 'cbdc-coexistence'
  | 'ai-finance'
  | 'macro-economy'
  | 'banking-industry';

export type SourceType =
  | 'kdi'
  | 'keri'
  | 'nabo'
  | 'kif'
  | 'miraeasset'
  | 'bok'
  | 'bis'
  | 'imf'
  | 'fed'
  | 'academic_journal'
  | 'arxiv'
  | 'industry_report';

export interface ResearchPaperQuiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ResearchPaperGlossary {
  term: string;
  definition: string;
}

export interface ResearchPaper {
  id: string;
  titleEn: string;
  titleKo: string;
  authors: string[];
  institutions: string[];
  publishedDate: string;
  sourceVenue: string; // e.g. BIS Working Papers, IMF, arXiv, Bank of Korea, Mirae Asset Securities
  sourceType: SourceType;
  pdfUrl?: string;
  originalUrl: string;
  difficulty: DifficultyLevel;
  category: PaperCategory;
  tags: string[];
  targetCoins?: string[];
  
  // 6-Section Structured Study Module
  executiveSummary: {
    background: string;
    keyFindings: string[];
  };
  coreMechanicsModel: {
    overview: string;
    formulaOrLogic?: string;
    equilibriumConditions: string;
  };
  stressTestVulnerabilities: {
    failureScenarios: string[];
    historicalComparisons: string;
  };
  policyAndInvestmentTakeaways: {
    forRegulators: string;
    forInvestors: string;
  };
  quizzes: ResearchPaperQuiz[];
  glossary: ResearchPaperGlossary[];
}

export interface TaxonomyCategory {
  id: CollateralType;
  nameKo: string;
  nameEn: string;
  description: string;
  representativeCoins: string[];
  marketShareEstimate: string;
  advantages: string[];
  riskFactors: string[];
  regulatoryStatusKo: string;
  regulatoryStatusGlobal: string;
}

export type ChannelCategoryType =
  | 'all'
  | 'stable_life'     // 슬기로운 스테이블코인생활
  | 'upbit_care'      // 업비트 투자보호센터
  | 'decenter_news'   // 서울경제 디센터
  | 'mirae_smart'     // 미래에셋 스마트머니
  | 'global_macro';   // 글로벌 매크로 & 디파이

export interface ChannelVideo {
  id: string;
  title: string;
  channelName: string;
  channelCategory: ChannelCategoryType;
  channelAvatarUrl?: string;
  videoUrl: string;
  embedUrl?: string;
  thumbnailUrl: string;
  duration: string;
  publishedAt: string;
  views?: string;
  tags: string[];
  relatedCoins: string[];
  summaryPoints: [string, string, string]; // 3-line executive highlights
  keyTakeaways: string[];
  difficulty: DifficultyLevel;
  highlightBadge?: string;
}

