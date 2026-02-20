---
title: "[논문리뷰] Training Language Model Agents to Find Vulnerabilities with CTF-Dojo"
excerpt: "Zijian Wang이 arXiv에 게시한 'Training Language Model Agents to Find Vulnerabilities with CTF-Dojo' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Cybersecurity
  - CTF Challenges
  - Vulnerability Detection
  - Execution Environments
  - Docker
  - Automated Training
  - Verifiable Feedback

permalink: /ai/review/2025-8-27-Training-Language-Model-Agents-to-Find-Vulnerabilities-with-CTF-Dojo/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18370)

**저자:** Terry Yue Zhuo, Dingmin Wang, Hantian Ding, Varun Kumar, Zijian Wang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 에이전트를 활용하여 사이버 보안 취약점을 자동으로 탐지하고 악용하는 것을 목표로 합니다. 특히, LLM 에이전트 훈련을 위한 확장 가능하고 검증 가능한 실행 기반 환경이 부족하다는 문제를 해결하고자 **CTF(Capture-The-Flag) 스타일 도전 과제** 를 통해 실용적인 훈련 데이터셋을 구축하는 데 중점을 둡니다.

## 핵심 방법론
LLM 에이전트 훈련을 위해 **CTF-DOJO** 라는 최초의 대규모 실행 환경을 제안합니다. 이는 658개의 CTF 스타일 도전 과제를 **Docker 컨테이너** 에 격리하여 재현 가능성을 보장합니다. **CTF-FORGE** 라는 자동화된 파이프라인은 LLM( **DeepSeek-V3-0324** )을 활용하여 공개 CTF 아티팩트로부터 Docker 기반 런타임 환경을 수분 내에 생성하며, 수동 검증을 통해 **98% 이상의 성공률** 을 달성했습니다. 에이전트는 **486개의 실행 검증된 고품질 궤적** 으로 훈련되었으며, 추론 시 **CTF Writeup 기반 힌트** 와 **런타임 환경 증강** 기법이 적용되었습니다.

## 주요 결과
**CTF-DOJO** 로 훈련된 LLM 기반 에이전트는 **InterCode-CTF, NYU CTF Bench, Cybench** 세 가지 벤치마크에서 강력한 기준선 대비 **최대 11.6%의 절대 성능 향상** 을 보였습니다. 특히, 최고 성능의 **32B 모델** 은 **31.9% Pass@1** 을 달성하여 공개 가중치 모델 중 새로운 SOTA를 수립했으며, **Claude-3.5-Sonnet** 및 **DeepSeek-V3-0324** 와 같은 최첨단 모델에 근접한 성능을 보였습니다. **Writeup 힌트** 는 성공률을 **최대 64%까지** 높이는 데 기여했습니다.

## AI 실무자를 위한 시사점
본 연구는 실행 기반 훈련 신호가 고성능 AI 에이전트 개발에 필수적임을 입증하여, 사이버 보안 영역에서 LLM의 실용적인 적용 가능성을 크게 확장합니다. **CTF-FORGE** 와 같은 자동화된 환경 구축 도구는 고비용의 독점 시스템 없이도 확장 가능하고 재현 가능한 훈련 데이터를 얻는 방법을 제시하여, AI/ML 엔지니어들이 실제와 유사한 환경에서 에이전트를 효과적으로 개발하고 테스트할 수 있도록 돕습니다. 또한, **힌트 기반 훈련** 및 **런타임 다양성** 의 중요성을 강조하여, 보다 견고하고 일반화 가능한 사이버 보안 에이전트 설계의 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.