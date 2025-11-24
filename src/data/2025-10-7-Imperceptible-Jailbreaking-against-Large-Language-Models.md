---
title: "[논문리뷰] Imperceptible Jailbreaking against Large Language Models"
excerpt: "이 [arXiv]에 게시한 'Imperceptible Jailbreaking against Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Jailbreaking
  - Imperceptible Attacks
  - Unicode Variation Selectors
  - Adversarial Suffixes
  - Safety Alignment
  - Prompt Injection

permalink: /ai/review/2025-10-7-Imperceptible-Jailbreaking-against-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05025)

**저자:** Kuofeng Gao, Yiming Li, Chao Du, Xin Wang, Xingjun Ma, Shu-Tao Xia, Tianyu Pang



## 핵심 연구 목표
본 논문은 기존의 가시적인 텍스트 수정 방식과 달리 **눈에 보이지 않는(imperceptible)** 방식으로 LLM의 안전 장치를 우회하는 새로운 `제일브레이크` 공격 기법을 제안합니다. 시각적으로는 원본과 동일하게 보이지만 LLM의 `토크나이저` 단계에서 `악의적인 행동`을 유발하는 `숨겨진 변경 사항`을 도입하여 `안전 정렬`된 LLM이 `유해한 응답`을 생성하도록 하는 것이 목표입니다.

## 핵심 방법론
연구진은 `Unicode variation selectors`라는 **비가시적 문자**를 `악의적인 질문`에 `접미사`로 추가하여 공격을 수행합니다. 이 `접미사`는 화면에는 표시되지 않지만 LLM의 `토크나이저`에 의해 `추가적인 토큰`으로 인코딩됩니다. 최적의 `적대적 접미사`를 찾기 위해 `표적-시작 토큰` (예: "**Sure**")의 `로그-우도`를 최대화하는 **chain-of-search pipeline**을 제안하며, 이는 `랜덤 탐색`과 `부트스트랩 방식`을 통해 `성공적인 접미사`와 `표적-시작 토큰`을 재활용하여 점진적으로 성능을 향상시킵니다.

## 주요 결과
제안된 `눈에 보이지 않는 제일브레이크`는 **Vicuna-13B-v1.5**, **Llama-2-Chat-7B**, **Mistral-7B-Instruct-v0.2** 모델에서 **100% 공격 성공률(ASR)**을 달성했으며, **Llama-3.1-Instruct-8B**에서는 **80% ASR**을 기록하며 `가시적인 변경` 없이 높은 성능을 보였습니다 (Table 3). 또한, `프롬프트 인젝션` 시나리오에서도 모든 테스트 LLM에서 **100% ASR**을 달성하며 공격의 일반화 능력을 입증했습니다 (Table 4). `어텐션 분석` 결과, 모델의 `어텐션`이 `유해한 콘텐츠`에서 `비가시적 접미사`로 이동하여 `안전 장치`를 우회하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 `안전성`에 대한 새로운 `취약점`인 **비가시적 문자 기반 공격**의 가능성을 제시합니다. AI 실무자들은 LLM 시스템에 `입력 필터링` 및 `전처리` 단계를 강화하여 `Unicode variation selectors`와 같은 **숨겨진 문자**를 식별하고 제거하는 메커니즘을 고려해야 합니다. 또한, `모델의 임베딩` 및 `어텐션 분포`를 모니터링하여 `비정상적인 패턴`을 탐지하고, `perplexity-based filtering`과 같은 `출력 필터링 메커니즘`을 강화하여 `제일브레이크`된 `유해한 응답`을 효과적으로 완화해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.