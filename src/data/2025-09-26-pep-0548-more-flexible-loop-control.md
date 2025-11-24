---
title: "[Rejected] PEP 548 - More Flexible Loop Control"
excerpt: "Python Enhancement Proposal 548: 'More Flexible Loop Control'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/548/
toc: true
toc_sticky: true
date: 2025-09-26 23:35:01+0900
last_modified_at: 2025-09-26 23:35:01+0900
published: true
---
> **원문 링크:** [PEP 548 - More Flexible Loop Control](https://peps.python.org/pep-0548/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 05-Sep-2017


**Title:** PEP 548 – 더욱 유연한 반복문 제어 (More Flexible Loop Control)

**서론 (Introduction)**
*   PEP 548이 무엇을 제안했는지 간략하게 설명.
*   작성자, 상태(Rejected), 유형(Standards Track), 생성일, Python 버전(3.7) 명시.

**거절 사유 (Rejection Note)**
*   Guido van Rossum에 의해 거절되었음을 명확히 언급하고, 관련 메일링 리스트 링크 제공.

**요약 (Abstract)**
*   `break` 및 `continue` 문에 선택적 불리언(boolean) 표현식을 추가하여 실행 여부를 제어하고, 반복문의 흐름을 더욱 명확하고 간결하게 표현할 수 있도록 한다는 제안 요약.

**동기 (Motivation)**
*   이전 PEP 315의 거절 사유를 인용하며, `while` 루프 조건 평가 전에 코드를 실행해야 하는 경우가 많고, 이 코드가 루프 외부에 중복되는 문제를 언급.
*   기존의 `while True: <setup code> if not <condition>: break <loop body>` 형태보다 더 우수한 형태를 제안하여, `for` 루프에도 적용 가능하며, 반복문의 제어 흐름을 더 명시적으로 만들고 Python의 들여쓰기 미학을 보존한다고 설명.

**문법 (Syntax)**
*   제안된 `break` 및 `continue` 문의 확장된 문법 설명:
    *   `break_stmt : "break" ["if" expression]`
    *   `continue_stmt : "continue" ["if" expression]`
*   `while` 문의 수정된 문법 설명:
    *   `while_stmt : while1_stmt|while2_stmt`
    *   `while1_stmt : "while" expression ":" suite ["else" ":" suite]` (기존과 동일)
    *   `while2_stmt : "while" ":" suite` (새로운 형태)

**의미론 (Semantics)**
*   `break if` 또는 `continue if`는 `expression`이 참(true)으로 평가될 때만 실행된다고 설명.
*   `expression`이 없는 `while` 문은 `while True` 문처럼 `break` 또는 `return`이 실행될 때까지(또는 에러가 발생할 때까지) 반복된다고 설명.
*   `expression`이 없는 `while` 문에서는 `else` 스위트가 허용되지 않으며, 실용적이라면 `expression` 없는 `while` 문 본문에 최소한 하나의 `break` 또는 `return` 문이 없으면 에러로 처리되어야 한다고 언급.

**정당성 및 예시 (Justification and Examples)**
*   기존의 `while True: ... if not <condition>: break ...` 형태와 제안된 `while: ... break if not <condition> ...` 형태를 비교.
*   새로운 문법이 제어 흐름 키워드를 코드 라인의 맨 앞에 두어 가독성을 높인다고 설명.
*   `tarfile` 모듈의 예시를 통해 `break if`의 명확성을 보여줌.
*   `sre_parse` 모듈의 복잡한 예시를 통해 `break if`가 오류 처리를 루프 본문 밖으로 이동시켜 루프 로직을 훨씬 이해하기 쉽게 만든다고 설명.
*   다른 언어의 `repeat ... until <expression>` 구문을 Python스럽게 표현하는 방법으로 `while: ... break if <expression>`을 제안.
*   `continue if`의 경우, 일관성을 위해 필요하다고 언급. `zipfile` 모듈의 예시를 통해 `True` 토큰 생략 외에는 큰 개선점이 없음을 보여줌.
*   `uuid.py` 모듈의 예시를 통해 `continue if` 역시 루프 코드의 가독성을 향상시키는 중요한 사용 사례가 있음을 제시.
*   예시들이 표준 라이브러리에서 `while True`와 `continue`를 검색하여 찾았고, 처음 검사한 4개 모듈에서 관련 예시를 발견했다고 언급.

**저작권 (Copyright)**
*   문서가 공개 도메인에 있음을 명시.

---


# PEP 548 – 더욱 유연한 반복문 제어 (More Flexible Loop Control)

## 서론

이 문서는 Python의 `break` 및 `continue` 문에 선택적 불리언(boolean) 표현식을 추가하고, `while` 문의 구문을 수정하여 반복문의 제어 흐름을 더욱 명확하고 간결하게 표현할 수 있도록 제안했습니다. 하지만 이 제안은 최종적으로 거절되었습니다.

*   **작성자:** R David Murray
*   **상태:** 거절됨 (Rejected)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2017년 9월 5일
*   **Python 버전:** 3.7
*   **게시 이력:** 2017년 8월 5일

## 거절 사유 (Rejection Note)

이 PEP는 Guido van Rossum에 의해 거절되었습니다. 관련 논의는 다음 링크에서 확인할 수 있습니다: [https://mail.python.org/pipermail/python-dev/2017-September/149232.html](https://mail.python.org/pipermail/python-dev/2017-September/149232.html)

## 요약 (Abstract)

이 PEP는 `break` 및 `continue` 문에 실행 여부를 제어하는 선택적 불리언 표현식을 추가하는 것을 제안합니다. 이를 통해 반복문 내의 제어 흐름을 더 명확하고 간결하게 표현할 수 있습니다.

## 동기 (Motivation)

이전에 거절된 PEP 315에서 인용한 바와 같이, `while` 루프의 조건이 평가되기 전에 특정 코드가 실행되어야 하는 경우가 많습니다. 이러한 코드는 루프 진입 전에 한 번 실행되는 설정(setup) 코드로서 루프 외부에 중복되는 경우가 잦았습니다.

기존의 방식은 다음과 같습니다:

```python
<setup code>
while <condition>:
    <loop body>
    <setup code>
```
PEP 315는 `while True: <setup code> if not <condition>: break <loop body>` 형태보다 우수한 문법을 찾지 못해 거절되었습니다.

이 PEP는 `for` 루프에도 적용 가능한 더 우수한 형태를 제안합니다. 이는 반복문의 제어 흐름을 더 명시적으로 만들면서 Python의 들여쓰기 미학을 보존하기 때문에 기존 방식보다 우수합니다.

## 문법 (Syntax)

`break` 및 `continue` 문의 문법은 다음과 같이 확장됩니다:

*   `break_stmt : "break" ["if" expression]`
*   `continue_stmt : "continue" ["if" expression]`

또한, `while` 문의 문법은 다음과 같이 수정됩니다:

*   `while_stmt : while1_stmt|while2_stmt`
*   `while1_stmt : "while" expression ":" suite ["else" ":" suite]` (기존 `while` 문과 동일)
*   `while2_stmt : "while" ":" suite` (새로운 형태)

## 의미론 (Semantics)

*   `break if` 또는 `continue if`는 `expression`이 `True`로 평가될 때만 실행됩니다.
*   `expression`이 없는 `while` 문은 `while True` 문과 마찬가지로 `break` 또는 `return`이 실행되거나 에러가 발생할 때까지 반복됩니다.
*   `expression`이 없는 `while` 문에서는 `else` 스위트가 허용되지 않습니다. 또한, 가능하다면 `expression`이 없는 `while` 문 본문에 최소한 하나의 `break` 또는 `return` 문이 포함되어 있지 않으면 에러로 처리되어야 합니다.

## 정당성 및 예시 (Justification and Examples)

이전의 "가장 좋은" 형태는 다음과 같습니다:

```python
while True:
    <setup code>
    if not <condition>:
        break
    <loop body>
```
이 PEP가 제안하는 형태는 다음과 같습니다:

```python
while:
    <setup code>
    break if not <condition>
    <loop body>
```
여기서 중요한 차이점은 루프의 제어 흐름 키워드(`break`)가 코드 라인의 맨 앞에 나타난다는 것입니다. 이는 특히 색상이 적용된 코드를 읽을 때 루프의 제어 흐름을 한눈에 파악하기 쉽게 만듭니다.

예를 들어, `tarfile` 모듈에서 흔히 볼 수 있는 코드 패턴입니다:

```python
while True:
    buf = self._read(self.bufsize)
    if not buf:
        break
    t.append(buf)
```
이 코드를 읽을 때, `break`가 `if` 아래에 들여쓰기 되어 있으므로 `break`가 어느 `while`에 적용되는지 추적해야 할 수도 있고, 조건을 읽고 나서야 이 조건이 루프의 흐름을 변경한다는 것을 알게 될 수 있습니다.

새로운 문법을 사용하면 다음과 같이 됩니다:

```python
while:
    buf = self._read(self.bufsize)
    break if not buf
    t.append(buf)
```
이 코드를 읽으면 `break`가 루프 본문과 같은 들여쓰기 수준에 있으므로 `while`에 적용된다는 것을 먼저 파악하고, 그 다음에 제어 흐름을 변경하는 조건을 읽게 됩니다.

또한, `sre_parse`의 더 복잡한 예시를 고려해봅시다:

```python
while True:
    c = self.next
    self.__next()
    if c is None:
        if not result:
            raise self.error("missing group name")
        raise self.error("missing %s, unterminated name" % terminator, len(result))
    if c == terminator:
        if not result:
            raise self.error("missing group name", 1)
        break
    result += c
return result
```
현재 Python 루프 제어 문법으로는 위와 같이 코드를 작성하는 것이 자연스럽습니다. 그러나 `break if`를 사용하면 다음과 같이 작성하는 것이 더 자연스러울 것입니다:

```python
while:
    c = self.next
    self.__next()
    break if c is None or c == terminator
    result += c
    if not result:
        raise self.error("missing group name")
    elif c is None:
        raise self.error("missing %s, unterminated name" % terminator, len(result))
return result
```
이 형태는 오류 처리를 루프 본문 밖으로 이동시켜 루프 로직을 훨씬 이해하기 쉽게 만듭니다. 현재 문법으로도 이와 같이 코드를 작성할 수 있지만, 제안된 문법은 더 명확한 형태로 작성하는 것을 더 자연스럽게 만듭니다.

제안된 문법은 다른 언어에서 볼 수 있는 고전적인 `repeat ... until <expression>` 구문을 Python스럽게 표현할 수 있는 방법을 제공합니다. Python에서는 이전에 좋은 문법이 없었습니다.

```python
while:
    ...
    break if <expression>
```
예를 들어, `tarfile` 모듈에는 다음과 같은 "read until" 루프가 몇 군데 있습니다:

```python
while True:
    s = self.__read(1)
    if not s or s == NUL:
        break
```
새로운 문법을 사용하면 다음과 같이 더 명확하게 읽힙니다:

```python
while:
    s = self.__read(1)
    break if not s or s == NUL
```
`continue`에 이 문법을 확장하는 것은 `break`만큼 강력한 필요성은 없지만, 일관성 측면에서 가치가 있습니다.

`continue` 문은 여러 줄 `if` 스위트의 끝에 오는 경우가 더 흔합니다. `zipfile`의 예시입니다:

```python
while True:
    try:
        self.fp = io.open(file, filemode)
    except OSError:
        if filemode in modeDict:
            filemode = modeDict[filemode]
            continue
        raise
    break
```
이 루프에서 새로운 문법이 제공할 수 있는 유일한 개선점은 `True` 토큰의 생략입니다.

반면에 `uuid.py`의 다음 예시를 고려해봅시다:

```python
for i in range(adapters.length):
    ncb.Reset()
    ncb.Command = netbios.NCBRESET
    ncb.Lana_num = ord(adapters.lana[i])
    if win32wnet.Netbios(ncb) != 0:
        continue
    ncb.Reset()
    ncb.Command = netbios.NCBASTAT
    ncb.Lana_num = ord(adapters.lana[i])
    ncb.Callname = '*'.ljust(16)
    ncb.Buffer = status = netbios.ADAPTER_STATUS()
    if win32wnet.Netbios(ncb) != 0:
        continue
    status._unpack()
    bytes = status.adapter_address[:6]
    if len(bytes) != 6:
        continue
    return int.from_bytes(bytes, 'big')
```
이 코드는 다음과 같이 변경될 수 있습니다:

```python
for i in range(adapters.length):
    ncb.Reset()
    ncb.Command = netbios.NCBRESET
    ncb.Lana_num = ord(adapters.lana[i])
    continue if win32wnet.Netbios(ncb) != 0
    ncb.Reset()
    ncb.Command = netbios.NCBASTAT
    ncb.Lana_num = ord(adapters.lana[i])
    ncb.Callname = '*'.ljust(16)
    ncb.Buffer = status = netbios.ADAPTER_STATUS()
    continue if win32wnet.Netbios(ncb) != 0
    status._unpack()
    bytes = status.adapter_address[:6]
    continue if len(bytes) != 6
    return int.from_bytes(bytes, 'big')
```
이 예시는 `continue if` 역시 루프 코드의 가독성을 향상시키는 중요한 사용 사례가 있음을 보여줍니다.

이 PEP를 위해 선택된 모든 예시들이 표준 라이브러리에서 `while True`와 `continue`를 검색하여 찾았고, 관련 예시들이 처음 검사한 네 개의 모듈에서 발견되었다는 점은 주목할 만합니다.

---
**저작권 (Copyright)**
이 문서는 공개 도메인에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.