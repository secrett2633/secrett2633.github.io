---
title: "[논문리뷰] Cyber-Zero: Training Cybersecurity Agents without Runtime"
excerpt: "Zijian Wang이 arXiv에 게시한 'Cyber-Zero: Training Cybersecurity Agents without Runtime' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Cybersecurity Agents
  - LLM Training
  - Trajectory Synthesis
  - Runtime-Free Training
  - CTF Challenges
  - LLM Simulation

permalink: /ai/review/2025-8-5-Cyber-Zero-Training-Cybersecurity-Agents-without-Runtime/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.00910)

**저자:** Terry Yue Zhuo, Dingmin Wang, Hantian Ding, Varun Kumar, Zijian Wang



## 핵심 연구 목표
기존 대규모 언어 모델(LLM) 기반 소프트웨어 엔지니어링 에이전트들이 실행 환경을 통해 학습하지만, 사이버 보안 도메인에서는 이러한 실행 환경이 부족하여 고급 훈련 데이터 확보가 어렵습니다. 이 연구는 이러한 제약을 극복하고 **런타임 없이 사이버 보안 LLM 에이전트 훈련을 위한 고품질 에이전트 궤적을 합성하는 프레임워크** 를 개발하는 것을 목표로 합니다. 궁극적으로 독점 모델과 오픈 소스 모델 간의 성능 격차를 해소하고자 합니다.

## 핵심 방법론
**CYBER-ZERO** 는 공개된 CTF(Capture The Flag) 라이트업을 활용하여 **페르소나 기반 LLM 시뮬레이션** 을 통해 고품질 궤적을 합성합니다. 이 프레임워크는 **Player Model** (보안 엔지니어 페르소나, 단계별 추론 및 명령 발행)과 **Bash Terminal Model** (실제 터미널 환경 시뮬레이션, 명령 출력 및 적절한 힌트 제공)이라는 두 가지 특수 LLM을 사용합니다. 생성된 궤적은 **ENIGMA+** 스캐폴드에 맞춰 구성되며, **DeepSeek-V3-0324** 를 활용하여 데이터 다양성을 높였습니다.

## 주요 결과
**CYBER-ZERO** 는 세 가지 주요 CTF 벤치마크(InterCode-CTF, NYU CTF Bench, Cybench)에서 기준 모델 대비 **최대 13.1%의 절대적인 성능 향상** 을 달성했습니다. 특히, 최적 모델인 **CYBER-ZERO-32B** 는 오픈 소스 모델 중 최고 성능을 기록하며 **DeepSeek-V3-0324** 및 **Claude-3.5-Sonnet** 과 같은 독점 시스템과 대등한 역량을 보였습니다. 또한, 합성된 궤적을 통한 미세 조정은 에이전트의 반복 루프에 갇히는 비율을 **3.3%에서 28.7%까지 감소** 시켰습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 실행 환경 없이 고품질 훈련 데이터를 생성함으로써, 최첨단 사이버 보안 에이전트 개발의 **진입 장벽을 크게 낮췄습니다.** 이를 통해 오픈 소스 LLM도 독점 모델에 필적하는 성능을 달성할 수 있음을 입증하며, **향상된 비용 효율성** 으로 실용적인 사이버 보안 애플리케이션 개발을 가속화할 수 있습니다. 하지만 본 기술의 **양날의 검** 특성을 인지하고, 책임감 있는 개발 및 배포를 위해 지속적인 연구 협력이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.