---
title: "[논문리뷰] Analyzing the Effects of Supervised Fine-Tuning on Model Knowledge from
  Token and Parameter Levels"
excerpt: "Qi Zhang이 [arXiv]에 게시한 'Analyzing the Effects of Supervised Fine-Tuning on Model Knowledge from
  Token and Parameter Levels' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Supervised Fine-Tuning (SFT)
  - Large Language Models (LLMs)
  - Model Knowledge
  - Closed-Book Question Answering (CBQA)
  - Parameter Restoration
  - Kullback-Leibler Divergence
  - Knowledge Forgetting

permalink: /ai/review/2025-9-23-Analyzing_the_Effects_of_Supervised_Fine-Tuning_on_Model_Knowledge_from_Token_and_Parameter_Levels/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16596)

**저자:** Junjie Ye, Yuming Yang, Yang Nan, Shuo Li, Qi Zhang, Tao Gui, Xuanjing Huang, Peng Wang, Zhongchao Shi, Jianping Fan



## 핵심 연구 목표
본 논문은 LLM에서 **SFT가 모델의 지식에 미치는 영향**이 충분히 이해되지 않고 있다는 문제의식에서 출발합니다. 특히 다양한 범주의 데이터와 스케일이 모델 지식에 어떤 변화를 주는지, 그 메커니즘은 무엇이며, 바람직하지 않은 영향을 어떻게 완화할 수 있는지 탐구하여 지식 변화를 제어하는 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
연구는 **LLaMA-2 및 LLaMA-3 계열의 5가지 LLM**을 대상으로 **Closed-Book Question Answering (CBQA)** 태스크에서 수행되었습니다. 훈련 데이터는 모델의 **지식 숙련도 수준(knowledge mastery level)**에 따라 5개 그룹으로 분류하고 다양한 데이터 스케일(60개에서 1920개 샘플)을 체계적으로 실험했습니다. 분석은 토큰 수준에서 **KL divergence**를 계산하여 미세 조정된 모델과 사전 훈련된 모델 간의 토큰 분포 차이를 정량화했으며, 파라미터 수준에서는 SFT 중 가장 많이 변경된 파라미터의 **최대 90%를 사전 훈련 값으로 복원**하여 성능 변화를 관찰했습니다.

## 주요 결과
놀랍게도, **1,920개 샘플로 미세 조정된 모델은 240개 샘플로 미세 조정된 모델보다 CBQA 성능이 최대 14% 더 나빴습니다.** 미세 조정 데이터의 지식 숙련도 수준에 따라 성능 변동이 12% 이상 발생했습니다. 파라미터 수준 분석 결과, SFT 중 발생한 파라미터 업데이트의 **최대 90%가 지식 향상에 기여하지 않으며**, 이러한 불필요한 업데이트를 복원하면 **CBQA 태스크 성능이 최대 10% 이상 향상**될 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 SFT가 항상 모델 지식을 강화하는 것은 아니며, **데이터의 양과 질, 그리고 모델의 초기 지식 상태**가 SFT 결과에 결정적인 영향을 미친다는 중요한 시사점을 제공합니다. 특히 **과도한 데이터 양**이나 **낮은 숙련도의 데이터**는 성능 저하를 야기할 수 있습니다. **파라미터 복원**을 통해 불필요한 업데이트를 제거하고 모델의 사전 지식을 보존하는 전략은 LLM의 **효율적인 미세 조정 및 지식 유지**에 실질적인 가이드라인을 제시하며, 향후 더 효과적인 미세 조정 전략 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.