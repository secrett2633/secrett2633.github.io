---
title: "[Withdrawn] PEP 422 - Simpler customisation of class creation"
excerpt: "Python Enhancement Proposal 422: 'Simpler customisation of class creation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/422/
toc: true
toc_sticky: true
date: 2025-09-26 21:38:32+0900
last_modified_at: 2025-09-26 21:38:32+0900
published: true
---
> **원문 링크:** [PEP 422 - Simpler customisation of class creation](https://peps.python.org/pep-0422/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 05-Jun-2012


The provided document is PEP 422 – "Simpler customisation of class creation".
**참고:** 이 PEP는 PEP 487이 더 간단하고 사용하기 쉬운 `__init_subclass__` 훅을 통해 동일한 목표를 달성하므로 현재 **철회(Withdrawn)**된 상태입니다.

---

## PEP 422: 클래스 생성 사용자 정의 간소화

### 초록 (Abstract)
현재 Python에서 클래스 생성을 사용자 정의(customizing)하려면 커스텀 메타클래스(custom metaclass)를 사용해야 합니다. 이러한 커스텀 메타클래스는 클래스의 전체 수명 주기 동안 유지되며, 불필요한 메타클래스 충돌(metaclass conflicts)을 야기할 수 있습니다.

PEP 422는 이러한 문제를 해결하기 위해 클래스 헤더(class header)에 새로운 `namespace` 매개변수와 클래스 본문(class body)에 새로운 `__autodecorate__` 훅(hook)을 도입하여 다양한 사용자 정의 시나리오를 지원할 것을 제안했습니다. 이 새로운 메커니즘은 커스텀 메타클래스를 구현하는 것보다 이해하고 사용하기 쉬워, Python 메타클래스 기능의 강력함을 더 쉽게 접할 수 있도록 돕고자 했습니다.

### PEP 철회 (PEP Withdrawal)
이 제안은 Martin Teichmann의 PEP 487 제안에 찬성하여 철회되었습니다. PEP 487은 `__init_subclass__`라는 더 간단하고 사용하기 쉬운 훅을 통해 동일한 목표를 달성하며, 이 훅은 훅을 정의하는 기본 클래스(base class)에는 호출되지 않습니다.

### 배경 (Background)
`cls`라는 이미 생성된 클래스에 대해 "메타클래스(metaclass)"라는 용어는 `type(cls)`의 값을 의미합니다. 그러나 클래스 생성 중에는 클래스 정의의 일부로 제공될 수 있는 메타클래스 힌트(metaclass hint)를 참조하는 데도 사용됩니다. 대부분의 경우 이 두 가지 의미는 동일한 객체를 가리키지만, 다음과 같은 두 가지 상황에서는 다를 수 있습니다.

1.  메타클래스 힌트가 `type`의 인스턴스를 참조하는 경우, 정의될 클래스의 모든 부모(parents)의 메타클래스와 함께 후보 메타클래스로 간주됩니다. 후보 중에서 더 적절한 메타클래스가 발견되면, 힌트에 지정된 메타클래스 대신 사용됩니다.
2.  명시적인 메타클래스 힌트가 팩토리 함수(factory function)로 간주되어 클래스 객체를 직접 생성하는 데 호출되는 경우, 최종 메타클래스는 팩토리 함수 정의에 의해 결정됩니다.

Python 3에서는 `class Header(metaclass=Meta):`와 같이 클래스 헤더에서 `metaclass` 키워드 인수를 사용하여 메타클래스 힌트를 제공합니다. 이는 메타클래스의 `__prepare__` 메서드를 사용하여 클래스 본문 실행 중에 사용되는 `locals()` 네임스페이스를 생성할 수 있도록 합니다. (예: 일반 `dict` 대신 `collections.OrderedDict` 사용).

Python 2에서는 `__prepare__` 메서드가 없었으며, 대신 클래스 본문이 `__metaclass__` 속성을 설정할 수 있었고, 클래스 생성 프로세스는 이 값을 클래스 네임스페이스에서 추출하여 메타클래스 힌트로 사용했습니다.

Python 3의 또 다른 새로운 기능은 PEP 3135에 의해 도입된 `super()` 빌트인 함수의 인자 없는 형태입니다. 이 기능은 정의될 클래스에 대한 암시적 `__class__` 참조를 사용하여 Python 2에서 필요했던 "이름으로" 참조를 대체합니다. 메타클래스가 제어를 클래스 생성 메커니즘으로 반환한 후에야 `__class__`가 채워지기 때문에, Python 3 메타클래스는 암시적 `__class__` 참조에 의존하는 메서드를 호출할 수 없습니다.

마지막으로, 클래스가 커스텀 메타클래스를 사용하는 경우, 관련 없는 메타클래스를 가진 부모 클래스에서 상속할 수 없으므로 다중 상속(multiple inheritance) 사용에 추가적인 어려움을 초래할 수 있습니다. 이는 이미 배포된 클래스에 메타클래스를 추가하는 것이 메타클래스 충돌 위험 때문에 역호환성(backwards incompatible)을 깨뜨리는 변경이 된다는 것을 의미합니다.

### 제안 (Proposal)
이 PEP는 Python 3.4에 클래스 생성을 사용자 정의하는 새로운 메커니즘을 추가하여 다음 기준을 충족할 것을 제안했습니다.
*   클래스 상속 구조(믹스인(mixins) 및 다중 상속 포함)와 잘 통합될 것.
*   PEP 3135에 의해 도입된 암시적 `__class__` 참조 및 인자 없는 `super()` 문법과 잘 통합될 것.
*   역호환성 문제를 야기할 위험 없이 기존 기본 클래스에 추가될 수 있을 것.
*   클래스 네임스페이스가 클래스 생성 프로세스에 어느 정도 영향을 미칠 수 있는 능력을 복원하지만, Python 2 스타일 `__metaclass__` 훅의 완전한 유연성은 아닐 수 있음.

이 목표를 달성할 수 있는 한 가지 메커니즘은 기존의 명시적 클래스 데코레이터(explicit class decorators)를 직접 모델로 삼아, 클래스 정의 헤더의 일부가 아닌 클래스 본문이나 부모 클래스에 정의된 새로운 암시적 클래스 데코레이션 훅(implicit class decoration hook)을 추가하는 것입니다.

구체적으로, 클래스 정의가 다음과 같이 클래스 초기화 훅을 제공할 수 있도록 제안되었습니다.

```python
class Example:
    def __autodecorate__(cls):
        # 이 훅은 클래스가 생성된 후, 명시적 데코레이터가 호출되기 전에 호출됩니다.
        # 일반적인 super() 메커니즘은 다중 상속을 올바르게 지원하는 데 사용됩니다.
        # 클래스 데코레이터 스타일 시그니처는 부모 클래스를 호출하는 것을 최대한 간단하게 만듭니다.
        cls = super().__autodecorate__()
        return cls
```

협력적 다중 상속(cooperative multiple inheritance)을 단순화하기 위해 `object`는 클래스를 수정하지 않고 반환하는 훅의 기본 구현을 얻게 됩니다.

```python
class object:
    def __autodecorate__(cls):
        return cls
```

`__autodecorate__`가 호출될 때, 클래스의 이름은 아직 새 클래스 객체에 바인딩되지 않습니다. 따라서 두 인자 형태의 `super()`는 메서드를 호출하는 데 사용될 수 없습니다 (예: `super(Example, cls)`는 위 예제에서 작동하지 않습니다). 그러나 `__class__` 참조가 이미 초기화되었기 때문에 인자 없는 `super()`는 예상대로 작동합니다.

또한, 이 PEP는 `type.__prepare__`가 `namespace` 키워드 전용 인수로 팩토리 함수를 받아들이도록 업데이트될 것을 제안했습니다. 이 인수가 제공되면, `namespace` 인수로 제공된 값은 `type.__prepare__`의 결과를 생성하기 위해 인자 없이 호출됩니다. 예를 들어, 다음은 정렬된 딕셔너리(ordered dictionary)를 클래스 네임스페이스로 사용합니다.

```python
class OrderedExample(namespace=collections.OrderedDict):
    def __autodecorate__(cls):
        # cls.__dict__는 여전히 클래스 네임스페이스에 대한 읽기 전용 프록시이지만,
        # 기본 스토리지(underlying storage)는 OrderedDict 인스턴스입니다.
```

### 주요 이점 (Key Benefits)

*   **클래스를 위한 커스텀 네임스페이스 사용 용이성:** 현재 `collections.OrderedDict`와 같은 다른 타입을 클래스 네임스페이스로 사용하거나 미리 채워진(pre-populated) 네임스페이스를 사용하려면 커스텀 메타클래스를 작성해야 합니다. 이 PEP가 있다면, 커스텀 네임스페이스 사용은 클래스 헤더에 적절한 팩토리 함수를 지정하는 것만큼 간단해집니다.
*   **정의 시간 동작(Definition Time Behaviour)의 상속 용이성:** Python의 메타클래스를 이해하려면 타입 시스템과 클래스 생성 프로세스에 대한 깊은 이해가 필요합니다. 제안된 암시적 클래스 데코레이션 훅을 이해하는 것은 데코레이터와 일반적인 메서드 상속을 이해하는 것만을 요구하며, 이는 메타클래스보다 덜 부담스러운 작업입니다.
*   **메타클래스 충돌 위험 감소:** 메타클래스 사용을 꺼리게 만드는 큰 문제 중 하나는 메타클래스 충돌 위험입니다. 이는 클래스 정의의 원하는 부모가 관련 없는 두 메타클래스를 사용할 때 발생합니다. 반대로, 기존 타입에 `__autodecorate__` 메서드를 추가하는 것은 `__init__` 메서드를 추가하는 것과 비슷한 수준의 위험을 초래합니다.
*   **PEP 3135와의 깔끔한 통합:** 메타클래스의 일부로 실행되는 코드와 달리, 새로운 훅의 일부로 실행되는 코드는 PEP 3135에 의해 도입된 암시적 `__class__` 참조에 의존하는 클래스 메서드를 자유롭게 호출할 수 있습니다.
*   **`__metaclass__` 동적 설정의 많은 사용 사례 대체:** 정의된 클래스를 완전히 대체하지 않는 사용 사례의 경우, Python 2에서 `__metaclass__`를 동적으로 설정했던 코드는 이제 대신 `__autodecorate__`를 동적으로 설정할 수 있습니다.

### 디자인 노트 (Design Notes)

*   **데코레이션되는 클래스가 기본 클래스인지 확인:** `__autodecorate__` 메서드 본문에서는 다른 클래스 메서드와 마찬가지로 `__class__`는 메서드를 선언하는 클래스에 바인딩되고, 전달되는 값은 서브클래스일 수 있습니다. 이를 통해 필요할 경우 기본 클래스 처리를 건너뛰는 것이 비교적 간단해집니다.
*   **클래스를 다른 종류의 객체로 교체:** 암시적 데코레이터로서 `__autodecorate__`는 정의된 클래스를 다른 종류의 객체로 비교적 쉽게 교체할 수 있습니다.

### 열린 질문 (Open Questions)

*   **네임스페이스 개념이 추가적인 복잡성을 감당할 가치가 있는가?** 제안된 `namespace` 키워드 인수는 서브클래스에 의해 자동으로 상속되지 않습니다. 서브클래스에서 일관되게 특별한 네임스페이스를 사용하려면 여전히 적절한 `__prepare__` 구현을 가진 커스텀 메타클래스를 작성해야 합니다. 커스텀 네임스페이스 팩토리를 상속되도록 변경하면 이 제안의 복잡성이 상당히 증가하고, 커스텀 메타클래스 사용 시 발생하는 것과 동일한 잠재적 기본 클래스 충돌 문제가 발생할 수 있습니다.

### 새로운 클래스 사용 방식 (New Ways of Using Classes)
클래스 헤더의 새로운 `namespace` 키워드는 클래스가 초기화되는 방식을 제어하는 여러 흥미로운 옵션을 제공하며, Javascript 및 Ruby의 객체 모델 일부 측면을 포함합니다. 아래의 모든 예시는 현재 커스텀 메타클래스를 통해 실제로 가능합니다.

*   **순서 보존 클래스 (Order preserving classes):**
    ```python
    class OrderedClass(namespace=collections.OrderedDict):
        a = 1
        b = 2
        c = 3
    ```
*   **미리 채워진 네임스페이스 (Prepopulated namespaces):**
    ```python
    seed_data = dict(a=1, b=2, c=3)
    class PrepopulatedClass(namespace=seed_data.copy):
        pass
    ```
*   **프로토타입 클래스 복제 (Cloning a prototype class):**
    ```python
    class NewClass(namespace=Prototype.__dict__.copy):
        pass
    ```
*   **클래스 확장 (Extending a class):**
    ```python
    from collections import MutableMapping
    class ClassNamespace(MutableMapping, dict):
        def __init__(self, cls):
            self._cls = cls
        def __len__(self):
            return len(dir(self._cls))
        def __iter__(self):
            for attr in dir(self._cls):
                yield attr
        def __contains__(self, attr):
            return hasattr(self._cls, attr)
        def __getitem__(self, attr):
            return getattr(self._cls, attr)
        def __setitem__(self, attr, value):
            setattr(self._cls, attr, value)
        def __delitem__(self, attr):
            delattr(self._cls, attr)
        def extend(cls):
            return lambda: ClassNamespace(cls)
    class Example: pass
    class ExtendedExample(namespace=extend(Example)):
        a = 1
        b = 2
        c = 3
    >>> Example.a, Example.b, Example.c
    (1, 2, 3)
    ```

### 거부된 디자인 옵션 (Rejected Design Options)

*   **`__autodecorate__`를 `type.__init__`에서 호출:** `type.__init__`에서 새 훅을 자동으로 호출하는 것은 이 PEP의 대부분의 목표를 달성할 수 있었지만, `__class__` 참조에 의존하거나 인자 없는 `super()` 형태를 사용하는 메서드를 `__autodecorate__` 구현이 호출할 수 없게 만들었을 것입니다.
*   **자동 데코레이션 훅 이름을 `__init_class__`로 사용:** 초기 버전의 PEP는 새 훅의 이름으로 `__init_class__`를 사용했습니다. 이 이름에는 세 가지 중요한 문제가 있었습니다.
    *   정확한 철자가 `__init_class__`인지 `__class_init__`인지 기억하기 어려웠습니다.
    *   이름에 "init"을 사용하면 시그니처가 `type.__init__`과 일치해야 한다고 제안했지만 실제로는 그렇지 않았습니다.
    *   이름에 "init"을 사용하면 메서드가 초기 클래스 객체 생성의 일부로 실행될 것이라고 제안했지만 실제로는 그렇지 않았습니다.
    새로운 이름 `__autodecorate__`는 새로운 초기화 훅이 `__init__` 메서드와 유사하기보다는 암시적으로 호출되는 클래스 데코레이터로 가장 유용하게 생각될 수 있음을 명확히 하기 위해 선택되었습니다.
*   **`__autodecorate__`에 명시적 데코레이터 요구:** 원래 이 PEP는 `__autodecorate__` 데코레이터에 `@classmethod`의 명시적 사용을 요구했습니다. 이를 생략하는 데 합리적인 해석이 없기 때문에 암시적으로 처리되었으며, 유용한 오류 메시지를 제공하기 위해 해당 경우는 어쨌든 감지되어야 했습니다.
*   **`__autodecorate__`를 `__new__`처럼 암시적으로 정적으로 만들기:** `__new__`는 인스턴스화될 클래스를 첫 번째 인수로 받지만 실제로는 클래스 메서드라기보다 정적 메서드로 암시적으로 처리됩니다. 이 동작은 `__autodecorate__` 훅에 잠재적으로 유용해 보였지만, 실제로 올바르게 작동하려면 서브클래스에서 호출되어야 했으므로, 이러한 겉보기상의 지원은 환상에 불과했습니다.
*   **팩토리 함수 대신 네임스페이스를 직접 전달:** 한때 이 PEP는 클래스 네임스페이스를 팩토리 함수 대신 키워드 인수로 직접 전달할 것을 제안했습니다. 그러나 이는 지원되지 않는 동작(예: 여러 클래스에 동일한 네임스페이스를 전달하거나 클래스 네임스페이스로 사용되는 매핑에 직접 쓰기 액세스 유지)을 장려하므로 API는 팩토리 함수 버전으로 변경되었습니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.