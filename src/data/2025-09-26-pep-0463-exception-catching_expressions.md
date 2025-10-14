---
title: "[Rejected] PEP 463 - Exception-catching expressions"
excerpt: "Python Enhancement Proposal 463: 'Exception-catching expressions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/463/
toc: true
toc_sticky: true
date: 2025-09-26 22:11:32+0900
last_modified_at: 2025-09-26 22:11:32+0900
published: true
---
> **원문 링크:** [PEP 463 - Exception-catching expressions](https://peps.python.org/pep-0463/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 15-Feb-2014

## PEP 463 – 예외 처리 표현식 (Exception-catching expressions) 번역 및 정리

### 개요

PEP 463은 표현식(expression) 내에서 예외(exception)를 처리할 수 있는 새로운 문법을 제안했습니다. 이는 PEP 308이 값 기반 조건(value-based conditions)을 표현식에 도입했던 것과 유사하게, 예외 기반 조건(exception-based conditions)을 표현식의 일부로 사용할 수 있도록 하는 것을 목표로 했습니다. 그러나 이 PEP는 결국 "거부됨(Rejected)" 상태가 되었습니다.

### 거부 공지 (Rejection Notice)

PEP 463은 Python-Dev 메일링 리스트에서 거부되었습니다. 제안된 문법 자체는 허용될 수 있다고 보았지만, 제안의 동기와 근거(motivation and rationale)에 대한 동의를 얻지 못했습니다. 특히 `dict.get()`과 같은 기존 메서드가 `except` 표현식이 도입되더라도 불필요해지지 않을 것이라는 점, 그리고 EAFP(Easier to Ask for Forgiveness than Permission)가 LBYL(Look Before You Leap)보다 항상 우수하거나 Python에서 "일반적으로 권장된다"는 주장에 동의하지 않았습니다.

### 요약 (Abstract)

PEP 308이 표현식에 값 기반 조건을 도입한 것처럼, 이 시스템은 예외 기반 조건을 표현식의 일부로 사용할 수 있도록 합니다.

### 동기 (Motivation)

많은 함수와 메서드는 예외를 발생시키는 대신 특정 값을 반환하도록 하는 매개변수를 가지고 있습니다. 하지만 현재 시스템은 임시적(ad-hoc)이고 일관성이 없으며, 각 함수가 이러한 기능을 개별적으로 구현해야 합니다. 모든 함수가 이 기능을 지원하는 것도 아닙니다.

**예시:**

*   `dict.get(key, default)`: `KeyError` 대신 두 번째 위치 인자(`default`)를 반환합니다.
*   `next(iter, default)`: `StopIteration` 대신 두 번째 위치 인자(`default`)를 반환합니다.
*   `list.pop()`: 기본값을 반환하는 방법이 없습니다.
*   `seq[index]`: 경계 오류(bounds error)를 처리하는 방법이 없습니다.
*   `min(sequence, default=default)`: `ValueError` 대신 키워드 인자 `default`를 반환합니다 (Python 3.4부터).
*   `statistics.mean(data)`: 빈 이터레이터(empty iterator)를 처리하는 방법이 없습니다.

만약 이 기능이 Python 역사 초기에 존재했다면, `dict.get()`과 같은 메서드를 만들 필요가 없었을 것입니다. 키가 없을 때를 처리하는 한 가지 분명한 방법은 예외에 응답하는 것이었을 테니까요. 대신 우리는 `dict.get()`과 Python 3.4부터 `min(... default=default)` 등 수많은 다른 방식들을 사용하고 있습니다.

표현식 내에서 테스트하기 위한 LBYL 문법은 있지만, 현재 EAFP 표기법은 없습니다. 다음을 비교해 보세요.

```python
# LBYL:
if key in dic:
    process(dic[key])
else:
    process(None)

# 표현식 형태 (LBYL):
process(dic[key] if key in dic else None)

# EAFP:
try:
    process(dic[key])
except KeyError:
    process(None)

# 제안된 표현식 형태 (EAFP):
process(dic[key] except KeyError: None)
```

Python은 일반적으로 EAFP 정책을 권장하지만, 이를 가능하게 하기 위해 `dic.get(key,None)`과 같은 유틸리티 함수들을 증식시켜야 합니다.

### 근거 (Rationale)

현재 시스템에서는 함수 작성자가 기본값의 필요성을 예측하고 이를 지원하도록 구현해야 합니다. 그렇지 않으면 전체 `try/except` 블록이 필요합니다.

`try/except`는 문(statement)이기 때문에 표현식 중간에서 예외를 잡는 것이 불가능합니다. `if/else`가 조건문에, `lambda`가 함수 정의에 하는 것처럼, 이 제안은 표현식 컨텍스트에서 예외 처리를 가능하게 합니다.

이는 함수가 기본값을 제공하는 깨끗하고 일관된 방법을 제공합니다: 단순히 적절한 예외를 발생시키고, 호출자가 이를 잡습니다.

어떤 상황에서는 LBYL 기법을 사용할 수 있습니다 (예를 들어, 시퀀스의 인덱스를 사용하기 전에 길이가 충분한지 확인하는 것). 이는 모든 경우에 안전하지는 않지만, 종종 편리하기 때문에 프로그래머들은 LBYL의 간결한 표기법을 위해 EAFP의 안전성을 희생하고 싶어 할 것입니다. 또한, 일부 LBYL 기법(예: 세 인자를 가진 `getattr` 사용)은 코드를 속성 조회(attribute lookup)가 아닌 문자열 리터럴처럼 보이게 만들어 가독성에 영향을 줄 수 있습니다. 편리한 EAFP 표기법은 이 모든 문제를 해결합니다.

이를 위한 헬퍼 함수를 작성하는 편리한 방법은 없습니다. 가장 가까운 것은 `lambda`를 사용한 다소 지저분한 방식입니다.

```python
def except_(expression, exception_list, default):
    try:
        return expression()
    except exception_list:
        return default()

value = except_(lambda: 1/x, ZeroDivisionError, lambda: float("nan"))
```

이는 투박하고 여러 `except` 절(clause)을 처리할 수 없습니다. `eval`을 사용하는 것은 더욱 투박하고 구현에 의존적인 핵(hack)에 의존합니다.

Raymond Hettinger는 이러한 일관된 API에 대한 열망을 표명했으며, 유사한 요청이 과거에도 여러 번 있었습니다.

### 제안 (Proposal)

`or` 연산자와 세 부분으로 된 `if-else` 표현식이 거짓 값(falsy value)을 잡고 대체하는 단락 평가(short-circuiting) 방식을 제공하는 것처럼, 이 문법은 예외를 잡고 대체하는 단락 평가 방식을 제공합니다.

현재는 다음과 같이 작동합니다:

```python
lst = [1, 2, None, 3]
value = lst[2] or "No value" # None이 거짓 값이므로 "No value"가 됨
```

제안은 다음을 추가합니다:

```python
lst = [1, 2]
value = (lst[2] except IndexError: "No value") # lst[2]가 IndexError를 발생시키면 "No value"가 됨
```

구체적으로 제안된 문법은 다음과 같습니다:

`(expr except exception_list: default)`

여기서 `expr`, `exception_list`, `default`는 모두 표현식입니다.

1.  먼저 `expr`이 평가됩니다.
2.  예외가 발생하지 않으면, `expr`의 값이 전체 표현식의 값이 됩니다.
3.  어떤 예외라도 발생하면, `exception_list`가 평가되며, `try/except` 문의 형태와 마찬가지로 타입(type) 또는 튜플(tuple)을 결과로 해야 합니다.
4.  일치하는 예외가 발생하면, 해당 `default` 표현식이 평가되고 이 값이 전체 표현식의 값이 됩니다.
5.  `try/except` 문의 형태와 마찬가지로, 일치하지 않는 예외는 위로 전파됩니다.

전체 표현식은 괄호로 묶어야 합니다. 이는 `generator expression`이 따르는 규칙과 동일하게, 괄호가 완전히 중복되는 경우가 아니라면 필요합니다. 이는 중첩된 `except` 표현식의 올바른 해석을 보장하고, 문법의 향후 확장을 허용합니다.

**참고:** 현재 제안은 예외 객체(exception object)를 캡처하는 것을 허용하지 않습니다. 이것이 필요한 경우에는 문(statement) 형태를 사용해야 합니다.

이 삼항 연산자(ternary operator)는 `lambda`와 `if/else` 사이의 연산자 우선순위(precedence)를 가집니다.

두 단계 캐시(two-level cache)의 다음 예를 고려해 보세요:

```python
for key in sequence:
    x = (lvl1[key] except KeyError: (lvl2[key] except KeyError: f(key)))
    # x를 가지고 뭔가 한다
```

이것은 다음처럼 다시 작성될 수 없습니다:

```python
x = lvl1.get(key, lvl2.get(key, f(key)))
```

위 코드는 더 짧지만, `get()`에 전달할 기본값을 계산해야 하므로 캐시의 목적을 무력화시킵니다. `.get()` 버전은 역방향으로 계산하고, 예외 테스트 버전은 예상대로 정방향으로 계산합니다. 가장 유용한 등가물은 다음과 같을 것입니다:

```python
x = lvl1.get(key) or lvl2.get(key) or f(key)
```

이는 값들이 0이 아닐 뿐만 아니라 캐시 객체가 이 기능을 지원하는지에 따라 달라집니다.

### 대안 제안 (Alternative Proposals)

`python-ideas`에서의 논의는 다음과 같은 문법 제안들을 이끌어냈습니다:

*   `value = expr except default if Exception [as e]`
*   `value = expr except default for Exception [as e]`
*   `value = expr except default from Exception [as e]`
*   `value = expr except Exception [as e] return default`
*   `value = expr except (Exception [as e]: default)`
*   `value = expr except Exception [as e] try default`
*   `value = expr except Exception [as e] continue with default`
*   `value = default except Exception [as e] else expr`
*   `value = try expr except Exception [as e]: default`
*   `value = expr except default # 모든 예외를 잡음`
*   `value = expr except(Exception) default # 지정된 타입의 예외만 잡음`
*   `value = default if expr raise Exception`
*   `value = expr or else default if Exception`
*   `value = expr except Exception [as e] -> default`
*   `value = expr except Exception [as e] pass default`

새로운 키워드를 만드는 대신 기존 키워드를 재사용하는 것이 제안되기도 했습니다. 그러한 제안들은 마지막 형태와 동일한 구조를 가지지만, `'pass'` 대신 다른 키워드를 사용합니다. 제안된 키워드로는 `'then'`, `'when'`, `'use'` 등이 있습니다. 또한, "default if expr raise Exception" 제안과 관련하여 새로운 키워드 "`raises`"를 사용하는 것이 제안되었습니다.

`as` 캡처 절(capturing clause)을 포함하는 모든 형태는 단순성을 위해 이 제안에서 연기되었지만, 제안의 정확한 기록으로 위 표에 보존되어 있습니다.

이 제안에서 가장 많이 지지받은 네 가지 형태는 순서대로 다음과 같습니다:

1.  `value = (expr except Exception: default)`
2.  `value = (expr except Exception -> default)`
3.  `value = (expr except Exception pass default)`
4.  `value = (expr except Exception then default)`

네 가지 모두 좌우 평가 순서(left-to-right evaluation order)를 유지합니다: 먼저 기본 표현식, 다음으로 예외 목록, 마지막으로 기본값입니다. 이는 표현식들이 지연 평가(lazily evaluated)되기 때문에 중요합니다.

콜론을 사용하는 선호되는 형태는 "except exception_list:"를 사용하여 `try/except`와 유사하며, "keyword name_list: subexpression"을 사용하여 `lambda`와 유사합니다. 또한, 예외를 기본값에 매핑하는 사전(dict) 스타일로 읽을 수도 있습니다. 화살표를 사용하는 것은 많은 프로그래머에게 익숙하지 않고 현재 유사한 의미가 없는 토큰을 도입하지만, 그 외에는 상당히 읽기 쉽습니다. 영어 단어 "pass"는 막연하게 유사한 의미를 가지며 ("pass by value/reference"와 같은 함수 인수의 일반적인 사용을 고려), "pass"는 이미 키워드이지만, 그 의미가 분명히 관련이 없으므로 혼란을 야기할 수 있습니다. "then"을 사용하는 것은 영어에서는 의미가 있지만, 이는 언어에 새로운 키워드를 도입하는 것입니다.

좌우 평가 순서는 대부분의 표현식이 평가되는 순서와 일치하기 때문에 가독성에 매우 중요합니다.

기존 표기법을 유지하되 필수 괄호의 위치를 변경하는 다음 제안도 있었습니다:

*   `value = expr except (Exception: default)`
*   `value = expr except(Exception: default)`

이는 함수 호출이나 딕셔너리 초기화와 유사합니다. 콜론이 스위트(suite)를 도입하는 것으로 혼동될 수는 없지만, 새로운 문법은 지연 평가를 보장하는데 딕셔너리는 그렇지 않습니다. 혼란을 줄일 잠재력은 혼란을 증가시킬 잠재력에 의해 정당화되지 않는다고 간주되었습니다.

### 사용 예시 (Example usage)

각 예시에는 표현식이 어떻게 파싱될지를 보여주기 위해 대략적으로 동등한 문(statement) 형태가 주어집니다. 이들은 엄밀히 동일하지는 않지만, 동일한 목적을 달성합니다. 인터프리터가 하나를 다른 것으로 번역하는 것은 안전하지 않습니다.

이 예시들 중 상당수는 Python 표준 라이브러리에서 직접 가져온 것으로, 2014년 2월 초 기준 파일 이름과 줄 번호가 정확합니다. 이러한 패턴 중 많은 것들이 매우 일반적입니다.

*   **인자 검색, 기본값은 `None`:**
    ```python
    cond = (args[1] except IndexError: None)
    # Equivalent statement form:
    # try:
    #     cond = args[1]
    # except IndexError:
    #     cond = None
    ```

*   **시스템에서 정보를 가져옴 (가능한 경우):**
    ```python
    pwd = (os.getcwd() except OSError: None)
    # Equivalent statement form:
    # try:
    #     pwd = os.getcwd()
    # except OSError:
    #     pwd = None
    ```

*   **번역 시도, 실패 시 원본으로 대체:**
    ```python
    e.widget = (self._nametowidget(W) except KeyError: W)
    # Equivalent statement form:
    # try:
    #     e.widget = self._nametowidget(W)
    # except KeyError:
    #     e.widget = W
    ```

*   **이터레이터에서 읽기, 소진 시 빈 줄로 계속:**
    ```python
    line = (readline() except StopIteration: '')
    # Equivalent statement form:
    # try:
    #     line = readline()
    # except StopIteration:
    #     line = ''
    ```

*   **플랫폼별 정보 검색 (DRY 개선점 주목):**
    ```python
    _CONFIG_VARS['abiflags'] = (sys.abiflags except AttributeError: '')
    # Equivalent statement form:
    # try:
    #     _CONFIG_VARS['abiflags'] = sys.abiflags
    # except AttributeError:
    #     _CONFIG_VARS['abiflags'] = ''
    ```

*   **인덱싱된 항목 검색, 기본값은 `None` (`dict.get`과 유사):**
    ```python
    def getNamedItem(self, name):
        return (self._attrs[name] except KeyError: None)
    # Equivalent statement form:
    # def getNamedItem(self, name):
    #     try:
    #         return self._attrs[name]
    #     except KeyError:
    #         return None
    ```

*   **숫자를 이름으로 번역, 실패 시 숫자로 대체:**
    ```python
    g = (grp.getgrnam(tarinfo.gname)[2] except KeyError: tarinfo.gid)
    u = (pwd.getpwnam(tarinfo.uname)[2] except KeyError: tarinfo.uid)
    # Equivalent statement form:
    # try:
    #     g = grp.getgrnam(tarinfo.gname)[2]
    # except KeyError:
    #     g = tarinfo.gid
    # try:
    #     u = pwd.getpwnam(tarinfo.uname)[2]
    # except KeyError:
    #     u = tarinfo.uid
    ```

*   **속성 조회, 실패 시 기본값으로 대체:**
    ```python
    mode = (f.mode except AttributeError: 'rb')
    # Equivalent statement form:
    # if hasattr(f, 'mode'):
    #     mode = f.mode
    # else:
    #     mode = 'rb'

    return (sys._getframe(1) except AttributeError: None)
    # Equivalent statement form:
    # return sys._getframe(1) if hasattr(sys, "_getframe") else None
    ```

*   **EAFP 모드에서 긴 계산 수행, 0으로 나누기를 sticky NaN으로 처리:**
    ```python
    value = (calculate(x) except ZeroDivisionError: float("nan"))
    # Equivalent statement form:
    # try:
    #     value = calculate(x)
    # except ZeroDivisionError:
    #     value = float("nan")
    ```

*   **일련의 숫자의 평균 계산, 실패 시 0으로 대체:**
    ```python
    value = (statistics.mean(lst) except statistics.StatisticsError: 0)
    # Equivalent statement form:
    # try:
    #     value = statistics.mean(lst)
    # except statistics.StatisticsError:
    #     value = 0
    ```

*   **오버라이드(override)의 희소 목록에서 객체 조회:**
    ```python
    (overrides[x] or default except IndexError: default).ping()
    # Equivalent statement form:
    # try:
    #     (overrides[x] or default).ping()
    # except IndexError:
    #     default.ping()
    ```

#### 예외 처리 범위 좁히기 (Narrowing of exception-catching scope)

Python의 표준 라이브러리에서 가져온 다음 예시들은 `try/except`의 범위를 편리하게 좁힐 수 있는 방법을 보여줍니다. `try/except` 문 형태로는 임시 변수가 필요하지만, 표현식으로는 훨씬 깔끔합니다.

`Lib/ipaddress.py:343`:

```python
try:
    ips.append(ip.ip)
except AttributeError:
    ips.append(ip.network_address)
```

다음과 같이 됩니다:

```python
ips.append(ip.ip except AttributeError: ip.network_address)
```

표현식 형태는 다음 코드와 거의 동일합니다:

```python
try:
    _ = ip.ip
except AttributeError:
    _ = ip.network_address
ips.append(_)
```

`Lib/tempfile.py:130`:

```python
try:
    dirlist.append(_os.getcwd())
except (AttributeError, OSError):
    dirlist.append(_os.curdir)
```

다음과 같이 됩니다:

```python
dirlist.append(_os.getcwd() except (AttributeError, OSError): _os.curdir)
```

`Lib/asyncore.py:264`:

```python
try:
    status.append('%s:%d' % self.addr)
except TypeError:
    status.append(repr(self.addr))
```

다음과 같이 됩니다:

```python
status.append('%s:%d' % self.addr except TypeError: repr(self.addr))
```

각 경우에, 좁혀진 `try/except`의 범위는 예상치 못한 예외 (예를 들어, "append"를 잘못 입력했을 때의 `AttributeError`)가 동일한 핸들러에 의해 잡히지 않도록 보장합니다.

### 다른 언어와의 비교 (Comparisons with other languages)

(이 섹션을 정리해 준 Andrew Barnert에게 감사드립니다. 여기에 주어진 예시들은 제안의 현재 버전을 반영하지 않으므로 편집이 필요합니다.)

*   **Ruby:** `begin...rescue...rescue...else...ensure...end`는 표현식입니다.
*   **Erlang:** `try` 표현식을 가집니다.
*   **ML 계열 언어 (SML, OCaml):** `handle` 및 `try`를 통해 예외를 처리합니다.
*   **Oz:** `try ... catch ... then` 형태를 가집니다.
*   **Lisp 계열 언어 (Clojure, Common Lisp):** `try/catch`를 특별한 형태(special forms)로 구현합니다.
*   **Lua:** `xpcall` 함수를 사용합니다.
*   **Haskell:** `catch`를 사용하여 예외를 처리합니다.
*   **Tcl:** `catch` 함수를 사용합니다.
*   **Smalltalk:** `on:do:` 구문을 사용합니다.

Haskell의 `catch`는 제안된 `lambda`의 콜론과 `except`의 콜론 사이의 유사성을 더욱 분명하게 보여줍니다.

```python
x = expression() except Exception: default()
x = expression() except Exception as e: default(e)
```

### 연기된 하위 제안 (Deferred sub-proposals)

#### 여러 `except` 절 (Multiple except clauses)

사용 사례를 검토한 결과, 문(statement) 형태에서만큼 자주 필요하지 않으며, 구문적 합의가 이루어지지 않아 전체 기능이 연기되었습니다.

여러 `except` 키워드를 사용할 수 있었고, 이는 모두 원래 표현식에서 발생한 예외만 잡을 것입니다.

```python
# expr에 의해 발생한 나열된 예외 중 하나를 잡습니다.
# default 표현식에 의해 발생한 예외는 전파됩니다.
value = (expr except Exception1: default1
              except Exception2: default2
              # ...
              except ExceptionN: defaultN )
```

현재는 다음 형태 중 하나를 사용해야 합니다:

```python
# expr 또는 default1에 의해 발생한 Exception2를 잡습니다.
value = ( (expr except Exception1: default1) except Exception2: default2 )
# default1에 의해 발생한 Exception2만 잡습니다.
value = (expr except Exception1: (default1 except Exception2: default2) )
```

괄호 없이 여러 `except` 절을 나열하는 것은 문법 오류이므로, Python의 향후 버전은 기존 코드를 손상시키지 않고 이 기능을 추가할 수 있습니다.

#### 예외 객체 캡처 (Capturing the exception object)

`try/except` 블록에서 `as`를 사용하여 예외 객체를 캡처하는 것은 지역 이름 바인딩을 생성하고, `finally` 절에서 해당 바인딩을 암묵적으로 삭제합니다 (참조 루프를 피하기 위함). 표현식 컨텍스트에서는 이것이 거의 의미가 없으며, 예외 객체를 안전하게 캡처하려면 적절한 하위 범위(sub-scope)가 필요합니다. 이는 리스트 컴프리헨션(list comprehension)이 처리되는 방식과 유사합니다.

그러나 CPython은 현재 컴프리헨션의 하위 범위를 중첩된 함수 호출로 구현하는데, 이는 클래스 정의와 같은 일부 컨텍스트에서 문제를 야기할 수 있어 이 제안에는 부적합합니다. 미래에 진정한 하위 범위를 생성하는 방법(컴프리헨션, `except` 표현식, `with` 블록 등을 단순화할 수 있는)이 생긴다면 이 제안은 부활할 수 있습니다. 그때까지는 단순한 예외 처리가 이 표현식 표기법에 잘 맞으며, 일반적으로 예외의 타입에만 관심이 있고 그 값에는 관심이 없으므로 큰 손실은 아닙니다.

이 문법은 대화형 Python에서 예외를 편리하게 캡처할 수 있는 방법을 제공할 수 있습니다. 반환 값은 `_`로 캡처되지만, 예외는 현재 그렇지 않습니다.

```python
>>> (expr except Exception as e: e)
```

Python 표준 라이브러리를 검토한 결과, `as`의 사용이 상당히 흔하지만 (대략 5개의 `except` 절 중 하나), 표현식 형태로 논리적으로 변환될 수 있는 경우에는 극히 드뭅니다. 몇 안 되는 용례는 단순히 변경하지 않고 남겨둘 수 있습니다. 따라서 단순성을 위해 이 제안에는 `as` 절이 포함되지 않습니다. `as`는 이미 키워드이므로, 후속 Python 버전은 기존 코드를 손상시키지 않고 이를 추가할 수 있습니다.

### 거부된 하위 제안 (Rejected sub-proposals)

#### `finally` 절 (finally clause)

`try...finally` 또는 `try...except...finally` 문 형태는 논리적으로 대응하는 표현식 형태가 없습니다. 따라서 `finally` 키워드는 어떤 식으로든 이 제안의 일부가 아닙니다.

#### `bare except`의 다른 의미 (Bare except having different meaning)

몇몇 제안된 구문에서 예외 타입 이름을 생략하는 것이 쉽고 간결하며 매력적일 수 있었습니다. 편의를 위해 `bare 'except'` 절이 "except `BaseException`"보다 더 유용한 의미를 가지도록 하는 것이 유리할 수 있었습니다. 제안에는 `Exception`을 잡도록 하거나, 특정 "일반적인 예외" 세트(새로운 타입 `ExpressionError`의 서브클래스)를 잡도록 하거나, 현재 범위에서 `ExpressionError`라는 튜플을 찾도록 하여 (기본값으로 `(ValueError, UnicodeError, AttributeError, EOFError, IOError, OSError, LookupError, NameError, ZeroDivisionError)`와 같은) 잡도록 하는 것이 포함되었습니다. 이 모든 것은 여러 가지 이유로 거부되었습니다.

무엇보다도, `try/except` 문의 형태와의 일관성이 깨질 것입니다. 리스트 컴프리헨션이나 삼항 `if` 표현식이 수직적인 문 형태로 "풀어써서" 설명될 수 있는 것처럼, 표현식 `except`도 거의 동등한 문으로 상대적으로 기계적인 번역을 통해 설명될 수 있어야 합니다. 따라서 양쪽에 공통된 어떤 형태의 구문이든 각자 동일한 의미를 가져야 하며, 무엇보다도 한쪽이 다른 쪽보다 더 많은 것을 잡는 미묘한 차이를 가져서는 안 됩니다.

둘째, 잡을 적절한 예외 집합 자체가 큰 논쟁의 여지가 될 것입니다. 어떤 예외를 잡는 것이 "합리적인지" 정확히 예측하는 것은 불가능할 것입니다.

셋째, 예상치 못한 예외를 잡는 어떤 상황도 불필요한 버그를 유발합니다.

결과적으로, `bare 'except'`의 사용은 두 가지 가능성으로 귀결됩니다: 표현식 형태에서 문법적으로 금지되거나, 문 형태와 정확히 동일한 의미(즉, `BaseException`을 잡고 `as`로 캡처할 수 없음)로 허용되는 것입니다.

#### `bare except` 절 (Bare except clauses)

PEP 8은 `bare 'except'`의 사용을 올바르게 권장하지 않습니다. 문(statement)에서는 문법적으로 유효하고 하위 호환성을 위해 유지되어야 하지만, 그 사용을 장려할 가치는 거의 없습니다. 표현식 `except` 절에서 "except:"는 `SyntaxError`입니다; 대신 동등한 전체 형태인 "except `BaseException`:"을 사용해야 합니다. Python의 향후 버전은 이를 복원하기로 선택할 수도 있으며, 이는 호환성을 깨지 않고 수행할 수 있습니다.

#### `except` 절 주위의 괄호 (Parentheses around the except clauses)

예외를 발생시킬 수 있는 표현식과는 별도로 `except` 절에 괄호를 붙이는 것이 합법적이어야 하는가? 예시:

```python
value = expr ( except Exception1 [as e]: default1
               except Exception2 [as e]: default2
               # ...
               except ExceptionN [as e]: defaultN )
```

이는 여러 `except` 절 및/또는 예외 캡처에 대한 연기된 하위 제안 중 하나 또는 둘 모두가 포함될 때 더욱 설득력이 있습니다.

장점은 미미하며, 독자가 `except` 절이 표현식과 분리되어 있다고 생각하거나 이것이 함수 호출이라고 생각하도록 혼란시킬 가능성 때문에 설득력이 없습니다. 물론, 원하는 경우 표현식도 괄호로 묶을 수 있으며, 기본값도 마찬가지입니다.

```python
value = (expr) except ExceptionType: (default)
```

이제 전체 표현식이 괄호로 묶여야 하므로 (이 논의 당시에는 결정되지 않았던 사항), 이 섹션을 구분할 필요성이 줄어들고 많은 경우 중복될 것입니다.

#### "except: pass"의 줄임말 (Short-hand for “except: pass”)

다음은 기술적으로 표현식은 아니지만 유사한 줄임말로 제안되었습니다:

```python
statement except Exception: pass
# Equivalent statement form:
# try:
#     statement
# except Exception:
#     pass
```

예를 들어, 파일 삭제를 시도하는 일반적인 사용 사례는 다음과 같습니다:

```python
os.unlink(some_file) except OSError: pass
```

Python 3.4의 `contextlib`에는 이미 동등한 것이 있습니다:

```python
from contextlib import suppress
with suppress(OSError):
    os.unlink(some_file)
```

이는 이미 한 줄이므로, 이를 달성하기 위해 새로운 구문이나 문(statement)과 표현식(expression)의 혼동이 필요하지 않습니다.

### 일반적인 반대 의견 (Common objections)

#### 콜론은 항상 스위트를 도입한다 (Colons always introduce suites)

Python의 많은 구문 요소가 콜론을 사용하여 문 스위트(`if`, `while`, `with`, `for` 등)를 도입하는 것은 사실이지만, 이것이 콜론의 유일한 용도는 아닙니다. 현재 Python 구문에는 콜론이 하위 표현식(subexpression)을 도입하는 네 가지 경우가 있습니다:

*   딕셔너리 표현식 (`dict display`) - `{ ... key:value ... }`
*   슬라이스 표기법 (`slice notation`) - `[start:stop:step]`
*   함수 정의 (`function definition`) - `parameter : annotation`
*   람다 (`lambda`) - `arg list: return value`

이 제안은 다섯 번째를 추가할 뿐입니다:

*   `except` 표현식 (`except-expression`) - `exception list: result`

스타일 가이드와 PEP 8은 줄 바꿈된 줄의 끝에 콜론을 두지 않도록 권장해야 합니다. 이는 스위트의 도입처럼 보일 수 있기 때문입니다. 대신 예외 목록 앞에 줄 바꿈을 하여 콜론이 두 표현식 사이에 명확하게 오도록 해야 합니다.

### 저작권 (Copyright)

이 문서는 공개 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.