---
title: "[Final] PEP 526 - Syntax for Variable Annotations"
excerpt: "Python Enhancement Proposal 526: 'Syntax for Variable Annotations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/526/
toc: true
toc_sticky: true
date: 2025-09-26 23:19:02+0900
last_modified_at: 2025-09-26 23:19:02+0900
published: true
---
> **원문 링크:** [PEP 526 - Syntax for Variable Annotations](https://peps.python.org/pep-0526/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Aug-2016


**PEP 526 – 변수 어노테이션 구문 (Syntax for Variable Annotations)**

## 개요 (Abstract)

PEP 484는 타입 힌트(type hints), 즉 타입 어노테이션(type annotations)을 도입했습니다. 주로 함수 어노테이션에 중점을 두었지만, 변수를 어노테이션하기 위한 타입 주석(type comments) 개념도 함께 소개했습니다.

예시:
```python
# 'primes'는 정수 리스트입니다.
primes = [] # type: List[int]
# 'captain'은 문자열입니다. (참고: 초기값이 문제입니다)
captain = ... # type: str

class Starship:
    # 'stats'는 클래스 변수입니다.
    stats = {} # type: Dict[str, int]
```

이 PEP는 위와 같이 주석을 통해 변수의 타입(클래스 변수 및 인스턴스 변수 포함)을 표현하는 대신, 이를 위한 파이썬 구문을 추가하는 것을 목표로 합니다.

새로운 구문 예시:
```python
primes: List[int] = []
captain: str # 참고: 초기값이 없습니다!

class Starship:
    stats: ClassVar[Dict[str, int]] = {}
```

PEP 484는 타입 주석이 복잡한 경우 타입 추론(type inference)에 도움이 되도록 의도되었다고 명시하며, 이 PEP는 이러한 의도를 변경하지 않습니다. 그러나 실제로는 타입 주석이 클래스 변수와 인스턴스 변수에도 채택되었으므로, 이 PEP는 이러한 변수에 대한 타입 어노테이션 사용법도 논의합니다.

## 배경 (Rationale)

타입 주석은 충분히 잘 작동하지만, 주석으로 표현된다는 점 때문에 몇 가지 단점이 있습니다.

*   텍스트 편집기가 타입 어노테이션과 주석을 다르게 강조 표시하는 경우가 많습니다.
*   정의되지 않은 변수의 타입을 어노테이션할 방법이 없습니다. `a = None # type: int`와 같이 `None`으로 초기화해야 합니다.
*   조건부 분기(conditional branch)에서 어노테이션된 변수는 읽기 어렵습니다.
    ```python
    if some_value:
        my_var = function() # type: Logger
    else:
        my_var = another_function() # 여기에는 왜 타입이 없을까요?
    ```
*   타입 주석은 실제로 언어의 일부가 아니므로, 파이썬 스크립트가 이를 파싱하려면 `ast` 모듈 대신 사용자 정의 파서(custom parser)가 필요합니다.
*   `typeshed`에서 타입 주석이 많이 사용됩니다. `typeshed`를 변수 어노테이션 구문을 사용하도록 마이그레이션하면 스텁 파일(stub files)의 가독성이 향상될 것입니다.
*   일반 주석과 타입 주석이 함께 사용되는 상황에서는 구별하기 어렵습니다.
    ```python
    path = None # type: Optional[str] # 모듈 소스 경로
    ```
*   모듈의 소스 코드를 찾아서 런타임에 파싱하려는 시도 없이는 런타임에 어노테이션을 검색하는 것이 불가능하며, 이는 우아하지 않습니다.

이러한 문제들의 대부분은 새로운 구문을 언어의 핵심 부분으로 만듦으로써 완화될 수 있습니다. 또한, 클래스 및 인스턴스 변수에 대한 전용 어노테이션 구문을 갖는 것은 PEP 484에 정의된 명목적 타이핑(nominal typing)을 보완하는 정적 덕 타이핑(static duck-typing)의 길을 열어줄 것입니다.

### 비목표 (Non-goals)

이 제안은 런타임에 어노테이션을 검색하기 위한 표준 라이브러리 함수 `typing.get_type_hints`의 확장을 동반하지만, 변수 어노테이션은 런타임 타입 검사(runtime type checking)를 위해 설계된 것이 아닙니다. 이러한 기능을 구현하려면 서드파티 패키지가 개발되어야 합니다.

또한 파이썬은 동적 타입 언어(dynamically typed language)로 남을 것이며, 저자들은 타입 힌트가 관례적으로라도 의무화되는 것을 원하지 않는다는 점을 강조해야 합니다. 타입 어노테이션은 정적 타입 언어(statically typed languages)의 변수 선언과 혼동되어서는 안 됩니다. 어노테이션 구문의 목표는 서드파티 도구를 위한 구조화된 타입 메타데이터를 지정하는 쉬운 방법을 제공하는 것입니다.

이 PEP는 타입 검사기가 타입 검사 규칙을 변경하도록 요구하지 않습니다. 단지 타입 주석을 대체할 더 읽기 쉬운 구문을 제공할 뿐입니다.

## 사양 (Specification)

타입 어노테이션은 할당문(assignment statement)이나 단일 표현식(single expression)에 추가될 수 있으며, 서드파티 타입 검사기에게 어노테이션 대상의 원하는 타입을 알려줍니다.

```python
my_var: int
my_var = 5 # 타입 검사를 통과합니다.
other_var: int = 'a' # 타입 검사기에서 오류로 플래그됩니다.
                     # 하지만 런타임에는 문제 없습니다.
```

이 구문은 PEP 484를 넘어 새로운 의미론을 도입하지 않으므로, 다음 세 가지 문장은 동일합니다.

```python
var = value # type: annotation
var: annotation; var = value
var: annotation = value
```

아래에서는 다양한 맥락에서의 타입 어노테이션 구문과 그 런타임 효과를 명시합니다. 또한 타입 검사기가 어노테이션을 어떻게 해석할 수 있는지 제안하지만, 이러한 제안에 대한 준수는 필수가 아닙니다 (이는 PEP 484의 준수에 대한 태도와 일치합니다).

### 전역 및 지역 변수 어노테이션 (Global and local variable annotations)

지역 변수(locals)와 전역 변수(globals)의 타입은 다음과 같이 어노테이션할 수 있습니다.

```python
some_number: int # 초기값 없는 변수
some_list: List[int] = [] # 초기값 있는 변수
```

초기값을 생략할 수 있으므로, 조건부 분기에서 할당되는 변수의 타이핑이 더 쉬워집니다.

```python
sane_world: bool
if 2+2 == 4:
    sane_world = True
else:
    sane_world = False
```

이 구문이 튜플 패킹(tuple packing)을 허용하지만, 튜플 언패킹(tuple unpacking)을 사용할 때는 변수의 타입을 어노테이션할 수 없다는 점에 유의하십시오.

```python
# 변수 어노테이션 구문을 사용한 튜플 패킹
t: Tuple[int, ...] = (1, 2, 3)
# 또는
t: Tuple[int, ...] = 1, 2, 3 # Python 3.8 이상에서만 작동

# 변수 어노테이션 구문을 사용한 튜플 언패킹
header: str kind: int body: Optional[List[str]] # 이 구문은 유효하지 않습니다.
header, kind, body = message # 각 변수에 개별적으로 어노테이션해야 합니다.
```

초기값을 생략하면 변수가 초기화되지 않은 상태로 남습니다.

```python
a: int
print(a) # NameError 발생
```

그러나 지역 변수를 어노테이션하면 인터프리터는 항상 이를 지역 변수로 만듭니다.

```python
def f():
    a: int
    print(a) # UnboundLocalError 발생
    # 'a: int'를 주석 처리하면 NameError가 발생합니다.
```

이는 마치 코드가 다음과 같았던 것과 같습니다.

```python
def f():
    if False:
        a = 0
    print(a) # UnboundLocalError 발생
```

중복된 타입 어노테이션은 무시됩니다. 그러나 정적 타입 검사기는 동일한 변수에 대해 다른 타입으로 어노테이션할 경우 경고를 발행할 수 있습니다.

```python
a: int
a: str # 정적 타입 검사기가 이에 대해 경고할 수도 있고 안 할 수도 있습니다.
```

### 클래스 및 인스턴스 변수 어노테이션 (Class and instance variable annotations)

타입 어노테이션은 클래스 본문(class bodies) 및 메서드(methods) 내의 클래스 및 인스턴스 변수를 어노테이션하는 데에도 사용될 수 있습니다. 특히, 값이 없는 표기법 `a: int`는 `__init__` 또는 `__new__`에서 초기화되어야 하는 인스턴스 변수를 어노테이션할 수 있도록 합니다. 제안된 구문은 다음과 같습니다.

```python
class BasicStarship:
    captain: str = 'Picard' # 기본값을 가진 인스턴스 변수
    damage: int # 기본값 없는 인스턴스 변수
    stats: ClassVar[Dict[str, int]] = {} # 클래스 변수
```

여기서 `ClassVar`는 `typing` 모듈에 의해 정의된 특별한 클래스로, 정적 타입 검사기에게 이 변수가 인스턴스에서 설정되어서는 안 된다는 것을 나타냅니다.

`ClassVar` 매개변수는 중첩 수준에 관계없이 어떤 타입 변수(type variables)도 포함할 수 없습니다. `ClassVar[T]`와 `ClassVar[List[Set[T]]]`는 모두 `T`가 타입 변수인 경우 유효하지 않습니다.

자세한 예시로 설명할 수 있습니다. 다음 클래스에서:

```python
class Starship:
    captain = 'Picard'
    stats = {}
    def __init__(self, damage, captain=None):
        self.damage = damage
        if captain:
            self.captain = captain
        # Else keep the default
    def hit(self):
        Starship.stats['hits'] = Starship.stats.get('hits', 0) + 1
```

`stats`는 클래스 변수(다양한 게임별 통계를 추적)로 의도되었으며, `captain`은 클래스에서 기본값이 설정된 인스턴스 변수입니다. 이 차이는 타입 검사기에 의해 인지되지 않을 수 있습니다. 둘 다 클래스 레벨에서 초기화되지만, `captain`은 인스턴스 변수에 대한 편리한 기본값으로만 작용하는 반면, `stats`는 진정한 클래스 변수입니다. 즉, 모든 인스턴스에 의해 공유되도록 의도되었습니다.

두 변수 모두 클래스 레벨에서 초기화되므로, 클래스 변수를 `ClassVar[...]`로 래핑된 타입으로 어노테이션하여 구별하는 것이 유용합니다. 이러한 방식으로 타입 검사기는 인스턴스에서 동일한 이름의 속성에 대한 우발적인 할당을 플래그할 수 있습니다.

예를 들어, 논의된 클래스를 어노테이션하면 다음과 같습니다.

```python
class Starship:
    captain: str = 'Picard'
    damage: int
    stats: ClassVar[Dict[str, int]] = {}
    def __init__(self, damage: int, captain: str = None):
        self.damage = damage
        if captain:
            self.captain = captain
        # Else keep the default
    def hit(self):
        Starship.stats['hits'] = Starship.stats.get('hits', 0) + 1

enterprise_d = Starship(3000)
enterprise_d.stats = {} # 타입 검사기에서 오류로 플래그됩니다.
Starship.stats = {} # 이것은 괜찮습니다.
```

편의상(그리고 관례상), 인스턴스 변수는 클래스 내부가 아닌 `__init__` 또는 다른 메서드에서 어노테이션될 수 있습니다.

```python
from typing import Generic, TypeVar

T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, content):
        self.content: T = content
```

### 표현식 어노테이션 (Annotating expressions)

어노테이션의 대상은 구문상 유효한 모든 단일 할당 대상(single assignment target)일 수 있습니다 (이에 대해 타입 검사기가 무엇을 할지는 타입 검사기에 달려 있습니다).

```python
class Cls: pass
c = Cls()
c.x: int = 0 # c.x를 int로 어노테이션합니다.
c.y: int # c.y를 int로 어노테이션합니다.

d = {}
d['a']: int = 0 # d['a']를 int로 어노테이션합니다.
d['b']: int # d['b']를 int로 어노테이션합니다.
```

괄호로 묶인 이름조차도 단순한 이름이 아니라 표현식으로 간주된다는 점에 유의하십시오.

```python
(x): int # x를 int로 어노테이션하며, (x)는 컴파일러에 의해 표현식으로 처리됩니다.
(y): int = 0 # 여기도 마찬가지입니다.
```

### 어노테이션이 허용되지 않는 경우 (Where annotations aren't allowed)

동일한 함수 스코프(function scope) 내에서 `global` 또는 `nonlocal`에 적용되는 변수를 어노테이션하려고 시도하는 것은 불법입니다.

```python
def f():
    global x: int # SyntaxError
def g():
    x: int # 또한 SyntaxError
    global x
```

그 이유는 `global`과 `nonlocal`은 변수를 소유하지 않기 때문입니다. 따라서 타입 어노테이션은 변수를 소유하는 스코프에 속해야 합니다.

단일 할당 대상과 단일 오른쪽 값만 허용됩니다. 또한 `for` 또는 `with` 문에서 사용되는 변수는 어노테이션할 수 없습니다. 튜플 언패킹과 유사한 방식으로 미리 어노테이션할 수 있습니다.

```python
a: int
for a in my_iter:
    ...

f: MyFile
with myfunc() as f:
    ...
```

### 스텁 파일의 변수 어노테이션 (Variable annotations in stub files)

변수 어노테이션은 타입 주석보다 읽기 쉽기 때문에 Python 2.7을 포함한 모든 Python 버전의 스텁 파일에서 선호됩니다. 스텁 파일은 Python 인터프리터에 의해 실행되지 않으므로, 변수 어노테이션을 사용해도 오류가 발생하지 않습니다. 타입 검사기는 모든 Python 버전의 스텁에서 변수 어노테이션을 지원해야 합니다. 예를 들어:

```python
# 파일 lib.pyi
ADDRESS: unicode = ...
class Error:
    cause: Union[str, unicode]
```

### 변수 어노테이션에 대한 권장 코딩 스타일 (Preferred coding style for variable annotations)

모듈 레벨 변수, 클래스 및 인스턴스 변수, 지역 변수에 대한 어노테이션은 해당 콜론 뒤에 단일 공백이 있어야 합니다. 콜론 앞에는 공백이 없어야 합니다. 할당문에 오른쪽 값이 있는 경우, 등호 양쪽에 정확히 하나의 공백이 있어야 합니다.

예시:
**권장:**
```python
code: int

class Point:
    coords: Tuple[int, int]
    label: str = '<unknown>'
```

**비권장:**
```python
code:int # 콜론 뒤에 공백 없음
code : int # 콜론 앞에 공백 있음

class Test:
    result: int=0 # 등호 양쪽에 공백 없음
```

## 표준 라이브러리 및 문서 변경 사항 (Changes to Standard Library and Documentation)

*   새로운 공변(covariant) 타입 `ClassVar[T_co]`가 `typing` 모듈에 추가됩니다. 이는 유효한 타입이어야 하는 단일 인자만 허용하며, 클래스 인스턴스에서 설정되어서는 안 되는 클래스 변수를 어노테이션하는 데 사용됩니다. 이 제한은 정적 검사기에 의해 보장되지만 런타임에는 보장되지 않습니다. `ClassVar` 사용법에 대한 예시 및 설명은 `classvar` 섹션을 참조하고, `ClassVar` 뒤에 있는 이유에 대한 자세한 정보는 `rejected` 섹션을 참조하십시오.
*   `typing` 모듈의 `get_type_hints` 함수가 확장되어, 함수뿐만 아니라 모듈 및 클래스에서도 런타임에 타입 어노테이션을 검색할 수 있습니다. 어노테이션은 변수 또는 인자를 해당 타입 힌트에 매핑하는 사전(dictionary) 형태로 반환되며, 전방 참조(forward references)는 평가됩니다. 클래스의 경우, 메서드 결정 순서(method resolution order)에 따라 구성된 매핑(`collections.ChainMap`일 수 있음)을 반환합니다.
*   어노테이션 사용에 대한 권장 지침이 문서에 추가될 것이며, 이 PEP와 PEP 484에 설명된 사양을 교육적으로 요약한 내용을 포함할 것입니다. 또한, 타입 주석을 타입 어노테이션으로 변환하는 도우미 스크립트가 표준 라이브러리와 별도로 게시될 것입니다.

## 타입 어노테이션의 런타임 효과 (Runtime Effects of Type Annotations)

지역 변수를 어노테이션하면 할당되지 않았더라도 인터프리터는 이를 지역 변수로 처리합니다. 지역 변수에 대한 어노테이션은 평가되지 않습니다.

```python
def f():
    x: NonexistentName # 오류 없음.
```

그러나 모듈 또는 클래스 레벨에 있는 경우, 타입은 평가됩니다.

```python
x: NonexistentName # 오류!
class X:
    var: NonexistentName # 오류!
```

또한 모듈 또는 클래스 레벨에서 어노테이션되는 항목이 단순한 이름인 경우, 해당 이름과 어노테이션은 모듈 또는 클래스의 `__annotations__` 속성(비공개인 경우 변형됨)에 이름에서 평가된 어노테이션으로의 순서 있는 매핑(ordered mapping)으로 저장됩니다. 예시는 다음과 같습니다.

```python
from typing import Dict

class Player: ...

players: Dict[str, Player]
__points: int

print(__annotations__) # 출력: {'players': typing.Dict[str, __main__.Player],
                     # '_Player__points': <class 'int'>}
```

`__annotations__`는 쓰기 가능하므로 다음이 허용됩니다.

```python
__annotations__['s'] = str
```

그러나 `__annotations__`를 순서 있는 매핑이 아닌 다른 것으로 업데이트하려고 시도하면 `TypeError`가 발생할 수 있습니다.

```python
class C:
    __annotations__ = 42
    x: int = 5 # TypeError 발생
```

(참고: 오류의 원인인 `__annotations__`에 대한 할당은 파이썬 인터프리터에 의해 아무런 문제 없이 허용되지만, 이후의 타입 어노테이션은 이를 `MutableMapping`으로 예상하며 실패합니다).

런타임에 어노테이션을 가져오는 권장 방법은 `typing.get_type_hints` 함수를 사용하는 것입니다. 모든 던더 속성(dunder attributes)과 마찬가지로 `__annotations__`의 문서화되지 않은 사용은 경고 없이 손상될 수 있습니다.

```python
from typing import Dict, ClassVar, get_type_hints

class Starship:
    hitpoints: int = 50
    stats: ClassVar[Dict[str, int]] = {}
    shield: int = 100
    captain: str
    def __init__(self, captain: str) -> None: ...

assert get_type_hints(Starship) == {'hitpoints': int, 'stats': ClassVar[Dict[str, int]], 'shield': int, 'captain': str}
assert get_type_hints(Starship.__init__) == {'captain': str, 'return': None}
```

어노테이션이 정적으로 발견되지 않으면 `__annotations__` 사전이 전혀 생성되지 않습니다. 또한, 함수 호출마다 어노테이션 사전을 생성하고 채워야 하는 비용을 상쇄할 만큼 로컬에서 어노테이션을 사용할 가치가 크지 않습니다. 따라서 함수 레벨의 어노테이션은 평가되지 않으며 저장되지 않습니다.

### 기타 어노테이션 사용 (Other uses of annotations)

이 PEP를 통해 파이썬은 다음과 같은 구문을 거부하지는 않겠지만:

```python
alice: 'well done' = 'A+'
bob: 'what a shame' = 'F-'
```

이는 타입 어노테이션을 "오류를 발생시키지 않고 평가된다"는 것 이상으로 신경 쓰지 않을 것이기 때문입니다. 그러나 이를 접하는 타입 검사기는 `# type: ignore` 또는 `@no_type_check`로 비활성화되지 않는 한 이를 플래그할 것입니다.

하지만 파이썬은 "타입"이 무엇인지 신경 쓰지 않으므로, 위 코드 스니펫이 전역 레벨이나 클래스에 있는 경우 `__annotations__`에는 `{'alice': 'well done', 'bob': 'what a shame'}`가 포함될 것입니다.

이렇게 저장된 어노테이션은 다른 목적으로 사용될 수 있지만, 이 PEP를 통해 우리는 타입 힌트를 어노테이션의 선호되는 사용으로 명시적으로 권장합니다.

## 거부/연기된 제안 (Rejected/Postponed Proposals)

*   **변수 어노테이션을 도입해야 하는가?** 변수 어노테이션은 PEP 484에 의해 승인된 타입 주석 형태로 거의 2년 동안 존재했습니다. 서드파티 타입 검사기(`mypy`, `pytype`, `PyCharm` 등)와 타입 검사기를 사용하는 프로젝트에서 광범위하게 사용됩니다. 그러나 주석 구문에는 배경(Rationale)에 나열된 많은 단점이 있습니다. 이 PEP는 타입 어노테이션의 필요성에 관한 것이 아니라, 그러한 어노테이션을 위한 구문이 무엇이어야 하는지에 관한 것입니다.
*   **새로운 키워드를 도입해야 하는가?** 좋은 키워드를 선택하는 것은 어렵습니다. 예를 들어 `var`는 너무 흔한 변수 이름이므로 사용할 수 없고, 클래스 변수나 전역 변수에 사용하려면 `local`이 될 수 없습니다. 둘째, 어떤 키워드를 선택하든 `__future__` import가 필요할 것입니다.
*   **`def`를 키워드로 사용해야 하는가?** 제안은 다음과 같았을 것입니다.
    ```python
    def primes: List[int] = []
    def captain: str
    ```
    이것의 문제는 `def`가 수십 년 동안 파이썬 프로그래머(및 도구!)에게 "함수 정의"를 의미한다는 것입니다. 이를 변수 정의에도 사용하는 것은 명확성을 높이지 않습니다 (물론 이것은 주관적입니다).
*   **함수 기반 구문을 사용해야 하는가?** `var = cast(annotation[, value])`를 사용하여 변수 타입을 어노테이션하는 것이 제안되었습니다. 이 구문은 AST에 어노테이션이 없는 것과 같은 타입 주석의 일부 문제를 완화하지만, 가독성과 같은 다른 문제를 해결하지 못하고 런타임 오버헤드를 도입할 수 있습니다.
*   **튜플 언패킹에 타입 어노테이션을 허용해야 하는가?** 이는 모호성을 유발합니다. `x, y: T`라는 문장이 무엇을 의미하는지 명확하지 않습니다. `x`와 `y` 모두 `T` 타입인가요, 아니면 `T`가 `x`와 `y`에 분산되는 두 개의 항목으로 구성된 튜플 타입으로 예상되는가요, 아니면 `x`가 `Any` 타입이고 `y`가 `T` 타입인가요? (후자는 함수 시그니처에서 발생할 경우의 의미입니다). 독자에게 추측을 맡기는 대신, 적어도 현재로서는 이를 금지합니다.
*   **어노테이션을 위한 괄호 형식 `(var: type)`을 사용해야 하는가?** 위에서 언급한 모호성을 해결하기 위한 방안으로 `python-ideas`에서 제기되었지만, 그러한 구문은 복잡하고 이점이 미미하며 가독성이 좋지 않다는 이유로 거부되었습니다.
*   **연쇄 할당(chained assignments)에 어노테이션을 허용해야 하는가?** 이는 튜플 언패킹과 유사한 모호성 및 가독성 문제를 가집니다. 예를 들어:
    ```python
    x: int = y = 1
    z = w: int = 1
    ```
    여기서 `y`와 `z`의 타입이 무엇이어야 하는지 모호합니다. 또한 두 번째 줄은 파싱하기 어렵습니다.
*   **`with` 및 `for` 문에 어노테이션을 허용해야 하는가?** `for` 문에서는 실제 이터러블을 식별하기 어렵게 만들고, `with` 문에서는 CPython의 LL(1) 파서를 혼란스럽게 만들 수 있다는 이유로 거부되었습니다.
*   **함수 정의 시점에 지역 어노테이션을 평가해야 하는가?** 이는 어노테이션의 위치가 주변 코드와 동일한 스코프에 있음을 강력하게 시사하기 때문에 Guido에 의해 거부되었습니다.
*   **함수 스코프에도 변수 어노테이션을 저장해야 하는가?** 어노테이션을 로컬에서 사용할 수 있는 가치는 함수 호출마다 사전을 생성하고 채우는 비용을 크게 상쇄할 만큼 충분하지 않습니다.
*   **할당 없이 어노테이션된 변수를 초기화해야 하는가?** `python-ideas`에서 `x: int`의 `x`를 `None` 또는 Javascript의 `undefined`와 같은 추가적인 특별 상수로 초기화하는 것이 제안되었습니다. 그러나 언어에 또 다른 싱글턴 값을 추가하면 코드의 모든 곳에서 이를 확인해야 할 것입니다. 따라서 Guido는 이에 대해 명확히 "No"라고 말했습니다.
*   **`typing` 모듈에 `InstanceVar`도 추가해야 하는가?** 인스턴스 변수는 클래스 변수보다 훨씬 흔합니다. 더 일반적인 사용법이 기본값이 되는 것이 마땅하므로 이는 중복됩니다.
*   **메서드에서만 인스턴스 변수 어노테이션을 허용해야 하는가?** 문제는 많은 `__init__` 메서드가 인스턴스 변수를 초기화하는 것 외에도 많은 작업을 수행하며, (사람이) 모든 인스턴스 변수 어노테이션을 찾기가 더 어려울 것이라는 점입니다. 때로는 `__init__`이 더 많은 도우미 메서드로 분할되므로 이를 추적하는 것이 더욱 어려워집니다. 인스턴스 변수 어노테이션을 클래스에 함께 배치하면 찾기 쉽고, 코드를 처음 읽는 사람에게 도움이 됩니다.
*   **클래스 변수에 `x: class t = v` 구문을 사용해야 하는가?** 이는 더 복잡한 파서가 필요하며, `class` 키워드는 단순한 구문 하이라이터를 혼란스럽게 할 것입니다. 어쨌든 `ClassVar`는 클래스 변수를 `__annotations__`에 저장해야 하므로 더 간단한 구문이 선택되었습니다.
*   **`ClassVar`를 완전히 잊어야 하는가?** `mypy`가 클래스 변수와 인스턴스 변수를 구별하는 방법 없이도 잘 작동하는 것처럼 보였기 때문에 제안되었습니다. 그러나 타입 검사기는 추가 정보를 가지고 유용한 작업을 수행할 수 있습니다. 예를 들어, 인스턴스를 통해 클래스 변수에 우발적인 할당(클래스 변수를 가리는 인스턴스 변수를 생성함)을 플래그할 수 있습니다. 또한 잘 알려진 위험인 변경 가능한 기본값을 가진 인스턴스 변수도 플래그할 수 있습니다.
*   **`ClassVar` 대신 `ClassAttr`를 사용해야 하는가?** `ClassVar`가 더 나은 주된 이유는 다음과 같습니다. 메서드, 디스크립터 등 많은 것들이 클래스 속성입니다. 그러나 특정 속성만 개념적으로 클래스 변수(또는 상수)입니다.
*   **어노테이션을 평가하지 않고 문자열로 처리해야 하는가?** 이는 항상 평가되는 함수 어노테이션의 동작과 일치하지 않을 것입니다. 비록 미래에 재고될 수 있지만, PEP 484에서는 이것이 별도의 PEP여야 한다고 결정되었습니다.
*   **클래스 독스트링에 변수 타입을 어노테이션해야 하는가?** 많은 프로젝트에서 이미 다양한 독스트링 규칙을 사용하고 있으며, 종종 일관성이 부족하고 일반적으로 PEP 484 어노테이션 구문을 아직 따르지 않습니다. 또한 이것은 특별하고 정교한 파서가 필요할 것입니다. 이는 결국 PEP의 목적, 즉 서드파티 타입 검사 도구와의 협력을 저해할 것입니다.
*   **`__annotations__`를 디스크립터로 구현해야 하는가?** `__annotations__`를 사전이나 `None`이 아닌 다른 것으로 설정하는 것을 금지하기 위해 제안되었습니다. Guido는 이를 불필요하다고 거부했습니다. 대신 `__annotations__`가 매핑이 아닌 다른 것일 때 업데이트를 시도하면 `TypeError`가 발생할 것입니다.
*   **맨몸 어노테이션(bare annotations)을 `global` 또는 `nonlocal`과 동일하게 처리해야 하는가?** 거부된 제안은 함수 본문에서 할당 없는 어노테이션의 존재가 어떤 평가도 수반하지 않아야 한다고 선호했습니다. 이와 대조적으로, 이 PEP는 대상이 단일 이름보다 복잡한 경우, 해당 "왼쪽 부분"이 함수 본문에서 발생하는 지점에서 평가되어야 한다고 암시합니다. 이는 단순히 정의되었는지 확인하기 위함입니다. 예를 들어:
    ```python
    def foo(self):
        slef.name: str
    ```
    여기서 `slef` 이름은 평가되어야 합니다. 만약 정의되지 않았다면 (이 예시에서 그럴 가능성이 높음), 런타임에 오류가 감지될 것입니다. 이는 초기값이 있을 때 발생하는 상황과 더 일치하므로 놀라움을 덜 줄 것으로 예상됩니다. (또한 대상이 `self.name`이었다면, 최적화 컴파일러는 `self`가 확실히 정의될 수 있다고 증명할 수 있는 한 `self`를 평가할 의무가 없다는 점에 유의하십시오).

## 하위 호환성 (Backwards Compatibility)

이 PEP는 완전히 하위 호환됩니다.

## 구현 (Implementation)

Python 3.6용 구현은 GitHub에서 찾을 수 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.