---
title: "[Final] PEP 487 - Simpler customisation of class creation"
excerpt: "Python Enhancement Proposal 487: 'Simpler customisation of class creation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/487/
toc: true
toc_sticky: true
date: 2025-09-26 22:33:21+0900
last_modified_at: 2025-09-26 22:33:21+0900
published: true
---
> **원문 링크:** [PEP 487 - Simpler customisation of class creation](https://peps.python.org/pep-0487/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Feb-2015

PEP 487 – 클래스 생성 사용자 정의 간소화

## 개요
이 PEP (Python Enhancement Proposal)는 클래스 생성 시 사용자 정의 방식을 간소화하기 위해 `__init_subclass__` 훅(hook)과 `__set_name__` 훅을 도입합니다. 기존에는 메타클래스(metaclass)를 통해 클래스 생성을 사용자 정의했지만, 이는 메타클래스 충돌(metaclass conflicts)과 같은 복잡성을 야기했습니다. 새로운 메커니즘은 메타클래스보다 이해하고 사용하기 쉬워, 파이썬의 메타클래스 기능에 대한 보다 부드러운 진입점을 제공합니다.

## 배경
메타클래스는 클래스 생성을 사용자 정의하는 강력한 도구이지만, 여러 메타클래스를 자동으로 결합하는 방법이 없다는 문제가 있습니다. 이는 서로 다른 라이브러리에서 온 두 개의 기본 클래스를 상속할 때 예기치 않게 복합 메타클래스를 수동으로 생성해야 하는 상황을 초래할 수 있습니다.

## 제안
이 PEP는 메타클래스의 일반적인 사용 사례 중 대부분을 다음 두 가지 훅으로 해결할 것을 제안합니다.

1.  **`__init_subclass__` 훅** : 특정 클래스의 모든 서브클래스가 생성될 때 초기화 코드를 실행하는 클래스 메서드 훅입니다.
    예시:
    ```python
    class QuestBase:
        def __init_subclass__(cls, swallow, **kwargs):
            cls.swallow = swallow
            super().__init_subclass__(** kwargs)

    class Quest(QuestBase, swallow="african"):
        pass

    print(Quest.swallow) # 출력: african
    ```
    이 훅은 암묵적으로 `@classmethod`로 동작하며, 협력적 다중 상속(cooperative multiple inheritance)을 위한 종단점 역할을 합니다.

2.  **`__set_name__` 훅** : 클래스 바디에 정의된 모든 어트리뷰트(특히 디스크립터)가 클래스에 바인딩될 때 호출됩니다. 이 훅은 디스크립터가 자신의 `owner` 클래스와 클래스 내에서의 `name`을 알 수 있도록 하여, 메타클래스 없이도 디스크립터를 더 유용하게 사용할 수 있게 합니다.
    예시:
    ```python
    import weakref

    class WeakAttribute:
        def __get__(self, instance, owner):
            return instance.__dict__[self.name]()
        def __set__(self, instance, value):
            instance.__dict__[self.name] = weakref.ref(value)
        # 새로운 초기화 훅:
        def __set_name__(self, owner, name):
            self.name = name

    class TreeNode:
        parent = WeakAttribute()
        def __init__(self, parent):
            self.parent = parent
    ```
    이 예시에서 `parent` 어트리뷰트는 약한 참조(weak reference)로 저장되어 순환 참조를 방지하고 가비지 컬렉션을 용이하게 합니다.

## 주요 이점
*   **클래스 정의 시 동작 상속의 용이성** : 메타클래스에 비해 `__init_subclass__`는 일반적인 메서드 상속과 유사하여 이해하기 쉽고, 클래스 정의 프로세스의 단계들을 점진적으로 이해하는 데 도움이 됩니다.
*   **메타클래스 충돌 가능성 감소** : `__init_subclass__` 메서드를 기존 타입에 추가하는 것은 `__init__` 메서드를 추가하는 것과 유사한 수준의 위험을 가지며, 라이브러리 작성자가 하위 호환성(backward compatibility)을 깨뜨릴 위험이 줄어듭니다. 이는 라이브러리 작성자들이 메타클래스 사용을 주저하게 만드는 주요 원인이었습니다.

## 클래스 사용의 새로운 방법
이 새로운 훅들은 다양한 클래스 디자인 패턴을 메타클래스 없이 구현할 수 있게 합니다.

*   **서브클래스 등록** : 플러그인 시스템과 같이 새로운 서브클래스를 등록할 때 유용합니다.
    ```python
    class PluginBase:
        subclasses = []
        def __init_subclass__(cls, **kwargs):
            super().__init_subclass__(** kwargs)
            cls.subclasses.append(cls)
    ```
*   **트레잇(Trait) 디스크립터** : 값의 범위를 확인하는 등 특정 "트레잇"을 구현하는 디스크립터를 메타클래스의 도움 없이 구현할 수 있습니다.

## 구현 세부 사항
훅은 다음과 같은 순서로 호출됩니다.
1.  `type.__new__`는 새로운 클래스가 초기화된 후 디스크립터의 `__set_name__` 훅을 호출합니다.
2.  이후 `super().__init_subclass__`를 통해 기본 클래스의 `__init_subclass__`를 호출합니다. 이는 서브클래스 초기화 시 이미 완전히 초기화된 디스크립터를 볼 수 있음을 의미합니다.

PEP 487은 `type.__init__`이 키워드 인수를 명시적으로 금지하는 현재 CPython의 불일치점을 개선하고, `type.__init__`이 키워드 인수를 무시하도록 변경합니다.

## 하위 호환성 문제
`type.__new__`의 정확한 호출 시퀀스가 약간 변경되지만, 일반적인 사용 사례는 의도한 대로 동작하도록 보장됩니다.
메타클래스가 `__new__` 메서드만 정의하고 키워드 인수를 처리하는 경우, 더 이상 `__init__` 메서드를 정의할 필요가 없으며, 이는 `__new__`를 오버라이드(override)하는 권장 사항과 일치합니다. 다만 `type.__new__`의 인수를 키워드 인수로 전달하는 방식은 `TypeError`를 발생시키지만, 이는 드문 경우이며 쉽게 수정 가능합니다.

## 기각된 디자인 옵션
이 PEP는 PEP 422에서 제안되었던 `__autodecorate__`와 같은 다른 훅이나 메타클래스처럼 클래스를 반환하는 방식 등 여러 대안을 검토했으나, 현재의 `__init_subclass__`와 `__set_name__` 방식을 채택했습니다. `__init_subclass__`에 명시적인 `@classmethod` 데코레이터를 요구하는 방안도 고려되었으나, 암묵적으로 동작하도록 결정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.