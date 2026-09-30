---
name: paper-study-synthesizer
description: Framework for converting complex academic papers, central bank working papers (BIS, IMF, BOK, Fed), and technical reports on stablecoins into structured, interactive study modules.
---

# Paper Study Synthesizer Skill

## 1. Structure of an In-Depth Paper Module (논문 학습 모듈 구성 규격)

학술 논문이나 정책 보고서를 사용자가 체계적으로 학습할 수 있도록 다음 6개 섹션으로 구조화합니다:

1. **메타 정보 (Paper Metadata)**:
   - 원제 (English Title) 및 한글 번역 제목
   - 저자 및 소속 기관 (예: BIS, IMF, Harvard, 한국은행)
   - 발표 연월 및 학술지/저널/아카이브 출처
   - 난이도 등급: `초급(입문자용)` / `중급(경제학/금융 기초)` / `고급(수식/게임이론/스마트컨트랙트)`
   - 핵심 키워드 태그 3~5개

2. **Executive Summary (30초 핵심 요약)**:
   - 연구의 배경 및 해결하고자 한 질문
   - 핵심 결론 3개 불렛포인트

3. **이론적 메커니즘 및 모델 분석 (Core Mechanics & Model)**:
   - 논문이 제시하는 경제학적/수학적 모델의 직관적 해석 (예: Bank Run Game Theory, Diamond-Dybvig 모델의 스테이블코인 적용)
   - 페깅 유지 메커니즘 및 균형(Equilibrium) 조건

4. **취약점 및 스트레스 시나리오 (Stress Test & Vulnerabilities)**:
   - 어떤 시장 충격(유동성 고갈, 오라클 지연, 담보 가치 급락)에서 시스템이 붕괴되는가?
   - 역사적 사례(Terra-Luna depeg, Silicon Valley Bank 사태 시 USDC depeg)와의 비교

5. **정책적·실무적 시사점 (Policy & Investment Takeaways)**:
   - 중앙은행 및 금융당국 규제 입안자를 위한 교훈
   - 투자자 및 프로토콜 설계자가 점검해야 할 핵심 체크리스트

6. **학습 점검 퀴즈 & 용어 해설 (Comprehension Check & Glossary)**:
   - 2~3개의 객관식/단답형 이해도 점검 질문 및 해설
   - 논문에 등장한 핵심 금융/블록체인 전문 용어 사전

---

## 2. Ingestion & Quality Control Checklist
- 수식(LaTeX)은 일반인도 이해할 수 있도록 직관적 비유와 함께 병기
- 논문 원문(PDF / DOI / arXiv)으로 즉시 연결되는 링크 제공
- 한국어 요약 품질: 전문 용어는 업계 표준 한국어 및 영문 병기
