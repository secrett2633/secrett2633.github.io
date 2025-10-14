---
title: "[논문리뷰] From Hugging Face to GitHub: Tracing License Drift in the Open-Source AI
  Ecosystem"
excerpt: "Ahmed E. Hassan이 [arXiv]에 게시한 'From Hugging Face to GitHub: Tracing License Drift in the Open-Source AI
  Ecosystem' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Open-Source AI
  - License Compliance
  - License Drift
  - AI Supply Chain
  - Hugging Face
  - GitHub
  - LicenseRec
  - Legal Risk

permalink: /ai/review/2025-9-23-From_Hugging_Face_to_GitHub_Tracing_License_Drift_in_the_Open-Source_AI_Ecosystem/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09873)

**저자:** James Jewitt, Hao Li, Bram Adams, Gopi Krishnan Rajbahadur, Ahmed E. Hassan



## 핵심 연구 목표
오픈 소스 AI 생태계 내에서 데이터셋, 모델, 그리고 이를 활용하는 소프트웨어 애플리케이션 전반에 걸쳐 발생하는 라이선스 충돌과 '라이선스 드리프트'의 정도를 정량적으로 파악하는 것입니다. 이러한 시스템적 비준수가 야기하는 법적, 윤리적 위험을 밝히고, 자동화된 라이선스 충돌 감지 및 해결 프레임워크를 개발하여 이러한 문제를 완화하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Hugging Face**의 364,000개 데이터셋과 1.6백만 개 모델, 그리고 **GitHub**의 140,000개 오픈 소스 애플리케이션을 대상으로 라이선스 계보를 추적하는 **종단 간(end-to-end) 감사**를 수행했습니다. **ScanCode** 툴킷으로 라이선스 정보를 추출하고, **AST(Abstract Syntax Tree) 기반 코드 서명 필터링**을 통해 모델의 실제 사용 여부를 확인했습니다. 라이선스들을 9가지 표준화된 범주(예: **Permissive, CopyLeft, ML_LICENSE**)로 분류한 후, **OSADL 매트릭스**와 **ML 특정 라이선스** 조항을 포함하는 **LicenseRec**이라는 AI-인식 호환성 프레임워크를 개발하여 라이선스 충돌을 자동으로 감지하고 해결책을 제안합니다.

## 주요 결과
**모델-애플리케이션 전환 단계**에서 **35.5%**의 전환이 업스트림 모델 라이선스를 위반하며 제한적 조항을 제거하는 시스템적 비준수를 보였습니다. 특히 **ML License → Permissive** 패턴이 **모델-저장소 단계** 충돌의 **84.9%**를 차지했습니다. **LicenseRec** 프레임워크는 **데이터셋-모델 단계** 위반의 **78.0%**와 **모델-애플리케이션 단계** 위반의 **86.4%**를 성공적으로 해결할 수 있음을 입증했습니다. 그러나 **Non-Commercial 라이선스**와 같은 근본적인 비호환성으로 인해 **데이터셋-모델 단계** 위반의 **14.2%**는 자동화된 해결이 불가능했습니다.

## AI 실무자를 위한 시사점
오픈 소스 AI 프로젝트에서 라이선스 준수는 단순한 기술적 문제가 아닌 **심각한 법적 및 윤리적 위험**을 수반하는 거버넌스 과제입니다. AI/ML 엔지니어는 모델이나 데이터셋을 통합할 때, 편리함만을 추구하여 **업스트림 라이선스의 의무**를 무시하지 않도록 **라이선스 드리프트** 현상에 대한 깊은 이해가 필요합니다. **LicenseRec**과 같은 자동화된 도구는 일반적인 라이선스 오류를 줄이는 데 효과적이지만, **Non-Commercial**과 같이 모델 자체에 내재된 근본적인 비호환성은 개발자의 신중한 검토를 통해서만 해결될 수 있으므로 **AI 공급망 전체에 대한 지속적인 실사**가 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.