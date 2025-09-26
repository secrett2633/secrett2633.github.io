---
title: "[Final] PEP 293 - Codec Error Handling Callbacks"
excerpt: "Python Enhancement Proposal 293: 'Codec Error Handling Callbacks'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/293/
toc: true
toc_sticky: true
date: 2025-09-26 18:04:55+0900
last_modified_at: 2025-09-26 18:04:55+0900
published: true
---
> **원문 링크:** [PEP 293 - Codec Error Handling Callbacks](https://peps.python.org/pep-0293/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-Jun-2002


# PEP 293 – 코덱 에러 핸들링 콜백

*   **작성자**: Walter Dörwald
*   **상태**: Final (최종)
*   **타입**: Standards Track (표준 트랙)
*   **생성일**: 2002년 6월 18일
*   **Python 버전**: 2.3
*   **사전 이력**: 2002년 6월 19일

## 요약 (Abstract)

이 PEP는 Python의 고정된 코덱 에러 핸들링 방식을 보다 유연한 콜백 기반 접근 방식으로 확장하는 것을 목표로 합니다. 현재 Python은 코덱 에러 핸들러에 대해 "strict", "replace", "ignore"와 같은 고정된 에러 핸들링을 사용합니다. 이 PEP는 Python이 함수 콜백을 에러 핸들러로 사용할 수 있는 메커니즘을 설명합니다. 이러한 유연한 에러 핸들러를 통해 표준 코덱 매핑이 적용되지 않는 경우를 위해 폴백(fallback) 솔루션이나 다른 인코딩을 제공하는 등 기존 코덱에 새로운 기능을 추가할 수 있습니다.

## 사양 (Specification)

현재 코덱 에러 핸들링 알고리즘은 "strict", "replace", "ignore"로 고정되어 있으며, 이러한 알고리즘의 의미는 각 코덱마다 개별적으로 구현됩니다.

제안된 패치는 핸들러 이름을 핸들러 함수에 매핑하는 `codecs` 에러 핸들러 레지스트리를 통해 에러 핸들링 알고리즘 세트를 확장 가능하게 만들 것입니다. 이 레지스트리는 다음 두 가지 C 함수를 포함합니다.

*   `int PyCodec_RegisterError(const char *name, PyObject *error)`
*   `PyObject *PyCodec_LookupError(const char *name)`

그리고 이들의 Python counterpart는 다음과 같습니다.

*   `codecs.register_error(name, error)`
*   `codecs.lookup_error(name)`

`PyCodec_LookupError`는 해당 이름으로 등록된 콜백 함수가 없으면 `LookupError`를 발생시킵니다. 인코딩 이름 레지스트리와 유사하게, 콜백 함수를 등록 해제하거나 사용 가능한 함수를 반복할 방법은 없습니다.

콜백 함수는 코덱에 의해 다음과 같이 사용됩니다. 코덱이 인코딩/디코딩 에러를 만나면, 이름으로 콜백 함수를 찾고, 에러에 대한 정보는 예외(exception) 객체에 저장되며, 이 객체를 인수로 콜백이 호출됩니다. 콜백은 어떻게 진행할지에 대한 정보를 반환하거나 예외를 발생시킵니다.

### 예외 객체 구조

**인코딩(Encoding)의 경우**, 예외 객체는 `UnicodeEncodeError` 클래스 형태를 가집니다.

```python
class UnicodeEncodeError(UnicodeError):
    def __init__(self, encoding, object, start, end, reason):
        UnicodeError.__init__(self, "encoding '%s' can't encode characters " +
                              "in positions %d-%d: %s" % (encoding, start, end-1, reason))
        self.encoding = encoding
        self.object = object
        self.start = start
        self.end = end
        self.reason = reason
```

속성들의 의미는 다음과 같습니다.

*   `encoding`: 인코딩의 이름
*   `object`: `encode()`가 호출된 원본 `unicode` 객체
*   `start`: 인코딩할 수 없는 첫 번째 문자의 위치
*   `end`: 인코딩할 수 없는 마지막 문자의 위치 + 1 (또는 `object`의 길이)
*   `reason`: `object[start:end]`를 인코딩할 수 없는 이유

콜백은 예외 객체를 수정해서는 안 됩니다. 콜백이 예외를 발생시키지 않는다면, 다음 튜플을 반환해야 합니다.

`(replacement, newpos)`

*   `replacement`: 인코딩할 수 없는 `object[start:end]` 부분 대신 인코더가 인코딩하여 내보낼 `unicode` 객체입니다.
*   `newpos`: `object` 내의 새로운 위치를 지정하며, 인코더는 `replacement`를 인코딩한 후 이 위치부터 인코딩을 계속합니다.

**디코딩(Decoding)의 경우**는 인코딩과 유사하게 작동하며, 다음 차이점이 있습니다.

*   예외 클래스 이름은 `UnicodeDecodeError`이며, `object` 속성은 디코더가 현재 디코딩 중인 원본 8비트 문자열입니다.
*   콜백에서 반환된 `replacement`는 디코더가 추가 처리 없이 `object[start:end]` 부분 대신 그대로 내보낼 `unicode` 객체입니다.

`PyUnicode_TranslateCharmap` / `unicode.translate`도 콜백 레지스트리를 지원하도록 향상될 것입니다. 이로 인해 `PyUnicode_TranslateCharmap`는 다중 문자 대체 문자열을 지원하게 됩니다. `PyUnicode_TranslateCharmap`의 경우 예외 클래스는 `UnicodeTranslateError`로 명명됩니다.

### 기본 제공 콜백 핸들러

제안된 패치는 "backslashreplace"와 "xmlcharrefreplace"라는 두 가지 추가 시스템 콜백 이름을 추가합니다. 이들은 인코딩 및 번역에 사용될 수 있으며, 모든 인코더와 `PyUnicode_TranslateCharmap`에서 인플레이스(in-place)로 구현됩니다.

Python에서 이 다섯 가지 콜백의 예시는 다음과 같습니다.

*   `strict(exc)`: 예외를 그대로 발생시킵니다.
*   `ignore(exc)`: 에러가 발생한 부분을 무시하고 빈 문자열을 반환합니다.
*   `replace(exc)`: 인코딩/변환 에러 시 `?` 또는 `\ufffd` 문자로 대체하고, 디코딩 에러 시 `\ufffd` 문자로 대체합니다.
*   `backslashreplace(exc)`: 인코딩할 수 없는 문자를 `\x`, `\u`, `\U` 이스케이프 시퀀스로 대체합니다.
*   `xmlcharrefreplace(exc)`: 인코딩할 수 없는 문자를 XML 문자 참조 `&#DDDD;` 형태로 대체합니다.

이 다섯 가지 콜백 핸들러는 Python에서 `codecs.strict_error`, `codecs.ignore_error`, `codecs.replace_error`, `codecs.backslashreplace_error`, `codecs.xmlcharrefreplace_error`로도 접근할 수 있습니다.

## 도입 배경 (Rationale)

대부분의 레거시 인코딩은 전체 유니코드(Unicode) 문자를 지원하지 않습니다. 이러한 경우, 많은 상위 수준 프로토콜은 유니코드 문자를 이스케이프하는 방법을 지원합니다(예: Python 자체는 `\x`, `\u`, `\U` 규칙을 지원하며, XML은 `&#xxx;`를 통해 문자 참조를 지원).

이러한 인코딩 알고리즘을 구현할 때, `Unicode` 객체의 `encode` 메서드 현재 구현에서 문제가 발생합니다. 특정 인코딩으로 인코딩할 수 없는 문자를 결정하려면, `encode`가 에러 위치에 대한 정보를 제공하지 않기 때문에 모든 단일 문자를 시도해야 합니다. 이로 인해 인코딩 속도가 극적으로 느려집니다.

예를 들어, 인코딩할 수 없는 문자를 `&#%d;`로 바꾸는 코드는 C 코드 대신 Python 코드에서 문자열을 반복하게 되어 약 180배 느려질 수 있습니다. 또한, 이러한 방식은 상태 기반 인코딩(stateful encodings)에 문제를 일으킵니다(예: UTF-16의 BOM).

콜백은 스테이트리스(stateless)여야 합니다. 콜백이 등록되면 전역적으로 사용 가능하며 여러 `encode()` 호출에 의해 호출될 수 있기 때문입니다. 스테이트풀 콜백을 사용하려면 `encode`/`decode`/`translate`의 `errors` 파라미터가 `char *`에서 `PyObject *`로 변경되어야 하는데, 이는 많은 C 프로토타입 변경을 필요로 하므로 거부되었습니다.

## 구현 참고 사항 (Implementation Notes)

*   새로운 예외 클래스(exception classes)는 현재 구식(old style) Python 클래스입니다. 향상된 성능을 위해 `Exception` (및 `UnicodeError`)이 C로 구현된 새 형식(new style) 클래스로 변경되면, 내부적으로 새 형식 클래스로 전환할 수 있도록 C API가 구현되었습니다.
*   `codecs.StreamReaderWriter`는 `errors` 파라미터를 읽기와 쓰기 모두에 사용하는데, 유연성을 높이기 위해 읽기/쓰기 각각 별도의 파라미터로 변경되어야 합니다.
*   `PyUnicode_TranslateCharmap`의 `errors` 파라미터는 Python에서 사용할 수 없으므로, `unicode.translate`에 선택적 `errors` 인수를 추가하여 이 기능을 노출하고 테스트를 가능하게 해야 합니다.
*   유니코드(Unicode)로/에서 인코딩/디코딩하는 것과 다른 작업을 수행하며 이 새로운 메커니즘을 사용하려는 코덱은 자체 예외 클래스를 정의할 수 있으며, `strict` 핸들러는 자동으로 작동합니다. 다른 미리 정의된 에러 핸들러는 유니코드 관련이며 `Unicode(Encode|Decode|Translate)Error` 예외 객체를 예상하므로 작동하지 않습니다.

## 하위 호환성 (Backwards Compatibility)

`unicode.encode`의 `errors="replace"`의 의미가 변경되었습니다. 이전 버전은 매핑에 `?` 문자가 매핑되지 않아도 항상 `?` 문자를 출력 문자열에 저장했습니다. 제안된 패치에서는 콜백에서 반환된 대체 문자열이 매핑 딕셔너리에서 다시 찾아집니다. 그러나 모든 지원되는 인코딩은 ASCII 기반이며 `?`를 `?`로 매핑하므로 실제로는 문제가 되지 않을 것입니다.

`errors` 인수에 대한 유효하지 않은 값은 이전에는 `ValueError`를 발생시켰지만, 이제는 `LookupError`를 발생시킵니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.