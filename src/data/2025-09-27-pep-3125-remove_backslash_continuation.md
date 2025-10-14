---
title: "[Rejected] PEP 3125 - Remove Backslash Continuation"
excerpt: "Python Enhancement Proposal 3125: 'Remove Backslash Continuation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3125/
toc: true
toc_sticky: true
date: 2025-09-27 14:29:48+0900
last_modified_at: 2025-09-27 14:29:48+0900
published: true
---
> **원문 링크:** [PEP 3125 - Remove Backslash Continuation](https://peps.python.org/pep-3125/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Apr-2007


# PEP 3125 – Backslash Continuation 제거 제안

*   **작성자:** Jim J. Jewett
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2007년 4월 29일

## 거부 고지 (Rejection Notice)

이 PEP는 거부되었습니다. 해당 제안에 대한 충분한 지지가 없었고, 제거될 기능이 그다지 해롭지 않으며, 일부 사용 사례에서 구현이 더 어려워질 수 있다는 점이 고려되었습니다.

## 요약 (Abstract)

Python은 초기에 C 언어로부터 파싱(parsing) 방식을 계승했습니다. 이는 전반적으로 유용했지만, Python에 덜 유용한 일부 잔재가 남아있으며, 이를 제거해야 한다는 제안입니다. 이 PEP는 논리적 라인(logical line)의 연속을 나타내는 `\` (백슬래시) 문자를 제거할 것을 제안했습니다.

## 동기 (Motivation)

Python 3000(Python 3.x)의 목표 중 하나는 불필요하거나 중복되는 기능을 제거하여 언어를 단순화하는 것이었습니다. 현재 Python에서는 물리적인 다음 줄로 논리적인 줄이 계속됨을 나타내는 여러 방법이 있습니다.

다른 줄 연속 방법들은 제공하는 의미론(semantics)의 논리적 결과로 쉽게 설명될 수 있습니다. 반면 `\`는 단순히 기억해야 하는 이스케이프(escape) 문자입니다.

## 기존 줄 연속 방법 (Existing Line Continuation Methods)

Python에는 여러 가지 줄 연속 방법이 있습니다.

### 괄호 표현식 - `()`, `[]`, `{}` (Parenthetical Expression)

괄호 표현식(`()`, `[]`, `{}`)을 열면, 해당 표현식이 닫히기 전까지는 문장이 끝나지 않는다는 것을 사용자가 즉시 인지합니다.

**예시:**

```python
def fn(long_argname1,
       long_argname2):
    settings = {"background": "random noise",
                "volume": "barely audible"}
    restrictions = ["Warrantee void if used",
                    "Notice must be received by yesterday",
                    "Not responsible for sales pitch"]
```

표현식을 괄호로 묶는 것은 항상 가능하지만, 단순히 줄 바꿈을 위해 괄호가 필요한 경우에는 이상하게 보일 수도 있습니다.

```python
assert val > 4, (
    "val is too small")
```

### 삼중 따옴표 문자열 (Triple-Quoted Strings)

삼중 따옴표 문자열을 열면, 다음 문장이 시작되기 전에 문자열이 끝나야 한다는 것을 사용자가 인지합니다.

**예시:**

```python
banner_message = """
Satisfaction Guaranteed, or DOUBLE YOUR MONEY BACK!!!
some minor restrictions apply"""
```

### 일반적인 경우의 마지막 `\` (Terminal \ in the general case)

줄 끝에 오는 `\`는 (공백 문자 이후) 논리적 라인이 다음 물리적 라인으로 이어진다는 것을 나타냅니다. 이 방식과 관련된 특정 의미론은 없습니다. 이 형식은 필수는 아니지만, 어떤 경우에는 (특히 C 언어 배경을 가진 사람들에게) 더 보기 좋을 수 있습니다.

**예시:**

```python
assert val > 4, \
    "val is too small"
```

`\`는 반드시 줄의 마지막 문자여야 합니다. 편집기 설정에 따라 줄 끝에 공백이 추가되면 보이지 않는 변경으로 인해 프로그램의 의미가 바뀔 수 있으며, 다행히도 일반적으로는 런타임 버그(runtime bug)보다는 Syntax Error(문법 오류)를 발생시킵니다.

이 PEP는 이 중복되고 잠재적으로 혼란을 줄 수 있는 대안을 제거할 것을 제안했습니다.

### 문자열 내부의 마지막 `\` (Terminal \ within a string)

단일 따옴표 문자열 내부, 줄 끝에 오는 `\`는 논란의 여지가 있지만 유지할 가치가 있는 특별한 경우로 볼 수 있습니다.

**예시:**

```python
"abd\
def"  # 결과: 'abddef'
```

*   **찬성:** `\` 제거에 대한 많은 반대는 주로 리터럴(literal) 문자열 내에서의 제거에 대한 반대였으며, 여러 사람이 이 리터럴 문자열 사용법은 유지하고 싶지만 일반적인 경우의 제거에는 개의치 않는다고 밝혔습니다. 문자열 내에서 `\`를 이스케이프 문자로 사용하는 것은 잘 알려져 있습니다.
*   **반대:** 하지만 이 특정 용법은 이스케이프되는 문자(개행 문자)가 보이지 않고, 특별 처리가 해당 문자를 삭제하는 것이기 때문에 이상합니다. 그렇지만 `\(newline)`의 `\`는 여전히 다음 문자의 의미를 변경하는 이스케이프입니다.

## 대안 제안 (Alternate Proposals)

여러 사람이 줄의 끝을 표시하는 대체 방법을 제안했습니다. 대부분은 실제로는 상황을 단순화하지 않는다는 이유로 거부되었습니다.

유일한 예외는 모든 미완성 표현식이 줄 연속을 나타내도록 허용하는 것이었는데, 이는 괄호 규칙의 일반화라는 점에서 매력적이었습니다. 그러나 이는 공백의 양, 새로운 코드 블록(`suite`) 시작과의 혼동 가능성, 그리고 파싱 메커니즘의 복잡성 문제로 인해 Guido van Rossum에 의해 거부되었습니다.

Andrew Koenig는 더 나은 구현 전략을 제시하며, 다른 언어에서는 잘 작동했다고 언급했습니다. 개선된 제안은 (연산자 또는) 열린 괄호나 대괄호 뒤에 오는 공백에 개행 문자(newline character)를 포함할 수 있도록 하는 것이었습니다. 이는 낮은 어휘 수준에서 구현될 수 있습니다.

하지만 이 방법 역시 `x = y+ f(x)`와 같은 경우에 버그를 숨길 수 있다는 우려가 있었습니다. 안전성과 복잡성을 동시에 추가하는 방법으로, 연속되는 줄이 초기 줄보다 더 들여쓰기(indent)되도록 요구하는 방안도 논의되었습니다.

## 미해결 문제 (Open Issues)

*   `\`를 이용한 줄 연속을 문자열 내부에서도 제거해야 하는가?
*   줄 연속 마커를 `()`, `[]`, `{}`에서 연산자로 끝나는 줄까지 확장해야 하는가?
*   안전 조치로서, 연속되는 줄이 초기 줄보다 더 들여쓰기 되어야 하는가?

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.