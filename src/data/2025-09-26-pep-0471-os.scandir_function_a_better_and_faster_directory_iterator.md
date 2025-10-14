---
title: "[Final] PEP 471 - os.scandir() function – a better and faster directory iterator"
excerpt: "Python Enhancement Proposal 471: 'os.scandir() function – a better and faster directory iterator'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/471/
toc: true
toc_sticky: true
date: 2025-09-26 22:18:05+0900
last_modified_at: 2025-09-26 22:18:05+0900
published: true
---
> **원문 링크:** [PEP 471 - os.scandir() function – a better and faster directory iterator](https://peps.python.org/pep-0471/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-May-2014

다음은 PEP 471 – `os.scandir()` 함수 – 더 좋고 빠른 디렉토리 이터레이터에 대한 번역 및 요약입니다. 이 PEP는 Python 3.5에 `os.scandir()` 함수를 표준 라이브러리에 추가하여 디렉토리 순회 성능을 크게 향상시키는 것을 제안합니다.

---

## PEP 471 – `os.scandir()` 함수 – 더 좋고 빠른 디렉토리 이터레이터

*   **작성자:** Ben Hoyt
*   **BDFL-Delegate:** Victor Stinner
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2014년 5월 30일
*   **Python 버전:** 3.5

### 요약 (Abstract)
이 PEP는 표준 라이브러리에 새로운 디렉토리 순회 함수인 `os.scandir()`를 포함할 것을 제안합니다. 이 새로운 함수는 유용한 기능을 추가하고, 대부분의 경우 `os.stat()` 호출을 피함으로써 `os.walk()`의 속도를 2배에서 20배까지 (플랫폼 및 파일 시스템에 따라 다름) 향상시킵니다.

### 제안 배경 (Rationale)
Python의 내장 함수 `os.walk()`는 각 디렉토리에서 `os.listdir()`를 호출하는 것 외에도, 각 파일에 대해 `stat()` 시스템 호출 또는 `GetFileAttributes()`를 실행하여 해당 항목이 디렉토리인지 여부를 확인하기 때문에 필요 이상으로 느립니다.

그러나 하위 시스템 호출(Windows의 `FindFirstFile`/`FindNextFile`, POSIX 시스템의 `readdir`)은 이미 반환된 파일이 디렉토리인지 아닌지를 알려주므로 추가적인 시스템 호출이 필요하지 않습니다. 또한, Windows 시스템 호출은 파일 크기 및 최종 수정 시간과 같은 `stat_result` 객체에 대한 모든 정보를 디렉토리 항목에서 반환합니다.

요약하자면, `os.walk()`와 같은 트리 함수에 필요한 시스템 호출 수를 약 2N에서 N으로 줄일 수 있습니다. 여기서 N은 트리에 있는 전체 파일 및 디렉토리 수입니다. 실제로 이러한 추가 시스템 호출을 제거하면 Windows에서는 `os.walk()`가 약 8~9배, POSIX 시스템에서는 약 2~3배 빨라집니다.

`os.listdir()`의 버전 중에는 큰 디렉토리를 순회할 때 메모리 효율성을 향상시키기 위해 파일 이름을 한 번에 큰 리스트로 반환하는 대신, 순회하면서 하나씩 yield하는 것을 선호하는 개발자들이 많습니다. `os.scandir()`는 이러한 요구도 충족시킵니다.

따라서 `scandir()` 이터레이터 함수를 직접 호출하는 기능을 제공할 뿐만 아니라, Python의 기존 `os.walk()` 함수도 엄청나게 가속화될 수 있습니다.

### 구현 (Implementation)
이 제안의 구현은 Ben Hoyt(초기 버전)와 Tim Golden(C 확장 모듈에 많은 도움을 줌)에 의해 작성되었습니다. GitHub의 `benhoyt/scandir`에서 확인할 수 있습니다. 이 모듈은 이미 여러 곳에서 사용 및 테스트되었으며("Use in the wild" 섹션 참조), 단순한 개념 증명(proof-of-concept) 이상입니다. 그러나 표준 라이브러리에 포함되기 전에 더 많은 정리와 철저한 테스트, 그리고 `posixmodule.c`와의 통합이 필요했습니다.

### 제안의 구체적인 내용 (Specifics of proposal)

#### `os.scandir()`
이 PEP는 표준 라이브러리의 `os` 모듈에 단일 함수 `scandir`를 추가할 것을 제안합니다. 이 함수는 단일의 선택적 문자열 인수를 받습니다.

```python
scandir(path='.') -> generator of DirEntry objects
```

`listdir`와 마찬가지로, `scandir`는 운영 체제의 디렉토리 순회 시스템 호출을 사용하여 주어진 `path` 내의 파일 이름을 가져오지만, 두 가지 면에서 `listdir`와 다릅니다.

1.  **`DirEntry` 객체 반환:** 단순히 파일 이름 문자열을 반환하는 대신, 파일 이름 문자열을 보유하고 운영 체제가 반환했을 수 있는 추가 데이터에 접근할 수 있는 간단한 메서드를 제공하는 경량 `DirEntry` 객체를 반환합니다.
2.  **제너레이터 반환:** 전체 리스트를 즉시 반환하는 대신 제너레이터를 반환하므로, `scandir`는 진정한 이터레이터 역할을 합니다.

`scandir()`는 `path` 내의 각 파일 및 하위 디렉토리에 대해 `DirEntry` 객체를 yield합니다. `listdir`와 마찬가지로 `'.'` 및 `'..'` 의사(pseudo) 디렉토리는 건너뛰고, 항목들은 시스템 의존적인 순서로 yield됩니다. 각 `DirEntry` 객체는 다음 속성 및 메서드를 가집니다.

*   `name`: 엔트리의 파일 이름 (상대 경로). `os.listdir()`의 반환 값에 해당합니다.
*   `path`: 엔트리의 전체 경로 이름 (반드시 절대 경로는 아님). `os.path.join(scandir_path, entry.name)`와 동일합니다.
*   `inode()`: 엔트리의 inode 번호를 반환합니다. 결과는 `DirEntry` 객체에 캐시됩니다.
*   `is_dir(*, follow_symlinks=True)`: `pathlib.Path.is_dir()`와 유사하지만, 반환 값은 `DirEntry` 객체에 캐시됩니다. 대부분의 경우 시스템 호출이 필요하지 않습니다. `follow_symlinks`가 `False`이면 심볼릭 링크를 따르지 않습니다.
*   `is_file(*, follow_symlinks=True)`: `pathlib.Path.is_file()`와 유사하지만, 반환 값은 `DirEntry` 객체에 캐시됩니다. 대부분의 경우 시스템 호출이 필요하지 않습니다. `follow_symlinks`가 `False`이면 심볼릭 링크를 따르지 않습니다.
*   `is_symlink()`: `pathlib.Path.is_symlink()`와 유사하지만, 반환 값은 `DirEntry` 객체에 캐시됩니다. 대부분의 경우 시스템 호출이 필요하지 않습니다.
*   `stat(*, follow_symlinks=True)`: `os.stat()`와 같지만, 반환 값은 `DirEntry` 객체에 캐시됩니다. Windows에서는 시스템 호출이 필요하지 않습니다 (심볼릭 링크 제외). `follow_symlinks`가 `False`이면 심볼릭 링크를 따르지 않습니다 (`os.lstat()`와 유사).

모든 메서드는 경우에 따라 시스템 호출을 수행할 수 있으며, 따라서 `OSError`를 발생시킬 수 있습니다. `DirEntry`의 속성 및 메서드 이름은 일관성을 위해 가능한 한 새로운 `pathlib` 모듈의 이름과 동일하게 선택되었습니다.

#### `os.walk()`
이 제안의 일환으로, `os.walk()`도 `listdir()`와 `os.path.isdir()` 대신 `scandir()`를 사용하도록 수정됩니다. 이는 `os.walk()`의 속도를 크게 향상시킬 것입니다 (앞서 언급했듯이 시스템에 따라 2배에서 20배).

#### 예시 (Examples)

**1. 하위 디렉토리 순회:**
```python
import os

def subdirs(path):
    """주어진 경로 아래의 '.'으로 시작하지 않는 디렉토리 이름을 yield합니다."""
    for entry in os.scandir(path):
        if not entry.name.startswith('.') and entry.is_dir():
            yield entry.name
```
이 `subdirs()` 함수는 Windows와 POSIX 시스템 모두에서 `os.listdir()` 및 `os.path.isdir()`를 사용하는 것보다 `scandir`를 사용하면 특히 중간 또는 대규모 디렉토리에서 훨씬 빠릅니다.

**2. 디렉토리 트리의 전체 파일 크기 가져오기:**
```python
import os
import sys

def get_tree_size(path):
    """주어진 경로 및 하위 디렉토리의 파일 총 크기를 반환합니다."""
    total = 0
    for entry in os.scandir(path):
        try:
            is_dir = entry.is_dir(follow_symlinks=False)
        except OSError as error:
            print('Error calling is_dir():', error, file=sys.stderr)
            continue

        if is_dir:
            total += get_tree_size(entry.path)
        else:
            try:
                total += entry.stat(follow_symlinks=False).st_size
            except OSError as error:
                print('Error calling stat():', error, file=sys.stderr)
    return total
```
이 예시는 `is_dir()`의 `follow_symlinks` 매개변수 사용을 보여줍니다. 이와 같은 재귀 함수에서는 링크를 따라가지 않는 것이 일반적입니다. `get_tree_size()`는 Windows에서 엄청난 속도 향상을 얻지만, POSIX 시스템에서는 디렉토리 순회 함수가 크기 정보를 반환하지 않으므로 이 함수에서는 속도 향상이 없습니다. 예시의 두 번째 버전은 `OSError` 예외 처리를 추가하여 더 견고한 코드를 보여줍니다.

#### 캐싱에 대한 참고 사항 (Notes on caching)
`DirEntry` 객체는 상대적으로 간단합니다. `name`과 `path` 속성은 항상 캐시되며, `is_X` 및 `stat` 메서드는 해당 값을 캐시합니다 (Windows에서는 `FindFirstFile`/`FindNextFile`을 통해 즉시, POSIX 시스템에서는 첫 사용 시 `stat` 시스템 호출을 통해). 시스템에서 값을 다시 가져오지 않습니다.

이러한 이유로 `DirEntry` 객체는 순회 후 사용하고 버려지도록 의도되었으며, 오래 지속되는 데이터 구조에 저장하여 메서드를 계속해서 호출하는 용도가 아닙니다. 개발자가 "새로 고침" 동작을 원한다면 `pathlib.Path` 객체를 사용하거나, 매번 운영 체제에서 신선한 데이터를 가져오는 일반 `os.stat()` 또는 `os.path.getsize()` 함수를 호출해야 합니다.

#### 예외 처리에 대한 참고 사항 (Notes on exception handling)
`DirEntry.is_X()` 및 `DirEntry.stat()`는 속성이나 프로퍼티가 아닌 명시적인 메서드로, 저렴한 작업이 아닐 수 있으며 (자주 그렇지만) 시스템 호출을 수행할 수 있음을 명확히 합니다. 결과적으로 이러한 메서드는 `OSError`를 발생시킬 수 있습니다.

예를 들어, `DirEntry.stat()`는 POSIX 기반 시스템에서 항상 시스템 호출을 수행하며, `DirEntry.is_X()` 메서드는 `readdir()`가 `d_type`을 지원하지 않거나 `d_type`이 `DT_UNKNOWN` 값을 반환하는 경우 (특정 조건 또는 파일 시스템에서 발생할 수 있음) 시스템 호출을 수행할 수 있습니다.

일반적으로 이는 문제가 되지 않습니다. 예를 들어, 표준 라이브러리에 정의된 `os.walk()`는 `listdir()` 호출 주변의 오류만 catch합니다. `DirEntry.is_X` 메서드의 예외 발생 동작은 `pathlib`와 일치하므로 (권한 또는 기타 치명적인 오류의 경우에만 `OSError`를 발생시키고, 경로가 존재하지 않거나 손상된 심볼릭 링크인 경우 `False`를 반환함), `is_X()` 호출 주변에서 오류를 catch할 필요가 없는 경우가 많습니다.

그러나 사용자가 세밀한 오류 처리를 필요로 하는 경우, 모든 메서드 호출 주변에서 `OSError`를 catch하고 적절하게 처리하는 것이 바람직할 수 있습니다.

### 지지 (Support)
GitHub의 `scandir` 모듈은 여러 개발자에게서 포크되어 사용되었으며, `python-dev` 및 `python-ideas` 메일링 리스트에서도 `scandir`와 유사한 함수에 대한 직접적인 지지가 있었습니다. 주요 Python 개발자들 (Alyssa Coghlan, Tim Golden, Christian Heimes, Gregory P. Smith)이 이 제안에 긍정적인 의견을 표명했습니다. Guido van Rossum 또한 `scandir()`를 Python 3.5에 추가하는 것에 긍정적인 입장을 보였습니다.

### 실제 사용 사례 (Use in the wild)
`scandir` 구현은 유용하지만 "베타"로 명확히 표시되어 실제 사용량이 어느 정도인지는 불확실합니다. 하지만 Ben Hoyt는 이를 사용한 사람들의 여러 보고를 받았습니다. 예를 들어, 대용량 디렉토리 처리 시 `getdents`를 수정할 필요가 없게 되었거나, `os.listdir()` 대비 급진적인 성능 향상을 경험했다는 보고가 있습니다. 일부 사용자는 PyPI 패키지를 요청하여 현재 `scandir` PyPI 패키지가 존재합니다. 이 PEP가 `os.walk()`의 속도를 크게 향상시키기 때문에 수많은 개발자와 스크립트, 그리고 많은 프로덕션 코드가 혜택을 받을 것입니다.

### 거부된 아이디어 (Rejected ideas)

*   **이름:** `iterdir()`가 또 다른 유력한 이름 후보였지만, `scandir()`는 반환하는 객체가 (DirEntry 객체 vs 파일 이름 문자열) 상당히 다르기 때문에 이름의 차이로 이를 반영하는 것이 더 적절하다고 판단되었습니다.
*   **와일드카드 지원:** Windows의 `FindFirstFile`/`FindNextFile`이 와일드카드 (예: `*.jpg`)를 지원하므로 `scandir` 함수에 `windows_wildcard` 인수를 포함하는 것이 처음에는 좋은 아이디어로 여겨졌습니다. 그러나 Windows 와일드카드 매칭 규칙이 잘 문서화되어 있지 않고 까다로워 교차 플랫폼으로 에뮬레이션하기 어렵기 때문에 최종적으로는 거부되었습니다.
*   **메서드가 기본적으로 심볼릭 링크를 따르지 않도록 함:** 초기에는 `DirEntry` 메서드가 심볼릭 링크를 따르지 않았지만, Victor Stinner의 설득력 있는 주장에 따라 기본적으로 심볼릭 링크를 따르는 것이 더 좋다고 결정되었습니다. 이는 일반적인 사용 사례와 기존 `os.path.isdir()` 및 `pathlib.Path.is_dir()`의 선례에 부합하기 때문입니다.
*   **`DirEntry` 속성이 프로퍼티가 되도록 함:** `is_X()` 및 `stat()`가 프로퍼티였다면 "매우 저렴하거나 무료"인 작업을 나타내는 데 더 좋았을 수 있습니다. 그러나 `stat()`는 POSIX 시스템에서 OS 호출을 필요로 하고, `is_dir()` 등도 특정 조건에서 OS 호출을 수행할 수 있습니다. 또한, 속성 접근에서 `AttributeError`가 아닌 `OSError`가 발생하는 것은 혼란스러울 수 있으므로 메서드로 유지하는 것이 더 낫다고 판단되었습니다.
*   **`DirEntry` 필드가 "정적" 속성 전용 객체가 되도록 함:** `DirEntry` 객체가 `name`, `path`, `is_X`와 같은 정적 속성만 가지고 `st_X` 속성은 Windows에서만 존재하는 "OS 기능에 대한 얇은 래퍼" 솔루션이 제안되었습니다. 그러나 `is_dir`와 같은 속성이 POSIX에서 항상 존재하지 않으며, `hasattr()`로 확인하고 필요하면 `os.stat()`을 호출해야 하므로 사용하기 더 어려운 API가 될 것이라는 문제가 있었습니다.
*   **`DirEntry` 필드가 `ensure_lstat` 옵션이 있는 정적 객체가 되도록 함:** `DirEntry.is_X` 및 `DirEntry.lstat_result`를 프로퍼티로 만들고, `scandir()` 호출 시 `ensure_lstat=True`가 지정된 경우에만 `lstat_result`를 순회 시 채우는 옵션도 제안되었습니다. 이는 `stat` 결과를 쉽게 얻을 수 있다는 장점이 있지만, 순회 중에 `stat()`가 호출되어 `OSError`를 발생시킬 수 있어 세밀한 오류 처리가 복잡해진다는 단점이 있었습니다. 또한, `os.scandir()`는 코드를 빠르게 만들기 위해 작성되었는데, POSIX에서 항상 `os.lstat()`를 호출하는 것은 속도 향상을 가져오지 않습니다.
*   **반환 값이 `(name, stat_result)` 두 개의 튜플이 되도록 함:** 새로운 유형을 도입하지 않는다는 장점이 있었지만, POSIX 기반 시스템에서는 `stat_result`가 부분적으로만 채워져 실제 `stat_result` 객체와 다르다는 점을 문서화해야 하는 문제가 있었습니다. 또한, Python은 속성과 메서드를 가진 적절한 객체를 잘 지원하므로, 두 개의 튜플보다 더 합리적이고 간단한 API를 제공합니다.
*   **반환 값이 오버로드된 `stat_result` 객체가 되도록 함:** `name` 및 `path` 속성을 가진 오버로드된 `stat_result` 객체를 반환하는 것도 논의되었지만, 이는 이상한 오버로딩이며, 대부분의 `stat_result` 정보가 POSIX 시스템에서 `readdir()`에 의해 가져와지지 않는다는 문제가 있었습니다.
*   **반환 값이 `pathlib.Path` 객체가 되도록 함:** `scandir()`가 `pathlib.Path` 인스턴스를 반환하는 것이 좋은 아이디어처럼 보였지만, `pathlib.Path`의 `is_X()` 및 `stat()` 함수는 명시적으로 캐시되지 않는 반면, `scandir`는 원본 디렉토리 순회 시스템 호출에서 값을 반환하므로 캐시해야 합니다. `scandir`가 반환하는 `pathlib.Path` 인스턴스가 `stat` 값을 캐시하고 일반 `pathlib.Path` 객체는 그렇지 않다면 혼란스러울 것이기 때문에 Guido van Rossum은 `pathlib.Path` 객체의 `stat` 캐싱을 명시적으로 거부했습니다.

### 잠재적 개선 사항 (Possible improvements)
`scandir`에 대한 몇 가지 잠재적 개선 사항은 다음과 같습니다.

*   `Py_BEGIN_ALLOW_THREADS` 블록 당 `readdir`/`FindNextFile`을 약 50번 호출하여 C 확장 모듈에 더 오래 머물게 함으로써 `scandir`의 속도를 더 높일 수 있습니다.
*   `scandir`는 각 순회마다 메모리 할당 비용을 피하기 위해 프리 리스트(free list)를 사용할 수 있습니다.

### 이전 논의 (Previous discussion)
이 PEP와 `scandir`에 대한 논의는 2012년 11월 `python-ideas` 스레드에서 `os.walk()` 속도 향상에 대한 Ben Hoyt의 제안으로 시작되었습니다. 이후 `Python Issue 11406`, `python-dev` 스레드를 통해 `DirEntry`와 같은 객체 반환, `pathlib` 모듈과의 상호 작용, PEP 471의 API 세부 사항, 그리고 `DirEntry` 메서드가 심볼릭 링크를 기본적으로 따를지 여부 등에 대한 광범위한 논의가 이루어졌습니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.