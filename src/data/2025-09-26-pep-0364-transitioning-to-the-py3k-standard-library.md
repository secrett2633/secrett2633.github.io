---
title: "[Withdrawn] PEP 364 - Transitioning to the Py3K Standard Library"
excerpt: "Python Enhancement Proposal 364: 'Transitioning to the Py3K Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/364/
toc: true
toc_sticky: true
date: 2025-09-26 19:08:59+0900
last_modified_at: 2025-09-26 19:08:59+0900
published: true
---
> **원문 링크:** [PEP 364 - Transitioning to the Py3K Standard Library](https://peps.python.org/pep-0364/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 01-Mar-2007



# PEP 364 – Py3K 표준 라이브러리로의 전환 (Transitioning to the Py3K Standard Library)

*   **작성자:** Barry Warsaw <barry at python.org>
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** Standards Track
*   **생성일:** 2007년 3월 1일
*   **Python 버전:** 2.6

## 개요 (Abstract)

PEP 3108은 Python 3.0 릴리스를 위한 Python 표준 라이브러리(Standard Library)의 재구성(reorganization)을 설명합니다. 이 PEP는 Python 2.x 표준 라이브러리에서 Python 3.0 표준 라이브러리로 전환하기 위한 메커니즘을 기술합니다. 이 전환을 통해 Python 개발자들은 Python 2.6부터 새로운 Python 3.0 라이브러리 이름을 사용하도록 장려받으면서도, 하위 호환성(backward compatibility)을 위해 이전 이름도 유지할 수 있게 됩니다. 이러한 방식으로 Python 개발자들은 기존 Python 프로그램과의 상호 운용성(interoperability)을 희생하지 않고도 미래 호환(forward compatible) 가능한 코드를 작성할 수 있습니다.

## 배경 (Rationale)

PEP 3108은 Python 표준 라이브러리(stdlib) 재구성에 대한 배경을 제시합니다. 독자들은 라이브러리가 왜 그리고 어떻게 재구성될지에 대한 자세한 내용을 위해 해당 PEP를 참조하는 것이 좋습니다. PEP 3108이 부분적으로 또는 전체적으로 수용된다면, Python 개발자들이 Python 2.x에서 새로운 stdlib 모듈 이름으로의 전환을 시작할 수 있도록 허용하는 것이 유리하며, 이를 통해 Python 2.6부터 미래 호환 가능한 코드를 작성할 수 있습니다.

PEP 3108은 더 이상 유용하지 않거나 필요 없는 일부 "오래된 불필요한 것들" (silly old stuff), 즉 모듈들을 제거할 것을 제안합니다. 이 PEP는 제거될 모듈에 대해서는 미래 호환성 문제가 없으므로 다루지 않습니다.

이 PEP는 오직 이전 stdlib 이름에서 새로운 stdlib 이름으로의 매핑(mapping)을 유지하는 메커니즘에만 관련됩니다. 모든 특정 모듈 이름 변경 제안에 대해서는 PEP 3108을 참조하십시오. 특히 이전 이름에서 새 이름으로의 매핑에 대한 지침은 "Modules to Rename" 섹션을 참조하십시오. 이 PEP에 있는 몇 가지 예시는 설명 목적으로만 제공되며, 특정 이름 변경 권장 사항으로 사용해서는 안 됩니다.

## 지원되는 이름 변경 (Supported Renamings)

이 PEP에서 명시적으로 지원하는 사용 사례는 최소 4가지입니다:

*   `StringIO`를 `stringio`와 같이 단순한 최상위 패키지 이름 변경.
*   `email.MIMEText`를 `email.mime.text`와 같이 패키지 이름이 변경될 수도 있고 그렇지 않을 수도 있는 서브패키지(Sub-package) 이름 변경.
*   `cStringIO`를 `cstringio`와 같이 확장 모듈(Extension module) 이름 변경.
*   위의 어떤 경우든 서드파티(Third-party) 모듈의 이름 변경.

이 PEP에서 지원하는 두 가지 사용 사례는 `StringIO`와 같은 단순한 최상위 모듈 이름 변경과 `email.MIMEText`와 같은 패키지 내 모듈 이름 변경을 포함합니다.

전자의 경우, PEP 3108은 현재 PEP 8 권장 사항에 따라 `StringIO`를 `stringio`로 변경할 것을 권장합니다.

후자의 경우, Python 2.5와 함께 배포된 `email` 4.0 패키지는 이미 `email.MIMEText`를 `email.mime.text`로 변경했지만, 이는 `email` 패키지 내에서 일회성으로 "해킹"과 같은 방식으로 이루어졌습니다. 이 PEP에서 설명하는 메커니즘은 모든 모듈 이름 변경을 처리할 수 있을 만큼 일반적이므로, Python 2.5의 "해킹" (이전 Python 버전과의 하위 호환성을 제외하고)의 필요성을 없앱니다.

추가적인 사용 사례는 C 확장 모듈(C extension modules)의 이름 변경을 지원하는 것입니다. C 모듈의 새 이름이 임포트(import) 가능하다면, 새 이름으로 재매핑(remapping)될 수 있습니다. 예를 들어, `cStringIO`가 `cstringio`로 이름 변경됩니다.

서드파티 패키지(Third-party package) 이름 변경도 지원되며, 이는 모든 Python 모듈에서 접근 가능한 여러 공개 인터페이스를 통해 이루어집니다.

재매핑은 재귀적으로(recursively) 수행되지 않습니다.

## `.mv` 파일 ( .mv files)

재매핑 파일은 `.mv` 파일이라고 불립니다. 이 접미사는 Unix의 `mv(1)` 명령어를 연상시키도록 선택되었습니다. `.mv` 파일은 단순한 줄 단위(line-oriented) 텍스트 파일입니다. 모든 빈 줄과 `#`으로 시작하는 줄은 무시됩니다. 다른 모든 줄은 두 개의 공백으로 구분된 필드를 포함해야 합니다. 첫 번째 필드는 이전 모듈 이름이고, 두 번째 필드는 새 모듈 이름입니다. 두 모듈 이름 모두 전체 점으로 구분된 경로 이름(full dotted-path names)을 사용하여 지정되어야 합니다. 다음은 Python 2.6의 `.mv` 파일 예시입니다:

```
# Map the various string i/o libraries to their new names
StringIO stringio
cStringIO cstringio
```

`.mv` 파일은 파일 시스템 어디에든 나타날 수 있으며, 이를 파싱(parse)하고 그 안에 있는 재매핑을 등록하기 위한 프로그래밍 인터페이스(programmatic interface)가 제공됩니다. 기본적으로 Python이 시작될 때, `oldlib` 패키지 내의 모든 `.mv` 파일이 읽히고, 해당 재매핑이 자동으로 등록됩니다. 이곳이 최상위 Python 2.x 표준 라이브러리 모듈에 대한 모든 모듈 재매핑이 지정되어야 하는 곳입니다.

## 구현 명세 (Implementation Specification)

이 섹션에서는 Python 2.x에서 모듈 이름 변경이 어떻게 구현되는지에 대한 완전한 명세를 제공합니다. 핵심 메커니즘은 PEP 302에 설명된 다양한 임포트 훅(import hooks)에 의존합니다. 특히 `sys.path_importer_cache`, `sys.path`, 그리고 `sys.meta_path`가 모두 필요한 기능을 제공하는 데 사용됩니다.

Python의 임포트 메커니즘이 초기화될 때, `oldlib` 패키지가 임포트됩니다. `oldlib` 내부에는 `OldStdlibLoader`라는 클래스가 있습니다. 이 클래스는 PEP 302 인터페이스를 구현하며, 인자 없이 자동으로 인스턴스화됩니다. 생성자(constructor)는 `oldlib` 패키지 디렉토리에서 모든 `.mv` 파일을 읽고, 해당 `.mv` 파일에서 찾은 모든 재매핑을 자동으로 등록합니다. 이것이 Python 2.x 표준 라이브러리가 재매핑되는 방식입니다.

`OldStdlibLoader` 클래스는 다른 Python 모듈에 의해 인스턴스화되어서는 안 됩니다. 대신, `sys.stdlib_remapper` 인스턴스를 통해 전역 `OldStdlibLoader` 인스턴스에 접근할 수 있습니다. 재매핑 메커니즘에 프로그래밍 방식으로 접근하려면 이 인스턴스를 사용하십시오.

중요한 구현 세부 사항 하나: PEP 302 API에서 필요하듯이, 우리의 재매핑 로더(remapping loader)를 연결하기 위해 마법 문자열(magic string)이 `sys.path`와 모듈의 `__path__` 속성에 추가됩니다. 이 마법 문자열은 현재 `<oldlib>`이며, `<`으로 시작하는 모든 `sys.path` 항목을 특별하게 처리하기 위해 Python의 `site.py` 파일에 일부 변경 사항이 필요했습니다. 특히, 이들을 절대 파일 이름(absolute file names)으로 만들려는 시도는 하지 않습니다 (왜냐하면 이들은 전혀 파일 이름이 아니기 때문입니다).

재매핑 임포트 훅이 작동하려면 모듈 또는 패키지가 물리적으로 새 이름 아래에 위치해야 합니다. 이는 임포트 훅이 아직 임포트되지 않았고 Python의 내장 임포트 규칙에 의해 임포트될 수 없는 모듈만 가로채기(catch) 때문입니다. 따라서, 예를 들어 `Lib/StringIO.py`에서 `Lib/stringio.py`로 모듈이 이동되었고, 이전의 `.pyc` 파일이 제거되었다면, 재매퍼(remapper) 없이는 다음 코드가 실패할 것입니다:

```python
import StringIO
```

대신, 재매퍼를 사용하면 이 실패한 임포트가 가로채지고(caught), 등록된 재매핑에서 이전 이름이 찾아지며, 이 경우 새 이름인 `stringio`가 발견됩니다. 그런 다음 재매퍼는 새 이름을 임포트하려고 시도하고, 성공하면 결과 모듈을 `sys.modules`에 이전 이름과 새 이름 모두로 바인딩합니다. 따라서 위 임포트는 `sys.modules`에 `'StringIO'`와 `'stringio'` 항목을 생성하며, 둘 다 정확히 동일한 모듈 객체를 가리키게 됩니다.

`.mv` 파일을 모두 옮기거나 사용자 정의 시작 코드(custom start up code)에서 프로그래밍 방식으로 제거하는 것 외에는 재매핑 메커니즘을 비활성화하는 방법은 제안되지 않았습니다. Python 3.0에서는 재매핑이 제거되고 "새로운" 이름만 남게 됩니다.

## 프로그래밍 인터페이스 (Programmatic Interface)

`sys.stdlib_remapper` 객체에 여러 메서드가 추가되었으며, 서드파티 패키지는 이를 사용하여 자체 재매핑을 등록할 수 있습니다. 그러나 모든 경우에 이전 이름에서 새 이름으로의 매핑은 오직 하나만 존재한다는 점에 유의하십시오. 두 개의 `.mv` 파일이 이전 이름에 대해 다른 매핑을 포함하거나, 이미 재매핑된 이전 이름으로 프로그래밍 호출이 이루어지면 이전 매핑은 손실됩니다. 이는 이미 임포트된 모듈에는 영향을 미치지 않습니다.

`sys.stdlib_remapper` 객체에서 다음 메서드를 사용할 수 있습니다:

*   `read_mv_file(filename)` – 주어진 파일을 읽고 파일에서 찾은 모든 재매핑을 등록합니다.
*   `read_directory_mv_files(dirname, suffix='.mv')` – 주어진 디렉토리를 나열하고, 해당 디렉토리에서 일치하는 접미사 (`.mv`가 기본값)를 가진 모든 파일을 읽습니다. 파싱된 각 파일에 대해 파일에서 찾은 모든 재매핑을 등록합니다.
*   `set_mapping(oldname, newname)` – 이전 모듈 이름에서 새 모듈 이름으로의 새 매핑을 등록합니다. 둘 다 모듈에 대한 전체 점으로 구분된 경로 이름이어야 합니다. `newname`은 `None`일 수 있으며, 이 경우 `oldname`에 대한 기존 매핑은 제거됩니다 (기존 매핑이 없더라도 오류는 아닙니다).
*   `get_mapping(oldname, default=None)` – 주어진 `oldname`에 대해 등록된 `newname`을 반환합니다. 등록된 재매핑이 없으면 `default`가 반환됩니다.

## 미해결 문제 (Open Issues)

*   모든 재매핑을 비활성화하는 명령줄 스위치 및/또는 환경 변수가 있어야 할까요?
*   재매핑이 재귀적으로 발생해야 할까요?
*   패키지의 `__init__.py`가 로드될 때 해당 패키지 디렉토리에서 `.mv` 파일을 자동으로 파싱해야 할까요? 이는 패키지가 자체 재매핑을 위한 `.mv` 파일을 쉽게 포함할 수 있도록 할 것입니다. `email` 패키지의 `.mv` 파일을 `oldlib` 패키지 대신 `email` 패키지에 배치할 경우 현재 `email` 패키지가 해야 하는 것과 비교해봅시다:

    ```python
    # Expose old names
    import os, sys
    sys.stdlib_remapper.read_directory_mv_files(os.path.dirname(__file__))
    ```

    패키지에 포함될 수 있는 `.mv` 파일을 해당 패키지의 디렉토리에서 자동으로 읽어야 한다고 생각합니다.

## 참조 구현 (Reference Implementation)

현재 (이 문서 작성 시점) Python 2.6 SVN 트렁크에 대한 패치 형태의 참조 구현이 SourceForge 패치 #1675334로 제공됩니다. 이 패치는 `cStringIO`를 `cstringio`로 변경하는 내용을 포함하지만, 이는 주로 설명 및 단위 테스트 목적입니다. 패치가 수용된다면, 이 변경 사항을 다른 PEP 3108 변경 사항과 분리하는 것을 고려할 수 있습니다.

## 참고 자료 (References)

*   참조 구현 (http://bugs.python.org/issue1675334)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.