---
title: "[논문리뷰] HI-TransPA: Hearing Impairments Translation Personal Assistant"
excerpt: "arXiv에 게시된 'HI-TransPA: Hearing Impairments Translation Personal Assistant' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Hearing Impairment
  - Audio-Visual Speech Recognition
  - Curriculum Learning
  - Omni-Models
  - Assistive Technology
  - Lip Reading
  - Speech Translation

permalink: /ai/review/2025-11-17-HI-TransPA-Hearing-Impairments-Translation-Personal-Assistant/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.09915)

**저자:** Zhiming Ma, Shiyu Gan, Junhao Zhao, Xianming Li, Qingyun Pan, Peidong Wang, Mingjun Pan, Yuhao Mo, Jiajie Cheng, Chengxin Chen, Zhonglun Cao, Chonghan Liu, Shi Cheng



## 핵심 연구 목표
본 논문은 청각 장애인이 일상적인 의사소통에서 겪는 어려움, 특히 불분명한 발화로 인한 문제를 해결하고자 합니다. 기존 모델들이 비정형적인 발화를 해석하는 데 한계가 있음을 지적하며, 청각 장애인을 위한 **오디오-시각 개인 비서(HI-TransPA)** 를 통해 명확하지 않은 음성과 입술 움직임을 융합하여 번역 및 대화를 지원하는 통합 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
HI-TransPA는 **Qwen2.5-Omni-3B** 프레임워크를 기반으로 하며, 고프레임률 입술 움직임에 최적화된 시각 하위 시스템을 재설계했습니다. 핵심적으로 **멀티모달 전처리 및 큐레이션 파이프라인** 을 통해 입술 영역을 추출하고, 오디오 품질(ASR 신뢰도, SNR) 및 비디오 품질(모션 크기)을 기반으로 **리젝션 샘플링(rejection sampling)** 을 수행하여 데이터를 난이도별로 분할합니다. 이후, 고품질 데이터로 먼저 학습하고 점차 어려운 샘플을 통합하는 **품질 인식 커리큘럼 학습(quality-aware curriculum learning)** 전략을 적용하며, **SigLIP Vision Transformer** 와 **Unified 3D-Resampler** 를 사용하여 입술 움직임을 효율적으로 인코딩합니다.

## 주요 결과
HI-TransPA는 자체 구축된 **HI-Dialogue 데이터셋** 에서 평가되었으며, 특히 **커리큘럼 학습** 을 적용한 모델이 최첨단 성능을 달성했습니다. 이 모델은 **종합 점수(Comprehensive Score, CS) 0.79** , **임베딩 유사도(Embedding Similarity, EmbSim) 0.84** , **문자 오류율(Character Error Rate, CER) 0.27** 을 기록하며, **Qwen2.5-Omni (7B)** 와 같은 범용 옴니 모델(CS 0.67) 및 기존 ASR 모델들을 명확한 차이로 능가했습니다. 이는 미세한 입술 움직임 역학을 포착하는 특화된 시각 아키텍처와 커리큘럼 학습의 중요성을 강조합니다.

## AI 실무자를 위한 시사점
본 연구는 **옴니 모델(Omni-Models)** 이 청각 장애인과 같은 특정 사용자 그룹을 위한 **보조 통신 기술** 에 적용될 수 있는 강력한 기반을 제공합니다. 특히, 실제 세계의 노이즈가 많고 이질적인 데이터에 대응하기 위한 **데이터 품질 관리** 와 **커리큘럼 학습 전략** 의 중요성을 강조합니다. AI 엔지니어는 이러한 접근 방식을 통해 불분명한 입력 신호를 처리하는 **견고한 멀티모달 모델** 을 개발하고, **특정 도메인에 최적화된 아키텍처** 를 설계함으로써 보다 포괄적이고 접근 가능한 AI 솔루션을 구현할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.