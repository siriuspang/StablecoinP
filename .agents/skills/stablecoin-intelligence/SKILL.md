---
name: stablecoin-intelligence
description: Domain knowledge and analytical rules for domestic (Korea) and international stablecoin markets, regulatory frameworks, collateral classification, and depeg risk assessment.
---

# Stablecoin Intelligence & Market Analysis Skill

## 1. Stablecoin Classification Framework (담보 메커니즘 분류)

1. **법정화폐 담보형 (Fiat-Backed / Off-chain Reserve)**:
   - 대표 자산: USDT (Tether), USDC (Circle), FDUSD, PYUSD (PayPal).
   - 핵심 지표: 준비금 구성 (미국 국채 비중, 현금 예치금), 제3자 실사 보고서(Attestation) 주기, 준비금 보관 은행 리스크.
2. **과담보 암호자산형 (Crypto-Backed / Over-collateralized)**:
   - 대표 자산: DAI (MakerDAO/Sky), LUSD (Liquity).
   - 핵심 지표: 담보 인정 비율 (LTV / Collateral Ratio), 청산 메커니즘, PSM (Peg Stability Module) 비중.
3. **합성 달러 / 델타 중립형 (Synthetic Dollar / Delta-Neutral)**:
   - 대표 자산: USDe (Ethena).
   - 핵심 지표: 현물-선물 펀딩비 (Funding Rate), 거래소 카운터파티 리스크, 마이너스 펀딩비 장기화 시 예비금(Reserve Fund) 고갈 위험.
4. **무담보 / 알고리즘형 (Algorithmic / Seigniorage Shares)**:
   - 대표 사례: 과거 UST/LUNA.
   - 핵심 지표: 차익거래 인센티브, 죽음의 소용돌이(Death Spiral) 방어 장치 유무.
5. **RWA / 수익 배분형 (Yield-Bearing / Tokenized T-Bills)**:
   - 대표 자산: USDY (Ondo), BUIDL (BlackRock).
   - 핵심 지표: 미국 증권법 적격성, 공인투자자 전용 여부, 온체인 배당 메커니즘.

---

## 2. Regulatory Frameworks (국내외 규제 동향 분석 가이드)

### 대한민국 (Domestic)
- **가상자산이용자보호법 1단계 (시행 중)**: 예치금 보호, 불공정거래 규제.
- **가상자산 규제 2단계 (입법 추진 중)**:
  - 원화 기반 스테이블코인 허용 여부 및 발행 요건 (인가제/등록제).
  - 한국은행(BOK)의 통화정책 유효성, 자본유출입 모니터링 및 외환 건전성 규제.
  - 기관 발행자 자기자본 요건 및 100% 안전자산(국채, 한국은행 예치금) 담보 의무화 검토.

### 미국 (United States)
- **Clarity for Payment Stablecoins Act**:
  - 연방준비제도(Fed) 및 주 규제 당국의 라이선스 이원화.
  - 상업은행 수준의 지급준비금 요구, 알고리즘 스테이블코인 2년 유예/금지 조항.
- **SEC vs CFTC 관할권 논쟁**: 수익 배분형 스테이블코인의 증권성(Howey Test) 판별.

### 유럽연합 (European Union)
- **MiCA (Markets in Crypto-Assets)**:
  - EMT(Electronic Money Tokens, 전자화폐 토큰) 및 ART(Asset-Referenced Tokens) 분류.
  - EU 역내 비유로화(달러 등) 스테이블코인의 일일 거래 건수 및 거래액(2억 유로) 한도 제한 규정.

---

## 3. De-pegging & Risk Assessment Rubric (디페깅 위험 평가 지표)

- **정상 (Normal)**: \$0.998 ~ \$1.002 (±0.2% 이내 변동)
- **주의 (Caution)**: \$0.990 ~ \$0.998 또는 \$1.002 ~ \$1.010 (DEX 유동성 풀 불균형 검토 필요)
- **경보 (Alert / De-peg Risk)**: \$0.980 미만 또는 \$1.020 초과 지속 (차익거래 메커니즘 작동 정지, 뱅크런 조짐)
- **중대 위험 (Critical Crisis)**: \$0.950 미만 급락 (준비금 동결, 담보 자산 부실화, 스마트 컨트랙트 익스플로잇)
