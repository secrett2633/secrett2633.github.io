---
title: "[논문리뷰] OS-Symphony: A Holistic Framework for Robust and Generalist Computer-Using Agent"
excerpt: "이 [arXiv]에 게시한 'OS-Symphony: A Holistic Framework for Robust and Generalist Computer-Using Agent' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer-Using Agent (CUA)
  - Multi-Agent Framework
  - Long-horizon Tasks
  - Memory Management
  - Multimodal Retrieval
  - Reflection
  - Generalization

permalink: /ai/review/2026-01-13-OS-Symphony-A-Holistic-Framework-for-Robust-and-Generalist-Computer-Using-Agent/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07779)

**저자:** Bowen Yang, Kaiming Jin, Zhenyu Wu, Zhaoyang Liu, Qiushi Sun, Zehao Li, Jingjing Xie, Zhoumianze Liu, Fangzhi Xu, Kanzhi Cheng, Qingyun Li, Yian Wang, Yu Qiao, Zun Wang, Zichen Ding



## 핵심 연구 목표
이 논문은 **Vision-Language Model (VLM)** 기반 **Computer-Using Agents (CUAs)** 가 긴 작업 흐름에서 **견고성** 을 유지하고 **새로운 도메인으로 일반화** 하는 데 겪는 문제를 해결하는 것을 목표로 합니다. 특히, 과거 시각적 맥락 관리의 부족과 시각 인식 기반 튜토리얼 검색 기능의 부재로 인해 발생하는 한계를 극복하고자 합니다.

## 핵심 방법론
연구는 **Orchestrator** 를 중심으로 **Reflection-Memory Agent (RMA)** 와 **Versatile Tool Agents** 로 구성된 **OS-SYMPHONY** 라는 전체론적 프레임워크를 제안합니다. **RMA** 는 **이정표 기반 장기 기억** 과 구조화된 감사 프로토콜을 활용하여 **작업 경로 수준의 자가 수정** 을 가능하게 하고, **Multimodal Searcher** 는 **See-Act 패러다임** 을 통해 브라우저 샌드박스에서 시각적으로 정렬된 튜토리얼을 합성하여 미지의 시나리오 문제를 해결합니다.

## 주요 결과
**OS-SYMPHONY** 는 **OSWorld 벤치마크** 에서 **65.84%** 의 새로운 최고 성능을 달성했으며, 이는 기존 **Agent S3** 를 약 **3%** p 앞선 결과입니다. 또한, **WindowsAgentArena** 에서 **63.5%** , **MacOSArena** 에서 **46.03%** 를 기록하며 각 플랫폼의 새로운 **SOTA** 를 수립했습니다. **Pass@K 평가** 에서는 **Pass@2** 에서 **74.14%** 로 인간 수준( **72.4%** )을 능가하고, **Pass@5** 에서는 **79.4%** 에 도달하며 뛰어난 잠재력을 입증했습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 복잡한 장기 작업 자동화 및 **OOD (Out-of-Distribution) 일반화** 를 위한 **모듈형 에이전트 아키텍처** 의 중요성을 강조합니다. 특히 **Reflection-Memory Agent** 는 작업 흐름의 견고성을 위한 **구조화된 기억 관리** 와 **자가 수정 메커니즘** 의 필요성을 보여주며, **Multimodal Searcher** 는 시각적 정보를 활용한 **RAG (Retrieval-Augmented Generation)** 의 실용적인 적용 가능성을 제시합니다. 나아가 오픈소스 **VLM** 들을 활용하여 경쟁력 있는 성능을 달성할 수 있음을 입증하며, AI 에이전트 개발의 **민주화** 에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.