---
title: "[Rejected] PEP 259 - Omit printing newline after newline"
excerpt: "Python Enhancement Proposal 259: 'Omit printing newline after newline'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/259/
toc: true
toc_sticky: true
date: 2025-09-26 17:41:02+0900
last_modified_at: 2025-09-26 17:41:02+0900
published: true
---
> **원문 링크:** [PEP 259 - Omit printing newline after newline](https://peps.python.org/pep-0259/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Jun-2001

## PEP 259 – 개행 문자 뒤에 개행 문자 출력 생략 (Omit printing newline after newline)

*   **작성자:** Guido van Rossum
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **작성일:** 2001년 6월 11일
*   **Python 버전:** 2.2

### 개요 (Abstract)

현재 Python의 `print` 문은 뒤에 콤마(`,`)를 사용하지 않는 한 항상 개행 문자(newline)를 추가합니다. 이는 이미 개행 문자로 끝나는 데이터를 출력하려 할 때, 특별한 조치를 취하지 않으면 두 개의 개행 문자가 연속해서 출력되는 결과를 초래합니다.

이 PEP는 데이터에서 비롯된 개행 문자 뒤에 `print` 문이 자체적으로 추가하는 개행 문자를 건너뛸 것을 제안했습니다. 이를 위해 기존의 `softspace` 변수에 새로운 의미를 부여하여, 음수 값일 경우 "마지막으로 작성된 데이터가 개행 문자로 끝났으므로 공백이나 개행 문자가 필요 없다"는 것을 나타내도록 했습니다.

### 문제점 (Problem)

파일에서 라인을 읽어와 단순히 반복문으로 출력할 때, 특별한 처리를 하지 않으면 이중 간격(double-spacing)이 발생합니다.

예시:
```python
>>> for line in open("/etc/passwd").readlines():
... print line
...
root:x:0:0:root:/root:/bin/bash

bin:x:1:1:bin:/bin:

daemon:x:2:2:daemon:/sbin:

(etc.)
```

이러한 문제를 해결하는 쉬운 방법들이 있지만, 종종 테스트 중에 발견되어 추가적인 수정-테스트 과정을 거쳐야 합니다. 또한, 수정된 코드는 원본보다 보기에 좋지 않고 유지보수가 더 어렵습니다.

### 제안된 해결책 (Proposed Solution)

`ceval.c` 파일의 `PRINT_ITEM` opcode에서 문자열 객체를 출력할 때, 해당 문자열의 마지막 문자를 확인하는 로직이 이미 존재합니다. 현재는 마지막 문자가 공백(space)이 아닌 다른 공백 문자(whitespace character)일 경우 `softspace` 플래그가 0으로 재설정됩니다. 이는 첫 번째 항목이 개행 문자, 탭 등으로 끝나는 문자열인 경우 두 항목 사이에 공백이 추가되는 것을 막습니다(단, 공백으로 끝나는 경우는 제외). 그 외의 경우에는 `softspace` 플래그가 1로 설정됩니다.

이 제안은 이 테스트를 약간 변경하여 `softspace`가 다음과 같이 설정되도록 했습니다.

*   **-1:** 마지막으로 작성된 객체가 개행 문자로 끝나는 문자열인 경우
*   **0:** 마지막으로 작성된 객체가 공백(space)도 개행 문자(newline)도 아닌 다른 공백 문자로 끝나는 문자열인 경우
*   **1:** 그 외 모든 경우 (마지막으로 작성된 객체가 빈 문자열이거나 문자열이 아닌 경우 포함)

그런 다음, `PRINT_NEWLINE` opcode에서 `softspace` 값이 음수이면 개행 문자 출력을 생략하도록 했습니다. 어떤 경우든 `softspace` 플래그는 0으로 재설정됩니다.

### 범위 (Scope)

이 변경사항은 8비트 문자열 출력에만 영향을 미칩니다. 유니코드(Unicode)에는 영향을 미치지 않지만, 이는 유니코드 구현의 버그로 간주될 수 있습니다. 또한, 문자열 표현이 우연히 개행 문자로 끝나는 다른 객체들에는 영향을 주지 않습니다.

### 위험 (Risks)

이 변경은 일부 기존 코드를 깨뜨릴 수 있습니다. 예를 들어:

```python
print "Subject: PEP 259\n"
print message_body
```

현재 Python에서는 이 코드가 제목(Subject)과 메시지 본문(message body) 사이에 빈 줄을 생성합니다. 하지만 제안된 변경이 적용되면 본문이 제목 바로 아래에 시작됩니다. 어차피 이 코드는 견고하지 않으며, 다음과 같이 작성하는 것이 더 좋습니다.

```python
print "Subject: PEP 259"
print
print message_body
```

테스트 스위트에서는 `test_StringIO` (이 기능을 명시적으로 테스트하는)만 깨집니다.

### 구현 (Implementation)

현재 CVS 버전에 대한 패치는 `http://sourceforge.net/tracker/index.php?func=detail&aid=432183&group_id=5470&atid=305470`에서 확인할 수 있었습니다.

### 거부됨 (Rejected)

이 제안은 사용자 커뮤니티에 의해 만장일치로 거부되었으며, 따라서 Guido van Rossum은 이 아이디어를 더 이상 추진하지 않았습니다. 거부된 주요 이유로는 다음과 같은 주장들이 있었습니다.

*   수많은 CGI 스크립트를 망가뜨릴 가능성이 높다.
*   이미 충분히 많은 "마법(magic)"이 존재하며, `print` 문을 더 이상 건드리지 말아달라는 의견도 있었다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.