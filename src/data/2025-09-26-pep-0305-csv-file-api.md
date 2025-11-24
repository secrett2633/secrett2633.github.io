---
title: "[Final] PEP 305 - CSV File API"
excerpt: "Python Enhancement Proposal 305: 'CSV File API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/305/
toc: true
toc_sticky: true
date: 2025-09-26 18:09:42+0900
last_modified_at: 2025-09-26 18:09:42+0900
published: true
---
> **원문 링크:** [PEP 305 - CSV File API](https://peps.python.org/pep-0305/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Jan-2003

# PEP 305 – CSV 파일 API

*   **작성자:** Kevin Altis, Dave Cole, Andrew McNamara, Skip Montanaro, Cliff Wells
*   **논의처:** Csv list
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2003년 1월 26일
*   **Python 버전:** 2.3
*   **게시 이력:** 2003년 1월 31일, 2003년 2월 13일

## 초록 (Abstract)

CSV(Comma Separated Values) 파일 형식은 스프레드시트와 데이터베이스에서 가장 흔히 사용되는 가져오기(import) 및 내보내기(export) 형식입니다. 많은 CSV 파일은 파싱(parsing)하기 간단하지만, 이 형식은 안정적인 명세(specification)로 공식적으로 정의되어 있지 않으며, `line.split(",")`과 같은 방식으로 CSV 파일의 라인을 파싱하는 것은 결국 실패할 수 있을 정도로 미묘한 특성을 가지고 있습니다. 이 PEP는 CSV 파일을 읽고 쓰기 위한 API를 정의하며, 이 API를 구현하는 관련 모듈이 함께 제공됩니다.

## 할 일 (To Do - 관심 있는 사람과 의욕적인 사람을 위한 참고 사항)

*   생성자(constructor)에 파일 객체(file object)를 전달하는 선택에 대한 더 나은 동기 부여. (참고: [https://mail.python.org/pipermail/csv/2003-January/000179.html](https://mail.python.org/pipermail/csv/2003-January/000179.html))
*   유니코드(Unicode). 으음 (ugh).

## 적용 분야 (Application Domain)

이 PEP는 한 가지 일을 잘 처리하는 데 중점을 둡니다: 다양한 필드 구분자(field separator), 인용 문자(quoting character), 인용 탈출 메커니즘(quote escape mechanism), 그리고 줄바꿈(line ending)을 사용할 수 있는 테이블 형태의 데이터(tabular data)를 파싱하는 것입니다. 작성자들은 제안된 모듈이 이 한 가지 파싱 문제를 효율적으로 해결할 것을 의도합니다. 작성자들은 다음 관련 주제들을 다룰 의도가 없습니다:

*   데이터 해석 (예: "10"이라는 문자열을 포함하는 필드가 문자열, float, 또는 int 중 무엇으로 해석되어야 하는가? 10진수, 16진수, 2진수 중 어떤 진법의 숫자인가? 따옴표로 묶인 숫자는 숫자 또는 문자열인가?)
*   지역별 데이터 표현 (예: 숫자 1.23을 "1.23", "1,23", 또는 "1 23"으로 작성해야 하는가?) – 이 부분은 결국 다루어질 수 있습니다.
*   고정 폭 테이블 데이터(fixed width tabular data) - 이미 안정적으로 파싱될 수 있습니다.

## 제안 배경 (Rationale)

종종 CSV 파일은 필드를 구분하는 쉼표를 기준으로 한 줄씩 읽고 분할하는 방식으로 처리할 수 있을 만큼 간단하게 포맷팅됩니다. 이는 특히 읽히는 모든 데이터가 숫자일 경우에 더욱 그렇습니다. 이러한 접근 방식은 한동안 작동할 수 있지만, 누군가 데이터에 예상치 못한 쉼표를 넣으면 문제가 발생할 수 있습니다. 문제를 깊이 파고들다 보면 결국 정규 표현식(regular expressions)을 사용하여 문제를 해결할 수 있다는 결론에 도달할 수 있습니다. 이 방법도 한동안 작동하다가 어느 날 갑자기 알 수 없는 이유로 오류가 발생할 수 있습니다. 문제가 커지면서 더 깊이 파고들게 되고, 결국 이 형식에 맞는 전용 파서(parser)가 필요하다는 것을 깨닫게 됩니다.

CSV 형식은 잘 정의되어 있지 않으며, 구현에 따라 미묘한 코너 케이스(corner cases)가 많습니다. 약어의 "V"가 "Values" 대신 "Vague"(모호함)를 의미한다는 제안도 있었습니다. 다양한 구분자(delimiter)와 인용 문자(quoting character)는 시작에 불과합니다. 일부 프로그램은 각 구분자 뒤에 공백을 생성하지만, 이 공백은 다음 필드의 일부가 아닙니다. 다른 프로그램은 내장된 인용 문자(embedded quoting characters)를 두 배로 만들어서(doubling them) 인용하거나, 이스케이프 문자(escape character)를 앞에 붙여서 인용합니다. 이처럼 이상한 방식으로 처리하는 목록은 끝없이 길어 보일 수 있습니다.

이러한 모든 가변성은 프로그래머가 많은 소스의 CSV 파일을 안정적으로 파싱하거나, 특정 외부 프로그램에 입력할 목적으로 CSV 파일을 생성할 때 해당 소스 및 프로그램을 철저히 이해하지 않으면 어렵게 만듭니다. 이 PEP와 이에 수반되는 소프트웨어는 이 과정을 덜 취약하게 만들려고 시도합니다.

## 기존 모듈 (Existing Modules)

이 문제는 이전에 다루어진 적이 있습니다. 현재 Python 커뮤니티에서 프로그래머가 CSV 파일을 읽고 쓸 수 있도록 하는 최소 세 가지 모듈이 있습니다:

*   Object Craft의 CSV 모듈
*   Cliff Wells의 Python-DSV 모듈
*   Laurence Tratt의 ASV 모듈

각 모듈은 다른 API를 가지고 있어 프로그래머가 모듈 간에 전환하기가 다소 어렵습니다. 더 큰 문제는 각 모듈이 CSV의 일부 코너 케이스를 다르게 해석한다는 점입니다. 따라서 프로그래머는 다른 모듈 API 간의 차이를 극복한 후에도 패키지 간의 의미론적 차이(semantic differences)를 다루어야 합니다.

## 모듈 인터페이스 (Module Interface)

이 PEP는 세 가지 기본 API를 지원합니다: CSV 파일을 읽고 파싱하는 API, CSV 파일을 작성하는 API, 그리고 리더(reader)와 라이터(writer)에게 다른 CSV 방언(dialect)을 식별하는 API입니다.

### CSV 파일 읽기 (Reading CSV Files)

CSV 리더(reader)는 `reader` 팩토리 함수(factory function)로 생성됩니다:

```python
obj = reader(iterable [, dialect='excel'] [optional keyword args])
```

리더 객체(reader object)는 라인을 반환하는 `iterable` 객체를 유일한 필수 매개변수로 받는 이터레이터(iterator)입니다. 이터러블 객체가 바이너리 모드(binary mode)를 지원하는 경우(파일 객체는 지원함), `reader` 함수의 `iterable` 인수는 바이너리 모드로 열려야 합니다. 이를 통해 리더 객체는 파일 내용의 해석에 대한 완전한 제어를 가집니다. 선택적 `dialect` 매개변수는 아래에서 논의됩니다. `reader` 함수는 또한 파서(parser)의 특정 형식 설정(format settings)을 정의하는 여러 선택적 키워드 인수(keyword arguments)를 받습니다 ("Formatting Parameters" 섹션 참조). 리더는 일반적으로 다음과 같이 사용됩니다:

```python
import csv

csvreader = csv.reader(open("some.csv", 'r', newline='')) # Python 3.x에서는 open()에 newline=''을 추가해야 함
for row in csvreader:
    process(row)
```

리더 객체가 반환하는 각 `row`는 문자열(string) 또는 유니코드 객체(Unicode objects)의 리스트(list)입니다.

`dialect` 매개변수와 개별 포맷팅 매개변수(formatting parameters)가 모두 생성자에 전달될 때, 먼저 `dialect`에서 포맷팅 매개변수를 조회한 다음 개별 포맷팅 매개변수가 검사됩니다.

### CSV 파일 쓰기 (Writing CSV Files)

라이터(writer) 생성은 비슷합니다:

```python
obj = writer(fileobj [, dialect='excel'], [optional keyword args])
```

라이터 객체는 바이너리 쓰기 모드(binary mode)로 열린 파일-유사 객체(file-like object)를 감싸는 래퍼(wrapper)입니다(이러한 구분이 이루어지는 경우). 이 객체는 리더 생성자와 동일한 선택적 키워드 매개변수를 받습니다.

라이터는 일반적으로 다음과 같이 사용됩니다:

```python
import csv

csvwriter = csv.writer(open("some.csv", "w", newline='')) # Python 3.x에서는 open()에 newline=''을 추가해야 함
for row in someiterable:
    csvwriter.writerow(row)
```

CSV 파일의 첫 번째 행으로 필드 이름(field names) 집합을 생성하려면 프로그래머는 명시적으로 작성해야 합니다. 예:

```python
import csv

names = ["Header1", "Header2", "Header3"]
csvwriter = csv.writer(open("some.csv", "w", newline=''))
csvwriter.writerow(names) # writerow()를 사용
for row in someiterable:
    csvwriter.writerow(row)
```

또는 작성될 이터러블(iterable)의 첫 번째 행으로 배열할 수 있습니다.

### 다양한 방언(Dialects) 관리 (Managing Different Dialects)

CSV는 다소 불분명한(ill-defined) 형식이기 때문에, 정확히 동일한 데이터를 포함하더라도 하나의 CSV 파일이 다른 CSV 파일과 다를 수 있는 많은 방법이 있습니다. 테이블 형태의 데이터를 가져오거나 내보낼 수 있는 많은 도구는 사용자에게 필드 구분자, 인용 문자, 줄 종료자(line terminator) 및 파일의 다른 특성을 나타내도록 허용합니다. 이러한 특성은 상당히 쉽게 결정할 수 있지만, 여전히 파악하기 다소 귀찮고 개별적으로 지정할 경우 함수 호출이 상당히 길어집니다.

많은 포맷팅 매개변수를 파악하고 지정하는 어려움을 최소화하기 위해, 리더 및 라이터 객체는 이러한 하위 수준 매개변수 그룹에 대한 편리한 핸들(handle)인 `dialect` 인수를 지원합니다. `dialect`가 문자열로 주어지면 모듈에 등록된 방언 중 하나를 이름으로 식별하며, 그렇지 않으면 아래 설명된 `Dialect` 클래스의 인스턴스여야 합니다.

방언은 일반적으로 특정 형식 제약(format constraints) 집합을 정의하는 애플리케이션 또는 조직의 이름을 따서 명명됩니다. 이 글을 쓰는 시점에는 모듈에 두 가지 방언이 정의되어 있습니다: Excel 97 및 Excel 2000의 CSV 파일 내보내기 기본 형식 제약 조건을 설명하는 "excel"과, "excel"과 동일하지만 ASCII TAB 문자를 필드 구분자로 지정하는 "excel-tab"입니다.

`Dialect`는 사용자가 서브클래싱(subclassing)하여 변형된 방언을 구성할 수 있도록 속성(attribute)만 있는 클래스로 구현됩니다. "excel" 방언은 `Dialect`의 서브클래스이며 다음과 같이 정의됩니다:

```python
class Dialect:
    # 플레이스홀더(placeholders)
    delimiter = None
    quotechar = None
    escapechar = None
    doublequote = None
    skipinitialspace = None
    lineterminator = None
    quoting = None

class excel(Dialect):
    delimiter = ','
    quotechar = '"'
    doublequote = True
    skipinitialspace = False
    lineterminator = '\r\n'
    quoting = QUOTE_MINIMAL
```

"excel-tab" 방언은 다음과 같이 정의됩니다:

```python
class exceltsv(excel):
    delimiter = '\t'
```

(개별 포맷팅 매개변수에 대한 설명은 "Formatting Parameters" 섹션을 참조하십시오.)

특정 방언에 대한 문자열 참조를 가능하게 하기 위해 모듈은 여러 함수를 정의합니다:

```python
dialect = get_dialect(name)
names = list_dialects()
register_dialect(name, dialect)
unregister_dialect(name)
```

*   `get_dialect()`는 주어진 이름과 관련된 `dialect` 인스턴스를 반환합니다.
*   `list_dialects()`는 등록된 모든 방언 이름의 리스트를 반환합니다.
*   `register_dialect()`는 문자열 이름과 `dialect` 클래스를 연결합니다.
*   `unregister_dialect()`는 이름/방언 연결을 삭제합니다.

### 포맷팅 매개변수 (Formatting Parameters)

`dialect` 인수 외에도 리더 및 라이터 생성자 모두 키워드 매개변수(keyword parameters)로 지정되는 여러 특정 포맷팅 매개변수를 받습니다. 이해되는 포맷팅 매개변수는 다음과 같습니다:

*   `quotechar`: 인용 문자(quoting character)로 사용할 한 글자 문자열을 지정합니다. 기본값은 `"`입니다. 이를 `None`으로 설정하는 것은 `quoting`을 `csv.QUOTE_NONE`으로 설정하는 것과 동일한 효과를 가집니다.
*   `delimiter`: 필드 구분자(field separator)로 사용할 한 글자 문자열을 지정합니다. 기본값은 `,`입니다.
*   `escapechar`: `quotechar`가 `None`으로 설정될 때 구분자(delimiter)를 이스케이프(escape)하는 데 사용되는 한 글자 문자열을 지정합니다.
*   `skipinitialspace`: 구분자 바로 뒤에 오는 공백을 해석하는 방법을 지정합니다. 기본값은 `False`이며, 이는 구분자 바로 뒤에 오는 공백이 다음 필드의 일부임을 의미합니다.
*   `lineterminator`: 행을 종료해야 하는 문자 시퀀스(character sequence)를 지정합니다.
*   `quoting`: 라이터가 언제 따옴표를 생성해야 하는지 제어합니다. 다음 모듈 상수(module constants) 중 하나를 사용할 수 있습니다:
    *   `csv.QUOTE_MINIMAL`: 필드에 `quotechar` 또는 `delimiter`가 포함될 때와 같이 필요할 때만 따옴표를 붙입니다.
    *   `csv.QUOTE_ALL`: 항상 필드 주위에 따옴표를 붙입니다.
    *   `csv.QUOTE_NONNUMERIC`: 항상 비숫자 필드(nonnumeric fields) 주위에 따옴표를 붙입니다.
    *   `csv.QUOTE_NONE`: 필드 주위에 따옴표를 절대 붙이지 않습니다.
*   `doublequote`: 필드 내 따옴표 처리 방식을 제어합니다. `True`일 때, 읽을 때는 연속된 두 개의 따옴표가 하나로 해석되고, 쓸 때는 각 따옴표가 두 개의 따옴표로 작성됩니다.

`dialect` 설정과 하나 이상의 다른 선택적 매개변수를 처리할 때, `dialect` 매개변수가 개별 포맷팅 매개변수보다 먼저 처리됩니다. 이는 새로운 `dialect` 클래스를 정의하지 않고도 방언을 선택한 다음 하나 이상의 설정을 오버라이드(override)하기 쉽게 만듭니다. 예를 들어, CSV 파일이 Excel 2000에 의해 따옴표 문자로는 작은따옴표(')를, 구분자로는 콜론(:)을 사용하여 생성된 경우, 다음과 같이 리더를 생성할 수 있습니다:

```python
import csv

csvreader = csv.reader(open("some.csv", 'r', newline=''), dialect="excel", quotechar="'", delimiter=':')
```

"excel" 방언에 대한 참조 때문에 Excel이 CSV 파일을 생성하는 다른 세부 사항들은 자동으로 처리됩니다.

### 리더 객체 (Reader Objects)

리더 객체는 `next()` 메서드가 문자열 시퀀스(sequence)를 반환하는 이터러블(iterable)입니다. 한 행의 각 필드당 하나의 문자열이 반환됩니다.

### 라이터 객체 (Writer Objects)

라이터 객체는 `writerow()`와 `writerows()`라는 두 가지 메서드를 가지고 있습니다. 전자는 출력에 작성될 필드의 이터러블(일반적으로 리스트)을 받습니다. 후자는 이터러블의 리스트를 받아서 각 이터러블에 대해 `writerow()`를 호출합니다.

## 구현 (Implementation)

샘플 구현이 제공됩니다. 목표는 PEP에 설명된 API를 효율적으로 구현하는 것입니다. 이 구현은 Object Craft의 `csv` 모듈에 크게 기반을 두고 있습니다.

## 테스트 (Testing)

샘플 구현에는 일련의 테스트 케이스가 포함되어 있습니다.

## 문제 (Issues)

*   **연속된 구분자 처리:** 연속된 구분자를 어떻게 해석해야 하는지를 제어하는 매개변수가 있어야 할까요? 저희 생각은 "아니오"입니다. 연속된 구분자는 항상 빈 필드(empty field)를 나타내야 합니다.
*   **유니코드 (Unicode):** `codecs.open()`으로 얻은 파일 객체를 전달하는 것으로 충분할까요? 예를 들어:
    ```python
    csvreader = csv.reader(codecs.open("some.csv", "r", "cp1252"))
    csvwriter = csv.writer(codecs.open("some.csv", "w", "utf-8"))
    ```
    첫 번째 예시에서는 텍스트가 `cp1252`로 인코딩되었다고 가정합니다. 시스템이 유니코드로 적극적으로 변환해야 할까요, 아니면 필요할 경우에만 유니코드 문자열이 반환되어야 할까요?
    두 번째 예시에서는 파일이 디스크에 쓰기 전에 유니코드 문자열을 `utf-8`로 자동 인코딩하는 것을 처리할 것입니다.
    *참고:* 이 글을 쓰는 시점에는 `csv` 모듈이 유니코드 데이터를 처리하지 않습니다.
*   **대체 이스케이프 규칙:** 사용 중인 방언에 `escapechar` 매개변수가 `None`이 아니고 `quoting` 매개변수가 `QUOTE_NONE`으로 설정된 경우, 필드 내에 나타나는 구분자는 쓰기 시 이스케이프 문자(escape character)가 앞에 붙고, 읽기 시 이스케이프 문자가 앞에 붙을 것으로 예상됩니다.
*   **"완전 인용(fully quoted)" 쓰기 모드:** 쓰기를 위한 "완전 인용" 모드가 있어야 할까요? "숫자 값을 제외하고 완전 인용"은 어떻습니까? 둘 다 구현되어 있습니다(`QUOTE_ALL` 및 `QUOTE_NONNUMERIC` 각각).
*   **줄 끝 (end-of-line):** Unix 시스템에서 CSV 파일을 생성하면 Excel이 LF 전용 줄 종결자(LF-only line terminators)를 제대로 인식할까요? 파일은 바이너리 모드(binary mode)를 사용하여 적절하게 읽기 또는 쓰기로 열려야 합니다. `lineterminator` 시퀀스를 `'\r\n'`으로 지정하십시오. 결과 파일은 올바르게 작성될 것입니다.
*   **딕셔너리(dict) 지원:** 리더에서 딕셔너리를 생성하고 라이터에서 딕셔너리를 받는 옵션은 어떻습니까? `csv.py`의 `DictReader` 및 `DictWriter` 클래스를 참조하십시오.
*   **인용 문자 및 구분자 제한:** 인용 문자(quote character)와 구분자(delimiter)가 단일 문자로 제한됩니까? 당분간은 그렇습니다.
*   **다른 길이의 행 처리:** 데이터 해석은 애플리케이션의 작업입니다. 이 수준에서는 "짧은 행" 또는 "긴 행"이라는 것은 없습니다.

## 참고 자료 (References)

 (1, 2) csv 모듈, Python Sandbox ([http://cvs.sourceforge.net/cgi-bin/viewcvs.cgi/python/python/nondist/sandbox/csv/](http://cvs.sourceforge.net/cgi-bin/viewcvs.cgi/python/python/nondist/sandbox/csv/))
 (1, 2) csv 모듈, Object Craft ([http://www.object-craft.com.au/projects/csv](http://www.object-craft.com.au/projects/csv))
 Python-DSV 모듈, Wells ([http://sourceforge.net/projects/python-dsv/](http://sourceforge.net/projects/python-dsv/))
 ASV 모듈, Tratt ([http://tratt.net/laurie/python/asv/](http://tratt.net/laurie/python/asv/))

웹에는 다른 CSV 관련 프로젝트에 대한 많은 참조가 있습니다. 몇 가지가 여기에 포함되어 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.