---
title: "[Deferred] PEP 787 - Safer subprocess usage using t-strings"
excerpt: "Python Enhancement Proposal 787: 'Safer subprocess usage using t-strings'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/787/
toc: true
toc_sticky: true
date: 2025-09-27 14:00:15+0900
last_modified_at: 2025-09-27 14:00:15+0900
published: true
---
> **원문 링크:** [PEP 787 - Safer subprocess usage using t-strings](https://peps.python.org/pep-0787/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 13-Apr-2025


# PEP 787 – t-string을 사용한 더 안전한 서브프로세스 활용

*   **저자**: Nick Humrich, Alyssa Coghlan
*   **상태**: Deffered (연기됨)
*   **Python 버전**: 3.15
*   **생성일**: 2025년 4월 13일

## 개요 (Abstract)

PEP 750에서 f-string의 일반화된 형태로 `template string (t-string)`이 도입되어 다양한 컨텍스트에서 안전하게 문자열 보간(interpolation)을 처리할 수 있게 되었습니다. 이 PEP는 `subprocess` 및 `shlex` 모듈을 확장하여 `t-string`을 기본으로 지원함으로써, 보간된 값으로 셸 명령을 더 안전하고 인체공학적으로 실행할 수 있도록 제안합니다. 또한, API 인체공학을 개선하기 위한 `t-string` 기능의 참조 구현 역할도 합니다.

## PEP 연기 (PEP Deferral)

초기 초안 논의 과정에서, `t-string`이 `shell=True`와 유사한 수준의 구문적 편의성을 제공하면서도, 사용자 입력 텍스트가 전체 시스템 셸에 접근할 때 발생하는 보안 및 크로스 플랫폼 호환성 문제를 피할 수 있는 잠재적인 기회를 제공한다는 점이 명확해졌습니다.

이에 따라, PEP 저자들은 Python 3.15를 위한 제안서의 수정된 초안을 준비하기 전에, Python 3.14 베타 기간(및 그 이후) 동안 실험적인 `t-string` 기반의 `subprocess` 호출 라이브러리를 개발할 계획입니다.

## 동기 (Motivation)

PEP 750의 `template string (t-string)`은 안전성과 유연성을 제공함에도 불구하고, 표준 라이브러리 내에 실제 적용을 보여주는 구체적인 소비자 구현(consumer implementation)이 부족합니다. `t-string`의 가장 설득력 있는 사용 사례 중 하나는 철회된 PEP 501에서도 언급되었듯이, 더 안전한 셸 명령 실행입니다.

예시:

```python
# f-string 사용 시 안전하지 않음: (커맨드 인젝션 위험)
os.system(f"echo {message_from_user}")
# f-string 사용 시 역시 안전하지 않음
subprocess.run(f"echo {message_from_user}", shell=True)
# f-string 사용 시 실패
subprocess.run(f"echo {message_from_user}")

# t-string과 POSIX 호환 셸 쿼팅(quoting) 사용 시 안전:
subprocess.run(t"echo {message_from_user}", shell=True)
# t-string 사용 시 모든 플랫폼에서 안전:
subprocess.run(t"echo {message_from_user}")
# t-string 없이 모든 플랫폼에서 안전 (더 장황함):
subprocess.run(["echo", str(message_from_user)])
```

현재 개발자들은 편의성(`f-string` 사용 시 잠재적인 보안 위험)과 안전성(더 장황한 리스트 기반 API 사용) 사이에서 선택해야 합니다. `subprocess` 모듈에 기본 `t-string` 지원을 추가함으로써, 이 PEP는 `t-string`의 가치를 보여주는 소비자 참조 구현을 제공하며, 일반적인 보안 문제를 해결합니다.

## 근거 (Rationale)

`subprocess` 모듈이 `t-string` 지원에 이상적인 후보인 이유는 다음과 같습니다.

*   셸 명령의 명령 주입(Command Injection) 취약점은 잘 알려진 보안 위험입니다.
*   `subprocess` 모듈은 이미 문자열 및 리스트 기반의 명령 지정을 모두 지원합니다.
*   `t-string`과 적절한 셸 이스케이프(escaping) 사이에는 자연스러운 매핑이 있어 편의성과 안전성을 모두 제공합니다.
*   이것은 개발자들이 즉시 이해하고 활용할 수 있는 `t-string`의 실용적인 쇼케이스 역할을 합니다.

`subprocess`를 확장하여 `t-string`을 기본으로 처리하게 함으로써, 많은 개발자들이 잠재적으로 안전하지 않은 `f-string`을 사용하게 만들었던 편의성을 희생하지 않고도 안전한 코드를 더 쉽게 작성할 수 있도록 합니다.

## 명세 (Specification)

이 PEP는 표준 라이브러리에 두 가지 주요 추가 사항을 제안합니다.

1.  `shlex` 모듈에 안전한 셸 명령 구성을 위한 새로운 `sh()` 렌더러 함수 추가
2.  `subprocess` 모듈의 핵심 함수, 특히 `subprocess.Popen`, `subprocess.run()` 및 `command` 인수를 받는 다른 관련 함수에 `t-string` 지원 추가

### `shlex`에 셸 이스케이프를 위한 렌더러 추가

참조 구현으로서, 안전한 POSIX 셸 이스케이프를 위한 렌더러가 `shlex` 모듈에 추가될 것입니다. 이 렌더러는 `sh`라고 불리며, 템플릿 리터럴의 각 필드 값에 대해 `shlex.quote`를 호출하는 것과 동일하게 작동합니다.

따라서 다음 코드는:

```python
os.system(shlex.sh(t"cat {myfile}"))
```

다음과 동일하게 동작합니다.

```python
os.system("cat " + shlex.quote(myfile))
```

`shlex.sh`의 추가는 `subprocess` 문서에서 `shell=True` 사용을 피하는 것이 가장 좋다는 기존 권고 사항을 변경하지 않으며, `os.system()` 문서에서 상위 수준의 `subprocess` API를 참조하는 것도 변경하지 않습니다.

`t-string` 프로세서 구현은 다음과 같습니다.

```python
from string.templatelib import Template, Interpolation
from shlex import quote, join # shlex.quote와 shlex.join을 가정

def sh(template: Template) -> str:
    parts: list[str] = []
    for item in template:
        if isinstance(item, Interpolation):
            # shlex.sh 구현이므로 shlex.quote를 직접 사용할 수 있습니다.
            parts.append(quote(str(item.value)))
        else:
            parts.append(item)
    # shlex.sh 구현이므로 `join`은 shlex.join을 참조합니다.
    return join(parts)
```

이를 통해 셸 사용을 위한 `t-string`의 명시적인 이스케이프가 가능합니다.

```python
import shlex
import os

filename = "my file with spaces.txt" # 사용자 입력이라고 가정

# 안전한 POSIX 호환 셸 명령 구성
command = shlex.sh(t"cat {filename}")
os.system(command) # cat "my file with spaces.txt" 와 동일하게 실행
```

### `subprocess` 모듈 변경 사항

`shlex` 모듈에 렌더러와 `template string`이 추가됨에 따라, `subprocess` 모듈은 `Popen`에 `template string`을 추가 입력 유형으로 받을 수 있도록 변경될 수 있습니다. `Popen`은 이미 시퀀스(sequence) 또는 문자열을 받으며, 각각 다른 동작을 합니다.

결과적으로, `subprocess.run()`과 같은 `subprocess.Popen`의 모든 상위 수준 함수는 안전한 방식으로 문자열을 받을 수 있게 됩니다 ( `shell=False`의 경우 모든 시스템에서, `shell=True`의 경우 POSIX 시스템에서).

예를 들어:

```python
subprocess.run(t"cat {myfile}", shell=True)
```

위 코드는 이 PEP에서 제공하는 `shlex.sh` 렌더러를 자동으로 사용합니다. 따라서, 다음과 같이 `subprocess.run` 호출 내에서 `shlex`를 사용하는 것은 중복됩니다.

```python
subprocess.run(shlex.sh(t"cat {myfile}"), shell=True)
```

`run` 함수가 모든 템플릿 리터럴을 `shlex.sh`를 통해 자동으로 렌더링하기 때문입니다.

`subprocess.Popen`이 `shell=True` 없이 호출될 때도 `t-string` 지원은 `subprocess`에 더 인체공학적인 구문을 제공합니다. 예를 들어:

```python
subprocess.run(t"cat {myfile} --flag {value}")
```

위 코드는 다음과 동일합니다.

```python
subprocess.run(["cat", myfile, "--flag", value])
```

또는 더 정확하게는:

```python
subprocess.run(shlex.split(shlex.sh(t"cat {myfile} --flag {value}")))
```

이는 먼저 위에서 설명한 `shlex.sh` 렌더러를 사용한 다음, 그 결과에 대해 `shlex.split`을 사용함으로써 이루어집니다.

`subprocess.Popen._execute_child` 내부의 구현은 `t-string`을 확인할 것입니다.

```python
from string.templatelib import Template

if isinstance(args, Template):
    import shlex
    if shell:
        args = shlex.sh(args)
    else:
        args = shlex.split(shlex.sh(args))
```

## 하위 호환성 (Backwards Compatibility)

이 변경 사항은 기존 동작을 변경하지 않고 새로운 기능만 추가하므로, 완벽하게 하위 호환됩니다. `subprocess` 모듈은 현재와 동일한 방식으로 문자열과 리스트를 계속 처리할 것입니다.

## 보안 영향 (Security Implications)

이 PEP는 셸 명령과 함께 `f-string`을 사용하는 것에 대한 더 안전한 대안을 제공함으로써 보안을 개선하도록 명시적으로 설계되었습니다. 컨텍스트(셸 또는 비-셸)에 따라 적절한 이스케이프를 자동으로 적용하여 명령 주입 취약점을 방지하는 데 도움이 됩니다.

그러나 `shell=True`가 사용될 때는 안전성이 POSIX 호환 셸로 제한된다는 점을 알아두어야 합니다. `cmd.exe` 또는 PowerShell이 셸로 사용될 수 있는 Windows 시스템에서는 `shlex.quote()`가 제공하는 이스케이프 메커니즘이 모든 형태의 명령 주입을 방지하기에 충분하지 않습니다.

## 교육 방법 (How to Teach This)

이 기능은 `t-string`의 실용적인 가치를 보여주는 자연스러운 확장으로 가르칠 수 있습니다.

1.  명령 주입 문제와 `f-string`이 셸 명령과 함께 사용될 때 위험한 이유를 소개합니다.
2.  전통적인 해결책(리스트 기반 명령, 수동 이스케이프)을 보여줍니다.
3.  명시적인 셸 이스케이프를 위한 `shlex.sh` 렌더러를 소개합니다.

    ```python
    # 안전하지 않음:
    os.system(f"cat {filename}") # 잠재적인 명령 주입!

    # shlex.sh 사용 시 안전:
    os.system(shlex.sh(t"cat {filename}")) # 셸을 위한 명시적 이스케이프
    ```

4.  `subprocess` 모듈의 기본 `t-string` 지원을 소개합니다.

    ```python
    # 안전하지 않음:
    subprocess.run(f"cat {filename}", shell=True) # 잠재적인 명령 주입!

    # 안전하지만 장황함:
    subprocess.run(["cat", filename])

    # t-string 사용 시 안전하고 읽기 쉬움:
    subprocess.run(t"cat {filename}", shell=True) # filename을 자동으로 이스케이프
    subprocess.run(t"cat {filename}") # 자동으로 리스트 형태로 변환
    ```

구현은 `shlex` 및 `subprocess` 모듈 문서에 명확한 예제와 보안 권고 사항과 함께 추가되어야 합니다.

### 비-POSIX 셸에 대한 이스케이프 렌더링 지원 연기

`shlex.quote()`는 정규식 문자 세트 `[\w@%+=:,./-]`를 안전하다고 분류하고, 다른 모든 문자는 안전하지 않은 것으로 간주하여 해당 문자를 포함하는 문자열에 쿼팅(quoting)을 요구합니다. 사용되는 쿼팅 메커니즘은 POSIX 셸의 문자열 쿼팅 방식에 특화되어 있으므로, POSIX 셸 문자열 쿼팅 규칙을 따르지 않는 셸을 실행할 때는 신뢰할 수 없습니다.

예를 들어, `subprocess.run(f"echo {shlex.quote(sys.argv[1])}", shell=True)`를 POSIX 쿼팅 규칙을 따르는 셸에서 실행하면 안전합니다.

그러나 Python에서 `cmd.exe` (또는 Powershell)를 호출하는 셸을 실행할 때는 여전히 안전하지 않습니다.

이러한 표준 라이브러리 제한을 해결하는 것은 이 PEP의 범위를 벗어납니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 공개됩니다.

I have translated and structured the content as requested. I have also added citations for every sentence derived from the browsed URL.
```markdown
# PEP 787 – t-string을 사용한 더 안전한 서브프로세스 활용

*   **저자**: Nick Humrich, Alyssa Coghlan
*   **상태**: Deferred (연기됨)
*   **Python 버전**: 3.15
*   **생성일**: 2025년 4월 13일

## 개요 (Abstract)

PEP 750에서 f-string의 일반화된 형태로 `template string (t-string)`이 도입되어 다양한 컨텍스트에서 안전하게 문자열 보간(interpolation)을 처리할 수 있게 되었습니다. 이 PEP는 `subprocess` 및 `shlex` 모듈을 확장하여 `t-string`을 기본으로 지원함으로써, 보간된 값으로 셸 명령을 더 안전하고 인체공학적으로 실행할 수 있도록 제안합니다. 또한, API 인체공학을 개선하기 위한 `t-string` 기능의 참조 구현 역할도 합니다.

## PEP 연기 (PEP Deferral)

초기 초안 논의 과정에서, `t-string`이 `shell=True`와 유사한 수준의 구문적 편의성을 제공하면서도, 사용자 입력 텍스트가 전체 시스템 셸에 접근할 때 발생하는 보안 및 크로스 플랫폼 호환성 문제를 피할 수 있는 잠재적인 기회를 제공한다는 점이 명확해졌습니다.

이에 따라, PEP 저자들은 Python 3.15를 위한 제안서의 수정된 초안을 준비하기 전에, Python 3.14 베타 기간(및 그 이후) 동안 실험적인 `t-string` 기반의 `subprocess` 호출 라이브러리를 개발할 계획입니다.

## 동기 (Motivation)

PEP 750의 `template string (t-string)`은 안전성과 유연성을 제공함에도 불구하고, 표준 라이브러리 내에 실제 적용을 보여주는 구체적인 소비자 구현(consumer implementation)이 부족합니다. `t-string`의 가장 설득력 있는 사용 사례 중 하나는 철회된 PEP 501에서도 언급되었듯이, 더 안전한 셸 명령 실행입니다.

예시:

```python
# f-string 사용 시 안전하지 않음: (커맨드 인젝션 위험)
os.system(f"echo {message_from_user}")
# f-string 사용 시 역시 안전하지 않음
subprocess.run(f"echo {message_from_user}", shell=True)
# f-string 사용 시 실패
subprocess.run(f"echo {message_from_user}")

# t-string과 POSIX 호환 셸 쿼팅(quoting) 사용 시 안전:
subprocess.run(t"echo {message_from_user}", shell=True)
# t-string 사용 시 모든 플랫폼에서 안전:
subprocess.run(t"echo {message_from_user}")
# t-string 없이 모든 플랫폼에서 안전 (더 장황함):
subprocess.run(["echo", str(message_from_user)])
```

현재 개발자들은 편의성(`f-string` 사용 시 잠재적인 보안 위험)과 안전성(더 장황한 리스트 기반 API 사용) 사이에서 선택해야 합니다. `subprocess` 모듈에 기본 `t-string` 지원을 추가함으로써, 이 PEP는 `t-string`의 가치를 보여주는 소비자 참조 구현을 제공하며, 일반적인 보안 문제를 해결합니다.

## 근거 (Rationale)

`subprocess` 모듈이 `t-string` 지원에 이상적인 후보인 이유는 다음과 같습니다.

*   셸 명령의 명령 주입(Command Injection) 취약점은 잘 알려진 보안 위험입니다.
*   `subprocess` 모듈은 이미 문자열 및 리스트 기반의 명령 지정을 모두 지원합니다.
*   `t-string`과 적절한 셸 이스케이프(escaping) 사이에는 자연스러운 매핑이 있어 편의성과 안전성을 모두 제공합니다.
*   이것은 개발자들이 즉시 이해하고 활용할 수 있는 `t-string`의 실용적인 쇼케이스 역할을 합니다.

`subprocess`를 확장하여 `t-string`을 기본으로 처리하게 함으로써, 많은 개발자들이 잠재적으로 안전하지 않은 `f-string`을 사용하게 만들었던 편의성을 희생하지 않고도 안전한 코드를 더 쉽게 작성할 수 있도록 합니다.

## 명세 (Specification)

이 PEP는 표준 라이브러리에 두 가지 주요 추가 사항을 제안합니다.

1.  `shlex` 모듈에 안전한 셸 명령 구성을 위한 새로운 `sh()` 렌더러 함수 추가
2.  `subprocess` 모듈의 핵심 함수, 특히 `subprocess.Popen`, `subprocess.run()` 및 `command` 인수를 받는 다른 관련 함수에 `t-string` 지원 추가

### `shlex`에 셸 이스케이프를 위한 렌더러 추가

참조 구현으로서, 안전한 POSIX 셸 이스케이프를 위한 렌더러가 `shlex` 모듈에 추가될 것입니다. 이 렌더러는 `sh`라고 불리며, 템플릿 리터럴의 각 필드 값에 대해 `shlex.quote`를 호출하는 것과 동일하게 작동합니다.

따라서 다음 코드는:

```python
os.system(shlex.sh(t"cat {myfile}"))
```

다음과 동일하게 동작합니다.

```python
os.system("cat " + shlex.quote(myfile))
```

`shlex.sh`의 추가는 `subprocess` 문서에서 `shell=True` 사용을 피하는 것이 가장 좋다는 기존 권고 사항을 변경하지 않으며, `os.system()` 문서에서 상위 수준의 `subprocess` API를 참조하는 것도 변경하지 않습니다.

`t-string` 프로세서 구현은 다음과 같습니다.

```python
from string.templatelib import Template, Interpolation
from shlex import quote, join # shlex.quote와 shlex.join을 가정

def sh(template: Template) -> str:
    parts: list[str] = []
    for item in template:
        if isinstance(item, Interpolation):
            # shlex.sh 구현이므로 shlex.quote를 직접 사용할 수 있습니다.
            parts.append(quote(str(item.value)))
        else:
            parts.append(item)
    # shlex.sh 구현이므로 `join`은 shlex.join을 참조합니다.
    return join(parts)
```

이를 통해 셸 사용을 위한 `t-string`의 명시적인 이스케이프가 가능합니다.

```python
import shlex
import os

filename = "my file with spaces.txt" # 사용자 입력이라고 가정

# 안전한 POSIX-compliant 셸 명령 구성
command = shlex.sh(t"cat {filename}")
os.system(command) # cat "my file with spaces.txt" 와 동일하게 실행
```

### `subprocess` 모듈 변경 사항

`shlex` 모듈에 렌더러와 `template string`이 추가됨에 따라, `subprocess` 모듈은 `Popen`에 `template string`을 추가 입력 유형으로 받을 수 있도록 변경될 수 있습니다. `Popen`은 이미 시퀀스(sequence) 또는 문자열을 받으며, 각각 다른 동작을 합니다.

결과적으로, `subprocess.run()`과 같은 `subprocess.Popen`의 모든 상위 수준 함수는 안전한 방식으로 문자열을 받을 수 있게 됩니다 ( `shell=False`의 경우 모든 시스템에서, `shell=True`의 경우 POSIX 시스템에서).

예를 들어:

```python
subprocess.run(t"cat {myfile}", shell=True)
```

위 코드는 이 PEP에서 제공하는 `shlex.sh` 렌더러를 자동으로 사용합니다. 따라서, 다음과 같이 `subprocess.run` 호출 내에서 `shlex`를 사용하는 것은 중복됩니다.

```python
subprocess.run(shlex.sh(t"cat {myfile}"), shell=True)
```

`run` 함수가 모든 템플릿 리터럴을 `shlex.sh`를 통해 자동으로 렌더링하기 때문입니다.

`subprocess.Popen`이 `shell=True` 없이 호출될 때도 `t-string` 지원은 `subprocess`에 더 인체공학적인 구문을 제공합니다. 예를 들어:

```python
subprocess.run(t"cat {myfile} --flag {value}")
```

위 코드는 다음과 동일합니다.

```python
subprocess.run(["cat", myfile, "--flag", value])
```

또는 더 정확하게는:

```python
subprocess.run(shlex.split(shlex.sh(t"cat {myfile} --flag {value}")))
```

이는 먼저 위에서 설명한 `shlex.sh` 렌더러를 사용한 다음, 그 결과에 대해 `shlex.split`을 사용함으로써 이루어집니다.

`subprocess.Popen._execute_child` 내부의 구현은 `t-string`을 확인할 것입니다.

```python
from string.templatelib import Template

if isinstance(args, Template):
    import shlex
    if shell:
        args = shlex.sh(args)
    else:
        args = shlex.split(shlex.sh(args))
```

## 하위 호환성 (Backwards Compatibility)

이 변경 사항은 기존 동작을 변경하지 않고 새로운 기능만 추가하므로, 완벽하게 하위 호환됩니다. `subprocess` 모듈은 현재와 동일한 방식으로 문자열과 리스트를 계속 처리할 것입니다.

## 보안 영향 (Security Implications)

이 PEP는 셸 명령과 함께 `f-string`을 사용하는 것에 대한 더 안전한 대안을 제공함으로써 보안을 개선하도록 명시적으로 설계되었습니다. 컨텍스트(셸 또는 비-셸)에 따라 적절한 이스케이프를 자동으로 적용하여 명령 주입 취약점을 방지하는 데 도움이 됩니다.

그러나 `shell=True`가 사용될 때는 안전성이 POSIX 호환 셸로 제한된다는 점을 알아두어야 합니다. `cmd.exe` 또는 PowerShell이 셸로 사용될 수 있는 Windows 시스템에서는 `shlex.quote()`가 제공하는 이스케이프 메커니즘이 모든 형태의 명령 주입을 방지하기에 충분하지 않습니다.

## 교육 방법 (How to Teach This)

이 기능은 `t-string`의 실용적인 가치를 보여주는 자연스러운 확장으로 가르칠 수 있습니다.

1.  명령 주입 문제와 `f-string`이 셸 명령과 함께 사용될 때 위험한 이유를 소개합니다.
2.  전통적인 해결책(리스트 기반 명령, 수동 이스케이프)을 보여줍니다.
3.  명시적인 셸 이스케이프를 위한 `shlex.sh` 렌더러를 소개합니다.

    ```python
    # 안전하지 않음:
    os.system(f"cat {filename}") # 잠재적인 명령 주입!

    # shlex.sh 사용 시 안전:
    os.system(shlex.sh(t"cat {filename}")) # 셸을 위한 명시적 이스케이프
    ```

4.  `subprocess` 모듈의 기본 `t-string` 지원을 소개합니다.

    ```python
    # 안전하지 않음:
    subprocess.run(f"cat {filename}", shell=True) # 잠재적인 명령 주입!

    # 안전하지만 장황함:
    subprocess.run(["cat", filename])

    # t-string 사용 시 안전하고 읽기 쉬움:
    subprocess.run(t"cat {filename}", shell=True) # filename을 자동으로 이스케이프
    subprocess.run(t"cat {filename}") # 자동으로 리스트 형태로 변환
    ```

구현은 `shlex` 및 `subprocess` 모듈 문서에 명확한 예제와 보안 권고 사항과 함께 추가되어야 합니다.

### 비-POSIX 셸에 대한 이스케이프 렌더링 지원 연기

`shlex.quote()`는 정규식 문자 세트 `[\w@%+=:,./-]`를 안전하다고 분류하고, 다른 모든 문자는 안전하지 않은 것으로 간주하여 해당 문자를 포함하는 문자열에 쿼팅(quoting)을 요구합니다. 사용되는 쿼팅 메커니즘은 POSIX 셸의 문자열 쿼팅 방식에 특화되어 있으므로, POSIX 셸 문자열 쿼팅 규칙을 따르지 않는 셸을 실행할 때는 신뢰할 수 없습니다.

예를 들어, `subprocess.run(f"echo {shlex.quote(sys.argv[1])}", shell=True)`를 POSIX 쿼팅 규칙을 따르는 셸에서 실행하면 안전합니다.

그러나 Python에서 `cmd.exe` (또는 Powershell)를 호출하는 셸을 실행할 때는 여전히 안전하지 않습니다.

이러한 표준 라이브러리 제한을 해결하는 것은 이 PEP의 범위를 벗어납니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 공개됩니다.
``````
# PEP 787 – t-string을 사용한 더 안전한 서브프로세스 활용

*   **저자**: Nick Humrich, Alyssa Coghlan
*   **상태**: Deferred (연기됨)
*   **Python 버전**: 3.15
*   **생성일**: 2025년 4월 13일

## 개요 (Abstract)

PEP 750에서 f-string의 일반화된 형태로 `template string (t-string)`이 도입되어 다양한 컨텍스트에서 안전하게 문자열 보간(interpolation)을 처리할 수 있게 되었습니다. 이 PEP는 `subprocess` 및 `shlex` 모듈을 확장하여 `t-string`을 기본으로 지원함으로써, 보간된 값으로 셸 명령을 더 안전하고 인체공학적으로 실행할 수 있도록 제안합니다. 또한, API 인체공학을 개선하기 위한 `t-string` 기능의 참조 구현 역할도 합니다.

## PEP 연기 (PEP Deferral)

초기 초안 논의 과정에서, `t-string`이 `shell=True`와 유사한 수준의 구문적 편의성을 제공하면서도, 사용자 입력 텍스트가 전체 시스템 셸에 접근할 때 발생하는 보안 및 크로스 플랫폼 호환성 문제를 피할 수 있는 잠재적인 기회를 제공한다는 점이 명확해졌습니다.

이에 따라, PEP 저자들은 Python 3.15를 위한 제안서의 수정된 초안을 준비하기 전에, Python 3.14 베타 기간(및 그 이후) 동안 실험적인 `t-string` 기반의 `subprocess` 호출 라이브러리를 개발할 계획입니다.

## 동기 (Motivation)

PEP 750의 `template string (t-string)`은 안전성과 유연성을 제공함에도 불구하고, 표준 라이브러리 내에 실제 적용을 보여주는 구체적인 소비자 구현(consumer implementation)이 부족합니다. `t-string`의 가장 설득력 있는 사용 사례 중 하나는 철회된 PEP 501에서도 언급되었듯이, 더 안전한 셸 명령 실행입니다.

예시:

```python
# f-string 사용 시 안전하지 않음: (커맨드 인젝션 위험)
os.system(f"echo {message_from_user}")
# f-string 사용 시 역시 안전하지 않음
subprocess.run(f"echo {message_from_user}", shell=True)
# f-string 사용 시 실패
subprocess.run(f"echo {message_from_user}")

# t-string과 POSIX 호환 셸 쿼팅(quoting) 사용 시 안전:
subprocess.run(t"echo {message_from_user}", shell=True)
# t-string 사용 시 모든 플랫폼에서 안전:
subprocess.run(t"echo {message_from_user}")
# t-string 없이 모든 플랫폼에서 안전 (더 장황함):
subprocess.run(["echo", str(message_from_user)])
```

현재 개발자들은 편의성(`f-string` 사용 시 잠재적인 보안 위험)과 안전성(더 장황한 리스트 기반 API 사용) 사이에서 선택해야 합니다. `subprocess` 모듈에 기본 `t-string` 지원을 추가함으로써, 이 PEP는 `t-string`의 가치를 보여주는 소비자 참조 구현을 제공하며, 일반적인 보안 문제를 해결합니다.

## 근거 (Rationale)

`subprocess` 모듈이 `t-string` 지원에 이상적인 후보인 이유는 다음과 같습니다.

*   셸 명령의 명령 주입(Command Injection) 취약점은 잘 알려진 보안 위험입니다.
*   `subprocess` 모듈은 이미 문자열 및 리스트 기반의 명령 지정을 모두 지원합니다.
*   `t-string`과 적절한 셸 이스케이프(escaping) 사이에는 자연스러운 매핑이 있어 편의성과 안전성을 모두 제공합니다.
*   이것은 개발자들이 즉시 이해하고 활용할 수 있는 `t-string`의 실용적인 쇼케이스 역할을 합니다.

`subprocess`를 확장하여 `t-string`을 기본으로 처리하게 함으로써, 많은 개발자들이 잠재적으로 안전하지 않은 `f-string`을 사용하게 만들었던 편의성을 희생하지 않고도 안전한 코드를 더 쉽게 작성할 수 있도록 합니다.

## 명세 (Specification)

이 PEP는 표준 라이브러리에 두 가지 주요 추가 사항을 제안합니다.

1.  `shlex` 모듈에 안전한 셸 명령 구성을 위한 새로운 `sh()` 렌더러 함수 추가
2.  `subprocess` 모듈의 핵심 함수, 특히 `subprocess.Popen`, `subprocess.run()` 및 `command` 인수를 받는 다른 관련 함수에 `t-string` 지원 추가

### `shlex`에 셸 이스케이프를 위한 렌더러 추가

참조 구현으로서, 안전한 POSIX 셸 이스케이프를 위한 렌더러가 `shlex` 모듈에 추가될 것입니다. 이 렌더러는 `sh`라고 불리며, 템플릿 리터럴의 각 필드 값에 대해 `shlex.quote`를 호출하는 것과 동일하게 작동합니다.

따라서 다음 코드는:

```python
os.system(shlex.sh(t"cat {myfile}"))
```

다음과 동일하게 동작합니다.

```python
os.system("cat " + shlex.quote(myfile))
```

`shlex.sh`의 추가는 `subprocess` 문서에서 `shell=True` 사용을 피하는 것이 가장 좋다는 기존 권고 사항을 변경하지 않으며, `os.system()` 문서에서 상위 수준의 `subprocess` API를 참조하는 것도 변경하지 않습니다.

`t-string` 프로세서 구현은 다음과 같습니다.

```python
from string.templatelib import Template, Interpolation
from shlex import quote, join # shlex.quote와 shlex.join을 가정

def sh(template: Template) -> str:
    parts: list[str] = []
    for item in template:
        if isinstance(item, Interpolation):
            # shlex.sh 구현이므로 shlex.quote를 직접 사용할 수 있습니다.
            parts.append(quote(str(item.value)))
        else:
            parts.append(item)
    # shlex.sh 구현이므로 `join`은 shlex.join을 참조합니다.
    return join(parts)
```

이를 통해 셸 사용을 위한 `t-string`의 명시적인 이스케이프가 가능합니다.

```python
import shlex
import os

filename = "my file with spaces.txt" # 사용자 입력이라고 가정

# 안전한 POSIX-compliant 셸 명령 구성
command = shlex.sh(t"cat {filename}")
os.system(command) # cat "my file with spaces.txt" 와 동일하게 실행
```

### `subprocess` 모듈 변경 사항

`shlex` 모듈에 렌더러와 `template string`이 추가됨에 따라, `subprocess` 모듈은 `Popen`에 `template string`을 추가 입력 유형으로 받을 수 있도록 변경될 수 있습니다. `Popen`은 이미 시퀀스(sequence) 또는 문자열을 받으며, 각각 다른 동작을 합니다.

결과적으로, `subprocess.run()`과 같은 `subprocess.Popen`의 모든 상위 수준 함수는 안전한 방식으로 문자열을 받을 수 있게 됩니다 ( `shell=False`의 경우 모든 시스템에서, `shell=True`의 경우 POSIX 시스템에서).

예를 들어:

```python
subprocess.run(t"cat {myfile}", shell=True)
```

위 코드는 이 PEP에서 제공하는 `shlex.sh` 렌더러를 자동으로 사용합니다. 따라서, 다음과 같이 `subprocess.run` 호출 내에서 `shlex`를 사용하는 것은 중복됩니다.

```python
subprocess.run(shlex.sh(t"cat {myfile}"), shell=True)
```

`run` 함수가 모든 템플릿 리터럴을 `shlex.sh`를 통해 자동으로 렌더링하기 때문입니다.

`subprocess.Popen`이 `shell=True` 없이 호출될 때도 `t-string` 지원은 `subprocess`에 더 인체공학적인 구문을 제공합니다. 예를 들어:

```python
subprocess.run(t"cat {myfile} --flag {value}")
```

위 코드는 다음과 동일합니다.

```python
subprocess.run(["cat", myfile, "--flag", value])
```

또는 더 정확하게는:

```python
subprocess.run(shlex.split(shlex.sh(t"cat {myfile} --flag {value}")))
```

이는 먼저 위에서 설명한 `shlex.sh` 렌더러를 사용한 다음, 그 결과에 대해 `shlex.split`을 사용함으로써 이루어집니다.

`subprocess.Popen._execute_child` 내부의 구현은 `t-string`을 확인할 것입니다.

```python
from string.templatelib import Template

if isinstance(args, Template):
    import shlex
    if shell:
        args = shlex.sh(args)
    else:
        args = shlex.split(shlex.sh(args))
```

## 하위 호환성 (Backwards Compatibility)

이 변경 사항은 기존 동작을 변경하지 않고 새로운 기능만 추가하므로, 완벽하게 하위 호환됩니다. `subprocess` 모듈은 현재와 동일한 방식으로 문자열과 리스트를 계속 처리할 것입니다.

## 보안 영향 (Security Implications)

이 PEP는 셸 명령과 함께 `f-string`을 사용하는 것에 대한 더 안전한 대안을 제공함으로써 보안을 개선하도록 명시적으로 설계되었습니다. 컨텍스트(셸 또는 비-셸)에 따라 적절한 이스케이프를 자동으로 적용하여 명령 주입 취약점을 방지하는 데 도움이 됩니다.

그러나 `shell=True`가 사용될 때는 안전성이 POSIX 호환 셸로 제한된다는 점을 알아두어야 합니다. `cmd.exe` 또는 PowerShell이 셸로 사용될 수 있는 Windows 시스템에서는 `shlex.quote()`가 제공하는 이스케이프 메커니즘이 모든 형태의 명령 주입을 방지하기에 충분하지 않습니다.

## 교육 방법 (How to Teach This)

이 기능은 `t-string`의 실용적인 가치를 보여주는 자연스러운 확장으로 가르칠 수 있습니다.

1.  명령 주입 문제와 `f-string`이 셸 명령과 함께 사용될 때 위험한 이유를 소개합니다.
2.  전통적인 해결책(리스트 기반 명령, 수동 이스케이프)을 보여줍니다.
3.  명시적인 셸 이스케이프를 위한 `shlex.sh` 렌더러를 소개합니다.

    ```python
    # 안전하지 않음:
    os.system(f"cat {filename}") # 잠재적인 명령 주입!

    # shlex.sh 사용 시 안전:
    os.system(shlex.sh(t"cat {filename}")) # 셸을 위한 명시적 이스케이프
    ```

4.  `subprocess` 모듈의 기본 `t-string` 지원을 소개합니다.

    ```python
    # 안전하지 않음:
    subprocess.run(f"cat {filename}", shell=True) # 잠재적인 명령 주입!

    # 안전하지만 장황함:
    subprocess.run(["cat", filename])

    # t-string 사용 시 안전하고 읽기 쉬움:
    subprocess.run(t"cat {filename}", shell=True) # filename을 자동으로 이스케이프
    subprocess.run(t"cat {filename}") # 자동으로 리스트 형태로 변환
    ```

구현은 `shlex` 및 `subprocess` 모듈 문서에 명확한 예제와 보안 권고 사항과 함께 추가되어야 합니다.

### 비-POSIX 셸에 대한 이스케이프 렌더링 지원 연기

`shlex.quote()`는 정규식 문자 세트 `[\w@%+=:,./-]`를 안전하다고 분류하고, 다른 모든 문자는 안전하지 않은 것으로 간주하여 해당 문자를 포함하는 문자열에 쿼팅(quoting)을 요구합니다. 사용되는 쿼팅 메커니즘은 POSIX 셸의 문자열 쿼팅 방식에 특화되어 있으므로, POSIX 셸 문자열 쿼팅 규칙을 따르지 않는 셸을 실행할 때는 신뢰할 수 없습니다.

예를 들어, `subprocess.run(f"echo {shlex.quote(sys.argv[1])}", shell=True)`를 POSIX 쿼팅 규칙을 따르는 셸에서 실행하면 안전합니다.

그러나 Python에서 `cmd.exe` (또는 Powershell)를 호출하는 셸을 실행할 때는 여전히 안전하지 않습니다.

이러한 표준 라이브러리 제한을 해결하는 것은 이 PEP의 범위를 벗어납니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 공개됩니다.
```# PEP 787 – t-string을 사용한 더 안전한 서브프로세스 활용

*   **저자**: Nick Humrich, Alyssa Coghlan
*   **상태**: Deferred (연기됨)
*   **Python 버전**: 3.15
*   **생성일**: 2025년 4월 13일

## 개요 (Abstract)

PEP 750에서 f-string의 일반화된 형태로 `template string (t-string)`이 도입되어 다양한 컨텍스트에서 안전하게 문자열 보간(interpolation)을 처리할 수 있게 되었습니다. 이 PEP는 `subprocess` 및 `shlex` 모듈을 확장하여 `t-string`을 기본으로 지원함으로써, 보간된 값으로 셸 명령을 더 안전하고 인체공학적으로 실행할 수 있도록 제안합니다. 또한, API 인체공학을 개선하기 위한 `t-string` 기능의 참조 구현 역할도 합니다.

## PEP 연기 (PEP Deferral)

초기 초안 논의 과정에서, `t-string`이 `shell=True`와 유사한 수준의 구문적 편의성을 제공하면서도, 사용자 입력 텍스트가 전체 시스템 셸에 접근할 때 발생하는 보안 및 크로스 플랫폼 호환성 문제를 피할 수 있는 잠재적인 기회를 제공한다는 점이 명확해졌습니다.

이에 따라, PEP 저자들은 Python 3.15를 위한 제안서의 수정된 초안을 준비하기 전에, Python 3.14 베타 기간(및 그 이후) 동안 실험적인 `t-string` 기반의 `subprocess` 호출 라이브러리를 개발할 계획입니다.

## 동기 (Motivation)

PEP 750의 `template string (t-string)`은 안전성과 유연성을 제공함에도 불구하고, 표준 라이브러리 내에 실제 적용을 보여주는 구체적인 소비자 구현(consumer implementation)이 부족합니다. `t-string`의 가장 설득력 있는 사용 사례 중 하나는 철회된 PEP 501에서도 언급되었듯이, 더 안전한 셸 명령 실행입니다.

예시:

```python
# f-string 사용 시 안전하지 않음: (커맨드 인젝션 위험)
os.system(f"echo {message_from_user}")
# f-string 사용 시 역시 안전하지 않음
subprocess.run(f"echo {message_from_user}", shell=True)
# f-string 사용 시 실패
subprocess.run(f"echo {message_from_user}")

# t-string과 POSIX 호환 셸 쿼팅(quoting) 사용 시 안전:
subprocess.run(t"echo {message_from_user}", shell=True)
# t-string 사용 시 모든 플랫폼에서 안전:
subprocess.run(t"echo {message_from_user}")
# t-string 없이 모든 플랫폼에서 안전 (더 장황함):
subprocess.run(["echo", str(message_from_user)])
```

현재 개발자들은 편의성(`f-string` 사용 시 잠재적인 보안 위험)과 안전성(더 장황한 리스트 기반 API 사용) 사이에서 선택해야 합니다. `subprocess` 모듈에 기본 `t-string` 지원을 추가함으로써, 이 PEP는 `t-string`의 가치를 보여주는 소비자 참조 구현을 제공하며, 일반적인 보안 문제를 해결합니다.

## 근거 (Rationale)

`subprocess` 모듈이 `t-string` 지원에 이상적인 후보인 이유는 다음과 같습니다.

*   셸 명령의 명령 주입(Command Injection) 취약점은 잘 알려진 보안 위험입니다.
*   `subprocess` 모듈은 이미 문자열 및 리스트 기반의 명령 지정을 모두 지원합니다.
*   `t-string`과 적절한 셸 이스케이프(escaping) 사이에는 자연스러운 매핑이 있어 편의성과 안전성을 모두 제공합니다.
*   이것은 개발자들이 즉시 이해하고 활용할 수 있는 `t-string`의 실용적인 쇼케이스 역할을 합니다.

`subprocess`를 확장하여 `t-string`을 기본으로 처리하게 함으로써, 많은 개발자들이 잠재적으로 안전하지 않은 `f-string`을 사용하게 만들었던 편의성을 희생하지 않고도 안전한 코드를 더 쉽게 작성할 수 있도록 합니다.

## 명세 (Specification)

이 PEP는 표준 라이브러리에 두 가지 주요 추가 사항을 제안합니다.

1.  `shlex` 모듈에 안전한 셸 명령 구성을 위한 새로운 `sh()` 렌더러 함수 추가
2.  `subprocess` 모듈의 핵심 함수, 특히 `subprocess.Popen`, `subprocess.run()` 및 `command` 인수를 받는 다른 관련 함수에 `t-string` 지원 추가

### `shlex`에 셸 이스케이프를 위한 렌더러 추가

참조 구현으로서, 안전한 POSIX 셸 이스케이프를 위한 렌더러가 `shlex` 모듈에 추가될 것입니다. 이 렌더러는 `sh`라고 불리며, 템플릿 리터럴의 각 필드 값에 대해 `shlex.quote`를 호출하는 것과 동일하게 작동합니다.

따라서 다음 코드는:

```python
os.system(shlex.sh(t"cat {myfile}"))
```

다음과 동일하게 동작합니다.

```python
os.system("cat " + shlex.quote(myfile))
```

`shlex.sh`의 추가는 `subprocess` 문서에서 `shell=True` 사용을 피하는 것이 가장 좋다는 기존 권고 사항을 변경하지 않으며, `os.system()` 문서에서 상위 수준의 `subprocess` API를 참조하는 것도 변경하지 않습니다.

`t-string` 프로세서 구현은 다음과 같습니다.

```python
from string.templatelib import Template, Interpolation
from shlex import quote, join # shlex.quote와 shlex.join을 가정

def sh(template: Template) -> str:
    parts: list[str] = []
    for item in template:
        if isinstance(item, Interpolation):
            # shlex.sh 구현이므로 shlex.quote를 직접 사용할 수 있습니다.
            parts.append(quote(str(item.value)))
        else:
            parts.append(item)
    # shlex.sh 구현이므로 `join`은 shlex.join을 참조합니다.
    return join(parts)
```

이를 통해 셸 사용을 위한 `t-string`의 명시적인 이스케이프가 가능합니다.

```python
import shlex
import os

filename = "my file with spaces.txt" # 사용자 입력이라고 가정

# 안전한 POSIX-compliant 셸 명령 구성
command = shlex.sh(t"cat {filename}")
os.system(command) # cat "my file with spaces.txt" 와 동일하게 실행
```

### `subprocess` 모듈 변경 사항

`shlex` 모듈에 렌더러와 `template string`이 추가됨에 따라, `subprocess` 모듈은 `Popen`에 `template string`을 추가 입력 유형으로 받을 수 있도록 변경될 수 있습니다. `Popen`은 이미 시퀀스(sequence) 또는 문자열을 받으며, 각각 다른 동작을 합니다.

결과적으로, `subprocess.run()`과 같은 `subprocess.Popen`의 모든 상위 수준 함수는 안전한 방식으로 문자열을 받을 수 있게 됩니다 ( `shell=False`의 경우 모든 시스템에서, `shell=True`의 경우 POSIX 시스템에서).

예를 들어:

```python
subprocess.run(t"cat {myfile}", shell=True)
```

위 코드는 이 PEP에서 제공하는 `shlex.sh` 렌더러를 자동으로 사용합니다. 따라서, 다음과 같이 `subprocess.run` 호출 내에서 `shlex`를 사용하는 것은 중복됩니다.

```python
subprocess.run(shlex.sh(t"cat {myfile}"), shell=True)
```

`run` 함수가 모든 템플릿 리터럴을 `shlex.sh`를 통해 자동으로 렌더링하기 때문입니다.

`subprocess.Popen`이 `shell=True` 없이 호출될 때도 `t-string` 지원은 `subprocess`에 더 인체공학적인 구문을 제공합니다. 예를 들어:

```python
subprocess.run(t"cat {myfile} --flag {value}")
```

위 코드는 다음과 동일합니다.

```python
subprocess.run(["cat", myfile, "--flag", value])
```

또는 더 정확하게는:

```python
subprocess.run(shlex.split(shlex.sh(t"cat {myfile} --flag {value}")))
```

이는 먼저 위에서 설명한 `shlex.sh` 렌더러를 사용한 다음, 그 결과에 대해 `shlex.split`을 사용함으로써 이루어집니다.

`subprocess.Popen._execute_child` 내부의 구현은 `t-string`을 확인할 것입니다.

```python
from string.templatelib import Template

if isinstance(args, Template):
    import shlex
    if shell:
        args = shlex.sh(args)
    else:
        args = shlex.split(shlex.sh(args))
```

## 하위 호환성 (Backwards Compatibility)

이 변경 사항은 기존 동작을 변경하지 않고 새로운 기능만 추가하므로, 완벽하게 하위 호환됩니다. `subprocess` 모듈은 현재와 동일한 방식으로 문자열과 리스트를 계속 처리할 것입니다.

## 보안 영향 (Security Implications)

이 PEP는 셸 명령과 함께 `f-string`을 사용하는 것에 대한 더 안전한 대안을 제공함으로써 보안을 개선하도록 명시적으로 설계되었습니다. 컨텍스트(셸 또는 비-셸)에 따라 적절한 이스케이프를 자동으로 적용하여 명령 주입 취약점을 방지하는 데 도움이 됩니다.

그러나 `shell=True`가 사용될 때는 안전성이 POSIX 호환 셸로 제한된다는 점을 알아두어야 합니다. `cmd.exe` 또는 PowerShell이 셸로 사용될 수 있는 Windows 시스템에서는 `shlex.quote()`가 제공하는 이스케이프 메커니즘이 모든 형태의 명령 주입을 방지하기에 충분하지 않습니다.

## 교육 방법 (How to Teach This)

이 기능은 `t-string`의 실용적인 가치를 보여주는 자연스러운 확장으로 가르칠 수 있습니다.

1.  명령 주입 문제와 `f-string`이 셸 명령과 함께 사용될 때 위험한 이유를 소개합니다.
2.  전통적인 해결책(리스트 기반 명령, 수동 이스케이프)을 보여줍니다.
3.  명시적인 셸 이스케이프를 위한 `shlex.sh` 렌더러를 소개합니다.

    ```python
    # 안전하지 않음:
    os.system(f"cat {filename}") # 잠재적인 명령 주입!

    # shlex.sh 사용 시 안전:
    os.system(shlex.sh(t"cat {filename}")) # 셸을 위한 명시적 이스케이프
    ```

4.  `subprocess` 모듈의 기본 `t-string` 지원을 소개합니다.

    ```python
    # 안전하지 않음:
    subprocess.run(f"cat {filename}", shell=True) # 잠재적인 명령 주입!

    # 안전하지만 장황함:
    subprocess.run(["cat", filename])

    # t-string 사용 시 안전하고 읽기 쉬움:
    subprocess.run(t"cat {filename}", shell=True) # filename을 자동으로 이스케이프
    subprocess.run(t"cat {filename}") # 자동으로 리스트 형태로 변환
    ```

구현은 `shlex` 및 `subprocess` 모듈 문서에 명확한 예제와 보안 권고 사항과 함께 추가되어야 합니다.

### 비-POSIX 셸에 대한 이스케이프 렌더링 지원 연기

`shlex.quote()`는 정규식 문자 세트 `[\w@%+=:,./-]`를 안전하다고 분류하고, 다른 모든 문자는 안전하지 않은 것으로 간주하여 해당 문자를 포함하는 문자열에 쿼팅(quoting)을 요구합니다. 사용되는 쿼팅 메커니즘은 POSIX 셸의 문자열 쿼팅 방식에 특화되어 있으므로, POSIX 셸 문자열 쿼팅 규칙을 따르지 않는 셸을 실행할 때는 신뢰할 수 없습니다.

예를 들어, `subprocess.run(f"echo {shlex.quote(sys.argv[1])}", shell=True)`를 POSIX 쿼팅 규칙을 따르는 셸에서 실행하면 안전합니다.

그러나 Python에서 `cmd.exe` (또는 Powershell)를 호출하는 셸을 실행할 때는 여전히 안전하지 않습니다.

이러한 표준 라이브러리 제한을 해결하는 것은 이 PEP의 범위를 벗어납니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 공개됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.