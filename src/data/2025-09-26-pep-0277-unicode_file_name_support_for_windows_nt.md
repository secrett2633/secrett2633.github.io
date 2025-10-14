---
title: "[Final] PEP 277 - Unicode file name support for Windows NT"
excerpt: "Python Enhancement Proposal 277: 'Unicode file name support for Windows NT'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/277/
toc: true
toc_sticky: true
date: 2025-09-26 17:54:18+0900
last_modified_at: 2025-09-26 17:54:18+0900
published: true
---
> **원문 링크:** [PEP 277 - Unicode file name support for Windows NT](https://peps.python.org/pep-0277/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-Jan-2002

PEP 277: Windows NT용 유니코드 파일명 지원

## 요약 (Abstract)
이 PEP는 Windows NT 운영체제에서 유니코드 파일명을 시스템의 와이드 문자(wide-character) 함수에 직접 전달하여, Windows NT에서 가능한 모든 파일에 접근할 수 있도록 지원하는 방안을 제안합니다.

## 도입 배경 (Rationale)
Python 2.2 버전은 Win32 플랫폼에서 `open` 함수와 `os` 모듈의 함수에 전달되는 유니코드 파일명을 운영체제에 전달하기 전에 'mbcs' 인코딩으로 변환했습니다. 이는 파일 생성 시 설정된 로케일과 스크립트 실행 시의 로케일이 동일한 일반적인 경우에는 성공적으로 작동했습니다. 그러나 사용자의 로케일이 자주 변경되거나, 서버 환경에서 다른 로케일을 사용하는 사용자들이 저장한 파일의 경우 문제가 발생할 수 있습니다.

Windows NT 및 그 후속 운영체제(Windows 2000, Windows XP 포함)에는 현재 로케일로는 표현할 수 없는 파일명을 포함하여 모든 파일명에 직접 접근할 수 있는 와이드 문자 API가 존재합니다. 이 제안의 목적은 표준 Python 파일 객체와 `posix` 모듈을 통해 이러한 와이드 문자 API에 접근하여 Windows NT의 모든 파일에 접근할 수 있도록 하는 것입니다.

## 상세 제안 (Specification)
와이드 문자 파일 API를 제공하는 Windows 플랫폼에서, 파일 API에 유니코드 인자가 제공될 경우 표준 C 라이브러리 및 `posix` 호출 대신 와이드 문자 호출이 이루어집니다.

Python 파일 객체는 유니코드 파일명 인자를 변환하지 않고 직접 사용하도록 확장됩니다. 이는 `file(filename[, mode[, bufsize]])` 생성자와 이 생성자의 별칭인 `open` 함수에 영향을 미칩니다. 유니코드 파일명 인자가 사용될 경우 파일 객체의 `name` 속성은 유니코드가 됩니다. 파일 객체의 표현 (`repr(f)`)은 유니코드 문자열의 표현 방식과 유사하게 유니코드 파일명을 이스케이프된 문자열로 표시합니다.

`posix` 모듈에는 파일 또는 디렉터리 이름을 인자로 받는 함수들(예: `chdir`, `listdir`, `mkdir`, `open`, `remove`, `rename`, `rmdir`, `stat`, `_getfullpathname`)이 포함되어 있습니다. 이 함수들은 유니코드 인자를 변환하지 않고 직접 사용합니다. `rename` 함수의 경우, 두 인자 중 하나라도 유니코드이고 다른 인자가 기본 인코딩을 사용하여 유니코드로 변환될 때 이 동작이 트리거됩니다.

`listdir` 함수는 현재 문자열 목록을 반환합니다. 이 제안에 따라, `path` 인자가 유니코드일 경우 유니코드 문자열 목록을 반환하게 됩니다.

## 제약 사항 (Restrictions)
Windows 95, Windows 98, Windows ME와 같은 일반 소비자용 Windows 운영체제에는 와이드 문자 파일 API가 없으므로 이 제안에 따른 동작 변경은 없습니다. 이러한 운영체제에서 사용되는 VFAT-32 파일 시스템은 유니코드 파일명을 지원하지만 접근이 어렵기 때문에, 향후 이 제안을 확장하여 이들 운영체제를 지원하려면 많은 작업이 필요할 수 있습니다. "Microsoft Layer for Unicode"가 구현의 시작점이 될 수 있습니다.

Python은 `PY_UNICODE_TYPE`을 4바이트 타입으로, `Py_UNICODE_SIZE`를 4로 정의하여 유니코드 문자의 크기를 2바이트 대신 4바이트로 컴파일할 수 있습니다. Windows API는 4바이트 문자를 허용하지 않으므로, 이 제안에 설명된 기능은 이 모드에서는 작동하지 않으며 현재의 'mbcs' 인코딩 기술로 폴백(fallback)됩니다. 이 제약 사항은 `PyUnicode_AsWideChar`를 사용하여 추가 변환을 수행함으로써 미래에 해제될 수 있지만, 현재로서는 매우 드물게 사용되는 기능에 비해 너무 많은 복잡성을 추가합니다.

## 참조 구현 (Reference Implementation)
구현은에서 확인할 수 있습니다.

## 참고 자료 (References)
 Microsoft Windows APIs
 https://github.com/python/cpython/issues/37017

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.