---
title: "[논문리뷰] COMPASS: A Framework for Evaluating Organization-Specific Policy Alignment in LLMs"
excerpt: "이 [arXiv]에 게시한 'COMPASS: A Framework for Evaluating Organization-Specific Policy Alignment in LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Policy Alignment
  - Organizational Policies
  - AI Safety
  - Adversarial Robustness
  - Refusal Behavior
  - Prompt Engineering
  - Fine-tuning

permalink: /ai/review/2026-01-06-COMPASS-A-Framework-for-Evaluating-Organization-Specific-Policy-Alignment-in-LLMs/

toc: true
toc_sticky: true

date: 2026-01-06 00:00:00+0900+0900
last_modified_at: 2026-01-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.01836)

**저자:** Dasol Choi, DongGeon Lee, Brigitta Jesica Kartono, Helena Berndt, Taeyoun Kwon, Joonwon Jang, Haon Park, Hwanjo Yu, Minsuk Kahng



## 핵심 연구 목표
본 논문은 범용적인 유해성 평가를 넘어, LLM이 기업 및 조직 특유의 **허용 목록(allowlist)** 및 **거부 목록(denylist) 정책** 을 얼마나 잘 준수하는지 체계적으로 평가하기 위한 **COMPASS** 프레임워크를 제안합니다. 이는 헬스케어, 금융 등 고위험 엔터프라이즈 환경에서 오정보, 규제 위반, 사용자 피해를 방지하기 위해 필수적입니다.

## 핵심 방법론
**COMPASS** 는 조직의 정책과 맥락을 기반으로 평가 쿼리를 자동 생성합니다. 이는 **일상적인 준수 여부** 를 확인하는 **기본 쿼리(base queries)** 와 정책 경계를 스트레스 테스트하는 **엣지 쿼리(edge queries)** 로 구성됩니다. 엣지 쿼리는 **6가지 적대적 변환 전략** 을 사용하여 미묘하게 정책 위반 의도를 숨깁니다. 생성된 쿼리에 대한 LLM 챗봇의 응답은 **LLM 평가자(GPT-5-mini)** 를 통해 거부 행동과 정책 준수 여부를 평가하여 **정책 정렬 점수(PAS)** 를 산출합니다. 또한, **명시적 거부 프롬프트** , **Few-Shot 데모** , **사전 필터링** , **RAG** , **정책 인식 미세 조정(LoRA)** 등의 완화 전략 효과도 분석했습니다.

## 주요 결과
평가 결과, LLM은 허용 목록 쿼리에 대해서는 **95% 이상의 높은 정확도** 를 보였으나, 거부 목록 위반, 특히 **적대적 엣지 케이스** 에 대한 거부는 **13~40%** 에 불과한 치명적인 실패율을 나타냈습니다. **확장성 분석** 에서는 모델 크기가 커져도 거부 목록 강건성 개선에는 미미한 영향을 미쳤습니다. **사전 필터링** 은 거부 목록 정책 준수를 **96% 이상** 으로 크게 향상시켰지만, 허용 목록 쿼리에서 **과도한 거부** 를 초래하여 허용 목록 정확도가 **37.2%** 까지 떨어지는 상충 관계를 보였습니다. 반면, **정책 인식 미세 조정** 은 **60-62% PAS** 를 달성하며 도메인 간 일반화 가능성을 보여주었습니다.

## AI 실무자를 위한 시사점
현재 LLM은 기업 특유의 거부 목록 정책, 특히 적대적 상황에서 매우 취약하다는 점이 드러났습니다. 단순히 모델을 확장하거나 프롬프트 엔지니어링만으로는 신뢰할 수 있는 정책 준수를 보장하기 어렵습니다. AI 엔지니어는 **사전 필터링** 과 같은 외부 메커니즘을 신중하게 도입하여 거부 목록을 강화하는 동시에, **허용 목록에 대한 과도한 거부** 를 최소화하는 균형점을 찾아야 합니다. 또한, **정책 인식 미세 조정** 은 LLM이 정책 준수 능력을 학습하도록 돕는 유망한 방향이므로, 이 분야의 추가 연구와 적용이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.