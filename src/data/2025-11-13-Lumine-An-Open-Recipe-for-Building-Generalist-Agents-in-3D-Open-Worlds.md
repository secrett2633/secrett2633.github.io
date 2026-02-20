---
title: "[논문리뷰] Lumine: An Open Recipe for Building Generalist Agents in 3D Open Worlds"
excerpt: "arXiv에 게시된 'Lumine: An Open Recipe for Building Generalist Agents in 3D Open Worlds' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generalist Agent
  - 3D Open World
  - Vision-Language Model
  - Imitation Learning
  - Real-time Inference
  - Hybrid Thinking
  - Action Chunking
  - Genshin Impact

permalink: /ai/review/2025-11-13-Lumine-An-Open-Recipe-for-Building-Generalist-Agents-in-3D-Open-Worlds/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08892)

**저자:** Weihao Tan, Xiangyang Li, Yunhao Fang, Heyuan Yao, Shi Yan, Hao Luo, Tenglong Ao, Huihui Li, Hongbin Ren, Bairen Yi, Yujia Qin, Bo An, Libin Liu, Guang Shi



## 핵심 연구 목표
논문은 복잡한 **3D 오픈 월드 환경** 에서 인간 수준의 효율성으로 수 시간 길이의 미션을 실시간으로 완수할 수 있는 **제너럴리스트 에이전트** 를 구축하기 위한 "오픈 레시피"인 Lumine을 제시합니다. 확장 가능한 환경, 멀티모달 인식, 고수준 계획, 저수준 제어, 메모리, 실시간 추론 등 일반 에이전트 개발의 핵심 과제들을 통합적으로 해결하는 것을 목표로 합니다.

## 핵심 방법론
Lumine은 **Qwen2-VL-7B-Base** 모델을 기반으로 하며, **5Hz** 의 원시 픽셀 입력을 처리하고 **30Hz** 의 키보드-마우스 액션을 **액션 청킹(Action Chunking)** 방식으로 생성합니다. 필요한 경우에만 내부 독백 추론을 수행하는 **하이브리드 사고 전략(Hybrid Thinking Strategy)** 을 채택하며, **25.3배의 전체 지연 시간 감소** 를 달성하는 실시간 최적화 기법들을 적용했습니다. 훈련은 **1731시간의 인간 플레이 데이터** 를 사용한 **사전 훈련** , **200시간의 지시 추종 데이터** 를 사용한 언어 접지, **15시간의 추론 데이터** 를 사용한 하이브리드 사고 학습의 3단계 커리큘럼으로 진행됩니다.

## 주요 결과
Lumine은 **Genshin Impact** 의 몬드슈타트 메인 스토리라인 5시간 분량을 인간 수준의 효율성으로 성공적으로 완료했으며, Act I 미션에서 **93.4%의 성공률** 을 기록했습니다. 또한, **Wuthering Waves** 에서 100분 미션과 **Honkai: Star Rail** 의 첫 챕터 5시간 분량을 **제로샷(zero-shot) 일반화 능력** 으로 추가적인 파인튜닝 없이 완수했습니다. 추론 오류율은 히스토리 설정에서 **8.8%** 로, 비히스토리 설정의 **14.0%** 보다 현저히 낮았습니다.

## AI 실무자를 위한 시사점
본 연구는 단일 게임 훈련만으로도 **VLM 기반 에이전트** 가 복잡한 3D 오픈 월드와 다양한 게임 장르에 걸쳐 강력한 일반화 능력을 보일 수 있음을 입증했습니다. 제시된 **3단계 훈련 커리큘럼** 과 **실시간 최적화 기법** 은 제너럴리스트 에이전트 개발을 위한 실용적이고 확장 가능한 레시피를 제공합니다. 향후 **데이터 규모 확장** , **온라인 학습** 을 통한 지속적인 자가 개선, 그리고 **장기 기억 메커니즘** 의 고도화는 더욱 복잡한 장기 미션 해결에 필수적이며, AI-인간 공동 경험의 새로운 형태를 열 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.