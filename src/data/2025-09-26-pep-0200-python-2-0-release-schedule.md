---
title: "[Final] PEP 200 - Python 2.0 Release Schedule"
excerpt: "Python Enhancement Proposal 200: 'Python 2.0 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/200/
toc: true
toc_sticky: true
date: 2025-09-26 16:09:15+0900
last_modified_at: 2025-09-26 16:09:15+0900
published: true
---
> **원문 링크:** [PEP 200 - Python 2.0 Release Schedule](https://peps.python.org/pep-0200/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 12-Jul-2000


 PEP 200은 Python 2.0 릴리스 일정을 설명하며, 주요 새 기능의 상태와 소유권을 추적하고, 메일링 리스트 포럼에서 진행된 논의를 요약하며, 추가 정보, 패치 및 기타 미해결 문제에 대한 URL을 제공합니다.

## PEP 200 – Python 2.0 릴리스 일정

*   **작성자:** Jeremy Hylton
*   **상태:** 최종 (Final)
*   **유형:** 정보 (Informational)
*   **주제:** 릴리스 (Release)
*   **작성일:** 2000년 7월 12일
*   **Python 버전:** 2.0

### 서론

이 PEP는 Python 2.0의 릴리스 일정을 기술하고, 주요 신규 기능의 상태와 소유권을 추적하며, 메일링 리스트 포럼에서 진행된 논의를 요약하고, 추가 정보, 패치 및 미해결 문제에 대한 URL을 제공합니다. 이 파일의 CVS 개정 기록(revision history)은 확정적인 역사적 기록을 담고 있습니다.

### 릴리스 일정

*   2000년 9월 26일: 2.0 beta 2
*   2000년 10월 9일: 2.0 release candidate 1 (2.0c1)
*   2000년 10월 16일: 2.0 final

### 이전 주요 단계 (Previous milestones)

*   2000년 8월 14일: 모든 2.0 PEP 완료 / 기능 동결 (feature freeze)
*   2000년 9월 5일: 2.0 beta 1

### 릴리스 후보 1 (release candidate 1)이란?

릴리스 후보 1(release candidate 1)은 Python 2.0 최종 릴리스를 위해 수정할 예정인 모든 알려진 버그를 해결할 것으로 예상됩니다. 이 릴리스는 이전 베타 버전보다 더 안정적이어야 합니다. 최종 릴리스 전에 더 광범위한 테스트를 거치기 위해 이 릴리스 후보를 발표하며, 만약 릴리스 후보 테스터들에 의해 심각한 버그가 발견되지 않는 한 최종 릴리스는 이 버전과 동일할 것입니다.

### 패치 제출 및 변경 사항 적용을 위한 지침

변경 사항을 커밋(commit)할 때는 "상식 (good sense)"을 따르세요. 몇 가지 구체적인 예시는 다음과 같습니다:

*   dictator(당시 Guido van Rossum)가 지시하는 모든 것을 따르십시오.
*   논란의 여지가 있는 변경 사항은 `python-dev` 메일링 리스트에서 먼저 논의하십시오. 많은 `+1` 투표와 `0`개의 `-1` 투표를 받으면 변경을 진행하고, `-1` 투표가 있다면 다시 생각해보고 Guido의 의견을 구하는 것을 고려하십시오.
*   자신이 기여한 코드에 대한 변경이라면 직접 수정하는 것이 합리적입니다. 다른 사람이 작성한 코드에 영향을 미치는 변경이라면 먼저 해당 작성자에게 문의하는 것이 좋습니다. SF Patch Manager를 사용하여 패치를 제출하고 검토를 위해 다른 사람에게 할당할 수 있습니다.
*   중요한 새 기능은 PEP에 기술되고 승인된 후에만 체크인(check in)되어야 합니다.
*   새 모듈이나 대규모 패치와 같은 중요한 코드 추가는 회귀 테스트(regression test)를 위한 테스트 케이스와 문서를 포함해야 합니다. 테스트와 문서가 준비될 때까지 패치를 체크인해서는 안 됩니다.
*   버그를 수정하는 경우, 해당 버그를 잡을 수 있었을 테스트 케이스를 작성해야 합니다.
*   SF Patch Manager에서 패치를 커밋하거나 Jitterbug 데이터베이스에서 버그를 수정하는 경우, CVS 로그 메시지에 패치/버그 번호를 반드시 참조하십시오. 또한 패치 관리자 또는 버그 데이터베이스(접근 권한이 있는 경우)의 상태를 변경해야 합니다.
*   체크인된 코드가 회귀 테스트 실패를 유발하는 것은 용납되지 않습니다. 체크인이 실패를 유발하는 경우 24시간 이내에 수정해야 하며, 그렇지 않으면 되돌려질(backed out) 것입니다.
*   모든 기여된 C 코드는 ANSI C 표준을 따라야 합니다. 가능하다면 `gcc`와 `MSVC`와 같은 두 가지 다른 컴파일러로 확인하십시오.
*   모든 기여된 Python 코드는 Guido의 Python 스타일 가이드(`http://www.python.org/doc/essays/styleguide.html`)를 따라야 합니다.
*   기여된 모든 코드는 오픈 소스 라이선스(Open Source license)로 릴리스될 것임을 이해합니다. 이러한 방식으로 릴리스될 수 없는 코드는 기여하지 마십시오.

### 실패하는 테스트 케이스는 수정되어야 합니다 (Failing test cases need to get fixed)

회귀 테스트 스위트(regression test suite)의 오류를 신속하게 해결해야 합니다. 변경 사항이 적용된 후 회귀 테스트가 깨끗하게 실행되지 않는 한, 변경 사항을 CVS 트리에 커밋해서는 안 됩니다.

### Python 2.0 최종 릴리스 전에 해결해야 할 공개 항목 (Open items – Need to be resolved before 2.0 final release)

*   `cycle-gc`를 기본적으로 활성화할지 여부 결정.
*   핵심 `xml` 패키지와 `XML-SIG XML` 패키지 간의 호환성 문제 해결.
*   `list comprehensions`, `import as` 및 기타 새로운 언어 기능과 호환되도록 `Tools/compiler` 업데이트.
*   테스트 스위트의 코드 커버리지(code coverage) 개선.
*   2.0b1과 함께 출시된 기능에 대한 PEP 작성을 완료 (연습을 통해 더 잘하게 될 것이라는 언급).
*   버그 데이터베이스 크기를 줄이기 위한 주요 노력 (한 화면에 모든 오픈 버그가 보이도록 유지하면 사람들이 그렇게 유지하는 경향이 있다는 언급).

### 수락 및 진행 중인 항목 (Accepted and in progress)

현재 남아있는 항목 없음.

### 제안되었으나 수락 또는 거부되지 않은 항목 (Open: proposed but not accepted or rejected)

다수의 미해결 패치들이 있으며, 곧 처리해야 합니다.

### 이전에 실패했던 테스트 케이스 (Previously failing test cases)

이 섹션과 이전 섹션 사이를 오가는 테스트가 있다면, 해당 코드는 문제가 있는 것입니다. (예시로 `test_fork1`, `test_parser`, `test_posixpath`, `test_popen2`, `test_winreg`, `test_mmap`, `test_longexp`, `test_winreg2` 등의 테스트 케이스가 언급되며, 각각의 플랫폼, 보고일, 해결 내용 등이 기록되어 있습니다.)

### 완료/수정된 공개 항목 (Open items – completed/fixed)

*   `PyErr_Format` - Fredrik Lundh: 버퍼 오버플로우로부터 안전하게 만듦.
*   Linux용 `popen2` 지원 추가 - Fred Drake.
*   `SocketServer`의 버퍼링 문제 처리.
*   Windows ME: 설치 프로그램 실행 여부 및 `w9xpopen` 핵 필요 여부. (완료됨; 여러 Windows 버전에서 테스트됨)
*   Windows 설치 프로그램: HKLM이 쓰기 불가능할 경우 HKCU로 대체 (NT 및 2000에서 관리자 권한 없이 Python 설치 가능하도록).
*   Windows 설치 프로그램: `w9xpopen.exe`는 Win95/98에서만 설치.
*   Windows: HKLM 전에 HKCU에서 레지스트리 정보 찾기 - Mark Hammond.
*   `winreg.py` 및 `test_winreg2.py` 제거 - Paul Prescod (저자)가 MS .NET API와 유사한 레지스트리 API를 원했으나, 2.0까지 완료하기 불분명했고, `winreg.py`가 일단 출시되면 영원히 유지될 것이므로 제거됨.
*   Win98 Guido: `popen`이 Guido의 시스템에서 멈추고 전체 시스템을 프리징시키는 문제. Norton Antivirus 2000 (6.10.20) on Windows 9x가 원인이었으며, 바이러스 보호를 비활성화하여 해결.

### 수락 및 완료된 항목 (Accepted and completed)

*   `x` 이스케이프의 의미 변경 - PEP 223 - Fredrik Lundh.
*   `u""` 문자열에 `U1234678` 이스케이프 추가 - Fredrik Lundh.
*   opcode 인수가 `2**16` 초과하는 경우 지원 - Charles Waldman.
*   `import as` - Thomas Wouters: `import` 및 `from ... import` 메커니즘을 확장하여 심볼을 다른 이름으로 임포트할 수 있도록 함 (새 키워드 추가 없이).
*   `List comprehensions` - Skip Montanaro.
*   이전 `os.path.commonprefix` 동작 복원.
*   모든 플랫폼에서 작동하는 테스트 케이스 확보 여부.
*   Tim O'Malley의 `cookie` 모듈 (좋은 라이선스와 함께).
*   Lockstep iteration (`zip` 함수) - Barry Warsaw.
*   SRE (정규 표현식 엔진) - Fredrik Lundh.
*   `xrange` 인쇄 동작 수정 - Fred Drake: `xrange` 유형의 `tp_print` 핸들러를 제거하여 `xrange(...)` 대신 목록 표시가 되는 문제를 해결. 새로운 코드는 `repr()`을 더 읽기 쉽게 만들고 대화형 인터프리터에서 `xrange` 객체를 명확하게 만듦.
*   확장된 `print` 문 - Barry Warsaw.
*   `poll` 시스템 호출 인터페이스 - Andrew Kuchling.
*   Augmented assignment (`+=` 및 관련 연산자, Python 및 C 훅, API 함수) - Thomas Wouters.
*   `gettext.py` 모듈 - Barry Warsaw.

### 연기된 항목 (Postponed)

*   리스트에 대한 확장 슬라이싱 (Extended slicing on lists) - Michael Hudson: 리스트(및 기타 내장 타입)가 확장 슬라이스를 처리하도록 만듦.
*   유니코드 데이터베이스 압축 (Compression of Unicode database) - Fredrik Lundh. (2.0b1용. 2.0에 버그 수정으로 포함될 수도 있음).
*   Range literals - Thomas Wouters: 제안에 대한 의문이 많아 결국 제외됨.
*   `SET_LINENO` opcode 제거 - Vladimir Marangozov: `SET_LINENO` 명령어 대신 코드 객체의 `lnotab`을 사용하여 달성된 작은 최적화. 디버거를 지원하기 위해 코드 재작성 기법을 사용 (Guido는 이에 대해 반대).

### 거부된 항목 (Rejected)

*   `indexing-for` - Thomas Wouters: `for` 루프에서 Python 코드가 루프 카운터에 접근할 수 있도록 하는 특수 구문 (새 키워드 추가 없이).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.