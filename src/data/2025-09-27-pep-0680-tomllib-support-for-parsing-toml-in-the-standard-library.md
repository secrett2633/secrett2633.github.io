---
title: "[Final] PEP 680 - tomllib: Support for Parsing TOML in the Standard Library"
excerpt: "Python Enhancement Proposal 680: 'tomllib: Support for Parsing TOML in the Standard Library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/680/
toc: true
toc_sticky: true
date: 2025-09-27 10:10:11+0900
last_modified_at: 2025-09-27 10:10:11+0900
published: true
---
> **원문 링크:** [PEP 680 - tomllib: Support for Parsing TOML in the Standard Library](https://peps.python.org/pep-0680/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 01-Jan-2022

PEP 680 – `tomllib`: 표준 라이브러리에 TOML 파싱 지원 추가

## 요약 (Abstract)
이 PEP는 TOML(Tom's Obvious Minimal Language, `https://toml.io`) 파싱을 위한 `tomllib` 모듈을 Python 표준 라이브러리에 추가할 것을 제안합니다.

## 도입 배경 (Motivation)
TOML은 PEP 517, PEP 518, PEP 621에서 명시된 바와 같이 Python 패키징을 위한 핵심 포맷으로 자리 잡았습니다. 이로 인해 Python 빌드 도구들은 TOML 파싱 패키지를 직접 포함하거나 다른 방법을 사용해야 하는 부트스트랩(bootstrapping) 문제를 겪고 있으며, 이는 리패키저(repackager) 및 다운스트림 소비자(downstream consumer)에게 심각한 문제를 야기합니다. 표준 라이브러리에 TOML 지원을 포함하면 이러한 문제들이 깔끔하게 해결됩니다.

또한, `black`, `mypy`, `pytest`, `tox`, `pylint`, `isort`와 같은 많은 Python 도구들이 TOML을 통해 설정 가능하며, `flake8`과 같이 TOML 설정을 지원하지 않는 도구들은 표준 라이브러리 지원 부재를 주된 이유로 꼽습니다. TOML이 이미 Python 생태계에서 특별한 위치를 차지하고 있다는 점을 고려할 때, "batteries included" 원칙에 따라 표준 라이브러리에 포함하는 것이 합당합니다.

마지막으로, TOML은 PEP 518에서 언급된 이유들로 인해 점점 더 인기를 얻고 있으며, PyPI에는 약 2000개의 Python TOML 라이브러리 역 의존성(reverse dependency)이 존재합니다 (참고로 `requests`는 약 28000개). 따라서 이는 Python 패키징 및 관련 도구의 필요성을 넘어선 일반적으로 유용한 추가 사항이 될 것입니다.

## 제안 근거 (Rationale)
이 PEP는 TOML 읽기를 위한 표준 라이브러리 지원을 서드파티 라이브러리인 `tomli`(`github.com/hukkin/tomli`)를 기반으로 할 것을 제안합니다. `pip`, `build`, `pytest`, `mypy`, `black`, `flit`, `coverage`, `setuptools-scm`, `cibuildwheel` 등 많은 프로젝트가 최근 `tomli` 사용으로 전환했습니다. `tomli`는 활발하게 유지보수되며 잘 테스트되었고, 약 800라인의 코드와 100% 테스트 커버리지를 자랑하며, 공식 TOML 준수 테스트 스위트와 기존의 BurntSushi/toml-test 스위트의 모든 테스트를 통과합니다.

## 명세 (Specification)
Python 표준 라이브러리에 새로운 모듈 `tomllib`이 추가되며, 다음의 공개 함수들을 노출합니다.

```python
def load(
    fp: SupportsRead[bytes],
    /,
    *,
    parse_float: Callable[[str], Any] = ...,
) -> dict[str, Any]: ...

def loads(
    s: str,
    /,
    *,
    parse_float: Callable[[str], Any] = ...,
) -> dict[str, Any]: ...
```
- `tomllib.load`는 TOML 문서를 포함하는 바이너리 파일류(file-like) 객체를 Python `dict`로 역직렬화합니다. `fp` 인자는 `io.RawIOBase.read()`와 동일한 API를 가진 `read()` 메서드를 가지고 있어야 합니다.
- `tomllib.loads`는 TOML 문서를 포함하는 `str` 인스턴스를 Python `dict`로 역직렬화합니다.
- `parse_float` 인자는 TOML float의 원본 문자열 표현을 입력으로 받아 해당 Python 객체를 반환하는 호출 가능한 객체입니다 ( `json.load`의 `parse_float`와 유사). 기본적으로 TOML float는 Python의 `float` 타입 인스턴스로 파싱됩니다.
- 반환되는 객체는 기본적인 Python 객체(`str`, `int`, `bool`, `float`, `datetime.{datetime,date,time}`, `list`, 문자열 키를 가진 `dict`)와 `parse_float`의 결과만 포함합니다.
- 잘못된 TOML의 경우 `tomllib.TOMLDecodeError`가 발생합니다.
- 이 PEP는 `tomllib.dump` 또는 `tomllib.dumps` 함수를 제안하지 않습니다. (자세한 내용은 "TOML 쓰기 API 포함" 섹션 참조)

## 유지보수 영향 (Maintenance Implications)

### TOML의 안정성 (Stability of TOML)
2021년 1월 TOML 1.0.0 출시로 TOML 포맷은 공식적으로 안정화된 것으로 간주됩니다. TOML은 1.0.0 출시 이전부터 안정적인 포맷임이 경험적으로 입증되었습니다.

### 제안된 구현의 유지보수성 (Maintainability of proposed implementation)
제안된 구현(`tomli`)은 순수 Python으로 작성되었으며, 잘 테스트되었고 1000라인 미만의 코드로 이루어져 있습니다. `tomli`의 작성자는 `tomli`를 표준 라이브러리에 통합하고 유지보수하는 데 기꺼이 돕겠다고 밝혔습니다. Python 핵심 개발자인 Petr Viktorin 또한 읽기 API를 유지보수할 의향을 보였습니다.

### TOML 지원이 다른 포맷으로 확장될 가능성 (TOML support a slippery slope for other things)
`Motivation` 섹션에서 논의된 바와 같이, TOML은 PEP 518 `pyproject.toml` 패키징 및 도구 설정 파일을 읽는 데 사용되는 등 Python 생태계에서 특별한 위치를 차지합니다. 표준 라이브러리에 TOML을 포함하는 주된 이유는 YAML 또는 MessagePack과 같은 다른 포맷에는 적용되지 않습니다. 또한, TOML의 단순성은 YAML과 같이 구성 및 파싱이 매우 복잡한 다른 포맷과 차별화됩니다.

## 하위 호환성 (Backwards Compatibility)
이 제안은 새로운 모듈을 설명하므로 표준 라이브러리 내에서 하위 호환성 문제가 없습니다. `tomllib`이라는 이름의 기존 서드파티 모듈은 `import tomllib`이 표준 라이브러리 모듈을 가져오게 되므로 작동이 중단될 수 있습니다. 그러나 `tomllib`은 PyPI에 등록되어 있지 않으므로 이 이름의 모듈이 널리 사용될 가능성은 낮습니다.

더 직관적인 이름인 `toml`을 사용하지 않는 이유는 현재 `toml` PyPI 패키지의 버전을 고정한 사용자들에게 하위 호환성 문제를 피하기 위함입니다.

## 보안 영향 (Security Implications)
구현 오류는 잠재적인 보안 문제를 야기할 수 있습니다. 그러나 파서의 출력은 단순한 데이터 유형으로 제한되며, 임의의 클래스를 로드할 수 없으므로 `pickle` 및 YAML과 같은 "강력한" 포맷에서 흔히 발생하는 보안 문제를 방지합니다. 또한, 구현은 순수 Python으로 이루어져 버퍼 오버플로우와 같은 C 언어 고유의 보안 문제를 줄입니다.

## 학습 방법 (How to Teach This)
`tomllib`의 API는 `json` 및 `pickle`과 같은 다른 잘 확립된 파일 포맷 라이브러리의 API를 모방합니다. `dump` 함수가 없다는 점은 문서에 설명될 것이며, 관련 서드파티 라이브러리(예: `tomlkit`, `tomli-w`, `pytomlpp`)에 대한 링크가 제공될 것입니다.

## 거부된 아이디어 (Rejected Ideas)

### 다른 TOML 구현에 기반 (Basing on another TOML implementation)
- `tomlkit`: 스타일 라운드트립(style roundtripping)을 지원하지만, `tomli`보다 복잡한 API와 구현을 가집니다.
- `toml`: 널리 사용되지만, 활발히 유지보수되지 않고 TOML 1.0.0을 지원하지 않으며 알려진 버그가 있습니다.
- `pytomlpp`, `rtoml`: C++ 또는 Rust 프로젝트의 Python 래퍼(wrapper)로, 순수 Python 라이브러리보다 유지보수가 어렵습니다.
- 처음부터 구현하는 것: `tomli`가 필요한 기능을 충족하고 작성자가 표준 라이브러리 포함에 협조할 의사가 있으므로 불필요합니다.

### TOML 쓰기 API 포함 (Including an API for writing TOML)
TOML 쓰기 API를 포함하지 않는 몇 가지 이유가 있습니다.
- 이 PEP를 추진하는 핵심 Python 패키징 도구 및 TOML 설정 파일을 읽어야 하는 프로젝트에는 쓰기 기능이 필요하지 않습니다.
- 기존 TOML 파일을 편집하는 사용 사례는 스타일 보존(style preserving) 라이브러리를 통해 더 잘 처리됩니다. TOML은 사람이 읽고 편집할 수 있는 설정 포맷이므로 주석, 포맷팅 및 기타 마크업을 보존하는 것이 중요하며, 이는 스타일 관련 메타데이터를 포함하는 파서 출력을 요구하므로 `str` 및 `dict`와 같은 일반 Python 타입을 출력하는 것은 실용적이지 않습니다.
- 쓰기 API를 설계하는 데 너무 많은 자유도가 있으며, 표준 라이브러리에서는 "한 번에 제대로" 해야 합니다.
- 현재 CPython 핵심 개발자 중 쓰기 API를 유지보수하거나 포함하는 PEP를 후원하겠다는 의사를 밝힌 사람은 없습니다.
- 따라서 TOML 쓰기는 서드파티 라이브러리에 맡겨집니다.

### 모듈의 대체 이름 (Alternative names for the module)
- 이상적으로는 `toml` 모듈 이름을 사용하고 싶지만, PyPI의 `toml` 패키지가 널리 사용되고 있어 하위 호환성 문제가 발생할 수 있습니다. 표준 라이브러리는 서드파티 패키지보다 우선하므로, `toml` 패키지에 의존하는 라이브러리와 애플리케이션은 Python 버전 업그레이드 시 많은 API 비호환성으로 인해 중단될 가능성이 높습니다.
- 대신, 이 PEP는 `plistlib` 및 `xdrlib`와 같이 표준 라이브러리의 다른 파일 포맷 모듈과 유사하게 `tomllib`이라는 이름을 제안합니다.
- `tomlparser`, `tomli`, `parser.toml`과 같은 다른 이름들도 고려되었지만 거부되었습니다.

## 부록 A: 제안된 API와 `toml`의 차이점 (Appendix A: Differences between proposed API and toml)
이 부록은 이 PEP에서 제안된 API와 서드파티 패키지 `toml`의 API 간의 차이점을 다룹니다.

- **쓰기 API 미포함**: 이 PEP는 현재 쓰기 API(`toml.dump[s]`)를 포함하지 않습니다.
- **`toml.load`의 첫 번째 인자 다름**: `toml.load`는 `SupportsRead[str]`, `str`, `bytes`, `list[PathLike | str | bytes]`를 첫 번째 인자로 받지만, 제안된 API는 `SupportsRead[bytes]`를 받습니다. 이는 표준 라이브러리의 다른 유사 함수와의 일관성을 유지하고 UTF-8 인코딩을 보장하며, 잘못된 TOML 파싱을 피하기 위함입니다.
- **오류**: `toml`은 `TomlDecodeError`를 발생시키는 반면, 제안된 API는 PEP 8을 준수하는 `TOMLDecodeError`를 발생시킵니다.
- **`_dict` 인자**: `toml.load[s]`는 `_dict` 인자를 허용하지만, `tomllib`에서는 제거되었습니다. Python 3.7부터 `OrderedDict` 사용이 불필요해졌기 때문입니다.
- **문서화되지 않은 `decoder` 인자**: `toml.load[s]`는 문서화되지 않은 `decoder` 인자를 지원하지만, `tomllib`에는 포함되지 않습니다.
- **`encoder` 인자**: `toml.dump[s]`는 `encoder` 인자를 지원하지만, `tomllib`은 쓰기 API를 포함하지 않습니다.
- **타임존**: `toml`은 `toml.tz.TomlTz` 타임존 객체를 사용하지만, 제안된 구현은 표준 라이브러리의 `datetime.timezone` 객체를 사용합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.