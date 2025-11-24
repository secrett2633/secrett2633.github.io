---
title: "[논문리뷰] Black-Box On-Policy Distillation of Large Language Models"
excerpt: "이 [arXiv]에 게시한 'Black-Box On-Policy Distillation of Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Knowledge Distillation (KD)
  - Black-box Distillation
  - Generative Adversarial Networks (GANs)
  - On-policy Learning
  - Reinforcement Learning
  - Minimax Game
  - Model Compression

permalink: /ai/review/2025-11-14-Black-Box-On-Policy-Distillation-of-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-14 00:00:00+0900+0900
last_modified_at: 2025-11-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.10643)

**저자:** Zewen Chi, Tianzhu Ye*, Li Dong*, Xun Wu, Shaohan Huang, Furu Wei



## 핵심 연구 목표
본 논문은 내부 로짓이나 파라미터에 접근할 수 없는 **블랙박스(black-box) 대규모 언어 모델(LLM)**을 대상으로, 학생 모델이 교사 모델의 텍스트 출력만을 학습하는 **온-정책(on-policy) 증류(distillation)** 방법을 개발하는 것을 목표로 합니다. 이는 기존의 블랙박스 증류 방법론인 **Sequence-level Knowledge Distillation (SeqKD)**의 한계를 극복하고, 교사 모델의 성능에 준하는 효율적인 학생 LLM을 생성하는 데 중점을 둡니다.

## 핵심 방법론
저자들은 **생성적 적대 증류(Generative Adversarial Distillation, GAD)** 프레임워크를 제안하며, 학생 LLM을 **생성자(generator)**로, 교사 LLM의 응답과 학생 모델의 응답을 구별하는 모델을 **판별자(discriminator)**로 프레임화합니다. 이들은 **미니맥스 게임(minimax game)** 형태로 학습되며, 판별자는 **온-정책 보상 모델** 역할을 하여 학생 모델에게 안정적이고 적응적인 피드백을 제공합니다. 특히, **정책 경사(policy gradient)** 기법인 **GRPO**를 활용하여 생성자를 최적화하고, 학습 초기의 안정화를 위해 **웜업(warmup) 단계**를 도입합니다.

## 주요 결과
**GAD**로 학습된 **Qwen2.5-14B-Instruct 학생 모델**은 교사인 **GPT-5-Chat**과 **LMSYS-Chat 자동 평가**에서 거의 동등한 성능을 달성하여 **52.1 GPT-4o 점수**를 기록했습니다. 이는 기존 **SeqKD** 및 사전 증류 모델들을 모든 데이터셋과 모델 크기에서 일관되게 능가하는 결과입니다. 특히 **Dolly, SelfInst, Vicuna**와 같은 **분포 외 일반화(out-of-distribution generalization)** 벤치마크에서 **SeqKD**가 미미하거나 음의 성능 개선을 보인 반면, **GAD**는 강력한 성능 향상을 입증했습니다.

## AI 실무자를 위한 시사점
**GAD**는 내부 접근이 불가능한 **폐쇄형 LLM**을 효과적으로 증류할 수 있는 실용적인 방법론을 제공하여, **고비용의 대형 모델 의존성을 줄이고 효율적인 배포**를 가능하게 합니다. **판별자가 적응적인 온-정책 보상 모델**로 작동하여 **보상 해킹(reward hacking)**과 같은 RL 학습의 고질적인 문제를 회피하고 안정적인 학습을 유도합니다. 이 접근 방식은 **강력한 일반화 능력**을 보여주어 다양한 실제 애플리케이션에서 학생 모델의 성능 신뢰도를 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.