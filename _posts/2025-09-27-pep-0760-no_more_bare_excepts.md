---
title: "[Withdrawn] PEP 760 - No More Bare Excepts"
excerpt: "Python Enhancement Proposal 760: 'No More Bare Excepts'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/760/
toc: true
toc_sticky: true
date: 2025-09-27 13:44:07+0900
last_modified_at: 2025-09-27 13:44:07+0900
published: true
---
> **원문 링크:** [PEP 760 - No More Bare Excepts](https://peps.python.org/pep-0760/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 02-Oct-2024

PEP 760 – Bare Except 금지 제안 번역 및 정리

## 개요
이 문서는 Python의 예외 처리 구문에서 `except:` (bare except) 절을 금지할 것을 제안합니다. 현재 Python은 `except:` 절을 사용하여 모든 예외를 잡을 수 있게 하지만, 이는 너무 광범위한 예외 처리로 이어져 중요한 오류를 숨길 수 있습니다. 이 PEP는 모든 `except` 절에 명시적인 예외 유형을 요구하여, 더 정확하고 의도적인 오류 처리를 장려하고자 합니다.

## 상태
Withdrawn (철회됨)

## 작성자
Pablo Galindo, Brett Cannon

## Python 버전
3.14

## 주요 내용

### 동기 (Motivation)
현재 `except:` 만 사용하는 구문은 모든 예외를 잡을 수 있게 합니다.

```python
try:
    risky_operation()
except:
    handle_any_error()
```

이 "모든 예외 잡기" 핸들러는 편리할 수 있지만, 종종 좋지 않은 코딩 관행으로 이어집니다:
*   전파되어야 할 중요한 오류를 숨길 수 있습니다.
*   예상치 못한 예외를 잡고 숨겨 디버깅을 어렵게 만듭니다.
*   명시적인 것이 암시적인 것보다 낫다는 Python의 원칙에 위배됩니다.

Pylint, Flake8, Ruff와 같은 다양한 린터(linter) 및 PEP 8, Google 스타일 가이드를 포함한 여러 스타일 가이드가 `bare except` 절을 사용하지 않도록 권고합니다.

명시적인 예외 유형을 요구함으로써, 우리는 더 사려 깊고 정확한 오류 처리를 장려할 수 있습니다:

```python
try:
    risky_operation()
except Exception as e:
    handle_expected_error(e)
```

`bare except` 핸들러는 종료 예외(terminating exceptions) 처리 의도에 대해 모호하다는 문제도 있습니다.
*   **비종료 예외만 잡으려는 의도(`except Exception:`):** 이 경우 `bare except:`를 사용하는 것은 의도와 맞지 않으므로 버그입니다.
*   **종료 예외를 포함한 모든 예외를 잡으려는 의도(`except BaseException:`):** 이 경우 `bare except:`가 올바르지만, 독자가 앞선 경우와 혼동하지 않도록 확인해야 하는 번거로움이 있습니다.

두 가지 가능한 의도 모두 모호하지 않은 명확한 구문이 존재하므로, 모호한 형태(`bare except:`)는 불필요하며 이에 따라 이를 금지할 것을 제안합니다.

### 근거 (Rationale)
`bare except` 절을 금지하기로 한 결정은 다음 사항들을 기반으로 합니다:
*   특정 예외 유형을 요구하면 프로그래머의 의도가 명확해지고, 발생할 수 있는 예외에 대해 생각하게끔 장려합니다.
*   특정 예외만 잡으면 예상치 못한 오류를 식별하고 디버깅하기가 더 쉬워집니다.
*   지나치게 광범위한 예외 처리를 방지하여 치명적인 오류가 조용히 무시되는 위험을 줄입니다.
*   많은 스타일 가이드와 린터가 이미 `bare except` 절 사용을 권장하지 않습니다.

### 명세 (Specification)
`except` 절의 구문이 예외 유형을 요구하도록 수정됩니다. 문법은 `except` 절에 빈 표현식을 추가할 가능성을 제거하도록 업데이트됩니다.

이 변경은 `bare except:` 구문을 금지합니다. 모든 `except` 절은 적어도 하나의 예외 유형을 지정해야 합니다.

```python
try:
    ...
except ValueError:        # 허용됨
    ...
except (TypeError, RuntimeError): # 허용됨
    ...
except Exception:         # 허용됨 (모든 예외를 명시적으로 잡음)
    ...
```

예외 처리의 의미는 변경되지 않으며, `BaseException` 또는 유사하게 광범위한 예외 유형을 명시적으로 지정하지 않고는 모든 예외를 잡는 것이 더 이상 불가능해집니다.

### 하위 호환성 (Backwards Compatibility)
이 변경은 하위 호환성이 없습니다. `bare except:` 절을 사용하는 기존 코드는 수정되어야 합니다. 전환을 용이하게 하기 위해 다음과 같은 조치가 제안되었습니다:
*   Python 3.14에서 `bare except` 절에 대한 DeprecationWarning이 발생합니다.
*   Python 3.17에서 해당 구문은 완전히 금지됩니다.
*   이전 버전의 Python에서 `bare except` 핸들러를 무효화하기 위해 `from __future__ import strict_excepts`가 제공될 것입니다.
*   `bare except:`를 `except BaseException:`으로 자동 업데이트하는 도구가 제공될 것입니다.

### 보안 관련 사항 (Security Implications)
이 변경은 보안에 미치는 영향이 없습니다.

### 교육 방안 (How to Teach This)
*   **새로운 Python 사용자:** 예외 처리는 처음부터 명시적인 예외 유형으로 가르쳐야 합니다.

    ```python
    try:
        result = risky_operation()
    except ValueError:
        handle_value_error()
    except TypeError:
        handle_type_error()
    except Exception as e:
        handle_unexpected_error(e)
    ```
*   **숙련된 사용자:** 이 변경은 이제 언어에 의해 강제되는 모범 사례로 소개될 수 있습니다. 다음 사항이 강조되어야 합니다:
    *   가능하면 항상 특정 예외를 잡으세요.
    *   `except Exception:`은 정말 예상치 못한 오류에 대한 마지막 수단으로 사용하세요.
    *   신중한 고려 없이 예외를 침묵시키지 마세요.

문서에는 일반적인 예외 계층 구조와 적절한 예외 유형을 선택하는 방법에 대한 지침이 포함되어야 합니다.

### 거부된 아이디어 (Rejected ideas)
`bare except:` 핸들러의 사용이 올바른 진정한 사례들이 있습니다. 예를 들어, Mailman 프로젝트에서 어떤 예외가 발생하더라도 트랜잭션을 처리하는 경우입니다:

```python
@contextmanager
def transaction():
    """Context manager for ensuring the transaction is complete."""
    try:
        yield
    except:
        config.db.abort()
        raise
    else:
        config.db.commit()
```

이 코드는 어떤 예외가 발생하든 열려 있는 트랜잭션이 중단되도록 보장하며, 성공적인 경우에는 트랜잭션이 커밋되도록 합니다.

이러한 `bare except:` 핸들러가 올바른 경우가 있음에도 불구하고, "동기" 섹션에 제시된 이유들 때문에 `except BaseException:`을 사용하여 명시적으로 표현하는 것이 더 낫다고 판단했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.