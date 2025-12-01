---
title: "[Withdrawn] PEP 369 - Post import hooks"
excerpt: "Python Enhancement Proposal 369: 'Post import hooks'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/369/
toc: true
toc_sticky: true
date: 2025-09-26 20:53:39+0900
last_modified_at: 2025-09-26 20:53:39+0900
published: true
---
> **원문 링크:** [PEP 369 - Post import hooks](https://peps.python.org/pep-0369/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 02-Jan-2008

## PEP 369 – Post import hooks

*   **작성자** : Christian Heimes <christian at python.org>
*   **상태** : 철회됨 (Withdrawn)
*   **유형** : Standards Track
*   **생성일** : 2008년 1월 2일
*   **Python 버전** : 2.6, 3.0
*   **이력** : 2012년 12월 2일 (Post-History)

### 철회 공지 (Withdrawal Notice)

이 PEP는 Python 3.3에서 `importlib`로의 마이그레이션 이후 많은 세부 설계가 더 이상 유효하지 않게 되어, 작성자에 의해 철회되었습니다.

### 초록 (Abstract)

이 PEP는 `import` 메커니즘에 `post import hook`을 추가하기 위한 개선 사항을 제안합니다. 이는 주로 Python 3.0에서 예상되는 추상 기본 클래스(Abstract Base Classes, ABCs)의 광범위한 사용을 지원하기 위한 것입니다.

이 PEP는 원래 지연 임포트(lazy imports)와 `post import hook`을 결합한 형태로 시작되었습니다. `python-dev` 메일링 리스트에서의 논의 끝에, PEP는 두 개의 개별 PEP로 분리되었습니다.

### 배경 (Rationale)

Python은 모듈이 성공적으로 로드된 후 코드를 실행하기 위한 `import` 메커니즘에 `hook`을 걸 수 있는 API를 제공하지 않습니다. PEP 302의 `import hook`은 모듈을 찾고 로드하는 것에 관한 것이었지만, `post import hook`으로 설계된 것은 아닙니다.

### 사용 사례 (Use cases)

`post import hook`의 한 가지 사용 사례는 모듈 임포트 시 콜백(callbacks)에 대한 Alyssa (Nick) Coghlan의 초기 게시물에서 언급되었습니다. 이는 Python 3.0과 그 ABC를 개발하는 동안 발견되었습니다. `decimal.Decimal`과 같은 클래스를 ABC에 등록하고 싶었지만, 모든 인터프리터 시작 시 모듈이 임포트되어서는 안 된다는 점이 문제였습니다. Alyssa는 다음과 같은 예시를 제시했습니다.

```python
@imp.when_imported('decimal')
def register(decimal):
    Inexact.register(decimal.Decimal)
```

`register` 함수는 'decimal'이라는 모듈에 대한 콜백으로 등록됩니다. `decimal`이 임포트될 때, 이 함수는 모듈 객체를 인자로 받아 호출됩니다.

이 특정 예시는 실제로는 필요하지 않지만 (왜냐하면 `decimal.Decimal`은 2.6 및 3.0에서 적절한 `abstract Number` 기본 클래스를 상속할 것이기 때문입니다), 여전히 그 원리를 잘 보여줍니다.

### 기존 구현 (Existing implementations)

PJE의 `peak.util.imports`는 `post load hook`을 구현합니다. 이 PEP의 구현은 PJE의 것과 많은 부분을 공유하며, 그의 아이디어에 부분적으로 기반을 두고 있습니다.

### Post import hook 구현 (Post import hook implementation)

`Post import hook`은 모듈이 로드된 후에 호출됩니다. 이 `hook`들은 하나의 인자, 즉 모듈 인스턴스를 받는 호출 가능한 객체(callable)입니다. 이들은 'os' 또는 'os.path'와 같은 모듈의 점(dotted) 이름으로 등록됩니다.

호출 가능한 객체들은 `sys.post_import_hooks` 딕셔너리에 저장되며, 이는 이름(문자열)에서 호출 가능한 객체 목록 또는 `None`으로 매핑됩니다.

#### 상태 (States)

*   **등록된 `hook`이 없음** : `sys.post_import_hooks`에 해당 모듈에 대한 엔트리가 없습니다.
*   **`hook`이 등록되었고 모듈이 아직 로드되지 않음** : `import hook` 레지스트리에 `sys.post_import_hooks["name"] = [hook1]`과 같은 엔트리가 포함되어 있습니다.
*   **모듈이 성공적으로 로드됨** : `import` 메커니즘은 `sys.post_import_hooks`가 새로 로드된 모듈에 대한 `post import hook`을 포함하는지 확인합니다. `hook`이 발견되면, 등록된 순서대로 모듈 인스턴스를 첫 번째 인자로 받아 호출됩니다. 메서드가 예외를 발생시키면 `hook` 처리가 중단됩니다. 마지막으로, 오류가 발생하더라도 모듈 이름에 대한 엔트리는 `None`으로 설정됩니다.
    추가적으로, `hook` 내부에서 알림 메서드가 호출될 때 무한 재귀를 방지하기 위해 모듈 객체의 새로운 `__notified__` 슬롯(slot)은 `True`로 설정됩니다. `PyModule`을 서브클래싱하지 않는 객체의 경우, 대신 새로운 속성이 추가됩니다.
*   **모듈을 로드할 수 없음** : `import hook`은 호출되지도, 레지스트리에서 제거되지도 않습니다. 나중에 모듈을 로드할 수 있습니다.
*   **`hook`이 등록되었지만 모듈이 이미 로드됨** : `hook`은 즉시 실행됩니다.

#### 불변성 (Invariants)

`import hook` 시스템은 특정 불변성을 보장합니다. (XXX: 원문에 미완성 부분)

#### Python 샘플 구현 (Sample Python implementation)

Python 구현은 다음과 같을 수 있습니다.

```python
def notify(name):
    try:
        module = sys.modules[name]
    except KeyError:
        raise ImportError("Module %s has not been imported" % (name,))
    if module.__notified__:
        return
    try:
        module.__notified__ = True
        if '.' in name:
            notify(name[:name.rfind('.')])
        for callback in post_import_hooks[name]:
            callback(module)
    finally:
        post_import_hooks[name] = None
    # XXX (원문에 미완성 부분)
```

### C API

#### 새로운 C API 함수 (New C API functions)

*   `PyObject* PyImport_GetPostImportHooks(void)`
    `sys.post_import_hooks` 딕셔너리를 반환하거나 `NULL`을 반환합니다.
*   `PyObject* PyImport_NotifyLoadedByModule(PyObject *module)`
    모듈이 요청되었음을 `post import` 시스템에 알립니다. 오류가 발생하면 `NULL`을 반환하고, 그렇지 않으면 동일한 모듈 객체에 대한 빌린 참조(borrowed reference)를 반환합니다. 이 함수는 모듈 자체에 대한 `hook`만 호출하고 그 부모 모듈에 대한 `hook`은 호출하지 않습니다. 이 함수는 `import lock`이 획득된 상태에서 호출되어야 합니다.
*   `PyObject* PyImport_NotifyLoadedByName(const char *name)`
    `PyImport_NotifyLoadedByName("a.b.c")`는 `a`, `a.b`, `a.b.c`에 대해 이 특정 순서로 `PyImport_NotifyLoadedByModule()`을 호출합니다. 모듈은 `sys.modules`에서 검색됩니다. 모듈을 검색할 수 없으면 예외가 발생하고, 그렇지 않으면 `modname`에 대한 빌린 참조가 반환됩니다. `hook` 호출은 항상 최상위 부모 모듈부터 시작합니다. `PyImport_NotifyLoadedByName()`의 호출자는 `import lock`을 보유해야 합니다!
*   `PyObject* PyImport_RegisterPostImportHook(PyObject *callable, PyObject *mod_name)`
    `mod_name` 모듈에 대한 새로운 `hook` 호출 가능 객체 `callable`을 등록합니다.
*   `int PyModule_GetNotified(PyObject *module)`
    `__notified__` 슬롯/속성의 상태를 반환합니다.
*   `int PyModule_SetNotified(PyObject *module, int status)`
    `__notified__` 슬롯/속성의 상태를 설정합니다.

`PyImport_NotifyLoadedByModule()` 메서드는 `import_submodule()` 내부에서 호출됩니다. `import` 시스템은 `import lock`이 획득되었고 부모 모듈에 대한 `hook`이 이미 호출되었는지 확인합니다.

### Python API

`import hook` 레지스트리와 두 개의 새로운 API 메서드는 `sys` 및 `imp` 모듈을 통해 노출됩니다.

*   `sys.post_import_hooks`
    이 딕셔너리에는 `post import hook`이 포함됩니다.
    `{"name" : [hook1, hook2], ...}`
*   `imp.register_post_import_hook(hook: "callable", name: str)`
    `name` 모듈에 대한 새로운 `hook`을 등록합니다.
*   `imp.notify_module_loaded(module: "module instance") -> module`
    모듈이 로드되었음을 시스템에 알립니다. 이 메서드는 기존의 지연/연기된 `import` 확장(lazy/deferred import extensions)과의 호환성을 위해 제공됩니다.
*   `module.__notified__`
    모듈 인스턴스의 슬롯입니다. (XXX: 원문에 미완성 부분)

`when_imported` 함수 데코레이터 또한 `imp` 모듈에 있으며, 이는 다음와 동일합니다.

```python
def when_imported(name):
    def register(hook):
        register_post_import_hook(hook, name)
    return register

@imp.when_imported(name)
def hook(module):
    pass
```

### 미해결 문제 (Open issues)

*   `when_imported` 데코레이터는 아직 작성되지 않았습니다.
*   코드에는 여러 `XXX` 주석이 포함되어 있습니다. 이는 주로 엣지 케이스(edge cases)에서의 오류 처리에 관한 것입니다.

### 하위 호환성 (Backwards Compatibility)

새로운 기능과 API는 Python의 기존 `import` 시스템과 충돌하지 않으며, 대부분의 소프트웨어에 대해 하위 호환성 문제를 일으키지 않습니다. 그러나 PEAK 및 Zope와 같이 자체적인 지연 `import` 매직을 구현하는 시스템은 일부 규칙을 따라야 합니다.

`post import hook`은 기존의 지연(deferred) 및 `lazy import` 시스템과 협력하도록 신중하게 설계되었습니다. PEP 작성자는 자체적인 `on-load-hook`을 새로운 `hook` API로 대체할 것을 제안합니다. 대안적인 `lazy` 또는 `deferred import`는 여전히 작동하겠지만, 구현은 `imp.notify_module_loaded` 함수를 호출해야 합니다.

### 참조 구현 (Reference Implementation)

참조 구현은 이미 작성되었으며 `py3k-importhook` 브랜치에서 사용할 수 있습니다. 이는 여전히 일부 정리 작업, 문서 업데이트 및 추가 유닛 테스트가 필요합니다.

### 감사 (Acknowledgments)

*   Alyssa Coghlan: 교정 및 초기 논의에 기여.
*   Phillip J. Eby: PEAK에서의 구현 및 이 PEP 구현에 대한 도움.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인으로 공개되었습니다.

### 참고 자료 (References)

 PEP: Lazy module imports and post import hook: [http://permalink.gmane.org/gmane.comp.python.devel/90949](http://permalink.gmane.org/gmane.comp.python.devel/90949)
 Interest in PEP for callbacks on module import: [http://permalink.gmane.org/gmane.comp.python.python-3000.devel/11126](http://permalink.gmane.org/gmane.comp.python.python-3000.devel/11126)
 peak.utils.imports: [http://svn.eby-sarna.com/Importing/peak/util/imports.py?view=markup](http://svn.eby-sarna.com/Importing/peak/util/imports.py?view=markup)
 py3k-importhook branch: [http://svn.python.org/view/python/branches/py3k-importhook/](http://svn.python.org/view/python/branches/py3k-importhook/)

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.