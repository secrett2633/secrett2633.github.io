---
title: "[Final] PEP 328 - Imports: Multi-Line and Absolute/Relative"
excerpt: "Python Enhancement Proposal 328: 'Imports: Multi-Line and Absolute/Relative'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/328/
toc: true
toc_sticky: true
date: 2025-09-26 18:36:33+0900
last_modified_at: 2025-09-26 18:36:33+0900
published: true
---
> **원문 링크:** [PEP 328 - Imports: Multi-Line and Absolute/Relative](https://peps.python.org/pep-0328/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 21-Dec-2003



# PEP 328 – 임포트: 여러 줄 및 절대/상대 경로 (Imports: Multi-Line and Absolute/Relative)

*   **작성자:** Aahz
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2003년 12월 21일
*   **Python 버전:** 2.4, 2.5, 2.6
*   **배포 이력:** 2004년 3월 8일

## 요약 (Abstract)

`import` 문에는 두 가지 주요 문제점이 있었습니다:

1.  **긴 `import` 문:** 파이썬 스타일 가이드에 맞춰 작성하기 어렵고, 여러 가지 편법을 사용해야 했습니다.
2.  **패키지 내 모호성:** 패키지 내부에서 `import foo`가 해당 패키지 내의 모듈을 참조하는지, 아니면 패키지 외부에 있는 다른 모듈을 참조하는지 명확하지 않았습니다. 즉, 로컬 모듈이나 패키지가 `sys.path`에 직접 있는 다른 모듈을 가릴 수 있었습니다.

첫 번째 문제 해결을 위해, 여러 이름을 괄호로 묶어 파이썬의 표준 여러 줄 값 처리 메커니즘을 `import` 문에도 적용할 수 있도록 제안되었습니다.

두 번째 문제 해결을 위해, 모든 `import` 문은 기본적으로 절대 경로(기본적으로 `sys.path`만 검색)로 처리하고, 패키지 내 상대 경로 임포트를 위한 특별한 구문(선행 점)을 사용하도록 제안되었습니다.

## 타임라인 (Timeline)

*   **Python 2.5:** 새로운 절대 경로 임포트 동작을 `from __future__ import absolute_import`를 통해 활성화할 수 있었습니다. 상대 경로 임포트는 자유롭게 사용할 수 있었습니다.
*   **Python 2.6:** 패키지 내부(intra-package) 임포트로 해석되는 모든 `import` 문(상대 경로 임포트 구문을 사용하지 않은 `from <> import` 포함)은 `DeprecationWarning`을 발생시켰습니다.

## 괄호 사용 근거 (Rationale for Parentheses)

이전에는 하나의 모듈이나 패키지에서 많은 이름을 임포트해야 할 때 다음과 같은 불편한 선택지 중 하나를 골라야 했습니다:

*   역슬래시(`\`)를 사용하여 긴 한 줄로 작성하는 방법:
    ```python
    from Tkinter import Tk, Frame, Button, Entry, Canvas, Text, \
    LEFT, DISABLED, NORMAL, RIDGE, END
    ```
*   여러 개의 `import` 문을 사용하는 방법:
    ```python
    from Tkinter import Tk, Frame, Button, Entry, Canvas, Text
    from Tkinter import LEFT, DISABLED, NORMAL, RIDGE, END
    ```
    (`import *`는 좋은 선택지가 아닙니다.)

대신, 파이썬의 표준 그룹화 메커니즘인 괄호를 사용하여 `import` 문을 다음과 같이 작성할 수 있도록 제안되었습니다:

```python
from Tkinter import (Tk, Frame, Button, Entry, Canvas, Text,
LEFT, DISABLED, NORMAL, RIDGE, END)
```

이 제안의 일부는 처음부터 BDFL(Benevolent Dictator For Life, 귀도 반 로섬)의 승인을 받았습니다. 괄호 지원은 Python 2.4에 추가되었습니다.

## 절대 경로 임포트 근거 (Rationale for Absolute Imports)

Python 2.4 및 그 이전 버전에서는 패키지 내부에 있는 모듈을 읽을 때 `import foo`가 최상위 모듈을 참조하는지 아니면 패키지 내의 다른 모듈을 참조하는지 명확하지 않았습니다. 파이썬 라이브러리가 확장됨에 따라, 점점 더 많은 기존 패키지 내부 모듈이 우연히 표준 라이브러리 모듈을 가리는 문제가 발생했습니다. 특히 패키지 내부에서는 어떤 모듈을 의도하는지 지정할 방법이 없어 어려운 문제였습니다.

이러한 모호성을 해결하기 위해 `foo`는 항상 `sys.path`에서 접근 가능한 모듈 또는 패키지로 간주하도록 제안되었습니다. 이를 **절대 경로 임포트 (absolute import)**라고 합니다.

`python-dev` 커뮤니티는 절대 경로 임포트를 기본값으로 선택했습니다. 이는 절대 경로 임포트가 더 일반적인 사용 사례이며, 패키지 계층 구조에서 상위 부분의 이름을 변경하거나 한 패키지를 다른 패키지 안으로 이동할 때 어려움이 따르더라도, 상대 경로(패키지 내부) 임포트의 모든 기능을 제공할 수 있기 때문입니다.

이는 의미론의 변경을 나타내므로, Python 2.5와 2.6에서는 `from __future__ import absolute_import`를 통해 절대 경로 임포트를 선택적으로 사용할 수 있었습니다. 이 제안의 일부는 처음부터 BDFL의 승인을 받았습니다.

## 상대 경로 임포트 근거 (Rationale for Relative Imports)

절대 경로 임포트로의 전환과 함께, 상대 경로 임포트를 아예 허용해야 하는지에 대한 의문이 제기되었습니다. 몇 가지 사용 사례가 제시되었는데, 그중 가장 중요한 것은 하위 패키지를 수정하지 않고도 대규모 패키지의 구조를 재배치할 수 있어야 한다는 것이었습니다. 또한, 패키지 내부의 모듈은 상대 경로 임포트 없이는 자신을 쉽게 임포트할 수 없었습니다.

귀도 반 로섬은 상대 경로 임포트의 아이디어를 승인했지만, 구문(syntax)에 대해서는 많은 의견 불일치가 있었습니다. 상대 경로 임포트는 특정 이름을 나열하여 임포트해야 한다는 데에는 동의하는 것으로 보였습니다 (즉, `import foo`와 같은 단순한 형태는 항상 절대 경로 임포트가 됩니다).

### 제안되었던 구문들

여러 구문들이 경쟁했습니다:

*   **귀도의 제안:**
    ```python
    from .foo import bar
    from ...foo import bar
    ```
    이 두 가지 형태는 여러 의미론이 제안되었습니다. 각 점이 한 레벨을 나타내는 방식이 있었으나, 점을 세는 것이 어렵다는 불만이 많았습니다. 한 레벨의 상대 경로 임포트만 허용하는 옵션도 있었으나, 많은 기능이 누락되었고, 사람들은 한 점 형태에서도 점이 빠지는 것에 대해 여전히 불평했습니다. 마지막 옵션은 상대 모듈 및 패키지를 찾는 알고리즘을 정의하는 것이었는데, 이에 대한 반대는 "명시적인 것이 암시적인 것보다 낫다 (Explicit is better than implicit)"는 것이었습니다.

*   **다른 구분 기호:** "-" 또는 "^"와 같은 다른 구두점을 구분 기호로 사용하자는 제안도 있었습니다.

*   **"*" 사용:**
    ```python
    from *.foo import bar
    ```
    와 같이 "*"를 사용하자는 제안도 있었습니다.

*   **`__pkg__` 또는 `__parent__` 사용:**
    ```python
    from __pkg__.__pkg__ import
    from .__parent__.__parent__ import
    ```
    이러한 형태는 많은 사람(귀도 포함)이 보기 흉하다고 생각했지만, 명확하고 명시적이었습니다. 전반적으로 더 짧은 `__pkg__`를 선호하는 사람이 많았습니다.

*   **형제 모듈 참조만 허용:** 현재 디렉토리의 형제 모듈만 참조할 수 있도록 하자는 제안도 있었습니다.
    ```python
    from .spam import eggs
    import .spam.eggs
    ```

*   **인덱스화된 부모 허용:**
    ```python
    from -2.spam import eggs
    ```
    와 같이 인덱스를 사용하여 부모 모듈을 참조하자는 제안도 있었습니다.

*   **`import` 구문 재작성:** `from ... import` 대신 완전히 새로운 `import` 구문을 제안하는 사람들도 있었습니다.
    ```python
    from MODULE import NAMES as RENAME searching HOW
    import NAMES as RENAME from MODULE searching HOW [from NAMES] [in WHERE] import ...
    ```
    그러나 이는 Python 2.5에 구현하기에는 너무 큰 변경이었고, 상대 경로 임포트의 필요성이 매우 중요했기 때문에 즉각적인 해결책이 필요했습니다. 또한, 이 제안된 구문에는 여러 미해결 질문이 있었습니다.

## 귀도의 결정 (Guido's Decision)

귀도는 상대 경로 임포트가 **선행 점(leading dots)**을 사용할 것이라고 선언했습니다.

*   **하나의 선행 점 (`.`):** 현재 패키지에서 시작하는 상대 경로 임포트를 나타냅니다.
*   **두 개 이상의 선행 점 (`..`, `...` 등):** 첫 번째 점 이후의 점 하나당 한 레벨씩 현재 패키지의 부모를 가리키는 상대 경로 임포트를 나타냅니다.

### 예시 패키지 레이아웃:

```
package/
    __init__.py
    subpackage1/
        __init__.py
        moduleX.py
        moduleY.py
    subpackage2/
        __init__.py
        moduleZ.py
        moduleA.py
```

현재 파일이 `moduleX.py` 또는 `subpackage1/__init__.py`라고 가정했을 때, 새로운 구문의 올바른 사용법은 다음과 같습니다:

```python
from .moduleY import spam # 현재 패키지(subpackage1) 내 moduleY에서 spam 임포트
from .moduleY import spam as ham # 현재 패키지(subpackage1) 내 moduleY에서 spam을 ham으로 임포트
from . import moduleY # 현재 패키지(subpackage1) 내 moduleY 자체를 임포트

from ..subpackage1 import moduleY # 부모 패키지(package)의 subpackage1에서 moduleY 임포트
from ..subpackage2.moduleZ import eggs # 부모 패키지(package)의 subpackage2 내 moduleZ에서 eggs 임포트
from ..moduleA import foo # 부모 패키지(package)의 moduleA에서 foo 임포트 (이 경우 moduleA는 package/__init__.py와 같은 레벨에 있어야 함)

from ...package import bar # 조부모 패키지(package)의 package에서 bar 임포트 (이는 'package'가 상위 패키지의 하위 모듈이 될 때만 가능)
from ...sys import path # 시스템 모듈인 sys를 임포트하는 예시 (권장되지 않음, "미친 짓"이라고 귀도가 언급함)
```

**주의:** 마지막 예시는 문법적으로 유효하지만, 권장되지 않습니다 (귀도는 "미친 짓"이라는 표현을 사용했습니다).

상대 경로 임포트는 항상 `from <> import` 형식을 사용해야 합니다. `import <>`는 항상 절대 경로 임포트입니다. 물론, 절대 경로 임포트도 선행 점을 생략하여 `from <> import`를 사용할 수 있습니다.

`import .foo`가 금지되는 이유는 `import XXX.YYY.ZZZ` 이후에는 `XXX.YYY.ZZZ`를 표현식에서 사용할 수 있지만, `.moduleY`는 표현식에서 사용할 수 없기 때문입니다.

## 상대 경로 임포트와 `__name__` (Relative Imports and __name__)

상대 경로 임포트는 모듈의 `__name__` 속성을 사용하여 패키지 계층 구조 내에서 해당 모듈의 위치를 결정합니다. 만약 모듈의 이름이 패키지 정보를 포함하지 않는 경우 (예: `'__main__'`으로 설정된 경우), 상대 경로 임포트는 파일 시스템상의 실제 위치와 관계없이 해당 모듈이 최상위 모듈인 것처럼 해석됩니다.

## 상대 경로 임포트와 `sys.modules`의 간접 엔트리 (Relative Imports and Indirection Entries in sys.modules)

패키지가 도입되었을 때 `sys.modules`에 간접 엔트리(indirection entry) 개념이 생겨났습니다. 패키지 내 모듈에 대한 `sys.modules` 엔트리의 값이 `None`일 때, 이는 해당 모듈이 실제로는 최상위 모듈을 참조한다는 것을 나타냈습니다. 예를 들어, `'Sound.Effects.string'`이 `sys.modules`에서 `None` 값을 가질 수 있었는데, 이는 해당 이름으로 해석되는 모든 임포트가 실제로는 최상위 `'string'` 모듈을 임포트하는 것을 의미했습니다.

이것은 상대 경로 임포트가 절대 경로 임포트로 해석될 때의 최적화를 도입했지만, 이 PEP는 절대 경로 임포트와 상대 경로 임포트 사이에 매우 명확한 구분을 두기 때문에 이 최적화는 더 이상 필요하지 않습니다. 절대/상대 경로 임포트가 유일한 임포트 의미론이 되면 `sys.modules`의 간접 엔트리는 더 이상 지원되지 않을 것입니다.

## 참조 (References)

더 많은 배경 정보를 위해 다음 `python-dev` 스레드를 참고하십시오:

*   Re: Christmas Wishlist
*   Re: Python-Dev Digest, Vol 5, Issue 57
*   Relative import
*   Another Strategy for Relative Import

*   https://mail.python.org/pipermail/python-dev/2004-March/043739.html
*   https://www.python.org/doc/essays/packages/

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---
 URL: https://peps.python.org/pep-0328/
 URL: https://mail.python.org/pipermail/python-dev/2004-March/043739.html
 URL: https://www.python.org/doc/essays/packages/Based on the content of PEP 328, I have translated and summarized it for Korean Python developers.
The translation includes explanations of the proposal, its background, and its impact on Python usage, adhering to the specified guidelines for professionalism, terminology, readability, and accuracy.

---

# PEP 328 – 임포트: 여러 줄 및 절대/상대 경로 (Imports: Multi-Line and Absolute/Relative)

*   **작성자:** Aahz
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2003년 12월 21일
*   **Python 버전:** 2.4, 2.5, 2.6
*   **배포 이력:** 2004년 3월 8일

## 요약 (Abstract)

`import` 문에는 두 가지 주요 문제점이 있었습니다:

1.  **긴 `import` 문:** 파이썬 스타일 가이드에 맞춰 작성하기 어렵고, 여러 가지 편법을 사용해야 했습니다.
2.  **패키지 내 모호성:** 패키지 내부에서 `import foo`가 해당 패키지 내의 모듈을 참조하는지, 아니면 패키지 외부에 있는 다른 모듈을 참조하는지 명확하지 않았습니다. 즉, 로컬 모듈이나 패키지가 `sys.path`에 직접 있는 다른 모듈을 가릴 수 있었습니다.

첫 번째 문제 해결을 위해, 여러 이름을 괄호로 묶어 파이썬의 표준 여러 줄 값 처리 메커니즘을 `import` 문에도 적용할 수 있도록 제안되었습니다.

두 번째 문제 해결을 위해, 모든 `import` 문은 기본적으로 절대 경로(기본적으로 `sys.path`만 검색)로 처리하고, 패키지 내 상대 경로 임포트를 위한 특별한 구문(선행 점)을 사용하도록 제안되었습니다.

## 타임라인 (Timeline)

*   **Python 2.5:** 새로운 절대 경로 임포트 동작을 `from __future__ import absolute_import`를 통해 활성화할 수 있었습니다. 상대 경로 임포트는 자유롭게 사용할 수 있었습니다.
*   **Python 2.6:** 패키지 내부(intra-package) 임포트로 해석되는 모든 `import` 문(상대 경로 임포트 구문을 사용하지 않은 `from <> import` 포함)은 `DeprecationWarning`을 발생시켰습니다.

## 괄호 사용 근거 (Rationale for Parentheses)

이전에는 하나의 모듈이나 패키지에서 많은 이름을 임포트해야 할 때 다음과 같은 불편한 선택지 중 하나를 골라야 했습니다:

*   역슬래시(`\`)를 사용하여 긴 한 줄로 작성하는 방법:
    ```python
    from Tkinter import Tk, Frame, Button, Entry, Canvas, Text, \
    LEFT, DISABLED, NORMAL, RIDGE, END
    ```
*   여러 개의 `import` 문을 사용하는 방법:
    ```python
    from Tkinter import Tk, Frame, Button, Entry, Canvas, Text
    from Tkinter import LEFT, DISABLED, NORMAL, RIDGE, END
    ```
    (`import *`는 좋은 선택지가 아닙니다.)

대신, 파이썬의 표준 그룹화 메커니즘인 괄호를 사용하여 `import` 문을 다음과 같이 작성할 수 있도록 제안되었습니다:

```python
from Tkinter import (Tk, Frame, Button, Entry, Canvas, Text,
LEFT, DISABLED, NORMAL, RIDGE, END)
```

이 제안의 일부는 처음부터 BDFL(Benevolent Dictator For Life, 귀도 반 로섬)의 승인을 받았습니다. 괄호 지원은 Python 2.4에 추가되었습니다.

## 절대 경로 임포트 근거 (Rationale for Absolute Imports)

Python 2.4 및 그 이전 버전에서는 패키지 내부에 있는 모듈을 읽을 때 `import foo`가 최상위 모듈을 참조하는지 아니면 패키지 내의 다른 모듈을 참조하는지 명확하지 않았습니다. 파이썬 라이브러리가 확장됨에 따라, 점점 더 많은 기존 패키지 내부 모듈이 우연히 표준 라이브러리 모듈을 가리는 문제가 발생했습니다. 특히 패키지 내부에서는 어떤 모듈을 의도하는지 지정할 방법이 없어 어려운 문제였습니다.

이러한 모호성을 해결하기 위해 `foo`는 항상 `sys.path`에서 접근 가능한 모듈 또는 패키지로 간주하도록 제안되었습니다. 이를 **절대 경로 임포트 (absolute import)**라고 합니다.

`python-dev` 커뮤니티는 절대 경로 임포트를 기본값으로 선택했습니다. 이는 절대 경로 임포트가 더 일반적인 사용 사례이며, 패키지 계층 구조에서 상위 부분의 이름을 변경하거나 한 패키지를 다른 패키지 안으로 이동할 때 어려움이 따르더라도, 상대 경로(패키지 내부) 임포트의 모든 기능을 제공할 수 있기 때문입니다.

이는 의미론의 변경을 나타내므로, Python 2.5와 2.6에서는 `from __future__ import absolute_import`를 통해 절대 경로 임포트를 선택적으로 사용할 수 있었습니다. 이 제안의 일부는 처음부터 BDFL의 승인을 받았습니다.

## 상대 경로 임포트 근거 (Rationale for Relative Imports)

절대 경로 임포트로의 전환과 함께, 상대 경로 임포트를 아예 허용해야 하는지에 대한 의문이 제기되었습니다. 몇 가지 사용 사례가 제시되었는데, 그중 가장 중요한 것은 하위 패키지를 수정하지 않고도 대규모 패키지의 구조를 재배치할 수 있어야 한다는 것이었습니다. 또한, 패키지 내부의 모듈은 상대 경로 임포트 없이는 자신을 쉽게 임포트할 수 없었습니다.

귀도 반 로섬은 상대 경로 임포트의 아이디어를 승인했지만, 구문(syntax)에 대해서는 많은 의견 불일치가 있었습니다. 상대 경로 임포트는 특정 이름을 나열하여 임포트해야 한다는 데에는 동의하는 것으로 보였습니다 (즉, `import foo`와 같은 단순한 형태는 항상 절대 경로 임포트가 됩니다).

### 제안되었던 구문들

여러 구문들이 경쟁했습니다:

*   **귀도의 제안:**
    ```python
    from .foo import bar
    from ...foo import bar
    ```
    이 두 가지 형태는 여러 의미론이 제안되었습니다. 각 점이 한 레벨을 나타내는 방식이 있었으나, 점을 세는 것이 어렵다는 불만이 많았습니다. 한 레벨의 상대 경로 임포트만 허용하는 옵션도 있었으나, 많은 기능이 누락되었고, 사람들은 한 점 형태에서도 점이 빠지는 것에 대해 여전히 불평했습니다. 마지막 옵션은 상대 모듈 및 패키지를 찾는 알고리즘을 정의하는 것이었는데, 이에 대한 반대는 "명시적인 것이 암시적인 것보다 낫다 (Explicit is better than implicit)"는 것이었습니다.

*   **다른 구분 기호:** "-" 또는 "^"와 같은 다른 구두점을 구분 기호로 사용하자는 제안도 있었습니다.

*   **"*" 사용:**
    ```python
    from *.foo import bar
    ```
    와 같이 "*"를 사용하자는 제안도 있었습니다.

*   **`__pkg__` 또는 `__parent__` 사용:**
    ```python
    from __pkg__.__pkg__ import
    from .__parent__.__parent__ import
    ```
    이러한 형태는 많은 사람(귀도 포함)이 보기 흉하다고 생각했지만, 명확하고 명시적이었습니다. 전반적으로 더 짧은 `__pkg__`를 선호하는 사람이 많았습니다.

*   **형제 모듈 참조만 허용:** 현재 디렉토리의 형제 모듈만 참조할 수 있도록 하자는 제안도 있었습니다.
    ```python
    from .spam import eggs
    import .spam.eggs
    ```

*   **인덱스화된 부모 허용:**
    ```python
    from -2.spam import eggs
    ```
    와 같이 인덱스를 사용하여 부모 모듈을 참조하자는 제안도 있었습니다.

*   **`import` 구문 재작성:** `from ... import` 대신 완전히 새로운 `import` 구문을 제안하는 사람들도 있었습니다.
    ```python
    from MODULE import NAMES as RENAME searching HOW
    import NAMES as RENAME from MODULE searching HOW [from NAMES] [in WHERE] import ...
    ```
    그러나 이는 Python 2.5에 구현하기에는 너무 큰 변경이었고, 상대 경로 임포트의 필요성이 매우 중요했기 때문에 즉각적인 해결책이 필요했습니다. 또한, 이 제안된 구문에는 여러 미해결 질문이 있었습니다.

## 귀도의 결정 (Guido's Decision)

귀도는 상대 경로 임포트가 **선행 점(leading dots)**을 사용할 것이라고 선언했습니다.

*   **하나의 선행 점 (`.`):** 현재 패키지에서 시작하는 상대 경로 임포트를 나타냅니다.
*   **두 개 이상의 선행 점 (`..`, `...` 등):** 첫 번째 점 이후의 점 하나당 한 레벨씩 현재 패키지의 부모를 가리키는 상대 경로 임포트를 나타냅니다.

### 예시 패키지 레이아웃:

```
package/
    __init__.py
    subpackage1/
        __init__.py
        moduleX.py
        moduleY.py
    subpackage2/
        __init__.py
        moduleZ.py
        moduleA.py
```

현재 파일이 `moduleX.py` 또는 `subpackage1/__init__.py`라고 가정했을 때, 새로운 구문의 올바른 사용법은 다음과 같습니다:

```python
from .moduleY import spam # 현재 패키지(subpackage1) 내 moduleY에서 spam 임포트
from .moduleY import spam as ham # 현재 패키지(subpackage1) 내 moduleY에서 spam을 ham으로 임포트
from . import moduleY # 현재 패키지(subpackage1) 내 moduleY 자체를 임포트

from ..subpackage1 import moduleY # 부모 패키지(package)의 subpackage1에서 moduleY 임포트
from ..subpackage2.moduleZ import eggs # 부모 패키지(package)의 subpackage2 내 moduleZ에서 eggs 임포트
from ..moduleA import foo # 부모 패키지(package)의 moduleA에서 foo 임포트 (이 경우 moduleA는 package/__init__.py와 같은 레벨에 있어야 함)

from ...package import bar # 조부모 패키지(package)의 package에서 bar 임포트 (이는 'package'가 상위 패키지의 하위 모듈이 될 때만 가능)
from ...sys import path # 시스템 모듈인 sys를 임포트하는 예시 (권장되지 않음, "미친 짓"이라고 귀도가 언급함)
```

**주의:** 마지막 예시는 문법적으로 유효하지만, 권장되지 않습니다 (귀도는 "미친 짓"이라는 표현을 사용했습니다).

상대 경로 임포트는 항상 `from <> import` 형식을 사용해야 합니다. `import <>`는 항상 절대 경로 임포트입니다. 물론, 절대 경로 임포트도 선행 점을 생략하여 `from <> import`를 사용할 수 있습니다.

`import .foo`가 금지되는 이유는 `import XXX.YYY.ZZZ` 이후에는 `XXX.YYY.ZZZ`를 표현식에서 사용할 수 있지만, `.moduleY`는 표현식에서 사용할 수 없기 때문입니다.

## 상대 경로 임포트와 `__name__` (Relative Imports and __name__)

상대 경로 임포트는 모듈의 `__name__` 속성을 사용하여 패키지 계층 구조 내에서 해당 모듈의 위치를 결정합니다. 만약 모듈의 이름이 패키지 정보를 포함하지 않는 경우 (예: `'__main__'`으로 설정된 경우), 상대 경로 임포트는 파일 시스템상의 실제 위치와 관계없이 해당 모듈이 최상위 모듈인 것처럼 해석됩니다.

## 상대 경로 임포트와 `sys.modules`의 간접 엔트리 (Relative Imports and Indirection Entries in sys.modules)

패키지가 도입되었을 때 `sys.modules`에 간접 엔트리(indirection entry) 개념이 생겨났습니다. 패키지 내 모듈에 대한 `sys.modules` 엔트리의 값이 `None`일 때, 이는 해당 모듈이 실제로는 최상위 모듈을 참조한다는 것을 나타냈습니다. 예를 들어, `'Sound.Effects.string'`이 `sys.modules`에서 `None` 값을 가질 수 있었는데, 이는 해당 이름으로 해석되는 모든 임포트가 실제로는 최상위 `'string'` 모듈을 임포트하는 것을 의미했습니다.

이것은 상대 경로 임포트가 절대 경로 임포트로 해석될 때의 최적화를 도입했지만, 이 PEP는 절대 경로 임포트와 상대 경로 임포트 사이에 매우 명확한 구분을 두기 때문에 이 최적화는 더 이상 필요하지 않습니다. 절대/상대 경로 임포트가 유일한 임포트 의미론이 되면 `sys.modules`의 간접 엔트리는 더 이상 지원되지 않을 것입니다.

## 참조 (References)

더 많은 배경 정보를 위해 다음 `python-dev` 스레드를 참고하십시오:

*   Re: Christmas Wishlist
*   Re: Python-Dev Digest, Vol 5, Issue 57
*   Relative import
*   Another Strategy for Relative Import

*   https://peps.python.org/pep-0328/
*   https://mail.python.org/pipermail/python-dev/2004-March/043739.html
*   https://www.python.org/doc/essays/packages/

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.