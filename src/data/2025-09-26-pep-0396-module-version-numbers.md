---
title: "[Withdrawn] PEP 396 - Module Version Numbers"
excerpt: "Python Enhancement Proposal 396: 'Module Version Numbers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/396/
toc: true
toc_sticky: true
date: 2025-09-26 21:22:37+0900
last_modified_at: 2025-09-26 21:22:37+0900
published: true
---
> **원문 링크:** [PEP 396 - Module Version Numbers](https://peps.python.org/pep-0396/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 16-Mar-2011


# PEP 396 – Module Version Numbers

*   **작성자**: Barry Warsaw <barry at python.org>
*   **상태**: 철회됨 (Withdrawn)
*   **유형**: 정보성 (Informational)
*   **주제**: 패키징 (Packaging)
*   **생성일**: 2011년 3월 16일
*   **이력**: 2011년 4월 5일

## 중요 공지 (Important Notice)

**이 PEP는 철회되었습니다.**

런타임에 패키지 버전 정보에 접근하고, 패키지 배포 메타데이터와 자동으로 일관성을 유지하는 런타임 `__version__` 속성을 정의하는 최신 권장 사항은 Python Packaging User Guide의 "Accessing version information at runtime" 및 "Single-sourcing the Project Version" 섹션을 참조하십시오.

## 개요 (Abstract)

Python 모듈에 버전 번호를 지정하는 것이 유용하고 일반적이며, Python 커뮤니티 내에서 이를 수행하는 다양한 방식이 자연스럽게 발전해 왔다는 점을 고려할 때, 모듈 작성자가 준수하고 참조할 표준 관례를 확립하는 것이 유용합니다. 이 정보성 PEP는 Python 모듈의 버전 번호를 정의하고자 하는 Python 모듈 작성자를 위한 모범 사례를 설명합니다.

이 PEP의 준수는 선택 사항이지만, 다른 Python 도구(예: distutils2)는 여기에 정의된 관례를 사용하도록 조정될 수 있었습니다.

## PEP 거부/철회 (PEP Rejection/Withdrawal)

이 PEP는 2021년 4월 14일 공식적으로 거부되었습니다. 이 PEP가 처음 작성된 이후 수년 동안 패키징 생태계는 상당히 변화했으며, `importlib.metadata.version()`과 같은 API는 훨씬 더 나은 경험을 제공합니다.

이 거부는 2024년 10월 21일 철회 (withdrawal) 로 재분류되었습니다. 이는 이전 상태가 어떤 모듈도 `__version__` 속성을 정의해서는 안 된다는 것으로 오해될 수 있었기 때문입니다. 이는 분명 사실이 아닙니다.

모듈은 원하는 경우 여전히 `__version__`을 정의할 수 있습니다. 그러나 그렇게 하지 않아도 설치된 배포 패키지에 대한 버전 정보 조회에는 지장이 없으므로, 모듈 `__version__` 속성 사용에 대한 커뮤니티 관례를 문서화하는 데 정보성 PEP는 적절한 도구가 아닙니다(이 내용은 Python Packaging User Guide에서 더 잘 다루어집니다).

## 사용자 스토리 (User Stories)

*   **앨리스 (Alice)**: 앨리스는 다른 Python 개발자들과 공유하고 싶은 `alice`라는 새 모듈을 작성하고 있습니다. `alice`는 간단한 모듈이며 `alice.py` 파일 하나에 존재합니다. 앨리스는 사용자가 어떤 버전을 사용하고 있는지 알 수 있도록 버전 번호를 지정하고 싶습니다. 모듈이 파일 하나에만 있기 때문에, 그녀는 버전 번호를 해당 파일에 추가하고 싶어 합니다.
*   **밥 (Bob)**: 밥은 많은 사용자와 공유한 `bob`이라는 모듈을 작성했습니다. `bob.py`에는 사용자 편의를 위해 버전 번호가 포함되어 있습니다. 밥은 Cheeseshop (Python Package Index)에 대해 알게 되고, The Bob Bundle을 Cheeseshop에 업로드할 수 있도록 클래식 `distutils`를 사용하여 간단한 패키징을 추가합니다. `bob.py`가 이미 사용자가 프로그램적으로 접근할 수 있는 버전 번호를 지정하고 있기 때문에, 사용자가 이제 Cheeseshop에서 모듈을 얻더라도 동일한 API가 계속 작동하기를 원합니다.
*   **캐롤 (Carol)**: 캐롤은 여러 네임스페이스 패키지 (namespace packages)를 관리하며, 각 패키지는 독립적으로 개발되고 배포됩니다. 사용자가 그녀의 패키지에 대한 올바른 버전의 의존성 (dependencies)을 제대로 지정할 수 있도록, 그녀는 네임스페이스 패키지의 `setup.py` 파일에 버전 번호를 지정합니다. 캐롤은 패키지당 하나의 버전 번호만 업데이트하고 싶어 하므로, 모듈에 버전 번호를 지정하고 `sdist` 아카이브를 빌드할 때 `setup.py`가 모듈 버전 번호를 추출하도록 합니다.
*   **데이비드 (David)**: 데이비드는 표준 라이브러리 (standard library)에 패키지를 유지보수하며, 다른 버전의 Python용 독립 실행형 버전도 생성합니다. 표준 라이브러리 복사본은 모듈에 버전 번호를 정의하며, 이 동일한 버전 번호는 독립 실행형 배포판에도 사용됩니다.

## 배경 (Rationale)

표준 라이브러리와 서드파티 (third-party) 모두에서 Python 모듈은 오랫동안 버전 번호를 포함해 왔습니다. 버전 번호를 설명하는 사실상의 (de facto) 표준이 확립되어 있으며, 수년 동안 많은 임시적인 (ad-hoc) 방식이 자연스럽게 발전해 왔습니다. 종종 버전 번호는 모듈을 임포트하고 속성을 검사하여 프로그램적으로 검색할 수 있습니다. 클래식 Python `distutils`의 `setup()` 함수는 릴리스의 버전 번호를 지정할 수 있는 `version` 인수를 설명합니다. PEP 8은 키워드 확장을 사용하여 "Subversion, CVS, 또는 RCS" 버전 문자열을 기록하기 위한 `__version__`이라는 모듈 속성 사용을 설명합니다. PEP 작성자 자신의 이메일 기록에 따르면, 독립 모듈 개발자들이 `__version__` 모듈 속성을 사용한 가장 초기의 예는 1995년으로 거슬러 올라갑니다.

버전 정보의 또 다른 예는 `sqlite3` 모듈이며, 이 모듈에는 `sqlite_version_info`, `version`, `version_info` 속성이 있습니다. 어떤 속성이 모듈의 버전 번호를 포함하고, 어떤 속성이 기본 SQLite3 라이브러리의 버전 번호를 포함하는지 즉시 명확하지 않을 수 있습니다.

이 정보성 PEP는 확립된 관행을 성문화하고, 모듈 버전 번호를 설명하는 표준적인 방법과 이를 포함할 시기 및 포함하지 않을 시기에 대한 일부 사용 사례를 권장했습니다. 모듈 작성자의 채택은 전적으로 자발적이었습니다. 표준 라이브러리의 패키징 도구는 여기에 정의된 표준에 대한 선택적 지원을 제공할 것이며, Python 생태계의 다른 도구도 이를 준수할 수 있었습니다.

## 명세 (Specification)

*   일반적으로 표준 라이브러리의 모듈은 버전 번호를 갖지 않아야 합니다 (`SHOULD NOT`). 이들은 포함된 Python 릴리스의 버전 번호를 암시적으로 가집니다.
*   경우에 따라, 다른 Python 버전을 위해 독립 실행형 형태로도 릴리스되는 표준 라이브러리 모듈은 표준 라이브러리에 포함될 때 모듈 버전 번호를 포함할 수 있으며 (`MAY`), 별도로 패키징될 때는 버전 번호를 포함해야 합니다 (`SHOULD`).
*   모듈 (또는 패키지)이 버전 번호를 포함하는 경우, 해당 버전은 `__version__` 속성에서 사용할 수 있어야 합니다 (`SHOULD`).
*   네임스페이스 패키지 내부에 있는 모듈의 경우, 모듈은 `__version__` 속성을 포함해야 합니다 (`SHOULD`). 네임스페이스 패키지 자체는 고유한 `__version__` 속성을 포함해서는 안 됩니다 (`SHOULD NOT`).
*   `__version__` 속성의 값은 문자열이어야 합니다 (`SHOULD`).
*   모듈 버전 번호는 PEP 386에 지정된 정규화된 버전 형식 (normalized version format)을 준수해야 합니다 (`SHOULD`).
*   모듈 버전 번호는 버전 관리 시스템에서 제공하는 리비전 번호 또는 다른 의미적으로 다른 버전 번호(예: 기본 라이브러리 버전 번호)를 포함해서는 안 됩니다 (`SHOULD NOT`).
*   클래식 `distutils` `setup.py` 파일의 `version` 속성 또는 PEP 345 `Version` 메타데이터 필드는 `__version__` 필드에서 파생되거나 그 반대여야 합니다 (`SHOULD`).

## 예시 (Examples)

서드파티 패키지에서 버전 번호 검색:

```python
>>> import bzrlib
>>> bzrlib.__version__
'2.3.0'
```

독립 실행형 모듈로도 배포되는 표준 라이브러리 패키지에서 버전 번호 검색:

```python
>>> import email
>>> email.__version__
'5.1.0'
```

네임스페이스 패키지 (namespace packages)의 버전 번호:

```python
>>> import flufl.i18n
>>> import flufl.enum
>>> import flufl.lock
>>> print(flufl.i18n.__version__)
1.0.4
>>> print(flufl.enum.__version__)
3.1
>>> print(flufl.lock.__version__)
2.1
>>> import flufl
>>> flufl.__version__
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'module' object has no attribute '__version__'
```

## 파생 (Deriving)

모듈 버전 번호는 최소 두 곳, 때로는 그 이상에 나타날 수 있습니다. 예를 들어, 이 PEP에 따라 모듈의 `__version__` 속성에서 프로그램적으로 사용할 수 있습니다. 클래식 `distutils` `setup.py` 파일에서 `setup()` 함수는 `version` 인수를 취하고, `distutils2` `setup.cfg` 파일에는 `version` 키가 있습니다. 버전 번호는 PEP 345 메타데이터에도 포함되어야 하며, `sdist` 아카이브가 빌드될 때 포함되는 것이 바람직합니다. 모듈 작성자가 버전 번호를 한 번만 지정하고, 다른 모든 사용이 이 단일 정의에서 파생되도록 하는 것이 바람직합니다.

이는 여러 가지 방법으로 수행될 수 있으며, 그 중 몇 가지가 아래에 설명되어 있습니다. 이는 설명을 위한 목적으로만 포함되었으며, 확정적이거나 완전하거나 포괄적인 것은 아닙니다. 다른 접근 방식도 가능하며, 아래에 포함된 일부는 특정 상황에서 사용을 방해하는 제한 사항이 있을 수 있습니다.

앨르 (Elle)가 자신의 모듈 파일 `elle.py`에 다음 속성을 추가한다고 가정해 봅시다:

```python
__version__ = '3.1.1'
```

### 클래식 `distutils` (Classic distutils)

클래식 `distutils`에서 `setup.py`의 `setup()` 함수에 버전 문자열을 추가하는 가장 간단한 방법은 다음과 같습니다:

```python
from elle import __version__
setup(name='elle', version=__version__)
```

그러나 PEP 작성자의 경험에 따르면, 이는 모듈이 `2to3` 프로그램을 통해 자동 Python 3 변환을 사용하는 경우와 같이 일부 경우에 실패할 수 있습니다 (이는 `setup.py`가 `elle` 모듈이 변환되기 전에 Python 3에 의해 실행되기 때문입니다).

이 경우, `__version__`을 임포트하는 대신 파일에서 파싱하는 약간의 코드를 작성하는 것이 그리 어렵지 않습니다. 너무 자세히 설명하지 않고도, `distutils2`와 같은 모듈이 파일에서 버전 문자열을 파싱하는 방법을 제공할 가능성이 높습니다. 예:

```python
from distutils2 import get_version
setup(name='elle', version=get_version('elle.py'))
```

### `Distutils2` (이 PEP 작성 당시 제안된 방식, 현재는 사용되지 않음)

`distutils2` 스타일의 `setup.cfg`는 선언적 (declarative)이므로, 임포트를 통해서든 파싱을 통해서든 `__version__` 속성을 추출하기 위해 어떤 코드도 실행할 수 없습니다.

`distutils-sig`와 협의하여 두 가지 옵션이 제안되었습니다. 두 가지 모두 버전 번호를 파일에 포함하고, `setup.cfg`에서 해당 파일을 선언하는 것을 포함합니다. 파일의 전체 내용이 버전 번호를 포함하는 경우, `version-file` 키가 사용됩니다:

```
[metadata]
version-file: version.txt
```

버전 번호가 더 큰 파일, 예를 들어 Python 코드 내에 포함되어 파일을 파싱하여 버전을 추출해야 하는 경우, `version-from-file` 키가 사용됩니다:

```
[metadata]
version-from-file: elle.py
```

위에서 설명한 것과 유사한 파싱 방법이 콜론 뒤에 명명된 파일에 대해 수행됩니다. 이를 수행하는 정확한 방법은 적절한 `distutils2` 개발 포럼에서 논의될 예정이었습니다.

대안은 `setup.cfg`에서만 버전 번호를 정의하고 `pkgutil` 모듈을 사용하여 프로그램적으로 사용할 수 있도록 하는 것입니다. 예를 들어, `elle.py`에서:

```python
from distutils2._backport import pkgutil
__version__ = pkgutil.get_distribution('elle').metadata['version']
```

## PEP 376 메타데이터 (PEP 376 metadata)

PEP 376은 정적 메타데이터 (static metadata)에 대한 표준을 정의하지만, 이 메타데이터가 생성되는 프로세스는 설명하지 않습니다. 파생된 버전 정보가 설치 시점이 아니라 빌드 시점에 PEP 376 `.dist-info` 메타데이터에 배치되는 것이 매우 바람직합니다. 이러한 방식으로 코드가 설치되지 않은 경우에도 메타데이터를 인트로스펙션 (introspection)할 수 있습니다.

## 참조 (References)

*   Distutils2 documentation (http://distutils2.notmyidea.org/) (현재 사용되지 않는 링크)
*   The Cheeseshop (Python Package Index) (http://pypi.python.org)
*   http://docs.python.org/distutils/setupscript.html (현재 사용되지 않는 링크)
*   sqlite3 module documentation (http://docs.python.org/library/sqlite3.html)
*   pkgutil - Package utilities (http://distutils2.notmyidea.org/library/pkgutil.html) (현재 사용되지 않는 링크)
*   https://mail.python.org/pipermail/distutils-sig/2011-June/017862.html
*   importlib.metadata (https://docs.python.org/3/library/importlib.metadata.html#distribution-versions)
*   Misinterpreting the significance of this PEP's rejection (https://discuss.python.org/t/please-make-package-version-go-away/58501)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.