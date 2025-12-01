---
title: "[Withdrawn] PEP 504 - Using the System RNG by default"
excerpt: "Python Enhancement Proposal 504: 'Using the System RNG by default'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/504/
toc: true
toc_sticky: true
date: 2025-09-26 22:47:22+0900
last_modified_at: 2025-09-26 22:47:22+0900
published: true
---
> **원문 링크:** [PEP 504 - Using the System RNG by default](https://peps.python.org/pep-0504/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 15-Sep-2015


## PEP 504 – 기본적으로 시스템 RNG 사용 (Using the System RNG by default)

**저자:** Alyssa Coghlan <ncoghlan at gmail.com>
**상태:** 철회됨 (Withdrawn)
**유형:** Standards Track
**생성일:** 2015년 9월 15일
**Python 버전:** 3.6
**이력:** 2015년 9월 15일

---

### 초록 (Abstract)

현재 Python의 `random` 모듈에 있는 모듈 레벨 API는 기본적으로 결정론적(deterministic)인 Mersenne Twister 의사 난수 생성기(PRNG)를 사용합니다. 이로 인해 사용자가 "보안에 민감한(security sensitive)" 작업을 수행할 때는 `os.urandom` 또는 `random.SystemRandom` 인터페이스와 같은 암호학적으로 안전한 난수 생성기(CSPRNG)를 사용하거나 `cryptography`와 같은 서드파티 라이브러리를 사용해야 한다는 것을 인지하고 있어야 합니다.

하지만 이러한 접근 방식은 자신이 보안에 민감한 작업을 하고 있다는 것을 인지하지 못하는 개발자들이 기본 모듈 레벨 API를 사용하게 되어, 사용자들을 불필요한 위험에 노출시키는 결과를 초래했습니다.

이 문제는 당장 심각한(acute) 문제는 아니지만 만성적인(chronic) 문제입니다. 보안 취약점이 도입된 시점과 실제 악용되는 시점 사이에 긴 지연이 발생하는 경우가 많아, 개발자들이 경험을 통해 자연스럽게 학습하기 어렵게 만듭니다.

이 문제에 대한 궁극적이고 보편적인 해결책을 제공하기 위해, 이 PEP는 Python 3.6부터 Python이 기본적으로 시스템 난수 생성기(System Random Number Generator, RNG)를 사용하도록 전환하고, 개발자들이 `random.ensure_repeatable()`이라는 새로운 API를 사용하거나 자신만의 `random.Random()` 인스턴스를 명시적으로 생성하여 프로세스 전반에 걸쳐 결정론적 난수 생성기를 사용하도록 옵트인(opt-in)해야 한다고 제안합니다.

기존 코드에 미치는 영향을 최소화하기 위해 결정성을 요구하는 모듈 레벨 API는 암시적으로 결정론적 PRNG로 전환될 것입니다.

### PEP 철회 (PEP Withdrawal)

이 PEP에 대한 논의 과정에서 Steven D'Aprano는 기본 비밀번호 및 기타 토큰 생성과 같은 보안에 민감한 작업을 처리하기 위한 "한 가지 명확한 방법(one obvious way)"을 제공하는 표준화된 `secrets` 모듈을 제안했습니다.

Steven의 제안은 기존 `random` 모듈 API에 대한 호환성 위험을 도입하지 않으면서, 이러한 토큰을 쉽게 생성하는 방법과 올바르게 생성하는 방법을 일치시키는 원하는 효과를 가져옵니다. 따라서 이 PEP는 Steven의 제안을 PEP 506으로 발전시키는 추가 작업을 위해 철회되었습니다.

### 제안 (Proposal)

현재 `random` 모듈의 모듈 레벨 함수를 보안에 민감한 애플리케이션에 사용하는 것은 결코 올바르지 않습니다. 이 PEP는 Python 3.6+에서 이 경고를 "해당 프로세스에서 `random.ensure_repeatable()`이 (직접적으로든 간접적으로든) 호출되는 경우 `random` 모듈의 모듈 레벨 함수를 보안에 민감한 애플리케이션에 사용하는 것은 올바르지 않다"는 식으로 변경할 것을 제안합니다.

이를 달성하기 위해, 현재 `random.Random` 인스턴스의 바운드 메서드인 것과는 달리, `random`의 모듈 레벨 호출 가능(callable) 항목들은 기존 `random._inst` 모듈 속성의 해당 메서드에 위임하는 함수로 변경될 것입니다.

기본적으로 이 속성은 `random.SystemRandom` 인스턴스에 바인딩됩니다.

새로운 `random.ensure_repeatable()` API는 `random._inst` 속성을 `system.Random` 인스턴스에 다시 바인딩하여, 이전 Python 버전과 동일한 모듈 레벨 API 동작을 복원합니다 (추가적인 간접 참조(indirection) 수준을 제외하고).

```python
def ensure_repeatable():
    """Switch to using random.Random() for the module level APIs
    This switches the default RNG instance from the cryptographically secure
    random.SystemRandom() to the deterministic random.Random(), enabling the
    seed(), getstate() and setstate() operations. This means a particular
    random scenario can be replayed later by providing the same seed value
    or restoring a previously saved state.
    NOTE: Libraries implementing security sensitive operations should always
    explicitly use random.SystemRandom() or os.urandom in order to correctly
    handle applications that call this function.
    """
    if not isinstance(_inst, Random):
        _inst = random.Random()
```


기존 코드에 미치는 영향을 최소화하기 위해 다음 모듈 레벨 함수 중 하나를 호출하면 암시적으로 `random.ensure_repeatable()`이 호출됩니다.

*   `random.seed`
*   `random.getstate`
*   `random.setstate`

`random.Random` 또는 `random.SystemRandom` 클래스 API에는 변경 사항이 제안되지 않았습니다. 명시적으로 자신만의 난수 생성기를 인스턴스화하는 애플리케이션은 이 제안의 영향을 전혀 받지 않습니다.

### 암시적 옵트인에 대한 경고 (Warning on implicit opt-in)

Python 3.6에서는 결정론적 PRNG 사용에 대한 암시적 옵트인은 다음 확인을 사용하여 DeprecationWarning을 발생시킬 것입니다.

```python
if not isinstance(_inst, Random):
    warnings.warn(DeprecationWarning, "Implicitly ensuring repeatability. "
                                      "See help(random.ensure_repeatable) for details")
    ensure_repeatable()
```


경고의 특정 문구는 `print` 호출에서 괄호 누락에 추가된 사용자 지정 오류 메시지와 같이 Stack Overflow에 적절한 답변이 추가되어야 합니다.

Python 2.7이 보안 수정 전용 모드로 전환된 후 첫 번째 Python 3 릴리스에서는 이 DeprecationWarning이 기본적으로 표시되는 `RuntimeWarning`으로 상향 조정될 것입니다.

이 PEP는 특정 시드(seed) 값이 주어졌을 때 동일한 일련의 출력을 생성하는 결정론적 PRNG를 기본 RNG로 사용하도록 보장하는 기능을 제거할 것을 제안하지 않습니다. 이 기능은 모델링 및 시뮬레이션 시나리오에서 널리 사용되며, `ensure_repeatable()`이 직접 또는 간접적으로 호출되어야 한다고 요구하는 것은 웹 애플리케이션에서 결정론적 PRNG 사용의 잠재적 보안 영향을 충분히 고려하지 않고 보안에 민감한 작업에 모듈 레벨 `random` API를 사용하는 경우를 다루기 위한 충분한 개선책입니다.

### 성능 영향 (Performance impact)

`random.Random`과 `random.SystemRandom` 사이의 큰 성능 차이 때문에, Python 3.6으로 포팅된 애플리케이션은 다음과 같은 경우에 상당한 성능 저하를 겪을 수 있습니다.

*   애플리케이션이 모듈 레벨 `random` API를 사용하는 경우
*   암호학적 품질의 무작위성(randomness)이 필요하지 않은 경우
*   애플리케이션이 `random.seed`, `random.getstate` 또는 `random.setstate`를 호출하여 이미 암시적으로 결정론적 PRNG로 다시 옵트인(opt-in)하지 않는 경우
*   애플리케이션이 `random.ensure_repeatable`을 명시적으로 호출하도록 업데이트되지 않은 경우

이는 Python 3.6 What's New 가이드의 Porting 섹션에 언급될 것이며, 영향을 받는 애플리케이션의 `__main__` 모듈에 다음 코드를 포함하도록 권장됩니다.

```python
if hasattr(random, "ensure_repeatable"):
    random.ensure_repeatable()
```


암호학적 품질의 무작위성이 필요한 애플리케이션은 속도 고려 사항과 관계없이 시스템 난수 생성기를 사용해야 하므로, 그러한 경우에는 이 PEP에서 제안된 변경 사항이 이전에 잠재되어 있던 보안 결함을 수정할 것입니다.

### 문서 변경 사항 (Documentation changes)

`random` 모듈 문서는 `seed`, `getstate`, `setstate` 인터페이스의 문서가 모듈의 뒷부분으로 이동하도록 업데이트될 것이며, 새로운 `ensure_repeatable` 함수와 관련 보안 경고에 대한 문서도 포함될 것입니다.

모듈 문서의 해당 섹션에는 `ensure_repeatable`에 의해 활성화되는 결정론적 PRNG(게임, 모델링 및 시뮬레이션, 소프트웨어 테스트)와 기본적으로 사용되는 시스템 RNG(암호학, 보안 토큰 생성)의 각각의 사용 사례에 대한 논의도 추가될 것입니다. 이 논의는 후자의 작업을 위해 서드파티 보안 라이브러리를 사용할 것을 권장할 것입니다.

### 이론적 근거 (Rationale)

마감 및 예산 압박 속에서 보안 소프트웨어를 작성하는 것은 어려운 문제입니다. 이는 개인 식별 정보(personally identifiable information)와 관련된 데이터 유출에 대한 정기적인 알림, 그리고 자동차와 같은 새로운 시스템이 인터넷에 연결될 때 보안 고려 사항을 충분히 반영하지 못하는 사례에서도 드러납니다. 또한, 인터넷에서 쉽게 찾을 수 있는 많은 프로그래밍 조언은 컴퓨터 보안의 수학적 난해함을 고려하지 않습니다. 이러한 문제들을 더욱 복잡하게 만드는 것은 방어자들이 모든 잠재적 취약점을 커버해야 한다는 사실입니다. 단 한 번의 실수로 다른 방어 체계가 전복될 수 있기 때문입니다.

이러한 마지막 측면을 특히 어렵게 만드는 요인 중 하나는 부적절하게 사용될 경우 소리 없는 보안 실패(silent security failure)를 초래하는 API입니다. 즉, 자신이 하고 있는 일이 잘못되었음을 알아낼 수 있는 유일한 방법은 코드를 검토하는 사람이 "이것은 잠재적인 보안 문제이다"라고 말하거나, 자신이 책임지는 시스템이 그러한 실수로 인해 침해되는 경우입니다 (그리고 시스템이 침해되었을 때 여전히 책임이 있을 뿐만 아니라, 침입 탐지 및 감사 메커니즘이 침해 후 어떻게 침해가 발생했는지 파악할 수 있을 만큼 충분히 양호해야 합니다).

이러한 상황은 "보안 피로(security fatigue)"의 중요한 원인입니다. 개발자들(종종 정당하게)은 보안 엔지니어들이 "쉬운 방법으로 하지 마세요, 보안 취약점을 만듭니다"라고 말하는 데 모든 시간을 보낸다고 느낍니다.

세계에서 가장 인기 있는 언어 중 하나의 설계자로서, 우리는 더 많은 상황에서 쉬운 방법을 올바른 방법(또는 적어도 "틀리지 않은" 방법)으로 만듦으로써 이 문제를 줄이는 데 도움을 줄 수 있습니다. 그렇게 함으로써 개발자와 보안 엔지니어는 실제로 흥미로운 위협을 완화하는 데 더 많은 시간을 할애하고, 기본 언어 동작과 씨름하는 시간을 줄일 수 있습니다.

### 논의 (Discussion)

#### "ensure_deterministic" 대신 "ensure_repeatable"을 사용하는 이유

이것은 전문 용어로서 단어의 의미가 일반적인 단어의 의미와 충돌하는 경우이지만, 기술적으로는 동일합니다.

기술적인 관점에서 "결정론적 RNG(deterministic RNG)"는 알고리즘과 현재 상태를 알면 임의의 미래 상태를 안정적으로 계산할 수 있다는 것을 의미합니다.

문제는 "결정론적"이라는 단어 자체는 이러한 수식어를 전달하지 않으므로, 일반적인 의미에 익숙하지만 기술적인 의미에 추가된 수식어에는 익숙하지 않은 사람들에게는 "예측 가능한(predictable)" 또는 "무작위적이지 않은(not random)" 것으로 해석될 가능성이 높다는 것입니다.

전통적인 RNG에 대한 설명으로 "결정론적"이라는 단어의 두 번째 문제는, 그것이 시스템 RNG로는 할 수 없는 전통적인 RNG로 무엇을 할 수 있는지 제대로 알려주지 않는다는 것입니다.

"ensure_repeatable"은 이 두 가지 문제를 모두 해결하는 것을 목표로 합니다. 그 일반적인 의미가 결정론적 PRNG를 시스템 RNG보다 선호하는 주요 이유를 정확하게 설명하기 때문입니다. 즉, 동일한 시드 값을 제공하거나 이전에 저장된 PRNG 상태를 복원함으로써 동일한 일련의 출력을 반복할 수 있도록 보장하는 것입니다.

#### Python 3.6+에 대해서만 기본값 변경 (Only changing the default for Python 3.6+)

`ssl` 모듈의 기능을 업그레이드하고 기본적으로 HTTPS 인증서를 올바르게 확인하도록 전환하는 것과 같은 다른 최근 보안 변경 사항은 Python의 모든 현재 지원 버전으로 변경 사항을 백포팅(backporting)할 만큼 충분히 중요하게 간주되었습니다.

이 경우의 차이점은 정도의 문제입니다. 이 특정 변경 사항을 다른 경우보다 몇 년 일찍 출시함으로써 얻는 추가적인 이점은 유지 보수 릴리스에서 이러한 침습적인 변경을 수행하는 데 드는 추가 노력이나 안정성 위험을 정당화하기에 충분하지 않습니다.

#### 모듈 레벨 함수 유지 (Keeping the module level functions)

일반적인 하위 호환성 고려 사항 외에도 Python은 교육 목적으로 널리 사용되며, 우리는 현재 `random` 모듈 API의 가용성을 전제로 하는 광범위한 교육 자료를 무효화하는 것을 특히 원하지 않습니다. 따라서 이 제안은 대부분의 공개 API가 수정 없이 계속 사용될 수 있을 뿐만 아니라 새로운 경고를 생성하지 않고도 사용될 수 있도록 보장합니다.

#### 결정론적 RNG로 암시적 옵트인 시 경고 (Warning when implicitly opting in to the deterministic RNG)

Python은 결정론적 PRNG가 올바른 방법인 모델링 및 시뮬레이션 목적으로 널리 사용되며, 많은 경우 이러한 소프트웨어 모델에는 최신 버전의 Python에서 계속 작동하도록 보장하는 전담 유지 보수 팀이 없을 것입니다. 따라서 결정론적 PRNG로 암시적으로 옵트인하는 것이 필요합니다.

안타깝게도 `os.urandom`에서 가져온 데이터로 `random.seed`를 명시적으로 호출하는 것도 온라인에서 쉽게 찾을 수 있는 많은 결함 있는 "Python에서 보안 토큰을 생성하는 방법" 가이드에 나타나는 실수입니다.

`DeprecationWarning`을 사용한 다음 궁극적으로 `RuntimeWarning`을 사용하여 결정론적 PRNG로의 암시적 전환에 대해 경고하는 것은 암호학적으로 안전한 RNG가 필요한 미래 사용자들이 `random.seed()` 호출을 피하고, 진정으로 결정론적 생성기가 필요한 사람들은 `random.ensure_repeatable()`을 명시적으로 호출하도록 유도하는 것을 목표로 합니다.

#### 사용자 공간 CSPRNG 도입 회피 (Avoiding the introduction of a userspace CSPRNG)

`python-ideas`에 대한 이 제안의 원래 논의에서는 상대적으로 느린 시스템 난수 생성기 대신 암호학적으로 안전한 의사 난수 생성기(CSPRNG)를 도입하고 이를 기본적으로 사용하도록 제안했습니다.

이 접근 방식의 문제는 난수 생성이 중요한 성능 경로에 있지 않을 수도 있는 애플리케이션을 위해 보안에 민감한 상황에서 추가적인 실패 지점을 도입한다는 것입니다.

암호학적 품질의 무작위성이 필요한 애플리케이션은 속도 고려 사항과 관계없이 시스템 난수 생성기를 사용해야 합니다.

#### 결정론적 PRNG는 "충분히 안전하지 않은가"? (Isn't the deterministic PRNG “secure enough”?)

한마디로 "아니오(No)"입니다. 이것이 모듈 문서에 보안에 민감한 목적으로 사용하지 말라는 경고가 있는 이유입니다. 현재 Python의 난수 생성기에 대한 특정 연구는 알려진 바 없지만, PHP의 난수 생성기에 대한 연구는 해당 서브시스템의 약점을 사용하여 인기 있는 PHP 웹 애플리케이션의 비밀번호 복구 토큰에 대한 실제 공격을 용이하게 할 수 있음을 입증했습니다.

그러나 보안 소프트웨어 개발 규칙 중 하나는 "공격은 더 나아질 뿐, 결코 나빠지지 않는다"는 것입니다. 따라서 Python 3.6이 출시될 때쯤에는 Python의 결정론적 PRNG에 대한 실제 공격이 공개적으로 문서화될 수도 있습니다.

#### Python 생태계의 보안 피로 (Security fatigue in the Python ecosystem)

지난 몇 년 동안 컴퓨팅 산업 전반은 우리가 모두 의존하는 공유 네트워크 인프라를 "기본적으로 보안(secure by default)" 상태로 업그레이드하기 위해 concerted 노력을 기울여 왔습니다. 네트워크 서비스 개발(OpenStack Infrastructure-as-a-Service 플랫폼 포함) 및 일반적인 Linux 시스템 관리 분야에서 가장 널리 사용되는 프로그래밍 언어 중 하나로서, 그 부담의 상당 부분이 Python 생태계에 떨어졌습니다. 이는 이러한 문제가 큰 관심사가 아닌 다른 맥락에서 Python을 사용하는 Python 개발자들에게는 당연히 불만스러운 일입니다.

이러한 고려 사항은 `python-ideas`에 게시된 초기 초안 개념에 비해 이 제안의 상당한 하위 호환성 개선을 이끄는 주요 요인 중 하나입니다.

### 감사 (Acknowledgements)

*   **Theo de Raadt** : 암호학적으로 안전한 난수 생성기를 기본으로 사용하는 것을 진지하게 고려하라는 제안을 Guido van Rossum에게 해준 것에 대해.
*   **Serhiy Storchaka, Terry Reedy, Petr Viktorin** : 결정론적 RNG에만 의미 있는 함수가 호출될 때 `random.Random` 구현으로 투명하게 전환하는 접근 방식을 제안한 `python-ideas` 스레드의 모든 사람.
*   **Nathaniel Smith** : 비밀번호 재설정 토큰을 생성하는 데 사용될 때 PHP의 난수 생성기에 대한 실제 공격에 대한 참조를 제공해준 것에 대해.
*   **Donald Stufft** : 사용자 공간 CSPRNG 도입이 시스템 RNG를 직접 사용하는 것에 비해 불충분한 이득을 위해 추가적인 복잡성을 의미할 것이라고 제안한 네트워크 보안 전문가들과의 추가 논의를 추진해준 것에 대해.
*   **Paul Moore** : Python 생태계의 현재 보안 피로 수준에 대해 설득력 있게 설명해준 것에 대해.

### 참고 문헌 (References)

 3만 개 이상의 기록(각각)을 포함하는 데이터 유출 시각화 (http://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/)
 Jeep Cherokee에 대한 원격 UConnect 해킹 (http://www.wired.com/2015/07/hackers-remotely-kill-jeep-highway/)
 PHP 애플리케이션의 비밀번호 재설정 토큰에 대한 PRNG 기반 공격 (https://media.blackhat.com/bh-us-12/Briefings/Argyros/BH_US_12_Argyros_PRNG_WP.pdf)
 "python password generator" 검색 링크 (https://www.google.com.au/search?q=python+password+generator)
 사용자 공간 CSPRNG 사용에 대한 `python-ideas` 스레드 논의 (https://mail.python.org/pipermail/python-ideas/2015-September/035886.html)
 이 PEP가 된 초기 초안 개념 (https://mail.python.org/pipermail/python-ideas/2015-September/036095.html)
 안전하게 난수 생성하기 (http://sockpuppet.org/blog/2014/02/25/safely-generate-random-numbers/)
 IEEE Spectrum 2015년 상위 10개 프로그래밍 언어 (http://spectrum.ieee.org/computing/software/the-2015-top-ten-programming-languages)
 2013년 OWASP 웹 보안 10대 문제 (https://www.owasp.org/index.php/OWASP_Top_Ten_Project#tab=OWASP_Top_10_for_2013)
 `print` 호출에서 괄호 누락에 대한 Stack Overflow 답변 (http://stackoverflow.com/questions/25445439/what-does-syntaxerror-missing-parentheses-in-call-to-print-mean-in-python/25445440#25445440)
 안전하지 않은 데이터 캐시를 통한 bcrypt 우회 (http://arstechnica.com/security/2015/09/once-seen-as-bulletproof-11-million-ashley-madison-passwords-already-cracked/)

### 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 있습니다.

---

**역자 요약 및 해설:**

PEP 504는 Python 3.6부터 `random` 모듈의 기본 난수 생성기를 암호학적으로 안전한 시스템 난수 생성기(SystemRandom)로 변경하자는 제안이었습니다. 기존에는 결정론적(deterministic)인 Mersenne Twister가 기본으로 사용되었는데, 이는 보안에 민감한 애플리케이션에서 사용될 경우 예측 가능한 난수를 생성하여 보안 취약점으로 이어질 수 있었습니다.

**주요 제안 내용:**

*   **기본 RNG 변경:** `random` 모듈의 모듈 레벨 API가 기본적으로 `random.SystemRandom` 인스턴스를 사용하도록 합니다.
*   **결정론적 RNG 사용을 위한 옵트인:** 결정론적 PRNG가 필요한 경우, 새로운 `random.ensure_repeatable()` API를 명시적으로 호출하거나 `random.Random()` 인스턴스를 직접 생성해야 합니다.
*   **암시적 옵트인:** `random.seed()`, `random.getstate()`, `random.setstate()`와 같은 결정성을 요구하는 함수를 호출하면 암시적으로 `random.ensure_repeatable()`이 호출됩니다.
*   **경고:** 암시적으로 결정론적 PRNG로 전환될 경우 `DeprecationWarning` (이후 `RuntimeWarning`)을 발생시켜 개발자에게 명시적 옵트인을 권장합니다.
*   **성능 고려 사항:** `SystemRandom`은 `Random`보다 느릴 수 있으므로, 암호학적 품질의 난수가 필요 없는 기존 애플리케이션은 성능 저하를 겪을 수 있으며, 이를 피하려면 `ensure_repeatable()`을 명시적으로 호출해야 합니다.

**도입 배경:**

개발자들이 보안에 대한 충분한 인지 없이 `random` 모듈의 기본 API를 사용하여 잠재적인 보안 위험에 노출되는 경우가 많았습니다. 이는 "보안 피로"로 이어지며, 언어 설계 차원에서 "쉬운 방법이 올바른 방법(the easy way the right way)"이 되도록 돕기 위한 노력의 일환으로 제안되었습니다.

**철회 이유 및 실제 영향:**

PEP 504는 결국 **철회되었습니다.** 논의 과정에서 Steven D'Aprano가 "보안에 민감한 작업"을 처리하기 위한 "한 가지 명확한 방법"을 제공하는 **`secrets` 모듈** 을 제안했고, 이 제안이 기존 `random` 모듈 API의 호환성 위험 없이 더 나은 해결책으로 인정받았기 때문입니다. `secrets` 모듈은 Python 3.6에 PEP 506으로 채택되어 도입되었으며, 비밀번호, 보안 토큰 등 암호학적으로 강력한 난수가 필요한 경우 `secrets` 모듈을 사용하는 것이 권장됩니다.

따라서 PEP 504의 제안 내용은 직접적으로 Python에 반영되지는 않았지만, 그 논의를 통해 더 안전하고 명확한 API인 `secrets` 모듈이 탄생하는 계기가 되었습니다. `random` 모듈은 여전히 시뮬레이션, 게임 등 결정론적이고 반복 가능한 난수가 필요한 비보안 용도로 사용되며, 보안 관련 난수 생성은 `secrets` 모듈을 통해 이루어집니다.## PEP 504 – 기본적으로 시스템 RNG 사용 (Using the System RNG by default)

**저자:** Alyssa Coghlan <ncoghlan at gmail.com>
**상태:** 철회됨 (Withdrawn)
**유형:** Standards Track
**생성일:** 2015년 9월 15일
**Python 버전:** 3.6
**이력:** 2015년 9월 15일

---

### 초록 (Abstract)

현재 Python의 `random` 모듈에 있는 모듈 레벨 API는 기본적으로 결정론적(deterministic)인 Mersenne Twister 의사 난수 생성기(PRNG)를 사용합니다. 이로 인해 사용자가 "보안에 민감한(security sensitive)" 작업을 수행할 때는 `os.urandom` 또는 `random.SystemRandom` 인터페이스와 같은 암호학적으로 안전한 난수 생성기(CSPRNG)를 사용하거나 `cryptography`와 같은 서드파티 라이브러리를 사용해야 한다는 것을 인지하고 있어야 합니다.

안타깝게도 이러한 접근 방식은 자신이 보안에 민감한 작업을 하고 있다는 것을 인지하지 못하는 개발자들이 기본 모듈 레벨 API를 사용하게 되어, 사용자들을 불필요한 위험에 노출시키는 결과를 초래했습니다.

이 문제는 당장 심각한(acute) 문제는 아니지만 만성적인(chronic) 문제입니다. 보안 취약점이 도입된 시점과 실제 악용되는 시점 사이에 긴 지연이 발생하는 경우가 많아, 개발자들이 경험을 통해 자연스럽게 학습하기 어렵게 만듭니다.

이 문제에 대한 궁극적이고 보편적인 해결책을 제공하기 위해, 이 PEP는 Python 3.6부터 Python이 기본적으로 시스템 난수 생성기(System Random Number Generator, RNG)를 사용하도록 전환하고, 개발자들이 `random.ensure_repeatable()`이라는 새로운 API를 사용하거나 자신만의 `random.Random()` 인스턴스를 명시적으로 생성하여 프로세스 전반에 걸쳐 결정론적 난수 생성기를 사용하도록 옵트인(opt-in)해야 한다고 제안했습니다.

기존 코드에 미치는 영향을 최소화하기 위해 결정성을 요구하는 모듈 레벨 API는 암시적으로 결정론적 PRNG로 전환될 것이었습니다.

### PEP 철회 (PEP Withdrawal)

이 PEP에 대한 논의 과정에서 Steven D'Aprano는 기본 비밀번호 및 기타 토큰 생성과 같은 보안에 민감한 작업을 처리하기 위한 "한 가지 명확한 방법(one obvious way)"을 제공하는 표준화된 `secrets` 모듈을 제안했습니다.

Steven의 제안은 기존 `random` 모듈 API에 대한 호환성 위험을 도입하지 않으면서, 이러한 토큰을 쉽게 생성하는 방법과 올바르게 생성하는 방법을 일치시키는 원하는 효과를 가져왔습니다. 따라서 이 PEP는 Steven의 제안을 PEP 506으로 발전시키는 추가 작업을 위해 철회되었습니다.

### 제안 (Proposal)

*이 섹션은 PEP가 철회되기 전의 제안 내용을 설명합니다.*

현재 `random` 모듈의 모듈 레벨 함수를 보안에 민감한 애플리케이션에 사용하는 것은 결코 올바르지 않습니다. 이 PEP는 Python 3.6+에서 이 경고를 "해당 프로세스에서 `random.ensure_repeatable()`이 (직접적으로든 간접적으로든) 호출되는 경우 `random` 모듈의 모듈 레벨 함수를 보안에 민감한 애플리케이션에 사용하는 것은 올바르지 않다"는 식으로 변경할 것을 제안했습니다.

이를 달성하기 위해, 현재 `random.Random` 인스턴스의 바운드 메서드인 것과는 달리, `random`의 모듈 레벨 호출 가능(callable) 항목들은 기존 `random._inst` 모듈 속성의 해당 메서드에 위임하는 함수로 변경될 것이었습니다.

기본적으로 이 속성은 `random.SystemRandom` 인스턴스에 바인딩됩니다.

새로운 `random.ensure_repeatable()` API는 `random._inst` 속성을 `system.Random` 인스턴스에 다시 바인딩하여, 이전 Python 버전과 동일한 모듈 레벨 API 동작을 복원합니다 (추가적인 간접 참조(indirection) 수준을 제외하고).

```python
def ensure_repeatable():
    """Switch to using random.Random() for the module level APIs
    This switches the default RNG instance from the cryptographically secure
    random.SystemRandom() to the deterministic random.Random(), enabling the
    seed(), getstate() and setstate() operations. This means a particular
    random scenario can be replayed later by providing the same seed value
    or restoring a previously saved state.
    NOTE: Libraries implementing security sensitive operations should always
    explicitly use random.SystemRandom() or os.urandom in order to correctly
    handle applications that call this function.
    """
    if not isinstance(_inst, Random):
        _inst = random.Random()
```


기존 코드에 미치는 영향을 최소화하기 위해 다음 모듈 레벨 함수 중 하나를 호출하면 암시적으로 `random.ensure_repeatable()`이 호출될 것이었습니다.

*   `random.seed`
*   `random.getstate`
*   `random.setstate`

`random.Random` 또는 `random.SystemRandom` 클래스 API에는 변경 사항이 제안되지 않았습니다. 명시적으로 자신만의 난수 생성기를 인스턴스화하는 애플리케이션은 이 제안의 영향을 전혀 받지 않을 것이었습니다.

### 암시적 옵트인에 대한 경고 (Warning on implicit opt-in)

Python 3.6에서는 결정론적 PRNG 사용에 대한 암시적 옵트인은 `DeprecationWarning`을 발생시킬 것이었습니다.

```python
if not isinstance(_inst, Random):
    warnings.warn(DeprecationWarning, "Implicitly ensuring repeatability. "
                                      "See help(random.ensure_repeatable) for details")
    ensure_repeatable()
```


경고의 특정 문구는 `print` 호출에서 괄호 누락에 추가된 사용자 지정 오류 메시지와 같이 Stack Overflow에 적절한 답변이 추가되어야 한다고 제안되었습니다.

Python 2.7이 보안 수정 전용 모드로 전환된 후 첫 번째 Python 3 릴리스에서는 이 `DeprecationWarning`이 기본적으로 표시되는 `RuntimeWarning`으로 상향 조정될 것이었습니다.

이 PEP는 특정 시드(seed) 값이 주어졌을 때 동일한 일련의 출력을 생성하는 결정론적 PRNG를 기본 RNG로 사용하도록 보장하는 기능을 제거할 것을 제안하지 않았습니다. 이 기능은 모델링 및 시뮬레이션 시나리오에서 널리 사용되며, `ensure_repeatable()`이 직접 또는 간접적으로 호출되어야 한다고 요구하는 것은 웹 애플리케이션에서 결정론적 PRNG 사용의 잠재적 보안 영향을 충분히 고려하지 않고 보안에 민감한 작업에 모듈 레벨 `random` API를 사용하는 경우를 다루기 위한 충분한 개선책이었습니다.

### 성능 영향 (Performance impact)

`random.Random`과 `random.SystemRandom` 사이의 큰 성능 차이 때문에, Python 3.6으로 포팅된 애플리케이션은 다음과 같은 경우에 상당한 성능 저하를 겪을 수 있을 것이었습니다.

*   애플리케이션이 모듈 레벨 `random` API를 사용하는 경우
*   암호학적 품질의 무작위성(randomness)이 필요 없는 경우
*   애플리케이션이 `random.seed`, `random.getstate`, `random.setstate`를 호출하여 이미 암시적으로 결정론적 PRNG로 다시 옵트인(opt-in)하지 않는 경우
*   애플리케이션이 `random.ensure_repeatable`을 명시적으로 호출하도록 업데이트되지 않은 경우

이는 Python 3.6 What's New 가이드의 Porting 섹션에 언급될 것이며, 영향을 받는 애플리케이션의 `__main__` 모듈에 다음 코드를 포함하도록 권장될 것이었습니다.

```python
if hasattr(random, "ensure_repeatable"):
    random.ensure_repeatable()
```


암호학적 품질의 무작위성이 필요한 애플리케이션은 속도 고려 사항과 관계없이 시스템 난수 생성기를 사용해야 하므로, 그러한 경우에는 이 PEP에서 제안된 변경 사항이 이전에 잠재되어 있던 보안 결함을 수정할 것이었습니다.

### 문서 변경 사항 (Documentation changes)

`random` 모듈 문서는 `seed`, `getstate`, `setstate` 인터페이스의 문서가 모듈의 뒷부분으로 이동하도록 업데이트될 것이며, 새로운 `ensure_repeatable` 함수와 관련 보안 경고에 대한 문서도 포함될 것이었습니다.

모듈 문서의 해당 섹션에는 `ensure_repeatable`에 의해 활성화되는 결정론적 PRNG(게임, 모델링 및 시뮬레이션, 소프트웨어 테스트)와 기본적으로 사용되는 시스템 RNG(암호학, 보안 토큰 생성)의 각각의 사용 사례에 대한 논의도 추가될 것이었습니다. 이 논의는 후자의 작업을 위해 서드파티 보안 라이브러리를 사용할 것을 권장할 것이었습니다.

### 이론적 근거 (Rationale)

마감 및 예산 압박 속에서 보안 소프트웨어를 작성하는 것은 어려운 문제입니다. 이는 개인 식별 정보(personally identifiable information)와 관련된 데이터 유출에 대한 정기적인 알림, 그리고 자동차와 같은 새로운 시스템이 인터넷에 연결될 때 보안 고려 사항을 충분히 반영하지 못하는 사례에서도 드러납니다. 또한, 인터넷에서 쉽게 찾을 수 있는 많은 프로그래밍 조언은 컴퓨터 보안의 수학적 난해함을 고려하지 않습니다. 이러한 문제들을 더욱 복잡하게 만드는 것은 방어자들이 모든 잠재적 취약점을 커버해야 한다는 사실입니다. 단 한 번의 실수로 다른 방어 체계가 전복될 수 있기 때문입니다.

이러한 마지막 측면을 특히 어렵게 만드는 요인 중 하나는 부적절하게 사용될 경우 소리 없는 보안 실패(silent security failure)를 초래하는 API입니다. 즉, 자신이 하고 있는 일이 잘못되었음을 알아낼 수 있는 유일한 방법은 코드를 검토하는 사람이 "이것은 잠재적인 보안 문제이다"라고 말하거나, 자신이 책임지는 시스템이 그러한 실수로 인해 침해되는 경우입니다 (그리고 시스템이 침해되었을 때 여전히 책임이 있을 뿐만 아니라, 침입 탐지 및 감사 메커니즘이 침해 후 어떻게 침해가 발생했는지 파악할 수 있을 만큼 충분히 양호해야 합니다).

이러한 상황은 "보안 피로(security fatigue)"의 중요한 원인입니다. 개발자들(종종 정당하게)은 보안 엔지니어들이 "쉬운 방법으로 하지 마세요, 보안 취약점을 만듭니다"라고 말하는 데 모든 시간을 보낸다고 느낍니다.

세계에서 가장 인기 있는 언어 중 하나의 설계자로서, 우리는 더 많은 상황에서 쉬운 방법을 올바른 방법(또는 적어도 "틀리지 않은" 방법)으로 만듦으로써 이 문제를 줄이는 데 도움을 줄 수 있습니다. 그렇게 함으로써 개발자와 보안 엔지니어는 실제로 흥미로운 위협을 완화하는 데 더 많은 시간을 할애하고, 기본 언어 동작과 씨름하는 시간을 줄일 수 있습니다.

### 논의 (Discussion)

#### "ensure_deterministic" 대신 "ensure_repeatable"을 사용하는 이유

"결정론적(deterministic)"이라는 단어는 기술적인 의미와 일반적인 의미 사이의 혼동을 야기할 수 있습니다. 기술적으로는 "알고리즘과 현재 상태를 알면 미래 상태를 계산할 수 있다"는 의미지만, 일반인에게는 "예측 가능한" 또는 "무작위적이지 않은" 것으로 오해될 수 있습니다.

또한 "결정론적"은 시스템 RNG로는 할 수 없는 전통적인 RNG의 주요 장점을 명확히 전달하지 못합니다.

이에 반해 "`ensure_repeatable`"은 "동일한 시드 값 또는 저장된 PRNG 상태를 통해 동일한 일련의 출력을 반복할 수 있도록 보장한다"는 결정론적 PRNG의 핵심적인 장점을 일반적인 의미로 정확하게 설명하므로, 오해를 줄이고 기능을 명확히 전달하는 데 더 적합합니다.

#### Python 3.6+에 대해서만 기본값 변경 (Only changing the default for Python 3.6+)

`ssl` 모듈 기능 업그레이드나 HTTPS 인증서 기본 확인 전환과 같은 다른 보안 변경 사항은 모든 지원 Python 버전에 백포팅될 만큼 중요하게 간주되었습니다.

하지만 이 PEP의 변경 사항은 그 중요도가 달랐습니다. 몇 년 일찍 변경 사항을 적용함으로써 얻는 추가적인 이점이 유지 보수 릴리스에서 침습적인 변경을 수행하는 데 드는 추가 노력이나 안정성 위험을 정당화하기에 충분하지 않다고 판단되었습니다.

#### 모듈 레벨 함수 유지 (Keeping the module level functions)

일반적인 하위 호환성 외에도 Python은 교육 목적으로 널리 사용됩니다. 따라서 현재 `random` 모듈 API의 가용성을 전제로 하는 광범위한 교육 자료를 무효화하는 것을 피하고자 했습니다. 이에 따라 이 제안은 대부분의 공개 API가 수정 없이 계속 사용될 수 있을 뿐만 아니라 새로운 경고를 생성하지 않고도 사용될 수 있도록 보장했습니다.

#### 결정론적 RNG로 암시적 옵트인 시 경고 (Warning when implicitly opting in to the deterministic RNG)

Python은 결정론적 PRNG가 적절한 모델링 및 시뮬레이션 목적으로 널리 사용됩니다. 이러한 소프트웨어 모델 중 상당수는 최신 Python 버전에서 계속 작동하도록 보장하는 전담 유지 보수 팀이 없을 수 있으므로, 결정론적 PRNG로 암시적으로 옵트인하는 것이 필요했습니다.

하지만 `os.urandom`에서 가져온 데이터로 `random.seed`를 명시적으로 호출하는 것은 온라인에서 쉽게 찾을 수 있는 많은 결함 있는 "Python에서 보안 토큰을 생성하는 방법" 가이드에 나타나는 실수이기도 합니다.

`DeprecationWarning`을 사용한 다음 궁극적으로 `RuntimeWarning`을 사용하여 결정론적 PRNG로의 암시적 전환에 대해 경고하는 것은 암호학적으로 안전한 RNG가 필요한 미래 사용자들이 `random.seed()` 호출을 피하고, 진정으로 결정론적 생성기가 필요한 사람들은 `random.ensure_repeatable()`을 명시적으로 호출하도록 유도하는 것을 목표로 했습니다.

#### 사용자 공간 CSPRNG 도입 회피 (Avoiding the introduction of a userspace CSPRNG)

이 제안의 초기 논의에서는 상대적으로 느린 시스템 난수 생성기 대신 암호학적으로 안전한 의사 난수 생성기(CSPRNG)를 도입하고 이를 기본적으로 사용하도록 제안되었으나, 이 접근 방식의 문제는 난수 생성이 중요한 성능 경로에 있지 않을 수도 있는 애플리케이션을 위해 보안에 민감한 상황에서 추가적인 실패 지점을 도입한다는 것이었습니다.

암호학적 품질의 무작위성이 필요한 애플리케이션은 속도 고려 사항과 관계없이 시스템 난수 생성기를 사용해야 했습니다.

#### 결정론적 PRNG는 "충분히 안전하지 않은가"? (Isn't the deterministic PRNG “secure enough”?)

한마디로 "아니오(No)"입니다. 이것이 모듈 문서에 보안에 민감한 목적으로 사용하지 말라는 경고가 있는 이유입니다. 현재 Python의 난수 생성기에 대한 특정 연구는 알려진 바 없지만, PHP의 난수 생성기에 대한 연구는 해당 서브시스템의 약점을 사용하여 인기 있는 PHP 웹 애플리케이션의 비밀번호 복구 토큰에 대한 실제 공격을 용이하게 할 수 있음을 입증했습니다.

보안 소프트웨어 개발 규칙 중 하나는 "공격은 더 나아질 뿐, 결코 나빠지지 않는다"는 것입니다. 따라서 Python 3.6이 출시될 때쯤에는 Python의 결정론적 PRNG에 대한 실제 공격이 공개적으로 문서화될 수도 있을 것이었습니다.

#### Python 생태계의 보안 피로 (Security fatigue in the Python ecosystem)

지난 몇 년 동안 컴퓨팅 산업 전반은 우리가 모두 의존하는 공유 네트워크 인프라를 "기본적으로 보안(secure by default)" 상태로 업그레이드하기 위해 노력해왔습니다. 네트워크 서비스 개발(OpenStack Infrastructure-as-a-Service 플랫폼 포함) 및 일반적인 Linux 시스템 관리 분야에서 가장 널리 사용되는 프로그래밍 언어 중 하나로서, 그 부담의 상당 부분이 Python 생태계에 떨어졌습니다. 이는 이러한 문제가 큰 관심사가 아닌 다른 맥락에서 Python을 사용하는 개발자들에게는 불만스러운 일입니다.

이러한 고려 사항은 `python-ideas`에 게시된 초기 초안 개념에 비해 이 제안의 상당한 하위 호환성 개선을 이끄는 주요 요인 중 하나였습니다.

### 감사 (Acknowledgements)

*   **Theo de Raadt** : 암호학적으로 안전한 난수 생성기를 기본으로 사용하는 것을 진지하게 고려하라는 제안을 Guido van Rossum에게 해준 것에 대해.
*   **Serhiy Storchaka, Terry Reedy, Petr Viktorin** : 결정론적 RNG에만 의미 있는 함수가 호출될 때 `random.Random` 구현으로 투명하게 전환하는 접근 방식을 제안한 `python-ideas` 스레드의 모든 사람.
*   **Nathaniel Smith** : 비밀번호 재설정 토큰을 생성하는 데 사용될 때 PHP의 난수 생성기에 대한 실제 공격에 대한 참조를 제공해준 것에 대해.
*   **Donald Stufft** : 사용자 공간 CSPRNG 도입이 시스템 RNG를 직접 사용하는 것에 비해 불충분한 이득을 위해 추가적인 복잡성을 의미할 것이라고 제안한 네트워크 보안 전문가들과의 추가 논의를 추진해준 것에 대해.
*   **Paul Moore** : Python 생태계의 현재 보안 피로 수준에 대해 설득력 있게 설명해준 것에 대해.

### 참고 문헌 (References)

 3만 개 이상의 기록(각각)을 포함하는 데이터 유출 시각화 (http://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/)
 Jeep Cherokee에 대한 원격 UConnect 해킹 (http://www.wired.com/2015/07/hackers-remotely-kill-jeep-highway/)
 PHP 애플리케이션의 비밀번호 재설정 토큰에 대한 PRNG 기반 공격 (https://media.blackhat.com/bh-us-12/Briefings/Argyros/BH_US_12_Argyros_PRNG_WP.pdf)
 "python password generator" 검색 링크 (https://www.google.com.au/search?q=python+password+generator)
 사용자 공간 CSPRNG 사용에 대한 `python-ideas` 스레드 논의 (https://mail.python.org/pipermail/python-ideas/2015-September/035886.html)
 이 PEP가 된 초기 초안 개념 (https://mail.python.org/pipermail/python-ideas/2015-September/036095.html)
 안전하게 난수 생성하기 (http://sockpuppet.org/blog/2014/02/25/safely-generate-random-numbers/)
 IEEE Spectrum 2015년 상위 10개 프로그래밍 언어 (http://spectrum.ieee.org/computing/software/the-2015-top-ten-programming-languages)
 2013년 OWASP 웹 보안 10대 문제 (https://www.owasp.org/index.php/OWASP_Top_Ten_Project#tab=OWASP_Top_10_for_2013)
 `print` 호출에서 괄호 누락에 대한 Stack Overflow 답변 (http://stackoverflow.com/questions/25445439/what-does-syntaxerror-missing-parentheses-in-call-to-print-mean-in-python/25445440#25445440)
 안전하지 않은 데이터 캐시를 통한 bcrypt 우회 (http://arstechnica.com/security/2015/09/once-seen-as-bulletproof-11-million-ashley-madison-passwords-already-cracked/)

### 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 있습니다.

---

### 역자 요약 및 해설: Python 개발자를 위한 PEP 504 이해

PEP 504는 Python의 `random` 모듈이 기본적으로 사용하는 난수 생성기를 암호학적으로 안전한 시스템 난수 생성기(System RNG)로 변경하자는 제안이었습니다. 이는 Python 개발자들이 보안에 민감한 작업에서 의도치 않게 안전하지 않은 난수를 사용하는 문제를 해결하고자 했습니다.

#### 핵심 제안 내용 (당시의 제안):

1.  **기본 난수 생성기(RNG) 변경:** Python 3.6부터 `random` 모듈의 모듈 레벨 함수들이 기본적으로 `random.SystemRandom` 인스턴스(시스템 RNG)를 사용하도록 변경합니다.
2.  **결정론적 RNG 사용을 위한 옵트인(Opt-in):** 시뮬레이션, 게임 등 반복 가능한(repeatable) 난수가 필요한 경우, 개발자는 새로운 `random.ensure_repeatable()` API를 명시적으로 호출하거나 직접 `random.Random()` 인스턴스를 생성하여 결정론적 PRNG를 사용하도록 해야 합니다.
3.  **암시적 옵트인:** `random.seed()`, `random.getstate()`, `random.setstate()`와 같이 결정성에 의존하는 기존 함수를 호출하면, 암시적으로 `random.ensure_repeatable()`이 호출되어 결정론적 PRNG로 전환됩니다.
4.  **경고 도입:** 암시적으로 결정론적 PRNG로 전환될 경우 `DeprecationWarning` (이후 `RuntimeWarning`으로 격상)이 발생하여, 개발자들이 명시적으로 원하는 RNG를 선택하도록 유도합니다.
5.  **성능 영향:** `random.SystemRandom`은 `random.Random`보다 일반적으로 느리므로, 암호학적 품질의 난수가 필요 없는 기존 애플리케이션에서는 성능 저하가 발생할 수 있습니다. 이를 피하려면 `random.ensure_repeatable()`을 명시적으로 호출하도록 코드를 업데이트해야 합니다.

#### 도입 배경 및 문제 의식:

*   **보안 취약점 노출:** 많은 개발자가 `random` 모듈의 기본 API가 보안에 민감한 용도로 적합하지 않다는 사실을 인지하지 못하고 사용하여, 예측 가능한 난수를 생성함으로써 애플리케이션의 보안을 위협할 수 있었습니다.
*   **"보안 피로(Security Fatigue)":** 개발자들이 보안 엔지니어로부터 "쉬운 방법이 안전하지 않다"는 말을 자주 듣게 되어 보안에 대한 피로감을 느끼는 경향이 있었습니다. PEP 504는 "쉬운 방법이 올바른 방법"이 되도록 언어 차원에서 개선하고자 했습니다.
*   **PHP 사례:** PHP의 난수 생성기 취약점을 이용한 비밀번호 복구 토큰 공격 사례를 통해 결정론적 PRNG의 보안 위험성이 강조되었습니다.

#### PEP 철회 이유 및 실제 Python에 미친 영향:

PEP 504는 최종적으로 **철회(Withdrawn)** 되었습니다. 그 이유는 이 PEP의 논의 과정에서 Steven D'Aprano가 **`secrets` 모듈** 을 제안했기 때문입니다. `secrets` 모듈은 비밀번호, 보안 토큰, 임시 URL 등 암호학적으로 강력한 난수가 필요한 보안에 민감한 작업을 처리하는 "한 가지 명확한 방법"을 제공하며, 기존 `random` 모듈 API와의 호환성 문제를 일으키지 않는다는 장점이 있었습니다.

결과적으로 PEP 504의 제안 내용은 Python 3.6에 직접 반영되지 않았습니다. 대신, **PEP 506으로 발전된 `secrets` 모듈** 이 Python 3.6에 도입되어 보안 관련 난수 생성의 표준으로 자리 잡았습니다.

**현재 Python 사용에 미치는 영향:**

*   **`random` 모듈:** `random` 모듈은 여전히 시뮬레이션, 게임, 통계 분석 등 결정론적이고 재현 가능한(repeatable) 난수가 필요한 **비보안 용도** 로 사용됩니다. 기본 동작은 이 PEP의 제안대로 변경되지 않았으며, 여전히 `random.Random` 인스턴스를 기반으로 합니다.
*   **`secrets` 모듈:** 비밀번호, 토큰 등 **암호학적으로 안전한 난수** 가 필요한 모든 보안 관련 작업에는 `secrets` 모듈을 사용하는 것이 강력히 권장됩니다. 이는 PEP 504의 본래 의도인 "쉬운 방법이 올바른 방법"이 보안 컨텍스트에서 `secrets` 모듈을 통해 실현된 것으로 볼 수 있습니다. 예를 들어, `secrets.token_hex()`, `secrets.randbelow()` 등의 함수를 사용합니다.
*   **`os.urandom`:** 저수준(low-level)에서 직접 시스템 RNG에 접근해야 할 경우 `os.urandom`을 사용할 수 있습니다. `secrets` 모듈은 내부적으로 `os.urandom`을 활용합니다.

PEP 504는 비록 철회되었지만, Python 커뮤니티가 보안에 대한 인식을 높이고 더 안전한 기본값을 향해 나아가려는 중요한 논의의 전환점이었으며, 궁극적으로 더 나은 `secrets` 모듈의 탄생으로 이어졌습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.