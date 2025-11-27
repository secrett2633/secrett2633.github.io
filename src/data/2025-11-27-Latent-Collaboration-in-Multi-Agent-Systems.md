---
title: "[논문리뷰] Latent Collaboration in Multi-Agent Systems"
excerpt: "이 [arXiv]에 게시한 'Latent Collaboration in Multi-Agent Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - Large Language Models
  - Latent Space
  - Latent Reasoning
  - Latent Communication
  - KV Cache
  - Computational Efficiency
  - Training-Free

permalink: /ai/review/2025-11-27-Latent-Collaboration-in-Multi-Agent-Systems/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20639)

**저자:** Jiaru Zou, Xiyuan Yang, Ruizhong Qiu, Gaotang Li, Katherine Tieu, Pan Lu, Ke Shen, Hanghang Tong, Yejin Choi, Jingrui He, James Zou, Mengdi Wang, Ling Yang



## 핵심 연구 목표
본 논문은 기존 대규모 언어 모델(LLM) 기반 다중 에이전트 시스템(MAS)이 텍스트 기반 추론 및 통신에 의존하여 발생하는 비효율성과 정보 손실 문제를 해결하는 것을 목표로 합니다. 연속적인 **잠재 공간(latent space)** 내에서 모델들이 직접 협업하도록 하여 시스템 수준의 추론 능력과 효율성을 동시에 극대화하고자 합니다.

## 핵심 방법론
**LatentMAS**는 훈련 없이 작동하는 종단 간 잠재 협업 프레임워크입니다. 각 에이전트는 마지막 레이어의 **히든 임베딩(hidden embeddings)**을 통해 자기회귀적으로 **잠재 사고(latent thoughts)**를 생성합니다. 에이전트 간 정보 교환은 **공유 잠재 작업 메모리(shared latent working memory)**에 저장된 **KV 캐시(KV caches)**를 통해 손실 없이 이루어지며, **선형 정렬 연산자 Wa**를 사용하여 출력 임베딩을 유효한 입력 임베딩 공간으로 정렬하여 분포 일관성을 유지합니다.

## 주요 결과
LatentMAS는 9개 벤치마크에서 강력한 단일 모델 및 텍스트 기반 MAS 기준선을 일관되게 능가했습니다. 특히, 정확도는 **최대 14.6%** 향상되었고, 출력 토큰 사용량은 **70.8%에서 83.7%**까지 감소했습니다. 또한, 종단 간 추론 속도를 **4배에서 4.3배** 더 빠르게 달성했으며, 잠재 사고 생성이 텍스트 기반 추론보다 **O(dh/log|V|) 배** 더 효율적임을 이론적으로 입증했습니다.

## AI 실무자를 위한 시사점
LatentMAS는 훈련 없이 다중 LLM 에이전트 간의 효율적인 협업을 가능하게 하여, 복잡한 문제 해결을 위한 MAS 설계에 새로운 패러다임을 제시합니다. **토큰 사용량과 추론 시간의 대폭 감소**는 AI 애플리케이션의 운영 비용을 절감하고 실시간 상호작용 능력을 향상시키며, **높은 정확도 유지**는 서비스 품질을 보장하여 보다 확장 가능하고 강력한 에이전트 시스템 구축에 실질적으로 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.