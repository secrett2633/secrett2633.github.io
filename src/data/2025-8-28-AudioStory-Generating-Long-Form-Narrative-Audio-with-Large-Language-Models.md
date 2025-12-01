---
title: "[논문리뷰] AudioStory: Generating Long-Form Narrative Audio with Large Language
  Models"
excerpt: "Yixiao Ge이 [arXiv]에 게시한 'AudioStory: Generating Long-Form Narrative Audio with Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Audio
  - Long-Form Audio Generation
  - Large Language Models
  - Narrative Reasoning
  - Diffusion Models
  - Multimodal AI
  - Progressive Training

permalink: /ai/review/2025-8-28-AudioStory-Generating-Long-Form-Narrative-Audio-with-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20088)

**저자:** Yuxin Guo, Teng Wang, Yuying Ge, Shijie Ma, Yixiao Ge, Wei Zou, Ying Shan



## 핵심 연구 목표
본 논문은 기존 Text-to-Audio (TTA) 모델들이 단편적인 오디오 클립 생성에는 뛰어나지만, **시간적 일관성** 과 **구성적 추론 능력** 이 요구되는 **장문 서술형 오디오(long-form narrative audio) 생성** 에서 겪는 한계를 해결하고자 합니다. **LLM** 을 TTA 시스템과 통합하여 구조화되고 일관성 있는 장문 오디오 서술을 생성하는 통일된 프레임워크인 AudioStory를 제안하는 것이 주된 목표입니다.

## 핵심 방법론
AudioStory는 **LLM 기반 추론** 과 **확산 기반 오디오 생성** 을 결합한 **통합 프레임워크** 를 사용합니다. **LLM** 은 복잡한 서술 쿼리를 시간적으로 정렬된 하위 작업으로 분해하는 **인터리브드 추론 생성** 방식을 채택합니다. LLM과 오디오 생성기 사이의 효과적인 연결을 위해, 오디오의 고수준 의미를 담는 **시맨틱 토큰(semantic tokens)** 과 미묘한 음향 정보를 포착하는 **잔여 토큰(residual tokens)** 으로 구성된 **디커플링 브리징 메커니즘** 을 도입했습니다. 또한, **단계적 엔드-투-엔드 학습 전략** 을 통해 모델의 충실도, 의미 이해, 전역적 일관성을 점진적으로 향상시킵니다.

## 주요 결과
AudioStory는 장문 오디오 생성에서 기존 TTA 및 LLM 기반 모델들을 크게 능가하는 성능을 보였습니다. 특히 **명령어-추종 능력(instruction-following ability)** 에서 **CLAP 점수 0.392** 를 달성하며 LLM 보조 TTA 모델 대비 **17.85%** 우수한 성능을 나타냈습니다. 생성 품질 면에서도 **FD 1.43** , **FAD 3.00** 를 기록하여 우수성을 입증했으며, 일관성 및 응집성 지표에서도 높은 점수를 획득했습니다. **인터리브드 추론** , **디커플링 브리징 토큰** , **엔드-투-엔드 공동 학습** 이 핵심 구성 요소임을 **다양한 어블레이션 연구** 를 통해 확인했습니다.

## AI 실무자를 위한 시사점
AudioStory는 **LLM의 강력한 추론 능력** 과 **확산 모델의 고품질 생성 능력** 을 통합하여, 복잡하고 긴 스토리의 오디오 콘텐츠를 자동 생성하는 새로운 패러다임을 제시합니다. **디커플링 브리징 메커니즘** 과 **단계적 엔드-투-엔드 학습 전략** 은 LLM과 확산 모델 간의 시너지를 극대화하는 효과적인 방법론으로, 향후 다양한 멀티모달 생성 AI 시스템 개발에 활용될 수 있습니다. **AudioStory-10k 벤치마크** 의 공개는 장문 오디오 생성 분야의 연구 발전을 가속화할 중요한 기여이며, **비디오 더빙** 및 **오디오 연속 생성** 과 같은 실제 적용 가능성을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.