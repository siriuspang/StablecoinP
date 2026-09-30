import {
  StablecoinMarketData,
  NewsArticle,
  ResearchPaper,
  TaxonomyCategory,
  ChannelVideo,
} from '@/types';
import { initialStablecoinData } from './marketData';
import { initialNewsData } from './newsData';
import { initialPapersData } from './papersData';
import { stablecoinTaxonomy } from './taxonomyData';
import { initialChannelVideos, FEATURED_CHANNELS, ChannelProfile } from './channelData';

export const STABLECOINS_DATA: StablecoinMarketData[] = initialStablecoinData;

export const NEWS_ARTICLES_DATA: NewsArticle[] = initialNewsData;

export const RESEARCH_PAPERS_DATA: ResearchPaper[] = initialPapersData;

export const TAXONOMY_CATEGORIES_DATA: TaxonomyCategory[] = stablecoinTaxonomy;

export const CHANNEL_VIDEOS_DATA: ChannelVideo[] = initialChannelVideos;

export const FEATURED_CHANNELS_DATA: ChannelProfile[] = FEATURED_CHANNELS;


export interface RegulationComparison {
  feature: string;
  korea: string;
  us: string;
  eu: string;
}

export const REGULATION_COMPARISON_DATA: RegulationComparison[] = [
  {
    feature: '법적 체계 및 소관 당국',
    korea: '가상자산이용자보호법 2단계 (금융위원회 및 한국은행 공동 감독)',
    us: '지급결제 스테이블코인 명확화법 (연방준비제도 Fed 및 OCC, 주 규제청)',
    eu: '가상자산시장법 MiCA (유럽은행감독청 EBA 및 각 회원국 금융당국)',
  },
  {
    feature: '발행 라이선스 및 자격 요건',
    korea: '금융당국 엄격 인가제 (자본금 50억 원 이상, 시중은행 51% 이상 컨소시엄 또는 전자금융업자)',
    us: '연방·주 규제당국 2단계 인가제 (비은행 발행사에 대한 연준 마스터 계좌 감독)',
    eu: '전자화폐기관(EMI) 또는 신용기관(Credit Institution) 라이선스 필수화',
  },
  {
    feature: '준비자산 담보 및 신탁 요건',
    korea: '한국은행 당좌예치금 및 통안채·단기국채 100% 안전자산 격리 신탁 의무화',
    us: '미국 재무부 단기 국채(T-Bills), 역환매조건부채권(Repo), 연준 당좌예금 100%',
    eu: '준비금의 최소 30~60% 이상을 EU 역내 복수 공인 은행에 현금 분산 예치 + 안전자산 100%',
  },
  {
    feature: '파산 격리 및 이용자 보호',
    korea: '신탁법상 고유재산 분리신탁에 따른 법적 도치(Bankruptcy-remote) 100% 보호',
    us: '연방 파산법상 수탁자산 우선 변제권 및 특별 분리계좌 의무화',
    eu: '발행사 파산 시 토큰 보유자에 대한 법적 1순위 직접 환매 청구권(Direct Right of Redemption)',
  },
  {
    feature: '이자 지급 및 수익 배분 규제',
    korea: '결제용 원화 코인의 무조건적 이자 지급은 은행 예금 이탈 방지를 위해 제한 (예금토큰만 허용)',
    us: '단순 결제용 코인은 무이자 원칙, 이자수익형(RWA)은 SEC 등록 증권(Securities) 규제 적용',
    eu: 'EMT(전자화폐토큰) 및 ART 보유자에 대한 발행사의 이자 지급 전면 금지',
  },
  {
    feature: '무담보/알고리즘 코인 규제',
    korea: '무담보 알고리즘 스테이블코인은 발행 및 국내 거래소 상장 원천 불허 (네거티브 규제)',
    us: '내생적 담보 기반 알고리즘 스테이블코인 신규 발행 2년간 전면 유예 및 금지',
    eu: '적격 준비자산이 수탁되지 않은 알고리즘 코인은 자산준거토큰(ART) 인가 불가',
  },
];
