---
title: "[Rejected] PEP 408 - Standard library __preview__ package"
excerpt: "Python Enhancement Proposal 408: 'Standard library __preview__ package'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/408/
toc: true
toc_sticky: true
date: 2025-09-26 21:30:04+0900
last_modified_at: 2025-09-26 21:30:04+0900
published: true
---
> **원문 링크:** [PEP 408 - Standard library __preview__ package](https://peps.python.org/pep-0408/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 07-Jan-2012


# PEP 408 – 표준 라이브러리 `__preview__` 패키지

*   **작성자:** Alyssa Coghlan, Eli Bendersky
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2012년 1월 7일
*   **Python 버전:** 3.3
*   **해결:** Python-Dev 메시지

## 요약 (Abstract)

새로운 모듈을 Python 표준 라이브러리에 포함하는 과정은 모듈이 Python의 공식적인 일부가 됨으로써 발생하는 API 잠금 및 하위 호환성(backward compatibility) 약속으로 인해 어려움을 겪고 있습니다. 이 PEP는 모듈을 표준 라이브러리에 완전히 수용하기 전에, 마이너 릴리스(약 18개월) 동안 특별한 `__preview__` 패키지에 포함시키는 과도기적 상태를 제안했습니다.

이 상태는 한편으로는 모듈이 Python 배포판의 공식적인 일부가 되는 이점을 제공합니다. 다른 한편으로는, 코어 개발 팀은 모듈이 최종적으로 표준 라이브러리에 완전히 포함될지 여부나 다음 릴리스에서 변경될 수 있는 API의 안정성에 대해 어떤 약속도 하지 않는다고 명시합니다.

## PEP 거부 (PEP Rejection)

Guido van Rossum은 Google App Engine에서 유사한 "labs" 네임스페이스 경험을 바탕으로, 이 PEP를 거부하고 문서에서 잠정적인(provisional) 모듈임을 명시적으로 표시하는 더 간단한 대안을 선호했습니다.

만약 모듈이 표준 라이브러리 포함에 적합하다고 간주되지만, 유지보수성 또는 특정 API 세부 사항에 대한 우려가 남아 있다면, 해당 모듈은 잠정적인(provisional) 기반으로 수용될 수 있습니다. 비록 가능성은 낮지만, 그러한 모듈은 남아있는 우려가 타당하다고 판명될 경우 deprecation 기간 없이 표준 라이브러리에서 제거될 수 있습니다.

동일한 발표의 일환으로, Guido는 Python 3.3의 표준 라이브러리에 Matthew Barnett의 'regex' 모듈을 잠정적인 추가(provisional addition)로 명시적으로 수용했습니다 (기존 're' 모듈의 드롭인 대체품이 아닌 'regex' 이름으로).

## 제안 - `__preview__` 패키지 (Proposal - the `__preview__` package)

Python 코어 개발 팀이 새로운 모듈을 표준 라이브러리에 포함해야 한다고 결정했지만, 모듈의 API가 최적인지에 대해 확신하지 못하는 경우, 해당 모듈은 단일 마이너 릴리스 동안 `__preview__`라는 특별한 패키지에 배치될 수 있습니다.

다음 마이너 릴리스에서 모듈은 표준 라이브러리로 "졸업"(graduate)하여 네임스페이스 내에서 적절한 위치를 차지하거나, 거부되어 Python 소스 트리에서 완전히 제거될 수 있습니다. 모듈이 `__preview__`에서 마이너 릴리스를 보낸 후 표준 라이브러리로 졸업하게 되면, 축적된 피드백에 따라 API가 변경될 수 있습니다. 코어 개발 팀은 `__preview__`에 있는 모듈의 API 안정성 및 하위 호환성에 대해 명시적으로 어떠한 보장도 하지 않습니다.

`__preview__` 패키지로의 진입은 모듈이 표준 라이브러리로 전환되기 시작함을 의미합니다. 이는 코어 개발 팀이 표준 라이브러리의 다른 모듈과 유사하게 해당 모듈의 책임을 맡는다는 것을 뜻합니다.

### 어떤 모듈이 `__preview__`를 거쳐야 하는가? (Which modules should go through `__preview__`)

대부분의 Python 표준 라이브러리 추가 제안 모듈은 `__preview__`에서 마이너 릴리스를 거칠 것으로 예상되었습니다. 그러나 `lzma`와 같이 미리 정의된 API를 사용하는 모듈(예: 기존 `bz2` 모듈의 API를 따르는 경우)이나 Python 개발 커뮤니티에서 폭넓게 수용되는 API를 가진 모듈과 같은 예외가 있을 수 있습니다.

어떤 경우든, `__preview__`를 통하거나 직접적으로 표준 라이브러리에 추가될 것으로 제안된 모듈은 PEP 2에서 설정한 수용 조건을 충족해야 합니다.

이 제안의 목적은 표준 라이브러리에 새 모듈을 추가하는 과정을 더 어렵게 만드는 것이 아님을 강조하는 것이 중요합니다. 오히려 더 유용한 라이브러리를 추가할 수 있는 수단을 제공하고자 합니다. 명확한 추가 후보인 모듈은 이전과 같이 추가될 수 있습니다. API 불확실성 때문에 오랫동안 지연될 수 있었던 모듈들도 이제 `__preview__` 패키지에서의 인큐베이션 기간을 통해 Python과 함께 배포될 수 있는 수단을 가지게 됩니다.

### "졸업" 기준 (Criteria for “graduation”)

원칙적으로, `__preview__` 패키지의 대부분의 모듈은 결국 안정적인 표준 라이브러리로 졸업해야 합니다. 졸업하지 못하는 몇 가지 이유는 다음과 같습니다.

*   모듈이 불안정하거나 취약하며, 이를 유지보수할 충분한 개발자 지원이 없을 수 있습니다.
*   프리뷰 릴리스 기간 동안 훨씬 더 나은 대체 모듈이 발견될 수 있습니다.

본질적으로, 결정은 코어 개발자에 의해 사례별로 이루어질 것입니다. 여기서 강조할 점은 특정 릴리스에서 `__preview__` 패키지에 모듈이 나타났다고 해서 다음 릴리스에서 Python의 일부로 계속 유지될 것이라는 보장은 없다는 것입니다.

### 예시 (Example)

`example` 모듈이 표준 라이브러리 포함 후보이지만, 일부 Python 개발자들이 해당 모듈이 해결하려는 문제에 대해 최고의 API를 제공한다고 확신하지 못한다고 가정해봅시다. 이 모듈은 릴리스 3.X에서 `__preview__` 패키지에 추가될 수 있으며, 다음과 같이 임포트할 수 있습니다.

```python
from __preview__ import example
```

모듈이 릴리스 3.X+1에서 표준 라이브러리의 적절한 위치로 승격된다고 가정하면, 라이브러리 내의 영구적인 위치로 이동하게 됩니다.

```python
import example
```

그리고 `__preview__`에서 임포트하는 것은 더 이상 작동하지 않습니다.

## 근거 (Rationale)

### 코어 개발 팀을 위한 이점 (Benefits for the core development team)

현재 코어 개발자들은 표준 라이브러리에 새로운 인터페이스를 추가하는 것을 매우 꺼려합니다. 이는 릴리스에 게시되는 순간, 하위 호환성 문제로 인해 API 설계 오류가 고정되기 때문입니다.

모든 주요 API 추가 사항을 전체 릴리스 동안 어떤 종류의 프리뷰 메커니즘을 통해 심사함으로써, 표준 하위 호환성 보장으로 API를 고정하기 전에 커뮤니티 피드백을 받을 수 있는 완전한 릴리스 주기를 확보할 수 있습니다.

또한 프리뷰 모듈이 선택 사항으로 간주되어서는 안 된다는 점을 패키지 관리자에게 명확히 전달하는 한, 프리뷰 모듈을 표준 라이브러리의 나머지 부분과 조기에 통합하기 시작할 수 있습니다. 프리뷰 API와 표준 라이브러리의 나머지 부분 간의 유일한 차이점은 프리뷰 API가 일반적인 하위 호환성 보장에서 명시적으로 제외된다는 것입니다.

본질적으로, `__preview__` 패키지는 사소한 API 설계 오류가 장기간 고정될 위험을 낮추기 위한 것이었습니다. 현재 이러한 우려는 코어 개발 팀의 합의가 특정 추가 사항이 원칙적으로 좋은 아이디어라고 해도 새로운 추가 사항을 막을 수 있습니다.

### 최종 사용자를 위한 이점 (Benefits for end users)

미래의 최종 사용자에게 가장 광범위한 이점은 더 나은 "out-of-the-box" 경험에 있습니다. "아, 작업 X를 위한 표준 라이브러리 도구는 형편없으니, 대신 이 서드파티 라이브러리를 다운로드하세요"라는 말을 듣는 대신, 더 우수한 도구들이 `import` 한 번으로 사용 가능할 가능성이 높아집니다.

개발자가 상위 의존성(upstream dependencies)에 대해 실사를 수행해야 하는 환경(PyPI의 많은 자료의 비용 효율성을 심각하게 해치거나 아예 배제하는)의 경우, 핵심 이점은 `__preview__` 패키지에 있는 모든 것이 적어도 다음 관점에서 python-dev의 감독 하에 있음을 보장하는 데 있습니다.

*   **라이선싱 (Licensing):** Contributor Licensing Agreement에 따라 PSF에 의해 재배포됩니다.
*   **문서화 (Documentation):** 모듈의 문서가 표준 Python 문서 도구(예: ReST 소스, Sphinx로 생성되고 http://docs.python.org에 게시되는 출력)를 통해 게시되고 정리됩니다.
*   **테스팅 (Testing):** 모듈 테스트 스위트가 python.org buildbot 플릿에서 실행되고 결과는 http://www.python.org/dev/buildbot를 통해 게시됩니다.
*   **이슈 관리 (Issue management):** 버그 및 기능 요청은 http://bugs.python.org에서 처리됩니다.
*   **소스 컨트롤 (Source control):** 소프트웨어의 마스터 저장소는 http://hg.python.org에 게시됩니다.

## `__preview__`에 포함될 후보 (Candidates for inclusion into `__preview__`)

Python 3.3의 경우, 몇 가지 명확한 현재 후보들이 있었습니다.

*   `regex` (http://pypi.python.org/pypi/regex)
*   `daemon` (PEP 3143)
*   `ipaddr` (PEP 3144)

다른 가능한 미래 사용 사례는 다음과 같습니다.

*   개선된 HTTP 모듈 (예: `requests`)
*   HTML 5 파싱 지원 (예: `html5lib`)
*   개선된 URL/URI/IRI 파싱
*   표준 이미지 API (PEP 368)
*   임포트 상태 캡슐화 (PEP 368)
*   표준 이벤트 루프 API (PEP 3153)
*   Python 3용 WSGI 바이너리 버전 (예: PEP 444)
*   제네릭 함수 지원 (예: `simplegeneric`)

## PEP 407과의 관계 (Relationship with PEP 407)

PEP 407은 6개월마다 임시 릴리스를 허용하도록 핵심 Python 릴리스 주기 변경을 제안했습니다 (아마도 표준 라이브러리 업데이트로 제한될 수 있음). 릴리스 주기에 그러한 변경이 이루어질 경우, `__preview__` 네임스페이스에 대한 다음 정책이 제안되었습니다.

장기 지원 릴리스의 경우, `__preview__` 네임스페이스는 항상 비어 있을 것입니다. 새로운 모듈은 장기 지원 릴리스 직후의 임시 릴리스에서만 `__preview__` 네임스페이스로 수용될 것입니다. 추가된 모든 모듈은 다음 장기 지원 릴리스 이전에 표준 라이브러리의 최종 위치로 마이그레이션되거나 완전히 삭제될 것입니다.

## 거부된 대안 및 변형 (Rejected alternatives and variations)

### `__future__` 사용 (Using `__future__`)

Python은 이미 `__future__` 모듈 형태로 "미래 지향적인" 네임스페이스를 가지고 있으므로, 이것을 새로운 목적으로 재사용할 수 없는지 묻는 것이 합리적입니다.

그렇게 하는 것이 적절하지 않은 두 가지 이유가 있습니다.

1.  `__future__` 모듈은 실제로 Python 인터프리터가 모듈을 컴파일하는 방식을 변경할 수 있는 별도의 컴파일러 지시문 기능과 연결되어 있습니다. 프리뷰 패키지에는 이것을 원하지 않습니다. 우리는 단지 일반적인 Python 패키지를 원합니다.
2.  `__future__` 모듈은 관련 기능이 컴파일러의 기본 동작이 된 후에도 이름이 영구적으로 유지될 것이라는 명시적인 약속과 함께 제공됩니다. 다시 말하지만, 이것은 프리뷰 패키지에서 의도한 것과는 정반대입니다. 프리뷰에 추가된 모든 이름은 어떤 시점에서 제거될 것이 거의 확실하며, 대부분은 표준 라이브러리의 영구적인 위치로 이동하기 때문이지만, 커뮤니티 피드백이 제안된 추가 사항이 돌이킬 수 없을 정도로 문제가 있다고 제안할 경우 서드파티 패키지 상태로 되돌려질 가능성도 있습니다.

### 패키지 버전 관리 (Versioning the package)

한 가지 제안된 대안은 `__preview__` 패키지에 명시적인 버전 관리를 추가하는 것이었습니다(예: `__preview34__`). 우리는 Python 3.X의 `__preview__`에 있는 모듈이 Python 3.X+1에서 일반 표준 라이브러리 네임스페이스로 졸업하거나 Python 소스 트리에서 완전히 사라질 것이라고 단순히 정의하는 것이 더 낫다고 생각합니다. `__preview__` 패키지의 버전 관리는 프로세스를 복잡하게 만들고 이 제안의 주요 의도와 잘 맞지 않습니다.

### 선행 및 후행 밑줄이 없는 패키지 이름 사용 (Using a package name without leading and trailing underscores)

`__preview__` 대신 `preview` 또는 `exp`와 같은 패키지 이름을 사용하는 것이 제안되었습니다. 이는 Python에서 "dunder" 패키지 이름(즉, 선행 및 후행 이중 밑줄이 있는 이름)이 전달하는 특별한 의미 때문에 논의에서 거부되었습니다. 게다가, dunder가 아닌 이름은 표준 라이브러리 API 안정성 보장을 시사할 것이며, 이는 `__preview__` 패키지의 의도가 아닙니다.

### pickle 호환성 유지 (Preserving pickle compatibility)

릴리스 3.X에서 `__preview__`의 모듈을 기반으로 한 pickled 클래스 인스턴스는 릴리스 3.X+1에서 모듈이 `__preview__`에 없을 때 unpickle할 수 없을 것입니다. 이를 작동시키기 위해 특별한 코드를 추가할 수 있지만, 이는 하위 호환성을 암시하므로 이 제안의 의도에 위배됩니다. 따라서 이 PEP는 pickle 호환성을 유지할 것을 제안하지 않습니다.

## 기여 (Credits)

Dj Gilcrease는 Python에 `__preview__` 패키지를 도입하는 아이디어를 처음 제안했습니다. 그의 원래 제안은 `__experimental__`이라는 이름을 사용했지만, 우리는 `__preview__`가 이 패키지의 의미를 더 잘 전달한다고 느꼈습니다.

## 참조 (References)

 (1, 2) 이 스레드에서 논의됨: https://mail.python.org/pipermail/python-ideas/2012-January/013246.html
 https://mail.python.org/pipermail/python-ideas/2011-August/011278.html
 Guido의 결정: https://mail.python.org/pipermail/python-dev/2012-January/115962.html
 regex 포함 제안: http://bugs.python.org/issue2636

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.