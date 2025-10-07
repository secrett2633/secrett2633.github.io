---
title: "[논문리뷰] AdvEvo-MARL: Shaping Internalized Safety through Adversarial
  Co-Evolution in Multi-Agent Reinforcement Learning"
excerpt: "Zeliang Zhang이 [arXiv]에 게시한 'AdvEvo-MARL: Shaping Internalized Safety through Adversarial
  Co-Evolution in Multi-Agent Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Reinforcement Learning
  - Adversarial Co-evolution
  - LLM Safety
  - Jailbreak Attacks
  - Internalized Safety
  - Public Baseline
  - System Robustness

permalink: /ai/review/2025-10-7-AdvEvo-MARL_Shaping_Internalized_Safety_through_Adversarial_Co-Evolution_in_Multi-Agent_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01586)

**저자:** Zhenyu Pan¹, Yiting Zhang², Zhuo Liu³, Yolo Yunlong Tang³, Zeliang Zhang³, Haozheng Luo¹, Yuwei Han², Jianshu Zhang¹, Dennis Wu¹, Hong-Yu Chen¹, Haoran Lu¹, Haoyang Fang, Manling Li¹, Chenliang Xu³, Philip S. Yu², Han Liu¹



## 핵심 연구 목표
LLM 기반 다중 에이전트 시스템(MAS)이 `jailbreak`, `prompt-injection`, `adversarial collaboration`과 같은 공격에 취약한 문제를 해결하는 것을 목표로 합니다. 기존의 `self-verification` 및 `external guard` 방식의 한계를 극복하고, 외부 가드 에이전트 없이 **태스크 에이전트 자체에 안전 의식을 내재화**하여 시스템의 견고성과 유틸리티를 동시에 향상시키고자 합니다.

## 핵심 방법론
본 논문은 `AdvEvo-MARL`이라는 **공동 진화(co-evolutionary) 다중 에이전트 강화 학습(MARL) 프레임워크**를 제안합니다. 이 프레임워크는 **공격자(evolving jailbreak 프롬프트 생성)와 방어자(태스크 수행 및 공격 저항)**를 적대적 학습 환경에서 동시에 최적화합니다. 학습 안정화 및 협력 강화를 위해, 동일한 기능 그룹 내 에이전트들이 **그룹 평균 리턴(mean return)을 공유하는 `public baseline`**을 활용하여 `advantage estimation`을 수행합니다. 초기에는 **공격자 웜업(warm-up) 단계**에서 `supervised fine-tuning (SFT)`으로 사전 지식을 주입하여 학습을 부트스트랩합니다.

## 주요 결과
`AdvEvo-MARL`은 대표적인 공격 시나리오에서 **공격 성공률(ASR)을 20% 미만**으로 일관되게 유지하여, 기존 베이스라인(최대 38.33%) 대비 우수한 견고성을 입증했습니다. 동시에 **태스크 정확도를 최대 +3.67%까지 향상**시키거나 최소한의 성능 저하로 유지했습니다. `public baseline`을 사용한 학습 설정은 `baseline`이 없는 설정보다 **더 안정적이고 효율적인 학습 다이내믹스**를 보여주며, 특히 `chain` 및 `tree` 토폴로지에서 **GPT-4o-mini와 유사하거나 뛰어난 ASR 성능**을 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 MAS의 안전성 문제를 해결하는 데 있어 **외부 방어 메커니즘 없이도 에이전트 내부에 안전 기능을 내재화**할 수 있는 효과적인 경로를 제시합니다. `adversarial co-evolution`과 `public baseline`은 **변화하는 위협에 대한 시스템의 적응력과 일반화된 방어 능력**을 크게 향상시킬 수 있음을 시사합니다. 이는 추가적인 시스템 오버헤드 없이 **안전성과 태스크 유틸리티를 동시에 개선**할 수 있는 실용적인 프레임워크로, 안전하고 유능한 MAS 개발에 중요한 이정표가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.