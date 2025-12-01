---
title: "[Rejected] PEP 336 - Make None Callable"
excerpt: "Python Enhancement Proposal 336: 'Make None Callable'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/336/
toc: true
toc_sticky: true
date: 2025-09-26 18:45:11+0900
last_modified_at: 2025-09-26 18:45:11+0900
published: true
---
> **원문 링크:** [PEP 336 - Make None Callable](https://peps.python.org/pep-0336/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 28-Oct-2004

## PEP 336 – None을 호출 가능하게 만들기 (Make None Callable)

*   **저자** : Andrew McClelland <eternalsquire at comcast.net>
*   **상태** : Rejected (거부됨)
*   **유형** : Standards Track
*   **생성일** : 2004년 10월 28일

### 요약 (Abstract)

`None`은 호출 가능한(callable) 객체가 되어야 하며, 어떤 인자와 함께 호출되더라도 아무런 부작용 없이 `None`을 반환해야 합니다.

### BDFL의 선언 (BDFL Pronouncement)

이 PEP는 거부되었습니다. `None`이 호출될 때 오류를 발생시키는 것은 의도된 기능으로 간주됩니다. 이 제안은 명백함(obviousness), 명확성(clarity), 명시성(explicitness), 그리고 필요성(necessity)이라는 테스트를 통과하지 못했습니다. 제공된 Switch 예제는 훌륭하지만, 간단한 `lambda` 정의로 쉽게 처리할 수 있습니다. 2005년 6월 17일 python-dev 토론을 참조하십시오.

### 동기 (Motivation)

파이썬 언어의 최소주의(minimalistic) 함수형 프로그래밍 목표에 더욱 부합하는, 선택 가능한 동작(selectable actions)을 위한 프로그래밍 스타일을 가능하게 하기 위함입니다.

### 근거 (Rationale)

메서드 테이블(method tables)에서 `None`을 보편적인 "아무런 효과 없음(no effect)"으로 사용하여, 다음 두 가지 경우를 피할 수 있도록 합니다.
1.  호출하기 전에 메서드 테이블 항목이 `None`인지 확인하는 경우.
2.  테이블의 다른 함수들과 유사한 인수를 가진 로컬 "아무런 효과 없음" 메서드를 작성하는 경우.

의미론은 다음과 같이 효과적일 것입니다:

```python
class None:
    def __call__(self, *args):
        pass
```

### 사용 방법 (How To Use)

#### 이전 방식: `None`에 대한 함수 테이블 항목 확인

```python
class Select:
    def a(self, input):
        print 'a'
    def b(self, input):
        print 'b'
    def c(self, input):
        print 'c'
    def __call__(self, input):
        function = { 1 : self.a, 2 : self.b, 3 : self.c }.get(input, None)
        if function: # None인지 확인
            return function(input)
```

#### 이전 방식: 로컬 "아무런 효과 없음" 메서드 사용

```python
class Select:
    def a(self, input):
        print 'a'
    def b(self, input):
        print 'b'
    def c(self, input):
        print 'c'
    def nop(self, input): # 아무런 동작도 하지 않는 메서드 정의
        pass
    def __call__(self, input):
        return { 1 : self.a, 2 : self.b, 3 : self.c }.get(input, self.nop)(input)
```

#### 제안된 방식: `None`을 호출 가능하게 만든 후

```python
class Select:
    def a(self, input):
        print 'a'
    def b(self, input):
        print 'b'
    def c(self, input):
        print 'c'
    def __call__(self, input):
        # None이 호출 가능하므로, 바로 호출 가능
        return { 1 : self.a, 2 : self.b, 3 : self.c }.get(input, None)(input)
```

### 참고 자료 (References)

 Raymond Hettinger, Propose to reject PEP 336 – Make None Callable
    `https://mail.python.org/pipermail/python-dev/2005-June/054280.html`

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.