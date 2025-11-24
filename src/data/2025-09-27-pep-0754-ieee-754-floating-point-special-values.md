---
title: "[Rejected] PEP 754 - IEEE 754 Floating Point Special Values"
excerpt: "Python Enhancement Proposal 754: 'IEEE 754 Floating Point Special Values'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/754/
toc: true
toc_sticky: true
date: 2025-09-27 13:41:12+0900
last_modified_at: 2025-09-27 13:41:12+0900
published: true
---
> **원문 링크:** [PEP 754 - IEEE 754 Floating Point Special Values](https://peps.python.org/pep-0754/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 28-Mar-2003

## PEP 754 – IEEE 754 부동 소수점 특수 값

**상태:** 거부됨 (Rejected)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2003년 3월 28일
**Python 버전:** 2.3
**작성자:** Gregory R. Warnes

### 거부 통지 (Rejection Notice)

이 PEP는 거부되었습니다. 4년 동안 공개 상태로 있었지만, 커뮤니티의 충분한 관심을 얻지 못했습니다.

이 PEP의 몇 가지 아이디어는 Python 2.6에 구현되었습니다. `float('inf')` 및 `repr(float('inf'))`는 이제 IEEE 754 의미론을 지원하는 모든 플랫폼에서 작동이 보장됩니다. 그러나 `eval(repr(float('inf')))` 왕복 (roundtrip)은 `inf`와 `nan`을 직접 정의하지 않는 한 여전히 지원되지 않습니다.

```python
>>> inf = float('inf')
>>> inf, 1E400
(inf, inf)
>>> neginf = float('-inf')
>>> neginf, -1E400
(-inf, -inf)
>>> nan = float('nan')
>>> nan, inf * 0.
(nan, nan)
```
`math` 및 `sys` 모듈 또한 `sys.float_info`, `math.isinf`, `math.isnan`, `math.copysign`과 같은 추가 기능을 얻게 되었습니다.

### 요약 (Abstract)

이 PEP는 IEEE 754 배정밀도 특수 값(양의 무한대, 음의 무한대, Not-a-Number (NaN))을 생성하고 테스트하기 위한 API를 제안하며, 참조 모듈을 제공합니다.

### 배경 (Rationale)

IEEE 754 표준은 부동 소수점 산술을 위한 이진 표현 및 알고리즘 규칙 집합을 정의합니다. 이 표준에는 양의 무한대, 음의 무한대, 그리고 불확정적이거나 비수치적인 결과(NaN)를 포함한 특수 값을 표현하기 위한 상수 집합이 포함되어 있습니다. 대부분의 최신 CPU는 (Ultra)SPARC, PowerPC, x86 프로세서 시리즈를 포함하여 IEEE 754 표준을 구현합니다.

현재 Python에서 IEEE 754 특수 값의 처리는 기본 C 라이브러리에 따라 달라집니다. 불행히도, 이러한 값들이 어떻게 또는 처리되는지에 대해 C 라이브러리 간에 일관성이 거의 없습니다. 예를 들어, 일부 시스템에서는 "float('Inf')"가 양의 무한대에 대한 IEEE 754 상수를 올바르게 반환합니다. 그러나 많은 시스템에서는 이 표현식이 대신 오류 메시지를 생성합니다.

IEEE 754 특수 값의 출력 문자열 표현도 플랫폼마다 다릅니다. 예를 들어, 오버플로우를 발생시킬 만큼 큰 "float(1e3000)" 표현식은 IEEE 754 양의 무한대에 해당하는 문자열 표현을 반환해야 합니다. x86 Debian Linux의 Python 2.1.3에서는 "inf"를 반환합니다. Sparc Solaris 8의 Python 2.2.1에서는 동일한 표현식이 "Infinity"를 반환하고, MS-Windows 2000의 Active Python 2.2.1에서는 "1.#INF"를 반환합니다.

혼란을 더하는 것은, 일부 플랫폼은 부동 소수점으로부터 변환할 때 하나의 문자열을 생성하고 부동 소수점으로 변환할 때는 다른 문자열을 허용한다는 점입니다. 이러한 시스템에서는 "x"가 IEEE 특수 값일 때 `float(str(x))`가 오류를 생성합니다.

과거에는 프로그래머들이 양의 무한대와 Not-a-Number 상수를 얻기 위해 다음과 같은 표현식을 사용하도록 권장했습니다.

```python
PosInf = 1e300**2
NaN = PosInf/PosInf
```

그러나 첫 번째 표현식은 현재 Python 인터프리터에서 오류를 발생시킵니다. 가능한 대안은 다음과 같습니다.

```python
PosInf = 1e300000
NaN = PosInf/PosInf
```

이것은 현재 Python 인터프리터에서 오류를 발생시키지는 않지만, 여전히 보기 흉하고 이식성이 떨어지는 해킹(hack)입니다. 게다가, 이런 방식으로 NaN을 정의하는 것은 그러한 값을 감지하는 문제를 해결하지 못합니다. 첫째, IEEE 754 표준은 Not-a-Number에 대한 전체 상수 값 집합을 제공합니다. 둘째, 이 표준은 NaN을 포함한 모든 가능한 X 값에 대해 `NaN != X`여야 한다고 요구합니다. 결과적으로 `NaN == NaN`은 항상 `false`로 평가되어야 합니다. 그러나 이 동작 또한 일관성 있게 구현되지 않습니다. [예: Cygwin Python 2.2.2]

IEEE 특수 값 처리의 많은 플랫폼 및 라이브러리 불일치로 인해, 비트 패턴을 직접 조작하지 않고는 일반 Python 코드에서 IEEE 754 부동 소수점 값을 일관되게 설정하거나 감지하는 것이 불가능합니다.

이 PEP는 표준 Python API를 제안하고, 지원되는 모든 플랫폼에서 IEEE 754 특수 값을 일관되게 처리할 수 있는 참조 모듈 구현을 제공합니다.

### API 정의 (API Definition)

#### 상수 (Constants)
*   `NaN`: 비신호 IEEE 754 "Not a Number" 값
*   `PosInf`: IEEE 754 양의 무한대 값
*   `NegInf`: IEEE 754 음의 무한대 값

#### 함수 (Functions)
*   `isNaN(value)`: 인수가 IEEE 754 NaN (Not a Number) 값인지 확인합니다.
*   `isPosInf(value)`: 인수가 IEEE 754 양의 무한대 값인지 확인합니다.
*   `isNegInf(value)`: 인수가 IEEE 754 음의 무한대 값인지 확인합니다.
*   `isFinite(value)`: 인수가 유한한 IEEE 754 값(즉, NaN, 양의 무한대 또는 음의 무한대가 아님)인지 확인합니다.
*   `isInf(value)`: 인수가 무한한 IEEE 754 값(양의 또는 음의 무한대)인지 확인합니다.

### 예시 (Example)

(Solaris 8의 Python 2.2.1에서 실행.)

```python
>>> import fpconst
>>> val = 1e30000 # should be cause overflow and result in "Inf"
>>> val
Infinity
>>> fpconst.isInf(val)
1
>>> fpconst.PosInf
Infinity
>>> nval = val/val # should result in NaN
>>> nval
NaN
>>> fpconst.isNaN(nval)
1
>>> fpconst.isNaN(val)
0
```

### 구현 (Implementation)

참조 구현은 "fpconst" 모듈에서 제공되며, "struct" 표준 모듈을 활용하여 IEEE 754 특수 값을 정의하는 비트 패턴을 직접 설정하거나 테스트함으로써 순수 Python으로 작성되었습니다. 빅 엔디안(big-endian) 및 리틀 엔디안(little-endian) 머신 모두에서 올바른 결과를 생성하도록 주의를 기울였습니다. 현재 구현은 순수 Python이지만, 핵심 루틴을 C로 번역하면 일부 효율성을 얻을 수 있습니다.

SourceForge의 패치 1151323 "New fpconst module"은 `fpconst` 모듈을 Python 표준 라이브러리에 추가합니다.

### 참고 자료 (References)

*   IEEE 754 부동 소수점 표준에 대한 참조 자료는 [http://babbage.cs.qc.edu/courses/cs341/IEEE-754references.html](http://babbage.cs.qc.edu/courses/cs341/IEEE-754references.html)를 참조하십시오.
*   참조 패키지에 대한 추가 정보는 [http://research.warnes.net/projects/rzope/fpconst/](http://research.warnes.net/projects/rzope/fpconst/)에서 확인할 수 있습니다.
*   패치 1151323 "New fpconst module": [http://sourceforge.net/tracker/?func=detail&aid=1151323&group_id=5470&atid=305470](http://sourceforge.net/tracker/?func=detail&aid=1151323&group_id=5470&atid=305470)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.