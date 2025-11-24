---
title: "[Final] PEP 493 - HTTPS verification migration tools for Python 2.7"
excerpt: "Python Enhancement Proposal 493: 'HTTPS verification migration tools for Python 2.7'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/493/
toc: true
toc_sticky: true
date: 2025-09-26 22:38:56+0900
last_modified_at: 2025-09-26 22:38:56+0900
published: true
---
> **원문 링크:** [PEP 493 - HTTPS verification migration tools for Python 2.7](https://peps.python.org/pep-0493/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 10-May-2015

# PEP 493 – Python 2.7용 HTTPS 검증 마이그레이션 도구

*   **작성자:** Alyssa Coghlan, Robert Kuska, Marc-André Lemburg
*   **BDFL 위임자:** Barry Warsaw
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2015년 5월 10일
*   **Python 버전:** 2.7.12
*   **해결:** Python-Dev message

## 초록 (Abstract)

PEP 476은 클라이언트 모듈에서 Python의 기본 HTTPS 인증서 처리 방식을 웹 브라우저의 인증서 처리 방식과 일치시키기 위해, 클라이언트가 접속하려는 서버에 속하는 인증서가 수신되었는지 검증하도록 업데이트했습니다. Python 2.7 장기 유지보수 시리즈가 이 변경사항의 범위에 포함된다고 판단되어, 새로운 동작은 Python 2.7.9 유지보수 릴리스에 도입되었습니다.

이로 인해 영향을 받는 Python 2.7 유지보수 릴리스의 채택에 상당한 장벽이 생겼습니다. 따라서 이 PEP는 시스템 관리자 및 다른 사용자들이 HTTPS 클라이언트 모듈에서 서버 인증서 검증 여부를 결정하는 것과 최신 Python 2.7 유지보수 릴리스로 업데이트하는 결정을 더 쉽게 분리할 수 있도록 Python 2.7에 특화된 추가 기능을 제안합니다.

## 배경 (Rationale)

PEP 476은 HTTPS URL의 의미론에 대한 웹 브라우저의 기대치에 맞춰 Python의 기본 동작을 변경했습니다. Python 2.7.9 및 3.4.3부터 표준 라이브러리의 HTTPS 클라이언트는 기본적으로 서버 인증서를 검증합니다.

그러나 이러한 변경은 자체 서명 인증서(self-signed certificates)에 의존하는 사설 인트라넷을 운영하거나 새로운 기본 인증서 검증 설정에서 문제를 겪는 인프라 관리자에게 문제를 일으키기도 합니다.

이러한 상황을 관리하기 위해 웹 브라우저는 사용자에게 서버의 인증서를 브라우저의 인증서 저장소에 추가할 수 있도록 "클릭 스루(click through)" 경고를 제공합니다. `curl` 및 `wget`과 같은 네트워크 클라이언트 도구는 인증서 확인을 완전히 끌 수 있는 옵션(각각 `curl --insecure` 및 `wget --no-check-certificate`)을 제공합니다.

기술 스택의 다른 계층에서는 SELinux 및 AppArmor와 같은 Linux 보안 모듈이 배포판 벤더에 의해 기본적으로 활성화되지만, 이를 끌 수 있는 비교적 간단한 메커니즘을 제공합니다.

현재, 전체 프로세스에 대해 Python의 기본 인증서 확인을 비활성화하는 편리한 메커니즘은 존재하지 않습니다.

PEP 476은 `ssl` 모듈을 몽키 패치(monkeypatching)하여 이전 동작을 복원하는 방식으로 프로세스 전체에 걸쳐 이전 설정으로 되돌리는 방법을 다루면서 이 문제를 해결하려고 시도했습니다. 하지만 시스템 관리자가 Standard Operating Environment 정의에서 이 기능을 기본적으로 비활성화할 수 있도록 제안된 `sitecustomize.py` 기반 기술은 적어도 일부 경우에 불충분한 것으로 판명되었습니다. 이 PEP의 초기 생성으로 이어진 특정 사례는 Linux 배포자가 업스트림 CPython 2.7 릴리스를 직접 사용하는 것보다 사용자에게 더 원활한 마이그레이션 경로를 제공하려는 경우였지만, 임베디드 Python 런타임 및 기타 사용자 수준 Python 설치를 업데이트하는 데 있어서 다른 잠재적인 문제점들도 지적되었습니다.

상호 호환되지 않는 다양한 마이그레이션 기술이 난립하는 것을 방지하기 위해, 이 PEP는 HTTPS 클라이언트 모듈에서 인증서 검증을 건너뛰는 과거 동작으로 프로세스를 더 쉽게 되돌릴 수 있도록 Python 2.7.12에 추가될 기능을 제안합니다. 또한 이러한 기능을 Python 2.7.9 이전 버전으로 백포팅(backporting)하는 재배포자(redistributors)를 위한 추가 권장 사항도 제공합니다.

## 대안 (Alternatives)

명확한 업스트림 지침 및 권장 사항이 없는 경우에도, 상업적 재배포자는 고객의 이익을 위해 자체적인 설계 결정을 내릴 것입니다. 사용 가능한 주요 접근 방식은 다음과 같습니다.

*   PEP 476에 정의된 메커니즘 외에 표준 라이브러리 HTTPS 클라이언트에서 검증되지 않은 호스트 이름에서 검증된 호스트 이름으로 마이그레이션하는 데 추가 지원을 제공하지 않으면서 새로운 Python 2.7.x 릴리스에 계속 리베이스(rebase)하는 것.
*   Python 2에서 Python 3으로 업그레이드할 때 HTTPS 연결의 기본 처리 방식 변경사항의 가용성을 제한하는 것.
*   Linux 배포판 공급업체의 경우, 새 운영 체제 버전으로 업그레이드할 때 HTTPS 연결의 기본 처리 방식 변경사항의 가용성을 제한하는 것.
*   이 PEP의 공식 상태와 관계없이, 이 PEP에 설명된 백포팅 제안 중 하나 또는 둘 모두를 구현하는 것.

## 범위 제한 (Scope Limitations)

이러한 변경사항은 Python 2.7 환경에서 새로운 기본 인증서 처리 동작으로의 전환을 관리하는 데 도움이 되는 도구로서만 제안됩니다. Python 3의 새로운 기능으로는 제안되지 않습니다. 이 문제는 애플리케이션 자체를 업데이트할 수 없는 대부분의 클라이언트 애플리케이션이 Python 2 애플리케이션일 것으로 예상되기 때문입니다.

미래의 Python 3 버전에서 보안 프로토콜에 대한 기본 인증서 처리를 프로토콜별로 구성할 수 있도록 하는 것이 바람직할 수 있지만, 해당 질문은 이 PEP의 범위를 벗어납니다.

## 기능 감지 요구 사항 (Requirements for capability detection)

이 PEP의 제안은 이전 Python 버전으로의 백포팅을 용이하게 하는 것을 목표로 하므로, Python 버전 번호를 기능을 감지하는 신뢰할 수 있는 수단으로 사용할 수 없습니다. 대신 다음 기술을 사용하여 기능의 존재 여부를 확인할 수 있도록 설계되었습니다.

```bash
python -c "import ssl; ssl.<_relevant_attribute>"
```
관련 기능이 없는 경우 `AttributeError` (따라서 0이 아닌 반환 코드)로 실패할 것입니다.

이 PEP에 의해 정의된 기능 감지 속성(attribute)은 다음과 같습니다.

*   `ssl._https_verify_certificates`: 런타임 구성 API
*   `ssl._https_verify_envvar`: 환경 변수 기반 구성
*   `ssl._cert_verification_config`: 파일 기반 구성 (PEP 476 선택 사항)

마커 속성(marker attributes)은 이러한 기능의 구현 의존적이고 보안에 민감한 특성을 나타내기 위해 밑줄로 시작합니다.

## 기능: 구성 API (Feature: Configuration API)

이 변경사항은 CPython 2.7.12 및 이후 CPython 2.7.x 릴리스에 포함될 것을 제안합니다. 이는 표준 라이브러리 클라이언트 라이브러리에서 HTTPS 인증서의 기본 처리를 지정하는 새로운 `ssl._https_verify_certificates()` 함수로 구성됩니다.

이 변경사항을 Python 3으로 포트하는 것은 제안되지 않으므로, 인증서 검증 건너뛰기를 지원해야 하는 Python 3 애플리케이션은 자체적인 적절한 보안 컨텍스트를 정의해야 할 것입니다.

### 기능 감지 (Feature detection)

이 기능과 관련된 `ssl` 모듈의 마커 속성은 `ssl._https_verify_certificates` 함수 자체입니다.

### 사양 (Specification)

`ssl._https_verify_certificates` 함수는 다음과 같이 작동할 것입니다.

```python
def _https_verify_certificates(enable=True):
    """Verify server HTTPS certificates by default?"""
    global _create_default_https_context
    if enable:
        _create_default_https_context = create_default_context
    else:
        _create_default_https_context = _create_unverified_context
```
인수 없이 호출되거나 `enable`이 True 값으로 설정된 경우, 표준 라이브러리 클라이언트 모듈은 이후 기본적으로 HTTPS 인증서를 검증합니다. 그렇지 않으면 검증을 건너뜁니다.

`enable`이 False 값으로 설정된 경우, 표준 라이브러리 클라이언트 모듈은 이후 기본적으로 HTTPS 인증서 검증을 건너뜁니다.

### 보안 고려 사항 (Security Considerations)

이 기능이 포함되면 보안에 민감한 애플리케이션이 다음과 같은 순방향 호환 스니펫(forward-compatible snippet)을 코드에 포함할 수 있게 됩니다.

```python
if hasattr(ssl, "_https_verify_certificates"):
    ssl._https_verify_certificates()
```
일부 개발자는 `ssl._https_verify_certificates(enable=False)`를 사용하여 인증서 확인을 해제할 수도 있습니다. 영향을 받는 내부 API를 몽키 패치하는 것이 이미 가능했기 때문에, 이는 새로운 주요 보안 문제를 야기하지 않습니다.

## 기능: 환경 변수 기반 구성 (Feature: environment based configuration)

이 변경사항은 CPython 2.7.12 및 이후 CPython 2.7.x 릴리스에 포함될 것을 제안합니다. 애플리케이션 소스 코드를 수정하지 않고도(바이트코드 전용 애플리케이션 배포의 경우 소스 코드를 사용할 수 없을 수도 있음) 기본 검증을 비활성화하기 위해 '0'으로 설정할 수 있는 새로운 `PYTHONHTTPSVERIFY` 환경 변수로 구성됩니다.

이 변경사항을 Python 3으로 포트하는 것은 제안되지 않으므로, 인증서 검증 건너뛰기를 지원해야 하는 Python 3 애플리케이션은 자체적인 적절한 보안 컨텍스트를 정의해야 할 것입니다.

### 기능 감지 (Feature detection)

이 기능과 관련된 `ssl` 모듈의 마커 속성은 다음입니다.

*   `ssl._https_verify_envvar` 속성은 기본 동작에 영향을 미치는 환경 변수의 이름을 제공합니다.

이는 기능의 존재 여부를 쉽게 감지할 수 있을 뿐만 아니라, 관련 환경 변수 이름을 프로그래밍 방식으로 확인할 수 있도록 합니다.

### 사양 (Specification)

`ssl.create_default_context`를 항상 기본값으로 사용하는 대신, `ssl` 모듈은 다음과 같이 수정될 것입니다.

*   모듈이 Python 프로세스에 처음 임포트될 때 `PYTHONHTTPSVERIFY` 환경 변수를 읽습니다.
*   이 환경 변수가 존재하고 '0'으로 설정되어 있으면 `ssl._create_default_https_context` 함수를 `ssl._create_unverified_context`의 별칭으로 설정합니다.
*   그렇지 않으면 `ssl._create_default_https_context` 함수를 평소와 같이 `ssl.create_default_context`의 별칭으로 설정합니다.

### 예시 구현 (Example implementation)

```python
_https_verify_envvar = 'PYTHONHTTPSVERIFY'
def _get_https_context_factory():
    if not sys.flags.ignore_environment:
        config_setting = os.environ.get(_https_verify_envvar)
        if config_setting == '0':
            return _create_unverified_context
    return create_default_context

_create_default_https_context = _get_https_context_factory()
```
### 보안 고려 사항 (Security Considerations)

Python 3.4.3+ 및 Python 2.7.9->2.7.11의 동작과 비교할 때, 이 접근 방식은 기본 보안 설정에 대한 새로운 다운그레이드 공격(downgrade attack)을 도입합니다. 이는 충분히 결단력 있는 공격자가 Python을 CPython 2.7.8 및 이전 릴리스에서 사용된 기본 동작으로 되돌릴 수 있게 할 잠재적인 위험을 야기합니다.

이러한 공격 표면의 약간의 증가는 다음과 같은 주요 이유가 됩니다.

*   보안에 민감한 애플리케이션은 여전히 자체 SSL 컨텍스트를 정의해야 합니다.
*   이 PEP에 설명된 마이그레이션 기능은 Python 3에 추가되지 않습니다.

그러나 이러한 공격을 수행하려면 `ssl` 모듈이 임포트되기 전에 Python 프로세스의 실행 환경을 수정할 수 있는 능력이 필요하다는 점도 명심해야 합니다. 파일 시스템의 어떤 부분(예: `/tmp`)에도 쓸 수 있는 능력과 결합하여, 그러한 접근 권한을 가진 공격자는 이미 기본 OpenSSL 구현, 동적 라이브러리 로더 및 기타 잠재적으로 보안에 민감한 구성 요소의 동작을 수정할 수 있을 것입니다.

### Python 가상 환경과의 상호 작용 (Interaction with Python virtual environments)

기본 설정은 프로세스 환경에서 직접 읽히므로, 인터프리터가 활성화된 Python 가상 환경 내에서 실행되는지 여부와 관계없이 동일하게 작동합니다.

## 참조 구현 (Reference Implementation)

위의 두 기능을 구현하는 Python 2.7용 패치는 관련 트래커 이슈에 첨부되어 있습니다.

## 이전 Python 버전으로 이 PEP 백포팅 (Backporting this PEP to earlier Python versions)

이 PEP가 승인되면, 상업적 Python 재배포자는 전체 Python 설치의 기본 동작에 대한 PEP 476 변경 사항을 백포팅하지 않고도 이 PEP에 정의된 프로세스별 구성 메커니즘을 Python 2.7.9보다 오래된 기본 버전으로 백포팅할 수 있습니다.

이러한 백포팅은 `PYTHONHTTPSVERIFY`가 전혀 설정되지 않았을 때의 기본 동작에서만 이 PEP에 제안된 메커니즘과 다를 것입니다. 이 경우 기본적으로 인증서 검증을 건너뛰는 동작이 유지됩니다.

이 경우, `PYTHONHTTPSVERIFY` 환경 변수가 정의되어 있고 '0'이 아닌 다른 값으로 설정되어 있으면 HTTPS 인증서 검증이 활성화되어야 합니다.

### 기능 감지 (Feature detection)

이 상황이 적용됨을 나타내는 특정 속성은 없습니다. 대신, `ssl._https_verify_certificates` 및 `ssl._https_verify_envvar` 속성이 명목상 Python 2.7.12보다 오래된 Python 버전에 존재하는 것으로 나타납니다.

### 사양 (Specification)

이 백포트를 구현하는 것은 PEP 466, 476 및 이 PEP의 변경 사항을 백포팅하는 것을 포함하며, `ssl` 모듈에서 `PYTHONHTTPSVERIFY` 환경 변수 처리 방식에 다음 변경 사항이 적용됩니다.

*   모듈이 Python 프로세스에 처음 임포트될 때 `PYTHONHTTPSVERIFY` 환경 변수를 읽습니다.
*   이 환경 변수가 존재하고 '0'이 아닌 다른 값으로 설정되어 있으면 `ssl._create_default_https_context` 함수를 `ssl.create_default_context`의 별칭으로 설정합니다.
*   그렇지 않으면 `ssl._create_default_https_context` 함수를 `ssl._create_unverified_context`의 별칭으로 설정합니다.

### 예시 구현 (Example implementation)

```python
_https_verify_envvar = 'PYTHONHTTPSVERIFY'
def _get_https_context_factory():
    if not sys.flags.ignore_environment:
        config_setting = os.environ.get(_https_verify_envvar)
        if config_setting != '0':
            return create_default_context
    return _create_unverified_context

_create_default_https_context = _get_https_context_factory()

def _disable_https_default_verification():
    """HTTPS 인증서 검증을 기본적으로 건너뜁니다."""
    global _create_default_https_context
    _create_default_https_context = _create_unverified_context
```
### 보안 고려 사항 (Security Considerations)

이 변경 사항은 표준 라이브러리 HTTPS 클라이언트에서 현재 기본적으로 인증서 검증을 건너뛰는 모든 Python 버전에 대해 엄격한 보안 업그레이드가 될 것입니다. 고려해야 할 기술적 절충점은 보안 관련 사항보다는 주로 필요한 PEP 466 백포트의 규모와 관련이 있습니다.

### Python 가상 환경과의 상호 작용 (Interaction with Python virtual environments)

기본 설정은 프로세스 환경에서 직접 읽히므로, 인터프리터가 활성화된 Python 가상 환경 내에서 실행되는지 여부와 관계없이 동일하게 작동합니다.

## 이전 Python 버전으로 PEP 476 백포팅 (Backporting PEP 476 to earlier Python versions)

위에 설명된 백포팅 접근 방식은 Python 2.7 설치의 기본 HTTPS 인증서 검증 동작을 수정하지 않습니다. 즉, 인증서 검증은 여전히 연결별(per-connection) 또는 프로세스별(per-process)로 선택해야 합니다.

하위 호환성을 손상시키지 않으면서 전체 설치의 기본 동작을 수정할 수 있도록, Red Hat은 Red Hat Enterprise Linux 7.2 이상 버전의 시스템 Python 2.7 설치를 위한 구성 메커니즘을 설계했으며, 이는 다음을 제공합니다.

*   HTTPS 인증서 검증 활성화 결정과 기능이 처음 백포트된 운영 체제 버전으로 업그레이드 결정이 독립적으로 이루어질 수 있도록 하는 옵트인(opt-in) 모델.
*   시스템 관리자가 시스템 Python 설치에서 직접 실행되는 Python 애플리케이션 및 스크립트의 기본 동작을 설정할 수 있는 기능.
*   재배포자가 향후 특정 시점에 새로운 설치의 기본 동작을 변경하는 것을 고려할 수 있도록 하며, 기본적으로 HTTPS 인증서 검증을 건너뛰도록 명시적으로 구성된 기존 설치에 영향을 미치지 않도록 하는 기능.

이 변경사항은 Python 2.7의 이전 릴리스에 대한 백포트에만 영향을 미치므로, 업스트림 CPython에 포함될 것을 제안하지 않고, 대신 사용자에게 유사한 기능을 제공하기로 선택한 다른 재배포자들을 위한 권장 사항으로 제공됩니다.

이 PEP는 이 특정 변경 사항이 좋은 아이디어인지 아닌지에 대해 입장을 취하지 않습니다. 오히려, 재배포자가 Python 2.7.9보다 오래된 버전의 Python에서 기본 동작을 구성 가능하게 만드는 길을 선택한다면, 재배포자들 간에 일관된 접근 방식을 유지하는 것이 사용자에게 이로울 것이라고 제안합니다.

그러나 이 접근 방식은 Python 2.7.9 이상을 제공한다고 광고하는 Python 설치에는 사용해서는 안 됩니다. 대부분의 Python 사용자는 그러한 모든 환경이 기본적으로 HTTPS 인증서를 검증할 것이라는 합리적인 기대를 가질 것이기 때문입니다.

### 기능 감지 (Feature detection)

이 기능과 관련된 `ssl` 모듈의 마커 속성은 다음과 같습니다.

*   `_cert_verification_config = '<configuration file path>'`

이는 기능의 존재 여부를 쉽게 감지할 수 있을 뿐만 아니라, 관련 구성 파일 이름을 프로그래밍 방식으로 확인할 수 있도록 합니다.

### Python 표준 라이브러리에 대한 권장 수정 사항 (Recommended modifications to the Python standard library)

PEP 476 수정 사항을 이전 포인트 릴리스로 백포팅하기 위한 권장 접근 방식은 Python 2.7.9 이상에서 구현된 기본 PEP 476 동작과 관련하여 다음 변경 사항을 구현하는 것입니다.

*   `ssl` 모듈이 Python 프로세스에 처음 임포트될 때 시스템 전체 구성 파일을 읽도록 수정합니다.
*   이 구성 파일이 없는 경우 사용할 플랫폼 기본 동작(HTTPS 인증서 검증 또는 비검증)을 정의합니다.
*   다음 세 가지 작동 모드 간의 선택을 지원합니다.
    *   HTTPS 인증서 검증이 활성화되도록 합니다.
    *   HTTPS 인증서 검증이 비활성화되도록 합니다.
    *   이 Python 버전을 제공하는 재배포자에게 결정을 위임합니다.
*   주어진 구성 설정에 따라 `ssl._create_default_https_context` 함수를 `ssl.create_default_context` 또는 `ssl._create_unverified_context`의 별칭으로 설정합니다.

### 권장 파일 위치 (Recommended file location)

PEP 작성자들은 Windows, Mac OS X 또는 *BSD 시스템을 대상으로 하는 장기 지원 릴리스를 제공하는 벤더를 알지 못하므로, 이 접근 방식은 현재 Linux 시스템 Python 설치에 대해서만 구체적으로 정의되어 있습니다.

Linux 시스템에서 권장되는 구성 파일 이름은 `/etc/python/cert-verification.cfg`입니다.

`.cfg` 파일 이름 확장자는 Python 3 표준 라이브러리의 `venv` 모듈에서 사용되는 `pyvenv.cfg`와의 일관성을 위해 권장됩니다.

### 권장 파일 형식 (Recommended file format)

구성 파일은 단일 섹션 `[https]`를 포함하는 `ConfigParser` ini 스타일 형식을 사용해야 하며, 이 섹션에는 `verify`라는 필수 설정이 포함되어야 합니다.

제안된 섹션 이름은 영향을 받는 클라이언트 API에 전달되는 "https" URL 스키마에서 가져왔습니다.

`verify`에 허용되는 값은 다음과 같습니다.

*   `enable`: HTTPS 인증서 검증이 기본적으로 활성화되도록 합니다.
*   `disable`: HTTPS 인증서 검증이 기본적으로 비활성화되도록 합니다.
*   `platform_default`: 이 특정 Python 버전을 제공하는 재배포자에게 결정을 위임합니다.

`[https]` 섹션 또는 `verify` 설정이 없거나 `verify` 설정이 알 수 없는 값으로 설정된 경우, 구성 파일이 없는 것으로 처리해야 합니다.

### 예시 구현 (Example implementation)

```python
_cert_verification_config = '/etc/python/cert-verification.cfg'
def _get_https_context_factory():
    # 기본 동작에 대한 시스템 전체 재정의를 확인합니다.
    context_factories = {
        'enable': create_default_context,
        'disable': _create_unverified_context,
        'platform_default': _create_unverified_context, # 지금은 :)
    }
    import ConfigParser
    config = ConfigParser.RawConfigParser()
    config.read(_cert_verification_config)
    try:
        verify_mode = config.get('https', 'verify')
    except (ConfigParser.NoSectionError, ConfigParser.NoOptionError):
        verify_mode = 'platform_default'
    default_factory = context_factories.get('platform_default')
    return context_factories.get(verify_mode, default_factory)

_create_default_https_context = _get_https_context_factory()
```
### 보안 고려 사항 (Security Considerations)

이 백포트 사례에 대한 특정 권장 사항은 다음과 같은 잠긴 구성에서 실행되는 프로세스라도, 특권이 있는 보안에 민감한 프로세스에 대해 작동하도록 설계되었습니다.

*   일반 사용자 디렉토리가 아닌 잠긴 관리자 제어 디렉토리에서 실행 (`sys.path[0]` 기반 권한 상승 공격 방지).
*   `-E` 스위치를 사용하여 실행 (`PYTHON*` 환경 변수 기반 권한 상승 공격 방지).
*   `-s` 스위치를 사용하여 실행 (사용자 사이트 디렉토리 기반 권한 상승 공격 방지).
*   `-S` 스위치를 사용하여 실행 (`sitecustomize` 기반 권한 상승 공격 방지).

이 접근 방식을 사용할 때 HTTPS 검증이 설치 전체에서 꺼지는 유일한 이유는 다음과 같습니다.

*   최종 사용자가 업스트림 CPython을 직접 실행하는 대신 재배포자가 제공한 CPython 버전을 실행하고 있습니다.
*   해당 재배포자가 업스트림 프로젝트에서 제공하는 것보다 HTTPS 인증서 검증을 기본적으로 사용하도록 더 원활한 마이그레이션 경로를 제공하기로 결정했습니다.
*   재배포자 또는 로컬 인프라 관리자가 (적어도 현재로서는) 2.7.9 이전의 기본 동작을 유지하는 것이 적절하다고 판단했습니다.

환경 변수 대신 관리자 제어 구성 파일을 사용하는 것은 `-E` 스위치로 실행되는 애플리케이션에 대해서도 더 원활한 마이그레이션 경로를 제공하는 필수적인 기능을 합니다.

### Python 가상 환경과의 상호 작용 (Interaction with Python virtual environments)

이 설정은 인터프리터 설치에 의해 범위가 지정되며, 인터프리터가 활성화된 Python 가상 환경 내에서 실행되는지 여부와 관계없이 해당 인터프리터를 사용하는 모든 Python 프로세스에 영향을 미칩니다.

### 이 권장 사항의 기원 (Origins of this recommendation)

이 권장 사항은 이 PEP의 2015년 7월 초판에 게시되고 이 KnowledgeBase 문서에 자세히 설명된 대로, Red Hat Enterprise Linux 7.2에 채택된 백포팅 접근 방식을 기반으로 합니다. Python 2.7.5용 이 백포트를 구현하는 Red Hat의 패치는 CentOS git 리포지토리에서 찾을 수 있습니다.

## 결합된 기능 백포트를 위한 권장 사항 (Recommendation for combined feature backports)

재배포자가 이 PEP의 환경 변수 기반 구성 설정을 파일 기반 PEP 476 백포트도 구현하는 수정된 Python 버전으로 백포팅하기로 선택하는 경우, 환경 변수가 시스템 전체 구성 설정보다 우선해야 합니다. 이렇게 하면 설치 전체의 기본 동작과 관계없이 특정 사용자 또는 애플리케이션에 대해 설정을 변경할 수 있습니다.

### 예시 구현 (Example implementation)

```python
_https_verify_envvar = 'PYTHONHTTPSVERIFY'
_cert_verification_config = '/etc/python/cert-verification.cfg'

def _get_https_context_factory():
    # 기본 동작에 대한 환경 변수 재정의를 확인합니다.
    if not sys.flags.ignore_environment:
        config_setting = os.environ.get(_https_verify_envvar)
        if config_setting is not None:
            if config_setting == '0':
                return _create_unverified_context
            return create_default_context

    # 기본 동작에 대한 시스템 전체 재정의를 확인합니다.
    context_factories = {
        'enable': create_default_context,
        'disable': _create_unverified_context,
        'platform_default': _create_unverified_context, # 지금은 :)
    }
    import ConfigParser
    config = ConfigParser.RawConfigParser()
    config.read(_cert_verification_config)
    try:
        verify_mode = config.get('https', 'verify')
    except (ConfigParser.NoSectionError, ConfigParser.NoOptionError):
        verify_mode = 'platform_default'
    default_factory = context_factories.get('platform_default')
    return context_factories.get(verify_mode, default_factory)

_create_default_https_context = _get_https_context_factory()
```
## 저작권 (Copyright)

이 문서는 공개 도메인에 배치되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.