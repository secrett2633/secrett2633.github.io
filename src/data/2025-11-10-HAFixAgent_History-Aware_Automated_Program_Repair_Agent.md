---
title: "[논문리뷰] HAFixAgent: History-Aware Automated Program Repair Agent"
excerpt: "Ahmed E. Hassan이 [arXiv]에 게시한 'HAFixAgent: History-Aware Automated Program Repair Agent' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Program Repair
  - AI Agent
  - Large Language Models
  - Repository Mining
  - Historical Context
  - Bug Fixing
  - Defects4J

permalink: /ai/review/2025-11-10-HAFixAgent_History-Aware_Automated_Program_Repair_Agent/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01047)

**저자:** YU SHI, HAO LI, BRAM ADAMS, AHMED E. HASSAN



## 핵심 연구 목표
본 연구는 기존 LLM 기반 프로그램 자동 수정(APR) 시스템이 로컬 코드 스냅샷에만 의존하여 복잡한 다중-hunk 버그 수정 시 **저장소 이력 정보**를 간과하는 문제를 해결하고자 합니다. 특히, Git blame에서 파생된 이력 정보를 에이전트 기반 APR 시스템에 통합하여, 이러한 복잡한 버그 유형에 대한 수정 성능을 확장하고 개선하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **HAFixAgent**는 반복적인 **Reason-Act(ReAct) 루프**를 따르는 최소한의 에이전트 기반 아키텍처를 채택합니다. 이 시스템은 **Git blame**을 통해 얻은 `fn_all`(함수 이름), `fn_pair`(함수 코드 스냅샷), `fl_diff`(파일 레벨 diff)와 같은 **세 가지 이력 휴리스틱**을 LLM의 컨텍스트에 주입합니다. 또한, blame 정보가 없는 버그를 위한 **폴백(fallback) 전략**을 포함하며, `grep`, `sed`, `find` 등 표준 **Bash 도구**를 활용하여 자율적인 코드 탐색, 편집 및 테스트를 수행합니다.

## 주요 결과
사전 연구에서 **Defects4J** 버그의 **71.1%**가 blame 가능한 것으로 나타났으며, **70.7%**는 단일 고유 blame 커밋에 매핑되어 이력 정보의 가용성과 집중도를 확인했습니다. **HAFixAgent**는 **RepairAgent** 대비 **212.3%** 더 많은 버그를 수정(523개 vs 164개)하고, **BIRCH-feedback** 대비 **29.9%** 더 우수한 성능(다중-hunk 버그 175개 vs 133개)을 달성했습니다. 특히, 이력 기반 설정은 비이력 설정으로는 수정할 수 없는 **194개의 고유 버그**를 추가로 수정했으며, 이력 정보 통합이 에이전트 단계 수나 토큰 비용을 유의미하게 증가시키지 않음이 확인되었습니다.

## AI 실무자를 위한 시사점
**HAFixAgent**의 성공은 **버전 관리 이력**이 LLM 기반 APR 에이전트의 핵심적인 컨텍스트 소스로 활용될 수 있음을 보여줍니다. AI/ML 엔지니어는 에이전트 설계 시 **Git blame**과 같은 도구를 통해 과거 변경 사항과 개발자 의도를 파악하는 **역사적 컨텍스트**를 적극적으로 통합해야 합니다. 또한, 다양한 이력 휴리스틱이 상호 보완적이라는 점을 고려하여, **두세 가지 휴리스틱을 조합**하는 전략이 높은 수리율과 비용 효율성을 동시에 달성하는 데 효과적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.