import { TaxonomyCategory } from '@/types';

export const stablecoinTaxonomy: TaxonomyCategory[] = [
  {
    id: 'fiat-backed',
    nameKo: '법정화폐 담보형',
    nameEn: 'Fiat-Backed (Off-chain Reserve)',
    description:
      '발행사가 은행 및 공인 수탁기관에 1:1 비율의 미국 달러, 단기 국채(T-bills), 익일물 역RP 등 안전자산을 오프체인에 예치하고 동일 수량의 토큰을 온체인에서 발행하는 가장 대표적인 스테이블코인 형태입니다.',
    representativeCoins: ['USDT (Tether)', 'USDC (Circle)', 'FDUSD (First Digital)', 'PYUSD (PayPal)'],
    marketShareEstimate: '약 90 ~ 92%',
    advantages: [
      '압도적 가격 안정성: 실물 현금 및 단기 미 국채로 100% 이상 뒷받침되어 일상 거래 시 페그 괴리율이 ±0.1% 내외로 극히 낮음',
      '최상급 온체인 유동성 및 네트워크 효과: 글로벌 중앙화 거래소(CEX), 탈중앙화 거래소(DEX), 장외거래(OTC)의 사실상 기축통화 역할',
      '제도권 금융 및 결제 연동성: 페이팔(PYUSD), 서클(USDC) 등 전통 결제 핀테크 및 상업은행 네트워크와의 즉각적 상호운용 용이',
    ],
    riskFactors: [
      '수탁 은행 및 파산 리스크: 2023년 SVB 사태처럼 예치 은행 파산 시 오프체인 상환 동결로 인한 2차 유통시장 급격한 디페깅 발생 가능',
      '준비자산 실사(Attestation) 투명성 한계: 공식 회계감사(Audit)가 아닌 확인 보고서(Attestation) 의존에 따른 비공개 잠재 부실 리스크',
      '검열 및 자산 동결 가능성: 중앙화 발행사가 사법당국의 명령이나 자체 정책에 따라 특정 온체인 지갑 주소를 블랙리스트로 지정 및 동결 가능',
    ],
    regulatoryStatusKo:
      '가상자산이용자보호법 1단계(2024년 7월 시행) 하에서 사업자 예치금 분리보관 및 불공정거래 감시 대상. 2단계 입법에서 원화 기반 스테이블코인 허용 방안 논의 중(한국은행의 외환건전성·지급결제 감독권 보장 및 은행 컨소시엄 중심 인가제 유력 검토).',
    regulatoryStatusGlobal:
      '미국: 지불형 스테이블코인 명확화 법안(Clarity for Payment Stablecoins Act)을 통해 연준/주정부 인가제 및 상업은행 수준 준비금 요구. EU: MiCA(가상자산시장법) 시행으로 전자화폐토큰(EMT) 라이선스 필수화 및 비유로화 결제 일일 거래액(2억 유로) 한도 규제 적용.',
  },
  {
    id: 'crypto-backed',
    nameKo: '과담보 암호자산형',
    nameEn: 'Crypto-Backed (Over-collateralized / CDP)',
    description:
      '이더리움(ETH) 등 온체인 암호화폐를 스마트 컨트랙트에 부채담보부채권(CDP) 형태로 120~150% 이상 초과 예치하고, 알고리즘 청산 봇을 통해 청산 위험을 관리하며 발행하는 탈중앙화 스테이블코인입니다.',
    representativeCoins: ['DAI / USDS (Sky/MakerDAO)', 'LUSD (Liquity)', 'crvUSD (Curve)', 'GRAI (Gravita)'],
    marketShareEstimate: '약 4 ~ 5%',
    advantages: [
      '검열 저항성 및 탈중앙성: 제3자 은행이나 단일 중앙화 발행사의 지갑 동결 없이 온체인 스마트 컨트랙트에 의해 자율 실행',
      '100% 온체인 투명성: 모든 담보 포트폴리오, LTV, 청산 진행 상황을 누구나 실시간 블록체인 익스플로러로 영구 검증 가능',
      '자본 효율적 레버리지: 보유 코인을 매각하지 않고 유동성을 창출(Borrowing)하여 암호자산 보유 익스포저를 유지하면서 유동성 활용',
    ],
    riskFactors: [
      '기초자산 급락 시 연쇄 청산: 담보 코인 가격이 폭락할 때 네트워크 가스비 폭등과 오라클 지연으로 청산이 지체되어 언더콜래터럴(담보부족) 발생 가능',
      '자본 비효율성: 1달러 발행을 위해 1.3~1.5달러 이상의 자본을 락업해야 하므로 법정화폐 담보형 대비 발행 규모 확장에 태생적 한계',
      'PSM 도입에 따른 간접 중앙화: DAI 등의 경우 페깅 안정을 위해 도입한 PSM(Peg Stability Module)으로 인해 USDC 등 법정화폐 담보 비중이 높아져 오프체인 위험에 노출',
    ],
    regulatoryStatusKo:
      '현행 가상자산이용자보호법상 특정 사업자가 중앙에서 관리하지 않는 순수 탈중앙화 프로토콜 토큰으로 취급되어 규제 책임 주체 불분명. 가상자산 2단계 입법에서 디파이(DeFi) 및 스마트 컨트랙트 코드 책임 소재 논의 진행 중.',
    regulatoryStatusGlobal:
      '미국: SEC 및 CFTC가 탈중앙화 자율조직(DAO) 운영진 및 핵심 기여자(Key Contributors)를 미등록 증권/파생상품 브로커로 간주하는 법집행 조치 강화. EU MiCA: 완전 탈중앙화(Fully Decentralized) 프로토콜은 원칙적 적용 제외이나 실질적 거버넌스 주체 존재 시 규제 대상.',
  },
  {
    id: 'synthetic-dollar',
    nameKo: '합성 달러 / 델타 중립형',
    nameEn: 'Synthetic Dollar (Delta-Neutral / Cash & Carry)',
    description:
      '현물 암호자산(stETH/BTC)을 매수함과 동시에 중앙화 파생상품 거래소(CEX)에서 1배 무기한 선물 숏(Short) 포지션을 취해 가격 변동성을 상쇄(델타=0)하고, 선물 펀딩비와 스테이킹 보상을 수취하는 구조화 금융형 스테이블코인입니다.',
    representativeCoins: ['USDe (Ethena)', 'sUSDe (Staked USDe)'],
    marketShareEstimate: '약 2 ~ 3%',
    advantages: [
      '매력적인 온체인 자체 수익률(Native Yield): 강세장에서 무기한 선물 숏 펀딩비 수취로 연 15~35% 이상의 높은 스테이킹 보상 창출',
      '초과 담보 불필요: 1:1 델타 헤지로 담보 락업 없이 높은 자본 효율성 달성',
      '전통 은행 시스템과의 디커플링: 상업은행 예치금 의존도를 낮추고 암호화폐 파생상품 베이시스(Basis) 시장에서 직접 가치 유지',
    ],
    riskFactors: [
      '음(-)의 펀딩비 장기화 역마진: 하락장 진입 시 숏 포지션이 롱에 펀딩비를 지속 지불해야 하여 프로토콜 준비기금(Reserve Fund)이 소진되고 지급불능 위기 직면',
      'CEX 및 수탁사 거래상대방 위험: 파생상품 포지션이 열려 있는 Binance, Bybit 등 중앙화 거래소 파산 시 마진 담보 회수 불가',
      '베이시스 리스크 및 LST 디페깅: stETH가 ETH 대비 디페깅되거나 거래소 증거금 할인율이 변경될 때 강제 청산 발생 위험',
    ],
    regulatoryStatusKo:
      '금융감독당국은 파생상품 결합 구조 및 고이율 약속 특성상 "유사수신행위" 또는 "자본시장법상 파생결합증권(DLS)" 해당 여부를 엄격히 모니터링 중. 국내 가상자산 원화 거래소 상장 심사 시 고위험 자산으로 엄격 심사.',
    regulatoryStatusGlobal:
      '미국: SEC의 Howey Test 적용 시 수익 분배형 구조(sUSDe)가 투자계약증권(Investment Contract)으로 분류될 가능성 극히 높음. EU MiCA: 고위험 자산준거토큰(ART)으로 분류되어 엄격한 자본금 적립 및 파생 포지션 한도 제한 권고 대상.',
  },
  {
    id: 'algorithmic',
    nameKo: '무담보 / 알고리즘형',
    nameEn: 'Algorithmic (Seigniorage Shares / Endogenous Collateral)',
    description:
      '외부 실물 자산 담보 없이, 시스템 내부의 지분/거버넌스 토큰과의 양방향 차익거래 메커니즘 및 알고리즘 스마트 컨트랙트의 공급량 조절(Rebase/Mint-Burn)로 $1.00 페깅 유지를 시도하는 형태입니다.',
    representativeCoins: ['과거 UST (Terra, 붕괴)', 'USDD (Tron, 초과담보 혼합 전환)', 'FRAX v1 (과거 부분담보)'],
    marketShareEstimate: '1% 미만 (테라 사태 이후 급감)',
    advantages: [
      '극대화된 자본 효율성: 외부 준비자산 적립 비용 없이 무에서 유를 창출하는 시뇨리지(Seigniorage) 구조',
      '완전한 탈중앙화 지향: 물리적 은행이나 실물 자산 수탁기관에 대한 의존도를 완전히 배제한 순수 온체인 코드 구현',
    ],
    riskFactors: [
      '죽음의 소용돌이(Death Spiral) 필연성: 담보 토큰 가치가 하락할 때 무제한 인플레이션 루프로 인해 페깅과 시스템 전체가 순식간에 0으로 소멸',
      '자기실현적 뱅크런 방어 불능: 시장 신뢰가 한 번 꺾이면 온체인 차익거래 창구가 막히며 외부 자본 유입 없이는 회생 불가능',
      '폰지 사기 논란: 비현실적인 고이율(예: 앵커 프로토콜 20%)로 외부 자금을 유치하여 유지하던 구조적 지속 불가능성',
    ],
    regulatoryStatusKo:
      '2022년 테라-루나 사태 이후 금융위원회 및 검찰 가상자산범죄합동수사단의 직접적 규제 타깃. 가상자산 2단계 입법안에서 무담보 알고리즘 스테이블코인의 국내 발행 및 거래 지원을 사실상 법적으로 원천 금지하는 방안 확정적.',
    regulatoryStatusGlobal:
      '미국: 결제용 스테이블코인 법안(Clarity Act)에 내생적 담보 기반 알고리즘 스테이블코인의 신규 발행 2년간 한시적 유예(Moratorium) 및 원천 금지 조항 포함. 글로벌 표준(FSB, IOSCO) 역시 규제 불인정 입장 천명.',
  },
  {
    id: 'rwa-yield',
    nameKo: 'RWA / 수익 배분형',
    nameEn: 'RWA / Yield-Bearing (Tokenized T-Bills / Private Credit)',
    description:
      '미국 단기 국채(T-bills), 환매조건부채권(Repo), 기관용 MMF 등 현실세계자산(RWA)을 기초자산으로 토큰화하여, 기초자산에서 발생하는 이자 수익(연 4~5%)을 토큰 보유자에게 리베이스(Rebase) 또는 가치 상승 형태로 온체인 배분하는 형태입니다.',
    representativeCoins: ['USDY (Ondo Finance)', 'BUIDL (BlackRock)', 'USTB (Superstate)', 'USD0 (Usual)'],
    marketShareEstimate: '약 1.5 ~ 2.5% (가장 빠른 성장세)',
    advantages: [
      '무위험 실질 수익률(Risk-Free Yield) 온체인 향유: 고금리 환경에서 미 국채 이자 수익을 온체인 지갑에 직접 수령',
      '글로벌 초대형 금융기관 보증: 블랙록(BlackRock), 세쿼이아 등 세계 최정상 금융기관의 자산 수탁 및 펀드 운용 신뢰도',
      '준비금 100% 실물 증권 매칭: BNY Mellon 등 오프체인 최상위 수탁은행에 보관되어 담보 부실 위험 극소화',
    ],
    riskFactors: [
      '엄격한 규제 및 증권성(Security) 판별 리스크: 수익 배분 특성으로 인해 미국 증권법(SEC)상 증권으로 분류되어 일반인 유통 제한(Reg S / Reg D 규제 준수)',
      '화이트리스트 및 전송 제약: KYC/AML 승인을 받은 공인투자자(Whitelisted Investors)만 보유 및 전송 가능하여 무허가 디파이 생태계 결합성 저하',
      '미국 기준금리 인하 시 매력도 반감: 미 연준의 금리 인하 사이클 도래 시 분배 이자율이 하락하여 일반 스테이블코인 대비 수익 격차 축소',
    ],
    regulatoryStatusKo:
      '자본시장법상 "토큰 증권(ST, Security Token)" 규제 체계에 해당. 금융위원회의 토큰증권 제도화 가이드라인에 따라 장외거래소 및 신탁업자 연계 요건 충족 필요. 개인 투자자의 무허가 장외 해외 RWA 토큰 투자는 자본시장법 위반 소지 경고.',
    regulatoryStatusGlobal:
      '미국: SEC의 명확한 증권 규제 적용 대상(기관 적격 투자자 중심 프라이빗 세일 허용). EU: MiCA 외에도 기존 전통 금융상품 규제인 MiFID II 규범을 동시 충족해야 하는 이중 규제 프레임워크 적용.',
  },
];
