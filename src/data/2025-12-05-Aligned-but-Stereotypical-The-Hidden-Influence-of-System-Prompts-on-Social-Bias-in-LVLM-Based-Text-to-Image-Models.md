---
title: "[논문리뷰] Aligned but Stereotypical? The Hidden Influence of System Prompts on Social Bias in LVLM-Based Text-to-Image Models"
excerpt: "arXiv에 게시된 'Aligned but Stereotypical? The Hidden Influence of System Prompts on Social Bias in LVLM-Based Text-to-Image Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image
  - LVLM
  - Social Bias
  - System Prompts
  - Bias Mitigation
  - Meta-Prompting
  - Fairness
  - Generative AI

permalink: /ai/review/2025-12-05-Aligned-but-Stereotypical-The-Hidden-Influence-of-System-Prompts-on-Social-Bias-in-LVLM-Based-Text-to-Image-Models/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04981)

**저자:** NaHyeon Park, Na Min An, Kunhee Kim, Soyeon Yoon, Jiahao Huo, Hyunjung Shim



## 핵심 연구 목표
본 연구는 최근 **LVLM(Large Vision-Language Model) 기반 텍스트-투-이미지(T2I) 모델** 이 이미지 생성에서 높은 품질을 달성했음에도 불구하고, 사회적 편향을 얼마나 증폭시키는지에 대한 이해가 부족하다는 문제의식을 제기합니다. 특히, LVLM 기반 T2I 모델에서 편향이 발생하는 근본적인 메커니즘을 규명하고, 시스템 프롬프트가 편향 전파에 미치는 숨겨진 영향을 분석하며, 이를 효과적으로 완화할 수 있는 훈련 없는(training-free) 방법론을 제안하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **1,024개의 다단계 프롬프트 벤치마크** 를 구축하여 **SD3.5, FLUX, SANA, Qwen-Image** 등 6개 모델의 편향을 평가했습니다. 편향 측정에는 **Llama3.2-11B VQA 모델** 을 평가자로 활용하고 **Fair Discrepancy(FD) 지표** 를 사용하여 **성별, 연령, 민족성, 외모** 편향을 정량화했습니다. 편향 전파 메커니즘을 분석하기 위해 **디코딩된 텍스트, 토큰 확률 진단, 임베딩 연관성 분석** 을 수행했으며, 이를 바탕으로 LVLM이 사용자 입력을 **자체 감사(self-audit)** 하고 공정성 인식 시스템 프롬프트를 생성하는 훈련 없는 **FAIRPRO 메타-프롬프팅 프레임워크** 를 제안했습니다.

## 주요 결과
**LVLM 기반 T2I 모델(SANA, Qwen-Image)** 은 비-LVLM 모델 대비 일관되게 **더 높은 사회적 편향** 을 보였습니다. 특히 **Qwen-Image** 는 연령, 성별, 외모 속성에서 가장 높은 편향을 나타냈습니다. 프롬프트 복잡성 증가와 명시적인 인구통계학적 속성 추가는 편향을 증폭시켰으며, 텍스트-이미지 정렬과 사회적 편향 간에 **0.948의 강한 양의 피어슨 상관관계** 가 있음을 발견했습니다. 제안된 **FAIRPRO** 는 **SANA의 성별 편향 점수를 0.906에서 0.771로 감소** 시키는 등 **두 LVLM 기반 모델 모두에서 모든 속성과 프롬프트 유형에 걸쳐 편향을 현저히 줄이면서** 텍스트-이미지 정렬 성능을 유지했습니다.

## AI 실무자를 위한 시사점
LVLM 기반 T2I 시스템을 활용하는 AI 실무자들은 **시스템 프롬프트** 가 생성 이미지의 사회적 편향에 지대한 영향을 미친다는 점을 인지해야 합니다. **FAIRPRO** 와 같은 **메타-프롬프팅 기법** 은 추가적인 모델 재훈련 없이도 테스트 시점에 **동적으로 편향을 완화** 할 수 있는 효과적이고 실용적인 전략을 제공합니다. 이는 특히 사용자 프롬프트에 내재된 편향이나 **모델의 암묵적인 사회적 고정관념** 이 이미지 생성 과정에서 증폭되는 것을 방지하는 데 기여할 수 있습니다. 또한, 모델의 **텍스트-이미지 정렬도 향상** 이 때로는 **사회적 편향 증가** 와 함께 발생할 수 있다는 시사점은 AI 시스템 개발 시 성능과 윤리적 공정성 사이의 균형을 신중하게 고려해야 함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.