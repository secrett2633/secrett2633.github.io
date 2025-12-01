---
title: "[Superseded] PEP 386 - Changing the version comparison module in Distutils"
excerpt: "Python Enhancement Proposal 386: 'Changing the version comparison module in Distutils'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/386/
toc: true
toc_sticky: true
date: 2025-09-26 21:07:16+0900
last_modified_at: 2025-09-26 21:07:16+0900
published: true
---
> **원문 링크:** [PEP 386 - Changing the version comparison module in Distutils](https://peps.python.org/pep-0386/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 04-Jun-2009



**Title:** PEP 386 – Changing the version comparison module in Distutils (Distutils의 버전 비교 모듈 변경)
**Author:** Tarek Ziadé <tarek at ziade.org>
**Status:** Superseded (대체됨)
**Type:** Standards Track (표준 트랙)
**Topic:** Packaging (패키징)
**Created:** 2009년 6월 4일
**Superseded-By:** 440 (PEP 440에 의해 대체됨)

---

## Abstract (개요)

**참고:** 이 PEP는 [PEP 440](https://peps.python.org/pep-0440/)에 정의된 버전 식별 및 의존성 지정 체계에 의해 대체되었습니다.

이 PEP는 Distutils에 새로운 버전 비교 스키마 시스템을 제안했습니다.

## Motivation (동기)

Python에서는 프로젝트가 버전을 어떻게 관리하고 증분해야 하는지에 대한 실제적인 제약이 아직 없습니다. Distutils는 버전 배포 메타데이터 필드를 제공하지만, 자유 형식이며 현재 사용자(예: PyPI)는 예상되는 의미론과 관계없이 푸시된 최신 버전을 일반적으로 최신 버전으로 간주합니다.

Distutils는 곧 `Requires-Dist` 메타데이터 필드(PEP 345 참조)를 통해 배포본이 다른 배포본에 대한 의존성을 표현할 수 있도록 기능을 확장할 예정이며, 이 필드를 사용하여 의존성을 호환되는 버전 세트로 제한할 수도 있습니다. 이 필드는 모듈과 패키지에 대한 의존성을 표현했던 `Requires` 필드를 대체합니다.

`Requires-Dist` 필드를 통해 배포본은 다른 패키지에 대한 의존성을 정의하고, 선택적으로 이 의존성을 호환되는 버전 세트로 제한할 수 있으므로 다음과 같이 작성할 수 있습니다.

```
Requires-Dist: zope.interface (>3.5.0)
```

이는 배포본이 3.5.0보다 큰 버전의 `zope.interface`를 필요로 한다는 의미입니다.

또한 이는 Python 프로젝트가 설치 도구와 동일한 규칙을 따라야 버전을 비교할 수 있다는 것을 의미합니다.

그렇기 때문에 이 PEP는 상호 운용성을 위해 버전 정보와 그 비교 의미론을 표현하는 표준 스키마를 제안합니다.

더 나아가, 이는 표준을 준수하는 배포본을 재패키징할 때 OS 패키저의 작업을 더 쉽게 만들 것입니다. 왜냐하면 현재로서는 두 배포본 버전이 어떻게 비교되는지 결정하기 어려울 수 있기 때문입니다.

## Requisites and current status (요구 사항 및 현재 상태)

이 PEP의 범위는 기존의 모든 또는 대부분의 버전 관리 스키마를 지원하기 위한 범용 버전 관리 스키마를 제공하는 것이 아닙니다. 배포판이나 프로젝트 정책에 의해, 또는 우리가 변경할 수 없는 역사적 이유로 인해 항상 경쟁하는 문법이 있을 것입니다.

제안된 스키마는 일반적인 버전 관리 의미론을 표현할 수 있어야 하므로, 모든 대체 버전 관리 스키마를 파싱하여 호환되는 스키마로 변환하는 것이 가능합니다. 이는 OS 패키저가 기존 버전 스키마를 다루는 일반적인 방식이며, 임의의 버전 관리 스키마 세트를 지원하는 것보다 바람직한 대안입니다.

원활한 채택과 고통 없는 전환을 위해 일반적인 관행과 규칙에 대한 준수뿐만 아니라 단순성도 장점입니다. 때로는 실용성이 순수성보다 중요합니다.

프로젝트마다 매우 다른 버전 관리 요구 사항이 있지만, 다음은 중요하게 고려되는 의미론입니다.

*   하나 이상의 버전 수준을 표현할 수 있어야 합니다 (일반적으로 주요(major) 및 부(minor) 개정, 때로는 마이크로(micro) 개정으로 표현됩니다).
*   상당수의 프로젝트는 "프리릴리스(pre-releases)" (예: "alpha", "beta", "rc")에 대한 특별한 의미 버전을 필요로 하며, 이러한 버전에는 널리 사용되는 별칭이 있습니다 ("a"는 "alpha", "b"는 "beta", "c"는 "rc"를 의미합니다). 그리고 이러한 프리릴리스 버전 때문에 버전 문자열 구성 요소의 단순한 알파벳순 정렬을 사용할 수 없습니다. (예: `3.1a1 < 3.1`)
*   일부 프로젝트는 정식 버전의 "포스트릴리스(post-releases)"도 필요로 합니다. 주로 설치 프로그램 작업에 사용되며, 다른 방식으로 명확하게 표현하기 어렵습니다.
*   개발 버전(development versions)은 미출시 작업의 패키저가 나중에 있을 정식 릴리스와의 버전 충돌을 피할 수 있도록 합니다.

버전 번호 관리를 위한 도구를 사용하려는 사람들을 위해 두 가지 주요 도구가 있습니다.

*   현재 Distutils 시스템
*   Setuptools

### Distutils

Distutils는 현재 버전을 관리하는 데 사용할 수 있는 `StrictVersion` 및 `LooseVersion` 클래스를 제공합니다.

`LooseVersion` 클래스는 상당히 유연합니다. Distutils 문서에서 발췌:

> 무정부주의자와 소프트웨어 현실주의자를 위한 버전 번호 매기기. 위에서 설명한 버전 번호 클래스에 대한 표준 인터페이스를 구현합니다. 버전 번호는 마침표 또는 문자열로 구분된 일련의 숫자로 구성됩니다. 버전 번호를 비교할 때 숫자 구성 요소는 숫자적으로 비교되고, 알파벳 구성 요소는 사전적으로 비교됩니다. 다음은 모두 유효한 버전 번호이며 순서는 중요하지 않습니다: `1.5.1`, `1.5.2b2`, `161`, `3.10a`, `8.02`, `3.4j`, `1996.07.12`, `3.2.pl0`, `3.1.1.6`, `2g6`, `11g`, `0.960923`, `2.2beta29`, `1.13++`, `5.5.kw`, `2.0b1pl0`. 사실, 이 스키마에서는 유효하지 않은 버전 번호는 없습니다. 비교 규칙은 간단하고 예측 가능하지만, 항상 원하는 결과를 제공하지 않을 수도 있습니다 ("원하는" 것에 대한 정의에 따라).

이 클래스는 모든 버전 문자열을 유효하게 만들고, 숫자적으로 정렬한 다음 사전적으로 정렬하는 알고리즘을 제공합니다. 이는 프로젝트 버전을 지정하는 데 무엇이든 사용할 수 있다는 의미입니다.

```python
>>> from distutils.version import LooseVersion as V
>>> v1 = V('FunkyVersion')
>>> v2 = V('GroovieVersion')
>>> v1 > v2
False
```

이 문제점은 어떤 중첩 수준이든 표현할 수 있지만, 요구 사항 2, 3, 4에서 표현된 것처럼 버전에 특별한 의미(프리릴리스 및 포스트릴리스, 개발 버전)를 부여할 수 없다는 것입니다.

`StrictVersion` 클래스는 더 엄격합니다. 문서에서 발췌:

> 꼼꼼하고 완고한 소프트웨어 이상주의자를 위한 버전 번호 매기기. 위에서 설명한 버전 번호 클래스에 대한 표준 인터페이스를 구현합니다. 버전 번호는 두 개 또는 세 개의 점(.)으로 구분된 숫자 구성 요소로 구성되며, 끝에 선택적 "프리릴리스" 태그가 붙습니다. 프리릴리스 태그는 'a' 또는 'b' 문자 뒤에 숫자가 오는 형태입니다. 두 버전 번호의 숫자 구성 요소가 같으면, 프리릴리스 태그가 있는 버전은 항상 태그가 없는 버전보다 이전(더 작음)으로 간주됩니다. 다음은 유효한 버전 번호의 예입니다 (제공된 `cmp` 함수에 따라 정렬했을 때 얻을 수 있는 순서로 표시): `0.4`, `0.4.0` (이 둘은 동일), `0.4.1`, `0.5a1`, `0.5b3`, `0.5`, `0.9.6`, `1.0`, `1.0.4a3`, `1.0.4b1`, `1.0.4`. 다음은 유효하지 않은 버전 번호의 예입니다: `1`, `2.7.2.2`, `1.3.a4`, `1.3pl1`, `1.3c4`.

이 클래스는 몇 가지 규칙을 적용하고 버전 번호 작업에 괜찮은 도구를 제공합니다.

```python
>>> from distutils.version import StrictVersion as V
>>> v2 = V('GroovieVersion')
Traceback (most recent call last):
...
ValueError: invalid version number 'GroovieVersion'
>>> v2 = V('1.1')
>>> v3 = V('1.3')
>>> v2 < v3
True
```

이 클래스는 프리릴리스 버전을 추가하고 일부 구조를 제공하지만, 요구 사항 3과 4에서 표현된 것처럼 개발 릴리스 또는 포스트릴리스 태그와 같이 사용할 수 있는 몇 가지 의미론적 요소가 부족합니다.

또한, Distutils 버전 클래스는 수년 동안 존재했지만 커뮤니티에서는 실제로 사용되지 않는다는 점에 유의하십시오.

### Setuptools

Setuptools는 버전에 대한 규칙을 적용하지 않지만, `parse_version` 함수를 사용하여 문자열을 정렬 가능한 키로 변환하기 위한 더 나은 알고리즘을 제공하는 또 다른 버전 비교 도구를 제공합니다.

문서에서 발췌:

> 버전 문자열을 시간 순서대로 정렬 가능한 키로 변환합니다. 이것은 Distutils의 `StrictVersion`과 `LooseVersion`의 대략적인 혼합입니다. `StrictVersion`에서 작동할 버전을 제공하면 동일하게 동작합니다. 그렇지 않으면 약간 더 똑똑한 `LooseVersion`처럼 작동합니다. 이 파서를 속일 수 있는 병적인 버전 코딩 스키마를 만드는 것은 *가능*하지만, 실제로는 매우 드물 것입니다. 반환되는 값은 문자열 튜플이 될 것입니다. 버전의 숫자 부분은 숫자적으로 비교되도록 8자리로 채워지지만, 숫자가 문자열과 비교되는 방식에 의존하지 않습니다. 점(.)은 제거되지만, 대시(-)는 유지됩니다. 알파 세그먼트 또는 대시 사이의 후행 0은 억제되므로, 예를 들어 "2.4.0"은 "2.4"와 동일하게 간주됩니다. 영숫자 부분은 소문자로 변환됩니다. 이 알고리즘은 "-"와 "final" 다음에 알파벳순으로 오는 모든 알파 문자열이 "패치 수준"을 나타낸다고 가정합니다. 따라서 "2.4-1"은 "2.4"의 브랜치 또는 패치로 간주되며, "2.4.1"은 "2.4-1"보다 최신이고, 이는 다시 "2.4"보다 최신입니다. "a", "b", "c", "alpha", "beta", "candidate" 등("final"보다 알파벳순으로 먼저 오는)과 같은 문자열은 프리릴리스 버전으로 간주되므로, "2.4" 버전은 "2.4a1"보다 최신입니다. 마지막으로, 기타 경우를 처리하기 위해 "pre", "preview", "rc" 문자열은 "c"와 동일하게 취급됩니다. 즉, 릴리스 후보로 취급되며, 따라서 이러한 문자열을 포함하지 않는 버전 문자열만큼 최신이 아닙니다. 그리고 "dev"는 '@'로 대체되어 다른 프리릴리스 태그보다 낮은 순서로 정렬됩니다.

다시 말해, `parse_version`은 각 버전 문자열에 대해 `StrictVersion`과 호환되지만 임의의 버전도 수용하여 비교할 수 있도록 처리하는 튜플을 반환합니다.

```python
>>> from pkg_resources import parse_version as V
>>> V('1.2')
('00000001', '00000002', '*final')
>>> V('1.2b2')
('00000001', '00000002', '*b', '00000002', '*final')
>>> V('FunkyVersion')
('*funkyversion', '*final')
```

이 스키마에서는 순수성보다 실용성이 우선하지만, 그 결과 어떤 정책도 강제하지 않아 명확한 표준의 부재로 인해 매우 복잡한 의미론을 야기합니다. 그저 널리 사용되는 관행에 적응하려고 할 뿐입니다.

### Caveats of existing systems (기존 시스템의 문제점)

설명된 버전 비교 도구의 주요 문제는 너무 관대하면서도, 동시에 필요한 일부 의미론을 표현할 수 없다는 것입니다. PyPI에 있는 많은 버전은 분명히 유용하지 않은 버전이며, 이는 사용자가 특정 패키지가 사용하던 버전 관리를 이해하고 PyPI 위에 도구를 제공하는 것을 어렵게 만듭니다.

Distutils 클래스는 Python 프로젝트에서 실제로 사용되지 않지만, Setuptools 함수는 `easy_install`, `pip` 또는 `zc.buildout`과 같은 도구에서 주어진 프로젝트의 의존성을 설치하는 데 사용되기 때문에 꽤 널리 퍼져 있습니다.

Setuptools가 버전을 비교/정렬하는 메커니즘을 제공하지만, 버전 관리 사양이 사람이 어떤 코드에 대해 실행할 필요 없이 합리적으로 정렬을 시도할 수 있도록 하는 것이 훨씬 바람직합니다.

또한 RPM에서 "major" 버전 번호(예: "20090421"과 같은 버전 문자열)에 날짜를 사용하는 문제도 있습니다. 이는 더 일반적인 "major.minor..." 버전 체계로 전환하려는 모든 시도가 "20090421"보다 항상 낮게 정렬되므로 문제가 된다는 것을 의미합니다.

마지막으로, `-`의 의미는 Setuptools에만 특정하며, Debian 또는 Ubuntu에서 사용되는 것과 같은 일부 패키징 시스템에서는 피합니다.

## The new versioning algorithm (새로운 버전 관리 알고리즘)

Pycon에서 Python, Ubuntu 및 Fedora 커뮤니티 구성원들은 모두에게 받아들여질 수 있는 버전 표준에 대해 협력했습니다.

현재 `verlib`이라고 불리며에서 프로토타입이 존재합니다.

지원되는 의사(pseudo) 형식은 다음과 같습니다.

```
N.N[.N]+[{a|b|c|rc}N[.N]+][.postN][.devN]
```

실제 정규 표현식은 다음과 같습니다.

```python
expr = r"""^
    (?P<version>\d+\.\d+)            # minimum 'N.N'
    (?P<extraversion>(?:\.\d+)*)     # any number of extra '.N' segments
    (?:
        (?P<prerel>[abc]|rc)         # 'a' = alpha, 'b' = beta
                                     # 'c' or 'rc' = release candidate
        (?P<prerelversion>\d+(?:\.\d+)*)
    )?
    (?P<postdev>(\.post(?P<post>\d+))?(\.dev(?P<dev>\d+))?)?
$"""
```

몇 가지 예시가 더 명확하게 설명해 줄 것입니다.

```python
>>> from verlib import NormalizedVersion as V
>>> (V('1.0a1')
... < V('1.0a2.dev456')
... < V('1.0a2')
... < V('1.0a2.1.dev456')
... < V('1.0a2.1')
... < V('1.0b1.dev456')
... < V('1.0b2')
... < V('1.0b2.post345')
... < V('1.0c1.dev456')
... < V('1.0c1')
... < V('1.0.dev456')
... < V('1.0')
... < V('1.0.post456.dev34')
... < V('1.0.post456'))
True
```

뒤에 붙는 `.dev123`은 프리릴리스(pre-releases)를 위한 것입니다. `.post123`은 포스트릴리스(post-releases)를 위한 것으로, Twisted와 같은 많은 프로젝트에서 사용되는 것으로 보입니다. 예를 들어, 1.2.0 릴리스 후에 1.2.0-r678 릴리스가 있을 수 있습니다. 우리는 `r` 대신 `post`를 사용했는데, `r`은 프리릴리스인지 포스트릴리스인지 모호하기 때문입니다.

`.post456.dev34`는 포스트 릴리스에 대한 개발 마커를 나타내며, 이는 `.post456` 마커보다 먼저 정렬됩니다. 이것은 포스트 릴리스의 개발 버전을 만드는 데 사용될 수 있습니다.

프리릴리스는 "alpha"를 위해 `a`, "beta"를 위해 `b`, "release candidate"를 위해 `c`를 사용할 수 있습니다. `rc`는 "release candidate"에 대한 대체 표기법으로, Python 자체의 버전 체계와 호환되도록 추가되었습니다. `rc`는 `c` 다음에 정렬됩니다.

```python
>>> from verlib import NormalizedVersion as V
>>> (V('1.0a1')
... < V('1.0a2')
... < V('1.0b3')
... < V('1.0c1')
... < V('1.0rc2')
... < V('1.0'))
True
```

`c`는 서드파티 프로젝트에서 선호되는 마커입니다.

`verlib`은 `NormalizedVersion` 클래스와 `suggest_normalized_version` 함수를 제공합니다.

### NormalizedVersion

`NormalizedVersion` 클래스는 버전을 저장하고 다른 버전과 비교하는 데 사용됩니다. 버전의 표현을 포함하는 문자열을 인수로 받습니다.

```python
>>> from verlib import NormalizedVersion
>>> version = NormalizedVersion('1.0')
```

버전은 문자열로 표현될 수 있습니다.

```python
>>> str(version)
'1.0'
```

또는 다른 버전과 비교될 수 있습니다.

```python
>>> NormalizedVersion('1.0') > NormalizedVersion('0.9')
True
>>> NormalizedVersion('1.0') < NormalizedVersion('1.1')
True
```

버전을 구성하는 부분을 제공하여 인스턴스를 생성하려는 경우 `from_parts`라는 클래스 메서드를 사용할 수 있습니다.

**예시**

```python
>>> version = NormalizedVersion.from_parts((1, 0))
>>> str(version)
'1.0'
>>> version = NormalizedVersion.from_parts((1, 0), ('c', 4))
>>> str(version)
'1.0c4'
>>> version = NormalizedVersion.from_parts((1, 0), ('c', 4), ('dev', 34))
>>> str(version)
'1.0c4.dev34'
```

### suggest_normalized_version

`suggest_normalized_version`은 주어진 버전 문자열에 가까운 정규화된 버전을 제안하는 함수입니다. 정규화되지 않은 버전 문자열(즉, `NormalizedVersion`이 좋아하지 않는)이 있는 경우, 이 함수에서 동등하거나(또는 가까운) 정규화된 버전을 얻을 수 있습니다.

이 함수는 PyPI에서 현재 사용 중인 버전들을 관찰한 내용을 바탕으로 주어진 문자열에 대해 여러 가지 간단한 정규화를 수행합니다.

2010년 1월 6일 기준으로 PyPI에 있는 8821개의 배포본 버전을 덤프했을 때, 이 함수는 다음과 같은 결과를 보여주었습니다.

*   7822개 (88.67%)는 변경 없이 `NormalizedVersion`과 일치합니다.
*   717개 (8.13%)는 이 제안 방법을 사용했을 때 일치합니다.
*   282개 (3.20%)는 전혀 일치하지 않습니다.

`NormalizedVersion`과 호환되지 않고 호환되는 형태로 변환될 수 없는 3.20%의 프로젝트 대부분은 날짜 기반 버전 체계, 사용자 정의 마커가 있는 버전 또는 더미 버전입니다. 예시:

*   `working proof of concept 1 (first draft)`
*   `unreleased.unofficialdev`
*   `0.1.alphadev`
*   `2008-03-29_r219`
*   등.

도구가 버전과 함께 작동해야 할 때, 한 가지 전략은 버전 문자열에 `suggest_normalized_version`을 사용하는 것입니다. 이 함수가 `None`을 반환하면, 제공된 버전이 표준 스키마에 충분히 가깝지 않다는 것을 의미합니다. 원래 버전과 약간 다른 버전을 반환하면, 그것은 제안된 정규화된 버전입니다. 마지막으로, 동일한 문자열을 반환하면, 버전이 스키마와 일치한다는 의미입니다.

다음은 사용 예시입니다.

```python
>>> from verlib import suggest_normalized_version, NormalizedVersion
>>> import warnings
>>> def validate_version(version):
...     rversion = suggest_normalized_version(version)
...     if rversion is None:
...         raise ValueError('Cannot work with "%s"' % version)
...     if rversion != version:
...         warnings.warn('"%s" is not a normalized version.\n'
...                       'It has been transformed into "%s" '
...                       'for interoperability.' % (version, rversion))
...     return NormalizedVersion(rversion)
...
>>> validate_version('2.4-rc1')
__main__:8: UserWarning: "2.4-rc1" is not a normalized version. It has been transformed into "2.4c1" for interoperability.
NormalizedVersion('2.4c1')
>>> validate_version('2.4c1')
NormalizedVersion('2.4c1')
>>> validate_version('foo')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 4, in validate_version
ValueError: Cannot work with "foo"
```

## Roadmap (로드맵)

Distutils는 `NormalizedVersion`을 선호하여 기존 버전 클래스를 폐기(deprecate)할 것입니다. 이 PEP에서 제시된 `verlib` 모듈은 `version`으로 이름이 변경되고 `distutils` 패키지에 배치될 것입니다.

## References (참조)

*   [https://docs.python.org/3.11/distutils/](https://docs.python.org/3.11/distutils/)
*   [https://peak.telecommunity.com/DevCenter/setuptools](https://peak.telecommunity.com/DevCenter/setuptools)
*   [https://peak.telecommunity.com/DevCenter/setuptools#specifying-your-project-s-version](https://peak.telecommunity.com/DevCenter/setuptools#specifying-your-project-s-version)
*   [https://pypi.org/](https://pypi.org/)
*   [https://pypi.org/project/pip/](https://pypi.org/project/pip/)
*   [https://peak.telecommunity.com/DevCenter/EasyInstall](https://peak.telecommunity.com/DevCenter/EasyInstall)
*   [https://pypi.org/project/zc.buildout/](https://pypi.org/project/zc.buildout/)
*   [https://twisted.org/](https://twisted.org/)
*   [https://web.archive.org/web/20090726093825/http://bitbucket.org/tarek/distutilsversion/](https://web.archive.org/web/20090726093825/http://bitbucket.org/tarek/distutilsversion/)

## Acknowledgments (감사의 글)

Trent Mick, Matthias Klose, Phillip Eby, David Lyon, 그리고 Pycon 및 Distutils-SIG의 많은 분들께 감사드립니다.

## Copyright (저작권)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

**원본 출처:** [https://github.com/python/peps/blob/main/peps/pep-0386.rst](https://github.com/python/peps/blob/main/peps/pep-0386.rst)
**최종 수정:** 2024년 12월 15일 20:57:19 GMT

---

**PEP 386 – Distutils의 버전 비교 모듈 변경**

이 문서는 **PEP 386** 에 대한 한국어 번역 및 요약입니다. 이 PEP는 Python 패키징에서 버전 관리의 일관성과 상호 운용성을 개선하기 위해 Distutils에 새로운 버전 비교 시스템을 제안했으나, 이후 **PEP 440** 으로 대체되었습니다.

### 제안 배경

현재 Python 프로젝트의 버전 관리는 엄격한 규칙 없이 자유롭게 이루어지고 있습니다. Distutils는 버전 메타데이터 필드를 제공하지만, 그 형식의 유연성 때문에 PyPI와 같은 시스템에서 최신 버전을 제대로 식별하기 어렵습니다.

**주요 문제점:**
*   **자유로운 형식:** `Distutils`의 `LooseVersion`은 어떤 문자열도 버전으로 허용하여, 유연하지만 특정 버전 의미(프리릴리스, 포스트릴리스 등)를 표현하기 어렵습니다.
*   **제한적인 엄격함:** `StrictVersion`은 프리릴리스를 지원하지만, 개발 버전이나 포스트릴리스 태그와 같은 중요한 요소가 부족합니다. 또한, 이 클래스들은 커뮤니티에서 널리 사용되지 않습니다.
*   **`Setuptools`의 복잡성:** `Setuptools`의 `parse_version` 함수는 유연성을 제공하지만, 명확한 표준이 없어 복잡한 의미론을 야기하며, 사람이 코드를 실행하지 않고는 버전을 직관적으로 비교하기 어렵습니다.
*   **PyPI의 혼란:** PyPI에 있는 많은 버전이 일관성이 없어 사용자에게 혼란을 주고, 버전 기반 도구 개발을 어렵게 만듭니다.
*   **OS 패키징 문제:** RPM에서 날짜 기반 버전 사용 시 일반적인 버전 체계로의 전환이 어렵고, 특정 패키징 시스템에서 `-` 기호의 의미가 모호하다는 문제도 있습니다.

이러한 문제들을 해결하고 Python 생태계 내에서 버전 비교에 대한 표준화된 스키마를 제공하여 상호 운용성을 높이는 것이 이 PEP의 주요 동기였습니다.

### 새로운 버전 관리 알고리즘 (`verlib`)

PEP 386은 Python, Ubuntu, Fedora 커뮤니티의 협력을 통해 새로운 버전 표준을 제안했습니다. 이 표준은 `verlib`이라는 프로토타입으로 개발되었으며, `NormalizedVersion` 클래스와 `suggest_normalized_version` 함수를 포함합니다.

**정규화된 버전 형식:**
제안된 형식은 `N.N[.N]+[{a|b|c|rc}N[.N]+][.postN][.devN]`와 같은 패턴을 따릅니다.

*   `N.N[.N]+`: 주요(major), 부(minor), 마이크로(micro) 버전.
*   `{a|b|c|rc}N[.N]+`: 프리릴리스(pre-releases)를 나타내며, `a`(alpha), `b`(beta), `c`(release candidate), `rc`(release candidate의 대체 표기)가 사용됩니다. `rc`는 `c` 다음에 정렬됩니다.
*   `.postN`: 포스트릴리스(post-releases)를 나타냅니다. 예를 들어, `1.2.0` 릴리스 후의 패치나 빌드에 사용됩니다.
*   `.devN`: 개발 버전(development versions)을 나타냅니다.

**`NormalizedVersion` 클래스:**
이 클래스는 정규화된 버전 문자열을 인수로 받아 버전을 객체로 저장하고 다른 버전과 비교하는 데 사용됩니다. `from_parts` 클래스 메서드를 통해 버전의 구성 요소를 직접 제공하여 인스턴스를 생성할 수도 있습니다.

**`suggest_normalized_version` 함수:**
정규화되지 않은 버전 문자열에 대해 표준에 가까운 정규화된 버전을 제안합니다. PyPI의 기존 버전들을 분석하여 88% 이상이 이 스키마에 부합하거나 변환 가능함을 확인했습니다. 이 함수는 버전이 표준에 맞는지 검증하고, 필요한 경우 정규화된 형태로 변환하여 상호 운용성을 높이는 데 활용될 수 있습니다.

### 로드맵

이 PEP의 로드맵은 `Distutils`가 기존 버전 클래스를 `NormalizedVersion`으로 대체하고, `verlib` 모듈을 `version`으로 이름을 변경하여 `distutils` 패키지 내에 포함시키는 것이었습니다.

### 실제 Python 사용에 미치는 영향

이 PEP는 Python 패키징 생태계에서 버전 관리의 표준화를 위한 중요한 단계였지만, **PEP 440** 으로 대체되었습니다. 그럼에도 불구하고 이 PEP가 제시한 아이디어와 `verlib`의 개념은 이후 Python의 공식적인 버전 식별 및 의존성 지정 체계인 PEP 440의 기반을 다지는 데 기여했습니다. 결과적으로, Python 프로젝트들이 일관된 방식으로 버전을 정의하고, 패키징 도구들이 이를 안정적으로 해석하고 비교할 수 있게 되어 의존성 관리가 훨씬 더 견고해지는 데 영향을 미쳤습니다.

이는 개발자들이 패키지 버전을 이해하고 관리하는 데 드는 노력을 줄이고, 다양한 도구(예: `pip`) 간의 상호 운용성을 개선하는 데 필수적인 기반을 제공했습니다.
The translation is complete, following all the guidelines.## PEP 386 – Distutils의 버전 비교 모듈 변경

이 문서는 **PEP 386** 에 대한 한국어 번역 및 요약입니다. 이 PEP는 Python 패키징에서 버전 관리의 일관성과 상호 운용성을 개선하기 위해 Distutils에 새로운 버전 비교 시스템을 제안했으나, 이후 **PEP 440** 으로 대체되었습니다.

---

**제목:** PEP 386 – Changing the version comparison module in Distutils (Distutils의 버전 비교 모듈 변경)
**작성자:** Tarek Ziadé <tarek at ziade.org>
**상태:** Superseded (대체됨)
**유형:** Standards Track (표준 트랙)
**주제:** Packaging (패키징)
**생성일:** 2009년 6월 4일
**대체됨:** PEP 440에 의해 대체됨

---

### Abstract (개요)

**참고:** 이 PEP는 [PEP 440](https://peps.python.org/pep-0440/)에 정의된 버전 식별 및 의존성 지정 체계에 의해 대체되었습니다.

이 PEP는 Distutils에 새로운 버전 비교 스키마 시스템을 제안했습니다.

### Motivation (동기)

Python에서 프로젝트가 버전을 관리하고 증분해야 하는 방식에 대한 실제적인 제약은 아직 없습니다. Distutils는 버전 배포 메타데이터 필드를 제공하지만 자유 형식이며, PyPI와 같은 현재 사용자들은 예상되는 의미론과 관계없이 푸시된 최신 버전을 일반적으로 최신 버전으로 간주합니다.

Distutils는 곧 `Requires-Dist` 메타데이터 필드(PEP 345 참조)를 통해 배포본이 다른 배포본에 대한 의존성을 표현할 수 있도록 기능을 확장할 예정이며, 이 필드를 사용하여 의존성을 호환되는 버전 세트로 제한할 수도 있습니다. 이 필드는 모듈과 패키지에 대한 의존성을 표현했던 `Requires` 필드를 대체합니다.

`Requires-Dist` 필드를 통해 배포본은 다른 패키지에 대한 의존성을 정의하고, 선택적으로 이 의존성을 호환되는 버전 세트로 제한할 수 있으므로 다음과 같이 작성할 수 있습니다.

```
Requires-Dist: zope.interface (>3.5.0)
```

이는 배포본이 3.5.0보다 큰 버전의 `zope.interface`를 필요로 한다는 의미입니다.

또한 Python 프로젝트는 설치 도구와 동일한 규칙을 따라야 버전을 비교할 수 있다는 것을 의미합니다.

그렇기 때문에 이 PEP는 상호 운용성(interoperability)을 위해 버전 정보와 그 비교 의미론을 표현하는 표준 스키마를 제안합니다.

더 나아가, 이는 표준을 준수하는 배포본을 재패키징할 때 OS 패키저의 작업을 더 쉽게 만들 것입니다. 현재로서는 두 배포본 버전이 어떻게 비교되는지 결정하기 어려울 수 있기 때문입니다.

### Requisites and current status (요구 사항 및 현재 상태)

이 PEP의 범위는 기존의 모든 또는 대부분의 버전 관리 스키마를 지원하기 위한 범용 버전 관리 스키마를 제공하는 것이 아닙니다. 배포판이나 프로젝트 정책에 의해, 또는 우리가 변경할 수 없는 역사적 이유로 인해 항상 경쟁하는 문법이 있을 것입니다.

제안된 스키마는 일반적인 버전 관리 의미론을 표현할 수 있어야 하므로, 모든 대체 버전 관리 스키마를 파싱하여 호환되는 스키마로 변환하는 것이 가능합니다. 이는 OS 패키저가 기존 버전 스키마를 다루는 일반적인 방식이며, 임의의 버전 관리 스키마 세트를 지원하는 것보다 바람직한 대안입니다.

원활한 채택과 고통 없는 전환을 위해 일반적인 관행과 규칙에 대한 준수뿐만 아니라 단순성도 장점입니다. 때로는 실용성이 순수성보다 중요합니다.

프로젝트마다 매우 다른 버전 관리 요구 사항이 있지만, 다음은 중요하게 고려되는 의미론입니다.

*   하나 이상의 버전 수준을 표현할 수 있어야 합니다 (일반적으로 주요(major) 및 부(minor) 개정, 때로는 마이크로(micro) 개정으로 표현됩니다).
*   상당수의 프로젝트는 "프리릴리스(pre-releases)" (예: "alpha", "beta", "rc")에 대한 특별한 의미 버전을 필요로 하며, 이러한 버전에는 널리 사용되는 별칭이 있습니다 ("a"는 "alpha", "b"는 "beta", "c"는 "rc"를 의미합니다). 그리고 이러한 프리릴리스 버전 때문에 버전 문자열 구성 요소의 단순한 알파벳순 정렬을 사용할 수 없습니다. (예: `3.1a1 < 3.1`)
*   일부 프로젝트는 정식 버전의 "포스트릴리스(post-releases)"도 필요로 합니다. 주로 설치 프로그램 작업에 사용되며, 다른 방식으로 명확하게 표현하기 어렵습니다.
*   개발 버전(development versions)은 미출시 작업의 패키저가 나중에 있을 정식 릴리스와의 버전 충돌을 피할 수 있도록 합니다.

버전 번호 관리를 위한 도구를 사용하려는 사람들을 위해 두 가지 주요 도구가 있습니다.

*   현재 Distutils 시스템
*   Setuptools

#### Distutils

Distutils는 현재 버전을 관리하는 데 사용할 수 있는 `StrictVersion` 및 `LooseVersion` 클래스를 제공합니다.

`LooseVersion` 클래스는 상당히 유연합니다. Distutils 문서에서 발췌:

> 무정부주의자와 소프트웨어 현실주의자를 위한 버전 번호 매기기. 위에서 설명한 버전 번호 클래스에 대한 표준 인터페이스를 구현합니다. 버전 번호는 마침표 또는 문자열로 구분된 일련의 숫자로 구성됩니다. 버전 번호를 비교할 때 숫자 구성 요소는 숫자적으로 비교되고, 알파벳 구성 요소는 사전적으로 비교됩니다. 다음은 모두 유효한 버전 번호이며 순서는 중요하지 않습니다: `1.5.1`, `1.5.2b2`, `161`, `3.10a`, `8.02`, `3.4j`, `1996.07.12`, `3.2.pl0`, `3.1.1.6`, `2g6`, `11g`, `0.960923`, `2.2beta29`, `1.13++`, `5.5.kw`, `2.0b1pl0`. 사실, 이 스키마에서는 유효하지 않은 버전 번호는 없습니다. 비교 규칙은 간단하고 예측 가능하지만, 항상 원하는 결과를 제공하지 않을 수도 있습니다 ("원하는" 것에 대한 정의에 따라).

이 클래스는 모든 버전 문자열을 유효하게 만들고, 숫자적으로 정렬한 다음 사전적으로 정렬하는 알고리즘을 제공합니다. 이는 프로젝트 버전을 지정하는 데 무엇이든 사용할 수 있다는 의미입니다.

```python
>>> from distutils.version import LooseVersion as V
>>> v1 = V('FunkyVersion')
>>> v2 = V('GroovieVersion')
>>> v1 > v2
False
```

이 문제점은 어떤 중첩 수준이든 표현할 수 있지만, 요구 사항 2, 3, 4에서 표현된 것처럼 버전에 특별한 의미(프리릴리스 및 포스트릴리스, 개발 버전)를 부여할 수 없다는 것입니다.

`StrictVersion` 클래스는 더 엄격합니다. 문서에서 발췌:

> 꼼꼼하고 완고한 소프트웨어 이상주의자를 위한 버전 번호 매기기. 위에서 설명한 버전 번호 클래스에 대한 표준 인터페이스를 구현합니다. 버전 번호는 두 개 또는 세 개의 점(.)으로 구분된 숫자 구성 요소로 구성되며, 끝에 선택적 "프리릴리스" 태그가 붙습니다. 프리릴리스 태그는 'a' 또는 'b' 문자 뒤에 숫자가 오는 형태입니다. 두 버전 번호의 숫자 구성 요소가 같으면, 프리릴리스 태그가 있는 버전은 항상 태그가 없는 버전보다 이전(더 작음)으로 간주됩니다. 다음은 유효한 버전 번호의 예입니다 (제공된 `cmp` 함수에 따라 정렬했을 때 얻을 수 있는 순서로 표시): `0.4`, `0.4.0` (이 둘은 동일), `0.4.1`, `0.5a1`, `0.5b3`, `0.5`, `0.9.6`, `1.0`, `1.0.4a3`, `1.0.4b1`, `1.0.4`. 다음은 유효하지 않은 버전 번호의 예입니다: `1`, `2.7.2.2`, `1.3.a4`, `1.3pl1`, `1.3c4`.

이 클래스는 몇 가지 규칙을 적용하고 버전 번호 작업에 괜찮은 도구를 제공합니다.

```python
>>> from distutils.version import StrictVersion as V
>>> v2 = V('GroovieVersion')
Traceback (most recent call last):
...
ValueError: invalid version number 'GroovieVersion'
>>> v2 = V('1.1')
>>> v3 = V('1.3')
>>> v2 < v3
True
```

이 클래스는 프리릴리스 버전을 추가하고 일부 구조를 제공하지만, 요구 사항 3과 4에서 표현된 것처럼 개발 릴리스 또는 포스트릴리스 태그와 같이 사용할 수 있는 몇 가지 의미론적 요소가 부족합니다.

또한, Distutils 버전 클래스는 수년 동안 존재했지만 커뮤니티에서는 실제로 사용되지 않는다는 점에 유의하십시오.

#### Setuptools

Setuptools는 버전에 대한 규칙을 적용하지 않지만, `parse_version` 함수를 사용하여 문자열을 정렬 가능한 키로 변환하기 위한 더 나은 알고리즘을 제공하는 또 다른 버전 비교 도구를 제공합니다.

문서에서 발췌:

> 버전 문자열을 시간 순서대로 정렬 가능한 키로 변환합니다. 이것은 Distutils의 `StrictVersion`과 `LooseVersion`의 대략적인 혼합입니다. `StrictVersion`에서 작동할 버전을 제공하면 동일하게 동작합니다. 그렇지 않으면 약간 더 똑똑한 `LooseVersion`처럼 작동합니다. 이 파서를 속일 수 있는 병적인 버전 코딩 스키마를 만드는 것은 *가능*하지만, 실제로는 매우 드물 것입니다. 반환되는 값은 문자열 튜플이 될 것입니다. 버전의 숫자 부분은 숫자적으로 비교되도록 8자리로 채워지지만, 숫자가 문자열과 비교되는 방식에 의존하지 않습니다. 점(.)은 제거되지만, 대시(-)는 유지됩니다. 알파 세그먼트 또는 대시 사이의 후행 0은 억제되므로, 예를 들어 "2.4.0"은 "2.4"와 동일하게 간주됩니다. 영숫자 부분은 소문자로 변환됩니다. 이 알고리즘은 "-"와 "final" 다음에 알파벳순으로 오는 모든 알파 문자열이 "패치 수준"을 나타낸다고 가정합니다. 따라서 "2.4-1"은 "2.4"의 브랜치 또는 패치로 간주되며, "2.4.1"은 "2.4-1"보다 최신이고, 이는 다시 "2.4"보다 최신입니다. "a", "b", "c", "alpha", "beta", "candidate" 등("final"보다 알파벳순으로 먼저 오는)과 같은 문자열은 프리릴리스 버전으로 간주되므로, "2.4" 버전은 "2.4a1"보다 최신입니다. 마지막으로, 기타 경우를 처리하기 위해 "pre", "preview", "rc" 문자열은 "c"와 동일하게 취급됩니다. 즉, 릴리스 후보로 취급되며, 따라서 이러한 문자열을 포함하지 않는 버전 문자열만큼 최신이 아닙니다. 그리고 "dev"는 '@'로 대체되어 다른 프리릴리스 태그보다 낮은 순서로 정렬됩니다.

다시 말해, `parse_version`은 각 버전 문자열에 대해 `StrictVersion`과 호환되지만 임의의 버전도 수용하여 비교할 수 있도록 처리하는 튜플을 반환합니다.

```python
>>> from pkg_resources import parse_version as V
>>> V('1.2')
('00000001', '00000002', '*final')
>>> V('1.2b2')
('00000001', '00000002', '*b', '00000002', '*final')
>>> V('FunkyVersion')
('*funkyversion', '*final')
```

이 스키마에서는 순수성보다 실용성이 우선하지만, 그 결과 어떤 정책도 강제하지 않아 명확한 표준의 부재로 인해 매우 복잡한 의미론을 야기합니다. 그저 널리 사용되는 관행에 적응하려고 할 뿐입니다.

#### Caveats of existing systems (기존 시스템의 문제점)

설명된 버전 비교 도구의 주요 문제는 너무 관대하면서도, 동시에 필요한 일부 의미론을 표현할 수 없다는 것입니다. PyPI에 있는 많은 버전은 분명히 유용하지 않은 버전이며, 이는 사용자가 특정 패키지가 사용하던 버전 관리를 이해하고 PyPI 위에 도구를 제공하는 것을 어렵게 만듭니다.

Distutils 클래스는 Python 프로젝트에서 실제로 사용되지 않지만, Setuptools 함수는 `easy_install`, `pip` 또는 `zc.buildout`과 같은 도구에서 주어진 프로젝트의 의존성을 설치하는 데 사용되기 때문에 꽤 널리 퍼져 있습니다.

Setuptools가 버전을 비교/정렬하는 메커니즘을 제공하지만, 버전 관리 사양이 사람이 어떤 코드에 대해 실행할 필요 없이 합리적으로 정렬을 시도할 수 있도록 하는 것이 훨씬 바람직합니다.

또한 RPM에서 "major" 버전 번호(예: "20090421"과 같은 버전 문자열)에 날짜를 사용하는 문제도 있습니다. 이는 더 일반적인 "major.minor..." 버전 체계로 전환하려는 모든 시도가 "20090421"보다 항상 낮게 정렬되므로 문제가 된다는 것을 의미합니다.

마지막으로, `-`의 의미는 Setuptools에만 특정하며, Debian 또는 Ubuntu에서 사용되는 것과 같은 일부 패키징 시스템에서는 피합니다.

### The new versioning algorithm (새로운 버전 관리 알고리즘)

Pycon에서 Python, Ubuntu 및 Fedora 커뮤니티 구성원들은 모두에게 받아들여질 수 있는 버전 표준에 대해 협력했습니다.

현재 `verlib`이라고 불리며에서 프로토타입이 존재합니다.

지원되는 의사(pseudo) 형식은 다음과 같습니다.

```
N.N[.N]+[{a|b|c|rc}N[.N]+][.postN][.devN]
```

실제 정규 표현식은 다음과 같습니다.

```python
expr = r"""^
    (?P<version>\d+\.\d+)            # minimum 'N.N'
    (?P<extraversion>(?:\.\d+)*)     # any number of extra '.N' segments
    (?:
        (?P<prerel>[abc]|rc)         # 'a' = alpha, 'b' = beta
                                     # 'c' or 'rc' = release candidate
        (?P<prerelversion>\d+(?:\.\d+)*)
    )?
    (?P<postdev>(\.post(?P<post>\d+))?(\.dev(?P<dev>\d+))?)?
$"""
```

몇 가지 예시가 더 명확하게 설명해 줄 것입니다.

```python
>>> from verlib import NormalizedVersion as V
>>> (V('1.0a1')
... < V('1.0a2.dev456')
... < V('1.0a2')
... < V('1.0a2.1.dev456')
... < V('1.0a2.1')
... < V('1.0b1.dev456')
... < V('1.0b2')
... < V('1.0b2.post345')
... < V('1.0c1.dev456')
... < V('1.0c1')
... < V('1.0.dev456')
... < V('1.0')
... < V('1.0.post456.dev34')
... < V('1.0.post456'))
True
```

뒤에 붙는 `.dev123`은 프리릴리스(pre-releases)를 위한 것입니다. `.post123`은 포스트릴리스(post-releases)를 위한 것으로, Twisted와 같은 많은 프로젝트에서 사용되는 것으로 보입니다. 예를 들어, 1.2.0 릴리스 후에 1.2.0-r678 릴리스가 있을 수 있습니다. 우리는 `r` 대신 `post`를 사용했는데, `r`은 프리릴리스인지 포스트릴리스인지 모호하기 때문입니다.

`.post456.dev34`는 포스트 릴리스에 대한 개발 마커를 나타내며, 이는 `.post456` 마커보다 먼저 정렬됩니다. 이것은 포스트 릴리스의 개발 버전을 만드는 데 사용될 수 있습니다.

프리릴리스는 "alpha"를 위해 `a`, "beta"를 위해 `b`, "release candidate"를 위해 `c`를 사용할 수 있습니다. `rc`는 "release candidate"에 대한 대체 표기법으로, Python 자체의 버전 체계와 호환되도록 추가되었습니다. `rc`는 `c` 다음에 정렬됩니다.

```python
>>> from verlib import NormalizedVersion as V
>>> (V('1.0a1')
... < V('1.0a2')
... < V('1.0b3')
... < V('1.0c1')
... < V('1.0rc2')
... < V('1.0'))
True
```

`c`는 서드파티 프로젝트에서 선호되는 마커입니다.

`verlib`은 `NormalizedVersion` 클래스와 `suggest_normalized_version` 함수를 제공합니다.

#### NormalizedVersion

`NormalizedVersion` 클래스는 버전을 저장하고 다른 버전과 비교하는 데 사용됩니다. 버전의 표현을 포함하는 문자열을 인수로 받습니다.

```python
>>> from verlib import NormalizedVersion
>>> version = NormalizedVersion('1.0')
```

버전은 문자열로 표현될 수 있습니다.

```python
>>> str(version)
'1.0'
```

또는 다른 버전과 비교될 수 있습니다.

```python
>>> NormalizedVersion('1.0') > NormalizedVersion('0.9')
True
>>> NormalizedVersion('1.0') < NormalizedVersion('1.1')
True
```

버전을 구성하는 부분을 제공하여 인스턴스를 생성하려는 경우 `from_parts`라는 클래스 메서드를 사용할 수 있습니다.

**예시**

```python
>>> version = NormalizedVersion.from_parts((1, 0))
>>> str(version)
'1.0'
>>> version = NormalizedVersion.from_parts((1, 0), ('c', 4))
>>> str(version)
'1.0c4'
>>> version = NormalizedVersion.from_parts((1, 0), ('c', 4), ('dev', 34))
>>> str(version)
'1.0c4.dev34'
```

#### suggest_normalized_version

`suggest_normalized_version`은 주어진 버전 문자열에 가까운 정규화된 버전을 제안하는 함수입니다. 정규화되지 않은 버전 문자열(즉, `NormalizedVersion`이 좋아하지 않는)이 있는 경우, 이 함수에서 동등하거나(또는 가까운) 정규화된 버전을 얻을 수 있습니다.

이 함수는 PyPI에서 현재 사용 중인 버전들을 관찰한 내용을 바탕으로 주어진 문자열에 대해 여러 가지 간단한 정규화를 수행합니다.

2010년 1월 6일 기준으로 PyPI에 있는 8821개의 배포본 버전을 덤프했을 때, 이 함수는 다음과 같은 결과를 보여주었습니다.

*   7822개 (88.67%)는 변경 없이 `NormalizedVersion`과 일치합니다.
*   717개 (8.13%)는 이 제안 방법을 사용했을 때 일치합니다.
*   282개 (3.20%)는 전혀 일치하지 않습니다.

`NormalizedVersion`과 호환되지 않고 호환되는 형태로 변환될 수 없는 3.20%의 프로젝트 대부분은 날짜 기반 버전 체계, 사용자 정의 마커가 있는 버전 또는 더미 버전입니다. 예시:

*   `working proof of concept 1 (first draft)`
*   `unreleased.unofficialdev`
*   `0.1.alphadev`
*   `2008-03-29_r219`
*   등.

도구가 버전과 함께 작동해야 할 때, 한 가지 전략은 버전 문자열에 `suggest_normalized_version`을 사용하는 것입니다. 이 함수가 `None`을 반환하면, 제공된 버전이 표준 스키마에 충분히 가깝지 않다는 것을 의미합니다. 원래 버전과 약간 다른 버전을 반환하면, 그것은 제안된 정규화된 버전입니다. 마지막으로, 동일한 문자열을 반환하면, 버전이 스키마와 일치한다는 의미입니다.

다음은 사용 예시입니다.

```python
>>> from verlib import suggest_normalized_version, NormalizedVersion
>>> import warnings
>>> def validate_version(version):
...     rversion = suggest_normalized_version(version)
...     if rversion is None:
...         raise ValueError('Cannot work with "%s"' % version)
...     if rversion != version:
...         warnings.warn('"%s" is not a normalized version.\n'
...                       'It has been transformed into "%s" '
...                       'for interoperability.' % (version, rversion))
...     return NormalizedVersion(rversion)
...
>>> validate_version('2.4-rc1')
__main__:8: UserWarning: "2.4-rc1" is not a normalized version. It has been transformed into "2.4c1" for interoperability.
NormalizedVersion('2.4c1')
>>> validate_version('2.4c1')
NormalizedVersion('2.4c1')
>>> validate_version('foo')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 4, in validate_version
ValueError: Cannot work with "foo"
```

### Roadmap (로드맵)

Distutils는 `NormalizedVersion`을 선호하여 기존 버전 클래스를 폐기(deprecate)할 것입니다. 이 PEP에서 제시된 `verlib` 모듈은 `version`으로 이름이 변경되고 `distutils` 패키지에 배치될 것입니다.

### References (참조)

*   [https://docs.python.org/3.11/distutils/](https://docs.python.org/3.11/distutils/)
*   [https://peak.telecommunity.com/DevCenter/setuptools](https://peak.telecommunity.com/DevCenter/setuptools)
*   [https://peak.telecommunity.com/DevCenter/setuptools#specifying-your-project-s-version](https://peak.telecommunity.com/DevCenter/setuptools#specifying-your-project-s-version)
*   [https://pypi.org/](https://pypi.org/)
*   [https://pypi.org/project/pip/](https://pypi.org/project/pip/)
*   [https://peak.telecommunity.com/DevCenter/EasyInstall](https://peak.telecommunity.com/DevCenter/EasyInstall)
*   [https://pypi.org/project/zc.buildout/](https://pypi.org/project/zc.buildout/)
*   [https://twisted.org/](https://twisted.org/)
*   [https://web.archive.org/web/20090726093825/http://bitbucket.org/tarek/distutilsversion/](https://web.archive.org/web/20090726093825/http://bitbucket.org/tarek/distutilsversion/)

### Acknowledgments (감사의 글)

Trent Mick, Matthias Klose, Phillip Eby, David Lyon, 그리고 Pycon 및 Distutils-SIG의 많은 분들께 감사드립니다.

### Copyright (저작권)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

### 실제 Python 사용에 미치는 영향

이 PEP는 Python 패키징 생태계에서 버전 관리의 표준화를 위한 중요한 단계였지만, **PEP 440** 으로 대체되었습니다. 그럼에도 불구하고 이 PEP가 제시한 아이디어와 `verlib`의 개념은 이후 Python의 공식적인 버전 식별 및 의존성 지정 체계인 PEP 440의 기반을 다지는 데 기여했습니다. 결과적으로, Python 프로젝트들이 일관된 방식으로 버전을 정의하고, 패키징 도구들이 이를 안정적으로 해석하고 비교할 수 있게 되어 의존성 관리가 훨씬 더 견고해지는 데 영향을 미쳤습니다.

이는 개발자들이 패키지 버전을 이해하고 관리하는 데 드는 노력을 줄이고, 다양한 도구(예: `pip`) 간의 상호 운용성을 개선하는 데 필수적인 기반을 제공했습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.