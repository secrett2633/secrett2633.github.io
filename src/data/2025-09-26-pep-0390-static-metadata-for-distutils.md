---
title: "[Rejected] PEP 390 - Static metadata for Distutils"
excerpt: "Python Enhancement Proposal 390: 'Static metadata for Distutils'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/390/
toc: true
toc_sticky: true
date: 2025-09-26 21:09:17+0900
last_modified_at: 2025-09-26 21:09:17+0900
published: true
---
> **원문 링크:** [PEP 390 - Static metadata for Distutils](https://peps.python.org/pep-0390/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 10-Oct-2009

## PEP 390 – Distutils를 위한 정적 메타데이터

*   **작성자:** Tarek Ziadé
*   **BDFL-Delegate:** Alyssa Coghlan
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **주제:** Packaging
*   **생성일:** 2009년 10월 10일
*   **Python 버전:** 2.7, 3.2

---

### 개요 (Abstract)

이 PEP는 `setup.cfg` 파일에 새로운 섹션과 형식을 정의하여, `setup.py`를 사용하지 않고도 패키지의 메타데이터를 설명할 수 있도록 제안했습니다.

### 거부 공지 (Rejection Notice)

Distutils2가 표준 라이브러리에 통합되지 않게 됨에 따라, 이 PEP는 2013년 4월 말 Alyssa Coghlan에 의해 거부되었습니다.

이 PEP를 대체할 PEP는 PEP 426 (메타데이터 2.0)을 기반으로 생성될 예정이며, 소스 tarball 또는 VCS 체크아웃에서 sdist 아카이브를 생성하는 데 필요한 최소한의 정보를 정의할 것입니다.

### 제안 배경 (Rationale)

현재, 설치되지 않은 배포판의 모든 메타데이터 (PEP 314 참조)를 확인하려면 `setup.py` 명령줄 인터페이스를 사용해야 합니다.

예를 들어, 다음과 같이 실행해야 합니다:
```bash
$ python setup.py --name Distribute
$ python setup.py --version 0.6.4
```
`name`과 `version`은 메타데이터 필드입니다. 이 방식은 잘 작동하지만, 개발자들이 `setup.py`에 더 많은 코드를 추가할수록 이 기능이 제대로 작동하지 않거나, 최악의 경우 대상 시스템에서 원치 않는 작업을 수행할 수도 있습니다.

더욱이, OS 패키저가 재패키징하려는 배포판의 메타데이터를 얻으려 할 때, 그들이 작업하는 `setup.py` 파일을 이해하는 데 어려움을 겪을 수 있습니다.

따라서 이 PEP의 목표는 `setup.py`와 함께 정적 구성 파일에 메타데이터를 선언하는 방법을 제공하여, 서드파티 코드(third-party code) 실행 없이 메타데이터를 얻을 수 있도록 하는 것이었습니다.

### `setup.cfg`에 메타데이터 섹션 추가 (Adding a metadata section in setup.cfg)

이 PEP는 `setup.cfg` 파일에 `[metadata]` 섹션을 도입하여 메타데이터의 모든 필드를 포함할 수 있도록 제안했습니다.

예시:
```ini
[metadata]
name = Distribute
version = 0.6.4
```
`setup.cfg` 파일은 Distutils에서 또 다른 구성 파일을 추가하는 것을 피하기 위해 사용됩니다. 이 파일은 명령이 실행될 때 Distutils에 의해 이미 읽히며, `[metadata]` 섹션이 발견되면 메타데이터 필드를 채우는 데 사용됩니다. `setup()` 함수에 메타데이터 필드에 해당하는 옵션이 주어지면, `setup.cfg`에 있던 값을 재정의합니다.

`setup.py`는 여전히 사용되며, 메타데이터 필드의 일부가 아닌 옵션(예: `sdist` 명령의 `packages` 또는 `scripts` 옵션)을 정의하는 데 필요할 수 있습니다.

### 다중 라인 값 (Multi-lines values)

일부 메타데이터 필드는 여러 값을 가질 수 있습니다. `setup.cfg`가 `ConfigParser` 및 RFC 822 LONG HEADER FIELDS (섹션 3.1.1 참조)와 호환되도록, 이러한 값들은 쉼표(`,`)로 구분됩니다.

예시:
```ini
requires = pywin32, bar > 1.0, foo
```
이 변수가 읽힐 때, 값들은 파싱되어 리스트(`['pywin32', 'bar > 1.0', 'foo']`)로 변환됩니다.

### 컨텍스트 종속 섹션 (Context-dependant sections)

`[metadata]` 섹션은 컨텍스트 종속 섹션(context-dependant sections)을 사용할 수도 있었습니다. 컨텍스트 종속 섹션은 실행 환경에 대한 조건을 포함하는 섹션입니다.

예시:
```ini
[metadata]
name = Distribute
version = 0.6.4
[metadata:sys_platform == 'win32']
requires = pywin32, bar > 1.0
obsoletes = pywin31
[metadata:os_machine == 'i386']
requires = foo
[metadata:python_version == '2.4' or python_version == '2.5']
requires = bar
[metadata:'linux' in sys_platform]
requires = baz
```
각 `[metadata:condition]` 섹션은 파일이 읽힐 때 조건이 충족될 경우에만 사용됩니다. 이러한 컨텍스트 종속 섹션의 배경 동기는 배포판이 설치될 플랫폼에 따라 달라지는 요구 사항을 정의할 수 있도록 하는 것이었습니다 (PEP 314 참조).

이를 위한 마이크로 언어(micro-language)는 가장 간단한 형태였습니다: 문자열만 비교하며, `==` 및 `in` 연산자 (및 그 반대)와 표현식을 결합하는 기능을 가졌습니다. 이는 Python 개발자가 아닌 사람들도 쉽게 이해할 수 있도록 했습니다.

의사 문법(pseudo-grammar)은 다음과 같습니다:
`EXPR [in|==|!=|not in] EXPR [or|and] ...`

여기서 `EXPR`은 다음 중 하나에 해당합니다:
*   `python_version = '%s.%s' % (sys.version_info[0], sys.version_info[1])`
*   `os_name = os.name`
*   `sys_platform = sys.platform`
*   `platform_version = platform.version()`
*   `platform_machine = platform.machine()`
*   `2.4` 또는 `win32`와 같은 자유 문자열

`in` 연산자는 문자열로 제한되었으며, 이는 튜플이나 리스트와 같은 다른 시퀀스를 오른쪽에 사용할 수 없음을 의미합니다.

Distutils는 `setup.cfg` 파일이 주어졌을 때 실행 환경에 대한 배포판의 메타데이터를 생성할 수 있는 함수를 제공할 예정이었습니다:
```python
>>> from distutils.util import local_metadata
>>> local_metadata('setup.cfg')
<DistributionMetadata instance>
```
이는 순수한 Python(vanilla Python)이 서드파티 코드를 실행하지 않고도 패키지의 메타데이터를 읽을 수 있다는 것을 의미합니다.

이 기능은 `metadata` 네임스페이스에만 국한되지 않고, 다른 섹션도 이러한 컨텍스트 종속 섹션으로 확장될 수 있었습니다.

### PKG-INFO 생성 및 PEP 314에 미치는 영향 (Impact on PKG-INFO generation and PEP 314)

Distutils가 PKG-INFO를 생성할 때, 조건에 의존하는 모든 필드는 `;` 구분자 뒤에 해당 조건이 라인 끝에 기록됩니다.

예시:
```
Metadata-Version: 1.2
Name: distribute
Version: 0.6.4
...
Requires: pywin32, bar > 1.0; sys_platform == 'win32'
Requires: foo; os_machine == 'i386'
Requires: bar; python_version == '2.4' or python_version == '2.5'
Requires: baz; 'linux' in sys_platform
Obsoletes = pywin31; sys_platform == 'win32'
...
Classifier: Development Status :: 5 - Production/Stable
Classifier: Intended Audience :: Developers
Classifier: License :: OSI Approved :: Python Software Foundation License
```
이 파일은 `DistributionMetadata` 클래스로 열 수 있었습니다. 이 클래스는 실행 환경을 사용하여 마이크로 언어를 활용할 수 있습니다.

Python 2.5 i386 Linux에서 실행하는 예시:
```python
>>> from distutils.dist import DistributionMetadata
>>> metadata = DistributionMetadata('PKG_INFO')
>>> metadata.get_requires()
['foo', 'bar', 'baz']
```
메타데이터를 다른 환경에 대해 얻으려는 경우 실행 환경을 재정의할 수 있었습니다:
```python
>>> env = {'python_version': '2.4',
...        'os_name': 'nt',
...        'sys_platform': 'win32',
...        'platform_version': 'MVCC++ 6.0'
...        'platform_machine': 'i386'}
...
>>> metadata = DistributionMetadata('PKG_INFO', environment=env)
>>> metadata.get_requires()
['bar > 1.0', 'foo', 'bar']
```
PEP 314는 이에 따라 변경되어 각 필드가 추가 조건 마커를 가질 수 있도록 했습니다.

### 호환성 (Compatibility)

이 변경사항은 새로운 메타데이터 1.2 형식을 기반으로 하며, 이는 Distutils가 이전 PKG-INFO 파일과 새로운 파일을 구별할 수 있음을 의미합니다.

`setup.cfg` 파일 변경은 `ConfigParser`와 호환성을 유지하며 기존 `setup.cfg` 파일을 손상시키지 않을 것입니다.

### 한계 (Limitations)

이 제안은 `<` 및 `>` 연산자를 제공하지 않았으며, `python_version`은 일반 문자열이었습니다. 이는 섹션을 특정 Python 버전으로 제한해야 할 때 `or` 연산자를 사용해야 함을 의미했습니다. 그러나 PEP 386이 수락되었다면, `python_version`은 내부적으로 문자열과 비교 가능하도록 변경될 수 있었고, `<` 및 `>` 연산자가 도입될 수 있었습니다.

마지막으로, 배포판이 `setup.cfg`에 모든 메타데이터 필드를 설정할 수 없는 경우, `local_metadata`가 호출될 때 필드는 `UNKNOWN`으로 설정됩니다. `UNKNOWN` 값을 얻는 것은 전체 메타데이터를 얻기 위해 `setup.py` 명령줄 인터페이스를 실행해야 할 수도 있음을 의미했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.