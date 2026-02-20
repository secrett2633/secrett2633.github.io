---
title: "[논문리뷰] SWE-Lego: Pushing the Limits of Supervised Fine-tuning for Software Issue Resolving"
excerpt: "arXiv에 게시된 'SWE-Lego: Pushing the Limits of Supervised Fine-tuning for Software Issue Resolving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Software Engineering
  - Issue Resolution
  - Supervised Fine-tuning (SFT)
  - Large Language Models (LLMs)
  - Hybrid Dataset
  - Error Masking
  - Curriculum Learning
  - Test-Time Scaling (TTS)
  - Generative Verifiers

permalink: /ai/review/2026-01-06-SWE-Lego-Pushing-the-Limits-of-Supervised-Fine-tuning-for-Software-Issue-Resolving/

toc: true
toc_sticky: true

date: 2026-01-06 00:00:00+0900+0900
last_modified_at: 2026-01-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.01426)

**저자:** Chaofan Tao, Jierun Chen, Yuxin Jiang, Kaiqi Kou, Shaowei Wang, Ruoyu Wang, Xiaohui Li, Sidi Yang, Yiming Du, Jianbo Dai, Zhiming Mao, Xinyu Wang, Lifeng Shang, Haoli Bai



## 핵심 연구 목표
본 논문은 소프트웨어 엔지니어링(SWE) 문제 해결 분야에서 **SFT (Supervised Fine-tuning) 전용 경량 접근 방식** 의 한계를 확장하여 최첨단 성능을 달성하는 것을 목표로 합니다. 복잡한 훈련 패러다임(예: 중간 훈련, 강화 학습) 없이도 SFT만으로 높은 성능을 낼 수 있음을 보여주고자 합니다.

## 핵심 방법론
세 가지 핵심 구성 요소를 제시합니다. 첫째, **SWE-Lego 데이터셋** 은 실제 **GitHub PRs** 와 **LLM Rewrite** , **AST Reformulation** 을 통한 합성 인스턴스를 결합하여 구축되었으며, **Git Hacking 방지** 와 같은 엄격한 궤적 검증을 포함합니다. 둘째, **정교화된 SFT 절차** 는 **Step-level Error Masking** 을 통해 실행 시간 오류와 관련된 토큰을 손실 계산에서 제외하고, **Trajectory-Length-Based Heuristic** 에 기반한 **Difficulty-Based Curriculum Learning** 을 적용합니다. 셋째, **Test-Time Scaling (TTS)** 은 **순차적 스케일링** 과 **병렬 스케일링** 을 균형 있게 활용하며, 특히 **생성형 검증기(Generative Verifier)** 를 통해 최적의 궤적을 선택합니다.

## 주요 결과
**SWE-bench Verified (Hack-free)** 평가에서 **SWE-Lego-Qwen3-8B** 모델은 SFT만으로 **42.2%** 의 해결률을 달성했으며, TTS@16 적용 시 **49.6%** 로 상승했습니다. **SWE-Lego-Qwen3-32B** 모델은 SFT만으로 **52.6%** 를 달성했고, TTS@16 적용 시 **58.8%** 까지 향상되었습니다. Qwen3-32B 모델의 경우, **하이브리드 데이터셋** 이 **+25.6%** , **정교화된 SFT** 가 **+3.8%** , **TTS** 가 **+6.2%** 의 성능 향상에 기여하여 기준 모델의 **23.2%** 를 **58.8%** 로 끌어올렸습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡하고 컴퓨팅 집약적인 훈련 방식 없이도 **잘 설계된 SFT 파이프라인** 이 SWE 문제 해결에서 최고 성능을 달성할 수 있음을 입증합니다. **고품질의 검증된 하이브리드 데이터셋** 구축과 **추론 시 최적화된 Test-Time Scaling (특히 생성형 검증기 활용)** 의 중요성을 강조합니다. 이는 AI 엔지니어가 비용 효율적이면서도 강력한 소프트웨어 엔지니어링 에이전트를 개발하는 데 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.