---
title: "[Withdrawn] PEP 298 - The Locked Buffer Interface"
excerpt: "Python Enhancement Proposal 298: 'The Locked Buffer Interface'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/298/
toc: true
toc_sticky: true
date: 2025-09-26 18:06:42+0900
last_modified_at: 2025-09-26 18:06:42+0900
published: true
---
> **원문 링크:** [PEP 298 - The Locked Buffer Interface](https://peps.python.org/pep-0298/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 26-Jul-2002

PEP 298 – 잠금된 버퍼 인터페이스

## 개요
이 문서는 Python 2.3 버전에서 제안된 '잠금된 버퍼 인터페이스(Locked Buffer Interface)'에 대한 PEP(Python Enhancement Proposal)를 한국어 사용자가 이해하기 쉽도록 번역 및 정리한 것입니다.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕습니다.

---

### PEP 298 – 잠금된 버퍼 인터페이스

*   **작성자:** Thomas Heller
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2002년 7월 26일
*   **Python 버전:** 2.3

### 요약 (Abstract)

이 PEP는 '버퍼 인터페이스(buffer interface)'의 확장으로 '잠금된 버퍼 인터페이스'를 제안합니다. 이 인터페이스는 Python 2.2 이하 버전에서 정의된 '기존' 버퍼 인터페이스의 단점을 보완하며, 다음 의미를 가집니다.

*   검색된 포인터의 생명 주기는 클라이언트가 명확하게 정의하고 제어합니다.
*   버퍼 크기는 `size_t` 데이터 타입으로 반환되어, `sizeof(int) != sizeof(void *)`인 플랫폼에서도 대용량 버퍼에 접근할 수 있습니다.
    *   (Guido의 의견: 이 두 번째 내용은 '기존' 버퍼 인터페이스에도 새로운 플래그 비트를 도입하여 변경할 수 있는 부분인 것 같습니다.)

### 명세 (Specification)

잠금된 버퍼 인터페이스는 이 인터페이스를 구현하기로 선택한 모든 Python 객체의 내부 메모리 블록에 대한 크기와 포인터를 반환하는 새로운 함수들을 노출합니다.

객체로부터 버퍼를 검색하는 것은 해당 객체를 잠금(locked) 상태로 만듭니다. 이 상태에서는 버퍼가 해제되거나(freed), 크기가 변경되거나(resized), 재할당(reallocated)될 수 없습니다. 버퍼가 더 이상 사용되지 않으면, 잠금된 버퍼 인터페이스의 다른 함수를 호출하여 버퍼를 해제(release)함으로써 객체를 다시 잠금 해제(unlocked)해야 합니다.

만약 객체가 생명 주기 동안 버퍼의 크기를 변경하거나 재할당하지 않는다면, 이 해제 함수는 `NULL`일 수 있습니다. 이 함수를 호출하지 않으면(만약 `NULL`이 아니라면) 프로그래밍 오류이며 예기치 않은 결과를 초래할 수 있습니다.

잠금된 버퍼 인터페이스는 기존 버퍼 인터페이스에 있던 메모리 세그먼트 모델을 생략하며, 단일 메모리 블록만 노출할 수 있습니다. 이 메모리 블록은 전역 인터프리터 록(GIL, Global Interpreter Lock)을 보유하지 않고도 접근할 수 있습니다.

### 구현 (Implementation)

`Include/object.h`에 새로운 플래그를 정의합니다.

```c
/* PyBufferProcs contains bf_acquirelockedreadbuffer, bf_acquirelockedwritebuffer, and bf_releaselockedbuffer */
#define Py_TPFLAGS_HAVE_LOCKEDBUFFER (1L<<15)
```

이 플래그는 `Py_TPFLAGS_DEFAULT`에 포함됩니다.

```c
#define Py_TPFLAGS_DEFAULT ( \
.... Py_TPFLAGS_HAVE_LOCKEDBUFFER | \
.... 0)
```

`Include/object.h`의 `PyBufferProcs` 구조체를 새로운 필드로 확장합니다.

```c
typedef size_t (*acquirelockedreadbufferproc)(PyObject *, const void **);
typedef size_t (*acquirelockedwritebufferproc)(PyObject *, void **);
typedef void (*releaselockedbufferproc)(PyObject *);
typedef struct {
    getreadbufferproc bf_getreadbuffer;
    getwritebufferproc bf_getwritebuffer;
    getsegcountproc bf_getsegcount;
    getcharbufferproc bf_getcharbuffer;
    /* locked buffer interface functions */
    acquirelockedreadbufferproc bf_acquirelockedreadbuffer;
    acquirelockedwritebufferproc bf_acquirelockedwritebuffer;
    releaselockedbufferproc bf_releaselockedbuffer;
} PyBufferProcs;
```

객체의 타입에서 `Py_TPFLAGS_HAVE_LOCKEDBUFFER` 플래그가 설정되어 있으면 새로운 필드가 존재합니다. `Py_TPFLAGS_HAVE_LOCKEDBUFFER` 플래그는 `Py_TPFLAGS_HAVE_GETCHARBUFFER` 플래그를 의미합니다.

`acquirelockedreadbufferproc` 및 `acquirelockedwritebufferproc` 함수는 성공 시 메모리 블록의 크기를 바이트 단위로 반환하고, 전달된 `void *` 포인터를 채웁니다. 이 함수들이 실패하면(오류가 발생하거나 메모리 블록이 노출되지 않는 경우) `void *` 포인터를 `NULL`로 설정하고 예외를 발생시켜야 합니다. 이 경우 반환 값은 정의되지 않으며 사용해서는 안 됩니다.

이 함수들이 성공적으로 호출되면, 결국 원래 객체를 인자로 제공하여 `releaselockedbufferproc` 호출을 통해 버퍼를 해제해야 합니다. `releaselockedbufferproc`는 실패할 수 없습니다. 내부 잠금 카운터를 실제로 유지하는 객체의 경우, `releaselockedbufferproc` 함수가 너무 자주 호출되어 음수 잠금 카운터가 되면 치명적인 오류가 됩니다.

'기존' 버퍼 인터페이스와 유사하게, 이러한 함수들 중 어떤 것도 `NULL`로 설정될 수 있지만, `acquireread/writelockedbufferproc` 함수가 구현된 경우 `releaselockedbufferproc` 함수도 구현하는 것이 강력히 권장됩니다(비록 아무것도 하지 않더라도). 이는 확장 작성자가 `NULL` 값을 확인하고 호출하지 않는 것을 방지하기 위함입니다.

이 함수들은 직접 호출되지 않고, `Include/abstract.h`에 선언된 편의 함수(convenience functions)를 통해 호출됩니다.

```c
int PyObject_AcquireLockedReadBuffer(PyObject *obj, const void **buffer, size_t *buffer_len);
int PyObject_AcquireLockedWriteBuffer(PyObject *obj, void **buffer, size_t *buffer_len);
void PyObject_ReleaseLockedBuffer(PyObject *obj);
```

앞의 두 함수는 성공 시 0을 반환하고, `buffer`를 메모리 위치로, `buffer_len`을 메모리 블록의 길이를 바이트 단위로 설정합니다. 실패하거나 `obj`에 의해 잠금된 버퍼 인터페이스가 구현되지 않은 경우 -1을 반환하고 예외를 설정합니다. 마지막 함수는 아무것도 반환하지 않으며 실패할 수 없습니다.

### 하위 호환성 (Backward Compatibility)

이 제안이 구현되면 `PyBufferProcs` 구조체의 크기가 변경되지만, 타입의 `tp_flags` 슬롯을 사용하여 추가 필드가 있는지 여부를 확인할 수 있습니다.

### 참조 구현 (Reference Implementation)

구현은 SourceForge 패치 관리자에 `https://bugs.python.org/issue652857`로 업로드되었습니다.

### 추가 설명/의견 (Additional Notes/Comments)

Python `string`, `unicode string`, `mmap` 객체 및 `array` 객체는 잠금된 버퍼 인터페이스를 노출할 것입니다.

`mmap` 및 `array` 객체는 버퍼가 활성화된 동안 실제로 잠금 상태에 들어가지만, `string` 및 `unicode` 객체에는 필요하지 않습니다. 잠금된 `array` 객체의 크기 조정은 허용되지 않으며 예외를 발생시킵니다. 잠금된 `mmap` 객체를 닫는 것이 오류인지 아니면 잠금 카운터가 0에 도달할 때까지 연기될지는 구현 세부 사항입니다.

**Guido의 권장 사항:**

"그러나 대부분의 내장 타입(예: `string`, `bytes`)이 해제 기능을 구현하지 않는다면, 확장이 버퍼를 해제하는 것을 잊어도 작동하는 것처럼 보이는 것이 너무 쉽다는 점이 여전히 매우 우려됩니다. 저는 적어도 일부 내장 타입이 카운터를 사용하여 `acquire/release` 기능을 구현하고, 객체가 삭제될 때 카운터가 0인지 어서트(assert)할 것을 권장합니다. 어서트가 실패하면 누군가 객체를 해제하지 않고 객체에 대한 참조를 `DECREF`한 것입니다. (규칙은 객체를 `acquire`한 동안 객체에 대한 참조를 소유해야 한다는 것입니다.)

문자열의 경우, 문자열 객체가 카운터를 저장하기 위해 4바이트 더 커져야 하므로 비실용적일 수 있습니다. 하지만 새로운 `bytes` 객체 (PEP 296)는 카운터를 쉽게 구현할 수 있고, `array` 객체도 마찬가지입니다. 그렇게 하면 프로토콜의 올바른 사용을 테스트할 기회가 충분할 것입니다."

### 커뮤니티 피드백 (Community Feedback)

Greg Ewing은 잠금된 버퍼 인터페이스가 전혀 필요하지 않다고 의심하며, 포인터를 사용할 때마다 다시 가져오면 일반 버퍼 인터페이스를 사용할 수 있다고 생각했습니다. 하지만 `Py_DECREF()`와 같이 무해해 보이는 Python API 호출조차 임의의 Python 코드를 실행할 수 있기 때문에 이는 위험해 보입니다.

이 제안의 첫 번째 버전에는 해제 함수가 없었지만, `mmap` 및 `array` 객체는 `mmap` 객체가 잠기지 않으면 언제든지 닫힐 수 있고 `array` 객체가 버퍼의 크기를 변경하거나 재할당할 수 있기 때문에 이를 구현할 수 없었을 것이라는 점이 밝혀졌습니다.

이 PEP는 작성자 외에는 아무도 필요로 하지 않기 때문에 아마도 거부될 것입니다.

### 참고 자료 (References)

*   The buffer interface `https://mail.python.org/pipermail/python-dev/2000-October/009974.html`

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.