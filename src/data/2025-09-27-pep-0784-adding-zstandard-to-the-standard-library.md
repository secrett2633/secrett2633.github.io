---
title: "[Final] PEP 784 - Adding Zstandard to the standard library"
excerpt: "Python Enhancement Proposal 784: 'Adding Zstandard to the standard library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/784/
toc: true
toc_sticky: true
date: 2025-09-27 13:58:47+0900
last_modified_at: 2025-09-27 13:58:47+0900
published: true
---
> **원문 링크:** [PEP 784 - Adding Zstandard to the standard library](https://peps.python.org/pep-0784/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 06-Apr-2025


## PEP 784 – 표준 라이브러리에 Zstandard 추가

### 개요
이 문서는 Python Enhancement Proposal (PEP) 784에 대한 한국어 번역 및 정리입니다. PEP 784는 Python 표준 라이브러리에 Zstandard (zstd) 압축 알고리즘을 추가하고, 기존 압축 모듈들을 `compression` 네임스페이스 아래로 재구성하는 것을 제안합니다.

---

### PEP 784 – 표준 라이브러리에 Zstandard 추가

*   **작성자:** Emma Harper Smith
*   **후원자:** Gregory P. Smith
*   **토론:** Discourse thread
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2025년 4월 6일
*   **Python 버전:** 3.14
*   **해결일:** 2025년 4월 25일

이 PEP는 역사적인 문서입니다. 최신 공식 문서는 [compression.zstd](https://docs.python.org/3.14/library/compression.zstd.html)에서 확인할 수 있습니다.

### 요약 (Abstract)

Zstandard는 널리 채택되고 성숙하며 매우 효율적인 압축 표준입니다. 이 PEP는 Meta의 `zstd` 라이브러리(기본 구현체)를 감싸는 Python 래퍼를 포함하는 새로운 모듈을 Python 표준 라이브러리에 추가할 것을 제안합니다. 또한, PyPI의 패키지들과의 이름 충돌을 피하고 Python 사용자들에게 통일된 인터페이스를 제공하기 위해, 표준 라이브러리의 압축 모듈들은 `compression.*` 패키지 아래로 이동될 것입니다.

### 동기 (Motivation)

CPython은 `zlib` (DEFLATE), `gzip`, `bzip2`, `lzma`와 같이 널리 사용되는 여러 압축 형식에 대한 모듈을 제공합니다. 널리 유용한 표준 및 유틸리티를 통합하는 Python의 "배터리 포함 (batteries included)" 철학에 따라 인기 있는 압축 알고리즘을 포함하는 것은 자연스럽습니다. `lzma`는 Python 3.3에 추가된 가장 최근의 압축 모듈입니다.

그 이후로 Zstandard는 합리적인 CPU 및 메모리 비용으로 높은 압축률을 달성하면서 고성능 압축 및 압축 해제 모두를 위한 현대적인 사실상의 선호 압축 라이브러리가 되었습니다. Zstandard는 `bzip2`나 `zlib` (DEFLATE)보다 훨씬 높은 압축률을 달성하면서 LZMA보다 훨씬 빠르게 압축을 해제합니다.

Zstandard는 컴퓨팅의 다양한 영역에서 널리 채택되었습니다. 수많은 하드웨어 구현은 Zstandard에 대한 장기적인 약속과 Zstandard가 앞으로도 사실상의 압축 선택으로 남을 것이라는 기대를 보여줍니다. 이는 RFC 8478에서 Zstandard의 IETF 표준화로 더욱 입증됩니다. Zstandard 압축은 ZFS 및 Btrfs 파일 시스템에도 구현되어 있습니다.

Zstandard의 매우 효율적인 압축은 `brotli`, `lzo`, `ucl`과 같은 다른 현대적인 압축 형식을 대체했습니다. LZ4는 여전히 매우 높은 처리량 시나리오에서 사용되지만, Zstandard도 이러한 맥락의 일부에서 사용될 수 있습니다. LZ4의 포함은 이 PEP의 범위 밖이지만, 이 PEP가 도입하는 `compression` 네임스페이스에 대한 매력적인 미래 추가가 될 것입니다.

PyPI에는 Zstandard에 대한 여러 Python 바인딩이 있으며, 각각 다른 API와 `zstd` 라이브러리를 바인딩하는 방식에 대한 선택 사항이 있습니다. 표준 라이브러리에 공식 모듈을 도입하는 한 가지 목표는 Zstandard를 위한 간단한 압축/압축 해제 API를 원하는 Python 사용자들의 혼란을 줄이는 것입니다. 기존 패키지는 확장된 API를 계속 제공하거나 최신 Zstandard 버전의 기능을 통합할 수 있습니다.

Zstandard 지원을 표준 라이브러리에 추가하는 또 다른 이유는 `tarfile` 모듈에서 Zstandard 지원을 요청하는 오래된 공개 이슈(python/cpython#81276)를 해결하기 위함입니다. 이 이슈는 CPython 트래커의 공개 이슈 중 5번째로 많은 "엄지척"을 받았으며, 상당한 논의와 관심을 얻었습니다. 또한 ZIP 형식은 Zstandard 압축 형식 ID를 표준화하며, `zipfile` 모듈과의 통합은 Zstandard 압축을 사용하여 ZIP 아카이브를 열 수 있도록 할 것입니다. 이 PEP의 참조 구현은 `zipfile`, `tarfile`, `shutil` 모듈과의 통합을 포함합니다.

Zstandard 압축은 Python wheel 패키지를 더 작게 만들고 설치 속도를 상당히 빠르게 만드는 데에도 사용될 수 있습니다. Anaconda는 `conda` 패키지 형식에 Zstandard를 채택했을 때 상당한 속도 향상을 발견했습니다.

> Conda의 다운로드 크기는 약 30-40% 감소했으며, 압축 해제는 훨씬 빨라졌습니다. [...] 우리는 약 2.5배의 전체 속도 향상을 보았는데, 이는 거의 전적으로 새로운 파일 형식에 사용된 `zstd` 압축의 현저히 빠른 압축 해제 속도 덕분입니다.
>
> — Anaconda blog on Zstandard adoption

많은 다른 압축 라이브러리 및 형식에 대한 포괄적인 벤치마크인 `lzbench`에 따르면, Zstandard는 wheel의 기존 `zlib` 기반 압축에 비해 훨씬 높은 압축률을 가집니다. 이 PEP는 wheel 형식이나 다른 패키징 표준에 대한 변경을 규정하지 않지만, 표준 라이브러리에 Zstandard 바인딩이 있으면 미래 PEP가 Python wheel 패키지의 사용자 경험을 개선할 수 있도록 할 것입니다.

### 근거 (Rationale)

#### `compression` 패키지의 도입

`zstd`와 `zstandard` import 이름은 모두 PyPI의 프로젝트에서 사용되고 있습니다. 기존 바인딩 사용자에게 불편을 주지 않기 위해, 이 PEP는 압축 라이브러리를 위한 새로운 네임스페이스인 `compression`을 도입할 것을 제안합니다. 이 이름은 이미 표준 라이브러리에서 사용하기 위해 PyPI에 예약되어 있습니다. 새로운 Zstandard 모듈은 `compression.zstd`로 명명될 것입니다. 다른 압축 모듈들도 새로운 `compression` 패키지에서 재export될 것입니다.

압축 모듈에 공통 네임스페이스를 제공하는 것은 몇 가지 장점이 있습니다. 첫째, 사용자가 압축 모듈을 어디에서 찾아야 하는지에 대한 혼란을 줄입니다. 둘째, 최상위 `compression` 모듈은 `hashlib`의 `algorithms_available`과 유사하게 어떤 압축 형식을 사용할 수 있는지에 대한 정보를 제공할 수 있습니다. PEP 775가 승인되면 `zlib`를 나열하는 `compression.algorithms_guaranteed`도 제공될 수 있습니다. 마지막으로, `compression` 네임스페이스는 다른 압축 형식을 표준 라이브러리에 병합하는 데 있어 미래의 문제를 방지합니다. 새로운 압축 형식은 CPython에 통합되기 전에 PyPI에 게시될 가능성이 높습니다. 따라서, 새로운 압축 형식 import 이름은 모듈이 CPython에 포함될 시점에 이미 사용되고 있을 가능성이 높습니다. 압축 모듈을 패키지 접두사 아래에 두면 잠재적인 미래 이름 충돌 문제를 방지할 수 있습니다.

Python 버전 간에 호환성을 유지하려는 코드는 다음 패턴을 사용하여 호환성을 보장할 수 있습니다:

```python
try:
    from compression.lzma import LZMAFile
except ImportError:
    from lzma import LZMAFile
```

이는 가능한 경우 새로운 import 이름을 사용하고, 그렇지 않은 경우 이전 이름으로 폴백합니다.

#### `pyzstd` 기반 구현

이 PEP의 구현은 `pyzstd` 프로젝트를 기반으로 합니다. 이 프로젝트는 현재 표준 라이브러리에서 사용되는 출력 버퍼 구현을 작성한 Ma Lin에 의해 원래 CPython으로 업스트림될 목적으로 작성되었기 때문에 선택되었습니다. 이 프로젝트는 이후 Rogdham에게 인계되어 PyPI에 게시되었습니다. `pyzstd`의 API는 `bz2` 및 `lzma`와 같은 표준 라이브러리의 다른 압축 모듈의 API와 유사합니다.

#### 최소 지원 Zstandard 버전

최소 지원 Zstandard 버전은 2020년 5월에 출시된 v1.4.5로 선택되었습니다. 이 버전은 LTS 릴리스를 포함한 여러 Linux 배포판 패키지 저장소에서 사용할 수 있는 Zstandard 버전을 검토하여 최소 기준으로 선택되었습니다. 이 버전 선택은 기존 LTS Linux 배포판과의 호환성을 최대화하기 위해 상당히 보수적이지만, 새로운 Python 릴리스가 일반적으로 새로운 배포판 릴리스의 일부로 패키징된다는 점을 고려할 때 더 새로운 Zstandard 버전이 선택될 수도 있습니다.

### 사양 (Specification)

#### `compression` 네임스페이스

`compression`이라는 새로운 압축 모듈 네임스페이스가 도입될 것입니다. 이 패키지의 최상위 모듈은 처음에는 비어 있지만, 미래에 최상위 수준에 압축 루틴과 상호 작용하기 위한 표준 API가 추가될 수 있습니다.

#### `compression.zstd` 모듈

새로운 모듈 `compression.zstd`는 표준 라이브러리의 다른 압축 모듈과 일치하는 Zstandard 압축 API와 함께 도입될 것입니다. 구체적으로 다음과 같습니다:

*   `compress()` / `decompress()`: 원샷(one-shot) 압축 또는 압축 해제를 위한 API.
*   `ZstdFile` / `open()`: 스트림 및 파일류 객체와 상호 작용하기 위한 API.
*   `ZstdCompressor` / `ZstdDecompressor`: 점진적(incremental) 압축 또는 압축 해제를 위한 API.

또한, 일부 Zstandard 특정 기능도 포함할 것입니다:

*   `ZstdDict` / `train_dict()` / `finalize_dict()`: 유사한 데이터의 많은 작은 덩어리를 압축하는 데 유용한 Zstandard 딕셔너리와 상호 작용하기 위한 API.

#### `libzstd` 선택적 의존성

`libzstd` 라이브러리는 CPython의 선택적 의존성이 될 것입니다. 라이브러리를 사용할 수 없는 경우 `compression.zstd` 모듈을 사용할 수 없습니다. 이는 일반적인 빌드 환경 감지의 일부로 Unix 플랫폼에서 자동으로 처리됩니다.

Windows에서는 CPython이 Windows용으로 의존하는 라이브러리를 빌드하는 데 사용되는 소스 의존성에 `libzstd`가 추가될 것입니다.

#### 다른 압축 모듈

Python 3.14에서는 `compression.lzma`, `compression.bz2`, `compression.gzip`, `compression.zlib`라는 새로운 import 이름이 도입되어 각각 기존 `lzma`, `bz2`, `gzip`, `zlib` 모듈의 내용을 재export합니다. `compression` 하위 모듈은 앞으로 표준 import 이름이 될 것입니다. 최소 지원 Python 버전 요구 사항이 가능할 때 Python 문서에서 새 `compression` 이름의 사용이 원래 최상위 모듈 이름보다 권장될 것입니다.

`_compression` 모듈은 private으로 표시되어 있으므로 즉시 `compression._common._streams`로 이름이 변경될 것입니다. 새로운 이름은 모듈의 현재 내용이 표준 라이브러리 압축 모듈의 스트림 API(예: `LZMAFile`)에 대한 I/O 관련 헬퍼이기 때문에 선택되었습니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP는 하위 호환되지 않는 변경 사항을 도입하지 않습니다. 현재 기존 압축 모듈을 Deprecate하거나 제거할 계획은 없습니다. 기존 모듈의 Deprecate 또는 제거는 미래의 결정에 맡겨지지만, 이 PEP의 승인일로부터 5년 이내에는 발생하지 않을 것입니다.

### 보안 영향 (Security Implications)

새로운 C 코드, 특히 잠재적으로 신뢰할 수 없는 사용자 입력에 대해 작동하는 코드와 마찬가지로 메모리 안전 문제의 위험이 있습니다. 작성자는 `libfuzzer`와의 통합을 기여하여 `_zstd` 코드를 퍼징하고 견고함을 보장할 계획입니다. 또한, 압축 및 압축 해제 루틴을 테스트하는 여러 테스트가 있습니다. 이 테스트는 AddressSanitizer로 컴파일될 때 오류 없이 통과합니다.

새로운 의존성을 추가하는 것은 항상 보안 위험을 수반하지만, `zstd` 라이브러리는 성숙하고, 각 커밋에서 퍼징되며, Meta의 버그 바운티 프로그램에 참여하고 있습니다.

### 교육 방법 (How to Teach This)

새 모듈에 대한 문서는 참조 구현 브랜치에 있습니다. 기존 모듈에 대한 문서도 새 이름을 참조하도록 업데이트될 것입니다.

### 참조 구현 (Reference Implementation)

참조 구현에는 `_zstd` C 코드, `compression.zstd` 코드, `tarfile`, `shutil`, `zipfile` 수정 사항, 그리고 추가된 각 새 API 및 통합에 대한 테스트가 포함되어 있습니다. 또한 다른 압축 모듈의 재export도 포함합니다.

### 기각된 아이디어 (Rejected Ideas)

#### 모듈 이름을 `zstdlib`로 지정하고 새 `compression` 네임스페이스를 만들지 않음

새 `compression` 네임스페이스를 만드는 대신 import 이름을 `zstdlib`와 같은 다른 이름으로 찾는 한 가지 옵션이 있었습니다. `zst`, `libzstd`, `zstdcomp`와 같은 다른 이름들도 제안되었습니다. 논의 결과, 이 이름들은 오타하기 너무 쉽거나 직관적이지 않다는 것을 발견했습니다. 또한, 기존 import 이름 문제는 표준 라이브러리에 추가될 미래 압축 형식에서도 지속될 가능성이 높습니다. 일반적인 고속 압축 형식인 LZ4는 PyPI에 `lz4`라는 import 이름의 `lz4` 패키지를 가지고 있습니다. 각 압축 형식마다 이 문제를 해결하는 대신, 이미 사용되고 있는 `compression` 네임스페이스를 사용하여 한 번에 영구적으로 해결하는 것이 더 좋습니다.

#### Python 3.14에 실험적인 `_zstd` 패키지를 도입

이 PEP가 Python 3.14의 새 기능 베타 마감일 가까이 게시되었기 때문에, 한 가지 제안은 패키징 도구가 더 빨리 사용할 수 있도록 `_zstd`라는 private 모듈로 이름을 지정하고 이름을 결정하지 않는 것이었습니다. 이는 3.15 개발 기간 동안 최종 모듈 이름에 대한 논의를 위한 더 많은 시간을 허용할 것입니다. 그러나 private 모듈을 도입하는 것은 인기가 없었습니다. 표준 라이브러리의 private 모듈에 대한 외부 사용의 기대치와 계약이 불분명하기 때문입니다.

#### `compression` 대신 표준 라이브러리 네임스페이스를 도입

`compression` 네임스페이스에 대한 한 가지 대안은 전체 표준 라이브러리에 대해 `std` 네임스페이스를 도입하는 것이었습니다. 그러나 이는 3.14에는 너무 중대한 변경으로 간주되었으며, 합의된 의미론, 마이그레이션 경로 또는 패키지 이름이 없었습니다. 또한, 미래에 `std` 네임스페이스를 도입하는 PEP는 항상 `compression` 하위 모듈이 `std` 네임스페이스로 평탄화되도록 정의할 수 있습니다.

#### `zipfile` 및 `tarfile`을 `compression`에 포함

압축은 아카이빙 도구와 함께 자주 사용되므로 `zipfile`과 `tarfile` 모두를 `compression` 네임스페이스 아래에 두는 것이 매력적입니다. 그러나 압축은 아카이빙 도구 외에도 사용될 수 있습니다. 예를 들어, 네트워크 요청은 `gzip` 압축될 수 있습니다. 또한, `tar`와 같은 형식 자체는 압축을 포함하지 않고 외부 압축에 의존합니다. 따라서 이 PEP는 `zipfile` 또는 `tarfile`을 `compression` 아래로 이동하는 것을 제안하지 않습니다.

#### `gzip`을 `compression`에 포함하지 않음

GZip 형식 RFC는 여러 블록과 내용에 대한 메타데이터를 포함할 수 있는 형식을 정의합니다. 이러한 방식으로 GZip은 ZIP 및 tar와 같은 아카이브 형식과 상당히 유사합니다. 그럼에도 불구하고, 사용 시 GZip은 종종 아카이브 형식이라기보다는 압축 형식으로 취급됩니다. 다른 언어가 GZip을 어떻게 분류하는지 살펴보면, 이를 아카이빙 형식이 아닌 압축 형식으로 분류하는 경향이 지배적입니다.

| 언어      | 분류 (Compression/Archive) | 문서 링크                                                      |
| :-------- | :------------------------- | :------------------------------------------------------------- |
| Golang    | Compression                | [https://pkg.go.dev/compress/gzip](https://pkg.go.dev/compress/gzip) |
| Ruby      | Compression                | [https://docs.ruby-lang.org/en/master/Zlib/GzipFile.html](https://docs.ruby-lang.org/en/master/Zlib/GzipFile.html) |
| Rust      | Compression                | [https://github.com/rust-lang/flate2-rs](https://github.com/rust-lang/flate2-rs) |
| Haskell   | Compression                | [https://hackage.haskell.org/package/zlib](https://hackage.haskell.org/package/zlib) |
| C#        | Compression                | [https://learn.microsoft.com/en-us/dotnet/api/system.io.compression.gzipstream](https://learn.microsoft.com/en-us/dotnet/api/system.io.compression.gzipstream) |
| Java      | Archive                    | [https://docs.oracle.com/javase/8/docs/api/java/util/zip/package-summary.html](https://docs.oracle.com/javase/8/docs/api/java/util/zip/package-summary.html) |
| NodeJS    | Compression                | [https://nodejs.org/api/zlib.html](https://nodejs.org/api/zlib.html) |
| Web APIs  | Compression                | [https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API) |
| PHP       | Compression                | [https://www.php.net/manual/en/function.gzcompress.php](https://www.php.net/manual/en/function.gzcompress.php) |
| Perl      | Compression                | [https://perldoc.perl.org/IO::Compress::Gzip](https://perldoc.perl.org/IO::Compress::Gzip) |

또한, Python의 `gzip` 모듈은 주로 단일 블록 콘텐츠에 초점을 맞추고 있으며 다른 압축 모듈과 유사한 API를 가지고 있어 `compression` 네임스페이스에 잘 맞습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.