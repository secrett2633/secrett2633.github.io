---
title: "[Final] PEP 3112 - Bytes literals in Python 3000"
excerpt: "Python Enhancement Proposal 3112: 'Bytes literals in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3112/
toc: true
toc_sticky: true
date: 2025-09-27 14:21:44+0900
last_modified_at: 2025-09-27 14:21:44+0900
published: true
---
> **원문 링크:** [PEP 3112 - Bytes literals in Python 3000](https://peps.python.org/pep-3112/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 23-Feb-2007

## PEP 3112 – Python 3000의 바이트 리터럴 (Bytes literals in Python 3000)


### 초록 (Abstract)

이 PEP는 PEP 358에서 도입된 `bytes` 객체를 위한 리터럴 구문을 제안합니다. 이 제안의 목적은 ASCII 문자열 및 임의의 이진 데이터를 표현하는 편리한 방법을 제공하는 것입니다.

### 동기 (Motivation)

Python 3000에서 ASCII 문자열을 표현하는 기존 방법은 다음과 같습니다.

```python
bytes('Hello world', 'ascii')
'Hello world'.encode('ascii')
```

제안된 구문은 다음과 같습니다.

```python
b'Hello world'
```

Python 3000에서 8비트 이진 시퀀스를 표현하는 기존 방법은 다음과 같습니다.

```python
bytes([0x7f, 0x45, 0x4c, 0x46, 0x01, 0x01, 0x01, 0x00])
bytes('\x7fELF\x01\x01\x01\0', 'latin-1')
'7f454c4601010100'.decode('hex')
```

제안된 구문은 다음과 같습니다.

```python
b'\x7f\x45\x4c\x46\x01\x01\x01\x00'
b'\x7fELF\x01\x01\x01\0'
```

두 경우 모두 새로운 구문의 장점은 간결성(brevity), 약간의 효율성 향상, 그리고 런타임이 아닌 컴파일 타임에 인코딩 오류를 감지할 수 있다는 점입니다. `bytes` 객체의 문자열과 유사한 메서드를 사용할 때 간결성의 이점은 특히 두드러집니다.

```python
lines = bdata.split(bytes('\n', 'ascii')) # 기존 구문
lines = bdata.split(b'\n') # 제안된 구문
```

Python 2.x 코드를 Python 3000으로 변환할 때도 유용합니다.

```python
sok.send('EXIT\r\n') # Python 2.x
sok.send('EXIT\r\n'.encode('ascii')) # Python 3000 기존 구문
sok.send(b'EXIT\r\n') # 제안된 구문
```

### 문법 변경 (Grammar Changes)

제안된 구문은 기존 문자열 문법의 확장입니다.

새로운 `bytes` 리터럴을 포함한 문자열의 새로운 문법은 다음과 같습니다.

```
stringliteral: [stringprefix] (shortstring | longstring)
stringprefix: "b" | "r" | "br" | "B" | "R" | "BR" | "Br" | "bR"
shortstring: "'" shortstringitem* "'" | '"' shortstringitem* '"'
longstring: "'''" longstringitem* "'''" | '"""' longstringitem* '"""'
shortstringitem: shortstringchar | escapeseq
longstringitem: longstringchar | escapeseq
shortstringchar: <any source character except "\" or newline or the quote>
longstringchar: <any source character except "\">
escapeseq: "\" NL | "\\" | "\'" | '\"' | "\a" | "\b" | "\f" | "\n" | "\r" | "\t" | "\v" | "\ooo" | "\xhh" | "\uxxxx" | "\Uxxxxxxxx" | "\N{name}"
```

다음 추가 제약 조건은 `bytes` 리터럴 (`stringprefix`에 `b` 또는 `B`가 있는 `stringliteral` 토큰)에만 적용됩니다.

*   각 `shortstringchar` 또는 `longstringchar`는 소스 파일의 인코딩 선언과 관계없이 1에서 127 사이의 문자여야 합니다.
*   유니코드 관련 이스케이프 시퀀스 (`\uxxxx`, `\Uxxxxxxxx`, `\N{name}`)는 Python 2.x에서는 인식되지 않으며, Python 3000에서는 금지됩니다.

인접한 `bytes` 리터럴은 인접한 문자열 리터럴과 동일한 연결 규칙을 따릅니다. `bytes` 리터럴이 문자열 리터럴에 인접하면 오류가 발생합니다.

### 의미론 (Semantics)

`bytes` 리터럴이 평가될 때마다 새로운 `bytes` 객체가 생성됩니다. 새 객체의 바이트는 리터럴의 `shortstringitem` 또는 `longstringitem` 부분이 나타내는 바이트와 동일한 순서로 구성됩니다.

### 이론적 근거 (Rationale)

제안된 구문은 8비트 문자열과 관련된 대부분의 코드에 대해 Python 2.x에서 Python 3000으로의 더 깔끔한 마이그레이션 경로를 제공합니다. 문자열 리터럴의 이전 8비트 의미를 유지하는 것은 일반적으로 `b` 접두사를 추가하는 것만큼 간단합니다. 유일한 예외는 127보다 큰 바이트를 포함하는 Python 2.x 문자열로, 이는 이스케이프 시퀀스를 사용하여 다시 작성해야 합니다.

소스 파일을 한 인코딩에서 다른 인코딩으로 트랜스코딩하고, 인코딩 선언을 수정하면 프로그램의 의미가 유지되어야 합니다. Python 2.x의 비-유니코드 문자열은 이 원칙을 위반하지만, Python 3000의 `bytes` 리터럴은 그렇지 않아야 합니다.

접두사에 `b`가 있는 문자열 리터럴은 Python 2.5에서는 항상 구문 오류이므로, 이 구문은 `bytes` 타입과 함께 Python 2.6에서 도입될 수 있습니다.

`bytes` 리터럴은 리스트 표현식처럼 평가될 때마다 새로운 객체를 생성하며, 문자열 리터럴과는 다릅니다. 이는 `bytes` 리터럴이 리스트와 마찬가지로 가변(mutable)이기 때문에 필요합니다.

### 참조 구현 (Reference Implementation)

Thomas Wouters는 Py3K 브랜치, r53872에 구현을 체크인했습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.