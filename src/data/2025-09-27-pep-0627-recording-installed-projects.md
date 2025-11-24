---
title: "[Final] PEP 627 - Recording installed projects"
excerpt: "Python Enhancement Proposal 627: 'Recording installed projects'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/627/
toc: true
toc_sticky: true
date: 2025-09-27 00:30:10+0900
last_modified_at: 2025-09-27 00:30:10+0900
published: true
---
> **원문 링크:** [PEP 627 - Recording installed projects](https://peps.python.org/pep-0627/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Jul-2020


# PEP 627 – 설치된 프로젝트 기록 (Recording installed projects)

## 요약 (Abstract)
이 PEP는 기존의 PEP 376(설치된 Python 배포판 데이터베이스, Database of Installed Python Distributions)을 상호 운용성 표준으로 재작성하여 명확히 하고 업데이트합니다. 표준의 공식 위치를 Python Packaging Authority (PyPA) 표준 저장소로 옮기고, 변경 사항에 대한 가이드라인을 설정합니다. 또한, 설치된 `.dist-info` 디렉터리 내의 두 파일인 `RECORD` (PEP 376에서는 필수라고 명시했지만 "시스템 패키지"의 경우 제외될 수 있다고 제안)와 `INSTALLER`를 선택 사항으로 만듭니다.

## 동기 (Motivation)
Python 패키징은 특정 도구(Setuptools 및 pip)에 의존하는 방식에서 벗어나, 다양한 도구와 도구에 구애받지 않는 상호 운용성 표준을 기반으로 하는 생태계로 발전하고 있습니다. PEP 376은 상호 운용성 표준으로 작성되지 않았습니다. 이 문서는 특정 도구 및 라이브러리의 구현 세부 사항을 설명하며, 사양이 불완전하여 구현에 따라 정의되는 동작의 여지가 많았습니다.

이 PEP는 PEP 376에서 표준을 "추출"하여 명확히 하고, 도구에 구애받지 않는 방식으로 재작성하는 것을 목표로 합니다. 이 PEP의 목적은 완벽한 표준이라기보다는 더 나은 표준을 만드는 것입니다. 일부 문제들은 추후 명확히 하는 것으로 남겨둡니다.

## 근거 변경 (Rationale Change)
PEP 376의 근거는 두 가지 문제에 중점을 두었습니다.
1. 프로젝트를 설치하는 방법이 너무 많아 상호 운용성이 어렵습니다.
2. 설치된 배포판에 대한 정보를 얻을 수 있는 API가 없습니다.

새 문서는 설치된 프로젝트에 대한 정보의 디스크 상 포맷에만 중점을 둡니다. 이 정보를 설치, 제거 또는 쿼리하는 API 제공은 도구에 의해 구현되도록 남겨둡니다.

## 표준 및 변경 프로세스 (Standard and Changes Process)
`Recording installed projects` (이전 명칭: `Database of Installed Python Distributions`)에 대한 공식 표준은 packaging.python.org의 문서입니다. 이 문서에 대한 모든 변경 사항(사소한 언어 또는 타이포그래피 수정 제외)은 PEP 프로세스를 통해 이루어져야 합니다.

이 문서는 규범적(normative)이며(이해를 돕기 위한 예시 포함), 이 PEP와 같이 이를 변경하는 PEP는 근거 및 호환성 고려 사항과 같이 오래될 것으로 예상되는 추가 정보를 포함합니다. 제안된 표준은 이 PEP와 함께 packaging.python.org에 풀 리퀘스트로 제출됩니다.

## 변경 사항 및 근거 (Changes and their Rationale)

### "설치된 프로젝트 기록"으로 명칭 변경 (Renaming to “Recording installed projects”)
표준의 이름이 `Database of Installed Python Distributions`에서 `Recording installed projects`로 변경되었습니다. 파일을 디스크의 알려진 위치에 두는 것을 "데이터베이스"라고 생각할 수도 있지만, 대부분의 사람이 이 용어를 들었을 때 생각하는 것과는 다릅니다. PyPA는 `Recording installed distributions`라는 제목 아래 PEP 376을 링크합니다.

PyPA 용어집은 "Distribution"(또는 Linux 배포판과의 혼동을 방지하기 위해 "Distribution Package")을 "버전이 지정된 아카이브 파일"로 정의합니다. 아카이브 파일 외에 Python 코드를 설치하는 다른 방법이 있을 수 있으므로, 문서에서는 "installed distribution" 대신 "installed project"를 사용합니다.

### 구현 세부 사항 제거 (Removal of Implementation Details)
모든 도구 및 라이브러리 특정 세부 사항이 제거되었습니다. 프로젝트가 설치되는 메커니즘도 제외되었으며, 문서는 최종 상태에 중점을 둡니다. 한 가지 예외는 `RECORD` 파일의 목적을 더 잘 설명하기 위해 제공되는 제거 알고리즘의 개요입니다. setuptools 및 distutils에 특정한 `.egg-info` 및 `.egg` 형식에 대한 참조는 제외됩니다.

### 추가 파일 명시적 허용 (Explicitly Allowing Additional Files)
`.dist-info` 디렉터리는 사양에 지정되지 않은 파일을 포함할 수 있도록 허용됩니다. 현재 도구들은 이미 이를 수행하고 있습니다. 사양의 메모에는 Wheel의 `.dist-info` 디렉터리에 있는 파일이 언급되어 있습니다. 현재 도구들은 이 파일들을 설치된 `.dist-info`로 복사합니다. 이는 향후 표준화 노력에서 고려해야 할 사항입니다.

### RECORD 파일의 명확화 (Clarifications in the RECORD File)
- CSV 다이얼렉트는 Python의 `csv` 모듈의 기본값으로 지정됩니다. 이는 파일 이름의 큰따옴표 및 줄 종결자 처리와 관련된 예외적인 경우를 해결합니다.
- `RECORD` 파일의 상대 경로의 "기준"은 도구별 `--install-lib` 및 `--prefix` 옵션이 아닌 `.dist-info` 디렉터리를 기준으로 지정됩니다.
- 해시 및 크기 필드는 이제 선택 사항입니다(모든 파일에 대해, `.pyc`, `.pyo`, `RECORD` 자체뿐만 아니라). `.pyc` 및 `RECORD` 자체를 제외하고는 이들을 생략하는 것은 권장되지 않습니다.
- 새 사양은 이제 `RECORD` 파일에 설치된 프로젝트의 모든 파일을 포함해야 한다고 명시적으로 언급합니다(`.pyc` 파일에 대한 예외는 유지됩니다). 도구가 `RECORD` 파일을 제거에 사용하기 때문에 불완전한 파일 목록은 사용자 환경에 고아 파일(orphaned files)을 발생시킬 수 있습니다.
- 파일의 주요 목적과 내용을 명확히 하기 위해 제거 알고리즘의 개요가 포함되어 있습니다.
- 도구는 `RECORD` 파일이 없는 프로젝트를 제거/삭제해서는 안 됩니다(Linux 배포판의 시스템 패키지 관리자와 같은 외부 정보가 없는 경우).
- Windows에서 `RECORD` 파일의 경로 구분자는 `/` 또는 `\` 모두 가능합니다. PEP 376은 이에 대해 명확하지 않았습니다.

### RECORD 파일 선택 사항 (Optional RECORD File)
`RECORD` 파일은 선택 사항으로 지정됩니다. 모든 도구가 Python 특정 형식으로 설치된 파일 목록을 쉽게 생성할 수 있는 것은 아닙니다.

특히, `RECORD` 파일은 Linux 시스템 패키징 시스템에 의해 프로젝트가 설치될 때 불필요합니다. 이러한 시스템은 파일 추적, 제거 또는 무결성 검사를 위한 자체적인 방법을 가지고 있습니다. `RECORD` 파일을 디스크 및 시스템 패키지 데이터베이스와 동기화 상태로 유지하는 것은 비합리적으로 취약하며, 현실과 일치하지 않는 `RECORD` 파일보다 없는 것이 낫습니다.

### INSTALLER 파일 선택 사항 (Optional INSTALLER File)
`INSTALLER` 파일 또한 선택 사항이며, 정보 제공 목적으로만 사용되도록 지정됩니다. 여전히 설치 프로그램의 이름을 포함하는 단일 라인 텍스트 파일입니다.

이 파일은 원래 Python 설치 프로그램(`pip`)에 의해 설치된 프로젝트와 다른 패키지 관리자(예: `dnf`)에 의해 설치된 프로젝트를 구별하기 위해 추가되었습니다. `pip`이 설치하지 않은 패키지를 업데이트하거나 제거하는 것을 방지하기 위해 이 파일을 사용하려는 시도가 있었습니다.

이 PEP의 목표는 상호 운용되는 도구를 지원하는 것이며, 어떤 도구가 패키지를 설치했는지에 따라 어떤 조치를 취하는 것은 그 목표에 반합니다. 설치 프로그램 이름에 의존하는 대신, 도구는 기능 감지(feature detection)를 사용해야 합니다. 현재 문서는 Python 도구로 프로젝트를 건드릴 수 없게 만드는 조악한 방법으로 `RECORD` 파일을 생략하는 것을 제안합니다.

한편, 설치 프로그램 이름은 사용자에게 힌트를 제공하는 데 유용할 수 있습니다. 이 파일의 새로운 목적에 맞추기 위해, 새 사양은 `INSTALLER`에 소문자 식별자 대신 모든 ASCII 문자열을 허용합니다. 또한 가능한 경우 명령줄 명령을 사용할 것을 제안합니다.

### REQUESTED 파일: 사양에서 제거 (The REQUESTED File: Removed from Spec)
`REQUESTED` 파일은 이제 도구별 확장으로 간주됩니다.

PEP 376에 따르면, `REQUESTED`는 프로젝트가 다른 프로젝트의 의존성을 충족시키기 위해 자동으로 설치된 것이 아니라 사용자 요청에 의해 직접 설치되었을 때 작성되어야 했습니다. 이 마커 파일이 없는 프로젝트는 더 이상 필요하지 않을 때 제거될 수 있었습니다.

표준에도 불구하고, 많은 기존 설치 프로그램(이전 버전의 `pip` 포함)은 이 파일을 작성하지 않습니다. "더 이상 필요하지 않을 때 제거해도 되는" 프로젝트와 `REQUESTED`를 무시하는 도구에 의해 단순히 설치된 프로젝트 사이에는 구별이 없습니다. 따라서 이 파일은 현재 의도된 목적으로 사용될 수 없습니다(도구가 추가적인, 비표준 정보를 사용할 수 없는 한).

### 명확화 (Clarifications)
가능한 경우, 용어(예: `name` 및 `version`)는 기존 사양에 대한 참조를 통해 한정됩니다.

### 연기된 아이디어 (Deferred Ideas)
이 PEP의 범위를 제한하기 위해, 일부 개선 사항은 명시적으로 향후 PEP로 남겨집니다.
- `RECORD` 파일의 인코딩
- `.dist-info`에 나타날 수 있는 파일의 제한 또는 네임스페이스 지정
- 사용자 요청에 의해 직접 설치된 프로젝트와 의존성을 충족시키기 위해 설치된 프로젝트 간의 차이점 표시, 후자는 더 이상 필요하지 않을 때 제거될 수 있도록 합니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.