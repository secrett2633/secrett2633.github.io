---
title: "[Final] PEP 235 - Import on Case-Insensitive Platforms"
excerpt: "Python Enhancement Proposal 235: 'Import on Case-Insensitive Platforms'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/235/
toc: true
toc_sticky: true
date: 2025-09-26 17:03:34+0900
last_modified_at: 2025-09-26 17:03:34+0900
published: true
---
> **원문 링크:** [PEP 235 - Import on Case-Insensitive Platforms](https://peps.python.org/pep-0235/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 21-Feb-2001


# PEP 235 – 대소문자 구분 없는 플랫폼에서의 임포트 (Import on Case-Insensitive Platforms)

## 개요
PEP 235는 파일 시스템이 대소문자를 구분하지 않지만 보존하는(case-preserving, case-insensitive) 플랫폼(예: Windows, MacOS X HFS+, Cygwin)에서 Python의 `import` 문 동작을 변경하는 제안입니다. 이 PEP는 주로 Python 2.1 릴리스 과정에서 발생한 문제를 해결하고, 플랫폼 간 일관성을 확보하여 크로스-플랫폼(cross-platform) 호환성을 개선하는 것을 목표로 합니다.

## 배경 (Motivation)
다양한 운영체제는 파일 시스템의 파일명 대소문자 처리 방식이 다릅니다.

*   **대소문자 보존 및 구분 (Case-preserving, case-sensitive):** 대부분의 Unix 계열 시스템. `fiLe`로 파일을 생성하면 `fiLe`로 저장되고, `open("fiLe")`만 해당 파일을 엽니다. `open("file")`은 열지 못합니다.
*   **대소문자 보존 및 구분 안 함 (Case-preserving, case-insensitive):** Windows, MacOS X HFS+, Cygwin. `fiLe`로 파일을 생성하면 `fiLe`로 저장되지만, `open("fiLe")`, `open("file")` 등 대소문자를 무시한 모든 변형으로 파일을 열 수 있습니다.
*   **대소문자 파괴 및 구분 안 함 (Case-destroying, case-insensitive):** 일부 오래된 네트워크 파일 시스템. `fiLe`로 파일을 생성하면 `FILE`처럼 대소문자가 파괴되어 저장될 수 있으며, 모든 대소문자 변형으로 파일을 열 수 있습니다.

**중요:** Python은 파일 생성 시 대소문자 보존 여부 및 `open()` 함수가 대소문자 일치를 요구하는지 여부 등 플랫폼의 파일 시스템 규칙을 계속 따릅니다. 개발자는 항상 대소문자를 구분하는 것처럼 코딩해야 프로그램의 이식성(portability)이 보장됩니다.

이 PEP에서 제안하는 변경 사항은 **대소문자 보존 및 구분 안 함** 플랫폼(즉, 위 표의 "lower left box")에서 Python의 `import` 문 동작에만 해당됩니다.

## 기존 Windows의 `import` 동작 (Current Lower-Left Semantics - Windows)
Python 2.1에서 MacOS X HFS+ 및 Cygwin에 대한 지원이 새로 추가되면서 문제가 발생하기 전까지, Windows의 `import` 규칙은 다음과 같았습니다.

*   파일 시스템이 대소문자를 구분하지 않음에도 불구하고, Python은 기본적으로 대소문자를 구분하는 `import` 매칭을 고수했습니다.
*   만약 `sys.path`에 `FiLe.py`와 `file.py` 두 파일이 있고, `import file`을 시도했을 때 `FiLe.py`가 먼저 발견되면 `NameError`를 발생시켰습니다. 이때 `file.py`를 찾기 위해 진행하지 않았습니다.
*   **예외 1:** `sys.path`에서 첫 번째로 대소문자를 무시하고 일치하는 파일 이름이 모두 대문자(예: `FILE.PY`)인 경우, `import` 문에 사용된 대소문자와 관계없이 해당 파일을 자동으로 임포트했습니다. 이는 오래된 파일 시스템을 지원하기 위한 것이었지만, Windows에만 존재하는 예외였습니다.
*   **예외 2:** 환경 변수 `PYTHONCASEOK`가 존재하면, Python은 모든 종류의 첫 번째 대소문자를 무시한 일치를 자동으로 임포트했습니다.

이러한 Windows 규칙은 복잡하고 Unix 규칙과도 다르며, Windows 파일 시스템의 자연스러운 의미론(semantics)과도 일치하지 않아 사용자들에게 설명하기 어려웠습니다. 하지만 MacOS X HFS+ 및 Cygwin 포트가 등장하면서, 이들 플랫폼의 개발자들은 Windows 규칙을 선호하지 않았고, 모든 플랫폼에서 동일한 규칙을 적용하여 Python의 일관성을 유지할 필요성이 대두되었습니다.

## 제안된 새로운 `import` 동작 (Proposed Semantics)
**대소문자 보존 및 구분 안 함** 플랫폼(예: Windows, MacOS X HFS+, Cygwin)에 대해 제안되는 새로운 `import` 동작은 다음과 같습니다.

1.  **`PYTHONCASEOK` 환경 변수가 존재할 경우:** 이전과 동일하게 동작합니다. 모든 종류의 첫 번째 대소문자 무시 일치(case-insensitive match)를 조용히 수용합니다. 일치하는 것을 찾지 못하면 `ImportError`를 발생시킵니다.
2.  **`PYTHONCASEOK` 환경 변수가 없을 경우:** `sys.path`에서 첫 번째 **대소문자 구분 일치(case-sensitive match)**를 검색합니다. 일치하는 것을 찾지 못하면 `ImportError`를 발생시킵니다.

### 변경의 영향 및 이점
*   규칙 #2는 Unix에서 사용되는 규칙과 동일하므로, 크로스-플랫폼 이식성을 크게 향상시킬 것입니다.
*   Mac 및 Cygwin 개발자들이 원했던 규칙이며, 이들이 직접 구현하려 했던 강력한 이유가 있었습니다.
*   기존의 예외 없는 Windows `import` 동작에는 영향을 미치지 않습니다. 기존 `import`는 `sys.path`에서 대소문자를 구분하는 일치를 먼저 찾았고, 새로운 규칙에서도 마찬가지일 것입니다.
*   이전에 `NameError`나 `ImportError`를 발생시켰던 예외적인 Windows `import`는 이제 계속 검색을 시도하여 성공하거나 `ImportError`를 발생시킬 것입니다.
*   `PYTHONCASEOK` 변수는 Windows에 마운트된 대소문자를 파괴하는 파일 시스템을 지원하기 위해 필요하며, "자연스러운" Windows 동작을 선호하는 사용자들도 이를 설정하여 사용할 수 있습니다.

### 삭제되는 기능
*   모든 대문자 파일(예: `ALLCAPS.PY`)에 대한 자동 `import` 지원(기존 규칙의 예외 1)은 삭제될 예정입니다. 대소문자를 파괴하는 파일 시스템은 점점 사라지고 있으며, 이를 위한 지원은 복잡하기 때문입니다. `PYTHONCASEOK`를 통해 계속 지원은 하지만, 여러 개의 복잡한 해킹을 유지할 필요는 없다고 판단했습니다.

이 PEP는 Python 2.1의 중요한 변경 사항 중 하나로, 파일 시스템의 다양성 속에서 Python `import` 시스템의 일관성과 이식성을 높이는 데 기여했습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.