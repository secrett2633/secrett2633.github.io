---
title: "[논문리뷰] Few Tokens Matter: Entropy Guided Attacks on Vision-Language Models"
excerpt: "arXiv에 게시된 'Few Tokens Matter: Entropy Guided Attacks on Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Adversarial Attacks
  - Entropy-Guided Attacks
  - Token Vulnerability
  - Harmful Content
  - Cross-Model Transferability
  - Autoregressive Generation

permalink: /ai/review/2026-01-09-Few-Tokens-Matter-Entropy-Guided-Attacks-on-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21815)

**저자:** Mengqi He, Jinhong Ni, Xinyu Tian, Shu Zou, Jing Zhang, Xin Shen, Zhaoyuan Yang



## 핵심 연구 목표
본 논문은 Vision-Language Model (VLM)의 autoregressive 생성 과정에서 모든 토큰이 모델 불안정성에 동일하게 기여한다는 기존 가정에 도전합니다. 대신, 소수의 **고엔트로피 토큰** 이 출력 궤적을 불균형적으로 좌우하며 VLM의 취약성을 드러내고, 이러한 토큰에 집중된 공격이 효율적으로 유해한 콘텐츠를 생성할 수 있음을 입증하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **Entropy-Guided Adversarial attacks (EGA)** 는 생성된 캡션에서 상위 **20%** 의 **고엔트로피 토큰** 위치를 식별한 후, **l∞-bounded pixel-space PGD** 또는 **Adam** 과 같은 픽셀 공간 교란을 이 특정 위치에 집중시켜 엔트로피를 최대화합니다. 또한, **HiEnt-Bank** 라는 변형은 사전 계산된 'flip-rate bank'를 사용하여 아키텍처 간의 **공격 전이성** 을 높입니다.

## 주요 결과
EGA는 이미지 캡셔닝에서 **Qwen2.5-VL-7B-Instruct (42.53%)** , **InternVL3.5-4B (37.29%)** , **LLaVA-1.5-7B (47.05%)** 의 높은 유해율을 달성하며, VQA에서도 **24-28%** 의 유해율을 보였습니다. 이는 다른 공격 대비 현저히 높은 수치입니다. 공격 성공률은 **93-95%** 에 달했으며, **CIDEr** 점수 하락으로 의미론적 손상도 입증되었습니다. 또한, 다른 VLM으로의 **전이성(harmful rate 17-26%)** 도 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 VLM의 **구조적 견고성 약점** 을 밝혀냈으며, autoregressive 생성 시 소수의 **고엔트로피 결정 토큰** 이 모델의 출력 궤적과 안전성에 결정적인 영향을 미친다는 것을 시사합니다. 이는 AI 모델 개발 시 **엔트로피 기반의 견고성 메커니즘** 의 필요성을 강조하며, 특히 다양한 아키텍처에서 공격이 전이된다는 점은 VLM의 근본적인 안전 취약성에 대한 깊은 이해와 방어책 개발의 중요성을 의미합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.