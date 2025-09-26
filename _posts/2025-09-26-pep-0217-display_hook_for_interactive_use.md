---
title: "[Final] PEP 217 - Display Hook for Interactive Use"
excerpt: "Python Enhancement Proposal 217: 'Display Hook for Interactive Use'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/217/
toc: true
toc_sticky: true
date: 2025-09-26 16:34:58+0900
last_modified_at: 2025-09-26 16:34:58+0900
published: true
---
> **원문 링크:** [PEP 217 - Display Hook for Interactive Use](https://peps.python.org/pep-0217/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 31-Jul-2000


# PEP 217 – 대화형 사용을 위한 디스플레이 훅 (Display Hook for Interactive Use)

*   **작성자:** Moshe Zadka <moshez at zadka.site.co.il>
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2000년 7월 31일
*   **Python 버전:** 2.1

## 개요 (Abstract)

Python의 대화형 모드(interactive mode)는 구현의 큰 강점 중 하나입니다. 명령줄에서 표현식(expressions)을 작성하고 의미 있는 출력을 즉시 얻을 수 있기 때문입니다. 그러나 출력 함수가 모든 사용자에게 만족스러울 수는 없으며, 현재의 출력 함수는 종종 이러한 목표에 미치지 못합니다. 이 PEP는 Python에 내장된 디스플레이 함수에 대한 대안을 제공하는 방법을 설명하여, 사용자가 대화형 인터프리터(interactive interpreter)의 출력을 제어할 수 있도록 돕습니다.

## 인터페이스 (Interface)

현재 Python 솔루션은 많은 사용자에게 잘 작동해 왔으며, 이 제안이 기존의 방식을 손상시켜서는 안 됩니다. 따라서 기본 구성에서는 REPL (Read-Eval-Print Loop) 루프에서 아무것도 변경되지 않습니다. 인터프리터가 대화형으로 입력된 표현식을 출력하는 방식을 변경하려면, 사용자는 `sys.displayhook`를 호출 가능한 객체(callable object)로 재할당해야 합니다. 대화형으로 입력된 표현식의 결과와 함께 이 객체를 호출한 결과는 출력 가능해야 하며, 이것이 `sys.stdout`에 인쇄될 것입니다.

## 해결책 (Solution)

바이트코드 `PRINT_EXPR`은 `sys.displayhook(POP())`를 호출합니다. `sys` 내장 모듈에는 다음과 동일한 `displayhook()` 함수가 추가될 것입니다.

```python
import __builtin__

def displayhook(o):
    if o is None:
        return
    __builtin__._ = None
    print(repr(o)) # Python 2 syntax: print `o`
    __builtin__._ = o
```
**참고:** 원문에는 `print `o``로 되어 있으나, Python 3 호환성을 위해 `print(repr(o))`로 표기했습니다. 이는 객체의 "공식적인" 문자열 표현(representation)을 출력하는 방식입니다.

## Jython 관련 사항 (Jython Issues)

`Py.printResult` 메서드도 유사하게 변경될 것입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.