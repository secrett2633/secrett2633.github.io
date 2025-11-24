---
title: "[논문리뷰] MELLA: Bridging Linguistic Capability and Cultural Groundedness for
  Low-Resource Language MLLMs"
excerpt: "Guohang Yan이 [arXiv]에 게시한 'MELLA: Bridging Linguistic Capability and Cultural Groundedness for
  Low-Resource Language MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Low-Resource Languages
  - Cultural Groundedness
  - Linguistic Capability
  - Dataset Creation
  - Multilingual AI

permalink: /ai/review/2025-8-11-MELLA-Bridging-Linguistic-Capability-and-Cultural-Groundedness-for-Low-Resource-Language-MLLMs/

toc: true
toc_sticky: true

date: 2025-08-11 13:13:28+0900
last_modified_at: 2025-08-11 13:13:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05502)

**저자:** Yufei Gao, Jiaying Fei, Nuo Chen, Ruirui Chen, Guohang Yan, Yunshi Lan, Botian Shi



## 핵심 연구 목표
본 논문은 고자원 언어에 집중되어 저자원 언어에서 성능이 저하되는 기존 **다중 모드 대규모 언어 모델(MLLM)**의 한계를 해결하고자 합니다. 특히, 기존 다국어 향상 방법론이 **텍스트 모달리티**에 국한되거나 **기계 번역(MT)**에 의존하여 이미지의 **문화적 함축(connotation)**을 포착하지 못하는 문제를 극복하고, 저자원 언어 MLLM의 **언어적 능력(Linguistic Capability)**과 **문화적 접지(Cultural Groundedness)**를 동시에 향상하는 것을 목표로 합니다.

## 핵심 방법론
논문은 이미지의 의미를 **문자적 묘사(denotation)**와 **문화적 함축(connotation)**으로 분해하고, 이를 달성하기 위한 **듀얼-소스 데이터 전략(Dual-Source Data Strategy)**을 제안합니다. **문화적 접지**를 위해 **원어민 웹 alt-text(Native Web Alt-text)** 기반의 **D_know** 데이터셋을 구축하고, **언어적 능력**을 위해 **MLLM 생성 캡션**을 번역한 **D_ling** 데이터셋을 활용합니다. 이 두 소스를 결합하여 **MELLA**라는 새로운 **다중 모드, 다국어 데이터셋**을 구축했으며, 이는 8개 저자원 언어에 걸쳐 총 **6.8백만 이미지-텍스트 쌍**으로 구성됩니다. 이 데이터셋을 사용하여 **감독형 미세 조정(Supervised Fine-Tuning, SFT)** 방식으로 MLLM을 훈련합니다.

## 주요 결과
**MELLA** 데이터셋으로 fine-tuning한 결과, **InternVL2-8B** 및 **QwenVL2-7B**와 같은 다양한 MLLM 백본에서 8개 저자원 언어 모두에서 전반적인 성능 향상을 보였습니다. 특히, **D_know**에 대한 **키워드 정확도(Keyword Accuracy)** 평가에서 **문화 지식 향상**이 확인되었으며(예: InternVL2-8B의 AR 언어 키워드 정확도가 baseline **2.46%**에서 **6.26%**로 상승), **D_ling**에 대한 **Meteor** 평가에서 **언어 능력 향상**이 입증되었습니다(예: InternVL2-8B의 HU 언어 Meteor 점수가 baseline **0.11%**에서 **13.11%**로 크게 상승). 이는 모델이 기존의 "얇은 묘사(thin descriptions)"를 넘어 "두터운 묘사(thick descriptions)"를 생성할 수 있음을 시사합니다.

## AI 실무자를 위한 시사점
본 연구는 저자원 언어 사용자를 위한 **포괄적인 MLLM 개발의 중요성**을 강조하며, 단순 번역을 넘어 **문화적 뉘앙스를 포착하는 데이터 구축 전략**의 효과성을 입증했습니다. 이는 **현지화된 콘텐츠 생성, 문화 교육** 등 다문화적 이해가 필요한 AI 애플리케이션 분야에서 실질적인 기여를 할 수 있는 기반을 마련합니다. 제안된 **듀얼-소스 데이터 수집 방법론**은 다른 저자원 언어 또는 특정 도메인에 특화된 MLLM 구축에도 유용하게 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.