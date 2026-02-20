---
title: "[논문리뷰] PromptBridge: Cross-Model Prompt Transfer for Large Language Models"
excerpt: "Wei Wei이 arXiv에 게시한 'PromptBridge: Cross-Model Prompt Transfer for Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Prompt Engineering
  - Model Drifting
  - Prompt Transfer
  - Cross-Model Adaptation
  - Training-Free
  - Prompt Optimization
  - MAP-RPE

permalink: /ai/review/2025-12-02-PromptBridge-Cross-Model-Prompt-Transfer-for-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01420)

**저자:** Yaxuan Wang, Quan Liu, Zhenting Wang, Zichao Li, Wei Wei, Yang Liu, Yujia Bao



## 핵심 연구 목표
본 논문은 LLM 시스템에서 모델이 교체되거나 업데이트될 때, 기존 모델에 최적화된 프롬프트의 성능이 다른 모델에서 크게 저하되는 현상인 **모델 드리프팅(Model Drifting)** 문제를 해결하고자 합니다. 이로 인해 발생하는 잦은 프롬프트 재최적화 비용과 노력을 줄이고, 효과적인 **크로스-모델 프롬프트 전송(Cross-Model Prompt Transfer)** 을 통해 성능 저하 없이 LLM 시스템의 지속 가능성을 확보하는 것이 주요 목표입니다.

## 핵심 방법론
제안하는 **PromptBridge** 는 **훈련 없는(training-free) 프레임워크** 로, **MAP-RPE(Model-Adaptive Reflective Prompt Evolution)** 를 통한 캘리브레이션과 크로스-모델 전송의 두 단계를 거칩니다. **MAP-RPE** 는 **정량적 피드백** 및 **반영적 정제** 를 통해 소스 및 타겟 모델별 최적 프롬프트를 반복적으로 얻으며, 이 프롬프트 쌍을 기반으로 **Mapping Extractor** 와 **Adapter Model** (예: **GPT-5** )이 **크로스-모델 프롬프트 매핑** 을 학습합니다. 이 매핑은 미지의 작업에 대해 소스 프롬프트를 타겟 모델에 맞는 최적 프롬프트로 **제로샷** 변환하여 적용합니다.

## 주요 결과
**PromptBridge** 는 단일 에이전트 및 다중 에이전트 환경 전반에서 다운스트림 정확도를 일관되게 개선하며 마이그레이션 노력을 줄입니다. 예를 들어, **SWE-BENCH Verified** 벤치마크에서 소스 모델 **04-mini** 에서 타겟 모델 **03** 로 전송 시, 직접 전송 대비 **27.39%** 의 성능 향상을 달성했습니다. 또한, **TERMINAL-Bench** 에서 **GPT-40** 를 소스 모델로, **03** 를 타겟 모델로 사용할 때 직접 전송 대비 **39.44%** 의 정확도 개선을 보여주었습니다.

## AI 실무자를 위한 시사점
**PromptBridge** 는 LLM 시스템 개발 및 배포 시 피할 수 없는 **모델 드리프팅** 문제에 대한 매우 실용적이고 **훈련 없는(training-free)** 해결책을 제시합니다. 이는 LLM 모델이 자주 업데이트되거나 교체되는 환경에서 **프롬프트 재조정 비용** 을 크게 줄일 수 있게 하여, **성능 향상, 비용 효율성, 오픈소스 모델로의 전환** 과 같은 실제 적용 시나리오에서 LLM 기반 애플리케이션의 안정성과 효율성을 높이는 데 기여합니다. 특히, 적은 수의 정렬 작업으로 **제로샷 프롬프트 적응** 을 가능하게 하여, AI 엔지니어들이 새로운 모델에 더 빠르고 효과적으로 대응할 수 있는 길을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.