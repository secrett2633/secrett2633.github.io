---
title: "[Final] PEP 451 - A ModuleSpec Type for the Import System"
excerpt: "Python Enhancement Proposal 451: 'A ModuleSpec Type for the Import System'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/451/
toc: true
toc_sticky: true
date: 2025-09-26 22:02:47+0900
last_modified_at: 2025-09-26 22:02:47+0900
published: true
---
> **원문 링크:** [PEP 451 - A ModuleSpec Type for the Import System](https://peps.python.org/pep-0451/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-Aug-2013

## PEP 451 – Import 시스템을 위한 ModuleSpec 타입

**작성자:** Eric Snow
**BDFL-Delegate:** Brett Cannon, Alyssa Coghlan
**토론:** Import-SIG list
**상태:** Final (최종)
**유형:** Standards Track (표준 트랙)
**생성일:** 2013년 8월 8일
**Python 버전:** 3.4
**해결:** Python-Dev message

---

### 초록 (Abstract)

이 PEP는 `importlib.machinery`에 "ModuleSpec"이라는 새로운 클래스를 추가할 것을 제안합니다. 이 클래스는 모듈을 로드하는 데 사용되는 모든 import 관련 정보를 제공하며, 모듈을 먼저 로드할 필요 없이 사용할 수 있습니다. Finders는 (간접적으로 계속 제공하겠지만) loader 대신 모듈의 Spec을 직접 제공하게 됩니다. Import 시스템은 Module Spec을 활용하도록 조정되며, 여기에는 모듈 로딩에 Spec을 사용하는 것이 포함됩니다.

### 용어 및 개념 (Terms and Concepts)

이 제안서의 변경 사항은 현재 모호한 여러 기존 용어 및 개념을 명확하게 만들 기회를 제공합니다. 또한, 이 제안서에서는 새로운 개념도 도입됩니다. 마지막으로, 사람들이 익숙하지 않을 수 있는 몇 가지 다른 기존 용어를 설명할 가치가 있습니다. 맥락을 위해, 이 세 가지 용어 및 개념 그룹에 대한 간략한 요약이 여기에 있습니다. import 시스템에 대한 더 자세한 설명은에서 찾을 수 있습니다.

*   **name**
    이 제안서에서 모듈의 "name"은 완전한 이름(fully-qualified name)을 의미합니다. 즉, 모듈의 부모(있는 경우)의 완전한 이름과 모듈의 단순한 이름이 마침표로 연결된 것입니다.

*   **finder**
    "finder"는 import 시스템이 모듈을 로드하는 데 사용해야 하는 loader를 식별하는 객체입니다. 현재는 finder의 `find_module()` 메서드를 호출하여 loader를 반환함으로써 이 작업을 수행합니다. Finder는 `find_module()` 메서드를 통해 loader를 제공하는 엄격한 책임을 가집니다. 그러면 import 시스템은 해당 loader를 사용하여 모듈을 로드합니다.

*   **loader**
    "loader"는 import 시 모듈을 로드하는 데 사용되는 객체입니다. 현재는 loader의 `load_module()` 메서드를 호출하여 이 작업을 수행합니다. Loader는 또한 로드할 수 있는 모듈에 대한 정보와 해당 모듈과 관련된 소스의 데이터에 대한 API를 제공할 수 있습니다.

    현재 loader(load_module()을 통해)는 특정 상용구(boilerplate), import 관련 작업에 대한 책임이 있습니다. 이러한 작업은 다음과 같습니다:
    *   일부 (모듈 관련) 유효성 검사 수행
    *   모듈 객체 생성
    *   모듈에 import 관련 속성 설정
    *   `sys.modules`에 모듈 "등록"
    *   모듈 실행 (Exec the module)
    *   모듈 로딩 중 실패 시 정리 (Clean up)

    이 모든 것은 import 시스템이 `Loader.load_module()`을 호출하는 동안 발생합니다.

*   **origin**
    이것은 새로운 용어이자 개념입니다. 이 아이디어는 import 시스템에 미묘하게 존재했지만, 이 제안은 이 개념을 명시적으로 만듭니다.
    import 컨텍스트에서 "origin"은 모듈이 유래한 시스템(또는 시스템 내의 리소스)을 의미합니다. 이 제안의 목적을 위해 "origin"은 또한 그러한 리소스 또는 시스템을 식별하는 문자열입니다. "origin"은 모든 모듈에 적용 가능합니다.
    예를 들어, 내장(built-in) 및 고정(frozen) 모듈의 origin은 인터프리터 자체입니다. import 시스템은 이미 이 origin을 각각 "built-in" 및 "frozen"으로 식별합니다. 이는 다음 모듈 repr에서 보여집니다: `<module 'sys' (built-in)>`.
    사실, 모듈 repr은 이미 모듈의 origin을 비교적 신뢰할 수 있지만 암묵적인 지표입니다. 다른 모듈은 "location" 항목에 설명된 다른 수단을 통해 origin을 나타냅니다.
    loader가 모듈의 origin을 어떻게 해석하고 사용할지 여부를 결정하는 것은 loader에 달려 있습니다.

*   **location**
    이것은 새로운 용어입니다. 그러나 이 개념은 모듈의 `__file__` 및 `__path__` 속성과 다른 곳의 "path"라는 이름/용어와 관련하여 import 시스템에 이미 명확하게 존재합니다.
    "location"은 모듈이 로드되는 시스템 전체가 아닌 리소스 또는 "장소"입니다. 이는 "origin"으로 분류됩니다. 위치의 예로는 파일 시스템 경로와 URL이 있습니다. 위치는 리소스의 이름으로 식별되지만, 리소스가 속하는 시스템을 반드시 식별하지는 않을 수 있습니다. 이러한 경우 loader는 시스템 자체를 식별해야 합니다.
    다른 종류의 모듈 origin과 달리, location은 모듈 이름만으로는 loader가 추론할 수 없습니다. 대신, loader는 일반적으로 loader를 생성하는 finder에 의해 문자열 형태로 location을 제공받아야 합니다. 그런 다음 loader는 이 정보를 사용하여 모듈을 로드할 리소스를 찾습니다. 이론적으로 주어진 location에서 다양한 이름으로 모듈을 로드할 수 있습니다.
    import 시스템에서 location의 가장 일반적인 예는 소스 및 확장 모듈이 로드되는 파일입니다. 이 모듈의 경우 location은 `__file__` 속성의 문자열로 식별됩니다. `__file__`이 일부 모듈(예: 압축된 모듈)에 대해 특별히 정확하지는 않지만, 현재 import 시스템이 모듈에 location이 있음을 나타내는 유일한 방법입니다.
    location을 가진 모듈은 "locatable"(위치 지정 가능)이라고 불릴 수 있습니다.

*   **cache**
    import 시스템은 최적화를 위해 컴파일된 모듈을 `__pycache__` 디렉토리에 저장합니다. 오늘날 우리가 사용하는 이 모듈 캐시는 PEP 3147에 의해 제공되었습니다. 이 제안의 경우, 모듈 캐싱과 관련된 관련 API는 모듈의 `__cached__` 속성과 `importlib.util`의 `cache_from_source()` 함수입니다. Loader는 모듈을 캐시에 넣는(그리고 캐시에서 로드하는) 책임을 집니다. 현재 캐시는 컴파일된 소스 모듈에만 사용됩니다. 그러나 loader는 다른 종류의 모듈에 대해서도 모듈 캐시를 활용할 수 있습니다.

*   **package**
    개념도, 용어도 변하지 않습니다. 그러나 모듈과 패키지 간의 구별은 대부분 피상적입니다. 패키지는 모듈입니다. 단지 `__path__` 속성을 가지고 있으며 import 시 서브모듈에 바인딩된 속성을 추가할 수 있습니다. 일반적으로 인식되는 차이점은 혼란의 원인입니다. 이 제안은 타당한 경우 패키지와 모듈 간의 구별을 명시적으로 약화시킵니다.

### 동기 (Motivation)

import 시스템은 Python의 수명 동안 발전해 왔습니다. 2002년 후반 PEP 302는 finders와 loaders, `sys.meta_path`를 통해 표준화된 import 훅을 도입했습니다. Python 3.1과 함께 도입된 `importlib` 모듈은 이제 PEP 302에 설명된 API뿐만 아니라 전체 import 시스템의 순수 Python 구현을 노출합니다. 이제 import 시스템을 이해하고 확장하기가 훨씬 쉬워졌습니다. Python 커뮤니티에 이점이 있지만, 이러한 더 큰 접근성은 또한 도전을 제시합니다.

더 많은 개발자가 import 시스템을 이해하고 커스터마이징함에 따라 finder 및 loader API의 모든 약점이 더 큰 영향을 미칠 것입니다. 따라서 import 시스템의 이러한 약점을 더 빨리 해결할수록 좋습니다… 그리고 이 제안으로 해결하고자 하는 몇 가지 약점이 있습니다.

첫째, import 시스템이 모듈에 대한 정보를 저장해야 할 때마다 일반적으로 import 시스템에만 의미 있는 더 많은 속성이 모듈 객체에 추가됩니다. 향후 import 관련 정보를 넣고 import 시스템 내에서 전달할 수 있는 모듈별 네임스페이스가 있으면 좋을 것입니다. 둘째, finders와 loaders 사이에 API 공백이 있어 불필요한 복잡성을 초래합니다. PEP 420(네임스페이스 패키지) 구현은 이를 우회해야 했습니다. 이 복잡성은 별도의 제안에 대한 최근 노력 중에 다시 나타났습니다 [1, cite: 1].

위의 finder 및 loader 섹션에서는 둘 다의 현재 책임을 자세히 설명합니다. 특히, loader는 `load_module()` 메서드의 기능을 다른 메서드를 통해 제공할 필요가 없습니다. 따라서 모듈에 대한 import 관련 정보는 모듈을 로드하지 않고도 사용할 수 있지만, 다른 방법으로는 노출되지 않습니다.

또한 `load_module()`과 관련된 요구 사항은 모든 loader에 공통적이며 대부분 정확히 동일한 방식으로 구현됩니다. 이는 모든 loader가 동일한 상용구 코드를 복제해야 함을 의미합니다. `importlib.util`은 이를 돕는 몇 가지 도구를 제공하지만, import 시스템이 단순히 이러한 책임을 맡는다면 더 도움이 될 것입니다. 문제는 이것이 `load_module()`이 쉽게 계속 촉진할 수 있는 사용자 정의 수준을 제한할 것이라는 점입니다.

더 중요한 것은, finder가 loader의 `load_module()`이 필요로 하는 정보를 제공할 수 있지만, 현재는 loader에 일관된 방식으로 전달할 방법이 없습니다. 이것이 이 제안이 채우고자 하는 finders와 loaders 사이의 간극입니다.

마지막으로, import 시스템이 finder의 `find_module()`을 호출할 때, finder는 메서드 컨텍스트 외부에서 유용한 모듈에 대한 다양한 정보를 사용합니다. 현재, 메서드 호출 이후 해당 모듈별 정보를 유지하는 옵션은 제한적입니다. 왜냐하면 loader만 반환하기 때문입니다. 이 제한에 대한 인기 있는 옵션은 finder 자체 어딘가에 모듈-정보 매핑으로 정보를 저장하거나 loader에 저장하는 것입니다.

불행히도, loader는 모듈별일 필요가 없습니다. 또한 finder가 제공할 수 있는 유용한 정보 중 일부는 모든 finder에 공통적이므로, 이상적으로는 import 시스템이 해당 세부 정보를 처리할 수 있어야 합니다. 이것은 finders와 loaders 사이의 이전과 동일한 간극입니다.

이러한 결함으로 인한 복잡성의 예로, Python 3.3의 네임스페이스 패키지 구현(PEP 420 참조)은 `FileFinder.find_loader()`를 추가했습니다. 왜냐하면 `find_module()`가 네임스페이스 검색 위치를 제공할 좋은 방법이 없었기 때문입니다.

이 간극에 대한 답은 모듈별 정보를 포함하고 모듈 로딩과 관련된 상용구 기능을 처리하는 `ModuleSpec` 객체입니다.

### 사양 (Specification)

목표는 finders와 loaders의 의미를 가능한 한 적게 변경하면서 그들 사이의 간극을 해결하는 것입니다. 일부 기능과 정보가 새로운 `ModuleSpec` 타입으로 이동하더라도 그들의 동작은 동일하게 유지되어야 합니다. 그러나 명확성을 위해 finder 및 loader 의미가 명시적으로 식별됩니다.

다음은 이 PEP에 설명된 변경 사항에 대한 높은 수준의 요약입니다. 자세한 내용은 이후 섹션에서 제공됩니다.

#### `importlib.machinery.ModuleSpec` (새로운 클래스)

import 시 모듈의 import 시스템 관련 상태를 캡슐화한 것입니다. 자세한 설명은 아래 ModuleSpec 섹션을 참조하십시오.

```python
ModuleSpec(name, loader, *, origin=None, loader_state=None, is_package=None)
```

**속성:**
*   `name` - 모듈의 완전한 이름(fully-qualified name)을 나타내는 문자열.
*   `loader` - 로딩에 사용할 loader.
*   `origin` - 모듈이 로드되는 장소의 이름입니다. 예를 들어, 내장 모듈의 경우 "builtin", 소스에서 로드된 모듈의 경우 파일명입니다.
*   `submodule_search_locations` - 패키지인 경우 서브모듈을 찾을 위치(문자열 목록), 그렇지 않으면 `None`.
*   `loader_state` - 로딩 중에 사용할 추가 모듈별 데이터를 담는 컨테이너.
*   `cached` (속성) - 컴파일된 모듈이 저장되어야 할 위치를 나타내는 문자열.
*   `parent` (읽기 전용 속성) - 모듈이 서브모듈로 속하는 패키지의 완전한 이름 (또는 `None`).
*   `has_location` (읽기 전용 속성) - 모듈의 "origin" 속성이 location을 참조하는지 여부를 나타내는 플래그.

#### `importlib.util` 추가 기능

이들은 finder를 위한 편의를 목적으로 하는 `ModuleSpec` 팩토리 함수입니다. 자세한 내용은 아래 팩토리 함수 섹션을 참조하십시오.

*   `spec_from_file_location(name, location, *, loader=None, submodule_search_locations=None)` - 파일 지향 정보와 loader API로부터 spec을 빌드합니다.
*   `spec_from_loader(name, loader, *, origin=None, is_package=None)` - loader API를 사용하여 누락된 정보를 채워 spec을 빌드합니다.

#### 기타 API 추가 (Other API Additions)

*   `importlib.find_spec(name, path=None, target=None)`는 `importlib.find_loader()`(대체됨)와 정확히 동일하게 작동하지만, loader 대신 spec을 반환합니다.
*   **Finders의 경우:**
    *   `importlib.abc.MetaPathFinder.find_spec(name, path, target)`
    *   `importlib.abc.PathEntryFinder.find_spec(name, target)`
    이들은 import 시 사용할 모듈 spec을 반환합니다.
*   **Loaders의 경우:**
    *   `importlib.abc.Loader.exec_module(module)`은 자체 네임스페이스에서 모듈을 실행합니다. 이는 `importlib.abc.Loader.load_module()`을 대체하며, 모듈 실행 기능을 인계받습니다.
    *   `importlib.abc.Loader.create_module(spec)` (선택 사항)은 로딩에 사용할 모듈을 반환합니다.
*   **모듈의 경우:**
    *   모듈 객체는 새로운 속성인 `__spec__`을 갖게 됩니다.

#### API 변경 (API Changes)

*   `InspectLoader.is_package()`는 선택 사항이 됩니다.

#### 폐지 예정 (Deprecations)

다음 API는 폐지될 예정입니다:
*   `importlib.abc.MetaPathFinder.find_module()`
*   `importlib.abc.PathEntryFinder.find_module()`
*   `importlib.abc.PathEntryFinder.find_loader()`
*   `importlib.abc.Loader.load_module()`
*   `importlib.abc.Loader.module_repr()`
*   `importlib.util.set_package()`
*   `importlib.util.set_loader()`
*   `importlib.find_loader()`

#### 제거 (Removals)

이들은 Python 3.4 출시 이전에 도입되었으므로 단순히 제거될 수 있습니다.
*   `importlib.abc.Loader.init_module_attrs()`
*   `importlib.util.module_to_load()`

#### 기타 변경 사항 (Other Changes)

*   `importlib`의 import 시스템 구현은 `ModuleSpec`을 활용하도록 변경됩니다.
*   `importlib.reload()`는 `ModuleSpec`을 활용합니다.
*   모듈의 import 관련 속성(`__spec__` 제외)은 해당 모듈의 import 시 import 시스템에 의해 직접 사용되지 않습니다. 그러나 이는 다른 모듈(예: 서브모듈)을 로드할 때 해당 속성(예: `__path__`)의 사용에 영향을 미치지 않습니다.
*   import 시스템에 의해서가 아니라면 import 관련 속성이 모듈에 직접 추가되어서는 안 됩니다.
*   모듈 타입의 `__repr__()`은 `ModuleSpec`을 활용하는 순수 Python 구현의 얇은 래퍼가 될 것입니다.
*   `__main__` 모듈의 spec은 적절한 이름과 origin을 반영할 것입니다.

#### 하위 호환성 (Backward-Compatibility)

*   finder가 `find_spec()`을 정의하지 않으면, `find_module()`이 반환한 loader로부터 spec이 파생됩니다.
*   `PathEntryFinder.find_loader()`는 여전히 `find_module()`보다 우선합니다.
*   `exec_module()`이 정의되지 않은 경우 `Loader.load_module()`이 사용됩니다.

#### 변경되지 않는 사항 (What Will not Change?)

*   `import` 문(statement)의 구문 및 의미.
*   기존 finders 및 loaders는 정상적으로 계속 작동합니다.
*   import 관련 모듈 속성은 여전히 동일한 정보로 초기화됩니다.
*   Finders는 여전히 loader를 생성합니다(이제 spec에 저장됨).
*   `Loader.load_module()`은 모듈이 이를 정의하는 경우 모든 동일한 요구 사항을 가지며 여전히 직접 호출될 수 있습니다.
*   Loaders는 여전히 모듈 데이터 API에 대한 책임을 집니다.
*   `importlib.reload()`는 여전히 import 관련 속성을 덮어씁니다.

#### 책임 분담 (Responsibilities)

이 PEP 이후의 책임 분담에 대한 간략한 요약입니다.

**finders:**
*   모듈을 로드할 수 있는 loader를 생성/식별.
*   모듈에 대한 spec 생성.

**loaders:**
*   모듈 생성 (선택 사항).
*   모듈 실행.

**ModuleSpec:**
*   `sys.modules` 관리 및 import 관련 속성 설정을 포함하여 모듈 로딩 상용구(boilerplate) 조율.
*   loader가 `loader.exec_module()`을 호출하지 않으면 모듈 생성 (실행할 모듈을 전달).
*   loader가 모듈을 실행하는 데 필요한 모든 정보 포함.
*   모듈에 대한 `repr` 제공.

#### 기존 Finders 및 Loaders는 무엇을 다르게 해야 하는가? (What Will Existing Finders and Loaders Have to Do Differently?)

당장? 아무것도 없습니다. 현재 상태는 폐지 예정(deprecated)될 것이지만 계속 작동할 것입니다. 그러나 finders 및 loaders의 작성자가 이 PEP와 관련하여 변경해야 할 사항은 다음과 같습니다:
*   finders에 `find_spec()` 구현.
*   가능하면 loaders에 `exec_module()` 구현.

`importlib.util`의 `ModuleSpec` 팩토리 함수는 기존 finders를 변환하는 데 도움이 되도록 고안되었습니다. `spec_from_loader()`와 `spec_from_file_location()`은 이 점에서 모두 간단한 유틸리티입니다.

기존 loader의 경우, `exec_module()`은 `load_module()`의 상용구가 아닌 부분으로부터 비교적 직접적인 변환이어야 합니다. 일부 흔하지 않은 경우 loader는 `create_module()`도 구현해야 합니다.

#### ModuleSpec 사용자 (ModuleSpec Users)

`ModuleSpec` 객체는 3가지 뚜렷한 대상 그룹을 가집니다: Python 자체, import 훅, 그리고 일반 Python 사용자.

Python은 import machinery, 인터프리터 시작 시, 그리고 다양한 표준 라이브러리 모듈에서 spec을 사용할 것입니다. `pkgutil`과 같이 import 지향적인 모듈도 있고, `pickle` 및 `pydoc`과 같이 그렇지 않은 모듈도 있습니다. 모든 경우에 `ModuleSpec` API 전체가 사용될 것입니다.

Import 훅(finders 및 loaders)은 특정 방식으로 spec을 활용할 것입니다. 첫째, finders는 `importlib.util`의 spec 팩토리 함수를 사용하여 spec 객체를 생성할 수 있습니다. spec이 생성된 후 spec 속성을 직접 조정할 수도 있습니다. 둘째, finder는 모듈 생성/실행 중 loader가 소비할 추가 정보(`finder_extras`에)를 spec에 바인딩할 수 있습니다. 마지막으로, loader는 모듈을 생성하거나 실행할 때 spec의 속성을 활용할 것입니다.

Python 사용자는 모듈의 `__spec__`을 검사하여 객체에 대한 import 관련 정보를 얻을 수 있습니다. 일반적으로 Python 애플리케이션 및 대화형 사용자는 `ModuleSpec` 팩토리 함수나 인스턴스 메서드를 사용하지 않을 것입니다.

#### 로딩 작동 방식 (How Loading Will Work)

다음은 모듈의 spec과 새로운 loader API를 활용하도록 조정된 로딩 중에 import machinery가 수행하는 작업에 대한 개요입니다.

```python
module = None
if spec.loader is not None and hasattr(spec.loader, 'create_module'):
    module = spec.loader.create_module(spec)
if module is None:
    module = ModuleType(spec.name)
# The import-related module attributes get set here:
_init_module_attrs(spec, module)
if spec.loader is None and spec.submodule_search_locations is not None:
    # Namespace package
    sys.modules[spec.name] = module
elif not hasattr(spec.loader, 'exec_module'):
    spec.loader.load_module(spec.name)
    # __loader__ and __package__ would be explicitly set here for
    # backwards-compatibility.
else:
    sys.modules[spec.name] = module
    try:
        spec.loader.exec_module(module)
    except BaseException:
        try:
            del sys.modules[spec.name]
        except KeyError:
            pass
        raise
module_to_return = sys.modules[spec.name]
```

이 단계들은 `Loader.load_module()`이 이미 수행하도록 예상되는 것과 정확히 동일합니다. 따라서 loader는 `exec_module()`만 구현하면 되므로 단순화될 것입니다.

`sys.modules`에서 모듈을 반환해야 한다는 점에 유의하십시오. 로딩 중에 모듈이 `sys.modules`에서 자신을 대체했을 수 있습니다. 이 사용 사례를 수용할 사후 import 훅 API가 없으므로 이를 처리해야 합니다. 그러나 교체 사례에서는 객체에 import 관련 모듈 속성을 설정하는 것에 대해 걱정하지 않습니다. 모듈 작성자가 이 작업을 수행하는 경우 스스로 책임져야 합니다.

#### 재로딩 작동 방식 (How Reloading Will Work)

다음은 `reload()`에 대한 해당 개요입니다.

```python
_RELOADING = {}
def reload(module):
    try:
        name = module.__spec__.name
    except AttributeError:
        name = module.__name__
    spec = find_spec(name, target=module)
    if sys.modules.get(name) is not module:
        raise ImportError
    if spec in _RELOADING:
        return _RELOADING[name]
    _RELOADING[name] = module
    try:
        if spec.loader is None:
            # Namespace loader
            _init_module_attrs(spec, module)
            return module
        if spec.parent and spec.parent not in sys.modules:
            raise ImportError
        _init_module_attrs(spec, module)
        # Ignoring backwards-compatibility call to load_module()
        # for simplicity.
        spec.loader.exec_module(module)
        return sys.modules[name]
    finally:
        del _RELOADING[name]
```

여기서 핵심은 `Loader.exec_module()`로의 전환으로 인해 loader가 실행 시 재로딩인지 아닌지를 쉽게 알 수 없게 된다는 것입니다. 이 제안 이전에는 모듈이 이미 `sys.modules`에 있는지 간단히 확인할 수 있었습니다. 이제 로딩(재로딩 아님) 중에 `exec_module()`이 호출될 때쯤이면 import machinery는 이미 모듈을 `sys.modules`에 배치했을 것입니다. 이것이 `find_spec()`에 "target" 매개변수가 있는 이유 중 하나입니다.

`reload`의 의미는 기존과 거의 동일하게 유지됩니다 [5, cite: 1]. 이 PEP가 일부 종류의 지연 로딩 모듈에 미치는 영향은 논의의 대상이었습니다 [4, cite: 1].

### ModuleSpec

#### 속성 (Attributes)

다음의 각 이름은 `ModuleSpec` 객체의 속성입니다. `None` 값은 "설정되지 않음"을 나타냅니다. 이는 속성이 단순히 존재하지 않는 모듈 객체와 대조됩니다. 대부분의 속성은 모듈의 import 관련 속성에 해당합니다. 다음은 매핑입니다. 이 매핑의 역은 import machinery가 `exec_module()`을 호출하기 직전에 모듈 속성을 설정하는 방법을 설명합니다.

| On ModuleSpec | On Modules    |
| :------------ | :------------ |
| `name`        | `__name__`    |
| `loader`      | `__loader__`  |
| `parent`      | `__package__` |
| `origin`      | `__file__`\*  |
| `cached`      | `__cached__`\*,\*\* |
| `submodule_search_locations` | `__path__`\*\* |
| `loader_state`| -             |
| `has_location`| -             |

\* `spec.has_location`이 참인 경우에만 모듈에 설정됩니다.
\*\* spec 속성이 `None`이 아닌 경우에만 모듈에 설정됩니다.

`parent` 및 `has_location`은 읽기 전용 속성이지만, 나머지 속성은 모듈 spec이 생성된 후, 심지어 import가 완료된 후에도 교체될 수 있습니다. 이는 spec을 직접 수정하는 것이 최선의 선택인 특이한 경우를 허용합니다. 그러나 일반적인 사용은 모듈 spec의 상태를 변경하는 것을 포함하지 않아야 합니다.

*   **origin**
    "origin"은 모듈이 유래한 장소의 이름을 나타내는 문자열입니다. 위의 origin 섹션을 참조하십시오. 정보적 가치 외에도 모듈의 `repr`에서도 사용됩니다. "has_location"이 참인 spec의 경우 `__file__`은 "origin" 값으로 설정됩니다. 내장 모듈의 경우 "origin"은 "built-in"으로 설정됩니다.

*   **has_location**
    위의 location 섹션에서 설명했듯이, 많은 모듈은 "locatable"(위치 지정 가능)합니다. 즉, 모듈이 로드될 해당 리소스가 있고 해당 리소스는 문자열로 설명될 수 있습니다. 이와 대조적으로, 위치 지정 불가능한 모듈은 이러한 방식으로 로드될 수 없습니다(예: 내장 모듈 및 코드에서 동적으로 생성된 모듈). 이러한 모듈의 경우 이름이 액세스할 수 있는 유일한 방법이므로 "origin"은 있지만 "location"은 없습니다.
    모듈이 위치 지정 가능하면 "has_location"은 참입니다. 이 경우 spec의 origin이 location으로 사용되며 `__file__`은 `spec.origin`으로 설정됩니다. 추가 위치 정보(예: zipimport)가 필요한 경우 해당 정보는 `spec.loader_state`에 저장될 수 있습니다.
    "has_location"은 loader에 `load_data()` 메서드가 존재하는 것으로부터 암시될 수 있습니다.
    우연히도, 모든 위치 지정 가능 모듈이 캐시 가능하지는 않지만 대부분은 캐시 가능합니다.

*   **submodule_search_locations**
    서브모듈을 검색할 위치 문자열 목록(일반적으로 디렉토리 경로)입니다. 모듈이 패키지인 경우 이 값은 목록(빈 목록도 포함)으로 설정됩니다. 그렇지 않으면 `None`입니다.
    해당 모듈 속성인 `__path__`의 이름은 비교적 모호합니다. 이를 미러링하는 대신, 목적을 명확히 하는 더 명시적인 속성 이름을 사용합니다.

*   **loader_state**
    finder는 `loader_state`를 어떤 값으로든 설정하여 로딩 중에 loader가 사용할 추가 데이터를 제공할 수 있습니다. `None` 값은 기본값이며 추가 데이터가 없음을 나타냅니다. 그렇지 않으면 `dict`, `list` 또는 `types.SimpleNamespace`와 같이 관련 추가 정보를 포함하는 어떤 객체로든 설정할 수 있습니다.
    예를 들어, `zipimporter`는 이를 사용하여 `zip` 아카이브 이름을 loader에 직접 전달할 수 있습니다. 이는 origin에서 파생하거나 각 `find` 작업에 대해 사용자 정의 loader를 생성할 필요 없이 가능합니다.
    `loader_state`는 finder와 해당 loader가 사용하기 위한 것입니다. 다른 용도로 안정적인 리소스가 될 것이라는 보장은 없습니다.

#### 팩토리 함수 (Factory Functions)

*   `spec_from_file_location(name, location, *, loader=None, submodule_search_locations=None)`
    파일 지향 정보와 loader API로부터 spec을 빌드합니다.
    *   "origin"은 location으로 설정됩니다.
    *   "has_location"은 `True`로 설정됩니다.
    *   "cached"는 `cache_from_source()` 호출 결과로 설정됩니다.
    *   "origin"은 `loader.get_filename()`에서 추론될 수 있습니다 (만약 "location"이 전달되지 않았다면).
    *   "loader"는 location이 파일명인 경우 접미사에서 추론될 수 있습니다.
    *   "submodule_search_locations"는 `loader.is_package()` 및 location이 파일명인 경우 `os.path.dirname(location)`에서 추론될 수 있습니다.

*   `spec_from_loader(name, loader, *, origin=None, is_package=None)`
    loader API를 사용하여 누락된 정보를 채워 spec을 빌드합니다.
    *   "has_location"은 `loader.get_data`에서 추론될 수 있습니다.
    *   "origin"은 `loader.get_filename()`에서 추론될 수 있습니다.
    *   "submodule_search_locations"는 `loader.is_package()` 및 location이 파일명인 경우 `os.path.dirname(location)`에서 추론될 수 있습니다.

#### 하위 호환성 (Backward Compatibility)

`ModuleSpec`은 하위 호환성이 없습니다. 만약 `Finder.find_module()`이 loader 대신 모듈 spec을 반환했다면 이야기가 달랐을 것입니다. 그 경우, spec은 대신 반환되었을 loader처럼 작동해야 했을 것입니다. 그렇게 하는 것은 비교적 간단했을 것이지만, 불필요한 복잡성입니다. 이는 이 PEP의 초기 버전의 일부였습니다.

#### 서브클래싱 (Subclassing)

`ModuleSpec`의 서브클래스는 허용되지만, 필요하지는 않아야 합니다. 단순히 `loader_state`를 설정하거나 사용자 정의 finder 또는 loader에 기능을 추가하는 것이 더 적합할 것이며 먼저 시도해야 합니다. 그러나 서브클래스가 import 시스템의 요구 사항을 여전히 충족하는 한, 해당 타입의 객체는 `Finder.find_spec()`의 반환 값으로 완전히 괜찮습니다. 동일한 점이 덕 타이핑(duck-typing)에도 적용됩니다.

### 기존 타입 (Existing Types)

#### 모듈 객체 (Module Objects)

`__spec__`을 추가하는 것 외에는 import 관련 모듈 속성 중 어떤 것도 변경되거나 폐지되지 않을 것입니다. 비록 그 중 일부는 그렇게 될 수 있겠지만, 그러한 폐지는 Python 4까지 기다릴 수 있습니다.

모듈의 spec은 해당 import 관련 속성과 동기화되지 않습니다. 비록 다를 수 있지만, 실제로는 일반적으로 동일할 것입니다.

한 가지 주목할 만한 예외는 `-m` 플래그를 사용하여 모듈이 스크립트로 실행되는 경우입니다. 이 경우 `module.__spec__.name`은 실제 모듈 이름을 반영하는 반면 `module.__name__`은 `__main__`이 될 것입니다.

동일한 이름을 가진 두 모듈 간에 모듈의 spec이 동일하다는 보장은 없습니다. 마찬가지로 `importlib.find_spec()`에 대한 연속적인 호출이 동일한 객체 또는 심지어 동등한 객체를 반환한다는 보장은 없지만, 적어도 후자는 가능성이 높습니다.

#### Finders

Finders는 여전히 모듈을 로드하는 데 사용해야 하는 loader를 식별하고 일반적으로 생성할 책임이 있습니다. 해당 loader는 이제 직접 반환되는 대신 `find_spec()`에 의해 반환되는 모듈 spec에 저장됩니다. 현재 PEP 없이도 마찬가지로, loader 생성이 비용이 많이 드는 경우, 해당 loader는 나중에 비용을 연기하도록 설계될 수 있습니다.

*   `MetaPathFinder.find_spec(name, path=None, target=None)`
*   `PathEntryFinder.find_spec(name, target=None)`

`find_spec()`이 호출될 때 Finders는 `ModuleSpec` 객체를 반환해야 합니다. 이 새로운 메서드는 `find_module()` 및 `find_loader()`(PathEntryFinder의 경우)를 대체합니다. loader에 `find_spec()`이 없으면 하위 호환성을 위해 `find_module()` 및 `find_loader()`가 대신 사용됩니다.

loader에 또 다른 유사한 메서드를 추가하는 것은 실용성의 문제입니다. `find_module()`은 loader 대신 spec을 반환하도록 변경될 수 있습니다. import API가 충분히 고통받았고, 특히 `PathEntryFinder.find_loader()`가 Python 3.3에 막 추가되었다는 점을 고려하면 이는 유혹적입니다. 그러나 추가적인 복잡성과 명시적이지 않은 메서드 이름은 그만한 가치가 없습니다.

#### `find_spec()`의 "target" 매개변수 (The “target” parameter of find_spec())

`find_spec()` 호출에는 선택적으로 "target" 인수가 포함될 수 있습니다. 이것은 나중에 로딩의 대상으로 사용될 모듈 객체입니다. 일반적인 import(및 기본적으로) 중에 "target"은 `None`이며, 이는 대상 모듈이 아직 생성되지 않았음을 의미합니다. 재로딩 중에는 `reload()`에 전달된 모듈이 `find_spec()`에 target으로 전달됩니다. 이 인수를 통해 finder는 다른 방법으로는 사용할 수 없는 더 많은 정보로 모듈 spec을 빌드할 수 있습니다. 이렇게 하는 것은 사용할 loader를 식별하는 데 특히 관련이 있습니다.

`find_spec()`을 통해 finder는 spec에서 반환할 loader를 항상 식별합니다(또는 `None`을 반환). loader가 식별되는 시점에 finder는 또한 "target"이 전달된 경우 loader가 대상 모듈로 로딩을 지원하는지 여부를 결정해야 합니다. 이 결정은 loader와 상의해야 할 수 있습니다.

finder가 loader가 대상 모듈로 로딩을 지원하지 않는다고 판단하면, 다른 loader를 찾거나 `ImportError`를 발생시켜야 합니다(모듈 import를 완전히 중지). 이 결정은 재로딩 중에 특히 중요합니다. 왜냐하면 "재로딩 작동 방식"에서 언급했듯이 loader는 더 이상 재로딩 상황을 자체적으로 쉽게 식별할 수 없기 때문입니다.

"target" 매개변수에 대한 두 가지 대안이 제시되었습니다: `Loader.supports_reload()`와 `find_spec()` 대신 `Loader.exec_module()`에 "target" 추가. `supports_reload()`는 재로딩 상황에 대한 초기 접근 방식이었습니다 [6, cite: 1]. 그러나 loader 특정, 재로딩 중심 접근 방식에 대한 약간의 반대가 있었습니다 [7, cite: 1].

`exec_module()`의 "target"에 관해서는, `load_module()`에서 벗어나면서 더 이상 사용할 수 없게 된 "이 loader가 이 모듈의 재로딩을 지원합니까" 이상의 다른 정보가 재로딩 중에 대상 모듈(또는 spec)에서 loader에 필요할 수 있습니다. 테이블에 있던 제안은 `exec_module()`에 "target"과 같은 것을 추가하는 것이었습니다 [8, cite: 1]. 그러나 대신 `find_spec()`에 "target"을 두는 것이 이 PEP의 목표와 더 일치합니다. 또한 `supports_reload()`의 필요성을 없앱니다.

#### Namespace Packages (네임스페이스 패키지)

현재 경로 엔트리 finder는 `find_loader()`에서 `(None, portions)`을 반환하여 가능한 네임스페이스 패키지의 일부를 찾았음을 나타낼 수 있습니다. 동일한 효과를 얻으려면 `find_spec()`은 "loader"가 `None`(즉, 설정되지 않음)으로 설정되고 `submodule_search_locations`가 `find_loader()`가 제공했을 것과 동일한 `portions`로 설정된 spec을 반환해야 합니다. 그러한 spec을 처리하는 방법은 `PathFinder`에 달려 있습니다.

#### Loaders

*   `Loader.exec_module(module)`
    Loaders는 `exec_module()`이라는 새로운 메서드를 가질 것입니다. 이 메서드의 유일한 임무는 모듈을 "실행"하고 결과적으로 모듈의 네임스페이스를 채우는 것입니다. 모듈 객체를 생성하거나 준비하거나 나중에 정리하는 책임은 없습니다. 반환 값은 없습니다. `exec_module()`은 로딩과 재로딩 모두에 사용될 것입니다.
    `exec_module()`은 여러 번 호출되는 경우를 적절하게 처리해야 합니다. 일부 종류의 모듈의 경우 이는 메서드가 처음 호출된 후 매번 `ImportError`를 발생시키는 것을 의미할 수 있습니다. 이는 일부 종류의 모듈이 인플레이스(in-place) 재로딩을 지원하지 않는 재로딩에 특히 관련이 있습니다.

*   `Loader.create_module(spec)`
    Loaders는 또한 실행할 새로운 모듈을 반환하는 `create_module()`을 구현할 수 있습니다. 기본 모듈 생성 코드를 사용해야 함을 나타내기 위해 `None`을 반환할 수 있습니다. `create_module()`의 사용 사례 중 하나는(비록 일반적이지는 않지만) 내장 모듈 타입의 서브클래스인 모듈을 제공하는 것입니다. 대부분의 loader는 `create_module()`을 구현할 필요가 없을 것입니다.
    `create_module()`은 동일한 spec/모듈에 대해 여러 번 호출되는 경우를 적절하게 처리해야 합니다. 여기에는 `None` 반환 또는 `ImportError` 발생이 포함될 수 있습니다.

**참고:**
`exec_module()` 및 `create_module()`은 import 관련 모듈 속성을 설정해서는 안 됩니다. `load_module()`이 그렇게 하는 것은 이 제안이 수정하려는 설계 결함입니다.

**기타 변경 사항:**
PEP 420은 모듈 타입의 `__repr__()`에서 특수 사례의 양을 제한하기 위해 선택적 `module_repr()` loader 메서드를 도입했습니다. 이 메서드는 `ModuleSpec`의 일부이므로 loader에서는 폐지될 것입니다. 그러나 loader에 존재하는 경우 독점적으로 사용될 것입니다.
Python 3.4 출시 이전에 추가된 `Loader.init_module_attr()` 메서드는 `ModuleSpec`의 동일한 메서드를 선호하여 제거될 것입니다.
그러나 `InspectLoader.is_package()`는 `ModuleSpec`에 동일한 정보가 있음에도 불구하고 폐지되지 않을 것입니다. `ModuleSpec`은 해당 정보를 사용할 수 없는 경우 자체 `is_package`를 채우기 위해 이를 사용할 수 있습니다. 그럼에도 불구하고, 이는 선택 사항으로 만들어질 것입니다.
로딩 중에 모듈을 실행하는 것 외에도 loader는 모듈 관련 데이터에 관한 API를 제공할 책임이 여전히 있습니다.

### 기타 변경 사항 (Other Changes)

`importlib`에서 제공하는 다양한 finders 및 loaders는 이 제안을 준수하도록 업데이트될 것입니다. `stdlib`의 import 관련 API(특히 finders 및 loaders)에 대한 다른 구현 또는 의존성도 이 PEP에 따라 조정될 것입니다. 비록 계속 작동해야 하지만, 놓치게 되는 모든 변경 사항은 Python 3.4.x 시리즈의 버그로 간주되어야 합니다. `__main__` 모듈의 spec은 인터프리터가 시작된 방식을 반영할 것입니다. 예를 들어, `-m`과 함께 사용하면 spec의 이름은 사용된 모듈의 이름이 될 것이며, `__main__.__name__`은 여전히 "`__main__`"이 될 것입니다. `importlib.find_loader()`(폐지 예정)를 미러링하기 위해 `importlib.find_spec()`을 추가할 것입니다. `importlib.reload()`는 `ModuleSpec`을 사용하도록 변경됩니다. `importlib.reload()`는 이제 모듈별 import lock을 활용할 것입니다.

### 참고 구현 (Reference Implementation)

참고 구현은 [http://bugs.python.org/issue18864](http://bugs.python.org/issue18864)에서 사용할 수 있습니다.

### 구현 참고 사항 (Implementation Notes)

*   이 PEP의 구현은 `pkgutil`(및 `setuptools`)에 미치는 영향을 인지해야 합니다. `pkgutil`에는 PEP 302에 대한 일부 일반 함수 기반 확장이 있는데, `importlib`가 도구의 지식 없이 loader를 래핑하기 시작하면 깨질 수 있습니다.
*   다른 검토할 모듈: `runpy`(및 `pythonrun.c`), `pickle`, `pydoc`, `inspect`.
    예를 들어, `pickle`은 `__main__`의 경우 `module.__spec__.name`을 확인하도록 업데이트되어야 합니다.

### 거부된 PEP 추가 사항 (Rejected Additions to the PEP)

이 제안에는 범위에 충분히 맞지 않는 몇 가지 제안된 추가 사항이 있었습니다.

`has_location`, `cached`, `submodule_search_locations`를 분리하는 `ModuleSpec`의 "PathModuleSpec" 서브클래스는 없습니다. 이는 분리를 더 깔끔하게 만들 수 있지만, 모듈 객체는 그러한 구별을 가지지 않습니다. `ModuleSpec`은 두 경우를 동등하게 잘 지원할 것입니다.

"ModuleSpec.is_package"는 간단한 추가 속성일 수 있지만(`self.submodule_search_locations is not None`의 별칭), 모듈과 패키지 사이의 인위적(그리고 대부분 잘못된) 구별을 영속화합니다.

모듈 spec 팩토리 함수는 `ModuleSpec`의 클래스 메서드일 수 있습니다. 그러나 그렇게 하면 `__spec__`을 통해 모든 모듈에 노출되어 고급 Python 사용자가 아닌 사람들을 불필요하게 혼란스럽게 할 가능성이 있습니다. 팩토리 함수는 finder 작성자를 지원하는 특정 사용 사례를 가집니다. "ModuleSpec 사용자"를 참조하십시오.

마찬가지로, import machinery에 의한 모듈 spec의 특정 사용을 노출하는 여러 다른 메서드가 `ModuleSpec`에 추가될 수 있었습니다:
*   `create()` - `Loader.create_module()`의 래퍼.
*   `exec(module)` - `Loader.exec_module()`의 래퍼.
*   `load()` - 폐지된 `Loader.load_module()`의 아날로그.

팩토리 함수와 마찬가지로, `module.__spec__`을 통해 이러한 메서드를 노출하는 것은 바람직하지 않습니다. 이는 "비공개" 속성으로만 노출되더라도(이 PEP의 이전 버전에서 그랬듯이) 매력적인 성가신 존재가 될 것입니다. 나중에 누군가 이러한 메서드가 필요하다고 생각하면, 그때 적절한 API(ModuleSpec과는 별개)를 통해 노출할 수 있습니다. 아마도 PEP 406(import 엔진)과 관련될 수 있습니다.

생각건대, `load()` 메서드는 `sys.modules` 대신 상호 작용할 모듈 목록을 선택적으로 가져올 수 있었습니다. 또한 `load()`는 다중 버전 import를 구현하는 데 활용될 수 있었습니다. 둘 다 흥미로운 아이디어이지만, 이 제안의 범위를 벗어납니다.

생략된 다른 사항:
*   `ModuleSpec.submodules` (읽기 전용 속성) 추가 - spec에 상대적인 가능한 서브모듈 반환.
*   `ModuleSpec.loaded` (읽기 전용 속성) 추가 - `sys.module`의 모듈 (있는 경우).
*   `ModuleSpec.data` 추가 - spec의 loader의 데이터 API를 래핑하는 디스크립터. 또한을 참조하십시오.

### 참고 자료 (References)

 https://mail.python.org/pipermail/import-sig/2013-August/000658.html
 http://docs.python.org/3/reference/import.html
 https://mail.python.org/pipermail/import-sig/2013-September/000735.html
 https://mail.python.org/pipermail/python-dev/2013-August/128129.html
 http://bugs.python.org/issue19413
 https://mail.python.org/pipermail/python-dev/2013-October/129913.html
 https://mail.python.org/pipermail/python-dev/2013-October/129971.html
 https://mail.python.org/pipermail/python-dev/2013-October/129933.html

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.