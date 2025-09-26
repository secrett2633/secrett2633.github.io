---
title: "[Final] PEP 229 - Using Distutils to Build Python"
excerpt: "Python Enhancement Proposal 229: 'Using Distutils to Build Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/229/
toc: true
toc_sticky: true
date: 2025-09-26 16:51:00+0900
last_modified_at: 2025-09-26 16:51:00+0900
published: true
---
> **원문 링크:** [PEP 229 - Using Distutils to Build Python](https://peps.python.org/pep-0229/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Nov-2000

PEP 229: Distutils를 사용하여 Python 빌드

## 서론

`Modules/Setup` 메커니즘은 다음과 같은 몇 가지 문제점을 가지고 있었습니다:
*   모든 가능한 모듈을 얻으려면 `Modules/Setup` 파일의 특정 부분을 수동으로 주석 해제해야 했습니다.
*   `Setup` 파일을 새로운 버전의 Python으로 옮기는 작업은 번거로웠습니다. 새 모듈이 추가되었기 때문에 단순히 이전 버전을 복사할 수 없었고, 두 버전을 조정해야 했습니다.
*   사용자는 `zlib`와 같은 필요한 라이브러리가 어디에 설치되어 있는지 직접 파악해야 했습니다.

## 제안 (Proposal)

이 PEP는 Python과 함께 제공되는 모듈들을 빌드하는 데 Distutils를 사용하도록 제안합니다.

주요 변경 사항은 다음과 같이 여러 부분으로 나눌 수 있습니다:
*   Distutils가 모듈을 빌드하려면 일부 Python 모듈이 필요합니다. 최소한 `posix`, `_sre`, `string` 모듈이 필요하다고 여겨집니다.
    *   이 모듈들은 Distutils를 사용하기 전에 빌드되어야 하므로, `Modules/Makefile`에 하드와이어링되어 자동으로 빌드됩니다.
*   시스템에 설치된 라이브러리를 확인하고 가능한 한 많은 모듈을 컴파일하는 최상위 `setup.py` 스크립트가 작성됩니다.
*   `Modules/Setup` 파일은 유지되며, 이 파일의 설정은 `setup.py`의 기본 동작을 재정의합니다. 이를 통해 버그가 있는 것으로 알려진 모듈을 비활성화하거나 특정 컴파일 또는 링커 플래그를 지정할 수 있습니다. 그러나 `setup.py`가 올바르게 작동하는 일반적인 경우에는 `Setup` 파일의 모든 내용이 주석 처리된 상태로 유지됩니다.
*   다른 `Setup.*` 파일들은 더 이상 필요하지 않습니다. 자동적으로 `Setup` 파일을 생성하는 것이 없어지기 때문입니다.

이 패치는 Python 2.1에 적용되었으며 이후 수정되었습니다.

## 구현 (Implementation)

SourceForge의 패치 #102588에 제안된 패치가 포함되어 있습니다. 현재 패치는 변경 사항을 최대한 보수적으로 유지하고 가능한 한 적은 파일을 변경하여 패치를 되돌리기가 쉽도록 하고 있습니다. 예를 들어, 기존 빌드 메커니즘을 제거하려는 시도는 이루어지지 않았습니다. 이러한 단순화 작업은 패치가 확정된 후 베타 주기 후반이나 Python 2.2에서 진행될 수 있습니다.

이 패치는 다음과 같은 변경 사항을 적용합니다:
*   `distutils/sysconfig`에 필요한 일부 변경 사항을 적용합니다 (이는 별도로 커밋됩니다).
*   최상위 `Makefile.in`에서 "sharedmods" 타겟은 단순히 `./python setup.py build`를 실행하고, "sharedinstall"은 `./python setup.py install`을 실행합니다. "clobber" 타겟은 Distutils가 출력을 저장하는 `build/` 서브디렉토리도 삭제합니다.
*   `Modules/Setup.config.in`은 `gc` 및 `thread` 모듈에 대한 항목만 포함합니다. `readline`, `curses`, `db` 모듈은 이제 `setup.py`가 처리하는 역할이므로 제거됩니다.
*   `Modules/Setup.dist`는 이제 `_sre`, `posix`, `strop` 세 가지 모듈에 대한 항목만 포함합니다.
*   `configure` 스크립트는 `setup.cfg.in`으로부터 `setup.cfg`를 빌드합니다. 이는 서브디렉토리에서의 빌드 작업을 가능하게 하고, 구성된 설치 접두사를 얻기 위해 필요합니다.
*   소스 트리 최상위 디렉토리에 `setup.py`가 추가됩니다. `setup.py`는 가장 복잡하지는 않지만, 퍼즐의 가장 큰 부분입니다. `setup.py`는 `BuildExt` 클래스의 서브클래스를 포함하고, 모듈을 컴파일할 수 있는 시기를 파악하고 `exts` 목록에 추가하는 `detect_modules()` 메서드를 확장합니다.

## 미해결 과제 (Unresolved Issues)

*   3개의 하드와이어링된 모듈을 수동으로 `Makefiles`를 수정하지 않고 비활성화할 수 있도록 해야 하는가? [답변: 아니오.]
*   Distutils는 항상 모듈을 공유 라이브러리로 컴파일합니다. 결과 Python 바이너리에 정적으로 컴파일하는 것을 어떻게 지원할 것인가? [답변: Distutils로 Python 바이너리를 빌드하는 것은 가능하지만, 아직 아무도 구현하지 않았습니다. 언젠가 해야 할 일이지만, 최상위 `Makefile.pre.in`을 다루는 것으로 충분하기 때문에 시급한 우선순위는 아닙니다.]

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.