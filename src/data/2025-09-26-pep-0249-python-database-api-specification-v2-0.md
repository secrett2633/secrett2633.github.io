---
title: "[Final] PEP 249 - Python Database API Specification v2.0"
excerpt: "Python Enhancement Proposal 249: 'Python Database API Specification v2.0'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/249/
toc: true
toc_sticky: true
date: 2025-09-26 17:25:38+0900
last_modified_at: 2025-09-26 17:25:38+0900
published: true
---
> **원문 링크:** [PEP 249 - Python Database API Specification v2.0](https://peps.python.org/pep-0249/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 12-Apr-1999


### 서론

이 API는 데이터베이스 접근에 사용되는 Python 모듈 간의 유사성을 장려하기 위해 정의되었습니다. 이를 통해 일관성을 확보하여 모듈을 더 쉽게 이해하고, 데이터베이스 간에 더 이식성이 높은 코드를 작성하며, Python에서 데이터베이스 연결의 범위를 넓히는 것을 목표로 합니다.

이 사양에 대한 의견 및 질문은 Python 데이터베이스 인터페이스 SIG (Special Interest Group)에 문의할 수 있습니다. Python과의 데이터베이스 인터페이스 및 사용 가능한 패키지에 대한 자세한 정보는 [Database Topic Guide](https://wiki.python.org/moin/DatabaseInterfaces)를 참조하십시오.

이 문서는 Python Database API Specification 2.0 및 일반적인 선택적 확장 기능들을 설명합니다. 이전 버전 1.0은 [PEP 248](https://peps.python.org/pep-0248/)에서 참조용으로 여전히 제공됩니다. 패키지 작성자는 새 인터페이스의 기반으로 이 사양 버전을 사용할 것을 권장합니다.

### 모듈 인터페이스

데이터베이스 접근은 연결 객체(Connection Objects)를 통해 이루어집니다. 모듈은 다음과 같은 생성자(constructor)를 제공해야 합니다.

#### 생성자

`connect( parameters… )`
데이터베이스에 대한 연결을 생성하는 생성자입니다.
`Connection Object`를 반환합니다. 데이터베이스에 따라 여러 매개변수(parameters)를 받습니다.

#### 전역 상수 (Globals)

다음 모듈 전역 상수는 정의되어야 합니다.

*   **`apilevel`**
    지원되는 DB API 레벨을 나타내는 문자열 상수입니다.
    현재 "1.0" 및 "2.0" 문자열만 허용됩니다. 제공되지 않으면 DB-API 1.0 레벨 인터페이스로 간주되어야 합니다.

*   **`threadsafety`**
    인터페이스가 지원하는 스레드 안전성(thread safety) 수준을 나타내는 정수 상수입니다. 가능한 값은 다음과 같습니다.

    | `threadsafety` 값 | 의미                                                        |
    | :---------------- | :---------------------------------------------------------- |
    | `0`               | 스레드가 모듈을 공유할 수 없습니다.                         |
    | `1`               | 스레드는 모듈을 공유할 수 있지만, 연결(Connection)은 공유할 수 없습니다. |
    | `2`               | 스레드는 모듈과 연결(Connection)을 공유할 수 있습니다.     |
    | `3`               | 스레드는 모듈, 연결(Connection) 및 커서(Cursor)를 공유할 수 있습니다. |

    위 맥락에서 '공유'는 두 스레드가 리소스 잠금을 구현하기 위해 뮤텍스 세마포어를 사용하여 리소스를 래핑하지 않고도 리소스를 사용할 수 있음을 의미합니다. 뮤텍스를 사용하여 접근을 관리한다고 해서 항상 외부 리소스를 스레드 안전하게 만들 수 있는 것은 아니라는 점에 유의하십시오. 리소스는 전역 변수나 통제할 수 없는 다른 외부 소스에 의존할 수 있습니다.

*   **`paramstyle`**
    인터페이스가 예상하는 매개변수 마커(parameter marker) 형식의 유형을 나타내는 문자열 상수입니다. 가능한 값은 다음과 같습니다.

    | `paramstyle` 값 | 의미                                     | 예시                                    |
    | :-------------- | :--------------------------------------- | :-------------------------------------- |
    | `qmark`         | 물음표 스타일(Question mark style)       | `...WHERE name=?`                       |
    | `numeric`       | 숫자, 위치 스타일(Numeric, positional style) | `...WHERE name=:1`                      |
    | `named`         | 이름 지정 스타일(Named style)            | `...WHERE name=:name`                   |
    | `format`        | ANSI C `printf` 형식 코드                | `...WHERE name=%s`                      |
    | `pyformat`      | Python 확장 형식 코드                    | `...WHERE name=%(name)s`                |

    모듈 구현자는 `numeric`, `named`, `pyformat` 스타일을 다른 형식보다 선호해야 합니다. 이는 더 명확하고 유연하기 때문입니다.

#### 예외 (Exceptions)

모듈은 다음 예외(Exception) 또는 그 서브클래스(subclass)를 통해 모든 오류 정보를 제공해야 합니다.

*   **`Warning`**
    데이터 삽입 시 데이터 잘림(truncation)과 같은 중요한 경고에 대해 발생하는 예외입니다. Python의 `Exception` 클래스의 서브클래스여야 합니다.

*   **`Error`**
    모든 다른 오류 예외의 기본 클래스(base class)입니다. 단일 `except` 문으로 모든 오류를 잡는 데 사용할 수 있습니다. 경고는 오류로 간주되지 않으므로 이 클래스를 기본 클래스로 사용해서는 안 됩니다. Python의 `Exception` 클래스의 서브클래스여야 합니다.

*   **`InterfaceError`**
    데이터베이스 자체보다는 데이터베이스 인터페이스와 관련된 오류에 대해 발생하는 예외입니다. `Error`의 서브클래스여야 합니다.

*   **`DatabaseError`**
    데이터베이스와 관련된 오류에 대해 발생하는 예외입니다. `Error`의 서브클래스여야 합니다.

*   **`DataError`**
    0으로 나누기, 숫자 값 범위 초과 등 처리된 데이터 문제로 인해 발생하는 오류에 대해 발생하는 예외입니다. `DatabaseError`의 서브클래스여야 합니다.

*   **`OperationalError`**
    예상치 못한 연결 끊김, 데이터 소스 이름을 찾을 수 없음, 트랜잭션 처리 불가, 처리 중 메모리 할당 오류 등 프로그래머의 통제 범위 밖의 데이터베이스 작동과 관련된 오류에 대해 발생하는 예외입니다. `DatabaseError`의 서브클래스여야 합니다.

*   **`IntegrityError`**
    외래 키(foreign key) 검사 실패 등 데이터베이스의 관계형 무결성(relational integrity)에 영향을 미칠 때 발생하는 예외입니다. `DatabaseError`의 서브클래스여야 합니다.

*   **`InternalError`**
    커서(cursor)가 더 이상 유효하지 않거나, 트랜잭션이 동기화되지 않는 등 데이터베이스 내부 오류가 발생할 때 발생하는 예외입니다. `DatabaseError`의 서브클래스여야 합니다.

*   **`ProgrammingError`**
    테이블을 찾을 수 없거나 이미 존재하는 경우, SQL 문법 오류, 잘못된 수의 매개변수 지정 등 프로그래밍 오류에 대해 발생하는 예외입니다. `DatabaseError`의 서브클래스여야 합니다.

*   **`NotSupportedError`**
    데이터베이스에서 지원하지 않는 메서드나 데이터베이스 API가 사용된 경우 발생하는 예외입니다. 예를 들어, 트랜잭션을 지원하지 않거나 트랜잭션이 꺼져 있는 연결에서 `.rollback()`을 요청하는 경우입니다. `DatabaseError`의 서브클래스여야 합니다.

다음은 예외 상속 구조입니다.

```
Exception
|__Warning
|__Error
   |__InterfaceError
   |__DatabaseError
      |__DataError
      |__OperationalError
      |__IntegrityError
      |__InternalError
      |__ProgrammingError
      |__NotSupportedError
```

**참고:** 이러한 예외 값은 정의되지 않습니다. 하지만 사용자에게 무엇이 잘못되었는지 상당히 잘 알려주어야 합니다.

### 연결 객체 (Connection Objects)

연결 객체는 다음 메서드에 응답해야 합니다.

#### 연결 메서드 (Connection methods)

*   **`.close()`**
    지금 연결을 닫습니다 (.__del__()이 호출될 때까지 기다리지 않고).
    이 시점부터 연결은 사용할 수 없게 됩니다. 연결로 어떤 작업을 시도하면 `Error`(또는 그 서브클래스) 예외가 발생합니다. 연결을 사용하려는 모든 커서 객체(Cursor Objects)에도 동일하게 적용됩니다. 변경 사항을 먼저 커밋하지 않고 연결을 닫으면 묵시적인 롤백(implicit rollback)이 수행됩니다.

*   **`.commit()`**
    대기 중인 트랜잭션(pending transaction)을 데이터베이스에 커밋(commit)합니다.
    데이터베이스가 자동 커밋(auto-commit) 기능을 지원하는 경우, 이 기능은 처음에 비활성화되어야 합니다. 자동 커밋을 다시 켜는 인터페이스 메서드가 제공될 수 있습니다.
    트랜잭션을 지원하지 않는 데이터베이스 모듈은 이 메서드를 빈 기능으로 구현해야 합니다.

*   **`.rollback()`**
    이 메서드는 모든 데이터베이스가 트랜잭션 지원을 제공하는 것은 아니므로 선택 사항입니다.
    데이터베이스가 트랜잭션을 제공하는 경우, 이 메서드는 데이터베이스를 대기 중인 트랜잭션의 시작 지점으로 롤백합니다. 변경 사항을 먼저 커밋하지 않고 연결을 닫으면 묵시적인 롤백이 수행됩니다.

*   **`.cursor()`**
    연결을 사용하여 새 `Cursor Object`를 반환합니다.
    데이터베이스가 직접적인 커서 개념을 제공하지 않는 경우, 모듈은 이 사양에서 필요한 범위 내에서 다른 수단을 사용하여 커서를 에뮬레이트해야 합니다.

### 커서 객체 (Cursor Objects)

이 객체들은 데이터베이스 커서(database cursor)를 나타내며, 이는 가져오기 작업(fetch operation)의 컨텍스트를 관리하는 데 사용됩니다. 동일한 연결에서 생성된 커서는 격리되지 않습니다. 즉, 한 커서에 의해 데이터베이스에 적용된 변경 사항은 다른 커서에 즉시 표시됩니다. 다른 연결에서 생성된 커서는 트랜잭션 지원이 어떻게 구현되는지에 따라 격리될 수도 있고 그렇지 않을 수도 있습니다 (연결의 `.rollback()` 및 `.commit()` 메서드도 참조).

`Cursor Object`는 다음 메서드와 속성에 응답해야 합니다.

#### 커서 속성 (Cursor attributes)

*   **`.description`**
    이 읽기 전용 속성은 7개 항목 시퀀스(sequence)의 시퀀스입니다.
    각 시퀀스는 하나의 결과 열(result column)을 설명하는 정보를 포함합니다.

    ```
    name
    type_code
    display_size
    internal_size
    precision
    scale
    null_ok
    ```

    처음 두 항목(`name`과 `type_code`)은 필수이며, 나머지 다섯 항목은 선택 사항이며 의미 있는 값을 제공할 수 없는 경우 `None`으로 설정됩니다.
    이 속성은 행을 반환하지 않는 작업의 경우 또는 `.execute*()` 메서드를 통해 커서에서 작업이 아직 호출되지 않은 경우 `None`이 됩니다.
    `type_code`는 아래 섹션에 지정된 `Type Objects`와 비교하여 해석할 수 있습니다.

*   **`.rowcount`**
    이 읽기 전용 속성은 마지막 `.execute*()`가 생성한 행 수(SELECT와 같은 DQL 문용) 또는 영향을 준 행 수(UPDATE 또는 INSERT와 같은 DML 문용)를 지정합니다.
    커서에서 `.execute*()`가 수행되지 않았거나 마지막 작업의 `rowcount`를 인터페이스가 확인할 수 없는 경우 이 속성은 -1입니다.

    **참고:** DB API 사양의 향후 버전에서는 후자의 경우 객체가 -1 대신 `None`을 반환하도록 재정의할 수 있습니다.

#### 커서 메서드 (Cursor methods)

*   **`.callproc( procname [, parameters ] )`**
    (모든 데이터베이스가 저장 프로시저(stored procedures)를 제공하는 것은 아니므로 이 메서드는 선택 사항입니다.)
    주어진 이름으로 저장된 데이터베이스 프로시저를 호출합니다. `parameters` 시퀀스는 프로시저가 예상하는 각 인수에 대한 하나의 항목을 포함해야 합니다. 호출 결과는 입력 시퀀스의 수정된 복사본으로 반환됩니다. 입력 매개변수는 그대로 유지되며, 출력 및 입출력 매개변수는 새로운 값으로 대체될 수 있습니다.
    프로시저는 결과 집합(result set)을 출력으로 제공할 수도 있습니다. 이 경우 표준 `.fetch*()` 메서드를 통해 사용할 수 있어야 합니다.

*   **`.close()`**
    지금 커서를 닫습니다 (.__del__이 호출될 때까지 기다리지 않고).
    이 시점부터 커서는 사용할 수 없게 됩니다. 커서로 어떤 작업을 시도하면 `Error`(또는 그 서브클래스) 예외가 발생합니다.

*   **`.execute(operation [, parameters])`**
    데이터베이스 작업(쿼리 또는 명령)을 준비하고 실행합니다.
    매개변수는 시퀀스 또는 매핑(mapping)으로 제공될 수 있으며, 작업 내의 변수에 바인딩됩니다. 변수는 데이터베이스별 표기법으로 지정됩니다 (자세한 내용은 모듈의 `paramstyle` 속성을 참조하십시오).
    작업에 대한 참조는 커서에 의해 유지됩니다. 동일한 작업 객체가 다시 전달되면 커서는 동작을 최적화할 수 있습니다. 이는 동일한 작업이 사용되지만 다른 매개변수가 바인딩되는 알고리즘(여러 번)에 가장 효과적입니다.
    작업을 재사용할 때 최대 효율성을 위해 `.setinputsizes()` 메서드를 사용하여 매개변수 유형과 크기를 미리 지정하는 것이 가장 좋습니다. 매개변수가 미리 정의된 정보와 일치하지 않는 것은 허용됩니다. 구현은 효율성 손실과 함께 보상해야 합니다.
    매개변수는 예를 들어 단일 작업에서 여러 행을 삽입하기 위해 튜플 목록으로 지정될 수도 있지만, 이러한 유형의 사용은 더 이상 사용되지 않습니다. 대신 `.executemany()`를 사용해야 합니다.
    반환 값은 정의되지 않습니다.

*   **`.executemany( operation, seq_of_parameters )`**
    데이터베이스 작업(쿼리 또는 명령)을 준비한 다음, `seq_of_parameters` 시퀀스에서 찾은 모든 매개변수 시퀀스 또는 매핑에 대해 실행합니다.
    모듈은 이 메서드를 `.execute()` 메서드에 대한 여러 호출을 사용하거나, 배열 작업(array operations)을 사용하여 데이터베이스가 시퀀스 전체를 한 번의 호출로 처리하도록 구현할 수 있습니다.
    하나 이상의 결과 집합을 생성하는 작업에 이 메서드를 사용하는 것은 정의되지 않은 동작이며, 구현은 작업 호출에 의해 결과 집합이 생성되었음을 감지할 때 예외를 발생시킬 수 있습니다 (필수는 아님).
    `.execute()`에 대한 동일한 주석이 이 메서드에도 마찬가지로 적용됩니다.
    반환 값은 정의되지 않습니다.

*   **`.fetchone()`**
    쿼리 결과 집합의 다음 행을 가져와 단일 시퀀스로 반환하거나, 더 이상 데이터가 없는 경우 `None`을 반환합니다.
    이전 `.execute*()` 호출이 결과 집합을 생성하지 않았거나 아직 호출이 발행되지 않은 경우 `Error`(또는 그 서브클래스) 예외가 발생합니다.

*   **`.fetchmany([size=cursor.arraysize])`**
    쿼리 결과의 다음 행 집합을 가져와 시퀀스들의 시퀀스(예: 튜플 목록)로 반환합니다. 더 이상 행이 없는 경우 빈 시퀀스가 반환됩니다.
    호출당 가져올 행 수는 매개변수로 지정됩니다. 제공되지 않으면 커서의 `arraysize`가 가져올 행 수를 결정합니다. 메서드는 `size` 매개변수로 표시된 만큼의 많은 행을 가져오려고 시도해야 합니다. 지정된 수의 행을 사용할 수 없어 이것이 불가능한 경우, 더 적은 행이 반환될 수 있습니다.
    이전 `.execute*()` 호출이 결과 집합을 생성하지 않았거나 아직 호출이 발행되지 않은 경우 `Error`(또는 그 서브클래스) 예외가 발생합니다.
    `size` 매개변수와 관련된 성능 고려 사항이 있습니다. 최적의 성능을 위해서는 일반적으로 `.arraysize` 속성을 사용하는 것이 가장 좋습니다. `size` 매개변수가 사용되는 경우, 한 `.fetchmany()` 호출에서 다음 호출까지 동일한 값을 유지하는 것이 가장 좋습니다.

*   **`.fetchall()`**
    쿼리 결과의 모든 (남아있는) 행을 가져와 시퀀스들의 시퀀스(예: 튜플 목록)로 반환합니다. 커서의 `arraysize` 속성이 이 작업의 성능에 영향을 미칠 수 있습니다.
    이전 `.execute*()` 호출이 결과 집합을 생성하지 않았거나 아직 호출이 발행되지 않은 경우 `Error`(또는 그 서브클래스) 예외가 발생합니다.

*   **`.nextset()`**
    (모든 데이터베이스가 여러 결과 집합을 지원하는 것은 아니므로 이 메서드는 선택 사항입니다.)
    이 메서드는 현재 집합에서 남아있는 행을 모두 버리고 다음 사용 가능한 집합으로 커서를 건너뛰게 합니다.
    더 이상 집합이 없으면 메서드는 `None`을 반환합니다. 그렇지 않으면 참(true) 값을 반환하고, 후속 `.fetch*()` 메서드 호출은 다음 결과 집합의 행을 반환합니다.
    이전 `.execute*()` 호출이 결과 집합을 생성하지 않았거나 아직 호출이 발행되지 않은 경우 `Error`(또는 그 서브클래스) 예외가 발생합니다.

*   **`.arraysize`**
    이 읽기/쓰기 속성은 `.fetchmany()`로 한 번에 가져올 행 수를 지정합니다. 기본값은 한 번에 한 행을 가져오는 것을 의미하는 1입니다.
    구현은 `.fetchmany()` 메서드에 대해 이 값을 준수해야 하지만, 데이터베이스와 한 번에 한 행씩 상호 작용할 수 있습니다. `.executemany()` 구현에서도 사용될 수 있습니다.

*   **`.setinputsizes(sizes)`**
    `.execute*()` 호출 전에 작업 매개변수를 위한 메모리 영역을 미리 정의하는 데 사용될 수 있습니다.
    `sizes`는 시퀀스로 지정됩니다. 각 입력 매개변수에 대한 하나의 항목이 있습니다. 항목은 사용될 입력에 해당하는 `Type Object`이거나 문자열 매개변수의 최대 길이를 지정하는 정수여야 합니다. 항목이 `None`인 경우, 해당 열에 대해 미리 정의된 메모리 영역은 예약되지 않습니다 (이는 대용량 입력에 대해 미리 정의된 영역을 피하는 데 유용합니다).
    이 메서드는 `.execute*()` 메서드가 호출되기 전에 사용됩니다.
    구현은 이 메서드가 아무것도 하지 않도록 할 수 있으며, 사용자는 이를 사용하지 않을 수 있습니다.

*   **`.setoutputsize(size [, column])`**
    큰 열(예: LONG, BLOB 등)의 가져오기를 위한 열 버퍼 크기를 설정합니다. 열은 결과 시퀀스에 대한 인덱스로 지정됩니다. 열을 지정하지 않으면 커서의 모든 큰 열에 대한 기본 크기가 설정됩니다.
    이 메서드는 `.execute*()` 메서드가 호출되기 전에 사용됩니다.
    구현은 이 메서드가 아무것도 하지 않도록 할 수 있으며, 사용자는 이를 사용하지 않을 수 있습니다.

### 타입 객체 및 생성자 (Type Objects and Constructors)

많은 데이터베이스는 작업의 입력 매개변수에 바인딩하기 위해 특정 형식으로 입력을 받아야 합니다. 예를 들어, 입력이 `DATE` 열로 지정된 경우 특정 문자열 형식으로 데이터베이스에 바인딩되어야 합니다. "Row ID" 열 또는 대용량 이진 항목(예: BLOB 또는 RAW 열)에서도 유사한 문제가 발생합니다. `.execute*()` 메서드의 매개변수가 유형이 지정되지 않아 Python에서 문제가 발생합니다. 데이터베이스 모듈이 Python 문자열 객체를 볼 때, 그것이 단순한 `CHAR` 열로 바인딩되어야 하는지, 원시 `BINARY` 항목으로 바인딩되어야 하는지, 아니면 `DATE`로 바인딩되어야 하는지 알 수 없습니다.

이 문제를 극복하기 위해 모듈은 특수 값을 담을 수 있는 객체를 생성하기 위해 아래에 정의된 생성자를 제공해야 합니다. 커서 메서드에 전달될 때 모듈은 입력 매개변수의 적절한 유형을 감지하고 그에 따라 바인딩할 수 있습니다.

`Cursor Object`의 `description` 속성은 쿼리 결과 열 각각에 대한 정보를 반환합니다. `type_code`는 아래에 정의된 `Type Objects` 중 하나와 같다고 비교되어야 합니다. `Type Objects`는 여러 유형 코드와 같을 수 있습니다 (예: `DATETIME`은 날짜, 시간 및 타임스탬프 열의 유형 코드와 같을 수 있습니다. 자세한 내용은 아래의 `Implementation Hints`를 참조하십시오).

모듈은 다음 생성자 및 싱글톤(singletons)을 내보냅니다.

*   **`Date(year, month, day)`**
    날짜 값을 담는 객체를 구성하는 함수입니다.
*   **`Time(hour, minute, second)`**
    시간 값을 담는 객체를 구성하는 함수입니다.
*   **`Timestamp(year, month, day, hour, minute, second)`**
    타임스탬프 값을 담는 객체를 구성하는 함수입니다.
*   **`DateFromTicks(ticks)`**
    주어진 틱(ticks) 값(epoch 이후의 초 수. 표준 Python `time` 모듈 문서를 참조)에서 날짜 값을 담는 객체를 구성하는 함수입니다.
*   **`TimeFromTicks(ticks)`**
    주어진 틱 값에서 시간 값을 담는 객체를 구성하는 함수입니다.
*   **`TimestampFromTicks(ticks)`**
    주어진 틱 값에서 타임스탬프 값을 담는 객체를 구성하는 함수입니다.
*   **`Binary(string)`**
    이진 (긴) 문자열 값을 담을 수 있는 객체를 구성하는 함수입니다.
*   **`STRING` type**
    데이터베이스에서 문자열 기반 열(예: `CHAR`)을 설명하는 데 사용되는 타입 객체입니다.
*   **`BINARY` type**
    데이터베이스에서 (긴) 이진 열(예: `LONG`, `RAW`, `BLOB`)을 설명하는 데 사용되는 타입 객체입니다.
*   **`NUMBER` type**
    데이터베이스에서 숫자 열을 설명하는 데 사용되는 타입 객체입니다.
*   **`DATETIME` type**
    데이터베이스에서 날짜/시간 열을 설명하는 데 사용되는 타입 객체입니다.
*   **`ROWID` type**
    데이터베이스에서 "Row ID" 열을 설명하는 데 사용되는 타입 객체입니다.

SQL `NULL` 값은 입력 및 출력에서 Python `None` 싱글톤으로 표현됩니다.

**참고:** 데이터베이스 인터페이스에 Unix 틱(ticks)을 사용하는 것은 다루는 날짜 범위가 제한되어 문제가 발생할 수 있습니다.

### 모듈 작성자를 위한 구현 힌트 (Implementation Hints for Module Authors)

날짜/시간 객체는 Python `datetime` 모듈 객체(Python 2.3부터 사용 가능, 2.4부터 C API 제공) 또는 `mxDateTime` 패키지(Python 1.5.2 이후 모든 버전에서 사용 가능)로 구현될 수 있습니다. 둘 다 Python 및 C 레벨에서 필요한 모든 생성자 및 메서드를 제공합니다. 다음은 일반 생성자에게 작업을 위임하는 Unix 틱 기반 날짜/시간 생성자의 샘플 구현입니다.

```python
import time

def DateFromTicks(ticks):
    return Date(*time.localtime(ticks)[:3])

def TimeFromTicks(ticks):
    return Time(*time.localtime(ticks)[3:6])

def TimestampFromTicks(ticks):
    return Timestamp(*time.localtime(ticks)[:6])
```

`Binary` 객체에 선호되는 객체 유형은 Python 1.5.2 버전부터 표준 Python에서 사용 가능한 버퍼 유형(buffer types)입니다. 자세한 내용은 Python 문서를 참조하십시오. C 인터페이스에 대한 정보는 Python 소스 배포판의 `Include/bufferobject.h` 및 `Objects/bufferobject.c`를 참조하십시오.

이 Python 클래스는 설명 `type_code` 필드가 하나의 타입 객체에 대해 여러 값을 생성하더라도 위에서 언급한 타입 객체를 구현할 수 있도록 합니다.

```python
class DBAPITypeObject:
    def __init__(self,*values):
        self.values = values
    def __cmp__(self,other):
        if other in self.values:
            return 0
        if other < self.values:
            return 1
        else:
            return -1
```

결과 타입 객체는 생성자에 전달된 모든 값과 같다고 비교됩니다.

다음은 위에서 정의된 예외 계층 구조를 구현하는 Python 코드 스니펫입니다.

```python
class Error(Exception): pass
class Warning(Exception): pass
class InterfaceError(Error): pass
class DatabaseError(Error): pass
class InternalError(DatabaseError): pass
class OperationalError(DatabaseError): pass
class ProgrammingError(DatabaseError): pass
class IntegrityError(DatabaseError): pass
class DataError(DatabaseError): pass
class NotSupportedError(DatabaseError): pass
```

C에서는 `PyErr_NewException(fullname, base, NULL)` API를 사용하여 예외 객체를 생성할 수 있습니다.

### 선택적 DB API 확장 (Optional DB API Extensions)

DB API 2.0의 수명 동안 모듈 작성자는 이 DB API 사양에서 요구하는 것 이상으로 구현을 확장하는 경우가 많았습니다. 호환성을 강화하고 사양의 가능한 미래 버전으로 깔끔한 업그레이드 경로를 제공하기 위해 이 섹션에서는 핵심 DB API 2.0 사양에 대한 공통 확장 집합을 정의합니다.

모든 DB API 선택적 기능과 마찬가지로 데이터베이스 모듈 작성자는 이러한 추가 속성 및 메서드를 구현하지 않거나(사용하면 `AttributeError` 발생), 가용성을 런타임에만 확인할 수 있는 경우 `NotSupportedError`를 발생시킬 수 있습니다.

이러한 확장 기능의 사용을 Python 경고 프레임워크를 통해 Python 경고를 발행하여 프로그래머에게 선택적으로 표시하도록 제안되었습니다. 이 기능을 유용하게 만들려면 경고 메시지를 표준화하여 마스킹(masking)할 수 있도록 해야 합니다. 이러한 표준 메시지는 아래에서 "Warning Message"라고 합니다.

*   **`Cursor.rownumber`**
    이 읽기 전용 속성은 결과 집합에서 커서의 현재 0-기반 인덱스를 제공하거나 인덱스를 확인할 수 없는 경우 `None`을 제공해야 합니다.
    인덱스는 시퀀스(결과 집합) 내의 커서 인덱스로 볼 수 있습니다. 다음 가져오기 작업은 해당 시퀀스에서 `.rownumber`로 인덱싱된 행을 가져옵니다.
    경고 메시지: "DB-API extension cursor.rownumber used"

*   **`Connection.Error`, `Connection.ProgrammingError` 등**
    DB API 표준에 의해 정의된 모든 예외 클래스는 `Connection` 객체에 속성으로 노출되어야 합니다 (모듈 범위에서 사용 가능한 것 외에).
    이러한 속성은 다중 연결 환경에서 오류 처리를 단순화합니다.
    경고 메시지: "DB-API extension connection.<exception> used"

*   **`Cursor.connection`**
    이 읽기 전용 속성은 커서가 생성된 `Connection` 객체에 대한 참조를 반환합니다.
    이 속성은 다중 연결 환경에서 다형성 코드(polymorph code) 작성을 단순화합니다.
    경고 메시지: "DB-API extension cursor.connection used"

*   **`Cursor.scroll(value [, mode='relative' ])`**
    `mode`에 따라 결과 집합에서 커서를 새 위치로 스크롤합니다.
    `mode`가 `relative`(기본값)인 경우, `value`는 결과 집합의 현재 위치에 대한 오프셋으로 간주되며, `absolute`로 설정된 경우 `value`는 절대 대상 위치를 나타냅니다.
    스크롤 작업이 결과 집합을 벗어나면 `IndexError`가 발생해야 합니다. 이 경우 커서 위치는 정의되지 않은 상태로 남겨집니다 (커서를 전혀 움직이지 않는 것이 이상적입니다).

    **참고:** 이 메서드는 사용 가능한 경우 네이티브 스크롤 가능한 커서를 사용하거나, 전방 전용(forward-only) 스크롤 가능한 커서에 대한 에뮬레이션으로 되돌아가야 합니다. 이 메서드는 데이터베이스에서 특정 작업이 지원되지 않음을 알리기 위해 `NotSupportedError`를 발생시킬 수 있습니다 (예: 역방향 스크롤).
    경고 메시지: "DB-API extension cursor.scroll() used"

*   **`Cursor.messages`**
    이것은 인터페이스가 이 커서에 대해 기본 데이터베이스로부터 수신하는 모든 메시지에 대해 튜플 `(예외 클래스, 예외 값)`을 추가하는 Python 리스트 객체입니다.
    과도한 메모리 사용을 피하기 위해 모든 표준 커서 메서드 호출(`fetch*()` 호출 제외)에 의해 (호출 실행 전에) 자동으로 목록이 지워지며, `del cursor.messages[:]`를 실행하여 지울 수도 있습니다.
    데이터베이스에서 생성된 모든 오류 및 경고 메시지는 이 목록에 배치되므로, 목록을 확인하면 사용자가 메서드 호출의 올바른 작동을 확인할 수 있습니다.
    이 속성의 목표는 종종 문제를 일으키는 `Warning` 예외의 필요성을 없애는 것입니다 (일부 경고는 실제로 정보성 특성만 가집니다).
    경고 메시지: "DB-API extension cursor.messages used"

*   **`Connection.messages`**
    `Cursor.messages`와 동일하지만, 목록의 메시지가 연결 지향적(connection oriented)입니다.
    과도한 메모리 사용을 피하기 위해 모든 표준 연결 메서드 호출(호출 실행 전에)에 의해 자동으로 목록이 지워지며, `del connection.messages[:]`를 실행하여 지울 수도 있습니다.
    경고 메시지: "DB-API extension connection.messages used"

*   **`Cursor.next()`**
    `.fetchone()`과 동일한 의미론을 사용하여 현재 실행 중인 SQL 문에서 다음 행을 반환합니다. Python 2.2 이상 버전의 경우 결과 집합이 소진되면 `StopIteration` 예외가 발생합니다. 이전 버전은 `StopIteration` 예외가 없으므로 대신 `IndexError`를 발생시켜야 합니다.
    경고 메시지: "DB-API extension cursor.next() used"

*   **`Cursor.__iter__()`**
    커서를 이터레이션 프로토콜()과 호환되도록 `self`를 반환합니다.
    경고 메시지: "DB-API extension cursor.__iter__() used"

*   **`Cursor.lastrowid`**
    이 읽기 전용 속성은 마지막으로 수정된 행의 `rowid`를 제공합니다 (대부분의 데이터베이스는 단일 `INSERT` 작업이 수행될 때만 `rowid`를 반환합니다). 작업이 `rowid`를 설정하지 않거나 데이터베이스가 `rowid`를 지원하지 않는 경우, 이 속성은 `None`으로 설정되어야 합니다.
    마지막으로 실행된 문이 여러 행을 수정하는 경우(예: `.executemany()`와 함께 `INSERT` 사용), `.lastrowid`의 의미는 정의되지 않습니다.
    경고 메시지: "DB-API extension cursor.lastrowid used"

*   **`Connection.autocommit`**
    연결의 자동 커밋 모드를 쿼리하고 설정하는 속성입니다.
    연결이 자동 커밋(비트랜잭션) 모드에서 작동하는 경우 `True`를 반환합니다. 연결이 수동 커밋(트랜잭션) 모드에서 작동하는 경우 `False`를 반환합니다.
    속성을 `True` 또는 `False`로 설정하면 연결의 모드가 그에 따라 조정됩니다.
    설정을 `True`에서 `False`로 변경하면 (자동 커밋 비활성화) 데이터베이스가 자동 커밋 모드를 종료하고 새 트랜잭션을 시작합니다. `False`에서 `True`로 변경하면 (자동 커밋 활성화) 보류 중인 트랜잭션 처리 방식에 대한 데이터베이스 종속적인 의미가 있습니다.
    **비권장(Deprecation notice):** 여러 데이터베이스 모듈이 이 속성의 읽기 및 쓰기 특성을 모두 구현하더라도, 속성에 쓰기 방식으로 자동 커밋 모드를 설정하는 것은 비권장됩니다. 이는 I/O 및 관련 예외를 초래할 수 있어 비동기(async) 컨텍스트에서 구현하기 어렵기 때문입니다.
    경고 메시지: "DB-API extension connection.autocommit used"

### 선택적 오류 처리 확장 (Optional Error Handling Extensions)

핵심 DB API 사양은 사용자에게 오류를 보고하기 위해 발생시킬 수 있는 일련의 예외만 도입합니다. 어떤 경우에는 예외가 프로그램의 흐름에 너무 방해가 되거나 실행을 불가능하게 만들 수도 있습니다.

이러한 경우와 데이터베이스를 다룰 때 오류 처리를 단순화하기 위해 데이터베이스 모듈 작성자는 사용자 정의 오류 핸들러를 구현하도록 선택할 수 있습니다. 이 섹션에서는 이러한 오류 핸들러를 정의하는 표준적인 방법을 설명합니다.

*   **`Connection.errorhandler`, `Cursor.errorhandler`**
    오류 조건이 충족될 때 호출할 오류 핸들러를 참조하는 읽기/쓰기 속성입니다.
    핸들러는 다음 인수를 받는 Python 호출 가능 객체여야 합니다.

    ```python
    errorhandler(connection, cursor, errorclass, errorvalue)
    ```

    여기서 `connection`은 커서가 작동하는 연결에 대한 참조이고, `cursor`는 커서에 대한 참조(또는 오류가 커서에 적용되지 않는 경우 `None`)이며, `errorclass`는 `errorvalue`를 생성 인수로 사용하여 인스턴스화할 오류 클래스입니다.
    표준 오류 핸들러는 적절한 `.messages` 속성(`Connection.messages` 또는 `Cursor.messages`)에 오류 정보를 추가하고, 주어진 `errorclass` 및 `errorvalue` 매개변수에 의해 정의된 예외를 발생시켜야 합니다.
    `.errorhandler`가 설정되지 않은 경우(속성이 `None`인 경우), 위에서 설명한 표준 오류 처리 체계가 적용되어야 합니다.
    경고 메시지: "DB-API extension .errorhandler used"
    커서는 커서 생성 시 연결 객체에서 `.errorhandler` 설정을 상속받아야 합니다.

### 선택적 2단계 커밋 확장 (Optional Two-Phase Commit Extensions)

많은 데이터베이스는 여러 데이터베이스 연결 및 기타 리소스 간에 트랜잭션을 관리할 수 있는 2단계 커밋(Two-Phase Commit, TPC)을 지원합니다.

데이터베이스 백엔드가 2단계 커밋을 지원하고 데이터베이스 모듈 작성자가 이 지원을 노출하려는 경우, 다음 API를 구현해야 합니다. 데이터베이스 백엔드의 2단계 커밋 지원을 런타임에만 확인할 수 있는 경우 `NotSupportedError`가 발생해야 합니다.

#### TPC 트랜잭션 ID (TPC Transaction IDs)

많은 데이터베이스가 XA 사양을 따르므로, 트랜잭션 ID는 세 가지 구성 요소로 구성됩니다.

*   `format ID`
*   `global transaction ID`
*   `branch qualifier`

특정 전역 트랜잭션의 경우, 처음 두 구성 요소는 모든 리소스에 대해 동일해야 합니다. 전역 트랜잭션의 각 리소스에는 다른 `branch qualifier`가 할당되어야 합니다.

다양한 구성 요소는 다음 기준을 충족해야 합니다.

*   `format ID`: 음수가 아닌 32비트 정수.
*   `global transaction ID` 및 `branch qualifier`: 64자 이내의 바이트 문자열.

트랜잭션 ID는 `.xid()` `Connection` 메서드로 생성됩니다.

*   **`.xid(format_id, global_transaction_id, branch_qualifier)`**
    이 연결의 `.tpc_*()` 메서드에 전달하기에 적합한 트랜잭션 ID 객체를 반환합니다.
    데이터베이스 연결이 TPC를 지원하지 않으면 `NotSupportedError`가 발생합니다.
    `.xid()`에 의해 반환되는 객체의 유형은 정의되지 않지만, 세 가지 구성 요소에 접근할 수 있는 시퀀스 동작을 제공해야 합니다. 준수하는 데이터베이스 모듈은 사용자 정의 객체 대신 튜플로 트랜잭션 ID를 나타내도록 선택할 수 있습니다.

#### TPC 연결 메서드 (TPC Connection Methods)

*   **`.tpc_begin(xid)`**
    주어진 트랜잭션 ID `xid`로 TPC 트랜잭션을 시작합니다.
    이 메서드는 트랜잭션 외부에서 호출되어야 합니다 (즉, 마지막 `.commit()` 또는 `.rollback()` 이후 아무것도 실행되지 않아야 합니다).
    또한, TPC 트랜잭션 내에서 `.commit()` 또는 `.rollback()`을 호출하는 것은 오류입니다. 응용 프로그램이 활성 TPC 트랜잭션 중에 `.commit()` 또는 `.rollback()`을 호출하면 `ProgrammingError`가 발생합니다.
    데이터베이스 연결이 TPC를 지원하지 않으면 `NotSupportedError`가 발생합니다.

*   **`.tpc_prepare()`**
    `.tpc_begin()`으로 시작된 트랜잭션의 첫 번째 단계를 수행합니다. TPC 트랜잭션 외부에서 이 메서드를 호출하면 `ProgrammingError`가 발생해야 합니다.
    `.tpc_prepare()`를 호출한 후에는 `.tpc_commit()` 또는 `.tpc_rollback()`이 호출될 때까지 어떠한 문도 실행할 수 없습니다.

*   **`.tpc_commit([ xid ])`**
    인수 없이 호출될 때, `.tpc_commit()`은 이전에 `.tpc_prepare()`로 준비된 TPC 트랜잭션을 커밋합니다.
    `.tpc_prepare()` 전에 `.tpc_commit()`이 호출되면 단일 단계 커밋이 수행됩니다. 트랜잭션 관리자는 전역 트랜잭션에 단일 리소스만 참여하는 경우 이 작업을 수행하도록 선택할 수 있습니다.
    트랜잭션 ID `xid`와 함께 호출될 때, 데이터베이스는 주어진 트랜잭션을 커밋합니다. 유효하지 않은 트랜잭션 ID가 제공되면 `ProgrammingError`가 발생합니다. 이 형식은 트랜잭션 외부에서 호출되어야 하며, 복구(recovery)에 사용하기 위한 것입니다.
    반환 시 TPC 트랜잭션은 종료됩니다.

*   **`.tpc_rollback([ xid ])`**
    인수 없이 호출될 때, `.tpc_rollback()`은 TPC 트랜잭션을 롤백합니다. `.tpc_prepare()` 전후에 호출될 수 있습니다.
    트랜잭션 ID `xid`와 함께 호출될 때, 주어진 트랜잭션을 롤백합니다. 유효하지 않은 트랜잭션 ID가 제공되면 `ProgrammingError`가 발생합니다. 이 형식은 트랜잭션 외부에서 호출되어야 하며, 복구에 사용하기 위한 것입니다.
    반환 시 TPC 트랜잭션은 종료됩니다.

*   **`.tpc_recover()`**
    `.tpc_commit(xid)` 또는 `.tpc_rollback(xid)`와 함께 사용하기에 적합한 보류 중인 트랜잭션 ID 목록을 반환합니다.
    데이터베이스가 트랜잭션 복구를 지원하지 않으면 빈 목록을 반환하거나 `NotSupportedError`를 발생시킬 수 있습니다.

### 자주 묻는 질문 (Frequently Asked Questions)

데이터베이스 SIG는 DB API 사양에 대한 반복적인 질문을 자주 받습니다. 이 섹션에서는 사람들이 사양에 대해 때때로 가지는 몇 가지 문제를 다룹니다.

**질문:** `.fetch*()`가 반환하는 튜플에서 어떻게 딕셔너리(dictionary)를 구성할 수 있습니까?

**답변:** 이 작업을 위한 도우미를 제공하는 여러 기존 도구가 있습니다. 대부분은 커서 속성 `.description`에 정의된 열 이름(column names)을 행 딕셔너리의 키로 사용하는 접근 방식을 사용합니다.
`.fetch*()` 메서드에 대한 딕셔너리 반환 값을 지원하도록 DB API 사양을 확장하지 않은 이유는 이 접근 방식에 몇 가지 단점이 있기 때문입니다.

*   일부 데이터베이스는 대소문자를 구분하는 열 이름을 지원하지 않거나, 모두 소문자 또는 모두 대문자 문자로 자동 변환합니다.
*   쿼리에 의해 생성된 결과 집합의 열(예: SQL 함수 사용)은 테이블 열 이름에 매핑되지 않으며, 데이터베이스는 일반적으로 이러한 열에 대해 데이터베이스별 방식으로 이름을 생성합니다.
*   결과적으로 딕셔너리 키를 통한 열 접근 방식은 데이터베이스마다 다르며, 이식 가능한 코드 작성을 불가능하게 만듭니다.

### 버전 1.0에서 버전 2.0으로의 주요 변경 사항 (Major Changes from Version 1.0 to Version 2.0)

Python Database API 2.0은 1.0 버전에 비해 몇 가지 주요 변경 사항을 도입합니다. 이러한 변경 사항 중 일부는 기존 DB API 1.0 기반 스크립트를 손상시킬 수 있으므로, 이러한 변경 사항을 반영하기 위해 주요 버전 번호가 조정되었습니다.

1.0에서 2.0으로의 가장 중요한 변경 사항은 다음과 같습니다.

*   별도의 `dbi` 모듈에 대한 필요성이 사라지고, 기능이 모듈 인터페이스 자체에 병합되었습니다.
*   날짜/시간 값에 대한 새로운 생성자 및 `Type Objects`가 추가되었고, `RAW Type Object`는 `BINARY`로 이름이 변경되었습니다. 결과 집합은 최신 SQL 데이터베이스에서 일반적으로 발견되는 모든 기본 데이터 유형을 포괄해야 합니다.
*   더 나은 데이터베이스 바인딩을 제공하기 위해 새로운 상수(`apilevel`, `threadsafety`, `paramstyle`) 및 메서드(`.executemany()`, `.nextset()`)가 추가되었습니다.
*   저장 프로시저를 호출하는 데 필요한 `.callproc()`의 의미가 이제 명확하게 정의되었습니다.
*   `.execute()` 반환 값의 정의가 변경되었습니다. 이전에는 반환 값이 SQL 문 유형을 기반으로 했지만(올바르게 구현하기 어려웠음), 이제는 정의되지 않습니다. 대신 더 유연한 `.rowcount` 속성을 사용하십시오. 모듈은 이전 스타일의 반환 값을 반환할 수 있지만, 이는 더 이상 사양에 의해 의무화되지 않으며 데이터베이스 인터페이스에 종속적인 것으로 간주되어야 합니다.
*   클래스 기반 예외가 사양에 통합되었습니다. 모듈 구현자는 정의된 예외 클래스를 서브클래싱하여 이 사양에 정의된 예외 레이아웃을 확장할 수 있습니다.

DB API 2.0 사양에 게시 후 추가된 사항:

*   핵심 기능 세트에 대한 추가 선택적 DB API 확장이 지정되었습니다.

### 미해결 문제 (Open Issues)

버전 2.0 사양이 1.0 버전에서 미해결로 남겨진 많은 질문을 명확히 했지만, 미래 버전에서 다루어져야 할 몇 가지 남아있는 문제가 있습니다.

*   새 결과 집합을 사용할 수 있는 경우 `.nextset()`에 대한 유용한 반환 값을 정의합니다.
*   손실 없는 금전 및 십진수 교환 형식으로 사용하기 위해 `decimal` 모듈의 `Decimal` 객체를 통합합니다.

### 각주 (Footnotes)

 지침으로서 연결 생성자 매개변수는 더 직관적인 사용을 위해 키워드 매개변수로 구현되어야 하며 다음 매개변수 순서를 따라야 합니다.

| 매개변수    | 의미                  |
| :---------- | :-------------------- |
| `dsn`       | 데이터 소스 이름 (문자열)    |
| `user`      | 사용자 이름 (문자열, 선택 사항) |
| `password`  | 비밀번호 (문자열, 선택 사항)  |
| `host`      | 호스트 이름 (선택 사항)     |
| `database`  | 데이터베이스 이름 (선택 사항) |

예를 들어, 연결은 다음과 같을 수 있습니다.

```python
connect(dsn='myhost:MYDB', user='guido', password='234$')
```

이 목록에 계획된 향후 추가 사항에 대해서는도 참조하십시오.

 모듈 구현자는 `numeric`, `named`, `pyformat` 형식을 다른 형식보다 선호해야 합니다. 이는 더 명확하고 유연하기 때문입니다.

 (1, 2, 3) 데이터베이스가 메서드에 필요한 기능을 지원하지 않는 경우, 메서드가 사용될 때 인터페이스는 예외를 발생시켜야 합니다.
선호되는 접근 방식은 메서드를 구현하지 않아 메서드가 요청될 때 Python이 `AttributeError`를 생성하도록 하는 것입니다. 이를 통해 프로그래머는 표준 `hasattr()` 함수를 사용하여 데이터베이스 기능을 확인할 수 있습니다.
일부 동적으로 구성된 인터페이스의 경우 메서드를 동적으로 사용할 수 있도록 요구하는 것이 적절하지 않을 수 있습니다. 이러한 인터페이스는 메서드가 호출될 때 롤백을 수행할 수 없음을 나타내기 위해 `NotSupportedError`를 발생시켜야 합니다.

 데이터베이스 인터페이스는 메서드에 문자열 인수를 허용하여 명명된 커서(named cursors)를 지원하도록 선택할 수 있습니다. 이 기능은 `.fetch*()` 메서드의 의미를 복잡하게 하므로 사양의 일부가 아닙니다.

 모듈은 매개변수 객체의 `__getitem__` 메서드를 사용하여 위치(정수) 또는 이름(문자열)을 매개변수 값에 매핑합니다. 이를 통해 시퀀스와 매핑을 모두 입력으로 사용할 수 있습니다.
'바인딩(bound)'이라는 용어는 입력 값을 데이터베이스 실행 버퍼에 바인딩하는 프로세스를 나타냅니다. 실용적인 측면에서 이는 입력 값이 작업에서 값으로 직접 사용된다는 것을 의미합니다. 클라이언트가 값을 사용할 수 있도록 '이스케이프'할 필요는 없습니다. 값은 실제 데이터베이스 값과 같아야 합니다.

 인터페이스가 배열 및 기타 최적화를 사용하여 행 가져오기(row fetching)를 구현할 수 있다는 점에 유의하십시오. 이 메서드 호출이 관련 커서를 한 행만큼만 앞으로 이동시킨다는 보장은 없습니다.

 `rowcount` 속성은 값을 동적으로 업데이트하는 방식으로 코딩될 수 있습니다. 이는 `.fetch*()` 메서드에 대한 첫 번째 호출 후에만 사용 가능한 `rowcount` 값을 반환하는 데이터베이스에 유용할 수 있습니다.

 구현 참고: Python C 확장 기능은 `.__iter__()` 메서드 대신 커서 객체에 `tp_iter` 슬롯을 구현해야 합니다.

 '영향을 받은 행 수(number of affected rows)'라는 용어는 일반적으로 데이터베이스 커서에서 마지막으로 실행된 문에 의해 삭제, 업데이트 또는 삽입된 행 수를 의미합니다. 대부분의 데이터베이스는 문의 해당 `WHERE` 절에 의해 발견된 총 행 수를 반환합니다. 일부 데이터베이스는 `UPDATE`에 대해 다른 해석을 사용하며, 문(`WHERE` 절이 더 많은 일치하는 행을 찾았을 수 있더라도)에 의해 변경된 행 수만 반환합니다. 데이터베이스 모듈 작성자는 `WHERE` 절에 의해 발견된 총 행 수를 반환하는 더 일반적인 해석을 구현하거나, `.rowcount` 속성의 다른 해석을 명확하게 문서화해야 합니다.

 (1, 2, 3, 4) Python 2 및 이 PEP의 이전 버전에서는 `StandardError`가 모든 DB-API 예외의 기본 클래스로 사용되었습니다. `StandardError`가 Python 3에서 제거되었으므로, Python 3을 대상으로 하는 데이터베이스 모듈은 대신 `Exception`을 기본 클래스로 사용해야 합니다. 혼란을 피하기 위해 PEP는 전체 텍스트에서 `Exception`을 사용하도록 업데이트되었습니다. 이 변경 사항은 모든 DB-API 오류 예외 클래스가 여전히 `Error` 또는 `Warning` 클래스에 뿌리를 두고 있기 때문에 기존 모듈이나 해당 모듈의 사용에 영향을 미치지 않아야 합니다.

 (1, 2) DB-API의 향후 개정판에서는 `Warning`의 기본 클래스가 내장 `Warning` 클래스로 변경될 가능성이 높습니다. 1999년 DB-API 2.0 작성 당시에는 Python에 경고 프레임워크가 아직 존재하지 않았습니다.

 `autocommit` 속성을 구현하는 많은 데이터베이스 모듈은 보류 중인 트랜잭션을 자동으로 커밋한 다음 자동 커밋 모드로 들어갑니다. 이는 데이터베이스 모듈 간에 이식 가능하므로, 자동 커밋 설정을 변경하기 전에 트랜잭션을 명시적으로 `.commit()`하거나 `.rollback()`하는 것이 일반적으로 권장됩니다.

 (1, 2) DB-API의 향후 개정판에서는 자동 커밋 모드를 설정할 수 있는 새로운 메서드 `.setautocommit(value)`를 도입하고, `.autocommit`을 읽기 전용 속성으로 만들 예정입니다. 또한, `Connection` 생성자에 새로운 표준 키워드 매개변수 `autocommit`을 추가하는 것을 고려하고 있습니다. 모듈 작성자는 이러한 변경 사항에 대비하여 이러한 변경 사항을 추가하는 것이 좋습니다.

### 감사 (Acknowledgements)

2001년에 Python Database API Specification 2.0을 원본 HTML 형식에서 PEP 형식으로 변환해 준 Andrew Kuchling에게 깊이 감사드립니다.
2008년에 2단계 커밋 API 확장 표준화로 이어진 논의를 이끌어 준 James Henstridge에게 깊이 감사드립니다.
2012년에 사양을 텍스트 PEP 형식에서 ReST PEP 형식으로 변환하여 다양한 부분에 연결할 수 있도록 해준 Daniele Varrazzo에게 깊이 감사드립니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.