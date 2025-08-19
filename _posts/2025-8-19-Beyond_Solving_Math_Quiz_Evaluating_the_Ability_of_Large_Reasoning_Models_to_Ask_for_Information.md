---
title: "[논문리뷰] Beyond Solving Math Quiz: Evaluating the Ability of Large Reasoning
  Models to Ask for Information"
excerpt: "Xi Yang이 [arXiv]에 게시한 'Beyond Solving Math Quiz: Evaluating the Ability of Large Reasoning
  Models to Ask for Information' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models (LRMs)
  - Information Seeking
  - Incomplete Problems
  - Mathematical Reasoning
  - Supervised Fine-tuning (SFT)
  - Overthinking
  - Hallucination
  - CRITIC-math

permalink: /ai/review/2025-8-19-Beyond_Solving_Math_Quiz_Evaluating_the_Ability_of_Large_Reasoning_Models_to_Ask_for_Information/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.11252)

**저자:** Youcheng Huang, Xi Yang, Bowen Qin, Chen Huang, Duanyu Feng, Wenqiang Lei, Jiancheng Lv



## 핵심 연구 목표
본 논문은 기존 수학 벤치마크가 잘 정의된 문제 해결 능력에만 초점을 맞추는 한계를 지적하며, **Large Reasoning Models (LRMs)**이 정보가 불충분한 문제에 직면했을 때 **능동적으로 정보를 요청하는 능력**을 평가하는 것을 목표로 합니다. 진정한 지능형 에이전트가 단순히 문제를 푸는 것을 넘어 정보 요청의 주도성을 갖춰야 한다는 관점에서 연구를 진행합니다.

## 핵심 방법론
연구팀은 두 가지 유형의 불완전한 수학 문제(목표 누락 및 전제 누락)를 포함하는 새로운 데이터셋인 **CRITIC-math**를 구축했습니다. 이 데이터셋은 **MATH 500**, **Omni-MATH**, **OpenR1-Math** 등 기존 데이터셋의 잘 정의된 문제를 재작성하여 생성되었으며, 수동 검증을 거쳤습니다. **Deepseek-R1**, **Qwen3-plus**, **Claude 3.7** 등 최신 LRM들을 **명시적(explicit) 및 암시적(implicit) 프롬프트**로 평가하여 **Clarification Ratio (CR)**, **Clarification Accuracy (ACC)**, **Thoughts Lengths (TLC, TLNC)** 등의 지표를 분석했습니다. 또한, **Qwen3-8B-Base** 모델에 **Supervised Fine-Tuning (SFT)**을 적용하여 LRM이 이러한 능력을 학습할 수 있는지 탐구했습니다.

## 주요 결과
기존 LRM들은 암시적 프롬프트에서 매우 낮은 **Clarification Ratio (CR 약 25%)**와 **Accuracy (ACC 약 40%)**를 보이며 정보 요청 능력 부족을 드러냈습니다. 반면, SFT를 통해 **CRITIC-Qwen** 모델의 CR은 누락된 전제 문제에서 **78.42%**, 누락된 목표 문제에서 **94.87%**로 크게 향상되었고, 잘 정의된 문제에서의 정확도는 **87.86%**에 달했습니다. 또한, LRM이 정보를 요청하지 못할 때 **과도한 사고(overthinking)** 및 **환각(hallucination)**과 같은 행동을 보인다는 점이 밝혀졌습니다.

## AI 실무자를 위한 시사점
현재 LRM들은 대부분 "수학 퀴즈 해결사"에 가깝게 작동하며, 현실 세계의 불확실성에 대응할 **능동적인 정보 탐색 능력**이 부족함을 시사합니다. 이는 기존의 잘 정의된 문제 중심 평가 패러다임을 넘어선 **새로운 평가 프레임워크**의 필요성을 강조합니다. **SFT**는 정보 요청 능력 학습의 가능성을 보여주지만, "심층적 사고"와 "정보 요청" 능력 간의 **딜레마**가 존재하여, 진정한 다면적 지능 개발을 위한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.