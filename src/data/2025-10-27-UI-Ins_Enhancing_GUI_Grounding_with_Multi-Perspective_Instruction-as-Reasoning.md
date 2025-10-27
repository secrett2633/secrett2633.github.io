---
title: "[논문리뷰] UI-Ins: Enhancing GUI Grounding with Multi-Perspective
  Instruction-as-Reasoning"
excerpt: "이 [arXiv]에 게시한 'UI-Ins: Enhancing GUI Grounding with Multi-Perspective
  Instruction-as-Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Grounding
  - Natural Language Instructions
  - Multi-Perspective Reasoning
  - Supervised Fine-Tuning (SFT)
  - Reinforcement Learning (RL)
  - Policy Collapse Mitigation
  - GUI Agents

permalink: /ai/review/2025-10-27-UI-Ins_Enhancing_GUI_Grounding_with_Multi-Perspective_Instruction-as-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20286)

**저자:** Liangyu Chen, Hanzhang Zhou, Chenglin Cai, Jianan Zhang, Panrong Tong, Quyu Kong, Xu Zhang, Chen Liu, Yuqi Liu, Wenxuan Wang, Yue Wang, Qin Jin, Steven HOI



## 핵심 연구 목표
본 논문은 GUI 그라운딩(grounding) 태스크에서 자연어 명령어의 **다양성과 품질**이 모델 성능에 미치는 영향을 간과했던 기존 연구의 한계를 극복하고자 합니다. 명령어에 존재하는 **23.3%의 오류율**을 개선하고, 추론 시 **명령어 다양성**을 활용하여 최대 **76%의 상대적 성능 향상**을 목표로 합니다. 이를 위해 명령어(instruction)를 정적 입력이 아닌 동적 분석 경로로 처리하는 **Instruction-as-Reasoning 패러다임**을 제안합니다.

## 핵심 방법론
제안하는 **Instruction-as-Reasoning** 프레임워크는 두 단계 훈련으로 구성됩니다. 첫째, **Supervised Fine-Tuning (SFT)** 단계에서는 **GPT-4.1**을 활용하여 합성된 다중 관점(외형, 기능, 위치, 의도) 명령어를 통해 모델에 다중 관점 추론 능력을 주입합니다. 둘째, **Reinforcement Learning (RL)** 단계에서는 **Group Relative Policy Optimization (GRPO)**를 사용하여 특정 상황에 최적의 추론 경로를 선택하고 구성하는 능력을 학습하도록 최적화합니다.

## 주요 결과
개발된 **UI-Ins-7B** 및 **UI-Ins-32B** 모델은 5가지 GUI 그라운딩 벤치마크에서 최첨단 성능을 달성했습니다. 특히, **UI-Ins-32B**는 UI-I2E-Bench에서 **87.3%**, ScreenSpot-Pro에서 **57.0%**, MMBench-GUI L2에서 **84.9%**의 정확도를 기록했습니다. 또한, **UI-Ins-7B**를 실행자로 **GPT-5**를 플래너로 활용한 AndroidWorld 벤치마크에서 **74.1%의 성공률**을 달성하며 **Gemini 2.5 Computer Use**와 같은 강력한 베이스라인을 능가했습니다.

## AI 실무자를 위한 시사점
GUI 에이전트 개발 시 명령어의 **다양성과 품질 확보**가 모델 성능에 결정적인 영향을 미친다는 것을 시사합니다. **Instruction-as-Reasoning** 패러다임은 모델이 동적으로 최적의 추론 경로를 선택하도록 유도하여 **정책 붕괴(policy collapse) 문제**를 완화하고, **SFT**와 **RL**을 결합한 훈련 프레임워크가 복잡한 AI 태스크에 효과적임을 보여줍니다. 이는 향후 GUI 기반 **AGI 시스템** 구축에 중요한 방법론적 기반을 제공하며, **GPT-4.1**과 같은 LLM을 활용한 고품질 데이터 생성 및 검증 프로세스의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.