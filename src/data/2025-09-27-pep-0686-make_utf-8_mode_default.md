---
title: "[Accepted] PEP 686 - Make UTF-8 mode default"
excerpt: "Python Enhancement Proposal 686: 'Make UTF-8 mode default'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/686/
toc: true
toc_sticky: true
date: 2025-09-27 10:12:32+0900
last_modified_at: 2025-09-27 10:12:32+0900
published: true
---
> **원문 링크:** [PEP 686 - Make UTF-8 mode default](https://peps.python.org/pep-0686/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 18-Mar-2022


## PEP 686 – UTF-8 모드 기본값으로 설정

-   **작성자**: Inada Naoki
-   **상태**: Accepted (승인됨)
-   **유형**: Standards Track (표준 트랙)
-   **생성일**: 2022년 3월 18일
-   **Python 버전**: 3.15
-   **해결**: Discourse 메시지

### 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 Python의 UTF-8 모드를 기본값으로 활성화할 것을 제안합니다. 이 변경으로 인해, 파이썬은 파일, 표준 입출력(stdio), 그리고 파이프(pipe)의 기본 인코딩으로 일관되게 UTF-8을 사용하게 됩니다.

### 동기 (Motivation)

UTF-8은 사실상 텍스트 인코딩의 표준이 되었습니다.

*   Python 소스 파일의 기본 인코딩은 UTF-8입니다.
*   JSON, TOML, YAML과 같은 데이터 형식은 UTF-8을 사용합니다.
*   Visual Studio Code 및 Windows 메모장을 포함한 대부분의 텍스트 에디터가 기본적으로 UTF-8을 사용합니다.
*   대부분의 웹사이트와 인터넷상의 텍스트 데이터는 UTF-8을 사용합니다.
*   Node.js, Go, Rust, Java를 포함한 많은 인기 프로그래밍 언어도 기본적으로 UTF-8을 사용합니다.

파이썬의 기본 인코딩을 UTF-8로 변경하면 이러한 다른 시스템 및 언어와의 상호 운용성이 더욱 쉬워집니다.

또한, 유닉스(Unix)를 사용하는 많은 파이썬 개발자들이 기본 인코딩이 플랫폼에 따라 다르다는 사실을 잊곤 합니다. 그들은 UTF-8로 인코딩된 텍스트 파일(예: JSON, TOML, Markdown, Python 소스 파일)을 읽을 때 `encoding="utf-8"` 옵션을 생략하는 경우가 많습니다. 이러한 일관성 없는 기본 인코딩은 많은 버그를 유발합니다.

### 명세 (Specification)

#### UTF-8 모드 기본값으로 활성화 (Enable UTF-8 mode by default)

Python 3.15부터 파이썬은 기본적으로 UTF-8 모드를 활성화합니다.

사용자는 `PYTHONUTF8=0` 환경 변수를 설정하거나 `-X utf8=0` 옵션을 사용하여 여전히 UTF-8 모드를 비활성화할 수 있습니다.

#### `locale.getencoding()`

UTF-8 모드는 `locale.getpreferredencoding(False)`에 영향을 미치므로, UTF-8 모드와 관계없이 로케일(locale) 인코딩을 가져올 수 있는 API가 필요합니다.

이를 위해 `locale.getencoding()` API가 추가됩니다. 이 함수도 로케일 인코딩을 반환하지만, UTF-8 모드의 영향을 무시합니다.

`warn_default_encoding` 옵션이 지정되면, `locale.getpreferredencoding()`은 `open()` 함수와 유사하게 `EncodingWarning`을 발생시킬 것입니다 (PEP 597 참조). 이 API는 Python 3.11에 추가되었습니다.

#### `encoding="locale"` 옵션 수정 (Fixing encoding="locale" option)

PEP 597은 `TextIOWrapper`에 `encoding="locale"` 옵션을 추가했습니다. 이 옵션은 로케일 인코딩을 명시적으로 지정하는 데 사용됩니다. `TextIOWrapper`는 기본 텍스트 인코딩과 관계없이 이 옵션이 지정되면 로케일 인코딩을 사용해야 합니다.

하지만 현재는 `encoding="locale"`이 지정되더라도 UTF-8 모드에서는 `TextIOWrapper`가 "UTF-8"을 사용합니다. 이 동작은 PEP 597의 동기와 일치하지 않습니다. 이는 파이썬이 기본 텍스트 인코딩을 변경할 때 UTF-8 모드를 기본값으로 만들 것을 예상하지 못했기 때문입니다.

이러한 불일치는 UTF-8 모드를 기본값으로 만들기 전에 수정되어야 합니다. `TextIOWrapper`는 UTF-8 모드에서도 `encoding="locale"`이 전달될 때 로케일 인코딩을 사용해야 합니다. 이 문제는 Python 3.11에서 수정되었습니다.

### 하위 호환성 (Backward Compatibility)

대부분의 유닉스(Unix) 시스템은 UTF-8 로케일을 사용하며, 로케일이 C 또는 POSIX일 때 파이썬은 UTF-8 모드를 활성화합니다. 따라서 이 변경 사항은 주로 윈도우(Windows) 사용자에게 영향을 미칩니다.

파이썬 프로그램이 기본 인코딩에 의존하는 경우, 이 변경으로 인해 `UnicodeError`, 깨진 문자(mojibake) 또는 심지어 조용한 데이터 손상이 발생할 수 있습니다. 따라서 이 변경 사항은 크게 공지되어야 합니다.

이러한 하위 호환성 문제를 해결하기 위한 지침은 다음과 같습니다:

1.  **UTF-8 모드 비활성화**: `PYTHONUTF8=0` 또는 `-X utf8=0`을 사용하여 UTF-8 모드를 비활성화합니다.
2.  **`EncodingWarning` 사용**: `EncodingWarning` (PEP 597)을 사용하여 UTF-8 모드가 영향을 미치는 모든 위치를 찾습니다.
3.  **인코딩 옵션 명시**:
    *   `encoding` 옵션이 생략된 경우, `encoding="utf-8"` 또는 `encoding="locale"` 사용을 고려합니다.
    *   `locale.getpreferredencoding()`이 사용된 경우, `"utf-8"` 또는 `locale.getencoding()` 사용을 고려합니다.
4.  **UTF-8 모드로 애플리케이션 테스트**: 변경 사항을 적용한 후 UTF-8 모드를 활성화하여 애플리케이션을 테스트합니다.

#### 선행 사례 (Preceding examples)

*   루비(Ruby)는 2020년 Ruby 3.0에서 윈도우 환경의 기본 `external_encoding`을 UTF-8로 변경했습니다.
*   자바(Java)는 2022년 JDK 18에서 기본 텍스트 인코딩을 UTF-8로 변경했습니다.

두 언어 모두 하위 호환성을 위한 옵션을 제공하지만, 파이썬의 PEP 597 `EncodingWarning`과 같은 경고는 제공하지 않습니다.

### 기각된 대안 (Rejected Alternative)

#### 암시적 인코딩 사용 중단 (Deprecate implicit encoding)

기본 인코딩 사용을 더 이상 권장하지 않는 방안이 고려되었습니다.

그러나 기본 인코딩이 ASCII 텍스트를 읽고 쓰는 데만 사용되는 경우가 많습니다. 또한, 이러한 경고는 유닉스에서 실행되는 비-크로스 플랫폼(non-cross platform) 애플리케이션에는 유용하지 않습니다.

따라서 사용자에게 모든 곳에서 인코딩을 명시하도록 강제하는 것은 너무 번거롭습니다. 많은 `DeprecationWarning`을 발생시키면 사용자들이 경고를 무시하게 될 것입니다.

PEP 387은 하위 호환되지 않는 변경 사항에 대해 경고를 추가하도록 요구하지만, `DeprecationWarning` 사용을 필수로 하지는 않습니다. 따라서 선택적 `EncodingWarning`을 사용하는 것은 PEP 387을 위반하지 않습니다.

자바(Java)도 JEP 400에서 이 아이디어를 기각했습니다.

#### 파이프(PIPE)에 `PYTHONIOENCODING` 사용 (Use PYTHONIOENCODING for PIPEs)

하위 호환성 문제를 완화하기 위해 `subprocess` 모듈의 파이프 기본 인코딩으로 `PYTHONIOENCODING`을 사용하는 방안이 고려되었습니다.

이 아이디어를 사용하면 사용자는 UTF-8 모드에서도 `subprocess.Popen(text=True)`에 레거시(legacy) 인코딩을 사용할 수 있습니다.

하지만 이 아이디어는 "기본 인코딩"을 복잡하게 만들고, 이 또한 하위 호환되지 않는 변경입니다.

따라서 이 아이디어는 기각되었습니다. 사용자는 `text=True`를 `encoding="utf-8"` 또는 `encoding="locale"`로 대체할 때까지 UTF-8 모드를 비활성화할 수 있습니다.

### 교육 방법 (How to teach this)

**새로운 사용자(New users)의 경우:** 이 변경은 가르쳐야 할 내용을 줄여줍니다. 사용자들은 첫해에 텍스트 인코딩에 대해 배울 필요가 없으며, 비-UTF-8 텍스트 파일을 사용해야 할 때 배우면 됩니다.

**기존 사용자(Existing users)의 경우:** "하위 호환성" 섹션을 참조하십시오.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(Public Domain)에 공개되거나 CC0-1.0-Universal 라이선스(둘 중 더 자유로운 조건)에 따라 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.