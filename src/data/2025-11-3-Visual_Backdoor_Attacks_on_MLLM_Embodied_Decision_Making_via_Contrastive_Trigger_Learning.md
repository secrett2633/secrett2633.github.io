---
title: "[논문리뷰] Visual Backdoor Attacks on MLLM Embodied Decision Making via Contrastive
  Trigger Learning"
excerpt: "Hanyang Chen이 [arXiv]에 게시한 'Visual Backdoor Attacks on MLLM Embodied Decision Making via Contrastive
  Trigger Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Backdoor Attacks
  - MLLM Embodied Agents
  - Contrastive Trigger Learning
  - Policy Manipulation
  - Adversarial AI
  - Embodied AI Security
  - Multimodal LLMs

permalink: /ai/review/2025-11-3-Visual_Backdoor_Attacks_on_MLLM_Embodied_Decision_Making_via_Contrastive_Trigger_Learning/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27623)

**저자:** Qiusi Zhan, Hyeonjeong Ha, Rui Yang, Sirui Xu, Hanyang Chen, Liang-Yan Gui, Yu-Xiong Wang, Huan Zhang, Heng Ji, Daniel Kang



## 핵심 연구 목표
본 논문은 **MLLM(Multimodal Large Language Model) 기반 embodied agent**가 시각적 백도어 공격에 취약함을 지적하고, 이 문제를 해결하고자 합니다. 기존 백도어 공격은 시각적 트리거의 높은 가변성으로 인해 신뢰성 있는 활성화와 낮은 오탐률을 보장하기 어려웠으며, 연구는 이러한 **embodied agent의 취약점을 탐구하고 정밀한 백도어 주입 및 제어 프레임워크**를 개발하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **BEAT(Backdoor attacks on MLLM Embodied Decision Making via Contrastive Trigger Learning)**라는 새로운 프레임워크를 제안합니다. 이 프레임워크는 두 단계 학습 스킴을 따르는데, 먼저 **Supervised Fine-tuning (SFT)**을 통해 benign 및 악성 정책을 모두 학습시키고, 이어서 **Contrastive Trigger Learning (CTL)**을 적용하여 트리거 유무에 따른 정책 전환을 선호 학습 문제로 공식화합니다. **CTL**은 트리거가 없는 입력에는 benign 행동을, 트리거가 있는 입력에는 악성 행동을 선호하도록 학습하여 결정 경계를 명확히 강화합니다.

## 주요 결과
**BEAT**는 **VAB-OmniGibson** 및 **EB-ALFRED**와 같은 다양한 embodied agent 벤치마크와 **Qwen2-VL-7B-Instruct**, **InternVL3-8B**, **GPT-4o**와 같은 MLLM에서 평가되었습니다. 이 프레임워크는 최대 **80%의 공격 성공률(ASR)**을 달성하면서, benign task 성능을 성공적으로 유지하거나 심지어 향상시켰습니다. 특히 **CTL**은 제한된 백도어 데이터 환경에서도 백도어 활성화의 **F1 스코어를 최대 39%까지 향상**시켰고, 거의 **0에 가까운 False Triggering Rate(FTR)**를 기록하며 높은 정밀도와 OOD(Out-of-Distribution) 배치에 대한 강건한 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLM 기반 embodied agent**의 심각한 보안 위험성을 밝혀내어, 실제 환경에 배포될 자율 시스템의 **강력한 방어 메커니즘 개발**이 시급함을 강조합니다. **Contrastive Trigger Learning**과 같은 선호 학습 기반 미세 조정 기법은 복잡한 시각적 트리거에 대한 모델의 반응을 정밀하게 제어하여, **adversarial robustness**를 향상시키고 안전성을 보장하는 데 중요한 역할을 할 수 있습니다. 이러한 객체 기반 시각 백도어 공격에 대한 이해는 향후 **AI 시스템의 안전한 설계 및 검증**을 위한 필수적인 지식을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.