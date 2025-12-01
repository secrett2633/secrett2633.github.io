---
title: "[Final] PEP 302 - New Import Hooks"
excerpt: "Python Enhancement Proposal 302: 'New Import Hooks'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/302/
toc: true
toc_sticky: true
date: 2025-09-26 18:08:12+0900
last_modified_at: 2025-09-26 18:08:12+0900
published: true
---
> **원문 링크:** [PEP 302 - New Import Hooks](https://peps.python.org/pep-0302/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Dec-2002



# PEP 302 – 새로운 임포트 훅 (New Import Hooks)

*   **작성자** : Just van Rossum, Paul Moore
*   **상태** : Final (최종)
*   **유형** : Standards Track (표준 트랙)
*   **작성일** : 2002년 12월 19일
*   **Python 버전** : 2.3

**경고** : 임포트에 대한 언어 참조 및 `importlib` 문서가 현재 이 PEP를 대체합니다. 이 문서는 더 이상 업데이트되지 않으며 역사적 목적으로만 제공됩니다.

## 개요 (Abstract)

이 PEP는 Python 임포트 메커니즘을 더 잘 사용자 정의할 수 있는 새로운 임포트 훅 세트를 추가할 것을 제안합니다. 기존의 `__import__` 훅과 달리, 새로운 방식의 훅은 기존 스키마에 주입(inject)될 수 있어 모듈이 발견되고 로드되는 방식에 대해 더 세밀한 제어가 가능합니다.

## 동기 (Motivation)

현재 임포트 메커니즘을 사용자 정의하는 유일한 방법은 내장 함수인 `__import__`를 오버라이드(override)하는 것입니다. 하지만 `__import__`를 오버라이드하는 것은 다음과 같은 여러 가지 문제를 가지고 있습니다.

*   `__import__`를 대체하는 코드는 전체 임포트 메커니즘을 완전히 재구현하거나, 사용자 정의 코드 전후에 원래 `__import__`를 호출해야 합니다. 이는 매우 복잡한 의미와 책임을 가집니다.
*   `__import__`는 `sys.modules`에 이미 있는 모듈에 대해서도 호출되는데, 이는 모니터링 도구를 작성하는 경우가 아니라면 거의 원하지 않는 동작입니다.
*   C 언어에서 임포트 메커니즘을 확장해야 할 경우, 현재는 Python의 `import.c`를 직접 수정하거나 `import.c`의 많은 부분을 처음부터 재구현하는 것 외에는 불가능합니다.

과거에는 `__import__` 훅을 기반으로 임포트 메커니즘을 확장하는 다양한 Python 도구들이 있었습니다 (`ihooks.py`, `imputil.py`, `iu.py` 등). 하지만 이러한 도구들은 Python으로 작성되었기 때문에 부트스트랩(bootstrapping) 문제 등 유용성에 한계가 있었습니다. 예를 들어, 전체 표준 라이브러리를 임포트 훅에서 로드하려면 훅 자체가 C로 작성되어야 했습니다.

## 사용 사례 (Use cases)

이 섹션에서는 임포트 훅에 의존하는 몇 가지 기존 애플리케이션을 나열합니다. 당시 더 유연한 임포트 훅이 있었다면 절약할 수 있었을 많은 중복 작업이 수행되었습니다. 이 PEP는 미래의 유사한 프로젝트들을 훨씬 더 쉽게 만들 것입니다.

임포트 메커니즘의 확장은 모듈이 비표준적인 방식으로 저장되어 있을 때 필요합니다. 예를 들어, 다음과 같은 경우입니다.

*   아카이브(archive) 안에 함께 묶인 모듈들
*   `.pyc` 형식 파일에 저장되지 않은 바이트코드(byte code)
*   네트워크를 통해 데이터베이스에서 로드되는 모듈

이 PEP에 대한 작업은 부분적으로 Zip 아카이브에서 임포트하는 기능을 Python에 내장 기능으로 추가하는 PEP 273의 구현에 의해 촉발되었습니다. PEP 273 구현은 `import.c`에 많은 코드를 추가해야 했는데, 이는 기존 `import.c`의 한계 때문이었습니다.

최종 사용자를 위한 애플리케이션 패키징(packaging)은 임포트 훅의 전형적인 사용 사례입니다. 많은 소스 파일이나 `.pyc` 파일을 배포하는 것이 항상 적절하지 않으므로 (별도의 Python 설치는 말할 것도 없고), 필요한 모든 모듈을 단일 파일로 묶으려는 요구가 자주 있었습니다. 이러한 요구로 인해 `Freeze`, `Squeeze`, `Installer`, `py2exe`, `BuildApplication`과 같은 여러 솔루션이 구현되었습니다. 이 PEP에서 제안하는 훅은 `import.c`에 하드코딩된 훅을 제거하고, `__import__` 기반 도구들이 `import.c` 에뮬레이션(emulation) 코드를 대부분 없앨 수 있도록 할 것입니다.

## 근거 (Rationale)

내장 Zip 임포트를 구현하기 위한 대안적인 아이디어를 실험하던 중, `import.c`에 비교적 적은 변경만으로도 이것이 가능하다는 것이 발견되었습니다. 이로 인해 Zip 관련 특정 기능을 새로운 소스 파일로 분리하는 동시에, 일반적인 새로운 임포트 훅 스키마(현재 이 PEP에서 설명하는 방식)를 만들 수 있게 되었습니다.

초기 디자인에서는 `sys.path`에 문자열이 아닌 객체를 허용했습니다. 이러한 객체는 임포트를 처리하는 데 필요한 메서드를 가질 수 있었습니다. 하지만 이 방식은 두 가지 단점이 있었습니다.
1.  `sys.path`의 모든 항목이 문자열이라고 가정하는 코드를 깨뜨립니다.
2.  `PYTHONPATH` 환경 변수와 호환되지 않습니다.

이후 Jython에서 아이디어를 얻어 `sys.path`에 문자열 서브클래스를 허용하는 타협안이 제시되었으나, "보기 흉한 해킹"으로 인식되었습니다.

결과적으로, 각 `sys.path` 항목을 처리할 수 있는지 `sys.path_hooks`의 후보 목록을 순회하며 묻는 방식(McMillan의 `iu.py`에서 대부분 복사)이 채택되었습니다. 이 후보 목록은 `sys` 모듈의 새로운 객체인 `sys.path_hooks`입니다.

각 새로운 임포트 시 `sys.path_hooks`를 순회하는 것은 비용이 많이 들 수 있으므로, 그 결과는 `sys.path_importer_cache`라는 또 다른 `sys` 모듈의 새로운 객체에 캐시됩니다. 이것은 `sys.path` 항목을 임포터(importer) 객체에 매핑합니다.

`import.c`에 미치는 영향을 최소화하고 추가 오버헤드를 피하기 위해, 기존 파일 시스템 임포트 로직에 대한 명시적인 훅이나 임포터 객체를 추가하지 않고, `sys.path_hooks`의 어떤 훅도 경로 항목을 처리할 수 없을 경우 단순히 내장 로직으로 폴백(fall back)하도록 선택되었습니다. 이 경우 `None` 값이 `sys.path_importer_cache`에 저장되어 반복적인 조회를 피합니다.

`sys.path` 항목이 필요 없는 임포터(예: 내장 및 프로즌 모듈)에 대한 질문이 제기되었고, Gordon McMillan의 `iu.py`에 있는 "메타패스(metapath)" 개념이 도입되었습니다. 이 PEP의 구현에서는 `sys.path`가 순회되기 전에 순회되는 임포터 객체 목록이며, `sys.meta_path`라는 새로운 `sys` 모듈 객체입니다.

## 사양 1부: 임포터 프로토콜 (Specification part 1: The Importer Protocol)

이 PEP는 "임포터 프로토콜"이라는 새로운 프로토콜을 소개합니다. 프로토콜이 작동하는 컨텍스트를 이해하는 것이 중요하므로, 임포트 메커니즘의 외부 흐름을 간략하게 설명합니다.

`import` 문이 나타나면 인터프리터는 내장 이름 공간에서 `__import__` 함수를 찾습니다. `__import__`는 모듈 이름과 현재 전역 이름 공간에 대한 참조를 포함한 네 가지 인수로 호출됩니다. 내장 `__import__` 함수는 모듈이 패키지 또는 패키지의 서브모듈인지 확인하고, 해당될 경우 패키지에 상대적으로 임포트를 시도합니다. 실패하면 절대 임포트(absolute import)로 진행됩니다.

임포터 프로토콜은 개별 임포트 수준에서 작동합니다. `spam.ham` 임포트 요청이 임포터에게 전달될 때, `spam` 모듈은 이미 임포트되어 있습니다.

프로토콜은 `finder`와 `loader`, 두 가지 객체를 포함합니다.

### Finder (파인더)

`finder` 객체는 단일 메서드를 가집니다.

*   `finder.find_module(fullname, path=None)`
    *   이 메서드는 모듈의 완전한 이름(fully qualified name)으로 호출됩니다.
    *   `finder`가 `sys.meta_path`에 설치된 경우, 두 번째 인수로 최상위 모듈에 대해서는 `None`을, 서브모듈 또는 서브패키지에 대해서는 `package.__path__`를 받습니다.
    *   모듈을 찾으면 `loader` 객체를 반환하고, 찾지 못하면 `None`을 반환해야 합니다.
    *   `find_module()`이 예외를 발생시키면 호출자에게 전파되어 임포트가 중단됩니다.

### Loader (로더)

`loader` 객체도 하나의 메서드를 가집니다.

*   `loader.load_module(fullname)`
    *   이 메서드는 로드된 모듈을 반환하거나 예외를 발생시킵니다 (기존 예외가 전파되지 않는 경우 `ImportError`가 바람직합니다).
    *   로드할 수 없는 모듈을 로드하도록 요청받으면 `ImportError`를 발생시켜야 합니다.

많은 경우 `finder`와 `loader`는 동일한 객체일 수 있습니다. `finder.find_module()`은 단순히 `self`를 반환할 수 있습니다.

두 메서드의 `fullname` 인수는 "spam.eggs.ham"과 같은 완전한 모듈 이름입니다. `find_module()` 메서드는 실제 임포트 중에 항상 호출되는 것은 아니므로, `finder`는 `sys.modules`에 부모 패키지가 존재한다고 의존해서는 안 됩니다.

`load_module()` 메서드는 코드를 실행하기 전에 몇 가지 책임을 이행해야 합니다.

*   `sys.modules`에 `fullname`이라는 이름의 기존 모듈 객체가 있으면 로더는 해당 객체를 사용해야 합니다.
*   `sys.modules`에 `fullname`이라는 이름의 모듈이 없으면 로더는 새 모듈 객체를 생성하고 `sys.modules`에 추가해야 합니다. 이 작업은 로더가 모듈 코드를 실행하기 전에 이루어져야 합니다.
*   로드에 실패하면 로더는 `sys.modules`에 삽입했을 수 있는 모듈을 제거해야 합니다.
*   `__file__` 속성이 설정되어야 합니다. 이는 문자열이어야 하며, " `<frozen>` "과 같은 더미 값일 수 있습니다. `__file__` 속성이 전혀 없는 특권은 내장 모듈에만 주어집니다.
*   `__name__` 속성이 설정되어야 합니다. `imp.new_module()`을 사용하면 자동으로 설정됩니다.
*   패키지인 경우 `__path__` 변수가 설정되어야 합니다. 이는 리스트여야 하며, 임포터에게 `__path__`가 더 이상 의미가 없다면 비어있을 수 있습니다.
*   `__loader__` 속성은 로더 객체로 설정되어야 합니다. 이는 주로 인트로스펙션(introspection) 및 재로드(reloading)를 위한 것입니다.
*   `__package__` 속성이 설정되어야 합니다 (PEP 366).
*   모듈이 Python 모듈인 경우 (내장 모듈이나 동적으로 로드된 확장 모듈과 반대), 모듈의 전역 이름 공간( `module.__dict__` )에서 모듈 코드를 실행해야 합니다.

`load_module()` 메서드를 위한 최소한의 패턴은 다음과 같습니다.

```python
# 대부분의 세부 사항을 처리하기 위해 importlib.util.module_for_loader()를 사용하는 것을 고려하세요.
def load_module(self, fullname):
    code = self.get_code(fullname)
    ispkg = self.is_package(fullname)
    mod = sys.modules.setdefault(fullname, imp.new_module(fullname))
    mod.__file__ = "<%s>" % self.__class__.__name__
    mod.__loader__ = self
    if ispkg:
        mod.__path__ = []
        mod.__package__ = fullname
    else:
        mod.__package__ = fullname.rpartition('.')[0]
    exec(code, mod.__dict__)
    return mod
```

## 사양 2부: 훅 등록 (Specification part 2: Registering Hooks)

두 가지 유형의 임포트 훅이 있습니다: **메타 훅(Meta hooks)** 과 **경로 훅(Path hooks)** .

### 메타 훅 (Meta hooks)

*   임포트 처리 시작 시, 다른 임포트 처리보다 먼저 호출됩니다 (따라서 메타 훅은 `sys.path` 처리, 프로즌 모듈, 심지어 내장 모듈까지 재정의할 수 있습니다).
*   메타 훅을 등록하려면 `finder` 객체를 `sys.meta_path` (등록된 메타 훅 목록)에 추가하기만 하면 됩니다.
*   현재 기본적으로 비어 있습니다.

### 경로 훅 (Path hooks)

*   `sys.path` (또는 `package.__path__`) 처리의 일부로, 관련 경로 항목이 발견되는 시점에 호출됩니다.
*   경로 훅은 `sys.path_hooks`에 임포터 팩토리(importer factory)를 추가하여 등록됩니다.
*   `sys.path_hooks`는 콜러블(callable) 목록이며, 주어진 경로 항목을 처리할 수 있는지 순서대로 확인됩니다.
*   콜러블은 경로 항목을 처리할 수 없으면 `ImportError`를 발생시키고, 처리할 수 있으면 임포터 객체를 반환해야 합니다.
*   경로 훅 검사 결과는 `sys.path_importer_cache`에 캐시됩니다. 이 캐시는 `sys.path_hooks`를 스캔하기 전에 확인됩니다.

새로운 `sys` 변수들은 `sys.path`와 마찬가지로 특정 유형을 가져야 합니다.

*   `sys.meta_path`와 `sys.path_hooks`는 Python 리스트여야 합니다.
*   `sys.path_importer_cache`는 Python 딕셔너리여야 합니다.

이러한 변수를 인플레이스(in-place)로 수정하거나 새 객체로 교체하는 것은 허용됩니다.

## 패키지와 `__path__`의 역할 (Packages and the role of __path__)

모듈이 `__path__` 속성을 가지고 있으면 임포트 메커니즘은 이를 패키지로 취급합니다. 패키지의 서브모듈을 임포트할 때 `sys.path` 대신 `__path__` 변수가 사용됩니다. 따라서 `sys.path`에 대한 규칙은 `pkg.__path__`에도 적용됩니다. 즉, `pkg.__path__`가 순회될 때 `sys.path_hooks`도 참조됩니다.

메타 임포터는 작업을 수행하기 위해 `sys.path`를 전혀 사용하지 않을 수 있으므로 `pkg.__path__` 값을 무시할 수 있습니다. 이 경우에도 비어 있을 수 있는 리스트로 설정하는 것이 좋습니다.

## 임포터 프로토콜의 선택적 확장 (Optional Extensions to the Importer Protocol)

임포터 프로토콜은 세 가지 선택적 확장을 정의합니다.

1.  데이터 파일 검색
2.  모듈 패키징 도구 및/또는 모듈 의존성 분석 도구(예: Freeze) 지원
3.  모듈을 스크립트로 실행하는 지원

이 세 가지 확장 모두 일반적인 임포터에 강력히 권장되지만, 해당 기능이 필요하지 않으면 안전하게 생략할 수 있습니다.

### 데이터 파일 검색 (`get_data`)

기저 저장소 백엔드에서 임의의 "파일"에 대한 데이터를 검색하기 위해 로더 객체는 `get_data()`라는 메서드를 제공할 수 있습니다.

*   `loader.get_data(path)`: 이 메서드는 데이터를 문자열로 반환하거나 "파일"을 찾지 못하면 `IOError`를 발생시킵니다. 데이터는 항상 "이진(binary)" 모드가 사용된 것처럼 반환됩니다. 이는 파일 시스템과 유사한 속성을 가진 임포터를 위한 것입니다.

예시:

```python
d = os.path.dirname(__file__)
data = __loader__.get_data(os.path.join(d, "logo.gif"))
```

### 패키징/분석 도구 지원 (`is_package`, `get_code`, `get_source`)

Freeze와 같은 도구에 대한 지원이 필요한 경우 다음 메서드 세트를 구현할 수 있습니다. 호출자가 쉽게 사용할 수 있도록 세 가지 메서드 모두 구현하거나, 아예 구현하지 않아야 합니다.

*   `loader.is_package(fullname)`: `fullname`으로 지정된 모듈이 패키지이면 `True`, 아니면 `False`를 반환해야 합니다.
*   `loader.get_code(fullname)`: 모듈과 관련된 코드 객체를 반환하거나, 내장 또는 확장 모듈인 경우 `None`을 반환해야 합니다. 소스 코드는 있지만 코드 객체가 없으면 컴파일된 소스 코드를 반환해야 합니다.
*   `loader.get_source(fullname)`: 모듈의 소스 코드를 문자열로 반환하거나, 소스를 사용할 수 없으면 `None`을 반환해야 합니다.

이 세 메서드 모두 모듈을 찾을 수 없으면 `ImportError`를 발생시켜야 합니다.

### 스크립트 실행 지원 (`get_filename`)

모듈을 스크립트로 실행하는 것(PEP 338)을 지원하려면 위 세 가지 메서드가 구현되어야 합니다. 또한, `runpy` 모듈이 `__file__` 속성을 올바르게 설정할 수 있도록 다음 메서드를 제공할 수 있습니다.

*   `loader.get_filename(fullname)`: 이 메서드는 명명된 모듈이 로드될 경우 `__file__`이 설정될 값을 반환해야 합니다. 모듈을 찾을 수 없으면 `ImportError`를 발생시켜야 합니다.

## `imp` 모듈과의 통합 (Integration with the 'imp' module)

새로운 임포트 훅은 기존 `imp.find_module()` 및 `imp.load_module()` 호출에 쉽게 통합되지 않습니다. 기존 코드에 영향을 주지 않고 통합하는 것은 의문이며, `imp` 모듈에 새 함수를 추가하는 것이 더 좋습니다.

기존 `imp.find_module()` 및 `imp.load_module()` 호출의 의미는 "내장 임포트 메커니즘을 노출"에서 "기본적으로 훅이 없는 내장 임포트 메커니즘을 노출"로 변경됩니다. 이들은 어떤 임포트 훅도 호출하지 않습니다.

새로운 `imp` 모듈 함수(`get_loader()`)가 제안되었으며, 다음과 같은 패턴으로 사용됩니다.

```python
loader = imp.get_loader(fullname, path)
if loader is not None:
    loader.load_module(fullname)
```

"기본" 임포트의 경우, `loader` 객체는 `imp.find_module()`의 현재 출력에 대한 래퍼(wrapper)이며, `loader.load_module()`은 해당 출력을 사용하여 `imp.load_module()`을 호출합니다.

## 향후 호환성 (Forward Compatibility)

기존 `__import__` 훅은 폴백(fallback)으로 원래 `__import__` 함수를 호출하지 않는 한, 새로운 방식의 훅을 자동으로 호출하지 않습니다. 예를 들어, `ihooks.py`, `iu.py`, `imputil.py`는 이 PEP와 호환되지 않습니다.

## 미해결 문제 (Open Issues)

*   **데이터 파일 위치** : 모듈, 특히 복잡한 패키지나 전체 애플리케이션의 경우 지원 데이터 파일이 필요합니다. 현재는 일반적으로 `sys.path` (또는 `package.__path__` 속성)를 통해 이러한 파일을 찾습니다. 이 접근 방식은 임포트 훅을 통해 로드되는 모듈에는 일반적으로 작동하지 않습니다.
    *   해결책으로 "그렇게 하지 마세요", `sys.prefix` 기반의 표준 위치에서 찾기, 임포트 훅이 모듈 파일에 상대적인 데이터 파일에 접근하는 표준적인 방법을 제공하는 것 등이 논의되었습니다. `zipimport` 객체는 `__loader__` 속성과 `get_data(name)` 메서드를 제공하여 이러한 문제를 해결합니다.
*   **사용 가능한 모듈 및 데이터 파일 목록** : 임포터로부터 사용 가능한 모듈 목록이나 `get_data()` 메서드와 함께 사용할 데이터 파일 목록을 받는 것이 유용할 수 있다는 제안이 있었습니다. `list_modules()` 및 `list_files()`와 같은 확장이 고려될 수 있습니다.
*   **대안적인 파일 형식 또는 컴파일러** : 이 PEP는 대안적인 위치에서 모듈을 로드하는 데 중점을 둡니다. 대안적인 파일 형식이나 컴파일러로 모듈을 로드하기 위한 전용 솔루션을 제공하지 않습니다.
*   **훅 스태킹(Stacking) 지원 부족** : 이 PEP 내에서는 훅 스태킹에 대한 특별한 지원이 없습니다. 예를 들어, `.tar` 및 `.gz` 파일에서 모듈을 로드하는 별도의 훅을 결합하여 `tar.gz` 파일에서 모듈을 로드하는 훅을 작성하는 방법은 명확하지 않습니다.
*   **`sys.path` 처리 후 훅 추가** : `sys.meta_path`를 통해 `sys.path`가 처리되기 전에 실행되는 훅을 추가할 수 있지만, `sys.path`가 처리된 후에 실행되는 훅을 추가하는 동등한 방법은 없습니다.

## 구현 (Implementation)

PEP 302 구현은 Python 2.3a1부터 Python에 통합되었습니다.
PEP 273은 PEP 302의 임포트 훅을 사용하여 구현되었습니다.

## 참고 및 각주 (References and Footnotes)

*   imputil module: `http://docs.python.org/library/imputil.html`
*   The Freeze tool. See also the `Tools/freeze/` directory in a Python source distribution
*   py2exe by Thomas Heller: `http://www.py2exe.org/`
*   `imp.set_frozenmodules()` patch: `http://bugs.python.org/issue642578`
*   The path argument to `finder.find_module()` is there because the `pkg.__path__` variable may be needed at this point. It may either come from the actual parent module or be supplied by `imp.find_module()` or the proposed `imp.get_loader()` function.
*   Quixote, a framework for developing Web applications: `http://www.mems-exchange.org/software/quixote/`
*   New import hooks + Import from Zip files: `http://bugs.python.org/issue652586`
*   Language reference for imports: `http://docs.python.org/3/reference/import.html`
*   importlib documentation: `http://docs.python.org/3/library/importlib.html#module-importlib`

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 배포되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.