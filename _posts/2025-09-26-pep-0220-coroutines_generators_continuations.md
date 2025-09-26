---
title: "[Rejected] PEP 220 - Coroutines, Generators, Continuations"
excerpt: "Python Enhancement Proposal 220: 'Coroutines, Generators, Continuations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/220/
toc: true
toc_sticky: true
date: 2025-09-26 16:38:41+0900
last_modified_at: 2025-09-26 16:38:41+0900
published: true
---
> **원문 링크:** [PEP 220 - Coroutines, Generators, Continuations](https://peps.python.org/pep-0220/)
>
> **상태:** Rejected | **유형:** Informational | **작성일:** 14-Aug-2000

## PEP 220 – 코루틴, 제너레이터, 연속 (Continuations) 번역 및 요약

### 문서 상태: 거부됨 (Rejected)
**주의:** 이 PEP는 거부되었습니다.

---

### 개요 (Abstract)

이 PEP 220은 "Stackless PEP"에서 설명된 변경 사항들이 왜 필요한지를 보여줍니다. 현재 저수준의 `continuations` 모듈이 존재하며, 이를 통해 코루틴 (coroutines), 제너레이터 (generators) 그리고 "그린" 스레드 (green threads)를 구현할 수 있습니다. 코루틴과 제너레이터를 쉽게 생성할 수 있도록 돕는 더 고수준의 모듈이 필요하며 (현재 개발 중입니다), 이 PEP의 주요 목표는 코루틴, 제너레이터, 그리고 그린 스레드가 일반적인 프로그래밍 문제를 어떻게 단순화할 수 있는지를 보여주는 데 있습니다.

### 핵심 개념 설명

이 PEP는 Python의 비동기 및 동시성 프로그래밍의 기초가 되는 중요한 개념들을 다루고 있습니다. 비록 이 PEP 자체는 거부되었지만, 여기서 논의된 아이디어들은 이후 Python의 `async/await` 문법과 `concurrent.futures` 모듈 등 다른 제안과 구현에 영향을 미쳤습니다.

1.  **Coroutines (코루틴):**
    코루틴은 함수 실행을 일시 중지하고 나중에 중단했던 지점부터 다시 시작할 수 있는 서브루틴의 한 형태입니다. 일반적인 함수는 한 번 실행되면 처음부터 끝까지 완료되지만, 코루틴은 여러 진입점과 종료점을 가질 수 있습니다. 이는 특히 비동기 프로그래밍에서 I/O 작업과 같이 시간이 오래 걸리는 작업을 기다리는 동안 CPU를 다른 작업에 넘겨줄 때 유용합니다. Python에서는 `async def`와 `await` 키워드를 통해 코루틴을 지원합니다.

2.  **Generators (제너레이터):**
    제너레이터는 이터레이터 (iterator)를 생성하는 특별한 종류의 함수입니다. 일반 함수가 `return`을 사용하여 단일 값을 반환하는 것과 달리, 제너레이터 함수는 `yield` 키워드를 사용하여 일련의 값을 "생성"하고 각 `yield` 문에서 실행을 일시 중단할 수 있습니다. 다음 값이 요청될 때 제너레이터는 중단되었던 지점부터 실행을 다시 시작합니다. 이는 특히 메모리 효율적으로 대량의 데이터를 처리할 때 유용하며, 코루틴의 초기 형태로도 활용되었습니다.

3.  **Continuations (연속):**
    연속은 프로그램의 실행 상태를 캡처하고 저장하여 나중에 해당 지점부터 실행을 재개할 수 있도록 하는 컴퓨터 과학 개념입니다. 이는 프로그램의 "나머지" 실행을 나타냅니다. 이 PEP에서는 저수준의 `continuations` 모듈을 언급하며, 이를 통해 코루틴이나 그린 스레드를 구현할 수 있음을 시사합니다. 연속은 복잡한 제어 흐름을 구현하는 데 사용될 수 있지만, 이해하고 사용하기 어렵다는 단점이 있어 Python의 고수준 추상화에서는 직접적으로 노출되지 않는 경향이 있습니다.

4.  **"Green" Threads (그린 스레드):**
    그린 스레드는 운영 체제가 아닌 사용자 레벨에서 관리되는 스레드입니다. 이는 언어 런타임 또는 가상 머신 (VM)에 의해 스케줄링되고 관리됩니다. 운영 체제 스레드에 비해 컨텍스트 스위칭 오버헤드가 적고 더 가볍기 때문에 수많은 동시 작업을 생성할 때 효율적일 수 있습니다. Python의 초기 동시성 라이브러리 중 일부 (예: `eventlet`, `gevent`)는 그린 스레드와 유사한 개념을 사용하여 비동기 I/O를 처리했습니다.

### PEP 220의 의의 (비록 거부되었지만)

PEP 220은 Stackless Python 프로젝트의 아이디어를 Python 언어의 주류로 가져오려는 시도 중 하나였습니다. Stackless Python은 스택리스 (stackless) 코루틴을 통해 수천 개의 작은 작업을 효율적으로 관리할 수 있도록 설계된 Python 인터프리터의 변형입니다.

이 PEP가 거부된 주요 이유는 Python 언어의 복잡성을 증가시키고, 당시에는 더 간단하고 직관적인 `async/await`와 같은 고수준의 비동기 패러다임이 아직 충분히 무르익지 않았기 때문일 수 있습니다. 그러나 이 PEP에서 다루는 코루틴, 제너레이터, 그리고 그린 스레드와 같은 개념들은 Python의 동시성 및 비동기 프로그래밍 발전에 중요한 논의의 시작점이 되었으며, 이후 Python 3.4에서 `yield from`, Python 3.5에서 `async/await` 문법이 도입되는 데 간접적인 영향을 미쳤습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.