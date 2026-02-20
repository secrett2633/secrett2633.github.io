---
title: "[논문리뷰] LLM-Powered Fully Automated Chaos Engineering: Towards Enabling Anyone to Build Resilient Software Systems at Low Cost"
excerpt: "Kengo Tajiri이 arXiv에 게시한 'LLM-Powered Fully Automated Chaos Engineering: Towards Enabling Anyone to Build Resilient Software Systems at Low Cost' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chaos Engineering
  - Large Language Models
  - System Resilience
  - Kubernetes
  - Software Automation
  - AI Agents
  - Fault Injection

permalink: /ai/review/2025-11-19-LLM-Powered-Fully-Automated-Chaos-Engineering-Towards-Enabling-Anyone-to-Build-Resilient-Software-Systems-at-Low-Cost/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07865)

**저자:** Kengo Tajiri, Hiroki Ikeuchi, Daisuke Kikuta



## 핵심 연구 목표
본 논문은 카오스 엔지니어링(CE)의 수동적이고 노동 집약적인 단계(가설 설정, 실험 계획, 시스템 재구성)를 자동화하여, 누구나 저비용으로 탄력적인 소프트웨어 시스템을 구축할 수 있도록 하는 것을 목표로 합니다. 기존 CE 도구들이 실험 실행만 자동화했던 한계를 넘어, 전체 CE 사이클의 완전 자동화를 실현하고자 합니다.

## 핵심 방법론
제안하는 **ChaosEater** 는 **LLM(Large Language Models) 기반** 시스템으로, 체계적인 CE 사이클에 따라 사전 정의된 **에이전트 워크플로우** 를 사용합니다. 각 LLM 에이전트는 역할에 맞춰 CE 프로세스의 세분화된 작업을 수행하며, 특히 **Kubernetes(K8s) 시스템** 을 대상으로 합니다. LLM들은 요구사항 정의, 코드 생성, 테스트, 디버깅 등 **소프트웨어 엔지니어링 태스크** 를 통해 CE 사이클을 완료하며, **Validation as Code(VaC)** 기법을 사용하여 LLM이 단위 테스트 코드를 통해 유효성을 판단하도록 합니다. **Skaffold** 와 **Chaos Mesh** 와 같은 기존 도구들과 통합되어 작동합니다.

## 주요 결과
ChaosEater는 NGINX 및 SockSHOP과 같은 K8s 시스템에서 합리적인 CE 사이클을 **상당히 낮은 비용(건당 $0.2-0.8)** 및 **짧은 시간(11-25분)** 내에 일관성 있게 완료함을 입증했습니다. NGINX의 경우 모든 5회 실행에서, SockSHOP의 경우 4/5회 실행에서 런타임 오류 없이 성공적으로 시스템을 재구성했습니다. 또한, 인간 엔지니어 2명과 LLM 3명이 수행한 정성적 평가에서도 모든 CE 단계가 긍정적인 점수를 받아 **ChaosEater가 타당한 CE 사이클을 성공적으로 수행했음** 을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM을 활용한 **시스템 탄력성 개선 프로세스의 완전 자동화 가능성** 을 성공적으로 입증했습니다. 이는 코드 생성뿐만 아니라 시스템 테스트, 디버깅, 재구성 등 **복잡한 소프트웨어 엔지니어링 태스크** 에서 LLM의 잠재력을 보여주며, AIOps 분야에서 LLM 에이전트가 자율적으로 시스템 안정성을 관리하고 개선할 수 있는 새로운 방향을 제시합니다. 다만, 현재는 K8s 매니페스트 재구성만 지원하고, 단일 CE 사이클 내에서만 취약점 발견이 제한적이라는 점은 향후 개선 과제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.