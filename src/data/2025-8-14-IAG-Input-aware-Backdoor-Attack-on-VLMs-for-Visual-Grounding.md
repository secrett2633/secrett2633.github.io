---
title: "[논문리뷰] IAG: Input-aware Backdoor Attack on VLMs for Visual Grounding"
excerpt: "Di Zhang이 [arXiv]에 게시한 'IAG: Input-aware Backdoor Attack on VLMs for Visual Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Backdoor Attack
  - Vision-Language Models (VLMs)
  - Visual Grounding
  - Input-aware Trigger
  - Adversarial Attack
  - Security
  - U-Net
  - Open-vocabulary

permalink: /ai/review/2025-8-14-IAG-Input-aware-Backdoor-Attack-on-VLMs-for-Visual-Grounding/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09456)

**저자:** Junxian Li, Beining Xu, Di Zhang



## 핵심 연구 목표
이 연구는 **시각적 그라운딩(Visual Grounding)** 태스크를 수행하는 **Vision-Language Models (VLMs)** 에 대한 새로운 **입력 인지(Input-aware) 백도어 공격(Backdoor Attack)** 시나리오와 방법론인 **IAG** 를 제시합니다. 공격자는 사용자 질의와 관계없이 모델이 특정 **타겟 객체** 를 그라운딩하도록 조작하며, 이는 시스템 오작동, 안전 및 윤리적 위험으로 이어질 수 있는 미개척된 보안 취약점을 탐구하는 것을 목표로 합니다. 특히, **오픈-보캐블러리(open-vocabulary)** 특성과 **클린 샘플에서의 정상 작동 유지** 및 **포이즌 샘플의 은밀성** 이라는 두 가지 주요 난제를 해결하고자 합니다.

## 핵심 방법론
IAG는 두 가지 단계로 구성됩니다: 백도어 훈련과 추론 단계. 핵심은 **입력 인지 적응형 트리거 생성기(input-aware adaptive trigger generator)** 를 사용하여 공격 대상 객체의 텍스트 설명을 원본 이미지에 삽입하는 것입니다. 이를 위해 **텍스트 조건부 U-Net** 을 활용하여 트리거를 생성하며, **재구성 손실(reconstruction loss)** 을 통해 포이즌된 이미지와 원본 이미지 간의 시각적 불일치를 최소화하여 공격의 은밀성을 유지합니다. **LM 손실(language model loss)** 을 사용하여 클린 샘플에서 정상 출력을, 포이즌 샘플에서 공격자 의도대로 동작하도록 학습하며, 훈련 과정은 U-Net과 Victim VLM이 공동으로 최적화됩니다.

## 주요 결과
IAG는 다양한 VLM 및 데이터셋에서 높은 공격 성공률을 보였습니다. 특히, **InternVL-2.5-8B** 모델에 대해 **RefCoco (testA)** 에서 **ASR@0.5** 가 **66.7%** , **RefCoco+ (testA)** 에서 **71.2%** 에 달하는 공격 성공률을 달성했습니다. **LlaVA-1.5-7B** 에서는 **55% 이상** , **Ferret-7B** 에서는 **50%** 에 육박하는 ASR@0.5를 기록하며, 클린 데이터에 대한 정확도 감소는 **1-3%** 로 매우 적었습니다. 이는 IAG가 기존 방어 전략(예: **Spectral Signature, Beatrix, PAR** )에 대해 견고한 회피 능력을 보여주며, 낮은 포이즌 비율( **0.01%** )로도 백도어를 활성화할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 VLM 기반 시스템, 특히 로봇 공학이나 GUI 상호작용과 같은 안전에 민감한 응용 분야에서 **시각적 입력 스트림 조작을 통한 새로운 보안 위협** 을 경고합니다. 실무자들은 **VLM 배포 시 엄격한 보안 검토와 입력 채널 보호** 의 중요성을 인지해야 합니다. 또한, 기존 방어 기법들이 **고정 패턴 트리거** 에 집중되어 있어 **동적이고 문맥을 인지하는 공격 패턴** 에는 취약할 수 있음을 시사하므로, 더욱 **강력하고 적응형 방어 메커니즘** 개발이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.