---
title: "[논문리뷰] Cyber-Zero: Training Cybersecurity Agents without Runtime"
excerpt: "Zijian Wang이 [arXiv]에 게시한 'Cyber-Zero: Training Cybersecurity Agents without Runtime' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:  - Review
  - Cybersecurity Agents
  - LLM Training
  - Runtime-Free
  - CTF Writeups
  - Persona-Driven Simulation
  - Trajectory Synthesis
  - Offensive Security

permalink: /ai/review/2025-8-5-Cyber-Zero__Training_Cybersecurity_Agents_without_Runtime/

toc: true
toc_sticky: true

date: 2025-08-05 11:12:10+0900
last_modified_at: 2025-08-05 11:12:10+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.00910)

**저자:** Terry Yue Zhuo, Dingmin Wang, Hantian Ding, Varun Kumar, Zijian Wang

**키워드:** `Cybersecurity Agents`, `LLM Training`, `Runtime-Free`, `CTF Writeups`, `Persona-Driven Simulation`, `Trajectory Synthesis`, `Offensive Security`

## 핵심 연구 목표
사이버 보안 도메인에서 **실행 가능한 런타임 환경의 부재**로 인한 고품질 훈련 데이터 부족 문제를 해결하여, LLM 기반 사이버 보안 에이전트 개발을 위한 **런타임 없는(runtime-free)** 프레임워크를 구축하는 것이 목표입니다. 특히, CTF(Capture The Flag) 챌린지 해결 능력을 갖춘 에이전트를 효율적으로 훈련시키고자 합니다.

## 핵심 방법론
`CYBER-ZERO`는 공개된 **CTF Writeups**를 활용하여 가상 환경의 행동을 역설계하고 현실적인 상호작용 시퀀스를 생성합니다. 이 프레임워크는 **페르소나 기반 LLM 시뮬레이션**을 사용하는 **듀얼-LLM 접근 방식**을 채택하여(Player Model과 Bash Terminal), 실제 환경 없이도 장기적인 에이전트 궤적을 합성합니다.

## 주요 결과
`CYBER-ZERO`로 합성된 궤적으로 훈련된 LLM 기반 에이전트는 세 가지 주요 CTF 벤치마크(InterCode-CTF, NYU CTF Bench, Cybench)에서 기존 모델 대비 **최대 13.1%의 성능 향상**을 달성했습니다. 특히, 최적 모델인 **CYBER-ZERO-32B**는 DeepSeek-V3-0324 및 Claude-3.5-Sonnet과 같은 독점 시스템과 필적하는 성능을 보이면서도 **뛰어난 비용 효율성**을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 사이버 보안 분야에서 **고품질 훈련 데이터의 접근성 문제**를 해결하는 혁신적인 방법을 제시합니다. 런타임 없는 훈련 프레임워크는 **최첨단 사이버 보안 에이전트 개발을 민주화**하여, 제한된 자원을 가진 연구자나 기업도 고급 LLM 에이전트를 개발하고 배포할 수 있는 가능성을 열었습니다. 이는 **방어 및 공격 시나리오** 모두에 적용될 수 있어 광범위한 영향을 미칠 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.