---
title: "[논문리뷰] AIDev: Studying AI Coding Agents on GitHub"
excerpt: "Ahmed E. Hassan이 [arXiv]에 게시한 'AIDev: Studying AI Coding Agents on GitHub' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Coding Agents
  - GitHub Data
  - Software Engineering
  - Pull Request Analysis
  - Human-AI Collaboration
  - Developer Productivity
  - Large Language Models

permalink: /ai/review/2026-02-17-AIDev-Studying-AI-Coding-Agents-on-GitHub/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09185)

**저자:** Hao Li, Haoxiang Zhang, Ahmed E. Hassan



## 핵심 연구 목표
AI 코딩 에이전트가 실제 소프트웨어 프로젝트에서 어떻게 활용되는지에 대한 포괄적인 데이터셋의 부재를 해결하는 것이 이 연구의 핵심 목표입니다. **AIDev** 라는 대규모 데이터셋을 구축하여 AI 도입, 개발자 생산성, 그리고 인간-AI 협업이라는 새로운 소프트웨어 엔지니어링 시대의 연구를 위한 기반을 마련하고자 합니다.

## 핵심 방법론
본 연구는 실제 GitHub 저장소에서 에이전트가 작성한 풀 리퀘스트(Agentic-PRs)에 중점을 둔 **AIDev** 라는 대규모 데이터셋을 도입합니다. 이 데이터셋은 **OpenAI Codex** , **Devin** , **GitHub Copilot** , **Cursor** , **Claude Code** 등 다섯 가지 에이전트가 작성한 **932,791개** 의 Agentic-PRs를 집계하였으며, 이는 **116,211개** 의 저장소와 **72,189명** 의 개발자에 걸쳐 있습니다. 심층 분석을 위해 **100개 이상의 GitHub 스타** 를 가진 **2,807개** 저장소에서 선별된 **33,596개** 의 Agentic-PRs에 대해서는 검토 댓글, 커밋별 차이, 이벤트 타임라인, 관련 이슈와 같은 풍부한 추가 정보가 포함되었습니다.

## 주요 결과
이 논문의 주요 결과는 **AIDev** 데이터셋의 성공적인 구축 및 공개입니다. 이 데이터셋은 **5개 주요 AI 코딩 에이전트** 에 의해 작성된 **932,791개** 의 Agentic-PRs를 포함하며, **116,211개** 의 저장소와 **72,189명** 의 개발자를 아우르는 전례 없는 규모를 자랑합니다. 특히, **100개 이상의 스타** 를 가진 **2,807개** 의 저장소에서 추출된 **33,596개** 의 Agentic-PRs는 상세한 검토 데이터와 함께 제공되어 질적 분석의 토대가 됩니다.

## AI 실무자를 위한 시사점
**AIDev** 데이터셋은 AI/ML 엔지니어들에게 **AI 코딩 에이전트** 의 실제 운영 방식과 영향을 실증적으로 연구할 수 있는 독보적인 기회를 제공합니다. 이를 통해 에이전트의 **도입 패턴** , **코드 패치 품질** , **검토 역학** , **실패 유형** , 그리고 **보안 위험** 등을 분석하여 보다 효과적이고 신뢰할 수 있는 AI 에이전트 개발에 기여할 수 있습니다. 궁극적으로, 이 데이터셋은 **인간-AI 협업** 및 **개발자 워크플로우** 최적화를 위한 실용적인 지침을 수립하는 데 중요한 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.