---
title: "[Withdrawn] PEP 775 - Make zlib required to build CPython"
excerpt: "Python Enhancement Proposal 775: 'Make zlib required to build CPython'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/775/
toc: true
toc_sticky: true
date: 2025-09-27 13:55:17+0900
last_modified_at: 2025-09-27 13:55:17+0900
published: true
---
> **원문 링크:** [PEP 775 - Make zlib required to build CPython](https://peps.python.org/pep-0775/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 24-Feb-2025


# PEP 775 – CPython 빌드 시 zlib 필수화 (철회됨)

*본 문서는 2025년 5월 7일에 작성자에 의해 철회(Withdrawn)되었습니다. 제안의 가치가 불충분하고 특히 WASI 예외 조항에 대한 부정적인 피드백으로 인해 철회되었습니다.*

## 개요 (Abstract)

이 PEP는 CPython을 빌드할 때 `zlib` 압축 라이브러리가 필수가 되도록 제안했습니다. `zlib` 모듈은 표준 라이브러리에서 필수 구성 요소가 될 예정이었습니다. 유일한 예외는 WASI(WebAssembly System Interface)로, 현재 WASI 상의 CPython에서는 `zlib`가 지원되지 않기 때문입니다. `zlib` 없이 인터프리터를 빌드하는 것은 여전히 가능할 수 있지만, 공식적으로는 지원되지 않을 예정이었습니다.

## PEP 철회 (PEP Withdrawal)

이 PEP는 2025년 5월 7일, 작성자들에 의해 철회되었습니다. 추가적인 검토 끝에, 제안이 충분한 가치를 제공하지 못하며, 특히 WASI에 대한 예외 조항과 관련하여 상당한 부정적인 피드백에 직면했음을 인지했기 때문입니다.

## 동기 (Motivation)

`zlib` Python 모듈의 기반이 되는 `zlib` 라이브러리는 WASI를 제외한 모든 지원되는 시스템에서 사용할 수 있습니다.

`pip` 인스톨러를 포함하여 PyPI의 많은 `wheel` 패키지들이 `zlib`를 필요로 합니다. `pip` 사용자는 `zlib`가 없는 CPython을 제대로 작동하지 않는다고 생각하겠지만, 대부분의 주요 CPython 빌드에는 `zlib`가 포함되어 있기 때문에 이러한 문제를 잘 인지하지 못합니다.

CPython 개발자들도 이 문제를 크게 인지하지 못했습니다. 실제로 이 PEP 작성 당시, `zlib`가 없으면 최소한 하나의 CPython 테스트(test_peg_generator.test_c_parser의 "skip" 데코레이터가 너무 늦게 적용됨)가 실패하는 것으로 나타났지만, CPython의 CI(Continuous Integration) 시스템에서는 이를 감지하지 못했습니다.

이 PEP는 이러한 상황을 문서화 및 메시징의 문제로 간주했습니다. 실제로 `zlib` 없이 CPython을 빌드하는 것을 이미 지원하지 않고 있으므로, 이를 명확히 밝혀야 한다고 보았습니다.

## 근거 (Rationale)

임베딩(embedding) 및 부트스트랩(bootstrapping)과 같은 `zlib`가 필요 없는 빌드(zlib-less builds)에 대한 잠재적인 사용 사례와 예측 불가능한 경우들이 존재합니다. 따라서 이 PEP는 `zlib`가 없는 시스템에 대한 지원을 완전히 제거하지 않고, "미지원(unsupported)"으로 표기하며, 영향을 받는 사용자들에게 자체적인 테스트를 수행하거나, 결정을 재고할 만한 사용 사례를 공유해 줄 것을 요청했습니다.

WASI 플랫폼에서는 `zlib`가 아직 기본적으로 사용되지 않습니다. 이는 주로 `zlib`를 추가하는 것이 아직 WASI의 우선순위가 아니었기 때문입니다. (참고로, WASI를 위한 주요 "실제" CPython 배포판인 Pyodide는 `zlib`를 포함하고 있습니다.) 이 PEP는 이를 `zlib`가 없는 플랫폼을 계속 테스트하여, 의도치 않게 미지원 빌드를 중단시키지 않을 기회로 삼았습니다.

## 명세 (Specification)

`zlib`를 선택적 기능으로 사용하는 표준 라이브러리 모듈에서, 해당 기능이 사용될 때 `ImportError`를 발생시키도록 했습니다. 더 "친화적인" 오류 메시지를 생성하거나 `zlib` 사용 가능 여부를 사전 확인하는 코드는 제거될 예정이었습니다. `zlib`가 없더라도 `zlib`와 관련 없는 모든 기능은 여전히 사용 가능합니다.

이는 다음 모듈 및 이들에 의존하는 다른 모듈에 영향을 미칠 예정이었습니다.

*   `shutil` (`gztar` 및 `zip` 아카이브 형식)
*   `tarfile`, `zipfile`, `zipimport`, `zipapp` (아카이브 압축)
*   `codecs` (`zlib_codec`)

`shutil.get_archive_formats()`는 `zlib`가 없어서 `zip` 및 `gztar` 형식을 사용할 수 없더라도 항상 등록된 형식으로 이들을 포함할 예정이었습니다.

`configure` 스크립트는 WASI를 제외한 플랫폼에서 `zlib`를 찾지 못할 경우 경고를 발행할 예정이었습니다.

`test_zlib`는 WASI를 제외한 플랫폼에서 실패할 예정이었습니다. `zlib` 없이 빌드된 시스템 및 잠재적인 되돌림(reverts)을 위해 `@test.support.requires_zlib`의 사용은 유지되어 다른 모든 테스트는 계속 건너뛰어질 예정이었습니다.

PEP 11은 "WASI를 제외한 `zlib` 없는 시스템"을 미지원으로 표시하도록 조정될 예정이었습니다.

## 하위 호환성 (Backwards Compatibility)

실질적으로 큰 변화는 없지만, 오류 처리 방식에 변화가 있었습니다. 예를 들어, `zlib`가 없는 상태에서 `tar` 압축을 시도하면 `CompressionError` 대신 `ImportError`가 발생할 예정이었습니다.

## 보안 영향 (Security Implications)

알려진 보안 영향은 없습니다.

## 교육 방법 (How to Teach This)

`zlib`는 이미 모든 관련 컨텍스트에서 사용 가능하므로, 별도의 지침 변경은 필요하지 않을 것으로 예상되었습니다.

## 참조 구현 (Reference Implementation)

참조 구현은 CPython 저장소의 풀 리퀘스트, `python/cpython#130297`에서 확인할 수 있었습니다.

## 향후 작업 (Future work)

향후 `zlib` 없는 빌드를 위한 사용 사례가 발견되지 않으면, `zlib`가 완전히 필수가 될 수 있었습니다. 이를 위한 주요 변경 사항은 `configure` 스크립트가 치명적인 오류를 발생시키고 `@test.support.requires_zlib`를 제거하는 것이었을 것입니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.