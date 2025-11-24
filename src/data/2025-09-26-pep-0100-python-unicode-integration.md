---
title: "[Final] PEP 100 - Python Unicode Integration"
excerpt: "Python Enhancement Proposal 100: 'Python Unicode Integration'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/100/
toc: true
toc_sticky: true
date: 2025-09-26 16:00:20+0900
last_modified_at: 2025-09-26 16:00:20+0900
published: true
---
> **원문 링크:** [PEP 100 - Python Unicode Integration](https://peps.python.org/pep-0100/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 10-Mar-2000

이 문서는 Python Enhancement Proposal (PEP) 100으로, Python 2.0에 유니코드(Unicode) 지원을 통합하기 위한 제안입니다. 이 제안의 주요 목표는 유니코드 문자열을 가능한 한 간단하게 사용하면서도 잠재적인 함정을 최소화하여 Python에 네이티브(Native) 유니코드 3.0 지원을 추가하는 것입니다.

---

## 목차
*   **역사적 배경 (Historical Note)**
*   **개요 (Introduction)**
*   **규약 (Conventions)**
*   **일반적인 사항 (General Remarks)**
*   **유니코드 기본 인코딩 (Unicode Default Encoding)**
*   **유니코드 생성자 (Unicode Constructors)**
*   **유니코드 타입 객체 (Unicode Type Object)**
*   **유니코드 출력 (Unicode Output)**
*   **유니코드 순서 (Unicode Ordinals)**
*   **비교 및 해시 값 (Comparison & Hash Value)**
*   **강제 변환 (Coercion)**
*   **예외 (Exceptions)**
*   **코덱 (Coder/Decoders) 조회 (Codecs Lookup)**
*   **표준 코덱 (Standard Codecs)**
*   **코덱 인터페이스 정의 (Codecs Interface Definition)**
*   **공백 (Whitespace)**
*   **대소문자 변환 (Case Conversion)**
*   **줄 바꿈 (Line Breaks)**
*   **유니코드 문자 속성 (Unicode Character Properties)**
*   **사설 코드 포인트 영역 (Private Code Point Areas)**
*   **내부 형식 (Internal Format)**
*   **버퍼 인터페이스 (Buffer Interface)**
*   **피클링/마샬링 (Pickle/Marshalling)**
*   **정규 표현식 (Regular Expressions)**
*   **포매팅 마커 (Formatting Markers)**
*   **내부 인자 파싱 (Internal Argument Parsing)**
*   **파일/스트림 출력 (File/Stream Output)**
*   **파일/스트림 입력 (File/Stream Input)**
*   **유니코드 메서드 및 속성 (Unicode Methods & Attributes)**
*   **코드 베이스 (Code Base)**
*   **테스트 케이스 (Test Cases)**
*   **참고 자료 (References)**
*   **제안 변경 이력 (History of this Proposal)**

---

## 역사적 배경 (Historical Note)
이 문서는 Marc-Andre Lemburg가 PEP 시대 이전에 작성했으며, Python 2.1까지의 Python 배포판에 `Misc/unicode.txt`로 배포되었습니다. 마지막 수정 버전은 1.7이었습니다. PEP 편집자 Barry Warsaw는 이 문서가 정보 제공용 PEP의 목적에 부합한다고 판단하여 PEP 지침에 맞게 재구성하여 이곳으로 옮겼습니다.

## 개요 (Introduction)
이 제안은 유니코드 3.0(Unicode 3.0)을 Python에 네이티브(Native)로 지원하는 것을 목표로 합니다. 이는 유니코드 문자열을 가능한 한 간단하게 사용할 수 있도록 하면서도 사용 중 발생할 수 있는 문제점을 최소화하는 방식으로 이루어집니다. 문자열은 Python에서 가장 기본적인 객체 중 하나이기 때문에, 이 제안은 상당한 수정 과정을 거칠 것으로 예상되었습니다.

## 규약 (Conventions)
예제에서는 `u`를 유니코드 객체(Unicode object)로, `s`를 Python 문자열(Python string)로 사용합니다. 'XXX' 표시는 논의가 필요한 지점(Points Of Discussion, PODs)을 나타냅니다.

## 일반적인 사항 (General Remarks)
유니코드 인코딩 이름은 출력 시 소문자(lower case)여야 하며, 입력 시에는 대소문자를 구분하지 않습니다 (모든 API에서 인코딩 이름을 입력받을 때 소문자로 변환됩니다). 인코딩 이름은 유니코드 컨소시엄(Unicode Consortium)에서 사용하는 명명 규칙을 따라야 합니다. 예를 들어, 'utf 16'은 'utf-16'으로 표기됩니다. 코덱 모듈(Codec module)은 동일한 이름을 사용하되, 하이픈(-)은 언더스코어(_)로 변환되어야 합니다 (예: `utf_8`, `utf_16`, `iso_8859_1`).

## 유니코드 기본 인코딩 (Unicode Default Encoding)
유니코드 구현체는 강제 변환(coercion)을 위해 전달되는 8비트 문자열의 인코딩과, 특정 인코딩이 주어지지 않았을 때 유니코드에서 문자열로 변환하는 기본 인코딩에 대해 가정을 해야 합니다. 이 인코딩은 문서 전체에서 `<default encoding>`으로 지칭됩니다.

이를 위해 구현체는 `site.py` Python 시작 스크립트에서 설정할 수 있는 전역(global) 값을 유지합니다. 이후 변경은 불가능합니다. `<default encoding>`은 `sys` 모듈의 두 API를 사용하여 설정하고 조회할 수 있습니다.

*   `sys.setdefaultencoding(encoding)`: 유니코드 구현체에서 사용하는 `<default encoding>`을 설정합니다. `encoding`은 Python 설치에서 지원되는 인코딩이어야 하며, 그렇지 않으면 `LookupError`가 발생합니다.
    *   **참고:** 이 API는 `site.py`에서만 사용할 수 있습니다! `site.py` 사용 후 `sys` 모듈에서 제거됩니다.
*   `sys.getdefaultencoding()`: 현재의 `<default encoding>`을 반환합니다.

별도로 정의되거나 설정되지 않은 경우, `<default encoding>`은 'ascii'로 기본 설정됩니다. 이 인코딩은 Python의 시작 기본값(startup default)이기도 합니다(`site.py`가 실행되기 전).

기본 `site.py` 시작 모듈에는 현재 로케일(locale)에 정의된 인코딩에 따라 `<default encoding>`을 설정할 수 있는 비활성화된 선택적 코드가 포함되어 있습니다. `locale` 모듈은 OS 환경에 정의된 로케일 기본 설정에서 인코딩을 추출하는 데 사용됩니다. 인코딩을 확인할 수 없거나, 알 수 없거나, 지원되지 않는 경우, 코드는 `<default encoding>`을 'ascii'로 설정합니다. 이 코드를 활성화하려면 `site.py` 파일을 편집하거나 적절한 코드를 Python 설치의 `sitecustomize.py` 모듈에 추가해야 합니다.

## 유니코드 생성자 (Unicode Constructors)
Python은 `__builtins__`를 통해 사용할 수 있는 유니코드 문자열을 위한 내장 생성자를 제공해야 합니다.

*   `u = unicode(encoded_string[,encoding=<default encoding>][,errors="strict"])`
*   `u = u'<unicode-escape encoded Python string>'`
*   `u = ur'<raw-unicode-escape encoded Python string>'`

`'unicode-escape'` 인코딩은 다음과 같이 정의됩니다.
*   모든 비이스케이프(non-escape) 문자는 유니코드 순서 값(Unicode ordinal)으로 자신을 나타냅니다 (예: 'a' -> U+0061).
*   모든 기존에 정의된 Python 이스케이프 시퀀스(escape sequence)는 유니코드 순서 값으로 해석됩니다.
    *   `\xXXXX`는 모든 유니코드 순서 값을 나타낼 수 있습니다.
    *   `\OOO`(8진법)는 U+01FF까지의 유니코드 순서 값을 나타낼 수 있습니다.
*   새로운 이스케이프 시퀀스 `\uXXXX`는 U+XXXX를 나타냅니다. `\u` 뒤에 4자리 미만의 숫자가 오면 문법 오류(syntax error)입니다.

`errors`에 가능한 값에 대한 설명은 아래 **코덱 (Codecs) 조회** 섹션을 참조하십시오.

예시:
*   `u'abc'` -> U+0061 U+0062 U+0063
*   `u'\u1234'` -> U+1234
*   `u'abc\u1234\n'` -> U+0061 U+0062 U+0063 U+1234 U+005c

`'raw-unicode-escape'` 인코딩은 다음과 같이 정의됩니다.
*   `\uXXXX` 시퀀스는 선행 백슬래시(backslash)의 수가 홀수일 경우에만 U+XXXX 유니코드 문자를 나타냅니다.
*   다른 모든 문자는 유니코드 순서 값으로 자신을 나타냅니다 (예: 'b' -> U+0062).

프로그램을 작성할 때 사용한 인코딩에 대한 힌트를 소스 파일의 처음 몇 주석 줄에 프라그마(pragma) 라인으로 제공해야 합니다 (예: `# source file encoding: latin-1`). 7비트 ASCII만 사용하는 경우에는 문제가 없지만, ASCII에 정의되지 않은 Latin-1 문자를 포함하는 경우, 다른 국가의 사람들이 소스 문자열을 읽을 수 있도록 힌트를 포함하는 것이 좋습니다.

## 유니코드 타입 객체 (Unicode Type Object)
유니코드 객체는 표준 `types` 모듈을 통해 `UnicodeType`이라는 이름으로 사용할 수 있는 타입(`'unicode'`)을 가져야 합니다.

## 유니코드 출력 (Unicode Output)
유니코드 객체는 `.[encode]([encoding=<default encoding>])` 메서드를 가지며, 주어진 스키마를 사용하여 유니코드 문자열을 인코딩한 Python 문자열을 반환합니다 (Codecs 참조).

*   `print u`는 `print u.encode()`와 동일하게 동작합니다 (`<default encoding>` 사용).
*   `str(u)`는 `u.encode()`와 동일하게 동작합니다 (`<default encoding>` 사용).
*   `repr(u)`는 `u"u%s" % repr(u.encode('unicode-escape'))`와 유사한 형태를 반환합니다.

C로 작성된 다른 API가 유니코드 객체를 어떻게 처리하는지에 대한 자세한 내용은 **내부 인자 파싱 (Internal Argument Parsing)** 및 **버퍼 인터페이스 (Buffer Interface)** 섹션을 참조하십시오.

## 유니코드 순서 (Unicode Ordinals)
유니코드 3.0은 32비트 순서 문자 집합을 가지므로, 구현체는 32비트를 인식하는 순서 변환 API를 제공해야 합니다.

*   `ord(u[:1])`: 유니코드 객체와 함께 작동하도록 확장된 표준 `ord()` 함수입니다. 32비트 유니코드 순서 번호를 반환합니다.
*   `unichr(i)`: 문자 `i`에 대한 유니코드 객체를 반환합니다 (32비트인 경우). 그렇지 않으면 `ValueError`를 발생시킵니다.

두 API 모두 `__builtins__`에 `ord()` 및 `chr()`와 같은 문자열 대응 함수처럼 포함되어야 합니다.

유니코드는 사설 인코딩(private encodings)을 위한 공간을 제공한다는 점에 유의하십시오. 이를 사용하면 다른 기기에서 다른 출력 표현이 발생할 수 있습니다. 이 문제는 Python 또는 유니코드 문제가 아니라 기기 설정 및 유지 관리 문제입니다.

## 비교 및 해시 값 (Comparison & Hash Value)
유니코드 객체는 다른 객체가 유니코드로 강제 변환된 후 다른 객체와 동일하게 비교되어야 합니다. 문자열의 경우, 이는 `<default encoding>`을 사용하여 유니코드 문자열로 해석됨을 의미합니다.

유니코드 객체는 ASCII 등가 문자열과 동일한 해시 값을 반환해야 합니다. 비ASCII 값을 포함하는 유니코드 문자열은 기본 인코딩된 등가 문자열 표현과 동일한 해시 값을 반환한다고 보장되지 않습니다.

`cmp()` (또는 `PyObject_Compare()`)를 사용하여 비교할 때, 구현체는 문자열 동작과 동기화 상태를 유지하기 위해 변환 중 발생하는 `TypeError`를 마스킹해야 합니다. 문자열을 유니코드로 강제 변환하는 동안 발생하는 `ValueError`와 같은 다른 모든 오류는 마스킹되지 않고 사용자에게 전달되어야 합니다.

포함 테스트 (`'a' in u'abc'` 및 `u'a' in 'abc'`)에서 양측은 테스트를 적용하기 전에 유니코드로 강제 변환되어야 합니다. 강제 변환 중 발생하는 오류 (예: `None in u'abc'`)는 마스킹되지 않아야 합니다.

## 강제 변환 (Coercion)
Python 문자열과 유니코드 객체를 사용하여 새 객체를 형성할 때는 항상 더 정밀한 형식, 즉 유니코드 객체로 강제 변환되어야 합니다.

*   `u + s := u + unicode(s)`
*   `s + u := unicode(s) + u`

모든 문자열 메서드(string methods)는 관련 모든 문자열을 유니코드로 변환한 다음, 동일한 이름의 유니코드 메서드에 인수를 적용하여 동등한 유니코드 객체 메서드 호출로 위임해야 합니다. 예를 들어, `string.join((s,u),sep)`는 `(s + sep) + u`처럼 동작해야 합니다.

유니코드 객체에 대한 %-포매팅(%-formatting) 논의는 **포매팅 마커 (Formatting Markers)** 섹션을 참조하십시오.

## 예외 (Exceptions)
`UnicodeError`는 `exceptions` 모듈에 `ValueError`의 서브클래스(subclass)로 정의됩니다. C 수준에서는 `PyExc_UnicodeError`를 통해 사용할 수 있습니다. 유니코드 인코딩/디코딩과 관련된 모든 예외는 `UnicodeError`의 서브클래스여야 합니다.

## 코덱 (Coder/Decoders) 조회 (Codecs Lookup)
코덱(Codec) 검색 레지스트리(search registry)는 "codecs" 모듈에 의해 구현되어야 합니다.

*   `codecs.register(search_function)`

검색 함수는 하나의 인자(모두 소문자이며 하이픈과 공백이 언더스코어로 변환된 인코딩 이름)를 받아야 하며, 다음 인수를 받는 함수 튜플(`(encoder, decoder, stream_reader, stream_writer)`)을 반환할 것으로 예상됩니다.

*   `encoder` 및 `decoder`: Codec 인스턴스의 `.encode` / `.decode` 메서드와 동일한 인터페이스를 가져야 하는 함수 또는 메서드입니다. 이 함수/메서드는 상태 비저장(stateless) 모드에서 작동해야 합니다.
*   `stream_reader` 및 `stream_writer`: 다음 인터페이스를 가진 팩토리 함수(factory function)여야 합니다.
    *   `factory(stream,errors='strict')`
    *   팩토리 함수는 `StreamWriter` / `StreamReader`가 정의한 인터페이스를 제공하는 객체를 반환해야 합니다. 스트림 코덱(Stream codecs)은 상태를 유지할 수 있습니다.

`errors`에 가능한 값은 아래 **코덱 인터페이스 정의 (Codecs Interface Definition)** 섹션에서 정의됩니다.

검색 함수가 주어진 인코딩을 찾을 수 없는 경우 `None`을 반환해야 합니다. 인코딩에 대한 별칭(aliasing) 지원은 검색 함수가 구현하도록 남겨둡니다.

`codecs` 모듈은 성능상의 이유로 인코딩 캐시(cache)를 유지합니다. 인코딩은 먼저 캐시에서 찾아집니다. 찾을 수 없으면 등록된 검색 함수 목록을 스캔합니다. 코덱 튜플을 찾을 수 없으면 `LookupError`가 발생합니다. 그렇지 않으면 코덱 튜플이 캐시에 저장되고 호출자에게 반환됩니다.

코덱 인스턴스를 조회하려면 다음 API를 사용해야 합니다.

*   `codecs.lookup(encoding)`

이것은 찾은 코덱 튜플을 반환하거나 `LookupError`를 발생시킵니다.

## 표준 코덱 (Standard Codecs)
표준 코덱은 Python 표준 코드 라이브러리의 `encodings/` 패키지 디렉토리 내에 있어야 합니다. 해당 디렉토리의 `__init__.py` 파일은 지연 모듈 기반 코덱 조회(lazy module based codec lookup)를 구현하는 Codec Lookup 호환 검색 함수를 포함해야 합니다.

Python은 가장 관련성이 높은 인코딩을 위한 몇 가지 표준 코덱을 제공해야 합니다. 예를 들면 다음과 같습니다.

*   `'utf-8'`: 8비트 가변 길이 인코딩
*   `'utf-16'`: 16비트 가변 길이 인코딩 (리틀/빅 엔디안)
*   `'utf-16-le'`: `utf-16`이지만 명시적으로 리틀 엔디안
*   `'utf-16-be'`: `utf-16`이지만 명시적으로 빅 엔디안
*   `'ascii'`: 7비트 ASCII 코드 페이지
*   `'iso-8859-1'`: ISO 8859-1 (Latin 1) 코드 페이지
*   `'unicode-escape'`: 정의는 **유니코드 생성자 (Unicode Constructors)** 섹션 참조
*   `'raw-unicode-escape'`: 정의는 **유니코드 생성자 (Unicode Constructors)** 섹션 참조
*   `'native'`: Python에서 사용하는 내부 형식(Internal Format)의 덤프(dump)

일반적인 별칭(aliases)도 기본적으로 제공되어야 합니다 (예: `'iso-8859-1'`에 대한 `'latin-1'`).

**참고:** `'utf-16'`은 파일 입/출력을 위해 바이트 순서 마크(Byte Order Mark, BOM)를 사용하고 요구하여 구현되어야 합니다.

아시아 스크립트를 지원하는 CJK와 같은 다른 모든 인코딩은 핵심 Python 배포판에 포함되지 않고 이 제안의 일부가 아닌 별도의 패키지로 구현되어야 합니다.

## 코덱 인터페이스 정의 (Codecs Interface Definition)
다음 기본 클래스(base class)는 "codecs" 모듈에 정의되어야 합니다. 이들은 인코딩 모듈 구현자가 사용할 템플릿을 제공할 뿐만 아니라 유니코드 구현체에서 예상하는 인터페이스를 정의합니다.

여기서 정의된 코덱 인터페이스는 더 넓은 범위의 애플리케이션에 적합합니다. 유니코드 구현체는 `.encode()` 및 `.write()` 입력으로 유니코드 객체를 예상하고, `.decode()` 입력으로 문자 버퍼 호환 객체를 예상합니다. `.encode()` 및 `.read()`의 출력은 Python 문자열이어야 하고, `.decode()`는 유니코드 객체를 반환해야 합니다.

먼저, 상태 비저장(stateless) 인코더/디코더가 있습니다. 이들은 모든 구성 요소가 메모리에 존재해야 하므로 스트림 코덱(아래 참조)처럼 청크(chunk) 단위로 작동하지 않습니다.

```python
class Codec:
    """상태 비저장 인코더/디코더를 위한 인터페이스를 정의합니다.
    .encode()/.decode() 메서드는 errors 인수를 제공하여
    다른 오류 처리 스키마를 구현할 수 있습니다.
    다음 문자열 값이 정의됩니다:
    'strict' - 오류 (또는 서브클래스)를 발생시킵니다.
    'ignore' - 문자를 무시하고 다음으로 계속 진행합니다.
    'replace' - 적절한 대체 문자로 바꿉니다. Python은 내장 유니코드 코덱에
                공식 U+FFFD REPLACEMENT CHARACTER를 사용합니다.
    """
    def encode(self, input, errors='strict'):
        """input 객체를 인코딩하고 (출력 객체, 소비된 길이) 튜플을 반환합니다.
        errors는 적용할 오류 처리를 정의합니다. 기본값은 'strict' 처리입니다.
        이 메서드는 Codec 인스턴스에 상태를 저장할 수 없습니다.
        인코딩/디코딩 효율성을 위해 상태를 유지해야 하는 코덱에는 StreamCodec을 사용하십시오.
        """
        pass # 구현은 PEP 100 원문을 참조하십시오.

    def decode(self, input, errors='strict'):
        """input 객체를 디코딩하고 (출력 객체, 소비된 길이) 튜플을 반환합니다.
        input은 bf_getreadbuf 버퍼 슬롯을 제공하는 객체여야 합니다.
        Python 문자열, 버퍼 객체 및 메모리 매핑 파일이 이 슬롯을 제공하는 객체의 예입니다.
        errors는 적용할 오류 처리를 정의합니다. 기본값은 'strict' 처리입니다.
        이 메서드는 Codec 인스턴스에 상태를 저장할 수 없습니다.
        인코딩/디코딩 효율성을 위해 상태를 유지해야 하는 코덱에는 StreamCodec을 사용하십시오.
        """
        pass # 구현은 PEP 100 원문을 참조하십시오.
```

`StreamWriter` 및 `StreamReader`는 스트림(stream)에서 작동하는 상태 저장(stateful) 인코더/디코더를 위한 인터페이스를 정의합니다. 이들은 데이터를 청크 단위로 처리하여 메모리를 효율적으로 사용할 수 있도록 합니다. 메모리에 큰 문자열이 있는 경우, `cStringIO` 객체로 래핑한 다음 이러한 코덱을 사용하여 청크 처리(예: 사용자에게 진행 정보 제공)를 할 수 있습니다.

```python
class StreamWriter(Codec):
    def __init__(self, stream, errors='strict'):
        """StreamWriter 인스턴스를 생성합니다.
        stream은 (바이너리) 데이터를 쓰기 위해 열린 파일과 유사한 객체여야 합니다.
        StreamWriter는 errors 키워드 인수를 제공하여 다른 오류 처리 스키마를 구현할 수 있습니다.
        다음 매개변수가 정의됩니다:
        'strict' - ValueError (또는 서브클래스)를 발생시킵니다.
        'ignore' - 문자를 무시하고 다음으로 계속 진행합니다.
        'replace'- 적절한 대체 문자로 바꿉니다.
        """
        self.stream = stream
        self.errors = errors

    def write(self, object):
        """객체의 내용을 인코딩하여 self.stream에 씁니다.
        """
        data, consumed = self.encode(object, self.errors)
        self.stream.write(data)

    def writelines(self, list):
        """연결된 문자열 목록을 .write()를 사용하여 스트림에 씁니다.
        """
        self.write(''.join(list))

    def reset(self):
        """상태 유지를 위해 사용된 코덱 버퍼를 플러시하고 재설정합니다.
        이 메서드를 호출하면 출력 데이터가 깨끗한 상태로 유지되어,
        전체 스트림을 다시 스캔하여 상태를 복구할 필요 없이
        새로운 데이터를 추가할 수 있도록 해야 합니다.
        """
        pass

    def __getattr__(self, name, getattr=getattr):
        """기본 스트림에서 다른 모든 메서드를 상속합니다.
        """
        return getattr(self.stream, name)

class StreamReader(Codec):
    def __init__(self, stream, errors='strict'):
        """StreamReader 인스턴스를 생성합니다.
        stream은 (바이너리) 데이터를 읽기 위해 열린 파일과 유사한 객체여야 합니다.
        StreamReader는 errors 키워드 인수를 제공하여 다른 오류 처리 스키마를 구현할 수 있습니다.
        다음 매개변수가 정의됩니다:
        'strict' - ValueError (또는 서브클래스)를 발생시킵니다.
        'ignore' - 문자를 무시하고 다음으로 계속 진행합니다.
        'replace'- 적절한 대체 문자로 바꿉니다.
        """
        self.stream = stream
        self.errors = errors

    def read(self, size=-1):
        """스트림 self.stream에서 데이터를 디코딩하고 결과 객체를 반환합니다.
        size는 디코딩 목적으로 스트림에서 읽을 대략적인 최대 바이트 수를 나타냅니다.
        디코더는 필요에 따라 이 설정을 수정할 수 있습니다.
        기본값 -1은 가능한 한 많이 읽고 디코딩함을 나타냅니다.
        size는 거대한 파일을 한 번에 디코딩하는 것을 방지하기 위한 것입니다.
        이 메서드는 탐욕적인 읽기 전략(greedy read strategy)을 사용해야 합니다.
        즉, 인코딩 정의 및 주어진 size 내에서 허용되는 만큼 많은 데이터를 읽어야 합니다.
        예를 들어, 스트림에 선택적 인코딩 끝 또는 상태 마커가 있는 경우,
        이들도 읽어야 합니다.
        """
        pass # 구현은 PEP 100 원문을 참조하십시오.

    def readline(self, size=None):
        """입력 스트림에서 한 줄을 읽고 디코딩된 데이터를 반환합니다.
        참고: .readlines() 메서드와 달리, 이 메서드는 기본 스트림의
        .readline() 메서드에서 줄 바꿈 지식을 상속합니다.
        현재 코덱 디코더를 사용한 줄 바꿈 지원은 줄 버퍼링 부족으로 인해 없습니다.
        그러나 서브클래스는 가능한 경우 자체 줄 바꿈 지식을 사용하여 이 메서드를 구현해야 합니다.
        size가 주어진 경우, 스트림의 .readline() 메서드에 size 인수로 전달됩니다.
        """
        pass # 구현은 PEP 100 원문을 참조하십시오.

    def readlines(self, sizehint=0):
        """입력 스트림에서 사용 가능한 모든 줄을 읽고 줄 목록으로 반환합니다.
        줄 바꿈은 코덱의 디코더 메서드를 사용하여 구현되며 목록 항목에 포함됩니다.
        sizehint가 주어진 경우, 스트림의 .read() 메서드에 size 인수로 전달됩니다.
        """
        pass # 구현은 PEP 100 원문을 참조하십시오.

    def reset(self):
        """상태 유지를 위해 사용된 코덱 버퍼를 재설정합니다.
        스트림 위치 재지정은 발생하지 않아야 합니다.
        이 메서드는 주로 디코딩 오류로부터 복구할 수 있도록 하기 위한 것입니다.
        """
        pass

    def __getattr__(self, name, getattr=getattr):
        """기본 스트림에서 다른 모든 메서드를 상속합니다.
        """
        return getattr(self.stream, name)
```

스트림 코덱 구현자는 `StreamWriter`와 `StreamReader` 인터페이스를 하나의 클래스로 결합할 수 있습니다. 심지어 이 모든 것을 `Codec` 클래스와 결합하는 것도 가능합니다.

구현자는 코덱 기능을 향상시키거나 작동에 필요한 추가 상태 정보를 제공하기 위해 추가 메서드를 자유롭게 추가할 수 있습니다. 그러나 내부 코덱 구현은 위 인터페이스만 사용합니다.

유니코드 구현체는 이러한 기본 클래스를 사용하는 것을 요구하지 않으며, 인터페이스만 일치해야 합니다. 이는 코덱을 확장 타입(extension types)으로 작성할 수 있도록 합니다.

지침으로, 큰 매핑 테이블(mapping tables)은 별도의 (공유) 확장 모듈(extension modules)에서 정적 C 데이터(static C data)를 사용하여 구현해야 합니다. 이렇게 하면 여러 프로세스가 동일한 데이터를 공유할 수 있습니다.

유니코드 매핑 파일(mapping files)을 매핑 모듈(mapping modules)로 자동 변환하는 도구가 추가 매핑 지원을 간소화하기 위해 제공되어야 합니다.

## 공백 (Whitespace)
`.split()` 메서드는 유니코드에서 무엇이 공백으로 간주되는지 알아야 합니다.

## 대소문자 변환 (Case Conversion)
유니코드 데이터의 대소문자 변환은 존중해야 할 다양한 조건이 많기 때문에 상당히 복잡합니다. 대소문자 변환 구현에 대한 지침은 유니코드 기술 보고서 TR13을 참조하십시오.

Python의 경우, 유니코드에 포함된 1:1 변환만 구현해야 합니다. 로케일 종속적이거나 다른 특수한 대소문자 변환(유니코드 표준 파일 `SpecialCasing.txt` 참조)은 사용자 정의 루틴에 맡기고 핵심 인터프리터에 포함되어서는 안 됩니다.

`.capitalize()` 및 `.iscapitalized()` 메서드는 위의 기술 보고서에 정의된 대소문자 매핑 알고리즘을 가능한 한 가깝게 따라야 합니다.

## 줄 바꿈 (Line Breaks)
줄 바꿈은 B 속성을 가진 모든 유니코드 문자와 CRLF, CR, LF (이 순서로 해석됨) 조합 및 표준에 정의된 다른 특수 줄 구분 기호에 대해 수행되어야 합니다.

유니코드 타입은 위 사양에 따라 줄 목록을 반환하는 `.splitlines()` 메서드를 제공해야 합니다. 자세한 내용은 **유니코드 메서드 및 속성 (Unicode Methods & Attributes)** 섹션을 참조하십시오.

## 유니코드 문자 속성 (Unicode Character Properties)
별도의 모듈 "unicodedata"는 표준의 `UnicodeData.txt` 파일에 정의된 모든 유니코드 문자 속성에 대한 압축된 인터페이스를 제공해야 합니다.

이러한 속성은 숫자, 자릿수, 공백 등을 인식하는 방법을 제공합니다.

이 모듈은 모든 유니코드 문자에 대한 접근을 제공해야 하므로, 결국 약 600KB를 차지하는 `UnicodeData.txt`의 데이터를 포함해야 합니다. 이러한 이유로 데이터는 정적 C 데이터에 저장되어야 합니다. 이는 기본 OS가 프로세스 간에 공유할 수 있는 공유 모듈로 컴파일할 수 있도록 합니다 (일반 Python 코드 모듈과 다르게).

이 정보에 접근하기 위한 표준 Python 인터페이스가 있어야 다른 구현자들이 자신들의 잠재적으로 향상된 버전을 (예: 데이터를 즉석에서 압축 해제하는 버전) 연결할 수 있습니다.

## 사설 코드 포인트 영역 (Private Code Point Areas)
이러한 영역에 대한 지원은 사용자 정의 코덱에 맡겨지며, 핵심에 명시적으로 통합되지 않습니다. 내부 형식(Internal Format)이 구현되었기 때문에 `\uE000`에서 `\uF8FF` 사이의 영역만 사설 인코딩에 사용할 수 있습니다.

## 내부 형식 (Internal Format)
유니코드 객체의 내부 형식은 'unsigned short' (또는 16비트를 갖는 다른 부호 없는 숫자 타입)로 구현된 Python 특정 고정 형식 `<PythonUnicode>`를 사용해야 합니다. 바이트 순서(Byte order)는 플랫폼에 따라 다릅니다.

이 형식은 해당 유니코드 순서 값의 UTF-16 인코딩을 저장합니다. Python 유니코드 구현체는 이러한 값을 UCS-2 값인 것처럼 다룰 것입니다. UCS-2와 UTF-16은 현재 정의된 모든 유니코드 문자 포인트에 대해 동일합니다. 서러게이트(surrogates) 없는 UTF-16은 약 64k 문자에 접근할 수 있으며 유니코드의 기본 다국어 평면(Basic Multilingual Plane, BMP)에 있는 모든 문자를 포함합니다.

코덱이 유니코드 객체 생성자에게 전달하는 데이터가 이 가정을 준수하는지 확인하는 것은 코덱의 책임입니다. 생성자는 유니코드 준수 여부 또는 서러게이트 사용 여부를 확인하지 않습니다.

향후 구현은 32비트 제한을 모든 UTF-16 주소 지정 가능한 문자 집합(약 1M 문자)으로 확장할 수 있습니다.

유니코드 API는 `<PythonUnicode>`에서 컴파일러의 `wchar_t`로 인터페이스 루틴을 제공해야 합니다. `wchar_t`는 사용되는 컴파일러/libc/플랫폼에 따라 16비트 또는 32비트일 수 있습니다.

유니코드 객체는 객체의 값을 `<default encoding>`을 사용하여 저장하는 캐시된 Python 문자열 객체 `<defenc>`에 대한 포인터를 가져야 합니다. 이는 성능 및 내부 파싱(Internal Argument Parsing 참조)상의 이유로 필요합니다. 이 버퍼는 객체에 대한 `<default encoding>`으로의 첫 번째 변환 요청이 발행될 때 채워집니다.

Python 식별자(identifiers)는 ASCII로만 정의되므로 (현재로서는) 인터닝(interning)은 필요하지 않습니다.

`codecs.BOM`은 내부적으로 사용되는 형식에 대한 바이트 순서 마크(BOM)를 반환해야 합니다. `codecs` 모듈은 편의 및 참조를 위해 다음 추가 상수를 제공해야 합니다 (`codecs.BOM`은 플랫폼에 따라 `BOM_BE` 또는 `BOM_LE`가 될 것입니다).

*   `BOM_BE`: `'\376\377'` (빅 엔디안 플랫폼에서 UTF-16의 유니코드 U+0000FEFF에 해당 == ZERO WIDTH NO-BREAK SPACE)
*   `BOM_LE`: `'\377\376'` (리틀 엔디안 플랫폼에서 UTF-16의 유니코드 U+0000FFFE에 해당 == 유효하지 않은 유니코드 문자로 정의됨)
*   `BOM4_BE`: `'\000\000\376\377'` (UCS-4의 유니코드 U+0000FEFF에 해당)
*   `BOM4_LE`: `'\377\376\000\000'` (UCS-4의 유니코드 U+0000FFFE에 해당)

유니코드는 빅 엔디안 바이트 순서를 "올바른" 것으로 간주합니다. 뒤바뀐 순서는 "잘못된" 형식의 지표로 간주되므로 유효하지 않은 문자 정의가 나옵니다.

`configure` 스크립트는 Python이 네이티브 `wchar_t` 타입을 사용할 수 있는지 여부(16비트 부호 없는 타입이어야 함)를 결정하는 데 도움을 제공해야 합니다.

## 버퍼 인터페이스 (Buffer Interface)
`bf_getcharbuf`의 기반으로 `<defenc>` Python 문자열 객체를, `bf_getreadbuf`의 내부 버퍼를 사용하여 버퍼 인터페이스를 구현합니다. `bf_getcharbuf`가 요청되고 `<defenc>` 객체가 아직 존재하지 않으면 먼저 생성됩니다.

특별한 경우로, 파서 마커 "s#"은 원시 유니코드 UTF-16 데이터(bf_getreadbuf가 반환함)를 반환하지 않고, 대신 유니코드 객체를 기본 인코딩을 사용하여 인코딩한 다음 결과 문자열 객체에 대한 포인터를 반환합니다 (변환 실패 시 예외를 발생시킵니다). 이는 다른 쪽에서 인식하지 못할 수 있는 바이너리 데이터를 실수로 출력 스트림에 쓰는 것을 방지하기 위해 수행되었습니다.

이것은 사용할 인코딩에 대한 추가 지정 없이 출력 스트림(일반적으로 이 인터페이스를 사용함)에 쓸 수 있다는 장점이 있습니다.

유니코드 객체의 읽기 버퍼 인터페이스에 접근해야 하는 경우, `PyObject_AsReadBuffer()` 인터페이스를 사용하십시오.

내부 형식은 `'unicode-internal'` 코덱을 사용하여 접근할 수도 있습니다 (예: `u.encode('unicode-internal')`을 통해).

## 피클링/마샬링 (Pickle/Marshalling)
네이티브 유니코드 객체 지원을 가져야 합니다. 객체는 플랫폼 독립적인 인코딩을 사용하여 인코딩되어야 합니다.

마샬(Marshal)은 UTF-8을 사용해야 하며, 피클(Pickle)은 (텍스트 모드에서는) Raw-Unicode-Escape 또는 (바이너리 모드에서는) UTF-8을 인코딩으로 선택해야 합니다. UTF-16 대신 UTF-8을 사용하면 BOM(바이트 순서 마크)을 저장할 필요가 없다는 장점이 있습니다.

## 정규 표현식 (Regular Expressions)
Secret Labs AB는 유니코드 인식 정규 표현식(Unicode-aware regular expression) 엔진을 개발 중입니다. 이는 일반 8비트, UCS-2, 그리고 (선택적으로) UCS-4 내부 문자 버퍼에서 작동합니다.

유니코드 RE를 처리하는 방법에 대한 몇 가지 언급은 유니코드 기술 보고서 TR18을 참조하십시오.

## 포매팅 마커 (Formatting Markers)
포맷 마커는 Python 포맷 문자열에서 사용됩니다. Python 문자열이 포맷 문자열로 사용되는 경우, 다음 해석이 적용되어야 합니다.

*   `'%s'`: 유니코드 객체의 경우, 이는 전체 포맷 문자열을 유니코드로 강제 변환합니다. 성능상의 이유로 처음부터 유니코드 포맷 문자열을 사용하는 것이 좋습니다.
    *   포맷 문자열이 유니코드 객체인 경우, 모든 매개변수는 먼저 유니코드로 강제 변환된 다음 결합되어 포맷 문자열에 따라 포맷됩니다. 숫자는 먼저 문자열로 변환된 다음 유니코드로 변환됩니다.
*   `'%s'`: Python 문자열은 `<default encoding>`을 사용하여 유니코드 문자열로 해석됩니다. 유니코드 객체는 있는 그대로 사용됩니다.

다른 모든 문자열 포맷터(string formatters)도 accordingly 작동해야 합니다.

예시:
`u"%s %s" % (u"abc", "abc") == u"abc abc"`

## 내부 인자 파싱 (Internal Argument Parsing)
이러한 마커는 `PyArg_ParseTuple()` API에서 사용됩니다.

*   `"U"`: 유니코드 객체를 확인하고 포인터를 반환합니다.
*   `"s"`: 유니코드 객체의 경우: 객체의 `<defenc>` 버퍼(이는 `<default encoding>`을 사용합니다)에 대한 포인터를 반환합니다.
*   `"s#"`: 유니코드 객체의 기본 인코딩된 버전 접근 (버퍼 인터페이스 참조). 길이는 유니코드 객체 길이가 아닌 기본 인코딩된 문자열의 길이와 관련이 있습니다.
*   `"t#"`: `"s#"`과 동일합니다.
*   `"es"`: 두 매개변수를 받습니다: `encoding` (`const char *`) 및 `buffer` (`char **`).
    *   입력 객체는 일반적인 방식으로 유니코드로 강제 변환된 다음, 주어진 인코딩을 사용하여 문자열로 인코딩됩니다.
    *   출력 시, 필요한 크기의 버퍼가 할당되고 `*buffer`를 통해 NULL로 종료된 문자열로 반환됩니다. 인코딩된 문자열은 내장 NULL 문자를 포함할 수 없습니다. 호출자는 사용 후 할당된 `*buffer`를 해제하기 위해 `PyMem_Free()`를 호출할 책임이 있습니다.
*   `"es#"`: 세 매개변수를 받습니다: `encoding` (`const char *`), `buffer` (`char **`), `buffer_len` (`int *`).
    *   입력 객체는 일반적인 방식으로 유니코드로 강제 변환된 다음, 주어진 인코딩을 사용하여 문자열로 인코딩됩니다.
    *   `*buffer`가 NULL이 아니면 입력 시 `*buffer_len`은 `sizeof(buffer)`로 설정되어야 합니다. 출력은 `*buffer`에 복사됩니다.
    *   `*buffer`가 NULL이면 필요한 크기의 버퍼가 할당되고 출력은 그 안에 복사됩니다. `*buffer`는 할당된 메모리 영역을 가리키도록 업데이트됩니다. 호출자는 사용 후 할당된 `*buffer`를 해제하기 위해 `PyMem_Free()`를 호출할 책임이 있습니다.
    *   두 경우 모두 `*buffer_len`은 작성된 문자 수(후행 NULL 바이트 제외)로 업데이트됩니다. 출력 버퍼는 NULL로 종료됨이 보장됩니다.

예시: (코드 예시는 원문 PEP 100 참조)

## 파일/스트림 출력 (File/Stream Output)
`file.write(object)` 및 대부분의 다른 스트림 라이터는 데이터를 쿼리하기 위해 "s#" 또는 "t#" 인자 파싱 마커를 사용하므로, 유니코드 객체의 기본 인코딩된 문자열 버전이 스트림에 기록됩니다 (버퍼 인터페이스 참조).

유니코드를 사용하여 파일을 명시적으로 처리하려면 `codecs` 모듈을 통해 사용할 수 있는 표준 스트림 코덱을 사용해야 합니다.

`codecs` 모듈은 `open(filename,mode,encoding)`이라는 단축키를 제공해야 하며, 이는 필요할 때 `mode`에 'b' 문자가 포함되도록 보장합니다.

## 파일/스트림 입력 (File/Stream Input)
입력 데이터가 어떤 인코딩을 사용하는지는 사용자만 알기 때문에 특별한 마법은 적용되지 않습니다. 사용자는 필요에 따라 문자열 데이터를 유니코드 객체로 명시적으로 변환하거나 `codecs` 모듈에 정의된 파일 래퍼(file wrappers)를 사용해야 합니다 (파일/스트림 출력 참조).

## 유니코드 메서드 및 속성 (Unicode Methods & Attributes)
모든 Python 문자열 메서드에 더해 다음이 제공됩니다.

*   `.[encode]([encoding=<default encoding>][,errors="strict"])`: **유니코드 출력 (Unicode Output)** 참조.
*   `.splitlines([include_breaks=0])`: 유니코드 문자열을 (유니코드) 줄 목록으로 분할합니다. `include_breaks`가 참(true)이면 줄 바꿈이 포함된 줄을 반환합니다. 줄 바꿈이 어떻게 이루어지는지에 대한 사양은 **줄 바꿈 (Line Breaks)** 섹션을 참조하십시오.

## 코드 베이스 (Code Base)
Fredrik Lundh의 유니코드 객체 구현을 기반으로 사용해야 합니다. 이 구현은 필요한 문자열 메서드 대부분을 이미 구현하고 있으며, 우리가 기반으로 삼을 수 있는 잘 작성된 코드 베이스를 제공합니다.

Fredrik의 구현에 포함된 객체 공유(object sharing)는 제거되어야 합니다.

## 테스트 케이스 (Test Cases)
테스트 케이스는 `Lib/test/test_string.py`의 것을 따라야 하며, 코덱 레지스트리(Codec Registry) 및 표준 코덱에 대한 추가 확인을 포함해야 합니다.

## 참고 자료 (References)
PEP 100은 유니코드 컨소시엄, 유니코드 FAQ, 유니코드 3.0 표준, 유니코드 기술 보고서 등 다양한 유니코드 관련 문서를 참고 자료로 명시하고 있습니다. 또한 ECMAScript(JavaScript)에 유니코드를 도입하는 방법, IANA 문자 집합 이름, POSIX 및 Linux의 UTF-8 및 유니코드 지원에 대한 논의, 다양한 인코딩(UCS-2, UTF-7, UTF-8, UTF-16)에 대한 개요 등도 참고 자료로 포함되어 있습니다.

## 제안 변경 이력 (History of this Proposal)
이 제안은 0.1 버전부터 1.7 버전까지 여러 차례 수정되었습니다. 주요 변경 사항에는 코덱 API의 추가 및 수정, 기본 인코딩 설정 방법, 버퍼 프로토콜 구현 개선, `%` 포매팅 및 비교/해시 값 처리 방식 변경, 새로운 파서 마커 "es" 및 "es#" 추가 등이 있습니다.
*   **1.7:** "s#" 동작 변경에 대한 참고 추가.
*   **1.6:** 구현에서 사용되는 이름이므로 `<defencstr>`을 `<defenc>`로 변경. 버퍼 프로토콜 구현에서 `<defenc>` 사용에 대한 참고 추가.
*   **1.5:** `<default encoding>` 설정에 대한 참고 추가. 일부 오타 수정. `<defencstr>`을 `<utf8str>`로 변경.
*   **1.4:** 혼합 타입 비교 및 `in` 테스트에 대한 참고 추가. 포맷 문자열에서 유니코드 객체 처리 변경 (`'%s' % u`와 함께 사용될 경우 이제 포맷 문자열을 유니코드로 강제 변환하여 유니코드 객체를 반환). IANA 문자 집합 이름에 대한 링크 추가. 새로운 코덱 메서드 `.readline()`, `.readlines()`, `.writelines()` 추가.
*   **1.3:** 새로운 "es" 및 "es#" 파서 마커 추가.
*   **1.2:** `codecs.open()`에 대한 POD 제거.
*   **1.1:** 비교 및 해시 값에 대한 참고 추가. 대소문자 매핑 알고리즘에 대한 참고 추가. 스트림 코덱의 `.read()` 및 `.write()` 메서드를 표준 파일과 유사한 객체 메서드와 일치하도록 변경 (메서드가 소비된 바이트 정보를 더 이상 반환하지 않음).
*   **1.0:** `encode` 코덱 메서드를 `decode` 메서드와 대칭되도록 변경 (둘 다 이제 `(object, data consumed)`를 반환하여 상호 교환 가능해짐). `Codec` 클래스의 `__init__` 메서드 제거 (메서드는 상태 비저장). `errors` 인수를 메서드로 이동. 입력 및 출력 객체의 타입에 대해 코덱 디자인을 더 일반화. `StreamWriter.flush`를 `StreamWriter.reset`으로 변경하여 스트림의 `.flush()` 메서드 재정의를 방지. `.breaklines()`를 `.splitlines()`로 이름 변경. `unicodec` 모듈을 `codecs`로 이름 변경. 파일 I/O 섹션을 스트림 코덱을 참조하도록 수정.
*   **0.9:** `errors` 키워드 인자 정의 변경. 'replace' 오류 처리 추가. 코덱 API가 입력 시 버퍼와 유사한 객체를 허용하도록 변경. 몇 가지 사소한 오타 수정. **공백 (Whitespace)** 섹션 추가 및 공백 및 줄 바꿈 특성을 가진 유니코드 문자에 대한 참조 포함. 검색 함수가 소문자 인코딩 이름을 예상할 수 있다는 참고 추가. 코덱 API에서 슬라이싱 및 오프셋 제거.
*   **0.8:** `encodings` 패키지 및 원시 유니코드 이스케이프 인코딩 추가. 제안의 탭을 공백으로 변경. 유니코드 포맷 문자열에 대한 참고 추가. `.breaklines()` 메서드 추가.
*   **0.7:** 새로운 코덱 API 세트 추가. 다른 인코더 조회 스키마 추가. 일부 이름 수정.
*   **0.6:** "s#"을 "t#"로 변경. `<defencbuf>`를 실제 Python 문자열 객체를 저장하는 `<defencstr>`로 변경. 버퍼 인터페이스를 `<defencstr>`의 버퍼 인터페이스로 요청 위임하도록 변경. `unicodec.codecs` 딕셔너리에 대한 명시적 참조 제거. 설정 가능한 기본 인코딩 제거. `UnicodeError`를 `unicodec`에서 `exceptions`로 이동. "s#"이 내부 데이터를 반환하지 않음. UCS-2/UTF-16 검사를 유니코드 생성자에서 코덱으로 전달.
*   **0.5:** `sys.bom`을 `unicodec.BOM`으로 이동. 대소문자 매핑, 사설 사용 인코딩, 유니코드 문자 속성에 대한 섹션 추가.
*   **0.4:** 코덱 인터페이스 추가, %-포매팅에 대한 참고, 일부 인코딩 세부 사항 변경, 스트림 래퍼에 대한 주석 추가, 일부 논의 지점 수정 (가장 중요: 내부 형식), 'unicode-escape' 인코딩 명확화, 인코딩 참조 추가.
*   **0.3:** 참조, 코덱 모듈에 대한 주석, 내부 형식, `bf_getcharbuffer` 및 RE 엔진 추가. Tim Peters가 제안한 'unicode-escape' 인코딩 추가 및 `repr(u)`Accordingly 수정.
*   **0.2:** Guido의 제안 통합, 스트림 코덱 및 파일 래핑 추가.
*   **0.1:** 첫 번째 버전.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.