---
title: "[Rejected] PEP 299 - Special __main__() function in modules"
excerpt: "Python Enhancement Proposal 299: 'Special __main__() function in modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/299/
toc: true
toc_sticky: true
date: 2025-09-26 18:07:00+0900
last_modified_at: 2025-09-26 18:07:00+0900
published: true
---
> **원문 링크:** [PEP 299 - Special __main__() function in modules](https://peps.python.org/pep-0299/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 12-Aug-2002

# PEP 299 – 모듈 내 특별한 `__main__()` 함수

*   **작성자 (Author):** Jeff Epler <jepler at unpythonic.net>
*   **상태 (Status):** 반려됨 (Rejected)
*   **유형 (Type):** 표준 트랙 (Standards Track)
*   **작성일 (Created):** 2002년 8월 12일
*   **Python 버전 (Python-Version):** 2.3
*   **게시 이력 (Post-History):** 2006년 3월 29일

## 요약 (Abstract)
많은 Python 모듈은 독립 실행형 스크립트(standalone scripts)로도 호출될 수 있도록 의도되었습니다. 이 PEP는 `__main__()`이라는 특별한 함수가 이 목적을 수행해야 한다고 제안합니다.

## 도입 배경 (Motivation)
모듈을 독립 실행형 스크립트로 호출하기 위한 하나의 간단하고 보편적인 관용구(idiom)가 있어야 합니다.

현재의 "반쯤 표준적인(semi-standard)" 관용구는 다음과 같습니다:

```python
if __name__ == '__main__':
    perform "standalone" functionality
```

이 방식은 C나 C++와 같은 언어의 프로그래머들에게는 불분명합니다. 또한, 모듈이 임포트(import)될 때 독립 실행형 함수를 호출하는 것을 허용하지 않습니다.

때때로 다음과 같은 변형된 형태가 사용되기도 합니다:

```python
if __name__ == '__main__':
    main_function()
```

하지만 이 함수에 대한 표준 이름이 존재하지 않으며, 인자(arguments)가 `sys.argv`에서 가져와지기 때문에 다른 모든 모듈이 보는 인자 리스트를 변경하지 않고는 특정 인자를 전달할 수 없습니다. (예를 들어, 두 개의 스레드가 서로 다른 인자 리스트로 다른 모듈의 독립 실행형 기능을 호출하려는 멀티스레드(threaded) Python 프로그램을 상상해 보세요.)

## 제안 (Proposal)
'메인 함수(main function)'의 표준 이름은 `__main__`이 되어야 합니다. 모듈이 다음과 같이 명령줄(command line)에서 호출될 때:

```bash
python mymodule.py
```

그러면 모듈은 해당 모듈의 끝에 다음 줄이 존재하는 것처럼 동작합니다 (단, `__sys` 속성은 스크립트의 다른 곳에서 사용되거나 존재한다고 가정할 수 없습니다):

```python
if globals().has_key("__main__"):
    import sys as __sys
    __sys.exit(__main__(__sys.argv))
```

다른 모듈은 다음과 같이 실행할 수 있습니다:

```python
import mymodule
mymodule.__main__(['mymodule', ...])
```

`__main__`의 사용을 제한할 수 있는 스레드 안전성(thread-safety) 문제나 다른 문제들(예: 상호 배타적인 GUI 모듈 사용, 하드웨어 장치와 같이 공유할 수 없는 자원, `sys.stdin` / `stdout` 재할당 등)을 문서화하는 것은 `mymodule`의 책임입니다.

## 구현 (Implementation)
`modules/main.c` 파일의 385행 근처 블록( `PyRun_AnyFileExFlags` 호출 후)이 변경되어 위의 코드(또는 그에 상응하는 C 코드)가 실행되도록 할 것입니다.

## 해결되지 않은 문제들 (Open Issues)
*   `__main__`의 반환 값은 종료 값(exit value)으로 처리되어야 하는가?
    *   **예.** 많은 `__main__` 함수는 자연스럽게 `None`을 반환하며, `sys.exit`는 이를 "성공" 반환 코드로 변환합니다. 숫자 결과를 반환하는 경우, 이는 `sys.exit()`의 인자나 C의 `main()` 함수의 반환 값과 동일하게 동작합니다.
*   `__main__`으로 전달되는 인자 리스트에 `argv[0]`이 포함되어야 하는가, 아니면 "실제" 인자인 `argv[1:]`만 포함되어야 하는가?
    *   `sys.argv`와의 대칭성 및 새로운 표준 관용구로의 쉬운 전환을 위해 `argv[0]`이 포함됩니다.

## 반려 (Rejection)
`python-dev`에서의 짧은 논의에서 두 가지 주요 하위 호환성(backwards compatibility) 문제가 제기되었으며, 귀도(Guido van Rossum)는 어쨌든 이 아이디어를 좋아하지 않는다고 말했습니다. 그는 "문서, 사용자 습관 등의 변경 가치가 없으며, 특별히 고장난 것도 없다"고 언급했습니다.

## 참고 자료 (References)
 Georg Brandl, “What about PEP 299”, [https://mail.python.org/pipermail/python-dev/2006-March/062951.html](https://mail.python.org/pipermail/python-dev/2006-March/062951.html)

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.