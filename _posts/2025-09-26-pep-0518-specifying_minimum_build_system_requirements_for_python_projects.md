---
title: "[Final] PEP 518 - Specifying Minimum Build System Requirements for Python Projects"
excerpt: "Python Enhancement Proposal 518: 'Specifying Minimum Build System Requirements for Python Projects'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/518/
toc: true
toc_sticky: true
date: 2025-09-26 23:12:43+0900
last_modified_at: 2025-09-26 23:12:43+0900
published: true
---
> **원문 링크:** [PEP 518 - Specifying Minimum Build System Requirements for Python Projects](https://peps.python.org/pep-0518/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 10-May-2016



# PEP 518 – Python 프로젝트를 위한 최소 빌드 시스템 요구사항 지정

## 초록 (Abstract)
이 PEP는 Python 소프트웨어 패키지가 선택한 빌드 시스템을 실행하는 데 필요한 빌드 의존성(build dependencies)을 어떻게 명시해야 하는지 지정합니다. 이 사양의 일부로, 소프트웨어 패키지가 빌드 의존성을 지정하는 데 사용할 새로운 구성 파일이 도입됩니다 (동일한 구성 파일이 향후 다른 구성 세부 정보를 위해서도 사용될 것이라는 기대를 가지고 있습니다).

## 도입 배경 (Rationale)
Python이 처음 프로젝트용 소프트웨어 배포판을 빌드하기 위한 도구를 개발했을 때, `distutils`가 선택된 해결책이었습니다. 시간이 지나면서 `setuptools`는 `distutils` 위에 몇 가지 기능을 추가하며 인기를 얻었습니다. 둘 다 프로젝트 관리자가 소프트웨어 배포판을 빌드하기 위해 실행하는 `setup.py` 파일의 개념을 사용했습니다 (사용자들도 배포판을 설치하기 위해 이를 실행했습니다).

`distutils`는 Python의 표준 라이브러리 일부이므로, 실행 가능한 파일을 사용하여 빌드 요구사항을 지정하는 것은 문제가 되지 않았습니다. 빌드 도구가 Python의 일부라는 것은 `setup.py`가 프로젝트 관리자가 프로젝트 배포판을 빌드하기 위해 걱정할 외부 의존성이 없다는 것을 의미했습니다. 유일한 의존성이 Python이었기 때문에 어떤 의존성 정보도 지정할 필요가 없었습니다.

그러나 프로젝트가 `setuptools`를 사용하기로 선택했을 때, `setup.py`와 같은 실행 가능한 파일의 사용은 문제가 됩니다. `setup.py` 파일의 의존성을 알지 못하면 실행할 수 없지만, 현재는 해당 정보가 저장된 `setup.py` 파일을 실행하지 않고는 자동화된 방식으로 해당 의존성을 알 수 있는 표준적인 방법이 없습니다. 이는 파일 내용을 알지 못하면 실행할 수 없고, 파일을 실행하지 않으면 프로그래밍 방식으로 내용을 알 수 없는 딜레마(catch-22)입니다.

`setuptools`는 `setup()` 함수에 `setup_requires` 인수를 사용하여 이를 해결하려고 시도했습니다. 그러나 이 해결책에는 여러 문제가 있었습니다. 예를 들어:
*   `setuptools` 자체를 제외하고는 어떤 도구도 `setup.py`를 실행하지 않고는 이 정보에 접근할 수 없지만, 이 항목들이 설치되어 있지 않으면 `setup.py`는 실행될 수 없습니다.
*   `setup_requires`에 나열된 항목들은 `setup.py`가 실행될 때마다 암시적으로 설치되지만, `setup.py`가 실행되는 일반적인 방법 중 하나는 `pip`와 같은 다른 도구를 통해서이며, `pip`는 이미 의존성을 관리하고 있습니다. 이는 `pip install spam`과 같은 명령이 `pip`와 `setuptools` 둘 다 패키지를 다운로드하고 설치하게 만들 수 있으며, 최종 사용자는 설치 저장소와 같은 설정을 변경하기 위해 두 도구 모두를 구성해야 할 수 있다는 의미입니다.

이러한 문제로 인해 `setup_requires`의 사용은 드물었고, 프로젝트들은 `setup.py` 파일 간에 코드 스니펫을 복사하거나, 프로젝트를 빌드하거나 설치하기 전에 사용자가 수동으로 설치해야 할 것을 다른 곳에 문서화하는 방식을 택했습니다.

이 모든 상황은 `pip`가 `setup.py` 파일을 실행할 때 단순히 `setuptools`가 필요하다고 가정하게 만들었습니다. 그러나 이 방식은 `setuptools`처럼 다른 프로젝트가 커뮤니티에서 인기를 얻기 시작할 경우 확장되지 않습니다. 또한 `pip`가 `setuptools` 외의 다른 것이 필요하다는 사실을 추론할 수 없을 때, 프로젝트와 함께 사용해야 하는 마찰로 인해 다른 프로젝트가 인기를 얻는 것을 방해합니다.

이 PEP는 프로젝트의 빌드 시스템에 대한 최소 의존성을 특정 파일에 선언적인 방식으로 나열하는 방법을 지정함으로써 이러한 상황을 개선하려고 합니다. 이를 통해 프로젝트는 소스 체크아웃에서 Wheel과 같은 빌드 결과물을 생성하기 위해 필요한 빌드 의존성을 나열할 수 있으며, 도구가 프로젝트 자체를 빌드하는 데 필요한 것을 추론할 수 없는 `setup.py`의 딜레마에 빠지지 않습니다. 이 PEP를 구현하면 프로젝트는 어떤 빌드 시스템에 의존하는지 미리 지정할 수 있으므로 `pip`와 같은 도구가 빌드 시스템을 실행하여 프로젝트를 빌드하기 위해 필요한 것들이 설치되도록 보장할 수 있습니다.

이 PEP의 맥락과 동기를 더 자세히 설명하자면, 프로젝트의 빌드 결과물을 생성하는 데 필요한 (대략적인) 단계를 생각해보세요:
1.  프로젝트의 소스 체크아웃.
2.  빌드 시스템 설치.
3.  빌드 시스템 실행.

이 PEP는 두 번째 단계인 "빌드 시스템 설치"를 다룹니다. PEP 517은 빌드 시스템이 작업을 수행하는 데 필요한 추가 의존성을 동적으로 지정하는 방법을 포함하여 세 번째 단계를 다룹니다. 그러나 이 PEP의 목적은 빌드 시스템이 단순히 실행을 시작하는 데 필요한 최소 요구사항을 지정하는 것입니다.

## 사양 (Specification)

### 파일 형식 (File Format)
빌드 시스템 의존성은 TOML 형식으로 작성된 `pyproject.toml`이라는 파일에 저장됩니다.

이 형식은 사람이 사용하기 쉽고 (JSON과 달리), 충분히 유연하며 (configparser와 달리), 표준에서 유래하고 (또한 configparser와 달리), 지나치게 복잡하지 않기 때문에 (YAML과 달리) 선택되었습니다. TOML 형식은 Rust 커뮤니티에서 Cargo 패키지 관리자의 일부로 이미 사용되고 있으며, 비공개 이메일을 통해 TOML 선택에 매우 만족하고 있음을 밝혔습니다. 다양한 대안이 선택되지 않은 이유에 대한 더 자세한 논의는 "Other file formats" 섹션에서 확인할 수 있습니다. 저자들은 구성 파일 형식의 선택이 궁극적으로 주관적이며 선택이 필요했고, 이 상황에서 TOML을 선호한다는 것을 인지하고 있습니다.

아래에는 도구가 인식/존중해야 할 테이블을 나열합니다. 이 PEP에 지정되지 않은 테이블은 다른 PEP에 의한 미래 사용을 위해 예약되어 있습니다.

### `build-system` 테이블
`[build-system]` 테이블은 빌드 관련 데이터를 저장하는 데 사용됩니다. 초기에는 이 테이블의 한 키만 유효하며 필수적입니다: `requires`. 이 키는 빌드 시스템을 실행하는 데 필요한 PEP 508 의존성(현재는 `setup.py` 파일을 실행하는 데 필요한 의존성을 의미합니다)을 나타내는 문자열 목록 값을 가져야 합니다.

`setuptools`에 의존하는 대다수의 Python 프로젝트의 경우, `pyproject.toml` 파일은 다음과 같을 것입니다:

```toml
[build-system]
# 빌드 시스템을 실행하기 위한 최소 요구사항.
requires = ["setuptools"] # PEP 508 사양.
```


`setuptools`의 사용이 현재 커뮤니티에서 매우 광범위하기 때문에, 빌드 도구는 `pyproject.toml` 파일이 없을 때 위에 제시된 예시 구성 파일을 기본 의미론으로 사용할 것으로 예상됩니다.

도구는 `[build-system]` 테이블의 존재를 요구해서는 안 됩니다. `pyproject.toml` 파일은 빌드 관련 데이터 외의 구성 세부 정보를 저장하는 데 사용될 수 있으며, 따라서 `[build-system]` 테이블이 합법적으로 없을 수 있습니다. 파일이 존재하지만 `[build-system]` 테이블이 없는 경우 위에서 지정된 기본값이 사용되어야 합니다. 테이블이 지정되었지만 필수 필드가 누락된 경우 도구는 이를 오류로 간주해야 합니다.

### `tool` 테이블
`[tool]` 테이블은 빌드 도구뿐만 아니라 Python 프로젝트와 관련된 모든 도구가 `[tool]` 내의 하위 테이블을 사용하는 한 (예: `flit` 도구는 `[tool.flit]`에 구성을 저장) 사용자가 구성 데이터를 지정할 수 있는 곳입니다.

서로 다른 프로젝트가 동일한 하위 테이블을 사용하려고 시도하여 충돌하는 것을 방지하기 위해 `tool.*` 네임스페이스 내에서 이름을 할당하는 메커니즘이 필요합니다. 우리의 규칙은 프로젝트가 Cheeseshop/PyPI에서 `$NAME` 항목을 소유하는 경우에만 `tool.$NAME` 하위 테이블을 사용할 수 있다는 것입니다.

### JSON 스키마 (JSON Schema)
TOML 파일에서 얻은 데이터의 유형별 표현을 설명 목적으로만 제공하기 위해, 다음 JSON Schema가 데이터 형식과 일치합니다:

```json
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "build-system": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "requires": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["requires"]
    },
    "tool": {
      "type": "object"
    }
  }
}
```


## 거부된 아이디어 (Rejected Ideas)

### 의미론적 버전 키 (A semantic version key)
구성 파일 구조의 미래 호환성을 위해 처음에는 의미론적 버전 키가 제안되었습니다. 기본값은 `1`로, 이전에 정의된 키 또는 테이블에 역호환되지 않는 의미론적 변경이 발생할 경우 `semantics-version`이 새 번호로 증가하는 것이 아이디어였습니다.

그러나 결국, 이것은 시기상조의 최적화로 결정되었습니다. 구성 파일에 의미론적으로 미리 정의된 내용의 변경은 상당히 보수적일 것으로 예상됩니다. 그리고 역호환되지 않는 변경이 발생했을 경우에는, 이전 도구를 손상시키지 않기 위해 새로운 의미론에 다른 이름을 사용할 수 있습니다.

### 더 깊은 중첩 네임스페이스 (A more nested namespace)
이 PEP의 초기 초안에는 최상위 `[package]` 테이블이 있었습니다. 이 아이디어는 의미론적 버전 관리 체계에 대한 일부 스코핑을 부과하기 위한 것이었습니다 (그 아이디어가 왜 거부되었는지에 대해서는 "A semantic version key"를 참조). 스코핑의 필요성이 제거되면서, 최상위 테이블을 두는 의미가 불필요해졌습니다.

### 다른 테이블 이름 (Other table names)
`[build-system]` 테이블에 제안된 다른 이름은 `[build]`였습니다. 대체 이름이 더 짧지만, 테이블에 저장되는 정보의 의도를 많이 전달하지 못합니다. `distutils-sig` 메일링 리스트에서 투표 후 현재 이름이 채택되었습니다.

### 다른 파일 형식 (Other file formats)
여러 다른 파일 형식이 고려되었지만, 다양한 이유로 모두 거부되었습니다. 주요 요구사항은 형식이 사람이 편집할 수 있어야 하고, 프로젝트가 쉽게 벤더링할 수 있는 구현이 있어야 한다는 것이었습니다. 이는 XML과 같이 사람에게 친숙하지 않은 특정 형식을 처음부터 배제했으며, 심각하게 논의되지도 않았습니다.

#### 고려된 파일 형식 개요 (Overview of file formats considered)
고려된 다른 대안들이 거부된 주요 이유는 다음 섹션에 요약되어 있으며, 전체 검토 (TOML을 지지하는 긍정적인 주장 포함)는에서 확인할 수 있습니다.

TOML은 궁극적으로 우리가 관심 있는 모든 기능을 제공하면서 대안들이 도입하는 단점을 피했기 때문에 선택되었습니다.

| 기능            | TOML | YAML | JSON | CFG/INI |
| :-------------- | :--- | :--- | :--- | :------ |
| 잘 정의됨       | 예   | 예   | 예   |         |
| 실제 데이터 유형 | 예   | 예   | 예   |         |
| 신뢰할 수 있는 Unicode | 예   | 예   | 예   |         |
| 신뢰할 수 있는 주석 | 예   | 예   |      | 예      |
| 사람이 편집하기 쉬움 | 예   | ??   | ??   |         |
| 도구가 편집하기 쉬움 | 예   | ??   | 예   | ??      |
| 표준 라이브러리에 포함 |      | 예   | 예   | 예      |
| pip가 벤더링하기 쉬움 | 예   | n/a  | n/a  |         |


(테이블의 "??"는 대부분의 사람들이 "예"라고 답하고 싶겠지만, 명확한 사양의 부족 또는 기본 파일 형식 사양이 놀랍도록 복잡하기 때문에 실제로는 많은 문제와 엣지 케이스가 발생하는 항목을 나타냅니다.)

`pytoml` TOML 파서는 순수 Python 코드 약 300줄로 구성되어 있어, 표준 라이브러리 외부에 있다는 것이 크게 불리하게 작용하지 않았습니다.

Python 리터럴도 잠재적인 형식으로 논의되었지만 (일반적인 기존 파일 형식이 아니므로) 파일 형식 검토에서는 고려되지 않았습니다.

**JSON**
JSON 형식은 처음에는 고려되었지만 빠르게 거부되었습니다. 인간이 읽을 수 있는 문자열 기반 데이터 교환 형식으로는 훌륭하지만, 구문이 인간이 쉽게 편집하기에 적합하지 않습니다 (예: 구문이 불필요하게 장황하고 주석을 허용하지 않습니다).

제안된 데이터에 대한 예시 JSON 파일은 다음과 같습니다:
```json
{
  "build": {
    "requires": [
      "setuptools",
      "wheel>=0.27"
    ]
  }
}
```


**YAML**
YAML 형식은 JSON의 상위 집합이면서 수동으로 작업하기 더 쉽도록 설계되었습니다. YAML에는 세 가지 주요 문제가 있습니다.

첫째, 사양이 방대합니다: A4 용지에 인쇄하면 86페이지에 달합니다. 이는 어떤 사람이 한 파서에서는 작동하지만 다른 파서에서는 작동하지 않는 YAML 기능을 사용할 가능성을 남깁니다. 하위 집합을 표준화하는 것이 제안되었지만, 이는 기본적으로 이 파일에 특정한 새로운 표준을 만드는 것을 의미하며 장기적으로는 실현 가능하지 않습니다.

둘째, YAML 자체는 기본적으로 안전하지 않습니다. 사양은 임의 코드 실행을 허용하며, 이는 구성 데이터를 다룰 때 피하는 것이 가장 좋습니다. 물론 이 동작을 피하는 것이 가능하지만 (예: PyYAML은 `safe_load` 작업을 제공), 어떤 도구가 부주의하게 `load`를 사용한다면 임의 코드 실행에 노출됩니다. 이 PEP는 본질적으로 코드 실행을 포함하는 프로젝트 빌딩에 초점을 맞추고 있지만, 프로젝트 이름 및 버전 번호와 같은 다른 구성 데이터가 언젠가 동일한 파일에 들어갈 수 있으며, 이때 임의 코드 실행은 바람직하지 않습니다.

마지막으로, YAML의 가장 인기 있는 Python 구현은 `PyYAML`인데, 이는 수천 줄의 코드와 선택적 C 확장 모듈을 가진 큰 프로젝트입니다. 그 자체로는 문제가 아닐 수 있지만, `pip`와 같은 프로젝트에는 더 큰 문제가 됩니다. `pip`는 완전히 독립적이기 위해 `PyYAML`을 의존성으로 벤더링해야 할 가능성이 높기 때문입니다 (그렇지 않으면 설치 도구가 작동하기 위해 또 다른 설치 도구가 필요하게 됩니다). 라이브러리의 더 간단한 버전을 벤더링하는 것이 얼마나 쉬운지 알아보기 위해 `PyYAML`의 개념 증명 재작업이 이루어졌으며, 이는 가능성이 있음을 보여줍니다.

예시 YAML 파일은 다음과 같습니다:
```yaml
build:
  requires:
    - setuptools
    - wheel>=0.27
```


**configparser**
`configparser`가 허용하는 INI 스타일 구성 파일이 고려되었습니다. 불행히도 `configparser`가 무엇을 허용하는지에 대한 사양이 없어서 버전 간에 지원 불균형이 발생합니다. 예를 들어, Python 2.7의 `ConfigParser`가 허용하는 것과 Python 3의 `configparser`가 허용하는 것은 동일하지 않습니다. Python 3이 허용하는 것을 표준화하고 `configparser` 모듈의 백포트를 벤더링할 수도 있지만, 이는 이 PEP가 이 PEP에 지정된 메타데이터를 사용하려는 모든 프로젝트가 `configparser`의 백포트를 사용해야 한다고 명시해야 함을 의미합니다. 이는 지나치게 제한적이며, 특정 버전의 `configparser`가 예상된다는 것을 모르는 사람들에게 혼란을 야기할 수 있습니다.

예시 INI 파일은 다음과 같습니다:
```ini
[build]
requires = setuptools wheel>=0.27
```


**Python 리터럴 (Python literals)**
어떤 사람은 Python 리터럴을 구성 형식으로 사용할 것을 제안했습니다. 파일은 최상위에 하나의 `dict`를 포함하고, 모든 데이터는 그 `dict` 안에 있으며, 섹션은 키로 정의됩니다. 모든 Python 프로그래머는 이 형식에 익숙하고, 구성 데이터를 읽기 위한 암묵적인 서드파티 의존성이 없으며, `ast.literal_eval()`로 파싱하면 안전할 수 있습니다. Python 리터럴은 JSON과 동일할 수 있으며, 후행 쉼표와 주석을 지원하는 추가적인 이점이 있습니다. 또한, Python의 더 풍부한 데이터 모델은 일부 미래 구성 요구사항 (예: 문자열이 아닌 딕셔너리 키, 부동 소수점 대 정수 값)에 유용할 수 있습니다.

다른 한편으로, Python 리터럴은 Python 특정 형식이며, 이 데이터는 Python으로 작성되지 않은 패키징 도구 등에 의해 읽힐 필요가 있을 것으로 예상됩니다.

제안된 데이터에 대한 예시 Python 리터럴 파일은 다음과 같습니다:
```python
# 빌드 구성
{
    "build": {
        "requires": [
            "setuptools",
            "wheel>=0.27",  # 후행 쉼표
            # "numpy>=1.10" # 주석 처리된 데이터 라인
        ]  # 임의의 주석
    }
}
```


### `setup.cfg` 유지 (Sticking with setup.cfg)
`setuptools`에서 일반적인 형식으로 사용되는 `setup.cfg`에는 두 가지 문제가 있습니다. 하나는 위에서 `configparser` 논의에서 언급된 문제가 있는 `.ini` 파일이라는 것입니다. 다른 하나는 해당 파일의 스키마가 엄격하게 정의된 적이 없어서, `setuptools` 설치를 잠재적으로 혼란스럽게 하지 않고 어떤 형식을 안전하게 사용할 수 있을지 알 수 없다는 것입니다.

### 다른 파일 이름 (Other file names)
여러 다른 파일 이름이 고려되었고 거부되었습니다 (비록 이것은 매우 "바이크셰딩(bikeshedding)" 주제이므로, 결정은 주로 취향에 따라 내려집니다).

*   `pysettings.toml`: 가장 합리적인 대안.
*   `pypa.toml`: PyPA를 참조하는 것이 합리적이지만, 다소 틈새 용어입니다. 도메인 특정 지식 없이도 파일 이름이 이해되는 것이 더 좋습니다.
*   `pybuild.toml`: 이 PEP의 제한적인 관점에서는 이 파일 이름이 합리적이지만, 빌드 관련이 아닌 메타데이터가 파일에 추가될 경우 이름이 의미를 잃게 됩니다.
*   `pip.toml`: 너무 도구에 특화됨.
*   `meta.toml`: 너무 일반적; 프로젝트가 자체 메타데이터 파일을 원할 수 있습니다.
*   `setup.toml`: `setup.py` 덕분에 전통을 유지하지만, 파일이 미래에 포함할 수 있는 내용과 반드시 일치하지는 않습니다 (예: 프로젝트 이름이 본질적으로 설정의 일부인가?).
*   `pymeta.toml`: 프로그래밍 및/또는 Python 초보자에게는 명확하지 않음.
*   `pypackage.toml` & `pypackaging.toml`: "패키지"가 무엇인지에 대한 이름 혼동 (프로젝트 대 네임스페이스).
*   `pydevelop.toml`: 파일에 개발에만 국한되지 않는 세부 정보가 포함될 수 있습니다.
*   `pysource.toml`: 소스 코드와 직접 관련 없음.
*   `pytools.toml`: 파일이 (현재) 프로젝트 관리를 목표로 하므로 오해의 소지가 있습니다.
*   `dstufft.toml`: 너무 개인적. ;)

## 참조 (References)
 `distutils` (https://docs.python.org/3/library/distutils.html#module-distutils)
 `setuptools` (https://pypi.python.org/pypi/setuptools)
 `setuptools`: New and Changed `setup()` Keywords (http://pythonhosted.org/setuptools/setuptools.html#new-and-changed-setup-keywords)
 `pip` (https://pypi.python.org/pypi/pip)
 `wheel` (https://pypi.python.org/pypi/wheel)
 TOML (https://github.com/toml-lang/toml)
 JSON (http://json.org/)
 YAML (http://yaml.org/)
 `configparser` (https://docs.python.org/3/library/configparser.html#module-configparser)
 `PyYAML` (https://pypi.python.org/pypi/PyYAML)
 PyPA (https://www.pypa.io)
 Bazel (http://bazel.io/)
 `ast.literal_eval()` (https://docs.python.org/3/library/ast.html#ast.literal_eval)
 Cargo, Rust's package manager (http://doc.crates.io/)
 JSON Schema (http://json-schema.org/)
 Nathaniel J. Smith's file format review (https://gist.github.com/njsmith/78f68204c5d969f8c8bc645ef77d4a8f)

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.