---
title: "[Final] PEP 3138 - String representation in Python 3000"
excerpt: "Python Enhancement Proposal 3138: 'String representation in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3138/
toc: true
toc_sticky: true
date: 2025-09-27 14:35:12+0900
last_modified_at: 2025-09-27 14:35:12+0900
published: true
---
> **원문 링크:** [PEP 3138 - String representation in Python 3000](https://peps.python.org/pep-3138/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-May-2008


# PEP 3138 – Python 3000에서의 문자열 표현 (String representation in Python 3000)

*   **작성자:** Atsuo Ishimoto <ishimoto at gembook.org>
*   **상태:** 최종 (Final)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2008년 5월 5일
*   **Python 버전:** 3.0
*   **최근 이력:** 2008년 5월 5일, 2008년 6월 5일

## 요약 (Abstract)

이 PEP는 Python 3000(Python 3.x의 초기 명칭)을 위한 새로운 문자열 표현 형식을 제안합니다. Python 3000 이전 버전의 Python에서는 내장 함수 `repr()`이 디버깅 및 로깅을 위해 임의의 객체를 인쇄 가능한 ASCII 문자열로 변환했습니다. Python 3000에서는 유니코드 표준을 기반으로 더 넓은 범위의 문자를 '인쇄 가능'하다고 간주해야 한다는 제안입니다.

## 동기 (Motivation)

기존 `repr()` 함수는 다음 알고리즘을 사용하여 8비트 문자열을 ASCII로 변환합니다.

1.  CR, LF, TAB 및 `\`를 각각 `\r`, `\n`, `\t`, `\\`로 변환합니다.
2.  다른 인쇄 불가능한 문자(0x00-0x1f, 0x7f)와 비-ASCII 문자(>= 0x80)를 `\xXX` 형식으로 변환합니다.
3.  인용 부호(' 또는 `_`)를 백슬래시로 이스케이프하고, 문자열의 시작과 끝에 인용 부호를 추가합니다.

유니코드 문자열의 경우, 다음 추가 변환이 수행됩니다.

1.  후행 문자 없는 선행 서러게이트 쌍 문자(0xd800-0xdbff 범위이나 0xdc00-0xdfff가 뒤따르지 않는 경우)를 `\uXXXX` 형식으로 변환합니다.
2.  16비트 문자(>= 0x100)를 `\uXXXX` 형식으로 변환합니다.
3.  21비트 문자(>= 0x10000) 및 서러게이트 쌍 문자를 `\U00xxxxxx` 형식으로 변환합니다.

이 알고리즘은 모든 문자열을 인쇄 가능한 ASCII로 변환하며, `repr()`은 디버깅이나 로깅을 위해 문자열을 출력하는 편리하고 안전한 방법으로 사용됩니다. 모든 비-ASCII 문자는 이스케이프되지만, 대부분의 문자열 문자가 ASCII인 경우에는 문제가 되지 않습니다. 그러나 일본어와 같이 문자열의 대부분이 비-ASCII 문자인 다른 언어의 경우, 이는 매우 불편합니다.

`print(aJapaneseString)`을 사용하여 읽기 쉬운 문자열을 얻을 수 있지만, 리스트(list)나 튜플(tuple)과 같은 컬렉션(collection)에서 문자열을 출력하는 유사한 해결책은 없습니다. `print(listOfJapaneseStrings)`는 `repr()`을 사용하여 출력할 문자열을 구성하므로, 결과 문자열은 항상 헥스(hex) 이스케이프된 상태입니다. 또는 `open(japaneseFilename)`이 예외를 발생시킬 때, 오류 메시지가 `IOError: [Errno 2] No such file or directory: '\u65e5\u672c\u8a9e'`와 같이 표시되어 전혀 도움이 되지 않습니다.

Python 3000은 비-ASCII 식별자(identifier)와 같이 비-라틴어 사용자에게 많은 유용한 기능을 제공하므로, 인쇄 가능한 출력(printable output)에서도 유사한 방식으로 발전한다면 도움이 될 것입니다.

일부 사용자는 이미지와 같은 이진 데이터를 출력할 경우 콘솔이 엉망이 될 것을 우려할 수 있습니다. 그러나 Python 3000에서는 바이트(bytes)와 문자열(strings)이 서로 다른 유형이므로, 콘솔에 이미지를 출력하는 것이 콘솔을 엉망으로 만들 가능성은 낮기 때문에 실제로 이런 일은 발생하지 않을 것입니다.

이 문제는 이전에 Hye-Shik Chang에 의해 논의되었지만, 거부되었습니다.

## 명세 (Specification)

### `Py_UNICODE_ISPRINTABLE` 함수 추가

Python C API에 새로운 함수 `int Py_UNICODE_ISPRINTABLE(Py_UNICODE ch)`를 추가합니다. 이 함수는 `repr()`이 유니코드 문자 `ch`를 이스케이프해야 하는 경우 0을 반환하고, 그렇지 않으면 1을 반환합니다. 이스케이프되어야 할 문자는 유니코드 문자 데이터베이스에서 다음과 같이 정의됩니다.

*   `Cc` (Other, Control): 제어 문자
*   `Cf` (Other, Format): 형식 문자
*   `Cs` (Other, Surrogate): 서러게이트 (대리) 문자
*   `Co` (Other, Private Use): 개인 사용 영역 문자
*   `Cn` (Other, Not Assigned): 할당되지 않은 문자
*   `Zl` (Separator, Line): `LINE SEPARATOR` (`\u2028`)를 의미합니다.
*   `Zp` (Separator, Paragraph): `PARAGRAPH SEPARATOR` (`\u2029`)를 의미합니다.
*   `Zs` (Separator, Space): ASCII 공백 (`\x20`) 이외의 구분 공백 문자. 모호함을 피하기 위해 이 범주의 문자는 이스케이프되어야 합니다.

### `repr()` 문자열 생성 알고리즘 변경

`repr()` 문자열을 생성하는 알고리즘은 다음과 같이 변경되어야 합니다.

1.  CR, LF, TAB 및 `\`를 `\r`, `\n`, `\t`, `\\`로 변환합니다.
2.  인쇄 불가능한 ASCII 문자(0x00-0x1f, 0x7f)를 `\xXX` 형식으로 변환합니다.
3.  후행 문자 없는 선행 서러게이트 쌍 문자(0xd800-0xdbff 범위이나 0xdc00-0xdfff가 뒤따르지 않는 경우)를 `\uXXXX` 형식으로 변환합니다.
4.  `Py_UNICODE_ISPRINTABLE()`이 0을 반환하는 인쇄 불가능한 문자를 `\xXX`, `\uXXXX` 또는 `\U00xxxxxx` 형식으로 변환합니다.
5.  인용 부호(`'`)를 백슬래시로 이스케이프하고, 문자열의 시작과 끝에 인용 부호를 추가합니다.

### `sys.stderr` 기본 에러 핸들러 변경

`sys.stderr`의 유니코드 에러 핸들러(error-handler)를 기본적으로 `'backslashreplace'`로 설정합니다.

### `PyObject_ASCII` 함수 추가

Python C API에 새로운 함수 `PyObject *PyObject_ASCII(PyObject *o)`를 추가합니다. 이 함수는 `PyObject_Repr()`을 사용하여 파이썬 객체를 문자열로 변환한 다음, 모든 비-ASCII 문자를 헥스 이스케이프합니다. `PyObject_ASCII()`는 Python 2의 `PyObject_Repr()`과 동일한 문자열을 생성합니다.

### `ascii()` 내장 함수 추가

새로운 내장 함수 `ascii()`를 추가합니다. 이 함수는 `repr()`을 사용하여 파이썬 객체를 문자열로 변환한 다음, 모든 비-ASCII 문자를 헥스 이스케이프합니다. `ascii()`는 Python 2의 `repr()`과 동일한 문자열을 생성합니다.

### `%a` 문자열 포맷 연산자 및 관련 기능 추가

*   `%a` 문자열 포맷 연산자를 추가합니다. `%a`는 `repr()`을 사용하여 파이썬 객체를 문자열로 변환한 다음, 모든 비-ASCII 문자를 헥스 이스케이프합니다. `%a` 포맷 연산자는 Python 2의 `%r`과 동일한 문자열을 생성합니다.
*   `str.format()` 메서드에 `!a` 변환 플래그를 추가합니다.
*   `PyUnicode_FromFormat()`에 `%A` 연산자를 추가합니다.
    이들은 `%a` 문자열 포맷 연산자와 같이 모든 객체를 ASCII 문자열로 변환합니다.

### `str.isprintable()` 메서드 추가

문자열 유형에 `isprintable()` 메서드를 추가합니다. `str.isprintable()`은 문자열의 어떤 문자라도 `repr()`이 이스케이프할 경우 `False`를 반환하고, 그렇지 않으면 `True`를 반환합니다. `isprintable()` 메서드는 내부적으로 `Py_UNICODE_ISPRINTABLE()` 함수를 호출합니다.

## 근거 (Rationale)

Python 3000의 `repr()`은 Python 3000의 문자열과 마찬가지로 ASCII 기반이 아닌 유니코드 기반이어야 합니다. 또한, 로케일(locale) 설정은 출력 장치의 로케일과 반드시 같지 않으므로, 변환이 로케일 설정에 영향을 받아서는 안 됩니다. 예를 들어, 데몬(daemon) 프로세스가 ASCII 설정으로 호출되지만 UTF-8로 로그 파일에 쓰는 것은 일반적인 경우입니다. 또한, 웹 애플리케이션은 HTML 페이지의 인코딩을 기반으로 오류 정보를 더 읽기 쉬운 형태로 보고하고 싶을 수 있습니다.

사용자 콘솔에서 지원하지 않는 문자는 유니코드 인코더의 에러 핸들러에 의해 출력 시 헥스 이스케이프될 수 있습니다. 출력 파일의 에러 핸들러가 `'backslashreplace'`인 경우, 그러한 문자는 `UnicodeEncodeError`를 발생시키지 않고 헥스 이스케이프됩니다. 예를 들어, 기본 인코딩이 ASCII인 경우 `print('Hello ¢')`는 `'Hello \xa2'`를 출력합니다. 인코딩이 ISO-8859-1인 경우 `'Hello ¢'`가 출력됩니다.

`sys.stdout`의 기본 에러 핸들러는 `'strict'`입니다. 출력을 읽는 다른 애플리케이션이 헥스 이스케이프된 문자를 잘못 해석할 수 있으므로, 지원되지 않는 문자는 쓸 때 감지되어야 합니다. 지원되지 않는 문자가 이스케이프되어야 하는 경우, 에러 핸들러를 명시적으로 변경해야 합니다. `sys.stdout`과 달리 `sys.stderr`는 기본적으로 `UnicodeEncodingError`를 발생시키지 않습니다. 이는 기본 에러 핸들러가 `'backslashreplace'`이기 때문입니다. 따라서 비-ASCII 문자를 포함하는 오류 메시지를 `sys.stderr`로 출력해도 예외가 발생하지 않습니다. 또한, 처리되지 않은 예외(예외 객체, 트레이스백)에 대한 정보는 인터프리터에 의해 예외를 발생시키지 않고 출력됩니다.

## 대안 솔루션 (Alternate Solutions)

`repr()`을 변경하지 않고 비-라틴어 사용자의 디버깅을 돕기 위해 다른 제안들이 있었습니다.

*   **리스트(list)나 딕트(dict)를 출력하는 도구 제공:** 디버깅을 위해 출력되어야 하는 문자열은 리스트나 딕트뿐만 아니라 다른 많은 종류의 객체에도 포함되어 있습니다. 파일 객체는 유니코드 파일 이름을 포함하고, 예외 객체는 유니코드 메시지를 포함하는 등, 이러한 문자열은 `repr()`될 때 읽기 쉬운 형태로 출력되어야 합니다. 모든 가능한 객체 유형을 출력하는 도구를 구현하는 것은 불가능할 것입니다.
*   **`sys.displayhook` 및 `sys.excepthook` 사용:** 대화형 세션의 경우, 헥스 이스케이프된 문자를 원래 문자로 복원하는 훅(hook)을 작성할 수 있습니다. 그러나 이러한 훅은 대화형 Python 세션에서 입력된 표현식의 평가 결과를 출력할 때만 호출되며, `print()` 함수, 비-대화형 세션 또는 `logging.debug("%r", ...)` 등에는 작동하지 않습니다.
*   **`sys.stdout` 및 `sys.stderr` 서브클래싱(subclassing):** 헥스 이스케이프된 문자를 복원하는 서브클래스를 구현하는 것은 어렵습니다. 모든 경우에 이스케이프를 올바르게 되돌리기에 충분한 정보가 문자열이 될 때까지 남아 있지 않기 때문입니다. 예를 들어, `print("\\"+"u0041")`는 'A'가 아니라 `'\u0041'`로 출력되어야 합니다. 그러나 파일 객체를 구별할 기회가 없습니다.
*   **`unicode_repr()`에서 사용되는 인코딩을 조정 가능하게 하고, 기존 `repr()`을 기본값으로 설정:** 조정 가능한 `repr()`을 사용하면 `repr()`의 결과가 예측 불가능해지고, `repr()`과 관련된 올바른 코드를 작성하는 것이 불가능해질 수 있습니다. 그리고 현재 `repr()`이 기본값이라면, 기존 관행이 유지되고 사용자는 `repr()`의 결과로 ASCII 문자열을 기대할 수 있습니다. 사용자 정의 `repr()` 함수가 사용될 때 서드파티 애플리케이션이나 라이브러리가 혼란스러워할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)

`repr()` 변경은 일부 기존 코드, 특히 테스트 코드를 손상시킬 수 있습니다. Python의 회귀 테스트(regression tests) 중 5개가 이 수정으로 인해 실패합니다. Python 2처럼 비-ASCII 문자가 없는 `repr()` 문자열이 필요한 경우 다음 함수를 사용할 수 있습니다.

```python
def repr_ascii(obj):
    return str(repr(obj).encode("ASCII", "backslashreplace"), "ASCII")
```


로깅이나 디버깅을 위해 다음 코드는 `UnicodeEncodeError`를 발생시킬 수 있습니다.

```python
log = open("logfile", "w")
log.write(repr(data)) # data에 지원되지 않는 문자가 포함된 경우 UnicodeEncodeError가 발생합니다.
```


예외 발생을 피하려면 에러 핸들러를 명시적으로 지정할 수 있습니다.

```python
log = open("logfile", "w", errors="backslashreplace")
log.write(repr(data)) # 지원되지 않는 문자는 이스케이프됩니다.
```


`en_US.utf8` 또는 `de_DE.utf8`과 같이 유니코드 기반 인코딩을 사용하는 콘솔의 경우, 백슬래시 교체(backslashreplace) 트릭이 작동하지 않고 모든 인쇄 가능한 문자가 이스케이프되지 않습니다. 이로 인해 서유럽, 그리스어, 키릴어와 같은 언어에서 비슷한 문자가 그려지는 문제가 발생할 수 있습니다. 이들 언어는 유사하지만 다른 알파벳(공통 조상에서 유래)을 사용하며, 비슷해 보이지만 문자 코드가 다른 글자를 포함합니다. 예를 들어, 라틴어 'a', 'e', 'o'를 키릴어 'а', 'е', 'о'와 구별하기 어렵습니다. (물론 시각적 표현은 사용되는 폰트에 따라 크게 다르지만, 일반적으로 이들 글자는 거의 구별할 수 없습니다.) 이 문제를 피하기 위해 사용자는 자신의 환경에 적합한 결과를 얻기 위해 터미널 인코딩을 조정할 수 있습니다.

## 거부된 제안 (Rejected Proposals)

*   **내장 `print()` 함수에 `encoding` 및 `errors` 인수를 추가하며, 기본값은 `sys.getfilesystemencoding()` 및 `'backslashreplace'`로 설정:** 구현이 복잡하고, 일반적으로 좋은 아이디어로 간주되지 않습니다.
*   **헥스(hex) 문자 코드 대신 문자 이름을 사용하여 문자 이스케이프:** 예를 들어, `repr('\u03b1')`를 `"\N{GREEK SMALL LETTER ALPHA}"`로 변환하는 것입니다. 문자 이름을 사용하는 것은 헥스 이스케이프보다 매우 장황할 수 있습니다. 예: `repr("\ufbf9")`는 `"\N{ARABIC LIGATURE UIGHUR KIRGHIZ YEH WITH HAMZA ABOVE WITH ALEF MAKSURA ISOLATED FORM}"`으로 변환됩니다.
*   **`sys.stdout`의 기본 에러 핸들러를 `'backslashreplace'`로 설정:** `stdout`에 쓰여진 내용은 `\` 이스케이프를 잘못 해석할 수 있는 다른 프로그램에 의해 소비될 수 있습니다. 대화형 세션의 경우 `'backslashreplace'` 에러 핸들러를 기본값으로 만들 수 있지만, 이는 "대화형 모드에서는 작동하지만 파일로 리디렉션할 때는 작동하지 않는다"와 같은 혼란을 야기할 수 있습니다.

## 구현 (Implementation)

작성자는 http://bugs.python.org/issue2630에 패치(patch)를 작성했으며, 이는 2008년 11월 6일 리비전 64138로 Python 3.0 브랜치에 커밋되었습니다.

## 참조 (References)

 Multibyte string on string::string_print (http://bugs.python.org/issue479898)
 [Python-3000] Displaying strings containing unicode escapes (https://mail.python.org/pipermail/python-3000/2008-April/013366.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.