---
title: "[논문리뷰] First Try Matters: Revisiting the Role of Reflection in Reasoning Models"
excerpt: "Wee Sun Lee이 [arXiv]에 게시한 'First Try Matters: Revisiting the Role of Reflection in Reasoning Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Reasoning
  - Chain-of-Thought (CoT)
  - Reflection
  - Early Stopping
  - Supervised Fine-tuning (SFT)
  - Token Efficiency
  - Mathematical Reasoning

permalink: /ai/review/2025-10-10-First_Try_Matters_Revisiting_the_Role_of_Reflection_in_Reasoning_Models/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08308)

**저자:** Liwei Kang, Yue Deng, Yao Xiao, Zhanfeng Mo, Wee Sun Lee, Lidong Bing



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 추론 과정에서 "반영(reflection)"의 실제 기여도를 체계적으로 분석하는 것을 목표로 합니다. 특히, 모델이 이미 후보 답변을 생성한 후에도 계속되는 추론 단계가 오류 수정에 실질적으로 도움이 되는지, 아니면 초기 결론을 재확인하는 역할을 하는지 밝히고자 합니다.

## 핵심 방법론
연구팀은 **LLM 기반 후보 답변 추출기**를 사용하여 5가지 수학 데이터셋에 걸쳐 8개 추론 모델의 롤아웃을 분석했습니다. 이를 통해 첫 번째 후보 답변 이후의 단계를 반영으로 정의하고, 반영 유형을 분류했습니다. 훈련 측면에서는 다양한 양의 반영 단계를 포함하는 **지도 학습 미세 조정(SFT) 데이터셋**을 구축하여 모델 성능 변화를 관찰했으며, 추론 시에는 **Candidate Answer Detector (CAD)**와 **Question-aware Reflection Controller (QRC)**를 활용한 **질문 인식 조기 중단(early-stopping)** 방법을 제안했습니다.

## 주요 결과
분석 결과, 추론 모델의 반영은 90% 이상이 **확인(confirmatory)** 목적이며, 초기 오답을 정답으로 바꾸는 **수정(corrective) 반영은 2% 미만**으로 매우 드물게 나타났습니다. 반영 단계는 전체 토큰 사용량의 상당 부분(16.8%~47.8%)을 차지하지만, 최종 성능 향상 기여도는 **1.4%~3.5%**에 그쳤습니다. 대신, 반영이 풍부한 데이터로 훈련된 모델은 **첫 번째 후보 답변의 정확도를 평균 3.75% 향상**시키는 것으로 밝혀졌습니다. 제안된 조기 중단 기법은 정확도 **2.9% 하락** 내에서 추론 토큰 사용량을 **24.5% 감소**시켰습니다.

## AI 실무자를 위한 시사점
LLM 추론에서 반영은 주로 답변 확인에 사용되며, 실제 오류 수정 효과는 미미하므로, 고비용의 반영 단계를 줄이는 **토큰 효율적인 추론 전략**의 중요성이 강조됩니다. 특히, **CAD** 및 **QRC**와 같은 조기 중단 기법은 실제 배포 환경에서 비용을 절감하는 효과적인 방법이 될 수 있습니다. 또한, 모델 훈련 시에는 반영을 통해 다양한 추론 경로를 노출하여 **초기 추론 품질을 높이는** 데이터셋 설계가 효과적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.