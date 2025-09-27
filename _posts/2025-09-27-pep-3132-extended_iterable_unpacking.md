---
title: "[Final] PEP 3132 - Extended Iterable Unpacking"
excerpt: "Python Enhancement Proposal 3132: 'Extended Iterable Unpacking'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3132/
toc: true
toc_sticky: true
date: 2025-09-27 14:32:37+0900
last_modified_at: 2025-09-27 14:32:37+0900
published: true
---
> **원문 링크:** [PEP 3132 - Extended Iterable Unpacking](https://peps.python.org/pep-3132/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Apr-2007

PEP 3132 – 확장된 이터러블 언패킹 (Extended Iterable Unpacking)

## 개요 (Abstract)
이 PEP는 이터러블(iterable) 언패킹(unpacking) 문법의 변경을 제안합니다. 이 변경을 통해 "catch-all" 이름을 지정할 수 있게 되는데, 이 이름에는 "일반" 이름에 할당되지 않은 모든 항목의 리스트가 할당됩니다.

예시를 통해 더 명확하게 이해할 수 있습니다:
```python
>>> a, *b, c = range(5)
>>> a
0
>>> c
4
>>> b
[1, 2, 3]
```

## 도입 배경 (Rationale)
많은 알고리즘은 시퀀스(sequence)를 "첫 번째 항목, 나머지" 쌍으로 분리해야 합니다. 새로운 문법을 사용하면 다음과 같이 더 깔끔하고 효율적인 방법으로 대체할 수 있습니다:
```python
first, rest = seq[0], seq[1:]
```
위 코드는 다음으로 대체됩니다:
```python
first, *rest = seq
```
더 복잡한 언패킹 패턴의 경우, 새로운 문법은 훨씬 더 깔끔하며, 서투른 인덱스(index) 처리가 더 이상 필요하지 않습니다.

또한, 우측 값(right-hand value)이 리스트가 아닌 이터러블일 경우, 슬라이싱(slicing)을 수행하기 전에 리스트로 변환해야 합니다. 이러한 임시 리스트 생성을 피하려면 다음과 같은 방법을 사용해야 했습니다:
```python
it = iter(seq)
first = it.next()
rest = list(it)
```

## 명세 (Specification)
단순 할당(augmented assignment에는 언패킹이 정의되어 있지 않음)의 좌측에 있는 튜플(tuple) 또는 리스트는 단일 별표(`*`)가 앞에 붙은 표현식("starred" 표현식이라고 함)을 최대 하나만 포함할 수 있습니다. 목록의 다른 표현식은 "필수(mandatory)" 표현식이라고 합니다. 이 starred 표현식은 언패킹되는 이터러블에서 어떤 필수 표현식에도 할당되지 않은 모든 항목의 리스트를 할당받거나, 그러한 항목이 없으면 빈 리스트를 할당받는 하위 표현식을 지정합니다.

예를 들어, `seq`가 슬라이스 가능한 시퀀스이고 `seq`에 최소 두 개의 요소가 있는 경우, 다음의 모든 할당은 동등합니다:
```python
a, b, c = seq[0], list(seq[1:-1]), seq[-1]
a, *b, c = seq
[a, *b, c] = seq
```

만약 이터러블에 모든 필수 표현식에 할당할 만큼 충분한 항목이 포함되어 있지 않다면 (현재와 마찬가지로) 오류가 발생합니다.

또한, 다음과 같이 starred 표현식을 단독 할당 대상으로 사용하는 것도 오류입니다:
```python
*a = range(5)
```

그러나 다음은 유효한 문법입니다:
```python
*a, = range(5)
```

이 제안은 `for` 문과 같이 암시적 할당(implicit assignment) 컨텍스트의 튜플에도 적용됩니다:
```python
for a, *b in [(1, 2, 3), (4, 5, 6, 7)]:
    print(b)
```
위 코드는 다음과 같이 출력됩니다:
```
[2, 3]
[5, 6, 7]
```

starred 표현식은 할당 대상(assignment targets)으로만 허용됩니다. 함수 호출의 star-args(`*args`)를 제외하고 다른 곳에서 사용하는 것은 오류입니다.

## 구현 (Implementation)

### 문법 변경 (Grammar change)
이 기능에는 새로운 문법 규칙이 필요합니다:
`star_expr: ['*'] expr`

다음 두 규칙에서 `expr`가 `star_expr`로 변경됩니다:
`comparison: star_expr (comp_op star_expr)*`
`exprlist: star_expr (',' star_expr)* [',']`

### 컴파일러 변경 (Changes to the Compiler)
새로운 ASDL 표현식 유형인 `Starred`가 추가되어 starred 표현식을 나타냅니다. 여기서 도입된 starred 표현식 요소는 보편적이며, 나중에 `yield *iterable` 제안과 같이 할당 컨텍스트가 아닌 다른 목적으로 사용될 수 있습니다.

컴파일러는 starred 표현식이 유효하지 않은 모든 경우를 인식하고 구문 오류(syntax errors)로 플래그를 지정하도록 변경됩니다.

새로운 바이트코드(bytecode) 명령어인 `UNPACK_EX`가 추가됩니다. 이 명령어의 인자(argument)는 하위 8비트에 starred 대상 이전의 필수 대상 수를, 상위 8비트에 starred 대상 이후의 필수 대상 수를 가집니다. starred 표현식이 없는 시퀀스를 언패킹하는 경우에는 이전 `UNPACK_ITERABLE` opcode가 유지됩니다.

### 바이트코드 인터프리터 변경 (Changes to the Bytecode Interpreter)
`ceval.c` 파일의 `unpack_iterable()` 함수는 `argcntafter` 매개변수를 통해 확장된 언패킹을 처리하도록 변경됩니다. `UNPACK_EX`의 경우, 이 함수는 다음을 수행합니다:
* starred 대상 이전의 필수 대상을 위한 모든 항목을 수집합니다.
* 이터러블에서 남은 모든 항목을 리스트로 수집합니다.
* 리스트에서 starred 대상 이후의 필수 대상을 위한 항목을 팝(pop)합니다.
* 개별 항목과 크기가 조정된 리스트를 스택(stack)에 푸시(push)합니다.

리스트 또는 튜플과 같이 알려진 유형의 이터러블을 언패킹하기 위한 단축 경로(shortcuts)를 추가할 수 있습니다.

현재 구현은 SourceForge Patch tracker [SFPATCH]에서 확인할 수 있으며, 최소한의 테스트 케이스를 포함하고 있습니다.

## 수용 (Acceptance)
`python-3000` 리스트에서 짧은 논의 끝에, PEP는 현재 형태로 Guido에 의해 수용되었습니다. 논의되었던 가능한 변경 사항들은 다음과 같습니다:
*   starred 표현식을 `exprlist`의 마지막 항목으로만 허용: 이렇게 하면 언패킹 코드가 약간 단순화되고 starred 표현식에 이터레이터를 할당할 수 있었을 것입니다. 이 동작은 너무 예상 밖의 결과일 수 있어 거부되었습니다.
*   starred 대상에 소스 이터러블과 동일한 유형을 부여하는 것을 시도: 예를 들어, `a, *b = 'hello'`에서 `b`는 `'ello'` 문자열로 할당될 수 있습니다. 이는 좋아 보일 수 있지만, 모든 이터러블에 대해 일관되게 올바르게 구현하는 것은 불가능합니다.
*   starred 대상을 리스트 대신 튜플로 만들기: 이는 함수의 `*args`와 일관성이 있었겠지만, 결과에 대한 추가 처리를 더 어렵게 만들었을 것입니다.

## 참고 자료 (References)
*   [SFPATCH] https://bugs.python.org/issue1711529
*   https://mail.python.org/pipermail/python-3000/2007-May/007198.html

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.