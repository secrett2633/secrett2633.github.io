---
title: "[Final] PEP 538 - Coercing the legacy C locale to a UTF-8 based locale"
excerpt: "Python Enhancement Proposal 538: 'Coercing the legacy C locale to a UTF-8 based locale'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/538/
toc: true
toc_sticky: true
date: 2025-09-26 23:28:03+0900
last_modified_at: 2025-09-26 23:28:03+0900
published: true
---
> **원문 링크:** [PEP 538 - Coercing the legacy C locale to a UTF-8 based locale](https://peps.python.org/pep-0538/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 28-Dec-2016


# PEP 538 – 레거시 C locale을 UTF-8 기반 locale로 강제 변환 (Coercing the legacy C locale to a UTF-8 based locale)

## 개요
이 PEP는 Python 3.7부터 *nix 시스템에서 기본 C locale이 사용될 때, CPython이 UTF-8을 기본 텍스트 인코딩으로 가정하도록 변경하는 것을 제안합니다. 이는 멀티링구얼 환경에서 운영체제 인터페이스와의 통신 시 ASCII 인코딩으로 인해 발생하는 문제를 해결하고, 다른 locale 인식 구성 요소와의 호환성을 유지하기 위함입니다.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

## 주요 내용 요약

### 배경 (Background)
*   Python 3는 `char *`와 `wchar_t *` 같은 문자열 형식을 `PyUnicodeObject *`로 변환할 때 시스템의 locale 설정에 의존합니다.
*   Windows에서는 `mbcs` 형식의 한계 때문에 PEP 528과 PEP 529를 통해 UTF-8 사용을 강제했습니다.
*   macOS, iOS, Android에서는 이미 CPython을 포함한 많은 구성 요소가 UTF-8을 시스템 인코딩으로 가정합니다.
*   그 외의 *nix 시스템에서는 `glibc`의 C locale 시스템을 사용하는데, 기본적으로 ASCII를 사용하며 이는 다국어 텍스트 처리에는 부적합합니다.
*   특히 SSH 환경 포워딩이나 Linux 컨테이너 환경에서 명시적인 locale 설정이 없을 경우, CPython은 ASCII 기반 C locale에서 실행되어 Unicode 관련 문제가 발생할 수 있습니다.
*   이를 해결하는 가장 간단한 방법은 `LC_CTYPE=C.UTF-8 python3 ...`와 같이 명시적으로 UTF-8 기반 locale을 설정하는 것이었습니다. `C.UTF-8` locale은 `LC_CTYPE` 범주에 UTF-8을 사용하고 나머지 범주는 C locale과 동일하게 설정합니다.

### PEP 540과의 관계 (Relationship with other PEPs)
*   이 PEP는 PEP 540과 함께 Python 3의 기본 C locale 동작을 개선하려는 공통적인 목표를 가집니다.
*   **PEP 540** 은 CPython의 기본 텍스트 인코딩을 C locale 시스템과 완전히 분리하여 CPython이 locale 독립적인 런타임처럼 동작하게 하려 합니다. 이는 locale 설정이 적절하지 않거나 "locale 인코딩" 개념이 없는 플랫폼에 유용합니다.
*   **PEP 538 (이 PEP)** 은 레거시 C locale을 UTF-8을 기본 텍스트 인코딩으로 사용하는 `C.UTF-8`과 같은 locale로 강제 변환하는 것을 제안합니다. 이는 CPython뿐만 아니라 현재 프로세스에 로드된 다른 locale 인식 확장 모듈 및 하위 프로세스에도 적용되어 다른 구성 요소와의 호환성을 유지합니다.
*   두 PEP는 상호 보완적이며, PEP 540은 적합한 locale을 사용할 수 없는 경우에 더 나은 선택지를 제공하고, PEP 538은 다른 locale 인식 구성 요소와의 호환성을 개선합니다.

### 동기 (Motivation)
*   Docker, Kubernetes와 같은 Linux 컨테이너 환경에서 Python 3 애플리케이션 개발 시 텍스트 인코딩 관련 오류가 흔히 발생합니다. 이는 컨테이너의 기본 locale 설정이 `POSIX` (ASCII 기반 C locale의 별칭)로 되어 있기 때문입니다.
*   로컬 시스템에서는 `en_AU.UTF-8`과 같이 UTF-8 기반 locale이 설정되어 있어 문제가 없지만, 기본 Docker 이미지에서는 locale이 설정되지 않아 오류가 발생합니다.
*   이를 해결하기 위해 `LC_CTYPE=C.UTF-8`을 환경 변수로 설정하면 컨테이너 내에서도 Python 3가 올바르게 동작합니다.
*   CPython이 시스템 설정 변경에 의존하기보다 이 문제를 자동으로 처리하여 더 나은 사용자 경험을 제공하는 것이 목표입니다.

### 설계 원칙 (Design Principles)
*   명시적으로 다른 locale이 구성된 경우, 이를 존중합니다.
*   변경 사항은 기존 설정 옵션을 사용합니다.
*   locale 강제 변환으로 설정된 locale과 명시적으로 설정된 locale 간의 런타임 동작은 동일해야 합니다.
*   Python 3.7의 경우, 명시적 설정 없이 locale이 변경되면 `stderr`에 경고를 출력합니다 (초기 설계에서 기본적으로 비활성화됨).
*   Python 3.7의 경우, 변경된 기본값은 빌드 타임 또는 런타임에 명시적인 비활성화 스위치를 제공합니다.
*   `LC_ALL`이나 `LANG`과 같은 `LC_CTYPE` 이외의 locale 범주 설정은 변경하지 않습니다.
*   Python 2.7을 포함하여 지원되는 CPython 버전과 호환되지 않는 Python 관련 환경 변수 변경은 피합니다.

### 명세 (Specification)

#### 독립형 Python 인터프리터 바이너리에서의 레거시 C locale 강제 변환 (Legacy C locale coercion in the standalone Python interpreter binary)
*   독립형 애플리케이션으로 실행될 때, CPython은 locale 종속적인 작업이 실행되기 전에 C locale을 재구성할 수 있습니다.
*   `setlocale(LC_ALL, "")` 호출 후, 현재 `LC_CTYPE` 설정이 "C" 또는 "POSIX"와 같이 C locale을 나타내면, CPython은 UTF-8 기반 locale로 강제 변환을 시도합니다.
*   시도되는 locale 목록: `C.UTF-8`, `C.utf8`, `UTF-8`.
*   강제 변환은 `LC_CTYPE` 환경 변수를 후보 locale 이름으로 설정하여 구현됩니다.
*   이 locale 강제 변환이 활성화되면 `stderr`에 경고가 출력됩니다 (나중에 기본적으로 비활성화됨).
*   `PYTHONCOERCECLOCALE=0`을 명시적으로 설정하면 locale 강제 변환이 비활성화됩니다.

#### 런타임 초기화 중 레거시 C locale 경고 (Legacy C locale warning during runtime initialization)
*   `Py_Initialize`가 호출될 때 CPython이 여전히 기본 C locale에서 실행 중이고 `PYTHONCOERCECLOCALE=0`이 설정되지 않은 경우, Unicode 호환성 문제에 대한 경고가 발행됩니다 (나중에 기본적으로 비활성화됨).
*   이 경우 실제 locale 설정 변경은 없으며, 단순히 지원되지 않는 구성에서 Python 3를 실행 중임을 알립니다.

#### 새로운 빌드 타임 설정 옵션 (New build-time configuration options)
*   locale 강제 변환 동작은 `--with[out]-c-locale-coercion` 플래그로 제어되며, `PY_COERCE_C_LOCALE` 전처리기 정의를 설정합니다.
*   locale 경고 동작은 `--with[out]-c-locale-warning` 플래그로 제어됩니다 (나중에 런타임 `PYTHONCOERCECLOCALE=warn` 옵션으로 대체됨).

#### 표준 스트림의 기본 오류 처리 변경 (Changes to the default error handling on the standard streams)
*   Python 3.5부터 C locale에서는 `sys.stdin`, `sys.stdout`에 `surrogateescape` 오류 핸들러를 기본으로 사용했습니다. 다른 locale에서는 `strict`를 사용했습니다.
*   이 PEP에서는 `C.UTF-8`, `C.utf8`, `UTF-8`과 같은 강제 변환 대상 locale에서도 `surrogateescape`를 기본 오류 핸들러로 사용하도록 확장합니다.
*   `sys.stderr`의 기본 오류 핸들러는 `backslashreplace`로 유지됩니다.

#### Android의 locale 설정 변경 (Changes to locale settings on Android)
*   Android 시스템에서는 `setlocale(LC_ALL, "C.UTF-8")` 및 `setlocale(LC_CTYPE, "C.UTF-8")`이 호출되도록 업데이트됩니다. 이는 Android에서 `""`를 `setlocale`에 전달하는 것이 `"C"`와 동일하게 취급되며, `C.UTF-8` locale이 항상 사용 가능하기 때문입니다.

### 근거 (Rationale)

#### C locale 처리 개선 (Improving the handling of the C locale)
*   C locale의 기본 ASCII 인코딩은 현대 네트워크 서비스 개발에 부적합하다는 것이 명확해졌습니다. Rust, Go, Node.js와 같은 최신 언어는 이미 UTF-8을 기본 텍스트 인코딩으로 가정합니다.
*   CPython은 임베디드 스크립팅 언어 및 데스크톱 애플리케이션 개발에도 사용되기 때문에 다른 locale 인식 구성 요소와의 일관성이 중요합니다.
*   이 PEP의 핵심 전제는 이러한 모든 사용 사례에서 기본 "C" locale이 암시하는 ASCII 가정이 잘못되었으며, 데스크톱 애플리케이션에서는 locale이 이미 올바르게 구성되어 있어야 하고, 네트워크 서비스 개발 (특히 Linux 컨테이너)에서는 구성 요소가 자체 기본 인코딩(예: UTF-8)을 부과해야 한다는 것입니다.

#### 표준 IO 스트림에 "surrogateescape" 오류 처리 기본값 설정 (Defaulting to “surrogateescape” error handling on the standard IO streams)
*   locale을 레거시 C locale에서 벗어나게 함으로써, 이 PEP는 표준 IO 스트림에 `surrogateescape` 사용을 비활성화하는 대신, 강제 변환 대상 세 가지 locale에도 `surrogateescape` 기본값을 적용하도록 제안합니다.
*   이는 운영체제가 제공하는 텍스트 값이 UTF-8로 인코딩되었다는 가정이 틀렸더라도 Python 3 애플리케이션을 통해 투명하게 전달될 수 있도록 보장하는 것을 목표로 합니다.
*   특히 GB 18030, Shift-JIS, ISO-2022-JP와 같이 ASCII 및 UTF-8과 호환되지 않는 인코딩도 `surrogateescape`를 통해 처리될 수 있습니다.

#### UTF-8 locale 강제 변환 중 `PYTHONIOENCODING` 설정 방지 (Avoiding setting PYTHONIOENCODING during UTF-8 locale coercion)
*   이전 버전의 PEP는 `PYTHONIOENCODING`을 `utf-8:surrogateescape`로 설정하는 것을 제안했지만, 이는 Python 2.7 하위 프로세스와의 호환성 문제를 야기했습니다.
*   현재 설계는 이전 Python 버전이 기본 `strict` 오류 처리를 유지하고, Python 3.7+는 `surrogateescape`를 일관되게 사용하도록 합니다.

#### 레거시 C locale에서의 ASCII 기반 텍스트 처리 공식 지원 중단 (Dropping official support for ASCII based text handling in the legacy C locale)
*   레거시 C locale에서 엄격한 바이트/텍스트 분리를 안정적으로 작동시키려는 시도는 10년 이상 실패했습니다.
*   이 PEP는 개발자가 필요하다면 여전히 레거시 C locale에서 Python 코드를 실행할 수 있도록 허용하지만 (`LC_ALL=C`, `PYTHONCOERCECLOCALE=0` 설정 또는 사용자 정의 빌드를 통해), Python 3의 Unicode 처리가 해당 구성에서 완전히 신뢰할 수 없을 것이며, 더 적절한 locale 설정을 사용할 것을 권장합니다.

#### 독립형으로 실행될 때만 암시적 locale 강제 변환 제공 (Providing implicit locale coercion only when running standalone)
*   이 PEP의 주요 단점은 CPython 런타임이 독립형 애플리케이션으로 실행될 때와 더 큰 시스템에 임베딩된 구성 요소로 실행될 때 동작 불일치를 유발할 수 있다는 점입니다.
*   이 문제는 locale 강제 변환을 인터프리터 시작 시퀀스에서 가능한 한 일찍, 즉 C 수준의 `main()` 함수에서 `Py_Main()` 라이브러리 함수를 호출하기 전부터 처리함으로써 해결됩니다.
*   `Py_Initialize` API는 C locale 사용을 감지할 때만 명시적인 경고를 발생시키고, 임베딩 애플리케이션이 더 합리적인 것을 지정하도록 의존합니다.

#### 레거시 동작 복원 허용 (Allowing restoration of the legacy behaviour)
*   `PYTHONCOERCECLOCALE=0` 환경 변수를 설정하여 locale 강제 변환 동작을 쉽게 켜고 끌 수 있습니다. 이는 디버깅 목적으로 다른 애플리케이션의 동작을 재현하거나 이전 Python 3.x 런타임의 동작을 재현하는 데 유용합니다.

#### C locale 감지를 위해 `LC_CTYPE` 쿼리 (Querying LC_CTYPE for C locale detection)
*   `LC_CTYPE`은 환경 변수, 명령줄 인수 및 운영체제로부터 받은 다른 텍스트 값의 암시적 디코딩을 구동하는 실제 locale 범주입니다. 따라서 Unicode 처리 문제 발생 여부를 판단할 때 이를 특별히 확인하는 것이 합리적입니다.

#### UTF-8 locale 강제 변환을 위해 `LC_CTYPE` 명시적 설정 (Explicitly setting LC_CTYPE for UTF-8 locale coercion)
*   `LC_CTYPE`을 `C.UTF-8`로 설정하는 것은 `LC_CTYPE=UTF-8`과 같은 설정이 UTF-8 locale이 정의되지 않은 시스템에서 제공될 때 발생하는 문제를 처리하는 데 중요합니다 (예: macOS SSH 클라이언트가 locale 설정을 전달하도록 구성되어 있고, 사용자가 Linux 서버에 로그인할 때).

#### UTF-8 locale 강제 변환 중 `LANG` 설정 방지 (Avoiding setting LANG for UTF-8 locale coercion)
*   이전 버전의 PEP는 `LC_CTYPE`과 함께 `LANG`을 설정하는 것을 제안했지만, `LC_CTYPE`만으로 PEP가 해결하려는 모든 문제가 처리 가능하며, `LANG`을 설정하면 `LC_TIME`과 같은 다른 locale 범주 설정이 의도치 않게 변경될 수 있어 제거되었습니다.

#### UTF-8 locale 강제 변환 중 `LC_ALL` 설정 방지 (Avoiding setting LC_ALL for UTF-8 locale coercion)
*   이전 버전의 PEP는 `LC_CTYPE`과 함께 `LC_ALL`을 설정하는 것을 제안했지만, `LC_ALL`을 설정하면 `LC_MONETARY`와 같은 다른 범주 설정에 문제가 발생할 수 있어 변경되었습니다.

#### 현재 환경에 `LC_ALL`이 설정되어 있으면 locale 강제 변환 건너뛰기 (Skipping locale coercion if LC_ALL is set in the current environment)
*   `LC_ALL`이 설정된 경우 locale 강제 변환은 효과가 없으므로, 불필요한 경고를 피하기 위해 강제 변환을 완전히 건너뜁니다.

#### "UTF-8 모드"와 독립적으로 locale 강제 변환 고려 (Considering locale coercion independently of “UTF-8 mode”)
*   PEP 540의 UTF-8 모드는 현재 구성할 수 없는 기본 동작을 변경할 수 있다는 점에서 흥미롭지만, 검증되지 않은 접근 방식입니다. 반면 이 PEP의 접근 방식은 기존의 C locale 시스템 설정(`LC_CTYPE`, `LANG`)과 Python의 표준 스트림 설정(`PYTHONIOENCODING`)을 기반으로 합니다.
*   또한, 이 PEP의 locale 강제 변환은 CPython 자체뿐만 아니라 GNU readline과 같이 표준 스트림과 상호 작용하는 확장 모듈의 문제도 해결할 수 있습니다.

#### macOS, iOS 및 Android에서 C locale 강제 변환 및 경고 활성화 (Enabling C locale coercion and warnings on Mac OS X, iOS and Android)
*   이전에는 이들 플랫폼에서 locale 강제 변환 및 경고를 빌드 타임에 비활성화할 것을 제안했지만, `LANG=C`를 명시적으로 설정할 경우 GNU readline과 같은 확장 모듈이 오작동하는 것으로 밝혀져, 모든 CPython의 autotools 기반 빌드 툴체인을 사용하는 플랫폼(Windows 제외)에서 기본적으로 활성화됩니다.

### 구현 (Implementation)
*   참고 구현은 Alyssa Coghlan의 CPython 저장소의 `pep538-coerce-c-locale` 기능 브랜치에서 개발 중입니다.

### 이전 Python 3 릴리스로의 백포팅 (Backporting to earlier Python 3 releases)
*   Python 3.7에서 이 PEP가 채택되면, 재배포자는 Python 3.6.x 릴리스로 변경 사항을 백포팅할 수 있으며 권장됩니다. 다만, 적절한 locale을 기본으로 제공하는 변경 사항과 함께 이루어져야 합니다.
*   다른 Python 3.x 릴리스로의 백포팅은 일반적인 관행으로는 권장되지 않지만, 일부 재배포자는 사용자 기반의 필요에 따라 백포팅을 선택할 수 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.