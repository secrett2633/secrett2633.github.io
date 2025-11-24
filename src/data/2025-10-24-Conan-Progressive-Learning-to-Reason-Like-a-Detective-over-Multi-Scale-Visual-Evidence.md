---
title: "[논문리뷰] Conan: Progressive Learning to Reason Like a Detective over Multi-Scale
  Visual Evidence"
excerpt: "이 [arXiv]에 게시한 'Conan: Progressive Learning to Reason Like a Detective over Multi-Scale
  Visual Evidence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Multimodal Large Language Models (MLLMs)
  - Reinforcement Learning (RLVR)
  - Evidence Grounding
  - Multi-step Reasoning
  - Frame Retrieval
  - Dataset Construction
  - Progressive Learning

permalink: /ai/review/2025-10-24-Conan-Progressive-Learning-to-Reason-Like-a-Detective-over-Multi-Scale-Visual-Evidence/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20470)

**저자:** Kun Ouyang, Yuanxin Liu, Linli Yao, Yishuo Cai, Hao Zhou, Jie Zhou, Fandong Meng, Xu Sun



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLMs)이 순수 텍스트 추론이나 부정확한 증거 지역화로 인해 종종 발생시키는 근거 없는/환각적 결론의 문제를 해결하고, 다단계 비디오 추론 능력을 강화하는 것을 목표로 합니다. 탐정처럼 다중 스케일 시각적 증거를 기반으로 추론하고, 관련 프레임을 식별하며, 교차 프레임 단서를 통해 논리적 추론 체인을 형성하는 프레임워크를 개발하고자 합니다.

## 핵심 방법론
연구팀은 먼저 **Conan-91K**라는 대규모 증거 기반 추론 데이터셋을 구축했으며, 이는 **Kimi K2**를 활용한 자동 파이프라인으로 프레임 식별, 증거 추론, 액션 결정을 포함합니다. 훈련 절차는 **다단계 점진적 콜드 스타트(Multi-Stage Progressive Cold-Start) 전략**과 **식별-추론-액션(AIR) RLVR 프레임워크**를 결합하여 구성됩니다. RLVR은 **형식 보상(Format Reward)**, **다지선다/자유 형식 보상(Multi-choice/Free-form Reward)**, **식별 보상(Identification Reward)**, **검색 보상(Retrieval Reward)** 등의 보상 함수를 통해 모델의 추론 및 검색 효율성을 최적화합니다.

## 주요 결과
Conan은 6가지 다단계 추론 벤치마크(MMR-V, Video-Holmes, VRBench, VCRBench, LongVideoReason, Human-P&C)에서 기준 모델인 **Qwen2.5-VL-7B-Instruct** 대비 평균 **10% 이상의 정확도 향상**을 달성했습니다. 특히, **GPT-4o**와 같은 최첨단 모델보다도 우수한 성능을 보였습니다. 또한, LongVideoBench, MLVU, LVBench, Video-MME와 같은 장시간 비디오 이해 태스크에서도 강력한 일반화 능력을 입증하며 최첨단 성능을 달성했습니다.

## AI 실무자를 위한 시사점
**Conan 프레임워크**는 MLLMs가 복잡한 비디오 추론을 수행할 수 있도록 하는 강력한 방법론을 제시하며, 비디오 분석, 감시, 콘텐츠 검토 등 고신뢰성 및 검증 가능성이 요구되는 AI 응용 분야에 직접적으로 기여할 수 있습니다. **Conan-91K 데이터셋**과 **다단계 점진적 콜드 스타트 훈련 전략**은 다른 멀티모달 모델의 추론 능력 개발을 위한 귀중한 참고 자료가 될 수 있습니다. 이는 복잡한 시각적 증거를 기반으로 한 AI 시스템 설계에 있어 중요한 진전을 의미합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.