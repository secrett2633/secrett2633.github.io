---
title: "[Withdrawn] PEP 266 - Optimizing Global Variable/Attribute Access"
excerpt: "Python Enhancement Proposal 266: 'Optimizing Global Variable/Attribute Access'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/266/
toc: true
toc_sticky: true
date: 2025-09-26 17:49:31+0900
last_modified_at: 2025-09-26 17:49:31+0900
published: true
---
> **원문 링크:** [PEP 266 - Optimizing Global Variable/Attribute Access](https://peps.python.org/pep-0266/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 13-Aug-2001


## PEP 266 – Optimizing Global Variable/Attribute Access

*   **작성자:** Skip Montanaro <skip at pobox.com>
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **작성일:** 2001년 8월 13일
*   **Python 버전:** 2.3
*   **히스토리:** (제출 후 변경 이력)

---

### Abstract (개요)

대부분의 전역 변수(global variables)와 다른 모듈의 어트리뷰트(attributes)에 대한 바인딩(bindings)은 일반적으로 Python 프로그램 실행 중에는 거의 변경되지 않습니다. 하지만 Python의 동적인 특성 때문에, 이러한 전역 객체(global objects)에 접근하는 코드는 객체가 필요할 때마다 전체 조회(full lookup) 과정을 거쳐야 합니다. 이 PEP는 대부분의 전역 객체에 접근하는 코드가 이들을 로컬 객체(local objects)처럼 처리할 수 있도록 하는 메커니즘을 제안하며, 이러한 객체의 이름 바인딩을 변경하는 코드에 참조 업데이트의 책임을 부여합니다.

### Introduction (서론)

`sre_compile._compile`이라는 핵심 함수를 예로 들어보겠습니다. 이 함수는 `sre` 모듈의 내부 컴파일 함수입니다. 컴파일될 패턴의 요소들을 반복하는 루프로 거의 전적으로 구성되어 있으며, 오피코드(opcodes)를 알려진 상수 값과 비교하고 토큰(tokens)을 출력 리스트에 추가합니다. 대부분의 비교는 `sre_constants` 모듈에서 임포트된 상수들과 이루어집니다. 이는 이 모듈의 컴파일된 출력에 많은 `LOAD_GLOBAL` 바이트코드(bytecodes)가 존재함을 의미합니다. 코드를 읽는 것만으로도 작성자가 `LITERAL`, `NOT_LITERAL`, `OPCODES` 및 다른 많은 심볼들을 상수로 의도했음이 분명합니다. 그러나 이러한 심볼들이 표현식에 포함될 때마다 새로 조회되어야 합니다.

대부분의 전역 접근은 실제로는 "거의 상수(almost constants)"인 객체에 대한 것입니다. 여기에는 현재 모듈의 전역 변수와 임포트된 다른 모듈의 어트리뷰트가 포함됩니다. 이러한 객체들은 거의 변경되지 않으므로, 그러한 객체에 대한 참조를 업데이트하는 부담을 이름 바인딩을 변경하는 코드에 지우는 것이 합리적이라고 생각됩니다. 만약 `sre_constants.LITERAL`이 다른 객체를 참조하도록 변경된다면, `sre_constants` 모듈 딕셔너리(module dict)를 수정하는 코드가 해당 객체에 대한 활성 참조(active references)를 수정하는 것이 가치 있을 수 있습니다. 이렇게 함으로써, 많은 경우 전역 변수와 많은 객체의 어트리뷰트가 로컬 변수(local variables)로 캐시될 수 있습니다. 객체에 부여된 이름과 객체 자체 간의 바인딩이 거의 변경되지 않는다면, 이러한 객체를 추적하는 비용은 낮고 잠재적인 이득은 상당히 클 것입니다.

이 제안의 효과를 측정하기 위해, Python 배포판에 포함된 Pystone 벤치마크 프로그램을 수정하여 전역 함수를 캐시했습니다. `Proc0`이라는 메인 함수는 `for` 루프 내에서 10개의 다른 함수를 호출합니다. 또한 `Func2`는 루프 내에서 `Func1`을 반복적으로 호출합니다. 이 11개 전역 식별자(global identifiers)의 로컬 복사본이 함수 루프에 진입하기 전에 만들어진다면, 이 특정 벤치마크의 성능은 약 2% 향상됩니다 (제 노트북에서 5561 pystones에서 5685로). 이는 대부분의 전역 변수 접근을 캐싱함으로써 성능이 향상될 수 있다는 것을 보여줍니다. 또한 pystone 벤치마크는 전역 모듈 어트리뷰트에 대한 접근이 거의 없으며, 이는 이 PEP에서 개선이 예상되는 영역입니다.

### Proposed Change (제안된 변경 사항)

Python 가상 머신(virtual machine)에 `TRACK_OBJECT` 및 `UNTRACK_OBJECT` 오피코드(opcodes)를 포함하도록 수정할 것을 제안합니다. `TRACK_OBJECT`는 전역 이름(global name) 또는 전역 이름의 어트리뷰트를 로컬 변수 배열(local variable array)의 슬롯(slot)과 연결하고, 관련 객체의 초기 조회를 수행하여 슬롯을 유효한 값으로 채웁니다. 이 오피코드가 생성하는 연결은 이름-객체 바인딩 변경을 담당하는 코드에 의해 기록되어 관련 로컬 변수가 업데이트되도록 합니다. `UNTRACK_OBJECT` 오피코드는 이름과 로컬 변수 슬롯 간의 모든 연결을 삭제합니다.

### Threads (스레드)

이 코드가 스레드(threaded) 프로그램에서 작동하는 방식은 비스레드(unthreaded) 프로그램과 다르지 않을 것입니다. 객체에 접근하기 위해 잠금(lock)이 필요하다면, `TRACK_OBJECT`가 실행되기 전에 해당 잠금을 획득하고 사용을 중단할 때까지 잠금을 유지해야 합니다.

### Rationale (제안 이유)

전역 변수와 어트리뷰트는 거의 변경되지 않습니다. 예를 들어, 일단 함수가 `math` 모듈을 임포트하면, `math`라는 이름과 그것이 참조하는 모듈 간의 바인딩은 변경될 가능성이 거의 없습니다. 마찬가지로, `math` 모듈을 사용하는 함수가 `sin` 어트리뷰트를 참조하더라도, 그것이 변경될 가능성은 낮습니다. 그럼에도 불구하고, 모듈이 `math.sin` 함수를 호출하고자 할 때마다, 먼저 다음 두 가지 명령을 실행해야 합니다.

```
LOAD_GLOBAL math
LOAD_ATTR sin
```

만약 클라이언트 모듈이 항상 `math.sin`을 로컬 상수(local constant)로 가정하고, 참조를 올바르게 유지하는 책임이 함수 외부의 "외부적인 힘(external forces)"에 있다면, 다음과 같은 코드를 가질 수 있습니다.

```python
TRACK_OBJECT math.sin
...
LOAD_FAST math.sin
...
UNTRACK_OBJECT math.sin
```

만약 `LOAD_FAST`가 루프(loop) 안에 있었다면, 전역 로드(global loads)와 어트리뷰트 조회(attribute lookups) 감소로 인한 이득은 상당할 수 있습니다.

이 기술은 이론적으로 어떤 전역 변수 접근이나 어트리뷰트 조회에도 적용될 수 있습니다. 다음 코드를 고려해 보세요.

```python
l = []
for i in range(10):
    l.append(math.sin(i))
return l
```

`l`이 로컬 변수임에도 불구하고, 루프에서 `l.append`를 10번 로드하는 비용을 지불합니다. 컴파일러(또는 옵티마이저)는 `math.sin`과 `l.append` 모두 루프 내에서 호출되고 있음을 인식하고, 추적된 로컬 코드(tracked local code)를 생성하기로 결정할 수 있습니다. 빌트인 `range()` 함수는 루프 설정 중에 한 번만 호출되므로 추적을 피할 수 있습니다. 로컬 변수 접근과 관련된 성능 문제로 인해 `l.append`를 추적하는 것은 `math.sin`과 같은 전역 변수를 추적하는 것보다 덜 매력적입니다.

Marc-Andre Lemburg의 python-dev 게시물에 따르면, `LOAD_GLOBAL` 오피코드는 Python 가상 머신이 실행하는 전체 명령어의 7% 이상을 차지합니다. 이는 `LOAD_FAST` 명령어에 비해 매우 비용이 많이 드는 명령어일 수 있습니다. `LOAD_FAST`는 간단한 배열 인덱싱이며 가상 머신에 의한 추가 함수 호출을 필요로 하지 않습니다. 많은 `LOAD_GLOBAL` 명령어와 `LOAD_GLOBAL`/`LOAD_ATTR` 쌍이 `LOAD_FAST` 명령어로 변환될 수 있다고 생각합니다.

전역 변수를 많이 사용하는 코드는 종종 전역 변수 및 어트리뷰트 조회를 피하기 위해 다양한 트릭을 사용합니다. 앞서 언급된 `sre_compile._compile` 함수는 증가하는 출력 리스트의 `append` 메서드를 캐시합니다. 많은 사람들이 전역 변수 조회를 캐시하기 위해 함수의 기본 인자(default argument) 기능을 흔히 오용합니다. 이 두 가지 방식 모두 해키(hackish)하며 최적화할 수 있는 모든 기회를 거의 다루지 못합니다. (예를 들어, `sre_compile._compile`은 가장 자주 사용하는 두 개의 전역 변수, 즉 빌트인 `len` 함수와 `sre_constants.py`에서 임포트하는 전역 `OPCODES` 배열을 캐시하지 않습니다.)

### Questions (질문)

#### 스레드에 대해서는? (What about threads?)

전역 인터프리터 록(global interpreter lock)이 값의 손상을 방지할 것이라고 생각합니다. 어떠한 경우에도, 상황은 현재보다 나빠지지 않을 것입니다. 만약 한 스레드가 다른 스레드가 이미 `LOAD_GLOBAL math`를 실행한 후, `LOAD_ATTR sin`을 실행하기 전에 `math.sin`을 수정한다면, 클라이언트 스레드는 `math.sin`의 이전 값을 보게 될 것입니다.

아이디어는 다음과 같습니다. 아래에서 다중 어트리뷰트 로드를 예시로 사용하지만, 이것이 매우 자주 발생하기 때문이 아니라, 추가 호출을 통한 재귀적 특성을 보여줌으로써 제 의도가 더 명확해지기를 바라기 때문입니다. 모듈 `foo`에 정의된 함수가 `spam.eggs.ham`에 접근하고, `spam`이 `foo`의 모듈 수준에서 임포트된 모듈이라고 가정해 봅시다.

```python
import spam
...
def somefunc():
    ...
    x = spam.eggs.ham
```

`somefunc`에 진입할 때 `TRACK_GLOBAL` 명령어가 실행될 것입니다.

```
TRACK_GLOBAL spam.eggs.ham n
```

`spam.eggs.ham`은 함수의 상수 배열에 저장된 문자열 리터럴입니다. `n`은 `fastlocals` 인덱스(index)입니다. `&fastlocals[n]`은 실행 중인 프레임(frame)의 `fastlocals` 배열에 있는 슬롯 `n`에 대한 참조이며, `spam.eggs.ham` 참조가 저장될 위치입니다. 제가 구상하는 내용은 다음과 같습니다.

`TRACK_GLOBAL` 명령어는 `spam`이라는 이름이 참조하는 객체를 찾아 해당 모듈 스코프(scope)에서 찾습니다. 그런 다음 다음과 같은 C 함수를 실행합니다.

```c
_PyObject_TrackName(m, "spam.eggs.ham", &fastlocals[n])
```

여기서 `m`은 `spam` 어트리뷰트를 가진 모듈 객체입니다.

모듈 객체는 선행 `spam.`을 제거하고, `eggs`라는 이름에 대한 바인딩이 변경될 경우 필요한 정보(`eggs.ham`과 `&fastlocals[n]`)를 저장합니다. 그런 다음 딕셔너리에서 `eggs` 키가 참조하는 객체를 찾고 재귀적으로 다음을 호출합니다.

```c
_PyObject_TrackName(eggs, "eggs.ham", &fastlocals[n])
```

`eggs` 객체는 선행 `eggs.`를 제거하고, `(ham, &fastlocals[n])` 정보를 저장한 다음, 네임스페이스(namespace)에서 `ham`이라는 객체를 찾아 `_PyObject_TrackName`을 다시 호출합니다.

```c
_PyObject_TrackName(ham, "ham", &fastlocals[n])
```

`ham` 객체는 선행 문자열(이번에는 `.`이 없지만, 사소한 부분입니다)을 제거하고, 결과가 비어 있음을 확인한 다음, 자신의 값(아마도 `self`)을 사용하여 전달받은 위치를 업데이트합니다.

```c
Py_XDECREF(&fastlocals[n]);
&fastlocals[n] = self;
Py_INCREF(&fastlocals[n]);
```

이 시점에서, `spam.eggs.ham`을 확인하는 데 관련된 각 객체는 자신의 네임스페이스에서 추적해야 할 항목과 해당 이름이 변경될 경우 업데이트할 위치를 알고 있습니다. 또한, 로컬 저장소에서 추적하는 이름이 변경되면, 변경이 이루어진 후 새 객체를 사용하여 `_PyObject_TrackName`을 호출할 수 있습니다. 가장 아래쪽에서는, 마지막 객체가 항상 이름을 제거하고 빈 문자열을 본 다음, 자신의 값을 전달받은 위치에 채워야 한다는 것을 알게 될 것입니다.

점선으로 표현된 `spam.eggs.ham`이 참조하는 객체가 스코프(scope)를 벗어날 때, `UNTRACK_GLOBAL spam.eggs.ham n` 명령어가 실행됩니다. 이는 `TRACK_GLOBAL`이 설정한 모든 추적 정보를 삭제하는 효과를 가집니다.

추적 작업은 비용이 많이 들 수 있지만, 추적되는 객체는 "거의 상수"라고 가정되므로, 설정 비용은 바라건대 여러 번의 전역 로드 대신 로컬 로드로 상쇄될 것입니다. 어트리뷰트가 있는 전역 변수의 경우 추적 설정 비용은 증가하지만, 추가적인 `LOAD_ATTR` 비용을 피함으로써 상쇄됩니다. `TRACK_GLOBAL` 명령어는 체인(chain)의 첫 번째 이름에 대해 `PyDict_GetItemString`을 수행하여 최상위 객체가 어디에 있는지 결정해야 합니다. 체인의 각 객체는 문자열과 주소를 어딘가에 저장해야 하며, 아마도 저장 위치를 키(예: `&fastlocals[n]`)로 사용하고 문자열을 값으로 사용하는 딕셔너리에 저장될 것입니다. (이 딕셔너리는 객체 주소를 키로 사용하는 딕셔너리들의 중앙 딕셔너리일 수도 있습니다.) 그 반대는 안 됩니다. 왜냐하면 여러 활성 프레임이 `spam.eggs.ham`을 추적하고 싶어 할 수 있지만, 오직 하나의 프레임만이 그 이름을 자신의 `fastlocals` 슬롯 중 하나와 연결하고 싶어 할 것이기 때문입니다.

#### 만약 `math.sin`이 캐시되어 있는 동안 변경된다면? (What if math.sin changes while in cache?)

이 질문은 위의 스레드 질문에 대한 답변으로 이미 다루어진 것으로 보입니다. 전역 인터프리터 록(GIL)이 보호를 제공하고, 최악의 경우 현재 상황과 다르지 않을 것이라는 내용이었습니다.

### Unresolved Issues (해결되지 않은 문제들)

#### Threading (스레딩)

다음과 같은 (어리석은) 코드는 어떻게 될까요?

```python
l = []
lock = threading.Lock()
...
def fill_l()::
    for i in range(1000)::
        lock.acquire()
        l.append(math.sin(i))
        lock.release()
...
def consume_l()::
    while 1::
        lock.acquire()
        if l::
            elt = l.pop()
            lock.release()
            fiddle(elt)
```

코드의 정적 분석(static analysis)만으로는 록(lock)이 무엇을 보호하는지 명확하지 않습니다. (컴파일 시점에 스레드가 관련되어 있는지조차 알 수 없지 않습니까?) `fill_l` 함수에서 `l.append`나 `math.sin`을 추적하려는 시도에 영향을 미칠까요, 아니면 미쳐야 할까요?

만약 신화적인 `track_object` 및 `untrack_object` 빌트인(builtins)으로 코드에 주석을 달면 (이것을 제안하는 것이 아니라, 단지 어디에 들어갈지 보여주는 것입니다!), 다음과 같습니다.

```python
l = []
lock = threading.Lock()
...
def fill_l()::
    track_object("l.append", append)
    track_object("math.sin", sin)
    for i in range(1000)::
        lock.acquire()
        append(sin(i))
        lock.release()
    untrack_object("math.sin", sin)
    untrack_object("l.append", append)
...
def consume_l()::
    while 1::
        lock.acquire()
        if l::
            elt = l.pop()
            lock.release()
            fiddle(elt)
```

이것이 스레드가 있든 없든 올바른가요 (또는 적어도 스레드가 있든 없든 동일하게 잘못된가요)?

#### Nested Scopes (중첩된 스코프)

중첩된 스코프의 존재는 `TRACK_GLOBAL`이 전역 변수를 찾는 위치에 영향을 미치겠지만, 그 이후에는 아무런 영향을 미치지 않을 것입니다. (제 생각에는 그렇습니다.)

#### Missing Attributes (누락된 어트리뷰트)

`spam.eggs.ham`이 참조하는 객체를 추적하고 있는데, `spam.eggs`가 `ham` 어트리뷰트가 없는 객체로 재바인딩되었다고 가정해 봅시다. 현재 Python 가상 머신에서 프로그래머가 `spam.eggs.ham`을 확인하려고 시도하면 `AttributeError`가 발생할 것이 분명합니다. 하지만 프로그래머가 이 경우를 예상했다고 가정해 봅시다.

```python
if hasattr(spam.eggs, "ham"):
    print spam.eggs.ham
elif hasattr(spam.eggs, "bacon"):
    print spam.eggs.bacon
else:
    print "what? no meat?"
```

추적 정보가 다시 계산될 때 `AttributeError`를 발생시킬 수는 없습니다. 만약 `AttributeError`를 발생시키지 않고 추적을 유지한다면, 프로그래머에게 매우 미묘한 오류를 유발할 수 있습니다.

이 문제에 대한 한 가지 해결책은 함수가 직접 참조하는 모든 점선 표현식(dotted expression)의 가능한 가장 짧은 루트를 추적하는 것입니다. 위 예시에서는 `spam.eggs`가 추적되지만, `spam.eggs.ham`과 `spam.eggs.bacon`은 추적되지 않을 것입니다.

#### 누가 더러운 일을 하는가? (Who does the dirty work?)

Questions (질문) 섹션에서 `_PyObject_TrackName` 함수의 존재를 가정했습니다. API를 지정하는 것은 상당히 쉽지만, 그 이면에 있는 구현은 그리 명확하지 않습니다. 이름/위치 매핑을 추적하기 위해 중앙 딕셔너리를 사용할 수 있지만, 모든 `setattr` 함수가 이 새로운 기능을 수용하도록 수정되어야 할 것으로 보입니다.

모든 유형이 `PyObject_GenericSetAttr` 함수를 사용하여 어트리뷰트를 설정한다면 업데이트 코드를 어느 정도 지역화할 수 있을 것입니다. 하지만 그렇지 않으므로 (놀랄 일은 아니지만), 모든 `getattrfunc` 및 `getattrofunc` 함수가 업데이트되어야 할 것으로 보입니다. 또한, 이는 C 확장 모듈(C extension module) 작성자에게 어트리뷰트 값이 변경될 때 어떤 함수(예: `PyObject_TrackUpdate`?)를 호출하도록 절대적인 요구 사항을 부과할 것입니다.

마지막으로, 일부 어트리뷰트는 어떤 종류의 `setattr` 메서드에 대한 직접적인 호출이 아니라 부수 효과(side effect)에 의해 설정될 가능성이 매우 높습니다. 장치 레지스터의 내용을 변경될 때마다 객체의 구조체(struct) 슬롯으로 복사하는 인터럽트 루틴(interrupt routine)을 가진 장치 인터페이스 모듈을 생각해 봅시다. 이러한 상황에서는 모듈 작성자가 더 광범위한 수정 작업을 수행해야 할 것입니다. 컴파일 시점에 이러한 상황을 식별하는 것은 불가능합니다. 객체의 코드가 전역 추적에 안전한지 여부를 나타내기 위해 `PyTypeObjects`에 추가 슬롯(slot)을 추가할 수 있다고 생각합니다. 기본값은 0(`Py_TRACKING_NOT_SAFE`)이 될 것입니다. 확장 모듈 작성자가 필요한 추적 지원을 구현했다면, 해당 필드는 1(`Py_TRACKING_SAFE`)로 초기화될 수 있습니다. `_PyObject_TrackName`은 해당 필드를 확인하고, 작성자가 명시적으로 추적에 안전하다고 명시하지 않은 객체를 추적하도록 요청받으면 경고를 발행할 수 있습니다.

### Discussion (논의)

Jeremy Hylton은 다른 제안을 내놓았습니다. 그의 제안은 전역 이름 조회에 사용될 하이브리드 딕셔너리/리스트 객체를 생성하여 전역 변수 접근이 로컬 변수 접근과 더 유사하게 보이도록 하는 것을 목표로 합니다. 검토할 수 있는 C 코드는 없지만, 그의 제안에 제공된 Python 구현은 여전히 딕셔너리 키 조회를 요구하는 것으로 보입니다. 그의 제안은 로컬 변수 어트리뷰트 조회를 가속화할 수 없을 것으로 보이며, 이는 잠재적인 성능 부담이 해결될 수 있다면 일부 상황에서 가치 있을 수 있습니다.

### Backwards Compatibility (하위 호환성)

심각한 하위 호환성 문제는 없을 것이라고 생각합니다. 명백히, `TRACK_OBJECT` 오피코드를 포함하는 Python 바이트코드는 이전 버전의 인터프리터에서는 실행될 수 없겠지만, 버전 간의 바이트코드 수준의 호환성 파괴는 종종 가정되는 일입니다.

### Implementation (구현)

미정(TBD). 이 부분이 도움이 필요한 곳입니다. 중앙 이름/위치 레지스트리(registry)가 있거나 객체 어트리뷰트를 수정하는 코드가 수정되어야 한다고 생각하지만, 가장 좋은 방법을 확신할 수 없습니다. `STORE_GLOBAL` 및 `STORE_ATTR` 오피코드를 구현하는 코드를 살펴보면 `PyDict_SetItem` 및 `PyObject_SetAttr` 또는 이들의 String 변형에 일부 변경이 필요할 가능성이 높습니다. 이상적으로는 이러한 변경 사항을 지역화할 수 있는 상당히 중앙 집중적인 장소가 있을 것입니다. 로컬 변수의 어트리뷰트 추적을 고려하기 시작하면 `STORE_FAST`도 수정해야 하는 문제에 부딪히게 되는데, 이는 로컬 변수의 이름 바인딩이 훨씬 더 자주 변경되므로 문제가 될 수 있습니다. (옵티마이저는 변수의 이름 바인딩이 변경되는 로컬 변수의 어트리뷰트에 대한 추적 코드를 삽입하는 것을 피할 수 있다고 생각합니다.)

### Performance (성능)

`TRACK_OBJECT`를 구현하는 것이 일반적으로 단일 `LOAD_GLOBAL` 명령어 또는 `LOAD_GLOBAL`/`LOAD_ATTR` 쌍보다 훨씬 비싸지는 않을 것이라고 생각합니다 (현재로서는 이를 증명할 코드는 없지만). 옵티마이저는 객체 접근이 루프 내에서 발생하지 않는 한 `LOAD_GLOBAL` 및 `LOAD_GLOBAL`/`LOAD_ATTR`를 새로운 방식으로 변환하는 것을 피할 수 있어야 합니다. 더 나아가, 현재 Python 가상 머신에 대한 레지스터 지향적인 대체는 대부분의 `LOAD_FAST` 명령어까지도 없앨 수 있을 것입니다.

추적되는 객체의 수는 상대적으로 적어야 합니다. 모든 활성 스레드의 모든 활성 프레임이 객체를 추적할 수 있지만, 이는 주어진 애플리케이션에 정의된 함수 수에 비해 적다고 생각합니다.

### References (참고 자료)

*   https://mail.python.org/pipermail/python-dev/2000-July/007609.html
*   http://www.zope.org/Members/jeremy/CurrentAndFutureProjects/FastGlobalsPEP
*   http://www.musi-cal.com/~skip/python/rattlesnake20010813.tar.gz

### Copyright (저작권)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.