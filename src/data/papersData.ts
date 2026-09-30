import { ResearchPaper } from '@/types';

export const initialPapersData: ResearchPaper[] = [
  {
    id: 'miraeasset-2026-aifi',
    titleEn: 'AiFi: Why Autonomous AI Agents Need Ethereum and Stablecoins',
    titleKo: 'AiFi: 자율 AI 에이전트와 이더리움·스테이블코인이 필요한 이유',
    authors: ['한종목 (수석연구위원)'],
    institutions: ['미래에셋증권 리서치센터 (Mirae Asset Securities)'],
    publishedDate: '2026-02-04',
    sourceVenue: '미래에셋증권 Market Insight 리서치',
    sourceType: 'miraeasset',
    pdfUrl: 'file:///Contents/20260204_디지털자산과 AI.pdf',
    originalUrl: 'https://securities.miraeasset.com',
    difficulty: 'beginner',
    category: 'ai-finance',
    tags: ['AiFi', 'AI에이전트', 'Coinbase AgentKit', 'x402결제', 'ERC-8004', '마이크로결제', '미래에셋증권'],
    targetCoins: ['USDC', 'USDT', 'PYUSD'],
    executiveSummary: {
      background:
        'LLM의 진화로 인간의 개입 없이 자율적으로 판단하고 행동하는 AI 에이전트가 현실화되고 있으나, 전통 금융망(은행 계좌, 신용카드)의 인간 중심 본인인증(KYC) 체계는 AI 에이전트에게 닫혀 있습니다. 본 보고서는 왜 AI 에이전트의 경제 활동(Missing Link)에 블록체인 스마트 컨트랙트와 스테이블코인이 필수적인지 실무적·기술적 관점에서 규명합니다.',
      keyFindings: [
        'AI 경제의 Missing Link 해결: AI 에이전트는 법인격이나 주민등록번호가 없어 전통 은행 계좌를 개설할 수 없지만, 비대칭 암호화 키페어(Private Key)를 통해 즉시 온체인 지갑을 보유하고 자율적 금융 주체로 활동할 수 있음.',
        '기계 간 결제(M2M)의 기축통화 = 스테이블코인: API 호출당 $0.001 단위의 초소액 마이크로 결제(Micropayments)와 GPU 연산 자원 구매에서 가격 변동성이 없는 법정화폐 담보 스테이블코인(USDC, PYUSD)이 표준 결제 수단으로 확립됨.',
        'Coinbase AgentKit 및 ERC-8004 표준 도입: 자율 에이전트의 온체인 신원(Identity), 평판 점수, 복합 다자간 트랜잭션을 자동화하는 프로토콜이 도입되어 에이전트 금융(AiFi) 생태계가 급격히 확장 중임.',
      ],
    },
    coreMechanicsModel: {
      overview:
        'AI Agentic Finance(AiFi) 아키텍처는 [AI 추론 엔진] ↔ [온체인 지갑(AgentKit)] ↔ [x402 결제 프로토콜] ↔ [스마트 컨트랙트/스테이블코인 정산 레이어]로 구성됩니다. 에이전트는 프롬프트 목표를 달성하기 위해 실시간 비용-편익 최적화 알고리즘을 수행합니다.',
      formulaOrLogic:
        'Cost_{task} = \\sum_{i=1}^n (P_{API, i} \\times Q_i) + Gas_{L2}(ETH) \\le \\text{Budget}_{allocated}\n\n- P_{API}: x402 프로토콜을 통해 스테이블코인(USDC)으로 실시간 결제되는 마이크로 API 단가\n- Gas_{L2}: 이더리움 L2(Base, Arbitrum) 상의 초저비용 실행 가스비\n- Budget: 사용자 또는 프로토콜이 AI 에이전트에 스마트 컨트랙트로 위임한 지출 한도',
      equilibriumConditions:
        '자율 결제 안정성 조건: AI 에이전트 간 트랜잭션 완결성 지연 시간(Latency)이 1초 이내여야 하며, 가스비가 결제 대금의 0.1% 미만을 유지할 때 인간의 수동 개입 없는 자율 거래 균형(Automated Equilibrium)이 달성됨.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '프롬프트 인젝션 및 지갑 탈취: 악의적인 적대적 프롬프트를 통해 AI 에이전트의 개인키가 유출되거나 허가되지 않은 지출 트랜잭션이 서명되는 리스크.',
        '마이크로 결제 가스비 급등: 메인넷 혼잡으로 인해 L2 수수료가 일시 급등할 경우, 소액 결제 비용이 배보다 배꼽이 커져 에이전트 루프가 중단되는 현상.',
        '오라클 결제 데이터 변조: AI 에이전트가 참조하는 외부 데이터 피드(API 시세)가 조작되어 비정상적인 가격에 스테이블코인이 자동 이체되는 시나리오.',
      ],
      historicalComparisons:
        '과거 고빈도 알고리즘 매매(HFT)의 플래시 크래시와 유사하게, 자율 에이전트 간의 연쇄적인 자동 재정거래 및 결제 오류가 발생할 경우 온체인 유동성이 순간적으로 왜곡될 수 있음을 경고합니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        'AI 에이전트 지갑에 대한 스마트 컨트랙트 기반 지출 한도(Spending Cap) 및 소유자 책임 귀속(Proof of Ownership) 규정을 마련하고, 자금세탁(AML) 방지를 위한 에이전트 개발사 인증 체계 수립 필요.',
      forInvestors:
        'AI 에이전트 결제 인프라(Coinbase AgentKit, x402, ERC-8004 표준 지원 체인)와 에이전트 기축통화로 락인되는 USDC 생태계의 트랜잭션 성장률을 핵심 투자 지표로 삼아야 합니다.',
    },
    quizzes: [
      {
        question: '미래에셋증권 리서치에서 밝힌 AI 에이전트가 전통 은행 대신 블록체인과 스테이블코인을 사용하는 가장 근본적인 이유는?',
        options: [
          '전통 은행의 송금 수수료가 너무 비싸기만 해서',
          'AI 에이전트는 법인격/주민등록이 없어 은행 계좌 개설이 불가능하지만, 암호화폐 지갑(Private Key)은 즉시 생성하여 자율 결제가 가능하기 때문',
          '모든 AI 모델이 이더리움 재단에서 직접 개발되었기 때문',
          '스테이블코인이 비트코인보다 가격 변동성이 훨씬 크기 때문',
        ],
        answerIndex: 1,
        explanation:
          'AI 에이전트는 실물 신분증이나 법인격이 없어 전통 은행 계좌를 직접 열 수 없으나, 블록체인에서는 공개키 암호학(Private Key)을 통해 즉시 주권을 가진 결제 주체로 동작할 수 있습니다.',
      },
      {
        question: 'AiFi(에이전트 금융) 환경에서 마이크로 API 결제 및 컴퓨팅 자원 정산에 가장 적합한 통화는?',
        options: [
          '가격 변동성이 큰 밈코인',
          '가격 변동성이 극심한 고변동성 파생 토큰',
          '미국 달러 등 법정화폐 가치에 1:1 고정된 법정화폐 담보 스테이블코인(USDC, PYUSD)',
          '중앙은행의 비공개 폐쇄형 화폐',
        ],
        answerIndex: 2,
        explanation:
          'AI 에이전트가 예산 범위 내에서 신뢰성 있게 자원을 구매하고 서비스를 정산하기 위해서는 가격 변동 리스크가 없는 1달러 고정 스테이블코인이 필수적입니다.',
      },
      {
        question: 'AI 에이전트의 온체인 지갑 탈취 및 비정상 과지출을 방지하기 위한 기술적 안전장치로 가장 적절한 것은?',
        options: [
          'AI에게 지갑의 마스터 비밀키를 일반 텍스트로 프롬프트에 제공하기',
          '스마트 컨트랙트 기반의 다중 서명(Multisig) 및 일일 지출 한도(Daily Spending Cap) 설정',
          '모든 보안 감사를 생략하고 빠른 배포를 우선하기',
          '이더리움 메인넷 가스비를 무제한으로 승인해두기',
        ],
        answerIndex: 1,
        explanation:
          '스마트 컨트랙트를 통해 일일 지출 한도(Spending Cap)를 제한하고 승인된 화이트리스트 컨트랙트하고만 통신하도록 프로그래밍하는 것이 핵심적인 보안 대책입니다.',
      },
    ],
    glossary: [
      {
        term: 'AiFi (Agentic Finance)',
        definition: '자율 AI 에이전트가 온체인 지갑을 보유하고 스마트 컨트랙트와 스테이블코인을 활용해 자율적으로 결제, 투자, 차익거래를 수행하는 탈중앙화 금융 패러다임.',
      },
      {
        term: 'AgentKit',
        definition: 'Coinbase 등이 개발한 오픈소스 툴킷으로, AI 에이전트가 온체인에서 지갑 생성, 토큰 전송, 스마트 컨트랙트 실행을 자율적으로 수행할 수 있도록 지원하는 프레임워크.',
      },
      {
        term: 'x402 결제 프로토콜',
        definition: 'HTTP 402 Payment Required 상태 코드를 기반으로 웹 API 호출 시 AI 에이전트가 스테이블코인으로 즉각 마이크로 결제를 수행할 수 있게 하는 통신 표준.',
      },
    ],
  },
  {
    id: 'miraeasset-2026-automata',
    titleEn: 'This Year is Ethereum: Smart Money is Watching Near Automata',
    titleKo: "올해는 이더리움이다: 스마트 머니는 'Near Automata'를 보고 있다 (스테이블코인 결제 33조 달러 돌파)",
    authors: ['한종목 (수석연구위원)'],
    institutions: ['미래에셋증권 리서치센터 (Mirae Asset Securities)'],
    publishedDate: '2026-03-04',
    sourceVenue: '미래에셋증권 Market Insight 리서치',
    sourceType: 'miraeasset',
    pdfUrl: 'file:///Contents/20260304_올해는 이더리움이다.pdf',
    originalUrl: 'https://securities.miraeasset.com',
    difficulty: 'intermediate',
    category: 'ai-finance',
    tags: ['NearAutomata', '온체인결제', 'Visa추월', 'GreatDivergence', 'Pectra업그레이드', '미래에셋증권'],
    targetCoins: ['USDT', 'USDC', 'DAI'],
    executiveSummary: {
      background:
        '이더리움 시장 가격(ETH)의 단기 조정에도 불구하고, 온체인 상에서 이동하는 스테이블코인 전송량이 18배 폭증하며 연간 33조 달러를 돌파하여 전통 신용카드 결제망(Visa 연간 15조 달러, Mastercard 연간 9조 달러)의 합산 규모를 추월했습니다. 본 보고서는 가격과 펀더멘털의 괴리(Great Divergence)를 분석하고, AI와 온체인 자동화가 맞물린 Near Automata 경제의 서막을 분석합니다.',
      keyFindings: [
        '전통 결제망을 추월한 스테이블코인 결제액: 이더리움 및 L2 생태계에서 처리되는 스테이블코인 연간 결제/전송 볼륨이 33조 달러에 달하며 글로벌 경제의 핵심 결제 백본(Economic Backbone)으로 자리잡음.',
        'Great Divergence (가격과 펀더멘털의 극단적 괴리): 2019년 디파이 썸머 직전과 유사하게, 온체인 활성 주소와 스테이블코인 유동성은 사상 최고치를 경신하는 반면 토큰 가격은 저평가 국면에 머무르는 역사적 매집 기회 형성.',
        '2026년 대규모 네트워크 업그레이드(Pectra): 가스 한도(Gas Limit) 확장과 계정 추상화(EIP-7702) 도입으로 스테이블코인 전송 수수료가 사실상 제로에 수렴하며 AI 에이전트 결제의 고속도로 개통.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '이더리움 온체인 경제의 가치 축적 모델(Value Accrual Formula)은 단순 가스비 소각을 넘어, 전 세계 금융 자산(스테이블코인, 국채 RWA)의 정산 종결 레이어(Settlement Finality)로서의 지대(Rent) 창출 구조를 가집니다.',
      formulaOrLogic:
        'Network\\ Velocity = \\frac{Total\\ Stablecoin\\ Volume_{annual} (\\$33T)}{Aggregate\\ M2_{onchain} (\\$200B)} \\approx 165\\times\n\n- 온체인 스테이블코인의 유전속도(Velocity)가 전통 법정통화 M2 유전속도(1.2~1.5배)의 100배 이상에 달하며 초고효율 글로벌 자본 회전을 입증함.',
      equilibriumConditions:
        '결제망 우위 지속 조건: L2 롤업의 배치(Batch) 증명 비용이 L1 가스 소각으로 환원되고, 레이어1의 완결성(Finality) 보안 예치금이 전체 정산 자산 규모의 10% 이상을 안정적으로 유지해야 함.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        'L2 간 유동성 파편화 심화: 수많은 롤업 체인 간의 표준 부재로 인해 스테이블코인 브릿징 비용 및 슬리피지가 증가하는 병목 현상.',
        'MEV(최대추출가치)로 인한 결제 왜곡: 차익거래 봇들의 샌드위치 공격으로 대규모 상거래 결제 트랜잭션의 실행 가격이 왜곡되는 위험.',
        '미국 금리 인하에 따른 RWA 매력도 둔화: 기준금리 인하 시 국채 담보형 스테이블코인의 이자율 매력 감소에 따른 자금 리밸런싱 충격.',
      ],
      historicalComparisons:
        '2019년 암호화폐 빙하기 당시 온체인 거래량 급증 후 2020~2021년 폭발적 디파이 랠리가 도래했던 패턴이 2026년 Near Automata 국면에서 재현되고 있음을 실증 데이터로 제시합니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '전통 신용카드 결제망보다 10배 빠른 T+0 즉시 결제 완결성을 보장하는 블록체인 정산 시스템을 제도권 결제망과 공식 연동하는 표준 API 가이드라인 마련.',
      forInvestors:
        '단기 토큰 가격 변동성보다는 온체인 스테이블코인 전송량, L2 일일 활성 사용자 수(DAU), 기관 수탁 자산 증가율 등 실질 펀더멘털 지표에 기반한 장기 분할 매수 전략 추천.',
    },
    quizzes: [
      {
        question: "미래에셋증권 리포트에서 언급된 이더리움 생태계의 'Great Divergence(위대한 괴리)'가 의미하는 바는?",
        options: [
          '이더리움과 비트코인의 합의 알고리즘이 완전히 달라진 현상',
          '온체인 스테이블코인 결제량 및 네트워크 사용량은 폭발적으로 급증했으나 토큰 가격은 저평가되어 있는 극단적 괴리 현상',
          '채굴자와 검증자 간의 이념적 대립으로 체인이 쪼개진 사건',
          '미국과 유럽의 스테이블코인 규제 법안이 서로 반대로 제정된 현상',
        ],
        answerIndex: 1,
        explanation:
          '온체인 스테이블코인 전송량이 33조 달러를 돌파하며 펀더멘털은 역대 최고조에 달했으나 시장 가격은 상대적으로 억눌려 있는 현상을 Great Divergence라고 분석했습니다.',
      },
      {
        question: '이더리움 및 L2 생태계의 연간 스테이블코인 결제액 규모(33조 달러)와 비교된 전통 금융 지표는?',
        options: [
          '전 세계 금(Gold) 현물 1일 거래량',
          'Visa(15조 달러)와 Mastercard(9조 달러)의 연간 결제 처리 규모 합계',
          '미국 연방정부의 1년 치 세금 징수액',
          '한국 주식시장 코스피(KOSPI) 연간 거래대금',
        ],
        answerIndex: 1,
        explanation:
          '보고서는 온체인 스테이블코인 연간 결제 규모가 글로벌 1·2위 결제 기업인 Visa와 Mastercard의 결제액 합계를 뛰어넘었다고 실증했습니다.',
      },
    ],
    glossary: [
      {
        term: 'Near Automata',
        definition: '인간의 직접적인 개입 없이 스마트 컨트랙트, AI 에이전트, 온체인 스테이블코인이 24시간 자율적으로 금융 거래와 결제를 처리하는 기계 간 자율 경제 시스템.',
      },
      {
        term: 'Great Divergence (위대한 괴리)',
        definition: '자산의 실질적 온체인 사용량(트랜잭션, 결제액, 활성 주소) 등 펀더멘털 지표는 급등하는데 시장 거래 가격은 정체되거나 하락해 있는 괴리 현상.',
      },
      {
        term: '계정 추상화 (EIP-7702)',
        definition: '일반 지갑(EOA)에 스마트 컨트랙트 기능을 일시 부여하여 가스비 대납, 트랜잭션 묶음 실행 등을 가능하게 하는 차세대 이더리움 사용자 경험 업그레이드.',
      },
    ],
  },
  {
    id: 'miraeasset-2026-smartmoney',
    titleEn: 'Digital Assets and AI: Smart Money Accumulation and Enterprise Stablecoin Infrastructure',
    titleKo: '디지털자산과 AI: 스마트 머니의 온체인 축적과 기업용 스테이블코인 인프라 (Stripe Bridge & EF Staking)',
    authors: ['한종목 (수석연구위원)'],
    institutions: ['미래에셋증권 리서치센터 (Mirae Asset Securities)'],
    publishedDate: '2026-03-13',
    sourceVenue: '미래에셋증권 Market Insight 리서치',
    sourceType: 'miraeasset',
    pdfUrl: 'file:///Contents/20260313_디지털자산과 AI.pdf',
    originalUrl: 'https://securities.miraeasset.com',
    difficulty: 'intermediate',
    category: 'monetary-stability',
    tags: ['StripeBridge', '이더리움재단스테이킹', 'Tempo', '기관토큰화', '미래에셋증권'],
    targetCoins: ['USDC', 'USDT', 'PYUSD'],
    executiveSummary: {
      background:
        '이더리움 재단(EF)의 70,000 ETH 자체 재고 스테이킹(Treasury Staking) 발표와 글로벌 결제 유니콘 Stripe의 Bridge 인수($11억 달러), Tempo 결제 블록체인 등장 등 제도권 스마트 머니가 스테이블코인과 온체인 금융 인프라를 대거 내재화하고 있습니다. 본 보고서는 이러한 기업용 결제 인프라의 확장성과 기관 자금 흐름을 분석합니다.',
      keyFindings: [
        '이더리움 재단의 70,000 ETH 솔로 스테이킹 개시: 제3자 풀(Lido)에 의존하지 않고 재단 보유 자산의 41%를 자체 검증인 노드로 운영하여 네트워크 탈중앙성을 수호하고 연간 지속 가능한 운영 현금흐름 창출.',
        'Stripe의 Bridge 인수로 촉발된 결제 패러다임: 법정화폐와 스테이블코인 간의 변환 오케스트레이션 API가 전 세계 엔터프라이즈 기업에 보급되며 B2B 무역 결제 및 급여 정산의 표준으로 급부상.',
        'TradFi와 DeFi의 융합: Fidelity FIDD, JPMorgan JPM Coin/MONY, Kraken의 연준 마스터 계좌 추진 등 전통 금융기관들이 규제 적격 온체인 유동성 허브를 선점 중임.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '기업용 스테이블코인 오케스트레이션(Bridge Architecture)은 [가맹점 결제 요청] → [DEX/CEX 최적 환율 라우팅] → [스테이블코인 온체인 실시간 전송(Base/Solana)] → [현지 은행 실시간 출금(Local Fiat Rail)]을 5초 이내에 원스톱으로 처리합니다.',
      formulaOrLogic:
        'Settlement\\ Savings = \\text{Tx\\ Volume} \\times (\\text{Fee}_{Card} [2.8\\%] - \\text{Fee}_{Stablecoin} [0.3\\%]) + \\text{Float\\ Value}_{T+0}\n\n- 카드사 정산 수수료 대비 85% 이상의 비용 절감과 3일간의 자금 묶임(Float) 해소 효과를 수리적으로 입증함.',
      equilibriumConditions:
        '환전 유동성 균형: 각 국가별 로컬 램프(On/Off-ramp) 은행 파트너의 일일 유동성 풀이 최대 일일 환전 요청량의 200% 이상을 상시 유지해야 함.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '로컬 오프램프 은행의 실시간 이체 전산망 장애: 온체인 트랜잭션은 성공했으나 현지 법정화폐 계좌로의 출금이 지연되는 병목 현상.',
        '지정학적 외환 통제 강화: 특정 신흥국 정부가 달러 스테이블코인으로의 자본 유출을 막기 위해 P2P 거래소 IP 및 앱스토어를 일시 차단하는 리스크.',
      ],
      historicalComparisons:
        '과거 신용카드 네트워크(Visa/Mastercard)가 1970년대 마그네틱 띠 도입 후 20년간 글로벌 금융 표준을 독점했던 것과 같이, 스테이블코인 API 레일이 차세대 20년의 결제 표준을 장악하는 과정으로 해석됩니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '국경 간 결제에서 스테이블코인이 유발하는 외환거래 누락을 방지하기 위해 온체인 결제 식별자(On-chain Tax ID) 및 트래블룰 공통 보고 표준 수립.',
      forInvestors:
        '스테이블코인 결제 인프라 제공 기업(Stripe 파트너사, 오케스트레이션 프로토콜) 및 L2 결제 특화 체인에 대한 기관 배분 비중 확대.',
    },
    quizzes: [
      {
        question: '이더리움 재단(EF)이 보유 자산 중 70,000 ETH를 Treasury Staking(자체 스테이킹)하기로 결정한 주된 목적은?',
        options: [
          '이더리움 코인을 전량 매도하기 위한 사전 준비',
          '제3자 서비스에 의존하지 않고 자체 노드를 운영하여 네트워크 보안을 강화하고 재단의 지속 가능한 자체 운영 수익을 확보하기 위해',
          '모든 스테이킹 보상을 비트코인으로 자동 환전하기 위해',
          '거래소 상장폐지를 방어하기 위해',
        ],
        answerIndex: 1,
        explanation:
          '중앙화된 스테이킹 풀에 의존하지 않고 자체 노드를 분산 운영함으로써 네트워크 탈중앙성을 높이고 안정적인 재단 운영 자금을 온체인에서 조달하기 위함입니다.',
      },
    ],
    glossary: [
      {
        term: 'Treasury Staking',
        definition: '재단이나 기업이 보유한 암호화폐 자산(Treasury)을 자체 검증인 노드에 직접 스테이킹하여 네트워크 보안에 기여하고 연 3~4%의 온체인 이자 수익을 거두는 운용 방식.',
      },
      {
        term: 'Bridge (Stripe 인수사)',
        definition: '기업들이 글로벌 스테이블코인을 법정화폐처럼 손쉽게 수취, 보관, 송금할 수 있도록 지원하는 차세대 온체인 결제 오케스트레이션 인프라 기업.',
      },
    ],
  },
  {
    id: 'miraeasset-2026-kelpdao-depeg',
    titleEn: 'Digital Asset Hot Issue: Demise of Decentralization and the KelpDAO-Aave Depeg Crisis',
    titleKo: '디지털자산 핫 이슈: 탈중앙화 가치의 소멸과 KelpDAO-Aave 디페그 위기 심층 분석',
    authors: ['한종목 (수석연구위원)'],
    institutions: ['미래에셋증권 리서치센터 (Mirae Asset Securities)'],
    publishedDate: '2026-04-22',
    sourceVenue: '미래에셋증권 Market Insight 리서치',
    sourceType: 'miraeasset',
    pdfUrl: 'file:///Contents/20260422_디지털자산 핫 이슈.pdf',
    originalUrl: 'https://securities.miraeasset.com',
    difficulty: 'advanced',
    category: 'depeg-dynamics',
    tags: ['KelpDAO사태', 'Aave청산위기', 'DVN단일서명', 'LTV위험', 'Arbitrum멀티시그', '미래에셋증권'],
    targetCoins: ['DAI', 'USDC', 'USDT'],
    executiveSummary: {
      background:
        '2026년 4월, KelpDAO의 유동성 재스테이킹 토큰(rsETH)에서 LayerZero 브릿지의 단일 검증자(1-of-1 DVN) 설정 취약점을 악용해 3,800억 원 상당의 가짜 rsETH가 발행되고, 이를 Aave의 93% 초고위험 LTV 대출 풀에 담보로 맡겨 3,000억 원의 우량 자산(WETH, USDC, USDT)을 편취한 초대형 익스플로잇이 발생했습니다. 본 보고서는 이 사건의 기술적 원인과 탈중앙화 거버넌스의 딜레마를 심층 해부합니다.',
      keyFindings: [
        '운영 보안(OpSec)의 치명적 실패: 10억 달러 이상의 자산을 다루는 대형 프로토콜이 브릿지 검증자를 1-of-1 단일 서명자로 방치하여 해커가 RPC 서버를 장악하자마자 가짜 크로스체인 입금 메시지가 그대로 승인됨.',
        'Aave 거버넌스의 과도한 탐욕과 LTV 93% 설정: 담보 위험 평가사(Chaos Labs, LlamaRisk)의 안일한 대응과 Aave 거버넌스의 비합리적 초고레버리지 허용으로 인해 담보가 없는 상태에서 17.5% 언더콜라터럴(Undercollateralization) 상태에 직면함.',
        'DeFi 뱅크런과 Aave 자본 활용률 100% 도달: 사태 발생 48시간 만에 Aave에서 7조 원의 예치 자금이 썰물처럼 빠져나가며 USDT 대출 이자율이 15.03%로 치솟고 일반 이용자의 출금이 동결되는 시스템 뱅크런 발생.',
        'Code is Law의 붕괴와 중앙화 개입: Arbitrum 재단과 핵심 DAO 위원회가 긴급 멀티시그(Emergency Multisig)를 발동해 해커 지갑의 900억 원을 강제 동결 및 회수함으로써, 탈중앙화 원칙과 투자자 보호 사이의 거버넌스 민낯이 드러남.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '본 사건은 [브릿지 DVN 서명 탈취] → [가짜 rsETH 116,500개 무단 발행] → [Aave V3 고LTV(93%) 담보 예치] → [WETH/USDT 대출 실행 및 거래소 유출] → [Aave 자본 활용률 100% 및 출금 불가 뱅크런]의 5단계 연쇄 붕괴 메커니즘을 따릅니다.',
      formulaOrLogic:
        'Utilization\\ Rate = \\frac{Total\\ Borrows}{Total\\ Deposits} \\rightarrow 100.0\\% \\implies Available\\ Liquidity \\rightarrow \\$0\n\n- Aave 내 WETH, USDT, USDC 유동성이 바닥나며 청산 봇들이 aToken을 현물로 교환할 수 없어 스마트 컨트랙트 청산 메커니즘이 완전히 마비됨.',
      equilibriumConditions:
        '안전 렌딩 프로토콜 균형 조건: 복합 파생 담보 자산(LRT)의 LTV는 최대 70% 이하로 제한되어야 하며, 크로스체인 브릿지는 최소 3개 이상의 독립 검증자(Multi-DVN, 2-of-3 이상) 서명이 필수적임.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '다중 파생 담보의 레버리지 겹치기(Recursive Looping): ETH → stETH → EigenLayer → KelpDAO rsETH로 이어지는 3차 파생 자산의 구조적 리스크 중첩.',
        '오프체인 리스크 큐레이터의 정보 지연: 위험 평가사들이 온체인 이상 징후를 감지하고도 DAO 투표 지연(수일 소요)으로 인해 적시에 담보 한도를 차단하지 못하는 거버넌스 병목.',
      ],
      historicalComparisons:
        '2008년 글로벌 금융위기 당시 서브프라임 모기지를 기초로 수차례 재가공된 부실 CDO 파생상품이 금융시스템을 마비시켰던 사건과 구조적으로 동일한 온체인 디파이의 복합 파생 위기입니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '디파이 대출 프로토콜에 대해 담보 자산의 레버리지 단계별 LTV 상한 규제 및 브릿지 검증자 분산 기준(Multi-sig 의무화) 마련.',
      forInvestors:
        '담보 자산이 2차, 3차 재스테이킹된 토큰인 경우 대출 프로토콜의 담보 인정 비율(LTV)과 브릿지 보안 설정을 직접 점검하고, Aave 자본 활용률이 90%를 초과하면 즉시 자금을 회수할 것.',
    },
    quizzes: [
      {
        question: 'KelpDAO-Aave 사태에서 3,800억 원 상당의 가짜 토큰이 발행될 수 있었던 핵심 보안 결함은?',
        options: [
          '이더리움 블록체인 노드의 하드웨어 고장',
          'LayerZero 브릿지의 DVN(탈중앙 검증자)을 1-of-1 단일 서명자로 안일하게 설정하여 검증자 키가 탈취되었기 때문',
          '비트코인 반감기로 인한 채굴 보상 감소',
          'Aave 스마트 컨트랙트에 오타가 있었기 때문',
        ],
        answerIndex: 1,
        explanation:
          'KelpDAO가 거액의 자산을 다루면서도 브릿지 검증자를 다중 서명(Multi-DVN)이 아닌 1-of-1 단일 서명자로 설정하는 운영 보안(OpSec) 실책을 범했기 때문입니다.',
      },
      {
        question: 'Aave 대출 풀의 자본 활용률(Utilization Rate)이 100%에 도달했을 때 발생하는 현상으로 올바른 것은?',
        options: [
          '모든 예치자가 즉시 원금을 2배로 돌려받는다.',
          '대출 풀의 잔여 현금 유동성이 0이 되어 일반 예치자들의 출금이 동결되고 대출 금리가 폭등한다.',
          '가스비가 무료로 전환된다.',
          '해커가 자동으로 체포된다.',
        ],
        answerIndex: 1,
        explanation:
          '활용률이 100%가 되면 풀에 남아있는 인출 가능한 현금이 없어 기존 예치자들이 자금을 인출할 수 없게 되며, 뱅크런 공황이 발생합니다.',
      },
    ],
    glossary: [
      {
        term: 'LayerZero DVN (Decentralized Verifier Network)',
        definition: '서로 다른 블록체인 간에 전송되는 크로스체인 메시지의 진위 여부를 독립적으로 검증하고 서명하는 탈중앙화 검증자 네트워크.',
      },
      {
        term: '자본 활용률 (Utilization Rate)',
        definition: '디파이 대출 풀에 예치된 총자산 중 현재 대출로 나가 있는 자산의 비율. 100%에 근접할수록 신규 출금이 불가능해지는 유동성 경색 위험이 발생.',
      },
      {
        term: '언더콜라터럴 (Undercollateralization)',
        definition: '대출받은 자산의 가치보다 담보로 맡긴 자산의 실질 청산 가치가 더 낮아져 대출 풀에 결손 손실이 발생하는 부실 담보 상태.',
      },
    ],
  },
  {
    id: 'bok-2026-deposit-token',
    titleEn: 'CBDC, Deposit Tokens, and Private Stablecoins: Macroeconomic Coexistence and Monetary Policy',
    titleKo: '한국은행 CBDC 및 예금 토큰(Deposit Token)과 민간 스테이블코인의 통화적 공존 방안',
    authors: ['한국은행 디지털화폐연구팀', '금융결제국'],
    institutions: ['Bank of Korea (한국은행)'],
    publishedDate: '2026-06-20',
    sourceVenue: 'BOK 이슈노트 제2026-14호',
    sourceType: 'bok',
    pdfUrl: 'https://www.bok.or.kr/portal/bbs/B0000245/view.do',
    originalUrl: 'https://www.bok.or.kr',
    difficulty: 'intermediate',
    category: 'cbdc-coexistence',
    tags: ['한국은행', 'CBDC', '예금토큰', '프로젝트한강', '은행예금이탈', '통화정책'],
    targetCoins: ['KRW-C', 'USDC'],
    executiveSummary: {
      background:
        '한국은행이 2024~2026년 진행한 도매형 CBDC 및 시중은행 예금 토큰(Deposit Token) 파일럿(프로젝트 한강)의 실증 데이터를 바탕으로, 민간 스테이블코인이 통화정책 유효성과 상업은행 예금 기반에 미치는 거시경제적 영향을 분석하고 공존 프레임워크를 제시합니다.',
      keyFindings: [
        '은행 예금 이탈(Bank Disintermediation) 억제: 민간 스테이블코인에 과도한 이자 지급이 허용될 경우 최대 30조 원의 저원가성 은행 예금이 이탈할 수 있으나, 은행 예금 토큰 모델은 기존 2계층 통화 제도(Two-tier Monetary System)를 보존하여 금융 중개 기능을 유지함.',
        '결제 완결성(Settlement Finality)과 화폐의 단일성(Singleness of Money): 중앙은행 도매형 CBDC가 기관 간 최종 정산 자산으로 기능함으로써 서로 다른 은행이 발행한 예금 토큰 간 1:1 패리티 교환성을 100% 보장함.',
        '원화 스테이블코인의 준비금 100% 안전자산 격리 신탁: 민간 발행사에 대해 중앙은행 당좌예치금 및 통안채 신탁을 의무화하여 그림자 금융(Shadow Banking) 리스크를 원천 차단함.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '중앙은행-상업은행 2계층 분산원장 구조: [중앙은행: 도매형 CBDC 발행 및 기관 간 최종 정산] ↔ [상업은행: 고객 예금 기반 예금 토큰(Deposit Token) 발행 및 프로그래머블 결제(바우처/스마트 에스크로) 제공].',
      formulaOrLogic:
        'Money\\ Multiplier_{digital} = \\frac{1 + c}{r_d + e + c + s_{reserve}}\n\n- s_{reserve}: 스테이블코인 및 예금 토큰 준비금 요구 비율. 100% 신탁 적용 시 통화승수 팽창에 따른 신용 왜곡을 0으로 통제함.',
      equilibriumConditions:
        '통화 안정 균형: 모든 민간 스테이블코인이 한국은행 승인 신탁 계좌에 100% 담보를 예치하고, 상시 환매 요구에 T+0 실시간 응할 수 있는 유동성 버퍼를 확보할 때 달성.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '외환 시장 변동 시 달러 스테이블코인 쏠림: 원화 약세 국면에서 국내 자금이 해외 달러 스테이블코인으로 급격히 이동하며 원화 통화 주권이 약화되는 달러라이제이션(Dollarization) 위험.',
      ],
      historicalComparisons:
        '19세기 미국 자유은행 시대(Free Banking Era)의 사설 은행권 난립 및 디페그 혼란과 비교하며, 중앙은행 정산 레일이 부재한 무분별한 민간 코인 발행의 위험성을 경고합니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '가상자산 2단계 법안에 한국은행의 자료제출요구권 및 지급결제제도 안전성 협의권을 명문화하고, 예금 토큰과 스테이블코인의 법적 성격을 명확히 구분하여 규제 차익을 방지.',
      forInvestors:
        '제도권 금융권과의 연계성이 높은 예금 토큰 기반 금융 인프라 프로젝트와 한국은행 기술 표준을 준수하는 핀테크 플랫폼에 주목.',
    },
    quizzes: [
      {
        question: '한국은행 보고서가 제안하는 중앙은행 도매형 CBDC와 상업은행 예금 토큰(Deposit Token) 연계 모델의 가장 큰 장점은?',
        options: [
          '블록체인 채굴자들에게 막대한 보상을 지급할 수 있다.',
          '기존 상업은행의 신용 창출 및 자금 중개 기능을 훼손하지 않으면서 100% 안전한 1:1 결제 완결성을 보장한다.',
          '중앙은행이 모든 민간 금융기관을 폐쇄할 수 있다.',
          '원화 환율을 인위적으로 2배 올릴 수 있다.',
        ],
        answerIndex: 1,
        explanation:
          '2계층 통화 체계를 유지하여 은행의 금융 중개 기능을 보존하는 동시에 중앙은행 CBDC로 최종 정산을 종결함으로써 결제 안전성을 극대화합니다.',
      },
    ],
    glossary: [
      {
        term: '예금 토큰 (Deposit Token)',
        definition: '상업은행에 예치된 실제 원화 예금을 분산원장 블록체인 상에 1:1 토큰 형태로 발행하여 프로그래밍 결제(스마트 컨트랙트)에 활용하는 디지털 화폐.',
      },
      {
        term: '화폐의 단일성 (Singleness of Money)',
        definition: '서로 다른 시중은행이 발행한 통화나 디지털 토큰이라도 중앙은행 화폐를 매개로 언제 어디서나 아무런 가격 할인 없이 1:1 동일한 가치로 교환될 수 있는 성질.',
      },
    ],
  },
  {
    id: 'bis-2025-stablecoin-fragility',
    titleEn: 'Stablecoins and Financial Fragility: Runs, Liquidity Mismatch, and Central Bank Policy',
    titleKo: '스테이블코인의 금융 취약성: 런(Run), 유동성 불일치 및 중앙은행 정책 아키텍처',
    authors: ['Iñaki Aldasoro', 'Paolo Giudici', 'Thomas Leach'],
    institutions: ['Bank for International Settlements (BIS)', 'University of Pavia'],
    publishedDate: '2025-11-15',
    sourceVenue: 'BIS Working Papers No. 1142',
    sourceType: 'bis',
    pdfUrl: 'https://www.bis.org/publ/work1142.pdf',
    originalUrl: 'https://www.bis.org/publ/work1142.htm',
    difficulty: 'advanced',
    category: 'depeg-dynamics',
    tags: ['BIS', '뱅크런', '다이아몬드-딥빅', '단기국채급매', '유동성불일치'],
    targetCoins: ['USDT', 'USDC', 'FDUSD'],
    executiveSummary: {
      background:
        '전통적 은행과 달리 예금보험이나 중앙은행의 최종 대부자(Lender of Last Resort, LOLR) 안전망이 결여된 법정화폐 담보형 스테이블코인이 시장 변동성 및 준비자산 유동성 충격 시 어떻게 고전적 뱅크런(Bank Run) 메커니즘에 직면하는지 실증 및 게임이론적으로 규명한 국제결제은행(BIS) 핵심 연구입니다.',
      keyFindings: [
        '만기 및 유동성 불일치(Maturity/Liquidity Mismatch): 준비자산 중 당일 환매 가능한 현금성 비중이 낮고 만기 채권 비중이 높을수록, 단기 대규모 상환 요구 시 2차 시장 급매(Fire-sale) 손실이 발생하여 순자산가치(NAV)가 급락하고 런이 기하급수적으로 가속화됨.',
        '선착순 인출 인센티브(First-Mover Advantage): $1.00 고정 액면가(Par Value)로 상환해주는 선착순 구조는 정보 비대칭 하에서 공포에 직면한 보유자들의 동시 탈출을 유도하여 전형적인 다이아몬드-딥빅(Diamond-Dybvig) 형 불량 균형(Run Equilibrium)을 촉발함.',
        '단기금융시장 전이 위험(Systemic Spillover): 주요 스테이블코인(시총 1,000억 달러 이상)의 대규모 상환 사태는 미국 단기 국채(T-bills) 및 RP 시장에서의 대규모 매도로 직결되어 전통 금융시스템으로 유동성 경색을 역전파함.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '다이아몬드-딥빅(Diamond-Dybvig, 1983) 뱅크런 프레임워크를 블록체인 온체인 상환 프로토콜에 맞추어 개작한 모델입니다. 준비자산 유동화 할인율(λ)과 상환 요청 비율(α)에 따라 후순위 상환자가 회수할 수 있는 기대 청산가치를 계산하고, 선착순 인출이 우월전략이 되는 임계점(α*)을 수리적으로 도출합니다.',
      formulaOrLogic:
        'R_{ex} = \\frac{A_{liquid} + (1 - \\lambda)A_{illiquid}}{S_{total}} < 1.00 \\implies \\alpha^* = \\frac{C - (1-\\lambda)D}{\\lambda D}\n\n- A_{liquid}: 즉시 현금화 가능한 1일물 역RP 및 연준 예치금\n- A_{illiquid}: 긴급 매각 시 유동성 할인율 λ(Haircut)가 적용되는 3~12개월 국채 및 기타 증권',
      equilibriumConditions:
        '안정 균형(No-run Equilibrium)을 달성하기 위한 필요충분조건: 준비자산 내 즉시 가용한 초단기 유동성 비율이 역사적 최대 일일 상환율(약 30%)을 상회해야 함.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '단기 국채 유동성 고갈 충격: 금융위기로 인한 미국 단기 국채 2차 시장의 호가 스프레드 확대 시 급매 할인율(λ)이 평상시 0.05%에서 3.0%로 급등하며 준비자산 잠식 발생.',
        '준비금 보관 수탁은행 파산: 발행사의 예치 자산 보관 은행 영업정지 시 오프체인 전신환 상환이 동결되며 유통시장에서 패닉 덤핑 유발.',
      ],
      historicalComparisons:
        '2023년 3월 실리콘밸리은행(SVB) 파산 시 Circle의 USDC가 33억 달러 예치금 묶임 공시 직후 $0.87까지 급락했던 사건은 본 논문의 핵심 스트레스 시나리오와 완벽히 일치합니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '스테이블코인 발행사에 대해 상업은행 수준의 유동성 커버리지 비율(LCR) 기준 적용, 준비자산의 최소 80% 이상을 익일물 역RP 및 중앙은행 당좌예치금으로 강제.',
      forInvestors:
        '단순 명목 담보비율 100% 공시에 안주하지 말고, 준비자산의 가중평균만기(WAM, 30일 이하 권장)와 현금성 자산 비중을 매일 모니터링해야 합니다.',
    },
    quizzes: [
      {
        question: '다이아몬드-딥빅 모델 관점에서 법정화폐 담보형 스테이블코인이 뱅크런에 취약한 가장 핵심적인 구조적 원인은?',
        options: [
          '블록체인의 블록 생성 속도 지연',
          '선착순 $1.00 액면가 상환 보장과 준비자산의 만기/유동성 불일치가 결합되었기 때문',
          '발행사 대표의 SNS 활동 부족',
          '스테이블코인 총공급량이 비트코인보다 적기 때문',
        ],
        answerIndex: 1,
        explanation:
          '준비자산의 유동화 지연이 존재하는 상황에서 먼저 인출하는 사람만 1달러 전액을 받는 구조는 선착순 탈출 유인을 극대화하여 뱅크런을 촉발합니다.',
      },
    ],
    glossary: [
      {
        term: '뱅크런 (Bank Run)',
        definition: '예금자나 토큰 보유자들이 발행사의 지급불능을 우려하여 일시에 대규모로 환매를 요구하는 금융 공황 상태.',
      },
      {
        term: '급매 할인 (Fire-Sale Discount)',
        definition: '단기 자금 상환을 위해 만기 전 채권 등 비유동 자산을 시장에 급매도할 때 감수해야 하는 가격 할인 손실률.',
      },
    ],
  },
  {
    id: 'imf-2025-capital-flows',
    titleEn: 'Cross-Border Stablecoin Flows, Currency Substitution, and Capital Flow Management',
    titleKo: '국경 간 스테이블코인 유통과 자본유출입 변동성: 신흥국 외환 건전성 규제 연구',
    authors: ['Tobias Adrian', 'Dong He', 'Federico Grinberg'],
    institutions: ['International Monetary Fund (IMF)'],
    publishedDate: '2025-08-10',
    sourceVenue: 'IMF Working Paper WP/25/164',
    sourceType: 'imf',
    pdfUrl: 'https://www.imf.org/en/Publications/WP/Issues/2025/08/10/Cross-Border-Stablecoins-553210',
    originalUrl: 'https://www.imf.org',
    difficulty: 'intermediate',
    category: 'regulatory-framework',
    tags: ['IMF', '자본유출입', '통화대체(암호화폐화)', '외환건전성', '거시건전성규제'],
    targetCoins: ['USDT', 'USDC'],
    executiveSummary: {
      background:
        '글로벌 달러 스테이블코인이 신흥국 및 개도국에서 자국 통화를 대체하는 암호화폐화(Cryptoization) 현상과 국경 간 자본 이동에 미치는 파급 효과를 실증 분석하고, IMF 거시건전성 정책(CFM) 프레임워크와의 통합 방안을 제시합니다.',
      keyFindings: [
        '자본 통제 우회 경로: 온체인 P2P 거래 및 역외 가상자산거래소를 통한 스테이블코인 전송이 전통적인 외국환 송금 한도 규제를 무력화하여 신흥국의 급격한 자본 유출을 초래함.',
        '통화 주권 잠식: 높은 인플레이션을 겪는 국가에서 국민들이 법정통화 대신 달러 스테이블코인을 일상 결제 및 가치 저장 수단으로 채택하며 중앙은행의 금리 정책 전달 경로가 차단됨.',
        '거시건전성 조치(CFM)의 디지털 전환: 온체인 주소 분석과 가상자산 사업자(VASP)의 트래블룰 연계를 통한 스마트 외환 건전성 모니터링 시스템 구축 권고.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '개방경제 거시 모형(Open Economy Macro Model)에 무마찰 온체인 자본 이동 변수(θ)를 도입하여, 환율 충격 발생 시 자본 유출 속도와 외환보유액 고갈 속도를 정량화합니다.',
      formulaOrLogic:
        'Capital\\ Outflow\\ Rate = \\beta_0 + \\beta_1 (i_{US} - i_{domestic}) + \\beta_2 \\Delta e_{expected} + \\theta \\cdot Stablecoin\\ Adoption\n\n- θ 계수가 높을수록 금리차 및 환율 기대 변동에 따른 자본 유출 탄력성이 비선형적으로 증폭됨.',
      equilibriumConditions:
        '외환 시장 안정 조건: 국내 원화 표시 자산의 실질 기대수익률이 역외 달러 스테이블코인의 무위험 수익률(미 국채 금리)을 상회하거나 온체인 외환 거래 비용이 적정 마찰력을 유지해야 함.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '신흥국 외환위기 시 디지털 뱅크런: 국가 신용등급 강등 시 국내 은행 예금이 달러 스테이블코인으로 수시간 만에 스왑되어 중앙은행 외환보유액이 급속 고갈되는 시나리오.',
      ],
      historicalComparisons:
        '1997년 아시아 외환위기 당시와 비교하여, 블록체인을 통한 자본 도피 속도가 며칠에서 수 분 단위로 단축되었음을 지적합니다.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '외국환거래법상 스테이블코인 발행·유통사에 대한 외환 보고 의무화 및 이상 해외 송금 탐지 AI 온체인 모니터링 시스템 도입.',
      forInvestors:
        '신흥국 통화 가치 급변 시 글로벌 달러 스테이블코인을 통한 포트폴리오 안전자산 헤지 전략을 체계적으로 수립.',
    },
    quizzes: [
      {
        question: "IMF 보고서에서 지적한 '암호화폐화(Cryptoization)' 현상이 중앙은행 통화정책에 미치는 가장 큰 부작용은?",
        options: [
          '중앙은행 총재의 임기가 단축된다.',
          '국민들이 자국 통화 대신 달러 스테이블코인을 주로 사용하여 중앙은행의 기준금리 조절이 실물 경제에 먹히지 않게 된다.',
          '블록체인 채굴 전기세가 급증한다.',
          '지폐 인쇄 비용이 100배 증가한다.',
        ],
        answerIndex: 1,
        explanation:
          '국민들이 자국 화폐 대신 달러 스테이블코인을 보유하고 결제하면, 중앙은행이 기준금리를 올리거나 내려도 통화정책 파급 경로가 차단되어 통화 주권이 상실됩니다.',
      },
    ],
    glossary: [
      {
        term: '암호화폐화 (Cryptoization)',
        definition: '자국 통화의 가치 불안정으로 인해 경제 주체들이 스테이블코인 등 가상자산을 지불 및 가치 저장 수단으로 널리 사용하는 현상(달러라이제이션의 디지털 버전).',
      },
      {
        term: '자본흐름관리조치 (CFM)',
        definition: '급격한 자본 유출입으로 인한 금융시장 교란을 방지하기 위해 외환 거래에 부과하는 거시건전성 규제 및 세제 장치.',
      },
    ],
  },
  {
    id: 'kdi-keri-2026-krw-strategy',
    titleEn: 'Strategic Approaches for Korean Enterprises in Won-denominated Stablecoins',
    titleKo: '한국 기업의 원화 스테이블코인 성공 전략',
    authors: ['이태규 (선임연구위원)', '한국경제연구원 연구팀'],
    institutions: ['한국경제연구원 (KERI)', 'KDI 경제교육·정보센터 연계'],
    publishedDate: '2026-09-23',
    sourceVenue: 'KDI 경제정보센터 정책연구 (한국경제연구원)',
    sourceType: 'keri',
    originalUrl: 'https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000207515',
    difficulty: 'intermediate',
    category: 'regulatory-framework',
    tags: ['한국경제연구원', 'KDI경제정보센터', '원화스테이블코인', '기업전략', '국경간결제', '통화주권'],
    targetCoins: ['KRW-C', 'USDC', 'USDT'],
    executiveSummary: {
      background:
        '글로벌 디지털 결제 시장에서 달러 스테이블코인이 기축통화로 고착화되는 가운데, 국내 수출 기업 및 이커머스 기업들이 원화 스테이블코인을 활용해 글로벌 결제 경쟁력을 확보하고 환전 수수료를 절감하기 위한 전략적 방안을 KDI 경제정보센터 수록 한국경제연구원 보고서에서 분석합니다.',
      keyFindings: [
        '수출입 결제 비용 70% 절감: 무역 기업이 신용장(L/C) 및 은행 전신환(T/T) 대신 원화·달러 연동 스테이블코인을 스마트 컨트랙트 에스크로와 결합할 경우 거래 완결 시간을 3일에서 실시간으로 단축.',
        '시중은행-빅테크 합작 컨소시엄 모델 권고: 단일 기업 단독 발행보다 신뢰도 높은 시중은행의 지급준비금 관리 능력과 빅테크/플랫폼 기업의 사용자 인터페이스(UI/UX) 결합 모델이 최적.',
        'K-콘텐츠 및 크로스보더 커머스 선제 도입: 동남아 및 글로벌 K-컬처 소비자를 대상으로 원화 스테이블코인 간편 결제를 도입하여 환전 마찰을 최소화하는 전략 제시.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '기업 간 B2B 온체인 무역 결제 모델은 [국내 수출기업] ↔ [원화 스테이블코인 에스크로 컨트랙트] ↔ [해외 바이어] 구조로 작동하며, 통관 완료 오라클 신호 수신 즉시 대금이 자동 정산됩니다.',
      formulaOrLogic:
        'Settlement_{B2B} = \\text{Invoice}_{KRW} \\times (1 - Fee_{Onchain}) \\quad \\text{where } Fee_{Onchain} \\approx 0.1\\% \\ll Fee_{TradBank}(2.5\\%)',
      equilibriumConditions:
        '환율 변동성 노출 최소화 조건: 온체인 오더북 및 자동화 마켓메이커(AMM)의 원화-달러 페어 유동성 깊이가 일일 결제 거래량의 20% 이상을 유지할 때 가격 슬리피지 없는 안정적 무역 결제 달성.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '해외 수취국의 규제 불확실성: 상대국 금융당국이 미인가 원화 토큰의 자국 내 유통을 차단할 경우 환전 출구 병목 발생.',
        '외환시장 급변 시 원화 디페그: 글로벌 금융위기 시 원화 가치 급락으로 인한 해외 투자자의 원화 코인 대량 투매(Dump) 리스크.',
      ],
      historicalComparisons:
        '1997년 외환위기 당시 역외 NDF 시장에서의 원화 투기 공격과 비교하여, 온체인 원화 유동성 풀에 대한 24시간 실시간 모니터링 안전장치 필요성 강조.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '가상자산 2단계 입법 시 기업 무역 결제용 스테이블코인에 대한 외국환거래법상 사전 신고 절차 간소화 및 네거티브 규제 샌드박스 도입.',
      forInvestors:
        '원화 스테이블코인 결제 인프라를 선제 구축하는 은행-핀테크 합작 지분 참여 기업 및 온체인 결제 게이트웨이(PG) 수혜주에 주목.',
    },
    quizzes: [
      {
        question: '한국경제연구원(KDI 수록) 보고서에서 제안한 원화 스테이블코인의 가장 현실적이고 안전한 발행 구조는?',
        options: [
          '알고리즘 기반 무담보 발행',
          '시중은행의 100% 안전자산 신탁과 빅테크/핀테크의 유통 플랫폼이 결합된 합작 컨소시엄 모델',
          '해외 유령 페이퍼컴퍼니를 통한 우회 발행',
          '개별 중소기업이 자체 코인을 각자 무제한 발행',
        ],
        answerIndex: 1,
        explanation:
          '통화 주권과 이용자 보호를 위해 100% 분리 신탁을 수행하는 시중은행과 사용자 접점을 가진 빅테크가 결합된 컨소시엄 모델이 최적의 대안으로 제시되었습니다.',
      },
    ],
    glossary: [
      {
        term: '온체인 에스크로 (On-chain Escrow)',
        definition: '조건(선적, 통관 증명 등)이 충족될 때까지 스마트 컨트랙트에 결제 대금을 안전하게 예치하고 조건 충족 시 자동 지급하는 분산원장 결제 프로토콜.',
      },
      {
        term: '슬리피지 (Slippage)',
        definition: '주문 시점의 기대 가격과 실제 체결된 가격 간의 차이로, 유동성이 부족한 탈중앙화 거래소에서 대량 거래 시 커집니다.',
      },
    ],
  },
  {
    id: 'kdi-keri-2026-payment-infra',
    titleEn: 'Economic Impacts of Stablecoin Proliferation and Transition of Payment Infrastructure',
    titleKo: '스테이블코인 확산과 지급결제 인프라 전환의 경제적 파급효과',
    authors: ['김용진 (거시경제실장)', '한국경제연구원'],
    institutions: ['한국경제연구원 (KERI)', 'KDI 경제교육·정보센터 연계'],
    publishedDate: '2026-09-21',
    sourceVenue: 'KDI 경제정보센터 정책연구 (한국경제연구원)',
    sourceType: 'keri',
    originalUrl: 'https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000207467',
    difficulty: 'advanced',
    category: 'macro-economy',
    tags: ['한국경제연구원', 'KDI경제정보센터', '지급결제혁신', '가맹점수수료절감', '거시경제파급효과'],
    targetCoins: ['USDC', 'PYUSD', 'KRW-C'],
    executiveSummary: {
      background:
        '신용카드사, VAN사, PG사로 이어지는 4당사자 전통 지급결제망이 블록체인 기반의 2당사자(P2P/B2B) 스테이블코인 직결망으로 재편될 때 대한민국 거시경제와 자영업자 후생에 미치는 정량적 파급효과를 계량경제학적으로 추정합니다.',
      keyFindings: [
        '연간 2.5조 원의 가맹점 수수료 절감: 평균 1.5~2.2%의 카드 가맹점 수수료가 스테이블코인 결제 시 0.2~0.5% 수준으로 급감하여 소상공인 영업이익률 약 1.8%p 개선.',
        '결제 대금 정산 주기 실시간화: T+2~3일 소요되던 가맹점 대금 정산이 온체인 즉시 완결(T+0)되어 자영업자의 단기 운전자금 대출 수요 및 이자 부담 대폭 감소.',
        '총요소생산성(TFP) 증대: 결제 마찰 감소와 국경 간 무역 활성화로 국내총생산(GDP) 성장률에 연간 0.25%p 이상의 순긍정적 기여도 발생.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '지급결제 인프라 전환 모형은 전통 카드 결제(VAN/PG 중개 마진 발생)와 블록체인 스마트 컨트랙트 결제(분산원장 합의 검증) 간의 수수료 함수를 정량 비교합니다.',
      formulaOrLogic:
        '\\Delta Welfare = \\sum_{t=1}^T \\left[ S_t \\times (\\tau_{Card} - \\tau_{Stable}) + \\gamma \\times \\Delta Liquidity_t \\right]',
      equilibriumConditions:
        '네트워크 효과 전환 임계점: 전체 상거래 결제액 중 스테이블코인 결제 비중이 15%를 돌파할 때 가맹점 도입 비용보다 수수료 절감 이익이 압도적으로 커지는 자생적 확산 균형점 형성.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '기존 금융권(카드사·VAN사)의 수익 악화 및 반발: 결제 수수료 기반 비즈니스 모델 붕괴에 따른 핀테크-전통 금융사 간 규제 갈등 심화.',
        '블록체인 네트워크 가스비 변동성: 이더리움 메인넷 수수료 급등 시 소액 오프라인 결제 실효성 저하.',
      ],
      historicalComparisons:
        '2000년대 초반 신용카드 소득공제 도입에 따른 현금에서 카드 사회로의 대전환기 당시의 경제적 지각변동에 필적하는 혁신으로 평가.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '카드 가맹점 수수료 인하와 더불어 온체인 결제 영수증의 국세청 현금영수증 전산 연동 시스템 구축.',
      forInvestors:
        '초저수수료 L2 결제 레일 인프라(Base, Solana)와 가맹점 POS 스테이블코인 연동 솔루션을 개발하는 선도 핀테크 기업 선별.',
    },
    quizzes: [
      {
        question: '본 보고서에서 추정한 스테이블코인 기반 직결망 전환 시 국내 가맹점의 연간 기대 수수료 절감 규모는?',
        options: ['약 100억원', '약 2.5조 원', '절감 효과 없음', '오히려 수수료가 5조원 증가'],
        answerIndex: 1,
        explanation:
          '중간 밴(VAN)사 및 카드사 수수료 마진이 대폭 축소되면서 국내 소상공인과 가맹점 전체적으로 연간 2.5조 원 이상의 비용 절감이 예상됩니다.',
      },
    ],
    glossary: [
      {
        term: '결제 완결성 (Settlement Finality)',
        definition: '일단 결제가 체결되면 취소되거나 번복될 수 없는 확정적 권리 이전 상태를 의미하며, 온체인에서는 블록 확정 시 달성됩니다.',
      },
    ],
  },
  {
    id: 'kdi-nabo-2026-financial-markets',
    titleEn: 'Impact of Stablecoins on Financial Markets and Policy Implications',
    titleKo: '스테이블코인의 금융시장에 대한 영향과 시사점',
    authors: ['경제분석관실', '국회예산정책처 (NABO)'],
    institutions: ['국회예산정책처 (NABO)', 'KDI 경제교육·정보센터 연계'],
    publishedDate: '2026-09-16',
    sourceVenue: 'KDI 경제정보센터 정책연구 (국회예산정책처)',
    sourceType: 'nabo',
    originalUrl: 'https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000207397',
    difficulty: 'intermediate',
    category: 'regulatory-framework',
    tags: ['국회예산정책처', 'KDI경제정보센터', '가상자산2단계', '금융안정', '예금이탈방지', '분리신탁'],
    targetCoins: ['KRW-C', 'USDC', 'USDT'],
    executiveSummary: {
      background:
        '국회예산정책처(NABO)가 가상자산이용자보호법 2단계 입법을 앞두고 원화 및 달러 스테이블코인이 시중은행 예금 기반, 단기 자금시장(단기 국채·RP), 금융 안정성에 미칠 영향을 국회 재정·금융 분석 관점에서 검토한 공식 정책 보고서입니다.',
      keyFindings: [
        '은행 예금 탈중개화(Disintermediation) 리스크 검토: 결제용 스테이블코인에 과도한 이자 지급을 허용할 경우 은행 요구불예금이 대량 유출되어 중소기업 대출 공급 여력이 위축될 우려 지적.',
        '국채 시장 수요 기반 확대: 100% 안전자산 준비금 의무화는 90일 이내 단기 국고채 및 재정증권에 대한 강력한 신규 매수세를 창출하여 국채 발행 금리 안정에 기여.',
        '예금보험공사 수준의 파산격리 및 보호기금 설치 제안: 발행사 파산 시 토큰 보유자에게 1순위 변제권을 법적으로 부여하는 신탁법 특례 조항 신설 제언.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '은행 예금과 스테이블코인 간의 자금 이동 모형: 예금 금리와 스테이블코인 보유 편익(거래 속도, 프로그래머블 기능) 간의 스프레드에 의해 자금 이동 규모가 결정됩니다.',
      formulaOrLogic:
        '\\Delta Deposit = -\\alpha \\cdot (R_{yield} + \\text{Utility}_{onchain} - R_{bank})',
      equilibriumConditions:
        '금융안정 균형 조건: 스테이블코인 발행사의 준비금이 100% 한국은행 당좌예금 및 만기 3개월 미만 국채로 한정될 때 신용 창출 왜곡 없는 거시건전성 균형 유지.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '시중은행 유동성 커버리지 비율(LCR) 급락: 대규모 시장 충격 시 예금에서 스테이블코인으로의 급격한 디지털 런 발생.',
        '단기 국채 시장 쏠림 및 왜곡: 스테이블코인 준비금 매수세가 특정 만기 국고채에 집중될 경우 단기 금리 왜곡 발생 가능성.',
      ],
      historicalComparisons:
        '2008년 글로벌 금융위기 당시 미국 MMF(머니마켓펀드)의 Reserve Primary Fund 1달러 붕괴(Breaking the Buck) 사태와 구조적 유사성 경고.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '원화 스테이블코인 발행 인가 시 자본금 요건뿐만 아니라 한국은행의 통화관리 권한과 금융위의 영업행위 규제를 결합한 통합 감독 체계 구축.',
      forInvestors:
        '규제 가이드라인을 100% 충족하여 법적 분리신탁이 완료된 국고채 담보 기반 스테이블코인을 최우선 보유 자산으로 선정.',
    },
    quizzes: [
      {
        question: '국회예산정책처 보고서에서 스테이블코인 준비금을 100% 단기 국고채로 운용할 때 국채 시장에 미치는 긍정적 효과는?',
        options: [
          '국채 이자율이 무한대로 폭등한다.',
          '단기 국고채에 대한 안정적인 민간 매수 수요가 창출되어 국채 금리 안정에 기여한다.',
          '국채 발행이 전면 중단된다.',
          '국고채의 만기가 100년으로 자동 연장된다.',
        ],
        answerIndex: 1,
        explanation:
          '스테이블코인 발행사가 수조 원 규모의 준비금으로 단기 국고채를 매입함에 따라 국채 시장의 유동성이 풍부해지고 국채 발행 금리가 안정되는 효과가 있습니다.',
      },
    ],
    glossary: [
      {
        term: '탈중개화 (Disintermediation)',
        definition: '자금이 전통적 금융중개기관(은행)을 거치지 않고 자본시장이나 온체인 직결망으로 직접 이동하여 은행의 신용 창출 기능이 약화되는 현상.',
      },
    ],
  },
  {
    id: 'kdi-bok-2026-fx-linkage',
    titleEn: 'Linkages Between USD Stablecoins and Foreign Exchange Markets: The Role of Global Exchanges',
    titleKo: '달러 스테이블코인과 외환시장 간 연계성: 글로벌 거래소의 역할을 중심으로',
    authors: ['금융안정국 가상자산연구팀', '한국은행'],
    institutions: ['한국은행 (BOK)', 'KDI 경제교육·정보센터 연계'],
    publishedDate: '2026-09-08',
    sourceVenue: 'KDI 경제정보센터 정책연구 (한국은행 BOK)',
    sourceType: 'bok',
    originalUrl: 'https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000207278',
    difficulty: 'advanced',
    category: 'monetary-stability',
    tags: ['한국은행', 'KDI경제정보센터', '외환시장연계성', '김치프리미엄', '자본유출입', '테더마켓'],
    targetCoins: ['USDT', 'USDC', 'KRW-C'],
    executiveSummary: {
      background:
        '한국은행이 KDI 경제정보센터를 통해 공시한 심층 연구로, 글로벌 암호화폐 거래소(Binance, Coinbase, Upbit)에서 거래되는 테더(USDT)·USDC와 서울 외환시장(원/달러 환율) 간의 실시간 가격 동조화 및 자본 유출입 전이 경로를 빅데이터로 분석합니다.',
      keyFindings: [
        '김치 프리미엄과 외환시장 간 역학 관계: 국내 거래소 내 USDT 가격이 공식 원/달러 환율보다 2~5% 높게 형성되는 프리미엄 발생 시 역외 차익거래(Arbitrage)를 통한 대규모 달러 유출 압력 가중.',
        '달러 스테이블코인의 준(準)외환 역할: 국내 거주자의 테더 보유액이 증가함에 따라 외환당국의 모니터링을 우회하는 비공식 역외 달러 보유 효과 발생.',
        '실시간 온체인 외환 거래 보고 시스템 도입 제언: 1만 달러 이상의 국경 간 스테이블코인 이체에 대해 한국은행 외환전산망 실시간 연동 의무화 필요.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '국경 간 차익거래 흐름 모형: 국내외 거래소 간 스테이블코인 가격 차이($P_{USDT, KRW} - E_{KRW/USD} \\times P_{USDT, USD}$)가 송금 비용 및 규제 마찰 비용을 초과할 때 자본 이동이 발생합니다.',
      formulaOrLogic:
        '\\text{Arbitrage Profit} = P_{USDT}^{KRW} - (E_{KRW/USD} \\times P_{USDT}^{USD}) - C_{TravelRule} - C_{Gas}',
      equilibriumConditions:
        '무위험 차익거래 소멸 조건: 차익거래 이익이 트래블룰 준수 비용 및 가스비를 하회할 때 프리미엄이 정상 범위(±0.5% 이내)로 수렴.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '원화 급락기 자본 도피(Capital Flight): 환율 상승 기대 심리로 인해 원화 자산이 대규모 달러 스테이블코인으로 환전되어 콜드월렛으로 유출되는 시나리오.',
        '해외 거래소 지급 불능 사태 시 국내 투자자 연쇄 손실: 글로벌 거래소 해킹 또는 인출 중단 시 국내 연계 유동성 고갈.',
      ],
      historicalComparisons:
        '과거 2017~2018년 김치 프리미엄 20% 폭등 당시의 불법 환치기 사례와 2026년 온체인 트래블룰 환경을 실증 비교.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '가상자산 거래소와 외환전산망 간 API 실시간 연계로 외환 유출입 이상 징후 조기경보체계(EWS) 가동.',
      forInvestors:
        '국내 USDT 매수 시 김치 프리미엄 지표를 확인하고 역프리미엄(-1% 이하) 국면에서 분할 매수하는 환율 스마트 전략 권장.',
    },
    quizzes: [
      {
        question: '한국은행 보고서에서 지적한 국내 거래소 USDT 가격이 공식 환율보다 높을 때 발생하는 주요 외환 리스크는?',
        options: [
          '국내 외환보유액이 저절로 2배로 증가한다.',
          '차익거래를 노린 비공식 자본 유출 압력이 커져 원화 가치 변동성이 확대된다.',
          '모든 시중은행이 문을 닫는다.',
          '환율이 1달러당 100원으로 고정된다.',
        ],
        answerIndex: 1,
        explanation:
          '국내 USDT 프리미엄이 높으면 해외에서 스테이블코인을 들여와 국내에 팔고 법정화폐를 다시 해외로 빼나가는 차익거래로 인해 외환시장 불안 요인이 됩니다.',
      },
    ],
    glossary: [
      {
        term: '김치 프리미엄 (Kimchi Premium)',
        definition: '국내 가상자산 거래소의 가격이 해외 거래소보다 비정상적으로 높게 형성되는 현상으로, 외환 규제 및 자본 통제 마찰에서 기인합니다.',
      },
    ],
  },
  {
    id: 'kdi-kif-2026-banking-impact',
    titleEn: 'Impact of Stablecoin Adoption on the Banking Industry and Strategic Imperatives',
    titleKo: '스테이블코인의 활성화가 은행업에 미치는 영향과 시사점',
    authors: ['이병윤 (선임연구위원)', '한국금융연구원 (KIF)'],
    institutions: ['한국금융연구원 (KIF)', 'KDI 경제교육·정보센터 연계'],
    publishedDate: '2026-05-20',
    sourceVenue: 'KDI 경제정보센터 정책연구 (한국금융연구원)',
    sourceType: 'kif',
    originalUrl: 'https://eiec.kdi.re.kr/policy/domesticView.do?ac=0000205135',
    difficulty: 'intermediate',
    category: 'banking-industry',
    tags: ['한국금융연구원', 'KDI경제정보센터', '은행예금대체', '예금토큰', '조달비용', '컨소시엄'],
    targetCoins: ['KRW-C', 'USDC'],
    executiveSummary: {
      background:
        'KDI 경제정보센터에 등재된 한국금융연구원(KIF)의 핵심 분석으로, 스테이블코인의 대중화가 전통 상업은행의 핵심 수익 모델인 저원가성 예금 유치 및 순이자마진(NIM)에 미치는 충격과 시중은행의 대응 전략을 조명합니다.',
      keyFindings: [
        '은행 저원가성 예금 이탈 충격: 일반 요구불예금의 10%가 스테이블코인으로 이동할 경우 시중은행의 평균 자금조달비용이 약 0.15~0.25%p 상승.',
        '은행의 예금 토큰(Deposit Token) 공동 발행 필요성: 민간 스테이블코인에 고객을 빼앗기지 않기 위해 은행권 공동의 블록체인 예금 토큰 인프라 구축이 시급.',
        '신탁 수수료 및 디지털 자산 수탁(Custody) 신수익원 창출: 스테이블코인 준비금 수탁 은행으로 참여하여 안정적인 비이자수익(Fee-based income) 확보 권고.',
      ],
    },
    coreMechanicsModel: {
      overview:
        '은행 자금조달 비용 함수: 요구불예금 비중 감소에 따라 은행채 발행 및 고금리 정기예금 의존도가 증가하는 구조를 수식화합니다.',
      formulaOrLogic:
        'Cost_{Fund} = w_{demand} \\cdot R_{demand} + w_{stable\_reserve} \\cdot R_{custody} + w_{bond} \\cdot R_{bond}',
      equilibriumConditions:
        '은행 수익성 보전 균형 조건: 예금 이탈에 따른 NIM 감소액을 스테이블코인 준비금 수탁 수수료 및 블록체인 정산 수수료로 100% 상쇄하는 전략적 제휴 균형.',
    },
    stressTestVulnerabilities: {
      failureScenarios: [
        '빅테크 주도 결제 시장 독점: 은행이 배제된 채 빅테크가 자체 결제 스테이블코인을 장악하여 은행이 단순 결제 하수인(Dumb Pipe)으로 전락하는 위기.',
      ],
      historicalComparisons:
        '2010년대 카카오페이·토스 등 간편결제 등장 당시 시중은행의 결제 데이터 주권 상실 과정과 비교.',
    },
    policyAndInvestmentTakeaways: {
      forRegulators:
        '상업은행이 주도적으로 원화 스테이블코인 및 예금 토큰을 발행할 수 있도록 은행법 및 금융지주회사법령 유권해석 정비.',
      forInvestors:
        '디지털자산 커스터디 자회사를 설립하고 예금 토큰 PoC를 선도하는 대형 금융지주사에 대한 밸류에이션 재평가 검토.',
    },
    quizzes: [
      {
        question: '한국금융연구원 보고서에서 시중은행이 스테이블코인 확산에 대응하기 위해 제시한 가장 핵심적인 방안은?',
        options: [
          '모든 인터넷 뱅킹 서비스를 중단한다.',
          '은행권 공동의 규제 적격 예금 토큰(Deposit Token)을 발행하고 준비금 수탁 사업을 적극 확대한다.',
          '블록체인 기술 사용을 전면 거부한다.',
          '오프라인 지점 수를 10배 늘린다.',
        ],
        answerIndex: 1,
        explanation:
          '은행은 예금 토큰을 자체 발행하고 민간 스테이블코인의 준비금 수탁 은행으로 참여하여 예금 이탈을 방어하고 수탁 수수료를 확보해야 합니다.',
      },
    ],
    glossary: [
      {
        term: '예금 토큰 (Deposit Token)',
        definition: '상업은행에 예치된 실제 법정화폐 예금을 분산원장 상의 토큰 형태로 1:1 발행하여 은행 간 실시간 송금과 스마트 결제를 지원하는 디지털 자산.',
      },
      {
        term: '순이자마진 (NIM)',
        definition: '은행의 자산 운용 수익에서 조달 비용을 차감한 순이자이익을 총 운용자산으로 나눈 은행 핵심 수익성 지표.',
      },
    ],
  },
];

