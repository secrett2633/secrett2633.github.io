---
title: "[Final] PEP 273 - Import Modules from Zip Archives"
excerpt: "Python Enhancement Proposal 273: 'Import Modules from Zip Archives'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/273/
toc: true
toc_sticky: true
date: 2025-09-26 17:52:44+0900
last_modified_at: 2025-09-26 17:52:44+0900
published: true
---
> **원문 링크:** [PEP 273 - Import Modules from Zip Archives](https://peps.python.org/pep-0273/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-Oct-2001


## 개요
이 문서는 Python Enhancement Proposal (PEP) 273, "Import Modules from Zip Archives"의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. 이 PEP는 Python 모듈과 패키지를 `.zip` 아카이브에서 임포트할 수 있는 기능을 추가하는 것을 제안합니다.

---

## PEP 273: Zip 아카이브에서 모듈 임포트

*   **작성자:** James C. Ahlstrom
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **작성일:** 2001년 10월 11일
*   **Python 버전:** 2.3
*   **최종 수정일:** 2025년 2월 1일 (GitHub)

### 초록 (Abstract)

이 PEP는 `.zip` 아카이브에서 Python 모듈(`*.py`, `*.py[co]`) 및 패키지를 임포트할 수 있는 기능을 추가합니다. 동일한 코드가 `os.listdir`를 사용할 수 있는 경우 일반 디렉토리 임포트 속도를 높이는 데 사용됩니다.

### 참고 (Note)

Zip 임포트 기능은 Python 2.3에 추가되었지만, 최종 구현 방식은 이 PEP에 설명된 방식과 다릅니다. Python 2.3의 구현은 SourceForge 패치 #652586에 기반하며, 이는 PEP 302에 설명된 새로운 임포트 훅(import hooks)을 사용합니다. 따라서 이 PEP의 나머지 내용은 역사적인 의미만 가집니다.

### 사양 (Specification)

현재 `sys.path`는 디렉토리 이름을 나타내는 문자열 리스트입니다. 이 PEP가 구현된다면, `sys.path`의 항목은 `.zip` 파일 아카이브의 이름을 나타내는 문자열이 될 수 있습니다. `.zip` 아카이브는 패키지 임포트를 지원하기 위해 서브디렉토리 구조를 포함할 수 있습니다. `.zip` 아카이브는 서브디렉토리와 동일한 방식으로 임포트를 처리합니다.

구현은 Python 코어의 C 코드로 이루어지며, 지원되는 모든 Python 플랫폼에서 작동합니다.

`.zip` 아카이브에는 모든 종류의 파일이 포함될 수 있지만, `*.py`와 `*.py[co]` 파일만 임포트 가능합니다. 동적 모듈(`*.pyd`, `*.so`)의 `.zip` 임포트는 허용되지 않습니다.

`sys.path`가 기본 디렉토리 이름을 가지듯이, 기본 `.zip` 아카이브 이름도 추가됩니다. 그렇지 않으면 아카이브에서 모든 Python 라이브러리 파일을 임포트할 방법이 없습니다.

### 서브디렉토리 동등성 (Subdirectory Equivalence)

`.zip` 아카이브는 서브디렉토리 트리와 정확히 동일하게 취급되어야 하며, 이는 현재 및 미래의 규칙에 기반한 패키지 임포트를 지원하기 위함입니다. 모든 `.zip` 데이터는 Central Directory에서 가져오며, 데이터는 정확해야 하고, 손상된 `.zip` 파일은 지원하지 않습니다.

예를 들어, `sys.path`에 `/A/B/SubDir`와 `/C/D/E/Archive.zip`가 있고, `Q` 패키지에서 `modfoo`를 임포트하려 한다고 가정해봅시다. `import.c`는 경로 및 확장자 목록을 생성하고 파일을 찾을 것입니다. 생성된 경로 목록은 `.zip` 임포트에서도 변경되지 않습니다. `import.c`가 `/A/B/SubDir/Q/R/modfoo.pyc` 경로를 생성한다면, `/C/D/E/Archive.zip/Q/R/modfoo.pyc` 경로도 생성합니다. `SubDir` 경로에서 파일을 찾는 것은 아카이브 내에서 `Q/R/modfoo.pyc`를 찾는 것과 정확히 동일합니다.

`/A/B/SubDir/*`와 그 모든 서브디렉토리를 `.zip`으로 압축하면, `.zip` 파일은 해당 서브디렉토리와 동일하게 임포트를 처리할 것입니다.

그러나 완전히 동일하지는 않습니다. `.zip` 파일에서는 동적 모듈(`.dll`, `.pyd`, `.so` 등)을 임포트할 수 없습니다. 이들은 운영체제에 종속적이며, 파일 시스템에 실제 파일로 존재해야만 로드될 가능성이 높습니다. `.zip` 파일에서 동적 모듈을 추출하여 일반 파일로 작성한 후 로드하는 방법도 고려할 수 있지만, 이는 임시 파일을 생성하고 `dynload_*.c`와 같은 복잡한 문제를 처리해야 하므로 좋은 방법이 아닙니다.

`*.pyc`를 임포트하려고 시도할 때, 해당 파일이 없으면 `*.pyo`가 대신 사용됩니다. 그 반대도 마찬가지입니다. `*.pyc`와 `*.pyo` 둘 다 없거나 매직 넘버가 유효하지 않으면, `*.py`가 컴파일되어 임포트를 처리하지만, 컴파일된 파일은 저장되지 않습니다. Python은 일반적으로 `*.py`와 동일한 디렉토리에 저장하지만, `.zip` 파일에 직접 쓰는 것은 바람직하지 않습니다. `.zip` 아카이브의 디렉토리에 쓸 수도 있지만, 이는 디렉토리를 복잡하게 만들 수 있습니다(예: `/usr/bin`인 경우).

컴파일된 파일을 저장하지 않으면 `.zip` 임포트가 매우 느려지고, 사용자는 무엇이 문제인지 파악하기 어려울 것입니다. 따라서 `*.py`와 함께 `*.pyc` 및 `*.pyo`를 아카이브에 포함하는 것이 가장 좋습니다.

### 효율성 (Efficiency)

`.zip` 아카이브에서 파일을 찾는 유일한 방법은 선형 검색입니다. 따라서 `sys.path`의 각 `.zip` 파일에 대해 이름을 한 번 검색한 후, 이름과 기타 관련 데이터를 정적 Python 딕셔너리에 저장합니다. 딕셔너리의 키는 `sys.path`의 아카이브 이름과 아카이브 내의 파일 이름(서브디렉토리 포함)을 결합한 것입니다. 이는 `import.c`가 생성하는 이름과 정확히 일치하여 조회를 쉽게 만듭니다.

이 동일한 메커니즘은 디렉토리(비-zip) 임포트의 속도를 높이는 데도 사용됩니다.

### zlib

압축된 `.zip` 아카이브는 압축 해제를 위해 zlib를 필요로 합니다. 다른 임포트보다 먼저 `zlib` 임포트를 시도합니다. `zlib`를 사용할 수 없으면 압축된 파일 임포트는 "missing zlib" 메시지와 함께 실패합니다.

### 부팅 (Booting)

Python은 `site.py`를 임포트하고, `site.py`는 `os`, `nt`, `ntpath`, `stat`, `UserDict`를 임포트합니다. 또한 `sitecustomize.py`를 임포트할 수 있으며, 이는 더 많은 모듈을 임포트할 수 있습니다. `site.py`가 임포트되기 전에 `.zip` 임포트가 가능해야 합니다.

`sys.path`에 기본 디렉토리가 있듯이, 하나 이상의 기본 `.zip` 아카이브도 있어야 합니다.

문제는 그 이름이 무엇이 되어야 하는지입니다. 이름은 Python 버전과 연결되어야 하므로, 동일한 머신에 여러 Python 버전이 있을 때도 Python 실행 파일이 해당 라이브러리를 올바르게 찾을 수 있습니다.

`sys.path`에 하나의 이름이 추가됩니다. Unix에서는 디렉토리가 `sys.prefix + "/lib"`이고, 파일 이름은 `"python%s%s.zip" % (sys.version[0], sys.version[2])`입니다. 따라서 Python 2.2와 `prefix /usr/local`의 경우, `/usr/local/lib/python2.2/`는 이미 `sys.path`에 있으며, `/usr/local/lib/python22.zip`가 추가될 것입니다. Windows에서는 파일이 `python22.dll`의 전체 경로이며, "dll"이 "zip"으로 대체됩니다. `.zip` 아카이브 이름은 항상 `sys.path`의 두 번째 항목으로 삽입됩니다. 첫 번째는 `main.py`의 디렉토리입니다.

### 디렉토리 임포트 (Directory Imports)

`.zip` 임포트의 속도를 높이는 데 사용되는 정적 Python 딕셔너리는 일반 디렉토리 임포트의 속도를 높이는 데도 사용할 수 있습니다. `sys.path`에서 `.zip` 아카이브가 아닌 각 항목에 대해 `os.listdir`를 호출하고, 디렉토리 내용을 딕셔너리에 추가합니다. 그런 다음 이중 루프에서 `fopen()`을 호출하는 대신 딕셔너리를 확인합니다. 이는 임포트 속도를 크게 향상시킵니다. `os.listdir`가 없으면 딕셔너리는 사용되지 않습니다.

### 벤치마크 (Benchmarks)

| Case | Original 2.2a3 | Using os.listdir | Zip Uncomp | Zip Compr |
| :--- | :--- | :--- | :--- | :--- |
| 1    | 3.2            | 2.5              | 3.2->1.02  | 2.3->0.87 |
| 2    | 2.8            | 3.9              | 3.0->1.32  | Case 1과 동일 |
| 3    | 5.7            | 5.7              | 5.7->5.7   | 2.1->1.8 |
| 4    | 9.4            | 9.4              | 9.3->9.35  | Case 3과 동일 |

*   **Case 1:** 로컬 드라이브 C:, `sys.path`는 기본값.
*   **Case 2:** 로컬 드라이브 C:, 파일이 있는 디렉토리가 `sys.path`의 끝에 있음.
*   **Case 3:** 네트워크 드라이브, `sys.path`는 기본값.
*   **Case 4:** 네트워크 드라이브, 파일이 있는 디렉토리가 `sys.path`의 끝에 있음.

벤치마크는 Pentium 4 clone, 1.4 GHz, 256 Meg, Windows 2000 및 Linux/Samba 네트워크 서버 환경에서 수행되었습니다. 시간은 초 단위이며, 약 100개의 Lib 모듈을 임포트하는 데 걸린 시간입니다. Case 2와 4는 "올바른" 디렉토리가 `sys.path`의 끝으로 이동된 경우입니다. "Uncomp"는 압축되지 않은 `.zip` 아카이브를, "Compr"는 압축된 아카이브를 의미합니다.

초기 시간은 시스템 재부팅 후의 시간이며, "->" 이후의 시간은 반복 실행 후의 시간입니다. 재부팅 후 C:에서 임포트하는 시간은 "Original" 케이스에서 상당히 가변적이지만 더 현실적입니다.

### 사용자 정의 임포트 (Custom Imports)

이 로직은 필요한 Python 모듈(이 경우 `os`)을 사용할 수 있게 될 때까지 기본 검색을 사용하여 임포트하는 기능을 보여줍니다. 이는 사용자 정의 임포터(custom importers)를 부트스트랩하는 데 사용될 수 있습니다. 예를 들어, `__init__.py`에 `importer()`가 존재하면, 임포트에 사용될 수 있습니다. `importer()`는 `os` 및 다른 모듈을 자유롭게 임포트할 수 있으며, 이들은 기본 메커니즘에서 처리됩니다. 이 PEP는 어떤 사용자 정의 임포터도 정의하지 않으며, 이 설명은 정보 제공을 위한 것입니다.

### 구현 (Implementation)

C 구현은 SourceForge 패치 492105로 제공되었습니다. 이는 패치 652586 및 현재 CVS에 의해 대체되었습니다.

Paul Moore가 최신 CVS에 맞게 업데이트한 새 버전은 645650입니다. 이 역시 패치 652586 및 현재 CVS에 의해 대체되었습니다.

Just van Rossum의 경쟁 구현인 652586은 PEP 302의 최종 구현의 기반이 되었습니다. PEP 273은 PEP 302의 임포트 훅(import hooks)을 사용하여 구현되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.