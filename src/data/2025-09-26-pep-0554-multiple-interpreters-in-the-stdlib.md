---
title: "[Superseded] PEP 554 - Multiple Interpreters in the Stdlib"
excerpt: "Python Enhancement Proposal 554: 'Multiple Interpreters in the Stdlib'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/554/
toc: true
toc_sticky: true
date: 2025-09-26 23:40:00+0900
last_modified_at: 2025-09-26 23:40:00+0900
published: true
---
> **원문 링크:** [PEP 554 - Multiple Interpreters in the Stdlib](https://peps.python.org/pep-0554/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 05-Sep-2017

주어진 URL의 PEP 554 문서를 바탕으로 한국어 번역 및 요약을 제공합니다. 이 문서는 Python 3.12에서 [PEP 684]를 통해 per-interpreter GIL이 도입된 이후 특히 중요해진 `stdlib`에 다중 인터프리터를 추가하는 제안입니다.

---

# PEP 554 – `stdlib`의 다중 인터프리터 (Multiple Interpreters in the Stdlib)

*   **작성자:** Eric Snow
*   **상태:** 대체됨 (Superseded) - 이 PEP의 내용은 [PEP 734]로 이어집니다.
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2017년 9월 5일
*   **Python 버전:** 3.13
*   **대체된 PEP:** [PEP 734]

## 개요 (Abstract)

CPython은 1.5 버전(1997년)부터 동일 프로세스 내에서 여러 개의 인터프리터("서브 인터프리터"라고도 함)를 지원해왔습니다. 이 기능은 C-API를 통해 사용할 수 있었으며, 서로 간의 상대적인 격리를 통해 새로운 형태의 동시성(concurrency) 접근 방식을 가능하게 합니다.

이 제안은 `stdlib`에 `interpreters` 모듈을 도입합니다. 이 모듈은 C-API에서 이미 제공하는 다중 인터프리터의 기본 기능과 인터프리터 간 통신을 위한 기본 지원을 노출합니다. 특히 [PEP 684]가 Python 3.12에 per-interpreter GIL을 도입한 이후 이 모듈은 더욱 중요해졌습니다.

## 제안 (Proposal)

핵심 요약은 다음과 같습니다.

1.  새로운 `stdlib` 모듈인 "`interpreters`"를 추가합니다.
2.  `concurrent.futures.InterpreterPoolExecutor`를 추가합니다.
3.  확장 모듈(Extension Module) 관리자를 위한 도움을 제공합니다.

### `interpreters` 모듈 (The “interpreters” Module)

`interpreters` 모듈은 다중 인터프리터 기능에 대한 고수준 인터페이스를 제공하며, 새로운 저수준 `_interpreters` 모듈(threading 모듈과 유사)을 래핑합니다. 이 모듈은 CPython에 이미 존재하는 다중 인터프리터 지원을 노출하는 것 외에도, 인터프리터 간에 데이터를 전달하기 위한 기본적인 메커니즘을 지원합니다. 이는 대상 서브 인터프리터의 `__main__` 모듈에 "공유 가능한(shareable)" 객체를 설정하는 것을 포함합니다. `os.pipe()`와 같은 일부 객체는 추가 통신에 사용될 수 있습니다. 이 모듈은 또한 교차 인터프리터 통신의 시연으로 "채널(channels)"의 최소한의 구현을 제공할 것입니다.

객체는 생성된 인터프리터에 묶여 있기 때문에 인터프리터 간에 공유되지 않습니다. 대신, 객체의 데이터가 인터프리터 간에 전달됩니다.

### `interpreters` 모듈 API 요약

다음은 `interpreters` 모듈의 API 요약입니다.

**인터프리터 생성 및 사용:**

*   `list_all() -> [Interpreter]`: 존재하는 모든 인터프리터를 가져옵니다.
*   `get_current() -> Interpreter`: 현재 실행 중인 인터프리터를 가져옵니다.
*   `get_main() -> Interpreter`: 메인 인터프리터를 가져옵니다.
*   `create() -> Interpreter`: 새로운 (유휴) Python 인터프리터를 초기화합니다.

**`class Interpreter`:**

*   `.id`: 인터프리터의 ID (읽기 전용).
*   `.is_running() -> bool`: 인터프리터가 현재 코드를 실행 중인지 여부.
*   `.close()`: 인터프리터를 종료하고 파괴합니다.
*   `.set_main_attrs(**kwargs)`: `__main__`에 "공유 가능한" 객체를 바인딩합니다.
*   `.get_main_attr(name)`: `__main__`에서 "공유 가능한" 객체를 가져옵니다.
*   `.exec(src_str, /)`: 주어진 소스 코드를 (현재 스레드에서) 인터프리터에서 실행합니다.

**인터프리터 간 통신:**

*   `is_shareable(obj) -> Bool`: 객체의 데이터를 인터프리터 간에 전달할 수 있는지 여부.
*   `create_channel() -> (RecvChannel, SendChannel)`: 인터프리터 간 데이터 전달을 위한 새로운 채널을 생성합니다.

### `concurrent.futures.InterpreterPoolExecutor`

`ThreadPoolExecutor`를 확장하여 각 스레드 작업을 서브 인터프리터에서 실행하는 실행자(executor)가 추가될 것입니다. 초기에는 `Interpreter.exec()`가 받아들이는 작업(예: 문자열 스크립트)만 지원되지만, 나중에는 함수 지원 및 작업과 인수를 pickle로 직렬화하는 별도의 메서드도 지원될 수 있습니다.

### 확장 모듈 관리자를 위한 도움 (Help for Extension Module Maintainers)

다단계 초기화([PEP 489])를 구현하는 확장 모듈은 격리되어 다중 인터프리터와 호환되는 것으로 간주됩니다. 그렇지 않은 경우 "호환되지 않는" 것으로 간주됩니다.

많은 확장 모듈이 여전히 호환되지 않습니다. 호환성 문제를 완화하고 호환성을 가속화하기 위해 다음과 같은 조치를 취할 것입니다.

*   확장 모듈이 다중 인터프리터 사용을 지원할 필요가 없음을 명확히 합니다.
*   호환되지 않는 모듈이 서브 인터프리터에서 임포트될 때 `ImportError`를 발생시킵니다.
*   관리자가 호환성을 달성하는 데 도움이 되는 자료(예: 문서)를 제공합니다.
*   Cython 및 PyPI에서 가장 많이 사용되는 확장 모듈의 관리자에게 연락하여 피드백을 받고 지원을 제공합니다.

## 예시 (Examples)

### 현재 OS 스레드에서 격리된 코드 실행
```python
interp = interpreters.create()
print('before')
interp.exec('print("during")')
print('after')
```


### 다른 스레드에서 실행
```python
interp = interpreters.create()
def run():
    interp.exec('print("during")')
t = threading.Thread(target=run)
print('before')
t.start()
t.join()
print('after')
```


### 인터프리터 사전 채우기
```python
interp = interpreters.create()
interp.exec(tw.dedent("""
    import some_lib
    import an_expensive_module
    some_lib.set_up()
"""))
wait_for_request()
interp.exec(tw.dedent("""
    some_lib.handle_request()
"""))
```


### 예외 처리 (Handling an exception)
```python
interp = interpreters.create()
try:
    interp.exec(tw.dedent("""
        raise KeyError
    """))
except interpreters.RunFailedError as exc:
    print(f"got the error from the subinterpreter: {exc}")
```


### 예외 다시 발생 (Re-raising an exception)
```python
interp = interpreters.create()
try:
    try:
        interp.exec(tw.dedent("""
            raise KeyError
        """))
    except interpreters.RunFailedError as exc:
        raise exc.__cause__
except KeyError:
    print("got a KeyError from the subinterpreter")
```


### `__main__` 네임스페이스와 상호작용
```python
interp = interpreters.create()
interp.set_main_attrs(a=1, b=2)
interp.exec(tw.dedent("""
    res = do_something(a, b)
"""))
res = interp.get_main_attr('res')
```


### OS 파이프를 이용한 동기화
```python
interp = interpreters.create()
r1, s1 = os.pipe()
r2, s2 = os.pipe()
def task():
    interp.exec(tw.dedent(f"""
        import os
        os.read({r1}, 1)
        print('during B')
        os.write({s2}, b'')
    """))
t = threading.Thread(target=task)
t.start()
print('before')
os.write(s1, b'')
print('during A')
os.read(r2, 1)
print('after')
t.join()
```


### 파일 디스크립터 공유
```python
interp = interpreters.create()
with open('spamspamspam') as infile:
    interp.set_main_attrs(fd=infile.fileno())
    interp.exec(tw.dedent(f"""
        import os
        for line in os.fdopen(fd):
            print(line)
    """))
```


### pickle을 통한 객체 전달
```python
interp = interpreters.create()
r, s = os.pipe()
interp.exec(tw.dedent(f"""
    import os
    import pickle
    reader = {r}
"""))
interp.exec(tw.dedent("""
    data = b''
    c = os.read(reader, 1)
    while c != b'\\x00':
        data += c
        c = os.read(reader, 1)
    obj = pickle.loads(data)
    do_something(obj)
    c = os.read(reader, 1)
"""))
for obj in input:
    data = pickle.dumps(obj)
    os.write(s, data)
    os.write(s, b'\x00')
    os.write(s, b'\x00')
```


### 인터프리터의 `stdout` 캡처
```python
interp = interpreters.create()
stdout = io.StringIO()
with contextlib.redirect_stdout(stdout):
    interp.exec(tw.dedent("""
        print('spam!')
    """))
assert(stdout.getvalue() == 'spam!')
```


### 채널을 이용한 통신
```python
tasks_recv, tasks = interpreters.create_channel()
results, results_send = interpreters.create_channel()

def worker():
    interp = interpreters.create()
    interp.set_main_attrs(tasks=tasks_recv, results=results_send)
    interp.exec(tw.dedent("""
        def handle_request(req): ...
        def capture_exception(exc): ...
        while True:
            try:
                req = tasks.recv()
            except Exception:  # channel closed
                break
            try:
                res = handle_request(req)
            except Exception as exc:
                res = capture_exception(exc)
            results.send_nowait(res)
    """))

threads = [threading.Thread(target=worker) for _ in range(20)]
for t in threads:
    t.start()

requests = ...
for req in requests:
    tasks.send(req)
tasks.close()

for t in threads:
    t.join()
```


### `memoryview` 공유 (Map-Reduce 예시)
```python
data, chunksize = read_large_data_set()
buf = memoryview(data)
numchunks = (len(buf) + 1) // chunksize  # Changed / to // for integer division
results = memoryview(b'\0' * numchunks)
tasks_recv, tasks = interpreters.create_channel()

def worker():
    interp = interpreters.create()
    interp.set_main_attrs(data=buf, results=results, tasks=tasks_recv)
    interp.exec(tw.dedent("""
        while True:
            try:
                req = tasks.recv()
            except Exception:  # channel closed
                break
            resindex, start, end = req
            chunk = data[start: end]
            res = reduce_chunk(chunk)
            results[resindex] = res
    """))

t = threading.Thread(target=worker)
t.start()

# workers_running() 함수는 예시를 위해 가정된 함수입니다.
def workers_running():
    # 실제 구현에서는 워커 스레드의 상태를 확인해야 합니다.
    return True

for i in range(numchunks):
    if not workers_running():
        raise RuntimeError("No workers running")
    start = i * chunksize
    end = start + chunksize
    if end > len(buf):
        end = len(buf)
    tasks.send((i, start, end)) # Adjusted order to match worker's req unpacking
tasks.close()
t.join()
use_results(results)
```


## 도입 배경 (Rationale)

동일 프로세스 내에서 여러 인터프리터에서 코드를 실행하는 것은 유용한 수준의 격리를 제공합니다. 이는 여러 방식으로 활용될 수 있으며, 서브 인터프리터는 이러한 격리를 확장할 수 있는 잘 정의된 프레임워크를 제공합니다 ([PEP 684] 참조).

Alyssa (Nick) Coghlan은 멀티 프로세싱과의 비교를 통해 몇 가지 이점을 설명했습니다. 서브 인터프리터 간 통신은 공유 메모리를 통한 서브 프로세스 통신과 유사하게 작동할 것으로 예상됩니다. 외부 관점에서 단일 프로세스로 보이며 OS에 추가적인 부담을 주지 않는다는 장점이 있습니다. 또한, OS가 기본적으로 제공하는 프로세스 격리에 구멍을 뚫을 필요가 없으므로 보안 위험 프로필도 다릅니다.

CPython은 1.5 버전부터 다중 인터프리터를 지원했지만, C-API를 통해서만 접근 가능했기 때문에 널리 사용되지 못했습니다. `stdlib`에 기존 기능을 노출하면 이러한 상황을 역전시키는 데 도움이 될 것입니다.

이 제안은 동일한 Python 프로세스 내에서 서로 격리된 다중 인터프리터의 기본 기능을 활성화하는 데 중점을 둡니다.

### 우려 사항 (Concerns)

*   **"서브 인터프리터는 그만한 가치가 없다"**: 일부는 서브 인터프리터가 Python의 공식적인 부분이 될 만큼 충분한 이점을 제공하지 않는다고 주장합니다. 그러나 다중 인터프리터는 격리된 실행 스레드에 초점을 맞춘 새로운 동시성 모델을 제공하며, [PEP 684]를 통해 GIL로 인해 불가능했던 다중 CPU 코어 동시 사용 가능성을 제공합니다.
*   **"stdlib에 다중 인터프리터 지원을 추가하는 것은 C 확장 모듈 작성자에게 추가적인 부담을 준다"**: C 전역 변수를 사용하여 내부 상태를 저장하는 확장 모듈은 다중 인터프리터 환경에서 문제가 될 수 있습니다. [PEP 3121] 및 [PEP 489]는 이 문제에 대한 해결책을 제시했습니다. 이 PEP는 실제 추가 유지 관리 부담이 적고, 서브 인터프리터의 전반적인 이점이 이러한 비용을 상쇄할 만큼 충분히 크다고 주장합니다.
*   **"새로운 동시성 API를 만드는 것은 더 많은 고민과 실험이 필요하다"**: 이 PEP는 새로운 동시성 API를 제안하는 것이 아닙니다. 대신, Python에는 비교적 새로운 동시성 모델과 관련된 패턴을 따르는 코드를 작성하는 데 사용될 수 있는 최소한의 도구(예: 서브 인터프리터, 채널)를 노출합니다.
*   **"GIL을 여전히 공유한다면 서브 인터프리터를 노출하는 것은 의미가 없다"**: 이는 흔한 오해입니다. 이 PEP는 인터프리터가 더 이상 GIL을 공유하지 않는다는 약속을 포함하지 않습니다. 가치는 기존 기능의 노출을 늘리고, (대부분) 격리된 인터프리터 실행을 노출하며, per-interpreter GIL을 준비하고, 실험을 장려하는 데 있습니다.
*   **"데이터 공유는 멀티 코어 시나리오에서 캐시 성능에 부정적인 영향을 미칠 수 있다"**: 현재 인터프리터 간에 데이터를 실제로 공유할 계획이 없으며, 대신 복사하는 데 중점을 두므로 문제가 되지 않을 것입니다.

### 서브 인터프리터에 대하여 (About Subinterpreters)

*   **동시성 (Concurrency)**: CPython의 인터프리터에 내재된 의도적인 격리는 Communicating Sequential Processes (CSP)와 같은 메시지 전달 방식을 통한 격리된 실행 스레드에 초점을 맞춘 동시성 모델에 잘 맞습니다.
*   **공유 데이터 (Shared Data)**: CPython의 인터프리터는 스레드와 달리 본질적으로 격리되어 있습니다. 따라서 동일한 공유 메모리 통신 접근 방식은 작동하지 않습니다. 객체는 생성된 인터프리터에 묶여 있으므로 인터프리터 간에 객체를 안전하게 공유하는 데 제약이 있습니다. 이 제안은 `Interpreter.set_main_attrs()`를 사용하여 `__main__` 모듈에 "공유 가능한" 객체를 설정하는 최소한의 솔루션을 제시합니다.
*   **인터프리터 격리 (Interpreter Isolation)**: CPython의 인터프리터는 서로 엄격하게 격리되도록 의도되었습니다. 각 인터프리터는 모든 모듈, 클래스, 함수 및 변수의 자체 사본을 가집니다. 그러나 파일 디스크립터, 저수준 환경 변수, 프로세스 메모리, 내장 타입(예: `dict`, `bytes`), 싱글톤(예: `None`), 내장/확장/frozen 모듈의 기초 정적 모듈 데이터와 같은 일부 프로세스 전역 상태는 공유됩니다. 또한, C 전역 변수에 의존하는 확장 모듈과 같은 버그나 잘못된 구현으로 인해 일부 격리가 불완전합니다.
*   **기존 사용 (Existing Usage)**: 다중 인터프리터 지원은 널리 사용되는 기능은 아니었습니다. `mod_wsgi`, OpenStack Ceph, JEP 등 몇 가지 사례가 있었지만, 기능의 유용성을 판단할 수 있는 충분한 샘플은 아닙니다.

### `interpreters` 모듈 API

모듈은 다음 함수들을 제공합니다.

*   `list_all() -> [Interpreter]`: 존재하는 모든 인터프리터 목록을 반환합니다.
*   `get_current() -> Interpreter`: 현재 실행 중인 인터프리터를 반환합니다.
*   `get_main() -> Interpreter`: 메인 인터프리터를 반환합니다.
*   `create() -> Interpreter`: 새 Python 인터프리터를 초기화하고 반환합니다.
*   `is_shareable(obj) -> bool`: 객체가 인터프리터 간에 "공유"될 수 있는지 여부를 반환합니다.

`Interpreter` 클래스의 상세 메서드는 "API summary for interpreters module" 섹션을 참조하십시오.

### 잡히지 않은 예외 (Uncaught Exceptions)

`Interpreter.exec()`에서 잡히지 않은 예외는 `interp.exec()`가 호출된 코드에 "효과적으로" 전파됩니다. 예외가 인터프리터 간에 유출되는 것을 방지하기 위해, 예외와 트레이스백의 대리자(surrogate)를 생성하여 (`traceback.TracebackException` 참조) 새로운 `interpreters.RunFailedError`의 `__cause__`로 설정하고 이 `RunFailedError`를 발생시킵니다.

### 인터프리터 제한 사항 (Interpreter Restrictions)

`interpreters.create()`로 생성된 모든 새 인터프리터는 실행하는 코드에 특정 제한 사항이 있습니다.

*   다단계 초기화를 구현하지 않는 확장 모듈 임포트 실패.
*   데몬 스레드(daemon threads) 생성 불가.
*   `os.fork()` 허용 안됨 (따라서 멀티프로세싱 불가).
*   `os.exec*()` 허용 안됨 (하지만 서브프로세스처럼 "fork+exec"는 허용).

기존 C-API로 생성된 인터프리터와 "메인" 인터프리터는 이러한 제한 사항이 없습니다.

### 통신 API (API For Communication)

객체 간 데이터 공유(통신) 메커니즘이 없으면 다중 인터프리터 지원은 덜 유용합니다. 이 제안에서는 실제 Python 객체를 인터프리터 간에 공유하는 것을 피하고, `Interpreter.set_main_attrs()` 메서드를 통해 `__main__` 모듈의 전역 변수를 설정하는 기본 메커니즘을 제공합니다. 값은 "공유 가능(shareable)"해야 합니다.

#### 공유 가능한 타입 (Shareable Types)

객체는 해당 타입이 공유 가능한 인스턴스를 지원하는 경우 "공유 가능"합니다. 타입은 객체를 인터프리터 독립적인 데이터로 변환하고 다른 쪽에서 다시 객체로 변환하는 데 사용되는 새로운 내부 프로토콜을 구현해야 합니다.

초기에는 다음과 같은 최소한의 간단하고 불변하는 내장 타입이 지원될 것입니다.

*   `None`
*   `bool`
*   `bytes`
*   `str`
*   `int`
*   `float`

또한, 초기에는 `memoryview` (PEP 3118 버퍼 공유 허용) 및 채널과 같은 소수의 복잡한 타입도 지원됩니다.

#### OS 파이프를 통한 통신 (Communicating Through OS Pipes)

전용 통신 객체가 없더라도 `os.pipe()`와 같은 기존 도구를 사용할 수 있습니다.

#### 채널 (Channels)

`interpreters` 모듈에는 인터프리터 간에 객체 데이터를 전달하기 위한 전용 솔루션인 **채널**이 포함될 것입니다. 채널은 파이프, 큐, CSP의 채널에서 영감을 받은 단방향 FIFO(First-In, First-Out) 메커니즘입니다. 채널은 `send`와 `receive` 두 가지 작업을 가집니다. 핵심은 채널이 Python 객체 자체보다는 객체에서 파생된 데이터를 전송한다는 것입니다.

`interpreters` 모듈은 채널과 관련된 다음 함수를 제공합니다.

*   `create_channel() -> (RecvChannel, SendChannel)`: 새 채널을 생성하고 채널 끝에 해당하는 `RecvChannel`과 `SendChannel`을 반환합니다.

모듈은 또한 다음 채널 관련 클래스를 제공합니다.

*   `class RecvChannel(id)`: 채널의 수신 끝.
    *   `recv(*, timeout=None)`: 채널에서 다음 객체를 반환합니다.
    *   `recv_nowait(default=None)`: 채널에서 다음 객체를 반환합니다.
*   `class SendChannel(id)`: 채널의 송신 끝.
    *   `send(obj, *, timeout=None)`: 객체(즉, 해당 데이터)를 채널의 "recv" 끝으로 보냅니다.
    *   `send_nowait(obj)`: 객체를 채널의 "recv" 끝으로 보냅니다.

#### 공유 객체에 대한 주의사항 (Caveats For Shared Objects)

다시 말하지만, Python 객체는 인터프리터 간에 공유되지 않습니다. 그러나 어떤 경우에는 해당 객체가 래핑하는 데이터가 실제로 공유될 수도 있습니다(예: [PEP 3118] 버퍼). 이러한 경우 원본 인터프리터의 객체는 다른 인터프리터에서 공유 데이터가 더 이상 사용되지 않을 때까지 유지됩니다.

### 문서화 (Documentation)

새로운 `stdlib` 문서 페이지에는 다음 내용이 포함될 것입니다.

*   확장 모듈이 다중 인터프리터 지원을 요구하지 않는다는 명확한 주석.
*   서브 인터프리터에 대한 설명.
*   다중 인터프리터 사용 방법(및 통신 방법)에 대한 간략한 예시.
*   다중 인터프리터 사용의 한계 요약.
*   다중 인터프리터 호환성을 보장하기 위한 자료 링크.
*   이 PEP의 API 정보 대부분.

## 대안 솔루션 (Alternative Solutions)

`concurrent.futures` 또는 `multiprocessing` 모듈에 인터프리터 지원을 추가하는 것은 적합하지 않습니다. 명확한 지원은 `interpreters` 모듈에 있어야 합니다.

## 미해결 질문 (Open Questions)

*   `interp.exec()`가 현재 스레드에서 실행되는 것이 너무 혼란스러울까요?
*   `interp.exec()` 및 `Interpreter.set_main_attrs()` / `Interpreter.get_main_attr()`에 지금 pickle 폴백을 추가해야 할까요?
*   `interp.exec()`에서 (제한된) 함수를 지금 지원해야 할까요?
*   `Interpreter.close()`를 `Interpreter.destroy()`로 이름을 바꿔야 할까요?
*   채널이 있으니 `Interpreter.get_main_attr()`를 삭제해야 할까요?
*   채널은 자체 PEP로 분리되어야 할까요?

## 연기된 기능 (Deferred Functionality)

이 제안을 최소한으로 유지하기 위해 다음 기능들은 향후 고려를 위해 제외되었습니다.

*   편의성 API 추가 (예: `Interpreter.run()` 또는 `Interpreter.call()`).
*   현재 스레드에서 실행되는 인터프리터에 대한 혼란 방지.
*   "`running`"과 "`has threads`" 명확화.
*   공유를 위한 Dunder 메서드 (`__xid__`).
*   `Interpreter.call()`.
*   `Interpreter.run_in_thread()`.
*   동기화 프리미티브(Synchronization Primitives).
*   CSP 라이브러리.
*   문법적 지원.
*   `multiprocessing` 통합.
*   C 확장 모듈 `opt-in/opt-out`.
*   채널 오염(Poisoning channels).
*   `__main__` 재설정.
*   인터프리터 상태 재설정 (`Interpreter.reset()`).
*   기존 인터프리터 상태 복사 (`Interpreter.copy()`).
*   공유 가능한 파일 디스크립터 및 소켓.
*   `async` 통합.
*   이터레이션(iteration) 지원.
*   채널 컨텍스트 관리자.
*   파이프 및 큐.
*   `send()`에서 락 반환.
*   채널의 우선순위 지원.
*   설정 상속 지원.
*   예외 공유 가능하게 만들기.
*   직렬화를 통해 모든 것을 공유 가능하게 만들기.
*   `RunFailedError.__cause__`를 lazy하게 만들기.
*   `interp.exec()`에서 값 반환.
*   공유 가능한 동기화 프리미티브 추가.
*   `SystemExit` 및 `KeyboardInterrupt` 다르게 전파.
*   채널 끝 클래스에 명시적 `release()` 및 `close()` 추가.
*   `SendChannel.send_buffer()` 추가.
*   스레드에서 자동 실행.

## 거부된 아이디어 (Rejected Ideas)

*   **명시적 채널 연관 (Explicit channel association)**: `recv()` 및 `send()` 호출 시 인터프리터가 채널과 암시적으로 연관되는 방식이 유지됩니다. 명시적인 `add_channel()`/`remove_channel()` 메서드는 불필요한 복잡성만 추가한다고 판단되었습니다.
*   **파이프 기반 API 추가**: 두 인터프리터 간의 단방향 FIFO 파이프는 대부분의 사용 사례에 충분하지만, 채널을 통한 다대다 단방향 FIFO를 지원하는 것이 더 큰 이점을 제공합니다.
*   **큐 기반 API 추가**: 큐와 버퍼링된 채널은 거의 동일하지만, `stdlib`의 `queue.Queue`와의 혼동을 피하기 위해 "Channel"이라는 이름이 사용되었습니다.
*   **"enumerate"**: `list_all()` 함수는 모든 인터프리터 목록을 제공합니다. `threading` 모듈의 `enumerate()`와 달리, "list_all"이라는 이름은 Python 사용자에게 더 명확하다고 판단되었습니다.
*   **인터프리터 간 예외 유출 방지를 위한 대안 솔루션**: `RunFailedError`를 발생시키고 `__cause__`에 원본 예외의 안전한 프록시를 래핑하는 현재 방식이 채택되었습니다. 이는 예외 객체 및 트레이스백이 인터프리터 경계를 넘어 유출되는 것을 방지합니다.
*   **각 새 인터프리터를 항상 자체 스레드와 연관시키기**: 인터프리터는 본질적으로 스레드에 묶여 있지 않으며, `Interpreter.exec()` 호출만 스레드에 묶입니다. 각 인터프리터를 자체 스레드와 연관시키는 것은 C-API와의 차이, 암시적인 스레드 생성의 마법, 비효율성, 유효한 사용 사례 방해 등의 문제로 거부되었습니다.
*   **`Interpreter.exec()`에 여러 동시 호출 허용**: 각 인터프리터는 하나의 `__main__` 모듈만 가지므로, 동시 호출을 허용하면 `__main__` 공유를 처리하거나 새로운 메커니즘을 발명해야 하는 복잡성이 발생합니다.
*   **`RunFailedError`에 "reraise" 메서드 추가**: `__cause__`를 사용하는 것만으로도 충분히 유용하다고 판단되어 `reraise` 메서드는 불필요하다고 판단되었습니다.

## 구현 (Implementation)

PEP의 구현은 4가지 부분으로 나뉩니다.

1.  이 PEP에서 설명하는 고수준 모듈 (대부분 저수준 C 확장 모듈의 가벼운 래퍼)
2.  저수준 C 확장 모듈.
3.  저수준 모듈에 필요한 내부 C-API에 대한 추가 기능.
4.  저수준 모듈을 촉진하는 CPython 런타임의 보조 수정/변경.

대부분의 구현은 이미 완료되었거나 거의 완료되었습니다. 특히 `_xxsubinterpreters` 모듈로 병합된 저수준 모듈은 테스트 목적으로 사용되고 있습니다.
이 PEP 554의 구현 노력은 CPython의 멀티 코어 지원 개선을 목표로 하는 더 큰 프로젝트의 일부로 추적되고 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.