---
title: "[논문리뷰] Preliminary sonification of ENSO using traditional Javanese gamelan scales"
excerpt: "arXiv에 게시된 'Preliminary sonification of ENSO using traditional Javanese gamelan scales' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sonification
  - ENSO
  - Gamelan Scales
  - Complex Systems
  - Phase Space Analysis
  - Recurrence Quantification
  - Parameter Mapping

permalink: /ai/review/2026-02-17-Preliminary-sonification-of-ENSO-using-traditional-Javanese-gamelan-scales/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14560)

**저자:** Sandy H. S. Herho, Rusmawan Suwarman, Nurjanna J. Trilaksono, Iwan P. Anwar, and Faiz R. Fajary



## 핵심 연구 목표
이 연구는 복잡한 동역학 시스템인 엘니뇨-남방 진동(ENSO)의 데이터를 비서구권 음악적 프레임워크(자바 가믈란 음계)를 사용하여 소리화하는 방법을 탐구합니다. 특히, 소리화된 오디오가 원본 데이터의 핵심 동역학적 특성을 얼마나 잘 보존하는지 **복잡계 진단 도구** 를 통해 정량적으로 평가하는 방법론을 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **Niño 3.4 해수면 온도(SST) 이상치 지수(1870-2024)** 를 **매개변수 매핑 소리화(parameter-mapping sonification)** 기법을 사용하여 오디오로 변환했습니다. 두 가지 전통적인 자바 가믈란 오음계인 **펠로그(pelog)** 와 **슬렌드로(slendro)** 를 네 가지 작곡 전략(layered, alternating, melodic, spectral)에 적용하였고, **스펙트럴 센트로이드(밝기)** 와 **RMS 에너지(강도)** 를 추출하여 2차원 **음향 위상 공간** 에서 궤적으로 분석했습니다. 이 궤적들은 **재귀 기반 진단(revisit rate)** , **볼록 껍질 기하학(convex hull geometry)** , 그리고 **커플링 분석(Pearson correlation)** 을 통해 특성화되었습니다.

## 주요 결과
소리화 파이프라인은 입력 ENSO 신호의 강한 지속성( **lag-1 자기상관 0.926** )에 상응하는 음향 특징 궤적의 높은 지속성( **0.958 이상** )을 통해 핵심 동역학적 특징을 보존함을 보였습니다. **Alternating 모드** 는 가장 높은 재방문율( **펠로그 0.240, 슬렌드로 0.230** )을 나타내 ENSO의 준주기성을 반영했으며, **layered 모드** 는 가장 넓은 위상 공간 영역( **최대 0.529 볼록 껍질 면적** )을 탐색했습니다. 특히, 두 음계군은 밝기와 에너지 간에 질적으로 다른 커플링 체제를 유도했는데, **펠로그 모드는 주로 역상 커플링(평균 ρce = -0.558)** 을 보인 반면, **슬렌드로 모드는 약한 커플링(평균 ρce = -0.074)** 을 보였고, **layered 슬렌드로 모드** 는 유일하게 **양의 커플링(+0.317)** 을 나타냈습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡계 데이터를 소리화하는 과정에서 **음악적 스케일** 과 **매핑 알고리즘** 의 상호작용이 **음향 위상 공간** 에서 예상치 못한 ** emergent property** 를 생성할 수 있음을 보여줍니다. 이는 AI/ML 엔지니어가 데이터 소리화 시스템을 설계할 때, 입력 데이터의 특성과 매핑 함수뿐만 아니라 **선택된 음악 시스템의 동역학적 제약** 까지 고려해야 함을 시사합니다. 또한, ENSO의 준주기성과 같은 특정 동적 특성을 강조하려면 **alternating 모드** 를, 다양한 음향 상태를 표현하려면 **layered 모드** 를 사용하는 등, 전달 목표에 따라 **소리화 전략** 을 선택하는 원칙적인 프레임워크를 제공하여 **데이터 탐색 및 해석** 에 새로운 가능성을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.