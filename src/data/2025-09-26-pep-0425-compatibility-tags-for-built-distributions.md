---
title: "[Final] PEP 425 - Compatibility Tags for Built Distributions"
excerpt: "Python Enhancement Proposal 425: 'Compatibility Tags for Built Distributions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/425/
toc: true
toc_sticky: true
date: 2025-09-26 21:40:01+0900
last_modified_at: 2025-09-26 21:40:01+0900
published: true
---
> **원문 링크:** [PEP 425 - Compatibility Tags for Built Distributions](https://peps.python.org/pep-0425/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Jul-2012

PEP 425 – 빌드된 배포판을 위한 호환성 태그 (Compatibility Tags for Built Distributions)

## 개요
이 문서는 Python 패키징에서 빌드된 (또는 바이너리) 배포판이 어떤 Python 버전과 호환되는지 나타내기 위한 태그 시스템을 정의합니다. 이 시스템은 Python 구현체 및 언어 버전, ABI (Application Binary Interface), 그리고 플랫폼 정보를 세 가지 태그 세트로 나타냅니다. 이 태그들은 파일명에 포함되므로 간결하게 설계되었습니다.

**중요** : 이 PEP는 역사적인 문서입니다. 최신 규격인 "Platform compatibility tags"는 PyPA specs 페이지에서 관리됩니다.

## PEP 수락
이 PEP는 2013년 2월 17일 Alyssa Coghlan에 의해 수락되었습니다.

## 도입 배경 (Rationale)
현재 `python setup.py bdist` 명령은 PyPy와 CPython에서 동일한 파일명을 생성하지만, 실제로는 호환되지 않는 아카이브를 만듭니다. 이로 인해 동일한 폴더나 인덱스에서 빌드된 배포판을 공유하기가 어렵습니다. 따라서, 빌드된 배포판은 특정 아카이브가 특정 Python 구현체와 호환되는지 여부를 판단할 수 있는 충분한 정보를 포함하는 파일명 명명 규칙을 가져야 합니다.

이전의 노력들은 CPython이 유일한 중요한 구현체였고 ABI가 Python 언어 릴리스와 동일했던 시점에서 비롯되었습니다. 이 규격은 Python 구현체, 언어 버전, ABI, 그리고 플랫폼을 태그 세트로 포함하여 이전 방식을 개선합니다.

설치 프로그램은 배포판에 명시된 태그와 자신이 지원하는 태그를 비교하여, 전체 메타데이터를 읽을 필요 없이 특정 빌드된 배포판을 다운로드할지 여부에 대해 정보에 기반한 결정을 내릴 수 있습니다.

## 태그 형식 (Overview)
태그 형식은 `{python tag}-{abi tag}-{platform tag}` 입니다.

*   **Python Tag** : 'py27', 'cp33'
*   **ABI Tag** : 'cp32dmu', 'none'
*   **Platform Tag** : 'linux_x86_64', 'any'

예를 들어, `py27-none-any` 태그는 Python 2.7 (어떤 Python 2.7 구현체든)과 호환되며, ABI 요구사항이 없고, 어떤 플랫폼에서든 작동함을 나타냅니다.

Wheel 빌드 패키지 형식은 `.{distribution}-{version}(-{build tag})?-{python tag}-{abi tag}-{platform tag}.whl` 형태의 파일명에 이 태그들을 포함합니다. 다른 패키지 형식은 자체적인 규칙을 가질 수 있습니다.

## 상세 정보 (Details)

### Python Tag
Python Tag는 배포판이 요구하는 구현체와 버전을 나타냅니다. 주요 구현체에는 다음과 같은 약어 코드가 부여됩니다.

*   `py`: Generic Python (구현체별 특정 기능을 요구하지 않음)
*   `cp`: CPython
*   `ip`: IronPython
*   `pp`: PyPy
*   `jy`: Jython

다른 Python 구현체는 `sys.implementation.name`을 사용해야 합니다.

버전은 `py_version_nodot` 형식으로 표현됩니다. CPython은 점(.) 없이 사용하지만, 필요한 경우 밑줄(`_`)을 대신 사용합니다. PyPy는 `pp18`, `pp19`와 같이 자체 버전을 사용할 수 있습니다.

많은 순수 Python 배포판의 경우, 버전은 `py2` 또는 `py3`와 같이 주(major) 버전만으로 구성될 수 있습니다.

**중요** : `py2`, `py3`와 같은 주 버전만 있는 태그는 `py20`, `py30`의 축약어가 아닙니다. 대신, 이 태그들은 패키지 제작자가 의도적으로 여러 버전에 걸쳐 호환되는 배포판을 릴리스했음을 의미합니다.

단일 소스로 Python 2/3 호환 배포판을 만드는 경우 `py2.py3`와 같은 복합 태그를 사용할 수 있습니다. (아래 "압축된 태그 세트" 참조)

### ABI Tag
ABI (Application Binary Interface) 태그는 포함된 확장 모듈이 요구하는 Python ABI를 나타냅니다. 구현체별 ABI의 경우, Python Tag와 동일한 방식으로 구현체가 약어로 표시됩니다. 예를 들어, `cp33d`는 디버깅이 포함된 CPython 3.3 ABI를 의미합니다.

CPython의 안정적인 ABI는 공유 라이브러리 접미사처럼 `abi3` 입니다.

ABI가 매우 불안정한 구현체는 소스 코드 리비전 및 컴파일러 플래그 등의 SHA-256 해시 값의 처음 6바이트 (Base64로 인코딩된 8자)를 사용할 수 있지만, 바이너리 배포판을 배포할 필요성은 크지 않을 것입니다. 각 구현체의 커뮤니티는 ABI 태그를 가장 잘 사용하는 방법을 결정할 수 있습니다.

### Platform Tag
플랫폼 태그는 `distutils.util.get_platform()`의 결과에서 모든 하이픈 (`-`)과 마침표 (`.`)를 밑줄 (`_`)로 대체한 것입니다.

*   `win32`
*   `linux_i386`
*   `linux_x86_64`

### 태그 사용 (Use)
설치 프로그램은 잠재적인 빌드된 배포판 목록에서 어떤 것을 다운로드할지 결정하기 위해 이 태그들을 사용합니다. 설치 프로그램은 자신이 지원할 `(pyver, abi, arch)` 튜플 목록을 유지합니다. 빌드된 배포판의 태그가 이 목록에 있으면 설치할 수 있습니다.

설치 프로그램은 기본적으로 사용 가능한 가장 완전한 기능의 빌드된 배포판 (설치 환경에 가장 특정한 버전)을 선택하고, 그 다음으로 오래된 Python 릴리스용으로 발행된 순수 Python 버전을 사용하는 것을 권장합니다. 설치 프로그램은 또한 허용되는 호환성 태그 목록을 구성하고 재정렬하는 방법을 제공하는 것이 권장됩니다. 예를 들어, 사용자는 순수 Python으로 광고되는 빌드 패키지만 다운로드하기 위해 `*-none-any` 태그만 허용할 수 있습니다.

또 다른 바람직한 설치 프로그램 기능은 호환되지만 레거시인 사전 빌드된 옵션보다 "가능하면 소스에서 다시 컴파일"하는 것을 더 선호하도록 포함하는 것입니다.

다음은 `linux_x86_64` 시스템에서 CPython 3.3으로 실행되는 설치 프로그램을 위한 예시 목록입니다. 이 목록은 가장 선호되는 (현재 Python 버전용으로 빌드된 컴파일된 확장 모듈이 있는 배포판) 것부터 가장 덜 선호되는 (오래된 Python 버전으로 빌드된 순수 Python 배포판) 것 순서입니다.

*   `cp33-cp33m-linux_x86_64`
*   `cp33-abi3-linux_x86_64`
*   `cp3-abi3-linux_x86_64`
*   `cp33-none-linux_x86_64`\*
*   `cp3-none-linux_x86_64`\*
*   `py33-none-linux_x86_64`\*
*   `py3-none-linux_x86_64`\*
*   `cp33-none-any`
*   `cp3-none-any`
*   `py33-none-any`
*   `py3-none-any`
*   `py32-none-any`
*   `py31-none-any`
*   `py30-none-any`

빌드된 배포판은 C 확장 외의 이유로 플랫폼에 따라 달라질 수 있습니다. 예를 들어, 서브프로세스로 호출되는 네이티브 실행 파일을 포함하는 경우가 있습니다.

때로는 특정 패키지 버전에 대해 하나 이상의 지원되는 빌드된 배포판이 있을 수 있습니다. 예를 들어, 패키지 제작자는 선택적 C 확장 기능을 포함하는 `cp33-abi3-linux_x86_64` 태그가 지정된 패키지와, C 확장이 없는 동일한 배포판을 `py3-none-any`로 태그하여 릴리스할 수 있습니다. 지원되는 태그 목록의 태그 인덱스가 동점일 경우, C 확장이 있는 패키지가 목록에 먼저 나타나기 때문에 확장이 없는 패키지보다 우선하여 설치됩니다.

### 압축된 태그 세트 (Compressed Tag Sets)
하나 이상의 호환성 태그 트리플과 작동하는 `bdist` (빌드된 배포판)의 파일명을 간결하게 만들기 위해, 파일명에 있는 각 태그는 마침표(`.'`)로 구분되고 정렬된 태그 세트가 될 수 있습니다. 예를 들어, 동일한 소스 코드로 Python 2와 3에서 실행되도록 작성된 순수 Python 패키지인 `pip`는 `py2.py3-none-any` 태그가 있는 `bdist`를 배포할 수 있습니다.

단순 태그의 전체 목록은 다음과 같이 확장됩니다.
```python
for x in pytag.split('.'):
    for y in abitag.split('.'):
        for z in archtag.split('.'):
            yield '-'.join((x, y, z))
```
이 방식을 구현하는 `bdist` 형식은 `bdist` 특정 메타데이터에 확장된 태그를 포함해야 합니다. 이 압축 방식은 지원되지 않는 태그와 "불가능한" 태그 (예: `cp33-cp31u-win64`)를 대량으로 생성할 수 있으므로, 신중하게 사용해야 합니다.

## FAQ (자주 묻는 질문)

*   **기본적으로 어떤 태그가 사용되나요?**
    도구는 기본적으로 가장 선호되는 아키텍처 의존적 태그 (예: `cp33-cp33m-win32`) 또는 가장 선호되는 순수 Python 태그 (예: `py33-none-any`)를 사용해야 합니다. 패키지 제작자가 기본값을 재정의하면, 이는 Python 간의 호환성을 제공하려는 의도를 나타냅니다.

*   **배포판이 최신 Python 버전 전용 기능을 사용하는 경우 어떤 태그를 사용해야 하나요?**
    호환성 태그는 설치 프로그램이 단일 배포판의 가장 호환되는 빌드를 선택하는 데 도움을 줍니다. 예를 들어, `beaglevote-1.2.0`에 Python 3.3 호환 빌드가 없는 경우 (Python 3.4 전용 기능을 사용하기 때문에), `py34-none-any` 태그 대신 `py3-none-any` 태그를 사용할 수 있습니다. Python 3.3 사용자는 호환되는 빌드를 얻기 위해 이전 릴리스 `beaglevote-1.1.0`과 같은 다른 한정자 (새 기능을 사용하지 않는)를 요구하는 것을 결합해야 합니다.

*   **Python 버전 번호에 마침표(`.`)가 없는 이유는 무엇인가요?**
    CPython은 3자리 주(major) 릴리스 없이 20년 이상 지속되었습니다. 이는 한동안 계속될 것입니다. 다른 구현체는 파일명 구성요소를 구분하는 데 하이픈 (`-`)과 마침표 (`.`)가 모두 사용되므로 밑줄 (`_`)을 구분자로 사용할 수 있습니다.

*   **하이픈 및 기타 비영숫자 문자를 밑줄로 정규화하는 이유는 무엇인가요?**
    파일명의 구성요소를 구분하는 데 사용되는 `.` 및 `-` 문자와 충돌을 피하고, 가장 광범위한 파일 시스템 제한 사항 (URL 경로에서 인용 부호 없이 사용 가능 포함)과 더 나은 호환성을 위해서입니다.

*   **`_` 또는 `-` 대신 특수 문자 `<X>`를 사용하지 않는 이유는 무엇인가요?**
    이는 해당 문자가 일부 컨텍스트에서 불편하거나 혼란을 줄 수 있기 때문입니다 (예: `+`는 URL에서 인용되어야 하고, `~`는 POSIX에서 사용자 홈 디렉터리를 나타내는 데 사용됨). 또는 PEP 427에 정의된 Wheel 형식의 기존 참조 구현을 변경할 만큼 장점이 충분히 설득력이 없었기 때문입니다 (예: 압축된 태그에서 구성요소를 구분하는 데 `.` 대신 `,`를 사용하는 것).

*   **약어 구현체 레지스트리는 누가 관리하나요?**
    새로운 두 글자 약어는 `python-dev` 메일링 리스트에서 요청할 수 있습니다. 일반적으로, 약어는 현재 가장 저명한 4가지 구현체에 예약됩니다.

*   **호환성 태그는 `METADATA` 또는 `PKG-INFO`에 들어가나요?**
    아닙니다. 호환성 태그는 빌드된 배포판의 메타데이터의 일부입니다. `METADATA` / `PKG-INFO`는 전체 배포판에 유효해야 하며, 해당 배포판의 단일 빌드에 대한 것이 아닙니다.

*   **제가 좋아하는 Python 구현체는 언급되지 않았나요?**
    약어 태그는 공개 인덱스에서 컴파일된 Python 코드를 공유하는 데 도움이 됩니다. 귀하의 Python 구현체도 이 규격을 사용할 수 있지만, 더 긴 태그를 사용해야 합니다. 모든 "순수 Python" 빌드된 배포판은 단순히 `py`를 사용한다는 점을 기억하세요.

*   **참조 구현에서 ABI 태그 (두 번째 태그)가 때때로 `none`인 이유는 무엇인가요?**
    Python 2는 `SOABI` (이 개념은 Python 3의 최신 버전에서 나옴)에 쉽게 접근할 수 있는 방법이 없기 때문에, 작성 시점의 참조 구현은 `none`으로 추측합니다. 이상적으로는 최신 Python 버전과 유사하게 `py27(d|m|u)`를 감지하겠지만, 그동안 `none`은 "모른다"는 것을 나타내는 충분히 좋은 방법입니다.

## 참고 자료 (References)
*   Egg Filename-Embedded Metadata (http://peak.telecommunity.com/DevCenter/EggFormats#filename-embedded-metadata)
*   Creating Built Distributions (https://docs.python.org/3.4/distutils/builtdist.html)

## 감사 (Acknowledgements)
저자는 Paul Moore, Alyssa Coghlan, Marc Abramowitz, 그리고 Mr. Michele Lacchia에게 그들의 귀중한 도움과 조언에 감사드립니다.

## 저작권 (Copyright)
이 문서는 공개 도메인으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.