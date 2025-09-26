---
title: "[Deferred] PEP 286 - Enhanced Argument Tuples"
excerpt: "Python Enhancement Proposal 286: 'Enhanced Argument Tuples'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/286/
toc: true
toc_sticky: true
date: 2025-09-26 17:58:16+0900
last_modified_at: 2025-09-26 17:58:16+0900
published: true
---
> **원문 링크:** [PEP 286 - Enhanced Argument Tuples](https://peps.python.org/pep-0286/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 03-Mar-2002



---

PEP 286: Enhanced Argument Tuples

## 개요
PEP 286은 `PyArg_ParseTuple` 함수가 인자 변환기(argument converter)를 통해 새로운 메모리를 생성할 때 발생하는 어려운 메모리 관리 문제를 해결하기 위해 제안되었습니다. 이 문제를 해결하기 위해 특수화된 인자 타입(argument type)의 도입이 제안되었습니다.

## PEP 연기 (PEP Deferral)
이 PEP에서 다루는 개념에 대한 추가 탐색은 현재 이 PEP의 목표를 추진하고 피드백을 수집 및 통합하며, 이를 효과적으로 수행할 충분한 시간을 가진 '챔피언(champion)'의 부재로 인해 연기되었습니다. 이 PEP의 해결은 C API 인터페이스 코드의 일부 측면을 생성하기 위한 전처리 단계 사용을 제안하는 PEP 426의 해결에도 영향을 받을 수 있습니다.

## 문제 설명 (Problem Description)
현재, 인자 튜플(argument tuples)은 함수 인자에 대한 참조를 유지하며, 이 인자들은 최소한 함수 호출이 실행되는 동안 인자 튜플이 존재하는 한 유지됩니다.

어떤 경우, 인자를 파싱하는 과정에서 새로운 메모리를 할당하게 되는데, 이 메모리는 호출자(caller)가 해제해야 합니다. 여기서 두 가지 문제가 발생합니다.

1.  **실패 시 메모리 해제 문제:** 파싱 실패 시, 애플리케이션은 어떤 메모리를 해제해야 하는지 알 수 없습니다. 대부분의 호출자는 자신이 해당 메모리를 해제할 책임이 있다는 사실조차 알지 못합니다. `N` 변환기(bug #416288)와 `es#` 변환기(bug #501716)가 이러한 사례에 해당합니다.
2.  **성공 시 불편한 메모리 관리:** 인자 파싱이 성공하더라도, 호출자가 메모리 해제를 담당하는 것은 여전히 불편합니다. 어떤 경우에는 불필요하게 비효율적입니다. 예를 들어, `es` 변환기는 올바른 내용을 가진 문자열 객체가 이미 존재함에도 불구하고 변환 결과를 메모리에 복사합니다.

## 제안된 해결책 (Proposed Solution)
새로운 타입인 'argument tuple'이 도입됩니다. 이 타입은 `tuple`에서 파생되며, `__dict__` 멤버(`tp_dictoffset -4` 위치)를 추가합니다. 이 타입의 인스턴스는 다음 속성들을 가질 수 있습니다.

*   `'failobjects'`: 성공 시 할당 해제되어야 하는 객체들의 리스트입니다.
*   `'okobjects'`: 인자 튜플이 해제될 때 해제될 객체들의 리스트입니다.

이 타입을 관리하기 위해 다음과 같은 함수들이 추가되며, `ceval.c` 및 `getargs.c`에서 적절하게 사용될 것입니다.

*   `PyArgTuple_New(int);`
*   `PyArgTuple_AddFailObject(PyObject*, PyObject*);`
*   `PyArgTuple_AddFailMemory(PyObject*, void*);`
*   `PyArgTuple_AddOkObject(PyObject*, PyObject*);`
*   `PyArgTuple_AddOkMemory(PyObject*, void*);`
*   `PyArgTuple_ClearFailed(PyObject*);`

인자 파싱이 실패하면, 모든 `failobjects`는 `Py_DECREF`를 통해 해제되고, 모든 `fail memory`는 `PyMem_Free`를 통해 해제됩니다. 파싱이 성공하면, `fail objects` 및 `fail memory`에 대한 참조는 아무것도 해제하지 않고 제거됩니다.

인자 튜플이 해제될 때, 모든 `ok objects`와 메모리가 해제됩니다.

이 함수들이 다른 타입의 객체와 함께 호출되면 경고가 발생하고 추가 조치는 취해지지 않습니다. 인자 튜플을 사용하지 않고 영향을 받는 변환기를 사용하는 것은 더 이상 사용되지 않습니다(deprecated).

## 영향을 받는 변환기 (Affected Converters)
다음 변환기들은 `fail memory` 및 `fail objects`를 추가할 것입니다.
*   `N`
*   `es`
*   `et`
*   `es#`
*   `et#` (변환기에 메모리가 전달되지 않는 경우)

## 새로운 변환기 (New Converters)
유니코드(Unicode) 변환을 단순화하기 위해, `e*` 변환기들은 `E*` 변환기들(예: `Es`, `Et`, `Es#`, `Et#`)로 복제됩니다. `E*` 변환기들의 사용법은 `e*` 변환기들과 동일하지만, 애플리케이션이 결과 메모리를 직접 관리할 필요가 없다는 점이 다릅니다. 이는 인자 튜플에 `Ok objects`를 등록함으로써 구현될 것입니다. `e*` 변환기들은 더 이상 사용되지 않습니다(deprecated).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.