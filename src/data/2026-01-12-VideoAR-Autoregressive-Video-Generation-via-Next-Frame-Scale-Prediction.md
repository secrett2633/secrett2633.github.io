---
title: "[논문리뷰] VideoAR: Autoregressive Video Generation via Next-Frame & Scale Prediction"
excerpt: "Yu Sun이 arXiv에 게시한 'VideoAR: Autoregressive Video Generation via Next-Frame & Scale Prediction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Autoregressive Models
  - Next-Frame Prediction
  - Multi-scale Prediction
  - Temporal Consistency
  - Visual Autoregressive
  - Error Propagation

permalink: /ai/review/2026-01-12-VideoAR-Autoregressive-Video-Generation-via-Next-Frame-Scale-Prediction/

toc: true
toc_sticky: true

date: 2026-01-12 00:00:00+0900+0900
last_modified_at: 2026-01-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05966)

**저자:** Longbin Ji, Xiaoxiong Liu, Junyuan Shang, Shuohuan Wang, Yu Sun, Hua Wu, Haifeng Wang



## 핵심 연구 목표
비디오 생성 분야에서 **Diffusion 및 Flow-Matching 모델** 의 높은 계산 비용과 확장성 문제를 해결하는 것을 목표로 합니다. 특히, 기존 Autoregressive (AR) 모델이 가진 공간-시간 모델링 불일치, 긴 시퀀스에서의 오류 전파, 제한된 제어 가능성 문제를 극복하고, 효율적이고 확장 가능하며 시간적으로 일관된 비디오 생성 프레임워크인 **VideoAR** 를 제안합니다.

## 핵심 방법론
**VideoAR** 는 **VAR(Visual Autoregressive) 패러다임** 을 **다중 스케일 다음 프레임 예측** 과 결합하여 비디오 생성에 적용합니다. 공간 및 시간 의존성을 분리하기 위해 **3D 멀티스케일 토크나이저** 를 사용하며, 이는 **2D VAR 인코더-디코더** 에서 전이 학습된 가중치로 초기화됩니다. 장기 일관성 강화를 위해 **Multi-scale Temporal RoPE** , **Cross-Frame Error Correction** (점진적 flip 비율 증가 및 교차 프레임 오류 상속), 그리고 **Random Frame Mask** 전략을 도입하여 오류 전파를 완화합니다. **다단계 사전 훈련 파이프라인** 을 통해 다양한 해상도와 기간에 걸쳐 점진적으로 학습합니다.

## 주요 결과
**UCF-101 데이터셋** 에서 Autoregressive 모델 중 새로운 SOTA를 달성했습니다. **VideoAR-XL 모델** 은 **gFVD 점수** 를 이전 최고 기록인 **PAR-4x의 99.5** 에서 **88.6** 으로 대폭 개선했습니다. 또한, **VideoAR-L 모델** 은 **30단계의 디코딩 과정** 만으로 비디오를 **0.86초** 만에 생성하여 **PAR-4x 대비 13배 이상 빠른 추론 속도** 를 보였습니다. **VBench 점수** 는 **81.74** 를 기록하며, 규모가 훨씬 큰 Diffusion 기반 모델들과 경쟁력 있는 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**VideoAR** 는 계산적으로 효율적이고 확장성이 뛰어난 **Autoregressive 비디오 생성 모델** 로서, 기존 Diffusion 모델의 대안으로 활용될 잠재력을 보여줍니다. 특히, **semantic control** 및 **motion depiction** 능력이 뛰어나 텍스트 프롬프트 기반의 정확하고 일관된 비디오 콘텐츠 생성에 유용하며, 게임, 메타버스 등 고품질 비디오가 필요한 산업에 적용 가능성이 높습니다. 제안된 **오류 전파 완화 기법** 들은 장기 비디오 생성의 안정성을 높여 실무에서 발생하는 일관성 문제를 줄이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.