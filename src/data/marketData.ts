import { StablecoinMarketData, CollateralType } from '@/types';

export const initialStablecoinData: StablecoinMarketData[] = [
  {
    id: 'tether',
    name: 'Tether USD',
    symbol: 'USDT',
    priceUsd: 1.0002,
    pegTarget: 1.00,
    pegDeviationPercent: 0.02,
    status: 'normal',
    marketCapUsd: 148500000000,
    volume24hUsd: 52400000000,
    collateralType: 'fiat-backed',
    issuer: 'Tether Holdings Ltd. (Cantor Fitzgerald 수탁)',
    chainEcosystem: ['Tron', 'Ethereum', 'Solana', 'Avalanche', 'BNB Chain', 'Arbitrum', 'Polygon', 'TON'],
    reserveComposition: '미국 단기국채(85.2%), 익일물 역RP(7.8%), 비트코인·금(4.2%), 회사채·담보대출(2.8%)',
    auditFrequency: 'BDO Italia 분기별 공인인증보고서(Attestation) 공시',
    sparkline7d: [1.0001, 1.0003, 0.9999, 1.0002, 1.0001, 1.0004, 1.0002],
  },
  {
    id: 'usd-coin',
    name: 'USD Coin',
    symbol: 'USDC',
    priceUsd: 0.9999,
    pegTarget: 1.00,
    pegDeviationPercent: -0.01,
    status: 'normal',
    marketCapUsd: 54200000000,
    volume24hUsd: 11800000000,
    collateralType: 'fiat-backed',
    issuer: 'Circle Internet Financial, LLC (미 연준 Clarity Act 적격)',
    chainEcosystem: ['Ethereum', 'Base', 'Solana', 'Polygon', 'Arbitrum', 'Avalanche', 'Optimism', 'Sui'],
    reserveComposition: 'Circle Reserve Fund (BlackRock 운용 미국 단기국채 89%), BNY Mellon 분리 보관 현금(11%)',
    auditFrequency: 'Deloitte & Touche LLP 매월 제3자 공증보고서 및 SEC 등록 공시',
    sparkline7d: [1.0000, 0.9999, 0.9998, 1.0000, 0.9999, 1.0000, 0.9999],
  },
  {
    id: 'ethena-usde',
    name: 'Ethena USDe',
    symbol: 'USDe',
    priceUsd: 0.9997,
    pegTarget: 1.00,
    pegDeviationPercent: -0.03,
    status: 'normal',
    marketCapUsd: 7850000000,
    volume24hUsd: 750000000,
    collateralType: 'synthetic-dollar',
    issuer: 'Ethena Labs',
    chainEcosystem: ['Ethereum', 'Mantle', 'Solana', 'BNB Chain', 'Arbitrum', 'Base'],
    reserveComposition: 'stETH/ETH 롱(40%) + BTC 롱(40%) + 거래소 1배 숏 델타헤지(80%) + 자체 예비 방어 펀드 $320M',
    auditFrequency: '온체인 실시간 담보 증명(Proof of Reserves) 및 분기별 스마트컨트랙트 보안 감사',
    yieldRatePercent: 10.50,
    sparkline7d: [0.9998, 0.9994, 0.9992, 0.9996, 0.9999, 0.9995, 0.9997],
  },
  {
    id: 'dai',
    name: 'Sky USDS (구 DAI)',
    symbol: 'DAI',
    priceUsd: 1.0001,
    pegTarget: 1.00,
    pegDeviationPercent: 0.01,
    status: 'normal',
    marketCapUsd: 6950000000,
    volume24hUsd: 410000000,
    collateralType: 'crypto-backed',
    issuer: 'Sky Protocol (구 MakerDAO)',
    chainEcosystem: ['Ethereum', 'Base', 'Arbitrum', 'Optimism', 'Polygon', 'Gnosis'],
    reserveComposition: '미국 국채 RWA 실물자산(56%), USDC PSM(16%), ETH/wstETH 과담보(22%), 기타 암호자산(6%)',
    auditFrequency: '100% 온체인 실시간 투명성 대시보드(Sky Analytics) 및 Steakhouse Financial 실사',
    yieldRatePercent: 5.75,
    sparkline7d: [1.0000, 1.0002, 1.0000, 1.0001, 1.0003, 1.0000, 1.0001],
  },
  {
    id: 'first-digital-usd',
    name: 'First Digital USD',
    symbol: 'FDUSD',
    priceUsd: 0.9998,
    pegTarget: 1.00,
    pegDeviationPercent: -0.02,
    status: 'normal',
    marketCapUsd: 3450000000,
    volume24hUsd: 5100000000,
    collateralType: 'fiat-backed',
    issuer: 'First Digital Trust (Hong Kong Licensed Trust)',
    chainEcosystem: ['BNB Chain', 'Ethereum', 'Sui'],
    reserveComposition: '홍콩 등록 법정신탁 분리계좌 보관 미국 국채 80%, 아시아 주요 규제은행 예치 현금 20%',
    auditFrequency: 'Prescient Assurance 독립 회계법인 매월 공증보고서',
    sparkline7d: [0.9998, 0.9997, 1.0001, 0.9998, 0.9999, 0.9997, 0.9998],
  },
  {
    id: 'paypal-usd',
    name: 'PayPal USD',
    symbol: 'PYUSD',
    priceUsd: 1.0000,
    pegTarget: 1.00,
    pegDeviationPercent: 0.00,
    status: 'normal',
    marketCapUsd: 2350000000,
    volume24hUsd: 180000000,
    collateralType: 'fiat-backed',
    issuer: 'Paxos Trust Company / PayPal Inc. (NYDFS 규제)',
    chainEcosystem: ['Ethereum', 'Solana', 'Arbitrum'],
    reserveComposition: '미국 단기 국채 담보 역환매조건부채권(Repo) 82%, 미국 정부 MMF 12%, 규제은행 현금 예치금 6%',
    auditFrequency: 'WithumSmith+Brown, PC 독립 회계법인 월간 실사보고서 및 NYDFS 정기 감사',
    yieldRatePercent: 4.25,
    sparkline7d: [1.0000, 1.0000, 1.0001, 0.9999, 1.0000, 1.0000, 1.0000],
  },
  {
    id: 'ondo-usdy',
    name: 'Ondo US Dollar Yield',
    symbol: 'USDY',
    priceUsd: 1.0004,
    pegTarget: 1.00,
    pegDeviationPercent: 0.04,
    status: 'normal',
    marketCapUsd: 1420000000,
    volume24hUsd: 45000000,
    collateralType: 'rwa-yield',
    issuer: 'Ondo Finance (미국 국채 RWA 전문)',
    chainEcosystem: ['Ethereum', 'Solana', 'Mantle', 'Cosmos', 'Sui', 'Aptos', 'Arbitrum', 'Base'],
    reserveComposition: '미국 단기 국채 95.8%, 상업은행 요구불 당좌예금 4.2% (파산 절차 격리 SPV 선순위 담보 구조)',
    auditFrequency: 'Ankura Trust 매일 수탁 증명(Daily Attestation) 및 공인회계감사',
    yieldRatePercent: 5.10,
    sparkline7d: [1.0000, 1.0001, 1.0003, 1.0004, 1.0004, 1.0005, 1.0004],
  },
  {
    id: 'blackrock-buidl',
    name: 'BlackRock BUIDL',
    symbol: 'BUIDL',
    priceUsd: 1.0000,
    pegTarget: 1.00,
    pegDeviationPercent: 0.00,
    status: 'normal',
    marketCapUsd: 1850000000,
    volume24hUsd: 62000000,
    collateralType: 'rwa-yield',
    issuer: 'BlackRock Financial Management / Securitize',
    chainEcosystem: ['Ethereum', 'Base', 'Aptos', 'Arbitrum', 'Avalanche', 'Polygon'],
    reserveComposition: '미국 재무부 단기 국채(100%) 및 연준 역RP (Securitize 온체인 배당)',
    auditFrequency: 'PwC 글로벌 회계법인 정기 감사 및 BNY Mellon 글로벌 수탁',
    yieldRatePercent: 5.05,
    sparkline7d: [1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000],
  },
  {
    id: 'usdd',
    name: 'Decentralized USD',
    symbol: 'USDD',
    priceUsd: 0.9820,
    pegTarget: 1.00,
    pegDeviationPercent: -1.80,
    status: 'caution',
    marketCapUsd: 610000000,
    volume24hUsd: 22000000,
    collateralType: 'algorithmic',
    issuer: 'TRON DAO Reserve',
    chainEcosystem: ['Tron', 'BNB Chain', 'Ethereum', 'BitTorrent'],
    reserveComposition: 'TRX 담보 88.5%, BTC 7.2%, USDT 4.3% (설립자 담보 비트코인 임의 인출 논란 이후 담보자산 단일화 심화)',
    auditFrequency: 'TRON DAO 온체인 탐색기 공시 (독립 외부 공인회계감사 부재)',
    yieldRatePercent: 8.50,
    sparkline7d: [0.9880, 0.9850, 0.9835, 0.9810, 0.9825, 0.9840, 0.9820],
  },
  {
    id: 'krw-consortium',
    name: 'KRW Pilot Stablecoin (원화 파일럿/예금토큰)',
    symbol: 'KRW-C',
    priceUsd: 0.000725,
    pegTarget: 0.000725,
    pegDeviationPercent: 0.00,
    status: 'normal',
    marketCapUsd: 450000000,
    volume24hUsd: 58000000,
    collateralType: 'fiat-backed',
    issuer: '한국 디지털통화 파일럿 연합 (한은 CBDC 연계 시중은행 컨소시엄)',
    chainEcosystem: ['Private Quorum', 'Klaytn/Kaia', 'Base'],
    reserveComposition: '한국은행 별도 당좌예치금(60%) 및 통화안정증권/국고채(40%) 100% 신탁',
    auditFrequency: '금융감독원 지정 외부 감사인 분기 정밀 실사 및 일일 PoR',
    yieldRatePercent: 3.25,
    sparkline7d: [0.000725, 0.000725, 0.000725, 0.000726, 0.000725, 0.000725, 0.000725],
  },
];

/**
 * Filter stablecoin list by collateral type
 */
export function getStablecoinsByCollateral(collateralType: CollateralType): StablecoinMarketData[] {
  return initialStablecoinData.filter((item) => item.collateralType === collateralType);
}

/**
 * Find single stablecoin by ID or symbol
 */
export function getStablecoinByIdOrSymbol(identifier: string): StablecoinMarketData | undefined {
  const normalized = identifier.toLowerCase();
  return initialStablecoinData.find(
    (item) => item.id.toLowerCase() === normalized || item.symbol.toLowerCase() === normalized
  );
}

/**
 * Compute aggregate market metrics
 */
export function getMarketSummary() {
  const totalMarketCap = initialStablecoinData.reduce((acc, cur) => acc + cur.marketCapUsd, 0);
  const totalVolume24h = initialStablecoinData.reduce((acc, cur) => acc + cur.volume24hUsd, 0);
  const cautionOrAlertCount = initialStablecoinData.filter((item) => item.status !== 'normal').length;
  const averagePegDeviation =
    initialStablecoinData.reduce((acc, cur) => acc + Math.abs(cur.pegDeviationPercent), 0) /
    initialStablecoinData.length;

  return {
    totalMarketCap,
    totalVolume24h,
    activeCoinsCount: initialStablecoinData.length,
    cautionOrAlertCount,
    averagePegDeviation: Number(averagePegDeviation.toFixed(3)),
  };
}
