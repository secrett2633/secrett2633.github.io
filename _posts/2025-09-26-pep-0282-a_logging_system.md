---
title: "[Final] PEP 282 - A Logging System"
excerpt: "Python Enhancement Proposal 282: 'A Logging System'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/282/
toc: true
toc_sticky: true
date: 2025-09-26 17:56:46+0900
last_modified_at: 2025-09-26 17:56:46+0900
published: true
---
> **원문 링크:** [PEP 282 - A Logging System](https://peps.python.org/pep-0282/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 04-Feb-2002

파이썬 PEP 282 – 로깅 시스템 (A Logging System)

## 초록 (Abstract)

이 PEP(Python Enhancement Proposal)는 파이썬 표준 라이브러리에 제안된 로깅 패키지를 설명합니다. 기본적으로 이 시스템은 사용자가 하나 이상의 로거(logger) 객체를 생성하고, 이 객체들의 메서드를 호출하여 디버깅 노트, 일반 정보, 경고, 오류 등을 로깅하는 방식으로 작동합니다. 다양한 로깅 '레벨(levels)'을 사용하여 중요한 메시지와 덜 중요한 메시지를 구별할 수 있습니다.

명명된 싱글톤 로거 객체 레지스트리가 유지되므로,
*   서로 다른 논리적 로깅 스트림 (또는 '채널')이 존재합니다 (예: 'zope.zodb' 관련 내용과 'mywebsite' 관련 내용).
*   로거 객체 참조를 여기저기 전달할 필요가 없습니다.

이 시스템은 런타임에 구성 가능합니다. 이 구성 메커니즘을 통해 애플리케이션 자체를 변경하지 않고도 로깅 수준과 유형을 조정할 수 있습니다.

## 동기 (Motivation)

단일 로깅 메커니즘이 표준 라이브러리에 포함되면,
1.  로깅이 더 '잘' 수행될 가능성이 높아지고,
2.  여러 라이브러리를 비교적 일관성 있게 로깅할 수 있는 더 큰 애플리케이션에 통합할 수 있습니다.

## 영향 (Influences)

이 제안은 다음 로깅 패키지들을 연구한 후 작성되었습니다:
*   JDK 1.4의 `java.util.logging` (JSR047)
*   log4j
*   Protomatter 프로젝트의 Syslog 패키지
*   MAL의 `mx.Log` 패키지

## 간단한 예시 (Simple Example)

다음은 로깅 패키지를 사용하여 `stderr`에 간단한 로깅 출력을 생성하는 매우 간단한 예시입니다.

**`mymodule.py`**
```python
import logging
log = logging.getLogger("MyModule") # "MyModule" 이라는 이름의 로거를 가져옵니다.

def doIt():
    log.debug("Doin' stuff...") # 디버그 메시지 로깅
    #do stuff...
    raise TypeError("Bogus type error for testing") # 테스트를 위한 예외 발생
```

**`myapp.py`**
```python
import mymodule, logging
logging.basicConfig() # 기본적인 로깅 설정을 수행합니다.
log = logging.getLogger("MyApp") # "MyApp" 이라는 이름의 로거를 가져옵니다.

log.info("Starting my app") # 정보 메시지 로깅
try:
    mymodule.doIt()
except Exception as e:
    log.exception("There was a problem.") # 예외 정보와 함께 오류 메시지 로깅
log.info("Ending my app") # 정보 메시지 로깅
```

위 코드를 실행하면 다음과 같은 출력을 볼 수 있습니다.
```
$ python myapp.py
INFO:MyApp: Starting my app
DEBUG:MyModule: Doin' stuff...
ERROR:MyApp: There was a problem.
Traceback (most recent call last):
  File "myapp.py", line 9, in ?
    mymodule.doIt()
  File "mymodule.py", line 7, in doIt
    raise TypeError, "Bogus type error for testing"
TypeError: Bogus type error for testing
INFO:MyApp: Ending my app
```

위 예시는 기본 출력 형식을 보여줍니다. 출력 형식의 모든 측면은 구성 가능하며, 예를 들어 다음과 같이 형식을 지정할 수 있습니다.
`2002-04-19 07:56:58,174 MyModule DEBUG - Doin' stuff...` 또는 단순히 `Doin' stuff...`

## 제어 흐름 (Control Flow)

애플리케이션은 `Logger` 객체에 로깅 호출을 합니다. `Logger`는 계층적 네임스페이스로 구성되며, 하위 `Logger`는 네임스페이스에서 상위 `Logger`의 일부 로깅 속성을 상속합니다.

`Logger` 이름은 "점으로 구분된(dotted name)" 네임스페이스에 속하며, 점(마침표)은 하위 네임스페이스를 나타냅니다. 따라서 로거 객체의 네임스페이스는 단일 트리 데이터 구조에 해당합니다.
*   `""`는 네임스페이스의 루트입니다.
*   `"Zope"`는 루트의 자식 노드가 됩니다.
*   `"Zope.ZODB"`는 `"Zope"`의 자식 노드가 됩니다.

이러한 `Logger` 객체는 `LogRecord` 객체를 생성하고, 이 객체들은 출력을 위해 `Handler` 객체로 전달됩니다. `Logger`와 `Handler`는 모두 로깅 레벨(logging levels)과 (선택적으로) `Filter`를 사용하여 특정 `LogRecord`에 관심이 있는지 여부를 결정할 수 있습니다. `LogRecord`를 외부로 출력해야 할 때, `Handler`는 (선택적으로) `Formatter`를 사용하여 메시지를 I/O 스트림으로 보내기 전에 지역화하고 형식을 지정할 수 있습니다.

각 `Logger`는 한 세트의 출력 `Handler`를 추적합니다. 기본적으로 모든 `Logger`는 또한 상위 `Logger`의 모든 `Handler`로 출력을 보냅니다. 그러나 `Logger`는 트리의 상위에 있는 `Handler`를 무시하도록 구성될 수도 있습니다.

로깅이 비활성화되었을 때 `Logger` API에 대한 호출 비용이 저렴하도록 API가 구성되어 있습니다. 특정 로그 레벨에 대해 로깅이 비활성화되면, `Logger`는 간단한 비교 테스트를 수행하고 반환할 수 있습니다. 특정 로그 레벨에 대해 로깅이 활성화된 경우에도, `Logger`는 `LogRecord`를 `Handler`로 전달하기 전에 비용을 최소화하도록 주의합니다. 특히, (상대적으로 비싼) 지역화 및 형식화는 `Handler`가 요청할 때까지 연기됩니다.

전체 `Logger` 계층 구조는 개별 `Logger`의 레벨보다 우선하는 레벨을 가질 수 있습니다. 이는 모듈 레벨 함수를 통해 수행됩니다.

```python
def disable(lvl):
    """ 'lvl'보다 낮은 심각도(severity)를 가진 요청에 대해 LogRecord를 생성하지 않습니다. """
    ...
```

## 레벨 (Levels)

로깅 레벨은 중요도 순으로 다음과 같습니다:
*   `DEBUG`
*   `INFO`
*   `WARN`
*   `ERROR`
*   `CRITICAL`

`CRITICAL`이라는 용어는 log4j에서 사용되는 `FATAL`보다 선호됩니다. 이 레벨들은 개념적으로 동일합니다 – 심각하거나 매우 심각한 오류를 나타냅니다. 그러나 `FATAL`은 "죽음"을 의미하며, 파이썬에서는 예외 발생 및 미처리(uncaught exception), 트레이스백, 종료를 의미합니다. 로깅 모듈은 `FATAL` 레벨의 로그 항목으로 인해 그러한 결과(종료)를 강제하지 않으므로, `FATAL` 대신 `CRITICAL`을 사용하는 것이 합리적입니다.

이들은 단순히 정수 상수이며, 중요도를 간단하게 비교할 수 있도록 합니다. 경험에 따르면 너무 많은 레벨은 혼란을 야기할 수 있으며, 이는 어떤 특정 로그 요청에 어떤 레벨을 적용해야 하는지에 대한 주관적인 해석으로 이어집니다.

위에서 권장하는 레벨들이 있지만, 로깅 시스템은 강제적이지 않아야 합니다. 사용자는 자신의 레벨을 정의할 수 있으며, 모든 레벨의 텍스트 표현도 정의할 수 있습니다. 그러나 사용자 정의 레벨은 모두 양의 정수여야 하고, 심각도가 증가하는 순서대로 증가해야 한다는 제약 조건을 준수해야 합니다.

사용자 정의 로깅 레벨은 두 가지 모듈 레벨 함수를 통해 지원됩니다.

```python
def getLevelName(lvl):
    """레벨 'lvl'에 대한 텍스트를 반환합니다."""
    ...

def addLevelName(lvl, lvlName):
    """ 'lvl' 레벨에 'levelName' 텍스트를 추가하거나, 기존 레벨 'lvl'의 텍스트 표현을 'lvlName'으로 설정합니다."""
    ...
```

## 로거 (Loggers)

각 `Logger` 객체는 관심 있는 로그 레벨(또는 임계값)을 추적하며, 해당 레벨 미만의 로그 요청은 버립니다.

`Manager` 클래스 인스턴스는 명명된 `Logger` 객체의 계층적 네임스페이스를 유지 관리합니다. 계층은 점으로 구분된 이름으로 표시됩니다. 예를 들어, `Logger "foo"`는 `Logger "foo.bar"`와 `"foo.baz"`의 부모입니다.

`Manager` 클래스 인스턴스는 싱글톤이며 사용자에게 직접 노출되지 않고, 사용자는 다양한 모듈 레벨 함수를 사용하여 `Manager`와 상호 작용합니다.

일반적인 로깅 메서드는 다음과 같습니다.

```python
class Logger:
    def log(self, lvl, msg, *args, **kwargs):
        """로깅 레벨 'lvl'에서 'str(msg) % args'를 로깅합니다."""
        ...
```

그러나 각 로깅 레벨에 대해 편의 함수가 정의되어 있습니다.

```python
class Logger:
    def debug(self, msg, *args, **kwargs): ...
    def info(self, msg, *args, **kwargs): ...
    def warn(self, msg, *args, **kwargs): ...
    def error(self, msg, *args, **kwargs): ...
    def critical(self, msg, *args, **kwargs): ...
```

현재는 `“exc_info”`라는 하나의 키워드 인수만 인식됩니다. 이 값이 `True`이면, 호출자는 로깅 출력에 예외 정보를 제공하기를 원합니다. 이 메커니즘은 모든 로깅 레벨에서 예외 정보를 제공해야 할 때만 필요합니다. 예외 정보가 오류 발생 시에만, 즉 `ERROR` 레벨에서만 로그에 추가되어야 하는 더 일반적인 경우에는 또 다른 편의 메서드가 제공됩니다.

```python
class Logger:
    def exception(self, msg, *args): ...
```

이 메서드는 예외 핸들러(exception handler)의 컨텍스트에서만 호출되어야 하며, 로그에 예외 정보를 포함시키고자 할 때 선호되는 방법입니다. 다른 편의 메서드는 예를 들어 `INFO` 메시지 컨텍스트에서 예외 정보를 제공해야 하는 특이한 상황에서만 `exc_info`와 함께 호출하도록 의도되었습니다.

위에서 보여준 `“msg”` 인수는 일반적으로 포맷 문자열(format string)이 될 것입니다. 그러나 `str(x)`가 포맷 문자열을 반환하는 모든 객체 `x`가 될 수 있습니다. 이는 예를 들어, 국제화/지역화된 애플리케이션을 위해 로케일별 메시지를 가져오는 객체를 사용할 때 유용합니다. 표준 `gettext` 모듈을 사용할 수도 있습니다. 개요 예시는 다음과 같습니다.

```python
class Message:
    """메시지를 나타냅니다"""
    def __init__(self, id):
        """메시지 ID로 초기화합니다"""
    def __str__(self):
        """적절한 지역화된 메시지 텍스트를 반환합니다"""
        ...
logger.info(Message("abc"), ...)
```

로그 메시지를 위해 데이터를 수집하고 포맷하는 것은 비용이 많이 들 수 있으며, 로거가 어차피 메시지를 버릴 것이라면 낭비일 수 있습니다. 요청이 로거에 의해 처리될지 여부를 확인하기 위해 `isEnabledFor()` 메서드를 사용할 수 있습니다.

```python
class Logger:
    def isEnabledFor(self, lvl):
        """ 레벨 'lvl'의 요청이 버려지지 않으면 True를 반환합니다. """
        ...
```

따라서 다음과 같은 비용이 많이 들고 낭비될 수 있는 DOM to XML 변환 대신:

```python
...
hamletStr = hamletDom.toxml()
log.info(hamletStr)
...
```

다음과 같이 할 수 있습니다.

```python
if log.isEnabledFor(logging.INFO):
    hamletStr = hamletDom.toxml()
    log.info(hamletStr)
```

새로운 로거가 생성되면, "레벨 없음(no level)"을 의미하는 레벨로 초기화됩니다. `setLevel()` 메서드를 사용하여 명시적으로 레벨을 설정할 수 있습니다.

```python
class Logger:
    def setLevel(self, lvl): ...
```

로거의 레벨이 설정되지 않은 경우, 시스템은 명시적으로 설정된 레벨이 발견될 때까지 계층 구조를 따라 모든 상위 로거를 참조합니다. 이는 로거의 "유효 레벨(effective level)"로 간주되며, `getEffectiveLevel()` 메서드를 통해 쿼리할 수 있습니다.

```python
def getEffectiveLevel(self): ...
```

`Logger`는 직접 인스턴스화되지 않습니다. 대신 모듈 레벨 함수가 사용됩니다.

```python
def getLogger(name=None): ...
```

이름이 지정되지 않으면 루트 로거(root logger)가 반환됩니다. 그렇지 않고 해당 이름의 로거가 존재하면 해당 로거가 반환됩니다. 존재하지 않으면 새 로거가 초기화되어 반환됩니다. 여기서 "name"은 "채널 이름(channel name)"과 동의어입니다.

사용자는 새 로거를 인스턴스화할 때 시스템이 사용할 `Logger`의 사용자 정의 서브클래스(subclass)를 지정할 수 있습니다.

```python
def setLoggerClass(klass): ...
```

전달된 클래스는 `Logger`의 서브클래스여야 하며, 해당 `__init__` 메서드는 `Logger.__init__`을 호출해야 합니다.

## 핸들러 (Handlers)

`Handler`는 주어진 `LogRecord`로 유용한 작업을 수행하는 역할을 합니다. 다음 핵심 `Handler`들이 구현될 것입니다.

*   `StreamHandler`: 파일과 같은 객체에 쓰기 위한 핸들러.
*   `FileHandler`: 단일 파일 또는 순환하는 파일 세트에 쓰기 위한 핸들러.
*   `SocketHandler`: 원격 TCP 포트에 쓰기 위한 핸들러.
*   `DatagramHandler`: UDP 소켓에 쓰기 위한 핸들러 (저비용 로깅용). Jeff Bauer는 이미 이러한 시스템을 가지고 있었습니다.
*   `MemoryHandler`: 버퍼가 가득 차거나 특정 조건이 발생할 때까지 로그 레코드를 메모리에 버퍼링하는 핸들러.
*   `SMTPHandler`: SMTP를 통해 이메일 주소로 보내기 위한 핸들러.
*   `SysLogHandler`: UDP를 통해 Unix syslog에 쓰기 위한 핸들러.
*   `NTEventLogHandler`: Windows NT, 2000, XP에서 이벤트 로그에 쓰기 위한 핸들러.
*   `HTTPHandler`: GET 또는 POST 의미론으로 웹 서버에 쓰기 위한 핸들러.

`Handler`는 `setLevel()` 메서드를 사용하여 레벨을 설정할 수도 있습니다.

```python
def setLevel(self, lvl): ...
```

`FileHandler`는 순환하는 로그 파일 세트를 생성하도록 설정할 수 있습니다. 이 경우, 생성자에 전달되는 파일 이름은 "기본(base)" 파일 이름으로 간주됩니다. 순환을 위한 추가 파일 이름은 `.1`, `.2` 등을 기본 파일 이름에 추가하여 생성되며, 롤오버가 요청될 때 지정된 최대치까지 생성됩니다. `setRollover` 메서드는 로그 파일의 최대 크기와 순환에서 백업 파일의 최대 개수를 지정하는 데 사용됩니다.

```python
def setRollover(maxBytes, backupCount): ...
```

`maxBytes`가 0으로 지정되면 롤오버는 발생하지 않으며 로그 파일은 무한히 커집니다. 0이 아닌 크기가 지정되면, 해당 크기를 초과하려고 할 때 롤오버가 발생합니다. 롤오버 메서드는 기본 파일 이름이 항상 최신이고, `.1`이 그 다음 최신, `.2`가 그 다음 최신 등임을 보장합니다.

에서 제공되는 테스트/예시 스크립트에는 `XMLHandler` 및 `SOAPHandler`와 같은 많은 추가 핸들러가 구현되어 있습니다.

## 로그 레코드 (LogRecords)

`LogRecord`는 로깅 이벤트에 대한 정보를 담는 수신자 역할을 합니다. 이는 거의 딕셔너리에 불과하지만, 선택적 런타임 인수와 메시지를 병합하는 `getMessage` 메서드를 정의합니다.

## 포맷터 (Formatters)

`Formatter`는 `LogRecord`를 문자열 표현으로 변환하는 역할을 합니다. `Handler`는 레코드를 쓰기 전에 `Formatter`를 호출할 수 있습니다. 다음 핵심 `Formatter`들이 구현될 것입니다.

*   `Formatter`: `%` 연산자를 사용하여 `printf`와 유사한 형식 지정을 제공합니다.
*   `BufferingFormatter`: 헤더 및 트레일러 형식 지정 지원과 함께 여러 메시지에 대한 형식 지정을 제공합니다.

`Formatter`는 핸들러에서 `setFormatter()`를 호출하여 `Handler`와 연결됩니다.

```python
def setFormatter(self, form): ...
```

`Formatter`는 `%` 연산자를 사용하여 로깅 메시지를 형식화합니다. 형식 문자열은 `%(name)x`를 포함해야 하며, `LogRecord`의 속성 딕셔너리는 메시지별 데이터를 얻는 데 사용됩니다. 다음 속성들이 제공됩니다.

*   `%(name)s`: 로거의 이름 (로깅 채널)
*   `%(levelno)s`: 메시지의 숫자 로깅 레벨 (DEBUG, INFO, WARN, ERROR, CRITICAL)
*   `%(levelname)s`: 메시지의 텍스트 로깅 레벨 (“DEBUG”, “INFO”, “WARN”, “ERROR”, “CRITICAL”)
*   `%(pathname)s`: 로깅 호출이 발행된 소스 파일의 전체 경로 이름 (사용 가능한 경우)
*   `%(filename)s`: 경로 이름 중 파일 이름 부분
*   `%(module)s`: 로깅 호출이 이루어진 모듈
*   `%(lineno)d`: 로깅 호출이 발행된 소스 라인 번호 (사용 가능한 경우)
*   `%(created)f`: `LogRecord`가 생성된 시간 (`time.time()` 반환 값)
*   `%(asctime)s`: `LogRecord`가 생성된 텍스트 시간
*   `%(msecs)d`: 생성 시간의 밀리초 부분
*   `%(relativeCreated)d`: 로깅 모듈이 로드된 시간 (일반적으로 애플리케이션 시작 시간)을 기준으로 `LogRecord`가 생성된 밀리초 단위의 시간
*   `%(thread)d`: 스레드 ID (사용 가능한 경우)
*   `%(message)s`: `record.getMessage()`의 결과, 레코드가 방출될 때 계산됨

`Formatter`가 형식 문자열에 `“(asctime)s”`가 포함되어 있음을 확인하면, 생성 시간은 `LogRecord`의 `asctime` 속성으로 형식화됩니다. 날짜 형식 지정의 유연성을 허용하기 위해 `Formatter`는 메시지 전체에 대한 형식 문자열과 날짜/시간에 대한 별도의 형식 문자열로 초기화됩니다. 날짜/시간 형식 문자열은 `time.strftime` 형식이어야 합니다. 메시지 형식의 기본값은 `“%(message)s”`입니다. 기본 날짜/시간 형식은 ISO8601입니다.

`Formatter`는 `“converter”`라는 클래스 속성을 사용하여 시간을 초 단위에서 튜플로 변환하는 방법을 나타냅니다. 기본적으로 `“converter”`의 값은 `“time.localtime”`입니다. 필요한 경우, 개별 `Formatter` 인스턴스에 다른 변환기(예: `“time.gmtime”`)를 설정하거나, 모든 `Formatter` 인스턴스에 영향을 미치도록 클래스 속성을 변경할 수 있습니다.

## 필터 (Filters)

레벨 기반 필터링이 불충분할 때, `Filter`는 `Logger` 또는 `Handler`에 의해 호출되어 `LogRecord`를 출력해야 할지 여부를 결정할 수 있습니다. `Logger`와 `Handler`는 여러 `Filter`를 설치할 수 있으며, 그 중 어느 하나라도 `LogRecord` 출력을 거부할 수 있습니다.

```python
class Filter:
    def filter(self, record):
        """ 레코드가 처리되어야 한다면 True를 나타내는 값을 반환합니다.
            필터가 적절하다고 판단하면 레코드를 수정할 수도 있습니다.
        """
```

기본 동작은 `Filter`를 `Logger` 이름으로 초기화할 수 있도록 합니다. 이는 명명된 로거 또는 해당 자식에 의해 생성된 이벤트만 통과시킵니다. 예를 들어, `“A.B”`로 초기화된 필터는 로거 `“A.B”`, `“A.B.C”`, `“A.B.C.D”`, `“A.B.D”` 등에 의해 로깅된 이벤트를 허용하지만, `“A.BB”`, `“B.A.B”` 등은 허용하지 않습니다. 빈 문자열로 초기화되면 모든 이벤트가 `Filter`에 의해 통과됩니다. 이 필터 동작은 애플리케이션의 특정 영역에 초점을 맞추고자 할 때 유용하며, 루트 로거에 연결된 필터를 변경하는 것만으로 초점을 변경할 수 있습니다.

에는 `Filter`의 많은 예시가 제공됩니다.

## 구성 (Configuration)

이와 같은 로깅 시스템의 주요 이점은 애플리케이션의 소스 코드를 변경하지 않고도 애플리케이션에서 얻는 로깅 출력의 양과 내용을 제어할 수 있다는 것입니다. 따라서 로깅 API를 통해 구성이 수행될 수 있지만, 애플리케이션을 전혀 변경하지 않고도 로깅 구성을 변경할 수 있어야 합니다. Zope와 같은 장기 실행 프로그램의 경우, 프로그램이 실행되는 동안 로깅 구성을 변경할 수 있어야 합니다.

구성에는 다음이 포함됩니다.

*   로거 또는 핸들러가 관심 가져야 할 로깅 레벨.
*   어떤 핸들러가 어떤 로거에 연결되어야 하는지.
*   어떤 필터가 어떤 핸들러와 로거에 연결되어야 하는지.
*   특정 핸들러 및 필터에 특정한 속성 지정.

일반적으로 각 애플리케이션은 사용자가 로깅 출력을 구성하는 방법에 대한 자체 요구 사항을 가질 것입니다. 그러나 각 애플리케이션은 표준 메커니즘을 통해 로깅 시스템에 필요한 구성을 지정할 것입니다.

가장 간단한 구성은 루트 로거에 연결된, `stderr`에 쓰는 단일 핸들러입니다. 이 구성은 로깅 모듈이 임포트된 후 `basicConfig()` 함수를 한 번 호출하여 설정됩니다.

```python
def basicConfig(): ...
```

더 정교한 구성에 대해서는 다음과 같은 이유로 이 PEP에서 구체적인 제안을 하지 않습니다.

*   특정 제안이 강제적으로 보일 수 있습니다.
*   파이썬 커뮤니티에서 폭넓은 실제 경험이 없는 상태에서는 어떤 구성 접근 방식이 좋은지 알 수 없습니다. 그러한 실천은 로깅 모듈이 사용되기 전까지, 즉 Python 2.3이 출시된 후까지는 이루어질 수 없습니다.
*   다른 유형의 애플리케이션이 다른 구성 접근 방식을 요구할 가능성이 있으며, 따라서 "모든 것에 맞는 하나의 크기"는 없을 것입니다.

참조 구현에는 개념 증명 및 가능한 대안을 제시하기 위한 목적으로 구현된 작동하는 구성 파일 형식이 있습니다. 핵심 파이썬 배포판의 일부가 아닌 별도의 확장 모듈이 로깅 구성 및 로그 보기, 보조 핸들러 및 대다수 커뮤니티에 관심이 없는 다른 기능을 위해 생성될 수도 있습니다.

## 스레드 안전성 (Thread Safety)

로깅 시스템은 사용자가 특별한 조치를 취할 필요 없이 스레드 안전(thread-safe) 작업을 지원해야 합니다.

## 모듈 레벨 함수 (Module-Level Functions)

짧은 스크립트 및 소규모 애플리케이션에서 로깅 메커니즘을 사용하기 위해 `debug()`, `info()`, `warn()`, `error()`, `critical()`, `exception()` 모듈 레벨 함수가 제공됩니다. 이 함수들은 `Logger`의 해당 이름의 메서드와 동일한 방식으로 작동합니다. 실제로 이 함수들은 루트 로거의 해당 메서드로 위임합니다. 이 함수들이 제공하는 추가적인 편의는, 구성이 이루어지지 않은 경우 `basicConfig()`가 자동으로 호출된다는 것입니다.

애플리케이션 종료 시, 다음 함수를 호출하여 모든 핸들러를 플러시할 수 있습니다.

```python
def shutdown(): ...
```

이 함수는 모든 핸들러를 플러시하고 닫을 것입니다.

## 구현 (Implementation)

참조 구현은 Vinay Sajip의 로깅 모듈입니다.

## 패키징 (Packaging)

참조 구현은 단일 모듈로 구현됩니다. 이는 가장 간단한 인터페이스를 제공합니다. 모든 사용자는 "`import logging`"만 하면 모든 사용 가능한 기능을 사용할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.