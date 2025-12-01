---
title: "[Final] PEP 450 - Adding A Statistics Module To The Standard Library"
excerpt: "Python Enhancement Proposal 450: 'Adding A Statistics Module To The Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/450/
toc: true
toc_sticky: true
date: 2025-09-26 22:00:57+0900
last_modified_at: 2025-09-26 22:00:57+0900
published: true
---
> **원문 링크:** [PEP 450 - Adding A Statistics Module To The Standard Library](https://peps.python.org/pep-0450/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 01-Aug-2013


# PEP 450 – 표준 라이브러리에 통계 모듈 추가

*   **작성자:** Steven D'Aprano
*   **상태:** Final
*   **유형:** Standards Track
*   **생성일:** 2013년 8월 1일
*   **Python 버전:** 3.4

## 요약 (Abstract)
이 PEP는 Python 표준 라이브러리에 평균(mean), 중앙값(median), 분산(variance), 표준 편차(standard deviation)와 같은 일반적인 통계 함수를 위한 모듈을 추가할 것을 제안합니다.

## 도입 배경 (Rationale)
제안된 `statistics` 모듈은 Python 표준 라이브러리의 "batteries included" 철학에 기반합니다. Raymond Hettinger를 비롯한 개발자들은 고급 통계 라이브러리와 임시방편적인 코드 사이의 적절한 품질의 통계 라이브러리를 요청했습니다. 평균, 표준 편차와 같은 통계 함수는 중등 학교 학생들에게도 친숙하며, 저렴한 공학용 계산기나 스프레드시트 애플리케이션(예: Microsoft Excel, LibreOffice)에도 이러한 기능이 포함되어 있습니다.

현재 Python에는 가장 간단한 통계 함수조차 표준적인 계산 방법이 없습니다. 통계 함수가 필요한 경우, 주로 NumPy 및/또는 SciPy를 설치하거나 직접 구현(DIY)하는 두 가지 해결책이 있습니다.

### NumPy의 한계
NumPy는 강력한 기능을 제공하지만, 다음과 같은 단점이 있습니다.
*   **과도한 기능:** 많은 용도에 비해 너무 광범위할 수 있으며, 통계 관련 함수는 일부에 불과합니다.
*   **학습 곡선:** 수치 계산 및 컴퓨터 과학 배경이 없는 사용자에게는 다소 어려울 수 있습니다. 예를 들어, `numpy.mean`은 여러 인자를 가집니다.
*   **설치 어려움:** 기업 환경 등에서 서드파티 소프트웨어 설치가 어렵거나 시간이 오래 걸릴 수 있으며, 일반 사용자에게는 패키지 설치 학습이 부담될 수 있습니다.

### DIY (직접 구현)의 위험성
간단해 보이는 통계 함수를 직접 구현하는 것은 수치적 불안정성(numerical instability)이라는 함정을 가지고 있습니다.
*   **분산 계산 오류:** `sum(x **2 for x in data) - (sum(data)** 2)/n`와 같은 "Computational Formula"는 겉보기에는 정확해 보이지만, 큰 숫자가 포함된 데이터에서 심각한 정밀도 손실을 일으킬 수 있습니다. 예를 들어, 모든 데이터 포인트에 상수를 더하면 분산은 변하지 않아야 하지만, 이 공식은 0 또는 심지어 음수 값을 반환할 수 있습니다.
*   **평균 계산 오류:** 내장 `sum()` 함수는 부동 소수점(float) 값의 크기가 크게 다를 때 정밀도를 잃을 수 있습니다. 예를 들어 `mean([1e30, 1, 3, -1e30])`는 1이 아닌 0을 반환하여 100%의 계산 오류를 발생시킵니다. `math.fsum`을 사용하면 더 정확하지만, 불필요하게 모든 인자를 float으로 변환하는 부작용이 있습니다.

정확한 `mean` 및 `variance` 계산은 데이터의 변동성을 올바르게 해석하고, 데이터를 표준화하는 데 필수적입니다.

## 다른 언어/패키지와의 비교 (Comparison To Other Languages/Packages)
제안된 `statistics` 라이브러리는 NumPy/SciPy와 같은 서드파티 라이브러리나 Minitab, SAS, Matlab과 같은 전문 통계 패키지와 경쟁하기 위한 것이 아닙니다. 이는 공학용 계산기와 그래프 계산기 수준의 통계를 목표로 합니다.

대부분의 프로그래밍 언어는 통계 함수에 대한 내장 지원이 거의 없습니다. 일부 예외는 다음과 같습니다.
*   **R:** 통계 작업을 위해 설계된 언어이며 기능이 풍부합니다.
*   **C#:** LINQ 패키지에 평균(average)을 계산하는 확장 메서드가 포함되어 있습니다.
*   **PHP:** 매우 기능이 풍부한 고급 통계 함수 세트를 가지고 있습니다.
*   **Delphi:** Math 라이브러리에 평균, 합계, 분산 등의 표준 통계 함수가 포함되어 있습니다.
*   **GNU Scientific Library (GSL):** 표준 통계 함수, 백분위수(percentiles), 중앙값 등을 포함합니다.

## 모듈의 설계 결정 (Design Decisions Of The Module)
이 모듈은 작게 시작하여 필요에 따라 확장하는 것을 목표로 합니다. 초기 구현에는 `mean`, `variance`, `standard deviation`, `median`, `mode`와 같은 소수의 함수만 포함됩니다.

주요 설계 특징은 다음과 같습니다.
*   **속도보다 정확성:** 느리지만 정확한 함수를 빠르게 만드는 것이 빠르지만 버그 있는 함수를 수정하는 것보다 쉽습니다.
*   **데이터 시퀀스 처리:** 데이터에 대해 두 번의 패스(two-pass)를 허용하여 정확성을 위해 한 번의 패스 알고리즘을 사용하지 않습니다. 함수는 데이터를 리스트 또는 다른 시퀀스로 받을 것으로 예상하며, 이터레이터가 주어지면 내부적으로 리스트로 변환할 수 있습니다.
*   **숫자 데이터 타입 보존:** 가능한 한 숫자 데이터 타입(예: `Decimal` 리스트의 평균은 `Decimal`이어야 함)을 보존해야 합니다. 이것이 불가능할 경우 `float`를 "가장 낮은 공통 데이터 타입(lowest common data type)"으로 처리합니다. 혼합 데이터 세트는 지원이 보장되지 않습니다.
*   **충분한 문서화:** 기본 개념을 이해하지만 어떤 분산(모집단 또는 표본)을 사용해야 할지 모르는 독자를 위해 명확한 설명을 제공합니다.

### API (Application Programming Interface)
초기 버전은 단변량(univariate) 통계 함수를 제공합니다. 일반적인 API는 `function(data, ...) -> result` 형식의 함수 모델을 기반으로 하며, `data`는 필수적인 (대부분) 숫자 데이터의 이터러블(iterable)입니다.

함수는 가능한 한 데이터 값의 타입을 보존해야 합니다. 예를 들어, `Decimal` 리스트의 평균은 `float` 대신 `Decimal`이어야 합니다.

#### 평균, 중앙값, 최빈값 계산 함수 (Calculating mean, median and mode)
*   `mean(data)`: 데이터의 산술 평균을 계산합니다.
*   `median(data)`: 데이터의 중앙값(middle value)을 계산합니다. 값의 개수가 짝수일 때 두 중간 값의 평균을 취합니다.
*   `median_high(data)`: 데이터의 높은 중앙값(high median)을 계산합니다. 값의 개수가 짝수일 때 두 중간 값 중 큰 값을 취합니다.
*   `median_low(data)`: 데이터의 낮은 중앙값(low median)을 계산합니다. 값의 개수가 짝수일 때 두 중간 값 중 작은 값을 취합니다.
*   `median_grouped(data, interval=1)`: 보간법을 사용하여 그룹화된 데이터의 50번째 백분위수를 계산합니다.
*   `mode(data)`: 가장 흔한 데이터 포인트(최빈값)를 반환합니다. `mode`는 `data` 인자가 숫자여야 한다는 규칙의 유일한 예외이며, 문자열과 같은 명목형(nominal) 데이터도 허용합니다.

#### 분산 및 표준 편차 계산 함수 (Calculating variance and standard deviation)
공학용 계산기와 유사하게, `statistics` 모듈은 모집단(population) 및 표본(sample) 분산 및 표준 편차를 위한 별도의 함수를 포함합니다. 네 함수 모두 숫자 데이터의 이터러블인 단일 필수 인자를 가지며, 선택적으로 데이터의 평균을 두 번째 인자로 받을 수 있습니다. 이는 GSL(GNU Scientific Library)의 API를 모델로 합니다.

*   `variance(data, xbar=None)`: 데이터의 표본 분산을 계산하며, 선택적으로 `xbar`를 표본 평균으로 사용합니다.
*   `stdev(data, xbar=None)`: 데이터의 표본 표준 편차를 계산하며, 선택적으로 `xbar`를 표본 평균으로 사용합니다.
*   `pvariance(data, mu=None)`: 데이터의 모집단 분산을 계산하며, 선택적으로 `mu`를 모집단 평균으로 사용합니다.
*   `pstdev(data, mu=None)`: 데이터의 모집단 표준 편차를 계산하며, 선택적으로 `mu`를 모집단 평균으로 사용합니다.

#### 기타 함수 (Other functions)
*   `sum(data, start=0)`: 숫자 데이터의 고정밀 합계(high-precision sum)를 계산합니다.

## 명세 (Specification)
제안된 참조 구현은 순수 Python으로 작성되어 있어, 다른 Python 구현에서도 변경 없이 모듈을 쉽게 사용하거나 필요에 따라 수정할 수 있습니다.

### 모듈 이름 (What Should Be The Name Of The Module?)
모듈 이름은 `statistics`가 됩니다. `math` 패키지의 서브 모듈로 만들자는 논의도 있었지만, 최종적으로는 최상위 모듈로 합의되었습니다. `stats`나 `statslib`와 같은 다른 이름은 혼동의 위험이나 "C-like"하다는 이유로 거부되었습니다.

## 논의 및 해결된 문제 (Discussion And Resolved Issues)
*   **`sum` 함수 추가:** 표준 라이브러리에 또 다른 `sum` 함수를 추가하는 것에 대한 논란이 많았습니다. 기존 내장 `sum()`은 float 정밀도를 잃을 수 있고, `math.fsum`은 고정밀도이지만 모든 인자를 float으로 강제 변환하는 문제가 있기 때문에, `statistics.sum`의 필요성이 인정되었습니다.
*   **이터레이터 처리:** 초기 `variance` 구현은 이터레이터 또는 시퀀스 여부에 따라 1-패스 또는 2-패스 알고리즘 사이에서 자동으로 전환되었습니다. 이는 계산된 분산이 알고리즘에 따라 약간 달라질 수 있다는 설계 오류로 판명되어, 항상 더 정확한 2-패스 구현을 위해 내부적으로 리스트를 생성하도록 변경되었습니다.
*   **중앙값 함수 API:** `median.low`, `median.high`와 같이 `median` 호출 가능 객체의 속성으로 구현하는 논란의 여지가 있는 디자인은, `median_low`, `median_high`와 같은 별도의 함수를 사용하는 더 전통적인 디자인으로 변경되었습니다.
*   **연속 데이터의 최빈값:** 연속 데이터의 표본 최빈값(sample mode)을 계산하는 함수는 알고리즘 선택에 대한 의문과 필요성 때문에 API에서 제외되었습니다. `mode`는 이제 고유 값 계산에 기반한 기본적인 "교과서 알고리즘"만을 구현합니다.
*   **`timedelta` 객체 통계:** `statistics` 모듈은 `timedelta` 객체를 직접 지원하지는 않지만, `timedelta.total_seconds` 메서드를 사용하여 숫자로 변환함으로써 이 사용 사례를 지원할 수 있습니다.

## 자주 묻는 질문 (Frequently Asked Questions)
*   **PyPI 사전 출시 여부:** 이 모듈의 이전 버전은 2010년부터 PyPI에서 제공되었습니다. NumPy보다 훨씬 간단하기 때문에 몇 년간의 외부 개발이 필요하지 않았습니다.
*   **또 다른 `sum` 함수의 필요성:** 내장 `sum`은 float에서 정밀도를 잃을 수 있고, `math.fsum`은 고정밀도이지만 모든 인자를 float으로 강제 변환합니다. 이러한 이유로 `statistics.sum`의 필요성이 제기되었습니다.
*   **이전 Python 버전으로 백포팅 여부:** 이 모듈은 현재 Python 3.3을 대상으로 하며, PyPI를 통해 3.3용으로 제공됩니다. 3.x 시리즈의 이전 버전으로의 백포팅 가능성은 높지만, 2.7로의 백포팅은 가능성이 낮지만 배제하지 않습니다.
*   **NumPy 대체 의도:** 이 모듈은 NumPy를 대체하거나 직접적으로 경쟁하기 위한 것이 아닙니다. NumPy는 전문가를 위한 완전한 기능을 갖춘 수치 라이브러리인 반면, `statistics` 모듈은 "batteries included" 철학에 따라 "NumPy 사용"과 "직접 구현" 사이의 중간 수준을 목표로 합니다.

## 향후 작업 (Future Work)
*   **다변량 통계 함수 (Multivariate statistical functions):** 선형 회귀(linear regression), 상관 계수(correlation coefficient), 공분산(covariance) 등 다변량 통계 함수를 위한 API는 아직 불확실하여 Python 3.5로 연기되었습니다.
*   **확률 및 추론 테스트 함수:** 확률 변수 계산 및 추론 테스트(예: Student's t-test)를 위한 함수도 Python 3.5로 연기되었습니다.
*   **1-패스 함수:** 이터레이터 형태의 데이터에서 리스트로 변환하지 않고 여러 통계를 계산할 수 있는 1-패스 함수에 대한 관심이 있으며, 이 또한 3.5로 연기되었습니다.

---
**참고:** 이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.