---
title: "[Superseded] PEP 431 - Time zone support improvements"
excerpt: "Python Enhancement Proposal 431: 'Time zone support improvements'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/431/
toc: true
toc_sticky: true
date: 2025-09-26 21:43:32+0900
last_modified_at: 2025-09-26 21:43:32+0900
published: true
---
> **원문 링크:** [PEP 431 - Time zone support improvements](https://peps.python.org/pep-0431/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 11-Dec-2012


# PEP 431 – 시간대 지원 개선

## 개요 (Abstract)

이 PEP는 Python 표준 라이브러리에 구체적인 시간대 지원을 구현하고, 일광 절약 시간(DST) 변경 시 모호한 시간 지정을 처리하기 위한 시간대 API 개선을 제안했습니다.

## 철회 (Withdrawal)

PEP 431은 오랜 논의 끝에 철회되었습니다. `datetime` 모듈의 구현에서 문제라고 생각했던 부분이 의도적인 설계 결정으로 밝혀졌기 때문입니다. 예를 들어, `datetime`은 시간대 산술(time zone arithmetic) 시 DST 전환을 완전히 무시하도록 설계되었으며, 모호한 `datetime`을 구분하지 않도록 의도되었습니다. 따라서 이 PEP에서 제안했던 `is_dst` 플래그는 유용한 기능을 할 수 없어 무의미해졌습니다.

**업데이트:** 이 PEP는 이후 **PEP 615 "표준 라이브러리의 IANA 시간대 데이터베이스 지원(Support for the IANA Time Zone Database in the Standard Library)"**에 의해 대체되었으며, 이 PEP 615에 따라 Python 3.9에 `zoneinfo` 모듈이 추가되었습니다.

## 제안 (Proposal)

### 구체적인 시간대 지원 (Concrete Time Zone Support)

Python의 표준 라이브러리는 고정 오프셋을 지원하는 `tzinfo` 베이스 클래스 외에 구체적인 시간대 구현을 제공하지 않았습니다. 시간대를 제대로 지원하려면 DST 변경을 포함하여 현재 및 과거의 모든 시간대에 대한 데이터베이스가 필요합니다. 그러나 이러한 정보는 자주 변경되므로, Python 릴리스에 포함되더라도 몇 달 안에 구식이 될 수 있습니다.

따라서 시간대 지원은 주로 `pytz`와 `dateutil`이라는 두 개의 서드파티 모듈을 통해서만 가능했습니다. 이 두 모듈은 "zoneinfo" 데이터베이스를 포함하고 래핑합니다. "tz" 또는 "The Olsen database"라고도 불리는 이 데이터베이스는 시간대에 대한 사실상의 표준이며, OS X를 포함한 대부분의 Unix 및 Unix 계열 운영 체제에 포함되어 있습니다.

이러한 배경을 바탕으로, PEP 431은 `zoneinfo` 데이터를 지원하는 코드를 표준 라이브러리에 포함하되, 기본적으로 운영 체제의 `zoneinfo` 데이터 사본을 사용하도록 제안했습니다. 운영 체제는 일반적으로 자체 업데이트 메커니즘을 통해 이 데이터를 최신 상태로 유지합니다.

Windows와 같이 `zoneinfo` 데이터베이스를 포함하지 않는 운영 체제의 경우, Python 소스 배포판에 `zoneinfo` 데이터베이스 사본이 포함되며, 최신 `zoneinfo` 데이터베이스를 포함하는 배포판은 Python Package Index에서도 제공되어 `easy_install` 또는 `pip`과 같은 패키징 도구로 쉽게 설치할 수 있도록 제안되었습니다.

### 로컬 시간대 가져오기 (Getting the Local Time Zone)

Unix 시스템에서는 사용 중인 시간대의 이름을 찾는 표준적인 방법이 없습니다. EST, PDT와 같은 시간대 약어 정보만 제공되는데, 이 약어들은 모호한 경우가 많아 현재 위치한 시간대를 정확히 파악하기 어렵습니다.

그러나 컴파일된 시간대 정보는 `/etc/localtime`에 위치하므로, 시간대 이름을 모르더라도 올바른 시간대 정보를 가진 로컬 시간대 객체를 생성하는 것이 가능합니다. 이에 따라 `datetime` 모듈에 로컬 시간대를 반환하는 함수를 제공해야 한다고 제안되었습니다. 이 지원은 Lennart Regebro의 `tzlocal` 모듈을 새로운 `datetime` 모듈에 통합함으로써 이루어질 예정이었습니다.

Windows의 경우, 로컬 Windows 시간대 이름을 조회하고, Unicode 컨소시엄에서 제공하는 Windows 시간대 이름과 `zoneinfo` 시간대 이름 간의 매핑을 사용하여 `zoneinfo` 시간대로 변환하도록 제안되었습니다.

### 모호한 시간 처리 (Ambiguous Times)

일광 절약 시간(DST)이 해제될 때 시계는 한 시간 뒤로 돌아갑니다. 이로 인해 해당 시간 동안의 시간은 DST 적용 상태와 비적용 상태로 두 번 발생하게 됩니다. 반대로 DST가 시작될 때는 한 시간이 사라집니다.

기존의 시간대 API는 DST 전환 중 발생하는 두 가지 모호한 시간을 구별할 수 없었습니다. 예를 들어, 스톡홀름에서는 `2012-10-28 02:00:00`이 UTC 기준 `2012-10-28 00:00:00`과 `2012-10-28 01:00:00`에 두 번 발생합니다.

`pytz`는 이 문제를 해결하기 위해 `tzinfo` 객체의 여러 메서드에 `is_dst` 매개변수를 추가하여 필요할 때 시간을 명확하게 구분할 수 있도록 했습니다. PEP 431은 이러한 `is_dst` 매개변수를 `datetime` API의 관련 메서드에 추가하여 이 기능을 `datetime`에 직접 통합할 것을 제안했습니다.

## 구현 API (Implementation API)

### `zoneinfo` 데이터베이스 (The zoneinfo database)

Python 소스 제어 시스템의 `Lib/tzdata` 디렉터리에 최신 버전의 `zoneinfo` 데이터베이스를 포함하도록 제안되었습니다. 이 데이터베이스는 모든 Python 기능 및 버그 수정 릴리스 전에 업데이트되어야 합니다. 소스에서 설치할 때 이 데이터베이스의 설치를 활성화/비활성화하는 새로운 `configure` 옵션인 `--enable-internal-timezone-database` 및 `--disable-internal-timezone-database`가 구현될 예정이었습니다.

### `datetime` 모듈 변경 사항 (Changes in the datetime module)

새로운 시간대 지원의 공개 API는 하나의 새 클래스, 하나의 새 함수, 하나의 새 예외 및 네 개의 새 컬렉션을 포함할 예정이었습니다. 또한, `datetime` 객체의 여러 메서드에 새로운 `is_dst` 매개변수가 추가될 예정이었습니다.

#### 새 클래스 `dsttimezone`

이 클래스는 DST 지원을 구현하는 `tzinfo` 베이스 클래스의 구체적인 구현을 제공합니다.

#### 새 함수 `zoneinfo(name=None, db_path=None)`

이 함수는 유효한 `zoneinfo` 시간대(예: "US/Eastern", "Europe/Warsaw", "Etc/GMT")를 지정하는 `name` 문자열을 받습니다. `name`이 제공되지 않으면 로컬 시간대를 조회합니다. 유효하지 않은 `zone` 이름이 주어지거나 로컬 시간대를 검색할 수 없으면 `UnknownTimeZoneError` 예외를 발생시킵니다.

이 함수는 또한 사용할 `zoneinfo` 데이터베이스의 위치에 대한 선택적 경로인 `db_path`를 받을 수 있습니다. 지정되지 않은 경우, 함수는 다음 순서로 데이터베이스를 찾습니다:
1.  `tzdata-update` 모듈이 설치되어 있는지 확인하고 해당 데이터베이스를 사용합니다.
2.  `/usr/share/zoneinfo`에 데이터베이스가 있으면 사용합니다.
3.  `Lib/tzdata`에 있는 Python 제공 데이터베이스를 사용합니다.

#### 새로운 매개변수 `is_dst`

DST 전환 시 시간 모호성을 처리하기 위해 여러 메서드에 새로운 `is_dst` 매개변수가 추가될 예정이었습니다.
*   `tzinfo.utcoffset(dt, is_dst=False)`
*   `tzinfo.dst(dt, is_dst=False)`
*   `tzinfo.tzname(dt, is_dst=False)`
*   `datetime.astimezone(tz, is_dst=False)`

`is_dst` 매개변수는 `False`(기본값), `True`, 또는 `None`이 될 수 있습니다.
*   `False`: 주어진 `datetime`이 일광 절약 시간 중이 아닌 것으로 해석되어야 함을 지정합니다. 이는 기존 동작을 유지하기 위한 기본값입니다.
*   `True`: 주어진 `datetime`이 일광 절약 시간 중인 것으로 해석되어야 함을 지정합니다.
*   `None`: 지정된 시간이 DST 전환 중 모호한 경우 `AmbiguousTimeError` 예외를 발생시킵니다. 또한 DST로 전환할 때 "사라진 시간(missing time)" 중에 시간이 지정된 경우 `NonExistentTimeError`를 발생시킵니다.

#### 새로운 예외 (New exceptions)

*   **`UnknownTimeZoneError`**: `KeyError`의 서브클래스로, 찾을 수 없는 시간대 지정을 제공할 때 발생합니다.
*   **`InvalidTimeError`**: `AmbiguousTimeError`와 `NonExistentTimeError`의 기본 클래스 역할을 하며, 이 두 예외를 개별적으로 포착할 수 있게 합니다. `ValueError`의 서브클래스입니다.
*   **`AmbiguousTimeError`**: `is_dst`를 `None`으로 설정하고 모호한 `datetime` 지정을 제공할 때 발생합니다.
*   **`NonExistentTimeError`**: `is_dst`를 `None`으로 설정하고 일광 절약 시간 때문에 존재하지 않는 시간을 `datetime` 지정으로 제공할 때 발생합니다.

#### 새로운 컬렉션 (New collections)

*   `all_timezones`: 사용할 수 있는 시간대 이름의 전체 목록을 알파벳순으로 정렬합니다.
*   `common_timezones`: 유용하고 현재 사용되는 시간대 목록을 알파벳순으로 정렬합니다.

### `tzdata-update` 패키지 (The tzdata-update package)

`zoneinfo` 데이터베이스는 `easy_install`/`pip`/`buildout`으로 쉽게 설치할 수 있도록 패키징될 예정이었습니다. 이 패키지는 설치에 필요한 코드 외에는 어떠한 Python 코드도 설치하거나 포함하지 않습니다. 내부 데이터베이스와 동일한 도구로 최신 상태를 유지하며, `zoneinfo` 데이터베이스가 업데이트될 때마다 릴리스되고 동일한 버전 스키마를 사용할 예정이었습니다.

## `pytz` API와의 차이점 (Differences from the pytz API)

*   `pytz`는 `tzinfo`에 `is_dst`가 없다는 점을 해결하기 위해 `localize()` 및 `normalize()` 함수를 제공했지만, `is_dst`가 `datetime.tzinfo`에 직접 구현되면 더 이상 필요하지 않습니다.
*   `pytz`의 `timezone()` 함수는 Python 3.2에서 도입된 `timezone` 클래스와의 충돌을 피하기 위해 `zoneinfo()`로 명명될 예정이었습니다. `zoneinfo()`는 인자 없이 호출될 경우 로컬 시간대를 반환할 예정이었습니다.
*   `pytz.StaticTzInfo` 클래스는 정적 시간대에 대한 `is_dst` 지원을 제공했지만, `is_dst` 지원이 `datetime.tzinfo`에 포함되면 더 이상 필요하지 않습니다.
*   `InvalidTimeError`는 `ValueError`의 서브클래스입니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.