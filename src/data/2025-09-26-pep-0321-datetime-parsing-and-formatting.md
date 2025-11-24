---
title: "[Withdrawn] PEP 321 - Date/Time Parsing and Formatting"
excerpt: "Python Enhancement Proposal 321: 'Date/Time Parsing and Formatting'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/321/
toc: true
toc_sticky: true
date: 2025-09-26 18:30:01+0900
last_modified_at: 2025-09-26 18:30:01+0900
published: true
---
> **원문 링크:** [PEP 321 - Date/Time Parsing and Formatting](https://peps.python.org/pep-0321/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 16-Sep-2003




# PEP 321: 날짜/시간 구문 분석 및 형식 지정 (Date/Time Parsing and Formatting)

## 개요
PEP 321은 Python의 `datetime` 모듈에 문자열 형태의 날짜 및 시간을 파싱(구문 분석)하고, 다양한 형식으로 출력하는 기능을 추가하는 것을 제안했던 문서입니다. 이 제안은 `datetime` 모듈에 미리 정의된 여러 일반적인 날짜 및 시간 형식에 대한 파싱 함수와, 더 범용적인 파싱 기능을 추가하는 것을 목표로 했습니다.

**상태:** Withdrawn (철회됨)
**작성일:** 2003년 9월 16일
**Python 버전:** 2.4

## 도입 배경
Python 2.3에서 `datetime` 모듈에 간단한 날짜 및 시간 타입이 추가되었지만, 다양한 형식의 문자열을 파싱하여 해당 `datetime` 타입 인스턴스로 반환하는 기능은 없었습니다. 또한 `datetime` 모듈의 타입들은 `.isoformat()` 및 `.ctime()` 메서드를 통해 문자열 표현을 반환하고, `.strftime()` 메서드를 사용하여 새로운 형식을 구성할 수 있었지만, 표준 라이브러리에 포함되면 유용할 추가적인 일반 사용 형식들이 있었습니다. 이 PEP는 이러한 부족한 점을 해결하고자 제안되었습니다.

## 입력 형식 (Input Formats)
PEP 321에서 지원할 만한 유용한 입력 형식으로 다음과 같은 것들이 제안되었습니다.

*   **ISO8601:** 국제 표준 날짜 및 시간 형식.
*   **ARPA/RFC 2822:** 이메일 등에 사용되는 날짜 형식.
*   **ctime:** 운영체제에서 자주 사용되는 짧은 날짜/시간 형식.
*   **사람이 흔히 작성하는 형식:**
    *   미국식 "MM/DD/YYYY"
    *   유럽식 "YYYY/MM/DD"
    *   "DD-Month-YYYY"와 같은 변형.
*   **CVS 또는 tar 스타일 날짜:** "tomorrow", "12 hours ago" 등 상대적인 시간 표현.

**고려되었던 옵션들:**

*   **`datetime` 모듈에 함수 추가:**
    ```python
    import datetime
    d = datetime.parse_iso8601("2003-09-15T10:34:54")
    ```
*   **각 타입에 클래스 메서드 추가:** `.now()`와 같은 기존 클래스 메서드들과 자연스럽게 어울릴 수 있다고 보았습니다.
    ```python
    import datetime
    d = datetime.date.parse_iso8601("2003-09-15T10:34:54")
    ```
*   **별도의 모듈 또는 서브패키지 추가:** `date`, `date_parse`, `parse_date` 등의 모듈이나 `datetime.parser`와 같은 서브패키지에 파싱 함수를 포함.
    ```python
    import datetime
    d = datetime.parser.parse_iso8601("2003-09-15T10:34:54")
    ```

**미해결 질문들:**

*   사용할 명명 규칙 (Naming convention).
*   오류 발생 시 어떤 예외(exception)를 발생시킬 것인가? `ValueError` 또는 특정 예외?
*   파싱 전에 어떤 타입을 예상하는지 알아야 하는가, 아니면 파싱 자체가 타입을 결정해야 하는가? (예: "yyyy-mm-dd"는 `date` 인스턴스를 반환하고, "yyyy-mm-ddThh:mm:ss"는 `datetime`을 반환).
*   시간이 예상되지 않는 곳에 시간이 제공되거나, 시간이 제공되지 않을 경우 오류를 알리는 옵션이 필요한가?
*   국제화(I18N) 및 시간대(time zones) 처리를 위한 특별한 요구사항이 있는가?

## 범용 입력 파싱 (Generic Input Parsing)
`datetime` 타입을 반환하는 `strptime()` 구현으로 충분한지에 대한 질문이 있었습니다. 기존 순수 Python으로 구현된 `strptime()`이 쉽게 재활용될 수 있는지도 논의되었습니다.

## 출력 형식 (Output Formats)
모든 입력 형식이 출력 형식으로 지원될 필요는 없다고 보았습니다. `YYYY/MM/DD`와 같은 간단한 형식은 `strftime()` 인수를 통해 쉽게 처리할 수 있기 때문에, 복잡한 형식(예: RFC 2822)만 지원할 것을 고려했습니다.

**고려되었던 옵션들:**

*   **미리 정의된 형식 문자열 제공:**
    ```python
    import datetime
    d = datetime.datetime(...)
    print d.strftime(d.RFC2822_FORMAT) # 또는 datetime.RFC2822_FORMAT?
    ```
*   **모든 객체에 새로운 메서드 제공:**
    ```python
    d = datetime.datetime(...)
    print d.rfc822_time()
    ```

## 결론
PEP 321은 `datetime` 모듈의 파싱 및 형식 지정 기능을 확장하려는 중요한 시도였지만, 최종적으로 철회되었습니다. 하지만 이 PEP에서 논의되었던 많은 아이디어와 요구사항은 이후 Python의 `datetime` 모듈 기능 개선에 영향을 미쳤을 것으로 추정됩니다. 특히, `strptime`의 필요성에 대한 언급은 현재 `datetime` 모듈의 `datetime.strptime()` 메서드의 중요성을 시사합니다.

## 참고 자료 (References)
*   [PEP 321 원문](https://peps.python.org/pep-0321/)
*   mxDateTime: [http://www.egenix.com/files/python/mxDateTime.html](http://www.egenix.com/files/python/mxDateTime.html)
*   PHP date function (Python implementation by Simon Willison): [http://simon.incutio.com/archive/2003/10/07/dateInPython](http://simon.incutio.com/archive/2003/10/07/dateInPython)
*   기타 시간 형식 관련 링크
    *   [http://ringmaster.arc.nasa.gov/tools/time_formats.html](http://ringmaster.arc.nasa.gov/tools/time_formats.html)
    *   [http://www.thinkage.ca/english/gcos/expl/b/lib/0tosec.html](http://www.thinkage.ca/english/gcos/expl/b/lib/0tosec.html)
    *   [https://moin.conectiva.com.br/DateUtil](https://moin.conectiva.com.br/DateUtil)

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.