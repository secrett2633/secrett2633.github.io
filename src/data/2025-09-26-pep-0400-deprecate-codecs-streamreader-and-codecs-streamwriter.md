---
title: "[Deferred] PEP 400 - Deprecate codecs.StreamReader and codecs.StreamWriter"
excerpt: "Python Enhancement Proposal 400: 'Deprecate codecs.StreamReader and codecs.StreamWriter'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/400/
toc: true
toc_sticky: true
date: 2025-09-26 21:24:56+0900
last_modified_at: 2025-09-26 21:24:56+0900
published: true
---
> **원문 링크:** [PEP 400 - Deprecate codecs.StreamReader and codecs.StreamWriter](https://peps.python.org/pep-0400/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 28-May-2011

PEP 400 – `codecs.StreamReader` 및 `codecs.StreamWriter` Deprecation 제안

## 개요
이 PEP는 `io.TextIOWrapper`와 `codecs.StreamReaderWriter`가 유사한 API를 제공하지만, `TextIOWrapper`가 더 많은 기능과 더 빠른 성능을 제공한다는 점에 주목합니다. 코드 중복은 버그를 두 번 수정해야 하거나 두 구현체 사이에 미묘한 차이를 발생시킬 수 있습니다.

`codecs` 모듈은 Python 2.0에 도입되었고, `io` 모듈은 Python 2.6 및 3.0에 도입되어 Python 2.7 및 3.1에서 C로 재구현되었습니다.

## PEP 연기 (Deferred)
이 PEP의 제안은 현재 이 목표를 추진하고 피드백을 수집 및 통합하며, 이를 효과적으로 수행할 충분한 시간을 가진 옹호자가 부족하여 논의가 연기되었습니다.

## 동기 (Motivation)
Python 3.0에서 I/O 모델이 업데이트되면서 `io.TextIOWrapper` 형태의 "인코딩을 아는 스트림(stream-with-known-encoding)" 개념이 도입되었습니다. 이 클래스는 Python 3에서 텍스트 기반 I/O의 성능에 중요하며, CPython에서 기본적으로 사용되는 최적화된 C 버전이 존재합니다. 버퍼링, 상태 저장형 코덱 (stateful codecs), 유니버설 개행 문자(universal newlines) 처리의 많은 엣지 케이스들이 Python 3.0 출시 이후 해결되었습니다.

이 새로운 인터페이스는 `codecs.StreamReader`, `codecs.StreamWriter`, `codecs.StreamReaderWriter`와 같은 기존 인터페이스와 크게 중복됩니다. 이 레거시 인터페이스는 `PEP 100`의 초기 코덱 인터페이스 설계의 일부였습니다. `PEP 100` 설계는 코덱 작성자가 핵심 `encode()` 및 `decode()` 메서드 외에도 적절한 `StreamReader` 및 `StreamWriter` 구현을 제공하도록 요구했습니다. 이는 `io.TextIOWrapper`가 이미 처리한 많은 엣지 케이스들을 (부록 A 참조) 코덱 작성자가 올바르게 처리해야 하는 큰 부담을 주었습니다. 이론적으로 코덱과 스트림 간의 깊은 통합은 추가적인 최적화를 가능하게 하지만, 실제로는 이러한 최적화가 이루어지지 않았거나, 관련된 코드 중복으로 인해 `io.TextIOWrapper`에서 수정된 엣지 케이스들이 다양한 `StreamReader` 및 `StreamWriter` 구현에서는 여전히 올바르게 처리되지 않고 있습니다.

이에 따라 이 PEP는 다음을 제안합니다:
*   `codecs.open()`을 Python 3.3에서 내장 `open()` 함수에 위임하도록 업데이트합니다.
*   `codecs.CodecInfo`의 `streamreader` 및 `streamwriter` 속성을 포함한 레거시 `codecs.Stream*` 인터페이스를 Python 3.3에서 Deprecate 합니다.

## 근거 (Rationale)

### `StreamReader` 및 `StreamWriter`의 문제점
*   `StreamReader`는 개행 문자(newlines)를 번역할 수 없습니다.
*   `StreamWriter`는 "라인 버퍼링"(입력 텍스트에 개행 문자가 포함된 경우 flush)을 지원하지 않습니다.
*   CJK 인코딩(`GB18030` 등)의 `StreamReader` 클래스는 UNIX 개행 문자(`\n`)만 지원합니다.
*   `StreamReader` 및 `StreamWriter`는 상태 저장형 코덱이지만, 상태를 제어하는 함수(`getstate()` 또는 `setstate()`)를 노출하지 않습니다.
*   각 코덱은 엣지 케이스를 처리해야 합니다 (부록 A 참조).
*   `StreamReader` 및 `StreamWriter`는 `IncrementalReader` 및 `IncrementalEncoder`와 매우 유사하며, 상태 저장형 코덱(예: `UTF-16`)의 일부 코드가 중복됩니다.
*   각 코덱은 사소하더라도(인코더/디코더 호출만 하는 경우에도) 자체 `StreamReader` 및 `StreamWriter` 클래스를 재구현해야 합니다.
*   `codecs.open(filename, "r")`는 `io.TextIOWrapper` 객체를 생성합니다.
*   어떤 코덱도 코덱의 특수성에 기반한 `StreamReader` 또는 `StreamWriter`의 최적화된 메서드를 구현하지 않습니다.

다양한 버그 트래커 이슈들도 이러한 문제점들을 뒷받침합니다.

### `TextIOWrapper` 기능
*   `TextIOWrapper`는 개행 문자 번역(UNIX 개행 문자로)을 포함하여 어떤 종류의 개행 문자든 읽고 쓸 수 있도록 지원합니다.
*   `TextIOWrapper`는 코덱의 증분 인코더(incremental encoders) 및 디코더(decoders)를 재사용합니다(코드 중복 없음).
*   `io` 모듈(`TextIOWrapper`)은 `codecs` 모듈(`StreamReader`)보다 빠릅니다. `io`는 C로 구현된 반면 `codecs`는 Python으로 구현되었습니다.
*   `TextIOWrapper`는 작은 읽기 작업을 가속화하는 선행 읽기(readahead) 알고리즘을 가지고 있습니다 (문자 단위 또는 라인 단위 읽기에서 `io`가 `codecs`보다 10배에서 25배 빠릅니다).
*   `TextIOWrapper`는 쓰기 버퍼를 가지고 있습니다.
*   `TextIOWrapper.tell()`은 최적화되어 있습니다.
*   `TextIOWrapper`는 단일 클래스를 사용하여 랜덤 액세스(읽기+쓰기)를 지원하며, 이는 인터레이스된 읽기-쓰기(interlaced read-write)를 최적화할 수 있도록 합니다 (하지만 현재 그러한 최적화는 구현되지 않았습니다).

### `TextIOWrapper` 문제점
*   `Issue #12215` (`TextIOWrapper`: 인터레이스된 읽기-쓰기 문제)가 보고되었습니다.

### `StreamReader` 및 `StreamWriter`의 개선 가능성
`StreamReader` 및 `StreamWriter` 클래스에 코덱 상태 읽기/쓰기 함수를 추가함으로써, 각 상태 저장형 `StreamReader` 및 `StreamWriter` 클래스 대신 기본 클래스에서 상태 저장형 코덱과 관련된 문제를 해결할 수 있을 것입니다.
`StreamReader` 및 `StreamWriter`가 `IncrementalDecoder` 및 `IncrementalEncoder`를 사용하도록 변경할 수 있습니다.

코덱은 특정 인코딩에 최적화된 변형을 구현하거나 특정 스트림 메서드를 가로채서 기능을 추가하거나 인코딩/디코딩 성능을 향상시킬 수 있습니다. `TextIOWrapper`는 이러한 최적화를 구현할 수 없지만, 증분 인코더 및 디코더를 사용하고 읽기 및 쓰기 버퍼를 사용하므로 불완전한 입력으로 인한 오버헤드가 낮거나 없습니다.

`UTF-8`과 같이 가변 길이 인코딩 코덱의 경우, 읽기 끝 부분에서 바이트 누락으로 인해 문제가 발생하는 경우가 많으므로 훨씬 더 많은 작업을 수행할 수 있습니다. `UTF-32-BE/LE` 코덱은 단순히 문자 위치에 4를 곱하여 바이트 위치를 얻을 수 있습니다.

### `StreamReader` 및 `StreamWriter`의 사용
이러한 클래스는 직접 사용되는 경우가 드물고, 주로 `codecs.open()`을 통해 간접적으로 사용됩니다. Python 3 표준 라이브러리에서는 (`codecs` 모듈 자체를 제외하고) 사용되지 않습니다.

일부 프로젝트는 `StreamReader` 및 `StreamWriter`를 사용하여 자체 코덱을 구현하지만, 이러한 클래스를 직접 사용하지는 않습니다.

## 하위 호환성 (Backwards Compatibility)

### 공개 API인 `codecs.open` 유지
`codecs.open()`은 내장 `open()` 함수로 대체될 수 있습니다. `open()`은 유사한 API를 가지며 더 많은 옵션을 제공합니다. 두 함수 모두 파일과 유사한 객체(동일한 API)를 반환합니다.

`codecs.open()`은 Python 2.6까지 유니코드 모드에서 텍스트 파일을 여는 유일한 방법이었습니다. 많은 Python 2 프로그램이 이 함수를 사용합니다. `codecs.open()`을 제거하면 Python 2에서 Python 3으로 프로그램을 포팅하는 데 더 많은 작업이 필요하며, 특히 두 Python 버전에서 동일한 코드 베이스를 사용하는 프로젝트(2to3 프로그램을 사용하지 않는 경우)에 더 큰 영향을 미칩니다.

`codecs.open()`은 Python 2와의 하위 호환성을 위해 유지됩니다.

### `StreamReader` 및 `StreamWriter` Deprecate
Python 3.3에서 `StreamReader` 또는 `StreamWriter`를 인스턴스화하면 `DeprecationWarning`이 발생해야 합니다. 서브클래스를 정의하는 경우에는 `DeprecationWarning`이 발생하지 않습니다.
`codecs.open()`은 내장 `open()` 함수(`TextIOWrapper`)를 재사용하여 텍스트 파일을 읽고 쓰도록 변경될 것입니다.

## 대안적 접근 (Alternative Approach)
`codecs.Stream*` 클래스 Deprecation의 대안은 `codecs.open()`의 이름을 `codecs.open_stream()`으로 변경하고, `open()` 및 `io.TextIOWrapper`를 재사용하는 새로운 `codecs.open()` 함수를 생성하는 것입니다.

## 부록 A: 상태 저장형 코덱의 문제점
상태 저장형 코덱을 스트림과 함께 올바르게 사용하는 것은 어렵습니다. `codecs` 모듈은 일부 사례를 지원하지만, `io` 모듈은 상태 저장형 코덱과 관련된 알려진 버그가 더 이상 없습니다. `codecs`와 `io` 모듈의 주요 차이점은 `codecs` 모듈의 경우 각 코덱의 `StreamReader` 및/또는 `StreamWriter` 클래스에서 버그를 수정해야 하는 반면, `io.TextIOWrapper`에서는 버그를 한 번만 수정하면 된다는 것입니다.

### 상태 저장형 코덱 예시
Python은 다음 상태 저장형 코덱을 지원합니다:
`cp932`, `cp949`, `cp950`, `euc_jis_2004`, `euc_jisx2003`, `euc_jp`, `euc_kr`, `gb18030`, `gbk`, `hz`, `iso2022_jp`, `iso2022_jp_1`, `iso2022_jp_2`, `iso2022_jp_2004`, `iso2022_jp_3`, `iso2022_jp_ext`, `iso2022_kr`, `shift_jis`, `shift_jis_2004`, `shift_jisx0213`, `utf_8_sig`, `utf_16`, `utf_32`.

### `Read` 및 `seek(0)`
`io` 및 `codecs` 모듈 모두 이 사용 사례를 올바르게 지원합니다.

### `seek(n)`
`io` 모듈은 이 사용 사례를 지원하지만, `codecs`는 두 번째 쓰기에서 새 BOM (Byte Order Mark)을 작성하여 실패합니다 (`issue #12512`).

### `Append mode` (추가 모드)
`io` 모듈은 이 사용 사례를 지원하지만, `codecs`는 두 번째 쓰기에서 새 BOM을 작성하여 실패합니다 (`issue #12512`).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.