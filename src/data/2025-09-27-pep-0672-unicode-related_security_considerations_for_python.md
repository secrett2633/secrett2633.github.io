---
title: "[Active] PEP 672 - Unicode-related Security Considerations for Python"
excerpt: "Python Enhancement Proposal 672: 'Unicode-related Security Considerations for Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/672/
toc: true
toc_sticky: true
date: 2025-09-27 10:06:17+0900
last_modified_at: 2025-09-27 10:06:17+0900
published: true
---
> **원문 링크:** [PEP 672 - Unicode-related Security Considerations for Python](https://peps.python.org/pep-0672/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 01-Nov-2021


# PEP 672 – Python의 유니코드 관련 보안 고려사항

*   **작성자:** Petr Viktorin
*   **상태:** Active (활성)
*   **유형:** Informational (정보성)
*   **생성일:** 2021년 11월 1일

## 초록 (Abstract)
이 문서는 유니코드를 오용하여 실제 의도와 다르게 보이는 Python 프로그램을 작성할 수 있는 방법들을 설명합니다. 이 문서는 어떠한 권고나 해결책도 제시하지 않습니다.

## 서론 (Introduction)
유니코드는 모든 종류의 문자를 처리하기 위한 시스템이며, 전 세계 모든 언어의 문자를 사용할 수 있도록 합니다. Python 코드는 거의 모든 유효한 유니코드 문자로 구성될 수 있어 전 세계 프로그래머들이 자신을 표현할 수 있게 하지만, 동시에 독자가 혼동할 수 있는 코드를 작성할 가능성도 열어줍니다.

Python의 유니코드 관련 기능을 오용하여 실제 동작과 다르게 보이는 코드를 작성하는 것이 가능하며, 악의적인 사용자는 이를 이용하여 코드 리뷰어를 속여 악성 코드를 승인하도록 유도할 수 있습니다.

이러한 문제들은 언어에 과도한 제약을 가하지 않고서는 Python 자체에서 해결하기 어렵습니다. 대신 코드 편집기 및 리뷰 도구(예: diff 디스플레이), 프로젝트별 정책 강제, 그리고 개별 프로그래머의 인식을 높이는 방법을 통해 해결되어야 합니다. 이 문서는 의도적으로 어떠한 해결책이나 권고도 제공하지 않으며, 단지 염두에 두어야 할 사항들의 목록입니다.

## 감사 (Acknowledgement)
이 문서에 대한 조사는 Nicholas Boucher와 Ross Anderson이 보고한 CVE-2021-42574, Trojan Source Attacks에 의해 촉발되었으며, 이 공격은 다양한 프로그래밍 언어에서 양방향 오버라이드 문자(Bidirectional override characters)와 동형 이의어(homoglyphs)에 초점을 맞춥니다.

## 혼동을 야기하는 기능 (Confusing Features)
이 섹션에서는 놀랍거나 오용될 수 있는 유니코드 관련 기능들을 나열합니다.

### ASCII-only 고려사항 (ASCII-only Considerations)
ASCII는 유니코드의 부분집합으로, 가장 흔한 기호, 숫자, 라틴 문자 및 제어 문자로 구성됩니다. ASCII 문자 집합의 문제점은 일반적으로 잘 알려져 있지만, 비-ASCII 사례를 더 잘 이해하는 데 도움을 주기 위해 여기에 제시됩니다.

*   **혼동 문자 및 오타 (Confusables and Typos):** 일부 문자는 서로 비슷하게 생겼습니다. 예를 들어, `0`(숫자 0)과 `O`(대문자 O), `l`(소문자 L)과 `1`(숫자 1)은 육안으로 구분하기 어려울 수 있습니다. 프로그래머용 폰트는 이러한 혼동을 줄이도록 설계되었지만, `accessibi1ity_options`와 `accessibility_options`처럼 긴 식별자에서는 오타나 혼동 문자를 쉽게 놓칠 수 있습니다.

*   **제어 문자 (Control Characters):** Python은 일반적으로 `CR` (`\r`), `LF` (`\n`), 그리고 `CR-LF` (`\r\n`) 쌍을 줄바꿈 문자로 간주합니다. 그러나 일부 편집기는 줄바꿈 문자를 제대로 표시하지 않고 코드를 오해하게 만들 수 있습니다. `NUL` (`\0`) 문자는 Python에서 입력의 끝으로 처리될 수 있지만, 많은 편집기는 이를 건너뛰어 Python이 실행하지 않을 코드를 정상적인 파일의 일부로 표시할 수 있습니다.
    또한, `BS` (`\b`), `CR` (`\r`), `SUB` (`\x1A`, Windows에서 "End of text"), `ESC` (`\x1B`)와 같은 일부 제어 문자는 터미널에서 소스 코드를 나열할 때 다른 문자를 숨기거나 덮어쓰는 데 사용될 수 있습니다.

### 식별자 내 혼동 문자 (Confusable Characters in Identifiers)
Python은 식별자(예: 변수 이름)에 ASCII뿐만 아니라 라틴 문자부터 고대 이집트 상형문자까지 모든 스크립트의 문자를 허용합니다 (PEP 3131 참조). 다만, '문자 및 숫자'만 허용되므로 `γάτα`는 유효하지만, `🐱`는 유효하지 않습니다.

그러나 허용되는 문자 집합 내에는 많은 "혼동 문자"가 있습니다. 예를 들어, 라틴 `b`, 그리스 `β`(Beta), 키릴 문자 `в`(Ve)의 대문자 버전은 종종 `B`, `Β`, `В`처럼 동일하게 보일 수 있습니다. 이는 사람에게는 같아 보이지만 Python에게는 다른 식별자를 만들 수 있습니다. 예를 들어, 다음은 모두 다른 식별자입니다:
*   `scope` (라틴, ASCII-only)
*   `scоpe` (키릴 문자 `о` 포함)
*   `scοpe` (그리스 문자 `ο` 포함)
*   `ѕсоре` (모든 키릴 문자)

또한, 하와이어의 `ʻokina` 문자는 어퍼스트로피(`'`)처럼 보여 `ʻHelloʻ`가 문자열이 아닌 유효한 Python 식별자로 인식될 수 있습니다. 동아시아의 숫자 `十`(십)은 더하기 기호(`+`)처럼 보여 `十 = 10`이 완전한 Python 문장으로 해석될 수 있습니다.

### 혼동 가능한 숫자 (Confusable Digits)
Python의 숫자 리터럴은 ASCII 숫자 `0-9`만 사용합니다. 그러나 `int` 및 `float` 생성자나 `str.format` 메서드처럼 문자열에서 숫자를 변환할 때는 모든 십진수 숫자가 사용될 수 있습니다. 예를 들어, `߅`(NKO DIGIT FIVE) 또는 `௫`(TAMIL DIGIT FIVE)는 숫자 `5`처럼 작동합니다.

일부 스크립트에는 ASCII 숫자와 비슷하게 보이지만 다른 값을 가지는 숫자가 포함되어 있습니다. 예를 들어 `int('৪୨')`는 `42`를 반환합니다.

### 양방향 텍스트 (Bidirectional Text)
히브리어 또는 아랍어와 같은 일부 스크립트는 오른쪽에서 왼쪽으로 작성됩니다. 이러한 스크립트의 구문은 이러한 쓰기 시스템과 컴퓨터 표현에 익숙하지 않은 사람들에게는 놀라운 방식으로 주변 텍스트와 상호 작용할 수 있습니다.

예를 들어, `s = "א" * 100`는 100자 문자열을 변수 `s`에 할당하지만, 양방향 알고리즘에 따라 일반 텍스트로 표시될 때는 `s = "א"` 뒤에 주석이 오는 것처럼 보일 수 있습니다.

### 양방향 마크, 임베딩, 오버라이드 및 고립 (Bidirectional Marks, Embeddings, Overrides and Isolates)
유니코드는 기본 재정렬 규칙이 항상 의도한 텍스트 방향을 생성하지 않을 때 이를 변경하는 여러 방법을 제공합니다.

가장 기본적인 것은 방향성 마크(directional marks)로, 이들은 보이지 않지만 좌우 방향 문자와 같이 텍스트에 영향을 미칩니다. `s = "x‏" * 100` 예시에서, `x` 뒤에 오른쪽에서 왼쪽으로 가는 마크(`U+200F`)가 오면, Python은 200자 문자열을 할당하지만 일반 텍스트 규칙에 따라 `s = "x"` 뒤에 ASCII 전용 주석이 오는 것처럼 렌더링될 수 있습니다.

방향성 임베딩(directional embedding), 오버라이드(override) 및 고립(isolate) 문자도 보이지 않지만, 특정 종료 문자나 줄 끝까지의 모든 텍스트의 순서에 영향을 미칩니다. 이 문자들은 본질적으로 뒤따르는 텍스트의 임의 재정렬을 허용합니다. Python은 이들을 문자열과 주석 내에서만 허용하여 잠재력을 제한하지만(특히 Python 주석이 항상 줄 끝까지 확장된다는 사실과 결합될 때), 그렇다고 해서 무해하게 만들지는 않습니다.

### 식별자 정규화 (Normalizing identifiers)
Python 문자열은 유니코드 코드포인트의 모음이며 "문자"가 아닙니다. 유니코드는 종종 본질적으로 단일 "문자"를 인코딩하는 여러 가지 방법을 가집니다. 예를 들어, `Å`를 쓰는 여러 가지 방법이 있으며, 각각 Python 문자열로서 서로 다르게 취급됩니다.

`ﬁ`와 같은 합자(ligature)는 두 글자 `fi`와 같은 의미를 가지더라도 전용 유니코드 코드포인트를 가집니다. 또한, `n`, `𝐧`, `𝘯`, `ｎ`, `ⁿ`처럼 일반 문자에도 여러 변형이 있습니다. 유니코드는 이러한 변형들을 단일 형태로 정규화하는 알고리즘을 포함하고 있으며, Python 식별자는 정규화됩니다 (Python은 `NFKC` 정규화 형식을 사용). 예를 들어, `xⁿ`와 `xn`은 Python에서 동일한 식별자입니다.

그러나 이러한 정규화는 식별자에만 적용됩니다. `getattr`와 같이 문자열을 식별자로 취급하는 함수는 정규화를 수행하지 않습니다.
```python
>>> class Test:
...     def ﬁnalize(self): # 합자 ﬁ를 사용
...         print('OK')
...
>>> Test().finalize()
OK
>>> Test().ﬁnalize()
OK
>>> getattr(Test(), 'ﬁnalize') # 정규화되지 않은 문자열로 찾을 경우 실패
Traceback (most recent call last):
...
AttributeError: 'Test' object has no attribute 'ﬁnalize'
```
마찬가지로 `import ﬁnalization`은 정규화를 수행하여 `finalization.py`를 찾지만, `importlib.import_module("ﬁnalization")`은 정규화하지 않아 `ﬁnalization.py` 파일을 찾습니다. 일부 파일 시스템은 독립적으로 정규화 및/또는 대소문자 구분을 적용할 수 있습니다.

### 소스 인코딩 (Source Encoding)
Python 소스 파일의 인코딩은 Encoding declarations에 따라 파일의 처음 두 줄에 있는 특정 정규식에 의해 주어집니다. 이 메커니즘은 매우 자유로워서 난독화하기 쉽습니다.

이는 Python 특정 특수 목적 인코딩(`Text Encodings` 참조)과 결합되어 오용될 수 있습니다. 예를 들어, `encoding: unicode_escape`를 사용하면 따옴표나 중괄호와 같은 문자를 (f-)문자열 내에 숨길 수 있으며, 많은 도구(구문 강조기, 린터 등)는 이를 문자열의 일부로 간주합니다.
```python
# For writing Japanese, you don't need an editor that supports
# UTF-8 source encoding: unicode_escape sequences work just as well.
import os
message = '''
This is "Hello World" in Japanese: \u3053\u3093\u306b\u3061\u306f\u7f8e\u3057\u3044\u4e16\u754c
This runs `echo WHOA` in your shell: \u0027\u0027\u0027\u002c\u0028\u006f\u0073\u002e \u0073\u0079\u0073\u0074\u0065\u006d\u0028 \u0027\u0065\u0063\u0068\u006f\u0020\u0057\u0048\u004f\u0041\u0027 \u0029\u0029\u002c\u0027\u0027\u0027
'''
```
위 예시에서 초기 주석의 `encoding: unicode_escape`는 인코딩 선언입니다. `unicode_escape` 인코딩은 Python에게 `\u0027`를 단일 따옴표(문자열 시작/종료), `\u002c`를 쉼표(구두점) 등으로 처리하도록 지시합니다.

## 미해결 문제 (Open Issues)
다음과 같은 내용을 작성하고 게시해야 할 것입니다:
*   텍스트 편집기 및 코드 도구를 위한 권고사항
*   프로그래머 및 팀을 위한 권고사항
*   Python의 가능한 개선 사항

## 참고 문헌 (References)
*   [tr36] Unicode Technical Report #36: Unicode Security Considerations
*   [tr39] Unicode® Technical Standard #39: Unicode Security Mechanisms
*   [tr55] Unicode Technical Report #55: Unicode Source Code Handling

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.