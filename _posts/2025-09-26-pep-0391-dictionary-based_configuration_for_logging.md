---
title: "[Final] PEP 391 - Dictionary-Based Configuration For Logging"
excerpt: "Python Enhancement Proposal 391: 'Dictionary-Based Configuration For Logging'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/391/
toc: true
toc_sticky: true
date: 2025-09-26 21:19:23+0900
last_modified_at: 2025-09-26 21:19:23+0900
published: true
---
> **원문 링크:** [PEP 391 - Dictionary-Based Configuration For Logging](https://peps.python.org/pep-0391/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Oct-2009


**PEP 391 – 로깅을 위한 딕셔너리 기반 설정**

## 개요
이 PEP(Python Enhancement Proposal)는 딕셔너리를 사용하여 로깅(logging) 설정을 구성하는 새로운 방법을 제안합니다.

## 도입 배경 (Rationale)

현재 Python의 `logging` 패키지를 설정하는 방법은 두 가지입니다. 하나는 로깅 API를 사용하여 프로그래밍 방식으로 설정하는 것이고, 다른 하나는 `ConfigParser` 기반 설정 파일을 사용하는 것입니다.

1.  **프로그래밍 방식 설정의 한계:**
    *   최대한의 제어는 가능하지만, 설정이 Python 코드 내에 고정됩니다.
    *   런타임(runtime)에 설정을 쉽게 변경하기 어렵습니다.
    *   결과적으로 애플리케이션의 특정 부분에 대한 로깅 상세도(verbosity)를 유연하게 조절하는 기능이 제한됩니다.
    *   이는 문제 진단을 위한 로깅의 유용성을 떨어뜨립니다. 특히 프로덕션 환경에서는 로깅이 유일한 진단 도구가 될 수 있습니다.

2.  **`ConfigParser` 기반 설정의 한계:**
    *   사용은 가능하지만, `logging` 패키지의 모든 측면을 설정할 수는 없습니다. 예를 들어, `Filter`는 이 시스템을 사용하여 설정할 수 없습니다.
    *   `ConfigParser` 형식 자체가 일부 사용자들 사이에서 강한 불만을 야기합니다.
    *   당시 Python 표준 라이브러리에서 유일하게 지원되는 설정 형식이었기 때문에 선택되었지만, 많은 사람들이 이 형식을 '낡았거나(crufty)' '보기 싫다(ugly)'고 여깁니다.

**새로운 딕셔너리 기반 설정의 필요성:**
최근 Python 버전에는 표준 라이브러리에 JSON 지원이 포함되어 있으며, 이는 설정 형식으로도 활용될 수 있습니다. Google App Engine과 같은 다른 환경에서는 YAML이 애플리케이션 설정에 사용되며, 로깅 설정도 애플리케이션 설정의 필수적인 부분으로 간주됩니다. 표준 라이브러리에는 현재 YAML 지원이 없지만, JSON과 YAML은 모두 Python 딕셔너리로 역직렬화(deserialization)될 수 있으므로 공통된 방식으로 지원을 제공할 수 있습니다.

딕셔너리를 통해 로깅 설정을 전달하는 방법을 제공함으로써, JSON 및/또는 YAML 사용자뿐만 아니라 사용자 정의 설정 방법을 사용하는 사용자도 원하는 설정을 설명하는 공통 형식을 통해 로깅을 더 쉽게 설정할 수 있게 됩니다.

기존 `ConfigParser` 기반 설정 시스템의 또 다른 단점은 증분(incremental) 설정을 지원하지 않는다는 것입니다. 새로운 설정은 기존 설정을 완전히 대체합니다. 다중 스레드 환경에서 증분 설정에 대한 완전한 유연성을 제공하기는 어렵지만, 새로운 설정 메커니즘은 제한적인 증분 설정 지원을 가능하게 할 것입니다.

## 사양 (Specification)

사양은 두 부분으로 구성됩니다: API와 설정 정보를 전달하는 데 사용되는 딕셔너리의 형식(즉, 준수해야 하는 스키마).

### 명명 (Naming)

역사적으로 `logging` 패키지는 PEP 8을 준수하지 않았습니다. 향후 PEP 8을 준수하도록 패키지 내의 메서드 및 함수 이름을 변경하여 수정될 예정입니다. 그러나 균일성을 위해 제안된 API 추가 사항은 현재 `logging`에서 사용되는 방식과 일관된 명명 체계를 따릅니다.

### API

`logging.config` 모듈에 다음 기능이 추가될 것입니다.

*   `dictConfig()` 함수: 설정 정보를 담고 있는 딕셔너리를 단일 인자로 받습니다. 딕셔너리 처리 중 오류가 발생하면 예외(Exception)가 발생합니다.
*   이 API는 사용자 정의가 가능합니다 (API 사용자 정의 섹션 참조). 증분 설정은 별도의 섹션에서 다룹니다.

### 딕셔너리 스키마 - 개요 (Dictionary Schema - Overview)

스키마를 자세히 설명하기 전에 객체 연결, 사용자 정의 객체 지원, 외부 및 내부 객체 접근에 대해 간략히 설명합니다.

#### 객체 연결 (Object connections)

이 스키마는 로거(loggers), 핸들러(handlers), 포매터(formatters), 필터(filters)와 같이 객체 그래프(object graph)로 서로 연결된 로깅 객체 집합을 설명하는 것을 목표로 합니다. 따라서 스키마는 객체 간의 연결을 나타내야 합니다. 예를 들어, 특정 로거에 특정 핸들러가 연결되어 있다고 가정합니다. 설정 딕셔너리에서는 각 대상 객체에 고유한 `id`를 부여하고, 이 `id`를 소스 객체의 설정에서 사용하여 소스와 대상 객체 간의 연결을 나타냅니다.

**예시 (YAML 스니펫):**

```yaml
formatters:
  brief: # 'brief' id를 가진 포매터의 설정
  precise: # 'precise' id를 가진 포매터의 설정
handlers:
  h1: # 핸들러 id
    formatter: brief
  h2: # 다른 핸들러 id
    formatter: precise
loggers:
  foo.bar.baz:
    handlers: [h1, h2]
```
위 예시는 `foo.bar.baz` 로거에 `h1`과 `h2` 두 핸들러가 연결되어야 함을 나타냅니다. `h1`의 포매터는 `brief` id로, `h2`의 포매터는 `precise` id로 설명됩니다.

로거의 `id`는 `foo.bar.baz`와 같이 프로그래밍 방식으로 로거에 대한 참조를 얻는 데 사용되는 로거 이름입니다. `Formatter`와 `Filter`의 `id`는 어떤 문자열 값(예: `brief`, `precise`)이든 될 수 있으며, 이들은 설정을 처리하고 객체 간의 연결을 결정하는 데만 의미가 있고, 설정 호출이 완료된 후에는 어디에도 유지되지 않는 일시적인 값입니다.

핸들러 `id`는 특별히 처리됩니다 (아래 '핸들러 ID' 섹션 참조).

#### 사용자 정의 객체 (User-defined objects)

스키마는 핸들러, 필터, 포매터를 위한 사용자 정의 객체를 지원해야 합니다. (로거는 인스턴스마다 다른 유형을 가질 필요가 없으므로, 설정에서 사용자 정의 로거 클래스에 대한 지원은 없습니다.)

설정될 객체는 일반적으로 세부 설정이 포함된 딕셔너리로 설명됩니다. 로깅 시스템은 일부 경우에 문맥(context)에서 객체가 어떻게 인스턴스화될지 추론할 수 있지만, 사용자 정의 객체가 인스턴스화될 때는 시스템이 이를 알지 못합니다. 사용자 정의 객체 인스턴스화에 대한 완전한 유연성을 제공하기 위해, 사용자는 '팩토리(factory)'를 제공해야 합니다. 팩토리는 설정 딕셔너리를 인자로 받아 인스턴스화된 객체를 반환하는 호출 가능(callable) 객체입니다. 이는 특수 키 `'()'` 아래에 팩토리로의 절대 임포트 경로(absolute import path)를 제공함으로써 이루어집니다.

**예시:**

```yaml
formatters:
  brief:
    format: '%(message)s'
  default:
    format: '%(asctime)s %(levelname)-8s %(name)-15s %(message)s'
    datefmt: '%Y-%m-%d %H:%M:%S'
  custom:
    '()': my.package.customFormatterFactory # 사용자 정의 팩토리
    bar: baz
    spam: 99.9
    answer: 42
```
위 YAML 스니펫은 세 개의 포매터를 정의합니다.
*   `brief`와 `default` 포매터는 `'()'` 키를 포함하지 않으므로, 표준 `logging.Formatter` 인스턴스가 생성됩니다.
*   `custom` 포매터는 특수 키 `'()'`를 포함하며, `my.package.customFormatterFactory`라는 사용자 정의 팩토리 호출 가능 객체를 사용합니다. 이 팩토리는 나머지 키-값 쌍(`bar`, `spam`, `answer`)을 키워드 인자로 받아 호출됩니다.

키 `'()'`는 유효한 키워드 파라미터 이름이 아니므로 호출에 사용되는 키워드 인자 이름과 충돌하지 않으며, 해당 값이 `callable`이라는 것을 기억하기 쉽게 합니다.

#### 외부 객체 접근 (Access to external objects)

설정이 `sys.stderr`와 같은 외부 객체를 참조해야 하는 경우가 있습니다. 설정 딕셔너리가 Python 코드로 구성되면 간단하지만, 설정이 텍스트 파일(예: JSON, YAML)을 통해 제공될 때 문제가 발생합니다. 텍스트 파일에서는 `sys.stderr`와 리터럴 문자열 `'sys.stderr'`를 구별하는 표준적인 방법이 없습니다.

이러한 구분을 용이하게 하기 위해, 설정 시스템은 문자열 값에서 특정 특수 접두사를 찾아 특별히 처리합니다. 예를 들어, `'ext://sys.stderr'`라는 리터럴 문자열이 설정에서 값으로 제공되면, `ext://`가 제거되고 나머지 값은 일반적인 임포트 메커니즘을 사용하여 처리됩니다.

이러한 접두사 처리는 프로토콜 처리와 유사한 방식으로 이루어집니다: `^(?P<prefix>[a-z]+)://(?P<suffix>.*)$` 정규 표현식과 일치하는 접두사(`prefix`)를 찾는 일반적인 메커니즘이 있으며, 접두사가 인식되면 접미사(`suffix`)는 접두사에 따라 처리되고 처리 결과가 문자열 값을 대체합니다.

구현은 `ext://`와 같은 표준 접두사 세트를 제공하지만, 이 메커니즘을 완전히 비활성화하거나 특별한 처리를 위해 추가 또는 다른 접두사를 제공할 수도 있습니다.

#### 내부 객체 접근 (Access to internal objects)

외부 객체 외에도 설정 내의 객체를 참조해야 할 때도 있습니다. 이는 설정 시스템이 알고 있는 항목에 대해 암묵적으로 수행됩니다. 예를 들어, 로거 또는 핸들러의 레벨(level)에 대한 문자열 값 `'DEBUG'`는 자동으로 `logging.DEBUG` 값으로 변환되며, `handlers`, `filters`, `formatter` 항목은 객체 `id`를 받아 적절한 대상 객체로 확인됩니다.

그러나 `logging`에 알려지지 않은 사용자 정의 객체의 경우, 더 일반적인 메커니즘이 필요합니다. 예를 들어, 다른 핸들러에 위임하는 대상(target)을 인자로 받는 `logging.handlers.MemoryHandler` 인스턴스를 생각해봅시다. 시스템이 이 클래스를 이미 알고 있으므로, 설정에서 주어진 `target`은 관련 대상 핸들러의 객체 `id`이기만 하면 시스템은 `id`로부터 핸들러를 확인합니다.

하지만 사용자가 `alternate` 핸들러를 가진 `my.package.MyHandler`를 정의하는 경우, 설정 시스템은 `alternate`가 핸들러를 참조한다는 것을 알지 못합니다. 이를 위해 사용자가 다음과 같이 지정할 수 있는 일반적인 해결(resolution) 시스템이 제공됩니다.

```yaml
handlers:
  file: # 파일 핸들러 설정
  custom:
    '()': my.package.MyHandler
    alternate: cfg://handlers.file # 설정 내의 객체 참조
```
리터럴 문자열 `'cfg://handlers.file'`은 `ext://` 접두사가 붙은 문자열과 유사한 방식으로 해결되지만, 임포트 네임스페이스 대신 설정 자체를 탐색합니다. 이 메커니즘은 `str.format`이 제공하는 방식과 유사하게 점(.) 또는 인덱스(index)를 통한 접근을 허용합니다.

#### 핸들러 ID (Handler Ids)

일부 로깅 설정은 원하는 효과를 얻기 위해 핸들러 레벨(handler levels)을 사용해야 합니다. 그러나 이름으로 항상 식별할 수 있는 로거와 달리, 핸들러는 증분 설정 호출을 통해 레벨을 변경할 수 있는 영구적인 핸들(persistent handles)이 없습니다.

따라서 이 PEP는 핸들러에 선택적 `name` 속성을 추가할 것을 제안합니다. 이 속성이 사용되면, 이름과 핸들러를 매핑하는 딕셔너리에 항목이 추가됩니다. (핸들러가 닫히면 이 항목은 제거됩니다.) 증분 설정 호출이 이루어질 때, 설정 값에 따라 핸들러 레벨을 설정하기 위해 이 딕셔너리에서 핸들러가 조회됩니다. 자세한 내용은 증분 설정 섹션을 참조하십시오.

이러한 "영구 이름(persistent name)" 기능은 `Filter`와 `Formatter`에도 제공될 수 있지만, 이들을 증분적으로 설정할 수 있도록 하는 강력한 근거는 없습니다. 실용성이 순수성보다 중요하기 때문에 `Handler`에만 이 새로운 `name` 속성이 부여됩니다. 설정에서 핸들러의 `id`는 그 `name`이 됩니다.

핸들러 이름 조회 딕셔너리는 설정 용도로만 사용되며, 패키지의 공개 API의 일부가 되지 않을 것입니다.

### 딕셔너리 스키마 - 상세 (Dictionary Schema - Detail)

`dictConfig()`에 전달되는 딕셔너리에는 다음 키가 포함되어야 합니다.

*   `version`: 스키마 버전을 나타내는 정수 값으로 설정됩니다. 현재 유효한 값은 1뿐이지만, 이 키를 통해 하위 호환성을 유지하면서 스키마를 발전시킬 수 있습니다.

다른 모든 키는 선택 사항이지만, 존재하는 경우 아래 설명된 대로 해석됩니다. 아래에서 '설정 딕셔너리(configuring dict)'가 언급되는 모든 경우, 사용자 정의 인스턴스화가 필요한지 확인하기 위해 특수 키 `'()'`가 검사됩니다. 만약 그렇다면, 위에서 설명된 메커니즘이 인스턴스화에 사용되고, 그렇지 않으면 문맥을 사용하여 인스턴스화 방법을 결정합니다.

*   `formatters`: 해당 값은 각 키가 포매터 `id`이고 각 값이 해당 `Formatter` 인스턴스를 구성하는 방법을 설명하는 딕셔너리가 됩니다.
    *   설정 딕셔너리는 `format` 및 `datefmt` 키(기본값은 `None`)를 찾아서 `logging.Formatter` 인스턴스를 구성하는 데 사용됩니다.

*   `filters`: 해당 값은 각 키가 필터 `id`이고 각 값이 해당 `Filter` 인스턴스를 구성하는 방법을 설명하는 딕셔너리가 됩니다.
    *   설정 딕셔너리는 `name` 키(기본값은 빈 문자열)를 찾아서 `logging.Filter` 인스턴스를 구성하는 데 사용됩니다.

*   `handlers`: 해당 값은 각 키가 핸들러 `id`이고 각 값이 해당 `Handler` 인스턴스를 구성하는 방법을 설명하는 딕셔너리가 됩니다.
    *   설정 딕셔너리는 다음 키를 찾습니다:
        *   `class` (필수): 핸들러 클래스의 완전한 이름.
        *   `level` (선택 사항): 핸들러의 레벨.
        *   `formatter` (선택 사항): 이 핸들러의 포매터 `id`.
        *   `filters` (선택 사항): 이 핸들러의 필터 `id` 목록.
    *   다른 모든 키는 핸들러의 생성자에 키워드 인자로 전달됩니다.

*   `loggers`: 해당 값은 각 키가 로거 이름이고 각 값이 해당 `Logger` 인스턴스를 구성하는 방법을 설명하는 딕셔너리가 됩니다.
    *   설정 딕셔너리는 다음 키를 찾습니다:
        *   `level` (선택 사항): 로거의 레벨.
        *   `propagate` (선택 사항): 로거의 전파(propagation) 설정.
        *   `filters` (선택 사항): 이 로거의 필터 `id` 목록.
        *   `handlers` (선택 사항): 이 로거의 핸들러 `id` 목록.
    *   지정된 로거는 명시된 `level`, `propagation`, `filters`, `handlers`에 따라 구성됩니다.

*   `root`: 루트 로거(root logger)의 설정이 됩니다. 구성 처리는 다른 로거와 동일하게 이루어지며, `propagate` 설정은 적용되지 않습니다.

*   `incremental`: 설정이 기존 설정에 대한 증분(incremental)으로 해석될지 여부를 나타냅니다. 이 값은 기본적으로 `False`이며, 이는 지정된 설정이 기존 `fileConfig()` API에서 사용되는 것과 동일한 의미로 기존 설정을 대체한다는 의미입니다.
    *   지정된 값이 `True`인 경우, 설정은 아래 '증분 설정' 섹션에 설명된 대로 처리됩니다.

*   `disable_existing_loggers`: 기존 로거를 비활성화할지 여부. 이 설정은 `fileConfig()`의 동명 파라미터와 동일합니다. 이 파라미터가 없으면 기본값은 `True`입니다. `incremental`이 `True`인 경우 이 값은 무시됩니다.

### 작동 예시 (A Working Example)

다음은 YAML 형식의 실제 작동하는 설정 예시입니다 (이메일 주소는 가상의 것입니다).

```yaml
version: 1 # 스키마 버전
formatters:
  brief:
    format: '%(levelname)-8s: %(name)-15s: %(message)s'
  precise:
    format: '%(asctime)s %(name)-15s %(levelname)-8s %(message)s'
filters:
  allow_foo:
    name: foo # 'foo' 이름의 필터
handlers:
  console:
    class: logging.StreamHandler
    formatter: brief
    level: INFO
    stream: ext://sys.stdout # 외부 객체 sys.stdout 참조
    filters: [allow_foo]
  file:
    class: logging.handlers.RotatingFileHandler
    formatter: precise
    filename: logconfig.log
    maxBytes: 1024
    backupCount: 3
  debugfile:
    class: logging.FileHandler
    formatter: precise
    filename: logconfig-detail.log
    mode: a
  email:
    class: logging.handlers.SMTPHandler
    mailhost: localhost
    fromaddr: my_app@domain.tld
    toaddrs:
    - support_team@domain.tld
    - dev_team@domain.tld
    subject: Houston, we have a problem.
loggers:
  foo:
    level: ERROR
    handlers: [debugfile]
  spam:
    level: CRITICAL
    handlers: [debugfile]
    propagate: no
  bar.baz:
    level: WARNING
root: # 루트 로거 설정
  level: DEBUG
  handlers: [console, file]
```

### 증분 설정 (Incremental Configuration)

증분 설정에 대한 완전한 유연성을 제공하기는 어렵습니다. 예를 들어, 필터(filters) 및 포매터(formatters)와 같은 객체는 익명이므로, 일단 설정이 완료되면 설정을 보강할 때 이러한 익명 객체를 참조할 수 없습니다.

또한, 설정이 완료된 후 런타임에 로거, 핸들러, 필터, 포매터의 객체 그래프를 임의로 변경할 강력한 필요성은 없습니다. 로거와 핸들러의 상세도는 레벨(level) 설정(및 로거의 경우 전파(propagation) 플래그)만으로 제어할 수 있습니다. 다중 스레드 환경에서 객체 그래프를 임의로 안전하게 변경하는 것은 문제가 있으며, 불가능하지는 않지만 구현에 추가되는 복잡성만큼의 이점이 없습니다.

따라서, 설정 딕셔너리의 `incremental` 키가 존재하고 `True`인 경우, 시스템은 모든 `formatters` 및 `filters` 항목을 완전히 무시하고, `handlers` 항목의 `level` 설정, 그리고 `loggers` 및 `root` 항목의 `level` 및 `propagate` 설정만 처리합니다.

`dictConfig()`가 기본값이 `False`인 `incremental` 키워드 인자를 받도록 하는 등 다른 수단으로 증분 설정을 제공하는 것도 물론 가능합니다. 설정 딕셔너리 내의 값을 사용하도록 제안하는 이유는, 설정이 소켓 리스너(socket listener)로 피클링된(pickled) 딕셔너리 형태로 전송될 수 있도록 하기 위함입니다. 이를 통해 장시간 실행되는 애플리케이션의 로깅 상세도를 애플리케이션을 중지하고 다시 시작할 필요 없이 시간이 지남에 따라 변경할 수 있습니다.

**참고:** 실제 경험을 바탕으로 한 증분 설정 요구 사항에 대한 피드백은 특히 환영합니다.

### API 사용자 정의 (API Customization)

`dictConfig()` API는 모든 사용 사례에 충분하지 않을 수 있습니다. API 사용자 정의를 위한 조치는 다음을 제공함으로써 이루어집니다.

*   `DictConfigurator` 클래스: 생성자에는 설정에 사용되는 딕셔너리가 전달되며, `configure()` 메서드를 가집니다.
*   `dictConfigClass` 호출 가능 객체: (기본적으로) `DictConfigurator`로 설정됩니다. 이는 필요한 경우 `DictConfigurator`를 적절한 사용자 정의 구현으로 대체할 수 있도록 제공됩니다.

`dictConfig()` 함수는 지정된 딕셔너리를 전달하여 `dictConfigClass`를 호출한 다음, 반환된 객체의 `configure()` 메서드를 호출하여 실제로 설정을 적용합니다.

```python
def dictConfig(config):
    dictConfigClass(config).configure()
```
이는 모든 사용자 정의 요구 사항을 충족시켜야 합니다. 예를 들어, `DictConfigurator`의 서브클래스(subclass)는 자체 `__init__()`에서 `DictConfigurator.__init__()`을 호출한 다음, 후속 `configure()` 호출에서 사용 가능한 사용자 정의 접두사를 설정할 수 있습니다. `dictConfigClass`는 서브클래스에 바인딩(bound)되고, `dictConfig()`는 기본, 사용자 정의되지 않은 상태와 똑같이 호출될 수 있습니다.

### 소켓 리스너 구현 변경 (Change to Socket Listener Implementation)

기존 소켓 리스너 구현은 다음과 같이 수정될 것입니다. 설정 메시지가 수신되면 `json` 모듈을 사용하여 딕셔너리로 역직렬화(deserialize)를 시도합니다. 이 단계가 실패하면 메시지는 `fileConfig` 형식으로 가정하고 이전과 같이 처리됩니다. 역직렬화가 성공하면 `dictConfig()`가 호출되어 결과 딕셔너리를 처리합니다.

### 설정 오류 (Configuration Errors)

설정 중에 오류가 발생하면 시스템은 적절하게 설명하는 메시지와 함께 `ValueError`, `TypeError`, `AttributeError` 또는 `ImportError`를 발생시킵니다. 다음은 오류를 발생시키는 (완전하지 않을 수 있는) 조건 목록입니다.

*   문자열이 아니거나 실제 로깅 레벨에 해당하지 않는 문자열 레벨
*   부울(boolean)이 아닌 `propagate` 값
*   해당하는 대상이 없는 `id`
*   증분 호출 중 발견된 존재하지 않는 핸들러 `id`
*   유효하지 않은 로거 이름
*   내부 또는 외부 객체를 해결할 수 없는 경우

### 커뮤니티 논의 (Discussion in the community)

이 PEP는 `python-dev` 및 `python-list`에 공지되었습니다. 많은 논의가 있지는 않았지만, 이는 틈새 주제(niche topic)로 예상될 수 있습니다.

`python-dev` 논의 스레드:
*   https://mail.python.org/pipermail/python-dev/2009-October/092695.html
*   https://mail.python.org/pipermail/python-dev/2009-October/092782.html
*   https://mail.python.org/pipermail/python-dev/2009-October/093062.html

`python-list` 논의 스레드:
*   https://mail.python.org/pipermail/python-list/2009-October/1223658.html
*   https://mail.python.org/pipermail/python-list/2009-October/1224228.html

이 제안에 대한 긍정적인 의견이 있었고, 제안 전체에 대한 반대는 없었으며, 특정 세부 사항에 대한 질문과 반대가 있었습니다. 작성자는 이러한 문제들이 PEP 변경을 통해 해결되었다고 믿고 있습니다.

### 참조 구현 (Reference implementation)

변경 사항에 대한 참조 구현은 `dictconfig.py` 모듈과 함께 `test_dictconfig.py`에 포함된 단위 테스트로 다음에서 사용할 수 있습니다.

*   http://bitbucket.org/vinay.sajip/dictconfig

이것은 소켓 리스너 변경을 제외한 모든 기능을 포함합니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---
_최종 수정일: 2025-02-01 08:59:27 GMT_## PEP 391 – 로깅을 위한 딕셔너리 기반 설정

## 개요
이 PEP(Python Enhancement Proposal)는 딕셔너리를 사용하여 로깅(logging) 설정을 구성하는 새로운 방법을 제안합니다.

## 도입 배경 (Rationale)
현재 Python의 `logging` 패키지를 설정하는 방법은 크게 두 가지입니다: 로깅 API를 통한 프로그래밍 방식 설정과 `ConfigParser` 기반 설정 파일 사용입니다.

1.  **프로그래밍 방식 설정의 한계:**
    *   최대한의 제어를 제공하지만, 설정이 Python 코드 내에 고정되어 런타임(runtime)에 쉽게 변경하기 어렵습니다.
    *   이로 인해 애플리케이션의 특정 부분에 대한 로깅 상세도(verbosity)를 유연하게 조절하는 기능이 제한되어, 문제 진단에 어려움을 겪을 수 있습니다.

2.  **`ConfigParser` 기반 설정의 한계:**
    *   사용은 가능하지만, `Filter`와 같은 `logging` 패키지의 모든 요소를 설정할 수 없습니다.
    *   `ConfigParser` 형식 자체가 일부 사용자들 사이에서 불만을 야기하며, 당시 표준 라이브러리에서 유일하게 지원되는 형식이었지만, 많은 사람들이 이를 '낡았거나(crufty)' '보기 싫다(ugly)'고 여깁니다.

**새로운 딕셔너리 기반 설정의 필요성:**
최근 Python 버전은 표준 라이브러리에 JSON 지원을 포함하며, 이는 설정 형식으로도 활용될 수 있습니다. Google App Engine과 같은 환경에서는 YAML이 애플리케이션 설정에 사용됩니다. JSON과 YAML은 모두 Python 딕셔너리로 역직렬화(deserialization)될 수 있으므로, 딕셔너리 기반 설정은 이러한 형식을 사용하는 사용자뿐만 아니라 사용자 정의 설정 방법을 사용하는 사용자에게도 공통적이고 유연한 설정 방식을 제공할 것입니다.

또한, 기존 `ConfigParser` 기반 시스템은 증분(incremental) 설정을 지원하지 않아 새로운 설정이 기존 설정을 완전히 대체하는 문제가 있었습니다. 새로운 메커니즘은 제한적인 증분 설정 지원을 가능하게 하여, 다중 스레드 환경에서도 로깅 설정을 보다 유연하게 변경할 수 있도록 합니다.

## 사양 (Specification)
이 PEP의 사양은 API와 설정 정보를 전달하는 데 사용되는 딕셔너리 형식(스키마)으로 구성됩니다.

### 명명 (Naming)
`logging` 패키지는 역사적으로 PEP 8을 준수하지 않았지만, 제안된 API 추가 사항은 현재 `logging`에서 사용되는 명명 체계와 일관성을 유지합니다.

### API
`logging.config` 모듈에 다음 함수가 추가될 예정입니다.

*   `dictConfig(config)`: 설정 딕셔너리를 단일 인자로 받아 로깅 설정을 적용합니다. 처리 중 오류가 발생하면 예외(Exception)를 발생시킵니다.
*   이 API는 사용자 정의가 가능하며, 증분 설정도 지원합니다.

### 딕셔너리 스키마 - 개요 (Dictionary Schema - Overview)

스키마는 로거, 핸들러, 포매터, 필터 등 서로 연결된 로깅 객체 그래프를 설명합니다. 객체 간의 연결은 고유한 `id`를 사용하여 정의됩니다.

#### 객체 연결 (Object connections)
설정 딕셔너리에서는 각 대상 객체에 고유한 `id`를 부여하고, 이를 소스 객체의 설정에서 참조하여 객체 간의 연결을 나타냅니다.

**예시 (YAML):**
```yaml
formatters:
  brief:
  precise:
handlers:
  h1:
    formatter: brief
  h2:
    formatter: precise
loggers:
  foo.bar.baz:
    handlers: [h1, h2]
```
위 예시에서 `foo.bar.baz` 로거는 `h1`, `h2` 핸들러에 연결되며, 각 핸들러는 `brief` 또는 `precise` 포매터를 사용합니다.

로거의 `id`는 로거 이름(`foo.bar.baz`)이고, `Formatter`와 `Filter`의 `id`는 임의의 문자열 값(`brief`, `precise`)으로, 설정 처리 중에만 유효한 일시적인 값입니다.

#### 사용자 정의 객체 (User-defined objects)
스키마는 핸들러, 필터, 포매터를 위한 사용자 정의 객체를 지원합니다. 사용자 정의 객체 인스턴스화를 위해, 설정 딕셔너리에 특수 키 `'()'`와 함께 객체를 인스턴스화할 '팩토리(factory)'의 절대 임포트 경로를 제공해야 합니다. 팩토리는 설정 딕셔너리의 나머지 항목들을 키워드 인자로 받아 호출됩니다.

**예시:**
```yaml
formatters:
  custom:
    '()': my.package.customFormatterFactory # 사용자 정의 팩토리
    bar: baz
```
여기서 `'()'` 키는 해당 값이 `callable` 객체임을 나타내며, 키워드 인자 이름과 충돌하지 않도록 선택되었습니다.

#### 외부 객체 접근 (Access to external objects)
`sys.stderr`와 같은 설정 외부의 객체를 참조해야 할 경우, `ext://`와 같은 특수 접두사를 사용합니다. 예를 들어, `'ext://sys.stderr'`는 `sys.stderr` 객체로 해석됩니다. `ext://` 접두사는 제거되고 나머지는 일반적인 임포트 메커니즘으로 처리됩니다.

#### 내부 객체 접근 (Access to internal objects)
설정 내의 객체를 참조할 때는 `cfg://` 접두사를 사용합니다. 예를 들어, `'cfg://handlers.file'`은 설정 딕셔너리 내의 `handlers` 섹션에 있는 `file` 핸들러를 참조합니다. 이 메커니즘은 점(.) 또는 인덱스(index)를 통한 접근을 허용합니다.

#### 핸들러 ID (Handler Ids)
핸들러의 레벨을 증분적으로 변경할 수 있도록, 핸들러에 선택적인 `name` 속성을 추가할 것을 제안합니다. 설정에서 핸들러의 `id`가 그 `name`이 되며, 이 이름은 증분 설정 호출 시 핸들러를 조회하는 데 사용됩니다.

### 딕셔너리 스키마 - 상세 (Dictionary Schema - Detail)
`dictConfig()`에 전달되는 딕셔너리는 다음 키를 포함해야 합니다.

*   `version`: 스키마 버전을 나타내는 정수(현재는 1).
*   `formatters`: 포매터 `id`와 해당 `Formatter` 인스턴스 설정을 담는 딕셔너리. `format`, `datefmt` 키를 사용합니다.
*   `filters`: 필터 `id`와 해당 `Filter` 인스턴스 설정을 담는 딕셔너리. `name` 키를 사용합니다.
*   `handlers`: 핸들러 `id`와 해당 `Handler` 인스턴스 설정을 담는 딕셔너리. `class` (필수), `level`, `formatter`, `filters` 키를 포함합니다.
*   `loggers`: 로거 이름과 해당 `Logger` 인스턴스 설정을 담는 딕셔너리. `level`, `propagate`, `filters`, `handlers` 키를 포함합니다.
*   `root`: 루트 로거(root logger)의 설정. `propagate` 설정은 적용되지 않습니다.
*   `incremental`: `True`로 설정되면 증분 설정으로 처리됩니다(기본값은 `False`).
*   `disable_existing_loggers`: 기존 로거를 비활성화할지 여부(기본값은 `True`, `incremental`이 `True`이면 무시됨).

### 작동 예시 (A Working Example)
PEP 391 문서에는 YAML 형식으로 작성된 상세한 로깅 설정 예시가 포함되어 있습니다. 이 예시는 `formatters`, `filters`, `handlers`, `loggers`, `root` 섹션을 사용하여 로깅의 다양한 측면(예: 콘솔 출력, 파일 로테이션, 이메일 알림 등)을 구성하는 방법을 보여줍니다.

### 증분 설정 (Incremental Configuration)
`incremental` 키가 `True`인 경우, 시스템은 `formatters`와 `filters` 항목을 무시하고, `handlers` 항목의 `level` 설정, 그리고 `loggers` 및 `root` 항목의 `level` 및 `propagate` 설정만 처리합니다.
이는 장시간 실행되는 애플리케이션의 로깅 상세도를 애플리케이션을 중지하고 다시 시작할 필요 없이 런타임에 변경할 수 있도록 합니다.

### API 사용자 정의 (API Customization)
`dictConfig()` API의 사용자 정의를 위해 `DictConfigurator` 클래스와 `dictConfigClass` 호출 가능 객체가 제공됩니다. `dictConfigClass`를 사용자 정의 구현으로 대체하여 `dictConfig()`의 동작을 확장할 수 있습니다.

### 소켓 리스너 구현 변경 (Change to Socket Listener Implementation)
기존 소켓 리스너 구현은 설정 메시지를 수신했을 때 `json` 모듈을 사용하여 딕셔너리로 역직렬화를 시도하고, 성공하면 `dictConfig()`를 호출하여 처리하도록 수정될 것입니다.

### 설정 오류 (Configuration Errors)
설정 중에 유효하지 않은 레벨, 부울이 아닌 `propagate` 값, 존재하지 않는 `id`, 유효하지 않은 로거 이름, 객체 해결 실패 등 오류가 발생하면 `ValueError`, `TypeError`, `AttributeError` 또는 `ImportError`가 발생합니다.

### 커뮤니티 논의 및 참조 구현 (Discussion in the community & Reference implementation)
이 PEP는 `python-dev` 및 `python-list` 메일링 리스트에서 논의되었으며, 제안에 대한 전반적인 반대는 없었습니다.
변경 사항에 대한 참조 구현은 `dictconfig.py` 모듈과 단위 테스트로 제공됩니다.

---
_이 문서는 퍼블릭 도메인에 있습니다. 최종 수정일: 2025-02-01 08:59:27 GMT_

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.