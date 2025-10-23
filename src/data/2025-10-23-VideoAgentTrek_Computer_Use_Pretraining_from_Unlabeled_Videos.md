---
title: "[논문리뷰] VideoAgentTrek: Computer Use Pretraining from Unlabeled Videos"
excerpt: "Xinyuan Wang이 [arXiv]에 게시한 'VideoAgentTrek: Computer Use Pretraining from Unlabeled Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Video Pretraining
  - Inverse Dynamics
  - Action Recognition
  - Computer Use Automation
  - Data Synthesis
  - Multimodal Learning

permalink: /ai/review/2025-10-23-VideoAgentTrek_Computer_Use_Pretraining_from_Unlabeled_Videos/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19488)

**저자:** Xinyuan Wang, Haoyuan Wu, Junli Wang, Yiheng Xu, Dunjie Lu



## 핵심 연구 목표
본 연구는 GUI(Graphical User Interface) 에이전트 훈련에 필요한 대규모의 수동 주석된 상호작용 데이터 확보의 어려움을 해결하고자 합니다. 이를 위해 레이블이 없는 공개 웹 스크린 녹화 비디오로부터 GUI 상호작용 궤적을 자동으로 추출하여, 비용 효율적이고 확장 가능한 훈련 데이터 생성 파이프라인을 구축하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **VIDEOAGENTTREK**이라는 파이프라인을 제안하며, 핵심은 **VIDEO2ACTION**이라는 역동역학 모듈(IDM)입니다. **VIDEO2ACTION**은 먼저 **Qwen2.5-VL-7B-Instruct** 기반의 VLM을 활용하여 비디오 내 GUI 액션 이벤트(클릭, 타이핑 등)를 밀리초 단위의 정확한 시간 경계와 함께 감지합니다. 이어서 감지된 액션 세그먼트로부터 클릭 좌표나 입력 텍스트와 같은 **구조화된 액션 파라미터**를 정밀하게 추출합니다. 이렇게 생성된 궤적은 에이전트의 **지속적인 사전 학습**과 지도 미세 조정에 활용됩니다.

## 주요 결과
**39,000개**의 YouTube 튜토리얼 비디오에서 **1.52백만 개** 이상의 상호작용 단계를 자동으로 추출하는 데 성공했습니다. **OSWorld-Verified 벤치마크**에서 **SFT-only 베이스라인 9.3%** 대비 **15.8%의 태스크 성공률**을 달성하며 **70%의 상대적 개선**을 보였습니다. 또한, **AgentNetBench 벤치마크**에서는 **64.1%**였던 단계 정확도가 **69.3%**로 향상되었으며, 데이터 스케일링이 에이전트 성능 향상에 직접적인 영향을 미침을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 대규모의 레이블 없는 웹 비디오를 활용하여 GUI 에이전트의 훈련 데이터 부족 문제를 해결할 수 있는 **확장 가능하고 비용 효율적인 방법론**을 제시합니다. **SCREENFILTER** 및 **VIDEO2ACTION**과 같은 핵심 도구의 오픈소스 공개는 연구 커뮤니티가 GUI 자동화 연구를 가속화하는 데 기여할 것입니다. AI 실무자들은 이 파이프라인을 통해 복잡하고 긴 Horizon의 GUI 작업에 대한 에이전트 학습에 필요한 **다양한 상호작용 패턴**을 손쉽게 확보할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.