---
title: "[Final] PEP 223 - Change the Meaning of '\\x' Escapes"
excerpt: "Python Enhancement Proposal 223: 'Change the Meaning of '\\x' Escapes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/223/
toc: true
toc_sticky: true
date: 2025-09-26 16:42:30+0900
last_modified_at: 2025-09-26 16:42:30+0900
published: true
---
> **원문 링크:** [PEP 223 - Change the Meaning of\xEscapes](https://peps.python.org/pep-0223/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 20-Aug-2000


PEP 223은 Python 2.0 버전에서 `\x` 이스케이프 시퀀스의 의미를 변경하는 제안입니다. 이 제안의 주요 목표는 8비트 및 유니코드(Unicode) 문자열 모두에서 `\x` 이스케이프가 항상 뒤따르는 정확히 두 개의 16진수(hex digit)를 소비하도록 하는 것입니다.

### **개요 (Abstract)**
이 PEP는 `\x` 이스케이프를 8비트 및 유니코드 문자열 모두에서 뒤따르는 정확히 두 개의 16진수를 소비하도록 변경할 것을 제안합니다. 이는 원래 설계상의 결함을 수정하고, 모든 종류의 문자열에서 더 명확한 표현, 더 깔끔한 유니코드 처리, Perl 정규 표현식과의 더 나은 호환성을 제공하며, 기존 코드에 대한 위험을 최소화한다고 보고 있습니다.

### **문법 (Syntax)**
`\x` 이스케이프의 문법은 모든 비-raw(non-raw) 문자열에서 `\xhh`가 됩니다. 여기서 `h`는 16진수(0-9, a-f, A-F)를 의미합니다.

이전 버전(1.5.2)에서는 `\xhh...`로 명확하게 지정되지 않아 "두 개 이상"의 16진수를 의미하는 것으로 해석될 수 있었고, 한 자리 숫자 형태도 허용되었습니다. 그러나 2.0부터는 `\x` 뒤에 최소 두 개의 16진수가 오지 않으면 컴파일 시간 오류(compile-time error)가 발생합니다. 두 개 이상의 16진수가 오더라도 처음 두 개만 소비됩니다.

### **의미 (Semantics)**
*   **8비트 비-raw 문자열 (8-bit non-raw string):** `\xij`는 `chr(int(ij, 16))`에 해당하는 문자로 확장됩니다. 이는 Python 1.6 이하와 동일합니다.
*   **유니코드 문자열 (Unicode string):** `\xij`는 `\u00ij`와 동일하게 작동하며, 유니코드 공간의 초기 세그먼트에서 명확한 Latin-1 문자로 확장됩니다.
*   `\x` 뒤에 최소 두 개의 16진수가 오지 않으면 8비트 문자열에서는 `ValueError`, 유니코드 문자열에서는 `UnicodeError` ( `ValueError`의 서브클래스)가 발생합니다.

### **예시 (Example)**
**Python 1.5.2:**
```python
>>> "\x123465" # "\x65"와 동일
'e'
>>> "\x65"
'e'
>>> "\x1"
'\001'
>>> "\x\x"
'\\x\\x'
```
**Python 2.0:**
```python
>>> "\x123465" # \x12 -> \022, "3456"는 그대로
'\0223456'
>>> "\x65"
'e'
>>> "\x1"
# ValueError 발생
>>> "\x\x"
# ValueError 발생
```


### **배경 및 근거 (History and Rationale)**
`\x` 이스케이프는 C 언어에서 가변 폭 문자 인코딩을 지정하는 방법으로 도입되었습니다. 그러나 Python은 플랫폼 독립성을 지향하기 때문에, Python 1.6까지는 `\x` 뒤의 처음 두 16진수를 제외한 나머지는 묵묵히 무시되었습니다. 이는 `\x` 이스케이프가 단일 바이트를 16진수 표기법으로 지정하는 용도로만 사용되었음을 의미합니다.

유니코드 문자열이 Python에 도입되면서 `\x`는 유니코드 문자열에서 마지막 네 개의 16진수를 제외한 나머지를 무시하도록 일반화되었습니다. 이는 새로운 정규 표현식(Regular Expression) 엔진에 기술적인 어려움을 야기했습니다. 8비트와 유니코드 패턴 및 문자열을 직관적인 방식으로 혼합할 수 있도록 하려는 SRE(정규 표현식 엔진)는 `r"\x123456"`과 같은 패턴이 8비트 문자 `\x56`을 의미하는지, 유니코드 문자 `\u3456`을 의미하는지 추측할 방법이 없었습니다.

이러한 복잡성을 해결하기 위해, `\x` 이스케이프를 더 단순하게 만드는 방향으로 제안이 이루어졌습니다. 유니코드 문자열에서 `\xijkl`와 같이 4자리로 일반화하는 것은 `\uijkl`와 동일한 의미를 가졌기 때문에 중복되었습니다. 16진수 표기법을 통해 유니코드 문자를 지정하는 명확한 방법은 하나만 있는 것이 더 "Pythonic"하다고 보았습니다.

### **개발 및 논의 (Development and Discussion)**
이 제안은 Guido van Rossum, Fredrik Lundh, Tim Peters 간의 이메일 논의를 통해 개발되었으며, Python-Dev 메일링 리스트에서 "Go x yourself"라는 제목으로 논의되었습니다. 이에 대한 반응은 압도적으로 긍정적이었고, 반대 의견은 제기되지 않았습니다.

### **하위 호환성 (Backward Compatibility)**
`\x` 이스케이프의 의미 변경은 기존 코드를 손상시킬 위험이 있지만, 아직까지 호환성 문제가 발견된 사례는 없습니다. 위험은 최소한으로 평가되었습니다. Python 표준 라이브러리와 Tim Peters의 시스템에 있는 다양한 Python 패키지를 확인한 결과, 2개 미만이거나 2개보다 많은 16진수를 사용하는 `\x` 이스케이프의 인스턴스는 발견되지 않았습니다.

### **다른 도구에 미치는 영향 (Effects on Other Tools)**
영향은 없을 것으로 예상됩니다. 대부분의 잠재적 파싱(parsing) 도구는 백슬래시(backslash)가 있을 때 다음 문자를 삼키는 방식 이상으로 Python 문자열의 내부 구조에 대해 걱정하지 않는다고 합니다. `python-mode.el`, `tokenize.py`, `pyclbr.py`, IDLE 구문 강조(syntax coloring) 서브시스템 등을 확인한 결과, 변경이 필요 없을 것으로 판단되었습니다.

### **참조 구현 (Reference Implementation)**
코드 변경은 매우 간단하여 별도의 패치는 생성되지 않았습니다. Fredrik Lundh가 코드를 작성했으며, Python 2.0b1 릴리스 전에 변경 사항을 커밋(commit)할 예정이었습니다.

### **BDFL 성명 (BDFL Pronouncements)**
`SyntaxError`가 아닌 `ValueError`를 발생시키는 것이 맞다고 Guido van Rossum(BDFL)이 확인했습니다. "리터럴 해석(literal interpretation) 문제는 전통적으로 구문 오류(syntax error)보다는 '런타임(runtime)' 예외(exception)를 발생시킵니다."

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.