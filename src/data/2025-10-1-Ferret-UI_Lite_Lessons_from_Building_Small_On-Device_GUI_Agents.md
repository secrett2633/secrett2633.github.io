---
title: "[논문리뷰] Ferret-UI Lite: Lessons from Building Small On-Device GUI Agents"
excerpt: "이 [arXiv]에 게시한 'Ferret-UI Lite: Lessons from Building Small On-Device GUI Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - On-Device AI
  - Multimodal LLM
  - GUI Grounding
  - GUI Navigation
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Synthetic Data

permalink: /ai/review/2025-10-1-Ferret-UI_Lite_Lessons_from_Building_Small_On-Device_GUI_Agents/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26539)

**저자:** Zhen Yang, Zi-Yi Dou, Di Feng, Forrest Huang, Anh Nguyen, Keen You, Omar Attia, Yuhao Yang, Michael Feng, Haotian Zhang, Ram Ramrakhya, Chao Jia, Jeffrey Nichols, Alexander Toshev, Yinfei Yang, Zhe Gan*



## 핵심 연구 목표
본 논문은 낮은 지연 시간, 강력한 프라이버시 보장 및 제한된 연결성 환경에서 견고한 동작을 요구하는 온디바이스 GUI 에이전트 개발의 과제를 해결하고자 합니다. 특히, 기존 대규모 서버측 모델 중심의 접근 방식과 달리 소형 온디바이스 모델인 **Ferret-UI Lite**를 개발하여 경쟁력 있는 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
**Ferret-UI Lite**는 **3B 파라미터**를 가진 **종단 간 멀티모달 LLM**으로 구축되었습니다. 주요 방법론에는 실제 및 합성 GUI 데이터 혼합을 통한 **다양한 GUI 데이터 큐레이션**, 이미지 크롭 및 확대 기능을 활용한 **추론 시간 시각적 도구 사용(visual tool-use)**, 그리고 **지도 미세 조정(SFT)**과 **검증 가능한 보상 기반 강화 학습(RLVR)**을 결합한 2단계 훈련 전략이 포함됩니다. 특히 RL 단계에서는 예측이 정답 바운딩 박스 안에 들어올 경우 양성 보상을 부여하는 **컨테인먼트 기반 보상**을 사용합니다.

## 주요 결과
GUI 그라운딩 태스크에서 **Ferret-UI Lite (3B)**는 ScreenSpot-V2에서 **91.6%**, ScreenSpot-Pro에서 **53.3%**, OSWorld-G에서 **61.2%**의 정확도를 달성하여 다른 소형 모델들을 능가하고 일부 대형 모델과도 경쟁력 있는 성능을 보여주었습니다. GUI 내비게이션 태스크에서는 AndroidWorld에서 **28.0%**, OSWorld에서 **19.8%**의 성공률을 기록하여 7B 모델들과 유사한 성능을 보였으나, 장기적인 추론이 필요한 멀티스텝 내비게이션에서는 여전히 제한적인 성능을 나타냈습니다.

## AI 실무자를 위한 시사점
본 연구는 소형 온디바이스 멀티모달 LLM으로도 GUI 에이전트의 강력한 그라운딩 및 내비게이션 성능을 달성할 수 있음을 입증하여 온디바이스 AI 개발의 가능성을 제시합니다. **다양한 데이터 큐레이션**, **추론 시간 시각적 도구 사용**, 그리고 **신중하게 설계된 SFT-RLVR 훈련 전략**이 소형 모델 성능 향상에 핵심적임을 강조합니다. 다만, 멀티스텝 내비게이션과 같은 복잡한 장기 추론 과제는 여전히 소형 모델의 주요 도전 과제로 남아있으므로 이에 대한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.